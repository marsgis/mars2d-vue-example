/**
 * 示例：简单线
 * 演示：随机取城市对生成 1000 条线，用 MapV 的 simple 绘制算法画出带发光效果的简单线
 * API：mars2d.layer.MapVLayer、map.addLayer
 * 要点：mapv 由示例框架按 example.json 的 libs 配置全局加载（代码里的 this.mapv 即 iframe window 上的 mapv）；城市中心来自 mapv 内置的 utilCityCenter 数据表，不请求外部接口；strokeStyle+shadowBlur 决定线的颜色和发光强度
 */
import * as mars2d from "mars2d"
// import mapv from "mars2d-mapv"

let map // mars2d.Map二维地图对象
let mapVLayer // 简单线 MapV 图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C" // 深色背景衬托发光线
  map.basemap = 2017 // 2017 是 config.json 中内置"蓝色地图"的 id
  map.setView([36.64, 108.15], 4) // Leaflet 的坐标数组顺序是 [纬度, 经度]

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
  let randomCount = 1000 // 1000 条线用于演示大量线叠加后的发光效果
  const data = []
  const citys = [
    "北京",
    "天津",
    "上海",
    "重庆",
    "石家庄",
    "太原",
    "呼和浩特",
    "哈尔滨",
    "长春",
    "沈阳",
    "济南",
    "南京",
    "合肥",
    "杭州",
    "南昌",
    "福州",
    "郑州",
    "武汉",
    "长沙",
    "广州",
    "南宁",
    "西安",
    "银川",
    "兰州",
    "西宁",
    "乌鲁木齐",
    "成都",
    "贵阳",
    "昆明",
    "拉萨",
    "海口"
  ]

  // 自定义数据
  while (randomCount--) {
    // 城市中心来自 mapv 内置的 utilCityCenter 数据表
    const cityCenter1 = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    const cityCenter2 = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    data.push({
      geometry: {
        type: "LineString",
        coordinates: [
          [cityCenter1.lng - 1 + Math.random() * 1, cityCenter1.lat - 1 + Math.random() * 1],
          [cityCenter2.lng - 1 + Math.random() * 1, cityCenter2.lat - 1 + Math.random() * 1]
        ]
      },
      count: 30 * Math.random()
    })
  }

  const dataSet = new this.mapv.DataSet(data)

  const options = {
    strokeStyle: "rgba(255, 250, 50, 0.3)",
    shadowColor: "rgba(255, 250, 50, 1)",
    shadowBlur: 20, // 线发光模糊半径（像素）
    lineWidth: 0.7, // 线宽单位像素
    draw: "simple"
  }
  mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
