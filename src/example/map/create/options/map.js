/**
 * 示例：快速创建地图
 * 演示：用 new mars2d.Map() 直接创建二维地图，配置缩放级别、中心点、控件与底图
 * API：mars2d.Map、mars2d.Map#setView
 * 要点：center 传 { lng, lat }（经纬度，坐标系随底图 CRS）；basemaps 中 show:true 的图层才是默认底图；control 不配置的控件不会创建
 */
import * as mars2d from "mars2d"

let map // 地图对象（initMap 的返回值，框架会赋给 window._mapInstance）

// ========== 1. 地图初始化 ==========
function initMap() {
  // 创建二维地图场景
  map = new mars2d.Map("mars2dContainer", {
    zoom: 13,
    center: { lng: 117.240601, lat: 31.827107 },
    minZoom: 3,
    maxZoom: 18,
    control: {
      scale: true,
      // 底部状态栏：template 里的 {lng}/{lat}/{crsx}/{crsy}/{level} 由控件按当前鼠标位置填充
      locationBar: {
        crs: "CGCS2000_GK_Zone_3",
        template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
      },
      zoom: { position: "bottomleft" },
      toolBar: { position: "bottomleft" },
      layers: { position: "topleft" }
    },
    // basemaps 支持分组：type:"group" 的项作为可切换的分组（底图 + 注记）
    basemaps: [
      { name: "高德地图", type: "gaode", layer: "vec", show: true },
      {
        name: "高德卫星",
        type: "group",
        layers: [
          { name: "底图", type: "gaode", layer: "img_d" },
          { name: "注记", type: "gaode", layer: "img_z" }
        ]
      }
    ],
    // operationallayers 是默认叠加在底图之上的业务图层
    operationallayers: [{ name: "经纬网", type: "graticule" }]
  })

  console.log("mars2d的Map主对象构造完成", map)

  return map
}

// ========== 2. 清理（与 initMap 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 释放地图 DOM、图层与事件监听
    map = null
  }
}
