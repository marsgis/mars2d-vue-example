import * as mars2d from "mars2d"

const L = mars2d.L

export let map // mars2d.Map二维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.268238, lat: 31.898838 }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
}

// 释放当前地图业务的生命周期函数
export function onUnmounted() {
  map = null
}

function addDemoGraphic1(graphicLayer) {
  // 点状数据的坐标是传 latlng 参数
  const graphic = new mars2d.graphic.Marker({
    // latlng: new L.LatLng(31.85256, 117.273005), // 支持多种类型坐标格式
    // latlng: mars2d.PointTrans.coord2latlng([117.273005, 31.85256]),
    latlng: [31.85256, 117.273005],
    style: {
      image: "img/marker/mark4.png",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "点状数据lntlng" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic2(graphicLayer) {
  // 线面状数据的坐标是传 lntlngs 参数
  const graphic = new mars2d.graphic.Polyline({
    // latlngs: mars2d.PointTrans.coords2latlngs([
    //   [117.196025, 31.857727, 28.5],
    //   [117.222151, 31.933714, 28.6],
    //   [117.271754, 31.880436, 17.7],
    //   [117.313793, 31.942161, 32.6],
    //   [117.349382, 31.872473, 16.9]
    // ]),
    latlngs: [
      [31.857727, 117.196025, 28.5],
      [31.933714, 117.222151, 28.6],
      [31.880436, 117.271754, 17.7],
      [31.942161, 117.313793, 32.6],
      [31.872473, 117.349382, 16.9]
    ],
    style: {
      width: 5,
      color: "#3388ff"
    },
    attr: { remark: "线面状数据坐标latlngs" }
  })
  graphicLayer.addGraphic(graphic)
}

// 在图层绑定Popup弹窗
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event?.attr || {}
    attr["类型"] = event.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars2d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
  })
}

// 绑定右键菜单
export function bindLayerContextMenu() {
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
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
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
      callback: (e) => {
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
      callback: (e) => {
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
      show: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "polyline" || graphic.type === "brushLine"
      },
      callback: (e) => {
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
