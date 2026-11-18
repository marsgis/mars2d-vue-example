/**
 * 示例：CanvesMarker大数据点图层
 * 演示：用 mars2d.layer.CanvasMarkerLayer 以 Canvas 渲染上万图标点，并演示 customDraw 自定义绘制
 * API：mars2d.layer.CanvasMarkerLayer、CanvasMarkerLayer#addGraphic、CanvasMarkerLayer#getContext
 * 要点：CanvasMarkerLayer 适合大数据量点（比 SVG Marker 快）；customDraw 回调里 event.point 是屏幕像素坐标，绘图上下文用 event.layer.getContext() 取；面板按"万条"生成数据
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let canvasMarkerLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加图层（碰撞默认关闭，面板可切换；开启后同屏重叠点只保留高优先级）
  canvasMarkerLayer = new mars2d.layer.CanvasMarkerLayer({ collision: false })
  map.addLayer(canvasMarkerLayer)

  canvasMarkerLayer.on("click", (e) => {
    console.log("单击了", e)
  })

  canvasMarkerLayer.bindPopup(function (event) {
    // 拷贝一份属性再追加展示字段，避免把弹窗文案写回 graphic.attr 污染业务数据
    const attr = { ...(event?.attr || {}) }
    attr["类型"] = event.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars2d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
  })

  // 图层控制控件
  if (map.controls && map.controls.layers) {
    map.controls.layers.addOverlay(canvasMarkerLayer, "canvas点")
  }
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // Canvas 图层（含 canvas 元素）挂在地图上，卸载时移除并摘掉图层控制里的项
  if (map && canvasMarkerLayer) {
    map.removeLayer(canvasMarkerLayer, true)
    canvasMarkerLayer = null
  }
  map = null
}

// ========== 3. 面板交互方法 ==========
/**
 * 开关点碰撞
 * @param {Boolean} enabled 是否开启
 * @return {void} 无
 */
export function setCollision(enabled) {
  if (!canvasMarkerLayer) {
    return
  }
  canvasMarkerLayer.setOptions({ collision: enabled, collisionPadding: 2 })
  canvasMarkerLayer.redraw()
}

export function clearData() {
  if (!canvasMarkerLayer) {
    return
  }
  canvasMarkerLayer.clear()
}

// 添加随机图标点
export function addMarkers(numPoints) {
  if (!canvasMarkerLayer) {
    return
  }
  canvasMarkerLayer.clear()

  for (let i = 0; i < numPoints; i++) {
    const latlng = getRandomLatLng()

    const graphic = new mars2d.graphic.Marker({
      latlng,
      style: {
        image: "img/marker/mark1.png",
        width: 20,
        height: 26,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      }
    })
    canvasMarkerLayer.addGraphic(graphic)

    // graphic.bindPopup("第" + i + "个点")
  }
}

// 添加随机图标点（customDraw 个性绘制）
export function addCustomDrawMarkers(numPoints) {
  if (!canvasMarkerLayer) {
    return
  }
  canvasMarkerLayer.clear()

  // if (map.dragging.moving()) {
  //   return
  // }

  for (let i = 0; i < numPoints; i++) {
    const latlng = getRandomLatLng()

    const graphic = new mars2d.graphic.Marker({
      latlng,
      style: {
        width: 40,
        height: 20,
        customDraw: function (event) {
          // getContext 是 CanvasMarkerLayer 的公开方法（替代 Leaflet 私有属性 _context）
          const ctx = event.layer.getContext()
          if (!ctx) {
            return // Canvas 尚未初始化时理论上不会进 customDraw，判空防边界
          }
          const pointPos = event.point
          const attr = event.graphic.attr
          const sizeWidth = event.graphic.style.width
          const sizeHeight = event.graphic.style.height

          ctx.beginPath()

          ctx.fillStyle = "rgba(255,0,0,0.8)"
          ctx.fillRect(pointPos.x - sizeWidth / 2, pointPos.y - sizeHeight / 2, sizeWidth, sizeHeight)

          ctx.font = "12px Helvetica Neue"
          ctx.fillStyle = "#000"
          ctx.textAlign = "center"
          ctx.fillText(attr.number, pointPos.x, pointPos.y + sizeHeight / 4)

          ctx.closePath()
        }
      },
      attr: {
        number: i
      }
    })
    canvasMarkerLayer.addGraphic(graphic)

    graphic.bindPopup("第" + i + "个点")
  }
}

// ========== 4. 内部工具函数 ==========
function getRandomLatLng() {
  // pad(0.5) 把范围向外扩一半，避免随机点全落在当前视野边缘
  const bounds = map.getBounds().pad(0.5)
  const southWest = bounds.getSouthWest()
  const northEast = bounds.getNorthEast()
  const lngSpan = northEast.lng - southWest.lng
  const latSpan = northEast.lat - southWest.lat

  return L.latLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random())
}
