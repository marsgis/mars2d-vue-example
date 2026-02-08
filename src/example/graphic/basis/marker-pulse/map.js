import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
  addDemoGraphic3(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addDemoGraphic1(graphicLayer) {
  // 增加pulsate动画点
  const graphic = new mars2d.graphic.Marker({
    latlng: [31.854628, 117.245425],
    style: {
      width: 20,
      pulse: true,
      pulseColor: "#ff0000"
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic2(graphicLayer) {
  const graphic = new mars2d.graphic.Marker({
    latlng: L.latLng(31.810858, 117.21),
    style: {
      width: 15,
      pulse: true,
      pulseColor: "#0000ff"
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3(graphicLayer) {
  const graphic = new mars2d.graphic.Marker({
    latlng: L.latLng(31.818606, 117.296904),
    style: {
      width: 15,
      pulse: true,
      pulseColor: "#00ff00",
      pulseShadowColor: "#ff0000",
      pulseDuration: 2
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}
