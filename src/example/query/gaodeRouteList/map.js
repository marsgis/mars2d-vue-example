import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let routeLayer
let gaodeRoute

let poiLayer
let queryGaodePOI
let startGraphic
let endPointArr
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  routeLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(routeLayer)

  gaodeRoute = new mars2d.query.GaodeRoute({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })

  queryGaodePOI = new mars2d.query.GaodePOI({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })

  // 创建矢量数据图层
  poiLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(poiLayer)

  poiLayer.bindPopup(function (event) {
    const item = event.marsOptions.attr

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

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

let lastRoute
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

  queryGaodePOI.queryPolygon({
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

export function btnAnalyse(type) {
  if (!startGraphic || !endPointArr || endPointArr.length === 0) {
    globalMsg("请设置起点和查询目的地")
    return
  }
  showLoading()

  queryRoute(type)
}

function queryRoute(type) {
  const startPoint = startGraphic.coordinates
  const arr = []
  for (let i = 0; i < endPointArr.length; i++) {
    const item = endPointArr[i]
    arr.push([startPoint[0], [item.x, item.y]])
  }

  gaodeRoute.queryArr({
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
          border: true,
          border_olor: "black",
          border_Width: 2,
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
