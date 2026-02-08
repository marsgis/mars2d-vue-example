import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  operationallayers: [
    {
      name: "基础教育设施",
      type: "wms",
      url: "http://server.mars2d.cn/geoserver/mars/wms",
      layers: "mars:hfjy",
      transparent: true,
      format: "image/png"
    },
    {
      name: "规划图",
      type: "wms",
      url: "http://server.mars2d.cn/geoserver/mars/wms",
      layers: "mars:hfgh",
      transparent: true,
      format: "image/png"
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.WmsLayer({
    name: "道路",
    type: "wms",
    url: "http://server.mars2d.cn/geoserver/mars/wms",
    layers: "mars:hfdl",
    transparent: true,
    format: "image/png"
    // cql_filter: "1=1"
  })
  map.addLayer(layer)

  const resultLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(resultLayer)

  layer.on(mars2d.EventType.click, function (event) {
    console.log("单击了wms图层", event)

    if (event.feature) {
      resultLayer.clear()

      const graphicsOptions = mars2d.Util.geoJsonToGraphics(event.feature, {
        type: "polyline",
        style: {
          width: 5,
          color: "#ff0000"
        }
      })
      resultLayer.addGraphic(graphicsOptions)
    }
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
