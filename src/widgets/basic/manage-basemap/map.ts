/**
 * 底图控制
 * @copyright 火星科技 mars2d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars2d from "mars2d"

let map: mars2d.Map // 地图对象

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars2d.Map): void {
  map = mapInstance // 记录map

  const baseMaps = map.getBasemaps(true)
  eventTarget.fire("mapLoaded", { baseMaps })
}

// 释放当前业务
export function onUnmounted(): void {
  map = null
}

export function changeBaseMaps(id: string) {
  map.basemap = id
}

