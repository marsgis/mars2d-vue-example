import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
let tileLayer // 叠加的图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.EPSG4326, // 因为演示的图片是4326投影的
  zoom: 1,
  center: { lng: 69.567463, lat: 19.486635 },
  minZoom: 0,
  maxZoom: 10,
  worldCopyJump: true,
  basemaps: [
    {
      type: "group",
      name: "国家天地图",
      layers: [
        { type: "tdt", layer: "vec_d", crs: "EPSG:4326", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "vec_z", crs: "EPSG:4326", key: mars2d.Token.tiandituArr }
      ],
      show: true
    }
  ],
  // 方式1：在创建地图前的参数中配置
  operationallayers: [
    {
      name: "单张图片",
      icon: "img/basemaps/bingmap.png",
      type: "image",
      url: "//data.mars2d.cn/file/img/world/world.jpg",
      opacity: 0.5, // 方便对比
      crs: mars2d.CRS.EPSG4326,
      show: true
    },
    {
      name: "夜晚图片",
      icon: "img/basemaps/blackMarble.png",
      type: "image",
      url: "//data.mars2d.cn/file/img/world/night.jpg"
    },
    {
      name: "蓝色底图",
      icon: "img/basemaps/bd-c-midnight.png",
      type: "image",
      url: "//data.mars2d.cn/file/img/world/blue.jpg"
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

export function addLayer() {
  removeLayer()

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars2d.layer.ImageLayer({
    url: "//data.mars2d.cn//file/img/radar/201906211112.PNG",
    zIndex: 999, // 使该图层处于最上层
    rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
    alpha: 0.7
  })
  map.addLayer(tileLayer)
}

export function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
