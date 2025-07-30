import * as mars2d from "mars2d"

let map
let resultLayer
let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.216396, lat: 31.839795 }
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  resultLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(resultLayer)

  graphicLayer = new mars2d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)

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

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

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

let width
export function radiusChange(val) {
  width = val
  if (lastgeojson) {
    updateBuffer()
  }
}

let lastgeojson
function updateBuffer(layer) {
  let buffere
  try {
    const geojson = layer ? layer.toGeoJSON() : lastgeojson
    geojson.properties = {}

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
  graphic.bringToBack()
}

export function deleteAll() {
  graphicLayer.clear()
  resultLayer.clear()
  lastgeojson = null
}
