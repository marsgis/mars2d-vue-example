import * as mars2d from "mars2d"
const L = mars2d.L
let map2d
let graphicLayer
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 17,
  center: { lng: 117.204281, lat: 31.857494 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map2d = mapInstance // 记录map

  globalNotify("已知问题提示", "(1) 百度街景目前限制使用，需要自行申请全景地图服务使用权限Key替换 ")

  creatDom()

  // 矢量图层数据
  graphicLayer = new mars2d.layer.GraphicLayer()
  map2d.addLayer(graphicLayer)

  map2d.on(mars2d.EventType.click, function (event) {
    const point = event.latlng
    updateMarker(point)

    const rightFrame = document.getElementById("streeScape")
    rightFrame.contentWindow.setPosition(point)
  })

  splitScreen()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map2d = null
}

function creatDom() {
  const divDom = L.DomUtil.create("div", "", document.body)
  divDom.setAttribute("id", "centerDivJJ")

  const iframDom = L.DomUtil.create("iframe", "stree", divDom)
  iframDom.setAttribute("id", "streeScape")
  iframDom.setAttribute("src", currentPath + "baidu.html?lng=117.215219&lat=31.861592") // currentPath为当前目录，内置在示例框架中
}
let typeView = 0

// 3d显示
export function viewTo2d() {
  typeView = 0
  const dom2d = document.getElementById("centerDivJJ")
  const dom3d = document.getElementById("centerDiv2D")
  dom3d.style.display = "block"
  dom3d.style.width = "100%"
  dom3d.style.right = "0"

  dom2d.style.display = "none"
}

// 街景显示
export function streetscape() {
  typeView = 1
  const dom2d = document.getElementById("centerDivJJ")
  const dom3d = document.getElementById("centerDiv2D")
  dom3d.style.display = "none"
  dom2d.style.width = "100%"
  dom2d.style.display = "block"
  map2d.invalidateSize(false)
}

// 分屏显示
export function splitScreen() {
  typeView = 2
  const dom2d = document.getElementById("centerDivJJ")
  const dom3d = document.getElementById("centerDiv2D")

  dom2d.style.width = "50%"
  dom3d.style.width = "50%"
  dom3d.style.right = "50%"
  dom2d.style.display = "block"
  dom3d.style.display = "block"

  map2d.invalidateSize(false)
}

let markerStreet
function updateMarker(latlng) {
  if (markerStreet) {
    markerStreet.latlng = latlng
  } else {
    markerStreet = new mars2d.graphic.Marker({
      latlng,
      style: {
        image: "img/marker/street.png",
        scale: 1,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      }
    })
    graphicLayer.addGraphic(markerStreet)
  }

  if (!map2d.getBounds().contains(latlng)) {
    map2d.flyToPoint(latlng)
  }
}
