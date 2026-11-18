/**
 * 示例：坐标拾取和转换
 * 演示：在地图上拾取点位并做坐标转换（十进制度 / 度分秒 / CGCS2000 平面坐标），同时用 Marker 标出定位点
 * API：mars2d.PointTrans.degree2dms、mars2d.PointTrans.proj4Trans、mars2d.graphic.Marker
 * 要点：几何参数统一是 [纬度, 经度]（Leaflet 习惯），而转换接口传 [经度, 纬度]；平面坐标要区分三度带/六度带；图上拾取用 once 实现，重复点击按钮前要先解绑
 */
import * as mars2d from "mars2d"

let map
let pointEntity // 面板「坐标定位」用的标记对象
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.238884, lat: 31.84417 }
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 默认显示地图中心点坐标（format() 保留 6 位小数，避免面板显示过长）
  const point = map.getCenter()
  point.format()
  eventTarget.fire("loadOK", { point })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.off(mars2d.EventType.click, onMapClickHandler)
    map.destroy() // 一并释放 graphicLayer 中的定位点 Marker
    map = null
  }
  pointEntity = null
}

// ========== 3. 坐标转换方法（面板调用）==========
// 供面板在错过 loadOK 事件时主动读取当前中心点
export function getCenter() {
  return map.getCenter()
}

// 坐标转化的三种方法
export function marsUtilFormtNum(item, num) {
  return mars2d.Util.formatNum(item, num)
}

export function marsPointTrans(item) {
  return mars2d.PointTrans.degree2dms(item)
}

export function marsProj4Trans(JD, WD, radio) {
  // 参数顺序必须是 [经度, 纬度]；radio==="2" 表示六度带，否则为三度带
  if (radio === "2") {
    return mars2d.PointTrans.proj4Trans([JD, WD], mars2d.CRS.EPSG4326, mars2d.CRS.CGCS2000_GK_Zone_6)
  } else {
    return mars2d.PointTrans.proj4Trans([JD, WD], mars2d.CRS.EPSG4326, mars2d.CRS.CGCS2000_GK_Zone_3)
  }
}

// ========== 4. 矢量对象与地图拾取 ==========
export function updateMarker(hasCenter, jd, wd) {
  const latlng = [wd, jd]

  if (pointEntity == null) {
    pointEntity = new mars2d.graphic.Marker({
      latlng,
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
    pointEntity.latlng = latlng // 已存在时只移动位置
  }

  if (hasCenter) {
    map.flyToGraphic(pointEntity)
  }
}

// 地图选点：每次点击只拾取一次
export function bindMourseClick() {
  // 反复点击「图上拾取」按钮时先解绑上一次，避免一次点击触发多次 clickMap 事件
  map.off(mars2d.EventType.click, onMapClickHandler)
  map.once(mars2d.EventType.click, onMapClickHandler)
}

function onMapClickHandler(event) {
  const coordinate = event.latlng
  eventTarget.fire("clickMap", { coordinate })
}
