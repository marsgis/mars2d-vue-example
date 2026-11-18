/**
 * 示例：control 控件
 * 演示：两种添加控件的方式——创建地图时传 control 参数、创建后用 map.addControl 动态添加鹰眼图
 * API：mars2d.Map、map.addControl、mars2d.control.OverviewMap
 * 要点：control 里没配置的控件不会创建；position 决定控件停靠角落；鹰眼图要单独配置 basemaps；示例用到的在线瓦片地址需要联网
 */
import * as mars2d from "mars2d"

let map // initMap 创建的地图对象

// ========== 1. 地图初始化（创建地图并添加控件）==========
function initMap() {
  // 添加控件有2种方式:
  // 方式1：在创建地球前的传参中配置control参数
  map = new mars2d.Map("mars2dContainer", {
    zoom: 7,
    center: { lng: 110.522461, lat: 37.509726 },
    control: {
      // 以下是Leaflet所支持的控件相关的options
      scale: true, // 比例尺
      zoom: { position: "bottomleft" },
      layers: { position: "topleft" },

      // 以下是mars2d.control定义的控件
      defaultContextMenu: true, // 右键菜单
      locationBar: {
        // 底部状态栏坐标显示：{lng}{lat} 为经纬度，{crsx}{crsy} 为指定 crs 下的平面坐标
        crs: "CGCS2000_GK_Zone_3",
        template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
      },
      toolBar: { position: "bottomleft" }
    },
    basemaps: [
      {
        name: "蓝色地图",
        icon: "img/basemaps/bd-c-midnight.png",
        type: "gaode",
        layer: "vec",
        customColor: "#11243C", // 用色带把高德底图染成蓝色风格
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
            dashArray: "5 10",
            dashSpeed: -30 // 可以定义运动速度（负值反向流动），注释后是静态的
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

  return map // initMap 的返回值会被 common.js 赋给 window._mapInstance
}

// ========== 2. 清理（与 initMap 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    // destroy() 会一并移除地图上挂载的所有控件（含鹰眼图）
    map.destroy()
    map = null
  }
}
