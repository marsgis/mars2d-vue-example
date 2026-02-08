import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graphicLayer
const L = mars2d.L

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 8,
  center: { lng: 117.339478, lat: 34.966999 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 蓝色底图

  // 淮海市的区域图
  const geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    id: 21987,
    type: "GeoJsonLayer",
    name: "淮海经济区11市",
    url: "//data.mars2d.cn/file/geojson/huaihai.json",
    symbol: {
      styleOptions: {
        color: "#3388cc",
        opacity: 0.7,
        alphaPower: 1.3,
        length: "{gdp}"
      },
      styleField: "Name",
      styleFieldOptions: {
        济宁市: { color: "#D4AACE" },
        临沂市: { color: "#8DC763" },
        菏泽市: { color: "#F7F39A" },
        枣庄市: { color: "#F7F39A" },
        徐州市: { color: "#96F0F1" },
        宿迁市: { color: "#EAC9A8" },
        连云港市: { color: "#F7F39A" },
        商丘市: { color: "#D4AACE" },
        宿州市: { color: "#8DC763" },
        亳州市: { color: "#96F0F1" },
        淮北市: { color: "#EAC9A8" }
      }
    },
    show: true
  })
  map.addLayer(geoJsonLayer)

  // 创建Graphic图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/huaihai-jj.json"
  })
    .then((res) => {
      console.log(res)
      conventChartsData(res.data) // 单击显示的popup
      showYearZT(res.data) // 柱状图
      bindHaihuaiPopup()
    })
    .catch(function () {
      globalMsg("获取信息失败，请稍候再试")
    })

  map.on(mars2d.EventType.load, function (event) {
    console.log("矢量数据对象加载完成", event)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

/**
 * 展示某年的椎体
 */
function showYearZT(data) {
  const yearArr = Object.keys(data)
  const arr = data[yearArr[0]]

  for (let i = 0; i < arr.length; i += 1) {
    const attr = arr[i]
    const jwd = getJWDByName(attr.name)

    const num1 = attr["第一产业"]
    const num2 = attr["第二产业"]
    const num3 = attr["第三产业"]
    const numall = Number(num1 + num2 + num3).toFixed(2)
    const html = `${attr.name}<br/>
                        <span style="color:#63AEFF">第一产业：${num1}</span><br/>
                        <span style="color:#FFB861">第二产业：${num2}</span><br/>
                        <span style="color:#FF6D5D">第三产业：${num3}</span>`

    const p1 = L.latLng(jwd[1], jwd[0])

    // 添加图标点
    createZT(p1, html)

    // 添加文字
    const graphic = new mars2d.graphic.Label({
      latlng: L.latLng(jwd[1], jwd[0]),
      style: {
        text: numall,
        font_size: 14,
        font_family: "楷体",
        color: "#00ff00",
        outline: true,
        outlineColor: "#0000ff",
        outlineWidth: 1,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.TOP
      }
    })
    graphicLayer.addGraphic(graphic)
    graphic.bindTooltip(html)
  }
}

/**  创建图标点 */
function createZT(latlng, html) {
  const graphic = new mars2d.graphic.DivGraphic({
    latlng,
    style: {
      html: `<i class="fa fa-bar-chart-o" style="color:#00ff00;font-size:20px;"></i>`,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    }
  })
  graphicLayer.addGraphic(graphic)

  graphic.bindTooltip(html)

  return graphic
}

const cityPosition = [
  { name: "亳州", jwd: [116.203602, 33.496075] },
  { name: "商丘", jwd: [115.871509, 34.297084] },
  { name: "淮北", jwd: [116.688413, 33.689214] },
  { name: "宿州", jwd: [117.234682, 33.740035] },
  { name: "徐州", jwd: [117.70509, 34.350708] },
  { name: "宿迁", jwd: [118.559349, 33.807355] },
  { name: "连云港", jwd: [118.875445, 34.619808] },
  { name: "临沂", jwd: [118.026908, 35.262767] },
  { name: "枣庄", jwd: [117.320268, 35.072555] },
  { name: "济宁", jwd: [116.856599, 35.500232] },
  { name: "菏泽", jwd: [115.716086, 35.05629] }
]

/**
 * 根据名称获取坐标
 */
function getJWDByName(name) {
  for (let i = 0; i < cityPosition.length; i += 1) {
    const item = cityPosition[i]
    if (item.name === name) {
      return item.jwd
    }
  }
  return []
}

// ================以下是单击显示的echarst图表的相关代码===============
let arrYear
let objCity = {}

// 转换值
function conventChartsData(arrOld) {
  console.log("转换前数据=>", arrOld)

  arrYear = Object.keys(arrOld) // [年份]

  objCity = {} // 十一个城市对应的各年度数据

  for (let a = 0; a < arrYear.length; a++) {
    const arrCity = arrOld[arrYear[a]] // 指定某年的11个城市对应数据

    // 循环十次
    for (let b = 0; b < arrCity.length; b++) {
      const item = arrCity[b]

      if (!objCity[item.code]) {
        objCity[item.code] = []
      }
      objCity[item.code].push(item.GDP)
    }
  }

  console.log("转换完成的数据=>", objCity)
}

function bindHaihuaiPopup() {
  const layerHuaihai = map.getLayerById(21987) // 获取config.json中对应图层
  // 在layer上绑定Popup单击弹窗
  layerHuaihai.bindPopup(
    `<div class="gdpView">
          <div class="gdpCharts" id="gdpCharts"></div>
        </div>`,
    {
      className: "gdpViewPopup",
      offset: 40
    }
  )

  let gdpCharts
  layerHuaihai.on(mars2d.EventType.popupopen, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("图层上打开了popup", container)

    const option = getCityChartsOptions(event.layer?.attr)
    if (!option) {
      return
    }
    gdpCharts = echarts.init(container.querySelector("#gdpCharts"))
    gdpCharts.setOption(option)
  })

  layerHuaihai.on(mars2d.EventType.popupclose, function (event) {
    const container = event.popup._container // popup对应的DOM
    console.log("图层上移除了popup", container)

    // gdpCharts.dispose();
    gdpCharts = null
  })
}

function getCityChartsOptions(attr) {
  const code = attr.code.slice(0, 4)

  const arrGDPvalues = objCity[code]
  if (!arrGDPvalues) {
    globalMsg(attr.Name + " 无经济数据")
    return
  }

  // arrGDPvalues  是点击的城市的数值,需要以[b,0,value]的方式重新排列
  const arrData = []
  for (let b = 0; b < arrGDPvalues.length; b++) {
    arrData[b] = [b, 0, arrGDPvalues[b]]
  }

  const option = {
    visualMap: {
      max: 4500,
      show: false,
      inRange: {
        color: ["#32C5E9", "#67E0E3", "#FFDB5C", "#37A2DA", "#9FE6B8"]
      }
    },
    title: {
      text: attr.Name + "   近五年GDP（亿元）",
      top: "10",
      left: "5",
      textStyle: {
        color: "white",
        fontSize: "17",
        fontWidth: "normal"
      }
    },
    tooltip: {
      show: "true",
      trigger: "item",
      showContent: "true",
      position: "top",
      textStyle: {
        fontSize: "12",
        color: "black"
      },
      formatter: function formatter(params) {
        return "GDP:" + params.data[2]
      }
    },
    // x轴是横向，是时间
    xAxis3D: {
      type: "category",
      data: arrYear,
      nameTextStyle: {
        color: "rgb(0, 0, 0, 0.1)"
      },
      // splitLine不可见时仅仅线不可见
      splitLine: {
        show: false
      }
    },
    // y轴被缩小
    yAxis3D: {
      type: "category",
      data: [" "],
      nameTextStyle: {
        color: "rgb(0, 0, 0, 0.1)"
      },
      splitLine: {
        show: false
      }
    },
    // z轴是gdp的值
    zAxis3D: {
      type: "value",
      name: "GDP",
      axisLine: {
        lineStyle: {
          color: "rgb(0, 0, 0, 0.1)"
        }
      },
      nameTextStyle: {
        color: "white",
        fontSize: "18"
      },
      nameGap: "50"
    },
    grid3D: {
      boxWidth: 180, // 缩大放小x轴
      boxDepth: 10, // 缩大放小y轴
      top: "20",
      // left: '50',
      // 視角的設置
      viewControl: {
        alpha: 8,
        beta: 0,
        distance: 162,
        center: [-20, 0, 0]
      },
      axisLabel: {
        textStyle: {
          color: "white",
          fontSize: 15
        }
      },
      axisPointer: {
        // 坐标轴指示线，就是鼠标移入时，指向x轴，y轴的线
        show: false
      }
    },
    series: [
      {
        type: "bar3D",
        data: arrData,
        shading: "lambert",
        label: {
          position: "top",
          show: true,
          color: "white"
        },
        emphasis: {
          label: {
            textStyle: {
              color: "white",
              fontSize: "18"
            }
          }
        }
      }
    ]
  }
  return option
}
