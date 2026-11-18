/**
 * 示例：本地单张图片(区域影像)
 * 演示：用 ImageLayer + rectangle 把本地单张影像精确贴到指定经纬度矩形范围，并对比"地图参数配置"与"代码添加"两种方式
 * API：mars2d.layer.ImageLayer（rectangle 参数）、map.addLayer、operationallayers
 * 要点：rectangle 的 xmin/xmax/ymin/ymax 是经纬度范围，直接决定图片的贴图位置与大小；方式1（mapOptions.operationallayers 配置，show:true 才默认显示）与方式2（onMounted 现场 new）等价；不传 crs 时图层按地图坐标系处理，同一批区域影像要与底图坐标系一致
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 16,
  center: { lng: 117.25692, lat: 31.840214 },
  operationallayers: [
    // 方式1：在创建地图前的参数中配置
    {
      name: "中科大-东区",
      type: "image",
      url: "//data.mars2d.cn/file/img/zkd-dq.png",
      rectangle: { xmin: 117.259691, xmax: 117.267778, ymin: 31.834432, ymax: 31.84387 },
      show: true
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars2d.layer.ImageLayer({
    name: "中科大-西区",
    url: "//data.mars2d.cn/file/img/zkd-xq.png",
    rectangle: { xmin: 117.245648, xmax: 117.254431, ymin: 31.836891, ymax: 31.843413 }
  })
  map.addLayer(tileLayer)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && tileLayer) {
    map.removeLayer(tileLayer)
    tileLayer = null
  }
  map = null
}
