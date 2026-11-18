/**
 * 示例：移动端位置定位
 * 演示：继承 mars2d.control.ToolButton 自定义定位按钮，调用高德 JS API 获取当前位置并飞到该点
 * API：mars2d.control.ToolButton、map.addControl、mars2d.PointTrans.gcj2wgs
 * 要点：依赖外链高德 JS API（example.json 的 resources 引入 webapi.amap.com，需联网且 key 有效）；高德返回 GCJ-02 坐标，必须 gcj2wgs 转换后再上图；浏览器定位要求 HTTPS/localhost 且用户授权
 */
import * as mars2d from "mars2d"
import { Geolocation } from "./Geolocation.js"

let map // mars2d.Map二维地图对象
let geolocationControl

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 清空默认控件配置，本示例只保留下面手工 addControl 的定位按钮
  option.control = {}
  return option
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const geolocation = new Geolocation({
    insertIndex: 1 // 插入的位置顺序, 1是home按钮后面
  })
  geolocationControl = geolocation
  map.addControl(geolocation)

  // 手动调用，开始定位
  geolocation.startTracking()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (geolocationControl) {
    // 定位控件会在图层上添加位置点，需一并清除
    geolocationControl.clearLocationPoint()
    if (map) {
      // removeControl 会移除控件 DOM 并解绑其 unload 监听；AMap 监听挂在控件内部 geolocation 对象上，随控件实例一起回收
      map.removeControl(geolocationControl)
    }
    geolocationControl = null
  }
  map = null
}
