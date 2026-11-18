/**
 * 示例：业务后端数据图层
 * 演示：用 mars2d.layer.BusineDataLayer 从后端接口取业务数据，按经纬度字段上图，并把数据推给面板生成树
 * API：mars2d.layer.BusineDataLayer、map.addLayer、layer.on(mars2d.EventType.load)
 * 要点：数据接口要返回带经纬度字符串的列表，坐标用 formatLatlng 自定义解析（返回 null 的项会被跳过）；styleField/styleFieldOptions 可按属性值批量换样式；数据来自在线接口 data.mars3d.cn
 */
import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象
export let graphicLayer // 矢量图层对象
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到面板中

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  center: { lng: 118.759117, lat: 32.0977 },
  // 线面矢量改用 Canvas 渲染器：要素较多时比默认 SVG 快得多（见 mars2d 中 Map 构造参数 renderer 的说明）
  preferCanvas: true
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 蓝色底图

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
    popup: "all" // 单击矢量对象时弹出全部属性
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

// ========== 3. 清理（与 onMounted 对称）==========
// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  // 解绑面板通过 eventTarget 注册的监听，避免旧面板回调残留
  eventTarget.off()
  if (map && graphicLayer) {
    // load、click 监听都挂在图层上，移除图层即可一并释放
    map.removeLayer(graphicLayer)
    graphicLayer = null
  }
  map = null
}

// ========== 4. 面板交互方法 ==========
export function getGraphicById(id) {
  // 图层未创建/已卸载时返回 null，面板点击树节点不会抛错
  return graphicLayer ? graphicLayer.getGraphicById(id) : null
}
