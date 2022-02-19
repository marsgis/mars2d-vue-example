/**
 * 第3方公共类库配置文件
 *
 * @copyright 火星科技 mars2d.cn
 * @author 木遥 2021-11-26
 */
window.configLibs = {
  //////////////////////////Mars2D地图渲染相关库////////////////////////
  mars2d: [
    //地图 主库
    "leaflet/leaflet.css",
    "leaflet/leaflet.js",
    "mars2d/mars2d.css",
    "mars2d/mars2d.js",
    "mars2d/plugins/esri/mars2d-esri.js" //非必须，加载arcgis图层时需要
  ],
  "mars2d-esri": [
    //arcgis服务支持插件
    "mars2d/plugins/esri/mars2d-esri.js"
  ],
  "mars2d-mapv": [
    //mapv支持插件
    "mapV/mapv.min.js",
    "mars2d/plugins/mapv/mars2d-mapv.js"
  ],
  "mars2d-echarts": [
    //echarts支持插件
    "echarts/echarts.min.js",
    "mars2d/plugins/echarts/mars2d-echarts.js"
  ],
  "mars2d-widget": [
    //传统JS的widget模块化插件
    "mars2d/plugins/widget/mars2d-widget.css",
    "mars2d/plugins/widget/mars2d-widget.js"
  ],
  //////////////////////////leaflet第3方插件////////////////////////
  "leaflet-sideBySide": ["leaflet/leaflet-src.js", "mars2d/thirdParty/sideBySide/leaflet-side-by-side.min.js"],
  OSMBuildings: [
    // 建筑物3D立体 插件
    "mars2d/thirdParty/OSMBuildings/OSMBuildings-Leaflet.debug.js",
    "mars2d/thirdParty/OSMBuildings/OSMBuildings-Leaflet.js"
  ],
  CanvasGeojsonLayer: [
    // 大数据Canvas合并渲染 插件
    "mars2d/thirdParty/canvasGeojson/leaflet-canvas-geojson.js"
  ],
  antPath: [
    // 流动线材质 插件
    "mars2d/thirdParty/antPath/leaflet-ant-path.js"
  ],
  timeDimension: [
    // 时间播放 插件
    "mars2d/thirdParty/timedimension/iso8601.min.js",
    "mars2d/thirdParty/timedimension/leaflet.timedimension.control.css",
    "mars2d/thirdParty/timedimension/leaflet.timedimension.js"
  ],

  //////////////////////////mars3d及其插件////////////////////////
  mars3d: [
    //地图 主库
    "https://cdn.jsdelivr.net/npm/mars3d-cesium/Build/Cesium/Widgets/widgets.css",
    "https://cdn.jsdelivr.net/npm/mars3d-cesium/Build/Cesium/Cesium.js",
    "https://unpkg.com/@turf/turf/turf.min.js",
    "https://cdn.jsdelivr.net/npm/mars3d/dist/mars3d.css",
    "https://cdn.jsdelivr.net/npm/mars3d/dist/mars3d.js"
  ],

  //////////////////////////其他地图渲染相关库////////////////////////
  turf: ["turf/turf.min.js"],
  echarts: ["echarts/echarts.min.js", "echarts/dark.js"],
  "echarts-gl": ["echarts/echarts.min.js", "echarts/echarts-gl/echarts-gl.min.js"],
  "echarts-liquidfill": ["echarts/echarts.min.js", "echarts/echarts-liquidfill/echarts-liquidfill.js"],
  terraformer: ["terraformer/terraformer-1.0.9.min.js", "terraformer/terraformer-wkt-parser-1.2.0.min.js"],
  kmlGeojson: ["kml/kml-geojson.js"],
  kriging: ["kriging/kriging.min.js"]
}

// 官网发布时用CDN服务
if (window.location.hostname.indexOf("mars") !== -1) {
  window.cdnLibsPath = "http://cdn.marsgis.cn/lib/"
}

//本地测试  localStorage.setItem("muyao-debugger",1)
if (localStorage.getItem("muyao-debugger") === "1") {
  for (let key in configLibs) {
    if (key.startsWith("mars2d")) {
      let arrUrl = configLibs[key]
      for (let index = 0; index < arrUrl.length; index++) {
        const url = arrUrl[index]
        const fileName = url?.substring(url.lastIndexOf("/") + 1, url.length)
        if (fileName.startsWith("mars2d")) {
          arrUrl[index] = arrUrl[index].replace(".js", "-src.js").replace(".css", "-src.css")
        } else if (fileName.indexOf("leaflet") != -1) {
          arrUrl[index] = arrUrl[index].replace(".js", "-src.js")
        }
      }
    }
  }
  console.log("正在使用SDK调试版本")
}
