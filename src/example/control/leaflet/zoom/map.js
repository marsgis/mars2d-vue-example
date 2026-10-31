import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let zoomControl

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 第一种添加控件方法
  // option.control = {
  //   zoom: { position: "bottomleft" }
  // }
  delete option.control
  return option
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 第二种添加控件方法
  zoomControl = L.control.zoom({ position: "bottomleft" })
  map.addControl(zoomControl)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && zoomControl) {
    map.removeControl(zoomControl)
    zoomControl = null
  }
  map = null
}
