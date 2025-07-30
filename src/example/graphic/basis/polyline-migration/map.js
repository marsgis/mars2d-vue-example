import * as mars2d from "mars2d"

const L = mars2d.L
export let map // mars2d.Map三维地图对象
export let migrationLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

export const mapOptions = {
  zoom: 8,
  center: { lng: 118.009644, lat: 32.026706 }
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  setData()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 颜色
let index = 0
const colors = [
  "#ff3a31",
  "#ff7e2b",
  "#ffc726",
  "#e9ff20",
  "#99ff1b",
  "#45ff15",
  "#10ff33",
  "#66FF66",
  "#FF6666",
  "#00CCFF",
  "#00FF33",
  "#CC0000",
  "#CC00CC",
  "#CCFF00"
]
function getColor() {
  const i = index++ % colors.length
  return colors[i]
}

export function setData() {
  if (migrationLayer) {
    return
  }
  let data = [
    { to: [116.3123, 31.8329], labels: ["合肥市", "六安市"] },
    { to: [116.7517, 30.5255], labels: [null, "安庆市"] },
    { to: [118.1909, 32.536], labels: [null, "滁州市"] },
    { to: [118.8062, 30.6244], labels: [null, "宣城市"] },
    { to: [115.7629, 32.9919], labels: [null, "阜阳市"] },
    { to: [117.5208, 33.6841], labels: [null, "宿州市"] },
    { to: [118.0481, 29.9542], labels: [null, "黄山市"] },
    { to: [117.7734, 31.4978], labels: [null, "巢湖市"] },
    { to: [116.1914, 33.4698], labels: [null, "亳州市"] },
    { to: [117.3889, 30.2014], labels: [null, "池州市"] },
    { to: [117.4109, 33.1073], labels: [null, "蚌埠市"] },
    { to: [118.3557, 31.0858], labels: [null, "芜湖市"] },
    { to: [116.6968, 33.6896], labels: [null, "淮北市"] },
    { to: [116.7847, 32.7722], labels: [null, "淮南市"] },
    { to: [118.6304, 31.5363], labels: [null, "马鞍山市"] },
    { to: [117.9382, 30.9375], labels: [null, "铜陵市"] }
  ]

  data = data.map((item) => {
    return { ...item, from: [117.257436, 31.838742], color: getColor() }
  })

  migrationLayer = new L.migrationLayer({
    map: map,
    data: data,
    pulseRadius: 30, // 终点圆半径
    pulseBorderWidth: 3, // 终点圆边框宽度
    arcWidth: 3, // 弧线宽度
    arcLabel: true, // 文本
    arcLabelFont: "10px sans-serif"
  })
  migrationLayer.addTo(map)
}
export function hide() {
  if (migrationLayer) {
    migrationLayer.hide()
  }
}
export function show() {
  if (migrationLayer) {
    migrationLayer.show()
  }
}
export function pause() {
  if (migrationLayer) {
    migrationLayer.pause()
  }
}
export function play() {
  if (migrationLayer) {
    migrationLayer.play()
  }
}
export function destroy() {
  if (migrationLayer) {
    migrationLayer.destroy()
    migrationLayer = null
  }
}
