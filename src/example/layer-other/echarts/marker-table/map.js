/**
 * 示例：折线图标记
 * 演示：请求在线点位数据，每个点位用 L.marker + divIcon 挂一个 div，再在 div 上用 echarts.init 渲染柱状图/折线图（水量与温度双 Y 轴）
 * API：L.marker/L.divIcon（Leaflet 原生）、echarts.init、mars2d.Util.fetchJson、mars2d.Map#fitBounds
 * 要点：divIcon 的 div 必须等 marker 加入图层（DOM 挂到地图 pane）后，document.getElementById 才取得到，否则 echarts.init 传 null；每个点一个 echarts 实例，切换示例时必须逐个 dispose，否则 DOM 移除后实例仍驻留内存
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let layerWork // 装载所有点位 marker 的图层组
let echartsArr = [] // 已创建的 echarts 实例，卸载时统一 dispose

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10,
  center: { lng: 119.771576, lat: 32.208153 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  layerWork = L.featureGroup()
  map.addLayer(layerWork)

  getEcharsPoint()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 先 dispose 每个点的 echarts 实例并清空 marker，再移除图层，避免 DOM 已删除但实例仍存活
  clearLayers()
  if (map && layerWork) {
    map.removeLayer(layerWork)
  }
  layerWork = null
  if (map) {
    map.destroy() // 释放地图 DOM、底图与事件监听
    map = null
  }
}

// ========== 4. 图表点位 ==========
// 获取json项目
function getEcharsPoint() {
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/echarspoint.json"
  })
    .then((data) => {
      // 示例切换后请求可能才返回，此时地图已销毁，直接丢弃数据
      if (!map) {
        return
      }
      showData(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

// 数据显示
function showData(arrdata) {
  // 重复加载前先清掉旧点位与旧图表实例
  clearLayers()
  for (let i = 0; i < arrdata.length; i++) {
    const item = arrdata[i]
    // _index 用于拼每个 div 的唯一 id，保证 echarts.init 能按 id 取到对应 DOM
    item._index = i
    if (item.TotalLength === 0) {
      continue
    }

    addmarker(item)
  }

  map.stop()
  map.fitBounds(layerWork.getBounds())
}

/**
 * 添加柱状图/折线图
 *
 * @param {Array} item  数据
 * @returns {void} 无
 */
function addmarker(item) {
  const divid = "port_" + item._index

  const pictures = L.marker([item.Y, item.X], {
    icon: L.divIcon({
      className: "leaflet-echart-icon",
      iconSize: [220, 220],
      // 先渲染占位 div，marker addTo 之后该 div 才会被插入文档
      html: '<div id="' + divid + '" style="width: 220px; height: 220px; position: relative; background-color: transparent;"></div>'
    })
  }).addTo(layerWork)

  // 基于准备好的dom，初始化echarts实例（marker 已 addTo，上一步的 div 已在文档中）
  const myChart = echarts.init(document.getElementById(divid))
  echartsArr.push(myChart)

  // 指定图表的配置项和数据
  const option = {
    tooltip: {
      trigger: "axis"
    },
    xAxis: [
      {
        type: "category",
        data: ["1月", "2月", "3月", "4月"]
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "水量",
        min: 0,
        max: 50,
        interval: 50,
        axisLabel: {
          formatter: "{value} ml"
        }
      },
      {
        type: "value",
        name: "温度",
        min: 0,
        max: 10,
        interval: 5,
        axisLabel: {
          formatter: "{value} °C"
        }
      }
    ],
    series: [
      {
        name: "蒸发量",
        type: "bar",
        data: [2.0, 4.9, 7.0, 23.2]
      },
      {
        name: "降水量",
        type: "bar",
        data: [2.6, 5.9, 9.0, 26.4]
      },
      {
        name: "平均温度",
        type: "line",
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5]
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}

// 清除图层
function clearLayers() {
  for (let i = 0; i < echartsArr.length; i++) {
    const myChart = echartsArr[i]
    myChart.dispose() // dispose 后该实例不再占用 canvas 与全局实例表
  }
  echartsArr = []
  if (layerWork) {
    layerWork.clearLayers()
  }
}
