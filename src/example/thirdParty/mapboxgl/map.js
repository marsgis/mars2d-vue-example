/**
 * 示例：Mapbox GL图层
 * 演示：在 mars2d 上叠加 Mapbox GL 矢量瓦片图层：方式1 用 operationallayers 的 mapboxgl 类型配置，方式2 用 MapboxglLayer 直接创建（代码保留但当前未启用）
 * API：mapOptions.operationallayers（type: "mapboxgl"）、MapboxglLayer、map.setView
 * 要点：示例里的 accessToken/style/source.tiles 全是占位值，必须换成自己申请的 Mapbox token 与矢量瓦片地址才能出图（onMounted 有 globalNotify 提示）；依赖 example.json libs 中的 mapbox-gl（其中 leaflet-mapbox-gl.js 提供全局 MapboxglLayer）；layers 里的 source/source-layer 必须与 style 内定义的矢量瓦片源一致，否则不渲染
 */
let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 12,
  center: { lng: 111.700745, lat: 30.451633 },
  operationallayers: [
    // 方式1：在创建地图前的参数中配置
    {
      name: "mapboxgl图层",
      type: "mapboxgl",
      accessToken: "自己的Token",
      style: "https://api.maptiler.com/maps/basic/style.json?key=自己的key",
      layers: [
        {
          id: "state-fills",
          type: "fill",
          source: "states",
          "source-layer": "pcyd",
          layout: {},
          paint: { "fill-color": "#ffce7b", "fill-opacity": 0.8, "fill-outline-color": "#ff0000" }
        },
        {
          id: "state-fills-label",
          type: "symbol",
          source: "states",
          "source-layer": "pcyd",
          layout: {
            "text-field": ["get", "农用地"],
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-size": 12,
            "text-anchor": "top"
          },
          paint: { "text-color": "#4e72b8" }
        }
      ],
      show: true
    }
  ]
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  map.setView([30.451633, 111.700745], 13)

  globalNotify("已知问题提示", "(1) 需要自行申请mapbox相关token替换 ")

  // addMapboxGLLayer()
}

// ========== 3. 备用实现：代码创建 MapboxglLayer（方式2）==========
// MapboxglLayer 是全局对象，定义在 public/lib/leaflet/thirdParty/mapbox/leaflet-mapbox-gl.js（由 libs 的 mapbox-gl 引入）
function addMapboxGLLayer() {
  // eslint-disable-next-line no-undef
  const mapboxglLayer = new MapboxglLayer({
    accessToken: "自己的Token",
    style: "https://api.maptiler.com/maps/basic/style.json?key=自己的key",
    source: {
      states: {
        type: "vector",
        tiles: ["http://localhost/vectortile/pcyd/{z}/{x}/{y}.pbf"]
      }
    },
    layers: [
      {
        id: "state-fills",
        type: "fill",
        source: "states",
        "source-layer": "pcyd",
        layout: {},
        paint: {
          "fill-color": "#ffce7b",
          "fill-opacity": 0.8,
          "fill-outline-color": "#ff0000"
        }
      },
      {
        id: "state-fills-label",
        type: "symbol",
        source: "states",
        "source-layer": "pcyd",
        layout: {
          "text-field": ["get", "农用地"],
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-size": 12,
          "text-anchor": "top"
        },
        paint: {
          "text-color": "#4e72b8"
        }
      }
    ]
  }).addTo(map)

  mapboxglLayer.on("load", () => {
    console.log("MAPBOX map loaded")

    const mapboxMap = mapboxglLayer.getMapboxMap()
    mapboxMap.on("click", "state-fills", (e) => {
      const lnglat = L.latLng(e.lngLat.lat, e.lngLat.lng)
      L.popup().setLatLng(lnglat).setContent(e.features[0].properties["农用地"]).openOn(map)
    })
  })
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 图层由 operationallayers 在地图创建时生成，随地图/iframe 一起释放，这里只需断开引用
  map = null
}
