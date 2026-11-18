/**
 * 示例：量算 (长度、面积)
 * 演示：用 mars2d.thing.Measure 在地图上测量折线长度与多边形面积，并监听量算图层事件展示绘制/编辑过程
 * API：mars2d.thing.Measure#distance、mars2d.thing.Measure#area、map.addThing
 * 要点：Measure 内部自建 graphicLayer 且默认 hasEdit:true，测量完成后自动进入编辑；本示例的事件监听绑在 measure.graphicLayer 上，removeThing(measure, true) 会连带销毁该图层与这些监听
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let measure // 量算对象（内部自建量算图层与编辑能力）

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  measure = new mars2d.thing.Measure()
  map.addThing(measure)

  const graphicLayer = measure.graphicLayer

  // 绑定标绘相关事件监听(可以自行加相关代码实现业务需求，此处主要做示例)
  graphicLayer.on(mars2d.EventType.drawStart, function (e) {
    console.log("开始绘制", e)
  })
  graphicLayer.on(mars2d.EventType.drawAddPoint, function (e) {
    console.log("绘制过程中增加了点", e)
  })
  graphicLayer.on(mars2d.EventType.drawRemovePoint, function (e) {
    console.log("绘制过程中删除了点", e)
  })

  graphicLayer.on(mars2d.EventType.drawCreated, function (e) {
    console.log("创建完成", e)
  })
  graphicLayer.on(mars2d.EventType.removeGraphic, function (e) {
    console.log("删除了量算对象", e)
  })

  graphicLayer.on(mars2d.EventType.editStart, function (e) {
    console.log("开始编辑", e)
  })
  graphicLayer.on(mars2d.EventType.editAddPoint, function (e) {
    console.log("编辑新增了点", e)
  })
  graphicLayer.on(mars2d.EventType.editMovePoint, function (e) {
    console.log("编辑修改了点", e)
  })
  graphicLayer.on(mars2d.EventType.editRemovePoint, function (e) {
    console.log("编辑删除了点", e)
  })
  graphicLayer.on(mars2d.EventType.editStop, function (e) {
    console.log("停止了编辑", e)
  })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (!map) {
    return
  }
  if (measure) {
    // hasDestroy=true：先停止绘制、清空量算结果，再销毁内部 graphicLayer（上面绑定的事件监听随图层一起释放）
    map.removeThing(measure, true)
    measure = null
  }
  map = null
}

// ========== 3. 面板交互方法：开始量算 / 清除 ==========
export function distance() {
  measure.distance()
}

export function area() {
  measure.area()
}

export function clear() {
  measure.clear()
}
