/**
 * 示例：KML/KMZ文件的加载(转GeoJson)
 * 演示：用同目录 Kml2JsonLayer（继承 GeoJsonLayer，内部用 kml-geojson 把 KML/KMZ 转成 GeoJSON）加载铁路、高速公路、气象等值面、全球 GDP、海上安全通告 5 份数据，并按要素类型自定义 symbol
 * API：mars2d.layer.Kml2JsonLayer（自注册图层）、event.list、map.addLayer
 * 要点：KML/KMZ 由浏览器端第三方库转换（example.json 的 libs: kmlGeojson），数据文件需服务端允许跨域；symbol 回调参数是 (attr, style, feature)，返回对象即单个要素样式；图层 type 为 "kml2json" 才能在 mapOptions.operationallayers 里按类型创建
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lng: 117.287917, lat: 31.904563 },
  // 叠加图层用 operationallayers 配置：type 走 LayerUtil 按注册的类型名创建本示例自注册的 Kml2JsonLayer（见同目录 Kml2JsonLayer.js）
  operationallayers: [
    {
      name: "国境线",
      type: "kml2json",
      url: "https://data.mars2d.cn/file/kml/countryboundary.kml",
      symbol: {
        styleOptions: {
          color: "#FED976",
          width: 2
        }
      },
      // popup:"all" 表示用要素全部属性生成弹窗
      popup: "all",
      show: true
    },
    {
      name: "省界线",
      type: "kml2json",
      url: "https://data.mars2d.cn/file/kml/province.kml",
      symbol: {
        styleOptions: {
          color: "#00FF00",
          width: 2
        }
      },
      popup: "all",
      show: true
    }
  ]
}

// 事件对象，用于把数据加载后的要素列表推送给面板（面板树当前为注释停用状态）
export const treeEvent = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 默认先加载铁路数据，面板按钮再切换其它 KML/KMZ
  shoRailway()
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

// 示例：铁路
export function shoRailway() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    url: "https://data.mars2d.cn/file/kml/hftl.kml",
    symbol: {
      styleOptions: {
        color: "#00ffff",
        opacity: 0.8,
        width: 3,
        // KML 里没有样式的要素用这里的默认值；label.text 支持 {属性名} 占位符
        label: {
          text: "{name}",
          color: "#0000ff",
          font_size: 12,
          font_family: "楷体"
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

    const data = event.list
    treeEvent.fire("tree", { treeData: data })
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：高速公路（KMZ 压缩包）
export function showExpressway() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    name: "路线",
    url: "https://data.mars2d.cn/file/kml/bslx.kmz",
    popup: "all",
    flyTo: true
  })
  map.addLayer(graphicLayer)

  // 绑定事件
  graphicLayer.on(mars2d.EventType.load, function (event) {
    const data = event.list
    treeEvent.fire("tree", { treeData: data })
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：海上安全通告
export function showSafetyNotice() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    name: "海上安全警告",
    url: "https://data.mars2d.cn/file/kml/NAVWARN.kmz",
    // symbol 传函数时按要素逐条返回样式：参数依次为 (要素属性, 默认样式, 原始 feature)
    symbol: function (attr, style, featue) {
      const geoType = featue.geometry?.type
      if (geoType === "Point") {
        return {
          image: "img/marker/point-red.png",
          verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
          label: {
            text: attr.name,
            font_size: 18,
            color: "#ffffff",
            outline: true,
            outlineColor: "#0000ff",
            offsetY: -50
          }
        }
      }
      return style
    },
    popup: "{description}",
    center: { lat: 4.112702, lng: 110.383709, alt: 3269095, heading: 7, pitch: -74 },
    flyTo: true
  })
  map.addLayer(graphicLayer)

  // 绑定事件
  graphicLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    const data = event.list
    treeEvent.fire("tree", { treeData: data })
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：气象等值面
export function showMeteorological() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    name: "气象数据",
    url: "https://data.mars2d.cn/file/kml/dg8.kml",
    // 等值面半透明叠加，避免完全盖住底图
    opacity: 0.7,
    popup: "all",
    flyTo: true
  })
  map.addLayer(graphicLayer)

  // 绑定事件
  graphicLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    const data = event.list
    treeEvent.fire("tree", { treeData: data })
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：全球各国GDP
export function showGDP() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    name: "全球各国GDP",
    url: "https://data.mars2d.cn/file/kml/gdpPerCapita2008.kmz",
    symbol: function (attr, style, featue) {
      const geoType = featue.geometry?.type
      if (geoType === "Point") {
        // 指定用 label 渲染（而不是图标点），国家名直接作为地图文字标注
        return {
          type: "label", // 指定用label渲染。
          text: attr.name,
          font_size: 18,
          color: "#ffffff",
          outline: true,
          outlineColor: "#0000ff"
        }
      }
      return style
    },
    center: { lat: 12.46821, lng: 91.404177, alt: 18969935, heading: 359, pitch: -87 },
    popup: "all",
    flyTo: true
  })
  map.addLayer(graphicLayer)

  // 绑定事件
  graphicLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    const data = event.list
    treeEvent.fire("tree", { treeData: data })
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}
