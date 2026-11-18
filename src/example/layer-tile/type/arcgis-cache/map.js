/**
 * 示例：arcgis离线瓦片
 * 演示：用 ArcGisCacheLayer 加载 ArcGIS Server 导出的离线切片缓存（_alllayers 目录下的松散型瓦片）
 * API：mars2d.layer.ArcGisCacheLayer、map.addLayer
 * 要点：ArcGIS 缓存 url 模板是 {z}/{y}/{x}（y 行号在 x 列号之前，别按标准 XYZ 的 {x}/{y}/{z} 写）；SDK 会把层级/行列号转成 L00/R00000001/C00000001 形式的 16 进制目录名，upperCase 控制其大小写；图层的 minZoom/maxZoom 要与缓存实际层级对齐
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 3,
  center: [33.027088, 109.467773],
  minZoom: 0,
  maxZoom: 4,

  control: {
    scale: true,
    layers: false, // 只有一个离线缓存图层，不需要图层控件
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

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars2d.layer.ArcGisCacheLayer({
    name: "合肥规划",
    url: "http://data.mars2d.cn/arcgis_cache/googleVec/_alllayers/{z}/{y}/{x}.jpg",
    upperCase: true
  })
  map.addLayer(tileLayer)
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
