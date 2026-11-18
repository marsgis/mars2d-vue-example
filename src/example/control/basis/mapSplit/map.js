/**
 * 示例：卷帘对比
 * 演示：加载高德与天地图影像图层，用 mars2d.control.MapSplit 做左右卷帘裁剪对比
 * API：mars2d.control.MapSplit、mars2d.layer.GaodeLayer、map.addControl
 * 要点：卷帘通过给图层容器设置 clip 样式实现，只对瓦片图层有效；leftLayer 支持图层数组（本示例传底图+注记）；必须先移除控件再移除图层，控件 remove 时会清掉裁剪样式
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map
let mapSplitControl
const splitLayers = []

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 合并属性参数，可覆盖config.json中的对应配置
export const mapOptions = {
  // 清空 config.json 的默认底图，避免默认底图叠在卷帘对比图层下面影响效果
  basemaps: [],
  control: {
    layers: false
  }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // 分屏对比：左侧用高德影像+注记，右侧用天地图影像
  const gaodeLayer = new mars2d.layer.GaodeLayer({ layer: "img_d" })
  map.addLayer(gaodeLayer)

  const gaodeLayer2 = new mars2d.layer.GaodeLayer({ layer: "img_z" })
  map.addLayer(gaodeLayer2)

  const tdtLayer = new mars2d.layer.TdtLayer({ layer: "img_d" })
  map.addLayer(tdtLayer)

  splitLayers.push(gaodeLayer, gaodeLayer2, tdtLayer)

  // 卷帘控件：leftLayer/rightLayer 决定分屏左右两侧显示的图层
  mapSplitControl = new mars2d.control.MapSplit({
    leftLayer: [gaodeLayer, gaodeLayer2],
    rightLayer: tdtLayer
  })
  map.addControl(mapSplitControl)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 先移除控件（remove 中会解绑 map/DOM 监听并还原图层的 clip 裁剪样式），再移除图层
  if (map && mapSplitControl) {
    map.removeControl(mapSplitControl)
    mapSplitControl = null
  }
  if (map) {
    splitLayers.forEach((layer) => {
      map.removeLayer(layer)
    })
  }
  splitLayers.length = 0
  map = null
}
