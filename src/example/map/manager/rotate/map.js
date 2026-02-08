import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
let graphicLayer

const L = mars2d.L

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 参考 https://github.com/Raruto/leaflet-rotate#readme
export const mapOptions = {
  rotate: true,
  rotateControl: {
    closeOnZeroBearing: false
  },
  bearing: 0
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  addGraphic1()
  addGraphic2()
  addGraphic3()
}

function addGraphic1() {
  const points = [
    [31.851607, 117.182922],
    [31.869977, 117.229271],
    [31.844753, 117.270641],
    [31.823607, 117.242832],
    [31.824336, 117.299824],
    [31.794139, 117.244205]
  ]

  points.forEach((item) => {
    const graphic = new mars2d.graphic.Marker({
      latlng: item,
      style: {
        image: "img/marker/mark1.png",
        width: 32,
        height: 44,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      },
      attr: { remark: "示例1" }
    })
    graphicLayer.addGraphic(graphic)
  })
}

function addGraphic2() {
  const latlngs = mars2d.PointTrans.coords2latlngs([
    [117.220337, 31.832987, 42.8],
    [117.220242, 31.835234, 45.6],
    [117.216263, 31.835251, 39.3],
    [117.217219, 31.819929, 35.8],
    [117.223096, 31.818342, 29.8],
    [117.249686, 31.818964, 40.1],
    [117.263171, 31.816664, 35.2],
    [117.278695, 31.816107, 35.5],
    [117.279826, 31.804185, 34.5],
    [117.286308, 31.804112, 29.2],
    [117.28621, 31.801059, 24.6]
  ])
  const graphic = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      color: "#ff0000",
      width: 3
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic3() {
  // 经纬度 转为leafelt的纬度、经度标准
  const latlngs = mars2d.PointTrans.coords2latlngs([
    [117.271662, 31.870639, 21.49],
    [117.290605, 31.871517, 19.47],
    [117.302056, 31.858145, 16.27],
    [117.299439, 31.847545, 14.77],
    [117.267705, 31.8491, 22.11]
  ])

  const graphic = new mars2d.graphic.Polygon({
    latlngs,
    style: {
      fill: true,
      fillColor: "#3388ff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000FF",
      outlineOpacity: 0.5
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function changeRotate(val) {
  map.setBearing(val)
}
