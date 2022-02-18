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

  map.setView([39.93, 116.402], 12)

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
    url: "http://data.mars2d.cn/file/geojson/beijing-village.json"
  })
    .then((data) => {
      showMapVLayer(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

function showMapVLayer(geojson) {
  const dataSet = new this.mapv.DataSet(geojson)

  const options = {
    fillStyle: "rgba(255, 80, 53, 0.8)",
    strokeStyle: "rgba(250, 255, 53, 0.8)",
    size: 3,
    lineWidth: 1,
    draw: "simple"
  }
  const mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
