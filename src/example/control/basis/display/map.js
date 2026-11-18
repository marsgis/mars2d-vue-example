/**
 * 示例：控件的控制(显示及关闭)
 * 演示：用面板复选框控制内置控件（工具栏按钮、缩放按钮、比例尺、状态栏、图层控制）的显示与隐藏
 * API：map.controls、L.Control#getContainer、mars2d.control.ToolBar
 * 要点：本示例只改控件 DOM 的 display，不销毁控件；控件由 mapOptions.control 在地图创建时按配置生成，配置里没有的控件（如 2D 的独立底图切换）取不到
 */
import * as mars2d from "mars2d"

let map

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    // 面板
    scale: true,
    locationBar: {
      template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>层级:{level}</div>"
    },
    // 按钮
    zoom: { position: "bottomleft" },
    toolBar: { position: "bottomleft", item: ["home", "location", "fullscreen"] }
  }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance
}

// ========== 3. 面板交互方法：控件显隐 ==========

// ---- 按钮 ----

// 视角复位
export function bindView(val) {
  // 通过公开方法 getButton(name) 取按钮 DOM，按钮未配置时返回 undefined
  const btn = map.controls.toolBar.getButton("home")
  if (btn) {
    btn.style.display = val ? "block" : "none"
  }
}
// 定位
export function bindBtnLocation(val) {
  const btn = map.controls.toolBar.getButton("location")
  if (btn) {
    btn.style.display = val ? "block" : "none"
  }
}
// 全屏
export function bindFullScreen(val) {
  const btn = map.controls.toolBar.getButton("fullscreen")
  if (btn) {
    btn.style.display = val ? "block" : "none"
  }
}

// 地图放大（zoom-in 按钮）
export function bindZoomIn(val) {
  // 缩放按钮是 Leaflet 内部字段，改用公开的 getContainer() + Leaflet 公开样式类定位
  const btn = map.controls.zoom.getContainer().querySelector(".leaflet-control-zoom-in")
  btn.style.display = val ? "block" : "none"
}

// 地图缩小（zoom-out 按钮）
export function bindZoomOut(val) {
  const btn = map.controls.zoom.getContainer().querySelector(".leaflet-control-zoom-out")
  btn.style.display = val ? "block" : "none"
}

// ---- 面板 ----

// 显示鼠标提示信息
export function bindLocationBar(val) {
  // getContainer() 是 L.Control 的公开方法，等价于原来的私有字段 _container
  map.controls.locationBar.getContainer().style.display = val ? "block" : "none"
}
// 比例尺
export function bindLegend(val) {
  map.controls.scale.getContainer().style.display = val ? "block" : "none"
}
// 图层控制（2D 的底图切换合并在 layers 控件里，没有独立的底图切换控件）
export function bindBindLayersTool(val) {
  // config.json 的 control.layers 会创建图层/底图控制面板，2D 的控件集合名是 layers（不是 3D 的 layersTool）
  const control = map.controls.layers
  if (control) {
    control.getContainer().style.display = val ? "block" : "none"
  }
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 本示例的控件由地图按配置创建，随地图一起释放，只需断开示例对地图的引用
  map = null
}
