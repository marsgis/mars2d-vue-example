/**
 * 示例：带旋转角度单张图片
 * 演示：用 ImageRotatedLayer 按三个控制点把图片贴合到地图，拖动控制点时实时重算图片的位置/旋转/缩放；面板可改透明度
 * API：mars2d.layer.ImageRotatedLayer#setPosition/setOpacity、L.marker、L.divIcon
 * 要点：topleft/topright/bottomleft 三个点共同决定图片的位置、旋转角度与大小，必须传地图坐标；控制点用 Leaflet 公开 API 创建并手动 addTo(map)，卸载时先 off 拖动监听再移除，避免切换示例后监听残留；interactive:true 时图片才能响应鼠标事件
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let imgLayer // 添加的图片图层
const editMarkers = [] // 三个拖动编辑控制点

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 116.401794, lat: 39.92075 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
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
  editMarkers.push(marker1, marker2, marker3)
  function repositionImage() {
    imgLayer.setPosition(marker1.getLatLng(), marker2.getLatLng(), marker3.getLatLng())
  }
  marker1.on("drag dragend", repositionImage)
  marker2.on("drag dragend", repositionImage)
  marker3.on("drag dragend", repositionImage)
}

// ========== 3. 面板交互方法 ==========
export function changeImageOpacity(opacity) {
  if (!imgLayer) {
    return
  }
  imgLayer.setOpacity(opacity)
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    // 先解绑拖动监听再移除控制点与图片图层，避免重复进入示例叠加
    editMarkers.forEach((marker) => {
      marker.off("drag dragend")
      map.removeLayer(marker)
    })
  }
  editMarkers.length = 0
  if (map && imgLayer) {
    map.removeLayer(imgLayer)
    imgLayer = null
  }
  map = null
}
