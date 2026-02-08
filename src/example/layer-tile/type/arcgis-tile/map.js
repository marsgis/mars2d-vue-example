import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

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
      chinaCRS: mars2d.ChinaCRS.GCJ02,
      customColor: "#11243C"
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

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  globalNotify(
    "已知问题提示",
    `如图层未显示或服务URL访问超时，是因为目前国家测绘主管部门对未经审核批准的国外地图服务做了屏蔽封锁。
     您可以需翻墙使用 或 参考示例代码替换本地服务地址使用。`
  )

  // 添加底图 [需要引用mars2d-esri插件]
  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  // const layer = new mars2d.layer.ArcGisTileLayer({
  //   type: "arcgis",
  //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
  //   chinaCRS: mars2d.ChinaCRS.GCJ02,
  //   "customColor": "#11243C"
  // })
  // map.addLayer(layer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
