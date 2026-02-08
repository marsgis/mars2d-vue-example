import * as mars2d from "mars2d"
const L = mars2d.L

// 地图瓦片信息
const tileInfo = {
  resolutions: [396.87579375158754, 305.74872470578276, 152.87436235289138, 76.437179853526374],
  origin: { x: 33876800, y: 10002100 },
  bounds: { xmin: 39397376.21529983, ymin: 3811337.7700739773, xmax: 39553472.811626874, ymax: 3984005.5674397806 }
}

let map // mars2d.Map二维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  crs: {
    code: "EPSG:4527", // http://epsg.io/4527
    proj: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
    resolutions: tileInfo.resolutions,
    origin: [tileInfo.origin.x, tileInfo.origin.y],
    bounds: L.bounds([tileInfo.bounds.xmin, tileInfo.bounds.ymin], [tileInfo.bounds.xmax, tileInfo.bounds.ymax])
  },
  minZoom: 0,
  maxZoom: tileInfo.resolutions.length - 1,
  zoom: 1,
  center: [35.325, 116.717], // center不是arcgis里面的值，此处正常标准经纬度就行
  basemaps: [
    {
      name: "山东某市",
      type: "arcgis_cache",
      url: "http://data.mars2d.cn/arcgis_cache/shandongImg/_alllayers/{z}/{y}/{x}.png",
      upperCase: false,
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
