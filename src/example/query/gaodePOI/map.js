import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

let poiLayer
let queryGaodePOI
let drawGraphic // 限定区域
let resultList = [] // 查询结果
let lastQueryOptions // 上一次请求参数，用于 下一页使用
let graphic
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 31.797919, lng: 117.281329, alt: 36236, heading: 358, pitch: -81 }
}

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  poiLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(poiLayer)

  poiLayer.bindPopup(function (event) {
    const item = event.attr

    let inHtml = '<div class="mars2d-template-titile">' + item.name + '</div><div class="mars2d-template-content" >'

    const type = String(item.type).trim()
    if (type) {
      inHtml += "<div><label>类别</label>" + type + "</div>"
    }
    const xzqh = String(item.xzqh).trim()
    if (xzqh) {
      inHtml += "<div><label>区域</label>" + xzqh + "</div>"
    }
    const tel = String(item.tel).trim()
    if (tel) {
      inHtml += "<div><label>电话</label>" + tel + "</div>"
    }
    const address = String(item.address).trim()
    if (address) {
      inHtml += "<div><label>地址</label>" + address + "</div>"
    }
    inHtml += "</div>"
    return inHtml
  })

  queryGaodePOI = new mars2d.query.GaodePOI({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

/**
 * 查询
 *
 * @export
 * @param {string} radioFanwei 范围选择
 * @param {string} cityShi 城市
 * @param {string} text 关键字
 * @returns {void}
 */
export function query(radioFanwei, cityShi, text) {
  resultList = []
  switch (radioFanwei) {
    case "2": {
      // 当前视角范围
      const extent = map.getExtent()
      loadData(
        {
          page: 0,
          polygon: [
            [extent.ymin, extent.xmin],
            [extent.ymax, extent.xmax]
          ],
          limit: true
        },
        text
      )
      break
    }
    case "3": // 按范围
      if (!drawGraphic) {
        globalMsg("请绘制限定范围！")
        return
      }
      console.log(drawGraphic)
      loadData(
        {
          page: 0,
          graphic: drawGraphic,
          location: drawGraphic.distance,
          limit: true
        },
        text
      )
      break
    default: {
      const dmmc = cityShi
      loadData(
        {
          page: 0,
          city: dmmc,
          citylimit: true
        },
        text
      )
      break
    }
  }
}

function loadData(queryOptions, text) {
  if (!text) {
    globalMsg("请输入 名称 关键字筛选数据！")
    return
  }
  showLoading()
  console.log(queryOptions)
  lastQueryOptions = {
    ...queryOptions,
    count: 25, // count 每页数量
    text: text,
    success: function (res) {
      const data = res.list
      resultList = resultList.concat(data)

      addDemoGraphics(data)

      eventTarget.fire("tableData", { data }) // 抛出数据给vue

      hideLoading()
    },
    error: function (msg) {
      globalAlert(msg)
      hideLoading()
    }
  }
  queryGaodePOI.query(lastQueryOptions)
}

export function clearAll(noClearDraw) {
  lastQueryOptions = null
  resultList = []
  poiLayer.clear()

  if (!noClearDraw) {
    drawGraphic = null
    map.graphicLayer.clear()
  }
}

function addDemoGraphics(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    graphic = new mars2d.graphic.Marker({
      id: item.id,
      latlng: [item.lat, item.lng],
      style: {
        image: "img/marker/mark3.png",
        width: 32,
        height: 44,
        // 预留功能，后续支持高亮操作
        highlight: { type: "click", image: "img/marker/mark1.png" },
        // 预留功能，后续支持附带文字的显示
        label: {
          text: item.name,
          font: "20px 楷体",
          outline: true,
          outlineWidth: 2
        }
      },
      attr: item
    })
    poiLayer.addGraphic(graphic)

    item.graphic = graphic
  }
}

// 框选查询 矩形
export function drawRectangle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      // drawGraphic.type = "rectangle"
      console.log(graphic)
      // console.log("矩形：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}

// 框选查询   圆
export function drawCircle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      // drawGraphic.type = "circle"
      // console.log("圆：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}

// 框选查询   多边行
export function drawPolygon() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      // drawGraphic.type = "polygon"
      // console.log("多边行：", drawGraphic.toGeoJSON())
    }
  })
}

export function flytoGraphic(graphic) {
  map.flyToGraphic(graphic)
  console.log(graphic)
}
