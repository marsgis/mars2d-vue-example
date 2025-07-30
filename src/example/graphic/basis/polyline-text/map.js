import * as mars2d from "mars2d"

export let map // mars2d.Map三维地图对象
export let graphicLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，
  initLayerManager()

  addGraphic1()
  addGraphic2()
  addGraphic3()
  addGraphic4()
}
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addGraphic1() {
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
  const graphic = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      weight: 15,
      color: "#8EE9FF",

      text: ") ",
      textOptions: {
        repeat: true,
        offset: 7,
        attributes: { fill: "#007DEF", "font-weight": "bold", "font-size": "24" }
      }
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}
function addGraphic2() {
  const danger = new mars2d.graphic.Polyline({
    latlngs: [
      [31.862736, 117.172852],
      [31.856011, 117.251461]
    ],
    style: {
      weight: 13,
      color: "orange",
      opacity: 0.8,

      text: "\u25BA",
      textOptions: {
        repeat: true,
        gap: 2,
        offset: 4,
        attributes: { fill: "red" }
      }
    },
    attr: { remark: "示例2" }
  })

  graphicLayer.addGraphic(danger)
}
function addGraphic3() {
  // 经纬度 转为leafelt的纬度、经度标准
  const latlngs = mars2d.PointTrans.coords2latlngs([
    [117.313682, 31.7416, 10.85],
    [117.311934, 31.774753, 19.71],
    [117.305473, 31.800304, 23.86]
  ])
  const graphic = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      width: 3,
      color: "#ff0000",
      opacity: 0.8,

      text: "\u2708",
      textOptions: {
        repeat: true,
        gap: 5,
        offset: 8,
        attributes: { "font-weight": "bold", "font-size": "24" }
      }
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}
function addGraphic4() {
  const graphic = new mars2d.graphic.Polyline({
    latlngs: [
      [31.809299, 117.163284],
      [31.777104, 117.169052],
      [31.764332, 117.211006]
    ],
    style: {
      width: 4,

      text: "创新大道",
      textOptions: {
        repeat: true,
        gap: 16,
        offset: -5
      }
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)
}

export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "polyline",
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

    const graphic = new mars2d.graphic.Polyline({
      latlngs: [pt1, latlng, pt2],
      style: { width: 3, color: "#0000ff" },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  return count.length
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
      text: "复制",
      iconCls: "fa fa-copy",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id
        }
      }
    },
    {
      text: "剪切",
      iconCls: "fa fa-scissors",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id

          graphic.remove(true) // 移除原有对象
        }
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
