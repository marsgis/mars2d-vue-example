/**
 * 示例：二三维联动(与cesium)
 * 演示：在同一个页面里同时创建 Mars2D 二维地图和 Mars3D 三维地图，并双向同步中心点与层级
 * API：mars2d.Map、mars3d.Map、map.camera.setView、map2d.setView、L.DomUtil.create
 * 要点：3D 地图要额外加载 libs:["mars2d","mars3d"] 且依赖远程 config；三维容器是运行时动态创建的；联动时先解绑再绑定，避免 setView 触发事件造成循环
 */
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

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map2d = mapInstance // 记录map
  creatMap3D()
}

// 创建三维地图（异步读取 mars3d 的 config.json）
function creatMap3D() {
  // iframe 模板里只有二维容器，三维容器（#centerDiv3D 及其内的 #map3d）在这里动态创建
  const mapDiv = L.DomUtil.create("div", "", document.body)
  mapDiv.setAttribute("id", "centerDiv3D")

  const map2dDiv = L.DomUtil.create("div", "mars2d-container", mapDiv)
  map2dDiv.setAttribute("id", "map3d")

  // 读取 config.json 配置文件（Mars3D 的配置，示例直接使用官网地址，需要联网）
  const configUrl = "//mars3d.cn/config/config.json" // 协议相对地址：示例站点用 https 部署时不会被混合内容拦截
  return mars2d.Util.fetchJson({ url: configUrl })
    .then(function (data) {
      // 等待配置期间已切换示例，不再创建三维地图
      if (!map2d) {
        return
      }

      // 构建地图
      map3d = new mars3d.Map("map3d", data)
      map3d.basemap = "天地图影像"
      bind3dEvent()
      bind2dEvent()
      viewTo23D() // 默认
    })
    .catch(function (error) {
      if (!map2d) {
        return // 已切换示例，不再提示
      }
      console.log("加载三维地图配置失败", error)
      globalMsg(error && error.message, "error")
    })
}

// ========== 2. 二三维视图切换（面板交互方法）==========
export function viewTo2d() {
  const to3dDom = document.getElementById("centerDiv3D")
  const to2dDom = document.getElementById("centerDiv2D")
  to3dDom.style.display = "none"
  to2dDom.style.display = "block"
  to2dDom.style.width = "100%"
  if (map2d) {
    // 容器尺寸变化后需重算地图尺寸，否则会出现灰边/控件错位
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

// ========== 3. 二三维联动事件 ==========
// 二维地图范围变化 -> 三维地图同步
function bind2dEvent() {
  map2d.on("drag", _map_extentChangeHandler, this)
  map2d.on("zoomend", _map_extentChangeHandler, this)
}

function unbind2dEvent() {
  if (!map2d) {
    return
  }
  map2d.off("drag", _map_extentChangeHandler, this)
  map2d.off("zoomend", _map_extentChangeHandler, this)
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

  // 先解绑再改三维视野，避免三维相机变化回调再次反向同步二维，形成循环
  unbind2dEvent()
  map3d.camera.setView({
    destination: mars3d.Cesium.Rectangle.fromDegrees(extent.xmin, extent.ymin, extent.xmax, extent.ymax)
  })
  bind2dEvent()
}

let cameraChangedType

function bind3dEvent() {
  cameraChangedType = mars3d.EventType.cameraChanged
  map3d.on(cameraChangedType, camera_moveEndHandler)
}

function unbind3dEvent() {
  if (map3d && cameraChangedType) {
    map3d.off(cameraChangedType, camera_moveEndHandler)
  }
  cameraChangedType = null
}

// 三维相机变化 -> 二维地图同步
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

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 三维地图与动态创建的容器都不是框架管理的，必须在这里释放
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map2d) {
    unbind2dEvent()
  }
  if (map3d) {
    unbind3dEvent()
    map3d.destroy()
    map3d = null
  }

  // 移除二三维联动动态创建的 3D 容器
  const mapDiv = document.getElementById("centerDiv3D")
  if (mapDiv) {
    mapDiv.remove()
  }

  if (map2d) {
    map2d.destroy()
    map2d = null
  }
}
