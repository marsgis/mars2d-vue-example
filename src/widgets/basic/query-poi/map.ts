/**
 * 高德POI 查询栏 （左上角）
 * @copyright 火星科技 mars2d.cn
 * @author 火星吴彦祖 2022-01-10
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map: mars2d.Map // 地图对象
let graphicLayer: mars2d.layer.GraphicLayer
let queryPoi: mars2d.query.GaodePOI // GaodePOI查询
let address: any = null

export const eventTarget = new mars2d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars2d.Map): void {
  map = mapInstance // 记录map

  queryPoi = new mars2d.query.GaodePOI({
    // city: '合肥市',
  })

  graphicLayer = new mars2d.layer.GraphicLayer({
    name: "PIO查询",
    pid: 99, // 图层管理 中使用，父节点id,
    show: true
  })
  map.addLayer(graphicLayer)

  graphicLayer.bindPopup(function (event: any) {
    const item = event.attr
    if (!item) {
      return
    }
    let inHtml = `<div class="mars2d-template-titile"><a href="https://www.amap.com/detail/${item.id}"  target="_black" style="color: #ffffff; ">${item.name}</a></div><div class="mars2d-template-content" >`

    if (item.tel.length && item.tel !== "") {
      inHtml += "<div><label>电话:</label>" + item.tel + "</div>"
    }

    if (item.address) {
      inHtml += "<div><label>地址:</label>" + item.address + "</div>"
    }
    if (item.type) {
      const fl = item.type
      if (fl !== "") {
        inHtml += "<div><label>类别:</label>" + fl + "</div>"
      }
    }
    inHtml += "</div>"
    return inHtml
  })
  map.on(mars2d.EventType.moveend, cameraChanged)

}

function cameraChanged() {
  queryPoi.getAddress({
    location: map.getCenter(),
    success: (result: any) => {
      address = result
    }
  })
}

// 释放当前业务
export function onUnmounted(): void {
  map.removeLayer(graphicLayer)
  map.off(mars2d.EventType.moveend, cameraChanged)
  graphicLayer.remove()
  queryPoi = null
  address = null
  map = null
}

// 查询数据
export function queryData(val: string): Promise<any> {
  return new Promise((resolve) => {
    queryPoi.autoTip({
      text: val,
      city: address?.city,
      location: map.getCenter(),
      success: (result: any) => {
        resolve(result)
      }
    })
  })
}

export function querySiteList(text: string, page: number): Promise<any> {
  return new Promise((resolve) => {
    queryPoi.queryText({
      text,
      count: 6,
      page: page - 1,
      city: address?.city,
      success: (result: any) => {
        resolve(result)
      }
    })
  })
}

/**
 * 加载查询之后的数据，通过矢量数据展示出来
 * @param {any} arr 查询之后的数据
 * @returns {void} 无
 */
export function showPOIArr(arr: any): void {
  clearLayers()
  arr.forEach((item: any) => {
    const jd = Number(item.lng)
    const wd = Number(item.lat)
    if (isNaN(jd) || isNaN(wd)) {
      return
    }

    item.lng = jd
    item.lat = wd

    // 添加实体
    const graphic = new mars2d.graphic.Marker({
      latlng: [wd, jd],
      style: {
        image: "img/marker/mark1.png",
        width: 32,
        height: 44,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
        // label: {
        //   text: item.name,
        //   font_size: 20,
        //   color: "rgb(240,255,255)",
        //   outline: true,
        //   outlineWidth: 2,
        //   pixelOffsetY: -10, //偏移量
        // },
      },
      attr: item
    })
    graphicLayer.addGraphic(graphic)
    item._graphic = graphic
  })

  if (arr.length > 1) {
    graphicLayer.flyTo()
  }
}

/**
 * 判断是否为经纬度值，
 * 若是，加载为矢量数据且定位至该矢量数据
 * 若否，返回
 * @param {string} text 输入框输入的关键字
 * @returns {void} 无
 */
export function centerAtLonLat(text: string): void {
  const arr = text.split(",")
  if (arr.length !== 2) {
    return
  }

  const jd = Number(arr[0])
  const wd = Number(arr[1])
  if (isNaN(jd) || isNaN(wd)) {
    return
  }

  // 添加实体
  const graphic = new mars2d.graphic.Marker({
    latlng: [wd, jd],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    }
  })
  graphicLayer.addGraphic(graphic)

  graphic.bindPopup(`<div class="mars2d-template-titile">坐标定位</div>
              <div class="mars2d-template-content" >
                <div><label>经度</label> ${jd}</div>
                <div><label>纬度</label>${wd}</div>
              </div>`)

  map.flyToGraphic(graphic)
  graphicLayer.openPopup(graphic)
}

export function flyToGraphic(graphic: any, option: any): void {
  graphicLayer.openPopup(graphic)
  map.flyToGraphic(graphic, option)
}

export function clearLayers(): void {
    graphicLayer.closePopup()
    graphicLayer.clear()
}
