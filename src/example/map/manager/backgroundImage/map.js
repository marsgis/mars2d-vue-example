/**
 * 示例：设置地图背景
 * 演示：给地图容器设置背景图，并用滑动条调整底图透明度，模拟"底图半透明后透出背景图"的效果
 * API：map.container、map.basemap、map.on(EventType.layerremove)
 * 要点：背景图地址是相对 iframe 文档（/temp/ 下）的路径，部署到子目录时不能改成绝对路径；底图被移除后 map.basemap 可能为空，需判空；opacity 取值 0-1
 */
import * as mars2d from "mars2d"

let map
let basemapOpacity = 1 // 底图透明度，面板滑动条传的是百分数，这里存换算后的 0-1
let layerRemoveTimer // 图层移除后延迟恢复透明度的定时器

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // iframe 文档位于 /temp/ 下，背景图在上一级的 img 目录；用相对路径，部署到子目录也不会失效
  map.container.style.backgroundImage = "url(../img/photo/logo.png)"

  map.on(mars2d.EventType.layerremove, onLayerRemove)
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    map.off(mars2d.EventType.layerremove, onLayerRemove)
  }
  clearTimeout(layerRemoveTimer)
  layerRemoveTimer = null
  if (map) {
    map.destroy()
    map = null
  }
}

// ========== 3. 事件与面板交互 ==========
function onLayerRemove() {
  clearTimeout(layerRemoveTimer)
  // 图层移除是异步完成的（切换底图时先移除旧底图再加入新底图），延迟恢复透明度
  layerRemoveTimer = setTimeout(() => {
    // 底图被移除时 map.basemap 可能已为空，需判空
    if (map && map.basemap) {
      map.basemap.opacity = basemapOpacity
    }
  }, 100)
}

export function opacityChange(opacity) {
  basemapOpacity = opacity / 100
  if (map && map.basemap) {
    map.basemap.opacity = basemapOpacity
  }
}
