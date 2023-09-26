import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

const attributionHtml = `自然资源部 - <span>审图号：GS(2023)336号</span>
 - 甲测资字1100471 - <a href="https://www.tianditu.gov.cn/about/contact.html?type=2" target="_blank" trace="tos">服务条款</a> `

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
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
