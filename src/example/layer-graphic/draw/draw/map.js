import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
export let graphicLayer

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

  graphicLayer = new mars2d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)

  bindLayerContextMenu()

  // 绑定标绘相关事件监听(可以自行加相关代码实现业务需求，此处主要做示例)
  graphicLayer.on(mars2d.EventType.drawStart, function (e) {
    console.log("开始绘制", e)
  })
  graphicLayer.on(mars2d.EventType.drawAddPoint, function (e) {
    console.log("绘制过程中增加了点", e)
  })
  graphicLayer.on(mars2d.EventType.drawRemovePoint, function (e) {
    console.log("绘制过程中删除了点", e)
  })

  graphicLayer.on(mars2d.EventType.drawCreated, function (e) {
    console.log("创建完成", e)
  })

  graphicLayer.on(mars2d.EventType.editStart, function (e) {
    console.log("开始编辑", e)
    eventTarget.fire("graphicEditor-start", e)
    // startEditing(e.graphic)
  })

  graphicLayer.on(mars2d.EventType.editMovePoint, function (e) {
    console.log("编辑修改了点", e)
    // startEditing(e.graphic)
    eventTarget.fire("graphicEditor-start", e)
  })
  graphicLayer.on(mars2d.EventType.editRemovePoint, function (e) {
    console.log("编辑删除了点", e)

    // startEditing(e.graphic)
    eventTarget.fire("graphicEditor-start", e)
  })

  graphicLayer.on(mars2d.EventType.removeGraphic, function (e) {

    eventTarget.fire("graphicEditor-stop", e)
  })

  graphicLayer.on(mars2d.EventType.editStop, function (e) {

    eventTarget.fire("graphicEditor-stop", e)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function drawPoint() {
  graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 8,
      color: "#000dfc"
    }
  })
}

export function drawMarker() {
  graphicLayer.startDraw({
    type: "marker",
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    }
  })
}

export function drawLabel() {
  graphicLayer.startDraw({
    type: "label",
    style: {
      text: "Mars2D平台",
      color: "#000dfc",
      font_size: 25,
      font_family: "楷体"
    }
  })
}

export function drawDivMarker() {
  graphicLayer.startDraw({
    type: "divGraphic",
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-red">
          <div class="marsTiltPanel-wrap">
              <div class="area">
                  <div class="arrow-lt"></div>
                  <div class="b-t"></div>
                  <div class="b-r"></div>
                  <div class="b-b"></div>
                  <div class="b-l"></div>
                  <div class="arrow-rb"></div>
                  <div class="label-wrap">
                      <div class="title">火星水厂</div>
                      <div class="label-content">
                          <div class="data-li">
                              <div class="data-label">实时流量：</div>
                              <div class="data-value"><span id="lablLiuliang" class="label-num">39</span><span class="label-unit">m³/s</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水池液位：</div>
                              <div class="data-value"><span id="lablYeWei"  class="label-num">10.22</span><span class="label-unit">m</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水泵状态：</div>
                              <div class="data-value">
                                <span id="lablSBZT1"  class="label-tag data-value-status-1" alt="中间状态">1号</span>
                                <span id="lablSBZT2"  class="label-tag data-value-status-0" alt="关闭状态">2号</span>
                               </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">出水阀门：</div>
                              <div class="data-value">
                                <span id="lablCSFM1"   class="label-tag data-value-status-1" alt="中间状态">1号</span>
                                <span id="lablCSFM2"   class="label-tag data-value-status-2" alt="打开状态">2号</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="b-t-l"></div>
              <div class="b-b-r"></div>
          </div>
          <div class="arrow" ></div>
      </div>`,
      horizontalOrigin: mars2d.HorizontalOrigin.LEFT,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    }
  })
}

export function drawPolyline() {
  graphicLayer.startDraw({
    type: "polyline",
    style: {
      width: 3,
      color: "#000dfc"
    }
  })
}

export function drawCurveLine() {
  graphicLayer.startDraw({
    type: "brushLine",
    style: {
      width: 3,
      color: "#000dfc"
    }
  })
}

export function drawPolygon() {
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
    }
  })
}

export function drawRectangle() {
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
    }
  })
}

export function drawImage() {
  graphicLayer.startDraw({
    type: "image",
    style: {
      url: "img/simple/gugong.jpg",
      opacity: 1
    }
  })
}

export function drawCircle() {
  graphicLayer.startDraw({
    type: "circle",
    style: {
      fill: true,
      fillColor: "#000dfc",
      fillOpacity: 0.3,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#254dc4",
      outlineOpacity: 1
    }
  })
}

export function onClickSaveKml() {
  if (graphicLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  let geojsonObject = graphicLayer.toGeoJSON()
  if (geojsonObject == null) {
    return null
  }
  geojsonObject = mars2d.Util.clone(geojsonObject)
  console.log("geojson数据为", geojsonObject)

  const kml = kgUtil.toKml(geojsonObject, {
    name: "Mars2D标绘数据",
    documentName: "Mars2D标绘数据文件",
    documentDescription: "标绘数据 by mars2d.cn",
    simplestyle: true
  })

  mars2d.Util.downloadFile("我的标注.kml", kml)
}

// https://github.com/esri/terraformer-wkt-parser
// 加载wkt用 var primitive = wkt.parse('LINESTRING (30 10, 10 30, 40 40)');
export function onClickSaveWKT() {
  if (graphicLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  let geojsonObject = graphicLayer.toGeoJSON()
  if (geojsonObject == null) {
    return null
  }
  geojsonObject = mars2d.Util.clone(geojsonObject)

  const arrWKT = []
  let index = 0
  geojsonObject.features.forEach((feature) => {
    const attr = feature.properties
    const style = feature.properties.style

    const wkt = Terraformer.WKT.convert(feature.geometry) // geojson转换WKT格式 ,terraformer库
    arrWKT.push({
      id: ++index,
      name: attr.name || "",
      remark: attr.remark || "",
      style,
      wkt
    })
  })
  console.log("wkt数据为", arrWKT)

  mars2d.Util.downloadFile("我的标注wkt.txt", JSON.stringify(arrWKT))
}

 // 绑定右键菜单
function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
        {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.editing) {
          return false
        }
        return !graphic.editing.enabled()
      },
      callback: function (e) {
        const graphic = e.graphic
        graphicLayer.startEditing(graphic)
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.editing) {
          return false
        }
        return graphic.editing.enabled()
      },
      callback: function (e) {
        const graphic = e.graphic
        graphicLayer.stopEditing()
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "polyline" || graphic.type === "brushLine"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars2d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}
