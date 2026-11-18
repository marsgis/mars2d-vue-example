/**
 * 示例：图层管理
 * 演示：用 map.getLayers() 取出 config.json 与地图参数中配置的图层，配合树面板做图层添加、移除、显隐与定位
 * API：map.getLayers、map.addLayer、map.removeLayer
 * 要点：getLayers 的 basemaps/layers 参数分别控制是否包含底图、是否包含普通图层；图层要 addLayer 之后 isAdded 才为 true；面板按 pid/id 拼树，移除父节点时要连带移除子节点（见 removeLayer）；地图与图层就绪后通过 eventTarget 的 loadOK 通知面板
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10,
  center: { lng: 117.233734, lat: 31.87989 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 地图与配置图层此时已就绪，通知面板初始化图层树（面板在 setup 中已订阅该事件）
  eventTarget.fire("loadOK")
}

// ========== 3. 面板交互方法 ==========
export function addLayer(layer) {
  map.addLayer(layer)
}

export function removeLayer(layer, list) {
  // 树面板按 pid 建立父子关系，删父节点必须连带删子节点，否则子图层会残留在图上
  const children = list.filter((item) => item.pid === layer.id)
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      map.removeLayer(children[i])
    }
  } else {
    map.removeLayer(layer)
  }
}

export function getLayers() {
  return map.getLayers({
    basemaps: true, // 是否取config.json中的basempas
    layers: true // 是否取config.json中的layers
  })
}

/**
 * 是否为 config.json 初始化时创建的图层（公开 API，替代早期的私有字段 _hasMapInit）
 * @param {object} layer 图层对象
 * @returns {boolean} true：地图初始化时创建；false：运行中新增
 */
export function isMapInitLayer(layer) {
  return mars2d.LayerUtil.isMapInitLayer(layer)
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 图层由框架按配置创建、随地图/iframe 一起释放，这里只需断开引用
  map = null
}
