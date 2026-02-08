import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option = {
    crs: L.CRS.EPSG4326,
    zoom: 10,
    center: { lng: 117.217028, lat: 31.861805 },
    control: option.control,

    // 方式1：在创建地球前的参数中配置
    basemaps: [
      {
        name: "国家天地图",
        type: "group",
        layers: [
          { type: "tdt", layer: "vec_d", crs: "EPSG:4326", key: mars2d.Token.tiandituArr },
          { type: "tdt", layer: "vec_z", crs: "EPSG:4326", key: mars2d.Token.tiandituArr }
        ],
        show: true
      },
      {
        name: "山西天地图",
        icon: "img/basemaps/blackMarble.png",
        type: "wmts",
        url: "http://shanxi.tianditu.gov.cn/service/SX_DOM/wmts",
        layer: "WD_DOM",
        format: "image/tile",
        tileMatrixSetID: "Matrix_WD_DOM_1",
        crs: "EPSG:4490",
        show: false
      },
      {
        name: "单张图片",
        icon: "img/basemaps/offline.png",
        type: "image",
        url: "https://data.mars3d.cn/file/img/world/world.jpg",
        show: false
      }
    ]
  }
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.WmtsLayer({
    url: "//server.mars3d.cn/geoserver/gwc/service/wmts",
    layer: "mars:hfgh",
    format: "image/png",
    tileMatrixSetID: "EPSG:4326", // 对应wmts请求的 tilematrixSet
    tilematrixBefore: "EPSG:4326:", // 对应wmts请求的 tilematrix
    crs: "EPSG:4326",
    alpha: 0.8,

    // 单击交互的参数
    pickFeaturesUrl: "//server.mars3d.cn/geoserver/mars/wms",
    popup: "all",
    highlight: {
      fill: true,
      fillColor: "#ffff00",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
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
