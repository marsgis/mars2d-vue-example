import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

const attributionHtml = `©2023 Tencent - <span>审图号：GS(2023)1号</span>
- <a target="_blank" href="https://lbs.qq.com/terms.html">服务条款</a>`

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  basemaps: [
    { name: "电子地图", type: "tencent", layer: "vec", attribution: attributionHtml, show: true },
    {
      type: "group",
      name: "卫星地图",
      layers: [
        { type: "tencent", layer: "img_d" },
        { type: "tencent", layer: "img_z" }
      ],
      attribution: attributionHtml
    },
    { name: "灰白地图", type: "tencent", layer: "custom", style: 3, attribution: attributionHtml },
    { name: "暗色地图", type: "tencent", layer: "custom", style: 4, attribution: attributionHtml }
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
