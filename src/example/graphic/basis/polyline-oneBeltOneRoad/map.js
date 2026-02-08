import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 3,
  center: { lng: 66.09375, lat: 32.398516 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.container.style.backgroundColor = "#11243C"
  map.basemap = 2017 // 蓝色底图

  // 加载数据
  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/oneBeltOneRoad.json"
  })
    .then((res) => {
      showRoad(res.data.land, "#ff7f50")

      showRoad(res.data.sea, "#00bfff")
    })
    .catch(function (error) {
      console.log("请求出错了", error)

      globalMsg("实时查询信息失败，请稍候再试")
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function showRoad(arr, options) {
  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

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

function getBezierCurve(latlngs, closure) {
  if (!latlngs || latlngs.length < 3) {
    return latlngs
  }

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
