/**
 * 示例：三维全景切换
 * 演示：用 mars2d.control.MapSwich 在二维/三维/全景之间切换，三维与全景用 iframe 覆盖地图容器实现
 * API：mars2d.control.MapSwich、map.addControl、map.basemap
 * 要点：切换按钮的 selected 取值来自 mars2d.control.MapSwich.Type；三维/全景页面的地址是外部服务（mars3d.cn、marsgis.cn），需联网；底图按名称切换，名称必须在 config.json 的 basemaps 中存在
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let mapSwich
let projectIfram
let indexIfram

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 清空默认控件配置，切换按钮由下面手工创建
  option.control = {}
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // 地图切换
  mapSwich = new mars2d.control.MapSwich({
    selected: mars2d.control.MapSwich.Type.Vec,
    hasPano: true
  })
  map.addControl(mapSwich)

  // 三维/全景用 iframe 铺满地图容器，默认隐藏，切到对应类型时再显示并加载地址
  projectIfram = L.DomUtil.create("iframe", "iframe-project", map.container)
  projectIfram.style.cssText = "width:100%;height:100%;position:absolute;display:none"
  projectIfram.setAttribute("frameborder", "0")

  indexIfram = L.DomUtil.create("iframe", "iframe-index", map.container)
  indexIfram.style.cssText = "width:100%;height:100%;position:absolute;display:none"
  indexIfram.setAttribute("frameborder", "0")

  mapSwich.on("click", onMapSwichClick)
}

// ========== 3. 事件与交互 ==========
function onMapSwichClick(event) {
  switch (event.selected) {
    case mars2d.control.MapSwich.Type.Vec:
      indexIfram.style.display = "none"
      projectIfram.style.display = "none"

      map.basemap = "天地图电子"
      break
    case mars2d.control.MapSwich.Type.Img:
      indexIfram.style.display = "none"
      projectIfram.style.display = "none"

      map.basemap = "天地图卫星"
      break
    case mars2d.control.MapSwich.Type.Map3D:
      projectIfram.setAttribute("src", "//mars3d.cn/project/vue/map.html") // mars3d的基础项目示例（协议相对，https 部署不被拦截）
      projectIfram.style.display = ""
      projectIfram.style.zIndex = 400

      indexIfram.style.display = "none"
      break
    case mars2d.control.MapSwich.Type.Pano:
      indexIfram.setAttribute("src", "//marsgis.cn/pano/index.html") //
      indexIfram.style.display = ""
      indexIfram.style.zIndex = 400

      projectIfram.style.display = "none"
      break
  }
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (mapSwich) {
    // 控件自身不会清理业务侧的 click 订阅，先 off 再移除控件
    mapSwich.off("click", onMapSwichClick)
    if (map) {
      map.removeControl(mapSwich)
    }
    mapSwich = null
  }
  // iframe 是手工创建的 DOM，移除后浏览器会卸载其中的外部页面
  if (projectIfram) {
    projectIfram.remove()
    projectIfram = null
  }
  if (indexIfram) {
    indexIfram.remove()
    indexIfram = null
  }
  map = null
}
