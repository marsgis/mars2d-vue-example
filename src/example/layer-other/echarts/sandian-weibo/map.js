/**
 * 示例：散点图微博签到
 * 演示：请求微博签到轨迹数据，把每条轨迹的相对偏移逐点累加成经纬度，再用 EchartsLayer 的 scatter（large 模式）渲染签到散点分布
 * API：mars2d.layer.EchartsLayer、mars2d.Util.fetchJson、mars2d.Map#setView
 * 要点：原始数据以 1/1000 为单位，首段是起点经纬度、之后每对是相邻点偏移量，要逐点累加才能得到真实轨迹点位；large: true 走 ECharts 增量渲染，适合万级散点；数据是 [经度, 纬度] 顺序
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
  map.setView([33.652, 107.661], 5)

  getJsonData()
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
function getJsonData() {
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/weibo-echars.json"
  })
    .then((weiboData) => {
      // 示例切换后请求可能才返回，此时地图已销毁，直接丢弃数据
      if (!map) {
        return
      }

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
  echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
