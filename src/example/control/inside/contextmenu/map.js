/**
 * 示例：右键菜单
 * 演示：给地图和矢量对象分别绑定自定义右键菜单，演示菜单项回调与分割线
 * API：map.bindContextMenu、map.unbindContextMenu、L.Marker#bindContextMenu
 * 要点：菜单项数组里的 "-" 表示分割线；回调参数 e.latlng 是右键点击位置；矢量对象移除前要先 unbind 右键菜单，否则菜单处理器仍挂在对象上
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map
let marker

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // 地图级右键菜单：绑定到地图空白处右键
  map.bindContextMenu([
    {
      text: "移动到此处",
      iconCls: "fa fa-hand-o-right",
      callback: function (e) {
        map.panTo(e.latlng)
      }
    },
    "-", // 分割线
    {
      text: "显示此处经纬度",
      iconCls: "fa fa-map-marker",
      callback: function (e) {
        const inhtml = "经度：" + e.latlng.lng.toFixed(6) + " 纬度：" + e.latlng.lat.toFixed(6) + "层级：" + map.getZoom()
        globalMsg(inhtml)
      }
    }
  ])

  // 矢量对象右键菜单：绑定到 marker 上右键
  const latlng = map.getCenter()
  marker = L.marker(latlng).addTo(map)

  marker.name = "欢迎使用Mars2D平台"
  marker.bindContextMenu([
    {
      text: "显示名称",
      iconCls: "fa fa-info",
      callback: function (e) {
        const marker = e.relatedTarget
        globalMsg(marker.name)
      }
    }
  ])
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (marker) {
    // 先解绑矢量对象的右键菜单，再移除 marker，避免菜单处理器残留
    marker.unbindContextMenu()
    if (map) {
      map.removeLayer(marker)
    }
    marker = null
  }
  if (map) {
    // 地图级右键菜单是 map 的处理器，地图切换前解绑，清掉菜单项 DOM 与处理器
    map.unbindContextMenu()
  }
  map = null
}
