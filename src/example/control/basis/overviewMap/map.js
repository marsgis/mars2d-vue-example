/**
 * 示例：鹰眼地图
 * 演示：用 mars2d.control.OverviewMap 在地图右上角叠加一个鹰眼小地图，显示主图当前视野范围
 * API：mars2d.control.OverviewMap、map.addControl
 * 要点：鹰眼小地图是独立的地图实例，需通过 mapOptions.basemaps 单独指定底图（否则继承主图全部底图配置）；示例底图直连高德瓦片服务，需联网；removeControl 会连带销毁小地图实例
 */
import * as mars2d from "mars2d"

let map
let overviewMapControl

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance
  const overviewMap = new mars2d.control.OverviewMap({
    position: "topright",
    toggleDisplay: true, // 显示折叠/展开按钮
    minimized: false,
    mapOptions: {
      // 鹰眼地图自己的底图配置：只放一层影像底图，避免小地图里出现多个可切换底图
      basemaps: [
        {
          type: "tile",
          url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
          show: true
        }
      ]
    }
  })
  overviewMapControl = overviewMap
  map.addControl(overviewMap)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && overviewMapControl) {
    // OverviewMap.remove 会解绑主图/小地图监听、销毁视野矩形，并移除鹰眼内部的地图实例
    map.removeControl(overviewMapControl)
    overviewMapControl = null
  }
  map = null
}
