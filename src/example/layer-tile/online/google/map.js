import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    { name: "谷歌地图", type: "google", layer: "vec", show: true },
    {
      type: "group",
      name: "谷歌影像",
      layers: [
        { type: "google", layer: "img_d" },
        { type: "google", layer: "img_z" }
      ]
    },
    { name: "谷歌地形", type: "google", layer: "ter" }
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

  globalNotify(
    "已知问题提示",
    `如图层未显示或服务URL访问超时，是因为目前国家测绘主管部门对未经审核批准的国外地图服务做了屏蔽封锁。
     您可以需翻墙使用 或 参考示例代码替换本地服务地址使用。`
  )
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
