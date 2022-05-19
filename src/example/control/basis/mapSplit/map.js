import * as mars2d from "mars2d"
const L = mars2d.L

let map

// 合并属性参数，可覆盖config.json中的对应配置
export const mapOptions = {
  control: {
    layers: false
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance

  // 分屏对比
  const gaodeLayer = new mars2d.layer.GaodeLayer({ layer: "img_d" })
  map.addLayer(gaodeLayer)

  const osmLayer = new mars2d.layer.OsmLayer()
  map.addLayer(osmLayer)

  // 卷帘控件
  const control = new mars2d.control.MapSplit({
    leftLayer: gaodeLayer,
    rightLayer: osmLayer
  })
  map.addControl(control)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
