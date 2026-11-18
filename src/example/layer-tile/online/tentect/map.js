/**
 * 示例：腾讯
 * 演示：用 type:"tencent" 加载腾讯电子、卫星（底图 + 注记分组）、灰白、暗色底图，并在状态栏展示腾讯版权信息
 * API：mars2d.layer.TencentLayer、mapOptions.basemaps、map.controls
 * 要点：layer:"custom" 的 style 只有 3（灰白）、4（暗色）两种可选；腾讯瓦片 Y 轴为 TMS 方向、chinaCRS 为 GCJ02，均由 TencentLayer 内置，配置里不用重复写；版权栏由示例插入状态栏并在底图切换时手动同步
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 腾讯底图版权信息（含审图号），挂在每个底图的 attribution 上，切换底图时同步到状态栏
const attributionHtml = `©2024 Tencent - <span>审图号：GS(2023)1号</span>
- <a target="_blank" href="https://lbs.qq.com/terms.html">服务条款</a>`

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    { name: "电子地图", type: "tencent", layer: "vec", attribution: attributionHtml, show: true },
    {
      // type:"group" 只作为可切换的底图分组，实际由影像底图和影像注记两个图层组成
      type: "group",
      name: "卫星地图",
      layers: [
        { type: "tencent", layer: "img_d" },
        { type: "tencent", layer: "img_z" }
      ],
      attribution: attributionHtml
    },
    // layer:"custom" 时用 style 选择样式：3 为灰白地图、4 为暗色地图
    { name: "灰白地图", type: "tencent", layer: "custom", style: 3, attribution: attributionHtml },
    { name: "暗色地图", type: "tencent", layer: "custom", style: 4, attribution: attributionHtml }
  ]
}

// ========== 2. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addCreditDOM()
  addTestMarker()
}

// ========== 3. 清理（与 onMounted 对称）==========
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

// ========== 4. 示例数据（坐标参照点）==========
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

// ========== 5. 状态栏版权信息 ==========
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
