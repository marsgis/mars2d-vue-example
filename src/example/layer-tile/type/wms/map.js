/**
 * 示例：OGC WMS服务
 * 演示：用 WmsLayer 加载 GeoServer 发布的 WMS 图片图层，并监听图层 click 事件把查询到的要素高亮绘到结果图层
 * API：mars2d.layer.WmsLayer、mars2d.EventType.click、mars2d.Util.geoJsonToGraphics
 * 要点：WMS 是图片服务，单击查询由 WmsLayer 内部向该 url 发 GetFeatureInfo（info_format=application/json），服务不支持时点击事件里 feature 为 null；transparent:true 才能叠加在底图之上；卸载时要 off 掉图层的 click 监听再移除图层，避免回调操作已销毁的对象
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let wmsLayer // 道路WMS图层
let resultLayer // 单击查询结果图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
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

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  wmsLayer = new mars2d.layer.WmsLayer({
    name: "道路",
    type: "wms",
    url: "http://server.mars2d.cn/geoserver/mars/wms",
    layers: "mars:hfdl",
    transparent: true,
    format: "image/png"
    // cql_filter: "1=1"
  })
  map.addLayer(wmsLayer)

  resultLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(resultLayer)

  wmsLayer.on(mars2d.EventType.click, onWmsLayerClick)
}

// ========== 3. 事件与交互：单击 WMS 后高亮要素 ==========
// 单击WMS图层后高亮显示查询到的要素
function onWmsLayerClick(event) {
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
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (wmsLayer) {
    wmsLayer.off(mars2d.EventType.click, onWmsLayerClick)
    if (map) {
      map.removeLayer(wmsLayer)
    }
    wmsLayer = null
  }
  if (map && resultLayer) {
    map.removeLayer(resultLayer)
    resultLayer = null
  }
  map = null
}
