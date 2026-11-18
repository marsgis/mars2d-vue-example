/**
 * 示例：经纬网
 * 演示：用 mars2d.layer.GraticuleLayer 在地图上叠加经纬网（含经纬度标注），按当前层级自动调整经纬线间隔
 * API：mars2d.layer.GraticuleLayer、map.addLayer
 * 要点：不传 zoomInterval 时使用内置的分级间隔表（层级越小间隔越大）；color/opacity/weight 控制线条样式，showLabel:false 可隐藏标注
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graticuleLayer // 经纬网图层（onUnmounted 需移除）

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 3,
  minZoom: 1
}

// 事件对象，用于抛出事件给vue（本示例没有需要抛给面板的事件，保留以统一各示例结构）
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 经纬网
  graticuleLayer = new mars2d.layer.GraticuleLayer({
    name: "经纬网",
    type: "graticule",
    show: true
  })
  map.addLayer(graticuleLayer)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (graticuleLayer) {
    // 从地图移除图层；onUnmounted 里 map 可能已被置空，需判空
    if (map) {
      map.removeLayer(graticuleLayer, true)
    }
    graticuleLayer = null
  }
  map = null
}
