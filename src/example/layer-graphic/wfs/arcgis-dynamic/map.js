import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: [31.847574, 117.281904],
  basemaps: [
    {
      name: "ArcGIS电子街道",
      icon: "img/basemaps/google_vec.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      show: true
    },
    {
      name: "ArcGIS影像",
      icon: "img/basemaps/esriWorldImagery.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    },
    {
      name: "ArcGIS NatGeo",
      icon: "img/basemaps/esriWorldStreetMap.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer"
    },
    {
      name: "蓝色底图",
      icon: "img/basemaps/bd-c-midnight.png",
      type: "arcgis",
      url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
      chinaCRS: mars2d.ChinaCRS.GCJ02
    },
    {
      name: "灰色底图",
      icon: "img/basemaps/bd-c-grayscale.png",
      type: "arcgis",
      url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer",
      chinaCRS: mars2d.ChinaCRS.GCJ02
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

  // 添加底图 [需要引用esri-leaflet插件]
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.ArcGisDynamicLayer({
    name: "合肥建筑物",
    url: "//server.mars2d.cn/arcgis/rest/services/mars/guihua/MapServer",
    popup: "all",
    highlight: {
      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
    },
    zIndex: 20
  })
  map.addLayer(layer)

  layer.on(mars2d.EventType.click, function (event) {
    console.log("单击了矢量数据，共" + event.graphics.length + "条", event)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
