/**
 * 示例：视角书签
 * 演示：用 mars2d.thing.ExpImg 把当前地图视角截图作为书签缩略图，配合面板的 localforage 本地存储实现视角书签的保存与回跳
 * API：mars2d.thing.ExpImg#expAll、mars2d.thing.ExpImg#expByDraw、map.getView / map.setView
 * 要点：截图依赖 example.json 的 resources 引入的 modern-screenshot（window.domtoimage）；expAll 截当前整屏、expByDraw 进入框选截图；截图回调参数名是 SDK 的 calllback（拼写如此）
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let expImg // 场景出图对象（用其截图能力生成书签缩略图）

// 事件对象，用于抛出事件到vue中
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  expImg = new mars2d.thing.ExpImg()
  map.addThing(expImg)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (!map) {
    return
  }
  if (expImg) {
    // hasDestroy=true 会走 ExpImg 的移除钩子：清理出图过程中的 setInterval、复位截图容器样式、结束框选绘制
    map.removeThing(expImg, true)
    expImg = null
  }
  map = null
}

// ========== 3. 面板交互方法：添加视角书签 ==========
// 添加书签（截当前视角整屏）
export function butAddTxtName(name) {
  const item = {
    name,
    view: map.getView()
  }

  expImg.expAll({
    download: false, // 只要 base64，不触发浏览器下载
    calllback: function (base64) {
      item.img = base64
      // 回调
      eventTarget.fire("addImgObject", { item })
    }
  })
}

// 添加书签（框选地图区域截图）
export function butAddTxtName2(name) {
  const item = {
    name,
    view: map.getView()
  }

  expImg.expByDraw({
    download: false,
    calllback: function (base64) {
      item.img = base64
      // 回调
      eventTarget.fire("addImgObject", { item })
    }
  })
}

// ========== 4. 面板交互方法：视角操作 ==========
// 飞向视角
export function flytoView(view) {
  map.setView(view.center, view.zoom)
}
