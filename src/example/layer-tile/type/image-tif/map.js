/**
 * 示例：TIF影像文件加载
 * 演示：浏览器端用 geotiff 解析 TIF，再用 plotty 按色带渲染成图片，最后用 ImageLayer 按 TIF 自带的坐标范围叠加到地图
 * API：mars2d.layer.ImageLayer、mars2d.PointTrans.proj4Trans、GeoTIFF.fromUrl
 * 要点：浏览器端直接加载 TIF 只适合小数据，大数据请发布 WMS/WMTS 等服务方式；TIF 的 GeoKey 决定坐标系，不是 4326/4490 时要用 proj4Trans 把 boundingBox 转成经纬度；geotiff 与 plotty 由 example.json 的 libs 引入（geotiff 键同时含两个文件）
 */
import * as mars2d from "mars2d"
import * as GeoTIFF from "geotiff"
const L = mars2d.L

export let map // mars2d.Map二维地图对象
let tileLayer // 叠加的图层

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 15,
  center: { lng: 117.14005, lat: 31.840196 }
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalNotify("已知问题提示", `(1)浏览器端直接加载TIF只适合小数据，大数据请发布WMS、WMTS等服务方式；`)

  addTileLayer()
}

// ========== 3. TIF 转图片并添加图层 ==========
export async function addTileLayer() {
  removeTileLayer()

  let result
  try {
    result = await tif2img2("https://data.mars3d.cn/img/map/rjy.tif")
  } catch (error) {
    console.log("加载TIF数据失败", error)
    globalNotify("数据加载失败", "TIF文件请求或解析失败，请检查网络后重试")
    return
  }
  // 请求返回时示例可能已卸载，map 已置空，直接跳过避免访问空地图
  if (!map) {
    return
  }

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
  if (map && tileLayer) {
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
    // 非经纬度坐标系：把 TIF 的投影范围转成经纬度，ImageLayer 才能按经纬度贴图
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

// ========== 4. 备用转换实现：手工写 canvas（不依赖 plotty 色带）==========
// 当前示例走上面的 tif2img2（plotty 色带渲染）；若不引入 plotty，可把 addTileLayer 中的调用改成 tif2img
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

// 另一种做法：调用在线坐标转换服务（任意坐标系），把 TIF 范围换算成经纬度后再给 ImageLayer，
// 如 //epsg.io/trans?x=${west}&y=${north}&s_srs=${code}&t_srs=4326 ；依赖外网服务，示例未启用

// ========== 5. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
  map = null
}
