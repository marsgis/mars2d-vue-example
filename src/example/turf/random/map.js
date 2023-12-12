import * as mars2d from "mars2d"

let map
let graphicLayer
let index = 0
const colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#0000FF"]
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lat: 31.868811, lng: 117.234421 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  randomPoints()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 颜色
function getColor() {
  const i = index++ % colors.length
  return colors[i]
}

const bbox = [116.984788, 31.625909, 117.484068, 32.021504]

export function randomPoints() {
  graphicLayer.clear()
  const points = turf.randomPoint(100, { bbox })

  points.features.forEach((e, index) => {
    const position = e.geometry.coordinates
    const latlngs = mars2d.PointTrans.coords2latlngs([position])

    const graphic = new mars2d.graphic.Marker({
      latlng: latlngs[0],
      style: {
        image: "img/marker/mark3.png",
        scale: 1,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      },
      popup: "第" + index + "个"
    })
    graphicLayer.addGraphic(graphic)
  })
}

export function randomPolylines() {
  graphicLayer.clear()

  let num_vertices = parseInt(Math.random() * 10)
  num_vertices = num_vertices < 3 ? 3 : num_vertices

  const polylines = turf.randomLineString(100, {
    bbox,
    num_vertices, // 每个 LineString 将包含多少个坐标。
    max_length: 0.01 // 大小
  })

  polylines.features.forEach((e, index) => {
    const positions = e.geometry.coordinates

    const latlngs = mars2d.PointTrans.coords2latlngs([positions])

    const graphic = new mars2d.graphic.Polyline({
      latlngs,
      style: {
        width: 4,
        fillColor: getColor(),
        fillOpacity: 0.8,
        clampToGround: true
      },
      popup: "第" + index + "个"
    })
    graphicLayer.addGraphic(graphic)
  })
}

export function randomPolygons() {
  graphicLayer.clear()

  let num_vertices = parseInt(Math.random() * 10)
  num_vertices = num_vertices < 3 ? 3 : num_vertices

  const polygons = turf.randomPolygon(100, {
    bbox,
    num_vertices, // 坐标个数,必须多于或等于四个
    max_radial_length: 0.01 // 大小
  })

  polygons.features.forEach((e, index) => {
    const positions = e.geometry.coordinates

    const latlngs = mars2d.PointTrans.coords2latlngs([positions])

    const graphic = new mars2d.graphic.Polygon({
      latlngs,
      style: {
        fillColor: getColor(),
        fillOpacity: 0.6
      },
      popup: "第" + index + "个"
    })
    graphicLayer.addGraphic(graphic)
  })
}

export function clearAll() {
  graphicLayer.clear()
}
