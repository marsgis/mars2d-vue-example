/**
 * 示例：LabelLayer 大批量文字标注
 * 演示：mars2d.layer.LabelLayer 的 sourceLayer 模式（读取图形 style.labelStyle）与 data 模式
 * API：mars2d.layer.LabelLayer、LabelLayer#setData、LabelLayer#addData、LabelLayer#setOptions
 * 要点：标注绘制在独立 canvas（tooltipPane），碰撞在屏幕空间完成；sourceLayer 的线标签按切线旋转
 */
import * as mars2d from "mars2d"

let map
let graphicLayer
let labelLayer
let batchData = []

export const eventTarget = new mars2d.BaseClass()

export function onMounted(mapInstance) {
  map = mapInstance
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  createSourceGraphics()

  labelLayer = new mars2d.layer.LabelLayer({
    sourceLayer: graphicLayer,
    collision: true,
    collisionPadding: 2,
    defaultLabelStyle: {
      fontSize: 12,
      color: "#ffffff",
      stroke: true,
      strokeColor: "rgba(0,0,0,0.75)",
      strokeWidth: 2
    }
  })
  map.addLayer(labelLayer)

  if (map.controls && map.controls.layers) {
    map.controls.layers.addOverlay(graphicLayer, "图形")
    map.controls.layers.addOverlay(labelLayer, "标注")
  }
}

export function onUnmounted() {
  if (map && labelLayer) {
    map.removeLayer(labelLayer, true)
    labelLayer.destroy()
    labelLayer = null
  }
  if (map && graphicLayer) {
    map.removeLayer(graphicLayer, true)
    graphicLayer = null
  }
  batchData = []
  map = null
}

/**
 * 生成点/线/面图形，每个图形通过 style.labelStyle 声明标注
 */
function createSourceGraphics() {
  const bounds = map.getBounds()
  const south = bounds.getSouth()
  const north = bounds.getNorth()
  const west = bounds.getWest()
  const east = bounds.getEast()
  const latSpan = north - south
  const lngSpan = east - west
  const randomLat = () => south + latSpan * (0.15 + Math.random() * 0.7)
  const randomLng = () => west + lngSpan * (0.15 + Math.random() * 0.7)
  const graphics = []

  for (let i = 0; i < 40; i++) {
    graphics.push(
      new mars2d.graphic.Point({
        latlng: [randomLat(), randomLng()],
        style: {
          pixelSize: 6,
          color: "#2f7bff",
          labelStyle: { text: "点位" + (i + 1), offsetY: -10, color: "#dceaff", priority: 10 }
        }
      })
    )
  }

  for (let i = 0; i < 6; i++) {
    graphics.push(
      new mars2d.graphic.Polyline({
        latlngs: [
          [randomLat(), randomLng()],
          [randomLat(), randomLng()]
        ],
        style: {
          width: 2,
          color: "#ff9f43",
          labelStyle: { text: "线路" + (i + 1), color: "#ffd28a", priority: 100 }
        }
      })
    )
  }

  for (let i = 0; i < 4; i++) {
    const lat = randomLat()
    const lng = randomLng()
    graphics.push(
      new mars2d.graphic.Polygon({
        latlngs: [
          [lat, lng],
          [lat + latSpan * 0.08, lng],
          [lat + latSpan * 0.04, lng + lngSpan * 0.08]
        ],
        style: {
          fill: true,
          fillColor: "#00d2d3",
          fillOpacity: 0.18,
          color: "#00d2d3",
          labelStyle: { text: "区域" + (i + 1), color: "#8ff7f7", fontSize: 13, priority: 100 }
        }
      })
    )
  }

  graphicLayer.addGraphic(graphics)
}

/**
 * 开关碰撞（只影响标注层，不影响图形）
 * @param {Boolean} enabled 是否开启
 * @return {void} 无
 */
export function setCollision(enabled) {
  if (!labelLayer) {
    return
  }
  labelLayer.setOptions({ collision: enabled })
  labelLayer.refresh()
}

/**
 * 追加 data 模式标签，演示大批量文字
 * @param {Number} count 数量
 * @return {void} 无
 */
export function addBatch(count) {
  if (!labelLayer) {
    return
  }
  const bounds = map.getBounds()
  const south = bounds.getSouth()
  const north = bounds.getNorth()
  const west = bounds.getWest()
  const east = bounds.getEast()

  batchData = []
  for (let i = 0; i < count; i++) {
    batchData.push({
      latlng: [south + (north - south) * Math.random(), west + (east - west) * Math.random()],
      text: "批量" + (i + 1)
    })
  }
  labelLayer.addData(batchData)
}

/**
 * 清理 data 模式标签（sourceLayer 的图形标注保留）
 * @return {void} 无
 */
export function clearBatch() {
  if (labelLayer) {
    labelLayer.setData([])
  }
  batchData = []
}

/**
 * 当前标签总数
 * @return {Number} 数量
 */
export function getCount() {
  return labelLayer ? labelLayer.getLabelCount() : 0
}
