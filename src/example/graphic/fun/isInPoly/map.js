/**
 * 示例：框选数据
 * 演示：从在线随机点服务取 100 个点，绘制矩形/面/圆后用 graphic.isInPoly 判断命中点并换成红色图标
 * API：graphic.isInPoly、mars2d.layer.GraphicLayer#startDraw、mars2d.Util.fetchJson
 * 要点：圆、矩形、面都支持 isInPoly，判断依据是对象的几何范围；点数据按当前地图 extent 请求在线服务，请求返回前不能操作图层；重新框选前要先还原上一次变色点
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graphicLayer
let selectGraphic = []

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const extent = map.getExtent()

  mars2d.Util.fetchJson({
    url: "//server.mars3d.cn/server/pointRandom/",
    queryParameters: {
      ...extent,
      count: 100
    },
    type: "get",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded"
  })
    .then((data) => {
      // 示例切换后异步请求可能才返回，此时图层已随地图销毁，直接丢弃
      if (!map || !graphicLayer) {
        return
      }
      addData(data)
    })
    .catch(function (data) {
      console.log("请求出错", data)
    })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  selectGraphic = []
  if (map) {
    map.destroy() // 一并释放 graphicLayer、默认图层与框选图形
    map = null
  }
  graphicLayer = null
}

// ========== 3. 矢量对象 ==========
function addData(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]
    // 接口返回的是 [经度 x, 纬度 y]，latlng 需要 [纬度, 经度]
    const graphic = new mars2d.graphic.Marker({
      latlng: [item.y, item.x],
      style: {
        image: "img/marker/mark3.png",
        scale: 1,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      },
      attr: item
    })
    graphicLayer.addGraphic(graphic)

    graphic.bindTooltip(item.name)
  }
}

// ========== 4. 面板交互方法：绘制框选范围并判断 ==========
export function removeAll() {
  // 框选图形由 layer.startDraw 加到地图默认的 graphicLayer 上
  map.graphicLayer.clear()

  for (let i = 0; i < selectGraphic.length; i++) {
    selectGraphic[i].setStyle({
      image: "img/marker/mark3.png"
    })
  }
  selectGraphic = []
}

export function drawPolygon() {
  removeAll()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: "#ffff00",
      fillOpacity: 0.2
    },
    success: function (graphic) {
      updateSelect(graphic)
    }
  })
}

export function drawCircle() {
  removeAll()
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      fillColor: "#ffff00",
      fillOpacity: 0.2
    },
    success: function (graphic) {
      updateSelect(graphic)
    }
  })
}

export function drawRectangle() {
  removeAll()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fillColor: "#ffff00",
      fillOpacity: 0.2
    },
    success: function (graphic) {
      updateSelect(graphic)
    }
  })
}

// 在范围内的改变图标为红色
function updateSelect(drawGraphic) {
  if (!drawGraphic) {
    return
  }

  graphicLayer.eachGraphic((graphic) => {
    const latlng = graphic.latlng

    const isInArea = drawGraphic.isInPoly(latlng)
    if (isInArea) {
      graphic.setStyle({
        image: "img/marker/mark2.png"
      })
      selectGraphic.push(graphic)
    }
  })
}
