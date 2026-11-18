/**
 * 示例：路径规划查询
 * 演示：用 mars2d.query.QueryRoute 调用高德/天地图/百度路径规划服务，途经起点、终点选点后按步行/骑行/驾车查询路线并上图，同时显示距离、耗时与导航文字
 * API：mars2d.query.QueryRoute、mars2d.graphic.Polyline、mars2d.MeasureUtil.formatDistance
 * 要点：依赖外网在线路径规划服务（示例 token 不保证长期有效）；起点/终点用 map.graphicLayer.startDraw 绘制，查询时取 coordinates（[经度, 纬度]）；服务返回的 points 是 [经度, 纬度] 的 WGS84 数组，需 PointTrans.coords2latlngs 转成 LatLng 再上图
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let routeLayer // 路径线所在图层
let routeQuery // 路径规划查询服务（QueryRoute 实例）

// 当前页面业务相关
let startGraphic, endGraphic // 起点、终点标绘对象（画在 map.graphicLayer 上）

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 31.797919, lng: 117.281329, alt: 36236, heading: 358, pitch: -81 }
}

// 事件对象，用于抛出事件到vue中
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  routeLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(routeLayer)

  routeQuery = new mars2d.query.QueryRoute({
    service: mars2d.QueryServiceType.GAODE
  })
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (!map) {
    return
  }
  // 起终点画在 map.graphicLayer 上，逐个移除；路径线在自建图层里，整体移除
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }
  if (routeLayer) {
    map.removeLayer(routeLayer)
    routeLayer = null
  }
  // 查询服务只保存服务地址与 token，无 DOM/定时器
  routeQuery = null
  map = null
}

// ========== 4. 面板交互方法：切换服务与选点 ==========
// 清除按钮
export function removeAll() {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }

  routeLayer.clear()
}

// 切换服务
export function changeService(type) {
  routeQuery.setOptions({ service: type })
}

// 起点按钮
export function startPoint() {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }

  map.graphicLayer.startDraw({
    type: "marker",
    style: {
      image: "img/marker/start.png"
    },
    success: function (graphic) {
      startGraphic = graphic

      const point = graphic.latlng

      // 触发自定义事件，改变输入框的值
      eventTarget.fire("start", { point })
    }
  })
}

// 终点按钮
export function endPoint() {
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }

  map.graphicLayer.startDraw({
    type: "marker",
    style: {
      image: "img/marker/end.png",
      width: 32,
      height: 44
    },
    success: function (graphic) {
      endGraphic = graphic

      const point = graphic.latlng
      // point.format()

      // 触发自定义事件，改变输入框的值
      eventTarget.fire("end", { point })
    }
  })
}

// ========== 5. 路径查询 ==========
export function queryRoute(type) {
  if (!startGraphic || !endGraphic) {
    return
  }

  routeLayer.clear()
  showLoading()

  routeQuery.query({
    type: Number(type),
    points: [startGraphic.coordinates[0], endGraphic.coordinates[0]],
    success: function (data) {
      hideLoading()
      const firstItem = data.paths[0]
      const points = firstItem.points

      if (!points || points.length < 1) {
        return
      }

      const time = mars2d.Util.formatTime(firstItem.allDuration)
      const distance = mars2d.MeasureUtil.formatDistance(firstItem.allDistance)
      const html = "<div>总距离：" + distance + "<br/>所需时间：" + time + "</div>"

      // 服务返回的路径点是 [经度, 纬度] 数组，转成 LatLng 才能上图
      const latlngs = mars2d.PointTrans.coords2latlngs(points)

      const graphic = new mars2d.graphic.Polyline({
        latlngs,
        style: {
          color: "#20a0ff",
          width: 5
        },
        attr: firstItem,
        popup: html
      })
      routeLayer.addGraphic(graphic)

      const allTime = mars2d.Util.formatTime(firstItem.allDuration)
      const allDistance = mars2d.MeasureUtil.formatDistance(firstItem.allDistance)
      let dhHtml = ""
      for (let i = 0; i < firstItem.steps.length; i++) {
        const item = firstItem.steps[i]
        dhHtml += item.instruction + "；"
      }

      eventTarget.fire("analyse", { allTime, allDistance, dhHtml })
    },
    error: function (msg) {
      hideLoading()
      globalAlert(msg)
    }
  })
}

// ========== 6. 面板交互方法：清除与导出 ==========
// 点击保存GeoJSON
export function saveGeoJSON() {
  if (routeLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = routeLayer.toGeoJSON()
  mars2d.Util.downloadFile("导航路径.json", JSON.stringify(geojson))
}
