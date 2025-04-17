import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let routeLayer
let query

// 当前页面业务相关
let startGraphic, endGraphic

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 31.797919, lng: 117.281329, alt: 36236, heading: 358, pitch: -81 }
}

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  routeLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(routeLayer)

  query = new mars2d.query.QueryRoute({
    service: mars2d.QueryServiceType.GAODE
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

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
  query.setOptions({ service: type })
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

export function queryRoute(type) {
  if (!startGraphic || !endGraphic) {
    return
  }

  routeLayer.clear()
  showLoading()

  query.query({
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

// 点击保存GeoJSON
export function saveGeoJSON() {
  if (routeLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = routeLayer.toGeoJSON()
  mars2d.Util.downloadFile("导航路径.json", JSON.stringify(geojson))
}
