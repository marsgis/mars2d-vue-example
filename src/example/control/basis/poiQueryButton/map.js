import * as mars2d from "mars2d"
import { PoiQueryButton } from "./PoiQueryButton"

let map // mars2d.Map三维地图对象

export const mapOptions = {
  scene: {
    center: { lat: 31.805875, lng: 117.237115, alt: 11874, heading: 1, pitch: -69 }
  },
  control: {
    geocoder: false
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const poiQueryButton = new PoiQueryButton({
    insertIndex: 0 // 插入的位置顺序
  })
  map.addControl(poiQueryButton)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
