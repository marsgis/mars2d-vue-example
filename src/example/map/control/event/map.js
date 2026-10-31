import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  mapLoadHandler = (event) => {
    console.log("map load", event)
  }
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
  map = null
}

let clickTimeId // 双击会触发两次单击事件的解决
let mapMoveNum
let mapLoadHandler
let mapRightClickHandler

function map_clickHandler(event) {
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
  clearTimeout(mapMoveNum)
  mapMoveNum = setTimeout(function () {
    console.log("相机位置移动", event)
  }, 250)
}
