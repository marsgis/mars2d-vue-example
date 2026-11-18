/**
 * 示例：线的运动动画
 * 演示：Polyline 配置 snakingSpeed 后调用 snakeIn() 做线条"生长"动画，Marker 跟着线头移动、地图同步联动
 * API：mars2d.graphic.Polyline#snakeIn、graphic.on("snake"/"snakeend")、map.setView
 * 要点：动画速度由 style.snakingSpeed 控制；线头取 latlngs 的最后一个点；GeoJSON 是异步加载，返回时示例可能已切换，回调需判空
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graphicLayer // 矢量数据图层

export const mapOptions = {
  chinaCRS: mars2d.ChinaCRS.GCJ02
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 加载数据
  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/geojson/tianzhushan.json"
  })
    .then((geojson) => {
      // 请求返回时示例可能已经切换/卸载，此时 map 已置空，直接丢弃本次数据
      if (!map) {
        return
      }
      const latlngs = mars2d.PointTrans.coords2latlngs(geojson.features[0].geometry.coordinates)
      showTianzhushan(latlngs)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (graphicLayer) {
    // 从地图移除矢量图层：snakeIn 动画与线头 Marker 一并释放
    if (map) {
      map.removeLayer(graphicLayer, true)
    }
    graphicLayer = null
  }
  map = null
}

// ========== 3. 矢量对象（演示数据）==========
function showTianzhushan(latlngs) {
  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const graphicLine = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      color: "#0000ff",
      width: 3,
      snakingSpeed: 80 // 线条生长动画速度
    }
  })
  graphicLayer.addGraphic(graphicLine)

  // 开始运动
  graphicLine.snakeIn()

  // 创建随着线运动的marker点
  const marker = new mars2d.graphic.Marker({
    latlng: latlngs[0],
    style: {
      image: "img/marker/bike.png",
      iconSize: [25, 39],
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    }
  })
  graphicLayer.addGraphic(marker)

  const inhtml = '<div style="width:250px;text-align: center;"><h4>木遥环天柱山骑行</h4><br/><img src="img/photo/tzs.jpg" /></div>'
  marker.bindPopup(inhtml).openPopup()

  graphicLine.on("snakestart snake snakeend", function (ev) {
    const temp = graphicLine.latlngs
    const currLatlng = temp[temp.length - 1]

    marker.setLatLng(currLatlng)

    map.setView(currLatlng) // 地图跟随线头移动
  })
}
