/**
 * 示例：POI兴趣点搜索
 * 演示：用自定义控件 PoiQueryButton 在工具栏插入高德 POI 搜索框，输入关键字或经纬度后在地图上定位并展示结果
 * API：mars2d.control.ToolButton（示例自定义子类）、mars2d.query.QueryPOI、map.addControl
 * 要点：PoiQueryButton 由 example.json 的 resources 以独立脚本引入（map.js 里的 import 在 dev 构建会被注释）；查询依赖高德 POI 服务，需联网；输入经纬度时走坐标定位，否则走关键字查询
 */
import * as mars2d from "mars2d"
import { PoiQueryButton } from "./PoiQueryButton"

let map // mars2d.Map二维地图对象
let poiQueryControl

// ========== 1. 地图参数（合并/覆盖 config.json）==========
export const mapOptions = {
  center: { lng: 117.237115, lat: 31.805875 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const poiQueryButton = new PoiQueryButton({
    insertIndex: 0 // 插入的位置顺序，0 表示放在工具栏最前面
  })
  poiQueryControl = poiQueryButton
  map.addControl(poiQueryButton)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (poiQueryControl) {
    // 自定义控件在 _mountedHook 里自己创建了查询结果图层并 addLayer 到地图，removeControl 不会移除它
    if (poiQueryControl.graphicLayer) {
      poiQueryControl.graphicLayer.remove(true)
    }
    if (map) {
      map.removeControl(poiQueryControl)
    }
    poiQueryControl = null
  }
  map = null
}
