/**
 * 示例：雨
 * 演示：用 Rain 矢量对象在矩形范围内绘制下雨粒子动画，并演示标绘
 * API：mars2d.graphic.Rain、mars2d.layer.GraphicLayer
 * 要点：latlngs 为限制动画范围的矩形四角，坐标用 [纬度, 经度]；angle/width/spacing/length/interval/speed 控制雨丝角度、粗细与密度；动画随矢量对象移除而停止
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()
export let graphicLayer

export const mapOptions = {
  center: [31.837316, 117.231503],
  zoom: 13,
  zoomAnimation: true
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  addDemoGraphic()
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  // 解绑面板通过 eventTarget 注册的事件，避免旧面板回调残留
  eventTarget.off()
  if (graphicLayer) {
    // 从地图移除矢量图层：下雨动画随矢量对象一起停止
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}

// ========== 3. 矢量对象（演示数据）==========
function addDemoGraphic() {
  const points = [
    [31.87755764334002, 117.18893051147462],
    [31.879306880763227, 117.28231430053712],
    [31.785238309483983, 117.27819442749025],
    [31.791950250173965, 117.1794891357422]
  ]

  const rain = new mars2d.graphic.Rain({
    latlngs: points,
    style: {
      angle: 16, // deg
      width: 1, // px
      spacing: 10, // px
      length: 9, // px
      interval: 10, // px
      speed: 1, // times
      color: "#3388ff"
    }
  })
  graphicLayer.addGraphic(rain)
}

// ========== 4. 面板交互方法 ==========
export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "rain",
    style: {
      angle: 16, // deg
      width: 1, // px
      spacing: 10, // px
      length: 4, // px
      interval: 10, // px
      speed: 1, // times
      color: "#3388ff"
    },
    success: function (graphic) {
      console.log("标绘完成", graphic)
    }
  })
}
