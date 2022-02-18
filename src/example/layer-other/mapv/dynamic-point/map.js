import * as mars2d from "mars2d"
// import mapv from "mars2d-mapv"

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

  map.basemap = 2017 // 切换到蓝色底图
  map.setView([38.028658, 105.403119], 4)

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
    url: "http://data.mars2d.cn/file/apidemo/weibo2.json"
  })
    .then((data) => {
      showMapVLayer(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}
function showMapVLayer(rs) {
  const data = []
  for (let i = 0; i < rs[0].length; i++) {
    const geoCoord = rs[0][i].geoCoord
    data.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      },
      time: Math.random() * 10
    })
  }

  const dataSet = new this.mapv.DataSet(data)
  const options = {
    fillStyle: "rgba(255, 250, 50, 0.6)",
    // shadowColor: 'rgba(255, 250, 50, 0.5)',
    // shadowBlur: 3,
    updateCallback: function (time) {
      time = time.toFixed(2)
    },
    size: 3,
    draw: "simple",
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 10
      },
      trails: 1,
      duration: 6
    }
  }
  const mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
