import * as mars2d from "mars2d"
let map

let graphicLayer
let polygonsLayer

export const mapOptions = {
  zoom: 13,
  center: { lng: 117.283688, lat: 31.842128 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  polygonsLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(polygonsLayer)

  const graphic = new mars2d.graphic.Polygon({
    latlngs: [
      [31.870639, 117.271662],
      [31.871517, 117.290605],
      [31.858145, 117.302056],
      [31.847545, 117.299439],
      [31.8491, 117.267705]
    ],
    style: {
      fillColor: "#3388ff",
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  graphicLayer.addGraphic(graphic)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

export function drawPolygon() {
  graphicLayer.clear()
  polygonsLayer.clear()

  // 开始绘制
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: getColor(),
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
}

// 旋转面
export function spinPolygons(angle) {
  polygonsLayer.clear()
  graphicLayer.endDraw()
  const graphics = graphicLayer.getGraphics()
  if (!graphics || graphics.length === 0) {
    globalMsg("请绘制面")

    return
  }

  const graphic = graphics[0]

  const poly = graphic.toGeoJSON({ closure: true })

  const point = graphic.center // 围绕执行旋转的点

  const CenterPoint = [point.lng, point.lat]

  // truf旋转操作
  const rotatedPoly = turf.transformRotate(poly, angle, { pivot: CenterPoint })

  const spinGraphic = mars2d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  polygonsLayer.addGraphic(spinGraphic)
}

// 平移面
export function translationPolygons(offset) {
  polygonsLayer.clear()
  graphicLayer.endDraw()

  const graphics = graphicLayer.getGraphics()
  if (!graphics || graphics.length === 0) {
    globalMsg("请绘制面")
    return
  }

  const graphic = graphics[0]

  const poly = graphic.toGeoJSON({ closure: true })

  // truf平移操作
  const rotatedPoly = turf.transformTranslate(poly, offset, 10)

  const spinGraphic = mars2d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  polygonsLayer.addGraphic(spinGraphic)
}

// 缩放面
export function zoomPolygons(scale) {
  polygonsLayer.clear()
  graphicLayer.endDraw()

  if (scale === 0) {
    return
  }

  const graphics = graphicLayer.getGraphics()
  if (!graphics || graphics.length === 0) {
    globalMsg("请绘制面")
    return
  }

  const graphic = graphics[0]

  const poly = graphic.toGeoJSON({ closure: true })

  // truf缩放操作
  const rotatedPoly = turf.transformScale(poly, scale)

  const spinGraphic = mars2d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  polygonsLayer.addGraphic(spinGraphic)
}

// 颜色
let index = 0
const colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#0000FF"]
function getColor() {
  const i = index++ % colors.length
  return colors[i]
}
