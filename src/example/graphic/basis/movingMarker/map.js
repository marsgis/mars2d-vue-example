import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.193771, lat: 31.83547 }
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

// 沿红线自动运动
function addDemoGraphic1(graphicLayer) {
  const latlngs = [
    [31.85044, 117.102757],
    [31.851607, 117.143269],
    [31.852919, 117.185154],
    [31.857002, 117.216396],
    [31.851607, 117.233219],
    [31.854085, 117.253132],
    [31.872893, 117.252102],
    [31.872164, 117.236652],
    [31.873184, 117.22086],
    [31.875663, 117.21365]
  ]
  const movingMarker = new mars2d.graphic.MovingMarker({
    latlngs,
    durations: [3000, 9000, 9000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
    style: {
      image: "img/marker/bike.png",
      iconSize: [25, 39],
      autostart: true
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(movingMarker)

  // 放个线参考
  const graphic = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      color: "#0000ff",
      width: 2
    }
  })
  graphicLayer.addGraphic(graphic)

  movingMarker.on("end", function () {
    movingMarker.bindPopup("<b>运动完成了!</b>", { closeOnClick: false }).openPopup()
  })
}

// 每个点停顿一会
function addDemoGraphic2(graphicLayer) {
  const graphic = new mars2d.graphic.MovingMarker({
    latlngs: [
      [31.829441, 117.113914],
      [31.830607, 117.133656],
      [31.820689, 117.132969],
      [31.822148, 117.15992],
      [31.820835, 117.176914],
      [31.814563, 117.192364],
      [31.803768, 117.184124],
      [31.802747, 117.170906],
      [31.804351, 117.158546],
      [31.802601, 117.131252]
    ],
    durations: 10000,
    style: {
      image: "img/marker/bike.png",
      iconSize: [25, 39],
      autostart: true
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)

  graphic.addStation(1, 2000)
  graphic.addStation(2, 2000)
  graphic.addStation(3, 2000)
  graphic.addStation(4, 2000)
}

// 单击后图上开始运动
function addDemoGraphic3(graphicLayer) {
  const graphic = new mars2d.graphic.MovingMarker({
    latlngs: [
      [31.817418, 117.282074],
      [31.806472, 117.163788]
    ],
    durations: 10000,
    style: {
      image: "img/marker/bike.png",
      iconSize: [25, 39],
      autostart: false
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)

  graphic.bindPopup("<b>单击我开始运动!</b>").openPopup()

  graphic.once("click", function () {
    graphic.closePopup()
    graphic.unbindPopup()
    graphic.start()

    graphic.on("click", function () {
      if (graphic.isRunning) {
        graphic.pause()
      } else {
        graphic.start()
      }
    })

    setTimeout(function () {
      graphic.bindPopup("<b>单击我暂停或继续运动!</b>").openPopup()
    }, 2000)
  })
}
