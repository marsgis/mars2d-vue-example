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

  map.basemap = 2017 // 切换到蓝色底图
  map.setView([33.652, 107.661], 5)

  getJsonData()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

function getJsonData() {
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/weibo-echars.json"
  })
    .then((weiboData) => {
      weiboData = weiboData.map(function (serieData, idx) {
        let px = serieData[0] / 1000
        let py = serieData[1] / 1000
        const res = [[px, py]]

        for (let i = 2; i < serieData.length; i += 2) {
          const dx = serieData[i] / 1000
          const dy = serieData[i + 1] / 1000
          const x = px + dx
          const y = py + dy
          res.push([x.toFixed(2), y.toFixed(2), 1])

          px = x
          py = y
        }
        return res
      })

      showEchartsLayer(weiboData)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

function showEchartsLayer(weiboData) {
  const options = {
    animation: true,
    title: {
      text: "人口数据",
      left: "center",
      top: "top",
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {},
    legend: {
      left: "right",
      data: ["强", "弱"],
      textStyle: {
        color: "#ccc"
      }
    },
    series: [
      {
        name: "弱",
        type: "scatter",
        coordinateSystem: "mars2dMap",
        symbolSize: 1,
        large: true,
        itemStyle: {
          normal: {
            shadowBlur: 2,
            shadowColor: "rgba(14, 241, 242, 0.8)",
            color: "rgba(14, 241, 242, 0.8)"
          }
        },
        data: weiboData[0]
      },
      {
        name: "强",
        type: "scatter",
        coordinateSystem: "mars2dMap",
        symbolSize: 1,
        large: true,
        itemStyle: {
          normal: {
            shadowBlur: 2,
            shadowColor: "rgba(255, 255, 255, 0.8)",
            color: "rgba(255, 255, 255, 0.8)"
          }
        },
        data: weiboData[1]
      }
    ]
  }

  // 创建Echarts图层
  const echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
