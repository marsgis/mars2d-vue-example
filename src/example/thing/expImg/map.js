import * as mars2d from "mars2d"

let map
let expImg

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

export const mapOptions = {
  zoom: 13,
  center: { lng: 117.238884, lat: 31.84417 }
}
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  expImg = new mars2d.thing.ExpImg()
  map.addThing(expImg)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

export function showMapImg() {
  expImg.expAll({
    download: false,
    calllback: function (base64) {
      // 回调
      eventTarget.fire("loadOk", { base64 })
    }
  })
}

export function downLoad() {
  expImg.expAll()
}

export function downLoad2() {
  expImg.expByDraw()
}
