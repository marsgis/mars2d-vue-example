/**
 * 示例：路径规划查询(多条)
 * 演示：先绘制起点、查询当前视域内的企业 POI 作为多个终点，再用 mars2d.query.QueryRoute#queryArr 批量查询起点到各终点的路径，结果列表可定位到对应路线
 * API：mars2d.query.QueryRoute#queryArr、mars2d.query.QueryPOI#queryPolygon、mars2d.graphic.Polyline
 * 要点：依赖外网高德 POI/路径规划服务（示例 token 不保证长期有效）；多条路径是逐个串行请求（queryArr 内部递归），POI 点数越多耗时越长；showRouteResult 用 endPointArr[i] 与返回数组下标对齐，二者顺序必须一致
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let queryRoute // 路径规划查询服务（QueryRoute 实例）
let queryPOI // 终点 POI 查询服务（QueryPOI 实例）

let routeLayer // 路径线图层
let poiLayer // 终点 POI 点图层
let startGraphic // 起点标绘对象（画在 map.graphicLayer 上）
let endPointArr // 当前视域内查询到的终点 POI 数据
let lastRoute // 最近一次从表格定位的路径矢量（预留：后续可做高亮）

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  routeLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(routeLayer)

  queryRoute = new mars2d.query.QueryRoute({
    service: mars2d.QueryServiceType.GAODE
  })

  queryPOI = new mars2d.query.QueryPOI({
    service: mars2d.QueryServiceType.GAODE
  })

  // 创建矢量数据图层
  poiLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(poiLayer)

  // bindPopup 的回调参数是矢量对象本身，marsOptions.attr 为 addGraphic 时传入的 POI 数据
  poiLayer.bindPopup(function (graphic) {
    const item = graphic.marsOptions.attr

    let inHtml = '<div class="mars2d-template-titile">' + item.name + '</div><div class="mars2d-template-content" >'

    const type = String(item.type).trim()
    if (type) {
      inHtml += "<div><label>类别</label>" + type + "</div>"
    }

    const xzqh = String(item.xzqh).trim()
    if (xzqh) {
      inHtml += "<div><label>区域</label>" + xzqh + "</div>"
    }

    const tel = String(item.tel).trim()
    if (tel) {
      inHtml += "<div><label>电话</label>" + tel + "</div>"
    }

    if (item.address) {
      const address = item.address.trim()
      inHtml += "<div><label>地址</label>" + address + "</div>"
    }
    inHtml += "</div>"
    return inHtml
  })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (!map) {
    return
  }
  // 起点画在 map.graphicLayer 上，显式移除；路径线与终点 POI 在自建图层里，整体移除
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  if (routeLayer) {
    map.removeLayer(routeLayer)
    routeLayer = null
  }
  if (poiLayer) {
    map.removeLayer(poiLayer)
    poiLayer = null
  }
  // 查询服务只保存服务地址与 token，无 DOM/定时器
  queryRoute = null
  queryPOI = null
  endPointArr = null
  lastRoute = null
  map = null
}

// ========== 3. 面板交互方法：选点与终点查询 ==========
export function centerAtRoute(id) {
  const graphic = routeLayer.getGraphicById(id)
  map.flyToGraphic(graphic, { scale: 1.0 })
  lastRoute = graphic
}

export function stratPoint() {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  routeLayer.clear()

  map.graphicLayer.startDraw({
    type: "marker",
    style: {
      image: "img/marker/start.png",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    success: function (graphic) {
      startGraphic = graphic
      const latlng = graphic.latlng
      eventTarget.fire("star", { latlng })
    }
  })
}

export function endPoint() {
  showLoading()
  routeLayer.clear()
  poiLayer.clear()
  endPointArr = null

  const extent = map.getExtent() // 当前视域内

  // 用当前视域的矩形范围查企业 POI 作为候选终点（矩形用左上、右下两点表示）
  queryPOI.queryPolygon({
    text: "企业",
    polygon: mars2d.PointTrans.coords2latlngs([
      [extent.xmin, extent.ymin],
      [extent.xmin, extent.ymax],
      [extent.xmax, extent.ymax],
      [extent.xmax, extent.ymin]
    ]),
    page: 0,
    count: 10,
    success: function (res) {
      hideLoading()

      const count = res.count
      eventTarget.fire("end", { count })

      addEndPointEntity(res.list)
    },
    error: function (msg) {
      globalMsg(msg)
      hideLoading()
    }
  })
}

// 切换服务
export function changeService(type) {
  queryRoute.setOptions({ service: type })
  queryPOI.setOptions({ service: type })
}

// ========== 4. 面板交互方法：开始分析与清除 ==========
export function btnAnalyse(type) {
  if (!startGraphic || !endPointArr || endPointArr.length === 0) {
    globalMsg("请设置起点和查询目的地")
    return
  }
  showLoading()

  routeLayer.clear()
  queryRoutes(type)
}

function queryRoutes(type) {
  const startPoint = startGraphic.coordinates
  const arr = []
  for (let i = 0; i < endPointArr.length; i++) {
    const item = endPointArr[i]
    arr.push([startPoint[0], [item.x, item.y]])
  }

  queryRoute.queryArr({
    type: Number(type), // GaodeRouteType枚举类型
    points: arr,
    success: function (data) {
      hideLoading()

      showRouteResult(data)
    },
    error: function (msg) {
      hideLoading()
      globalAlert(msg)
    }
  })
}

export function removeAll() {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  routeLayer.clear()
  poiLayer.clear()
  endPointArr = null
}

// ========== 5. 查询结果上图 ==========
// 终点的POI查询
function addEndPointEntity(arr) {
  console.log("查询数据结果", arr)

  endPointArr = arr

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const graphic = new mars2d.graphic.Marker({
      latlng: [item.lat, item.lng],
      style: {
        image: "img/marker/end.png",
        // 后续支持label功能
        label: {
          text: item.name,
          font_size: 16,
          color: "#000000",
          // border: true,
          // border_olor: "black",
          // border_Width: 2,
          offsetY: 30,
          pixelOffsetY: -25,
          horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
          verticalOrigin: mars2d.VerticalOrigin.BOTTOM
        }
      },
      attr: item
    })
    poiLayer.addGraphic(graphic)
  }
}

function showRouteResult(data) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (!item) {
      continue
    }

    const latlngs = mars2d.PointTrans.coords2latlngs(item.points)
    if (!latlngs || latlngs.length < 1) {
      continue
    }

    const name = endPointArr[i].name

    const time = mars2d.Util.formatTime(item.allDuration)
    const distance = mars2d.MeasureUtil.formatDistance(item.allDistance)
    const html = "目的地：" + name + "<br/>总距离：" + distance + "<br/>所需时间：" + time + ""

    const graphic = new mars2d.graphic.Polyline({
      latlngs,

      popup: html
    })
    routeLayer.addGraphic(graphic)
    const id = graphic.id
    eventTarget.fire("analyse", { i, name, distance, time, id })
  }
}
