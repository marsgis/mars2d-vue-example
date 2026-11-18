/**
 * 示例：CanvasImage 图片
 * 演示：CanvasImage 叠加一张带透明度的图片，鼠标移动时读取图片对应位置的颜色值并用 popup 显示
 * API：mars2d.graphic.CanvasImage、mars2d.graphic.CanvasImage#getRgba、L.popup
 * 要点：getRgba 取色依赖 canvas 渲染器，mapOptions.renderer 必须配 L.canvas()；latlngs 为 [纬度, 经度] 的对角点；透明区域返回 "rgba(0,0,0,0)"，需单独判断
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let graphicLayer // 矢量数据图层
let colorPopup = null // 跟随鼠标显示颜色值的 popup
let onMapMouseMove = null // 鼠标移动监听：onUnmounted 必须用同一个函数引用才能解绑

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  // CanvasImage 的 getRgba 取色依赖 canvas 渲染器，默认 SVG 渲染器读不到图片像素
  renderer: L.canvas()
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 图片经纬度范围是 [0,70]~[60,140]，先把视角定位过去
  map.fitBounds(L.latLngBounds([0, 70], [60, 140]))

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 全国温度图
  const graphic = new mars2d.graphic.CanvasImage({
    latlngs: [
      [0, 70],
      [60, 140]
    ],
    style: {
      url: "img/simple/wendu.png",
      alpha: 0.7
    }
  })
  graphicLayer.addGraphic(graphic)

  // 显示鼠标所在位置颜色值
  colorPopup = L.popup({ closeButton: false })
  onMapMouseMove = function (e) {
    const latlng = e.latlng
    const rgb = graphic.getRgba(latlng)
    if (rgb === "rgba(0,0,0,0)") {
      colorPopup.remove()
      return
    }

    const inhtml = '<div style="background-color: ' + rgb + ';padding:10px;">颜色:' + rgb + "</div>"
    colorPopup.setLatLng(latlng).setContent(inhtml).openOn(map)
  }
  map.on("mousemove", onMapMouseMove)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && onMapMouseMove) {
    map.off("mousemove", onMapMouseMove)
  }
  onMapMouseMove = null

  if (colorPopup) {
    colorPopup.remove()
    colorPopup = null
  }

  if (graphicLayer) {
    // 从地图移除矢量图层：CanvasImage 一并释放
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}
