/**
 * 示例：行政区突出展示
 * 演示：安徽省卫星瓦片局部底图 + 省界反选遮罩墙 + 各市边界线，再叠加“示范城市”DivGraphic 面板与扩散点
 * API：mars2d.layer.TileLayer、mars2d.layer.GeoJsonLayer、mars2d.graphic.DivGraphic、mars2d.graphic.Marker
 * 要点：GeoJsonLayer 的 mask:true 会生成区域外的反选遮罩（压暗省外），是突出展示区域的关键参数；瓦片图层用 rectangle 限定范围、maxZoom 限制层级，避免请求范围外瓦片；mapOptions 里 layers:[] 是 3D 写法，2D 清空默认叠加图层要用 operationallayers:[]
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 117.322998, lat: 32.194209 },
  control: {
    baseLayerPicker: false
  },
  // basemaps: [], // 3D 写法，2D 不生效；要清空默认底图/叠加图层请用 basemaps: []、operationallayers: []
  operationallayers: []
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 与 config.json 中 id=2017 蓝色底图的 customColor 一致，瓦片未加载完成时不会露白
  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 切换为 config.json 中 id=2017 的蓝色底图

  // 添加矢量图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 添加对象
  addAnhui(graphicLayer)
  addCenterCity(graphicLayer)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 清空面板通过 eventTarget 注册的监听，避免旧面板回调残留
  eventTarget.off()
  if (map) {
    map.destroy() // 一并释放瓦片图层、GeoJson 遮罩层与矢量对象
    map = null
  }
}

// ========== 4. 矢量对象：安徽省底图、遮罩墙、边界线与示范城市 ==========
// 添加安徽省底图和墙
function addAnhui(graphicLayer) {
  // 安徽省卫星底图（只覆盖省内范围，比全省影像瓦片更省流量）
  const tileLayer = new mars2d.layer.TileLayer({
    url: "https://data.mars3d.cn/tile/anhui/{z}/{x}/{y}.png",
    minZoom: 1,
    maxZoom: 12,
    rectangle: { xmin: 114.811691, xmax: 119.703609, ymin: 29.35597, ymax: 34.698585 }
  })
  map.addLayer(tileLayer)

  // 安徽省边界墙：mask:true 生成反选遮罩，遮罩外的默认底图会被压暗，从而突出省界内区域
  const anhuiWall = new mars2d.layer.GeoJsonLayer({
    name: "安徽省边界墙",
    url: "//data.mars2d.cn/file/geojson/areas/340000.json",
    mask: true, // 标识为遮罩层【重点参数】
    symbol: {
      styleOptions: {
        fill: true,
        fillColor: "#C0C0C0",
        fillOpacity: 0.6,
        outline: true,
        outlineColor: "#6495ED",
        outlineWidth: 10,
        outlineOpacity: 0.5
      }
    }
  })
  map.addLayer(anhuiWall)

  // 安徽各市边界线和名称（type:polyline 表示只渲染边界线，不填充）
  const shiLayer = new mars2d.layer.GeoJsonLayer({
    name: "安徽各市边界线",
    url: "//data.mars2d.cn/file/geojson/areas/340000_full.json",
    symbol: {
      type: "polyline",
      styleOptions: {
        color: "rgba(255,255,255,0.3)",
        width: 2
      }
      // styleField: "name",
      // styleFieldOptions: {
      //   合肥市: { color: "rgba(0,255,255,0.3)" },
      // },
    },
    popup: "{name}"
  })
  map.addLayer(shiLayer)
}

// 添加示范城市的相关对象
function addCenterCity(graphicLayer) {
  const latlng = [31.94284, 117.410889]
  // divgraphic标注：横向定位到右侧、垂直居中，让面板从坐标点向右展开
  const divgraphic = new mars2d.graphic.DivGraphic({
    latlng,
    style: {
      html: `<div class="marsBlackPanel  animation-spaceInDown">
            <div class="marsBlackPanel-text">示范城市</div>
        </div>`,
      horizontalOrigin: mars2d.HorizontalOrigin.LEFT, // 横向定位
      verticalOrigin: mars2d.VerticalOrigin.CENTER // 垂直定位
    }
  })
  graphicLayer.addGraphic(divgraphic)

  // 扩散点：width 是图标像素尺寸，pulse 开启呼吸光圈
  const graphic = new mars2d.graphic.Marker({
    latlng,
    style: {
      width: 8,
      pulse: true,
      pulseColor: "rgba(0,255,255,0.6)"
    }
  })
  graphicLayer.addGraphic(graphic)
}
