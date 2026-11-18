/**
 * 示例：弹跳图标点
 * 演示：BouncingMarker 弹跳动画点，包含持续弹跳、点击触发弹跳、样式参数控制
 * API：mars2d.graphic.BouncingMarker、mars2d.layer.GraphicLayer
 * 要点：bounce(n) 的 n 是弹跳次数；bounceTimes/bounceHeight/bounceSpeed 控制弹跳节奏；事件回调里的 this 指向矢量对象，必须用普通 function；exclusive:true 时其它弹跳点会停止
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
const L = mars2d.L
export let graphicLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
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

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  // 解绑面板通过 eventTarget 注册的事件，避免旧面板回调残留
  eventTarget.off()
  if (graphicLayer) {
    // 从地图移除矢量图层：弹跳动画随矢量对象一起停止
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}

// ========== 3. 矢量对象（演示数据）==========
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

  // 事件回调里 this 指向矢量对象本身，必须用普通 function（箭头函数取不到 this）
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

// ========== 4. 面板交互方法 ==========
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
