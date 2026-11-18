/**
 * 示例：attr属性
 * 演示：给 Marker 传 attr 业务属性，图层配置 popup:"all" 后单击图标按 attr 展示属性表
 * API：mars2d.graphic.Marker、mars2d.layer.GraphicLayer、popup/popupOptions
 * 要点：attr 可放任意业务字段，会随 toGeoJSON()/toJSON() 一起导出；popup:"all" 表示展示全部属性；popupOptions.offset 用 L.Point 控制弹窗相对坐标点的偏移（此处向上 26 像素，避开图标）
 */
import * as mars2d from "mars2d"

const L = mars2d.L

export let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 117.150865, lat: 31.843186 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 加一些演示数据
  addDemoGraphic1()
}

// ========== 3. 清理（与 onMounted 对称）==========
// 释放当前地图业务的生命周期函数
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放图层与矢量对象
    map = null
  }
}

// ========== 4. 矢量对象 ==========
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
