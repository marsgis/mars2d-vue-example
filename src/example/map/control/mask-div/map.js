/**
 * 示例：蒙板遮盖
 * 演示：用 GeoJsonLayer 的 mask 参数绘制区域反选遮罩，再叠加一层渐变 DOM 蒙版突出中心区域
 * API：mars2d.layer.GeoJsonLayer、map.addLayer、map.basemap
 * 要点：mask:true 依赖外部 geojson 数据加载完成；渐变蒙版是纯 DOM 覆盖层，不参与地图渲染，必须手动移除；删除 control 配置是为了让控件不遮挡蒙版效果
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let maskDiv // 覆盖在地图上的渐变蒙版

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export function mapOptions(options) {
  delete options.control
  return options
}

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.basemap = 2017 // 切换至蓝色底图（2017 是 config.json 中该底图的 id）

  // geojson 合肥边界线：mask:true 时图层会绘制成遮罩，边界内被抠空、边界外压暗
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

  // ========== 2. 渐变蒙版（DOM 覆盖层）==========
  // 蒙版挂在 document.body 上、与 #centerDiv2D 同为 z-index:100，靠 DOM 后插入的顺序覆盖在地图之上
  maskDiv = document.createElement("div")
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

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 蒙版挂在 document.body 上，不随地图销毁，需手动移除
  if (maskDiv) {
    maskDiv.remove()
    maskDiv = null
  }
  if (map) {
    map.destroy()
    map = null
  }
}
