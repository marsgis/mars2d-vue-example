import * as mars2d from "mars2d"
const L = mars2d.L
let map2d
let map3d

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 30.754115, lng: 116.341283 },
  control: {
    geocoder: false
  }
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map2d = mapInstance // 记录map
  creatMap3D()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map2d = null
}

function creatMap3D() {
  // showLoading()

  const mapDiv = L.DomUtil.create("div", "", document.body)
  mapDiv.setAttribute("id", "centerDiv3D")

  const map2dDiv = L.DomUtil.create("div", "mars2d-container", mapDiv)
  map2dDiv.setAttribute("id", "map3d")

  // 读取 config.json 配置文件
  const configUrl = "http://mars3d.cn/config/config.json"
  return mars2d.Util.fetchJson({ url: configUrl })
    .then(function (data) {
      // 构建地图
      map3d = new mars3d.Map("map3d", data)
      map3d.basemap = "天地图影像"
      bind3dEvent()
      bind2dEvent()
      viewTo23D() // 默认
    })
    .catch(function (error) {
      console.log(error)
      globalMsg(error && error.message, "error")
    })
}

function bind2dEvent() {
  map2d.on("drag", _map_extentChangeHandler, this)
  map2d.on("zoomend", _map_extentChangeHandler, this)
}

export function viewTo2d() {
  const to3dDom = document.getElementById("centerDiv3D")
  const to2dDom = document.getElementById("centerDiv2D")
  to3dDom.style.display = "none"
  to2dDom.style.display = "block"
  to2dDom.style.width = "100%"
  if (map2d) {
    map2d.invalidateSize(false)
  }
}

export function viewTo3d() {
  const to3dDom = document.getElementById("centerDiv3D")
  const to2dDom = document.getElementById("centerDiv2D")
  to2dDom.style.display = "none"
  to3dDom.style.display = "block"
  to3dDom.style.left = "0"
  to3dDom.style.width = "100%"
}

export function viewTo23D() {
  const to3dDom = document.getElementById("centerDiv3D")
  const to2dDom = document.getElementById("centerDiv2D")
  to3dDom.style.width = "50%"
  to2dDom.style.width = "50%"
  to3dDom.style.left = "50%"
  to3dDom.style.display = "block"
  to2dDom.style.display = "block"

  if (map2d) {
    map2d.invalidateSize(false)
  }
}

function _map_extentChangeHandler() {
  const bounds = map2d.getBounds()
  const extent = {
    xmin: bounds.getWest(),
    xmax: bounds.getEast(),
    ymin: bounds.getSouth(),
    ymax: bounds.getNorth()
  }
  console.log(`'二维地图变化了，区域： ${JSON.stringify(extent)} `)

  unbind2dEvent()
  map3d.camera.setView({
    destination: mars3d.Cesium.Rectangle.fromDegrees(extent.xmin, extent.ymin, extent.xmax, extent.ymax)
  })
  bind2dEvent()
}

function unbind3dEvent() {
  map2d.off("drag", _map_extentChangeHandler, this)
  map2d.off("zoomend", _map_extentChangeHandler, this)
}

function bind3dEvent() {
  map3d.on(mars3d.EventType.cameraChanged, camera_moveEndHandler, this)
}

function camera_moveEndHandler() {
  const point = map3d.getCenter()
  if (!point) {
    return
  }

  const level = map3d.level
  console.log(`三维地图变化了，位置： ${point.toString()},层级 ${level} `)

  unbind2dEvent()

  map2d.setView([point.lat, point.lng], level, { animate: false })

  bind2dEvent()
}

function unbind2dEvent() {
  map2d.off("drag", _map_extentChangeHandler, this)
  map2d.off("zoomend", _map_extentChangeHandler, this)
}
