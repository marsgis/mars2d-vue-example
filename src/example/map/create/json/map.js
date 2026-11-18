/**
 * 示例：根据配置文件创建地图
 * 演示：用 mars2d.Util.fetchJson 读取 config/config.json，再把整份配置传给 new mars2d.Map 创建地图
 * API：mars2d.Util.fetchJson、mars2d.Map
 * 要点：地图创建是异步的（先请求配置文件），期间切换示例要停止后续创建；initMap 是 iframe 里的约定入口，common.js 会把返回值赋给 window._mapInstance
 */
import * as mars2d from "mars2d"

let map // initMap 异步创建出来的地图对象

// 防止配置文件还没加载完就切换示例、仍继续创建地图
let unmounted = false

// ========== 1. 地图初始化 ==========
function initMap() {
  unmounted = false

  // 读取 config.json 配置文件
  mars2d.Util.fetchJson({
    url: "config/config.json"
  })
    .then((json) => {
      console.log("读取 config.json 配置文件完成", json)

      if (unmounted) {
        return // 已切换示例，不再创建地图
      }

      // 创建二维地图场景
      map = new mars2d.Map("mars2dContainer", json)

      // initMap 是异步的，返回时地图还不存在，common.js 拿不到返回值；
      // 这里建好后手动补上宿主页的 window._mapInstance，保证与其它示例同一套约定
      window.parent._mapInstance = map

      console.log("mars2d的Map主对象构造完成", map)
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
      globalAlert(error && error.message, "出错了")
    })
}

// ========== 2. 清理（与 initMap 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  unmounted = true
  if (map) {
    map.destroy()
    map = null
  }
}
