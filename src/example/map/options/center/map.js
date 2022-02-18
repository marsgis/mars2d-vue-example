import * as mars2d from "mars2d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lng: 117.240601, lat: 31.827107 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // 1可以通过右键菜单"查看当前范围"来获取center参数后，拷贝到配置中

  // 2也可以通过下面方法获取center参数
  const viewOpt = map.getView()
  console.log(JSON.stringify(viewOpt))

  // 可以通过centerAt切换视角
  map.setView(viewOpt.center, viewOpt.zoom)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

export function changeView1() {
  map.setView({ lng: 116.391747, lat: 39.914152 }, 15)
}

export function changeView2() {
  map.setView({ lng: 86.851252, lat: 28.140562 }, 15)
}

export function changeView3() {
  map.setView({ lng: 110.091603, lat: 34.506415 }, 14)
}

export function changeView4() {
  map.setView({ lng: 115.876343, lat: 30.835904 }, 16)
}
