/**
 * 示例：3857底图(墨卡托)
 * 演示：用 crs: mars2d.CRS.EPSG3857 创建 Web 墨卡托地图，并叠加一个声明为 EPSG:4326 的天地图注记图层
 * API：mars2d.CRS、mapOptions.crs、mapOptions.basemaps / operationallayers
 * 要点：地图级 crs 决定整张地图的投影与瓦片层级；单个图层可在自己的配置里写 crs 声明瓦片服务坐标系（3857/4326 互叠由 SDK 处理，无需自己换算）；3857 也是 2D 的默认坐标系
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  // 显式声明 Web 墨卡托投影：本示例主题就是「地图坐标系」，不写时默认也是该值
  crs: mars2d.CRS.EPSG3857,
  basemaps: [
    {
      name: "高德地图",
      type: "gaode",
      layer: "vec",
      show: true // show:true 的项才是默认底图
    },
    {
      // type:"group" 只作为可切换的底图分组，真正显示的是 layers 里的底图 + 注记两个图层
      type: "group",
      name: "卫星地图",
      layers: [
        { type: "tencent", layer: "img_d" },
        { type: "tencent", layer: "img_z" }
      ]
    }
  ],
  operationallayers: [
    {
      name: "国家天地图注记",
      type: "tdt",
      layer: "vec_z",
      // 图层级 crs：声明该瓦片服务本身是 EPSG:4326，与地图的 3857 不同时由 SDK 做跨坐标系叠加处理
      crs: "EPSG:4326",
      key: mars2d.Token.tiandituArr
    }
  ]
}

// ========== 2. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 底图与叠加图层都由框架按 mapOptions 创建、随地图一起销毁，这里只断开示例对地图的引用
  map = null
}
