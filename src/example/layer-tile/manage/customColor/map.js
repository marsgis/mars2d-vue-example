import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
let tileLayer // 底图
let rgbObject // 颜色
const L = mars2d.L

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  basemaps: [],
  renderer: L.svg()
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.container.style.background = "#000000" // 黑色背景

  rgbObject = { r: 51, g: 59, b: 112 }

  // 添加底图
  tileLayer = new mars2d.layer.TileLayer({
    type: "tile",
    url: "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    // 使用自定义颜色
    customColor: function (oldColor) {
      // 返回自定义的着色
      return {
        r: (oldColor.r + rgbObject.r) % 255,
        g: (oldColor.g + rgbObject.g) % 255,
        b: (oldColor.b + rgbObject.b) % 255
      }
    }
  })
  map.addLayer(tileLayer)

  window.tileLayer = tileLayer

  // 图层控制控件
  if (map.controls && map.controls.layers) {
    map.controls.layers.addOverlay(tileLayer, "自定义颜色图层")
  }
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function onChangeColor(color) {
  let i
  for (i in color) {
    if (color[i] === 0) {
      globalMsg("请重新选择颜色")
      return
    }
  }
  rgbObject = color

  tileLayer.redraw()
}
