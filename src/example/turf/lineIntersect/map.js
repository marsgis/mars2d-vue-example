/**
 * 示例：线求交
 * 演示：绘制多条线后两两用 turf.lineIntersect 求交点，交点以蓝色像素点标出
 * API：layer.toGeoJSON、turf.lineIntersect、mars2d.Util.geoJsonToGraphics
 * 要点：先 stopDraw() 结束绘制再取图层数据，否则正在画的线也会被算进去；至少需要两条线；每次绘制按调色板轮换颜色便于区分
 */
import * as mars2d from "mars2d"

let map
let lineLayer
let pointLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  lineLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(lineLayer)

  lineLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
          pointLayer.clear() // 线删了，交点也失效，一并清掉
        }
      }
    }
  ])

  pointLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(pointLayer)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放线图层、交点图层与绘制状态
    map = null
  }
  lineLayer = null
  pointLayer = null
}

// ========== 4. 面板交互方法：绘制 / 求交 / 清除 ==========
export function drawLine() {
  // 开始绘制
  lineLayer.startDraw({
    type: "polyline",
    style: {
      color: getColor(),
      width: 3,
      clampToGround: true
    }
  })
}

export function crossPoint() {
  lineLayer.stopDraw()
  pointLayer.clear()
  if (lineLayer.graphics.length <= 1) {
    globalMsg("请至少绘制两条线")
    return
  }

  const geojson = lineLayer.toGeoJSON()
  const allCount = geojson.features.length

  for (let i = 0; i < allCount; i++) {
    const line1 = geojson.features[i]

    for (let j = i + 1; j < allCount; j++) {
      const line2 = geojson.features[j]

      // 计算相交点
      const intersects = turf.lineIntersect(line1, line2)

      if (intersects.features.length > 0) {
        console.log("计算的交点信息", intersects)
        const intersectsPointGrahic = mars2d.Util.geoJsonToGraphics(intersects.features, {
          style: {
            color: "#0000ff",
            pixelSize: 5,
            outlineColor: "#0000ff",
            outlineWidth: 2,
            clampToGround: true
          }
        })
        console.log("添加的交点对象", intersectsPointGrahic)
        pointLayer.addGraphic(intersectsPointGrahic)
      }
    }
  }
}

export function clearAll() {
  pointLayer.clear()
  lineLayer.clear()
}

// ========== 5. 颜色 ==========
// 颜色
let index = 0
const colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#00FFFF"]
function getColor() {
  const i = index++ % colors.length
  return colors[i]
}
