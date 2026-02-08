/* eslint-disable no-undef */
import * as mars2d from "mars2d"
// import * as XLSX from "xlsx"

export let map // mars2d.Map二维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 13,
  center: { lng: 117.199574, lat: 31.844607 }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars2d.layer.GraphicLayer({
    popup: "all"
  })
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars2d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

export function downloadCsvModel() {
  const url = window.currentPath + "data/graphic.csv" // currentPath为当前目录，内置在示例框架中
  window.open(url)
}

export function downloadExcelModel() {
  const url = window.currentPath + "data/graphic.xlsx" // currentPath为当前目录，内置在示例框架中
  window.open(url)
}

export function clearData() {
  graphicLayer.clear()
}

export function openFile(file) {
  const fileName = file.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType === "xls" || fileType === "xlsx") {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onloadend = function (e) {
      importExcelData(this.result)
    }
  } else if (fileType === "csv") {
    const reader = new FileReader()
    reader.readAsText(file, "utf-8")
    reader.onloadend = function (e) {
      importCsvData(this.result)
    }
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

async function importCsvData(result) {
  const rows = result.split("\n")
  const heads = rows[0].trim().split(",") // 列头

  const arrData = []
  for (let index = 1; index < rows.length; index++) {
    const cols = rows[index].trim().split(",")
    if (cols.length < 2) {
      continue
    }

    const item = {}
    for (let j = 0; j < cols.length; j++) {
      item[heads[j]] = cols[j] || ""
    }
    arrData.push(item)
  }
  addGraphics(arrData)
}

function importExcelData(result) {
  // API: https://docs.sheetjs.com/docs/api/parse-options/
  const wb = XLSX.read(result, { type: "binary" })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const jsonData = XLSX.utils.sheet_to_json(ws)

  addGraphics(jsonData)
}

export function downloadCsvData() {
  if (graphicLayer.length === 0) {
    globalAlert("当前没有标注任何数据，无需保存！")
    return
  }
  const json = graphicLayer.toJSON().data

  // 处理列头
  const heads = ["ID", "名称", "纬度", "经度"]
  for (let index = 0; index < json.length; index++) {
    const element = json[index]
    if (element.attr) {
      const keys = Object.keys(element.attr)
      for (let j = 0; j < keys.length; j++) {
        if (heads.indexOf(keys[j]) === -1) {
          heads.push(keys[j])
        }
      }
    }
  }

  const result = [heads.join(",")]
  for (let index = 0; index < json.length; index++) {
    const graphic = json[index]

    const item = [graphic.attr.ID ?? graphic.id, graphic.attr["名称"] ?? graphic.name, ...graphic.latlng]
    for (let j = 5; j < heads.length; j++) {
      const head = heads[j]
      item.push(graphic.attr[head] ?? "")
    }
    result.push(item.join(","))
  }

  mars2d.Util.downloadFile("标注点.csv", result.join("\n"), "text/csv")
}
export function downloadExcelData() {
  if (graphicLayer.length === 0) {
    globalAlert("当前没有标注任何数据，无需保存！")
    return
  }
  const result = []
  const json = graphicLayer.toJSON().data

  for (let index = 0; index < json.length; index++) {
    const graphic = json[index]
    result.push({
      ...graphic.attr,
      ID: graphic.attr.ID ?? graphic.id,
      名称: graphic.attr["名称"] ?? graphic.name,
      纬度: graphic.latlng[0],
      经度: graphic.latlng[1]
    })
  }
  console.log("导出excel数据", result)

  const ws = XLSX.utils.json_to_sheet(result)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Data")
  XLSX.writeFileXLSX(wb, "标注点.xlsx")
}

function addGraphics(points) {
  graphicLayer.clear()

  for (let j = 0; j < points.length; ++j) {
    const item = points[j]
    const jd = Number(item["经度"])
    const wd = Number(item["纬度"])

    if (isNaN(jd) || isNaN(wd)) {
      continue
    }

    const graphic = new mars2d.graphic.Marker({
      latlng: [wd, jd],
      style: {
        image: "img/marker/point-red.png",
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
        label: {
          text: item["名称"],
          font_size: 18,
          color: "#000000"
        }
      },
      attr: item
    })
    graphicLayer.addGraphic(graphic)
  }
}

let indexCache = 0
export async function startDrawGraphic() {
  const name = "我是手动标绘的" + ++indexCache
  const graphic = await graphicLayer.startDraw({
    type: "marker",
    style: {
      image: "img/marker/point-red.png",
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
      label: {
        text: name,
        font_size: 18,
        color: "#000000"
      }
    },
    attr: { 名称: name, 创建时间: mars2d.Util.formatDate(new Date()) }
  })
  console.log("标绘完成", graphic.toJSON())
}
