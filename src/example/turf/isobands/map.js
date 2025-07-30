import * as mars2d from "mars2d"
let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 116.378174, lat: 30.537774 }
}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 加载气象
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/apidemo/windpoint.json"
  })
    .then((res) => {
      showWindLine(res.data)
    })
    .catch((error) => {
      console.log("请求出错了", error)
      globalMsg("实时查询气象信息失败，请稍候再试")
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

const colors = ["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"]
const breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 99] // 等值面的级数

// 等值线面
function showWindLine(arr) {
  // var min = arr[0].speed
  // var max = arr[0].speed

  const pointGrid = []
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]

    // if (min > item.speed) min = item.speed
    // if (max < item.speed) max = item.speed

    pointGrid.push({
      type: "Feature",
      properties: item,
      geometry: { type: "Point", coordinates: [item.x, item.y] }
    })
  }

  // breaks = []
  // var step = (max - min) / 10
  // for (var i = min; i <= max; i += step) {
  //   breaks.push(Number(i.toFixed(1)))
  // }

  const points = { type: "FeatureCollection", features: pointGrid }

  // 插值
  // turf.interpolate提供了基于 IDW（反距离权重）算法的将数据插值为格点的方法。
  // 插值的精度是由第二个参数与 interpolate_options.units 共同决定的
  // IDW 要为每个格点计算所有散点的权重，计算规模是 (散点数 * 格点数)，所以要在精度与性能间做好平衡。
  // points = turf.interpolate(points, 10, {
  //   gridType: 'point', // 'square' | 'point' | 'hex' | 'triangle'
  //   property: 'speed',
  //   units: 'kilometers', // degrees, radians, miles, or kilometers
  //   weight: 1
  // })
  // 适当降低插值结果的精度便于显示
  // points.features.map((i) => (i.properties.speed = Number(i.properties.speed.toFixed(1))))

  // 等值面
  const geojsonPoly = turf.isobands(points, breaks, { zProperty: "speed" })

  // 创建矢量数据图层
  const geoJsonLayer = new mars2d.layer.GeoJsonLayer({
    name: "等值面",
    data: geojsonPoly,
    popup: "{speed}",
    symbol: {
      styleOptions: {
        fill: true, // 是否填充
        fillColor: "#ffff00", // 颜色
        fillOpacity: 0.7, // 透明度
        outline: false
      },
      callback: function (attr, styleOpt) {
        // 得到点的权重，计算落在那个色度带
        const val = Number(attr.speed.split("-")[0] || 0)
        const color = getColor(val)
        return {
          fillColor: color
        }
      }
    }
  })
  map.addLayer(geoJsonLayer)

  // 等值线
  const geojsonLine = turf.isolines(points, breaks, { zProperty: "speed" })

  // 进行平滑处理
  // var features = geojsonLine.features;
  // for (var i = 0; i < features.length; i++) {
  //     var _coords = features[i].geometry.coordinates;
  //     var _lCoords = [];
  //     for (var j = 0; j < _coords.length; j++) {
  //         var _coord = _coords[j];
  //         var line = turf.lineString(_coord);
  //         var curved = turf.bezierSpline(line);
  //         _lCoords.push(curved.geometry.coordinates);
  //     }
  //     features[i].geometry.coordinates = _lCoords;
  // }

  const layerDZX = new mars2d.layer.GeoJsonLayer({
    name: "等值线",
    data: geojsonLine,
    popup: "{speed}",
    symbol: {
      styleOptions: {
        width: 2, // 边框宽度
        color: "#000000", // 边框颜色
        opacity: 0.5 // 边框透明度
      }
    }
  })
  map.addLayer(layerDZX)

  // 与行政区划边界来裁剪整个色斑图。这里要用到 turf.intersect()
  // 根据文档，这里输入的参数要 Feature<Polygon> ，而我们拿到的是 MultiPolygon，需要先 flatten() 处理一下。
  // geojsonPoly = turf.flatten(geojsonPoly);

  // var features = [];
  // geojsonPoly.features.forEach(function (layer1) {
  //     boundaries.features.forEach(function (layer2) {
  //         let intersection = null;
  //         try {
  //             intersection = turf.intersect(layer1, layer2);
  //         } catch (e) {
  //             layer1 = turf.buffer(layer1, 0); //容错处理
  //             intersection = turf.intersect(layer1, layer2);
  //         }
  //         if (intersection != null) {
  //             intersection.properties = layer1.properties;
  //             intersection.id = Math.random() * 100000;
  //             features.push(intersection);
  //         }
  //     });
  // });

  // var intersection = turf.featureCollection(features);
}

function getColor(value) {
  for (let i = 0; i < breaks.length; i++) {
    if (breaks[i] === value) {
      return colors[i]
    }
  }
  return colors[0]
}
