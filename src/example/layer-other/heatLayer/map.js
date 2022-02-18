import * as mars2d from "mars2d"

let map

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
  showHeatLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 显示热力图
function showHeatLayer() {
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/heat.json"
  })
    .then((data) => {
      const mpts = []
      const arrdata = data.Data
      for (let i = 0; i < arrdata.length; i++) {
        const item = arrdata[i]
        mpts.push([item.Y, item.X, item.Count])
      }

      // 热点图
      const layerWork = new mars2d.layer.HeatLayer(mpts, {
        // radius: 20,
        // blur: 10,
        minOpacity: 0.3,
        gradient: { 0.4: "blue", 0.6: "cyan", 0.7: "lime", 0.8: "yellow", 1: "red" }
      })
      map.addLayer(layerWork)

      map.fitBounds(mpts)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}
