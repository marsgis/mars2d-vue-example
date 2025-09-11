import * as mars2d from "mars2d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 蓝色底图
  map.setView([39.907, 116.377], 10)

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
    url: "http://data.mars2d.cn/file/apidemo/bjgj.json"
  })
    .then((data) => {
      showEchartsLayer(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

function showEchartsLayer(data) {
  const hStep = 300 / (data.length - 1)

  const busLines = [
    ...data.map(function (busLine, idx) {
      let prevPt
      const points = []
      for (let i = 0; i < busLine.length; i += 2) {
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
      // console.log(idx + ',' + hStep);
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
  const echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
