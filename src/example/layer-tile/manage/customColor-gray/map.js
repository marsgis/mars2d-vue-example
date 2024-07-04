import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  delete option.basemaps
  return option
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

  delete mapOptions.basemaps

  const tileLayer = createTileLayer()

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

function createTileLayer() {
  const rgbObject = { r: 21, g: 71, b: 8 }
  rgbObject.all = rgbObject.r + rgbObject.g + rgbObject.b

  // 添加底图
  const tileLayer = new mars2d.layer.TileLayer({
    type: "tile",
    url: "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    // 使用自定义颜色：灰度图 【自定义回调方法】
    customColor: function (oldColor) {
      const newVal = (rgbObject.r * oldColor.r + rgbObject.g * oldColor.g + rgbObject.b * oldColor.b) / rgbObject.all
      return {
        r: newVal,
        g: newVal,
        b: newVal
      }
    }
  })
  map.addLayer(tileLayer)

  return tileLayer
}

// function createTileLayer() {
//   const rgbObject = { r: 51, g: 59, b: 112 }

//   // 添加底图
//  const tileLayer = new mars2d.layer.TileLayer({
//     type: "tile",
//     url: "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
//     // 使用自定义颜色 【自定义回调方法】
//     customColor: function (oldColor) {
//       // 返回自定义的着色
//       return {
//         r: (oldColor.r + rgbObject.r) % 255,
//         g: (oldColor.g + rgbObject.g) % 255,
//         b: (oldColor.b + rgbObject.b) % 255
//       }
//     }
//   })
//   map.addLayer(tileLayer)

//   return tileLayer
// }
