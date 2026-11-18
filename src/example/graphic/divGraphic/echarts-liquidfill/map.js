/**
 * 示例：动态水球点
 * 演示：DivGraphic 内放一个空 div，等矢量对象加入图层（EventType.add）拿到 DOM 后用 echarts.init 渲染 echarts-liquidfill 水球
 * API：mars2d.graphic.DivGraphic、mars2d.EventType.add、echarts.init
 * 要点：必须等 graphic 的 DOM 创建（add 事件）后再 init，太早取不到 container；echarts-liquidfill 由 example.json 的 libs 加载到 window 上；实例要在卸载时统一 dispose，否则 DOM 移除后实例仍驻留内存
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graphicLayer

const chartList = [] // 已创建的 echarts 实例，示例切走时统一释放

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 9,
  center: { lng: 116.976929, lat: 39.240763 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建div数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 添加矢量数据
  addGraphic([38.841847, 115.699768], { value: 0.53, color: "#fb980b" })
  addGraphic([39.863371, 116.567688], { value: 0.45, color: "#00ff00" })
  addGraphic([39.520992, 118.407898], { value: 0.35, color: "#00ffff" })
  addGraphic([38.300715, 117.064819], { value: 0.21, color: "#ff0000" })
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 清空面板通过 eventTarget 注册的监听，避免旧面板回调残留
  eventTarget.off()
  // 先释放 echarts 实例：DivGraphic 的 DOM 会随地图销毁，但 echarts 实例还在全局注册表中
  chartList.forEach((chart) => chart.dispose())
  chartList.length = 0

  if (map) {
    map.destroy() // 一并释放图层与 DivGraphic
    map = null
  }
  graphicLayer = null
}

// ========== 4. 矢量对象与图表 ==========
function addGraphic(latlng, attr) {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng,
    style: {
      html: `<div style="width: 80px;height:80px;"></div>`,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr
  })
  // graphic 加入图层后才有 container DOM，所以在这个事件里初始化 echarts
  graphic.on(mars2d.EventType.add, function (e) {
    const dom = e.target.container.firstChild
    const attr = e.target.attr

    const liquidfillchartChart = echarts.init(dom)
    chartList.push(liquidfillchartChart)

    // 参考API：https://github.com/ecomfe/echarts-liquidfill
    // 参考示例：https://www.makeapie.com/explore.html#tags=liquidFill~sort=rank~timeframe=all~author=all
    const option = {
      series: [
        {
          type: "liquidFill",
          radius: "100%",
          outline: { show: false },
          color: [attr.color],
          data: [attr.value],
          label: {
            normal: {
              color: "#294D99",
              insideColor: "#fff",
              fontSize: 20
            }
          }
        }
      ]
    }
    liquidfillchartChart.setOption(option)
  })
  graphicLayer.addGraphic(graphic)
}
