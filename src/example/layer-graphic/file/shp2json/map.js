import * as mars2d from "mars2d"

export let map // mars2d.Map三维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lng: 117.287917, lat: 31.904563 }
}

export const treeEvent = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  shoXZM()
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

// 示例：乡镇面
export function shoXZM() {
  removeLayer()

  graphicLayer = new mars2d.layer.Shp2JsonLayer({
    url: "http://data.mars3d.cn/file/shp/hefei_xz.zip",
    encoding: "utf-8",
    simplify: { tolerance: 0.0001 },
    symbol: {
      type: "polygon",
      styleOptions: {
        fill: true,
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
    url: "http://data.mars3d.cn/file/shp/yuexi_point.zip",
    symbol: {
      type: "point",
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
