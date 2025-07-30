import * as mars2d from "mars2d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 2,
  center: { lng: 90, lat: -16.972741 },
  worldCopyJump: true
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.basemap = 2017 // 切换至蓝色底图

  showWindLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 显示热力图
async function showWindLayer() {
  const data = await mars2d.Util.fetchJson({ url: "https://sakitam.oss-cn-beijing.aliyuncs.com/codepen/wind-layer/json/wind.json" })

  // WindLayer API文档：https://blog.sakitam.com/wind-layer/guide/index
  const windLayer = new L.WindLayer("wind", data, {
    windOptions: {
      // colorScale: (m) => {
      //   // console.log(m);
      //   return '#fff';
      // },
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
      paths: 10000,
      frameRate: 50,
      lineWidth: 2, // 粒子路径宽度
      maxAge: 80, // 粒子路径能够生成的最大帧数
      globalAlpha: 0.9 // 全局透明度，主要影响粒子路径拖尾效果
    }
  })
  map.addLayer(windLayer)
}
