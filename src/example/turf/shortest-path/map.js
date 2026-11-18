/**
 * 示例：最短路径
 * 演示：绘制一个障碍面、起点、终点，用 turf.shortestPath 计算绕开障碍的路径并用绿色线展示
 * API：turf.shortestPath、graphic.toGeoJSON、graphicLayer.startDraw
 * 要点：障碍面、起点、终点缺一不可（面板按顺序提示绘制）；resolution 是路径网格精度，单位同 units（这里是米）；options.obstacles 传的是面的 geometry，不是 Feature
 */
import * as mars2d from "mars2d"
let map
let graphicLayer
let shortestPathLayer

let polygonZAM
let pointQD
let pointZD

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层（绘制的障碍面/起终点）
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  //  点、线矢量数据图层（计算结果）
  shortestPathLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(shortestPathLayer)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放两个图层与绘制状态
    map = null
  }
  graphicLayer = null
  shortestPathLayer = null
  polygonZAM = null
  pointQD = null
  pointZD = null
}

// ========== 3. 矢量对象：绘制障碍面、起点、终点 ==========
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
      color: "#0000ff",
      label: {
        text: "起点",
        font_size: 20,
        color: "#0000ff",
        outline: true,
        outlineColor: "#0000ff",
        offsetY: -20
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
      color: "#0000ff",
      label: {
        text: "终点",
        font_size: 20,
        color: "#0000ff",
        outline: true,
        outlineColor: "#0000ff",
        offsetY: -20
      }
    },
    success: (graphic) => {
      pointZD = graphic
    }
  })
}

// ========== 4. 最短路径计算 ==========
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
    obstacles: polygon.geometry, // 障碍物传 geometry（turf v7 要求）
    units: "meters",
    resolution: 100 // 网格精度：越大越粗、计算越快
  }
  const path = turf.shortestPath(startPoint, endPoint, options)

  const positions = path.geometry.coordinates

  const latlngs = mars2d.PointTrans.coords2latlngs([positions])

  const polyonLine = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      color: "#55ff33"
    }
  })
  shortestPathLayer.addGraphic(polyonLine)
}

// ========== 5. 清除 ==========
export function clearLayer() {
  polygonZAM = null
  pointQD = null
  pointZD = null

  graphicLayer.clear()
  shortestPathLayer.clear()
}
