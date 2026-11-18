/**
 * 示例：4490底图(大地2000)
 * 演示：用 crs: mars2d.CRS.EPSG4490（CGCS2000 经纬度坐标系）加载天地图，并叠加山东天地图的 xyz 瓦片服务
 * API：mars2d.CRS、mars2d.layer.TdtLayer、mapOptions.operationallayers
 * 要点：EPSG:4490 的 proj4 定义（+proj=longlat +ellps=GRS80）SDK 已内置，天地图子图层写 crs: mars2d.CRS.EPSG4490 才匹配经纬度瓦片矩阵；4490 与 4326 的经纬度数值几乎相同但椭球不同（GRS80/WGS84），同一地图内不要混用两种 crs
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 8,
  center: { lng: 116.917267, lat: 36.689627 },
  crs: mars2d.CRS.EPSG4490,
  basemaps: [
    {
      type: "group",
      name: "国家天地图",
      layers: [
        // 与地图 crs 一致地声明瓦片服务为 EPSG:4490（天地图经纬度瓦片矩阵）
        { type: "tdt", layer: "vec_d", crs: mars2d.CRS.EPSG4490, key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "vec_z", crs: mars2d.CRS.EPSG4490, key: mars2d.Token.tiandituArr }
      ],
      show: true
    }
  ],
  operationallayers: [
    {
      // type:"xyz" 与 "tile" 相同，都对应标准 XYZ 金字塔的 TileLayer
      name: "山东天地图",
      type: "xyz",
      // 第三方瓦片地址：把 WMTS 的 KVP 参数拼成了 {z}/{x}/{y} 模板，占位符由 TileLayer 替换；tk 为服务方要求的令牌
      url: "http://service1.sdmap.gov.cn/tileservice/sdpubmap?layer=SDPubMap&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=2ec5b748cca9b24b6474d6857deec02e",
      show: true
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
  // 底图与叠加图层都由框架按 mapOptions 创建、随地图一起销毁，这里只断开示例对地图的引用
  map = null
}
