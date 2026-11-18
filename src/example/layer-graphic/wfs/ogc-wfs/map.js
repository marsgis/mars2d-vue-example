/**
 * 示例：OGC WFS服务
 * 演示：用 mars2d.layer.WfsLayer 加载 GeoServer 的 WFS 服务：点图层（基础体育设施，配图标+属性 popup）与规划面图层（按用地编号分级配色），按格网分块请求数据
 * API：mars2d.layer.WfsLayer（typeNS/typeName/geometryField/styleField）、map.addLayer
 * 要点：typeNS 是 GeoServer 工作空间名、typeName 是图层名，geometryField 要与服务里的几何字段一致；面数据量大时用 minZoom 限制低层级不请求（本示例 16 级起）；服务在 server.mars2d.cn 在线服务上，需能访问外网
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let wfsLayer // 基础体育设施点图层（onUnmounted 需移除）
let wfsLayer2 // 规划面图层（onUnmounted 需移除）

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  wfsLayer = new mars2d.layer.WfsLayer({
    name: "基础体育设施",
    // GeoServer 的 WFS 入口；typeNS 是工作空间名、typeName 是图层名
    url: "http://server.mars2d.cn/geoserver/mars/ows",
    typeNS: "mars",
    typeName: "hfty",
    // 服务里几何字段的名称，需与 GeoServer 图层的 schema 一致才能解析
    geometryField: "the_geom",
    symbol: {
      styleOptions: {
        image: "img/marker/mark1.png",
        width: 32,
        height: 44,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      }
    },
    popupOptions: {
      // 固定弹窗标题，不取要素字段
      title: "合肥市"
    },
    // field 取要素属性名、name 是显示名；部分 field 带"（"是原始数据字段被截断所致，不能随意改
    popup: [
      { field: "项目名称", name: "项目名称" },
      { field: "建设性质", name: "建设性质" },
      { field: "设施级别", name: "设施级别" },
      { field: "所属区县", name: "所属区县" },
      { field: "建筑内容及", name: "建筑内容" },
      { field: "新增用地（", name: "新增用地" },
      { field: "开工", name: "开工" },
      { field: "总投资（万", name: "总投资" },
      { field: "资金来源", name: "资金来源" },
      { field: "初步选址", name: "初步选址" },
      { field: "设施类型", name: "设施类型" },
      { field: "设施等级", name: "设施等级" },
      { field: "所在区县", name: "所在区县" },
      { field: "具体位置", name: "具体位置" },
      { field: "建设内容（", name: "建设内容" },
      { field: "用地面积（", name: "用地面积", unit: "亩" },
      { field: "设施规模（", name: "设施规模" },
      { field: "举办者类型", name: "举办者类型" },
      { field: "开工时间", name: "开工时间" },
      { field: "总投资额（", name: "总投资额", unit: "亿元" },
      { field: "项目推进主", name: "项目推进主体" },
      { field: "项目进度", name: "项目进度" },
      { field: "项目来源", name: "项目来源" },
      { field: "备注", name: "备注" }
    ]
  })
  map.addLayer(wfsLayer)

  wfsLayer2 = new mars2d.layer.WfsLayer({
    name: "规划面",
    url: "http://server.mars2d.cn/geoserver/mars/ows",
    typeNS: "mars",
    typeName: "hfgh",
    // 规划面数据量大：限制 16 级以下不请求，避免缩小时拉取全量数据
    minZoom: 16,
    geometryField: "the_geom",
    symbol: {
      type: "polygon",
      styleOptions: {
        fillOpacity: 0.6,
        fillColor: "#0000FF",
        outline: false
      },
      // 按"用地编号"字段到文件末尾的 styleForType 配色表里取对应填充色
      styleField: "用地编号",
      styleFieldOptions: styleForType
    },
    popup: "all"
  })
  map.addLayer(wfsLayer2)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (wfsLayer) {
    // onUnmounted 里 map 可能已被置空，移除图层前需判空
    if (map) {
      map.removeLayer(wfsLayer)
    }
    wfsLayer = null
  }
  if (wfsLayer2) {
    if (map) {
      map.removeLayer(wfsLayer2)
    }
    wfsLayer2 = null
  }
  map = null
}

// ========== 3. 规划用地配色表 ==========
// 用地编号 → 填充色，纯数据，放文件末尾避免打断上面的图层主流程；onMounted 在地图初始化完成后才执行，此时常量已求值完毕
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
