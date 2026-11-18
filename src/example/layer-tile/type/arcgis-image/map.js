/**
 * 示例：ArcGIS ImageServer
 * 演示：用 ArcGisImageLayer 加载 ArcGIS ImageServer 影像服务（示例为 Landsat 影像）
 * API：mars2d.layer.ArcGisImageLayer、map.setView
 * 要点：依赖 mars2d-esri 插件（includeLibs 的 mars2d 公共库已一并加载）；示例服务在国外，可能被网络屏蔽或请求超时，加载不出时先看 globalNotify 提示；服务影像全球覆盖，onMounted 里用 setView 把视角移到示例区域，否则默认视角看不到有效影像
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let tileLayer // 叠加的图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option = {
    zoom: 7,
    center: [31.085815, 112.115479],

    control: {
      scale: true,
      locationBar: {
        template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>层级:{level}</div>"
      },
      zoom: { position: "bottomleft" },
      toolBar: { position: "bottomleft" }
    }
  }
  return option
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.setView([37.75, -122.23], 10) // 服务示例影像在旧金山附近，直接把视角移过去

  // 添加底图 [需要引用esri-leaflet插件]
  tileLayer = new mars2d.layer.ArcGisImageLayer({
    type: "arcgis_image",
    url: "https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer"
  })
  map.addLayer(tileLayer)
  globalNotify(
    "已知问题提示",
    `如图层未显示或服务URL访问超时，是因为目前国家测绘主管部门对未经审核批准的国外地图服务做了屏蔽封锁。
      您可以需翻墙使用 或 参考示例代码替换本地服务地址使用。`
  )
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && tileLayer) {
    map.removeLayer(tileLayer)
    tileLayer = null
  }
  map = null
}
