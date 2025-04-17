import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
let tileLayer // 叠加的图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    layers: { position: "topright" }
  },
  // 方式1：在创建地图前的参数中配置
  basemaps: [
    {
      name: "mapbox影像图",
      icon: "img/basemaps/mapboxSatellite.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0adkar2b0e19mv9tpiewld",
      token: mars2d.Token.mapbox
    },
    {
      name: "mapbox街道图",
      icon: "img/basemaps/mapboxStreets.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0a0ire3jvh19r92vwfau1e",
      token: mars2d.Token.mapbox
    },
    {
      name: "mapbox基础底图",
      icon: "img/basemaps/mapboxTerrain.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki09kw472a8j19mvog00aoe0",
      token: mars2d.Token.mapbox
    },
    {
      name: "mapbox黑色底图",
      icon: "img/basemaps/bd-c-dark.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0a2mtc2vyo1bqu76p8ks8m",
      token: mars2d.Token.mapbox,
      show: true
    },
    {
      name: "mapbox灰色底图",
      icon: "img/basemaps/bd-c-grayscale.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0a92b123qo1aluk0e5v7sb",
      token: mars2d.Token.mapbox
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalNotify(
    "已知问题提示",
    `如图层未显示或服务URL访问超时，是因为目前国家测绘主管部门对未经审核批准的国外地图服务做了屏蔽封锁。
     您可以需翻墙使用 或 参考示例代码替换本地服务地址使用。`
  )
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  removeLayer()
}

export function addLayer() {
  removeLayer()

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars2d.layer.MapboxLayer({
    type: "mapbox",
    username: "marsgis",
    styleId: "cki0a92b123qo1aluk0e5v7sb",
    token: mars2d.Token.mapbox,
    zIndex: 999
  })
  map.addLayer(tileLayer)
}

export function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
