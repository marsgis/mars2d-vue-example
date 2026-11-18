/**
 * 示例：map相关事件
 * 演示：绑定地图的 load / 移动 / 单击 / 双击 / 右键事件，在控制台输出事件对象
 * API：mars2d.EventType、map.on、map.off
 * 要点：双击会先触发两次 click，示例用 250ms 防抖区分；map.on 必须与 map.off 成对，否则切换示例后旧监听仍会执行
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// 事件处理器与防抖定时器：先声明，保证 onUnmounted 里能拿到同一引用做解绑与清理
let mapLoadHandler
let mapRightClickHandler
let clickTimeId // 单击/双击共用，延迟 250ms 后确认是单击
let mapMoveNum // 地图移动防抖

// ========== 1. 地图初始化与事件绑定 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  mapLoadHandler = (event) => {
    console.log("map load", event)
  }
  // 注意：地图在 onMounted 之前已完成加载，load 事件可能已经错过，此处仅演示 on 绑定写法
  map.on(mars2d.EventType.load, mapLoadHandler)

  // on绑定事件
  map.on(mars2d.EventType.move, map_cameraChangedHandler)
  map.on(mars2d.EventType.click, map_clickHandler)
  map.on(mars2d.EventType.dblclick, map_dblClickHandler)

  mapRightClickHandler = function (event) {
    console.log("鼠标右击了地图", event)
  }
  map.on(mars2d.EventType.rightClick, mapRightClickHandler)
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

  // 与 onMounted 中注册的监听成对移除，并清掉尚未触发的防抖定时器
  map.off(mars2d.EventType.load, mapLoadHandler)
  map.off(mars2d.EventType.move, map_cameraChangedHandler)
  map.off(mars2d.EventType.click, map_clickHandler)
  map.off(mars2d.EventType.dblclick, map_dblClickHandler)
  map.off(mars2d.EventType.rightClick, mapRightClickHandler)
  clearTimeout(clickTimeId)
  clearTimeout(mapMoveNum)
  map.destroy()
  map = null
  mapLoadHandler = null
  mapRightClickHandler = null
  clickTimeId = null
  mapMoveNum = null
}

// ========== 3. 事件处理（单击/双击/移动的防抖输出）==========
function map_clickHandler(event) {
  // 延迟 250ms 再输出：双击时会先触发两次 click，dblclick 到来时用 clearTimeout 取消
  clearTimeout(clickTimeId)
  clickTimeId = setTimeout(function () {
    console.log("鼠标单击", event)
  }, 250)
}

function map_dblClickHandler(event) {
  clearTimeout(clickTimeId)
  console.log("鼠标双击地图", event)
}

function map_cameraChangedHandler(event) {
  // move 事件触发非常频繁，防抖后只输出最后一次，避免控制台刷屏
  clearTimeout(mapMoveNum)
  mapMoveNum = setTimeout(function () {
    console.log("相机位置移动", event)
  }, 250)
}
