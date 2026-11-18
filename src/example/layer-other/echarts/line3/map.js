/**
 * 示例：流向动态效果
 * 演示：用 EchartsLayer 的 lines 绘制合肥/深圳/乌鲁木齐飞向北京的动态流向线（image:// 图标作为沿线飞行符号），并用 effectScatter 显示起点与终点
 * API：mars2d.layer.EchartsLayer、mars2d.Map#setView
 * 要点：effect.symbol 用 "image://img/marker/..." 相对路径，图片由 iframe 页面所在 public 目录提供，改路径要确认文件存在；animation: false 关闭 ECharts 整体动画，避免与 effect 流光的逐帧动画叠加；coords 是 [经度, 纬度]
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
  map.setView([33.652, 107.661], 4)

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
  const beijinCoord = [116.407395, 39.904211]

  const geoCoorddata = {
    合肥: [117.399043, 31.741401],
    深圳: [114.057865, 22.543096],
    乌鲁木齐: [87.405386, 41.779595]
  }

  const symbolPoint = "image://img/marker/symbol1.png"
  const linePoint = "image://img/marker/linePoint1.png"

  const pointArr = []
  for (const key in geoCoorddata) {
    pointArr.push({
      name: key,
      value: geoCoorddata[key],
      symbol: symbolPoint
    })
  }

  const options = {
    animation: false,

    series: [
      {
        name: "",
        type: "lines",
        coordinateSystem: "mars2dMap",
        zlevel: 1,
        data: [
          {
            name: "合肥",
            toname: "北京",
            coords: [geoCoorddata["合肥"], beijinCoord]
          },
          {
            name: "深圳",
            toname: "北京",
            coords: [geoCoorddata["深圳"], beijinCoord]
          },
          {
            name: "乌鲁木齐",
            toname: "北京",
            coords: [geoCoorddata["乌鲁木齐"], beijinCoord]
          }
        ],
        // 线上面的动态特效
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: linePoint,
          symbolSize: [10, 30],
          period: 4
        },
        lineStyle: {
          normal: {
            width: 1,
            color: "#ffffff",
            curveness: 0.2
          }
        }
      },
      {
        type: "effectScatter",
        coordinateSystem: "mars2dMap",
        zlevel: 3,
        data: [
          {
            name: "北京",
            value: beijinCoord.concat(200)
          }
        ],
        rippleEffect: {
          period: 10,
          scale: 5,
          brushType: "fill"
        }
      },
      {
        type: "effectScatter",
        coordinateSystem: "mars2dMap",
        symbolSize: [20, 20],
        symbolOffset: [0, -10],
        zlevel: 3,
        circular: {
          rotateLabel: true
        },
        label: {
          normal: {
            show: true,
            position: "bottom",
            formatter: "{b}",
            fontSize: 18,
            color: "#fff",
            textBorderColor: "#2aa4e8",
            offset: [0, 20]
          }
        },
        itemStyle: {
          normal: {
            shadowColor: "none"
          }
        },
        data: pointArr
      }
    ]
  }

  // 创建Echarts图层
  echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)
}
