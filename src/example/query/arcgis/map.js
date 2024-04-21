import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

let queryMapserver
let geoJsonLayer
let drawGraphic

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 31.79536, lng: 117.255222, alt: 16294, heading: 358, pitch: -76 }
}

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  showGeoJsonLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

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
      console.log(result)
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

function showGeoJsonLayer() {
  queryMapserver = new mars2d.query.QueryArcServer({
    url: "http://server.mars3d.cn/arcgis/rest/services/mars/hfghss/MapServer/1",
    popup: "all"
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
        clampToGround: true,
        highlight: { type: "click", image: "img/marker/mark1.png" },
        label: {
          text: "{项目名称}",
          font_size: 16,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          offsetY: 30,
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
    eventTarget.fire("beforUI", { list })
  })
}

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
