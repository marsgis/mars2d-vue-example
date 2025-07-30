import * as mars2d from "mars2d"

let map
let keyboardRoam

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 14,
  center: { lng: 117.289352, lat: 31.816386 }
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  keyboardRoam = new mars2d.thing.KeyboardRoam()
  map.addThing(keyboardRoam)

  keyboardRoam.on([mars2d.EventType.keydown, mars2d.EventType.keyup], function (event) {
    eventTarget.fire(event.type, { keyCode: event.originalEvent.keyCode })
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}


// 修改步长
export function changeSlider(val) {
  if (val) {
    keyboardRoam.moveStep = val
  }
}
