import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

export const eventTarget = new mars2d.BaseClass()

export let graphicLayer

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  graphicLayer = new mars2d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)

  /* // 数据编辑相关事件，用于editorUI属性弹窗的交互
  graphicLayer.on(mars2d.EventType.drawCreated, function (e) {
    eventTarget.fire("graphicEditor-start", e)
  })
  graphicLayer.on(
    [mars2d.EventType.editStart, mars2d.EventType.editMovePoint, mars2d.EventType.editStyle, mars2d.EventType.editRemovePoint],
    function (e) {
      eventTarget.fire("graphicEditor-update", e)
    }
  )
  graphicLayer.on([mars2d.EventType.editStop, mars2d.EventType.removeGraphic], function (e) {
    eventTarget.fire("graphicEditor-stop", e)
  }) */
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 绘制
export function drawPolygon(type) {
  console.log("开始标绘：" + type)

  graphicLayer.startDraw({
    type: type,
    style: {
      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
    }
  })
}
