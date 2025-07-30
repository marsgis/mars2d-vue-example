import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export function mapOptions (options) {
  delete options.control
  return options
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.basemap = 2017 // 切换至蓝色底图

  // geojson 合肥边界线
  const geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    url: "//data.mars2d.cn/file/geojson/areas/340100.json",
    mask: true, // 标识为遮罩层【重点参数】
    symbol: {
      styleOptions: {
        fill: true,
        color: "rgb(2,26,79)",
        opacity: 0.9,
        outline: true,
        outlineColor: "#39E09B",
        outlineWidth: 8,
        outlineOpacity: 0.8,
        clampToGround: true
      }
    }
  })
  map.addLayer(geoJsonLayer)

  const centerDiv2D = document.querySelector("#centerDiv2D")
  if (centerDiv2D) {
    console.log(centerDiv2D)
    centerDiv2D.style.zIndex = "none"
  }

  // 添加蒙版
  const maskDiv = document.createElement("div")
  maskDiv.className = "maskDiv"
  document.body.appendChild(maskDiv)
  maskDiv.style.cssText = `
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index:100;
  background-image: radial-gradient(rgba(139, 138, 138, 0.219) 50%,
  rgba(65, 57, 57, 0.658) 70%,
  rgba(17, 16, 16, 1) 90%);`
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
