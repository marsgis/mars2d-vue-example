/**
 * 示例：ArcGIS Online
 * 演示：用 type:"arcgis" 加载 ArcGIS Online 的 World_Street_Map / World_Imagery 服务，并用 customColor 生成蓝色、灰色两种配色底图
 * API：mars2d.LayerUtil、mapOptions.basemaps、mars2d.ChinaCRS
 * 要点：services.arcgisonline.com 在国内被屏蔽，图层不显示/访问超时属网络环境问题（示例已 globalNotify 提示）；arcgis 服务是 WGS84/墨卡托瓦片，chinaCRS:"GCJ02" 让 SDK 与国内底图统一纠偏；customColor 要读取瓦片像素，SDK 会自动给瓦片加 crossOrigin
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      name: "电子地图",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      // 声明该底图属于 GCJ02 国内坐标系，SDK 会自动与地图坐标系对齐纠偏
      chinaCRS: "GCJ02",
      show: true
    },
    {
      name: "卫星地图",
      type: "arcgis",
      url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
      chinaCRS: "GCJ02"
    },
    {
      name: "蓝色底图",
      icon: "img/basemaps/bd-c-midnight.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      chinaCRS: mars2d.ChinaCRS.GCJ02,
      customColor: "#11243C" // 用 canvas 把瓦片逐像素改成指定颜色，生成深色风格底图
    },
    {
      name: "灰色底图",
      icon: "img/basemaps/bd-c-grayscale.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      chinaCRS: mars2d.ChinaCRS.GCJ02,
      customColor: "#575757"
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
  // 底图由框架按 mapOptions 创建、随地图一起销毁，这里只断开示例对地图的引用
  map = null
}
