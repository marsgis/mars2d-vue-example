/**
 * 示例：方格图
 * 演示：在中国境内随机取 300 个点，交给 MapV 的 grid 绘制算法渲成方格图，并 fitBounds 到数据范围
 * API：mars2d.layer.MapVLayer、map.fitBounds、map.addLayer
 * 要点：randomLatLng 由 example.json 的 resources 以经典脚本加载（全局函数）；draw 决定 MapV 的绘制算法（honeycomb/grid/simple/intensity）；gradient 的键是 0~1 的归一化数值
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let mapVLayer // 方格图 MapV 图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C" // 深色背景衬托方格发光色
  map.basemap = 2017 // 2017 是 config.json 中内置"蓝色地图"的 id

  showMapVLayer()
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // MapV 图层挂在地图上，卸载时移除，避免下次运行示例时残留
  if (map && mapVLayer) {
    map.removeLayer(mapVLayer)
  }
  mapVLayer = null
  map = null
}

// ========== 3. MapV 图层绘制 ==========
function showMapVLayer() {
  // 构造数据
  const latlngs = []
  const data = []
  let randomCount = 300 // 300 个随机点：方格不要太密，便于观察单个格子
  while (randomCount--) {
    const point = randomLatLng() // randomLatLng 是 example.json resources 加载的全局函数（内部用 turf 判断点是否在中国境内）
    latlngs.push(point)

    data.push({
      geometry: { type: "Point", coordinates: [point.lng, point.lat] },
      count: 30 * Math.random()
    })
  }
  map.fitBounds(latlngs) // 随机点铺满中国区域，fit 到数据范围作为初始视野

  const dataSet = new mapv.DataSet(data)
  const options = {
    fillStyle: "rgba(55, 50, 250, 0.8)",
    shadowColor: "rgba(255, 250, 50, 1)",
    shadowBlur: 20,
    size: 40,
    globalAlpha: 0.5,
    label: {
      show: true,
      fillStyle: "white"
      // shadowColor: 'yellow',
      // font: '20px Arial',
      // shadowBlur: 10,
    },
    // gradient 的键是 0~1 的权重，按数据值线性插值取色
    gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
    draw: "grid"
  }

  // 创建MapV图层
  mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
