/**
 * 示例：建筑物3D立体
 * 演示：用 OSM Buildings 第三方插件（lib: OSMBuildings）在二维底图上按建筑轮廓与高度渲染带光影的立体建筑，单击建筑读取属性弹 popup
 * API：OSMBuildings（插件全局类，date/load/set/click）、L.popup、mars2d.Util.fetchJson
 * 要点：插件通过全局 OSMBuildings 使用，不是 mars2d 内置图层；date() 决定光照/阴影方向；数据在 data.mars2d.cn 在线服务上，异步返回时要判空 map/osmb；OSMBuildings 本身是 Leaflet 图层，onUnmounted 用 map.removeLayer 释放
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象
let geojson // 建筑物 GeoJSON 数据（点击时按 feature id 查名称）
let osmb // OSM Buildings 图层实例

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 16,
  center: { lng: 116.445315, lat: 39.916728 }
}

// 事件对象，用于抛出事件给vue（本示例没有需要抛给面板的事件，保留以统一各示例结构）
export const eventTarget = new mars2d.BaseClass()

// ========== 1. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加建筑物图层（构造时即通过 map.addLayer 加入地图）
  osmb = new OSMBuildings(map)
  osmb
    // date() 设置光照时间，决定建筑明暗与阴影方向
    .date(new Date(2017, 5, 15, 17, 30))
    // load() 不传 url 时先拉取插件默认的 OSM 建筑数据，随后再用下面的北京数据 set() 覆盖
    .load()
    .click(function (e) {
      console.log("单击了:", e)

      showPopup(e)
    })

  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/buildings-bj.json"
  })
    .then((data) => {
      // 请求返回时示例可能已被切走（map/osmb 已置空），直接丢弃结果
      if (!map || !osmb) {
        return
      }
      geojson = data
      osmb.set(geojson)
    })
    .catch((error) => {
      console.log("请求出错了", error)
      globalNotify("数据加载失败", "北京建筑物数据请求失败，请检查网络后重试")
    })
}

// ========== 2. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * 框架在切换示例 / 重新运行 map.js 时调用，必须判空且可重复执行
 * @returns {void} 无
 */
export function onUnmounted() {
  if (osmb) {
    // OSMBuildings 是 Leaflet 图层，从地图移除即释放它创建的 Canvas 与地图事件
    if (map) {
      map.removeLayer(osmb)
    }
    osmb = null
  }
  geojson = null
  map = null
}

// ========== 3. 交互（单击建筑弹属性）==========
function showPopup(evt) {
  let name = getFeatureNameById(evt.feature)
  name = name || "<span style='color:red'>无数据</span>"
  L.popup().setContent(name).setLatLng(L.latLng(evt.lat, evt.lon)).openOn(map)
}

// 插件点击回调只给 feature id，需要回到 geojson 里查建筑名称
function getFeatureNameById(id) {
  if (!geojson || !id) {
    return null
  }
  const features = geojson.features
  for (let i = 0; i < features.length; i++) {
    if (features[i].properties.id === id) {
      return features[i].properties.name
    }
  }
}
