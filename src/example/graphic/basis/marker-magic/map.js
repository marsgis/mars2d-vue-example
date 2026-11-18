/**
 * 示例：点的加载动画
 * 演示：Marker 的 magic 入场动画（animate.css 动画名）与定时器逐个批量添加动画点
 * API：mars2d.graphic.Marker（style.magic）、setInterval
 * 要点：magic 取值来自同目录 magic.min.css 里的动画名，拼错不报错、只是没有动画；定时器必须在 onUnmounted 清理，防止切走后继续加点到已销毁的图层
 */
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

let magicTimer = null // 逐个添加 magic 标记的定时器

// ========== 1. 地图初始化 ==========
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
      // magic 是 animate.css 的动画名（见同目录 magic.min.css），错写不会提示，只是无动画
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
  if (magicTimer) {
    clearInterval(magicTimer)
  }
  magicTimer = setInterval(function () {
    if (i < magicArr.length) {
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
      clearInterval(magicTimer)
      magicTimer = null
    }
  }, 1000)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  // 定时器回调里还在往图层加点，必须先停掉再移除图层
  if (magicTimer) {
    clearInterval(magicTimer)
    magicTimer = null
  }
  eventTarget.off()
  if (graphicLayer) {
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}
