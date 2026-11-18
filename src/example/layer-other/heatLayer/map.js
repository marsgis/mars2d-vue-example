/**
 * 示例：热力图
 * 演示：请求在线热力点数据，用 mars2d.layer.HeatLayer 叠加成热力图，并按数据范围定位地图
 * API：mars2d.layer.HeatLayer、mars2d.Util.fetchJson、mars2d.Map#fitBounds
 * 要点：HeatLayer 坐标是 [纬度, 经度]（Leaflet 约定，与 ECharts 示例的 [经度, 纬度] 相反），第三个值是权重；minOpacity 是热力图的最小不透明度，gradient 的键是 0~1 的强度比例
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let heatLayer // 热力图层，卸载时移除（触发 onRemove 取消挂起的重绘动画帧）

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  showHeatLayer()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && heatLayer) {
    map.removeLayer(heatLayer) // HeatLayer.onRemove 会取消 requestAnimFrame 重绘并移除 canvas
  }
  heatLayer = null
  if (map) {
    map.destroy() // 释放地图 DOM、底图与事件监听
    map = null
  }
}

// ========== 4. 热力图层 ==========
// 显示热力图
function showHeatLayer() {
  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/heat.json"
  })
    .then((data) => {
      // 示例切换后请求可能才返回，此时地图已销毁，直接丢弃数据
      if (!map) {
        return
      }

      const mpts = []
      const arrdata = data.Data
      for (let i = 0; i < arrdata.length; i++) {
        const item = arrdata[i]
        // 后端字段 X/Y 是经纬度，HeatLayer 需要 [纬度, 经度, 权重] 顺序
        mpts.push([item.Y, item.X, item.Count])
      }

      // 热力图：radius/blur 用 HeatLayer 默认值，gradient 按强度比例着色
      heatLayer = new mars2d.layer.HeatLayer(mpts, {
        // radius: 20,
        // blur: 10,
        minOpacity: 0.3,
        gradient: { 0.4: "blue", 0.6: "cyan", 0.7: "lime", 0.8: "yellow", 1: "red" }
      })
      map.addLayer(heatLayer)

      map.fitBounds(mpts)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}
