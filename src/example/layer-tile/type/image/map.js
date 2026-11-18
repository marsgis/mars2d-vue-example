/**
 * 示例：本地单张图片
 * 演示：用 ImageLayer 把一张普通图片按经纬度矩形范围铺到地图上，并对比"地图参数配置"与"代码添加"两种方式
 * API：mars2d.layer.ImageLayer、map.addLayer、map.removeLayer
 * 要点：mapOptions.crs 设为 EPSG:4326，因为示例图片就是 4326 投影（底图天地图也用 4326），图片与地图 CRS 不一致会导致位置偏移；ImageLayer 的 rectangle 决定图片贴图范围；worldCopyJump:true 时平移到世界副本会自动跳回原始副本，避免矢量/图片图层在副本中消失
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
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

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

// ========== 3. 面板交互方法 ==========
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
  if (map && tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 面板可能已点过「添加图层」，卸载时先移除再置空 map
  removeLayer()
  map = null
}
