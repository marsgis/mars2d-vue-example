/**
 * 示例：线上最近点
 * 演示：先画一条线、再在任意位置画点，用 turf.nearestPointOnLine 计算线上距该点最近的位置并标注
 * API：turf.nearestPointOnLine、graphic.toGeoJSON、graphicLayer.startDraw
 * 要点：计算前要同时存在线和至少一个点；返回的是“线上”的投影点而不是原数据点；units 只影响返回的 dist 属性，对最近点坐标没有影响
 */
import * as mars2d from "mars2d"

let map
let graphicLayer
let pointLayer

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 点矢量数据图层
  pointLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(pointLayer)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放两个图层与绘制状态
    map = null
  }
  graphicLayer = null
  pointLayer = null
}

// ========== 3. 面板交互方法：绘制 ==========
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

// ========== 4. 最近点计算 ==========
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

  // 最近点（图标点）：turf 返回 [经度, 纬度]，L.latLng 需要 [纬度, 经度]
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

// ========== 5. 清除 ==========
// 清除数据
export function clearLayer() {
  graphicLayer.clear()
  pointLayer.clear()
}
