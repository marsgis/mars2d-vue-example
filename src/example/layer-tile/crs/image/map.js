import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.IMAGE,
  zoom: -1,
  center: { lng: 500, lat: 500 },
  minZoom: -3,
  maxZoom: 2,
  control: {
    locationBar: {
      formatLength: 0,
      template: "<div>X: {lng}</div> <div>Y: {lat}</div>",
      style: { left: "10px", bottom: "0" }
    },
    layers: { position: "topleft" },
    zoom: { position: "bottomleft" }
  },
  basemaps: [
    {
      name: "-1层",
      type: "image",
      url: "img/shinei/B1.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/B1.png"
    },
    {
      name: "F1层",
      type: "image",
      url: "img/shinei/F1.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F1.png",
      show: true
    },
    {
      name: "F2层",
      type: "image",
      url: "img/shinei/F2.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F2.png"
    },
    {
      name: "F3层",
      type: "image",
      url: "img/shinei/F3.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F3.png"
    },
    {
      name: "F4层",
      type: "image",
      url: "img/shinei/F4.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F4.png"
    },
    {
      name: "F5层",
      type: "image",
      url: "img/shinei/F5.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F5.png"
    }
  ],
  operationallayers: []
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
