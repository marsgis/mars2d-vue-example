/**
 * 示例：公交路线热力图
 * 演示：请求北京公交线路数据（百度坐标），逐点用 mars2d.PointTrans.bd2wgs 纠偏后，用 EchartsLayer 的 lines 绘制静态线路底图 + 沿线流光
 * API：mars2d.layer.EchartsLayer、mars2d.PointTrans.bd2wgs、mars2d.Util.fetchJson
 * 要点：原始数据是百度坐标（bd09），不转成 wgs84 会和高德底图错位；每条线路的坐标是靠"相邻点偏移量累加"拼出来的，不能单独取某一对数值当经纬度；hStep 按线路序号把色相均匀分布
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
  map.setView([39.907, 116.377], 10)

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
    url: "http://data.mars2d.cn/file/apidemo/bjgj.json"
  })
    .then((data) => {
      // 示例切换后请求可能才返回，此时地图已销毁，直接丢弃数据
      if (!map) {
        return
      }
      showEchartsLayer(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

function showEchartsLayer(data) {
  // 每条线路一个色相，hStep 是色相步长（300 度色相环按线路数均分）
  const hStep = 300 / (data.length - 1)

  const busLines = [
    ...data.map(function (busLine, idx) {
      let prevPt
      const points = []
      for (let i = 0; i < busLine.length; i += 2) {
        // 数据保存的是相邻点的偏移量，需要累加到上一个点上才是绝对坐标
        let pt = [busLine[i], busLine[i + 1]]
        if (i > 0) {
          pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]]
        }
        prevPt = pt

        let jd = pt[0] / 1e4
        let wd = pt[1] / 1e4

        // 百度坐标转高德坐标
        const point = mars2d.PointTrans.bd2wgs([jd, wd])
        jd = point[0]
        wd = point[1]

        points.push([jd, wd])
      }
      return {
        coords: points,
        lineStyle: {
          normal: {
            color: echarts.color.modifyHSL("#5A94DF", Math.round(hStep * idx))
          }
        }
      }
    })
  ]

  const options = {
    animation: true,
    series: [
      {
        type: "lines",
        coordinateSystem: "mars2dMap",
        polyline: true,
        data: busLines,
        silent: true,
        lineStyle: {
          normal: {
            // color: '#c23531',
            // color: 'rgb(200, 35, 45)',
            opacity: 0.2,
            width: 1
          }
        },
        progressiveThreshold: 500,
        progressive: 200
      },
      {
        type: "lines",
        coordinateSystem: "mars2dMap",
        polyline: true,
        data: busLines,
        lineStyle: {
          normal: {
            width: 0
          }
        },
        effect: {
          constantSpeed: 20,
          show: true,
          trailLength: 0.1,
          symbolSize: 1.5
        },
        zlevel: 1
      }
    ]
  }

  // 创建Echarts图层
  echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
