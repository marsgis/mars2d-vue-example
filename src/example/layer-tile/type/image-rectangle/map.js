import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

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

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const tileLayer = new mars2d.layer.ImageLayer({
    name: "中科大-西区",
    url: "//data.mars2d.cn/file/img/zkd-xq.png",
    rectangle: { xmin: 117.245648, xmax: 117.254431, ymin: 31.836891, ymax: 31.843413 }
  })
  map.addLayer(tileLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
