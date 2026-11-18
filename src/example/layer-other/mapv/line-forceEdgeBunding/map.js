/**
 * 示例：强边界图
 * 演示：用 mapv 的 utilForceEdgeBundling 把 500 条城市间的边捆绑成"强边界"曲线，再叠加一层流动光点动画
 * API：mars2d.layer.MapVLayer、map.addLayer
 * 要点：mapv 由示例框架按 example.json 的 libs 配置全局加载（代码里的 this.mapv 即 iframe window 上的 mapv）；node_data 的键必须是字符串 id，edge_data 的 source/target 引用它；城市中心来自 mapv 内置的 utilCityCenter 数据表，不请求外部接口
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

  map.container.style.backgroundColor = "#11243C" // 深色背景衬托发光曲线
  map.basemap = 2017 // 2017 是 config.json 中内置"蓝色地图"的 id
  map.setView([36.64, 108.15], 5) // Leaflet 的坐标数组顺序是 [纬度, 经度]

  showMapVLayer()
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
  mapVLayers = []
  map = null
}

// ========== 3. MapV 图层绘制 ==========
function showMapVLayer() {
  const randomCount = 500 // 500 条随机边：捆绑计算量与视觉效果比较均衡

  const node_data = {
    // node_data 的键是字符串 id，下面 edge_data 的 source/target 按这个 id 引用
    0: { x: 108.154518, y: 36.643346 },
    1: { x: 121.485124, y: 31.235317 }
  }

  const edge_data = [{ source: "1", target: "0" }]

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
  for (let i = 1; i < randomCount; i++) {
    // 城市中心来自 mapv 内置的 utilCityCenter 数据表
    const cityCenter = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    node_data[i] = {
      x: cityCenter.lng - 5 + Math.random() * 10,
      y: cityCenter.lat - 5 + Math.random() * 10
    }
    edge_data.push({ source: ~~(i * Math.random()), target: "0" })
  }

  // 把相近的边捆绑成一股，形成强边界（力导向边捆绑）效果
  const fbundling = this.mapv.utilForceEdgeBundling().nodes(node_data).edges(edge_data)

  const results = fbundling()

  const data = []
  const timeData = []

  for (let i = 0; i < results.length; i++) {
    const line = results[i]
    const coordinates = []
    for (let j = 0; j < line.length; j++) {
      coordinates.push([line[j].x, line[j].y])
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: [line[j].x, line[j].y]
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
  // 创建MapV图层
  const dataSet1 = new this.mapv.DataSet(data)
  const options1 = {
    strokeStyle: "rgba(55, 50, 250, 0.3)",
    globalCompositeOperation: "lighter",
    shadowColor: "rgba(55, 50, 250, 0.5)",
    shadowBlur: 10,
    methods: {
      click: function (item) {
        console.log("点击了mapv图层", item)
      }
    },
    lineWidth: 1.0,
    draw: "simple"
  }

  const mapVLayer = new mars2d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer)
  mapVLayers.push(mapVLayer)

  const dataSet2 = new this.mapv.DataSet(timeData)
  const options2 = {
    fillStyle: "rgba(255, 250, 250, 0.9)",
    globalCompositeOperation: "lighter",
    size: 1.5,
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 100
      },
      trails: 1,
      duration: 5
    },
    draw: "simple"
  }

  // 创建流动光点图层
  const mapVLayer2 = new mars2d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer2)
  mapVLayers.push(mapVLayer2)
}
