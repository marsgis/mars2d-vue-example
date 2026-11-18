/**
 * 示例：北京
 * 演示：加载北京村庄的 GeoJSON，直接交给 MapV 的 DataSet 绘制面带渐变填充
 * API：mars2d.layer.MapVLayer、mars2d.Util.fetchJson、map.addLayer
 * 要点：MapV 的 DataSet 可直接吃 GeoJSON FeatureCollection，按 geometry 类型渲染；strokeStyle 是面边界线颜色，size 是面线宽相关参数；数据来自在线接口 data.mars2d.cn
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let mapVLayer // 北京村庄 MapV 图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.setView([39.93, 116.402], 12) // Leaflet 的坐标数组顺序是 [纬度, 经度]

  getJsonData()
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

// ========== 3. 数据加载 ==========
function getJsonData() {
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/beijing-village.json"
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

  // MapV 的 DataSet 支持直接传 GeoJSON FeatureCollection
  const dataSet = new this.mapv.DataSet(geojson)

  const options = {
    fillStyle: "rgba(255, 80, 53, 0.8)",
    strokeStyle: "rgba(250, 255, 53, 0.8)",
    size: 3,
    lineWidth: 1,
    draw: "simple"
  }
  mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
