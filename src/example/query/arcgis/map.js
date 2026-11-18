/**
 * 示例：ArcGIS Server矢量服务查询
 * 演示：用 mars2d.query.QueryArcServer 按属性查询 ArcGIS MapServer 图层，查询范围由绘制的矩形/圆/多边形限定，结果以 GeoJSON 图层上图并联动表格
 * API：mars2d.query.QueryArcServer、mars2d.layer.GeoJsonLayer、map.graphicLayer.startDraw
 * 要点：依赖外网 ArcGIS 服务（server.mars3d.cn），离线或服务不可用时查询失败属环境问题；必须先绘制限定范围再查询（范围通过 graphic 参数传入）；page:false 表示不服务端分页
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let queryMapserver // ArcGIS 矢量查询服务（QueryArcServer 实例）
let geoJsonLayer // 用于展示查询结果的 GeoJSON 图层
let drawGraphic // 查询限定的区域（矩形/圆/多边形）

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 31.79536, lng: 117.255222, alt: 16294, heading: 358, pitch: -76 }
}

// 事件对象，用于抛出事件到vue中
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  showGeoJsonLayer()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (!map) {
    return
  }
  // 查询服务只保存服务地址与配置，没有 DOM/定时器，置空即可被回收
  queryMapserver = null
  if (geoJsonLayer) {
    map.removeLayer(geoJsonLayer)
    geoJsonLayer = null
  }
  // 限定范围画在 map.graphicLayer 上，需显式清空，避免重新运行示例后残留
  if (map.graphicLayer) {
    map.graphicLayer.clear()
  }
  drawGraphic = null
  map = null
}

// ========== 4. 查询 ==========
// 面板「查询」按钮：按名称模糊匹配，范围取自上次绘制的图形
export function query(text) {
  if (!drawGraphic) {
    globalMsg("请绘制区域")
    return
  }
  geoJsonLayer.clear()
  queryMapserver.query({
    where: `项目名称 like '%${text}%'`, // 类sql语句
    graphic: drawGraphic,
    page: false,
    success: (result) => {
      console.log("查询结果", result)
      if (result.count === 0) {
        globalMsg("未查询到相关记录！")
        return
      }

      eventTarget.fire("result", { result })
      geoJsonLayer.load({ data: result.geojson })
    },
    error: (error, msg) => {
      console.log("服务访问错误", error)
      globalAlert(msg, "服务访问错误")
    }
  })
}

// 查询服务与结果图层（onMounted 时创建）
function showGeoJsonLayer() {
  queryMapserver = new mars2d.query.QueryArcServer({
    url: "http://server.mars3d.cn/arcgis/rest/services/mars/hfghss/MapServer/1",
    popup: "all" // 单击查询结果要素时自动弹出全部属性
  })

  // 用于显示查询结果（geojson）的图层
  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "合肥项目",
    symbol: {
      styleOptions: {
        image: "img/marker/mark3.png",
        highlight: { type: "click", image: "img/marker/mark1.png" },
        label: {
          text: "{项目名称}",
          font_size: 16,
          color: "#0000ff",
          offsetY: 30
        }
      }
    },
    popup: "all"
  })
  map.addLayer(geoJsonLayer)

  geoJsonLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })

  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    const list = event.list
    eventTarget.fire("beforUI", { list }) // 抛出列表给面板渲染表格
  })
}

// ========== 5. 面板交互方法：绘制范围 ==========
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
      console.log("框选矩形：", drawGraphic.toGeoJSON({ outline: true }))
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
      console.log("框选圆：", drawGraphic.toGeoJSON({ outline: true }))
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
      console.log("框选多边行：", drawGraphic.toGeoJSON())
    }
  })
}

// ========== 6. 面板交互方法：表格联动与清除 ==========
export function flyToGraphic(id) {
  // 预留功能，后续支持高亮操作
  /* graphic.openHighlight() */
  map.flyToGraphic(geoJsonLayer.getGraphicById(id))
}

// 清除按钮
export function removeAll() {
  clearAll()
}

function clearAll() {
  drawGraphic = null
  map.graphicLayer.clear()
  geoJsonLayer.clear()
}

// 首页
export function showFirstPage() {
  queryMapserver.showFirstPage()
}
// 上一页
export function showPretPage() {
  queryMapserver.showPretPage()
}
// 下一页
export function showNextPage() {
  queryMapserver.showNextPage()
}
