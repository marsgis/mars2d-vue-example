/**
 * 示例：双屏对比
 * 演示：复制主地图的配置创建第二张地图，实现左右双屏同图层、不同配置的对比浏览，并让两张地图视野联动
 * API：mars2d.Map、map.getOptions、map.setView、map.on("movestart"/"moveend")
 * 要点：第二张地图用 map.getOptions() 复制配置后单独建容器；联动时先解绑再绑定 moveend，避免 setView 互相触发死循环
 */
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

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 修改已有地图为50%
  const mapOld = document.getElementById("centerDiv2D")
  mapOld.style.width = "50%"
  map.invalidateSize(false)

  // 运行时创建第二张地图的容器（iframe 模板里只有第一个容器）
  const centerDivEx = L.DomUtil.create("div", "", document.body)
  centerDivEx.setAttribute("id", "centerDivEx")
  const sourceContainer = L.DomUtil.create("div", "mars2d-container", centerDivEx)
  sourceContainer.setAttribute("id", "cesiumContainerEx")

  // 获取原来地图的参数，作为第二张地图的构造配置
  const mapOptions2 = map.getOptions() // map.getOptions()

  // 用于双屏同图层，不同配置展示：图层配置里带 compare 的对象，用 compare 里的参数覆盖
  for (let i = 0, len = mapOptions2.operationallayers.length; i < len; i++) {
    const item = mapOptions2.operationallayers[i]
    if (item.compare) {
      // 存在compare属性时
      for (const key in item.compare) {
        item[key] = item.compare[key]
      }
    }
  }

  // 绑定的控件（第二张地图只保留底图切换与右键菜单，避免控件过多遮挡对比区域）
  mapOptions2.control = {
    baseLayerPicker: true, // basemaps底图切换按钮
    defaultContextMenu: true // 右键菜单
  }

  mapEx = new mars2d.Map("cesiumContainerEx", mapOptions2)
  mapEx.basemap = "天地图卫星"

  map.on("movestart", _map_movestartHandler)
  mapEx.on("movestart", _mapEx_movestartHandler, this)

  _map_movestartHandler() // 初始化时先同步一次
}

// ========== 2. 双屏联动事件 ==========
function _map_movestartHandler(e) {
  // 先解绑再绑定，避免连续拖动时 moveend 监听叠加导致重复同步
  map.off("moveend", _map_moveendHandler)
  map.on("moveend", _map_moveendHandler)
}

function _map_moveendHandler(e) {
  map.off("moveend", _map_moveendHandler)
  mapEx.setView(map.getCenter(), map.getZoom(), { animate: false, noMoveStart: true })
}

function _mapEx_movestartHandler(e) {
  // 每次开始拖动只注册一次 moveend（once），一次拖动只同步一次
  mapEx.once("moveend", _mapEx_moveendHandler, this)
}

function _mapEx_moveendHandler(e) {
  // 注意：这里不要再 mapEx.on("moveend")，否则每次拖动都会多挂一个监听，同步次数越积越多
  map.setView(mapEx.getCenter(), mapEx.getZoom(), { animate: false, noMoveStart: true })
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.off("movestart", _map_movestartHandler)
    map.off("moveend", _map_moveendHandler)
  }
  if (mapEx) {
    mapEx.off("movestart", _mapEx_movestartHandler)
    mapEx.off("moveend", _mapEx_moveendHandler)
    mapEx.destroy()
    mapEx = null
  }

  // 移除双屏示例动态创建的第二个地图容器，并恢复主地图宽度
  const centerDivEx = document.getElementById("centerDivEx")
  if (centerDivEx) {
    centerDivEx.remove()
  }
  const mapOld = document.getElementById("centerDiv2D")
  if (mapOld) {
    mapOld.style.width = "100%"
  }

  if (map) {
    map.destroy()
    map = null
  }
}
