/**
 * 示例：油气站标注
 * 演示：同一批点位用三种 DivGraphic 样式展示（黑底面板、蓝渐变面板、竖立文本），由面板按钮切换
 * API：mars2d.graphic.DivGraphic/DivUpLabel、graphicLayer.clear
 * 要点：切换样式前先 clear() 再重建，否则三种样式会叠加；html 里的 ${item.name} 是模板字符串直接拼接，真实项目要对业务数据做转义；竖立文本用 DivUpLabel 的 lineHeight、circleSize 控制文字间距与端点大小
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let graphicLayer

const arrData = [
  { name: "火龙地路", position: [31.815903, 117.092323] },
  { name: "复兴路", position: [31.817809, 117.094597] },
  { name: "蒲塘村", position: [31.818401, 117.094152] },
  { name: "方兴大道", position: [31.815411, 117.096705] },
  { name: "方兴大道快速路", position: [31.818178, 117.096872] },
  { name: "柏堰湾路", position: [31.813496, 117.093573] },
  { name: "岳小河改道", position: [31.816231, 117.097843] }
]

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 17,
  center: { lng: 117.095729, lat: 31.81624 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建DIV数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  divGraphicYellow()
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 清空面板通过 eventTarget 注册的监听，避免旧面板回调残留
  eventTarget.off()
  if (map) {
    map.destroy() // 一并释放图层与其中的 DivGraphic
    map = null
  }
  graphicLayer = null
}

// ========== 4. 面板交互方法：三种标注效果 ==========
// 效果一
export function divGraphicYellow() {
  graphicLayer.clear()

  for (let i = 0; i < arrData.length; i++) {
    const item = arrData[i]

    const divGraphic = new mars2d.graphic.DivGraphic({
      latlng: item.position,
      style: {
        html: `<div class="marsBlackPanel  animation-spaceInDown">
                        <div class="marsBlackPanel-text" style="">
                          ${item.name} <span class="temperature"></span> ℃
                        </div>
                      </div>`
      },
      attr: {
        index: i + 1,
        duNum: 0
      }
    })
    graphicLayer.addGraphic(divGraphic)
  }
}

// 效果二
export function divGraphicBule() {
  graphicLayer.clear()

  for (let i = 0; i < arrData.length; i++) {
    const item = arrData[i]

    const divGraphic = new mars2d.graphic.DivGraphic({
      latlng: item.position,
      style: {
        html: `<div class="marsBlueGradientPnl">
                    <div>${item.name}</div>
                </div>`,
        offsetY: 75
      }
    })
    graphicLayer.addGraphic(divGraphic)
  }
}

// 效果三
export function divGraphicWhite() {
  graphicLayer.clear()

  for (let i = 0; i < arrData.length; i++) {
    const item = arrData[i]

    const divGraphic = new mars2d.graphic.DivUpLabel({
      latlng: item.position,
      style: {
        text: item.name,
        color: "#20a0ff",
        font_size: 16,
        font_family: "微软雅黑",
        lineHeight: 50,
        circleSize: 8
      }
    })
    graphicLayer.addGraphic(divGraphic)
  }
}
