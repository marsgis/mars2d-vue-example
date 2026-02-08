import * as mars2d from "mars2d"

const L = mars2d.L

export let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 117.150865, lat: 31.843186 }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 加一些演示数据
  addDemoGraphic1()
}

// 释放当前地图业务的生命周期函数
export function onUnmounted() {
  map = null
}

function addDemoGraphic1() {
  // 创建矢量数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer({
    popup: "all",
    popupOptions: {
      offset: new L.Point(0, -26)
    }
  })
  map.addLayer(graphicLayer)

  // 所有graphic都支持attr传入业务属性信息，并支持交互、导出
  const graphic = new mars2d.graphic.Marker({
    name: "静态属性",
    latlng: [31.837297, 117.134078],
    style: {
      image: "img/marker/point-red.png",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: {
      name: "我的静态属性",
      remark: "我可以加任意业务属性，比如取到的数据库字段"
    }
  })
  graphicLayer.addGraphic(graphic)
}
