/**
 * 示例：百度
 * 演示：用 crs: mars2d.CRS.BAIDU 加载百度电子/卫星/自定义配色底图与实时路况，并在状态栏动态展示百度版权信息
 * API：mars2d.CRS.BAIDU、mapOptions.basemaps、map.controls
 * 要点：百度瓦片是 BD09 投影，地图级 crs 必须是 mars2d.CRS.BAIDU；layer:"custom" 的配色由 style 指定（grassgreen/midnight/…）；版权栏是示例自己插到状态栏 DOM 里的，底图切换时手动同步
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 百度底图版权信息（含审图号），挂在每个底图的 attribution 上，切换底图时同步到状态栏
const attributionHtml = `©2024 Baidu - <span>审图号：GS(2023)3206号</span>
- 甲测资字11111342- <a target="_blank" href="https://map.baidu.com/zt/client/service/index.html">服务条款</a>`

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  // 百度瓦片自带 BD09 加偏，地图级 crs 必须整体用百度坐标系，不能与 3857/4326 底图混用
  crs: mars2d.CRS.BAIDU,
  zoom: 12,
  maxZoom: 19,
  center: { lng: 117.220102, lat: 31.834912 },
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      name: "百度地图",
      type: "baidu",
      layer: "vec",
      icon: "img/basemaps/baidumap.png",
      crs: "baidu", // 与地图级 crs 保持一致（历史写法，2D 下真正决定投影的是地图级 crs）
      show: true, // show:true 的项才是默认底图
      attribution: attributionHtml
    },
    {
      name: "百度卫星",
      type: "baidu",
      layer: "img",
      icon: "img/basemaps/baiduimage.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "电子大字体",
      type: "baidu",
      layer: "vec",
      bigfont: true, // bigfont:true 请求大字体瓦片（styles=ph）
      icon: "img/basemaps/baidumap.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "卫星大字体",
      type: "baidu",
      layer: "img",
      bigfont: true,
      icon: "img/basemaps/baiduimage.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "草绿地图",
      type: "baidu",
      layer: "custom", // layer:"custom" 时用 style 选配色方案（grassgreen/midnight/redalert…），由百度服务端渲染
      style: "grassgreen",
      icon: "img/basemaps/bd-c-grassgreen.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "深蓝地图",
      type: "baidu",
      layer: "custom",
      style: "midnight",
      icon: "img/basemaps/bd-c-midnight.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "浅蓝地图",
      type: "baidu",
      layer: "custom",
      style: "bluish",
      icon: "img/basemaps/bd-c-bluish.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "淡蓝地图",
      type: "baidu",
      layer: "custom",
      style: "light",
      icon: "img/basemaps/bd-c-light.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "黑色地图",
      type: "baidu",
      layer: "custom",
      style: "dark",
      icon: "img/basemaps/bd-c-dark.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "灰色地图",
      type: "baidu",
      layer: "custom",
      style: "grayscale",
      icon: "img/basemaps/bd-c-grayscale.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "红色地图",
      type: "baidu",
      layer: "custom",
      style: "redalert",
      icon: "img/basemaps/bd-c-redalert.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "粉红地图",
      type: "baidu",
      layer: "custom",
      style: "pink",
      icon: "img/basemaps/bd-c-pink.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "墨绿地图",
      type: "baidu",
      layer: "custom",
      style: "darkgreen",
      icon: "img/basemaps/bd-c-darkgreen.png",
      crs: "baidu",
      attribution: attributionHtml
    },

    {
      name: "简约地图",
      type: "baidu",
      layer: "custom",
      style: "hardedge",
      icon: "img/basemaps/bd-c-hardedge.png",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "谷歌地图",
      type: "baidu",
      layer: "custom",
      style: "googlelite",
      crs: "baidu",
      attribution: attributionHtml
    },
    {
      name: "离线百度瓦片",
      type: "tile",
      url: "http://data.mars2d.cn/tile/baiduVec/{z}/{x}/{y}.jpg",
      tms: true, // 百度切片 Y 轴是 TMS 方向（自下而上），自建/离线瓦片必须打开
      crs: "baidu",
      icon: "img/basemaps/bd-c-googlelite.png",
      attribution: attributionHtml
    }
  ],
  operationallayers: [
    { name: "实时路况", type: "baidu", layer: "time" } // layer:"time" 为百度实时路况，需联网
  ]
}

// ========== 2. 事件对象 ==========
// 事件对象，用于抛出事件给vue
export const eventTarget = new mars2d.BaseClass()

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addCreditDOM()

  addTestMarker()
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
// 设置WGS84坐标参照物(辨识是否纠偏)：百度坐标系下 WGS84 点会有数百米偏移，可据此判断底图是否做了纠偏
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
