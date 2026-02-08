import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
const L = mars2d.L
export let graphicLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数

export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1()
  addDemoGraphic2()
  addDemoGraphic3()
  addDemoGraphic4()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addDemoGraphic1() {
  const graphic = new mars2d.graphic.BouncingMarker({
    latlng: [31.854628, 117.245425],
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

  graphic.bounce()
}

function addDemoGraphic2() {
  const graphic = new mars2d.graphic.BouncingMarker({
    latlng: L.latLng(31.810858, 117.21),
    style: {
      image: "img/marker/fx1.png",
      width: 30,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.CENTER
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)

  graphic.on("click", function () {
    this.bounce(2) // bounce 2 times
  })

  graphic.on("bounceend", function () {
    console.log("bounce end")
  })
}

function addDemoGraphic3() {
  const graphic = new mars2d.graphic.BouncingMarker({
    latlng: L.latLng(31.818606, 117.296904),
    style: {
      image: "img/marker/bike.png",
      iconSize: [25, 39],
      bounceTimes: 6,
      bounceHeight: 60,
      bounceSpeed: 54,
      exclusive: true
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic4() {
  const graphic = new mars2d.graphic.BouncingMarker({
    latlng: L.latLng(31.838606, 117.296904),
    style: {
      image: "img/marker/mark2.png",
      iconSize: [25, 39]
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)

  graphic.on("click", function () {
    this.toggleBouncing()
  })
}
export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "bouncingMarker",
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    success: function (graphic) {
      graphic.bounce()
      console.log("标绘完成", graphic)
    }
  })
}
