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
          url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
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
