/**
 * 示例：昼夜覆盖区域
 * 演示：用 mars2d.layer.DayNightLayer 叠加当前时刻的昼夜分布（晨昏线覆盖区域）
 * API：mars2d.layer.DayNightLayer、map.addLayer
 * 要点：不传 time 时图层按运行时的当前时间绘制昼夜区域，可用 setTime(Date) 指定时刻；fillColor/fillOpacity 可调整夜间遮罩样式
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let dayNightLayer // 昼夜图层（onUnmounted 需移除）

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

  // 不传 time 时按当前时间生成昼夜区域，默认半透明填充；fillColor/fillOpacity 可自行调整
  dayNightLayer = new mars2d.layer.DayNightLayer()
  map.addLayer(dayNightLayer)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (dayNightLayer) {
    // 从地图移除图层；onUnmounted 里 map 可能已被置空，需判空
    if (map) {
      map.removeLayer(dayNightLayer, true)
    }
    dayNightLayer = null
  }
  map = null
}
