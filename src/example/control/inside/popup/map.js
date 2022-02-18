import * as mars2d from "mars2d"

let map
let graphicLayer
let geoJsonLayer

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

  map.on(mars2d.EventType.popupopen, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("打开了popup(全局监听)", event)
  })
  map.on(mars2d.EventType.popupclose, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("关闭了popup(全局监听)", event)
  })

  bindLayerDemo()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  removeDemoLayer()
}

export function removeDemoLayer() {
  graphicLayer.clear()

  if (geoJsonLayer) {
    geoJsonLayer.remove(true)
    geoJsonLayer = null
  }
}

// 1.在map地图上绑定Popup单击弹窗
export function bindMapDemo() {
  removeDemoLayer()

  // 关闭弹窗
  map.closePopup()

  // 传入坐标和内容，可以直接任意弹出,当前获取的是地图的中心点
  const position = map.getCenter()
  map.openPopup("我是地图上直接弹出的", position)
}

// 2.在layer图层上绑定Popup单击弹窗
export function bindLayerDemo() {
  console.log("调用了该方法")
  removeDemoLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "标绘示例数据",
    url: "//data.mars2d.cn/file/geojson/mars2d-draw.json"
  })
  map.addLayer(geoJsonLayer)

  // 在layer上绑定Popup单击弹窗
  geoJsonLayer.bindPopup(function (event) {
    const attr = event.attr
    return attr.type + " 我是layer上绑定的Popup" + new Date().toLocaleTimeString()

    // return new Promise((resolve) => {
    //   // 这里可以进行后端接口请求数据，setTimeout测试异步
    //   setTimeout(() => {
    //     resolve("Promise异步回调显示的弹窗内容信息")
    //   }, 2000)
    // })
  })

  geoJsonLayer.on(mars2d.EventType.popupopen, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("图层上打开了popup", container)
  })
  geoJsonLayer.on(mars2d.EventType.popupclose, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("图层上移除了popup", container)
  })
}

// 2.在layer图层上预定义Popup单击弹窗
export function bindLayerDemo2() {
  removeDemoLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "标绘示例数据",
    url: "//data.mars2d.cn/file/geojson/mars2d-draw.json",
    // popup按属性字段配置，可以是字符串模板或数组
    // popup: 'all', //显示所有属性，常用于测试
    // popup: '{name} {type}',
    popup: [
      { field: "id", name: "编码" },
      { field: "name", name: "名称" },
      { field: "type", name: "类型" },
      {
        type: "html",
        html: `<label>视频</label><video src='//data.mars2d.cn/file/video/lukou.mp4' controls autoplay style="width: 300px;" ></video>`
      }
    ],
    popupOptions: {
      autoCenter: true
    }
  })
  map.addLayer(geoJsonLayer)
}

// 3.在graphic数据上绑定Popup单击弹窗
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
    // let attr = event.attr
    const inthtml = `<table style="width:280px;">
            <tr><th scope="col" colspan="4"  style="text-align:center;font-size:15px;">graphic.bindPopup</th></tr>
            <tr><td >说明：</td><td >Popup鼠标单击信息弹窗 </td></tr>
            <tr><td >方式：</td><td >可以绑定任意html </td></tr>
            <tr><td >备注：</td><td >我是graphic上绑定的Popup</td></tr>
            <tr><td colspan="4" style="text-align:right;cursor: pointer;"><a href="javascript:showXQ()">更多</a></td></tr>
          </table>`
    return inthtml
  }

  // 绑定Popup
  graphic.bindPopup(getInnerHtml).openPopup()

  graphic.on(mars2d.EventType.popupopen, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("打开了popup", container)
  })
  graphic.on(mars2d.EventType.popupclose, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("移除了popup", container)
  })
}

// 3.在graphic数据上绑定Popup单击弹窗
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

  // 刷新局部DOM,不影响popup面板的其他控件操作
  graphic.on(mars2d.EventType.popupopen, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("打开了popup", container)

    const tdTime = container.querySelector("#tdTime")

    clearInterval(timeTik)
    timeTik = setInterval(() => {
      if (tdTime) {
        const date = mars2d.Util.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss S")
        tdTime.innerHTML = date
      }
    }, 500)
  })

  graphic.on(mars2d.EventType.popupclose, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("移除了popup", container)

    clearInterval(timeTik)
  })

  const innerHtml = `<table style="width:280px;">
            <tr><th scope="col" colspan="4"  style="text-align:center;font-size:15px;">graphic.bindPopup局部刷新</th></tr>
            <tr><td >说明：</td><td >Popup鼠标单击信息弹窗 </td></tr>
            <tr><td >方式：</td><td >可以绑定任意html </td></tr>
            <tr><td >备注：</td><td >我是graphic上绑定的Popup</td></tr>
            <tr><td >时间：</td><td id="tdTime"></td></tr>
            <tr><td colspan="4" style="text-align:right;cursor: pointer;"><a href="javascript:showXQ()">更多</a></td></tr>
          </table>`
  // 绑定Popup
  graphic.bindPopup(innerHtml, { offsetY: -30 }).openPopup()
}

// 只是为了演示，可以单击详情
function showXQ() {
  const showHistoryLayer = true
  eventTarget.fire("showWebsite", { showHistoryLayer })
}
