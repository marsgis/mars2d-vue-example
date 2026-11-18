/**
 * 示例：单张图片局部坐标系
 * 演示：用 crs: mars2d.CRS.IMAGE（等价 Leaflet 的 L.CRS.Simple）把室内楼层平面图作为底图，可切换楼层并叠加标记与矩形
 * API：mars2d.CRS、mars2d.layer.ImageLayer、mars2d.graphic.Marker
 * 要点：IMAGE 坐标系下坐标就是图片像素（lat 对应图高、lng 对应图宽，zoom 0 时 1 单位 = 1 像素，zoom 可为负）；bounds 里两组坐标按 [lat, lng] 写，示例图片是 884×1338 的竖向图，所以写 [[0,0],[1338,884]]
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
export let graphicLayer

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  // IMAGE = L.CRS.Simple：没有经纬度，坐标单位是图片像素
  crs: mars2d.CRS.IMAGE,
  zoom: -1, // 初始缩放：负层级表示把 884×1338 像素的图缩小到一屏内
  center: { lng: 500, lat: 500 }, // 中心点也是像素坐标（x=500, y=500）
  minZoom: -3,
  maxZoom: 2,
  control: {
    locationBar: {
      latDecimal: 0, // 像素坐标不需要小数
      // IMAGE 下没有经纬度，状态栏模板改成显示像素 X/Y
      template: "<div>X: {lng}</div> <div>Y: {lat}</div>",
      style: { left: "100px", bottom: "0" }
    },
    layers: { position: "topleft" },
    zoom: { position: "bottomleft" }
  },
  basemaps: [
    {
      name: "-1层",
      type: "image",
      url: "img/shinei/B1.png",
      // bounds 两组值按 [lat, lng] 写：lat 覆盖 0~1338（图高方向）、lng 覆盖 0~884（图宽方向），与 884×1338 的图片匹配
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/B1.png"
    },
    {
      name: "F1层",
      type: "image",
      url: "img/shinei/F1.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F1.png",
      show: true // show:true 的项才是默认楼层
    },
    {
      name: "F2层",
      type: "image",
      url: "img/shinei/F2.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F2.png"
    },
    {
      name: "F3层",
      type: "image",
      url: "img/shinei/F3.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F3.png"
    },
    {
      name: "F4层",
      type: "image",
      url: "img/shinei/F4.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F4.png"
    },
    {
      name: "F5层",
      type: "image",
      url: "img/shinei/F5.png",
      bounds: [
        [0, 0],
        [1338, 884]
      ],
      icon: "img/shinei/F5.png"
    }
  ],
  operationallayers: []
}

// ========== 2. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层（示例自建的图层不在 mapOptions 里，清理时要手动移除）
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1()
  addDemoGraphic2()
}

// ========== 4. 示例矢量数据 ==========
// 标记：验证 IMAGE 坐标系下坐标就是像素（[0,0] 是图片左下角）
function addDemoGraphic1() {
  const graphic = new mars2d.graphic.Marker({
    latlng: [0, 0],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

// 矩形：贴合图片覆盖范围，验证 bounds 与矢量坐标一致
function addDemoGraphic2() {
  const graphic = new mars2d.graphic.Rectangle({
    latlngs: [
      [0, 0],
      [1338, 884]
    ],
    style: {
      fill: false,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#00ffff",
      outlineOpacity: 1.0
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

// ========== 5. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 只移除示例自建的图层；先判空再用 map，重复调用也不会报错
  if (map && graphicLayer) {
    map.removeLayer(graphicLayer)
  }
  graphicLayer = null
  map = null
}
