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

  map.basemap = 2017 // 切换到蓝色底图
  map.setView([36.64, 108.15], 4)

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
  return mars2d.Util.sendAjax({ url: "http://data.mars2d.cn/file/apidemo/qianxi-time.txt" })
    .then(function (rs) {
      showMapVLayer(rs.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function showMapVLayer(rs) {
  const data = []
  const timeData = []

  function curive(fromPoint, endPoint, n) {
    const delLng = (endPoint.lng - fromPoint.lng) / n
    const delLat = (endPoint.lat - fromPoint.lat) / n

    for (let i = 0; i < n; i++) {
      const pointNLng = fromPoint.lng + delLng * i
      const pointNLat = fromPoint.lat + delLat * i
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: [pointNLng, pointNLat]
        },
        count: 1,
        time: i
      })
    }
  }

  const items = rs.split("|")
  let cityBegin
  for (let i = 0; i < items.length; i++) {
    const itemArr = items[i].split(/\n/)
    for (let k = 0; k < itemArr.length; k++) {
      if (itemArr[k]) {
        const item = itemArr[k].split(/\t/)
        if (item[0] === "起点城市" || item[0] === "迁出城市") {
          cityBegin = item[1]
        }
        if (item[0] !== "起点城市" || (item[0] !== "迁出城市" && item.length > 1)) {
          const cityCenter1 = this.mapv.utilCityCenter.getCenterByCityName(item[0].replace(/市|省/, ""))
          const cityCenter2 = this.mapv.utilCityCenter.getCenterByCityName(cityBegin.replace(/市|省/, "").trim())
          if (cityCenter1 && cityCenter2) {
            if (Math.random() > 0.7) {
              curive(cityCenter2, cityCenter1, 50)
            }
            data.push({
              geometry: {
                type: "LineString",
                coordinates: [
                  [cityCenter1.lng, cityCenter1.lat],
                  [cityCenter2.lng, cityCenter2.lat]
                ]
              },
              count: 100 * Math.random()
            })
          }
        }
      }
    }
  }
  console.log(data)
  const dataSet1 = new this.mapv.DataSet(data)
  const options1 = {
    strokeStyle: "rgba(55, 50, 250, 0.3)",
    globalCompositeOperation: "lighter",
    shadowColor: "rgba(55, 50, 250, 0.5)",
    methods: {
      click: function (item) {
        console.log("点击了图层", item)
      }
    },
    gradient: { 0: "rgba(55, 50, 250, 0)", 1: "rgba(55, 50, 250, 1)" },
    lineWidth: 0.2,
    draw: "intensity"
  }
  // 线图层
  const mapVLayer = new mars2d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer)

  const dataSet2 = new this.mapv.DataSet(timeData)
  const options2 = {
    fillStyle: "rgba(255, 250, 250, 0.9)",
    size: 0.5,
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 50
      },
      trails: 1,
      duration: 5
    },
    draw: "simple"
  }
  // 动画图层
  const mapVLayer2 = new mars2d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer2)
}
