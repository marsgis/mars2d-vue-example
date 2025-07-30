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

  const minval = 60 // 最小值
  const maxval = 200 // 最大值

  let size = Math.log(item.TotalLength) * 9
  if (size > maxval) {
    size = maxval
  }
  if (size < minval) {
    size = minval
  }

  // 背景白色
  L.marker([item.Y, item.X], {
    icon: L.divIcon({
      className: "",
      iconSize: [size * 0.6, size * 0.6],
      html:
        '<div  style="width: ' +
        size * 0.6 +
        "px; height: " +
        size * 0.6 +
        'px; position: relative; background-color: #ffffff;border-radius: 50%;">1</div>'
    })
  }).addTo(layerWork)

  const pictures = L.marker([item.Y, item.X], {
    icon: L.divIcon({
      className: "leaflet-echart-icon",
      iconSize: [size, size],
      html: '<div id="' + divid + '" style="width: ' + size + "px; height: " + size + 'px; position: relative; background-color: transparent;"></div>'
    })
  }).addTo(layerWork)

  const fontsize = (size * 0.7) / String(item.TotalLength).length - 1

  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById(divid))
  echartsArr.push(myChart)

  // 指定图表的配置项和数据
  const option = {
    tooltip: {
      trigger: "item",
      formatter: function (param) {
        return param.seriesName + "<br/>" + param.name + "<br/>长度" + param.value + "km<br/>占比" + param.percent.toFixed(0) + "%"
      }
    },
    series: [
      {
        name: item.PortName,
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: function (param) {
              return item.TotalLength + "\nkm"
            },
            textStyle: {
              fontSize: fontsize,
              color: "#000000"
            }
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: item.DeepUsedLength, name: "县道" },
          { value: item.DeepUnUsedLength, name: "国道" },
          { value: item.UnDeepUsedLength, name: "高速" },
          { value: item.UnDeepUnUsedLength, name: "铁路" }
        ]
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
