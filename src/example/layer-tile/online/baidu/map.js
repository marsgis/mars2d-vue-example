import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

const attributionHtml = `© 2023 Baidu - <span>审图号：GS(2023)3206号</span>
- 甲测资字11111342- <a target="_blank" href="https://map.baidu.com/zt/client/service/index.html">服务条款</a>`

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.BAIDU,
  zoom: 12,
  center: { lng: 117.220102, lat: 31.834912 },
  control: {
    scale: true,
    locationBar: {
      crs: "CGCS2000_GK_Zone_3",
      template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
    },
    layers: { position: "topleft" },
    zoom: { position: "bottomleft" },
    toolBar: { position: "bottomleft" }
  },
  basemaps: [
    {
      pid: 10,
      name: "百度地图",
      type: "baidu",
      layer: "vec",
      icon: "baidumap.png",
      crs: "baidu",
      show: true,
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "百度卫星",
      type: "baidu",
      layer: "img",
      icon: "baiduimage.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "电子大字体",
      type: "baidu",
      layer: "vec",
      bigfont: true,
      icon: "baidumap.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "卫星大字体",
      type: "baidu",
      layer: "img",
      bigfont: true,
      icon: "baiduimage.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "草绿地图",
      type: "baidu",
      layer: "custom",
      style: "grassgreen",
      icon: "bd-c-grassgreen.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "深蓝地图",
      type: "baidu",
      layer: "custom",
      style: "midnight",
      icon: "bd-c-midnight.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "浅蓝地图",
      type: "baidu",
      layer: "custom",
      style: "bluish",
      icon: "bd-c-bluish.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "淡蓝地图",
      type: "baidu",
      layer: "custom",
      style: "light",
      icon: "bd-c-light.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "黑色地图",
      type: "baidu",
      layer: "custom",
      style: "dark",
      icon: "bd-c-dark.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "灰色地图",
      type: "baidu",
      layer: "custom",
      style: "grayscale",
      icon: "bd-c-grayscale.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "红色地图",
      type: "baidu",
      layer: "custom",
      style: "redalert",
      icon: "bd-c-redalert.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "粉红地图",
      type: "baidu",
      layer: "custom",
      style: "pink",
      icon: "bd-c-pink.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "墨绿地图",
      type: "baidu",
      layer: "custom",
      style: "darkgreen",
      icon: "bd-c-darkgreen.png",
      crs: "baidu",
      attribution: attributionHtml
    },

    {
      pid: 10,
      name: "简约地图",
      type: "baidu",
      layer: "custom",
      style: "hardedge",
      icon: "bd-c-hardedge.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "谷歌地图",
      type: "baidu",
      layer: "custom",
      style: "googlelite",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      pid: 10,
      name: "离线百度瓦片",
      type: "tile",
      url: "http://data.mars2d.cn/tile/baiduVec/{z}/{x}/{y}.jpg",
      tms: true,
      crs: "baidu",
      icon: "bd-c-googlelite.png",
      attribution: attributionHtml
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addCreditDOM()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  removeCreditDOM()
  map = null
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
