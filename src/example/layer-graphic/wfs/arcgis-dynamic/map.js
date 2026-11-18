/**
 * 示例：ArcGIS MapServer动态服务
 * 演示：用 mars2d.layer.ArcGisDynamicLayer 以动态出图（export map）方式加载 ArcGIS MapServer 服务，单击要素时走 identify 查询并高亮，同时输出查询到的要素数量
 * API：mars2d.layer.ArcGisDynamicLayer（highlight/popup/click）、map.addLayer
 * 要点：需要 example.json 里 libs: mars2d-esri 的 ESRI 插件；highlight 要写在构造参数里（SDK 内部从 options.highlight 读取高亮样式）；zIndex 控制叠加层级，动态出图整层是图片、单要素不能单独改样式
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let dynamicLayer // ArcGIS 动态服务图层（onUnmounted 需移除）

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
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      // 示例故意把国外 ArcGIS 底图声明为 GCJ02 以演示纠偏；实际项目按底图真实坐标系填写（ArcGIS 通常不加）
      chinaCRS: mars2d.ChinaCRS.GCJ02,
      // 给底图整体染色，做成蓝色/灰色风格，突出上层业务数据
      customColor: "#11243C"
    },
    {
      name: "灰色底图",
      icon: "img/basemaps/bd-c-grayscale.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      chinaCRS: mars2d.ChinaCRS.GCJ02,
      customColor: "#575757"
    }
  ]
}

// 事件对象，用于抛出事件给vue（本示例没有需要抛给面板的事件，保留以统一各示例结构）
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加底图 [需要引用esri-leaflet插件]
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  dynamicLayer = new mars2d.layer.ArcGisDynamicLayer({
    name: "合肥建筑物",
    url: "//server.mars2d.cn/arcgis/rest/services/mars/guihua/MapServer",
    popup: "all",
    // 单击/查询到的要素用该样式画在临时高亮图层上（动态出图本身是图片，无法单独改要素样式）
    highlight: {
      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
    },
    // 压在其他叠加图层上方
    zIndex: 20
  })
  map.addLayer(dynamicLayer)

  dynamicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了矢量数据，共" + event.graphics.length + "条", event)
  })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (dynamicLayer) {
    // 移除图层会同时释放它的临时高亮图层与地图事件；onUnmounted 里 map 可能已被置空，需判空
    if (map) {
      map.removeLayer(dynamicLayer)
    }
    dynamicLayer = null
  }
  map = null
}
