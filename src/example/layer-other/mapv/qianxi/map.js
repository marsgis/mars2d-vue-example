/**
 * 示例：迁徙图
 * 演示：加载中国 GeoJSON 与城市迁徙数据，叠加"区域强度 + 城市点 + 城市文字 + 迁徙弧线 + 流动光点"5 个 MapVLayer
 * API：mars2d.layer.MapVLayer、mars2d.Util.fetchJson、map.addLayer
 * 要点：mapv 由示例框架按 example.json 的 libs 配置全局加载（代码里的 this.mapv 即 iframe window 上的 mapv）；用 utilCityCenter/utilCurve 从城市名生成经纬度与贝塞尔弧线；5 个图层靠 zIndex 控制叠放顺序（区域 < 城市点 < 文字 < 迁徙线 < 流动点）
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let mapVLayers = [] // 本示例创建的 MapV 图层（卸载时统一移除，动画随图层停止）

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C" // 深色背景衬托发光迁徙线
  map.basemap = 2017 // 2017 是 config.json 中内置"蓝色地图"的 id
  map.setView([33.468108, 112.939453], 5) // Leaflet 的坐标数组顺序是 [纬度, 经度]

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
    url: "http://data.mars2d.cn/file/geojson/mapvchina.json"
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
function showMapVLayer(geojson) {
  if (!map) {
    return
  }

  // 数据加载完成后再次设置视野（示例数据加载期间用户可能拖动过地图）
  map.setView([33.468108, 112.939453], 5)

  const geojsonOptions = {
    // intensity 按城市迁徙人数 count/max 在色带上取色
    gradient: {
      0: "rgba(55, 50, 250, 0.4)",
      1: "rgba(55, 50, 250, 1)"
    },
    max: 354551, // 数据中最大迁徙人数，用于强度归一化
    draw: "intensity"
  }

  // geoJSON 数据转成 MapV 的 DataSet
  let geojsonDataSet = this.mapv.geojson.getDataSet(geojson)

  const to = "北京"

  const qianxi = new this.mapv.DataSet([
    {
      from: "河北",
      count: 354551,
      to
    },
    {
      from: "天津",
      count: 97323,
      to
    },
    {
      from: "山东",
      count: 28664,
      to
    },
    {
      from: "山西",
      count: 16650,
      to
    },
    {
      from: "辽宁",
      count: 14379,
      to
    },
    {
      from: "河南",
      count: 10980,
      to
    },
    {
      from: "内蒙古自治区",
      count: 9603,
      to
    },
    {
      from: "江苏",
      count: 4536,
      to
    },
    {
      from: "上海",
      count: 3556,
      to
    },
    {
      from: "广东",
      count: 2600,
      to
    }
  ])

  const qianxiData = qianxi.get()

  const lineData = []
  const pointData = []
  const textData = []
  const timeData = []

  const citys = {}

  for (let i = 0; i < qianxiData.length; i++) {
    // 城市名转经纬度，数据来自 mapv 内置的 utilCityCenter 数据表
    const fromCenter = this.mapv.utilCityCenter.getCenterByCityName(qianxiData[i].from)
    const toCenter = this.mapv.utilCityCenter.getCenterByCityName(qianxiData[i].to)
    if (!fromCenter || !toCenter) {
      continue
    }
    citys[qianxiData[i].from] = qianxiData[i].count
    citys[qianxiData[i].to] = 100
    pointData.push({
      geometry: {
        type: "Point",
        coordinates: [fromCenter.lng, fromCenter.lat]
      }
    })
    pointData.push({
      geometry: {
        type: "Point",
        coordinates: [toCenter.lng, toCenter.lat]
      }
    })
    textData.push({
      geometry: {
        type: "Point",
        coordinates: [fromCenter.lng, fromCenter.lat]
      },
      text: qianxiData[i].from
    })
    textData.push({
      geometry: {
        type: "Point",
        coordinates: [toCenter.lng, toCenter.lat]
      },
      text: qianxiData[i].to
    })

    // 两点之间生成贝塞尔曲线坐标，作为迁徙弧线
    const curve = this.mapv.utilCurve.getPoints([fromCenter, toCenter])

    for (let j = 0; j < curve.length; j++) {
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: curve[j]
        },
        count: 1,
        time: j
      })
    }

    lineData.push({
      geometry: {
        type: "LineString",
        coordinates: curve
        // coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
      },
      count: 30 * Math.random()
    })
  }

  // filter 回调里给命中的省份要素写入 count 属性，供区域 intensity 色带使用
  const data = geojsonDataSet.get({
    filter: function (item) {
      if (!citys[item.name]) {
        return false
      }

      item.count = citys[item.name]
      return true
    }
  })
  geojsonDataSet = new this.mapv.DataSet(data)
  // 区域强度图层（最底层）
  const mapVLayer = new mars2d.layer.MapVLayer(geojsonOptions, geojsonDataSet)
  map.addLayer(mapVLayer)
  mapVLayers.push(mapVLayer)

  const textDataSet = new this.mapv.DataSet(textData)

  const textOptions = {
    draw: "text",
    font: "14px Arial",
    fillStyle: "white",
    shadowColor: "yellow",
    zIndex: 11, // 城市文字盖在城市点之上
    shadowBlur: 10
  }
  const textmapVLayer = new mars2d.layer.MapVLayer(textOptions, textDataSet)
  map.addLayer(textmapVLayer)
  mapVLayers.push(textmapVLayer)

  const lineDataSet = new this.mapv.DataSet(lineData)
  const lineOptions = {
    strokeStyle: "rgba(255, 250, 50, 0.8)",
    shadowColor: "rgba(255, 250, 50, 1)",
    shadowBlur: 20,
    lineWidth: 2,
    zIndex: 100, // 迁徙线盖在区域与城市点之上
    draw: "simple"
  }
  const linemapVLayer = new mars2d.layer.MapVLayer(lineOptions, lineDataSet)
  map.addLayer(linemapVLayer)
  mapVLayers.push(linemapVLayer)

  const pointOptions = {
    fillStyle: "rgba(254,175,3,0.7)",
    shadowColor: "rgba(55, 50, 250, 0.5)",
    shadowBlur: 10,
    size: 5,
    zIndex: 10, // 城市点在城市文字之下
    draw: "simple"
  }
  const pointDataSet = new this.mapv.DataSet(pointData)
  const pointmapVLayer = new mars2d.layer.MapVLayer(pointOptions, pointDataSet)
  map.addLayer(pointmapVLayer)
  mapVLayers.push(pointmapVLayer)

  const timeDataSet = new this.mapv.DataSet(timeData)
  const timeOptions = {
    fillStyle: "rgba(255, 250, 250, 0.5)",
    zIndex: 200, // 流动光点在最上层
    size: 2.5,
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 50
      },
      trails: 10,
      duration: 2
    },
    draw: "simple"
  }

  const timemapVLayer = new mars2d.layer.MapVLayer(timeOptions, timeDataSet)
  map.addLayer(timemapVLayer)
  mapVLayers.push(timemapVLayer)
}
