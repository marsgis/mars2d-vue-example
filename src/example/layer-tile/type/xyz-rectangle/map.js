/**
 * 示例：xyz金字塔瓦片(区域影像)
 * 演示：给 XYZ 瓦片图层加 rectangle，限定只加载、显示指定经纬度范围内的瓦片（区域影像）
 * API：mars2d.layer.TileLayer（rectangle 参数）、map.addLayer
 * 要点：rectangle 最终会转成 Leaflet GridLayer 的 bounds，只在该经纬度范围内请求和显示瓦片，范围外留空；minZoom/maxZoom 要与瓦片服务的实际层级一致；map.addLayer(tileLayer, true) 的第二个参数表示同时把图层加入图层控件
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 安徽省卫星底图

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 117.228088, lat: 31.98811 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 安徽省卫星底图
  tileLayer = new mars2d.layer.TileLayer({
    name: "安徽省卫星",
    url: "https://data.mars3d.cn/tile/anhui/{z}/{x}/{y}.png",
    minZoom: 1,
    maxZoom: 12,
    rectangle: { xmin: 114.811691, xmax: 119.703609, ymin: 29.35597, ymax: 34.698585 }
  })
  map.addLayer(tileLayer, true)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && tileLayer) {
    // 添加时 addToControl=true，移除时也要 true 才同时从图层控件移除
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
  map = null
}
