/**
 * 示例：zoom放大缩小
 * 演示：先去掉地图配置里的控件，再手工用 L.control.zoom 在地图左下角添加 Leaflet 缩放控件
 * API：L.control.zoom、map.addControl
 * 要点：delete option.control 是为了移除 config.json 的默认控件（默认 zoom 在右下角），否则手工添加后会出现两个缩放控件；position 参数决定按钮停靠的角落
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let zoomControl

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 第一种添加控件方法（本示例不用）：option.control = { zoom: { position: "bottomleft" } }
  delete option.control
  return option
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 第二种添加控件方法：手工创建 Leaflet 缩放控件
  zoomControl = L.control.zoom({ position: "bottomleft" })
  map.addControl(zoomControl)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && zoomControl) {
    // Leaflet 的 Control.remove 会移除控件 DOM 并解绑地图 unload 监听
    map.removeControl(zoomControl)
    zoomControl = null
  }
  map = null
}
