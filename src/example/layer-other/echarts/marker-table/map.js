import * as mars2d from "mars2d"
const L = mars2d.L

let map
let layerWork
let echartsArr = []

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 10,
  center: { lng: 119.771576, lat: 32.208153 }
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  layerWork = L.featureGroup()
  map.addLayer(layerWork)

  getEcharsPoint()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  clearLayers()
  map.removeLayer(layerWork)
  map = null
}

// 获取json项目
function getEcharsPoint() {
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/echarspoint.json"
  })
    .then((data) => {
      showData(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

// 数据显示
function showData(arrdata) {
  clearLayers()
  for (let i = 0; i < arrdata.length; i++) {
    const item = arrdata[i]
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
 * 添加饼状图
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
      html: '<div id="' + divid + '" style="width: 220px; height: 220px; position: relative; background-color: transparent;"></div>'
    })
  }).addTo(layerWork)

  // 基于准备好的dom，初始化echarts实例
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
    myChart.dispose()
  }
  echartsArr = []
  layerWork.clearLayers()
}
