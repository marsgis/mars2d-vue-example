/**
 * 示例：扩散动画点
 * 演示：Marker 的 pulse 扩散光圈动画（脉冲颜色、阴影色、持续时长）
 * API：mars2d.graphic.Marker、mars2d.layer.GraphicLayer
 * 要点：pulse 是 CSS 动画，不配置 image 时按 width 画圆点；pulseDuration 控制动画周期；动画随矢量对象移除而停止
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let graphicLayer // 矢量数据图层

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
  addDemoGraphic3(graphicLayer)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (graphicLayer) {
    // 从地图移除矢量图层：脉冲动画随矢量对象一起停止
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}

// ========== 3. 矢量对象（演示数据）==========
function addDemoGraphic1(graphicLayer) {
  // 无 image 时按 width 画圆点；pulse:true 用 CSS 动画绘制扩散光圈
  const graphic = new mars2d.graphic.Marker({
    latlng: [31.854628, 117.245425],
    style: {
      width: 20,
      pulse: true,
      pulseColor: "#ff0000"
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic2(graphicLayer) {
  const graphic = new mars2d.graphic.Marker({
    latlng: L.latLng(31.810858, 117.21),
    style: {
      width: 15,
      pulse: true,
      pulseColor: "#0000ff"
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3(graphicLayer) {
  const graphic = new mars2d.graphic.Marker({
    latlng: L.latLng(31.818606, 117.296904),
    style: {
      width: 15,
      pulse: true,
      pulseColor: "#00ff00",
      pulseShadowColor: "#ff0000",
      pulseDuration: 2
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}
