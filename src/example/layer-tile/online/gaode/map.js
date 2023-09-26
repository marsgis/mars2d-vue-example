import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
export const eventTarget = new mars2d.BaseClass()

const attributionHtml = `©2023 高德软件- <span>审图号：GS(2021)6375号</span>
- 甲测资字11111093 - <a href="https://map.amap.com/doc/serviceitem.html" target="_blank" trace="tos">服务条款</a> `

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  basemaps: [
    {
      name: "高德地图",
      type: "gaode",
      layer: "vec",
      show: true,
      attribution: attributionHtml
    },
    {
      name: "高德卫星",
      type: "group",
      layers: [
        {
          type: "gaode",
          layer: "img_d"
        },
        {
          type: "gaode",
          layer: "img_z"
        }
      ],
      attribution: attributionHtml
    },
    {
      name: "高德大字体地图",
      type: "gaode",
      layer: "vec",
      bigfont: true,
      attribution: attributionHtml
    }
  ],
  operationallayers: [
    {
      name: "实时交通信息",
      type: "gaode",
      layer: "time"
    }
  ]
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addCreditDOM()

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
