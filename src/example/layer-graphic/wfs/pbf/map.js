import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  const mapboxPbfLayer = new mars2d.layer.PbfLayer({
    url: "http://server.mars2d.cn/geoserver/gwc/service/tms/1.0.0/mars%3Ahfgh3857@EPSG%3A3857@pbf/{z}/{x}/{-y}.pbf",
    interactive: true, // 是否允许鼠标交互，比如触发单击事件
    // style: { // 固定的样式
    //   color: "#ffffff", // 线颜色
    //   opacity: 0.2,
    //   weight: 1,
    //   fill: true,
    //   fillColor: "#0000ff", // 填充颜色
    //   fillOpacity: 0.2
    // },
    style: function (properties, level) {
      const styleDef = {
        color: "rgba(110, 110, 110, 255)", // 线颜色
        opacity: 1,
        weight: 1,
        fill: true,
        fillColor: "rgba(205, 233, 247, 255)", // 填充颜色
        fillOpacity: 1
      }
      const style = styleForType[properties["用地编号"]]
      for (const key in style) {
        styleDef[key] = style[key]
      }
      return styleDef
    },
    zIndex: 999
  })
  mapboxPbfLayer.addTo(map)

  mapboxPbfLayer.on("click", function (e) {
    const attr = e.layer.properties
    const latlng = e.latlng

    const popup = L.popup()
      .setLatLng(latlng)
      .setContent(`用地编号:${attr["用地编号"]}<br/>用地名称:${attr["用地名称"]}<br/>规划用地:${attr["规划用地"]}<br/>`)
      .openOn(map)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 规划 配色
const styleForType = {
  A1: {
    // 行政办公用地
    fillColor: "rgba(255,127,159,255)",
    color: "rgba(0,0,0,0)"
  },
  A2: {
    // 文化设施用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  A22: {
    // 文化活动用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  A3: {
    // 教育科研用地
    fillColor: "rgba(255,127,191,255)",
    color: "rgba(0,0,0,0)"
  },
  A31: {
    // 高等院校用地
    fillColor: "rgba(255,127,191,255)",
    color: "rgba(0,0,0,0)"
  },
  A32: {
    // 中等专业学校用地
    fillColor: "rgba(255,127,191,255)",
    color: "rgba(0,0,0,0)"
  },
  A33: {
    // 中小学用地
    fillColor: "rgba(255,255,127,255)",
    color: "rgba(0,0,0,0)"
  },
  A34: {
    // 特殊教育用地
    fillColor: "rgba(255,127,191,255)",
    color: "rgba(0,0,0,0)"
  },
  A35: {
    // 科研用地
    fillColor: "rgba(255,127,191,255)",
    color: "rgba(0,0,0,0)"
  },
  A4: {
    // 体育用地
    fillColor: "rgba(255,127,0,255)",
    color: "rgba(0,0,0,0)"
  },
  A41: {
    // 体育场馆用地
    fillColor: "rgba(255,127,0,255)",
    color: "rgba(0,0,0,0)"
  },
  A5: {
    // 医疗卫生用地
    fillColor: "rgba(255,127,127,255)",
    color: "rgba(0,0,0,0)"
  },
  A51: {
    // 医院用地
    fillColor: "rgba(255,127,127,255)",
    color: "rgba(0,0,0,0)"
  },
  A52: {
    // 卫生防疫用地
    fillColor: "rgba(255,127,127,255)",
    color: "rgba(0,0,0,0)"
  },
  A59: {
    // 其他医疗卫生用地
    fillColor: "rgba(255,127,127,255)",
    color: "rgba(0,0,0,0)"
  },
  A6: {
    // 社会福利用地
    fillColor: "rgba(165,82,103,255)",
    color: "rgba(0,0,0,0)"
  },
  A7: {
    // 文物古迹用地
    fillColor: "rgba(165,41,0,255)",
    color: "rgba(0,0,0,0)"
  },
  A9: {
    // 宗教用地
    fillColor: "rgba(165,82,103,255)",
    color: "rgba(0,0,0,0)"
  },
  B: {
    // 商业服务业设施用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B1: {
    // 商业用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B11: {
    // 零售商业用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B12: {
    // 批发市场用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B13: {
    // 餐饮用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B14: {
    // 旅馆用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B2: {
    // 商务用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B21: {
    // 金融保险用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B29: {
    // 其他商务用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  B3: {
    // 娱乐康体用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  B31: {
    // 娱乐用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  B32: {
    // 康体用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  B4: {
    // 公用设施营业网点用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  B41: {
    // 加油加气站用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  B9: {
    // 其他服务设施用地
    fillColor: "rgba(255,159,127,255)",
    color: "rgba(0,0,0,0)"
  },
  BR: {
    // 商住混合用地
    fillColor: "rgba(255,0,63,255)",
    color: "rgba(0,0,0,0)"
  },
  E1: {
    // 水域
    fillColor: "rgba(127,255,255,255)",
    color: "rgba(0,0,0,0)"
  },
  E2: {
    // 农林用地
    fillColor: "rgba(41,165,0,255)",
    color: "rgba(0,0,0,0)"
  },
  E9: {
    // 其他非建设用地
    fillColor: "rgba(127,127,63,255)",
    color: "rgba(0,0,0,0)"
  },
  G: {
    // 绿地与广场用地
    fillColor: "rgba(0,127,0,255)",
    color: "rgba(0,0,0,0)"
  },
  G1: {
    // 公园绿地
    fillColor: "rgba(0,255,63,255)",
    color: "rgba(0,0,0,0)"
  },
  G2: {
    // 防护绿地
    fillColor: "rgba(0,127,0,255)",
    color: "rgba(0,0,0,0)"
  },
  G3: {
    // 广场用地
    fillColor: "rgba(128,128,128,255)",
    color: "rgba(0,0,0,0)"
  },
  H: {
    // 建设用地
    fillColor: "rgba(165,124,0,255)",
    color: "rgba(0,0,0,0)"
  },
  H1: {
    // 城乡居民点建设用地
    fillColor: "rgba(165,124,0,255)",
    color: "rgba(0,0,0,0)"
  },
  H14: {
    // 村庄建设用地
    fillColor: "rgba(165,165,82,255)",
    color: "rgba(0,0,0,0)"
  },
  H2: {
    // 区域交通设施用地
    fillColor: "rgba(192,192,192,255)",
    color: "rgba(0,0,0,0)"
  },
  H21: {
    // 铁路用地
    fillColor: "rgba(192,192,192,255)",
    color: "rgba(0,0,0,0)"
  },
  H22: {
    // 公路用地
    fillColor: "rgba(192,192,192,255)",
    color: "rgba(0,0,0,0)"
  },
  H23: {
    // 港口用地
    fillColor: "rgba(192,192,192,255)",
    color: "rgba(0,0,0,0)"
  },
  H3: {
    // 区域公共设施用地
    fillColor: "rgba(82,165,82,255)",
    color: "rgba(0,0,0,0)"
  },
  H4: {
    // 特殊用地
    fillColor: "rgba(47,76,38,255)",
    color: "rgba(0,0,0,0)"
  },
  H41: {
    // 军事用地
    fillColor: "rgba(47,76,38,255)",
    color: "rgba(0,0,0,0)"
  },
  H42: {
    // 安保用地
    fillColor: "rgba(47,76,38,255)",
    color: "rgba(0,0,0,0)"
  },
  H9: {
    // 其他建设用地
    fillColor: "rgba(165,165,82,255)",
    color: "rgba(0,0,0,0)"
  },
  M: {
    // 工业用地
    fillColor: "rgba(127,95,63,255)",
    color: "rgba(0,0,0,0)"
  },
  M1: {
    // 一类工业用地
    fillColor: "rgba(127,95,63,255)",
    color: "rgba(0,0,0,0)"
  },
  M2: {
    // 二类工业用地
    fillColor: "rgba(76,57,38,255)",
    color: "rgba(0,0,0,0)"
  },
  M4: {
    // 农业服务设施用地
    fillColor: "rgba(153,38,0,255)",
    color: "rgba(0,0,0,0)"
  },
  R: {
    // 居住用地
    fillColor: "rgba(255,255,0,255)",
    color: "rgba(0,0,0,0)"
  },
  R1: {
    // 一类居住用地
    fillColor: "rgba(255,255,127,255)",
    color: "rgba(0,0,0,0)"
  },
  R2: {
    // 二类居住用地
    fillColor: "rgba(255,255,0,255)",
    color: "rgba(0,0,0,0)"
  },
  R21: {
    // 住宅用地
    fillColor: "rgba(255,255,0,255)",
    color: "rgba(0,0,0,0)"
  },
  R22: {
    // 服务设施用地
    fillColor: "rgba(255,255,0,255)",
    color: "rgba(0,0,0,0)"
  },
  RB: {
    // 商住混合用地
    fillColor: "rgba(255,191,0,255)",
    color: "rgba(0,0,0,0)"
  },
  S: {
    // 道路与交通设施用地
    fillColor: "rgba(128,128,128,255)",
    color: "rgba(0,0,0,0)"
  },
  S2: {
    // 城市轨道交通用地
    fillColor: "rgba(128,128,128,255)",
    color: "rgba(0,0,0,0)"
  },
  S3: {
    // 交通枢纽用地
    fillColor: "rgba(192,192,192,255)",
    color: "rgba(0,0,0,0)"
  },
  S4: {
    // 交通场站用地
    fillColor: "rgba(128,128,128,255)",
    color: "rgba(0,0,0,0)"
  },
  S41: {
    // 公共交通场站用地
    fillColor: "rgba(128,128,128,255)",
    color: "rgba(0,0,0,0)"
  },
  S42: {
    // 社会停车场用地
    fillColor: "rgba(128,128,128,255)",
    color: "rgba(0,0,0,0)"
  },
  S9: {
    // 其他交通设施用地
    fillColor: "rgba(63,111,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U: {
    // 公用设施用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U1: {
    // 供应设施用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U11: {
    // 供水用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U12: {
    // 供电用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U13: {
    // 供燃气用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U14: {
    // 供热用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U15: {
    // 通信用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U2: {
    // 环境设施用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U21: {
    // 排水用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U22: {
    // 环卫用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U3: {
    // 安全设施用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U4: {
    // 环境设施用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  U9: {
    // 其他公用设施用地
    fillColor: "rgba(0,95,127,255)",
    color: "rgba(0,0,0,0)"
  },
  W: {
    // 仓储用地
    fillColor: "rgba(159,127,255,255)",
    color: "rgba(0,0,0,0)"
  }
}
