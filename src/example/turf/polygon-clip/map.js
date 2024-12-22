import * as mars2d from "mars2d"
let map
let drawLayer
let polygonLayer
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lng: 117.29501, lat: 31.841349 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 加载面数据
  loadPolygon()

  drawLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(drawLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

export function drawLine() {
  drawLayer.clear()
  drawLayer.startDraw({
    type: "polyline",
    maxPointNum: 2,
    style: {
      color: "#0000ff",
      width: 3
    },
    success: (graphic) => {
      const clipLine = graphic.toGeoJSON()
      clipAllPolygon(clipLine)

      graphic.remove()
    }
  })
}

// 加载面数据
function loadPolygon() {
  polygonLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(polygonLayer)

  const postionArr = [
    {
      postions: [
        [117.21983, 31.780687],
        [117.179661, 31.745352],
        [117.201462, 31.727826],
        [117.258453, 31.727534],
        [117.27459, 31.757619],
        [117.270985, 31.775139],
        [117.26738, 31.774701],
        [117.259827, 31.783752],
        [117.21983, 31.780687]
      ]
    },
    {
      postions: [
        [117.490393, 31.88435],
        [117.596823, 31.895413],
        [117.626349, 31.784167],
        [117.449369, 31.775197],
        [117.490393, 31.88435]
      ]
    },

    {
      postions: [
        [117.250042, 31.954209],
        [117.273903, 31.970234],
        [117.306862, 31.957994],
        [117.303772, 31.912971],
        [117.293816, 31.901294],
        [117.269611, 31.900128],
        [117.250042, 31.954209]
      ]
    },
    {
      postions: [
        [117.168674, 31.964546],
        [117.202492, 31.926669],
        [117.132111, 31.923592],
        [117.125759, 31.95099],
        [117.168674, 31.964546]
      ]
    }
  ]

  for (let i = 0; i < postionArr.length; i++) {
    const polygonGraphic = new mars2d.graphic.Polygon({
      latlngs: mars2d.PointTrans.coords2latlngs(postionArr[i].postions),
      style: {
        color: "#ff0000",
        opacity: 0.3
      }
    })
    polygonLayer.addGraphic(polygonGraphic)
  }
}

// 清除
export function clear() {
  drawLayer.clear()
}

// 循环所有面，判断相交的去切割面
function clipAllPolygon(clipLine) {
  polygonLayer.eachGraphic(function (graphic) {
    try {
      const clippedPolygon = geoUtil.polygonClipByLine(graphic.toGeoJSON(), clipLine)
      if (clippedPolygon) {
        drawLayer.loadGeoJSON(clippedPolygon, {
          style: {
            fill: true,
            fillColor: "#00ff00",
            // randomColor: true,
            fillOpacity: 0.5,
            outline: true,
            outlineWidth: 2,
            outlineColor: "#0000ff"
          }
        })
      }
    } catch (error) {
      console.log(error)
      // globalMsg('<div style="color:#ff0000;">' + error.message + "</div>")
    }
  })
}

/**
 * geoJson数据处理模块(需要引入turf.js)
 * 输入输出数据均为标准geoJson格式
 */
const geoUtil = {
  // 合并多边形
  unionPolygon: function (polygons) {
    let polygon = polygons[0]
    for (let i = 0; i < polygons.length; i++) {
      polygon = turf.union(polygon, polygons[i])
    }
    return polygon
  },

  /**
   * 线分割面
   * 面类型只能是polygon 但可以是环
   * 注:线与多边形必须有两个交点
   */
  polygonClipByLine: function (polygon, clipLine) {
    if (polygon.geometry.type === "Polygon") {
      const polyLine = turf.polygonToLine(polygon)
      if (polyLine.geometry.type === "LineString") {
        // 切割普通多边形
        return this._singlePolygonClip(polyLine, clipLine)
      } else if (polyLine.geometry.type === "MultiLineString") {
        // 切割环
        return this._multiPolygonClip(polyLine, clipLine)
      }
    } else if (polygon.geometry.type === "MultiPolygon") {
      // 若输入的多边形类型为Multipolygon则拆分成多个Polygon
      const polygons = this.multiPolygon2polygons(polygon)
      let clipPolygon = null
      let clipPolygonIndex = -1
      // 获取MultiPolygon中与切割线相交的多边形（有且只能有一个多边形相交2个交点）
      polygons.forEach(function (polygon, index) {
        const polyLine = turf.polygonToLine(polygon)
        if (turf.lineIntersect(polyLine, clipLine).features.length === 2) {
          if (!clipPolygon) {
            clipPolygon = polygon
            clipPolygonIndex = index
          } else {
            throw new Error({ state: "裁剪失败", message: "MultiPolygon只能有一个多边形与切割线存在交点" })
          }
        }
      })
      if (clipPolygonIndex !== -1) {
        polygons.splice(clipPolygonIndex, 1)
        return turf.featureCollection(polygons.concat(this.polygonClipByLine(clipPolygon, clipLine).features))
      } else {
        throw new Error({ state: "裁剪失败", message: "MultiPolygon与切割线无交点" })
      }
    } else {
      throw new Error({ state: "裁剪失败", message: "输入的多边形类型为错误" })
    }
  },

  _singlePolygonClip: function (polyLine, clipLine) {
    // 获得裁切点
    const intersects = turf.lineIntersect(polyLine, clipLine)
    if (intersects.features.length !== 2) {
      throw new Error({ state: "裁剪失败", message: "切割线与多边形交点应该为2个,当前交点个数为" + intersects.features.length })
    }
    // 检查切割线与多边形的位置关系 （切割线的起点和终点不能落在多边形内部）
    const clipLineLength = clipLine.geometry.coordinates.length
    const clipLineStartPoint = turf.point(clipLine.geometry.coordinates[0])
    const clipLineEndPoint = turf.point(clipLine.geometry.coordinates[clipLineLength - 1])
    const polygon = turf.polygon([polyLine.geometry.coordinates])
    if (turf.booleanPointInPolygon(clipLineStartPoint, polygon) || turf.booleanPointInPolygon(clipLineEndPoint, polygon)) {
      throw new Error({ state: "裁剪失败", message: "切割线起点或终点不能在 裁剪多边形内部" })
    }
    // 通过裁切点 分割多边形（只能获得多边形的一部分）
    const slicedPolyLine = turf.lineSlice(intersects.features[0], intersects.features[1], polyLine)
    // 裁剪线分割 保留多边形内部部分
    const slicedClipLine = turf.lineSlice(intersects.features[0], intersects.features[1], clipLine)
    // 重新拼接多边形 存在 对接的问题 所以先进行判断 如何对接裁剪的多边形和裁剪线
    const resultPolyline1 = this.connectLine(slicedPolyLine, slicedClipLine)
    // 闭合线 来构造多边形
    resultPolyline1.geometry.coordinates.push(resultPolyline1.geometry.coordinates[0])
    const resultPolygon1 = turf.lineToPolygon(resultPolyline1)
    // 构造切割的另一面多边形
    const firstPointOnLine = this.isOnLine(turf.point(polyLine.geometry.coordinates[0]), slicedPolyLine)
    const pointList = []
    if (firstPointOnLine) {
      for (let i = 0; i < polyLine.geometry.coordinates.length; i++) {
        const coordinate = polyLine.geometry.coordinates[i]
        if (!this.isOnLine(turf.point(coordinate), slicedPolyLine)) {
          pointList.push(coordinate)
        }
      }
    } else {
      let skipNum = 0 // 记录前面被跳过的点的个数
      let isStartPush = false
      for (let i = 0; i < polyLine.geometry.coordinates.length; i++) {
        const coordinate = polyLine.geometry.coordinates[i]
        if (!this.isOnLine(turf.point(coordinate), slicedPolyLine)) {
          if (isStartPush) {
            pointList.push(coordinate)
          } else {
            skipNum++
          }
        } else {
          isStartPush = true
        }
      }
      // 将前面跳过的点补充到 点数组中
      for (let i = 0; i < skipNum; i++) {
        pointList.push(polyLine.geometry.coordinates[i])
      }
    }
    const slicedPolyLine_2 = turf.lineString(pointList)
    const resultPolyline2 = this.connectLine(slicedPolyLine_2, slicedClipLine)
    // 闭合线 来构造多边形
    resultPolyline2.geometry.coordinates.push(resultPolyline2.geometry.coordinates[0])
    const resultPolygon2 = turf.lineToPolygon(resultPolyline2)
    // 返回面要素集
    return turf.featureCollection([resultPolygon1, resultPolygon2])
  },

  _multiPolygonClip: function (polyLine, clipLine) {
    // 将环 多边形分割成 内部逆时针多边形+外部多边形
    let outPolyline
    const insidePolylineList = []
    for (let i = 0; i < polyLine.geometry.coordinates.length; i++) {
      const splitPolyline = turf.lineString(polyLine.geometry.coordinates[i])
      if (turf.booleanClockwise(splitPolyline)) {
        if (outPolyline) {
          throw new Error({ state: "裁剪失败", message: "出现了两个外部多边形无法处理" })
        } else {
          outPolyline = splitPolyline
        }
      } else {
        const intersects = turf.lineIntersect(splitPolyline, clipLine)
        if (intersects.features.length > 0) {
          throw new Error({ state: "裁剪失败", message: "切割线不能与内环有交点" })
        }
        insidePolylineList.push(splitPolyline)
      }
    }
    const resultCollection = this._singlePolygonClip(outPolyline, clipLine)

    for (let i = 0; i < resultCollection.features.length; i++) {
      for (let j = 0; j < insidePolylineList.length; j++) {
        const startPoint = turf.point(insidePolylineList[j].geometry.coordinates[0])
        if (turf.booleanPointInPolygon(startPoint, resultCollection.features[i])) {
          resultCollection.features[i] = turf.mask(resultCollection.features[i], turf.lineToPolygon(insidePolylineList[j]))
        }
      }
    }
    return resultCollection
  },

  /**
   * 连接两条线
   * 方法会将两条线段最近的一段直接连接
   */
  connectLine: function (line1, line2) {
    const line2_length = line2.geometry.coordinates.length
    const line1_startPoint = line1.geometry.coordinates[0]
    const line2_startPoint = line2.geometry.coordinates[0]
    const line2_endPoint = line2.geometry.coordinates[line2_length - 1]
    const pointList = []
    // 获取line1 所有点坐标
    for (let i = 0; i < line1.geometry.coordinates.length; i++) {
      const coordinate = line1.geometry.coordinates[i]
      pointList.push(coordinate)
    }

    // 判断两条线的 起点是否接近，如果接近 逆转line2线 进行连接
    if (turf.distance(line1_startPoint, line2_startPoint) < turf.distance(line1_startPoint, line2_endPoint)) {
      line2.geometry.coordinates = line2.geometry.coordinates.reverse()
    }
    for (let i = 0; i < line2.geometry.coordinates.length; i++) {
      const coordinate = line2.geometry.coordinates[i]
      pointList.push(coordinate)
    }
    return turf.lineString(pointList)
  },

  /**
   * 判断点是否在线里面
   * 注：线组成的坐标对比
   */
  isOnLine: function (point, line) {
    for (let i = 0; i < line.geometry.coordinates.length; i++) {
      const coordinate = line.geometry.coordinates[i]
      if (point.geometry.coordinates[0] === coordinate[0] && point.geometry.coordinates[1] === coordinate[1]) {
        return true
      }
    }
    return false
  },

  /**
   * 获得两条线交点
   */
  getIntersectPoints: function (line1, line2) {
    return turf.lineIntersect(line1, line2)
  },

  // multiPolygon转polygons,不涉及属性
  multiPolygon2polygons: function (multiPolygon) {
    if (multiPolygon.geometry.type !== "MultiPolygon") {
      return
    }
    const polygons = []
    multiPolygon.geometry.coordinates.forEach((item) => {
      const polygon = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: []
        }
      }
      polygon.geometry.coordinates = item
      polygons.push(polygon)
    })
    return polygons
  },

  /**
   * polygons转multiPolygon,不涉及属性，只输出属性为{}
   * 考虑polygons中就存在多面的情况
   */
  polygons2MultiPolygon: function (geoJson) {
    const newGeoJson = {
      type: "FeatureCollection",
      features: [{ geometry: { coordinates: [], type: "MultiPolygon" }, type: "Feature", properties: {} }]
    }
    geoJson.features.forEach((item) => {
      if (item.geometry.type === "Polygon") {
        newGeoJson.features[0].geometry.coordinates.push(item.geometry.coordinates)
      } else {
        item.geometry.coordinates.forEach((item) => {
          newGeoJson.features[0].geometry.coordinates.push(item)
        })
      }
    })
    return newGeoJson
  }
}
