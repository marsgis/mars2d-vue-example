/**
 * 示例：basemaps 瓦片底图
 * 演示：创建地图时用 basemaps 参数配置多种底图（分组、天地图/高德/腾讯/ArcGIS），在图层控件里切换
 * API：mars2d.Map、mapOptions.basemaps、map.basemap
 * 要点：type:"group" 的项不是瓦片，只是可切换的底图分组；show:true 的项才是默认底图；天地图/ArcGIS 等在线服务需要联网，内网/离线部署要换成本地地址
 */
import * as mars2d from "mars2d"

let map // initMap 创建的地图对象

// ========== 1. 地图初始化 ==========
function initMap() {
  // 在创建地球前的传参中配置basemaps参数
  map = new mars2d.Map("mars2dContainer", {
    zoom: 13,
    center: { lng: 117.240601, lat: 31.827107 },
    control: {
      layers: { position: "topleft" }
    },
    basemaps: [
      {
        id: 10,
        name: "地图底图",
        type: "group" // 分组节点：自身不显示瓦片，只用来在图层控件里归类
      },
      {
        id: 2021,
        pid: 10,
        name: "天地图电子",
        icon: "img/basemaps/tianditumap.png",
        type: "group", // 底图 + 注记两个图层组成的组
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
        show: true // show:true 的才是默认底图
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
        maxNativeZoom: 14, // 地形瓦片最高只到 14 级，超过后由客户端放大显示
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
        chinaCRS: "GCJ02" // 声明该底图使用的国内坐标系，SDK 会与地图坐标系之间自动纠偏
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

  // 根据config配置的id或name属性，更新显示指定的地图底图（示例：map.basemap = "天地图卫星"）
  // map.basemap = "天地图卫星"

  return map // initMap 的返回值会被 common.js 赋给 window._mapInstance
}

// ========== 2. 清理（与 initMap 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.destroy()
    map = null
  }
}
