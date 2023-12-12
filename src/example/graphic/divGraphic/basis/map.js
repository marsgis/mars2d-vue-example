import * as mars2d from "mars2d"

export let map // mars2d.Map三维地图对象
const L = mars2d.L
export let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10,
  center: { lng: "117.228241", lat: "31.448231" }
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
  initLayerManager(graphicLayer)
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

  // graphic.testPoint = true; //打开测试点，与DIV点进行对比位置调整css
}

// 一个渐变的文本面板,中间竖直连线
function addDemoGraphic2() {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng: [31.42959, 117.162323],
    style: {
      html: `<div class="marsBlueGradientPnl">
                    <div>合肥火星科技有限公司</div>
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
      text: "火星科技Mars2D平台",
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
      html: "火星科技",
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

  // 刷新局部DOM,不影响面板的其他控件操作
  setInterval(() => {
    const container = graphic?.container // popup对应的DOM
    if (!container) {
      return
    }

    const lablLiuliang = container.querySelector("#lablLiuliang")
    if (lablLiuliang) {
      lablLiuliang.innerHTML = (Math.random() * 100).toFixed(0) // 测试的随机数
    }

    const lablYeWei = container.querySelector("#lablYeWei")
    if (lablYeWei) {
      lablYeWei.innerHTML = mars2d.Util.formatDate(new Date(), "ss.S") // 测试的随机数
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

  // graphic.testPoint = true; //打开测试点，与DIV点进行对比位置调整css
}

export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "divGraphic",
    style: {
      html: `<div class="marsBlueGradientPnl">
            <div>我是火星科技</div>
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
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const latlng = result.points[j]
    const index = j + 1

    const graphic = new mars2d.graphic.DivGraphic({
      latlng,
      style: {
        html: `<div class="marsBlueGradientPnl">
                      <div>合肥火星科技有限公司</div>
                  </div>`,
        offsetY: 60,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  return count.length
}
