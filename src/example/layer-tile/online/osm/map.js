/**
 * 示例：OSM(已被封)
 * 演示：用 mars2d.LayerUtil.create({ type:"osm" }) 动态创建 OpenStreetMap 在线图层，再用 addTo 加到地图上
 * API：mars2d.LayerUtil、mars2d.layer.OsmLayer、map.addLayer
 * 要点：OSM 官方瓦片服务在国内网络不可达（示例名已标注「已被封」），不出图属网络环境问题；OsmLayer 内置 url 为 https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png，用自建/镜像服务时改用 type:"tile" 传自己的 url
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let osmLayer // OSM底图图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: [31.834912, 117.220102], // 数组写法是 [lat, lng]
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

  // 地图底图：LayerUtil.create 按 type 创建图层，addTo 等价于 map.addLayer
  osmLayer = mars2d.LayerUtil.create({ type: "osm" }).addTo(map)
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 先移除示例自建的图层，再断开 map 引用；判空保证重复调用不报错
  if (map && osmLayer) {
    map.removeLayer(osmLayer)
  }
  osmLayer = null
  map = null
}
