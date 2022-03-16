import * as mars2d from "mars2d"
import { Geolocation } from "./Geolocation.js"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option.control = {}
  return option
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const geolocation = new Geolocation({
    insertIndex: 1 // 插入的位置顺序, 1是home按钮后面
  })
  map.addControl(geolocation)

  // 手动调用，开始定位
  geolocation.startTracking()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
