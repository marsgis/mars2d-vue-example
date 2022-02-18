import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加底图 [需要引用esri-leaflet插件]
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.ArcGisFeatureLayer({
    name: "合肥市",
    url: "http://server.mars2d.cn/arcgis/rest/services/mars/hefei/MapServer/20",
    popup: "all",
    symbol: {
      styleOptions: {
        iconUrl: "img/marker/fx1.png",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      }
    }
  })
  map.addLayer(layer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
