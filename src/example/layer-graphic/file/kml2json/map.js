import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lng: 117.287917, lat: 31.904563 },
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

export const treeEvent = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  shoRailway()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// flyTo至目标
export function flyToEntity(entity) {
  map.flyTo(entity)
}

function removeLayer() {
  map.trackedEntity = null
  if (graphicLayer) {
    map.removeLayer(graphicLayer, true)
    graphicLayer = null
  }
}

// 示例：
export function shoRailway() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    url: "https://data.mars2d.cn/file/kml/hftl.kml",
    symbol: {
      styleOptions: {
        color: "#00ffff",
        opacity: 0.8,
        width: 3,
        // 标记文字
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

// 示例：
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

// 示例：
export function showSafetyNotice() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    name: "海上安全警告",
    url: "https://data.mars2d.cn/file/kml/NAVWARN.kmz",
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

// 示例：
export function showMeteorological() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    name: "气象数据",
    url: "https://data.mars2d.cn/file/kml/dg8.kml",
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

// 示例：
export function showGDP() {
  removeLayer()

  graphicLayer = new mars2d.layer.Kml2JsonLayer({
    name: "全球各国GDP",
    url: "https://data.mars2d.cn/file/kml/gdpPerCapita2008.kmz",
    symbol: function (attr, style, featue) {
      const geoType = featue.geometry?.type
      if (geoType === "Point") {
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
