import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option = {
    crs: L.CRS.EPSG4326,
    zoom: 3,
    center: [30.234618, 119.713235]
  }
  return option
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

  // 添加控件
  L.control.zoom({ position: "bottomleft" }).addTo(map)
  L.control.scale({ metric: true, imperial: false }).addTo(map)
  // L.control.toolbar({ item: ["home", "location", "fullscreen"], position: "bottomleft" }).addTo(map);

  // 添加底图
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.WmtsLayer({
    name: "合肥市",
    type: "wmts",
    url: "http://shanxi.tianditu.gov.cn/service/SX_DOM/wmts",
    layer: "WD_DOM",
    style: "",
    format: "image/tile",
    tileMatrixSetID: "Matrix_WD_DOM_1",
    zOffset: 1
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
