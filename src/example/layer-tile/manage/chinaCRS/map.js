/**
 * 示例：底图纠偏(融合高德、天地图等)
 * 演示：把地图声明为无偏的 WGS84 坐标系，对比天地图、高德等不同国内坐标系底图在同一地图上的偏移与自动纠偏效果
 * API：mapOptions.chinaCRS、mars2d.ChinaCRS、basemaps 配置
 * 要点：map 的 chinaCRS 是"地图目标坐标系"，图层的 chinaCRS 是"该图层自身坐标系"，两者不同时框架自动纠偏/加偏；高德瓦片原生即 GCJ02（GaodeLayer 的默认值，"蓝色地图"显式写一遍便于对照）；用图层控件切换底图，观察路网与行政边界是否重合
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  // 地图以 WGS84（无偏）显示，GCJ02 底图会由框架自动纠偏到该坐标系
  chinaCRS: mars2d.ChinaCRS.WGS84,
  basemaps: [
    // 分组节点：type 为 group 时不加载瓦片，只作为图层控件中的一级分组
    {
      id: 10,
      name: "地图底图",
      type: "group"
    },
    {
      id: 2021,
      pid: 10, // pid 指向分组 id，决定节点在图层控件中的层级
      name: "天地图电子",
      type: "group",
      layers: [
        {
          name: "底图",
          type: "tdt",
          layer: "vec_d"
        },
        {
          name: "注记",
          type: "tdt",
          layer: "vec_z"
        }
      ],
      show: true
    },
    {
      pid: 10,
      name: "高德地图",
      type: "gaode",
      layer: "vec"
    },
    {
      id: 2017,
      pid: 10,
      name: "蓝色地图",
      type: "gaode",
      layer: "vec",
      customColor: "#11243C",
      // 显式声明该底图自身是 GCJ02：与地图的 WGS84 不一致，框架会自动纠偏（高德默认值也是 GCJ02，此处用于对照阅读）
      chinaCRS: "GCJ02"
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
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
