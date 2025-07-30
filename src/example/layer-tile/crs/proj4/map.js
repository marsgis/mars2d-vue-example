import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: {
    code: "GEOGCS",
    proj: "+proj=longlat +ellps=GRS80 +no_defs",
    resolutions: [
      0.019035688046642241, 0.0095178440233211203, 0.0047589220116605602, 0.0023794610058302801, 0.00118973050291514, 0.00059486525145757002,
      0.00029743262572878501, 0.00015228550437313792, 7.6142752186568962e-5, 3.8071376093284481e-5
    ],
    origin: [-400, 400],
    bounds: L.bounds([97.283954, 25.991721], [108.60998, 34.367088])
  },
  zoom: 1,
  center: [29.920102, 102.634912],
  minZoom: 0,
  maxZoom: 3,
  basemaps: [],
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
    type: "arcgis_cache",
    url: "http://data.mars2d.cn/arcgis_cache/sichuan/_alllayers/{z}/{y}/{x}.png"
  }).addTo(map)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
