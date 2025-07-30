import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
let graphicLayer
let selectGraphic = []

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
      addData(data)
    })
    .catch(function (data) {
      console.log("请求出错", data)
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addData(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]
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

export function removeAll() {
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
