/**
 * 示例：超图瓦片
 * 演示：在 basemaps 中配置超图 iServer 发布的地图瓦片服务（type: "sm_tile"），示例含三个可切换的超图服务
 * API：mapOptions.basemaps、mars2d.layer.SmTileLayer
 * 要点：超图瓦片地址是 iServer 的 maps/... 服务地址，切片方案由服务端决定，crs 要与服务一致（本示例用 "EPSG:4326" 经纬度直出）；basemaps 里 show:true 的项才是默认底图，其余通过图层控件切换；方式2 的 SmTileLayer 代码创建当前被注释，可按需启用
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: "EPSG:4326",
  zoom: 3,
  center: { lng: 108.882931, lat: 33.75 },
  // 方式1：在创建地图前的参数中配置
  basemaps: [
    {
      name: "超图瓦片",
      type: "sm_tile",
      url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World",
      show: true
    },
    {
      name: "国家分布",
      type: "sm_tile",
      url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World%20Map",
      show: false
    },
    {
      name: "北京航线",
      type: "sm_tile",
      url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World_AirLine_Part",
      show: false
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  // const layer = new mars2d.layer.SmTileLayer({
  //   url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World"
  // })
  // map.addLayer(layer)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 底图由 mapOptions 在地图创建时生成，随地图/iframe 一起释放，这里只需断开引用
  map = null
}
