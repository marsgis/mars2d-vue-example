/**
 * 第3方公共类库配置文件
 *
 * @copyright 火星科技 mars2d.cn
 * @author 木遥 2021-11-26
 */
window.configLibs = {
  /// ///////////////////////Mars2D地图渲染相关库////////////////////////
  'mars2d': [//地图 主库
    "leaflet/leaflet.css",
    "leaflet/leaflet.js",
    "mars2d/mars2d.css",
    "mars2d/mars2d.js",
    "mars2d/plugins/esri/mars2d-esri.js" //非必须，加载arcgis图层时需要
  ],
  'mars2d-esri': [
    //arcgis服务支持插件
    // "mars2d/plugins/esri/mars2d-esri.js"
  ],
  'mars2d-mapv': [
    //mapv支持插件
    'mapV/mapv.min.js',
    "mars2d/plugins/mapv/mars2d-mapv.js"
  ],
  'mars2d-echarts': [
    //echarts支持插件
    "echarts/echarts.min.js",
    "mars2d/plugins/echarts/mars2d-echarts.js"
  ],
  //////////////////////////leaflet第3方插件////////////////////////
  "leaflet-sideBySide": ["mars2d/thirdParty/sideBySide/leaflet-side-by-side.min.js"],
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
  textCollision: [
    "mars2d/thirdParty/textCollision/LabelTextCollision.js"
  ],
  'mapbox-gl': [
    "mars2d/thirdParty/mapbox/mapbox-gl.css",
    "mars2d/thirdParty/mapbox/mapbox-gl.js",
    "mars2d/thirdParty/mapbox/leaflet-mapbox-gl.js",
  ],
  "leaflet-wind": [
    "mars2d/thirdParty/wind/leaflet-wind.js",
  ],
  /// ///////////////////////mars3d及其插件////////////////////////
  mars3d: [
    // 地图 主库
    "http://mars3d.cn/lib/Cesium/Widgets/widgets.css",
    "http://mars3d.cn/lib/Cesium/Cesium.js",
    "http://mars3d.cn/lib/turf/turf.min.js",
    "http://mars3d.cn/lib/mars3d/mars3d.css",
    "http://mars3d.cn/lib/mars3d/mars3d.js"
  ],

  //////////////////////////其他地图渲染相关库////////////////////////
  'turf': [
    "turf/turf.min.js"
  ],
  'echarts': [
    "echarts/echarts.min.js",
    "echarts/dark.js"
  ],
  'echarts-gl': [
    "echarts/echarts.min.js",
    "echarts/echarts-gl/echarts-gl.min.js"
  ],
  'echarts-liquidfill': [
    "echarts/echarts.min.js",
    "echarts/echarts-liquidfill/echarts-liquidfill.js"
  ],
  'terraformer': [
    "terraformer/terraformer-1.0.9.min.js",
    "terraformer/terraformer-wkt-parser-1.2.0.min.js",
  ],
  'kriging': [
    "kriging/kriging.min.js"
  ],
  'three': [
    "three/three.js"
  ],
  'kmlGeojson': [
    "geojson/kml-geojson.js"  // 项目KML/KMZ解析加载GeoJson插件
  ],
  'shpGeojson': [
    "geojson/shp-geojson.js"  // 项目KML/KMZ解析加载GeoJson插件
  ],
}


