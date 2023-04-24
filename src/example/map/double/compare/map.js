import * as mars2d from "mars2d"
const L = mars2d.L

let map
let mapEx

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 30.754115, lng: 116.341283 },
  control: {
    geocoder: false
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 修改已有地图为50%
  const mapOld = document.getElementById("centerDiv2D")
  mapOld.style.width = "50%"
  map.invalidateSize(false)

  const centerDivEx = L.DomUtil.create("div", "", document.body)
  centerDivEx.setAttribute("id", "centerDivEx")
  const sourceContainer = L.DomUtil.create("div", "mars2d-container", centerDivEx)
  sourceContainer.setAttribute("id", "cesiumContainerEx")

  // 获取原来地图的参数
  const mapOptions2 = map.getOptions() // map.getOptions()
  mapOptions2.control.baseLayerPicker = true // basemaps底图切换按钮
  mapOptions2.control.sceneModePicker = false

  // 用于双屏同图层，不同配置展示
  for (let i = 0, len = mapOptions2.operationallayers.length; i < len; i++) {
    const item = mapOptions2.operationallayers[i]
    if (item.compare) {
      // 存在compare属性时
      for (const key in item.compare) {
        item[key] = item.compare[key]
      }
    }
  }

  // 绑定的控件
  mapOptions2.control = {
    baseLayerPicker: true, // basemaps底图切换按钮
    defaultContextMenu: true // 右键菜单
  }

  mapEx = new mars2d.Map("cesiumContainerEx", mapOptions2)
  mapEx.basemap = "天地图卫星"

  map.on("movestart", _map_movestartHandler, this)
  mapEx.on("movestart", _mapEx_movestartHandler, this)

  _map_movestartHandler()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

function _map_movestartHandler(e) {
  map.on("moveend", _map_moveendHandler, this)
}

function _map_moveendHandler(e) {
  map.off("moveend", _map_moveendHandler, this)
  mapEx.setView(map.getCenter(), map.getZoom(), { animate: false, noMoveStart: true })
}

function _mapEx_movestartHandler(e) {
  mapEx.once("moveend", _mapEx_moveendHandler, this)
}

function _mapEx_moveendHandler(e) {
  mapEx.on("moveend", _mapEx_moveendHandler, this)
  map.setView(mapEx.getCenter(), mapEx.getZoom(), { animate: false, noMoveStart: true })
}
