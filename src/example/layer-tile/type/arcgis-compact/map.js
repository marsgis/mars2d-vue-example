/**
 * 示例：arcgis紧凑型瓦片
 * 演示：用 ArcGisCompactLayer 加载 ArcGIS Server 导出的紧凑型（bundle）切片缓存
 * API：mars2d.layer.ArcGisCompactLayer、map.addLayer
 * 要点：url 指向缓存的 _alllayers 目录（不是具体文件），SDK 会请求 .bundle/.bundlx 再解析出瓦片；一个 bundle 可能很大，浏览器端解码成本高，只适合小数据量缓存（大数据请用松散型缓存或切片服务）；maxZoom 要与缓存层级对齐
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: [31.847574, 117.281904],
  minZoom: 0,
  maxZoom: 15,

  control: {
    scale: true,
    locationBar: {
      template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>层级:{level}</div>"
    },
    zoom: { position: "bottomleft" },
    toolBar: { position: "bottomleft" }
  }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 该方式不适合大数据的瓦片，仅适合小数据，因为一个文件*.bundle太大 浏览器支撑不了
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.ArcGisCompactLayer({
    name: "合肥市",
    url: "http://data.mars2d.cn/arcgis_cache/hfghBundle/_alllayers"
  })
  map.addLayer(layer)
  tileLayer = layer
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && tileLayer) {
    map.removeLayer(tileLayer)
    tileLayer = null
  }
  map = null
}
