import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 9,
  center: { lng: 117.37793, lat: 31.809895 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.basemap = 2017 // 蓝色底图

  // 合肥市边界墙
  const borderWall = new mars2d.layer.GeoJsonLayer({
    name: "合肥市边界墙",
    url: "//data.mars2d.cn/file/geojson/areas/340100.json",
    mask: true, // 标识为遮罩层【重点参数】
    symbol: {
      styleOptions: {
        fill: true,
        fillColor: "#C0C0C0",
        fillOpacity: 0.6,
        outline: true,
        outlineColor: "#6495ED",
        outlineWidth: 20,
        outlineOpacity: 0.5
      }
    }
  })
  map.addLayer(borderWall)

  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/geojson/areas/340100_full.json"
  })
    .then((geojson) => {
      const arr = mars2d.Util.geoJsonToGraphics(geojson) // 解析geojson
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]

        // polygon面
        const polygonEntity = new mars2d.graphic.Polygon({
          latlngs: item.latlngs,
          style: {
            fill: true,
            fillColor: "#4881a7",
            fillOpacity: 0.5
          }
        })
        graphicLayer.addGraphic(polygonEntity)

        // PolylineEntity线
        const graphicLine = new mars2d.graphic.Polyline({
          latlngs: item.latlngs,
          style: {
            color: "rgba(255,255,255,0.5)",
            width: 1
          }
        })
        graphicLayer.addGraphic(graphicLine)

        // 中心点
        const center = item.attr.centroid

        // 扩散点
        const graphic = new mars2d.graphic.Marker({
          latlng: [center[1], center[0]],
          style: {
            width: 8,
            pulse: true,
            pulseColor: "#ff0000"
          }
        })
        graphicLayer.addGraphic(graphic)

        // 数字显示
        const number = Math.floor(Math.random() * (4000 - 3000 + 1) + 3000) // 随机数字 3000-4000
        const divGraphic = new mars2d.graphic.DivGraphic({
          latlng: [center[1], center[0]],
          style: {
            html: `  <div class="marsBlackPanel  animation-spaceInDown">
                    <div class="marsBlackPanel-text"> ${item.attr.name} ${number}</div>
                </div>`,
            horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
            verticalOrigin: mars2d.VerticalOrigin.BOTTOM
          }
        })
        graphicLayer.addGraphic(divGraphic)
      }
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
