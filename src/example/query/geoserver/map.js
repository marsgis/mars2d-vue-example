/**
 * 示例：GeoServer矢量服务查询(OGC WFS)
 * 演示：用 mars2d.query.QueryGeoServer 以 OGC WFS 服务按属性+绘制范围查询 GeoServer 图层，并按点/线/面服务切换结果样式
 * API：mars2d.query.QueryGeoServer、mars2d.layer.GeoJsonLayer、mars2d.layer.GraphicLayer
 * 要点：依赖外网 GeoServer 服务（server.mars3d.cn/geoserver）；切换「服务」只是改查询图层的 layer 名（mars:hfjy / mars:hfgh / mars:hfdl）；查询前必须先绘制范围，范围通过 graphic 传入
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let queryMapserver // GeoServer WFS 查询服务（QueryGeoServer 实例）
let geoJsonLayer // 用于展示查询结果的 GeoJSON 图层
let drawGraphic // 查询限定的区域（点/矩形/圆/多边形）
let graphicLayer // 示例自建的绘制图层（不用 map.graphicLayer，便于只清理本示例的绘制）

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  graphicLayer = new mars2d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  showGeoJsonLayer()
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (!map) {
    return
  }
  // 查询服务只保存服务地址与配置，没有 DOM/定时器，置空即可被回收
  queryMapserver = null
  if (geoJsonLayer) {
    map.removeLayer(geoJsonLayer)
    geoJsonLayer = null
  }
  if (graphicLayer) {
    map.removeLayer(graphicLayer)
    graphicLayer = null
  }
  drawGraphic = null
  map = null
}

// ========== 3. 查询服务与结果图层 ==========
function showGeoJsonLayer() {
  queryMapserver = new mars2d.query.QueryGeoServer({
    url: "//server.mars3d.cn/geoserver/mars/wfs",
    layer: "mars:hfjy"
  })

  // 用于显示查询结果（geojson）的图层
  geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "合肥项目",
    popup: "all"
  })
  map.addLayer(geoJsonLayer)

  geoJsonLayer.on(mars2d.EventType.load, function (event) {
    const list = event.list
    eventTarget.fire("befortUI", { list }) // 抛出列表给面板渲染表格
  })
}

// ========== 4. 面板交互方法：切换服务与查询 ==========
// 切换服务
export function changeService(name) {
  queryMapserver.layer = `mars:${name}`
}

export function query(text, name) {
  if (!drawGraphic) {
    globalMsg("请绘制区域")
    return
  }
  queryMapserver.query({
    column: "项目名称",
    text,
    graphic: drawGraphic,
    success: (result) => {
      if (result.count === 0) {
        globalMsg("未查询到相关记录！")
        return
      } else {
        globalMsg("共查询到 " + result.count + " 条记录！")
      }

      // 点/线/面服务的字段不同，结果样式按服务名从 getGraphicStyle 取
      const style = getGraphicStyle(name)
      geoJsonLayer.load({ data: result.geojson, symbol: { styleOptions: style } })
    },
    error: (error, msg) => {
      console.log("服务访问错误", error)
      globalAlert(msg, "服务访问错误")
    }
  })
}

// ========== 5. 面板交互方法：绘制范围 ==========
// 点查询
export function drawPoint() {
  clearAll()
  graphicLayer.startDraw({
    type: "point",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      console.log("点：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}
// 框选范围
export function drawRectangle() {
  clearAll()
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic

      console.log("矩形：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}

// 框选查询   圆
export function drawCircle() {
  clearAll()
  graphicLayer.startDraw({
    type: "circle",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      console.log("圆：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}

// 框选查询   多边行
export function drawPolygon() {
  clearAll()
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      fillColor: "#0000ff",
      fillOpacity: 0.3,
      outline: true,
      outlineColor: "#0000ff"
    },
    success: function (graphic) {
      drawGraphic = graphic
      console.log("多边行：", drawGraphic.toGeoJSON())
    }
  })
}

// ========== 6. 面板交互方法：表格联动与清除 ==========
export function flyToGraphic(graphic) {
  map.flyToGraphic(graphic, { scale: 1.5 })
  graphic.openPopup()
}

// 清除
export function clearAll(noClearDraw) {
  if (!noClearDraw) {
    drawGraphic = null
    graphicLayer.clear()
  }
  geoJsonLayer.clear()
}

// ========== 7. 查询结果样式 ==========
// 按 GeoServer 的 layer 名返回点/线/面对应的上图样式
function getGraphicStyle(layerName) {
  switch (layerName) {
    case "hfjy":
      return {
        image: "img/marker/mark3.png",
        highlight: { type: "click", image: "img/marker/mark1.png" },
        label: {
          text: "{项目名称}",
          font_size: 16,
          color: "#0000ff",
          offsetY: 30
        }
      }
    case "hfgh":
      return {
        fill: true,
        fillColor: "#051453",
        fillOpacity: 0.3,
        outline: true,
        outlineWidth: 2,
        outlineColor: "#0000FF",
        outlineOpacity: 1.0,
        dashArray: "5, 10",
        dashSpeed: -30, // 可以定义运动速度，注释后是静态的
        label: {
          text: "{用地名称}",
          font_size: 16,
          color: "#0600ff",
          offsetY: 30
        }
      }

    case "hfdl": {
      return {
        width: 4,
        color: "rgb(20, 200, 100)",
        label: {
          text: "{NAME}",
          font_size: 16,
          color: "#0000ff",
          offsetY: 30
        }
      }
    }

    default:
      break
  }
}
