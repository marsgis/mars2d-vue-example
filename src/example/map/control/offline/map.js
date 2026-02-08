import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  minZoom: 0,
  maxZoom: 12,
  basemaps: [
    {
      pid: 10,
      name: "卫星地图",
      type: "xyz",
      icon: "img/basemaps/mapboxSatellite.png",
      url: "https://data.mars3d.cn/tile/img/{z}/{x}/{y}.jpg",
      minZoom: 0,
      maxZoom: 12,
      show: true
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  globalNotify(
    "提示：",
    `该示例目的演示交付的离线数据的效果：
    1) 包括0-12级影像底图(当前页面效果)，
    2) 包括其他所有示例的json等文件`,
    { placement: "topRight" }
  )
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
