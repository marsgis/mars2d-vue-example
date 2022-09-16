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

  map.setView([30.7, 115.6], 10)

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，
  initLayerManager()

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
    type: "circle",
    style: {
      startAngle: 0,
      stopAngle: 60,
      rotation: 0,

      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
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

    const graphic = new mars2d.graphic.Circle({
      latlng: latlng,
      style: {
        radius: 5000, // 单位：米
        startAngle: -135,
        stopAngle: 135,
        rotation: 50,

        fill: true,
        fillColor: "#ff0",
        fillOpacity: 0.9,
        outline: true,
        outlineColor: "#ff0000",
        outlineOpacity: 1.0,
        outlineWidth: 2
      },
      attr: { index: index }
    })
    graphicLayer.addGraphic(graphic)
  }

  return count.length
}

// 示例1：{startAngle: x, stopAngle: y}
function addDemoGraphic1() {
  for (let i = 0; i <= 12; i++) {
    const graphic = new mars2d.graphic.Circle({
      latlng: [31, 115 + i * 0.1],
      style: {
        radius: 4000, // 单位：米
        startAngle: 0,
        stopAngle: 30 * i,
        rotation: 0,

        fill: true,
        fillColor: "#f03",
        fillOpacity: 0.7,
        outline: true,
        outlineWidth: 2,
        outlineColor: "#00ff00",
        outlineOpacity: 0.5
      },
      attr: { remark: "示例1" }
    })
    graphicLayer.addGraphic(graphic)

    graphic.bindPopup(`角度：${graphic.startAngle}至${graphic.stopAngle}`)
  }
}

// 固定的张角
function addDemoGraphic2() {
  for (let i = 0; i <= 12; i++) {
    const graphic = new mars2d.graphic.Circle({
      latlng: [30.5, 115 + i * 0.1],
      style: {
        radius: 4000, // 单位：米
        startAngle: 0,
        stopAngle: 60,
        rotation: i * 30,

        fill: true,
        fillColor: "#03f",
        fillOpacity: 0.7,
        outline: true,
        outlineWidth: 2,
        outlineColor: "#00ff00",
        outlineOpacity: 0.5
      },
      attr: { remark: "示例2" }
    })
    graphicLayer.addGraphic(graphic)

    graphic.bindPopup(`角度：${graphic.startAngle}至${graphic.stopAngle}<br/>方向：${graphic.rotation}`)
  }
}

// 示例3：吃豆豆
function addDemoGraphic3() {
  const graphic = new mars2d.graphic.Circle({
    latlng: [30.7, 115.2],
    style: {
      radius: 5000, // 单位：米
      startAngle: -135,
      stopAngle: 135,
      rotation: 0,

      fill: true,
      fillColor: "#ff0",
      fillOpacity: 0.9,
      outline: true,
      outlineColor: "#ff0000",
      outlineOpacity: 1.0,
      outlineWidth: 2
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)

  let open
  let counter = 1
  setInterval(function () {
    counter += 0.5
    open = 358 - (1 + Math.sin(counter)) * 45

    graphic.startAngle = -open / 2
    graphic.stopAngle = +open / 2
  }, 80)
}

// 组合：雷达线扇形
function addDemoGraphic4() {
  const interval = 1000
  for (let i = 1; i <= 8; i++) {
    const graphic = new mars2d.graphic.Circle({
      latlng: [30.7, 115.5],
      style: {
        radius: i * interval,
        startAngle: 0,
        stopAngle: 120,
        rotation: -60,

        fill: false,
        outline: true,
        outlineWidth: 1,
        outlineColor: "#000",
        outlineOpacity: 1
      },
      attr: { remark: "示例4" }
    })
    graphicLayer.addGraphic(graphic)
  }
}

// 组合：3各圆辐射标志组合
function addDemoGraphic5() {
  const latlng = [30.7, 115.8]
  const radius = 5000

  const graphic = new mars2d.graphic.Circle({
    latlng: latlng,
    style: {
      radius: radius,
      fill: true,
      fillColor: "#ffffff",
      fillOpacity: 0.5,
      outline: true,
      outlineColor: "red"
    },
    attr: { remark: "示例5" }
  }).addTo(graphicLayer)

  const graphic1 = new mars2d.graphic.Circle({
    latlng: latlng,
    style: {
      radius: radius,
      startAngle: 0,
      stopAngle: 45,
      fill: true,
      fillColor: "red",
      fillOpacity: 0.8,
      outline: false
    }
  }).addTo(graphicLayer)

  const graphic2 = new mars2d.graphic.Circle({
    latlng: latlng,
    style: {
      radius: radius,
      startAngle: 120,
      stopAngle: 120 + 45,
      fill: true,
      fillColor: "red",
      fillOpacity: 0.8,
      outline: false
    }
  }).addTo(graphicLayer)

  const graphic3 = new mars2d.graphic.Circle({
    latlng: latlng,
    style: {
      radius: radius,
      startAngle: 240,
      stopAngle: 240 + 45,
      fill: true,
      fillColor: "red",
      fillOpacity: 0.8,
      outline: false
    }
  }).addTo(graphicLayer)
}
