/**
 * 示例：比例尺
 * 演示：通过 mapOptions.control.scale 在地图左下角显示 Leaflet 比例尺
 * API：mapOptions.control.scale、L.control.scale
 * 要点：scale 为 true 时按公制创建（米/千米），改成对象可传位置等参数；比例尺数值随地图缩放级别和纬度自动换算
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 只保留比例尺控件，config.json 里的其它默认控件不再创建
  option.control = {
    scale: true
  }
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalMsg("比例尺控件在左下角")
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 比例尺控件由地图按配置创建，随地图一起释放，只需断开示例对地图的引用
  map = null
}
