import * as mars2d from "mars2d"
const L = mars2d.L

let map
let graphicLayer // 矢量数据图层
let geoJsonLayer
let lastMaplTooltip //

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  center: { lng: 117.309471, lat: 31.797018 }
}

export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  /* map.on(mars2d.EventType.tooltipopen, function (event) {
    const container = event.tooltip._container // tooltip对应的DOM
    console.log("打开了tooltip(全局监听)", event)
  })
  map.on(mars2d.EventType.tooltipclose, function (event) {
    const container = event.tooltip._container // tooltip对应的DOM
    console.log("关闭了tooltip(全局监听)", event)
  }) */

  bindLayerDemo()
}

export function removeDemoLayer() {
  // 关闭弹窗
  if (lastMaplTooltip) {
    map.closeTooltip(lastMaplTooltip)
    // delete lastMaplTooltip
  }

  graphicLayer.clear()

  if (geoJsonLayer) {
    geoJsonLayer.remove(true)
    geoJsonLayer = null
  }
}

// 1.在map地图上绑定Tooltip单击弹窗
export function bindMapDemo() {
  removeDemoLayer()

  if (lastMaplTooltip) {
    map.closeTooltip()
  }

  // 传入坐标和内容，可以直接任意弹出,当前获取的是地图的中心点
  const position = map.getCenter()

  lastMaplTooltip = new L.Tooltip().setContent("我是地图上直接弹出的").setLatLng(position)
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

  /* geoJsonLayer.on(mars2d.EventType.tooltipopen, function (event) {
    const container = event.tooltip._container // tooltip对应的DOM
    console.log("图层上打开了tooltip", container)
  })
  geoJsonLayer.on(mars2d.EventType.tooltipclose, function (event) {
    const container = event.tooltip._container // tooltip对应的DOM
    console.log("图层上移除了tooltip", container)
  }) */
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
      height: 44
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

  /* graphic.on(mars2d.EventType.tooltipopen, function (event) {
    const container = event.tooltip._container // tooltip对应的DOM
    console.log("打开了tooltip", container)
  })
  graphic.on(mars2d.EventType.tooltipclose, function (event) {
    const container = event.tooltip._container // tooltip对应的DOM
    console.log("移除了tooltip", container)
  }) */
}

// 3.在graphic数据上绑定Tooltip单击弹窗
export function bindGraphicDemo2() {
  removeDemoLayer()

  const graphic = new mars2d.graphic.Marker({
    latlng: [31.854628, 117.245425],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44
    }
  })
  graphicLayer.addGraphic(graphic)

  let timeTik

  // 刷新局部DOM,不影响tooltip面板的其他控件操作
  graphic.on(mars2d.EventType.tooltipopen, function (event) {
    const container = event.tooltip._container // tooltip对应的DOM
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
    const container = event.tooltip._container // tooltip对应的DOM
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
