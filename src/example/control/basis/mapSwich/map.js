import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance

  // 地图切换
  const mapSwich = new mars2d.control.MapSwich({
    selected: mars2d.control.MapSwich.Type.Vec,
    hasPano: true
  })
  map.addControl(mapSwich)
  console.log(mapSwich)

  mapSwich.on("click", function (event) {
    switch (event.selected) {
      case mars2d.control.MapSwich.Type.Vec:
        window.history.go(-1)
        map.basemap = "天地图电子"
        break
      case mars2d.control.MapSwich.Type.Img:
        window.history.go(-1)
        map.basemap = "天地图卫星"
        break
      case mars2d.control.MapSwich.Type.Map3D:
        window.location.href = "http://mars3d.cn/project/jcxm/index.html"
        break
      case mars2d.control.MapSwich.Type.Pano:
        window.location.href = "http://marsgis.cn/pano/index.html"
        break
    }
  })
}
