/**
 * 示例：时间播放
 * 演示：用 leaflet.timedimension 插件的时间轴控件，让 GeoJSON 轨迹数据按时间逐步播放
 * API：L.TimeDimension、L.Control.TimeDimension、mars2d.Util.fetchJson（插件由 example.json 的 libs: timeDimension 引入）
 * 要点：period 是 ISO 8601 时长格式（"PT5M" = 5 分钟），表示时间轴步长；autoPlay 打开后播放器用 setInterval 持续运行，卸载时必须在 player.stop() 清掉；geojson 数据来自外部服务 data.mars2d.cn，需联网
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map
let timeDimensionControl
let gpxTimeLayer
let player

// ========== 1. 地图参数（合并/覆盖 config.json）==========
export const mapOptions = {
  chinaCRS: mars2d.ChinaCRS.GCJ02
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  // 时间轴 + 播放器：时间轴由地图驱动，播放器负责按 transitionTime 推进当前时间
  const timeDimension = new L.TimeDimension({
    period: "PT5M"
  })
  map.timeDimension = timeDimension

  player = new L.TimeDimension.Player(
    {
      transitionTime: 100,
      loop: false,
      startOver: true
    },
    timeDimension
  )

  const timeDimensionControlTemp = new L.Control.TimeDimension({
    player,
    timeDimension,
    position: "bottomleft",
    autoPlay: true,
    minSpeed: 1,
    speedStep: 1,
    maxSpeed: 100,
    timeSliderDragUpdate: true
  })
  timeDimensionControl = timeDimensionControlTemp
  map.addControl(timeDimensionControlTemp)

  // 加载外部geojson文件（异步，回调里需判断示例是否已卸载）
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/tianzhushan.json"
  })
    .then((geojson) => {
      // 请求返回时示例可能已卸载，map 已置空，直接跳过避免访问空地图
      if (!map) {
        return
      }

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

      gpxTimeLayer = L.timeDimension.layer.geoJson(customLayer, {
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

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // autoPlay 已启动播放器的 setInterval，先 stop 避免卸载后继续推进时间轴
  if (player) {
    player.stop()
    player = null
  }
  if (gpxTimeLayer) {
    if (map) {
      map.removeLayer(gpxTimeLayer)
    }
    gpxTimeLayer = null
  }
  if (timeDimensionControl) {
    if (map) {
      map.removeControl(timeDimensionControl)
    }
    timeDimensionControl = null
  }
  if (map) {
    map.timeDimension = null
  }
  map = null
}
