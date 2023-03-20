import * as mars2d from "mars2d"

function initMap() {
  // 添加控件有2种方式:
  // 方式1：在创建地球前的传参中配置control参数
  const map = new mars2d.Map("mars2dContainer", {
    zoom: 5,
    center: { lng: 110.522461, lat: 37.509726 },
    control: {
      // 以下是Leaflet所支持的控件相关的options
      scale: true,
      zoom: { position: "bottomleft" },
      layers: { position: "topleft" },

      // 以下是mars2d.control定义的控件
      defaultContextMenu: true, // 右键菜单
      locationBar: {
        crs: "CGCS2000_GK_Zone_3",
        template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
      },
      toolBar: { position: "bottomleft" }
    },
    basemaps: [
      {
        name: "蓝色地图",
        type: "arcgis",
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        chinaCRS: "GCJ02",
        show: true
      }
    ],
    operationallayers: [
      {
        name: "全国省界",
        type: "geojson",
        url: "http://data.mars2d.cn/file/geojson/areas/100000_full.json",
        symbol: {
          type: "polyline",
          styleOptions: {
            width: 2,
            color: "#ff0000",
            dashArray: "5 10"
          }
        },
        popup: "all"
      }
    ]
  })

  // 方式2：在创建地图后按需调用addControl添加(直接new对应type类型的控件)
  const overviewMap = new mars2d.control.OverviewMap({
    position: "topright",
    mapOptions: {
      basemaps: [
        {
          type: "tile",
          url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
          show: true
        }
      ]
    }
  })
  map.addControl(overviewMap)
}
