import * as mars2d from "mars2d"

export let map // mars2d.Map三维地图对象
const L = mars2d.L

let trackplayback
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.setView([33.74, 134.38], 6)

  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/ship-japan.json"
  })
    .then((data) => {
      console.log("数据加载完成", data)

      initTtrackplayback(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

function initTtrackplayback(data) {
  // L.trackplayback代码见 lib/mars2d/thirdParty/trackplayback/leaflet.trackplayback.js
  trackplayback = L.trackplayback(data, map, {
    targetOptions: {
      useImg: true,
      imgUrl: "img/marker/ship.png"
    }
  })
  const info = getInfo()
  eventTarget.fire("dataLoad", { info })

  trackplayback.clock.on("tick", function () {
    const info = getInfo()
    eventTarget.fire("dataLoad", { info })
  })
}

export function controlPlaying(isPlay) {
  if (isPlay) {
    trackplayback.clock.start()
  } else {
    trackplayback.clock.stop()
  }
}

export function rePlaying() {
  trackplayback.clock.rePlaying()
}
export function slowSpeed() {
  trackplayback.clock.slowSpeed()

  const info = getInfo()
  eventTarget.fire("dataLoad", { info })
}

export function quickSpeed() {
  trackplayback.clock.quickSpeed()

  const info = getInfo()
  eventTarget.fire("dataLoad", { info })
}
export function setSpeed() {
  trackplayback.clock.setSpeed()
}

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

export function showTrackPoint(show) {
  if (show) {
    trackplayback.draw.showTrackPoint()
  } else {
    trackplayback.draw.hideTrackPoint()
  }
}
export function showTrackLine(show) {
  if (show) {
    trackplayback.draw.showTrackLine()
  } else {
    trackplayback.draw.hideTrackLine()
  }
}

export function setCursor(val) {
  trackplayback.setCursor(val)
}

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

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
