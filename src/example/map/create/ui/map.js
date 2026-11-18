/**
 * 示例：普通UI控件
 * 演示：常用的表单/表格/树/消息类 UI 控件，并通过绘制矩形、图层树勾选与地图双向交互
 * API：mars2d.Map、map.graphicLayer.startDraw、map.getLayers、map.addLayer / map.removeLayer
 * 要点：map.js 与面板通过 eventTarget 事件通信；getLayers 取的是 config.json 中配置的底图与叠加图层；移除分组图层要先删子图层
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 5,
  center: { lng: 110.522461, lat: 37.509726 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  // 通知面板地图业务已就绪（面板在 setup 阶段就已订阅 loadOK）
  eventTarget.fire("loadOK")
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放默认图层与绘制生成的矢量对象
    map = null
  }
}

// ========== 3. 面板交互方法（绘制 / 地图交互 / 图层管理）==========
// 绘制矩形（演示map.js与index.vue的交互）
export function drawExtent(extent) {
  map.graphicLayer.clear() // 先清空上一次的绘制结果
  // 绘制矩形
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fill: true,
      color: "rgba(0,0,255,0.2)",
      outline: true,
      outlineWidth: 2,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      const rectangle = graphic.coordinates
      eventTarget.fire("drawExtent", { extent: JSON.stringify(rectangle) }) // 抛出事件，可以vue中去监听事件
    }
  })
}

// 是否运行地图鼠标交互
export function enableMapMouseController(value) {
  // 直接启停 Leaflet 的拖拽处理器，开关才能双向恢复
  if (value) {
    map.dragging.enable()
  } else {
    map.dragging.disable()
  }
}

// 调整亮度 （演示滑动条）
export function updateBrightness(val) {
  console.log(val)
}

// 调整对比度 （演示滑动条）
export function updateContrast(val) {
  console.log(val)
}

export function addLayer(layer) {
  map.addLayer(layer)
  layer.show = true
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

export function removeLayer(layer, list) {
  // 分组图层要先移除其子图层，否则子图层仍挂在已移除的分组上
  const children = list.filter((item) => item.pid === layer.id)
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      map.removeLayer(children[i])
    }
  } else {
    map.removeLayer(layer)
  }
}
