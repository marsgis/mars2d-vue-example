import * as mars2d from "mars2d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  minZoom: 0,
  maxZoom: 13
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
}

export function setMapOptions(name, value) {
  const options = {}
  options[name] = value

  console.log("设置地图参数", map.options)

  map.setOptions(options)
}

// 是否显示底图
export function showBaseMap(enabled) {
  if (enabled) {
    map.basemap = 2021
  } else {
    map.basemap = undefined
  }
}
