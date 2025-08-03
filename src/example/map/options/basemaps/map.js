import * as mars2d from "mars2d"

function initMap() {
  // 在创建地球前的传参中配置basemaps参数
  const map = new mars2d.Map("mars2dContainer", {
    zoom: 13,
    center: { lng: 117.240601, lat: 31.827107 },
    control: {
      layers: { position: "topleft" }
    },
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
      },
      {
        pid: 10,
        name: "天地图卫星",
        icon: "img/basemaps/tiandituimage.png",
        type: "tdt",
        layer: "img"
      },
      {
        pid: 10,
        name: "天地图地形",
        icon: "img/basemaps/tianditudem.png",
        type: "tdt",
        layer: "ter",
        maxNativeZoom: 14,
        errorTileUrl: "img/tile/errortile.png"
      },
      {
        pid: 10,
        name: "高德地图",
        type: "gaode",
        layer: "vec",
        icon: "img/basemaps/bingmap.png"
      },
      {
        pid: 10,
        name: "高德卫星",
        type: "gaode",
        layer: "img_d",
        icon: "img/basemaps/bingimage.png"
      },
      {
        pid: 10,
        name: "腾讯电子",
        icon: "/img/basemaps/tencent_vec.png",
        type: "tencent",
        layer: "vec"
      },
      {
        pid: 10,
        name: "腾讯影像",
        icon: "/img/basemaps/tencent_img.png",
        type: "group",
        layers: [
          { name: "底图", type: "tencent", layer: "img_d" },
          { name: "注记", type: "tencent", layer: "img_z" }
        ]
      },
      {
        pid: 10,
        name: "ArcGIS电子",
        icon: "img/basemaps/bd-c-googlelite.png",
        type: "tile",
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        chinaCRS: "GCJ02"
      },
      {
        pid: 10,
        name: "ArcGIS影像",
        icon: "img/basemaps/bingimage.png",
        type: "arcgis",
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
      }
    ]
  })

  // 根据config配置的id或name属性，更新显示指定的地图底图
  // map.basemap = '离线地图'
}
