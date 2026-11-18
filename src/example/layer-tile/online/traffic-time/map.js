/**
 * 示例：实时交通态势图
 * 演示：用 mars2d.layer.GaodeLayer({ layer:"time" }) 叠加热力形式的高德实时路况，面板按钮可重复叠加/移除
 * API：mars2d.layer.GaodeLayer、map.addLayer、map.basemap
 * 要点：路况瓦片走 //server.mars2d.cn/proxy/ 代理转发；示例用 map.basemap = 2017 切到 config.json 里的蓝色底图，换 config.json 后要同步改这个 id；百度路况使用百度坐标系，不能叠在高德底图上，所以面板按钮改为打开百度示例
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
let tileLayer // 叠加的实时路况图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.161636, lat: 31.84417 }
}

// ========== 2. 事件对象 ==========
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到面板中

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.basemap = 2017 // 切换至蓝色底图：2017 是 public/config/config.json 里「蓝色地图」底图的 id

  addGaodeLayer()
}

// ========== 4. 清理（与 onMounted 对称）==========
// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  removeLayer()
  map = null
}

// ========== 5. 面板交互方法：叠加/移除路况图层 ==========
export function addGaodeLayer() {
  removeLayer() // 先移除上一次的图层，避免重复点击叠出多层路况

  tileLayer = new mars2d.layer.GaodeLayer({
    layer: "time", // 高德实时路况图层
    minZoom: 4,
    proxy: "//server.mars2d.cn/proxy/" // 路况瓦片经代理转发，避免高德路况服务的跨域/来源限制
  })
  map.addLayer(tileLayer)
}

function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true) // 第二个参数：同时从图层控件里移除
    tileLayer = null
  }
}
