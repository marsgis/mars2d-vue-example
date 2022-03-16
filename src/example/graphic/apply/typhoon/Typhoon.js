/**
 * 单个台风对象
 * @class Typhoon
 */
class Typhoon {
  // ========== 构造方法 ==========
  constructor(options, map) {
    this.options = options
    this.map = map

    // 创建台风相关矢量图层
    this.typhoonLayer = new mars2d.layer.GraphicLayer()
    map.addLayer(this.typhoonLayer)

    this.clickPtLayer = new mars2d.layer.GraphicLayer()
    map.addLayer(this.clickPtLayer)

    this.showTyphoonToMap(options.path)
  }

  // ========== 对外属性 ==========
  // 显示隐藏
  get show() {
    return this.options.show
  }

  set show(val) {
    this.options.show = val
    this.typhoonLayer.show = val
    this.clickPtLayer.show = val
  }

  getPointById(id) {
    return this.typhoonLayer.getGraphicById(id)
  }

  flyTo(options) {
    this.typhoonLayer.flyTo(options)
  }

  getPointTooltip(event, isYB) {
    const item = event.marsOptions?.attr
    if (!item) {
      return
    }

    let ybHtml = ""
    if (isYB) {
      ybHtml = `<p>预报机构：&nbsp;&nbsp;中央气象台</p>`
    }

    let fqHtml = '<table style="width:100%">'
    if (item.circle7) {
      fqHtml += `<tr><th>风圈半径</th>   <th>东北</th>  <th>东南</th>  <th>西南</th>  <th>西北</th></tr>
                <tr><td>七级</td>  <td>${item.circle7.radius1}</td>   <td>${item.circle7.radius2}</td>   <td>${item.circle7.radius3}</td>   <td>${item.circle7.radius4}&nbsp;(KM)</td></tr> `
      if (item.circle10) {
        fqHtml += ` <tr><td>十级</td>  <td>${item.circle10.radius1}</td>   <td>${item.circle10.radius2}</td>   <td>${item.circle10.radius3}</td>   <td>${item.circle10.radius4}&nbsp;(KM)</td></tr>`
        if (item.circle12) {
          fqHtml += `<tr><td>十二级</td>  <td>${item.circle12.radius1}</td>   <td>${item.circle12.radius2}</td>   <td>${item.circle12.radius3}</td>   <td>${item.circle12.radius4}&nbsp;(KM)</td></tr>`
        }
      }
    }
    fqHtml += "</table>"

    return `<div class="tipBox">
              <div class="tipHeader">
                <p>${this.options.typnumber} ${this.options.name_cn}</p>
              </div>
                <div class="tipBodyFirstPart">
                  ${ybHtml}
                  <p>过去时间：&nbsp;&nbsp;${item.time_str}</p>
                  <p>中心位置：&nbsp;&nbsp;${item.lat}N/${item.lon}E</p>
                  <p>最大风速：&nbsp;&nbsp;${item.centerSpeed}米/秒</p>
                  <p>中心气压：&nbsp;&nbsp;${item.strength}百帕</p>
                  <p>移动方向：&nbsp;&nbsp;${item.moveTo_str}</p>
                  <p>移动速度：&nbsp;&nbsp;${item.windSpeed}公里/小时</p>
                </div>
                <div class="tipBodySecondPart">${fqHtml}</div>
          </div>`
  }

  addNameGraphic(firstItem) {
    // [起点]绘制台风起点名字
    const nameGraphic = new mars2d.graphic.Label({
      latlng: [firstItem.lat - 0.5, firstItem.lon + 0.7],
      style: {
        text: this.options.name_cn,
        font_size: 20,
        color: "red"
      },
      attr: firstItem
    })
    this.typhoonLayer.addGraphic(nameGraphic)
  }

  // 绘制一个台风到地图上
  showTyphoonToMap(arr) {
    if (arr.length < 1) {
      return
    }

    const firstItem = arr[0]
    const endItem = arr[arr.length - 1]

    let lastType
    let arrPoint = []
    // 路径点
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i]
      const point = [item.lat, item.lon]
      // 在图层上绘画出所有的点

      const pointEntity = new mars2d.graphic.Point({
        id: item.id,
        latlng: point,
        style: {
          pixelSize: 4,
          color: item.color
        },
        attr: item
      })
      this.typhoonLayer.addGraphic(pointEntity)

      // 轨迹点绑定点击事件
      pointEntity.on(mars2d.EventType.click, (event) => {
        this.showPointFQ(event.target.attr)
      })
      pointEntity.bindTooltip(
        (event) => {
          return this.getPointTooltip(event)
        },
        {
          className: "typhoon-tooltip",
          direction: "left"
        }
      )

      arrPoint.push(point)

