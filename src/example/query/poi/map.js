/**
 * 示例：POI点查询
 * 演示：用 mars2d.query.QueryPOI 调用高德/天地图/百度 POI 服务，按指定城市、当前视域或绘制范围查询兴趣点，并用 Marker 上图
 * API：mars2d.query.QueryPOI、mars2d.graphic.Marker、map.getExtent
 * 要点：示例使用示例工程的公共 token，失效或超量需自行申请替换（见 mars2d.Token）；城市参数各服务不同——天地图要传行政区国标码，高德/百度传城市名；范围查询用 limit:true 严格限定在范围内
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

let poiLayer // 查询结果（POI 点）所在的图层
let queryPOI // POI 查询服务（QueryPOI 实例）

let drawGraphic // 限定区域（指定范围查询时使用）
let resultList = [] // 已查询到的 POI 结果（翻页/累计用）
let lastQueryOptions // 上一次请求参数，用于 下一页使用

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 31.797919, lng: 117.281329, alt: 36236, heading: 358, pitch: -81 }
}

// 事件对象，用于抛出事件到vue中
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  globalNotify("已知问题提示", `(1) token如果访问失效或超流量了，请您自行申请替换mars2d.Token.update相关方法`)

  queryPOI = new mars2d.query.QueryPOI({
    service: mars2d.QueryServiceType.GAODE
  })

  // 创建矢量数据图层
  poiLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(poiLayer)

  // bindPopup 的回调参数是矢量对象本身，attr 为 addGraphic 时传入的 POI 数据
  poiLayer.bindPopup(function (graphic) {
    const item = graphic.attr

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
    const address = String(item.address).trim()
    if (address) {
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
  // 查询服务只保存服务地址与 token，没有 DOM/定时器，置空即可被回收
  queryPOI = null
  if (poiLayer) {
    map.removeLayer(poiLayer)
    poiLayer = null
  }
  // 限定范围画在 map.graphicLayer 上，需显式清空，避免重新运行示例后残留
  if (map.graphicLayer) {
    map.graphicLayer.clear()
  }
  drawGraphic = null
  resultList = []
  lastQueryOptions = null
  map = null
}

// ========== 3. 面板交互方法：切换服务与查询 ==========
// 切换服务
export function changeService(type) {
  queryPOI.setOptions({ service: type })
}

/**
 * 查询
 *
 * @export
 * @param {string} radioFanwei 范围选择
 * @param {string} cityShi 城市
 * @param {string} text 关键字
 * @returns {void}
 */
export function query(radioFanwei, cityShi, text) {
  resultList = []
  switch (radioFanwei) {
    case "2": {
      // 当前视角范围：把视域换成经纬度矩形（extent 的 xmin/xmax 是经度，ymin/ymax 是纬度）
      const extent = map.getExtent()
      loadData(
        {
          page: 0,
          polygon: [
            [extent.ymin, extent.xmin],
            [extent.ymax, extent.xmax]
          ],
          limit: true
        },
        text
      )
      break
    }
    case "3": // 按范围
      if (!drawGraphic) {
        globalMsg("请绘制限定范围！")
        return
      }
      loadData(
        {
          page: 0,
          graphic: drawGraphic,
          limit: true
        },
        text
      )
      break
    default: {
      const dmmc = cityShi
      loadData(
        {
          page: 0,
          city: dmmc,
          citylimit: true
        },
        text
      )
      break
    }
  }
}

// ========== 4. 查询请求与结果处理 ==========
function loadData(queryOptions, text) {
  if (!text) {
    globalMsg("请输入 名称 关键字筛选数据！")
    return
  }
  showLoading()
  console.log("queryOptions", queryOptions) // 演示输出：查看最终传给服务的请求参数
  lastQueryOptions = {
    ...queryOptions,
    count: 25, // count 每页数量
    text,
    success: function (res) {
      const data = res?.list
      if (!data || data.length === 0) {
        globalMsg("未搜索到相关数据！")
      }
      resultList = resultList.concat(data)

      console.log("查询结果", resultList) // 演示输出：查看服务返回并转换后的 POI 列表

      addDemoGraphics(data)

      eventTarget.fire("tableData", { data }) // 抛出数据给vue

      hideLoading()
    },
    error: function (msg) {
      hideLoading()
      globalAlert(msg)
    }
  }
  queryPOI.query(lastQueryOptions)
}

export function clearAll(noClearDraw) {
  lastQueryOptions = null
  resultList = []
  poiLayer.clear()

  if (!noClearDraw) {
    drawGraphic = null
    map.graphicLayer.clear()
  }
}

// ========== 5. 查询结果上图 ==========
function addDemoGraphics(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    const graphic = new mars2d.graphic.Marker({
      id: item.id,
      latlng: [item.lat, item.lng],
      style: {
        image: "img/marker/mark3.png",
        width: 32,
        height: 44,
        // 预留功能，后续支持高亮操作
        highlight: { type: "click", image: "img/marker/mark1.png" },
        label: {
          text: item.name,
          font: "20px 楷体",
          outline: true,
          outlineWidth: 2,
          offsetY: -30
        }
      },
      attr: item
    })
    poiLayer.addGraphic(graphic)

    item.graphic = graphic
  }
}

// ========== 6. 面板交互方法：绘制限定范围 ==========
// 框选查询 矩形
export function drawRectangle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}

// 框选查询   圆
export function drawCircle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}

// 框选查询   多边行
export function drawPolygon() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}

// ========== 7. 面板交互方法：结果定位 ==========
export function flytoGraphic(graphic) {
  map.flyToGraphic(graphic)
}
