/**
 * 电子沙盘
 *
 * @copyright 火星科技 mars2d.cn
 * @author 火星渣渣灰 2022-01-05
 */
import * as mars2d from "mars2d"
export const eventTarget = new mars2d.BaseClass()

let map: mars2d.Map // mars2d.Map三维地图对象

let layersTool: mars2d.control.ToolButton
let basemapsTool: mars2d.control.ToolButton

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars2d.Map): void {
  console.log("tools-button onMounted 初始化")
  map = mapInstance // 记录map

  layersTool = new mars2d.control.ToolButton({
    title: "图层控制",
    position: "bottomleft",
    icon: "/img/icon/manager-layers.svg",
    insertIndex: 1, // 插入的位置顺序, 1是home按钮后面
    click: () => {
      eventTarget.fire("openManageLayer")
    }
  })
  map.addControl(layersTool)
  map.controls.layersTool = layersTool

  if (map.marsOptions.basemaps?.length > 1) {
    basemapsTool = new mars2d.control.ToolButton({
      title: "底图切换",
      position: "bottomleft",
      icon: "/img/icon/manager-basemaps.svg",
      insertIndex: 1, // 插入的位置顺序, 1是home按钮后面
      click: () => {
        eventTarget.fire("openManageBasemaps")
      }
    })
    map.addControl(basemapsTool)
    map.controls.basemapsTool = basemapsTool
  }
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  console.log("tools-button onUnmounted 卸载了")

  if (layersTool) {
    map.removeControl(layersTool)
    layersTool = null
  }

  if (basemapsTool) {
    map.removeControl(basemapsTool)
    basemapsTool = null
  }

  eventTarget.off()
  map = null
}