      // 判断台风的typlevel
      if (lastType !== item.level || i === len - 1) {
        // 绘制线
        const graphicLine = new mars2d.graphic.Polyline({
          latlngs: arrPoint,
          style: {
            color: getColor(lastType)
          }
        })
        this.typhoonLayer.addGraphic(graphicLine)

        graphicLine.bringToBack()

        lastType = item.level
        arrPoint = [point]
      }
    }

    // [起点]绘制台风起点名字
    this.addNameGraphic(firstItem)

    // [终点]绘制台风当前位置gif点
    const gifGraphic = new mars2d.graphic.DivGraphic({
      latlng: [endItem.lat, endItem.lon],
      style: {
        html: `<img src="img/marker/typhoon.gif">`,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.CENTER
      }
    })
    this.typhoonLayer.addGraphic(gifGraphic)
    this.gifGraphic = gifGraphic

    // 显示最后所在点的对应风圈等。
    this.showPointFQ(endItem)
  }

  // 点击事件，点击出现台风icon
  showPointFQ(item) {
    this.clickPtLayer.clear()

    const position = [item.lat, item.lon]

    // 台风实时位置gif点更新
    if (this.gifGraphic) {
      this.gifGraphic.position = position
    }

    // 绘制7级风圈面
    if (item.circle7) {
      let points7 = []
      points7 = points7.concat(getPoints(position, item.circle7.radius1, 0)) // 东北方向
      points7 = points7.concat(getPoints(position, item.circle7.radius2, 90)) // 东南
      points7 = points7.concat(getPoints(position, item.circle7.radius3, 180)) // 西南
      points7 = points7.concat(getPoints(position, item.circle7.radius4, 270)) // 西北

      const graphic = new mars2d.graphic.Polygon({
        latlngs: points7,
        style: {
          setHeight: 900,
          fillColor: "#eed139",
          fillOpacity: 0.3,
          outline: true,
          outlineWidth: 2,
          outlineColor: "#eed139"
        }
      })
      this.clickPtLayer.addGraphic(graphic)
    }

    // 绘制10级风圈面
    if (item.circle10) {
      let points10 = []
      points10 = points10.concat(getPoints(position, item.circle10.radius1, 0)) // 东北方向
      points10 = points10.concat(getPoints(position, item.circle10.radius2, 90))
      points10 = points10.concat(getPoints(position, item.circle10.radius3, 180))
      points10 = points10.concat(getPoints(position, item.circle10.radius4, 270))

      const tenGraphic = new mars2d.graphic.Polygon({
        latlngs: points10,

        style: {
          fillColor: "#fe9c45",
          fillOpacity: 0.3,
          outline: true,
          outlineWidth: 2,
          outlineColor: "#fe9c45"
        }
      })
      this.clickPtLayer.addGraphic(tenGraphic)
    }

    // 绘制12级风圈面
    if (item.circle12) {
      let points12 = []
      points12 = points12.concat(getPoints(position, item.circle12.radius1, 0)) // 东北方向
      points12 = points12.concat(getPoints(position, item.circle12.radius2, 90))
      points12 = points12.concat(getPoints(position, item.circle12.radius3, 180))
      points12 = points12.concat(getPoints(position, item.circle12.radius4, 270))

      const tenGraphic = new mars2d.graphic.Polygon({
        latlngs: points12,
        style: {
          fillColor: "#ffff00",
          fillOpacity: 0.3,
          outline: true,
          outlineWidth: 2,
          outlineColor: "#ffff00"
        }
      })
      this.clickPtLayer.addGraphic(tenGraphic)
    }

    // 台风预测路径绘制
    if (item.forecast) {
      const linePoint = [position]
      item.forecast.forEach((element) => {
        const forecastPt = [element.lat, element.lon]
        linePoint.push(forecastPt)

        // 在图层上绘画出所有的点
        const pointEntity = new mars2d.graphic.Point({
          latlng: forecastPt,
          style: {
            pixelSize: 6,
            color: element.color, // 不同typlevel显示不同的颜色
            opacity: 0.8
          },
          attr: item
        })
        this.clickPtLayer.addGraphic(pointEntity)

        pointEntity.bindTooltip(
          (event) => {
            return this.getPointTooltip(event, true)
          },
          {
            template: "",
            anchor: [260, -20]
          }
        )

        // 预测路线
        const graphicLine = new mars2d.graphic.Polyline({
          latlngs: linePoint
        })
        this.clickPtLayer.addGraphic(graphicLine)
      })
    }

    // let pointEntity = this.typhoonLayer.getGraphicById(item.id);
    // if (pointEntity) {
    //   pointEntity.openTooltip();
    // }
  }

  // 释放
  destroy() {
    this.show = false

    if (this.typhoonLayer) {
      this.typhoonLayer.destroy()
      delete this.typhoonLayer
    }
    if (this.clickPtLayer) {
      this.clickPtLayer.destroy()
      delete this.clickPtLayer
    }
  }
}

// 不同等级的台风对应不同的颜色
function getColor(level) {
  switch (level) {
    case "TD": // 热带低压
      return "rgb(238,209,57)"
    case "TS": // 热带风暴
      return "rgb(0,0,255)"
    case "STS": // 强热带风暴
      return "rgb(15,128,0)"
    case "TY": // 台风
      return "rgb(254,156,69)"
    case "STY": // 强台风
      return "rgb(254,0,254)"
    case "SuperTY": // 超强台风
      return "rgb(254,0,0)"
    default:
  }
}

// 根据经纬度 直径 以及方向计算方法
function getPoints(center, cradius, startAngle) {
  const points = []
  const radius = cradius / 100
  const pointNum = 90
  const endAngle = startAngle + 90
  let sin, cos, x, y, angle
  for (let i = 0; i <= pointNum; i++) {
    angle = startAngle + ((endAngle - startAngle) * i) / pointNum
    sin = Math.sin((angle * Math.PI) / 180)
    cos = Math.cos((angle * Math.PI) / 180)
    x = center[0] + radius * sin
    y = center[1] + radius * cos
    points.push([x, y])
  }
  return points
}
