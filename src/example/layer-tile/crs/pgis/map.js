import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.PGIS,
  center: [39.132578, 117.186008],
  minZoom: 11,
  maxZoom: 17,
  zoom: 11,
  maxBounds: [
    [-90, -180],
    [90, 180]
  ],
  worldCopyJump: true,
  control: {
    scale: true,
    locationBar: {
      template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>层级:{level}</div>"
    },
    zoom: { position: "bottomleft" },
    toolBar: { position: "bottomleft" }
  }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加底图
  mars2d.LayerUtil.create({
    type: "tile",
    url: "http://127.0.0.1/QuadServer/services/maps/wmts100?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=CGC2000&STYLE=Default&FORMAT=image/jpeg&TILEMATRIXSET=PGIS_TILE_STORE&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    minZoom: 11,
    maxZoom: 17
  }).addTo(map)

  globalNotify("功能和已知问题 提示：", `(1) 需要自行部署或接入内网PGIS服务后，修改url才能体验。`, { duration: null })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
