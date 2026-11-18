/**
 * 示例：Mapbox
 * 演示：用 type:"mapbox" 加载 5 种 Mapbox 样式底图，并在面板里动态叠加/移除一个 MapboxLayer（方式2：创建地图后再 addLayer）
 * API：mars2d.layer.MapboxLayer、map.addLayer、map.removeLayer
 * 要点：Mapbox 图层需要 username/styleId/token 三者且样式在账号下存在；同一地图再叠加一个 MapboxLayer 时用 zIndex:999 保证压住底图；切换示例时先移除叠加图层再释放 map
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
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
      username: "marsgis", // Mapbox 账号名，与 styleId/token 一起决定请求的样式
      styleId: "cki0adkar2b0e19mv9tpiewld", // Mapbox 后台创建的地图样式 id
      token: mars2d.Token.mapbox // 公共 token，正式项目请换成自己账号的 token
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
      show: true // show:true 的项才是默认底图
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

// ========== 2. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalNotify(
    "已知问题提示",
    `如图层未显示或服务URL访问超时，是因为目前国家测绘主管部门对未经审核批准的国外地图服务做了屏蔽封锁。
     您可以需翻墙使用 或 参考示例代码替换本地服务地址使用。`
  )
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 先移除叠加图层再置空 map，否则 removeLayer 内访问空 map 会报错
  removeLayer()
  map = null
}

// ========== 5. 面板交互方法：叠加/移除 Mapbox 图层 ==========
// 方式2：创建地图后 new 对应 type 的图层类，再 map.addLayer
export function addLayer() {
  removeLayer() // 先移除上一次的叠加层，避免重复点击叠出多层

  tileLayer = new mars2d.layer.MapboxLayer({
    type: "mapbox",
    username: "marsgis",
    styleId: "cki0a92b123qo1aluk0e5v7sb",
    token: mars2d.Token.mapbox,
    zIndex: 999 // 叠加层要在底图之上
  })
  map.addLayer(tileLayer)
}

export function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true) // 第二个参数：同时从图层控件里移除
    tileLayer = null
  }
}
