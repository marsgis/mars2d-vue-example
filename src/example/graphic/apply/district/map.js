import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 117.322998, lat: 32.194209 },
  control: {
    baseLayerPicker: false
  },
  // basemaps: [],
  layers: []
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 蓝色底图

  // 添加矢量图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 添加对象
  addAnhui(graphicLayer)
  addCenterCity(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 添加安徽省底图和墙
function addAnhui(graphicLayer) {
  // 安徽省卫星底图
  const tileLayer = new mars2d.layer.TileLayer({
    url: "https://data.mars3d.cn/tile/anhui/{z}/{x}/{y}.png",
    minZoom: 1,
    maxZoom: 12,
    rectangle: { xmin: 114.811691, xmax: 119.703609, ymin: 29.35597, ymax: 34.698585 }
  })
  map.addLayer(tileLayer)

  // 安徽省边界线墙
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

  // 安徽各市边界线和名称
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
  // divgraphic标注
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

  // 扩散点
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
