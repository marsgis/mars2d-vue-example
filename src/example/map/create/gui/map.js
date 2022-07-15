import * as mars2d from "mars2d"

export let map // mars3d.Map三维地图对象



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

// 调整亮度 （演示滑动条）
export function updateBrightness(val) {
  // bloomEffect.brightness = val
}

// 是否运行地图鼠标交互
export function enableMapMouseController(value) {
  // map.setSceneOptions({
  //   cameraController: {
  //     enableZoom: value,
  //     enableTranslate: value,
  //     enableRotate: value,
  //     enableTilt: value
  //   }
  // })
}
