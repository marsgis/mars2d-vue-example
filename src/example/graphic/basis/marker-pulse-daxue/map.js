/**
 * 示例：动态效果点
 * 演示：GeoJsonLayer 显示行政边界 + 接口数据渲染脉冲动画点（按索引循环配色）
 * API：mars2d.layer.GeoJsonLayer、mars2d.graphic.Marker、mars2d.Util.fetchJson
 * 要点：接口里的经纬度是逗号分隔字符串，需自行 split 转数值；异步数据返回前可能已切换示例，回调需判空；动画颜色由 pulseColor/pulseShadowColor 控制
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let geoJsonLayer // 边界图层
let graphicLayer // 高校点图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lng: 118.756714, lat: 32.029035 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.container.style.backgroundColor = "#11243C" // 深色背景，配合深色底图
  map.basemap = 2017 // 蓝色底图

  // 显示边界
  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "南京市",
    url: "//data.mars2d.cn/file/geojson/areas/320100_full.json",
    symbol: {
      type: "polyline",
      styleOptions: {
        color: "#00ffff", // 颜色
        opacity: 0.6, // 透明度
        outline: false
      }
    },
    popup: "{name}"
  })
  map.addLayer(geoJsonLayer)

  // 显示高校点
  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/gaoxiao.json"
  })
    .then((data) => {
      // 请求返回时示例可能已经切换/卸载，此时 map 与图层都已置空，直接丢弃本次数据
      if (!map) {
        return
      }
      addFeature(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (geoJsonLayer) {
    if (map) {
      map.removeLayer(geoJsonLayer, true)
    }
    geoJsonLayer = null
  }
  if (graphicLayer) {
    // 移除高校点图层：脉冲动画随矢量对象一起停止
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}

// ========== 3. 矢量对象（演示数据）==========
function addFeature(arr) {
  const pointColorArr = ["#f33349", "#f79a2c", "#f2fa19", "#95e40c", "#1ffee6"]

  // 创建DIV数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)

    // haoutil.msg('单击了：' + item['高校名称'])
  })

  graphicLayer.bindPopup(function (event) {
    const item = event.attr
    if (!item) {
      return false
    }
    const html =
      "高校名称：" +
      item["高校名称"] +
      "<br />所属地区：" +
      item["地区"] +
      "<br />主管部门：" +
      item["主管部门"] +
      "<br />办学层次：" +
      item["办学层次"] +
      "<br />王牌专业：" +
      item["王牌专业"]
    return html
  })

  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]
    const postions = item["经纬度"].split(",") // 取到经纬度坐标
    if (postions.length !== 2) {
      continue
    }

    const lng = Number(postions[0])
    const lat = Number(postions[1])
    const pointColor = pointColorArr[i % pointColorArr.length]

    const graphic = new mars2d.graphic.Marker({
      latlng: [lat, lng],
      style: {
        width: 6,
        pulse: true,
        pulseColor: pointColor,
        pulseShadowColor: pointColor
      },
      attr: item
    })
    graphicLayer.addGraphic(graphic)
  }
}
