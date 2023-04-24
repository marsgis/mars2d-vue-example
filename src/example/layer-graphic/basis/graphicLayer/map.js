import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
const L = mars2d.L
export let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.251587, lat: 31.81748 }
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
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，
  // 2.在layer上绑定监听事件
  initLayerManager()

  // 加一些演示数据
  addDemoGraphic1()
  addDemoGraphic2()
  addDemoGraphic3()
  addDemoGraphic4()
  addDemoGraphic5()
  addDemoGraphic6()
  addDemoGraphic7()
  addDemoGraphic8()
  addDemoGraphic9()
  addDemoGraphic10()
  addDemoGraphic11()
  addDemoGraphic12()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 图标点
function addDemoGraphic1() {
  const graphic = new mars2d.graphic.Marker({
    latlng: [31.854628, 117.245425],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      // rotationAngle: 90,
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

// 运动点
function addDemoGraphic2() {
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
    latlngs: latlngs,
    durations: [3000, 9000, 9000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
    style: {
      image: "img/marker/bike.png",
      iconSize: [25, 39],
      autostart: true
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(movingMarker)

  // 放个线参考
  const graphic = new mars2d.graphic.Polyline({
    latlngs: latlngs,
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

// 像素点
function addDemoGraphic3() {
  const graphic = new mars2d.graphic.Point({
    latlng: L.latLng(31.842639, 117.225795),
    style: {
      pixelSize: 10,
      // fill: true,
      color: "#00ffff",
      opacity: 0.3,
      outline: true,
      outlineColor: "#00ff00",
      outlineOpacity: 1.0
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

// 文本
function addDemoGraphic4() {
  const graphic = new mars2d.graphic.Label({
    latlng: L.latLng(31.818606, 117.296904),
    style: {
      text: "安徽合肥欢迎您",
      color: "#0000FF",
      font_size: 25,
      font_family: "楷体"
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)
}

// 一个黑色面板，指向左下角黄色连线
function addDemoGraphic5() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.822294, 117.221761],
    style: {
      html: `<div class="marsBlackPanel  animation-spaceInDown">
                    <div class="marsBlackPanel-text">大湖名城,创新高地</div>
                </div>`
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic)

  // graphic.testPoint = true; //打开测试点，与DIV点进行对比位置调整css
}

// 圆
function addDemoGraphic6() {
  const graphic = new mars2d.graphic.Circle({
    latlng: L.latLng(31.818606, 117.296904),
    style: {
      radius: 2500, // 单位：米
      fill: true,
      fillColor: "#ff0000",
      fillOpacity: 0.3,
      outline: false
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic)
}

// 椭圆
function addDemoGraphic7() {
  const graphic = new mars2d.graphic.Ellipse({
    latlng: [31.81748, 117.251587],
    style: {
      semiMinorAxis: 1000, // 单位：米
      semiMajorAxis: 2000,
      rotation: 0,

      fill: true,
      fillColor: "#00ffff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#00ff00",
      outlineOpacity: 0.5
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic)
}

// 线
function addDemoGraphic8() {
  const colors = ["rgb(255, 0, 100)", "rgb(20, 200, 100)", "rgb(0, 0, 255)"]

  const graphic = new mars2d.graphic.Polyline({
    latlngs: [
      [31.809299, 117.163284],
      [31.777104, 117.169052],
      [31.764332, 117.211006]
    ],
    style: {
      width: 4,
      gradientColors: colors
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}

// 平行线
function addDemoGraphic9() {
  const coords = [
    [31.853069, 117.154857],
    [31.848546, 117.15404],
    [31.846285, 117.153482],
    [31.844166, 117.151462],
    [31.84183, 117.150301],
    [31.839572, 117.151505],
    [31.836659, 117.153999],
    [31.834728, 117.155159],
    [31.833051, 117.155461]
  ]

  const middleLine = new mars2d.graphic.Polyline({
    latlngs: coords,
    style: {
      width: 1,
      dashArray: "5,10",
      color: "black",
      opacity: 0.3
    },
    attr: { remark: "示例9" }
  })
  graphicLayer.addGraphic(middleLine)

  const leftLine = new mars2d.graphic.Polyline({
    latlngs: coords,
    style: {
      color: "#f00",
      opacity: 1,
      offset: -6
    }
  })
  graphicLayer.addGraphic(leftLine)

  const rightLine = new mars2d.graphic.Polyline({
    latlngs: coords,
    style: {
      color: "#080",
      opacity: 1,
      offset: 6
    }
  })
  graphicLayer.addGraphic(rightLine)
}

// 矩形
function addDemoGraphic10() {
  const latlngs = [
    [31.870639, 117.271662],
    [31.8491, 117.247705]
  ]
  const graphic = new mars2d.graphic.Rectangle({
    latlngs: latlngs,
    style: {
      fill: true,
      fillColor: "#3388ff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000FF",
      outlineOpacity: 0.5
    },
    attr: { remark: "示例10" }
  })
  graphicLayer.addGraphic(graphic)
}

// 图片
function addDemoGraphic11() {
  const graphic = new mars2d.graphic.Image({
    latlngs: mars2d.PointTrans.coords2latlngs([
      [117.170734, 31.788157],
      [117.170734, 31.823752],
      [117.206955, 31.823752],
      [117.206955, 31.788157],
      [117.170734, 31.788157]
    ]),
    style: {
      opacity: 1,
      stroke: false,
      fill: true,
      fillColor: "#ffffff",
      fillOpacity: 0.01,
      url: "img/simple/gugong.jpg"
    },
    attr: { remark: "示例11" }
  })
  graphicLayer.addGraphic(graphic)
}

// 水面
function addDemoGraphic12() {
  // 经纬度 转为leafelt的纬度、经度标准
  const latlngs = mars2d.PointTrans.coords2latlngs([
    [117.216386, 31.815376, 35.16],
    [117.222533, 31.81729, 29.21],
    [117.22642, 31.814983, 28.43],
    [117.22681, 31.810739, 28.55],
    [117.212868, 31.811302, 34.4],
    [117.212538, 31.81424, 31.87],
    [117.214681, 31.81402, 32.97]
  ])
  const graphic = new mars2d.graphic.Polygon({
    latlngs: latlngs,
    style: {
      fill: true,
      image: "img/fill/movingRiver.png",
      outline: true,
      outlineWidth: 6,
      outlineColor: "#00ffff",
      outlineOpacity: 1.0
    },
    attr: { remark: "示例12" }
  })
  graphicLayer.addGraphic(graphic)
}

// 在图层级处理一些事物
function initLayerManager() {
  // 在layer上绑定监听事件
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu()

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerPopup()

  eventTarget.fire("defuatData", {
    enabledShowHide: true,
    enabledPopup: true,
    enabledTooltip: false,
    enabledRightMenu: true
  })
}

// 绑定popup
function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event?.attr || {}
    attr["类型"] = event.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars2d.Util.getTemplateHtml({ title: "layer上绑定的Popup", template: "all", attr: attr })
  })
}

// 绑定右键菜单
function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
        {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.editing) {
          return false
        }
        return !graphic.editing.enabled()
      },
      callback: function (e) {
        const graphic = e.graphic
        graphicLayer.startEditing(graphic)
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.editing) {
          return false
        }
        return graphic.editing.enabled()
      },
      callback: function (e) {
        const graphic = e.graphic
        graphicLayer.stopEditing()
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "polyline" || graphic.type === "brushLine"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars2d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}
