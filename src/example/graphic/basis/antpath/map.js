import * as mars2d from "mars2d"
const L = mars2d.L

export let map // mars2d.Map三维地图对象
export let graphicLayer

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
  graphicLayer = new mars2d.layer.GraphicLayer({})
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，
  initLayerManager()

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
  // 经纬度 转为leafelt的纬度、经度标准
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
  console.log(latlngs)

  const graphic = new mars2d.graphic.AntPath({
    latlngs,
    style: {
      color: "#0000ff",
      width: 6,
      delay: 2000
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic2() {
  const graphic = new mars2d.graphic.AntPath({
    latlngs: [
      [31.809299, 117.163284],
      [31.777104, 117.169052],
      [31.764332, 117.211006]
    ],
    style: {
      width: 6,
      color: "#ff0000",
      reverse: true
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3() {
  const graphic = new mars2d.graphic.AntPath({
    latlng: [31.862736, 117.172852],
    style: {
      graphicType: "circle",
      radius: 1500, // 单位：米
      fill: true,
      fillColor: "#00ffff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#00ffff",
      outlineOpacity: 0.5
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic4() {
  // 经纬度 转为leafelt的纬度、经度标准
  const latlngs = mars2d.PointTrans.coords2latlngs([
    [117.271662, 31.870639, 21.49],
    [117.290605, 31.871517, 19.47],
    [117.302056, 31.858145, 16.27],
    [117.299439, 31.847545, 14.77],
    [117.267705, 31.8491, 22.11]
  ])
  const graphic = new mars2d.graphic.AntPath({
    latlngs,
    style: {
      graphicType: "polygon",
      width: 3,
      color: "#0000ff",
      label: {
        text: "我是火星科技",
        color: "#0000FF",
        font_size: 20
      }
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "antPath",
    style: {
      width: 3,
      color: "#0000ff",
      label: {
        text: "我是文本",
        color: "#0000FF",
        font_size: 20
      }
    },
    success: function (graphic) {
      console.log("标绘完成", graphic)
    }
  })
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars2d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const latlng = result.points[j]
    const index = j + 1

    const pt1 = mars2d.PointUtil.getPointByDistanceAngle(latlng, result.radius, 225)
    const pt2 = mars2d.PointUtil.getPointByDistanceAngle(latlng, result.radius, 315)

    const graphic = new mars2d.graphic.AntPath({
      latlngs: [pt1, latlng, pt2],
      style: { width: 3, color: "#0000ff" },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  return count.length
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

    return mars2d.Util.getTemplateHtml({ title: "layer上绑定的Popup", template: "all", attr })
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
