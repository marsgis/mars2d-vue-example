import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10,
  center: { lng: 117.233734, lat: 31.87989 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  eventTarget.fire("loadOK")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function addLayer(layer) {
  map.addLayer(layer)
}

export function removeLayer(layer, list) {
  const children = list.filter((item) => item.pid === layer.id)
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      map.removeLayer(children[i])
    }
  } else {
    map.removeLayer(layer)
  }
}

export function getLayers() {
  return map.getLayers({
    basemaps: true, // 是否取config.json中的basempas
    layers: true // 是否取config.json中的layers
  })
}
