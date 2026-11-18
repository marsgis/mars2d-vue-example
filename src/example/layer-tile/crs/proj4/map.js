/**
 * 示例：自定义crs(基于proj4)
 * 演示：用 resolutions/origin/bounds 自定义瓦片矩阵 + EPSG:4490 投影（proj4 定义 SDK 已内置），加载四川省 ArcGIS 切片缓存底图
 * API：mars2d.CRS、mapOptions.crs、L.CRS#unproject
 * 要点：自定义 crs 的分辨率表/原点/范围必须与服务端切片方案完全一致，否则瓦片错位；resolutions 的长度决定最高层级（maxZoom = length - 1）；EPSG:4490 的 proj4 定义无需再写 proj 字段
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// ========== 1. 自定义瓦片信息 ==========
// 从服务端切片方案（LOD）抄来的分辨率、原点与范围，必须与服务端一致，否则瓦片错位
const tileInfo = {
  resolutions: [0.019035688046642241, 0.0095178440233211203, 0.0047589220116605602, 0.0023794610058302801, 0.00118973050291514],
  origin: { x: -400, y: 400 },
  bounds: { xmin: 97.283954, ymin: 25.991721, xmax: 108.60998, ymax: 34.367088 }
}

// ========== 2. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: {
    code: "EPSG:4490", // http://epsg.io/4490
    // EPSG:4490 的 proj4 定义（+proj=longlat +ellps=GRS80 +no_defs）SDK 已内置；
    // 换成其他未内置的 EPSG 时才需要放开 proj 并写完整定义字符串
    // proj: "+proj=longlat +ellps=GRS80 +no_defs +type=crs",
    resolutions: tileInfo.resolutions,
    origin: [tileInfo.origin.x, tileInfo.origin.y],
    bounds: L.bounds([tileInfo.bounds.xmin, tileInfo.bounds.ymin], [tileInfo.bounds.xmax, tileInfo.bounds.ymax])
  },
  minZoom: 0,
  maxZoom: tileInfo.resolutions.length - 1, // 分辨率表有几级，maxZoom 就是几减一
  zoom: 1,
  center: [30.1794045, 102.946967], // 取F12打印的 地图center 值后按需调整（数组写法是 [lat, lng]）
  basemaps: [
    {
      name: "四川省",
      // ArcGIS 切片缓存无需服务描述文件，直接按 /{z}/{y}/{x} 规则取图（注意 y 在 x 前）
      type: "arcgis_cache",
      url: "http://data.mars2d.cn/arcgis_cache/sichuan/_alllayers/{z}/{y}/{x}.png",
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

// ========== 3. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 4. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // bounds 是投影后的平面坐标，取中心点反投影回经纬度给标记用；
  // map.options.crs 是 Leaflet 公开的 CRS 实例（等价 SDK 的私有 getter map._crs），unproject 即反投影
  const center = map.options.crs.unproject(L.point((tileInfo.bounds.xmin + tileInfo.bounds.xmax) / 2, (tileInfo.bounds.ymin + tileInfo.bounds.ymax) / 2))
  console.log("地图center", center)

  // 加矢量数据
  const graphic = new mars2d.graphic.Marker({
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
  map.graphicLayer.addGraphic(graphic)
}

// ========== 5. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 矢量对象加在 map.graphicLayer 上，随地图一起销毁，这里只断开示例对地图的引用
  map = null
}
