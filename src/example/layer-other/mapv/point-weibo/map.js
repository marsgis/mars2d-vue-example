/**
 * 示例：微博
 * 演示：请求微博签到数据，分 4 个 MapVLayer 叠加展示大数据的点分布（底色点 + 高亮点 + 白色点 + 动态闪烁点）
 * API：mars2d.layer.MapVLayer、mars2d.Util.fetchJson、map.addLayer
 * 要点：mapv 由示例框架按 example.json 的 libs 配置全局加载（代码里的 this.mapv 即 iframe window 上的 mapv）；数据量很大，加载慢/卡顿属正常现象（代码已用 bigData 模式渲染）；动画由 options.animation 的 time 轴驱动
 */
import * as mars2d from "mars2d"
// import mapv from "mars2d-mapv"

let map // mars2d.Map二维地图对象
let mapVLayers = [] // 本示例创建的 MapV 图层（卸载时统一移除，动画随图层停止）

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C" // 深色背景衬托发光点
  map.basemap = 2017 // 2017 是 config.json 中内置"蓝色地图"的 id
  map.setView([38.028658, 105.403119], 5) // Leaflet 的坐标数组顺序是 [纬度, 经度]

  getJsonData()
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // MapV 的动画在图层内部持续运行，必须移除图层才会停止
  if (map) {
    mapVLayers.forEach((layer) => map.removeLayer(layer))
  }
  // 置空引用：异步请求若在卸载后才返回，showMapVLayer 靠 map 判断示例已销毁
  mapVLayers = []
  map = null
}

// ========== 3. 数据加载 ==========
function getJsonData() {
  globalMsg("数据量较大，可能会卡顿，正在加载中请耐心等待......")
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/weibo.json"
  })
    .then((data) => {
      if (!map) {
        return // 示例已卸载，丢弃晚到的请求结果
      }
      showMapVLayer(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

// ========== 4. MapV 图层绘制 ==========
function showMapVLayer(rs) {
  if (!map) {
    return
  }

  const data1 = []
  const data2 = []
  const data3 = []
  for (let i = 0; i < rs[0].length; i++) {
    const geoCoord = rs[0][i].geoCoord
    data1.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      }
    })
  }

  for (let i = 0; i < rs[1].length; i++) {
    const geoCoord = rs[1][i].geoCoord
    data2.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      },
      time: Math.random() * 10
    })
  }

  for (let i = 0; i < rs[2].length; i++) {
    const geoCoord = rs[2][i].geoCoord
    data3.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      }
    })
  }

  const dataSet = new this.mapv.DataSet(data1)
  const options = {
    fillStyle: "rgba(200, 200, 0, 0.8)",
    bigData: "Point", // 大数据模式：MapV 用更省内存的点渲染，适合几十万以上的数据
    size: 0.7,
    draw: "simple"
  }
  const mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
  mapVLayers.push(mapVLayer)

  const dataSet4 = new this.mapv.DataSet(data2)
  const options4 = {
    fillStyle: "rgba(255, 250, 0, 0.8)",
    size: 0.7,
    bigData: "Point",
    draw: "simple"
  }
  const mapVLayer2 = new mars2d.layer.MapVLayer(options4, dataSet4)
  map.addLayer(mapVLayer2)
  mapVLayers.push(mapVLayer2)

  const dataSet2 = new this.mapv.DataSet(data3)
  const options2 = {
    fillStyle: "rgba(255, 250, 250, 0.6)",
    size: 0.7,
    bigData: "Point",
    draw: "simple"
  }
  const mapVLayer3 = new mars2d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer3)
  mapVLayers.push(mapVLayer3)

  // 动态闪烁点：time 在 0~10 之间随机，动画按这个区间分帧推进
  const dataSet3 = new this.mapv.DataSet(data2)
  const options3 = {
    fillStyle: "rgba(255, 250, 250, 0.9)",
    size: 1.1,
    draw: "simple",
    bigData: "Point",
    animation: {
      stepsRange: {
        start: 0,
        end: 10
      },
      trails: 1,
      duration: 6
    }
  }

  const mapVLayer4 = new mars2d.layer.MapVLayer(options3, dataSet3)
  map.addLayer(mapVLayer4)
  mapVLayers.push(mapVLayer4)
}
