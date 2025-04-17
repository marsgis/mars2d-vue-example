import * as mars2d from "mars2d"
import * as GeoTIFF from "geotiff"

export let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 117.14005, lat: 31.840196 }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalNotify("已知问题提示", `(1)浏览器端直接加载TIF只适合小数据，大数据请发布WMS、WMTS等服务方式；`)

  addTileLayer()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 叠加的图层
let tileLayer

export async function addTileLayer() {
  removeTileLayer()

  const result = await tif2img2("https://data.mars3d.cn/img/map/rjy.tif")

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars2d.layer.ImageLayer({
    name: "合肥软件园",
    url: result.image,
    rectangle: result.extent,
    crs: result.crs,
    flyTo: true
  })
  map.addLayer(tileLayer)
}

// 移除图层
export function removeTileLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}

// tif转换为图片， 使用了plotty库绘制（适合单通道+ 色带）
async function tif2img2(url) {
  const tif = await GeoTIFF.fromUrl(url)
  const image = await tif.getImage()

  // 取图片内容
  const [red, green, blue] = await image.readRasters()
  const width = image.getWidth()
  const height = image.getHeight()

  const canvas = L.DomUtil.create("canvas")

  // plotty文档：http://santilland.github.io/plotty/
  // eslint-disable-next-line no-undef
  const plot = new plotty.plot({
    canvas,
    data: red,
    width: width,
    height: height,
    domain: [0, 256],
    colorScale: "turbo" // 配置色带，可选值：viridis,inferno,turbo,rainbow,jet,hsv,hot,cool,springsummer,autumn,winter,bone,copper,greys,ylgnbu,greens,ylorrd,bluered,rdbu,picnic,portland,blackbody,earth electric,magma,plasma
  })
  plot.render()

  // 范围及坐标系
  const [xmin, ymin, xmax, ymax] = image.getBoundingBox() // 矩形范围
  let extent = { xmin, ymin, xmax, ymax }
  const code = image.geoKeys.ProjectedCSTypeGeoKey || image.geoKeys.GeographicTypeGeoKey // 坐标系
  const crs = "EPSG:" + code
  if (crs && crs !== mars2d.CRS.EPSG4326 && crs !== mars2d.CRS.EPSG4490) {
    const ptMin = mars2d.PointTrans.proj4Trans([extent.xmin, extent.ymin], crs)
    const ptMax = mars2d.PointTrans.proj4Trans([extent.xmax, extent.ymax], crs)
    extent = { xmin: ptMin[0], ymin: ptMin[1], xmax: ptMax[0], ymax: ptMax[1] }
  }

  return {
    image: canvas.toDataURL("image/png"),
    extent: extent,
    crs: crs
  }
}

// tif转换为图片
async function tif2img(url) {
  const tif = await GeoTIFF.fromUrl(url)
  const image = await tif.getImage()

  // 取图片内容
  const [red, green, blue] = await image.readRasters()
  const width = image.getWidth()
  const height = image.getHeight()
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  const imageData = ctx.createImageData(width, height)
  for (let i = 0, len = imageData.data.length / 4; i < len; i++) {
    imageData.data[i * 4 + 0] = red[i]
    imageData.data[i * 4 + 1] = green[i] || 0
    imageData.data[i * 4 + 2] = blue[i] || 0
    imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255
  }
  ctx.putImageData(imageData, 0, 0)

  // 范围及坐标系
  const [xmin, ymin, xmax, ymax] = image.getBoundingBox() // 矩形范围
  let extent = { xmin, ymin, xmax, ymax }
  const code = image.geoKeys.ProjectedCSTypeGeoKey || image.geoKeys.GeographicTypeGeoKey // 坐标系
  const crs = "EPSG:" + code
  if (crs && crs !== mars2d.CRS.EPSG4326 && crs !== mars2d.CRS.EPSG4490) {
    const ptMin = mars2d.PointTrans.proj4Trans([extent.xmin, extent.ymin], crs)
    const ptMax = mars2d.PointTrans.proj4Trans([extent.xmax, extent.ymax], crs)
    extent = { xmin: ptMin[0], ymin: ptMin[1], xmax: ptMax[0], ymax: ptMax[1] }
  }

  return {
    image: canvas.toDataURL("image/png"),
    extent: extent,
    crs: crs
  }
}

// 在线转换坐标的方式，任意坐标系
// const { x: xmin, y: ymax } = await mars2d.Util.sendAjax({ url: `//epsg.io/trans?x=${west}&y=${north}&s_srs=${code}&t_srs=4326` })
