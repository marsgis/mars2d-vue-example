/**
 * 示例：center 默认视角
 * 演示：用 mapOptions.center 配置地图默认中心点，并提供多个景点视角按钮切换地图视点
 * API：mars2d.Map、map.getView、map.setView
 * 要点：center 用 { lng, lat }（经度在前）；setView 第二个参数是缩放级别；getView() 返回的 center/zoom 可直接拷到 mapOptions 中复用
 */
import * as mars2d from "mars2d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lng: 117.240601, lat: 31.827107 }
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // 1可以通过右键菜单"查看当前范围"来获取center参数后，拷贝到配置中

  // 2也可以通过下面方法获取center参数
  const viewOpt = map.getView()
  console.log(JSON.stringify(viewOpt)) // 输出 {"center":{...},"zoom":...}，可直接粘到 mapOptions

  // 可以通过centerAt切换视角
  map.setView(viewOpt.center, viewOpt.zoom)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy()
    map = null
  }
}

// ========== 3. 面板交互方法（切换视角）==========
export function changeView1() {
  map.setView({ lng: 116.391747, lat: 39.914152 }, 15)
}

export function changeView2() {
  map.setView({ lng: 86.851252, lat: 28.140562 }, 15)
}

export function changeView3() {
  map.setView({ lng: 110.091603, lat: 34.506415 }, 14)
}

export function changeView4() {
  map.setView({ lng: 115.876343, lat: 30.835904 }, 16)
}
