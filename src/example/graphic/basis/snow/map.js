import * as mars2d from "mars2d"

export let map // mars2d.Map三维地图对象

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()
export let graphicLayer

export const mapOptions = {
  center: [31.837316, 117.231503],
  zoom: 13,
  zoomAnimation: true
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance
  map.basemap = 2017

  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  addDemoGraphic()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addDemoGraphic() {
  const points = [
    [31.87755764334002, 117.18893051147462],
    [31.879306880763227, 117.28231430053712],
    [31.785238309483983, 117.27819442749025],
    [31.791950250173965, 117.1794891357422]
  ]

  const snow = new mars2d.graphic.Snow({
    latlngs: points,
    style: {
      speed: 150,
      layersCount: 5,
      density: 4,
      size: 12,
      color: "#ffffff",
      opacity: 0.5
    }
  })
  graphicLayer.addGraphic(snow)
}

export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "snow",
    style: {
      speed: 150,
      layersCount: 5, // 层数
      density: 4,
      size: 12,
      color: "#ffffff",
      opacity: 0.5 // px
    },
    success: function (graphic) {
      console.log("标绘完成", graphic)
    }
  })
}
