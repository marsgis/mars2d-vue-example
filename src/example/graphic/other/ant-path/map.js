import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  const latlngs = [
    [31.812229022640732, 117.235107421875],
    [31.704803074739214, 117.14721679687501],
    [31.53640812943961, 116.982421875],
    [31.438037173124464, 116.9384765625],
    [31.04822792454978, 116.982421875],
    [30.760718908944472, 116.82861328125001],
    [30.62845887475364, 116.55395507812501],
    [30.477082932837682, 116.31225585937501],
    [30.097613277217132, 116.048583984375]
  ]

  const antPolyline = L.polyline.antPath(latlngs, { delay: 1500 })
  antPolyline.addTo(map)

  map.fitBounds(antPolyline.getBounds())
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
