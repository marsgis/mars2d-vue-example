import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象
let queryMapserver
let geoJsonLayer
let drawGraphic
let graphicLayer
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

  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  showGeoJsonLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function showGeoJsonLayer() {
  queryMapserver = new mars2d.query.QueryGeoServer({
    url: "//server.mars3d.cn/geoserver/mars/wfs",
    layer: "mars:hfjy"
  })

  // 用于显示查询结果（geojson）的图层
  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "合肥项目",
    symbol: {
      styleOptions: {
        image: "img/marker/mark3.png",
        scale: 1,
        scaleByDistance: true,
        scaleByDistance_far: 20000,
        scaleByDistance_farValue: 0.5,
        scaleByDistance_near: 1000,
        scaleByDistance_nearValue: 1,
        highlight: { type: "click", image: "img/marker/mark1.png" },
        label: {
          text: "{项目名称}",
          font_size: 25,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          pixelOffsetY: -25,
          scaleByDistance: true,
          scaleByDistance_far: 80000,
          scaleByDistance_farValue: 0.5,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 80000,
          distanceDisplayCondition_near: 0
        }
      }
    },
    popup: "all"
  })
  map.addLayer(geoJsonLayer)

  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    const list = event.list
    eventTarget.fire("befortUI", { list })
  })
}

export function query(text) {
  if (!drawGraphic) {
    globalMsg("请绘制区域")
    return
  }
  queryMapserver.query({
    column: "项目名称",
    text: text,
    graphic: drawGraphic,
    success: (result) => {
      if (result.count === 0) {
        globalMsg("未查询到相关记录！")
      } else {
        globalMsg("共查询到 " + result.count + " 条记录！")
      }
      geoJsonLayer.load({ data: result.geojson })
    },
    error: (error, msg) => {
      console.log("服务访问错误", error)
      globalAlert(msg, "服务访问错误")
    }
  })
}

// 框选范围
export function drawRectangle() {
  clearAll()
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic

      console.log("矩形：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}

// 框选查询   圆
export function drawCircle() {
  clearAll()
  graphicLayer.startDraw({
    type: "circle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      console.log("圆：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}

// 框选查询   多边行
export function drawPolygon() {
  clearAll()
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      console.log("多边行：", drawGraphic.toGeoJSON())
    }
  })
}

export function flyToGraphic(graphic) {
  map.flyToGraphic(graphic, { scale: 1.5 })
  graphic.openPopup()
}

// 清除
export function clearAll(noClearDraw) {
  if (!noClearDraw) {
    drawGraphic = null
    graphicLayer.clear()
  }
  geoJsonLayer.clear()
}
