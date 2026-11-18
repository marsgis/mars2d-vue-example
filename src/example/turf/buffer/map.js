/**
 * 示例：缓冲分析
 * 演示：绘制点/线/面后用 turf.buffer 生成缓冲区，拖动编辑顶点时实时重算；面板输入框调整缓冲半径（公里）
 * API：graphic.toGeoJSON、turf.buffer、mars2d.Util.geoJsonToGraphics、mars2d.layer.GraphicLayer#startDraw
 * 要点：turf.buffer 的距离单位由 units 指定（这里是 kilometers）；缓冲结果要 bringToBack，否则会盖住原始图形；编辑顶点会触发 editMovePoint/editRemovePoint 事件，要在事件里重算而不是只算一次
 */
import * as mars2d from "mars2d"

let map
let resultLayer
let graphicLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.216396, lat: 31.839795 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 缓冲结果单独放一个图层，方便每次重算时先 clear
  resultLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(resultLayer)

  graphicLayer = new mars2d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)
  // 绘制完成 / 拖动顶点 / 删除顶点都要重算缓冲，保证缓冲区跟随图形变化
  graphicLayer.on(mars2d.EventType.drawCreated, function (e) {
    updateBuffer(e.graphic)
  })

  graphicLayer.on(mars2d.EventType.editMovePoint, function (e) {
    updateBuffer(e.graphic)
  })

  graphicLayer.on(mars2d.EventType.editRemovePoint, function (e) {
    updateBuffer(e.graphic)
  })

  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
        resultLayer.clear()
      }
    }
  ])
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放两个图层与编辑状态
    map = null
  }
  resultLayer = null
  graphicLayer = null
  lastgeojson = null
}

// ========== 4. 面板交互方法：绘制图形 ==========
export function drawPoint() {
  deleteAll()

  graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 6,
      color: "#0000ff"
    }
  })
}

export function drawPolyline() {
  deleteAll()

  graphicLayer.startDraw({
    type: "polyline",
    style: {
      width: 3,
      color: "#0000ff"
    }
  })
}

export function drawPolygon() {
  deleteAll()

  graphicLayer.startDraw({
    type: "polygon",
    style: {
      fill: true,
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
    }
  })
}

// ========== 5. 缓冲计算 ==========
// 缓冲半径（公里）：默认值与面板输入框初始值一致，保证重新运行 map.js 后不依赖面板赋值也能计算
let width = 1
export function radiusChange(val) {
  width = val
  if (lastgeojson) {
    updateBuffer()
  }
}

let lastgeojson // 上一次的图形 geojson：只改半径时用它重算，不必再取图形
function updateBuffer(layer) {
  let buffere
  try {
    const geojson = layer ? layer.toGeoJSON() : lastgeojson
    geojson.properties = {} // 缓冲结果不需要原始属性，避免弹窗里带出无关字段

    buffere = turf.buffer(geojson, width, { units: "kilometers" })

    lastgeojson = geojson
  } catch (e) {
    console.log("缓冲分析异常", e)
  }
  if (!buffere) {
    return
  }
  const graphicsOptions = mars2d.Util.geoJsonToGraphics(buffere, {
    type: "polygon",
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.3,
      outline: false
    }
  })
  resultLayer.clear()
  const graphic = resultLayer.addGraphic(graphicsOptions)
  graphic.bringToBack() // 缓冲区压到原始图形下面，不遮挡绘制对象
}

// ========== 6. 清除 ==========
export function deleteAll() {
  graphicLayer.clear()
  resultLayer.clear()
  lastgeojson = null
}
