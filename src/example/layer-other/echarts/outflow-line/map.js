import * as mars2d from "mars2d"

let map
let echartsLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.setView([33.652, 107.661], 4)

  showEchartsLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

function showEchartsLayer() {
  const geoCoordMap = {
    安徽省: [117.17, 31.52],
    北京市: [116.24, 39.55],
    重庆市: [106.54, 29.59],
    福建省: [119.18, 26.05],
    甘肃省: [103.51, 36.04],
    广东省: [113.14, 23.08],
    广西壮族自治区: [108.19, 22.48],
    贵州省: [106.42, 26.35],
    海南省: [110.2, 20.02],
    河北省: [114.3, 38.02],
    河南省: [113.4, 34.46],
    黑龙江省: [128.36, 45.44],
    湖北省: [112.27, 30.15],
    湖南省: [112.59, 28.12],
    吉林省: [125.19, 43.54],
    江苏省: [118.46, 32.03],
    江西省: [115.55, 28.4],
    辽宁省: [123.25, 41.48],
    内蒙古: [108.41, 40.48],
    宁夏回族自治区: [106.16, 38.27],
    青海省: [101.48, 36.38],
    山东省: [118.0, 36.4],
    山西省: [112.33, 37.54],
    陕西省: [108.57, 34.17],
    上海市: [121.29, 31.14],
    海南: [108.77, 19.1],
    四川省: [104.04, 30.4],
    天津市: [117.12, 39.02],
    西藏自治区: [91.08, 29.39],
    新疆维吾尔自治区: [87.36, 43.45],
    云南省: [102.42, 25.04],
    浙江省: [120.1, 30.16],
    澳门: [115.07, 21.33],
    台湾省: [121.21, 23.53]
  }

  const BJData = [
    [
      {
        name: "北京市"
      },
      {
        name: "上海市",
        value: 195
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "广东省",
        value: 90
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "辽宁省",
        value: 80
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "湖北省",
        value: 70
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "内蒙古",
        value: 70
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "江苏省",
        value: 60
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "新疆维吾尔自治区",
        value: 70
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "四川省",
        value: 40
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "云南省",
        value: 130
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "黑龙江省",
        value: 130
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "甘肃省",
        value: 200
      }
    ],
    [
      {
        name: "北京市"
      },
      {
        name: "西藏自治区",
        value: 60
      }
    ]
  ]

  // var planePath =  "path://M917.965523 917.331585c0 22.469758-17.891486 40.699957-39.913035 40.699957-22.058388 0-39.913035-18.2302-39.913035-40.699957l-0.075725-0.490164-1.087774 0c-18.945491-157.665903-148.177807-280.296871-306.821991-285.4748-3.412726 0.151449-6.751774 0.562818-10.240225 0.562818-3.450589 0-6.789637-0.410346-10.202363-0.524956-158.606321 5.139044-287.839661 127.806851-306.784128 285.436938l-1.014096 0 0.075725 0.490164c0 22.469758-17.854647 40.699957-39.913035 40.699957s-39.915082-18.2302-39.915082-40.699957l-0.373507-3.789303c0-6.751774 2.026146-12.903891 4.91494-18.531052 21.082154-140.712789 111.075795-258.241552 235.432057-312.784796C288.420387 530.831904 239.989351 444.515003 239.989351 346.604042c0-157.591201 125.33352-285.361213 279.924387-285.361213 154.62873 0 279.960203 127.770012 279.960203 285.361213 0 97.873098-48.391127 184.15316-122.103966 235.545644 124.843356 54.732555 215.099986 172.863023 235.808634 314.211285 2.437515 5.290493 4.01443 10.992355 4.01443 17.181311L917.965523 917.331585zM719.822744 346.679767c0-112.576985-89.544409-203.808826-199.983707-203.808826-110.402459 0-199.944821 91.232864-199.944821 203.808826s89.542362 203.808826 199.944821 203.808826C630.278335 550.488593 719.822744 459.256752 719.822744 346.679767z";

  const convertData = function (data) {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i]
      const fromCoord = geoCoordMap[dataItem[0].name]
      const toCoord = geoCoordMap[dataItem[1].name]
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord]
        })
      }
    }
    return res
  }

  const color = ["#a6c84c", "#ffa022", "#46bee9"]
  const mySeries = []
  ;[["", BJData]].forEach(function (item, i) {
    mySeries.push(
      {
        // 线
        name: item[0],
        //                      name: item[0] + ' Top10',
        type: "lines",
        coordinateSystem: "mars2dMap",
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: "#fff",
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: color[0],
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        // 移动 点
        name: item[0],
        //                      name: item[0] + ' Top10',
        type: "lines",
        coordinateSystem: "mars2dMap",
        zlevel: 2,
        // effect: {
        //    show: true,
        //    period: 6,
        //    trailLength: 0,
        //    symbol: planePath,
        //    symbolSize: 15
        // },
        effect: {
          show: true,
          period: 6,
          trailLength: 0.1,
          //            symbol: planePath,
          symbol: "arrow",
          symbolSize: 5
        },
        lineStyle: {
          normal: {
            color: color[1],
            width: 1,
            opacity: 0.4,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        // 省份圆点
        name: item[0],
        //                      name: item[0] + ' Top10',
        type: "effectScatter",
        coordinateSystem: "mars2dMap",
        zlevel: 2,
        rippleEffect: {
          brushType: "stroke"
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{b}"
          }
        },
        symbolSize: function (val) {
          return val[2] / 6
        },
        itemStyle: {
          normal: {
            color: function (params) {
              const tmp = params.data.value[2]
              if (tmp < 100) {
                return "green"
              } else if (tmp > 150) {
                return "red"
              } else {
                return "yellow"
              }
            }
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          }
        })
      }
    )
  })

  const options = {
    backgroundColor: "rgba(116, 112, 124, 0.2)",
    title: {
      text: "北京病人就诊流向图",
      subtext: "(1月份统计结果)",
      left: "center",
      textStyle: {
        color: "#fff"
      },
      subtextStyle: {
        color: "yellow",
        fontWeight: "bold"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        if (params.seriesIndex === 2 || params.seriesIndex === 5 || params.seriesIndex === 8) {
          return params.name + " " + params.seriesName + " : " + params.data.value[2] + "人次"
        } else if (params.seriesIndex === 1 || params.seriesIndex === 4 || params.seriesIndex === 7) {
          return params.data.fromName + "→" + params.data.toName
        }
      }
    },
    legend: {
      orient: "vertical",
      top: "6%",
      left: "center",
      data: ["北京市"],
      textStyle: {
        color: "#fff"
      },
      selectedMode: "single"
    },
    series: mySeries
  }

  const echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
