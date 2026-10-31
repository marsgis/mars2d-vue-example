import * as mars2d from "mars2d"
import { Geolocation } from "./Geolocation.js"

let map // mars2d.Map二维地图对象
let geolocationControl

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option.control = {}
  return option
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const geolocation = new Geolocation({
    insertIndex: 1 // 插入的位置顺序, 1是home按钮后面
  })
  geolocationControl = geolocation
  map.addControl(geolocation)

  // 手动调用，开始定位
  geolocation.startTracking()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (geolocationControl) {
    // 定位控件会在图层上添加位置点，需一并清除
    geolocationControl.clearLocationPoint()
    if (map) {
      map.removeControl(geolocationControl)
    }
    geolocationControl = null
  }
  map = null
}
