import * as mars2d from "mars2d"

export let map // mars2d.Map二维地图对象

const creditHtml = `©2023 中科星图- <span>审图号：GS (2023) 1924号</span>
-  甲测资字11111577 - <a href="https://geovisearth.com/declaration#/user" target="_blank" trace="tos">服务条款</a> `

// 请自行申请token后替换，星图地球官方地址：https://datacloud.geovisearth.com/support/map/summary
const geovisearthToken = "18716afaf1db7ed415795d670a3c9eb4cec0fd8e046a946ffd65e6d8ccf9ad25"

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  maxZoom: 21,
  // center: { lng: 113.172226, lat: 36.329509 },
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      name: "星图影像",
      icon: "img/basemap/tdt_img.png",
      type: "group",
      layers: [
        {
          name: "底图",
          type: "tile",
          url: "https://tiles{s}.geovisearth.com/base/v1/img/{z}/{x}/{y}?token=" + geovisearthToken,
          subdomains: "123"
        },
        {
          name: "注记",
          type: "tile",
          url: "https://tiles{s}.geovisearth.com/base/v1/cia/{z}/{x}/{y}?token=" + geovisearthToken,
          subdomains: "123"
        }
      ],
      credit: creditHtml
    },
    {
      name: "星图电子",
      icon: "img/basemap/tdt_vec.png",
      type: "tile",
      url: "https://tiles{s}.geovisearth.com/base/v1/vec/{z}/{x}/{y}?token=" + geovisearthToken,
      subdomains: "123",
      credit: creditHtml,
      show: true
    }
  ]
}

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  addCreditDOM()
  addTestMarker()

  eventTarget.fire("mapLoaded")
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  removeCreditDOM()
  map = null
}

// 设置WGS84坐标参照物(辨识是否纠偏)
function addTestMarker() {
  const graphic = new mars2d.graphic.Marker({
    latlng: [31.835299, 117.216588],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例1" }
  })
  map.graphicLayer.addGraphic(graphic)

  graphic.bindPopup("<p>我是WGS84坐标下，望江西路与怀宁路交口</p>").openPopup()
}

// 在下侧状态栏增加一个额外div展示图层版权信息
let attributionDOM
function addCreditDOM() {
  const locationBar = map.controls.locationBar?._container
  if (locationBar) {
    attributionDOM = L.DomUtil.create("div", "mars2d-locationbar-content mars2d-locationbar-autohide", locationBar)
    attributionDOM.style["pointer-events"] = "all"
    attributionDOM.style.float = "right"
    attributionDOM.style.marginRight = "50px"

    attributionDOM.innerHTML = map.basemap?.options?.attribution || ""

    map.on("baselayerchange", function (event) {
      attributionDOM.innerHTML = map.basemap?.options?.attribution || ""
    })
  }
}
function removeCreditDOM() {
  if (attributionDOM) {
    L.DomUtil.remove(attributionDOM)
    attributionDOM = null
  }
}
