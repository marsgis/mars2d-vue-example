/**
 * 示例：动态点
 * 演示：请求微博散点数据，用 MapVLayer 的 animation.time 动画绘制按时间闪烁的动态点
 * API：mars2d.layer.MapVLayer、mars2d.Util.fetchJson、map.addLayer
 * 要点：mapv 由示例框架按 example.json 的 libs 配置全局加载（代码里的 this.mapv 即 iframe window 上的 mapv）；animation.stepsRange 是参与动画的 time 值区间；数据坐标必须是 [经度, 纬度]
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
  map.setView([38.028658, 105.403119], 4) // Leaflet 的坐标数组顺序是 [纬度, 经度]

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
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/weibo2.json"
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

  const data = []
  for (let i = 0; i < rs[0].length; i++) {
    const geoCoord = rs[0][i].geoCoord
    data.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      },
      time: Math.random() * 10
    })
  }

  const dataSet = new this.mapv.DataSet(data)
  const options = {
    fillStyle: "rgba(255, 250, 50, 0.6)",
    // shadowColor: 'rgba(255, 250, 50, 0.5)',
    // shadowBlur: 3,
    updateCallback: function (time) {
      time = time.toFixed(2)
    },
    size: 3, // 点大小（像素）
    draw: "simple",
    animation: {
      type: "time",
      // time 字段在 0~10 之间随机，动画按这个区间分帧推进
      stepsRange: {
        start: 0,
        end: 10
      },
      trails: 1,
      duration: 6
    }
  }
  const mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
  mapVLayers.push(mapVLayer)
}
