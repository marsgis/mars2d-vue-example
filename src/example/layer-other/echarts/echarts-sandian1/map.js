import * as mars2d from "mars2d"

let map
let echartsLayer

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

  echartsLayer = showEchartsLayer()

}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {

  map = null
}


function updateColor(color) {
  echartsLayer.setEchartsOption({
    series: [
      {
        itemStyle: { normal: { color } }
      }
    ]
  })
}


function showEchartsLayer() {
  const data = [
    { name: "六安市", value: 112, location: [116.3123, 31.8329] },
    { name: "安庆市", value: 424, location: [116.7517, 30.5255] },
    { name: "滁州市", value: 76, location: [118.1909, 32.536] },
    { name: "宣城市", value: 45, location: [118.8062, 30.6244] },
    { name: "阜阳市", value: 234, location: [115.7629, 32.9919] },
    { name: "宿州市", value: 110, location: [117.5208, 33.6841] },
    { name: "黄山市", value: 98, location: [118.0481, 29.9542] },
    { name: "巢湖市", value: 71, location: [117.7734, 31.4978] },
    { name: "亳州市", value: 165, location: [116.1914, 33.4698] },
    { name: "池州市", value: 12, location: [117.3889, 30.2014] },
    { name: "合肥市", value: 232, location: [117.29, 32.0581] },
    { name: "蚌埠市", value: 123, location: [117.4109, 33.1073] },
    { name: "芜湖市", value: 73, location: [118.3557, 31.0858] },
    { name: "淮北市", value: 16, location: [116.6968, 33.6896] },
    { name: "淮南市", value: 75, location: [116.7847, 32.7722] },
    { name: "马鞍山市", value: 45, location: [118.6304, 31.5363] },
    { name: "铜陵市", value: 93, location: [117.9382, 30.9375] }
  ]
  const brcolor = "#751b87"

  // 纬度做偏移处理,避免重叠
  if (data.length > 1) {
    data.sort(function (a, b) {
      return b.location[1] - a.location[1]
    })
    for (let i = 1; i < data.length; i++) {
      const thisItem = data[i].location

      let ispy = false
      for (let j = 0; j < i; j++) {
        const lastItem = data[j].location
        const offX = Math.abs(lastItem[0] - thisItem[0])
        const offY = Math.abs(lastItem[1] - thisItem[1])
        if (offX < 0.025 && offY < 0.005) {
          ispy = true
          break
        }
      }

      if (ispy) {
        thisItem[1] -= 0.006 // 偏移纬度
      }

      // console.log(data[i].name +','+thisItem.join(",")+','+ispy+','+offX+','+offY);
    }
  }

  let sum = 0
  const dataVals = []

  const dataLatlngs = []
  for (let i = 0; i < data.length; i++) {
    sum += data[i].value

    dataVals.push({
      name: data[i].name,
      value: data[i].location.concat(data[i].value)
    })

    dataLatlngs.push([data[i].location[1], data[i].location[0]])
  }
  if (dataLatlngs.length > 0) {
    map.stop()
    map.fitBounds(dataLatlngs)
  }

  const options = {
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicInOut",
    animationDurationUpdate: 1000,
    animationEasingUpdate: "cubicInOut",
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        type: "effectScatter",
        coordinateSystem: "mars2dMap",
        data: dataVals,
        symbolSize: function (val) {
          if (sum === 0) {
            return 8
          }

          const num = (val[2] / sum) * 150
          return Math.max(num, 8)
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke"
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: true
          }
        },
        tooltip: {
          formatter: function (params, ticket, callback) {
            if (params.value[2] <= 0) {
              return params.name
            } else {
              return params.name + " ： " + params.value[2]
            }
          }
        },
        itemStyle: {
          normal: {
            color: brcolor,
            shadowBlur: 60,
            shadowColor: "#cccccc"
          }
        },
        zlevel: 1
      }
    ]
  }

  // 创建Echarts图层
  const echartsLayer = new mars2d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)

  echartsLayer.on("click", function (event) {
    console.log("单击了图层", event)
  })

  return echartsLayer
}
