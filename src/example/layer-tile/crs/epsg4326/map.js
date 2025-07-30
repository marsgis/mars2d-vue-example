import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.EPSG4326,
  zoom: 10,
  center: { lng: 117.317408, lat: 31.716156 },
  basemaps: [
    {
      type: "group",
      name: "国家天地图",
      layers: [
        { type: "tdt", layer: "vec_d", crs: "EPSG:4326", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "vec_z", crs: "EPSG:4326", key: mars2d.Token.tiandituArr }
      ],
      show: true
    },
    {
      name: "wms地图",
      type: "wms",
      url: "http://vmap0.tiles.osgeo.org/wms/vmap0",
      layers: "basic",
      show: true,
      format: "image/jpeg"
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
