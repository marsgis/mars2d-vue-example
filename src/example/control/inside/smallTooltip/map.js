import * as mars2d from "mars2d"

let map

export function onMounted(mapInstance) {
  map = mapInstance

  // smallTooltip是一种简易的tooltip，目前标绘中用到的就是smallTooltip

  // 关闭tooltip
  map.closeSmallTooltip()

  map.on(mars2d.EventType.mousemove, onMapMouseMove)

  // 启用/禁用
  // $("#chkEnabled").change(function () {
  //   const enabled = $(this).is(":checked")

  //   map.smallTooltip.enabled = enabled
  // })
}

function onMapMouseMove(event) {
  map.openSmallTooltip(event.containerPoint, "可以放任意html信息")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.off(mars2d.EventType.mousemove, onMapMouseMove)
    map.closeSmallTooltip()
  }
  map = null
}

export function enabledSmallTooltip(enabled) {
  map.smallTooltip.enabled = enabled
}
