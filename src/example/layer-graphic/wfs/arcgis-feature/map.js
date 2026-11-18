/**
 * 示例：ArcGIS FeatureServer服务
 * 演示：用 mars2d.layer.ArcGisFeatureLayer 分别加载 ArcGIS MapServer 下的点图层（20）和线面图层（39），并按点/面类型配置 symbol 样式与标注
 * API：mars2d.layer.ArcGisFeatureLayer、map.addLayer
 * 要点：需要 example.json 里 libs: mars2d-esri 的 ESRI 插件；url 要指到 MapServer 下的具体图层序号；Feature 服务按要素返回 GeoJSON 再转 Graphic 渲染，数据量大时用 minZoom 限制低层级请求；iconSize/iconAnchor/popupAnchor 单位是像素
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let pointLayer // 点状数据图层（onUnmounted 需移除）
let polygonLayer // 线面数据图层（onUnmounted 需移除）

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  addLayer1()
  addLayer2()
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (pointLayer) {
    // onUnmounted 里 map 可能已被置空，移除图层前需判空
    if (map) {
      map.removeLayer(pointLayer)
    }
    pointLayer = null
  }
  if (polygonLayer) {
    if (map) {
      map.removeLayer(polygonLayer)
    }
    polygonLayer = null
  }
  map = null
}

// ========== 3. 图层（演示数据）==========
function addLayer1() {
  pointLayer = new mars2d.layer.ArcGisFeatureLayer({
    name: "点状数据",
    // 指向 MapServer 下的第 20 号图层
    url: "http://server.mars2d.cn/arcgis/rest/services/mars/hefei/MapServer/20",
    popup: "all",
    symbol: {
      styleOptions: {
        iconUrl: "img/marker/fx1.png",
        // 图标宽高与锚点都是像素：iconAnchor 为图标内的定位点，popupAnchor 为弹窗相对锚点的偏移
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      }
    }
  })
  map.addLayer(pointLayer)
}

function addLayer2() {
  polygonLayer = new mars2d.layer.ArcGisFeatureLayer({
    name: "线面数据",
    // 指向 MapServer 下的第 39 号图层
    url: "https://server.mars2d.cn/arcgis/rest/services/mars/hefei/MapServer/39",
    popup: "all",
    //   minZoom: 16, // 数据量过大时，需要限制层级
    symbol: {
      type: "polygon",
      styleOptions: {
        fill: true,
        fillColor: "#FED976",
        fillOpacity: 0.2,
        outline: true,
        outlineColor: "#0000ff",
        outlineOpacity: 1,
        outlineWidth: 2,
        // label.text 支持 {属性名} 占位符，取要素的 NAME 字段做面标注
        label: {
          text: "{NAME}",
          color: "#0000ff",
          font_size: 14,
          font_family: "楷体"
        }
      }
    }
  })
  map.addLayer(polygonLayer)
}
