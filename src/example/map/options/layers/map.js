/**
 * 示例：operationallayers 叠加图层
 * 演示：三种添加叠加图层的方式——创建地图时传 operationallayers、创建后 new XxxLayer 再 addLayer、用 LayerUtil.create 工厂创建
 * API：mars2d.Map、map.addLayer、mars2d.layer.TileLayer、mars2d.LayerUtil.create
 * 要点：经纬网 graticule 不需要数据；瓦片图层按 rectangle 限定范围、按 maxZoom 限定层级，避免请求超出范围的瓦片；天地图 tk 是示例 token，正式使用要换成自己的
 */
import * as mars2d from "mars2d"

let map // initMap 创建的地图对象

// ========== 1. 地图初始化（传参方式添加图层）==========
function initMap() {
  // 添加可叠加图层有3种方式（参数除指定的type类型外无需type参数，其他参数都相同）:
  // 方式1：在创建地球前的传参中配置 operationallayers 参数
  map = new mars2d.Map("mars2dContainer", {
    zoom: 5,
    center: { lng: 110.522461, lat: 37.509726 },
    control: {
      layers: { position: "topleft" }
    },
    basemaps: [
      {
        id: 2021,
        pid: 10,
        name: "天地图电子",
        icon: "img/basemaps/tianditumap.png",
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
      }
    ],
    operationallayers: [
      {
        name: "中国地质",
        type: "tile",
        url: "https://data.mars3d.cn/tile/dizhiChina/{z}/{x}/{y}.png",
        minZoom: 0,
        maxZoom: 10,
        // 瓦片只覆盖中国范围，用 rectangle 限定请求范围
        rectangle: { xmin: 69.706929, xmax: 136.560941, ymin: 15.831038, ymax: 52.558005 }
      },
      { name: "经纬网", type: "graticule" }
    ]
  })

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.TileLayer({
    name: "行政区划界线",
    url: "https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=bcc62222fc634ec736589c483de933e6",
    subdomains: "01234567", // {s} 占位符按子域轮询，提高并发加载速度
    maxZoom: 10
  })
  map.addLayer(layer)

  // 方式3：在创建地图后调用addLayer添加图层(用 mars2d.LayerUtil.create 工厂方法创建)
  const layerImg = mars2d.LayerUtil.create({
    type: "image",
    url: "//data.mars2d.cn/file/img/radar/201906211112.PNG",
    rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
    alpha: 0.7 // 图片图层整体透明度
  })
  map.addLayer(layerImg)

  return map // initMap 的返回值会被 common.js 赋给 window._mapInstance
}

// ========== 2. 清理（与 initMap 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy() // 一并释放所有图层
    map = null
  }
}
