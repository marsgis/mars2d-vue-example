import * as mars2d from "mars2d"

function initMap() {
  // 添加可叠加图层有3种方式（参数除指定的type类型外无需type参数，其他参数都相同）:
  // 方式1：在创建地球前的传参中配置layers参数
  const map = new mars2d.Map("mars2dContainer", {
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
        rectangle: { xmin: 69.706929, xmax: 136.560941, ymin: 15.831038, ymax: 52.558005 }
      },
      { name: "经纬网", type: "graticule" }
    ]
  })

  // 方式2：在创建地图后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars2d.layer.TileLayer({
    name: "行政区划界线",
    url: "https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=bcc62222fc634ec736589c483de933e6",
    subdomains: "01234567",
    maxZoom: 10
  })
  map.addLayer(layer)

  // 方式3：在创建地图后调用addLayer添加图层(用 mars2d.layer.create工厂方法创建)
  const layerImg = mars2d.LayerUtil.create({
    type: "image",
    url: "//data.mars2d.cn/file/img/radar/201906211112.PNG",
    rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
    alpha: 0.7
  })
  map.addLayer(layerImg)
}
