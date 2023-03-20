let map

export function onMounted(mapInstance) {
  map = mapInstance
  const overviewMap = new mars2d.control.OverviewMap({
    position: "topright",
    toggleDisplay: true,
    minimized: false,
    mapOptions: {
      basemaps: [
        {
          type: "tile",
          url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
          show: true
        }
      ]
    }
  })
  map.addControl(overviewMap)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
