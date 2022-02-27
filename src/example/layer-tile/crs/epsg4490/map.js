import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 8,
  center: { lng: 116.917267, lat: 36.689627 },
  crs: mars2d.CRS.EPSG4490,
  basemaps: [
    {
      type: "group",
      name: "国家天地图",
      layers: [
        { type: "tdt", layer: "vec_d", crs: "EPSG:4490", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "vec_z", crs: "EPSG:4490", key: mars2d.Token.tiandituArr }
      ],
      show: true
    }
  ],
  operationallayers: [
    {
      name: "山东天地图",
      type: "xyz",
      show: true,
      url: "http://www.sdmap.gov.cn/tileservice/SDPubMap?layer=SDPubMap&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}"
    }
  ]
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
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
