/**
 * 示例：面求交
 * 演示：内置两个相交面，用 turf.intersect 计算交集面并绿色高亮，可清除后重算
 * API：graphic.toGeoJSON、turf.intersect、mars2d.Util.geoJsonToGraphics
 * 要点：turf v7 的 intersect 参数是 featureCollection（v6 是两个 feature 参数，示例里保留了旧写法注释）；求交前先移除上一次的结果，避免重复叠加
 */
import * as mars2d from "mars2d"

let map
let graphicLayer
let graphic1
let graphic2
let intersectGraphic

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.216396, lat: 31.839795 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  addPolygon()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放图层与其中所有面
    map = null
  }
  graphicLayer = null
  graphic1 = null
  graphic2 = null
  intersectGraphic = null
}

// ========== 4. 矢量对象：两个原始面 ==========
function addPolygon() {
  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  // 面1
  graphic1 = new mars2d.graphic.Polygon({
    latlngs: [
      [31.854164, 117.182288],
      [31.878324, 117.210254],
      [31.855796, 117.238229],
      [31.826109, 117.242307],
      [31.821475, 117.177277],
      [31.854164, 117.182288]
    ],
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.5
    }
  })
  graphicLayer.addGraphic(graphic1)

  // 面2
  graphic2 = new mars2d.graphic.Polygon({
    latlngs: [
      [31.842971, 117.267046],
      [31.840323, 117.20963],
      [31.787122, 117.230646],
      [31.799624, 117.28833],
      [31.842971, 117.267046]
    ],
    style: {
      fillColor: "#0000FF",
      fillOpacity: 0.5
    }
  })
  graphicLayer.addGraphic(graphic2)
}
// ========== 5. 面板交互方法：求交与清除 ==========
export function intersect() {
  if (intersectGraphic) {
    graphicLayer.removeGraphic(intersectGraphic, true)
    intersectGraphic = null
  }

  const layer1 = graphic1.toGeoJSON()
  const layer2 = graphic2.toGeoJSON()
  console.log("2个面的geojson对象", layer1, layer2)

  // turf v7 起 intersect 的参数改为 featureCollection；v6 的写法是 turf.intersect(layer1, layer2)
  const geojson = turf.intersect(turf.featureCollection([layer1, layer2]))
  if (!geojson) {
    globalMsg("两个面没有相交部分")
    return
  }

  intersectGraphic = mars2d.Util.geoJsonToGraphics(geojson)[0]
  intersectGraphic.type = "polygon"
  intersectGraphic.style = {
    fillColor: "#00ff00",
    fillOpacity: 0.8,
    outline: true,
    outlineWidth: 3,
    outlineColor: "#0000ff",
    clampToGround: true
  }
  intersectGraphic = graphicLayer.addGraphic(intersectGraphic)
}

export function clear() {
  if (intersectGraphic) {
    graphicLayer.removeGraphic(intersectGraphic, true)
    intersectGraphic = null
  }
}
