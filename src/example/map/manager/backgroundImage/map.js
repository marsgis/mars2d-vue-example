import * as mars2d from "mars2d"

let map
let basemapOpacity = 1
let layerRemoveTimer

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // iframe 文档位于 /temp/ 下，背景图在上一级的 img 目录；用相对路径，部署到子目录也不会失效
  map.container.style.backgroundImage = "url(../img/photo/logo.png)"

  map.on(mars2d.EventType.layerremove, onLayerRemove)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  if (map) {
    map.off(mars2d.EventType.layerremove, onLayerRemove)
  }
  clearTimeout(layerRemoveTimer)
  map = null
}

function onLayerRemove() {
  clearTimeout(layerRemoveTimer)
  layerRemoveTimer = setTimeout(() => {
    // 底图被移除时 map.basemap 可能已为空，需判空
    if (map && map.basemap) {
      map.basemap.opacity = basemapOpacity
    }
  }, 100)
}

export function opacityChange(opacity) {
  basemapOpacity = opacity / 100
  if (map && map.basemap) {
    map.basemap.opacity = basemapOpacity
  }
}
