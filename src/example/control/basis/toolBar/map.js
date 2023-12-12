import * as mars2d from "mars2d"

let map
let geolocation
const L = mars2d.L

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option.control = {}
  return option
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars2d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance

  const control = new mars2d.control.ToolBar({
    position: "bottomleft",
    onGoLocate
  })
  map.addControl(control)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 使用百度地图库进行定位
function onGoLocate(e) {
  if (!geolocation) {
    geolocation = new BMap.Geolocation()
  }

  L.DomUtil.removeClass(this.btnLocation, this._iconLocation)
  L.DomUtil.addClass(this.btnLocation, this._iconLocationLoading)

  // eslint-disable-next-line
  const that = this
  geolocation.getCurrentPosition(
    function (r) {
      L.DomUtil.removeClass(that.btnLocation, that._iconLocationLoading)
      L.DomUtil.addClass(that.btnLocation, that._iconLocation)

      if (this.getStatus() === 0) {
        const wgsPoint = mars2d.PointTrans.bd2wgs([r.point.lng, r.point.lat])

        that.onLocationFound({
          accuracy: 3000,
          latlng: [wgsPoint[1], wgsPoint[0]]
        })
      } else {
        // 关于状态码
        // BMAP_STATUS_SUCCESS 检索成功。对应数值“0”。
        // BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
        // BMAP_STATUS_UNKNOWN_LOCATION 位置结果未知。对应数值“2”。
        // BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
        // BMAP_STATUS_INVALID_KEY 非法密钥。对应数值“4”。
        // BMAP_STATUS_INVALID_REQUEST 非法请求。对应数值“5”。
        // BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
        // BMAP_STATUS_SERVICE_UNAVAILABLE 服务不可用。对应数值“7”。(自 1.1 新增)
        // BMAP_STATUS_TIMEOUT 超时。对应数值“8”。(自 1.1 新增)
        // globalMsg(this.getStatus(), "定位失败")
        globalMsg("定位失败")
      }
    },
    { enableHighAccuracy: true }
  )
}
