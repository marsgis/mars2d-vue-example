// import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象
let mapboxMap

const mapOptions = {
  zoom: 12,
  center: { lng: 111.700745, lat: 30.451633 },
  basemaps: []
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.setView([30.451633, 111.700745], 13)

  const gl = L.mapboxGL({
    accessToken: "pk.eyJ1IjoiY2pwMjAwMCIsImEiOiJjbGdibGJ2OTMwMmJxM2ZwOHQ2ZWJ0NnJyIn0.eRG2RzgUHrJ2auzNG1RUaw",
    style: "https://api.maptiler.com/maps/basic/style.json?key=gbetYLSD5vR8MdtZ88AQ",
    pane: "overlayPane"
  }).addTo(map)

  mapboxMap = gl.getMapboxMap()

  mapboxMap.on("load", () => {
    console.log("MAPBOX map loaded")

    mapboxMap.addSource("states", {
      type: "vector",
      tiles: ["http://124.223.40.17:18080/vectortile/pcyd/{z}/{x}/{y}.pbf"]
    })
    mapboxMap.addLayer({
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
    })

    mapboxMap.addLayer({
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
    })

    mapboxMap.on("click", "state-fills", (e) => {
      const lnglat = L.latLng(e.lngLat.lat, e.lngLat.lng)
      L.popup().setLatLng(lnglat).setContent(e.features[0].properties["农用地"]).openOn(map)
    })

    // 绑定事件
    map.on(mars2d.EventType.movestart, this.map_clickStartHandler, this)
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
function onUnmounted() {
  map = null
}

function map_clickStartHandler(event) {
  closeEvent()
}

function map_clickEndHandler(event) {
  // openEvent();
}

function closeEvent() {
  mapboxMap.dragPan.disable()
  mapboxMap.scrollZoom.disable()
}
