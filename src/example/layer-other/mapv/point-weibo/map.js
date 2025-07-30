import * as mars2d from "mars2d"
// import mapv from "mars2d-mapv"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.basemap = 2017 // 切换到蓝色底图
  map.setView([38.028658, 105.403119], 5)

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
    url: "http://data.mars2d.cn/file/apidemo/weibo.json"
  })
    .then((data) => {
      showMapVLayer(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

function showMapVLayer(rs) {
  const data1 = []
  const data2 = []
  const data3 = []
  const data4 = []
  for (let i = 0; i < rs[0].length; i++) {
    const geoCoord = rs[0][i].geoCoord
    data1.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      }
    })
  }

  for (let i = 0; i < rs[1].length; i++) {
    const geoCoord = rs[1][i].geoCoord
    data2.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      },
      time: Math.random() * 10
    })
  }

  for (let i = 0; i < rs[2].length; i++) {
    const geoCoord = rs[2][i].geoCoord
    data3.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      }
    })
  }

  const dataSet = new this.mapv.DataSet(data1)
  const options = {
    fillStyle: "rgba(200, 200, 0, 0.8)",
    bigData: "Point",
    size: 0.7,
    draw: "simple"
  }
  const mapVLayer = new mars2d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)

  const dataSet4 = new this.mapv.DataSet(data2)
  const options4 = {
    fillStyle: "rgba(255, 250, 0, 0.8)",
    size: 0.7,
    bigData: "Point",
    draw: "simple"
  }
  const mapVLayer2 = new mars2d.layer.MapVLayer(options4, dataSet4)
  map.addLayer(mapVLayer2)

  const dataSet2 = new this.mapv.DataSet(data3)
  const options2 = {
    fillStyle: "rgba(255, 250, 250, 0.6)",
    size: 0.7,
    bigData: "Point",
    draw: "simple"
  }
  const mapVLayer3 = new mars2d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer3)

  const dataSet3 = new this.mapv.DataSet(data2)
  const options3 = {
    fillStyle: "rgba(255, 250, 250, 0.9)",
    size: 1.1,
    draw: "simple",
    bigData: "Point",
    animation: {
      stepsRange: {
        start: 0,
        end: 10
      },
      trails: 1,
      duration: 6
    }
  }

  const mapVLayer4 = new mars2d.layer.MapVLayer(options3, dataSet3)
  map.addLayer(mapVLayer4)
}
