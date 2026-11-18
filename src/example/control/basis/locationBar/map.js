/**
 * 示例：下侧状态栏
 * 演示：手工创建 mars2d.control.LocationBar 状态栏，在页面下侧实时显示鼠标经纬度、投影坐标与层级
 * API：mars2d.control.LocationBar、map.addControl、mars2d.PointTrans.degree2dms
 * 要点：template 支持字符串模板（{lng}/{lat}/{crsx}/{crsy}/{level}），也支持传函数自定义渲染；配置 crs 后才会计算 {crsx}/{crsy}（本示例为 CGCS2000 3 度带）
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let locationBarControl

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 清空默认控件配置，本示例只保留手工创建的状态栏
  option.control = {}
  return option
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  const control = new mars2d.control.LocationBar({
    crs: "CGCS2000_GK_Zone_3",
    template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
    // template 也可以传函数（下方为按度分秒显示的写法示例）：
    // template: function (locationData) {
    //   let dfmX = mars2d.PointTrans.degree2dms(locationData.lng).str
    //   let dfmY = mars2d.PointTrans.degree2dms(locationData.lat).str

    //   return ` <div>经度:${locationData.lat} , ${dfmY}</div>
    //           <div>纬度:${locationData.lng} , ${dfmX}</div>
    //           <div>层级:${locationData.level}</div>`
    // }
  })
  locationBarControl = control
  map.addControl(control)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && locationBarControl) {
    // LocationBar.onRemove 会解绑 mousemove/zoomend 监听并清除内部缓存定时器
    map.removeControl(locationBarControl)
    locationBarControl = null
  }
  map = null
}
