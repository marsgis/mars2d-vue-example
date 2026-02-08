import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
const L = mars2d.L

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 118.100831, lat: 31.318573 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/urban.json"
  })
    .then((geojson) => {
      for (let i = 0; i < geojson.features.length; i++) {
        const feature = geojson.features[i]
        if (feature.properties.area_sqkm > 1000) {
          feature.properties.Color = "rgba(100, 224, 60,.8)"
        } else {
          feature.properties.Color = "rgba(100, 224, 60,.6)"
        }
      }
      globalMsg("共渲染" + geojson.features.length + "个面")
      showData(geojson)
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

function showData(geojsonData) {
  const canvasLayer = new L.CanvasGeojsonLayer({
    style: {},
    onClick: function (features, latlng) {
      if (features.length === 0) {
        return
      }

      let inhtml = "<table>"
      const attr = features[0].geojson.properties
      for (const col in attr) {
        const showval = mars2d.Util.trim(String(attr[col]))
        if (showval === null || showval === "" || showval === "Null" || showval === "Unknown" || showval === "0" || showval.length === 0) {
          continue
        }

        inhtml += '<tr>  <td  style="text-align: right;min-width: 80px;">' + col + "：</td> <td>" + showval + "</td>   </tr>"
      }
      inhtml += "</table>"

      const popup = L.popup().setLatLng(latlng).setContent(inhtml).openOn(map)
    },
    onMouseOver: function (features, latlng) {
      // handle mouseover events
      if (features.length === 0) {
        return
      }

      for (let i = 0; i < features.length; i++) {
        const properties = features[i].geojson.properties
        if (!properties.Color_Old) {
          properties.Color_Old = properties.Color
        }
        properties.Color = "rgba(90, 131, 245, 1)"
      }
      canvasLayer.render()
    },
    onMouseOut: function (features, latlng) {
      if (features.length === 0) {
        return
      }

      for (let i = 0; i < features.length; i++) {
        const properties = features[i].geojson.properties
        properties.Color = properties.Color_Old
      }
      canvasLayer.render()
    }
  })

  canvasLayer.addTo(map)
  canvasLayer.addCanvasFeatures(L.CanvasFeatureFactory(geojsonData))
  canvasLayer.render()
}
