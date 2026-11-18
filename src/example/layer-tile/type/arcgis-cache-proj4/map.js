/**
 * 示例：arcgis离线瓦片(自定义坐标系)
 * 演示：用自定义 proj4 坐标系（EPSG:4527 + 自定义 resolutions/origin/bounds）加载 ArcGIS 离线切片，并在缓存范围内定位中心点
 * API：mapOptions.crs（code/proj/resolutions/origin/bounds）、mars2d.layer.ArcGisCacheLayer
 * 要点：自定义坐标系必须同时给 resolutions 与 origin（切片原点），否则层级比例尺和切片行列号对不上；maxZoom 取 resolutions.length - 1 与缓存层级对齐；center 仍填标准经纬度（框架内部按 CRS 换算），矢量对象要用 CRS 的 unproject 把投影坐标转回经纬度
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let graphicMarker // 缓存中心点标记（演示投影坐标转经纬度）

// ========== 1. 自定义坐标系与瓦片信息 ==========
// 离线缓存的切片方案：分辨率、切片原点、缓存范围必须与导出缓存时使用的切片方案一致
const tileInfo = {
  resolutions: [396.87579375158754, 305.74872470578276, 152.87436235289138, 76.437179853526374],
  origin: { x: 33876800, y: 10002100 },
  bounds: { xmin: 39397376.21529983, ymin: 3811337.7700739773, xmax: 39553472.811626874, ymax: 3984005.5674397806 }
}

// ========== 2. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: {
    code: "EPSG:4527", // http://epsg.io/4527
    proj: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    resolutions: tileInfo.resolutions,
    origin: [tileInfo.origin.x, tileInfo.origin.y],
    bounds: L.bounds([tileInfo.bounds.xmin, tileInfo.bounds.ymin], [tileInfo.bounds.xmax, tileInfo.bounds.ymax])
  },
  minZoom: 0,
  maxZoom: tileInfo.resolutions.length - 1, // 与服务端缓存的层级数量保持一致
  zoom: 1,
  center: [35.325, 116.717], // center不是arcgis里面的值，此处正常标准经纬度就行
  basemaps: [
    {
      name: "山东某市",
      type: "arcgis_cache",
      url: "http://data.mars2d.cn/arcgis_cache/shandongImg/_alllayers/{z}/{y}/{x}.png",
      upperCase: false,
      show: true
    }
  ],
  operationallayers: [],
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

// ========== 3. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 缓存范围中心在 EPSG:4527 投影坐标系下的坐标；map.options.crs 是 Leaflet 公开的坐标系对象
  // （SDK 内部私有 getter _crs 返回的正是它，改用公开属性后行为一致）
  const center = map.options.crs.unproject(
    L.point((tileInfo.bounds.xmin + tileInfo.bounds.xmax) / 2, (tileInfo.bounds.ymin + tileInfo.bounds.ymax) / 2)
  )
  console.log("地图center", center)

  // 加矢量数据
  graphicMarker = new mars2d.graphic.Marker({
    latlng: center,
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
      label: {
        text: "我是测试中心点",
        color: "#0000ff",
        font_size: 15,
        offsetY: -10
      }
    }
  })
  map.graphicLayer.addGraphic(graphicMarker)
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && graphicMarker) {
    graphicMarker.remove()
    graphicMarker = null
  }
  // 底图由 mapOptions 创建，随地图/iframe 一起释放
  map = null
}
