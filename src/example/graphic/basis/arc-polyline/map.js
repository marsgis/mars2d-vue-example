/**
 * 示例：ArcPolyline 弧线动画
 * 演示：与 thirdParty/polyline-migration（leaflet.migrationLayer）一致的迁徙弧线效果
 * API：mars2d.graphic.ArcPolyline、ArcPolyline#setStyle、ArcPolyline#setLatLngs
 * 要点：圆弧 factor=1.5、全弧描边、50 段渐隐拖尾、流动箭头、终点箭头/脉冲/文字；
 *       多个 ArcPolyline 共享一个 canvas/一个 rAF，基础直线默认隐藏
 */
import * as mars2d from "mars2d"

let map
let graphicLayer

const FROM = [31.838742, 117.257436]
const COLORS = [
  "#ff3a31",
  "#ff7e2b",
  "#ffc726",
  "#e9ff20",
  "#99ff1b",
  "#45ff15",
  "#10ff33",
  "#66FF66",
  "#FF6666",
  "#00CCFF",
  "#00FF33",
  "#CC0000",
  "#CC00CC",
  "#CCFF00"
]
const DATA = [
  { to: [31.8329, 116.3123], labels: ["合肥市", "六安市"] },
  { to: [30.5255, 116.7517], labels: [null, "安庆市"] },
  { to: [32.536, 118.1909], labels: [null, "滁州市"] },
  { to: [30.6244, 118.8062], labels: [null, "宣城市"] },
  { to: [32.9919, 115.7629], labels: [null, "阜阳市"] },
  { to: [33.6841, 117.5208], labels: [null, "宿州市"] },
  { to: [29.9542, 118.0481], labels: [null, "黄山市"] },
  { to: [31.4978, 117.7734], labels: [null, "巢湖市"] },
  { to: [33.4698, 116.1914], labels: [null, "亳州市"] },
  { to: [30.2014, 117.3889], labels: [null, "池州市"] },
  { to: [33.1073, 117.4109], labels: [null, "蚌埠市"] },
  { to: [31.0858, 118.3557], labels: [null, "芜湖市"] },
  { to: [33.6896, 116.6968], labels: [null, "淮北市"] },
  { to: [32.7722, 116.7847], labels: [null, "淮南市"] },
  { to: [31.5363, 118.6304], labels: [null, "马鞍山市"] },
  { to: [30.9375, 117.9382], labels: [null, "铜陵市"] }
]

export const mapOptions = {
  zoom: 8,
  center: { lng: 118.009644, lat: 32.026706 }
}

export function onMounted(mapInstance) {
  map = mapInstance
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  createArcs()

  if (map.controls && map.controls.layers) {
    map.controls.layers.addOverlay(graphicLayer, "迁徙弧线")
  }
}

export function onUnmounted() {
  if (map && graphicLayer) {
    graphicLayer.clear()
    map.removeLayer(graphicLayer, true)
    graphicLayer = null
  }
  map = null
}

/**
 * 重新生成一批弧线
 * @return {void} 无
 */
export function regenerate() {
  if (!graphicLayer) {
    return
  }
  graphicLayer.clear()
  createArcs()
}

function createArcs() {
  const arcs = []
  for (let i = 0; i < DATA.length; i++) {
    const item = DATA[i]
    const arc = new mars2d.graphic.ArcPolyline({
      latlngs: [FROM, item.to],
      style: {
        color: COLORS[i % COLORS.length],
        arcWidth: 3,
        pulseRadius: 30,
        pulseBorderWidth: 3,
        arcLabel: true,
        arcLabelFont: "10px sans-serif",
        labels: item.labels
      }
    })
    arc.bindPopup(`迁徙弧线：${item.labels[1] || "目的地"}`)
    arcs.push(arc)
  }
  graphicLayer.addGraphic(arcs)
}

/**
 * 当前弧线数量
 * @return {Number} 数量
 */
export function getCount() {
  return graphicLayer ? graphicLayer.getGraphics().length : 0
}
