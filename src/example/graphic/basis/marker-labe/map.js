import * as mars2d from "mars2d"

let map // mars2d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  zoom: 7,
  center: { lng: 119.4104, lat: 30.845647 }
}

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  const clusterLayer = new mars2d.layer.ClusterLayer({
    chunkedLoading: true, // 间隔添加数据，以便页面不冻结。
    showCoverageOnHover: false, // 是否显示聚合标记的边界。
    disableClusteringAtZoom: 18 // 此级别下不聚合
  })
  map.addLayer(clusterLayer)
  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/apidemo/mudi.json"
  })
    .then((res) => {
      const arrData = res.data
      addFeature(clusterLayer, arrData)
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

function addFeature(graphicLayer, arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]
    const graphic = new mars2d.graphic.Marker({
      latlng: [item.lat, item.lng],
      style: {
        image: "img/marker/bike.png",
        horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
        verticalOrigin: mars2d.VerticalOrigin.BOTTOM,
        label: {
          text: "皖A12345",
          merge: true, // 合并在marker一个div内，便于聚合
          color: "#0000FF",
          font_size: 13,
          offsetY: -25,
          // className:"",//也可以直接指定css样式名
          background: true,
          background_color: "#e9e9f7",
          border: true,
          border_width: 1,
          border_color: "#0e0e0e",
          padding: 2
        }
      },
      attr: item
    })
    graphicLayer.addGraphic(graphic)

    graphic.bindPopup(
      function (event) {
        const item = event?.attr
        if (!item) {
          return false
        }
        const inthtml = `
    <table style="width:350px;">
      <tr>
        <th scope="col" colspan="2" style="text-align:center;font-size:15px;">${item.text} </th>
      </tr>
      <tr>
        <td>省：</td>
        <td>${item.province}</td>
      </tr>
      <tr>
        <td>市：</td>
        <td>${item.city}</td>
      </tr>
      <tr>
        <td>县/区：</td>
        <td>${item.district}</td>
      </tr>
      <tr>
        <td>地址：</td>
        <td>${item.address}</td>
      </tr>
      <tr>
        <td>视频：</td>
        <td><video src='//data.mars2d.cn/file/video/lukou.mp4' controls autoplay style="width: 300px;" ></video></td>
      </tr>
    </table>`
        return inthtml
      },
      { maxWidth: 350 }
    )
  }
}
