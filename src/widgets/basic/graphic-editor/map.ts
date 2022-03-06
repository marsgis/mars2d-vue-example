import * as mars2d from "mars2d"

let map: mars2d.Map // 地图对象

// 初始化当前业务
export function onMounted(mapInstance: mars2d.Map): void {
  map = mapInstance // 记录map
}
// 释放当前业务
export function onUnmounted(): void {
  map = null
}

export function downloadFile(fileName: string, content: string) {
  mars2d.Util.downloadFile(fileName, content)
}

export function pointTrans(points: any) {
  return mars2d.PointTrans.coords2latlngs(points)
}

// 定位至矢量数据
export function flyToGrapgic(graphic: any) {
  map.flyToGraphic(graphic, { scale: 1.0 })
}
