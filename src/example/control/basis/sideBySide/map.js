import * as mars2d from "mars2d"
const L = mars2d.L

let map

// 合并属性参数，可覆盖config.json中的对应配置
const mapOptions = {
  control: {
    scale: true,
    locationBar: {
      crs: "CGCS2000_GK_Zone_3",
      template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
    },
    zoom: { position: "bottomright" },
    toolBar: { position: "bottomright" }
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

  L.control.sideBySide(gaodeLayer, osmLayer).addTo(map)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
