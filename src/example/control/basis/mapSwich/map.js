import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option.control = {}
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // 地图切换
  const mapSwich = new mars2d.control.MapSwich({
    selected: mars2d.control.MapSwich.Type.Vec,
    hasPano: true
  })
  map.addControl(mapSwich)

  const projectIfram = L.DomUtil.create("iframe", "iframe-project", map.container)
  projectIfram.style.cssText = "width:100%;height:100%;position:absolute;display:none"
  projectIfram.setAttribute("frameborder", "0")

  const indexIfram = L.DomUtil.create("iframe", "iframe-index", map.container)
  indexIfram.style.cssText = "width:100%;height:100%;position:absolute;display:none"
  indexIfram.setAttribute("frameborder", "0")

  mapSwich.on("click", function (event) {
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
        projectIfram.setAttribute("src", "http://mars3d.cn/project/vue/map.html") // mars3d的基础项目示例
        projectIfram.style.display = ""
        projectIfram.style.zIndex = 400

        indexIfram.style.display = "none"
        break
      case mars2d.control.MapSwich.Type.Pano:
        indexIfram.setAttribute("src", "http://marsgis.cn/pano/index.html") //
        indexIfram.style.display = ""
        indexIfram.style.zIndex = 400

        projectIfram.style.display = "none"
        break
    }
  })
}
