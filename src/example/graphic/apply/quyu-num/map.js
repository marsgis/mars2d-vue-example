/**
 * 示例：行政区数据统计图
 * 演示：合肥市区县边界墙（反选遮罩）+ 由 geojson 生成区县面/线，在区县中心点叠加扩散点和“区县名+数值”黑底面板
 * API：mars2d.layer.GeoJsonLayer、mars2d.Util.geoJsonToGraphics、mars2d.graphic.Polygon/Polyline/Marker/DivGraphic
 * 要点：geojson 属性中的 centroid 是 [经度, 纬度]，而 graphic 的 latlng 需要 [纬度, 经度]，所以取 [center[1], center[0]]；面板数字是随机演示值，每次进入都不同
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 9,
  center: { lng: 117.37793, lat: 31.809895 }
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

  // 合肥市边界墙：mask:true 生成反选遮罩，压暗合肥市以外的区域
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
      // 示例切换后异步请求可能才返回，此时地图已销毁，直接丢弃数据
      if (!map || !graphicLayer) {
        return
      }

      // 由 geojson 生成区县面、区县边界线和中心点标注
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

        // 中心点：geojson 里的 centroid 是 [经度, 纬度]，传给 latlng 时要换成 [纬度, 经度]
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

        // 数字显示：3000-4000 的随机数，仅作演示用
        const number = Math.floor(Math.random() * (4000 - 3000 + 1) + 3000)
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

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 清空面板通过 eventTarget 注册的监听，避免旧面板回调残留
  eventTarget.off()
  if (map) {
    map.destroy() // 一并释放遮罩层、矢量图层与其中的对象
    map = null
  }
}
