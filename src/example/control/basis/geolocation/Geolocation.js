// 采用高德地图定位的算法 ， 参考帮助文档：https://lbs.amap.com/api/javascript-api/guide/services/geolocation
class Geolocation extends mars2d.control.ToolButton {
  constructor(options = {}) {
    super({
      position: "bottomleft",
      title: "GPS定位",
      ...options
    })
  }

  _mountedHook() {
    L.DomUtil.addClass(this._container.firstChild, "mars2d-toolbar-locate")
  }

  _onClick() {
    this.startTracking()
  }

  stopTracking() {
    L.DomUtil.removeClass(this._container.firstChild, "mars2d-toolbar-locate")
    L.DomUtil.addClass(this._container.firstChild, "mars2d-toolbar-locate-loading")

    this.clearLocationPoint()
  }

  startTracking() {
    AMap.plugin("AMap.Geolocation", () => {
      L.DomUtil.removeClass(this._container.firstChild, "mars2d-toolbar-locate-loading")
      L.DomUtil.addClass(this._container.firstChild, "mars2d-toolbar-locate")

      if (!this.geolocation) {
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          convert: true // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        })
      }

      // eslint-disable-next-line
      const that = this
      this.geolocation.getCurrentPosition()

      function onComplete(data) {
        // data是具体的定位信息
        const wgsPoint = mars2d.PointTrans.gcj2wgs([data.position.lng, data.position.lat])
        that.flyToLocation(L.latLng(wgsPoint[1], wgsPoint[0]))
      }

      function onError(data) {
        // 定位出错,参考：https://lbs.amap.com/faq/js-api/map-js-api/position-related
        mars2d.Util.msg(data.message, "定位失败")
      }
      AMap.event.addListener(this.geolocation, "complete", onComplete)
      AMap.event.addListener(this.geolocation, "error", onError)
    })
  }

  flyToLocation(latlng) {
    L.DomUtil.removeClass(this._container, "mars2d-toolbar-locate-loading")
    L.DomUtil.addClass(this._container, "mars2d-toolbar-locate")

    this._map.flyToPoint(latlng)

    this.clearLocationPoint()
    const graphic = new mars2d.graphic.DivLightPoint({
      latlng: latlng,
      style: {
        color: "#0000ff"
      },
      tooltip: "我的位置：" + latlng.lng + "," + latlng.lat
    })
    this._map.graphicLayer.addGraphic(graphic)

    this.graphic = graphic
  }

  clearLocationPoint() {
    if (!this.graphic) {
      return
    }
    this.graphic.remove()
    this.graphic = null
  }
}
