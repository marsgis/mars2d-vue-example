/**
 * 示例：绘制反选遮罩层
 * 演示：GeoJsonLayer 设置 mask:true，把行政区范围挖空、区外整体涂色，形成反选遮罩
 * API：mars2d.layer.GeoJsonLayer（mask 参数）、GeoJsonLayer#bringToBack、mars2d.graphic.Image/Polyline/Label
 * 要点：mask 会用首个面要素的环做"挖空"，外圈默认取全国范围（mask 也可传 { xmin, xmax, ymin, ymax } 自定义外圈）；遮罩层会盖住它下面的图层，加载完成必须 bringToBack 放到最底层；symbol.styleOptions 控制遮罩的填充与描边样式
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let geoJsonLayer // 反选遮罩层（行政区外区域涂色）
let graphicLayer // 演示用的矢量数据图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 9,
  center: { lng: 117.258728, lat: 31.848053 },
  minZoom: 6
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    url: "//data.mars2d.cn/file/geojson/areas/340100.json",
    mask: true, // 标识为遮罩层【重点参数】
    symbol: {
      styleOptions: {
        fill: true,
        fillColor: "#C0C0C0",
        fillOpacity: 1,
        outline: true,
        outlineColor: "#6495ED",
        outlineWidth: 8,
        outlineOpacity: 0.5
      }
    }
  })
  map.addLayer(geoJsonLayer)

  geoJsonLayer.on(mars2d.EventType.load, function () {
    geoJsonLayer.bringToBack() // 将图层置于所有图层之下
  })

  // 创建矢量数据图层（演示遮罩层不会盖住业务图形）
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const graphicImg = new mars2d.graphic.Image({
    latlngs: [
      [30.7, 116.05],
      [32.86, 118.5]
    ],
    style: {
      url: "img/icon/calib.png",
      opacity: 1,
      zIndex: 9999
    }
  })
  graphicLayer.addGraphic(graphicImg)

  const graphic = new mars2d.graphic.Polyline({
    latlngs: [
      [32.33588, 118.504028],
      [31.822586, 117.222404]
    ],
    style: {
      color: "#ff0000",
      width: 3
    }
  })
  graphicLayer.addGraphic(graphic)

  const graphicLabel = new mars2d.graphic.Label({
    latlng: [32.361403, 118.532867],
    style: {
      text: "合肥市",
      color: "#0081c2",
      font_size: 25,
      font_family: "楷体",
      horizontalOrigin: mars2d.HorizontalOrigin.LEFT
    }
  })
  graphicLayer.addGraphic(graphicLabel)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (!map) {
    return
  }
  if (geoJsonLayer) {
    map.removeLayer(geoJsonLayer, true)
    geoJsonLayer = null
  }
  if (graphicLayer) {
    // 图层内的 Image/Polyline/Label 随图层一起移除
    map.removeLayer(graphicLayer, true)
    graphicLayer = null
  }
  map = null
}
