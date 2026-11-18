/**
 * 示例：销毁释放地图
 * 演示：地图实例的创建与销毁，destroy() 后可在同一容器重新创建地图
 * API：mars2d.Map、mars2d.Map#destroy、mars2d.Map 生命周期
 * 要点：destroy() 不可逆，销毁后必须重新 new mars2d.Map()；销毁前先判空，避免重复调用；框架传入的 mapInstance 与手动创建的是同一个实例
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 1. 地图初始化（生命周期）==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 用户可能已单击「销毁地图」释放过地图，因此这里要判空，且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 释放地图 DOM、图层与事件监听
    map = null
  }
}

// ========== 3. 面板交互方法（创建 / 销毁地图）==========
// 创建地图
export function createMap() {
  if (map) {
    globalMsg("地图已存在,请勿重复创建!")
    return
  }
  // 手工创建与框架初始化等价的地图实例（globalMsg 由 iframe 里的 common.js 提供）
  map = new mars2d.Map("mars2dContainer", mapOptions)
}

// 销毁地图
export function destroyMap() {
  if (!map) {
    globalMsg("地图已销毁,无需重复销毁!")
    return
  }

  map.destroy()
  map = null
}
