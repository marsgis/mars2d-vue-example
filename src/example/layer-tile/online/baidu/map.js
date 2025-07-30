import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

const attributionHtml = `©2024 Baidu - <span>审图号：GS(2023)3206号</span>
- 甲测资字11111342- <a target="_blank" href="https://map.baidu.com/zt/client/service/index.html">服务条款</a>`

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.BAIDU,
  zoom: 12,
  center: { lng: 117.220102, lat: 31.834912 },
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      name: "百度地图",
      type: "baidu",
      layer: "vec",
      icon: "img/basemaps/baidumap.png",
      crs: "baidu",
      show: true,
      attribution: attributionHtml
    },
    {
      name: "百度卫星",
      type: "baidu",
      layer: "img",
      icon: "img/basemaps/baiduimage.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "电子大字体",
      type: "baidu",
      layer: "vec",
      bigfont: true,
      icon: "img/basemaps/baidumap.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "卫星大字体",
      type: "baidu",
      layer: "img",
      bigfont: true,
      icon: "img/basemaps/baiduimage.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "草绿地图",
      type: "baidu",
      layer: "custom",
      style: "grassgreen",
      icon: "img/basemaps/bd-c-grassgreen.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "深蓝地图",
      type: "baidu",
      layer: "custom",
      style: "midnight",
      icon: "img/basemaps/bd-c-midnight.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "浅蓝地图",
      type: "baidu",
      layer: "custom",
      style: "bluish",
      icon: "img/basemaps/bd-c-bluish.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "淡蓝地图",
      type: "baidu",
      layer: "custom",
      style: "light",
      icon: "img/basemaps/bd-c-light.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "黑色地图",
      type: "baidu",
      layer: "custom",
      style: "dark",
      icon: "img/basemaps/bd-c-dark.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "灰色地图",
      type: "baidu",
      layer: "custom",
      style: "grayscale",
      icon: "img/basemaps/bd-c-grayscale.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "红色地图",
      type: "baidu",
      layer: "custom",
      style: "redalert",
      icon: "img/basemaps/bd-c-redalert.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "粉红地图",
      type: "baidu",
      layer: "custom",
      style: "pink",
      icon: "img/basemaps/bd-c-pink.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "墨绿地图",
      type: "baidu",
      layer: "custom",
      style: "darkgreen",
      icon: "img/basemaps/bd-c-darkgreen.png",
      crs: "baidu",
      attribution: attributionHtml
    },

    {
      name: "简约地图",
      type: "baidu",
      layer: "custom",
      style: "hardedge",
      icon: "img/basemaps/bd-c-hardedge.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "谷歌地图",
      type: "baidu",
      layer: "custom",
      style: "googlelite",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "离线百度瓦片",
      type: "tile",
      url: "http://data.mars2d.cn/tile/baiduVec/{z}/{x}/{y}.jpg",
      tms: true,
      crs: "baidu",
      icon: "img/basemaps/bd-c-googlelite.png",
      attribution: attributionHtml
    }
  ],
  operationallayers: [
    { name: "实时路况", type: "baidu", layer: "time" }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addCreditDOM()

  addTestMarker()
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
