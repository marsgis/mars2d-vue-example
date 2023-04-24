import * as mars2d from "mars2d"

let map
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.238884, lat: 31.84417 }
}
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 默认显示地图中心点坐标
  const point = map.getCenter()
  point.format()
  eventTarget.fire("loadOK", { point })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 坐标转化的三种方法
export function marsUtilFormtNum(item, num) {
  return mars2d.Util.formatNum(item, num)
}

export function marsPointTrans(item) {
  return mars2d.PointTrans.degree2dms(item)
}

export function marsProj4Trans(JD, WD, radio) {
  if (radio === "2") {
    return mars2d.PointTrans.proj4Trans([JD, WD], mars2d.CRS.EPSG4326, mars2d.CRS.CGCS2000_GK_Zone_6)
  } else {
    return mars2d.PointTrans.proj4Trans([JD, WD], mars2d.CRS.EPSG4326, mars2d.CRS.CGCS2000_GK_Zone_3)
  }
}

let pointEntity
export function updateMarker(hasCenter, jd, wd) {
  const latlng = [wd, jd]

  if (pointEntity == null) {
    pointEntity = new mars2d.graphic.Marker({
      latlng: latlng,
      style: {
        image: "img/marker/mark1.png",
        width: 32,
        height: 44,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      }
    })
    map.graphicLayer.addGraphic(pointEntity)
  } else {
    pointEntity.latlng = latlng
  }

  if (hasCenter) {
    map.flyToGraphic(pointEntity)
  }
}

// 地图选点
export function bindMourseClick() {
  map.once(mars2d.EventType.click, function (event) {
    const coordinate = event.latlng
    eventTarget.fire("clickMap", { coordinate })
  })
}
