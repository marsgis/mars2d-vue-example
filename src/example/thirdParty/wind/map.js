/**
 * 示例：风向图
 * 演示：请求在线风场数据，用第三方插件 L.WindLayer 以 Canvas 粒子动画绘制全球风向、风速
 * API：L.WindLayer（leaflet-wind 插件，非 mars2d 内置类）、mars2d.Util.fetchJson、map.addLayer
 * 要点：插件由 example.json 的 libs（leaflet-wind）加载到 window，L 来自全局；数据是 U/V 风速分量的格点数据，由插件内部 formatData 解析，格式与所用插件版本绑定、不要自己改结构；paths 粒子数 10000 + frameRate 50 较耗 CPU，低配机器要调小
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let windLayer // 风场图层，卸载时移除以停止内部 requestAnimationFrame 粒子动画

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 3,
  center: { lng: 26.894531, lat: 31.203405 },
  // 风场数据覆盖全球，平移过 180° 经线时要跟着跳到另一侧世界副本
  worldCopyJump: true
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.basemap = 2017 // 切换为 config.json 中 id=2017 的蓝色底图

  showWindLayer()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && windLayer) {
    map.removeLayer(windLayer) // WindLayer.onRemove 会停止粒子动画并移除 canvas
  }
  windLayer = null
  if (map) {
    map.destroy() // 释放地图 DOM、底图与事件监听
    map = null
  }
}

// ========== 4. 风场图层 ==========
// 显示风向图
async function showWindLayer() {
  let data
  try {
    data = await mars2d.Util.fetchJson({ url: "https://sakitam.oss-cn-beijing.aliyuncs.com/codepen/wind-layer/json/wind.json" })
  } catch (error) {
    console.log("请求出错了", error)
    return
  }
  // 示例切换后请求可能才返回，此时地图已销毁，直接丢弃数据
  if (!map) {
    return
  }

  // WindLayer API文档：https://blog.sakitam.com/wind-layer/guide/index
  windLayer = new L.WindLayer("wind", data, {
    windOptions: {
      colorScale: [
        "rgb(36,104, 180)",
        "rgb(60,157, 194)",
        "rgb(128,205,193 )",
        "rgb(151,218,168 )",
        "rgb(198,231,181)",
        "rgb(238,247,217)",
        "rgb(255,238,159)",
        "rgb(252,217,125)",
        "rgb(255,182,100)",
        "rgb(252,150,75)",
        "rgb(250,112,52)",
        "rgb(245,64,32)",
        "rgb(237,45,28)",
        "rgb(220,24,32)",
        "rgb(180,0,35)"
      ],
      velocityScale: 1 / 20, // 对于粒子路径步长的乘积基数
      paths: 10000, // 粒子数量，数量越大越平滑但越耗 CPU
      frameRate: 50,
      lineWidth: 2, // 粒子路径宽度
      maxAge: 80, // 粒子路径能够生成的最大帧数
      globalAlpha: 0.9 // 全局透明度，主要影响粒子路径拖尾效果
    }
  })
  map.addLayer(windLayer)
}
