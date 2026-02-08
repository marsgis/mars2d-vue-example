import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 117.228088, lat: 31.98811 }
  // control: {
  //   baseLayerPicker: false,
  // },
  // basemaps: [],
  // layers: [],
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 安徽省卫星底图
  const tileLayer = new mars2d.layer.TileLayer({
    name: "安徽省卫星",
    url: "https://data.mars3d.cn/tile/anhui/{z}/{x}/{y}.png",
    minZoom: 1,
    maxZoom: 12,
    rectangle: { xmin: 114.811691, xmax: 119.703609, ymin: 29.35597, ymax: 34.698585 }
  })
  map.addLayer(tileLayer, true)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
