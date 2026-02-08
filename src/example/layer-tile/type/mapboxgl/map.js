// import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

export const mapOptions = {
  zoom: 12,
  center: { lng: 111.700745, lat: 30.451633 },
  operationallayers: [
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

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  map.setView([30.451633, 111.700745], 13)

  globalNotify("已知问题提示", "(1) 需要自行申请mapbox相关token替换 ")

  // addMapboxGLLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null
}

// MapboxglLayer定义在public\lib\mars2d\thirdParty\mapbox\leaflet-mapbox-gl.js
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
