/**
 * 示例：SmallTooltip 鼠标小提示窗
 * 演示：监听地图 mousemove，用 map.openSmallTooltip 在鼠标位置跟随显示简易小提示窗
 * API：map.openSmallTooltip、map.closeSmallTooltip、map.smallTooltip.enabled
 * 要点：传入的位置是屏幕坐标（containerPoint），不是经纬度；SmallTooltip 由地图创建并常驻，关闭用 closeSmallTooltip；面板勾选框通过公开属性 enabled 控制显示，关闭时会自动隐藏
 */
import * as mars2d from "mars2d"

let map

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // smallTooltip是一种简易的tooltip，目前标绘中用到的就是smallTooltip

  // 关闭tooltip
  map.closeSmallTooltip()

  map.on(mars2d.EventType.mousemove, onMapMouseMove)
}

// ========== 2. 事件与交互 ==========
function onMapMouseMove(event) {
  map.openSmallTooltip(event.containerPoint, "可以放任意html信息")
}

// ========== 3. 面板交互方法 ==========
// 启用/禁用（面板勾选框调用；map 已卸载时直接忽略）
export function enabledSmallTooltip(enabled) {
  if (map) {
    map.smallTooltip.enabled = enabled
  }
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.off(mars2d.EventType.mousemove, onMapMouseMove)
    map.closeSmallTooltip()
  }
  map = null
}
