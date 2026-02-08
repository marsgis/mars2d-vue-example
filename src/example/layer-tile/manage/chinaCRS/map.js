import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  chinaCRS: mars2d.ChinaCRS.WGS84,
  basemaps: [
    {
      id: 10,
      name: "地图底图",
      type: "group"
    },
    {
      id: 2021,
      pid: 10,
      name: "天地图电子",
      type: "group",
      layers: [
        {
          name: "底图",
          type: "tdt",
          layer: "vec_d"
        },
        {
          name: "注记",
          type: "tdt",
          layer: "vec_z"
        }
      ],
      show: true
    },
    {
      pid: 10,
      name: "高德地图",
      type: "gaode",
      layer: "vec"
    },
    {
      id: 2017,
      pid: 10,
      name: "蓝色地图",
      type: "gaode",
      layer: "vec",
      customColor: "#11243C",
      chinaCRS: "GCJ02"
    }
  ]
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
