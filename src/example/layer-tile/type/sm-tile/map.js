import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: "EPSG:4326",
  zoom: 3,
  center: { lng: 108.882931, lat: 33.75 },
  // 方式1：在创建地图前的参数中配置
  basemaps: [
    {
      name: "超图瓦片",
      type: "sm_tile",
      url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World",
      show: true
    },
    {
      name: "国家分布",
      type: "sm_tile",
      url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World%20Map",
      show: false
    },
    {
      name: "北京航线",
      type: "sm_tile",
      url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World_AirLine_Part",
      show: false
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

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  // const layer = new mars2d.layer.SmTileLayer({
  //   url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World"
  // })
  // map.addLayer(layer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
