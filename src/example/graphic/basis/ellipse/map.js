/**
 * 示例：Ellipse 椭圆
 * 演示：Ellipse 椭圆矢量（长短半轴、旋转角、填充/描边）与图层交互、右键菜单、批量生成
 * API：mars2d.graphic.Ellipse、mars2d.layer.GraphicLayer、mars2d.PolyUtil.getGridPoints
 * 要点：semiMinorAxis/semiMajorAxis 单位米；rotation 是长轴旋转角度（度）；批量生成时 count 是网格点数量
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

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，
  initLayerManager()

  // 加一些演示数据
  addDemoGraphic1()
  addDemoGraphic2()
  addDemoGraphic3()
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
    // 从地图移除矢量图层：椭圆及 popup/右键菜单随图层一起释放
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}

// ========== 3. 图层事件与交互 ==========
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

// ========== 4. 面板交互方法 ==========
export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "ellipse",
    style: {
      color: "#0000ff"
    }
  })
}

// ========== 5. 图层交互绑定（Popup/右键菜单）==========
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
  // 3.在graphic上绑定监听事件：graphic.on(mars2d.EventType.click, function (event) { ... })

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

// ========== 6. 矢量对象（演示数据与批量生成）==========
function addDemoGraphic1() {
  const graphic = new mars2d.graphic.Ellipse({
    latlng: [31.854628, 117.245425],
    style: {
      semiMinorAxis: 1000, // 单位：米
      semiMajorAxis: 2000,
      rotation: 0,

      fill: true,
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#00ff00",
      outlineOpacity: 0.5
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)

  // 演示个性化处理graphic，
  initGraphicManager(graphic)
}

function addDemoGraphic2() {
  const graphic = new mars2d.graphic.Ellipse({
    latlng: L.latLng(31.810858, 117.21),
    style: {
      semiMinorAxis: 1600, // 单位：米
      semiMajorAxis: 2000,
      rotation: 90,

      fill: false,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000ff",
      outlineOpacity: 1.0,
      label: {
        text: "欢迎使用Mars2D平台",
        color: "#0000FF",
        font_size: 20
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3() {
  const graphic = new mars2d.graphic.Ellipse({
    latlng: L.latLng(31.818606, 117.296904),
    style: {
      semiMinorAxis: 2000, // 单位：米
      semiMajorAxis: 3000,
      rotation: 45,

      fill: true,
      fillColor: "#ff0000",
      fillOpacity: 0.3,
      outline: false
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars2d.PolyUtil.getGridPoints(bbox, count, 30)

  for (let j = 0; j < result.points.length; ++j) {
    const latlng = result.points[j]
    const index = j + 1

    const graphic = new mars2d.graphic.Ellipse({
      latlng,
      style: {
        semiMinorAxis: 2000, // 单位：米
        semiMajorAxis: 3000, // 单位：米
        rotation: 45, // 长轴旋转角度（度）

        fill: true,
        fillColor: "#ff0000",
        fillOpacity: 0.3,
        outline: false
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  return result.points.length // 实际生成的个数（网格按 count 取整，可能少于入参）
}
