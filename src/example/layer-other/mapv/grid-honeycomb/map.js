import * as mars2d from "mars2d"

let map
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 4,
  center: { lng: 104.042591, lat: 46.976438 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.basemap = 2017 // 切换到蓝色底图

  showMapVLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

function showMapVLayer() {
  // 构造数据
  const latlngs = []
  const data = []
  let randomCount = 699
  while (randomCount--) {
    const point = randomLatLng() // js/randomLatLng.js
    latlngs.push(point)

    data.push({
      geometry: { type: "Point", coordinates: [point.lng, point.lat] },
      count: 30 * Math.random()
    })
  }
  map.fitBounds(latlngs)

  const options = {
    fillStyle: "rgba(55, 50, 250, 0.8)",
    shadowColor: "rgba(255, 250, 50, 1)",
    shadowBlur: 20,
    max: 100,
    size: 50,
    label: {
      show: true,
      fillStyle: "white"
    },
    globalAlpha: 0.5,
    gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
    draw: "honeycomb"
  }
  const dataSet = new mapv.DataSet(data)

  // 创建MapV图层
  const mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
