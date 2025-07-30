import * as mars2d from "mars2d"

let map

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
  const marker = L.marker(latlng).addTo(map)

  marker.name = "火星科技"
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
  map = null
}
