/**
 * 示例：超图Supermap
 * 演示：用 type:"tile" 加载超图 iServer 的 China 地图瓦片服务（URL 使用 {origin}/{x}/{y}/{scale} 占位符）
 * API：mars2d.layer.TileLayer、mapOptions.basemaps
 * 要点：超图 iServer 切片用 {scale}/{origin} 而不是 {z}，TileLayer 发现 url 里有 {scale} 会自动套用内置的 3857 比例尺表；示例还留了 4326 服务的注释配置，切换服务时整段替换 mapOptions（同一文件不能写两个 export const mapOptions）
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  control: {
    layers: { position: "topright" }
  },
  // 方式1：在创建地图前的参数中配置
  basemaps: [
    {
      name: "3857地图",
      icon: "img/basemap/google_vec.png",
      type: "tile",
      // 超图 iServer 切片地址：{origin}/{scale} 由 TileLayer 按内置的 3857 比例尺表替换，{x}/{y} 为瓦片行列号
      url: `http://support.supermap.com:8090/iserver/services/map-china400/rest/maps/China/tileImage.webp?transparent=true&cacheEnabled=true&_cache=true&width=256&height=256&redirect=false&overlapDisplayed=false&origin={origin}&x={x}&y={y}&scale={scale}`,
      show: true
    }
  ]
}

// 下面是超图 4326（World 地图）服务的配置：切换服务时用这一段整体替换上面的 mapOptions
// 注意：同一个文件里只能有一个 export const mapOptions，所以这里保持注释状态
// export const mapOptions = {
//   crs: "EPSG:4326",
//   zoom: 12,
//   control: {
//     layers: { position: "topright" }
//   },
//   // 方式1：在创建地图前的参数中配置
//   basemaps: [
//     {
//       name: "4326地图",
//       icon: "img/basemap/gaode_img.png",
//       type: "tile",
//       url: `http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World/tileImage.png?transparent=true&cacheEnabled=true&_cache=true&width=256&height=256&redirect=false&overlapDisplayed=false&origin={origin}&x={x}&y={y}&scale={scale}`,
//       crs: "EPSG:4326",
//       show: true
//     }
//   ]
// }

// ========== 2. 事件对象 ==========
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到面板中

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
}

// ========== 4. 清理（与 onMounted 对称）==========
// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  // 底图由框架按 mapOptions 创建、随地图一起销毁，这里只断开示例对地图的引用
  map = null
}
