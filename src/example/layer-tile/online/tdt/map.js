import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

const attributionHtml = `©2024 自然资源部 - <span>审图号：GS(2024)0568号</span>
 - 甲测资字1100471 - <a href="https://www.tianditu.gov.cn/about/contact.html?type=2" target="_blank" trace="tos">服务条款</a> `

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  maxZoom: 21,
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      type: "group",
      name: "天地图电子",
      layers: [
        { type: "tdt", layer: "vec_d", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "vec_z", key: mars2d.Token.tiandituArr }
      ],
      show: true,
      attribution: attributionHtml
    },
    {
      type: "group",
      name: "天地图影像",
      layers: [
        { type: "tdt", layer: "img_d", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "img_z", key: mars2d.Token.tiandituArr }
      ],
      attribution: attributionHtml
    },
    {
      type: "group",
      name: "天地图地形",
      layers: [
        { type: "tdt", layer: "ter_d", key: mars2d.Token.tiandituArr, errorTileUrl: "img/tile/errortile.png" },
        { type: "tdt", layer: "ter_z", key: mars2d.Token.tiandituArr }
      ],
      attribution: attributionHtml
    }
  ]
}

export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addCreditDOM()
  addTestMarker()

  eventTarget.fire("mapLoaded")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
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
