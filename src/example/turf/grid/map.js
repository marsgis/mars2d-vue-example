import * as mars2d from "mars2d"

let map
let graphicLayer
const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
const turfOptions = { units: "kilometers" }

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 点
export function pointGrid(cellSide) {
  const geojson = turf.pointGrid(bbox, cellSide, turfOptions)
  drawPoint(geojson)
}

// 三角网
export function triangleGrid(cellSide) {
  const geojson = turf.triangleGrid(bbox, cellSide, turfOptions)
  drawPolyon(geojson)
}

// 方格网
export function squareGrid(cellSide) {
  const geojson = turf.squareGrid(bbox, cellSide, turfOptions)
  drawPolyon(geojson)
}

// 蜂窝网
export function hexGrid(cellSide) {
  const geojson = turf.hexGrid(bbox, cellSide, turfOptions)
  drawPolyon(geojson)
}

// 蜂窝网格、正方形网格、三角形网格
export function drawPolyon(geojson) {
  graphicLayer.clear()
  const polygons = mars2d.Util.geoJsonToGraphics(geojson) // 解析geojson

  for (let i = 0; i < polygons.length; i++) {
    const item = polygons[i]
    const graphic = new mars2d.graphic.Polygon({
      latlngs: item.latlngs,
      style: {
        fillColor: "#ffff00",
        fillOpacity: 0.5,
        outline: true,
        outlineWidth: 2,
        outlineColor: "red",
        outlineOpacity: 0.3,
        clampToGround: true
      },
      attr: item.attr,
      popup: "第" + i + "个"
    })
    graphicLayer.addGraphic(graphic)
  }
}

// 点网格
function drawPoint(geojson) {
  graphicLayer.clear()

  const points = mars2d.Util.geoJsonToGraphics(geojson) // 解析geojson

  for (let i = 0; i < points.length; i++) {
    const item = points[i]

    const graphic = new mars2d.graphic.Point({
      latlng: item.latlng,
      style: {
        color: "#ffff00",
        pixelSize: 8
      },
      popup: "第" + i + "个"
    })
    graphicLayer.addGraphic(graphic)
  }
}
