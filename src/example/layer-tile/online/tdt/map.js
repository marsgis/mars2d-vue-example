import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

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
      show: true
    },
    {
      type: "group",
      name: "天地图影像",
      layers: [
        { type: "tdt", layer: "img_d", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "img_z", key: mars2d.Token.tiandituArr }
      ]
    },
    {
      type: "group",
      name: "天地图地形",
      layers: [
        { type: "tdt", layer: "ter_d", key: mars2d.Token.tiandituArr, errorTileUrl: "img/tile/errortile.png" },
        { type: "tdt", layer: "ter_z", key: mars2d.Token.tiandituArr }
      ]
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

  eventTarget.fire("mapLoaded")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
