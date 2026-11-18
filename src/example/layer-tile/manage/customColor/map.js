/**
 * 示例：瓦片叠加颜色
 * 演示：用 TileLayer 的 customColor 把高德瓦片整体重着色，并用面板颜色选择器实时改色
 * API：mars2d.layer.TileLayer、TileLayer#customColor、map.addLayer
 * 要点：customColor 是逐像素改瓦片颜色（传字符串时是"灰度反相 + 叠色"，不是 CSS 滤镜）；设置后 SDK 会自动把瓦片 crossOrigin 置 true 以便读像素，要求瓦片服务允许跨域，否则着色失败；同时改 map 容器背景色，可避免瓦片未加载时闪白
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的瓦片图层（customColor 作用对象）

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  basemaps: [], // 不用 config.json 的默认底图，改为 onMounted 中自己创建
  renderer: L.svg()
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  const customColor = "#150D6A" // 初始着色（面板首次改色前的颜色）
  map.container.style.background = customColor //  DIV背景

  // 添加底图
  tileLayer = new mars2d.layer.TileLayer({
    type: "tile",
    url: "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    customColor: customColor // 使用自定义颜色
  })
  map.addLayer(tileLayer)

  // 图层控制控件
  if (map.controls && map.controls.layers) {
    map.controls.layers.addOverlay(tileLayer, "自定义颜色图层")
  }
}

// ========== 3. 面板交互方法 ==========
// 面板颜色选择器回调，rgb 字符串同样可作为 customColor
export function onChangeColor(color) {
  if (!tileLayer) {
    return
  }
  tileLayer.customColor = color // setter 内部会重绘所有已加载瓦片
  map.container.style.background = color //  DIV背景
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
