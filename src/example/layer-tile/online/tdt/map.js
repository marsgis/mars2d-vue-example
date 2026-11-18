/**
 * 示例：天地图
 * 演示：用 type:"tdt" 加载天地图电子、影像、地形三类底图（每类由底图 + 注记两个图层组成分组），并在状态栏展示天地图版权信息
 * API：mars2d.layer.TdtLayer、mapOptions.basemaps、map.controls
 * 要点：天地图 token 用 mars2d.Token.tiandituArr 轮换，正式项目请换成自己申请的 token；地形瓦片最高只到 14 级，示例给 ter_d 配了 errorTileUrl 兜底；版权栏由示例插入状态栏并在底图切换时手动同步
 */
import * as mars2d from "mars2d"
const L = mars2d.L

let map // mars2d.Map二维地图对象

// 天地图版权信息（含审图号），挂在每个底图分组的 attribution 上，切换底图时同步到状态栏
const attributionHtml = `©2024 自然资源部 - <span>审图号：GS(2024)0568号</span>
 - 甲测资字1100471 - <a href="https://www.tianditu.gov.cn/about/contact.html?type=2" target="_blank" trace="tos">服务条款</a> `

// ========== 1. 地图参数（合并/覆盖 config.json）==========
// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  maxZoom: 21, // 天地图瓦片最高 18 级，19 级起由客户端放大显示（TdtLayer 内置 maxNativeZoom:18）
  control: {
    layers: { position: "topright" }
  },
  basemaps: [
    {
      // type:"group" 把天地图底图和注记两个图层合成一组，切换时同开同关
      type: "group",
      name: "天地图电子",
      layers: [
        { type: "tdt", layer: "vec_d", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "vec_z", key: mars2d.Token.tiandituArr }
      ],
      show: true, // show:true 的组才是默认底图
      attribution: attributionHtml
    },
    {
      type: "group",
      name: "天地图影像",
      layers: [
        { type: "tdt", layer: "img_d", key: mars2d.Token.tiandituArr },
        { type: "tdt", layer: "img_z", key: mars2d.Token.tiandituArr }
      ],
      attribution: attributionHtml
    },
    {
      type: "group",
      name: "天地图地形",
      layers: [
        // 地形瓦片最高只到 14 级，超出层级会请求失败，用 errorTileUrl 兜底显示占位图
        { type: "tdt", layer: "ter_d", key: mars2d.Token.tiandituArr, errorTileUrl: "img/tile/errortile.png" },
        { type: "tdt", layer: "ter_z", key: mars2d.Token.tiandituArr }
      ],
      attribution: attributionHtml
    }
  ]
}

// ========== 2. 事件对象 ==========
export const eventTarget = new mars2d.BaseClass()

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
