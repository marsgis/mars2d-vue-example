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
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 创建地图
export function createMap() {
  if (map) {
    globalMsg("地图已存在,请勿重复创建!")
    return
  }
  map = new mars2d.Map("mars2dContainer", mapOptions)
}

// 销毁地球
export function destroyMap() {
  if (!map) {
    globalMsg("地图已销毁,无需重复销毁!")
    return
  }

  map.destroy()
  map = null
}
