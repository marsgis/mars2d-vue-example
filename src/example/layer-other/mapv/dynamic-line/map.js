import * as mars2d from "mars2d"
const L = mars2d.L

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
  map.setView([30.41, 114.32], 11)

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
  return mars2d.Util.sendAjax({ url: "http://data.mars2d.cn/file/apidemo/wuhan-car.txt" })
    .then(function (rs) {
      rs = rs.data.split("\n")
      showMapVLayer(rs)
    })
    .catch(function (error) {
      console.log(error)
    })
}
function showMapVLayer(rs) {
  const data = []
  const timeData = []

  let maxLength = 0
  // leaflet只识别经纬度坐标，需要将数据中的米坐标转成经纬度坐标
  const projection = L.CRS.EPSG3857.projection

  for (let i = 0; i < rs.length; i++) {
    const item = rs[i].split(",")
    const coordinates = []
    if (item.length > maxLength) {
      maxLength = item.length
    }
    if (item.length < 2) {
      continue
    }
    for (let j = 0; j < item.length; j += 2) {
      // 需要将数据中的米坐标转成经纬度坐标
      const latLng = projection.unproject(L.point([item[j], item[j + 1]]))
      coordinates.push([latLng.lng, latLng.lat])
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: [latLng.lng, latLng.lat]
        },
        count: 1,
        time: j
      })
    }
    data.push({
      geometry: {
        type: "LineString",
        coordinates
      }
    })
  }
  // console.log(JSON.stringify(data));

  const dataSet1 = new this.mapv.DataSet(data)

  const options1 = {
    strokeStyle: "rgba(53,57,255,0.5)",
    shadowColor: "rgba(53,57,255,0.2)",
    shadowBlur: 3,
    lineWidth: 3.0,
    draw: "simple"
  }
  // 线图层
  const mapVLayer = new mars2d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer)

  const dataSet2 = new this.mapv.DataSet(timeData)
  const options2 = {
    fillStyle: "rgba(255, 250, 250, 0.2)",
    globalCompositeOperation: "lighter",
    size: 1.5,
    animation: {
      stepsRange: {
        start: 0,
        end: 100
      },
      trails: 3,
      duration: 5
    },
    draw: "simple"
  }
  // 动态轨迹图层
  const mapVLayer2 = new mars2d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer2)
}
