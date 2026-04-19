import * as mars2d from "mars2d"

let map
let basemapOpacity = 1
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.container.style.backgroundImage = "url(./img/photo/logo.png)"

  map.on(mars2d.EventType.layerremove, function (event) {
    setTimeout(() => {
      map.basemap.opacity = basemapOpacity
    }, 100)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

export function opacityChange(opacity) {
  basemapOpacity = map.basemap.opacity = opacity / 100
}
