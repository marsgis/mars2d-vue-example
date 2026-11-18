/**
 * 示例：ArcGIS MapServer
 * 演示：在 basemaps 中配置多个 ArcGIS MapServer 底图（World_Imagery / World_Street_Map / NatGeo），并演示 GCJ02 纠偏与自定义着色
 * API：basemaps 配置、mars2d.ChinaCRS、mars2d-esri 插件（arcgis_tile 类型）
 * 要点：type 为 arcgis_tile 时由 mars2d-esri 插件按 MapServer 切片接口加载（includeLibs 的 mars2d 公共库已一并加载该插件）；type 为 arcgis 时由核心 SDK 的 ArcGisLayer 按 /tile/{z}/{y}/{x} 取图，因此可以叠加 customColor 重着色、chinaCRS 纠偏；服务在国外，可能被网络屏蔽，加载不出时先看 globalNotify 提示
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  // 方式1：在创建地图前的参数中配置
  basemaps: [
    {
      name: "ArcGIS影像",
      icon: "img/basemaps/esriWorldImagery.png",
      type: "arcgis_tile",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      show: true
    },
    {
      name: "ArcGIS电子街道",
      icon: "img/basemaps/google_vec.png",
      type: "arcgis_tile",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"
    },
    {
      name: "ArcGIS NatGeo",
      icon: "img/basemaps/esriWorldStreetMap.png",
      type: "arcgis_tile",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer"
    },
    {
      name: "蓝色底图",
      icon: "img/basemaps/bd-c-midnight.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      chinaCRS: mars2d.ChinaCRS.GCJ02, // 本示例故意把国外 ArcGIS 瓦片声明为 GCJ02，用来演示加偏/纠偏效果；实际项目按底图真实坐标系填写（ArcGIS 通常不加此参数）
      customColor: "#11243C"
    },
    {
      name: "灰色底图",
      icon: "img/basemaps/bd-c-grayscale.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      chinaCRS: mars2d.ChinaCRS.GCJ02, // 同「蓝色底图」，仅用于演示纠偏
      customColor: "#575757"
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  globalNotify(
    "已知问题提示",
    `如图层未显示或服务URL访问超时，是因为目前国家测绘主管部门对未经审核批准的国外地图服务做了屏蔽封锁。
     您可以需翻墙使用 或 参考示例代码替换本地服务地址使用。`
  )

  // 添加底图 [需要引用mars2d-esri插件]
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)，本示例只演示方式1的配置写法
  // const layer = new mars2d.layer.ArcGisTileLayer({
  //   type: "arcgis",
  //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
  //   chinaCRS: mars2d.ChinaCRS.GCJ02,
  //   "customColor": "#11243C"
  // })
  // map.addLayer(layer)
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
