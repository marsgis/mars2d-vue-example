/**
 * 示例：台风轨迹
 * 演示：按在线台风数据绘制历史轨迹线/轨迹点、实时风圈和预测路径，面板表格勾选台风后飞行定位
 * API：mars2d.graphic.Point/Polyline/Polygon/Label/DivGraphic、mars2d.layer.GraphicLayer、map.flyToGraphic
 * 要点：风圈半径单位是公里，按四个象限的半径拼成多边形；数据来自 data.mars2d.cn 在线接口；Typhoon 类在 Typhoon.js 中（由 example.json 的 resources 以经典脚本加载，不走 map.js 的构建转换）
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 4,
  center: { lng: 106.347656, lat: 31.278551 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 绘制24/48小时警戒线
  drawWarningLine()
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
    map.destroy() // 一并释放所有台风图层与警戒线
    map = null
  }
  // 清空台风缓存：其图层已随地图销毁，下次运行示例时必须重新 new Typhoon
  for (const id in typhoonListObj) {
    delete typhoonListObj[id]
  }
  selectTyphoon = null
}

// ========== 4. 面板交互方法 ==========
const typhoonListObj = {} // 所有已构造的台风集合（按台风 id 缓存，重复勾选不重建图层）
let selectTyphoon // 当前选择的台风

// 勾选台风
export function selectOneTyphoon(row) {
  // 地图未就绪或示例已切走（异步回调晚到）时忽略
  if (!map) {
    return
  }

  const id = row.id
  if (!typhoonListObj[id]) {
    typhoonListObj[id] = new Typhoon({ ...row }, map)
  }

  const typhoon = typhoonListObj[id]
  typhoon.show = true
  typhoon.flyTo()

  selectTyphoon = typhoon
}

// 取消勾选台风
export function unSelectOneTyphoon(id) {
  const typhoon = typhoonListObj[id]

  if (typhoon) {
    typhoon.show = false
  }
}

// 定位到轨迹点
export function clickPathRow(row) {
  if (!map || !selectTyphoon) {
    return
  }

  selectTyphoon.showPointFQ(row)
  const graphic = selectTyphoon.getPointById(row.id)
  if (graphic) {
    map.flyToGraphic(graphic, {
      radius: 1600000,
      complete() {
        graphic.openTooltip()
      }
    })
  }
}

export function formatDate(time, format) {
  return mars2d.Util.formatDate(time, format)
}

// ========== 5. 矢量对象：24/48 小时警戒线 ==========
// 绘制警戒线
function drawWarningLine() {
  // 绘制24小时警戒线：[纬度, 经度] 依次连线
  const lineWarning24 = new mars2d.graphic.Polyline({
    latlngs: [
      [34, 127],
      [22, 127],
      [18, 119],
      [11, 119],
      [4.5, 113],
      [0, 105]
    ],
    style: {
      color: "#828314",
      width: 2
    }
  })
  map.graphicLayer.addGraphic(lineWarning24)

  // 注记文本
  const textWarning24 = new mars2d.graphic.Label({
    latlng: [33.137551, 128.496094],
    style: {
      text: "24小时警戒线",
      color: "#828314",
      font_size: 25,
      font_family: "楷体"
    }
  })
  map.graphicLayer.addGraphic(textWarning24)

  // 绘制48小时警戒线
  const lineWarning48 = new mars2d.graphic.Polyline({
    latlngs: [
      [34, 132],
      [22, 132],
      [0, 119],
      [0, 105]
    ],
    style: {
      width: 2,
      color: "#828314"
    }
  })
  map.graphicLayer.addGraphic(lineWarning48)

  // 注记文本
  const textWarning48 = new mars2d.graphic.Label({
    latlng: [31.372399, 131.506348],
    style: {
      text: "48小时警戒线",
      color: "#4dba3d",
      font_size: 25,
      font_family: "楷体"
    }
  })
  map.graphicLayer.addGraphic(textWarning48)
}
