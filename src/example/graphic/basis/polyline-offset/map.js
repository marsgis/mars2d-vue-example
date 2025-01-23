import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 117.15089, lat: 31.844836 }
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

  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addDemoGraphic1(graphicLayer) {
  const coords = [
    [31.853069, 117.154857],
    [31.848546, 117.15404],
    [31.846285, 117.153482],
    [31.844166, 117.151462],
    [31.84183, 117.150301],
    [31.839572, 117.151505],
    [31.836659, 117.153999],
    [31.834728, 117.155159],
    [31.833051, 117.155461]
  ]

  const middleLine = new mars2d.graphic.Polyline({
    latlngs: coords,
    style: {
      width: 1,
      dashArray: "5,10",
      dashSpeed: -30, // 可以定义运动速度，注释后是静态的
      color: "black",
      opacity: 0.3
    }
  })
  graphicLayer.addGraphic(middleLine)

  const leftLine = new mars2d.graphic.Polyline({
    latlngs: coords,
    style: {
      color: "#f00",
      opacity: 1,
      offset: -6
    }
  })
  graphicLayer.addGraphic(leftLine)

  const rightLine = new mars2d.graphic.Polyline({
    latlngs: coords,
    style: {
      color: "#080",
      opacity: 1,
      offset: 6
    }
  })
  graphicLayer.addGraphic(rightLine)
}
