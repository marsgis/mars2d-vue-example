import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 9,
  center: { lng: 117.258728, lat: 31.848053 },
  minZoom: 6
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  const geoJsonLayer = new mars2d.layer.GeoJsonLayer({
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

  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const graphicImg = new mars2d.graphic.Image({
    latlngs: [
      [30.70, 116.05],
      [32.86, 118.50]
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

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
