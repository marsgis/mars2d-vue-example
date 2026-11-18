/**
 * 示例：场景出图(导出图片)
 * 演示：用 mars2d.thing.ExpImg 把地图场景导出为图片（全屏导出、框选导出），并用 screenShotPlugin 做页面局部截图
 * API：mars2d.thing.ExpImg#expAll、mars2d.thing.ExpImg#expByDraw、map.addThing
 * 要点：地图出图依赖 example.json 的 resources 引入的 modern-screenshot（window.domtoimage）；「局部截图」用 public/lib/dom2img 下的 screenShotPlugin（基于 modern-screenshot 而非 html2canvas）；expByDraw 会先进入框选绘制状态
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let expImg // 场景出图对象

// 事件对象，用于抛出事件到vue中
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图参数（合并/覆盖 config.json）==========
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.238884, lat: 31.84417 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  expImg = new mars2d.thing.ExpImg()
  map.addThing(expImg)
}

// ========== 3. 清理（与 onMounted 对称）==========
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

// ========== 4. 面板交互方法：场景出图 / 局部截图 ==========
// 在当前页面预览出图结果（不下载）
export function showMapImg() {
  expImg.expAll({
    download: false, // 只要 base64，不触发浏览器下载
    calllback: function (base64) {
      // 回调
      eventTarget.fire("loadOk", { base64 })
    }
  })
}

// 全屏导出（触发浏览器下载）
export function downLoad() {
  expImg.expAll()
}

// 框选导出（先在地图上框选范围，再下载）
export function downLoad2() {
  expImg.expByDraw()
}

export function shotPartImg() {
  // API及更多资料参考： https://github.com/likaia/js-screen-shot
  // 当前引入的是 public\lib\dom2img\screenShotPlugin.umd.js,官方版本的一种截图方式是基于html2canvas,这会导致截图中出现box-shadow样式错误，
  // 所以这里将html2canvas换成modern-screenshot，详细资料可以看https://github.com/qq15725/modern-screenshot这个仓库
  // eslint-disable-next-line no-undef
  const plugin = new screenShotPlugin({
    clickCutFullScreen: true,
    wrcWindowMode: true,
    loadCrossImg: true,
    enableWebRtc: false,
    level: 999999999,
    h2cImgLoadErrCallback: (err) => {
      console.log("h2cCrossImgLoadErrFn", err)
    },
    h2cIgnoreElementsCallback: (element) => {
      if (element.id === "hideDom") {
        return true
      }
      return false
    },

    completeCallback: ({ base64, cutInfo }) => {
      eventTarget.fire("showPartImg", { base64 })
    }
  })
}
