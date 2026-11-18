/**
 * 示例：一带一路
 * 演示：把接口返回的国家点位与路线坐标用贝塞尔曲线连成陆上/海上两条路线，并给国家点绑定 popup
 * API：mars2d.graphic.Polyline、mars2d.graphic.Marker、mars2d.PointTrans.latlngs2coords/coords2latlngs（turf.bezierSpline）
 * 要点：接口坐标是 {x: 经度, y: 纬度}，需要转成 [纬度, 经度]；曲线由全局 turf 库做贝塞尔插值；异步数据返回前可能已切换示例，回调需判空
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
const graphicLayers = [] // 陆上/海上共两个图层，统一记录便于卸载清理

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 3,
  center: { lng: 66.09375, lat: 32.398516 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.container.style.backgroundColor = "#11243C" // 深色背景，配合深色底图
  map.basemap = 2017 // 蓝色底图

  // 加载数据
  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/oneBeltOneRoad.json"
  })
    .then((res) => {
      // 请求返回时示例可能已经切换/卸载，此时 map 已置空，直接丢弃本次数据
      if (!map) {
        return
      }
      showRoad(res.data.land, "#ff7f50")

      showRoad(res.data.sea, "#00bfff")
    })
    .catch(function (error) {
      console.log("请求出错了", error)

      globalMsg("实时查询信息失败，请稍候再试")
    })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  // 解绑面板通过 eventTarget 注册的事件，避免旧面板回调残留
  eventTarget.off()
  if (map) {
    graphicLayers.forEach((layer) => {
      map.removeLayer(layer, true)
    })
  }
  graphicLayers.length = 0
  map = null
}

// ========== 3. 矢量对象（演示数据）==========
function showRoad(arr, options) {
  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
  graphicLayers.push(graphicLayer)

  const arrPosition = []
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i]
    arrPosition.push([item.y, item.x])

    // 创建点
    if (item.icon) {
      const billboardPrimitive = new mars2d.graphic.Marker({
        name: item.name,
        latlng: [item.y, item.x],
        style: {
          image: "img/country/" + item.icon,
          horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
          verticalOrigin: mars2d.VerticalOrigin.BOTTOM
          // label: {
          //   text: item.name,
          //   font_size: 17,
          //   font_family: "楷体",
          //   color: "WHITE",
          //   outline: true,
          //   outlineColor: "BLACK",
          //   outlineWidth: 2,
          //   horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
          //   verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
          // },
        }
      })
      graphicLayer.addGraphic(billboardPrimitive)

      const html = `<div class="mars-load-location">
        ${item.continent} - ${item.country} - <i style="color: #00ffff;">${item.name}</i>
      </div>`
      billboardPrimitive.bindPopup(html)
    }
  }

  const graphic = new mars2d.graphic.Polyline({
    latlngs: getBezierCurve(arrPosition),
    style: {
      width: 2,
      dashArray: "5,10",
      dashSpeed: -30, // 可以定义运动速度，注释后是静态的
      color: options
    }
  })
  graphicLayer.addGraphic(graphic)
}

// ========== 4. 工具方法 ==========
function getBezierCurve(latlngs, closure) {
  if (!latlngs || latlngs.length < 3) {
    return latlngs
  }

  // turf 的贝塞尔插值按 GeoJSON 坐标顺序 [经度, 纬度] 计算，因此这里先转出再转回
  const coordinates = mars2d.PointTrans.latlngs2coords(latlngs)

  const curved = turf.bezierSpline({
    type: "Feature",
    geometry: { type: "LineString", coordinates }
  })
  const result = mars2d.PointTrans.coords2latlngs(curved.geometry.coordinates)

  if (closure) {
    result.push(result[0])
  }
  return result
}
