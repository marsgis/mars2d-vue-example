/**
 * 示例：鱼骨导航
 * 演示：用 mars2d.control.Slider 在左上角显示鱼骨状的分级导航条，快速跳转到国家/省/市/街道等层级
 * API：mars2d.control.Slider、map.addControl
 * 要点：countryLevel/provinceLevel/cityLevel/streetLevel 是各行政级别对应的地图 zoom 层级（需在底图 minZoom~maxZoom 范围内）；鱼骨控件默认位置 topleft，会与左上角其他控件重叠
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let sliderControl

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 合并属性参数，可覆盖config.json中的对应配置
export const mapOptions = {
  control: {
    scale: true,
    locationBar: {
      crs: "CGCS2000_GK_Zone_3",
      template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
    },
    zoom: { position: "bottomleft" },
    toolBar: { position: "bottomleft" },
    layers: { position: "topright" }
  }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance
  // 鱼骨导航
  const slider = new mars2d.control.Slider({
    position: "topleft",
    countryLevel: 4,
    provinceLevel: 7,
    cityLevel: 10,
    streetLevel: 14
  })
  sliderControl = slider
  map.addControl(slider)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && sliderControl) {
    // Slider.onRemove 会解绑地图 zoomend 与 document 上的拖拽监听
    map.removeControl(sliderControl)
    sliderControl = null
  }
  map = null
}
