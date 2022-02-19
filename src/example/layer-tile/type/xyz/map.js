import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option = {
    zoom: 4,
    center: [33.027088, 109.467773]
  }
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加控件
  L.control.zoom({ position: "bottomleft" }).addTo(map)
  L.control.scale({ metric: true, imperial: false }).addTo(map)

  // 添加底图
  const tileLayer = new mars2d.layer.TileLayer({
    type: "tile",
    url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
  })
  map.addLayer(tileLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
