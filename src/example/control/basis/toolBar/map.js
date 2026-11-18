/**
 * 示例：工具按钮栏
 * 演示：手工创建 mars2d.control.ToolBar 工具按钮栏，包含回到默认视图、定位、全屏三个按钮
 * API：mars2d.control.ToolBar、map.addControl
 * 要点：按钮集合由 item 决定（home/location/fullscreen/clear），不配置 item 时默认三个按钮；可用 onGoLocate 等回调替换默认行为（文件末尾注释是接入百度定位的写法）；定位按钮依赖浏览器定位权限，需 HTTPS/localhost
 */
import * as mars2d from "mars2d"

let map
let geolocation
let toolbarControl
const L = mars2d.L

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  // 清空默认控件配置，工具按钮栏由下面手工创建
  option.control = {}
  return option
}

// ========== 2. 地图初始化 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance

  const control = new mars2d.control.ToolBar({
    position: "bottomleft"
    // 如需自定义“定位”按钮行为可配置 onGoLocate 回调（见文件末尾注释示例）
    // onGoLocate
  })
  toolbarControl = control
  map.addControl(control)
}

// ========== 3. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  if (map && toolbarControl) {
    // ToolBar.onRemove 会解绑地图上的 locationfound/locationerror 监听，按钮上的 DOM 监听随容器一起释放
    map.removeControl(toolbarControl)
    toolbarControl = null
  }
  map = null
}

// ---------- 附：接入百度定位自定义“定位”按钮回调（onGoLocate）的写法示例，需要时取消注释 ----------
// // 使用百度地图库进行定位
// function onGoLocate(e) {
//   if (!geolocation) {
//     geolocation = new BMap.Geolocation()
//   }

//   L.DomUtil.removeClass(this.btnLocation, this._iconLocation)
//   L.DomUtil.addClass(this.btnLocation, this._iconLocationLoading)

//   // eslint-disable-next-line
//   const that = this
//   geolocation.getCurrentPosition(
//     function (r) {
//       L.DomUtil.removeClass(that.btnLocation, that._iconLocationLoading)
//       L.DomUtil.addClass(that.btnLocation, that._iconLocation)

//       if (this.getStatus() === 0) {
//         const wgsPoint = mars2d.PointTrans.bd2wgs([r.point.lng, r.point.lat])

//         that.onLocationFound({
//           accuracy: 3000,
//           latlng: [wgsPoint[1], wgsPoint[0]]
//         })
//       } else {
//         // 关于状态码
//         // BMAP_STATUS_SUCCESS 检索成功。对应数值“0”。
//         // BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
//         // BMAP_STATUS_UNKNOWN_LOCATION 位置结果未知。对应数值“2”。
//         // BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
//         // BMAP_STATUS_INVALID_KEY 非法密钥。对应数值“4”。
//         // BMAP_STATUS_INVALID_REQUEST 非法请求。对应数值“5”。
//         // BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
//         // BMAP_STATUS_SERVICE_UNAVAILABLE 服务不可用。对应数值“7”。(自 1.1 新增)
//         // BMAP_STATUS_TIMEOUT 超时。对应数值“8”。(自 1.1 新增)
//         // globalMsg(this.getStatus(), "定位失败")
//         globalMsg("定位失败")
//       }
//     },
//     { enableHighAccuracy: true }
//   )
// }
