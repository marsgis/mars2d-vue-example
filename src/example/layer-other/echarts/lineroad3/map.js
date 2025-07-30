import * as mars2d from "mars2d"
const L = mars2d.L
let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.basemap = 2017 // 切换到蓝色底图
  map.setView([31.872396, 117.290191], 12)

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
  const url = "http://server.mars2d.cn/arcgis/rest/services/mars/hefei/MapServer/33"
  const query = L.esri.query({ url })

  // query.where('Maj_Area >500000');
  query.run(function (error, featureCollection, response) {
    if (error != null && error.code > 0) {
      globalMsg("error.message", "服务访问出错")
      return
    }
    if (featureCollection === undefined || featureCollection == null || featureCollection.features.length === 0) {
      globalMsg("未找到符合查询条件的要素！")
    } else {
      showEchartsLayer(featureCollection)
    }
  })
}

function showEchartsLayer(featureCollection) {
  const busLines = []
  for (let i = 0; i < featureCollection.features.length; i++) {
    const feature = featureCollection.features[i]
    if (feature == null || feature.geometry == null || feature.geometry.coordinates == null || feature.geometry.coordinates.length === 0) {
      continue
    }

    const hStep = 1 / feature.geometry.coordinates.length
    // console.log(i + ',' + hStep);
    busLines.push({
      coords: feature.geometry.coordinates,
      lineStyle: {
        normal: {
          color: echarts.color.modifyHSL("#5A94DF", Math.round(hStep * i))
        }
      }
    })
  }

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
            opacity: 0.4,
            width: 3
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
          symbolSize: 2.5
        },
        zlevel: 1
      }
    ]
  }

  // 创建Echarts图层
  const echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
