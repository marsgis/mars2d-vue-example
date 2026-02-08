import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
const L = mars2d.L
export let graphicLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()
export const mapOptions = {
  center: [31.755612, 117.341537],
  zoom: 11
}

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
  addGraphic5()
  addGraphic6()
}

// --- 简单箭头 ---
function addGraphic1() {
  const arrow = new mars2d.graphic.Polyline({
    latlngs: [
      [31.92, 117.11],
      [31.96, 117.36]
    ],
    style: {}
  })
  graphicLayer.addGraphic(arrow)

  // 添加装饰物
  const decorator = new mars2d.graphic.PolyDecorator({
    latlngs: [
      [31.92, 117.11],
      [31.96, 117.36]
    ],
    style: {
      offset: 100, // 百分比
      repeat: 0, // 百分比
      symbol: {
        type: "arrowHead",
        pixelSize: 15,
        polygon: false,
        pathOptions: { stroke: true }
      }
    }
  })
  graphicLayer.addGraphic(decorator)
}

function addGraphic2() {
  const markerLine = new mars2d.graphic.Polyline({
    latlngs: [
      [31.842566, 116.972122],
      [31.882805, 117.044907],
      [31.766705, 117.118378],
      [31.882805, 117.176743],
      [31.797057, 117.236481]
    ],
    style: {}
  })
  graphicLayer.addGraphic(markerLine)

  // 添加装饰物
  const decorator = new mars2d.graphic.PolyDecorator({
    latlngs: [
      [31.842566, 116.972122],
      [31.882805, 117.044907],
      [31.766705, 117.118378],
      [31.882805, 117.176743],
      [31.797057, 117.236481]
    ],
    style: {
      offset: 5,
      repeat: 10,
      symbol: {
        type: "marker"
      }
    }
  })
  graphicLayer.addGraphic(decorator)
}

function addGraphic3() {
  const polygon = new mars2d.graphic.Polygon({
    latlngs: [
      [
        [31.665655, 117.014694],
        [31.71707, 117.226181],
        [31.603101, 117.300339],
        [31.524117, 117.203522],
        [31.614796, 117.083359]
      ],
      [
        [31.649874, 117.141037],
        [31.668577, 117.205582],
        [31.572686, 117.218628],
        [31.613042, 117.145844]
      ]
    ],
    style: {
      color: "#ff7800",
      weight: 1
    }
  })
  graphicLayer.addGraphic(polygon)

  // 添加装饰物
  const decorator = new mars2d.graphic.PolyDecorator({
    latlngs: [
      [
        [31.665655, 117.014694],
        [31.71707, 117.226181],
        [31.603101, 117.300339],
        [31.524117, 117.203522],
        [31.614796, 117.083359]
      ],
      [
        [31.649874, 117.141037],
        [31.668577, 117.205582],
        [31.572686, 117.218628],
        [31.613042, 117.145844]
      ]
    ],
    style: {
      offset: 0,
      repeat: 10,
      symbol: {
        type: "dash",
        pixelSize: 0
      }
    }
  })
  graphicLayer.addGraphic(decorator)
}

function addGraphic4() {
  const decorator = new mars2d.graphic.PolyDecorator({
    latlngs: [
      [31.655135, 117.378616],
      [31.738679, 117.439041],
      [31.736927, 117.515259],
      [31.639352, 117.505646],
      [31.655135, 117.577744],
      [31.711229, 117.555771]
    ],
    style: [
      {
        offset: 2,
        repeat: 5,
        symbol: {
          type: "dash",
          pixelSize: 10,
          pathOptions: { color: "#f00", weight: 2 }
        }
      },
      {
        offset: 0,
        repeat: 5,
        symbol: {
          type: "dash",
          pixelSize: 0
        }
      }
    ]
  })
  graphicLayer.addGraphic(decorator)

  setTimeout(() => {
    decorator.setStyle([
      {
        symbol: {
          type: "dash",
          pathOptions: { color: "#1f1f1f" }
        }
      },
      {
        symbol: {
          type: "dash",
          pathOptions: { color: "#f00" }
        }
      }
    ])
  }, 3000)
}

function addGraphic5() {
  const coords = [
    [31.749774, 117.264633],
    [31.805227, 117.298279],
    [31.840816, 117.388229],
    [31.822148, 117.446594],
    [31.860647, 117.46582],
    [31.90729, 117.495346],
    [31.838483, 117.524185]
  ]
  const line = new mars2d.graphic.Polyline({
    latlngs: coords
  })
  graphicLayer.addGraphic(line)

  // 添加装饰物
  const decorator = new mars2d.graphic.PolyDecorator({
    latlngs: coords,
    style: {
      offset: 7,
      repeat: 5,
      symbol: {
        type: "arrowHead",
        pixelSize: 15,
        pathOptions: { fillOpacity: 1, weight: 0 }
      }
    }
  })
  graphicLayer.addGraphic(decorator)
}
function addGraphic6() {
  // 添加装饰物
  const decorator = new mars2d.graphic.PolyDecorator({
    latlngs: [
      [31.505386, 117.286606],
      [31.558059, 117.358017],
      [31.629998, 117.364197],
      [31.691366, 117.333298]
    ],
    style: [
      {
        offset: 0,
        repeat: 2,
        symbol: {
          type: "dash",
          pixelSize: 5,
          pathOptions: { color: "#f00", weight: 1, opacity: 0.2 }
        }
      },
      {
        offset: 16,
        repeat: 33,
        symbol: {
          type: "marker",
          rotate: true,
          markerOptions: {
            icon: {
              iconUrl: "img/marker/icon_plane.png",
              iconAnchor: [16, 16]
            }
          }
        }
      }
    ]
  })
  graphicLayer.addGraphic(decorator)

  setTimeout(() => {
    decorator.setStyle([
      {
        offset: 0,
        repeat: 2,
        symbol: {
          type: "dash",
          pixelSize: 5,
          pathOptions: { color: "#289a47", weight: 1, opacity: 1.0 }
        }
      },
      {
        offset: 16,
        repeat: 33,
        symbol: {
          type: "marker",
          rotate: true,
          markerOptions: {
            icon: {
              iconUrl: "img/marker/mark2.png",
              iconAnchor: [16, 16]
            }
          }
        }
      }
    ])
  }, 3000)
}

export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "polyDecorator",
    style: [
      {
        offset: 12,
        repeat: 25,
        symbol: {
          type: "dash",
          pixelSize: 10,
          pathOptions: { color: "#f00", weight: 2 }
        }
      },
      {
        offset: 0,
        repeat: 25,
        symbol: {
          type: "dash",
          pixelSize: 0
        }
      }
    ],
    success: function (graphic) {
      console.log("标绘完成", graphic)
    }
  })
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
