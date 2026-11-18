/**
 * 示例：面相关计算
 * 演示：绘制一个面后，用 turf.transformRotate/transformTranslate/transformScale 做旋转、平移、缩放，计算结果用红色面展示
 * API：graphic.toGeoJSON、turf.transformRotate、turf.transformTranslate、turf.transformScale
 * 要点：旋转围绕面的中心点（pivot，坐标顺序 [经度, 纬度]）进行；平移距离单位由第三个参数（options.units）决定；计算前先 endDraw() 结束绘制，保证取到完整图形
 */
import * as mars2d from "mars2d"
let map

let graphicLayer
let polygonsLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.283688, lat: 31.842128 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层（原始面）
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 计算结果面图层
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
      outlineColor: "#0000ff"
    }
  })
  graphicLayer.addGraphic(graphic)
}

// ========== 3. 清理（与 onMounted 对称）==========
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
  polygonsLayer = null
}

// ========== 4. 面板交互方法：绘制 / 旋转 / 平移 / 缩放 ==========
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
      outlineColor: "#0000ff"
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

  // turf 旋转操作：pivot 用 [经度, 纬度]
  const rotatedPoly = turf.transformRotate(poly, angle, { pivot: CenterPoint })

  const spinGraphic = mars2d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000ff"
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

  // turf 平移操作
  const rotatedPoly = turf.transformTranslate(poly, offset, 10)

  const spinGraphic = mars2d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000ff"
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

  // turf 缩放操作
  const rotatedPoly = turf.transformScale(poly, scale)

  const spinGraphic = mars2d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000ff"
    }
  })
  polygonsLayer.addGraphic(spinGraphic)
}

// ========== 5. 颜色 ==========
// 颜色
let index = 0
const colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#0000FF"]
function getColor() {
  const i = index++ % colors.length
  return colors[i]
}
