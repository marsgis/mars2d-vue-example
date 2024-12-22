import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象
let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 14,
  center: { lng: 117.189154, lat: 31.844478 }
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

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

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

  // 开始运动
  graphicLayer.snakeIn()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 计算贝塞尔曲线
function getBezierPoints(startMpt, endMpt, count) {
  if (count === 0) {
    return [startMpt, endMpt]
  }

  startMpt = L.latLng(startMpt)
  endMpt = L.latLng(endMpt)

  const start = turf.point([startMpt.lng, startMpt.lat])
  const end = turf.point([endMpt.lng, endMpt.lat])
  const midpoint = turf.midpoint(start, end)

  let distance = startMpt.distanceTo(endMpt) / (1000 * 20)
  distance = distance * count

  const bearing = turf.bearing(start, end) + 90
  const destination = turf.destination(midpoint, distance, bearing, { units: "kilometers" })

  const line = turf.lineString([start.geometry.coordinates, destination.geometry.coordinates, end.geometry.coordinates])
  const greatCircle = turf.bezierSpline(line)

  const latlngs = L.GeoJSON.coordsToLatLngs(greatCircle.geometry.coordinates)
  return latlngs
}

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
