import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  center: { lng: 117.238609, lat: 31.824373 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 增加magic动画点
  const graphic = new mars2d.graphic.Marker({
    latlng: [31.829316, 117.258796],
    style: {
      image: "img/marker/mark3.png",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
      magic: "vanishIn"
    }
  })
  graphicLayer.addGraphic(graphic)

  graphic.bindPopup(`magic: "vanishIn"`)

  // 增加magic动画点列表
  const magicArr = [
    "twisterInDown",
    "twisterInUp",
    "swap",
    "puffIn",
    "vanishIn",
    "openDownLeftReturn",
    "openDownRightReturn",
    "openUpLeftReturn",
    "openUpRightReturn",
    "perspectiveDownReturn",
    "perspectiveUpReturn",
    "perspectiveLeftReturn",
    "perspectiveRightReturn",
    "slideDownReturn",
    "slideUpReturn",
    "slideLeftReturn",
    "slideRightReturn",
    "swashIn",
    "foolishIn",
    "tinRightIn",
    "tinLeftIn",
    "tinUpIn",
    "tinDownIn",
    "boingInUp",
    "spaceInUp",
    "spaceInRight",
    "spaceInDown",
    "spaceInLeft"
  ]
  let i = 0
  const showMagicMarker = setInterval(function () {
    if (i < 28) {
      const magicType = magicArr[i]

      let latlng
      if (i < 14) {
        latlng = [31.905875, 116.999784 + i * 0.04]
      } else {
        latlng = [31.747188, 116.999784 + (i - 14) * 0.04]
      }
      const graphic = new mars2d.graphic.Marker({
        latlng,
        style: {
          image: "img/marker/mark1.png",
          horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
          verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
          magic: magicType
        }
      })
        .addTo(graphicLayer)
        .bindTooltip(magicType)

      i++
    } else {
      clearInterval(showMagicMarker)
    }
  }, 1000)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
