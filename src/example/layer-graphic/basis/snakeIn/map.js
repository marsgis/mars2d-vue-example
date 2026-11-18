/**
 * 示例：多个线的运动动画(图层级)
 * 演示：先画社区之间的连线与编号点，再调用 GraphicLayer#snakeIn 让整个图层按顺序"蛇形"生长，并支持暂停/继续/停止
 * API：mars2d.layer.GraphicLayer、GraphicLayer#snakeIn/snakeOut/snakePause/snakeContinue、map.addLayer
 * 要点：turf 由示例框架按 example.json 的 libs 配置全局加载（不是 npm 包）；重叠走线用贝塞尔曲线偏移弧度区分；snakeIn 是图层级动画，移除图层即停止
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let graphicLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 14,
  center: { lng: 117.189154, lat: 31.844478 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 社区之间的路线：相邻两个社区连成一段线
  const arrPath = [
    { name: "汇展园社区", jd: 117.144985, wd: 31.851898 },
    { name: "丰北社区", jd: 117.186699, wd: 31.852336 },
    { name: "桂林路社区", jd: 117.214336, wd: 31.857147 },

    { name: "汇展园社区", jd: 117.212963, wd: 31.840816 },
    { name: "鲤鱼山路社区", jd: 117.212963, wd: 31.833087 },
    { name: "瑞昌街明山社区", jd: 117.225838, wd: 31.832795 },
    { name: "三工村上二队", jd: 117.225838, wd: 31.829003 },
    { name: "三工村下二队", jd: 117.231159, wd: 31.82842 },
    { name: "唐山路社区", jd: 117.230816, wd: 31.851461 },
    { name: "桂林路社区", jd: 117.214336, wd: 31.857147 },
    { name: "丰北社区", jd: 117.186699, wd: 31.852336 },
    { name: "汇展园社区", jd: 117.144985, wd: 31.851898 },
    { name: "丰北社区", jd: 117.186699, wd: 31.852336 },
    { name: "桂林路社区", jd: 117.214336, wd: 31.857147 }
  ]

  // 记录历史值，判断是否重叠路线
  const arrPathKey = {}

  for (let i = 0; i < arrPath.length; i++) {
    const endItem = arrPath[i]
    const endMpt = [endItem.wd, endItem.jd]

    if (i !== 0) {
      const startItem = arrPath[i - 1]
      const startMpt = [startItem.wd, startItem.jd]

      // 计算重叠次数
      let _key = startItem.name + endItem.name
      if (arrPathKey.hasOwnProperty(_key)) {
        arrPathKey[_key] = arrPathKey[_key] + 1
      } else {
        arrPathKey[_key] = 0

        _key = endItem.name + startItem.name
        if (!arrPathKey.hasOwnProperty(_key)) {
          arrPathKey[_key] = 0
        }
      }

      // const latlngs = [startMpt, endMpt]; //不做任何处理时
      const latlngs = getBezierPoints(startMpt, endMpt, arrPathKey[_key])

      const graphic = new mars2d.graphic.Polyline({
        latlngs,
        style: {
          color: "#0000ff",
          width: 3
        }
      })
      graphicLayer.addGraphic(graphic)
    }

    const num = i + 1
    const marker = new mars2d.graphic.DivGraphic({
      latlng: endMpt,
      style: {
        html: `<div style="width: 50px; height: 50px;">
                <img src="img/marker/b1.png" />
              </div>
              <div style="position: absolute;left:${num < 10 ? "22" : "18"}px;top: 3px; ">${num}</div>`,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      }
    })
    graphicLayer.addGraphic(marker)

    marker.bindPopup("<b>" + endItem.name + "</b>")
  }

  // map.fitBounds(graphicLayer.getBounds());

  // 开始运动：snakeIn 会按图层内矢量对象的添加顺序依次"生长"出来
  graphicLayer.snakeIn()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // snakeIn 是图层级动画，从地图移除图层即停止
  if (map && graphicLayer) {
    map.removeLayer(graphicLayer)
    graphicLayer = null
  }
  map = null
}

// ========== 4. 内部工具函数 ==========
// 计算贝塞尔曲线
function getBezierPoints(startMpt, endMpt, count) {
  if (count === 0) {
    return [startMpt, endMpt]
  }

  startMpt = L.latLng(startMpt)
  endMpt = L.latLng(endMpt)

  // turf 由 example.json 的 libs 全局加载，这里直接用全局变量
  const start = turf.point([startMpt.lng, startMpt.lat])
  const end = turf.point([endMpt.lng, endMpt.lat])
  const midpoint = turf.midpoint(start, end)

  // 偏移半径取两点距离的 1/20（distanceTo 返回米，除以 1000*20 后单位为公里）
  let distance = startMpt.distanceTo(endMpt) / (1000 * 20)
  distance = distance * count // 同一条线重叠越多，弯曲弧度越大，避免完全重合

  const bearing = turf.bearing(start, end) + 90
  const destination = turf.destination(midpoint, distance, bearing, { units: "kilometers" })

  const line = turf.lineString([start.geometry.coordinates, destination.geometry.coordinates, end.geometry.coordinates])
  const greatCircle = turf.bezierSpline(line)

  const latlngs = L.GeoJSON.coordsToLatLngs(greatCircle.geometry.coordinates)
  return latlngs
}

// ========== 5. 面板交互方法（动画控制）==========
export function onClickstart() {
  graphicLayer.snakeIn()
}
export function onClickOut() {
  graphicLayer.snakeOut()
}
export function onClickPause() {
  graphicLayer.snakePause()
}
export function onClickContinue() {
  graphicLayer.snakeContinue()
}
