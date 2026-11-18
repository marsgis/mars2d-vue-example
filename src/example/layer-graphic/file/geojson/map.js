/**
 * 示例：GeoJson数据
 * 演示：用 GeoJsonLayer 加载 6 份在线 GeoJSON（省界、规划面、安徽各市、世界各国、标绘、体育设施点），配置 symbol 样式、按属性配色、popup 与 flyTo
 * API：mars2d.layer.GeoJsonLayer、map.addLayer、map.getLayer
 * 要点：数据在 data.mars2d.cn 在线服务上，断网时图层加载失败；preferCanvas:true 让线面走 Canvas 渲染，要素多时比默认 SVG 快；symbol.styleField/styleFieldOptions 按属性值批量换色，不用逐个要素设置
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let geoJsonLayer // 当前展示的 GeoJson 图层，切换数据前先移除

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 11,
  center: { lng: 117.287917, lat: 31.904563 },
  // 线面矢量改用 Canvas 渲染器：要素较多时比默认 SVG 快得多（见 mars2d 中 Map 构造参数 renderer 的说明）
  preferCanvas: true
}

// 事件对象，用于抛出事件给vue（本示例没有需要抛给面板的事件，保留以统一各示例结构）
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 默认先加载体育设施点，面板其余按钮再切换数据
  showPointDemo()
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  removeLayer()
  map = null
}

// 移除上一次切换数据时创建的图层；onUnmounted 里 map 可能已被置空，必须判空
function removeLayer() {
  if (geoJsonLayer) {
    if (map) {
      map.removeLayer(geoJsonLayer, true)
    }
    geoJsonLayer = null
  }
}

// ========== 3. 面板交互方法（切换不同的 GeoJSON 数据）==========
// 示例：显示标绘数据
export function showDrawDemo() {
  removeLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "标绘示例数据",
    // 数据内含点/线/面，不强制 symbol.type，按 GeoJSON 几何类型自动创建对应矢量
    url: "//data.mars2d.cn/file/geojson/mars2d-draw.json"
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  geoJsonLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：显示体育设施点数据
export function showPointDemo() {
  removeLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "体育设施点",
    url: "//data.mars2d.cn/file/geojson/hfty-point.json",
    symbol: {
      styleOptions: {
        image: "img/marker/mark1.png",
        width: 32,
        height: 44,
        // 图标对齐方式：CENTER/BOTTOM 表示以图标底边中点为定位点，箭头尖端才落在真实坐标上
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      }
    },
    // popup 数组里 field 是数据属性名、name 是弹窗显示名；部分 field 带"（"是原始数据字段名被截断所致，不能随意改，否则取不到值
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
      { field: "用地面积（", name: "用地面积", format: "mars2d.MeasureUtil.formatArea" },
      { field: "设施规模（", name: "设施规模" },
      { field: "举办者类型", name: "举办者类型" },
      { field: "开工时间", name: "开工时间" },
      { field: "总投资额（", name: "总投资额", unit: "亿元" },
      { field: "项目推进主", name: "项目推进主体" },
      { field: "项目进度", name: "项目进度" },
      { field: "项目来源", name: "项目来源" },
      { field: "备注", name: "备注" }
    ],
    // 数据加载完成后自动缩放到数据范围
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  geoJsonLayer.on(mars2d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：显示省界线数据
export function showChinaLineDemo() {
  removeLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "全国省界",
    // 数据本身是省界面（Polygon），这里强制按 polyline 渲染，只画省界轮廓
    url: "http://data.mars2d.cn/file/geojson/areas/100000_full.json",
    symbol: {
      type: "polyline",
      styleOptions: {
        color: "#ff0000",
        width: 3
      }
    },
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
}

// 示例：显示面数据（规划面）
export function showGuihuaDemo() {
  removeLayer()

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    // 固定 id 便于下面用 map.getLayer(1987, "id") 演示按 id 取回图层再绑事件
    id: 1987,
    name: "用地规划",
    url: "//data.mars2d.cn/file/geojson/guihua.json",
    symbol: {
      type: "polygon",
      styleOptions: {
        fillOpacity: 0.6,
        fillColor: "#0000FF",
        outline: false
      },
      // 按"类型"属性值到 styleFieldOptions 里取配色，避免为每个面单独 setStyle
      styleField: "类型",
      styleFieldOptions: {
        一类居住用地: { fillColor: "#FFDF7F" },
        二类居住用地: { fillColor: "#FFFF00" },
        社区服务用地: { fillColor: "#FF6A38" },
        幼托用地: { fillColor: "#FF6A38" },
        商住混合用地: { fillColor: "#FF850A" },
        行政办公用地: { fillColor: "#FF00FF" },
        文化设施用地: { fillColor: "#FF00FF" },
        小学用地: { fillColor: "#FF7FFF" },
        初中用地: { fillColor: "#FF7FFF" },
        体育场用地: { fillColor: "#00A57C" },
        医院用地: { fillColor: "#A5527C" },
        社会福利用地: { fillColor: "#FF7F9F" },
        商业用地: { fillColor: "#FF0000" },
        商务用地: { fillColor: "#7F0000" },
        营业网点用地: { fillColor: "#FF7F7F" },
        一类工业用地: { fillColor: "#A57C52" },
        社会停车场用地: { fillColor: "#C0C0C0" },
        通信用地: { fillColor: "#007CA5" },
        排水用地: { fillColor: "#00BFFF" },
        公园绿地: { fillColor: "#00FF00" },
        防护绿地: { fillColor: "#007F00" },
        河流水域: { fillColor: "#7FFFFF" },
        配建停车场: { fillColor: "#ffffff" },
        道路用地: { fillColor: "#ffffff" }
      }
    },
    popup: "类型:{类型}",
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 下面代码演示如果再config.json中配置的图层，如何绑定额外事件方法
  // 绑定config.json中对应图层配置的"id"值图层的单击事件（比如下面是id:1987对应图层）
  const layerTest = map.getLayer(1987, "id")

  // 绑定事件
  layerTest.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })

  layerTest.on(mars2d.EventType.click, function (event) {
    // 单击事件
    console.log("单击了图层", event)
  })
}

// 示例：显示安徽各市数据
export function showAnhuiDemo() {
  removeLayer()

  const colors = ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"]

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "安徽各市",
    url: "http://data.mars2d.cn/file/geojson/areas/340000_full.json",
    symbol: {
      type: "polygon",
      styleOptions: {
        fill: true,
        // image: "img/fill/redLine.png",
        // imageOpacity: 1,
        fillOpacity: 0.5,
        outline: true,
        outlineWidth: 2,
        outlineOpacity: 1,
        outlineColor: "white"
      },
      // callback 对每个要素执行：这里从 colors 中随机取一个填充色，让相邻市颜色不同
      callback: function (attr, style) {
        return {
          fillColor: getArrayRandomOne(colors)
        }
      }
    },
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.click, function (event) {
    const graphic = event.layer
    // 单击某个市后定位到该市范围
    map.fitBounds(graphic.getBounds())
  })

  geoJsonLayer.on(mars2d.EventType.mouseover, function (event) {
    const graphic = event.layer
    // 鼠标移入高亮：加粗白色描边、提高填充不透明度，并置顶避免被相邻面遮挡
    graphic.setStyle({
      outlineColor: "#666",
      outlineWidth: 3,
      fillOpacity: 0.7
    })
    graphic.bringToFront()
  })

  geoJsonLayer.on(mars2d.EventType.mouseout, function (event) {
    const graphic = event.layer
    // 移出时恢复与 styleOptions 一致的样式
    graphic.setStyle({
      outlineColor: "white",
      outlineWidth: 2,
      fillOpacity: 0.5
    })
  })
}

// 示例：显示世界各国数据
export function showWorldDemo() {
  removeLayer()

  // 世界数据范围大，放开最小层级并手动把视角切到能看全亚欧的位置
  map.setMinZoom(1)
  map.setView([35.603719, 104.0625], 3)

  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "世界各国",
    url: "http://data.mars2d.cn/file/geojson/world.json",
    symbol: {
      type: "polygon",
      styleOptions: {
        fill: true,
        // 填充几乎透明、描边宽度 0：只保留国家占位用于单击/悬停交互，视觉上不压住底图
        fillOpacity: 0.01,
        fillColor: "#000000",
        outline: true,
        outlineColor: "#666",
        outlineWidth: 0
      }
    }
    // flyTo: true,
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })

  // 绑定事件
  geoJsonLayer.on(mars2d.EventType.click, function (event) {
    const item = event.layer.attr
    globalMsg("你单击了：" + item.name + "," + item.name_cn)
  })

  geoJsonLayer.on(mars2d.EventType.mouseover, function (event) {
    const graphic = event.layer
    // 悬停时把填充和描边显示出来，移出再还原（与 styleOptions 的默认值成对出现）
    graphic.setStyle({
      fillOpacity: 0.5,
      outlineWidth: 2
    })
    graphic.bringToFront()
  })

  geoJsonLayer.on(mars2d.EventType.mouseout, function (event) {
    const graphic = event.layer
    graphic.setStyle({
      fillOpacity: 0.01,
      outlineWidth: 0
    })
  })
}

// ========== 4. 辅助方法 ==========
// 随机数组中随机取1个元素
function getArrayRandomOne(arr) {
  const n = Math.floor(Math.random() * arr.length)

  return arr[n]
}
