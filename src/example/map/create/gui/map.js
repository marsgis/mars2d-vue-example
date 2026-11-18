/**
 * 示例：GUI属性控件
 * 演示：用 mars-gui 生成的属性面板演示滑动条/开关等表单控件，并联动地图交互（鼠标拖拽开关）
 * API：mars2d.Map、map.dragging.enable/disable
 * 要点：拖拽开关必须能双向启停，不能固定写死 false；亮度在 2D 地图中没有对应渲染参数，仅做控制台演示
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

// ========== 2. 清理（与 onMounted 对称）==========
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

// ========== 3. 面板交互方法 ==========
// 调整亮度 （演示滑动条）
export function updateBrightness(val) {
  console.log(val)
}

// 是否运行地图鼠标交互
export function enableMapMouseController(value) {
  // 用 Leaflet 的 dragging 处理器启停拖拽：setOptions({dragging}) 只在构造地图时生效，运行中改不会真正禁用拖拽
  if (value) {
    map.dragging.enable()
  } else {
    map.dragging.disable()
  }
}
