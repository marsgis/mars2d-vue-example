/**
 * 示例：离线数据
 * 演示：用 xyz 瓦片配置一份 0-12 级影像底图，展示交付离线数据包的浏览效果
 * API：mars2d.Map、mapOptions.basemaps、globalNotify
 * 要点：示例仓库的 url 指向 data.mars3d.cn 上的同结构瓦片（需联网），交付离线包时替换为本地瓦片目录；minZoom/maxZoom 必须与离线瓦片层级一致，否则超出层级会空白
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  minZoom: 0,
  maxZoom: 12,
  basemaps: [
    {
      pid: 10, // 指定所属底图分组（config.json 中的 id=10 分组）
      name: "卫星地图",
      type: "xyz",
      icon: "img/basemaps/mapboxSatellite.png",
      url: "https://data.mars3d.cn/tile/img/{z}/{x}/{y}.jpg",
      minZoom: 0,
      maxZoom: 12,
      show: true // 默认显示的底图
    }
  ]
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  globalNotify(
    "提示：",
    `该示例目的演示交付的离线数据的效果：
    1) 包括0-12级影像底图(当前页面效果)，
    2) 包括其他所有示例的json等文件`,
    { placement: "topRight" }
  )
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy()
    map = null
  }
}
