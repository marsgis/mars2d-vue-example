/**
 * 示例：SHP文件的加载(转GeoJson)
 * 演示：用同目录 Shp2JsonLayer（继承 GeoJsonLayer，内部用 shp-geojson 把 SHP 压缩包转成 GeoJSON）加载合肥乡镇面与高程点，演示面/点两类 symbol 配置
 * API：mars2d.layer.Shp2JsonLayer（自注册图层）、mars2d.layer.GeoJsonLayer、map.addLayer
 * 要点：url 必须是含 shp/dbf/prj 的 zip 包；dbf 属性默认按 gbk 解析，utf-8 数据要显式传 encoding:"utf-8"；symbol.type 不写时按几何类型自动判定，symbol.merge 表示与要素自带样式合并（数据样式优先），不是性能开关
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lng: 117.287917, lat: 31.904563 }
}

// 事件对象，用于把数据加载结果推送给面板（本示例面板只做图层管理，未使用该事件）
export const treeEvent = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 默认先加载乡镇面，面板按钮再切换高程点
  shoXZM()
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  removeLayer()
  map = null
}

// 移除上一次切换数据时创建的图层；onUnmounted 里 map 可能已被置空，必须判空
function removeLayer() {
  if (graphicLayer) {
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
}

// ========== 3. 面板交互方法 ==========
// flyTo至目标
export function flyToEntity(entity) {
  map.flyTo(entity)
}

// 示例：乡镇面
export function shoXZM() {
  removeLayer()

  graphicLayer = new mars2d.layer.Shp2JsonLayer({
    // zip 包内需包含 hefei_xz.shp / .dbf / .prj 等同名文件
    url: "https://data.mars3d.cn/file/shp/hefei_xz.zip",
    // 属性表编码；服务端数据是 utf-8，默认 gbk 会乱码，所以这里显式指定
    encoding: "utf-8",
    // 原始示例的坐标简化配置；当前二维解析链路未消费该参数，保留不影响加载
    simplify: { tolerance: 0.0001 },
    symbol: {
      type: "polygon",
      styleOptions: {
        fill: true,
        // 随机颜色：数据没有分类字段，随机色便于区分相邻的乡镇面
        randomColor: true, // 随机色
        opacity: 0.3,
        outline: true,
        outlineStyle: {
          width: 3,
          color: "#FED976"
        }
      }
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(graphicLayer)

  // 绑定事件
  graphicLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：高程点
export function shoGCD() {
  removeLayer()

  graphicLayer = new mars2d.layer.Shp2JsonLayer({
    url: "https://data.mars3d.cn/file/shp/yuexi_point.zip",
    symbol: {
      type: "point",
      // merge:true 表示与要素数据自带的 style 合并（数据自带样式优先），不是性能开关；本数据无自带样式，等价于只用 styleOptions
      merge: true,
      styleOptions: {
        color: "#ff0000",
        pixelSize: 6
      }
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(graphicLayer)

  // 绑定事件
  graphicLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}
