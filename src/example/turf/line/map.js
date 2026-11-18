/**
 * 示例：线相关计算
 * 演示：绘制一条线后，用 turf.bezierSpline 生成平滑曲线、turf.lineOffset 生成平行线
 * API：graphic.toGeoJSON、turf.bezierSpline、turf.lineOffset、mars2d.PointTrans.coords2latlngs
 * 要点：turf 计算返回的坐标是 [经度, 纬度]，要用 PointTrans.coords2latlngs 转成 graphic 需要的 [纬度, 经度]；平行线距离的单位由 units 参数决定；计算前先判断是否已经画线
 */
import * as mars2d from "mars2d"

let map
let graphicLayer
let lineLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 基础线矢量数据
  lineLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(lineLayer)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放两个图层与绘制的线
    map = null
  }
  graphicLayer = null
  lineLayer = null
}

// ========== 4. 面板交互方法 ==========
export function drawLine() {
  clearLayer()

  lineLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3,
      clampToGround: false
    }
  })
}

// ========== 5. 线计算 ==========
// 计算曲线
export function calculationCurve() {
  graphicLayer.clear()

  let line = lineLayer.getGraphics()
  if (line.length === 0) {
    globalMsg("请绘制线！")
    return
  }
  line = line[0].toGeoJSON()

  // bezierSpline 把折线变成平滑曲线（坐标仍是 [经度, 纬度]）
  const curved = turf.bezierSpline(line)
  const positions = curved.geometry.coordinates

  const latlngs = mars2d.PointTrans.coords2latlngs([positions])

  const graphic = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      width: 4,
      color: "#00ffff"
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 计算平行线
export function parallelLines(distance) {
  let line = lineLayer.getGraphics()
  if (line.length === 0) {
    globalMsg("请绘制线！")
    return
  }
  line = line[0].toGeoJSON()

  graphicLayer.clear()

  // 第二个参数是偏移距离，单位由 units 指定
  const offsetLine = turf.lineOffset(line, distance, { units: "kilometers" }) // 与面板输入框的「公里」一致

  const positions = offsetLine.geometry.coordinates

  const latlngs = mars2d.PointTrans.coords2latlngs([positions])

  const graphic = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      width: 4,
      color: "#ff0000"
    }
  })
  graphicLayer.addGraphic(graphic)
}

// ========== 6. 清除 ==========
export function clearLayer() {
  graphicLayer.clear()
  lineLayer.clear()
}
