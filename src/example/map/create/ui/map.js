import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 5,
  center: { lng: 110.522461, lat: 37.509726 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  eventTarget.fire("loadOK")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 绘制矩形（演示map.js与index.vue的交互）
export function drawExtent(extent) {
  map.graphicLayer.clear()
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
  console.log(value)
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

// 创建图层
export function createLayer(layer) {
  // return map.addLayer(layer)
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

export function removeLayer(layer, list) {
  const children = list.filter((item) => item.pid === layer.id)
  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      map.removeLayer(children[i])
    }
  } else {
    map.removeLayer(layer)
  }
}
