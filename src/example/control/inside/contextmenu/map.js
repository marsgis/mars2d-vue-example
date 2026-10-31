import * as mars2d from "mars2d"
const L = mars2d.L

let map
let marker

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // 对地图绑定自定义右键菜单
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

  // 对矢量数据绑定右键菜单
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

  // marker.unbindContextMenu();
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 示例中动态添加的 marker 及其右键菜单需成对移除
  if (marker) {
    marker.unbindContextMenu()
    map.removeLayer(marker)
    marker = null
  }
  map = null
}
