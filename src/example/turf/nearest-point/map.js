/**
 * 示例：最近点分析
 * 演示：单击地图生成查询点，用 turf.nearestPoint 从机场数据中找出最近机场，并用虚线连线和 Popup 标注
 * API：mars2d.layer.GeoJsonLayer、graphic.toGeoJSON、turf.nearestPoint、map.on(mars2d.EventType.click)
 * 要点：机场数据异步加载，加载完成前单击地图只提示“正在加载”；单击监听用具名函数注册，卸载时用 map.off 解绑；机场数据来自 data.mars2d.cn 在线接口
 */
import * as mars2d from "mars2d"
const L = mars2d.L
let map
let graphicLayer
let pointLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 5,
  center: { lng: 112.166014, lat: 33.548525 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 机场点位图层：内嵌 poi 图标，数据由在线 geojson 异步加载
  pointLayer = new mars2d.layer.GeoJsonLayer({
    name: "机场",
    url: "//data.mars2d.cn/file/geojson/airport.json",
    symbol: {
      styleOptions: {
        image: "./img/marker/airportBlue.png",
        width: 25,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.CENTER
      }
    },
    popup: "{NAME}"
  })
  map.addLayer(pointLayer)

  // 点击地图进行最近飞机场分析
  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer({
    zIndex: 20 // 分析结果放在机场点位之上
  })
  map.addLayer(graphicLayer)

  map.on(mars2d.EventType.click, mapOnClickListener)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.off(mars2d.EventType.click, mapOnClickListener) // 解绑单击监听，避免示例切走后仍回调
    map.destroy() // 一并释放两个图层
    map = null
  }
  pointLayer = null
  graphicLayer = null
}

// ========== 4. 事件与交互：单击地图做最近点分析 ==========
// 覆盖全球经纬度的范围，用于过滤非法坐标（正常单击都会落在范围内）
const bounds = L.latLngBounds(L.latLng(90, 180), L.latLng(-90, -180))

function mapOnClickListener(e) {
  if (!bounds.contains(e.latlng)) {
    globalMsg("超出分析范围")
    return
  }

  // GeoJsonLayer 的 length 是已加载的要素数量，异步加载完成前为 0
  if (pointLayer.length === 0) {
    globalMsg("正在加载数据,请稍等......")

    return
  }

  graphicLayer.clear()

  // 生成查询点
  const queryPoint = new mars2d.graphic.Marker({
    latlng: e.latlng,
    style: {
      image: "./img/marker/fx1.png",
      width: 25,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.CENTER
    },
    popup: "查询点"
  })
  graphicLayer.addGraphic(queryPoint)

  // turf分析
  const targetPoint = queryPoint.toGeoJSON()
  const points = pointLayer.toGeoJSON()
  const nearest = turf.nearestPoint(targetPoint, points)
  if (!nearest) {
    return
  }

  const nearestPoint = mars2d.Util.geoJsonToGraphics(nearest)[0]

  // 连线：dashArray + 负的 dashSpeed 让虚线有流动感，去掉 dashSpeed 即为静态虚线
  const polyline = new mars2d.graphic.Polyline({
    latlngs: [e.latlng, nearestPoint.latlng],
    style: {
      width: 5,
      color: "red",
      dashArray: "5, 10",
      dashSpeed: -30 // 可以定义运动速度，注释后是静态的
    }
  })
  graphicLayer.addGraphic(polyline)

  // 终点
  const endPoint = new mars2d.graphic.Marker({
    latlng: nearestPoint.latlng,
    style: {
      image: "./img/marker/airportRed.png",
      width: 25,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.CENTER
    }
  })
  graphicLayer.addGraphic(endPoint)
  endPoint.bindPopup("离该点最近的机场为:<br />" + nearestPoint.attr.NAME).openPopup()
}

// ========== 5. 面板交互方法 ==========
export function clearlayer() {
  graphicLayer.clear()
}
