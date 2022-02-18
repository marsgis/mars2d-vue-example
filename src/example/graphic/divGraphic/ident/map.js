import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
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

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 17,
  center: { lng: 117.095729, lat: 31.81624 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建DIV数据图层
  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  divGraphicYellow()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

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

    // 刷新局部DOM,不影响popup面板的其他控件操作
    // divGraphic.on(mars2d.EventType.postRender, function (event) {
    //   let container = event.container; //popup对应的DOM
    //   let graphic = event.target;

    //   let oldVal = graphic.attr.duNum;
    //   let newVal = Number(new Date().format("ss")) + graphic.attr.index;
    //   if (oldVal !== newVal) {
    //     graphic.attr.duNum = newVal;
    //     let temperatureDom = container.querySelector(".temperature");
    //     if (temperatureDom) {
    //       temperatureDom.innerHTML = newVal;
    //     }
    //   }
    // });
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
