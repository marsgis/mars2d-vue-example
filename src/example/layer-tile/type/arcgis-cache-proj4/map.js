import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: {
    code: "EPSG:4527", // http://epsg.io/4527
    proj: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    resolutions: [396.87579375158754, 305.74872470578276, 152.87436235289138, 76.437179853526374],
    origin: [33876800, 10002100],
    bounds: L.bounds([39397376.21529983, 3811337.7700739773], [39553472.811626874, 3984005.5674397806])
  },
  zoom: 1,
  center: [35.325, 116.717], // center不是arcgis里面的值，此处正常标准经纬度就行
  minZoom: 0,
  maxZoom: 3,
  basemaps: [],
  control: {
    scale: true,
    locationBar: {
      template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>层级:{level}</div>"
    },
    zoom: { position: "bottomleft" },
    toolBar: { position: "bottomleft" }
  }
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

  // 添加底图
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.ArcGisCacheLayer({
    name: "山东某市",
    url: "http://data.mars2d.cn/arcgis_cache/shandongImg/_alllayers/{z}/{y}/{x}.png",
    upperCase: false
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
