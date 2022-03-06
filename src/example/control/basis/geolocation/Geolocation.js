// 采用高德地图定位的算法
// 参考帮助文档：https://lbs.amap.com/api/javascript-api/guide/services/geolocation

class Geolocation extends mars2d.control.ToolButton {
  stopTracking() {
    this.clearLocationPoint()
  }

  startTracking(map) {
    AMap.plugin("AMap.Geolocation", () => {
      if (!this.geolocation) {
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          convert: true // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        })
      }

      this.geolocation.getCurrentPosition()
      AMap.event.addListener(this.geolocation, "complete", (data) => {
        // data是具体的定位信息
        const wgsPoint = mars2d.PointTrans.gcj2wgs([data.position.lng, data.position.lat])
        this.flyToLocation(map, { lng: wgsPoint[0], lat: wgsPoint[1] })
      })
      AMap.event.addListener(this.geolocation, "error", (data) => {
        // 定位出错,参考：https://lbs.amap.com/faq/js-api/map-js-api/position-related
        globalMsg(data.message, "定位失败")
      })
    })
  }

  flyToLocation(map, position) {
    this.clearLocationPoint()
    const graphic = new mars2d.graphic.DivLightPoint({
      position: position,
      style: {
        color: "#ffff00",
        clampToGround: true
      },
      tooltip: "我的位置：" + position.lng + "," + position.lat
    })
    map.graphicLayer.addGraphic(graphic)

    map.flyToGraphic(graphic)

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
