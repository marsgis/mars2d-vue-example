/**
 * 示例：谷歌
 * 演示：用 type:"google" 加载谷歌电子、卫星（底图 + 注记分组）、地形三类底图
 * API：mars2d.layer.GoogleLayer、mapOptions.basemaps
 * 要点：谷歌地图在国内被屏蔽，图层不显示/访问超时属网络环境问题（示例已 globalNotify 提示）；GoogleLayer 内置的瓦片地址是 http，https 站点下还会被混合内容拦截；卫星底图由 img_d 底图 + img_z 注记两个图层组成一组
 */
import * as mars2d from "mars2d"

let map // mars2d.Map二维地图对象

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    { name: "谷歌地图", type: "google", layer: "vec", show: true },
    {
      // type:"group" 只作为可切换的底图分组，实际由影像底图和影像注记两个图层组成
      type: "group",
      name: "谷歌影像",
      layers: [
        { type: "google", layer: "img_d" },
        { type: "google", layer: "img_z" }
      ]
    },
    { name: "谷歌地形", type: "google", layer: "ter" }
  ]
}

// ========== 2. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalNotify(
    "已知问题提示",
    `如图层未显示或服务URL访问超时，是因为目前国家测绘主管部门对未经审核批准的国外地图服务做了屏蔽封锁。
     您可以需翻墙使用 或 参考示例代码替换本地服务地址使用。`
  )
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 底图由框架按 mapOptions 创建、随地图一起销毁，这里只断开示例对地图的引用
  map = null
}
