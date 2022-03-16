import * as mars2d from "mars2d"

let map
let graphicLayer
let pointLayer

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

  // 点矢量数据图层
  pointLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(pointLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 绘制线
export function drawLine() {
  if (pointLayer) {
    pointLayer.clear()
  }
  graphicLayer.clear()

  graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#0000ff",
      width: 3
    }
  })
}

// 绘制点
export function drawPoint() {
  pointLayer.clear()
  pointLayer.startDraw({
    type: "marker",
    style: {
      image: "img/marker/mark1.png",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    success: function (graphic) {
      graphic.bindTooltip("原始点")
      nearPoint()
    }
  })
}

// 最近点计算
function nearPoint() {
  const lineLayer = graphicLayer.getGraphics()
  const point = pointLayer.getGraphics()

  if (lineLayer.length < 1 || point.length < 1) {
    return
  }

  const line = lineLayer[0].toGeoJSON()
  const pt = point[0].toGeoJSON()

  const snapped = turf.nearestPointOnLine(line, pt, { units: "miles" })
  const position = snapped.geometry.coordinates

  // 最近点（图标点）
  const graphic = new mars2d.graphic.Marker({
    latlng: L.latLng(position[1], position[0]),
    style: {
      image: "img/marker/mark2.png",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    tooltip: "最近点"
  })
  pointLayer.addGraphic(graphic)
}

// 清除数据
export function clearLayer() {
  graphicLayer.clear()
  pointLayer.clear()
}
