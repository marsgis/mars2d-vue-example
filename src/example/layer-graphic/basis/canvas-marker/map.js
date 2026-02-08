import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let canvasMarkerLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加图层
  canvasMarkerLayer = new mars2d.layer.CanvasMarkerLayer()
  map.addLayer(canvasMarkerLayer)

  canvasMarkerLayer.on("click", (e) => {
    console.log("单击了", e)
  })

  canvasMarkerLayer.bindPopup(function (event) {
    const attr = event?.attr || {}
    attr["类型"] = event.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars2d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
  })

  // 图层控制控件
  if (map.controls && map.controls.layers) {
    map.controls.layers.addOverlay(canvasMarkerLayer, "canvas点")
  }
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function clearData() {
  canvasMarkerLayer.clear()
}

// 添加随机图标点
export function addMarkers(numPoints) {
  canvasMarkerLayer.clear()

  for (let i = 0; i < numPoints; i++) {
    const latlng = getRandomLatLng()

    const graphic = new mars2d.graphic.Marker({
      latlng,
      style: {
        image: "img/marker/mark1.png",
        width: 20,
        height: 26,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      }
    })
    canvasMarkerLayer.addGraphic(graphic)

    // graphic.bindPopup("第" + i + "个点")
  }
}

// 添加随机图标点
export function addCustomDrawMarkers(numPoints) {
  canvasMarkerLayer.clear()

  // if (map.dragging.moving()) {
  //   return
  // }

  for (let i = 0; i < numPoints; i++) {
    const latlng = getRandomLatLng()

    const graphic = new mars2d.graphic.Marker({
      latlng,
      style: {
        width: 40,
        height: 20,
        customDraw: function (event) {
          const ctx = event.layer._context
          const pointPos = event.point
          const attr = event.graphic.attr
          const sizeWidth = event.graphic.style.width
          const sizeHeight = event.graphic.style.height

          ctx.beginPath()

          ctx.fillStyle = "rgba(255,0,0,0.8)"
          ctx.fillRect(pointPos.x - sizeWidth / 2, pointPos.y - sizeHeight / 2, sizeWidth, sizeHeight)

          ctx.font = "12px Helvetica Neue"
          ctx.fillStyle = "#000"
          ctx.textAlign = "center"
          ctx.fillText(attr.number, pointPos.x, pointPos.y + sizeHeight / 4)

          ctx.closePath()
        }
      },
      attr: {
        number: i
      }
    })
    canvasMarkerLayer.addGraphic(graphic)

    graphic.bindPopup("第" + i + "个点")
  }
}

function getRandomLatLng() {
  const bounds = map.getBounds().pad(0.5)
  const southWest = bounds.getSouthWest()
  const northEast = bounds.getNorthEast()
  const lngSpan = northEast.lng - southWest.lng
  const latSpan = northEast.lat - southWest.lat

  return L.latLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random())
}
