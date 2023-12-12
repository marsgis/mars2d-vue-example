import * as mars2d from "mars2d"
let map
let graphicLayer
let shortestPathLayer

let polygonZAM
let pointQD
let pointZD
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

  //  点、线矢量数据图层
  shortestPathLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(shortestPathLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 绘制障碍面
export function drawPolygon() {
  if (polygonZAM) {
    polygonZAM.remove()
    polygonZAM = null
  }
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: "#66FF66",
      fillOpacity: 0.4,
      outline: true,
      outlineWidth: 1,
      outlineColor: "red"
    },
    success: (graphic) => {
      polygonZAM = graphic
    }
  })
}

// 绘制起点
export function startPoint() {
  if (pointQD) {
    pointQD.remove()
    pointQD = null
  }
  graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 5,
      color: "red",
      label: {
        text: "起点",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    },
    success: (graphic) => {
      pointQD = graphic
    }
  })
}

// 绘制终点
export function endPoint() {
  if (pointZD) {
    pointZD.remove()
    pointZD = null
  }
  graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 5,
      color: "red",
      label: {
        text: "终点",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    },
    success: (graphic) => {
      pointZD = graphic
    }
  })
}

// 计算最短路径
export function shortestPath() {
  if (!polygonZAM) {
    globalMsg("请绘制障碍面")
    return
  }
  if (!pointQD) {
    globalMsg("请绘制起点")
    return
  }
  if (!pointZD) {
    globalMsg("请绘制终点")
    return
  }
  shortestPathLayer.clear()

  const polygon = polygonZAM.toGeoJSON() // 障碍面
  const startPoint = pointQD.toGeoJSON() // 起点
  const endPoint = pointZD.toGeoJSON() // 终点

  const options = {
    obstacles: polygon
  }
  const path = turf.shortestPath(startPoint, endPoint, options)

  const positions = path.geometry.coordinates

  const latlngs = mars2d.PointTrans.coords2latlngs([positions])

  const polyonLine = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      color: " #55ff33"
    }
  })
  shortestPathLayer.addGraphic(polyonLine)
}

export function clearLayer() {
  polygonZAM = null
  pointQD = null
  pointZD = null

  graphicLayer.clear()
  shortestPathLayer.clear()
}
