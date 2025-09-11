import * as mars2d from "mars2d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 蓝色底图
  map.setView([33.468108, 112.939453], 5)

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
    url: "http://data.mars2d.cn/file/geojson/mapvchina.json"
  })
    .then((data) => {
      showMapVLayer(data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}
function showMapVLayer(geojson) {
  map.setView([33.468108, 112.939453], 5)

  const geojsonOptions = {
    gradient: {
      0: "rgba(55, 50, 250, 0.4)",
      1: "rgba(55, 50, 250, 1)"
    },
    max: 354551,
    draw: "intensity"
  }

  let geojsonDataSet = this.mapv.geojson.getDataSet(geojson)

  const to = "北京"

  const qianxi = new this.mapv.DataSet([
    {
      from: "河北",
      count: 354551,
      to
    },
    {
      from: "天津",
      count: 97323,
      to
    },
    {
      from: "山东",
      count: 28664,
      to
    },
    {
      from: "山西",
      count: 16650,
      to
    },
    {
      from: "辽宁",
      count: 14379,
      to
    },
    {
      from: "河南",
      count: 10980,
      to
    },
    {
      from: "内蒙古自治区",
      count: 9603,
      to
    },
    {
      from: "江苏",
      count: 4536,
      to
    },
    {
      from: "上海",
      count: 3556,
      to
    },
    {
      from: "广东",
      count: 2600,
      to
    }
  ])

  const qianxiData = qianxi.get()

  const lineData = []
  const pointData = []
  const textData = []
  const timeData = []

  const citys = {}

  for (let i = 0; i < qianxiData.length; i++) {
    const fromCenter = this.mapv.utilCityCenter.getCenterByCityName(qianxiData[i].from)
    const toCenter = this.mapv.utilCityCenter.getCenterByCityName(qianxiData[i].to)
    if (!fromCenter || !toCenter) {
      continue
    }
    citys[qianxiData[i].from] = qianxiData[i].count
    citys[qianxiData[i].to] = 100
    pointData.push({
      geometry: {
        type: "Point",
        coordinates: [fromCenter.lng, fromCenter.lat]
      }
    })
    pointData.push({
      geometry: {
        type: "Point",
        coordinates: [toCenter.lng, toCenter.lat]
      }
    })
    textData.push({
      geometry: {
        type: "Point",
        coordinates: [fromCenter.lng, fromCenter.lat]
      },
      text: qianxiData[i].from
    })
    textData.push({
      geometry: {
        type: "Point",
        coordinates: [toCenter.lng, toCenter.lat]
      },
      text: qianxiData[i].to
    })

    const curve = this.mapv.utilCurve.getPoints([fromCenter, toCenter])

    for (let j = 0; j < curve.length; j++) {
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: curve[j]
        },
        count: 1,
        time: j
      })
    }

    lineData.push({
      geometry: {
        type: "LineString",
        coordinates: curve
        // coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
      },
      count: 30 * Math.random()
    })
  }

  const data = geojsonDataSet.get({
    filter: function (item) {
      if (!citys[item.name]) {
        return false
      }

      item.count = citys[item.name]
      return true
    }
  })
  geojsonDataSet = new this.mapv.DataSet(data)
  const mapVLayer = new mars2d.layer.MapVLayer(geojsonOptions, geojsonDataSet)
  map.addLayer(mapVLayer)

  const textDataSet = new this.mapv.DataSet(textData)

  const textOptions = {
    draw: "text",
    font: "14px Arial",
    fillStyle: "white",
    shadowColor: "yellow",
    shadowBlue: 10,
    zIndex: 11,
    shadowBlur: 10
  }
  const textmapVLayer = new mars2d.layer.MapVLayer(textOptions, textDataSet)
  map.addLayer(textmapVLayer)

  const lineDataSet = new this.mapv.DataSet(lineData)
  const lineOptions = {
    strokeStyle: "rgba(255, 250, 50, 0.8)",
    shadowColor: "rgba(255, 250, 50, 1)",
    shadowBlur: 20,
    lineWidth: 2,
    zIndex: 100,
    draw: "simple"
  }
  const linemapVLayer = new mars2d.layer.MapVLayer(lineOptions, lineDataSet)
  map.addLayer(linemapVLayer)

  const pointOptions = {
    fillStyle: "rgba(254,175,3,0.7)",
    shadowColor: "rgba(55, 50, 250, 0.5)",
    shadowBlur: 10,
    size: 5,
    zIndex: 10,
    draw: "simple"
  }
  const pointDataSet = new this.mapv.DataSet(pointData)
  const pointmapVLayer = new mars2d.layer.MapVLayer(pointOptions, pointDataSet)
  map.addLayer(pointmapVLayer)

  const timeDataSet = new this.mapv.DataSet(timeData)
  const timeOptions = {
    fillStyle: "rgba(255, 250, 250, 0.5)",
    zIndex: 200,
    size: 2.5,
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 50
      },
      trails: 10,
      duration: 2
    },
    draw: "simple"
  }

  const timemapVLayer = new mars2d.layer.MapVLayer(timeOptions, timeDataSet)
  map.addLayer(timemapVLayer)
}
