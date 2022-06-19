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
        name: "OSM地图",
        type: "xyz",
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        subdomains: "abc",
        icon: "img/basemaps/bingmap.png"
      },
      {
        pid: 10,
        name: "ArcGIS地图",
        type: "tile",
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
        chinaCRS: "GCJ02",
        icon: "img/basemaps/bd-c-googlelite.png"
      },
      {
        pid: 10,
        name: "ArcGIS卫星",
        type: "arcgis",
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        icon: "img/basemaps/bingimage.png"
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
        layer: "img",
        icon: "img/basemaps/bingimage.png"
      },
      {
        pid: 10,
        name: "谷歌地图",
        type: "google",
        layer: "vec",
        chinaCRS: "GCJ02",
        icon: "img/basemaps/googlemap.png"
      },
      {
        pid: 10,
        name: "谷歌卫星",
        type: "google",
        layer: "img",
        chinaCRS: "GCJ02",
        icon: "img/basemaps/googleimage.png"
      },
      {
        pid: 10,
        name: "灰色地图",
        type: "arcgis",
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer",
        chinaCRS: "GCJ02",
        icon: "img/basemaps/bd-c-grayscale.png"
      },
      {
        id: 2017,
        pid: 10,
        name: "蓝色地图",
        type: "arcgis",
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        chinaCRS: "GCJ02",
        icon: "img/basemaps/bd-c-midnight.png"
      }
    ]
  })

  // 根据config配置的id或name属性，更新显示指定的地图底图
  // map.basemap = '离线地图'


}
