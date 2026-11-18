/**
 * 示例：PGIS底图
 * 演示：用 crs: mars2d.CRS.PGIS 加载警用 PGIS 的 WMTS 瓦片服务（QuadServer），并限制缩放级别与可拖动范围
 * API：mars2d.CRS、mars2d.LayerUtil.create、map.addLayer
 * 要点：示例 url 指向 127.0.0.1 的本地 QuadServer，必须自行部署/接入内网 PGIS 并改 url 才能出图；PGIS 使用 512 像素瓦片（PGIS_TILE_STORE 矩阵）；center 用数组时按 [lat, lng] 顺序，与 {lng, lat} 对象写法相反，容易写错
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let pgisLayer // PGIS底图图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: mars2d.CRS.PGIS,
  center: [39.132578, 117.186008], // 数组写法是 [lat, lng]
  minZoom: 11,
  maxZoom: 17,
  zoom: 11,
  maxBounds: [
    [-90, -180],
    [90, 180]
  ],
  // 在地图边界处拖动时跳回另一侧，避免拖出世界范围
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

// ========== 2. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加底图
  pgisLayer = mars2d.LayerUtil.create({
    type: "tile",
    // PGIS 服务地址：示例为本地 QuadServer，实际使用时替换成内网 PGIS 服务；{z}/{y}/{x} 等占位符由 TileLayer 替换
    url: "http://127.0.0.1/QuadServer/services/maps/wmts100?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=CGC2000&STYLE=Default&FORMAT=image/jpeg&TILEMATRIXSET=PGIS_TILE_STORE&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
    minZoom: 11,
    maxZoom: 17
  }).addTo(map)

  // 本地服务未部署时给出提示，避免误以为是示例代码问题
  globalNotify("功能和已知问题 提示：", `(1) 需要自行部署或接入内网PGIS服务后，修改url才能体验。`, { duration: null })
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 先移除示例自建的底图图层，再断开 map 引用；判空保证重复调用不报错
  if (map && pgisLayer) {
    map.removeLayer(pgisLayer)
  }
  pgisLayer = null
  map = null
}
