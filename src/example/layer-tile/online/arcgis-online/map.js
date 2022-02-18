import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  basemaps: [
    {
      name: "电子地图",
      type: "arcgis",
      url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
      chinaCRS: "GCJ02",
      show: true
    },
    {
      name: "卫星地图",
      type: "arcgis",
      url: "http://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
      chinaCRS: "GCJ02"
    },
    {
      name: "藏蓝地图",
      type: "arcgis",
      url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
      chinaCRS: "GCJ02"
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
