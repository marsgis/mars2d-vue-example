import * as mars2d from "mars2d"

export let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  control: {
    layers: { position: "topright" }
  },
  // 方式1：在创建地球前的参数中配置
  basemaps: [
    {
      name: "3857地图",
      icon: "img/basemap/google_vec.png",
      type: "tile",
      url: `http://www.supermapol.com/realspace/services/map-China400/rest/maps/China400/tileImage.png?transparent=true&cacheEnabled=true&_cache=true&width=256&height=256&redirect=false&overlapDisplayed=false&origin={origin}&x={x}&y={y}&scale={scale}`,
      show: true
    }
  ]
}

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
// export const mapOptions = {
//   crs: "EPSG:4326",
//   zoom: 12,
//   control: {
//     layers: { position: "topright" }
//   },
//   // 方式1：在创建地球前的参数中配置
//   basemaps: [
//     {
//       name: "4326地图",
//       icon: "img/basemap/gaode_img.png",
//       type: "tile",
//       url: `http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Image/tileImage.png?transparent=true&cacheEnabled=true&_cache=true&width=256&height=256&redirect=false&overlapDisplayed=false&origin={origin}&x={x}&y={y}&scale={scale}`,
//       crs: "EPSG:4326",
//       show: true
//     }
//   ]
// }

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}
