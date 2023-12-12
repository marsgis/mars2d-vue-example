import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let queryMapserver
let drawGraphic
let geoJsonLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  center: { lat: 31.837532, lng: 117.202653, alt: 10586, heading: 0, pitch: -90 }
}

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 查询服务
  queryMapserver = new mars2d.query.QueryArcServer({
    url: "http://server.mars2d.cn/arcgis/rest/services/mars/guihua/MapServer/0"
  })

  // 用于显示查询结果（geojson）的图层
  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "规划用地",
    symbol: {
      type: "polygon",
      styleOptions: {
        fillColor: "rgba(205, 233, 247, 0.7)" // 填充颜色
      },
      styleField: "用地编号",
      styleFieldOptions
    },
    // popup: "all",
    popup: "名称：{用地名称}<br />编号：{用地编号}<br />类型：{规划用地}<br />面积：{muArea}亩"
  })
  map.addLayer(geoJsonLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 框选查询 矩形
export function drawRectangle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fillColor: "#00ffff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 框选查询   圆
export function drawCircle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      fillColor: "#00ffff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 框选查询   多边行
export function drawPolygon() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: "#00ffff",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 清除数据
export function clearAll() {
  drawGraphic = null
  map.graphicLayer.clear()
  geoJsonLayer.clear()
}

// 查询数据
export function queryData(queryVal) {
  if (drawGraphic == null) {
    globalMsg("请绘制查询区域！")
    return
  }
  if (!queryVal) {
    globalMsg("请输入查询关键词！")
    return
  }
  queryMapserver.query({
    column: "用地名称",
    text: queryVal,
    graphic: drawGraphic,
    page: false,
    success: (result) => {
      if (result.count === 0) {
        globalMsg("未查询到相关记录！")
        return
      }
      console.log("查询到的记录", result)

      const drawGeoJSON = drawGraphic.toGeoJSON({ outline: true })

      const arrArea = []
      const arrFeatures = result.geojson.features
      for (let i = 0; i < arrFeatures.length; i++) {
        const feature = arrFeatures[i]

        try {
          const geojsonNew = turf.intersect(drawGeoJSON, feature) // 切割

          if (geojsonNew) {
            feature.geometry = geojsonNew.geometry
          }
        } catch (e) {
          globalMsg("切割异常，请重新切割")
          clearAll()
        }

        const area = turf.area(feature) || feature.properties.Shape_Area || 0
        feature.properties.muArea = mars2d.Util.formatNum(area * 0.0015, 2) // 平方米转亩

        // 需要统计的数据
        arrArea.push({
          type: feature.properties.用地名称,
          area: feature.properties.muArea
        })
      }

      // 显示数据
      geoJsonLayer.load({ data: result.geojson })
      calculateArea(arrArea)
    },
    error: (error, msg) => {
      console.log("服务访问错误", error)
      globalAlert(msg, "服务访问错误")
    }
  })
}

// 统计面积数据并按表格图表来展示
function calculateArea(arr) {
  console.log("计算前数据", arr)

  const objTemp = {}
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    if (!objTemp[item.type]) {
      objTemp[item.type] = { area: 0, count: 0 }
    }

    objTemp[item.type].area += item.area
    objTemp[item.type].count++
  }

  const arrTable = [] // 类型+面积+数量
  for (const type in objTemp) {
    const area = mars2d.Util.formatNum(objTemp[type].area, 2)
    arrTable.push({ type, area, count: objTemp[type].count })
  }
  eventTarget.fire("loadOk", { list: arrTable })
}

