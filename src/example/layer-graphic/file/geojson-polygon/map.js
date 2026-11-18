/**
 * 示例：中国各省市面
 * 演示：GeoJsonLayer 加载全国省界面，在 load 事件里把"港口数量"业务数据按省名匹配到每个面上做分级配色，并通过 eventTarget 把图例 HTML 推给面板
 * API：mars2d.layer.GeoJsonLayer、graphic.setStyle、eventTarget.fire
 * 要点：业务数据必须等图层 load 之后才能按 event.graphics 绑定；preferCanvas:true 让面要素走 Canvas 渲染（大数据量时更快）；图例在 map.js onMounted 里同步 fire，面板可能晚于地图就绪挂载，面板侧要用 onMapWorkReady 补调 addLegend
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let geoJsonLayer // 全国省界 GeoJson 图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 4,
  center: { lng: 110.566406, lat: 33.123558 },
  // 线面矢量改用 Canvas 渲染器：要素较多时比默认 SVG 快得多（见 mars2d 中 Map 构造参数 renderer 的说明）
  preferCanvas: true
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 先把图例推给面板（面板尚未挂载时由面板侧 onMapWorkReady 补调，见 index.vue）
  addLegend()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "各省市",
    url: "http://data.mars2d.cn/file/geojson/areas/100000_full.json",
    symbol: {
      type: "polygon",
      styleOptions: {
        fill: true,
        fillColor: "white",
        fillOpacity: 0.7,
        outline: true,
        outlineWidth: 2,
        outlineOpacity: 1,
        outlineColor: "white"
      }
    },
    // 提示框模板里的 {name}/{num} 占位符取自要素属性；num 由下面 load 回调里的 bindYewuData 写入
    tooltip: "{name}<br/>港口数量:{num}个",
    // 数据加载后自动缩放到全国范围
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)

    const arrdata = [
      { name: "辽宁省", Y: 41.485959939, X: 124.049036594, value: 6, id: 0 },
      { name: "天津市", Y: 39.292278417, X: 117.337698238, value: 1, id: 1 },
      { name: "河北省", Y: 38.887537102, X: 115.05608039, value: 3, id: 2 },
      { name: "山东省", Y: 36.384634338, X: 118.335456608, value: 8, id: 3 },
      { name: "江苏省", Y: 31.949468221, X: 119.175534669, value: 12, id: 4 },
      { name: "上海市", Y: 31.205117603, X: 121.507670825, value: 1, id: 5 },
      { name: "浙江省", Y: 29.249913493, X: 120.438160114, value: 7, id: 6 },
      { name: "福建省", Y: 26.032479861, X: 118.134283206, value: 4, id: 7 },
      { name: "广东省", Y: 23.69235645, X: 113.489506429, value: 18, id: 8 },
      { name: "广西壮族自治区", Y: 23.806009465, X: 108.79016159, value: 6, id: 9 },
      { name: "海南省", Y: 19.210592585, X: 109.774303805, value: 11, id: 10 },
      { name: "云南省", Y: 24.224322869, X: 101.862567546, value: 1, id: 11 },
      { name: "四川省", Y: 30.627387401, X: 102.694776433, value: 2, id: 12 },
      { name: "重庆市", Y: 30.057271884, X: 107.874570298, value: 1, id: 13 },
      { name: "湖北省", Y: 30.975494014, X: 112.27112659, value: 14, id: 14 },
      { name: "湖南省", Y: 27.610006298, X: 111.708571339, value: 2, id: 15 },
      { name: "江西省", Y: 27.613817395, X: 115.721821513, value: 2, id: 16 },
      { name: "安徽省", Y: 31.825459619, X: 117.226379045, value: 7, id: 17 },
      { name: "黑龙江省", Y: 46.951327674, X: 128.132064887, value: 2, id: 18 }
    ]
    // event.graphics 与 GeoJSON 的 features 顺序一一对应，可据此把业务值写到面对象上
    bindYewuData(event.graphics, arrdata)
  })

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.click, function (event) {
    const graphic = event.layer
    // 单击某个省后定位到该省范围
    map.fitBounds(graphic.getBounds())
  })

  geoJsonLayer.on(mars2d.EventType.mouseover, function (event) {
    const graphic = event.layer
    // 鼠标移入高亮：加粗深色描边、提高填充不透明度，并置顶避免被相邻面遮挡
    graphic.setStyle({
      outlineColor: "#666",
      outlineWidth: 3,
      fillOpacity: 0.7
    })
    graphic.bringToFront()
  })

  geoJsonLayer.on(mars2d.EventType.mouseout, function (event) {
    const graphic = event.layer
    graphic.setStyle({
      outlineColor: "white",
      outlineWidth: 2,
      fillOpacity: 0.5
    })
  })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  // 解绑面板通过 eventTarget 注册的事件，避免旧面板回调残留
  eventTarget.off()
  if (geoJsonLayer) {
    // 从地图移除图层；onUnmounted 里 map 可能已被置空，需判空
    if (map) {
      map.removeLayer(geoJsonLayer, true)
    }
    geoJsonLayer = null
  }
  map = null
}

// ========== 3. 业务数据绑定 ==========
// 把港口数量按省名匹配写入每个面的 attr.num，并按数量分级设置填充色
function bindYewuData(graphics, arrdata) {
  for (let i = 0; i < graphics.length; i++) {
    const graphic = graphics[i]
    graphic.attr.num = 0
    for (let j = 0; j < arrdata.length; j++) {
      const fname = graphic.attr.name
      // 面数据里省名可能是"广西壮族自治区"这类全称，业务数据是简称/全称混合，用包含关系匹配
      if (arrdata[j].name.indexOf(fname) !== -1) {
        graphic.attr.num = arrdata[j].value
        break
      }
    }
    graphic.setStyle({ fillColor: getColor(graphic.attr.num) })
  }
}

// ========== 4. 图例与配色（面板交互）==========
// 分级边界：少于 1、1-5、5-10、10-15、15-20、大于 20，共 6 段
const arrSpan = [1, 5, 10, 15, 20]
const arrColor = ["#FFEDA0", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"]
function getColor(num) {
  let length = arrSpan.length + 1
  if (length > arrColor.length) {
    length = arrColor.length
  }

  for (let k = 0; k < length; k++) {
    if (num < arrSpan[k]) {
      return arrColor[k]
    }
  }
  return arrColor[length - 1]
}

// 生成图例 HTML 并发给面板；分段规则必须与 getColor 保持一致
export function addLegend() {
  let strHtml = "<div class='legend-title'>港口数量(个)</div>"

  let length = arrSpan.length
  if (length > arrColor.length) {
    length = arrColor.length
  }

  for (let i = 0; i <= length; i++) {
    let label = arrSpan[i]

    if (i === 0) {
      label = "小于" + arrSpan[i]
    } else if (i === length) {
      label = "大于" + arrSpan[i - 1]
    } else {
      label = arrSpan[i - 1] + "-" + arrSpan[i]
    }

    strHtml +=
      "<div class='legend-item'><span class='legend-color' style='background:" +
      arrColor[i] +
      "'></span><span class='legend-des'>" +
      label +
      "</span></div>"
  }
  eventTarget.fire("initHtml", {
    html: strHtml
  })
}
