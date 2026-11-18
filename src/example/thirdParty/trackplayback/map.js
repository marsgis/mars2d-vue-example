/**
 * 示例：时序轨迹路线
 * 演示：用 leaflet.trackplayback 插件回放船舶轨迹（时钟驱动轨迹点/轨迹线绘制），并用 eventTarget 把当前时间、速度等信息逐帧抛给面板，面板可播放/暂停、快慢放、拖动时间轴
 * API：L.trackplayback（lib 插件）、trackplayback.clock（start/stop/rePlaying/slowSpeed/quickSpeed/getCurTime）、trackplayback.draw（showTrackPoint/showTrackLine）
 * 要点：时钟用 requestAnimFrame 循环推进，onUnmounted 必须先 stop 再 dispose，否则切走示例后动画仍在跑；clock 的 tick 每帧触发一次，所以面板只需被动接收 dataLoad，不要自己起定时器
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
const L = mars2d.L

let trackplayback // 轨迹回放对象（由第三方 L.trackplayback 创建）
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 轨迹数据在东海/日本海附近，先把视角放到能看到完整航线的高度
  map.setView([33.74, 134.38], 6)

  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/ship-japan.json"
  })
    .then((data) => {
      // 请求返回时示例可能已被切走、map 已置空，直接丢弃结果
      if (!map) {
        return
      }
      console.log("数据加载完成", data)

      initTtrackplayback(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  // tick 每帧都会 fire dataLoad，先解绑面板事件，避免回调到已销毁的面板
  eventTarget.off()
  if (trackplayback) {
    // 顺序要求：先停时钟（停止 requestAnimFrame 循环）、解绑自定义 tick 监听，再 dispose 释放 canvas 与轨迹图层
    if (trackplayback.clock) {
      trackplayback.clock.off("tick", onClockTick)
    }
    trackplayback.stop()
    trackplayback.dispose()
    trackplayback = null
  }
  map = null
}

// ========== 3. 轨迹回放与事件 ==========
function initTtrackplayback(data) {
  // L.trackplayback代码见 lib/leaflet/thirdParty/trackplayback/leaflet.trackplayback.js
  trackplayback = L.trackplayback(data, map, {
    targetOptions: {
      useImg: true,
      imgUrl: "img/marker/ship.png"
    }
  })
  // 先推一次首帧信息，让面板拿到开始/结束时间后显示出来
  const info = getInfo()
  eventTarget.fire("dataLoad", { info })

  trackplayback.clock.on("tick", onClockTick)
}

// 时钟每帧触发：把当前回放状态推给面板
function onClockTick() {
  const info = getInfo()
  eventTarget.fire("dataLoad", { info })
}

// ========== 4. 面板交互方法 ==========
export function controlPlaying(isPlay) {
  if (!trackplayback) {
    return
  }
  if (isPlay) {
    trackplayback.clock.start()
  } else {
    trackplayback.clock.stop()
  }
}

export function rePlaying() {
  if (!trackplayback) {
    return
  }
  trackplayback.clock.rePlaying()
}

export function slowSpeed() {
  if (!trackplayback) {
    return
  }
  trackplayback.clock.slowSpeed()

  const info = getInfo()
  eventTarget.fire("dataLoad", { info })
}

export function quickSpeed() {
  if (!trackplayback) {
    return
  }
  trackplayback.clock.quickSpeed()

  const info = getInfo()
  eventTarget.fire("dataLoad", { info })
}

export function setSpeed() {
  if (!trackplayback) {
    return
  }
  trackplayback.clock.setSpeed()
}

export function showTrackPoint(show) {
  if (!trackplayback) {
    return
  }
  if (show) {
    trackplayback.draw.showTrackPoint()
  } else {
    trackplayback.draw.hideTrackPoint()
  }
}

export function showTrackLine(show) {
  if (!trackplayback) {
    return
  }
  if (show) {
    trackplayback.draw.showTrackLine()
  } else {
    trackplayback.draw.hideTrackLine()
  }
}

export function setCursor(val) {
  if (!trackplayback) {
    return
  }
  trackplayback.setCursor(val)
}

// ========== 5. 辅助方法 ==========
function getInfo() {
  const simpleCurTime = trackplayback.clock.getCurTime()
  const simpleStartTime = trackplayback.clock.getStartTime()
  const simpleEndTime = trackplayback.clock.getEndTime()

  return {
    curTime: getShowTime(simpleCurTime),
    startTime: getShowTime(simpleStartTime),
    endTime: getShowTime(simpleEndTime),
    speed: trackplayback.clock.getSpeed(),
    simpleCurTime,
    simpleStartTime,
    simpleEndTime
  }
}

// 把插件内部的秒级时间戳格式化为 yyyy-MM-dd HH:mm:ss（accuracy 可传 d/h/m 取更粗的精度）
function getShowTime(time, accuracy = "s") {
  time = parseInt(time * 1000)
  const newDate = new Date(time)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1
  const day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()
  const hours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours()
  const minuts = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes()
  const seconds = newDate.getSeconds() < 10 ? "0" + newDate.getSeconds() : newDate.getSeconds()
  let ret
  if (accuracy === "d") {
    ret = year + "-" + month + "-" + day
  } else if (accuracy === "h") {
    ret = year + "-" + month + "-" + day + " " + hours
  } else if (accuracy === "m") {
    ret = year + "-" + month + "-" + day + " " + hours + ":" + minuts
  } else {
    ret = year + "-" + month + "-" + day + " " + hours + ":" + minuts + ":" + seconds
  }
  return ret
}
