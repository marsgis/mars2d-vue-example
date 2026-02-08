import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  renderer: L.canvas()
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.fitBounds(L.latLngBounds([0, 70], [60, 140]))

  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 全国温度图
  const graphic = new mars2d.graphic.CanvasImage({
    latlngs: [
      [0, 70],
      [60, 140]
    ],
    style: {
      url: "img/simple/wendu.png",
      alpha: 0.7
    }
  })
  graphicLayer.addGraphic(graphic)

  // 显示鼠标所在位置颜色值
  const popup = L.popup({ closeButton: false })
  map.on("mousemove", function (e) {
    const latlng = e.latlng
    const rgb = graphic.getRgba(latlng)
    if (rgb === "rgba(0,0,0,0)") {
      popup.remove()
      return
    }

    const inhtml = '<div style="background-color: ' + rgb + ';padding:10px;">颜色:' + rgb + "</div>"
    popup.setLatLng(latlng).setContent(inhtml).openOn(map)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
