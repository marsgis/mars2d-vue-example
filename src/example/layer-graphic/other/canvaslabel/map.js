import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象
let canvasLabelRenderer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  canvasLabelRenderer = new L.CanvasLabel({
    defaultLabelStyle: {
      collisionFlg: true,
      scale: 1,
      strokeStyle: "#000",
      fillStyle: "#fff",
      lineWidth: 3
    }
  })

  option.renderer = canvasLabelRenderer
  return option
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 定义事件
  canvasLabelRenderer.addOnClickListener(function (e, data) {
    console.log("click", data)
  })

  // canvasLabelRenderer.addOnHoverListener(function (e, data) {
  //   console.log("mousemove", data)
  // })

  // canvasLabelRenderer.addOnMouseDownListener(function (e, data) {
  //   console.log("mousedown", data)
  // })

  // canvasLabelRenderer.addOnMouseUpListener(function (e, data) {
  //   console.log("mouseup", data)
  // })

  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 线
  const graphicLine = new mars2d.graphic.Polyline({
    latlngs: [
      [31.748022, 117.068253],
      [31.756488, 117.419901],
      [31.899129, 117.413292]
    ],
    style: {
      width: 3,
      color: "#fe57a1",

      labelStyle: {
        text: "我是线上的文本",
        stroke: true,
        color: "#ff0000",
        font: "16px 'Microsoft Yahei'"
      }
    }
  })
  graphicLayer.addGraphic(graphicLine)

  // 点 添加随机数据演示
  for (let i = 0; i < 1000; i++) {
    const latlng = getRandomLatLng()
    const graphic = new mars2d.graphic.Point({
      latlng,
      style: {
        pixelSize: 2,
        color: "#3388ff",

        labelStyle: {
          text: "火星科技\n Mars2D",
          stroke: true,
          color: "#3388ff",
          font: "15px 'Microsoft Yahei'",
          offsetX: -70,
          offsetY: -10
        }
      }
    })
    graphicLayer.addGraphic(graphic)

    graphic.bindPopup("火星科技 mars2d.cn")
  }
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function setCollisionDetection(flg) {
  canvasLabelRenderer.options.defaultLabelStyle.collisionFlg = flg
  map.fitBounds(map.getBounds())
}

function getRandomLatLng() {
  const bounds = map.getBounds()
  const southWest = bounds.getSouthWest()
  const northEast = bounds.getNorthEast()
  const lngSpan = northEast.lng - southWest.lng
  const latSpan = northEast.lat - southWest.lat
  return L.latLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random())
}
