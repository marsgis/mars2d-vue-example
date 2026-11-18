/**
 * 示例：layers 图层管理
 * 演示：两种方式添加 Leaflet 图层管理控件——mapOptions.control.layers 配置创建、手工 L.control.layers 添加
 * API：mapOptions.control.layers、L.control.layers、map.addControl
 * 要点：layers 控件按地图创建时的 basemaps/operationallayers 生成可勾选列表，之后新增的图层要调用控件的 addOverlay 才会出现在列表里；position 参数与其它 Leaflet 控件一致
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 第一种添加控件方法：在地图构造参数里配置 control.layers
  option.control = {
    layers: { position: "topleft" }
  }
  return option
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 第二种添加控件方法：手工创建后 addControl
  // const layers = L.control.layers(null, null, { position: "bottomleft" })
  // map.addControl(layers)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 图层管理控件由地图按配置创建，随地图一起释放，只需断开示例对地图的引用
  map = null
}
