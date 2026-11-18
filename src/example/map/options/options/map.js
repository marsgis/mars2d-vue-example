/**
 * 示例：地图参数
 * 演示：运行时用 map.setOptions 修改地图参数（层级、背景色、右键菜单），并用 map.basemap 显示/隐藏底图
 * API：mars2d.Map、map.setOptions、map.basemap
 * 要点：setOptions 只对 SDK 支持的参数生效（zoom/backgroundColor/defaultContextMenu 等）；底图按 config.json 中的 id 或 name 切换（2021 = 高德电子）；部分构造参数只能在创建地图时生效
 */
import * as mars2d from "mars2d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  minZoom: 0,
  maxZoom: 13
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
}

// ========== 2. 面板交互方法（运行时修改地图参数）==========
export function setMapOptions(name, value) {
  const options = {}
  options[name] = value

  map.setOptions(options)

  console.log("设置地图参数（已生效）", name, value)
}

// 是否显示底图
export function showBaseMap(enabled) {
  // 2021 是 config.json 中「高德电子」底图的 id；传 undefined 表示取消全部底图
  if (enabled) {
    map.basemap = 2021
  } else {
    map.basemap = undefined
  }
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy()
    map = null
  }
}
