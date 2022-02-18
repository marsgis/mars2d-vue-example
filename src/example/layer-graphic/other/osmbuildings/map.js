import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象
let geojson

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 16,
  center: { lng: 116.445315, lat: 39.916728 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 添加建筑物图层
  const osmb = new OSMBuildings(map)
  osmb
    .date(new Date(2017, 5, 15, 17, 30))
    .load()
    .click(function (e) {
      console.log("单击了:", e)

      showPopup(e)
    })

  mars2d.Util.fetchJson({
    url: "http://data.mars2d.cn/file/geojson/buildings-bj.json"
  })
    .then((data) => {
      geojson = data
      osmb.set(geojson)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function showPopup(evt) {
  let name = getFeatureNameById(evt.feature)
  name = name || "<span style='color:red'>无数据</span>"
  L.popup().setContent(name).setLatLng(L.latLng(evt.lat, evt.lon)).openOn(map)
}

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
