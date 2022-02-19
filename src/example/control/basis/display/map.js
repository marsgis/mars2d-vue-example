import * as mars2d from "mars2d"

let map

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
export function onMounted(mapInstance) {
  map = mapInstance
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 按钮

// 视角复位
export function bindView(val) {
  map.controls.toolBar.btnGoHome.style.display = val ? "block" : "none"
}
// 定位
export function bindBtnLocation(val) {
  map.controls.toolBar.btnLocation.style.display = val ? "block" : "none"
}
// 全屏
export function bindFullScreen(val) {
  map.controls.toolBar.btnFullscreen.style.display = val ? "block" : "none"
}

// 显示缩小
export function bindZoomIn(val) {
  map.controls.zoom._zoomInButton.style.display = val ? "block" : "none"
}

// 显示放大
export function bindZoomOut(val) {
  map.controls.zoom._zoomOutButton.style.display = val ? "block" : "none"
}

// 面板：

// 显示鼠标提示信息
export function bindLocationBar(val) {
  map.controls.locationBar._container.style.display = val ? "block" : "none"
}
// 比例尺
export function bindLegend(val) {
  map.controls.scale._container.style.display = val ? "block" : "none"
}
