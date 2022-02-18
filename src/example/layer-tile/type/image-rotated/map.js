import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象
let imgLayer // 添加的图片图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 116.401794, lat: 39.92075 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加图片
  const topleft = [39.921668, 116.385298]
  const topright = [39.921874, 116.395748]
  const bottomleft = [39.911645, 116.385834]

  imgLayer = new mars2d.layer.ImageRotatedLayer({
    url: "img/simple/gugong.jpg",
    topleft,
    topright,
    bottomleft,
    opacity: 0.8,
    interactive: true
  })
  map.addLayer(imgLayer)

  // 添加编辑控制点
  const myIcon = L.divIcon({ iconSize: [15, 15] })
  const marker1 = L.marker(topleft, { draggable: true, icon: myIcon }).bindTooltip("top-left").addTo(map)
  const marker2 = L.marker(topright, { draggable: true, icon: myIcon }).bindTooltip("top-right").addTo(map)
  const marker3 = L.marker(bottomleft, { draggable: true, icon: myIcon }).bindTooltip("bottom-left").addTo(map)
  function repositionImage() {
    imgLayer.setPosition(marker1.getLatLng(), marker2.getLatLng(), marker3.getLatLng())
  }
  marker1.on("drag dragend", repositionImage)
  marker2.on("drag dragend", repositionImage)
  marker3.on("drag dragend", repositionImage)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function changeImageOpacity(opacity) {
  imgLayer.setOpacity(opacity)
}
