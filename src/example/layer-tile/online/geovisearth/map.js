/**
 * 示例：星图地球
 * 演示：用 type:"tile" + 星图地球 online 瓦片服务（带 token、子域 {s}）加载影像与电子底图，并在状态栏展示版权信息
 * API：mars2d.layer.TileLayer、mapOptions.basemaps、map.controls
 * 要点：token 需到星图地球官网自行申请后替换（示例里是演示用 token）；url 中的 {s} 只支持 subdomains 里列出的 1/2/3 三个子域；影像由「底图 + 注记」两个 tile 图层组成一组
 */
import * as mars2d from "mars2d"
const L = mars2d.L

export let map // mars2d.Map二维地图对象

// 星图地球版权信息（含审图号）；2D 状态栏按底图的 options.attribution 取值展示（见文件末尾 addCreditDOM）
const creditHtml = `©2023 中科星图- <span>审图号：GS (2023) 1924号</span>
-  甲测资字11111577 - <a href="https://geovisearth.com/declaration#/user" target="_blank" trace="tos">服务条款</a> `

// 请自行申请token后替换，星图地球官方地址：https://datacloud.geovisearth.com/support/map/summary
const geovisearthToken = "18716afaf1db7ed415795d670a3c9eb4cec0fd8e046a946ffd65e6d8ccf9ad25"

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  maxZoom: 21,
  // center: { lng: 113.172226, lat: 36.329509 }, // 需要固定视角时放开
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      name: "星图影像",
      icon: "img/basemap/tdt_img.png",
      // type:"group" 把影像底图和影像注记两个图层合成一组，切换时同开同关
      type: "group",
      layers: [
        {
          name: "底图",
          type: "tile",
          // type:"tile" 直接给 XYZ 模板：{s} 由 subdomains 替换，token 拼在 query 上
          url: "https://tiles{s}.geovisearth.com/base/v1/img/{z}/{x}/{y}?token=" + geovisearthToken,
          subdomains: "123"
        },
        {
          name: "注记",
          type: "tile",
          url: "https://tiles{s}.geovisearth.com/base/v1/cia/{z}/{x}/{y}?token=" + geovisearthToken,
          subdomains: "123"
        }
      ],
      attribution: creditHtml // 2D 用 attribution（3D 的 credit 在 2D 不生效，状态栏读的是 attribution）
    },
    {
      name: "星图电子",
      icon: "img/basemap/tdt_vec.png",
      type: "tile",
      url: "https://tiles{s}.geovisearth.com/base/v1/vec/{z}/{x}/{y}?token=" + geovisearthToken,
      subdomains: "123",
      attribution: creditHtml,
      show: true // show:true 的项才是默认底图
    }
  ]
}

// ========== 2. 事件对象 ==========
export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到面板中

// ========== 3. 生命周期钩子 ==========
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  addCreditDOM()
  addTestMarker()

  // 通知面板：map.js 的 onMounted 已执行完（面板可用 eventTarget.on("mapLoaded") 订阅）
  eventTarget.fire("mapLoaded")
}

// ========== 4. 清理（与 onMounted 对称）==========
// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  // 先解绑底图切换监听，再移除插到状态栏的版权 DOM，最后断开 map 引用（重复调用也安全）
  if (map) {
    map.off("baselayerchange", attributionUpdateHandler)
  }
  removeCreditDOM()
  map = null
}

// ========== 5. 示例数据（坐标参照点）==========
// 设置WGS84坐标参照物(辨识是否纠偏)：国内加偏底图上 WGS84 点会有数百米偏移，可据此判断底图是否做了纠偏
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
