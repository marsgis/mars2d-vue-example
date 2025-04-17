import * as mars2d from "mars2d"

export let map // mars2d.Map三维地图对象
export let graphicLayer // 矢量图层对象
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到面板中

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  center: { lng: 118.759117, lat: 32.0977 }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.basemap = 2017

  // BusineDataLayer 业务数据(通过API接口获取)图层
  graphicLayer = new mars2d.layer.BusineDataLayer({
    url: "https://data.mars3d.cn/file/apidemo/gaoxiao.json",
    symbol: {
      type: "marker",
      styleOptions: {
        width: 8,
        pulse: true,
        pulseColor: "#f33349"
      },
      styleField: "地区",
      styleFieldOptions: {
        南京市鼓楼区: {
          pulseColor: "#f79a2c",
          pulseShadowColor: "#f79a2c"
        },
        南京市江宁区: {
          pulseColor: "#f2fa19",
          pulseShadowColor: "#f2fa19"
        }
      }
    },
    // 自定义解析坐标
    formatLatlng: (attr, graphic) => {
      const latlng = attr["经纬度"].split(",") // 取到经纬度坐标

      if (latlng.length !== 2) {
        return null
      } else {
        return [latlng[1], latlng[0]]
      }
    },
    popup: "all"
  })
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    eventTarget.fire("refTree", { list: event.list })
  })
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

export function getGraphicById(id) {
  return graphicLayer.getGraphicById(id)
}
