import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 9,
  center: { lng: 116.976929, lat: 39.240763 }
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

  // 创建div数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 添加矢量数据
  addGraphic([38.841847, 115.699768], { value: 0.53, color: "#fb980b" })
  addGraphic([39.863371, 116.567688], { value: 0.45, color: "#00ff00" })
  addGraphic([39.520992, 118.407898], { value: 0.35, color: "#00ffff" })
  addGraphic([38.300715, 117.064819], { value: 0.21, color: "#ff0000" })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addGraphic(latlng, attr) {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: latlng,
    style: {
      html: `<div style="width: 80px;height:80px;"></div>`,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: attr
  })
  graphic.on(mars2d.EventType.add, function (e) {
    const dom = e.target.container.firstChild
    const attr = e.target.attr

    const liquidfillchartChart = echarts.init(dom)

    // 参考API：https://github.com/ecomfe/echarts-liquidfill
    // 参考示例：https://www.makeapie.com/explore.html#tags=liquidFill~sort=rank~timeframe=all~author=all
    const option = {
      series: [
        {
          type: "liquidFill",
          radius: "100%",
          outline: { show: false },
          color: [attr.color],
          data: [attr.value],
          label: {
            normal: {
              color: "#294D99",
              insideColor: "#fff",
              fontSize: 20
            }
          }
        }
      ]
    }
    liquidfillchartChart.setOption(option)
  })
  graphicLayer.addGraphic(graphic)
}
