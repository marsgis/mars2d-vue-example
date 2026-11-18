/**
 * 示例：4326底图(WGS84)
 * 演示：用 crs: mars2d.CRS.EPSG4326 创建经纬度坐标地图，加载天地图经纬度瓦片与 terrestris 的 WMS 底图
 * API：mars2d.CRS、mars2d.layer.TdtLayer、mars2d.layer.WmsLayer
 * 要点：天地图子图层必须显式写 crs:"EPSG:4326"，TdtLayer 才会切换到天地图经纬度瓦片矩阵（_c/wmts）并自动补上 1 级层级差；WMS 底图请求的坐标系跟随地图 crs；terrestris 是国外公共 WMS 服务，离线环境不可用
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.EPSG4326,
  zoom: 10,
  center: { lng: 117.317408, lat: 31.716156 },
  basemaps: [
    {
      // type:"group" 只是可切换的底图分组，实际由下面两个天地图瓦片图层组成
      name: "国家天地图",
      type: "group",
      layers: [
        // crs:"EPSG:4326" 告诉 TdtLayer 用天地图经纬度瓦片矩阵（_c/wmts），并自动补偿与 4326 地图的层级差
        { type: "tdt", layer: "vec_d", crs: "EPSG:4326", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "vec_z", crs: "EPSG:4326", key: mars2d.Token.tiandituArr }
      ],
      show: true
    },
    {
      name: "terrestris地图",
      type: "wms",
      url: "https://ows.terrestris.de/osm/service",
      layers: "OSM-WMS", // WMS 请求的图层名（服务端发布的图层标识）
      format: "image/png" // 请求的瓦片图片格式
    }
  ]
}

// ========== 2. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 底图由框架按 mapOptions 创建、随地图一起销毁，这里只断开示例对地图的引用
  map = null
}
