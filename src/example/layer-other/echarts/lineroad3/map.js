/**
 * 示例：铁路热力图Arc
 * 演示：通过 mars2d-esri 插件的 L.esri.query 调用在线 ArcGIS 服务查询合肥铁路线要素，再用 EchartsLayer 的 lines 绘制带流光的铁路热力线
 * API：L.esri.query（mars2d-esri 插件）、mars2d.layer.EchartsLayer、mars2d.Map#setView
 * 要点：依赖 example.json libs 中的 mars2d-esri 插件与在线 ArcGIS 服务，离线环境不可用；服务返回的 geometry.coordinates 是 [经度, 纬度] 的线坐标，可直接给 lines 使用；查询是异步回调，示例切走后要判断地图是否已销毁
 */
import * as mars2d from "mars2d"
const L = mars2d.L
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
  map.setView([31.872396, 117.290191], 12)

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
  const url = "http://server.mars2d.cn/arcgis/rest/services/mars/hefei/MapServer/33"
  const query = L.esri.query({ url })

  // query.where('Maj_Area >500000');
  query.run(function (error, featureCollection, response) {
    // 查询是异步的，示例切换后结果可能才返回，此时 map 已销毁，直接丢弃
    if (!map) {
      return
    }
    if (error != null && error.code > 0) {
      globalMsg("服务访问出错：" + error.message)
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

    // 线色相按线路索引在色相环上取样，hStep 用线内点数做步长
    const hStep = 1 / feature.geometry.coordinates.length
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
  echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
