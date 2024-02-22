import * as mars2d from "mars2d"

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
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，
  initLayerManager(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1()
  addDemoGraphic2()
  addDemoGraphic3()
  addDemoGraphic4()
  addDemoGraphic5()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
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

// 也可以在单个Graphic上做个性化管理及绑定操作
function initGraphicManager(graphic) {
  // 3.在graphic上绑定监听事件
  // graphic.on(mars2d.EventType.click, function(event) {
  //   console.log('监听graphic，单击了矢量对象', event)
  // })

  // 绑定Tooltip
  // graphic.bindTooltip('我是graphic上绑定的Tooltip') //.openTooltip()

  // 绑定Popup
  const inthtml = `<table style="width: auto;">
      <tr>
        <th scope="col" colspan="2" style="text-align:center;font-size:15px;">我是graphic上绑定的Popup </th>
      </tr>
      <tr>
        <td>提示：</td>
        <td>这只是测试信息，可以任意html</td>
      </tr>
    </table>`
  graphic.bindPopup(inthtml).openPopup()

  // 绑定右键菜单
  graphic.bindContextMenu([
    {
      text: "删除对象[graphic绑定]",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
        }
      }
    }
  ])
}

export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1,
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
  const result = mars2d.PolyUtil.getGridPoints(bbox, count)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const latlng = result.points[j]
    const index = j + 1

    const pt1 = mars2d.PointUtil.getPointByDistanceAngle(latlng, result.radius, 90)
    const pt2 = mars2d.PointUtil.getPointByDistanceAngle(latlng, result.radius, 200)

    const graphic = new mars2d.graphic.Rectangle({
      latlngs: [pt1, pt2],
      style: {
        fill: true,
        fillColor: "#3388ff",
        fillOpacity: 0.3,
        outline: true,
        outlineWidth: 2,
        outlineColor: "#0000FF",
        outlineOpacity: 0.5
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  return count.length
}

function addDemoGraphic1() {
  const latlngs = [
    [31.870639, 117.271662],
    [31.8491, 117.247705]
  ]
  const graphic = new mars2d.graphic.Rectangle({
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

  // 演示个性化处理graphic，
  initGraphicManager(graphic)
}

function addDemoGraphic2() {
  // 经纬度 转为leafelt的纬度、经度标准
  const latlngs = mars2d.PointTrans.coords2latlngs([
    [117.167572, 31.823074, 45.53],
    [117.19775, 31.809539, 36.59]
  ])
  const graphic = new mars2d.graphic.Rectangle({
    latlngs,
    style: {
      fill: true,
      fillColor: "#ff0000",
      fillOpacity: 0.3,
      image: "img/fill/redLine.png",
      imageOpacity: 1,
      outline: false,
      label: {
        text: "我是火星科技",
        color: "#0000FF",
        font_size: 20
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3() {
  // 经纬度 转为leafelt的纬度、经度标准
  const latlngs = mars2d.PointTrans.coords2latlngs([
    [117.216386, 31.815376, 35.16],
    [117.222868, 31.821302, 34.4]
  ])
  const graphic = new mars2d.graphic.Rectangle({
    latlngs,
    style: {
      fill: false,
      outline: true,
      outlineWidth: 6,
      outlineColor: "#00ffff",
      outlineOpacity: 1.0
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic4() {
  const latlngs = [
    [31.856606, 117.183593],
    [31.845103, 117.196741]
  ]

  const graphic = new mars2d.graphic.Rectangle({
    latlngs,
    style: {
      fill: true,
      fillColor: "#051453",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000FF",
      outlineOpacity: 1.0,
      dashArray: "5, 10"
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic5() {
  const latlngs = [
    [31.789865, 117.261476],
    [31.804853, 117.289609]
  ]
  const graphic = new mars2d.graphic.Rectangle({
    latlngs,
    style: {
      fill: true,
      fillColor: "#154624",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000FF",
      outlineOpacity: 1.0,
      dashArray: "15, 10, 5, 10"
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic)
}

