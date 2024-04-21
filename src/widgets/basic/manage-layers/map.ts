/**
 * 图层管理
 * @copyright 火星科技 mars2d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map: mars2d.Map // 地图对象

export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars2d.Map): void {
  map = mapInstance // 记录首次创建的map
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted(): void {
  map = null
}

export function addLayer(layer: any) {
  map.addLayer(layer)
  layer.show = true
}

export function getLayers() {
  return map.getLayers({
    basemaps: true, // 是否取config.json中的basempas
    layers: true // 是否取config.json中的layers
  })
}

export function removeLayer(layer: any) {
  layer.show = false
  map.removeLayer(layer)
}

export function flyToLayer(layer) {
  if (layer.flyTo) {
    layer.flyTo()
  } else if (layer.getBounds) {
    map.flyToBounds(layer.getBounds())
  }
}
