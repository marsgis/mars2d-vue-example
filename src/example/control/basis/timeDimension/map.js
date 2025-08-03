import * as mars2d from "mars2d"
const L = mars2d.L

let map

export const mapOptions = {
  chinaCRS: mars2d.ChinaCRS.GCJ02
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  const timeDimension = new L.TimeDimension({
    period: "PT5M"
  })
  map.timeDimension = timeDimension

  const player = new L.TimeDimension.Player(
    {
      transitionTime: 100,
      loop: false,
      startOver: true
    },
    timeDimension
  )

  const timeDimensionControl = new L.Control.TimeDimension({
    player,
    timeDimension,
    position: "bottomleft",
    autoPlay: true,
    minSpeed: 1,
    speedStep: 1,
    maxSpeed: 100,
    timeSliderDragUpdate: true
  })
  map.addControl(timeDimensionControl)

  // 加载外部geojson文件
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/tianzhushan.json"
  })
    .then((geojson) => {
      const customLayer = L.geoJson(geojson, {
        style: {
          color: "#FF0000",
          weight: 3
        },
        pointToLayer: function (feature, latLng) {
          if (feature.properties.hasOwnProperty("last")) {
            return new mars2d.graphic.Marker({
              latlng: latLng,
              style: {
                image: "img/marker/running.png",
                width: 22
              }
            })
          }
          return new mars2d.graphic.Point({
            latlng: latLng,
            style: {
              pixelSize: 8,
              color: "#ff0000"
            }
          })
        }
      })

      map.fitBounds(customLayer.getBounds(), {
        paddingBottomRight: [40, 40]
      })

      const gpxTimeLayer = L.timeDimension.layer.geoJson(customLayer, {
        updateTimeDimension: true,
        addlastPoint: true,
        waitForReady: true
      })
      gpxTimeLayer.addTo(map)
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
