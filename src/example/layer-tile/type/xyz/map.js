/**
 * 示例：xyz金字塔瓦片
 * 演示：用 TileLayer（type: "tile"）加载标准 XYZ 金字塔瓦片，并用 Leaflet 公开 API 手动添加缩放、比例尺控件
 * API：mars2d.layer.TileLayer、L.control.zoom、L.control.scale、map.removeControl
 * 要点：url 模板里是 {x}/{y}/{z}（与高德/OSM 一致，ArcGIS 缓存才是 {z}/{y}/{x}）；mapOptions 用函数形式整体替换了 config.json 的默认配置（含默认控件），所以这里要自己用 L.control 添加控件；手动 addTo(map) 的控件必须成对 removeControl，否则在保留地图实例的场景会重复叠加
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let zoomControl
let scaleControl
let tileLayer // 叠加的高德瓦片图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option = {
    zoom: 4,
    center: [33.027088, 109.467773]
  }
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加控件
  zoomControl = L.control.zoom({ position: "bottomleft" })
  zoomControl.addTo(map)
  scaleControl = L.control.scale({ metric: true, imperial: false })
  scaleControl.addTo(map)

  // 添加底图
  tileLayer = new mars2d.layer.TileLayer({
    type: "tile",
    url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
  })
  map.addLayer(tileLayer)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    if (zoomControl) {
      map.removeControl(zoomControl)
      zoomControl = null
    }
    if (scaleControl) {
      map.removeControl(scaleControl)
      scaleControl = null
    }
    if (tileLayer) {
      map.removeLayer(tileLayer)
      tileLayer = null
    }
  }
  map = null
}
