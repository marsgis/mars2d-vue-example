import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map三维地图对象
let clusterLayer

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

  addLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function removeLayer() {
  if (clusterLayer) {
    clusterLayer.remove()
    clusterLayer = null
  }
}

export function addLayer() {
  removeLayer()

  clusterLayer = new mars2d.layer.ClusterLayer({
    chunkedLoading: true, // 间隔添加数据，以便页面不冻结。
    showCoverageOnHover: false, // 是否显示聚合标记的边界。
    disableClusteringAtZoom: 18 // 此级别下不聚合
  })
  map.addLayer(clusterLayer)

  // 添加随机数据演示
  for (let i = 0; i < 100; i++) {
    const graphic = new mars2d.graphic.Marker({
      latlng: getRandomLatLng(),
      style: {
        image: "img/marker/mark1.png",
        width: 32,
        height: 44,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      },
      attr: {
        id: i
      }
    })
    clusterLayer.addGraphic(graphic)

    const inhtml = `<div class="mars2d-template-titile">第${i}个</div>
     <div class="mars2d-template-content" >
        <div><label>编码</label> 测试数据 </div>
        <div><label>名称</label> 测试名称 </div>
        <div><label>地址</label> 测试地址 </div>
      </div>`
    graphic.bindPopup(inhtml)
  }
}

export function addCustomLayer() {
  removeLayer()

  clusterLayer = new mars2d.layer.ClusterLayer({
    maxClusterRadius: 120,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    iconCreateFunction: function (cluster) {
      const markers = cluster.getAllChildMarkers()
      // 显示个数
      const n = markers.length
      // 显示数据的数量
      // var n = 0;
      // for (var i = 0; i < markers.length; i++) {
      //   n += markers[i].attr.id;
      // }
      return L.divIcon({ html: n, className: "myclusterLayer", iconSize: L.point(40, 40) })
    }
  })
  map.addLayer(clusterLayer)

  // 添加随机数据演示
  for (let i = 0; i < 100; i++) {
    const graphic = new mars2d.graphic.Marker({
      latlng: getRandomLatLng(),
      style: {
        image: "img/marker/mark1.png",
        width: 32,
        height: 44,
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM
      },
      attr: { id: i }
    })
    clusterLayer.addGraphic(graphic)

    const inhtml = `<div class="mars2d-template-titile">第${i}个</div>
     <div class="mars2d-template-content" >
        <div><label>编码</label> 测试数据 </div>
        <div><label>名称</label> 测试名称 </div>
        <div><label>地址</label> 测试地址 </div>
      </div>`
    graphic.bindPopup(inhtml)
  }
}

// 照片点示例
export function addCustomPhotoLayer() {
  removeLayer()

  clusterLayer = new mars2d.layer.ClusterLayer({
    maxClusterRadius: 100,
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    iconCreateFunction: function (cluster) {
      const markers = cluster.getAllChildMarkers()
      return L.divIcon({
        className: "mars2d-marker-photo",
        html: '<div style="background-image: url(' + markers[0].attr.image + ');"></div>​<b>' + markers.length + "</b>",
        iconSize: L.point(40, 40)
      })
    }
  })
  map.addLayer(clusterLayer)

  // 添加随机数据演示
  for (let i = 0; i < 100; i++) {
    const image = "img/photo/test.jpg"
    const graphic = new mars2d.graphic.DivGraphic({
      latlng: getRandomLatLng(),
      style: {
        html: `<div style="background-image: url(${image});"></div>`,
        className: "mars2d-marker-photo",
        iconSize: [40, 40]
      },
      attr: { image: image, id: i }
    })
    clusterLayer.addGraphic(graphic)

    const inhtml = `<div style="width:250px;text-align: center;"><h4>木遥</h4><br/><img src="${image}" /></div>`
    graphic.bindPopup(inhtml)
  }
}

function getRandomLatLng() {
  const bounds = map.getBounds()
  const southWest = bounds.getSouthWest()
  const northEast = bounds.getNorthEast()
  const lngSpan = northEast.lng - southWest.lng
  const latSpan = northEast.lat - southWest.lat

  return L.latLng(southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random())
}
