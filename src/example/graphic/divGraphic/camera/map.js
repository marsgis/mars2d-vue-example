import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 17,
  center: { lng: 117.09407, lat: 31.816899 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建DIV数据图层
  const graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("您单击了", event)
  })

  // 在layer上绑定右键菜单
  graphicLayer.bindContextMenu([
    {
      text: "查看摄像头",
      iconCls: "fa fa-american-sign-language-interpreting",
      callback: function (e) {
        const graphic = e.graphic

        globalMsg("右键菜单示例")
      }
    }
  ])

  // 添加数据
  addGraphic(graphicLayer, [31.815903, 117.092323])
  addGraphic(graphicLayer, [31.817809, 117.094597])
  addGraphic(graphicLayer, [31.818401, 117.094152])
  addGraphic(graphicLayer, [31.815411, 117.096705])
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addGraphic(graphicLayer, position) {
  const graphicImg = new mars2d.graphic.DivGraphic({
    latlng: position,
    style: {
      html: ` <div class="mars2d-camera-content">
                  <img class="mars2d-camera-img" src="img/marker/camera.svg" >
                </div>
                <div class="mars2d-camera-line" ></div>
                <div class="mars2d-camera-point"></div>
              `,
      offsetY: 50
    }
  })
  graphicLayer.addGraphic(graphicImg)

  graphicImg.bindPopup(function () {
    const html = `
      <div>
        <video src="//data.mars2d.cn/file/video/lukou.mp4" controls autoplay style="width: 300px;"></video>
      </div> `
    return html
  })
}
