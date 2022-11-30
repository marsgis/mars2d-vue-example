import * as mars2d from "mars2d"
const L = mars2d.L

let map

// 合并属性参数，可覆盖config.json中的对应配置
export const mapOptions = {
  basemaps: [],
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

  const gaodeLayer2 = new mars2d.layer.GaodeLayer({ layer: "img_z" })
  map.addLayer(gaodeLayer2)

  const tdtLayer = new mars2d.layer.TdtLayer({ layer: "img_d" })
  map.addLayer(tdtLayer)

  // 卷帘控件
  const control = new mars2d.control.MapSplit({
    leftLayer: [gaodeLayer, gaodeLayer2],
    rightLayer: tdtLayer
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
