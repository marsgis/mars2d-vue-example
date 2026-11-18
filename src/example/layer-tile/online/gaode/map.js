/**
 * 示例：高德
 * 演示：用 type:"gaode" 加载高德电子、卫星（底图 + 注记）、大字体底图与实时路况（经代理），并在状态栏动态展示高德版权信息
 * API：mars2d.layer.GaodeLayer、mapOptions.basemaps、map.controls
 * 要点：maxZoom 21 但高德瓦片最高到 18 级（GaodeLayer 内置 maxNativeZoom:18），19 级起由客户端放大显示；实时路况走 //server.mars2d.cn/proxy/ 代理转发；版权栏由示例插入状态栏并在底图切换时手动同步
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 高德底图版权信息（含审图号），挂在每个底图的 attribution 上，切换底图时同步到状态栏
const attributionHtml = `©2024 高德软件- <span>审图号：GS(2021)6375号</span>
- 甲测资字11111093 - <a href="https://map.amap.com/doc/serviceitem.html" target="_blank" trace="tos">服务条款</a> `

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  maxZoom: 21, // 高德瓦片最高 18 级，19 级起由客户端放大显示（GaodeLayer 内置 maxNativeZoom:18）
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      name: "高德地图",
      type: "gaode",
      layer: "vec",
      show: true, // show:true 的项才是默认底图
      // 单个底图也可以单独覆盖层级（按需放开）：
      // maxZoom: 21,
      // maxNativeZoom: 18,
      attribution: attributionHtml
    },
    {
      // type:"group" 只作为可切换的底图分组，实际由影像底图和影像注记两个图层组成
      name: "高德卫星",
      type: "group",
      layers: [
        {
          type: "gaode",
          layer: "img_d"
        },
        {
          type: "gaode",
          layer: "img_z"
        }
      ],
      attribution: attributionHtml
    },
    {
      name: "高德大字体地图",
      type: "gaode",
      layer: "vec",
      bigfont: true, // bigfont:true 请求大字体瓦片
      attribution: attributionHtml
    }
  ],
  operationallayers: [
    {
      name: "实时交通信息",
      type: "gaode",
      layer: "time", // layer:"time" 为高德实时路况图层
      proxy: "//server.mars2d.cn/proxy/" // 路况瓦片经代理转发，避免高德路况服务的跨域/来源限制
    }
  ]
}

// ========== 2. 事件对象 ==========
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件给vue

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addCreditDOM()

  addTestMarker()

  // 通知面板：map.js 的 onMounted 已执行完（面板可用 eventTarget.on("mapLoaded") 订阅）
  eventTarget.fire("mapLoaded")
}

// ========== 4. 清理（与 onMounted 对称）==========
/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 先解绑底图切换监听，再移除插到状态栏的版权 DOM，最后断开 map 引用（重复调用也安全）
  if (map) {
    map.off("baselayerchange", attributionUpdateHandler)
  }
  removeCreditDOM()
  map = null
}

// ========== 5. 示例数据（坐标参照点）==========
// 设置WGS84坐标参照物(辨识是否纠偏)：GCJ02 底图上 WGS84 点会有数百米偏移，可据此判断底图是否做了纠偏
function addTestMarker() {
  const graphic = new mars2d.graphic.Marker({
    latlng: [31.835299, 117.216588],
    style: {
      image: "img/marker/mark1.png",
      width: 32,
      height: 44,
      horizontalOrigin: mars2d.HorizontalOrigin.CENTER,
      verticalOrigin: mars2d.VerticalOrigin.BOTTOM
    },
    attr: { remark: "示例1" }
  })
  map.graphicLayer.addGraphic(graphic)

  graphic.bindPopup("<p>我是WGS84坐标下，望江西路与怀宁路交口</p>").openPopup()
}

// ========== 6. 状态栏版权信息 ==========
// 在下侧状态栏增加一个额外div展示图层版权信息
let attributionDOM
function addCreditDOM() {
  // getContainer() 是 L.Control 的公开方法，等价于旧写法里的私有字段 _container
  const locationBar = map.controls.locationBar?.getContainer()
  if (locationBar) {
    attributionDOM = L.DomUtil.create("div", "mars2d-locationbar-content mars2d-locationbar-autohide", locationBar)
    attributionDOM.style["pointer-events"] = "all"
    attributionDOM.style.float = "right"
    attributionDOM.style.marginRight = "50px"

    attributionDOM.innerHTML = map.basemap?.options?.attribution || ""

    map.on("baselayerchange", attributionUpdateHandler)
  }
}

// 底图切换后同步版权信息；具名注册便于卸载时解绑，避免重复进入示例叠加监听
function attributionUpdateHandler() {
  if (attributionDOM) {
    attributionDOM.innerHTML = map.basemap?.options?.attribution || ""
  }
}
function removeCreditDOM() {
  if (attributionDOM) {
    L.DomUtil.remove(attributionDOM)
    attributionDOM = null
  }
}
