/**
 * 示例：DivGraphic DIV点
 * 演示：用 HTML/CSS 画点的 DivGraphic 及内置扩展（DivLightPoint、DivBoderLabel、DivUpLabel），共 12 种面板/动画/图标样式，并演示局部 DOM 定时刷新与大数据量生成
 * API：mars2d.graphic.DivGraphic/DivLightPoint/DivBoderLabel/DivUpLabel、graphicLayer.startDraw、mars2d.PolyUtil.getGridPoints
 * 要点：html 字符串里的内联 onclick 在 iframe 的 window 上查找回调（示例里显式挂 window.onClickDiv）；定时刷新只改面板局部 DOM，切走示例时必须 clearInterval；气泡/面板位置用 offsetX/offsetY 配合 horizontalOrigin/verticalOrigin 调整
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
const L = mars2d.L
export let graphicLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10,
  center: { lng: 117.228241, lat: 31.448231 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

let refreshTimer = null // 面板数据刷新定时器

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理（绑定右键菜单、Popup，并把初始状态通知面板）
  initLayerManager(graphicLayer)
  // 本示例默认不显示 Popup：解绑上面刚绑定的 Popup，让面板“单击Popup”复选框初始为关闭，由面板按需再绑定
  graphicLayer.unbindPopup()

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

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
  // 清空面板通过 eventTarget 注册的监听，避免旧面板回调残留
  eventTarget.off()
  // 内联 onclick 用到的全局回调，示例切走后移除，避免残留
  delete window.onClickDiv

  if (map) {
    map.destroy() // 一并释放图层与所有 DivGraphic 的 DOM
    map = null
  }
  graphicLayer = null
}

// ========== 4. 图层管理：Popup 与右键菜单 ==========
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

// ========== 5. 矢量对象：12 种 DivGraphic 演示 ==========
// 一个黑色面板，指向左下角黄色连线
function addDemoGraphic1() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.712894, 117.255707],
    style: {
      html: `<div class="marsBlackPanel  animation-spaceInDown">
                    <div class="marsBlackPanel-text">大湖名城,创新高地</div>
                </div>`
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

// 一个渐变的文本面板,中间竖直连线
function addDemoGraphic2() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.42959, 117.162323],
    style: {
      html: `<div class="marsBlueGradientPnl">
                    <div>欢迎使用Mars2D平台</div>
                </div>`,
      offsetY: 60,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

//
function addDemoGraphic3() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.467101, 116.942596],
    style: {
      html: `<div class="marsGreenGradientPnl" >安徽欢迎您</div>`,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

// 添加GIF图标，DIV方式
function addDemoGraphic4() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.164872, 116.79013],
    style: {
      html: '<img src="img/marker/tf.gif" style="width:50px;height:50px;" ></img>',
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.CENTER
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)
}

// 加css动画的扩散点 DivLightPoint
function addDemoGraphic5() {
  const graphic = new mars2d.graphic.DivLightPoint({
    latlng: [31.775993, 117.092285],
    style: {
      color: "#ff0000"
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic)
}

// 内置扩展的动态文本 DivBoderLabel
function addDemoGraphic6() {
  const graphic = new mars2d.graphic.DivBoderLabel({
    latlng: [31.542078, 117.577057],
    style: {
      text: "欢迎使用Mars2D平台",
      font_size: 15,
      font_family: "微软雅黑",
      color: "#ccc",
      boderColor: "#15d1f2"
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic)
}

// 内置扩展的竖立文本 DivBoderLabel
function addDemoGraphic7() {
  const graphic = new mars2d.graphic.DivUpLabel({
    latlng: [31.453036, 117.964325],
    style: {
      text: "我是竖立的文本",
      color: "#fff",
      font_size: 16,
      font_family: "微软雅黑",
      lineHeight: 60,
      circleSize: 8
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic)
}

//
function addDemoGraphic8() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.612314, 116.441345],
    style: {
      html: "Mars2D地理信息平台",
      className: "mars2d-label-graphic"
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}

// font字体
function addDemoGraphic9() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.785337, 117.634735],
    style: {
      html: '<i class="fa fa-tree" style="color:#ffff00;font-size:30px;"></i>',
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例9" }
  })
  graphicLayer.addGraphic(graphic)
}

// 圆点
function addDemoGraphic10() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: L.latLng(31.818606, 117.296904),
    style: {
      className: "mars2d-colorPoint"
    },
    attr: { remark: "示例10" }
  })
  graphicLayer.addGraphic(graphic)
}

// 倾斜指向左下角的面板样式
function addDemoGraphic11() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.247684, 117.516632],
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-red">
                <div class="marsTiltPanel-wrap">
                    <div class="area">
                        <div class="arrow-lt"></div>
                        <div class="b-t"></div>
                        <div class="b-r"></div>
                        <div class="b-b"></div>
                        <div class="b-l"></div>
                        <div class="arrow-rb"></div>
                        <div class="label-wrap">
                            <div class="title">火星水厂</div>
                            <div class="label-content">
                                <div class="data-li">
                                    <div class="data-label">实时流量：</div>
                                    <div class="data-value"><span id="lablLiuliang" class="label-num">39</span><span class="label-unit">m³/s</span>
                                    </div>
                                </div>
                                <div class="data-li">
                                    <div class="data-label">水池液位：</div>
                                    <div class="data-value"><span id="lablYeWei"  class="label-num">10.22</span><span class="label-unit">m</span>
                                    </div>
                                </div>
                                <div class="data-li">
                                    <div class="data-label">水泵状态：</div>
                                    <div class="data-value">
                                      <span class="label-tag data-value-status-1" alt="中间状态" onclick="onClickDiv('单击了1号水泵')">1号</span>
                                      <span class="label-tag data-value-status-0" alt="关闭状态" onclick="onClickDiv('单击了2号水泵')">2号</span>
                                     </div>
                                </div>
                                <div class="data-li">
                                    <div class="data-label">出水阀门：</div>
                                    <div class="data-value">
                                      <span class="label-tag data-value-status-1" alt="中间状态" onclick="onClickDiv('单击了1号出水阀门')">1号</span>
                                      <span class="label-tag data-value-status-2" alt="打开状态" onclick="onClickDiv('单击了2号出水阀门')">2号</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="b-t-l"></div>
                    <div class="b-b-r"></div>
                </div>
                <div class="arrow" ></div>
            </div>`,
      horizontalOrigin: mars2d.HorizontalOrigin.LEFT,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例11" }
  })
  graphicLayer.addGraphic(graphic)

  graphic.on(mars2d.EventType.updatePosition, function (event) {
    console.log("更新了div的位置")
  })

  // html 里的内联 onclick 是在 iframe 的 window 作用域查找回调，示例把提示函数挂到 window 上
  window.onClickDiv = function (text) {
    globalMsg(text)
  }

  // 刷新局部DOM,不影响面板的其他控件操作
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  refreshTimer = setInterval(() => {
    const container = graphic?.container // graphic.container 是 DivGraphic 的 DOM，对象加入图层后才存在
    if (!container) {
      return
    }

    const lablLiuliang = container.querySelector("#lablLiuliang")
    if (lablLiuliang) {
      lablLiuliang.innerHTML = (Math.random() * 100).toFixed(0) // 随机数模拟实时流量
    }

    const lablYeWei = container.querySelector("#lablYeWei")
    if (lablYeWei) {
      lablYeWei.innerHTML = mars2d.Util.formatDate(new Date(), "ss.S") // 用当前时间的秒值模拟液位变化
    }
  }, 500)
}

// 倾斜指向左下角的面板样式
function addDemoGraphic12() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.284093, 116.330109],
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-blue">
                <div class="marsTiltPanel-wrap">
                    <div class="area">
                        <div class="arrow-lt"></div>
                        <div class="b-t"></div>
                        <div class="b-r"></div>
                        <div class="b-b"></div>
                        <div class="b-l"></div>
                        <div class="arrow-rb"></div>
                        <div class="label-wrap">
                            <div class="title">岳西水厂</div>
                            <div class="label-content">
                                <div class="data-li">
                                    <div class="data-label">实时流量：</div>
                                    <div class="data-value"><span class="label-num">98</span><span class="label-unit">m³/s</span>
                                    </div>
                                </div>
                                <div class="data-li">
                                    <div class="data-label">水池液位：</div>
                                    <div class="data-value"><span class="label-num">13.14</span><span class="label-unit">m</span>
                                    </div>
                                </div>
                                <div class="data-li">
                                    <div class="data-label">水泵状态：</div>
                                    <div class="data-value"><span class="label-tag data-value-status-1" alt="中间状态">1号</span><span
                                            class="label-tag data-value-status-0" alt="关闭状态">2号</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="b-t-l"></div>
                    <div class="b-b-r"></div>
                </div>
                <div class="arrow" ></div>
            </div>`,
      horizontalOrigin: mars2d.HorizontalOrigin.LEFT,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例12" }
  })
  graphicLayer.addGraphic(graphic)
}

// ========== 6. 面板交互方法 ==========
export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "divGraphic",
    style: {
      html: `<div class="marsBlueGradientPnl">
            <div>我是Mars2D平台</div>
        </div>`,
      offsetY: 60,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
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

  for (let j = 0; j < result.points.length; ++j) {
    const latlng = result.points[j]
    const index = j + 1

    const graphic = new mars2d.graphic.DivGraphic({
      latlng,
      style: {
        html: `<div class="marsBlueGradientPnl">
                      <div>Mars2D地理信息平台</div>
                  </div>`,
        offsetY: 60,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  // 返回实际生成的点数（面板用它提示“生成 N 条数据”；网格点数会按 sqrt(count) 取整，不一定等于入参）
  return result.points.length
}
