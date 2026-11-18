/**
 * 示例：GeoJson大数据面(Canvas合并渲染)
 * 演示：用 lib 里的 L.CanvasGeojsonLayer 把整份 GeoJSON（上千个城市面）合并绘制到一块 Canvas 上，再通过 onClick/onMouseOver/onMouseOut 回调实现属性弹窗与悬停高亮
 * API：L.CanvasGeojsonLayer（addCanvasFeatures/render）、mars2d.Util.fetchJson
 * 要点：Canvas 合并渲染省去每个面一个 DOM 的开销，但不支持自动交互——悬停/单击是插件按坐标反查要素回调；改属性后必须手动 render() 才会重绘；异步请求返回时要判空 map，避免示例已切走后操作旧对象
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象
let canvasLayer // Canvas 合并渲染图层
const L = mars2d.L

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 118.100831, lat: 31.318573 }
}

// 事件对象，用于抛出事件给vue（本示例没有需要抛给面板的事件，保留以统一各示例结构）
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // L.CanvasGeojsonLayer 由 lib（example.json 的 libs: CanvasGeojsonLayer）提供，不是 mars2d 内置类
  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/urban.json"
  })
    .then((geojson) => {
      // 请求返回时示例可能已被切走、map 已经置空，直接丢弃结果
      if (!map) {
        return
      }
      // 按面积分两档颜色：大地块不透明度更高，便于看出城市规模差异
      for (let i = 0; i < geojson.features.length; i++) {
        const feature = geojson.features[i]
        if (feature.properties.area_sqkm > 1000) {
          feature.properties.Color = "rgba(100, 224, 60,.8)"
        } else {
          feature.properties.Color = "rgba(100, 224, 60,.6)"
        }
      }
      globalMsg("共渲染" + geojson.features.length + "个面")
      showData(geojson)
    })
    .catch((error) => {
      console.log("请求出错了", error)
      globalNotify("数据加载失败", "城市面数据请求失败，请检查网络后重试")
    })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (canvasLayer) {
    // 移除图层即释放它创建的 Canvas 与地图事件；onUnmounted 里 map 可能已被置空，需判空
    if (map) {
      map.removeLayer(canvasLayer)
    }
    canvasLayer = null
  }
  map = null
}

// ========== 3. 图层与交互（Canvas 合并渲染）==========
function showData(geojsonData) {
  canvasLayer = new L.CanvasGeojsonLayer({
    style: {},
    // 单击回调：features 是命中的要素集合，latlng 是鼠标位置
    onClick: function (features, latlng) {
      if (features.length === 0) {
        return
      }

      // 数据里字段多且空值多，Null/Unknown/0/空串统一跳过，弹窗只显示有效信息
      let inhtml = "<table>"
      const attr = features[0].geojson.properties
      for (const col in attr) {
        const showval = mars2d.Util.trim(String(attr[col]))
        if (showval === null || showval === "" || showval === "Null" || showval === "Unknown" || showval === "0" || showval.length === 0) {
          continue
        }

        inhtml += '<tr>  <td  style="text-align: right;min-width: 80px;">' + col + "：</td> <td>" + showval + "</td>   </tr>"
      }
      inhtml += "</table>"

      const popup = L.popup().setLatLng(latlng).setContent(inhtml).openOn(map)
    },
    onMouseOver: function (features, latlng) {
      // handle mouseover events
      if (features.length === 0) {
        return
      }

      for (let i = 0; i < features.length; i++) {
        const properties = features[i].geojson.properties
        // 首次悬停时保存原色，供移出时还原
        if (!properties.Color_Old) {
          properties.Color_Old = properties.Color
        }
        properties.Color = "rgba(90, 131, 245, 1)"
      }
      // Canvas 不会因属性变化自动重绘，需要手动 render 一次
      canvasLayer.render()
    },
    onMouseOut: function (features, latlng) {
      if (features.length === 0) {
        return
      }

      for (let i = 0; i < features.length; i++) {
        const properties = features[i].geojson.properties
        properties.Color = properties.Color_Old
      }
      canvasLayer.render()
    }
  })

  // 加入地图、登记要素，再统一绘制一次
  canvasLayer.addTo(map)
  canvasLayer.addCanvasFeatures(L.CanvasFeatureFactory(geojsonData))
  canvasLayer.render()
}
