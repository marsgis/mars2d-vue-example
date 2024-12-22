import * as mars2d from "mars2d"

let map
let graphicLayer
let pointsLayer
const bbox = [116.984788, 31.625909, 117.484068, 32.021504]

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lat: 31.880473, lng: 117.200775 }
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

  // 点矢量数据图层
  pointsLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(pointsLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 生成50个随机点
export function randomPoints() {
  clearlayer()

  const points = turf.randomPoint(50, { bbox }) // 50个随机点

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
    pointsLayer.addGraphic(graphic)
  })
}
// 计算包围面
export function convexPolygon() {
  graphicLayer.clear()

  const points = pointsLayer.toGeoJSON()

  const hull = turf.convex(points)

  if (!hull) {
    globalMsg("请先创建原始数据")
    return
  }

  const convexPoints = hull.geometry.coordinates

  const latlngs = mars2d.PointTrans.coords2latlngs(convexPoints[0])

  // 外包围面;
  const polygonGraphic = new mars2d.graphic.Polygon({
    latlngs,
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.5
    }
  })
  graphicLayer.addGraphic(polygonGraphic)
}

// 泰森多边形
export function voronoiPolygon() {
  graphicLayer.clear()

  const points = pointsLayer.toGeoJSON()

  const hull = turf.convex(points)

  if (!hull) {
    globalMsg("请先创建原始数据")
    return
  }

  const options = {
    bbox
  }

  const voronoiPolygons = turf.voronoi(points, options)

  voronoiPolygons.features.forEach((e, index) => {
    const position = e.geometry.coordinates

    const latlngs = mars2d.PointTrans.coords2latlngs(position[0])

    const voronoiPolygon = new mars2d.graphic.Polygon({
      latlngs,
      style: {
        randomColor: true, // 随机色
        fillOpacity: 0.5
      },
      popup: "第" + index + "个"
    })
    graphicLayer.addGraphic(voronoiPolygon)
  })
}

// 计算TIN多边形
export function tinPolygon() {
  graphicLayer.clear()

  const points = pointsLayer.toGeoJSON()

  const hull = turf.convex(points)

  if (!hull) {
    globalMsg("请先创建原始数据")
    return
  }

  for (let i = 0; i < points.features.length; i++) {
    points.features[i].properties.z = ~~(Math.random() * 9)
  }
  const tin = turf.tin(points, "z")

  tin.features.forEach((e, index) => {
    const position = e.geometry.coordinates

    const latlngs = mars2d.PointTrans.coords2latlngs(position[0])

    // TIN多边形
    const tinPolygon = new mars2d.graphic.Polygon({
      latlngs,
      style: {
        randomColor: true, // 随机色
        fillOpacity: 0.5,
        outline: true,
        outlineColor: "rgb(3, 4, 5,0.5)",
        outlineWidth: 2
      },
      popup: "第" + index + "个"
    })
    graphicLayer.addGraphic(tinPolygon)
  })
}

// 清除所有矢量图层
export function clearlayer() {
  graphicLayer.clear()
  pointsLayer.clear()
}
