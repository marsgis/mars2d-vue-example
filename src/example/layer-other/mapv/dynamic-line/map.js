/**
 * 示例：动态轨迹
 * 演示：请求车辆轨迹文本数据，把 EPSG3857 米坐标转成经纬度后交给 MapV 的 DataSet，用两个 MapVLayer 叠加绘制轨迹线与流动光点动画
 * API：mars2d.layer.MapVLayer、mars2d.Util.sendAjax、map.addLayer
 * 要点：mapv 由示例框架按 example.json 的 libs 配置全局加载（代码里的 this.mapv 即 iframe window 上的 mapv）；数据是 EPSG3857 米坐标，必须用 L.CRS.EPSG3857.projection 反算成经纬度；动画由 options.animation 的 time 轴驱动，移除图层即停止
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let mapVLayers = [] // 本示例创建的 MapV 图层（卸载时统一移除，动画随图层停止）

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C" // 深色背景衬托发光轨迹
  map.basemap = 2017 // 2017 是 config.json 中内置"蓝色地图"的 id
  map.setView([30.41, 114.32], 11) // Leaflet 的坐标数组顺序是 [纬度, 经度]

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
  return mars2d.Util.sendAjax({ url: "http://data.mars2d.cn/file/apidemo/wuhan-car.txt" })
    .then(function (rs) {
      if (!map) {
        return // 示例已卸载，丢弃晚到的请求结果
      }
      rs = rs.data.split("\n")
      showMapVLayer(rs)
    })
    .catch(function (error) {
      console.log(error)
    })
}

// ========== 4. MapV 图层绘制 ==========
function showMapVLayer(rs) {
  if (!map) {
    return
  }

  const data = []
  const timeData = []

  // leaflet只识别经纬度坐标，需要将数据中的米坐标转成经纬度坐标
  const projection = L.CRS.EPSG3857.projection

  for (let i = 0; i < rs.length; i++) {
    const item = rs[i].split(",")
    const coordinates = []
    if (item.length < 2) {
      continue
    }
    for (let j = 0; j < item.length; j += 2) {
      // 需要将数据中的米坐标转成经纬度坐标
      const latLng = projection.unproject(L.point([item[j], item[j + 1]]))
      coordinates.push([latLng.lng, latLng.lat])
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: [latLng.lng, latLng.lat]
        },
        count: 1,
        time: j
      })
    }
    data.push({
      geometry: {
        type: "LineString",
        coordinates
      }
    })
  }

  const dataSet1 = new this.mapv.DataSet(data)

  const options1 = {
    strokeStyle: "rgba(53,57,255,0.5)",
    shadowColor: "rgba(53,57,255,0.2)",
    shadowBlur: 3,
    lineWidth: 3.0,
    draw: "simple"
  }
  // 线图层
  const mapVLayer = new mars2d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer)
  mapVLayers.push(mapVLayer)

  const dataSet2 = new this.mapv.DataSet(timeData)
  const options2 = {
    fillStyle: "rgba(255, 250, 250, 0.2)",
    globalCompositeOperation: "lighter",
    size: 1.5,
    animation: {
      // stepsRange 是参与动画的 time 值区间，trails 是拖尾帧数，duration 是单次播放时长（秒）
      stepsRange: {
        start: 0,
        end: 100
      },
      trails: 3,
      duration: 5
    },
    draw: "simple"
  }
  // 动态轨迹图层
  const mapVLayer2 = new mars2d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer2)
  mapVLayers.push(mapVLayer2)
}
