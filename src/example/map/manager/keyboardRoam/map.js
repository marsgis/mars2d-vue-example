/**
 * 示例：键盘漫游
 * 演示：用 KeyboardRoam 对象实现键盘 W/A/S/D 平移、Q/E 缩放的地图漫游，并把按键状态转发给面板
 * API：mars2d.thing.KeyboardRoam、map.addThing、eventTarget
 * 要点：moveStep 单位是米（默认 10），面板滑动条改的就是它；漫游的 keydown/keyup 由地图键盘事件透传，面板按原始 keyCode 高亮对应按键
 */
import * as mars2d from "mars2d"

let map
let keyboardRoam

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 14,
  center: { lng: 117.289352, lat: 31.816386 }
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  keyboardRoam = new mars2d.thing.KeyboardRoam()
  map.addThing(keyboardRoam)

  // 把漫游对象内部的键盘事件转抛给面板（面板据此高亮对应按键）
  keyboardRoam.on([mars2d.EventType.keydown, mars2d.EventType.keyup], function (event) {
    eventTarget.fire(event.type, { keyCode: event.originalEvent.keyCode })
  })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (keyboardRoam) {
    keyboardRoam.off() // 解绑本示例注册的 keydown/keyup 转发监听
    if (map) {
      // 从地图移除并销毁，内部会解绑 KeyboardRoam 注册在地图上的键盘监听
      map.removeThing(keyboardRoam, true)
    }
    keyboardRoam = null
  }
  if (map) {
    map.destroy()
    map = null
  }
}

// ========== 3. 面板交互方法 ==========
// 修改步长
export function changeSlider(val) {
  if (val) {
    keyboardRoam.moveStep = val
  }
}