// 规划面着色配置
const styleFieldOptions = {
  A1: {
    // 行政办公用地
    color: "rgba(255,127,159,0.9)"
  },
  A2: {
    // 文化设施用地
    color: "rgba(255,159,127,0.9)"
  },
  A22: {
    // 文化活动用地
    color: "rgba(255,159,127,0.9)"
  },
  A3: {
    // 教育科研用地
    color: "rgba(255,127,191,0.9)"
  },
  A31: {
    // 高等院校用地
    color: "rgba(255,127,191,0.9)"
  },
  A32: {
    // 中等专业学校用地
    color: "rgba(255,127,191,0.9)"
  },
  A33: {
    // 中小学用地
    color: "rgba(255,255,127,0.9)"
  },
  A34: {
    // 特殊教育用地
    color: "rgba(255,127,191,0.9)"
  },
  A35: {
    // 科研用地
    color: "rgba(255,127,191,0.9)"
  },
  A4: {
    // 体育用地
    color: "rgba(255,127,0,0.9)"
  },
  A41: {
    // 体育场馆用地
    color: "rgba(255,127,0,0.9)"
  },
  A5: {
    // 医疗卫生用地
    color: "rgba(255,127,127,0.9)"
  },
  A51: {
    // 医院用地
    color: "rgba(255,127,127,0.9)"
  },
  A52: {
    // 卫生防疫用地
    color: "rgba(255,127,127,0.9)"
  },
  A59: {
    // 其他医疗卫生用地
    color: "rgba(255,127,127,0.9)"
  },
  A6: {
    // 社会福利用地
    color: "rgba(165,82,103,0.9)"
  },
  A7: {
    // 文物古迹用地
    color: "rgba(165,41,0,0.9)"
  },
  A9: {
    // 宗教用地
    color: "rgba(165,82,103,0.9)"
  },
  B: {
    // 商业服务业设施用地
    color: "rgba(255,0,63,0.9)"
  },
  B1: {
    // 商业用地
    color: "rgba(255,0,63,0.9)"
  },
  B11: {
    // 零售商业用地
    color: "rgba(255,0,63,0.9)"
  },
  B12: {
    // 批发市场用地
    color: "rgba(255,0,63,0.9)"
  },
  B13: {
    // 餐饮用地
    color: "rgba(255,0,63,0.9)"
  },
  B14: {
    // 旅馆用地
    color: "rgba(255,0,63,0.9)"
  },
  B2: {
    // 商务用地
    color: "rgba(255,0,63,0.9)"
  },
  B21: {
    // 金融保险用地
    color: "rgba(255,0,63,0.9)"
  },
  B29: {
    // 其他商务用地
    color: "rgba(255,0,63,0.9)"
  },
  B3: {
    // 娱乐康体用地
    color: "rgba(255,159,127,0.9)"
  },
  B31: {
    // 娱乐用地
    color: "rgba(255,159,127,0.9)"
  },
  B32: {
    // 康体用地
    color: "rgba(255,159,127,0.9)"
  },
  B4: {
    // 公用设施营业网点用地
    color: "rgba(255,159,127,0.9)"
  },
  B41: {
    // 加油加气站用地
    color: "rgba(255,159,127,0.9)"
  },
  B9: {
    // 其他服务设施用地
    color: "rgba(255,159,127,0.9)"
  },
  BR: {
    // 商住混合用地
    color: "rgba(255,0,63,0.9)"
  },
  E1: {
    // 水域
    color: "rgba(127,255,255,0.9)"
  },
  E2: {
    // 农林用地
    color: "rgba(41,165,0,0.9)"
  },
  E9: {
    // 其他非建设用地
    color: "rgba(127,127,63,0.9)"
  },
  G: {
    // 绿地与广场用地
    color: "rgba(0,127,0,0.9)"
  },
  G1: {
    // 公园绿地
    color: "rgba(0,255,63,0.9)"
  },
  G2: {
    // 防护绿地
    color: "rgba(0,127,0,0.9)"
  },
  G3: {
    // 广场用地
    color: "rgba(128,128,128,0.9)"
  },
  H: {
    // 建设用地
    color: "rgba(165,124,0,0.9)"
  },
  H1: {
    // 城乡居民点建设用地
    color: "rgba(165,124,0,0.9)"
  },
  H14: {
    // 村庄建设用地
    color: "rgba(165,165,82,0.9)"
  },
  H2: {
    // 区域交通设施用地
    color: "rgba(192,192,192,0.9)"
  },
  H21: {
    // 铁路用地
    color: "rgba(192,192,192,0.9)"
  },
  H22: {
    // 公路用地
    color: "rgba(192,192,192,0.9)"
  },
  H23: {
    // 港口用地
    color: "rgba(192,192,192,0.9)"
  },
  H3: {
    // 区域公共设施用地
    color: "rgba(82,165,82,0.9)"
  },
  H4: {
    // 特殊用地
    color: "rgba(47,76,38,0.9)"
  },
  H41: {
    // 军事用地
    color: "rgba(47,76,38,0.9)"
  },
  H42: {
    // 安保用地
    color: "rgba(47,76,38,0.9)"
  },
  H9: {
    // 其他建设用地
    color: "rgba(165,165,82,0.9)"
  },
  M: {
    // 工业用地
    color: "rgba(127,95,63,0.9)"
  },
  M1: {
    // 一类工业用地
    color: "rgba(127,95,63,0.9)"
  },
  M2: {
    // 二类工业用地
    color: "rgba(76,57,38,0.9)"
  },
  M4: {
    // 农业服务设施用地
    color: "rgba(153,38,0,0.9)"
  },
  R: {
    // 居住用地
    color: "rgba(255,255,0,0.9)"
  },
  R1: {
    // 一类居住用地
    color: "rgba(255,255,127,0.9)"
  },
  R2: {
    // 二类居住用地
    color: "rgba(255,255,0,0.9)"
  },
  R21: {
    // 住宅用地
    color: "rgba(255,255,0,0.9)"
  },
  R22: {
    // 服务设施用地
    color: "rgba(255,255,0,0.9)"
  },
  RB: {
    // 商住混合用地
    color: "rgba(255,191,0,0.9)"
  },
  S: {
    // 道路与交通设施用地
    color: "rgba(128,128,128,0.9)"
  },
  S2: {
    // 城市轨道交通用地
    color: "rgba(128,128,128,0.9)"
  },
  S3: {
    // 交通枢纽用地
    color: "rgba(192,192,192,0.9)"
  },
  S4: {
    // 交通场站用地
    color: "rgba(128,128,128,0.9)"
  },
  S41: {
    // 公共交通场站用地
    color: "rgba(128,128,128,0.9)"
  },
  S42: {
    // 社会停车场用地
    color: "rgba(128,128,128,0.9)"
  },
  S9: {
    // 其他交通设施用地
    color: "rgba(63,111,127,0.9)"
  },
  U: {
    // 公用设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U1: {
    // 供应设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U11: {
    // 供水用地
    color: "rgba(0,95,127,0.9)"
  },
  U12: {
    // 供电用地
    color: "rgba(0,95,127,0.9)"
  },
  U13: {
    // 供燃气用地
    color: "rgba(0,95,127,0.9)"
  },
  U14: {
    // 供热用地
    color: "rgba(0,95,127,0.9)"
  },
  U15: {
    // 通信用地
    color: "rgba(0,95,127,0.9)"
  },
  U2: {
    // 环境设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U21: {
    // 排水用地
    color: "rgba(0,95,127,0.9)"
  },
  U22: {
    // 环卫用地
    color: "rgba(0,95,127,0.9)"
  },
  U3: {
    // 安全设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U4: {
    // 环境设施用地
    color: "rgba(0,95,127,0.9)"
  },
  U9: {
    // 其他公用设施用地
    color: "rgba(0,95,127,0.9)"
  },
  W: {
    // 仓储用地
    color: "rgba(159,127,255,0.9)"
  }
}
