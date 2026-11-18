/**
 * 示例：大迁徙图
 * 演示：解析文本格式的省市迁出/迁入数据，绘制强度迁徙线并叠加流动光点动画
 * API：mars2d.layer.MapVLayer、mars2d.Util.sendAjax、map.addLayer
 * 要点：mapv 由示例框架按 example.json 的 libs 配置全局加载（代码里的 this.mapv 即 iframe window 上的 mapv）；数据文本用 | 分段、\t 分列，城市名要先去掉"市/省"再查 mapv 内置的 utilCityCenter；只随机给约 30% 的迁徙线生成流动点，避免动画数据量过大
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
  map.setView([36.64, 108.15], 4) // Leaflet 的坐标数组顺序是 [纬度, 经度]

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
  return mars2d.Util.sendAjax({ url: "http://data.mars2d.cn/file/apidemo/qianxi-time.txt" })
    .then(function (rs) {
      if (!map) {
        return // 示例已卸载，丢弃晚到的请求结果
      }
      showMapVLayer(rs.data)
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

  // 按 n 等分在起终点之间插点，作为流动动画的 time 数据
  function curive(fromPoint, endPoint, n) {
    const delLng = (endPoint.lng - fromPoint.lng) / n
    const delLat = (endPoint.lat - fromPoint.lat) / n

    for (let i = 0; i < n; i++) {
      const pointNLng = fromPoint.lng + delLng * i
      const pointNLat = fromPoint.lat + delLat * i
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: [pointNLng, pointNLat]
        },
        count: 1,
        time: i
      })
    }
  }

  // 数据文本：多条迁徙记录用 | 分隔，每条记录内用 \t 分隔"城市/人数"等字段
  const items = rs.split("|")
  let cityBegin
  for (let i = 0; i < items.length; i++) {
    const itemArr = items[i].split(/\n/)
    for (let k = 0; k < itemArr.length; k++) {
      if (itemArr[k]) {
        const item = itemArr[k].split(/\t/)
        if (item[0] === "起点城市" || item[0] === "迁出城市") {
          cityBegin = item[1]
        }
        if (item[0] !== "起点城市" || (item[0] !== "迁出城市" && item.length > 1)) {
          const cityCenter1 = this.mapv.utilCityCenter.getCenterByCityName(item[0].replace(/市|省/, ""))
          const cityCenter2 = this.mapv.utilCityCenter.getCenterByCityName(cityBegin.replace(/市|省/, "").trim())
          if (cityCenter1 && cityCenter2) {
            // 只给约 30% 的线生成流动点，避免动画点数量过大
            if (Math.random() > 0.7) {
              curive(cityCenter2, cityCenter1, 50)
            }
            data.push({
              geometry: {
                type: "LineString",
                coordinates: [
                  [cityCenter1.lng, cityCenter1.lat],
                  [cityCenter2.lng, cityCenter2.lat]
                ]
              },
              count: 100 * Math.random()
            })
          }
        }
      }
    }
  }
  const dataSet1 = new this.mapv.DataSet(data)
  const options1 = {
    strokeStyle: "rgba(55, 50, 250, 0.3)",
    globalCompositeOperation: "lighter",
    shadowColor: "rgba(55, 50, 250, 0.5)",
    methods: {
      click: function (item) {
        console.log("点击了图层", item)
      }
    },
    gradient: { 0: "rgba(55, 50, 250, 0)", 1: "rgba(55, 50, 250, 1)" },
    lineWidth: 0.2,
    draw: "intensity"
  }
  // 线图层
  const mapVLayer = new mars2d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer)
  mapVLayers.push(mapVLayer)

  const dataSet2 = new this.mapv.DataSet(timeData)
  const options2 = {
    fillStyle: "rgba(255, 250, 250, 0.9)",
    size: 0.5,
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 50
      },
      trails: 1,
      duration: 5
    },
    draw: "simple"
  }
  // 动画图层
  const mapVLayer2 = new mars2d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer2)
  mapVLayers.push(mapVLayer2)
}
