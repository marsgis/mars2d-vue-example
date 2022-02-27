import * as mars2d from "mars2d"

function initMap() {
  // 创建三维地球场景
  const map = new mars2d.Map("mars2dContainer", {
    zoom: 13,
    center: { lng: 117.240601, lat: 31.827107 },
    minZoom: 3,
    maxZoom: 18,
    control: {
      scale: true,
      locationBar: {
        crs: "CGCS2000_GK_Zone_3",
        template: "<div>经度:{lng}</div> <div>纬度:{lat}</div> <div>横{crsx}  纵{crsy}</div> <div>层级:{level}</div>"
      },
      zoom: { position: "bottomleft" },
      toolBar: { position: "bottomleft" },
      layers: { position: "topleft" }
    },
    basemaps: [
      { name: "高德地图", type: "gaode", layer: "vec", show: true },
      {
        name: "高德卫星",
        type: "group",
        layers: [
          { name: "底图", type: "gaode", layer: "img_d" },
          { name: "注记", type: "gaode", layer: "img_z" }
        ]
      }
    ],
    operationallayers: [{ name: "经纬网", type: "graticule" }]
  })

  // 打印测试信息
  console.log("mars2d的Map主对象构造完成", map)

  return map
}
