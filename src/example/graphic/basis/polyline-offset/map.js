/**
 * 示例：平行线
 * 演示：给 Polyline 设置 offset，把同一条线分别向两侧偏移成三条线，中间线用虚线流动
 * API：mars2d.graphic.Polyline（style.offset/dashArray/dashSpeed）
 * 要点：offset 单位像素，正负值分别偏向线的两侧；dashSpeed 控制虚线流动速度（正负决定方向）；坐标是 [纬度, 经度]
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graphicLayer // 矢量数据图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 117.15089, lat: 31.844836 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (graphicLayer) {
    // 从地图移除矢量图层：虚线流动动画随矢量对象一起停止
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}

// ========== 3. 矢量对象（演示数据）==========
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
      offset: -6 // 单位像素，向线的左侧偏移
    }
  })
  graphicLayer.addGraphic(leftLine)

  const rightLine = new mars2d.graphic.Polyline({
    latlngs: coords,
    style: {
      color: "#080",
      opacity: 1,
      offset: 6 // 单位像素，向线的右侧偏移
    }
  })
  graphicLayer.addGraphic(rightLine)
}
