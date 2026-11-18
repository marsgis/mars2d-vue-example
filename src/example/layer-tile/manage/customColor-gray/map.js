/**
 * 示例：瓦片叠加颜色(灰色)
 * 演示：用 TileLayer 的 customColor 回调逐像素把瓦片按 RGB 权重转成灰度
 * API：mars2d.layer.TileLayer、TileLayer#customColor（函数形式）、map.addLayer
 * 要点：回调入参是单个像素的旧颜色 { r, g, b, a }，返回新颜色对象（只返回要改的通道也可以）；回调对每张瓦片的每个像素执行，逻辑越重渲染越慢；customColor 会自动开启瓦片 crossOrigin，要求瓦片服务允许跨域
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的瓦片图层（自定义灰度着色）

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
// 删掉 config.json 的默认底图，避免默认底图盖住本示例图层
export const mapOptions = function (option) {
  delete option.basemaps
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  tileLayer = createTileLayer()

  // 图层控制控件
  if (map.controls && map.controls.layers) {
    map.controls.layers.addOverlay(tileLayer, "自定义颜色图层")
  }
}

// ========== 3. 灰度瓦片图层创建 ==========
function createTileLayer() {
  // 灰度权重：all 是权重和，用于归一化，保证结果仍落在 0~255
  const rgbObject = { r: 21, g: 71, b: 8 }
  rgbObject.all = rgbObject.r + rgbObject.g + rgbObject.b

  // 添加底图
  const layer = new mars2d.layer.TileLayer({
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
  map.addLayer(layer)

  return layer
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && tileLayer) {
    map.removeLayer(tileLayer, true) // 同时从图层控件中移除
    tileLayer = null
  }
  map = null
}
