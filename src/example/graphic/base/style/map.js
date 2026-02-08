import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  center: { lng: 117.294159, lat: 31.845774 }
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
  addDemoGraphic3(graphicLayer)
}

// 释放当前地图业务的生命周期函数
export function onUnmounted() {
  map = null
}

function addDemoGraphic1(graphicLayer) {
  // style是控制外观的，决定对象长什么样
  // 每个type类型的矢量对象style都不一样，具体参考各类型对象的API文档
  const graphic = new mars2d.graphic.Label({
    latlng: [31.839868, 117.13151],
    style: {
      text: "火星科技Mars3D平台",
      font_size: 25,
      font_family: "楷体",
      font_style: "italic",
      color: "#ffffff",
      border: true,
      border_color: "#00b6ff",
      border_width: 3,
      background: true,
      background_color: "#000000",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例Label" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic2(graphicLayer) {
  const graphic = new mars2d.graphic.Polyline({
    latlngs: [
      [31.858878, 117.195937],
      [31.948975, 117.249131],
      [31.870677, 117.288609],
      [31.943583, 117.350181],
      [31.868943, 117.378201]
    ],
    style: {
      color: "#ff0000",
      width: 3
    },
    attr: { remark: "示例Polyline" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3(graphicLayer) {
  const graphic = new mars2d.graphic.Polygon({
    latlngs: [
      [31.809438, 117.218465],
      [31.798561, 117.275697],
      [31.750187, 117.293955],
      [31.734101, 117.261243],
      [31.76214, 117.186822]
    ],
    style: {
      fill: true,
      image: "img/fill/redLine.png",
      imageOpacity: 1,
      fillColor: "#00ff00",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#1677ff",
      outlineOpacity: 1.0
    },
    attr: { remark: "示例Polygon" },
    popup: "示例Polygon"
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
