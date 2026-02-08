import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 地图瓦片信息
const tileInfo = {
  resolutions: [0.019035688046642241, 0.0095178440233211203, 0.0047589220116605602, 0.0023794610058302801, 0.00118973050291514],
  origin: { x: -400, y: 400 },
  bounds: { xmin: 97.283954, ymin: 25.991721, xmax: 108.60998, ymax: 34.367088 }
}

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: {
    code: "EPSG:4490", // http://epsg.io/4490
    // proj: "+proj=longlat +ellps=GRS80 +no_defs +type=crs",
    resolutions: tileInfo.resolutions,
    origin: [tileInfo.origin.x, tileInfo.origin.y],
    bounds: L.bounds([tileInfo.bounds.xmin, tileInfo.bounds.ymin], [tileInfo.bounds.xmax, tileInfo.bounds.ymax])
  },
  minZoom: 0,
  maxZoom: tileInfo.resolutions.length - 1,
  zoom: 1,
  center: [30.1794045, 102.946967], // 取F12打印的 地图center 值后按需调整
  basemaps: [
    {
      name: "四川省",
      type: "arcgis_cache",
      url: "http://data.mars2d.cn/arcgis_cache/sichuan/_alllayers/{z}/{y}/{x}.png",
      show: true
    }
  ],
  operationallayers: [],
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

  const center = map._crs.unproject(L.point((tileInfo.bounds.xmin + tileInfo.bounds.xmax) / 2, (tileInfo.bounds.ymin + tileInfo.bounds.ymax) / 2))
  console.log("地图center", center)

  // 加矢量数据
  const graphic = new mars2d.graphic.Marker({
    latlng: center,
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
      label: {
        text: "我是测试中心点",
        color: "#0000ff",
        font_size: 15,
        offsetY: -10
      }
    }
  })
  map.graphicLayer.addGraphic(graphic)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
