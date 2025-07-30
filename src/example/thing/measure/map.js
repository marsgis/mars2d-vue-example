import * as mars2d from "mars2d"
let map
let measure
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  measure = new mars2d.thing.Measure()
  map.addThing(measure)

  // 绑定标绘相关事件监听(可以自行加相关代码实现业务需求，此处主要做示例)
  measure.on(mars2d.EventType.drawStart, function (e) {
    console.log("开始绘制", e)
  })
  measure.on(mars2d.EventType.drawAddPoint, function (e) {
    console.log("绘制过程中增加了点", e)
  })
  measure.on(mars2d.EventType.drawRemovePoint, function (e) {
    console.log("绘制过程中删除了点", e)
  })

  measure.on(mars2d.EventType.drawCreated, function (e) {
    console.log("创建完成", e)
  })
  measure.on(mars2d.EventType.removeGraphic, function (e) {
    console.log("删除了量算对象", e)
  })

  measure.on(mars2d.EventType.editStart, function (e) {
    console.log("开始编辑", e)
  })
  measure.on(mars2d.EventType.editAddPoint, function (e) {
    console.log("编辑新增了点", e)
  })
  measure.on(mars2d.EventType.editMovePoint, function (e) {
    console.log("编辑修改了点", e)
  })
  measure.on(mars2d.EventType.editRemovePoint, function (e) {
    console.log("编辑删除了点", e)
  })
  measure.on(mars2d.EventType.editStop, function (e) {
    console.log("停止了编辑", e)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

export function distance() {
  measure.distance()
}

export function area() {
  measure.area()
}

export function clear() {
  measure.clear()
}
