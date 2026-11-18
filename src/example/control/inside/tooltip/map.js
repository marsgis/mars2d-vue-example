/**
 * 示例：Tooltip 鼠标移入信息窗
 * 演示：分别在地图、GeoJson图层、Graphic上绑定 Tooltip 提示窗（含按属性配置与局部刷新两种写法）
 * API：map.openTooltip、layer.bindTooltip、graphic.bindTooltip、L.Tooltip
 * 要点：Tooltip 的内容支持字符串/HTML/属性模板/函数；interactive:true 时提示窗可交互（才能点内部元素）；局部刷新只改提示窗内部指定 DOM，不要整块重建
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map
let graphicLayer // 矢量数据图层
let geoJsonLayer
let lastMaplTooltip // 地图上直接打开的那个 Tooltip 实例

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  center: { lng: 117.309471, lat: 31.797018 }
}

export const eventTarget = new mars2d.BaseClass()

let timeTik = null // tooltip 内时间局部刷新的定时器

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  bindLayerDemo()
}

// ========== 3. 面板交互方法 ==========
export function removeDemoLayer() {
  if (timeTik) {
    clearInterval(timeTik)
    timeTik = null
  }
  // 关闭地图上直接打开的 Tooltip，避免图层清理后残留提示窗
  if (lastMaplTooltip) {
    if (map) {
      map.closeTooltip(lastMaplTooltip)
    }
    lastMaplTooltip = null
  }

  // 清空主图层上的 Graphic，并销毁 GeoJson 图层（销毁时其上的 tooltip 监听一并释放）
  if (graphicLayer) {
    graphicLayer.clear()
  }

  if (geoJsonLayer) {
    geoJsonLayer.remove(true)
    geoJsonLayer = null
  }
}

// 1.在map地图上绑定Tooltip单击弹窗
export function bindMapDemo() {
  removeDemoLayer()

  if (lastMaplTooltip) {
    map.closeTooltip(lastMaplTooltip)
  }

  // 传入坐标和内容，可以直接任意弹出,当前获取的是地图的中心点
  const position = map.getCenter()
  const html = "<div style='width:150px;height:50px;'>我是地图上直接弹出的</div>"
  lastMaplTooltip = new L.Tooltip({ direction: "top" }).setContent(html).setLatLng(position)
  map.openTooltip(lastMaplTooltip)
}

// 2.在layer图层上绑定Tooltip单击弹窗
export function bindLayerDemo() {
  removeDemoLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "标绘示例数据",
    url: "//data.mars2d.cn/file/geojson/mars2d-draw.json"
  })
  map.addLayer(geoJsonLayer)

  // 在layer上绑定Tooltip单击弹窗
  geoJsonLayer.bindTooltip(function (event) {
    const attr = event.attr
    return attr.type + " 我是layer上绑定的Tooltip"

    /* return new Promise((resolve) => {
      // 这里可以进行后端接口请求数据，setTimeout测试异步
      setTimeout(() => {
        resolve("Promise异步回调显示的弹窗内容信息")
      }, 2000)
    }) */
  })
}

// 2.在layer图层上预定义tooltip单击弹窗
export function bindLayerDemo2() {
  removeDemoLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "标绘示例数据",
    url: "//data.mars2d.cn/file/geojson/mars2d-draw.json",
    /* // tooltip按属性字段配置，可以是字符串模板或数组
    tooltip: "all", // 显示所有属性，常用于测试
    tooltip: "{name} {type}", */
    tooltip: [
      { field: "id", name: "编码" },
      { field: "name", name: "名称" },
      { field: "type", name: "类型" }
    ],
    tooltipOptions: { direction: "right", offsetX: 10 }
  })
  map.addLayer(geoJsonLayer)
}

// 3.在graphic数据上绑定Tooltip单击弹窗
export function bindGraphicDemo1() {
  removeDemoLayer()

  const graphic = new mars2d.graphic.Marker({
    latlng: [31.854628, 117.245425],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    }
  })
  graphicLayer.addGraphic(graphic)

  function getInnerHtml(event) {
    // let attr = event.graphic.attr
    const inthtml = `<table style="width:280px;">
            <tr><th scope="col" colspan="4"  style="text-align:center;font-size:15px;">graphic.bindTooltip</th></tr>
            <tr><td >说明：</td><td >Tooltip鼠标单击信息弹窗 </td></tr>
            <tr><td >方式：</td><td >可以绑定任意html </td></tr>
            <tr><td >备注：</td><td >我是graphic上绑定的Tooltip</td></tr>
          </table>`
    return inthtml
  }

  // 绑定Tooltip
  graphic.bindTooltip(getInnerHtml, { direction: "right" }).openTooltip()
}

// 3.在graphic数据上绑定Tooltip单击弹窗
export function bindGraphicDemo2() {
  removeDemoLayer()

  const graphic = new mars2d.graphic.Marker({
    latlng: [31.854628, 117.245425],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    }
  })
  graphicLayer.addGraphic(graphic)

  // 刷新局部DOM,不影响tooltip面板的其他控件操作
  graphic.on(mars2d.EventType.tooltipopen, function (event) {
    const container = event.tooltip.getElement() // tooltip 对应的 DOM（DivOverlay#getElement 公开方法）
    console.log("打开了tooltip", container)

    const tdTime = container.querySelector("#tdTime")

    clearInterval(timeTik)
    timeTik = setInterval(() => {
      if (tdTime) {
        const date = mars2d.Util.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss S")
        tdTime.innerHTML = date
      }
    }, 500)
  })

  graphic.on(mars2d.EventType.tooltipclose, function (event) {
    const container = event.tooltip.getElement() // tooltip 对应的 DOM
    console.log("移除了tooltip", container)

    clearInterval(timeTik)
  })

  const innerHtml = `<table style="width:280px;">
            <tr><th scope="col" colspan="4"  style="text-align:center;font-size:15px;">graphic.bindTooltip局部刷新</th></tr>
            <tr><td >说明：</td><td >Tooltip鼠标单击信息弹窗 </td></tr>
            <tr><td >方式：</td><td >可以绑定任意html </td></tr>
            <tr><td >备注：</td><td >我是graphic上绑定的Tooltip</td></tr>
            <tr><td >时间：</td><td id="tdTime"></td></tr>
            <tr><td colspan="4" style="text-align:right;cursor: pointer;"><a href="javascript:showXQ()">更多</a></td></tr>
          </table>`
  // 绑定Tooltip
  graphic.bindTooltip(innerHtml, { interactive: true }).openTooltip()
}

// 只是为了演示，可以单击详情
function showXQ() {
  const showHistoryLayer = true
  eventTarget.fire("showWebsite", { showHistoryLayer })
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 先释放图层与提示窗（含 graphic 上的 tooltip 监听），再断开地图引用
  removeDemoLayer()
  graphicLayer = null
  map = null
}
