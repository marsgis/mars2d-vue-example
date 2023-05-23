import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.on(mars2d.EventType.load, (event) => {
    console.log("map load", event)
  })

  // on绑定事件
  map.on(mars2d.EventType.move, map_cameraChangedHandler, this)
  map.on(mars2d.EventType.click, map_clickHandler, this)
  map.on(mars2d.EventType.dblclick, map_dblClickHandler, this)

  map.on(mars2d.EventType.rightClick, function (event) {
    console.log("鼠标右击了地图", event)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null

  // off移除事件
  // map.off(mars2d.EventType.move, this.map_cameraChangedHandler, this);
}

let clickTimeId // 双击会触发两次单击事件的解决
let mapMoveNum

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
