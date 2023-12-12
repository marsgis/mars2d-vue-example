import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 加载数据
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/tianzhushan.json"
  })
    .then((geojson) => {
      const latlngs = mars2d.PointTrans.coords2latlngs(geojson.features[0].geometry.coordinates)
      showTianzhushan(latlngs)
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

function showTianzhushan(latlngs) {
  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const graphicLine = new mars2d.graphic.Polyline({
    latlngs,
    style: {
      color: "#0000ff",
      width: 3,
      snakingSpeed: 80
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

    map.setView(currLatlng) // 地图联动
  })
}
