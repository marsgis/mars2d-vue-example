/**
 * 示例：自定义工具栏按钮
 * 演示：用 mars2d.control.ToolButton 往内置工具栏里追加自定义图标按钮，并绑定单击回调
 * API：mars2d.control.ToolButton、map.addControl
 * 要点：insertIndex 控制插入位置（0 为最前，1 为 home 按钮之后），不传时按位置参数插入到最前/最后；click 回调中用 globalMsg 弹提示，自定义业务逻辑写在这里
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
const toolButtons = []

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    toolBar: {
      item: ["home", "fullscreen"] // 默认视域按钮;全屏按钮
    },
    zoom: false
  }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const toolButton = new mars2d.control.ToolButton({
    title: "示例按钮bookmark",
    icon: "img/icon/kaifashili.svg",
    insertIndex: 1, // 插入的位置顺序, 1是home按钮后面
    click: () => {
      globalMsg("单击了 示例按钮bookmark，回调中想干啥就干啥~")
    }
  })
  map.addControl(toolButton)
  toolButtons.push(toolButton)

  const toolButton2 = new mars2d.control.ToolButton({
    title: "示例按钮good",
    icon: "img/icon/good.svg",
    insertIndex: 0, // 插入的位置顺序，0 表示放在工具栏最前面
    click: () => {
      globalMsg("单击了 示例按钮good，回调中想干啥就干啥~")
    }
  })
  map.addControl(toolButton2)
  toolButtons.push(toolButton2)

  const toolButton3 = new mars2d.control.ToolButton({
    title: "示例按钮chinese",
    icon: "img/icon/chinese.svg",
    click: () => {
      globalMsg("单击了 示例按钮chinese，回调中想干啥就干啥~")
    }
  })
  map.addControl(toolButton3)
  toolButtons.push(toolButton3)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map) {
    // removeControl 会移除按钮 DOM，并解绑 ToolButton.addTo 注册到地图 unload 上的监听
    toolButtons.forEach((control) => {
      map.removeControl(control)
    })
  }
  toolButtons.length = 0
  map = null
}
