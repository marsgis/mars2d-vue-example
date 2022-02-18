import * as mars2d from "mars2d"
const L = mars2d.L
let map
let graphicLayer
let pointLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 5,
  center: { lng: 112.166014, lat: 33.548525 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  pointLayer = new mars2d.layer.GeoJsonLayer({
    name: "机场",
    url: "http://data.mars2d.cn/file/geojson/airport.json",
    symbol: {
      styleOptions: {
        image: "./img/marker/airportBlue.png",
        width: 25,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.CENTER
      }
    },
    popup: "{NAME}"
  })
  map.addLayer(pointLayer)

  // 点击地图进行最近飞机场分析
  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer({
    zIndex: 20
  })
  map.addLayer(graphicLayer)

  map.on(mars2d.EventType.click, mapOnClickListener)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

const bounds = L.latLngBounds(L.latLng(90, 180), L.latLng(-90, -180))

function mapOnClickListener(e) {
  if (!bounds.contains(e.latlng)) {
    globalMsg("超出分析范围")
    return
  }

  if (pointLayer.length === 0) {
    globalMsg("正在加载数据,请稍等......")

    return
  }

  graphicLayer.clear()

  // 生成查询点
  const queryPoint = new mars2d.graphic.Marker({
    latlng: e.latlng,
    style: {
      image: "./img/marker/fx1.png",
      width: 25,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.CENTER
    },
    popup: "查询点"
  })
  graphicLayer.addGraphic(queryPoint)

  // turf分析
  const targetPoint = queryPoint.toGeoJSON()
  const points = pointLayer.toGeoJSON()
  const nearest = turf.nearestPoint(targetPoint, points)
  if (!nearest) {
    return
  }

  const nearestPoint = mars2d.Util.geoJsonToGraphics(nearest)[0]

  // 连线
  const polyline = new mars2d.graphic.Polyline({
    latlngs: [e.latlng, nearestPoint.latlng],
    style: {
      width: 5,
      color: "red",
      dashArray: "5, 10"
    }
  })
  graphicLayer.addGraphic(polyline)

  // 终点
  const endPoint = new mars2d.graphic.Marker({
    latlng: nearestPoint.latlng,
    style: {
      image: "./img/marker/airportRed.png",
      width: 25,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.CENTER
    }
  })
  graphicLayer.addGraphic(endPoint)
  endPoint.bindPopup("离该点最近的机场为:<br />" + nearestPoint.attr.NAME).openPopup()
}

export function clearlayer() {
  graphicLayer.clear()
}
