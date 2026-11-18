/**
 * 示例：散点图态势
 * 演示：在同一个 EchartsLayer 里混排地图坐标系的散点/涟漪散点与普通 grid 坐标系柱状图+类目轴，同时展示城市数值排行
 * API：mars2d.layer.EchartsLayer、mars2d.Map#setView
 * 要点：series 的 coordinateSystem 不写 "mars2dMap" 的（如柱状图）走 ECharts 自身 grid 坐标系，不会落在地图经纬度上；散点大小按 value/500 缩放且最小 8px；数据里 geoCoordMap 用的是 [经度, 纬度]
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let echartsLayer // 图表图层，卸载时移除（触发 onRemove，内部 echarts 实例随之 dispose）

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 与 config.json 中 id=2017 蓝色底图的底色一致，瓦片未加载完成时不会露白
  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 切换为 config.json 中 id=2017 的蓝色底图
  map.setView([34.885931, 125.024414], 5)

  showEchartsLayer()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && echartsLayer) {
    map.removeLayer(echartsLayer) // EchartsLayer.onRemove 会 dispose 内部的 echarts 实例并移除容器 DOM
  }
  echartsLayer = null
  if (map) {
    map.destroy() // 释放地图 DOM、底图与事件监听
    map = null
  }
}

// ========== 4. 图表图层 ==========
function showEchartsLayer() {
  const data = [
    { name: "上海", value: 19780 },
    { name: "珠海", value: 2186 },
    { name: "三亚", value: 1135 },
    { name: "惠州", value: 1973 },
    { name: "海口", value: 2568 },
    { name: "合肥", value: 4039 },
    { name: "南京", value: 6959 },
    { name: "杭州", value: 5632 },
    { name: "苏州", value: 6707 },
    { name: "无锡", value: 3393 },
    { name: "昆山", value: 1894 },
    { name: "广州", value: 15769 },
    { name: "深圳", value: 8259 },
    { name: "佛山", value: 5741 },
    { name: "东莞", value: 3030 },
    { name: "福州", value: 4542 },
    { name: "厦门", value: 3329 },
    { name: "南宁", value: 3157 },
    { name: "郑州", value: 6690 },
    { name: "武汉", value: 8678 },
    { name: "长沙", value: 5303 },
    { name: "南昌", value: 3025 },
    { name: "北京", value: 20259 },
    { name: "长春", value: 3016 },
    { name: "大连", value: 3202 },
    { name: "沈阳", value: 4540 },
    { name: "哈尔滨", value: 3141 },
    { name: "天津", value: 8626 },
    { name: "济南", value: 4361 },
    { name: "青岛", value: 6667 },
    { name: "太原", value: 4080 },
    { name: "石家庄", value: 6137 },
    { name: "西安", value: 6991 },
    { name: "成都", value: 13873 },
    { name: "重庆", value: 13283 },
    { name: "昆明", value: 4633 }
  ]

  const geoCoordMap = {
    上海: [121.48, 31.22],
    珠海: [113.52, 22.3],
    三亚: [109.31, 18.14],
    惠州: [114.4, 23.09],
    海口: [110.35, 20.02],
    合肥: [117.27, 31.86],
    南京: [118.78, 32.04],
    杭州: [120.19, 30.26],
    苏州: [120.62, 31.32],
    无锡: [120.29, 31.59],
    昆山: [120.95, 31.39],
    广州: [113.23, 23.16],
    深圳: [114.07, 22.62],
    佛山: [113.11, 23.05],
    东莞: [113.75, 23.04],
    福州: [119.3, 26.08],
    厦门: [118.1, 24.46],
    南宁: [108.33, 22.84],
    郑州: [113.65, 34.76],
    武汉: [114.31, 30.52],
    长沙: [113, 28.21],
    南昌: [115.89, 28.68],
    北京: [116.46, 39.92],
    长春: [125.35, 43.88],
    大连: [121.62, 38.92],
    沈阳: [123.38, 41.8],
    哈尔滨: [126.63, 45.75],
    天津: [117.2, 39.13],
    济南: [117, 36.65],
    青岛: [120.33, 36.07],
    太原: [112.53, 37.87],
    石家庄: [114.48, 38.03],
    西安: [108.95, 34.27],
    成都: [104.06, 30.67],
    重庆: [106.54, 29.59],
    昆明: [102.73, 25.04]
  }

  const convertData = function (data) {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }

  // convertedData[0] 是全量散点数据，convertedData[1] 是按数值取的前 6 名（本示例 series 只用到 [0]）
  const convertedData = [
    convertData(data),
    convertData(
      data
        .sort(function (a, b) {
          return b.value - a.value
        })
        .slice(0, 6)
    )
  ]
  // 类目轴数据按 value 升序排列，柱状图从下往上的数值递增
  data.sort(function (a, b) {
    return a.value - b.value
  })

  const selectedItems = []
  const categoryData = []
  const barData = []
  //   var maxBar = 30;
  let sum = 0
  const count = data.length
  for (let i = 0; i < data.length; i++) {
    categoryData.push(data[i].name)
    barData.push(data[i].value)
    sum += data[i].value
  }

  const options = {
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicInOut",
    animationDurationUpdate: 1000,
    animationEasingUpdate: "cubicInOut",
    title: [
      {
        text: "散点图态势",
        subtext: "san dian tu taishi",
        left: "center",
        textStyle: {
          color: "#fff"
        }
      },
      {
        id: "statistic",
        text: count ? "平均: " + parseInt((sum / count).toFixed(4)) : "",
        right: 120,
        top: 40,
        width: 100,
        textStyle: {
          color: "#fff",
          fontSize: 16
        }
      }
    ],

    tooltip: {
      trigger: "item"
    },
    grid: {
      right: 40,
      top: 100,
      bottom: 40,
      width: "30%"
    },
    xAxis: {
      type: "value",
      scale: true,
      position: "top",
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 2,
        textStyle: {
          color: "#aaa"
        }
      }
    },
    yAxis: {
      type: "category",
      nameGap: 16,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ddd"
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#ddd"
        }
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: "#ddd"
        }
      },
      data: categoryData
    },
    series: [
      {
        type: "scatter",
        coordinateSystem: "mars2dMap",
        data: convertedData[0],
        symbolSize: function (val) {
          const size = (val[2] / 500) * 1.5
          return Math.max(size, 8)
        },
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: "#FF8C00",
            position: "right",
            show: true
          }
        }
      },
      {
        type: "effectScatter",
        coordinateSystem: "mars2dMap",
        data: convertedData[0],
        symbolSize: function (val) {
          const size = val[2] / 500
          return Math.max(size, 8)
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke"
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: "#f4e925",
            shadowBlur: 50,
            shadowColor: "#EE0000"
          }
        },
        zlevel: 1
      },
      {
        id: "bar",
        zlevel: 2,
        type: "bar",
        symbol: "none",
        itemStyle: {
          normal: {
            color: "#ddb926"
          }
        },

        data
      }
    ]
  }

  // 创建Echarts图层
  echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
