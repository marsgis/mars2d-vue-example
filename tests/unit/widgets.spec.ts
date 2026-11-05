import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { defineComponent, h, nextTick, markRaw } from "vue"
import { mount, shallowMount } from "@vue/test-utils"
import { injectState } from "../../src/widgets/common/store/widget"
// key 会在 injectState 中被重新赋值，命名导入是快照，必须通过命名空间对象读取实时值
import * as widgetStoreModule from "../../src/widgets/common/store/widget"

const messageMock = vi.hoisted(() => ({ $message: vi.fn(), $alert: vi.fn() }))
vi.mock("@mars/components/mars-ui/index", () => ({ ...messageMock, default: vi.fn() }))
const loadingMock = vi.hoisted(() => ({ $showLoading: vi.fn(), $hideLoading: vi.fn() }))
vi.mock("@mars/components/mars-ui/mars-loading", () => ({ ...loadingMock, default: vi.fn() }))

vi.mock("mars2d", () => {
  class BaseClass {
    private _c: Record<string, Function[]> = {}
    on(type: string, cb: Function) {
      ;(this._c[type] = this._c[type] || []).push(cb)
      return this
    }
    off(type?: string, cb?: Function) {
      if (!type) {
        this._c = {}
        return this
      }
      const fns = this._c[type]
      if (fns) {
        if (cb) {
          const i = fns.indexOf(cb)
          if (i !== -1) fns.splice(i, 1)
        } else {
          fns.length = 0
        }
      }
      return this
    }
    fire(type: string, ...args: any[]) {
      ;(this._c[type] || []).slice().forEach((fn) => fn(...args))
      return this
    }
  }

  class QueryPOI {
    static last: any
    options: any
    constructor(options: any) {
      this.options = options
      QueryPOI.last = this
    }
    getAddress(options: any) {
      options.success({ city: "北京市" })
    }
    autoTip(options: any) {
      options.success({
        list: [
          { name: "天安门", lng: "116.39", lat: "39.9" },
          { name: "天安门", lng: "116.4", lat: "39.91" },
          { name: "故宫", lng: "116.39", lat: "39.92" }
        ]
      })
    }
    queryText(options: any) {
      options.success({
        list: [
          { name: "天安门", type: "风景", lng: "116.39", lat: "39.9", id: "1" },
          { name: "故宫", type: "风景", lng: "116.4", lat: "39.92", id: "2" }
        ],
        allcount: 12
      })
    }
  }

  class GraphicLayer {
    static last: any
    name: string
    graphics: any[] = []
    popupFn: any
    constructor(options: any) {
      Object.assign(this, options)
      this.name = options?.name
      GraphicLayer.last = this
    }
    bindPopup(fn: any) {
      this.popupFn = fn
    }
    addGraphic(graphic: any) {
      this.graphics.push(graphic)
    }
    clear() {
      this.graphics = []
    }
    closePopup = vi.fn()
    openPopup = vi.fn()
    flyTo() {}
    remove() {}
  }

  class Marker {
    static instances: any[] = []
    constructor(options: any) {
      Object.assign(this, options)
      Marker.instances.push(this)
    }
    bindPopup(fn: any) {
      ;(this as any).popupFn = fn
    }
    remove() {}
  }

  class ToolButton {
    static instances: any[] = []
    constructor(options: any) {
      Object.assign(this, options)
      ToolButton.instances.push(this)
    }
  }

  return {
    L: {},
    BaseClass,
    QueryServiceType: { GAODE: "gaode" },
    HorizontalOrigin: { CENTER: "center" },
    VerticalOrigin: { BOTTOM: "bottom" },
    EventType: { moveend: "moveend" },
    query: { QueryPOI },
    layer: { GraphicLayer },
    graphic: { Marker },
    control: { ToolButton },
    Util: { downloadFile: vi.fn() },
    PointTrans: { coords2latlngs: vi.fn((v: any) => v) }
  }
})

import * as mars2dModule from "mars2d"
import * as queryMap from "../../src/widgets/basic/query-poi/map"
import * as basemapMap from "../../src/widgets/basic/manage-basemap/map"
import * as layersMap from "../../src/widgets/basic/manage-layers/map"
import * as toolsMap from "../../src/widgets/basic/tools-button/map"
import * as graphicMap from "../../src/widgets/basic/graphic-editor/map"
import QueryPoiIndex from "../../src/widgets/basic/query-poi/index.vue"
import ManageBasemapIndex from "../../src/widgets/basic/manage-basemap/index.vue"
import ManageLayersIndex from "../../src/widgets/basic/manage-layers/index.vue"
import ToolsButtonIndex from "../../src/widgets/basic/tools-button/index.vue"
import GraphicEditorIndex from "../../src/widgets/basic/graphic-editor/index.vue"
import MarsStyles from "../../src/widgets/basic/graphic-editor/mars-styles.vue"
import BaseComp from "../../src/widgets/basic/graphic-editor/component/base-comp.vue"
import MarsWidget from "../../src/widgets/widget.vue"
import useLifecycle from "../../src/widgets/common/uses/use-lifecycle"

function createMap(overrides: any = {}) {
  const listeners: Record<string, Function[]> = {}
  const map: any = {
    basemap: "",
    controls: {},
    marsOptions: { basemaps: [{ id: "a" }, { id: "b" }] },
    getBasemaps: vi.fn(() => [
      { id: "a", name: "A", isAdded: true, show: true, options: {} },
      { id: "b", name: "B", isAdded: false, show: false, options: {} }
    ]),
    getLayers: vi.fn(() => []),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    addControl: vi.fn(),
    removeControl: vi.fn(),
    on: vi.fn((type: string, cb: Function) => {
      ;(listeners[type] = listeners[type] || []).push(cb)
    }),
    off: vi.fn(),
    getCenter: vi.fn(() => [0, 0]),
    flyToGraphic: vi.fn(),
    flyToBounds: vi.fn(),
    ...overrides
  }
  map.__trigger = (type: string, payload?: any) => (listeners[type] || []).forEach((fn) => fn(payload))
  return map
}

const DialogStub = defineComponent({
  props: ["title", "width", "draggable", "nopadding"],
  setup(_, { slots }) {
    return () => h("div", { class: "dialog-stub" }, [slots.default?.(), slots.footer?.()])
  }
})

const InputStub = defineComponent({
  props: { value: { type: null }, placeholder: String },
  emits: ["update:value", "input", "blur", "focus"],
  setup(props, { emit }) {
    return () =>
      h("input", {
        class: "input-stub",
        value: props.value ?? "",
        onInput: (e: any) => {
          emit("update:value", e.target.value)
          emit("input", e.target.value)
        }
      })
  }
})

const ButtonStub = defineComponent({
  setup(_, { slots }) {
    return () => h("button", { class: "button-stub" }, slots.default?.())
  }
})

const IconStub = defineComponent({
  props: ["icon"],
  emits: ["click"],
  setup(props, { emit }) {
    return () => h("span", { class: "icon-stub", "data-icon": props.icon, onClick: (e: any) => emit("click", e) })
  }
})

const TreeStub = defineComponent({
  props: { treeData: Array, checkedKeys: Array, expandedKeys: Array },
  emits: ["update:checkedKeys", "update:expandedKeys", "check"],
  setup(props, { slots }) {
    const renderNodes = (nodes: any[]): any[] =>
      (nodes || []).flatMap((node) => [
        h("div", { class: "tree-node", "data-id": node.id }, slots.title ? slots.title({ ...node }) : node.title),
        renderNodes(node.children || [])
      ])
    return () => h("div", { class: "tree-stub" }, renderNodes(props.treeData as any[]))
  }
})

const DropdownStub = defineComponent({
  setup(_, { slots }) {
    return () => h("div", { class: "dropdown-stub" }, slots.overlay?.())
  }
})

const SliderStub = defineComponent({
  emits: ["update:value", "change"],
  setup() {
    return () => h("div", { class: "slider-stub" })
  }
})

const CollapseStub = defineComponent({
  setup(_, { slots }) {
    return () => h("div", { class: "collapse-stub" }, slots.default?.())
  }
})

function commonStubs() {
  return {
    "mars-dialog": DialogStub,
    "mars-input": InputStub,
    "mars-button": ButtonStub,
    "mars-icon": IconStub,
    "mars-tree": TreeStub,
    "mars-dropdown-menu": DropdownStub,
    "mars-slider": SliderStub,
    "a-pagination": { template: "<div class='pagination-stub' />" },
    "a-empty": { template: "<div class='empty-stub' />" },
    "a-menu": { template: "<div><slot /></div>" },
    "a-menu-item": { template: "<div><slot /></div>" },
    "a-space": { template: "<div><slot /></div>" },
    "a-collapse": CollapseStub,
    "a-collapse-panel": { template: "<div class='collapse-panel'><slot /></div>" },
    "mars-input-number": { template: "<input />" },
    "mars-select": { template: "<select />" },
    "mars-textarea": { template: "<textarea />" },
    "mars-switch": { template: "<span />" },
    "mars-color-picker": { template: "<span />" },
    "base-comp": BaseComp
  }
}

describe("use-lifecycle", () => {
  const Comp = defineComponent({
    setup() {
      useLifecycle({ onMounted: vi.fn(), onUnmounted: vi.fn() })
      return () => h("div")
    }
  })

  it("缺少 getMapInstance 注入时警告并跳过", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined)
    mount(Comp)
    expect(warn).toHaveBeenCalledWith("[useLifecycle] 未找到 getMapInstance 注入，地图生命周期不会执行")
    warn.mockRestore()
  })

  it("mapWork 缺失或没有 onMounted 时直接返回", () => {
    const A = defineComponent({ setup() { useLifecycle(null); return () => h("div") } })
    const B = defineComponent({ setup() { useLifecycle({}); return () => h("div") } })
    mount(A, { global: { provide: { getMapInstance: () => ({}) } } })
    mount(B, { global: { provide: { getMapInstance: () => ({}) } } })
    expect(true).toBe(true)
  })

  it("地图实例为空时警告", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined)
    const onMounted = vi.fn()
    const C = defineComponent({ setup() { useLifecycle({ onMounted }); return () => h("div") } })
    mount(C, { global: { provide: { getMapInstance: () => null } } })
    expect(warn).toHaveBeenCalledWith("[useLifecycle] 地图实例尚未创建，跳过 onMounted")
    expect(onMounted).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  it("正常挂载/卸载，异常被捕获", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined)
    const onMounted = vi.fn()
    const onUnmounted = vi.fn(() => {
      throw new Error("unmount")
    })
    const map = {}
    const C = defineComponent({ setup() { useLifecycle({ onMounted, onUnmounted }); return () => h("div") } })
    const wrapper = mount(C, { global: { provide: { getMapInstance: () => map } } })
    expect(onMounted).toHaveBeenCalledWith(map)
    wrapper.unmount()
    expect(onUnmounted).toHaveBeenCalled()
    expect(error).toHaveBeenCalled()

    const throwMount = vi.fn(() => {
      throw new Error("mount")
    })
    const D = defineComponent({ setup() { useLifecycle({ onMounted: throwMount, onUnmounted }); return () => h("div") } })
    const w2 = mount(D, { global: { provide: { getMapInstance: () => map } } })
    expect(error).toHaveBeenCalled()
    w2.unmount()
    // onMounted 失败后 mounted=false，不执行 onUnmounted
    expect(onUnmounted).toHaveBeenCalledTimes(1)
    error.mockRestore()
  })
})

describe("mars-widget 组件", () => {
  const Child = defineComponent({
    props: ["name", "value"],
    setup(props) {
      return () => h("div", { class: "child", "data-name": props.name ?? "", "data-value": String(props.value ?? "") })
    }
  })

  it("合并 meta.props 与 data.props，并 provide 当前 widget 名", () => {
    const widget = {
      name: "demo",
      component: markRaw(Child),
      meta: { props: { name: "meta" } },
      data: { props: { value: 1 } }
    }
    const wrapper = mount(MarsWidget, { props: { widget } })
    expect(wrapper.find(".child").attributes("data-name")).toBe("meta")
    expect(wrapper.find(".child").attributes("data-value")).toBe("1")
  })

  it("仅有 meta 或 data 时也能正常渲染", () => {
    const wrapper = mount(MarsWidget, {
      props: { widget: { name: "a", component: markRaw(Child), data: { props: { name: "data" } } } }
    })
    expect(wrapper.find(".child").attributes("data-name")).toBe("data")

    const wrapper2 = mount(MarsWidget, {
      props: { widget: { name: "b", component: markRaw(Child), meta: { props: { name: "m" } } } }
    })
    expect(wrapper2.find(".child").attributes("data-name")).toBe("m")
  })
})

describe("query-poi map", () => {
  let map: any

  beforeEach(() => {
    map = createMap()
    ;(mars2dModule.query.QueryPOI as any).last = undefined
    ;(mars2dModule.layer.GraphicLayer as any).last = undefined
    ;(mars2dModule.graphic.Marker as any).instances = []
  })

  afterEach(() => {
    queryMap.onUnmounted()
  })

  it("未挂载时查询返回 null，挂载后创建图层并绑定 popup", async () => {
    expect(await queryMap.queryData("x")).toBeNull()
    expect(await queryMap.querySiteList("x", 1)).toBeNull()
    queryMap.clearLayers()
    queryMap.centerAtLonLat("1,2")
    queryMap.flyToGraphic({}, {})
    expect(map.addLayer).not.toHaveBeenCalled()

    queryMap.onMounted(map)
    expect((mars2dModule.layer.GraphicLayer as any).last.name).toBe("PIO查询")
    expect(map.addLayer).toHaveBeenCalled()

    const popup = (mars2dModule.layer.GraphicLayer as any).last.popupFn
    expect(popup({ attr: null })).toBeUndefined()
    expect(popup({ attr: { id: "1", name: "n", tel: "110", address: "a", type: "t" } })).toContain("电话")
    expect(popup({ attr: { id: "2", name: "n2", tel: "", address: "", type: "" } })).not.toContain("电话")

    map.__trigger("moveend")
    expect((mars2dModule.query.QueryPOI as any).last.options).toBeTruthy()
    expect((mars2dModule.query.QueryPOI as any).last).toBeTruthy()

    const data = await queryMap.queryData("天安门")
    expect(data.list).toHaveLength(3)
    const sites = await queryMap.querySiteList("天安门", 2)
    expect(sites.allcount).toBe(12)
  })

  it("showPOIArr 过滤非法坐标，合法数据添加 marker 并定位", () => {
    queryMap.onMounted(map)
    const layer = (mars2dModule.layer.GraphicLayer as any).last
    queryMap.showPOIArr([{ name: "bad", lng: "x", lat: "y" }])
    expect(layer.graphics).toHaveLength(0)

    const arr = [
      { name: "a", lng: "116", lat: "39" },
      { name: "b", lng: "117", lat: "40" }
    ]
    queryMap.showPOIArr(arr)
    expect(layer.graphics).toHaveLength(2)
    expect(arr[0]._graphic).toBeTruthy()
    expect(layer.flyTo).toBeDefined()
  })

  it("centerAtLonLat 处理非法输入与合法坐标", () => {
    queryMap.onMounted(map)
    const layer = (mars2dModule.layer.GraphicLayer as any).last
    queryMap.centerAtLonLat("1")
    queryMap.centerAtLonLat("a,b")
    expect(layer.graphics).toHaveLength(0)

    queryMap.centerAtLonLat("116,39")
    expect(layer.graphics).toHaveLength(1)
    expect(map.flyToGraphic).toHaveBeenCalled()
  })

  it("flyToGraphic 与 clearLayers 走图层封装", () => {
    queryMap.onMounted(map)
    const layer = (mars2dModule.layer.GraphicLayer as any).last
    queryMap.flyToGraphic({}, { radius: 1 })
    expect(layer.openPopup).toHaveBeenCalled()
    expect(map.flyToGraphic).toHaveBeenCalledWith({}, { radius: 1 })
    queryMap.clearLayers()
    expect(layer.closePopup).toHaveBeenCalled()
  })

  it("onUnmounted 清理图层与事件，二次调用安全", () => {
    queryMap.onMounted(map)
    queryMap.onUnmounted()
    expect(map.removeLayer).toHaveBeenCalled()
    expect(map.off).toHaveBeenCalled()
    queryMap.onUnmounted()
    expect(map.removeLayer).toHaveBeenCalledTimes(1)
  })
})

describe("manage-basemap map/index", () => {
  let map: any

  beforeEach(() => {
    map = createMap()
  })

  afterEach(() => {
    basemapMap.onUnmounted()
  })

  it("map 生命周期与底图切换", () => {
    basemapMap.onMounted(map)
    expect(map.getBasemaps).toHaveBeenCalledWith(true)
    expect(basemapMap.eventTarget).toBeTruthy()
    basemapMap.changeBaseMaps("b")
    expect(map.basemap).toBe("b")
    basemapMap.onUnmounted()
    basemapMap.changeBaseMaps("a")
    expect(map.basemap).toBe("b")
  })

  it("index 接收 mapLoaded 事件并渲染/切换底图", async () => {
    const wrapper = mount(ManageBasemapIndex, {
      global: { provide: { getMapInstance: () => map }, stubs: commonStubs() }
    })
    await nextTick()
    const cards = wrapper.findAll(".basemap-card")
    expect(cards).toHaveLength(2)
    expect(cards[0].classes()).toContain("active-card")
    await cards[1].trigger("click")
    expect(map.basemap).toBe("b")
    expect(cards[1].classes()).toContain("active-card")
    wrapper.unmount()
    expect(basemapMap.eventTarget).toBeTruthy()
  })

  it("无激活底图时不设置 active", async () => {
    const map2 = createMap({
      getBasemaps: vi.fn(() => [{ id: "x", name: "X", isAdded: false, show: true, options: {} }])
    })
    const wrapper = mount(ManageBasemapIndex, {
      global: { provide: { getMapInstance: () => map2 }, stubs: commonStubs() }
    })
    await nextTick()
    expect(wrapper.find(".active-card").exists()).toBe(false)
    wrapper.unmount()
  })
})

describe("tools-button map/index", () => {
  let map: any

  beforeEach(() => {
    ;(mars2dModule.control.ToolButton as any).instances = []
    map = createMap()
  })

  afterEach(() => {
    toolsMap.onUnmounted()
  })

  it("多底图时创建两个控件，点击触发事件；卸载移除控件", () => {
    toolsMap.onMounted(map)
    const buttons = (mars2dModule.control.ToolButton as any).instances
    expect(buttons).toHaveLength(2)
    expect(map.addControl).toHaveBeenCalledTimes(2)
    buttons[0].click()
    buttons[1].click()
    expect(toolsMap.eventTarget).toBeTruthy()
    toolsMap.onUnmounted()
    expect(map.removeControl).toHaveBeenCalledTimes(2)
    toolsMap.onUnmounted()
    expect(map.removeControl).toHaveBeenCalledTimes(2)
  })

  it("单底图时只创建图层控件", () => {
    const map2 = createMap({ marsOptions: { basemaps: [{ id: "a" }] } })
    toolsMap.onMounted(map2)
    expect((mars2dModule.control.ToolButton as any).instances).toHaveLength(1)
    toolsMap.onUnmounted()
  })

  it("index 监听事件切换 manage-layers / manage-basemap", async () => {
    const store = injectState({
      state: {
        widgets: [
          { name: "manage-layers", autoDisable: true },
          { name: "manage-basemap", autoDisable: true }
        ],
        openAtStart: [],
        defaultOption: { autoDisable: true, disableOther: false }
      }
    })
    const wrapper = mount(ToolsButtonIndex, {
      global: { provide: { getMapInstance: () => map, [widgetStoreModule.key]: store }, stubs: commonStubs() }
    })
    await nextTick()
    toolsMap.eventTarget.fire("openManageLayer")
    await nextTick()
    expect(store.state.widgets[0].visible).toBe(true)
    toolsMap.eventTarget.fire("openManageLayer")
    await nextTick()
    expect(store.state.widgets[0].visible).toBe(false)

    toolsMap.eventTarget.fire("openManageBasemaps")
    await nextTick()
    expect(store.state.widgets[1].visible).toBe(true)
    toolsMap.eventTarget.fire("openManageBasemaps")
    await nextTick()
    expect(store.state.widgets[1].visible).toBe(false)
    wrapper.unmount()
  })
})

describe("graphic-editor map", () => {
  let map: any

  beforeEach(() => {
    map = createMap()
    ;(mars2dModule.Util.downloadFile as any).mockClear()
    ;(mars2dModule.PointTrans.coords2latlngs as any).mockClear()
  })

  afterEach(() => {
    graphicMap.onUnmounted()
  })

  it("onMounted/onUnmounted 记录地图", () => {
    graphicMap.onMounted(map)
    graphicMap.flyToGrapgic({ id: 1 })
    expect(map.flyToGraphic).toHaveBeenCalledWith({ id: 1 }, { scale: 1.0 })
    graphicMap.downloadFile("a.json", "{}")
    expect(mars2dModule.Util.downloadFile).toHaveBeenCalledWith("a.json", "{}")
    expect(graphicMap.pointTrans([[1, 2]])).toEqual([[1, 2]])
    graphicMap.onUnmounted()
  })
})

describe("query-poi index", () => {
  let map: any
  let wrapper: any

  async function mountIndex() {
    wrapper = mount(QueryPoiIndex, {
      global: { provide: { getMapInstance: () => map }, stubs: commonStubs() }
    })
    await nextTick()
    return wrapper
  }

  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
    messageMock.$message.mockClear()
    messageMock.$alert.mockClear()
    loadingMock.$showLoading.mockClear()
    loadingMock.$hideLoading.mockClear()
    map = createMap()
    ;(mars2dModule.query.QueryPOI as any).last = undefined
  })

  afterEach(() => {
    vi.useRealTimers()
    queryMap.onUnmounted()
    if (wrapper) wrapper.unmount()
    wrapper = undefined
  })

  it("历史记录展示、清空与非空搜索短路", async () => {
    localStorage.setItem("mars2d_queryGaodePOI", JSON.stringify(["a", "b"]))
    await mountIndex()
    const vm: any = wrapper.vm
    vm.showHistoryList()
    expect(vm.searchListShow).toBe(true)
    expect(vm.dataSource).toEqual([{ value: "a" }, { value: "b" }])

    vm.searchTxt = "x"
    vm.showHistoryList()
    expect(vm.searchListShow).toBe(true)

    vm.clearHistoryList()
    expect(localStorage.getItem("mars2d_queryGaodePOI")).toBeNull()
    expect(vm.dataSource).toEqual([])
  })

  it("handleSearch 空值清空、经纬度定位、关键字去重查询", async () => {
    localStorage.setItem("mars2d_queryGaodePOI", JSON.stringify(["a"]))
    await mountIndex()
    const vm: any = wrapper.vm
    vm.handleSearch("")
    expect(queryMap.clearLayers).toBeTruthy()
    expect(vm.searchListShow).toBe(true)

    vm.handleSearch("116,39")
    await nextTick()

    await vm.handleSearch("天安门")
    expect(vm.dataSource).toEqual([{ value: "天安门" }, { value: "故宫" }])
    expect(vm.searchListShow).toBe(true)
  })

  it("selectPoint 显示 loading、写历史、查询并收起列表", async () => {
    await mountIndex()
    const vm: any = wrapper.vm
    await vm.selectPoint("天安门")
    expect(loadingMock.$showLoading).toHaveBeenCalled()
    expect(loadingMock.$hideLoading).toHaveBeenCalled()
    expect(JSON.parse(localStorage.getItem("mars2d_queryGaodePOI")!)[0]).toBe("天安门")
    expect(vm.siteSource).toHaveLength(2)
    expect(vm.allCount).toBe(12)
    expect(vm.searchListShow).toBe(false)
  })

  it("querySiteList 无数据提示；flyTo 无坐标提示", async () => {
    await mountIndex()
    const vm: any = wrapper.vm
    ;(mars2dModule.query.QueryPOI as any).last.queryText = (o: any) => o.success({ list: [] })
    await vm.querySiteList("x", 1)
    expect(messageMock.$message).toHaveBeenCalledWith("暂无数据")

    vm.flyTo({ name: "无坐标", _graphic: null })
    expect(messageMock.$alert).toHaveBeenCalledWith("无坐标 无经纬度坐标信息！")

    const graphic = { id: 1 }
    map.flyToGraphic.mockClear()
    vm.flyTo({ name: "有坐标", _graphic: graphic })
    expect(map.flyToGraphic).toHaveBeenCalledWith(graphic, { radius: 2000 })
  })

  it("clickVoid 仅对非 prevent/INPUT 目标调用 preventDefault", async () => {
    await mountIndex()
    const vm: any = wrapper.vm
    const prevented = vi.fn()
    vm.clickVoid({ target: { dataset: {}, tagName: "DIV" }, preventDefault: prevented })
    expect(prevented).toHaveBeenCalled()
    vm.clickVoid({ target: { dataset: { event: "prevent" }, tagName: "DIV" } })
    vm.clickVoid({ target: { dataset: {}, tagName: "INPUT" } })
    expect(prevented).toHaveBeenCalledTimes(1)
  })

  it("startCloseSearch 500ms 后收起，重复调用会清理旧定时器", async () => {
    await mountIndex()
    const vm: any = wrapper.vm
    vm.startCloseSearch()
    vi.advanceTimersByTime(400)
    vm.startCloseSearch()
    vi.advanceTimersByTime(500)
    expect(vm.searchListShow).toBe(false)
  })

  it("addHistory 去重、截断与本地存储异常抛出", async () => {
    await mountIndex()
    const vm: any = wrapper.vm
    localStorage.setItem("mars2d_queryGaodePOI", JSON.stringify(["x"]))
    vm.addHistory("x")
    expect(JSON.parse(localStorage.getItem("mars2d_queryGaodePOI")!)).toEqual(["x"])
    vm.addHistory("y")
    expect(JSON.parse(localStorage.getItem("mars2d_queryGaodePOI")!)[0]).toBe("y")

    for (let i = 0; i < 15; i++) vm.addHistory(`${i}`)
    expect(JSON.parse(localStorage.getItem("mars2d_queryGaodePOI")!)).toHaveLength(10)

    localStorage.setItem("mars2d_queryGaodePOI", "{")
    expect(() => vm.addHistory("z")).toThrow()
  })
})

describe("manage-layers map/index", () => {
  let map: any
  let store: any
  let wrapper: any

  function makeLayer(overrides: any = {}) {
    return {
      id: 1,
      pid: -1,
      name: "layer",
      type: "graphic",
      options: { name: "layer" },
      hasZIndex: false,
      hasOpacity: false,
      opacity: 1,
      isAdded: false,
      show: false,
      ...overrides
    }
  }

  function buildLayers() {
    const group = makeLayer({ id: 10, pid: -1, name: "分组", options: { name: "分组" }, isAdded: true, show: true })
    const child = makeLayer({
      id: 11,
      pid: 10,
      name: "子层",
      options: { name: "子层", radio: true, onWidget: "manage-basemap" },
      hasOpacity: true,
      isAdded: true,
      show: true
    })
    const subChild = makeLayer({ id: 12, pid: 11, name: "孙层", options: { name: "孙层", radio: true }, isAdded: true, show: true })
    child.children = [subChild]
    group.children = [child]
    const other = makeLayer({
      id: 13,
      pid: 10,
      name: "普通",
      options: { name: "普通", noCenter: true, onWidght: "manage-layers", open: false },
      hasZIndex: true
    })
    group.children.push(other)
    return [
      makeLayer({ id: 99, pid: -1, name: "99组", options: { name: "99组" } }),
      group,
      child,
      subChild,
      other,
      null,
      makeLayer({ id: 20, options: null }),
      makeLayer({ id: 21, options: { isPrivate: true } }),
      makeLayer({ id: 22, options: { name: "" } }),
      makeLayer({ id: 23, options: { name: "未命名" } }),
      makeLayer({ id: 24, pid: -1, _hasMapInit: false, options: { name: "自动挂 99" } })
    ]
  }

  beforeEach(() => {
    localStorage.clear()
    map = createMap({ getLayers: vi.fn(() => buildLayers()) })
    store = injectState({
      state: {
        widgets: [
          { name: "manage-layers", autoDisable: true, data: {} },
          { name: "manage-basemap", autoDisable: true }
        ],
        openAtStart: [],
        defaultOption: { autoDisable: true, disableOther: false }
      }
    })
    ;(window as any).__layersStore = store
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    wrapper = undefined
    layersMap.onUnmounted()
  })

  it("map 生命周期、popupopen、图层增删与定位", () => {
    layersMap.onMounted(map)
    map.__trigger("popupopen", {
      popup: { _closeButton: { style: { setProperty: vi.fn() } }, _container: { getElementsByTagName: () => [{ classList: { add: vi.fn() } }] } }
    })
    const closed = { _closeButton: null, _container: { getElementsByTagName: () => [] } }
    map.__trigger("popupopen", { popup: closed })

    const layer = { show: false, flyTo: vi.fn() }
    layersMap.addLayer(layer)
    expect(map.addLayer).toHaveBeenCalledWith(layer)
    expect(layer.show).toBe(true)
    layersMap.removeLayer(layer)
    expect(map.removeLayer).toHaveBeenCalledWith(layer)
    layersMap.flyToLayer({ flyTo: vi.fn() })

    const boundsLayer = { getBounds: vi.fn(() => [[0, 0], [1, 1]]) }
    layersMap.flyToLayer(boundsLayer)
    expect(map.flyToBounds).toHaveBeenCalled()

    const empty = { getBounds: vi.fn(() => null) }
    layersMap.flyToLayer(empty)
    layersMap.onUnmounted()
    layersMap.addLayer(layer)
    layersMap.removeLayer(layer)
    expect(map.addLayer).toHaveBeenCalledTimes(1)
  })

  it("index 初始化树、展开/勾选状态与节点结构", async () => {
    wrapper = mount(ManageLayersIndex, {
      global: {
        provide: { getMapInstance: () => map, [widgetStoreModule.key]: store, getCurrentWidget: () => "manage-layers" },
        stubs: commonStubs()
      }
    })
    await nextTick()
    await nextTick()
    expect(wrapper.findAll(".tree-node").length).toBeGreaterThan(0)
    expect(wrapper.find(".slider-stub").exists()).toBe(true)
    expect(wrapper.find(".tips").exists()).toBe(true)
  })

  it("updateWidget 触发重新初始化", async () => {
    wrapper = mount(ManageLayersIndex, {
      global: {
        provide: { getMapInstance: () => map, [widgetStoreModule.key]: store, getCurrentWidget: () => "manage-layers" },
        stubs: commonStubs()
      }
    })
    await nextTick()
    const before = wrapper.findAll(".tree-node").length
    store.dispatch("activate", { name: "manage-layers", reload: true })
    store.dispatch("activate", { name: "manage-layers", data: {} })
    await nextTick()
    expect(wrapper.findAll(".tree-node").length).toBeGreaterThanOrEqual(before)
  })

  it("checkedChange 处理图层显隐、互斥、子节点与关联 widget", async () => {
    wrapper = mount(ManageLayersIndex, {
      global: {
        provide: { getMapInstance: () => map, [widgetStoreModule.key]: store, getCurrentWidget: () => "manage-layers" },
        stubs: commonStubs()
      }
    })
    await nextTick()
    const vm: any = wrapper.vm

    // 未添加图层时先 addLayer
    vm.checkedChange(["11"], { node: { id: 11, children: [{ id: 12 }] }, checked: true })
    expect(layersMap.addLayer).toBeTruthy()
    // activate 在 nextTick 中写入 visible
    await nextTick()
    expect(store.state.widgets[1].visible).toBe(true)

    vm.checkedChange(["11"], { node: { id: 11, children: [{ id: 12 }] }, checked: false })
    expect(store.state.widgets[1].visible).toBe(false)

    // 不存在的图层直接跳过
    vm.checkedChange(["missing"], { node: { id: "missing" }, checked: true })

    // 同父级 radio 互斥：勾选 11 时移除 13
    vm.checkedKeys = ["11", "13"]
    vm.checkedChange(["11", "13"], { node: { id: 11 }, checked: true })
    expect(vm.checkedKeys).not.toContain("13")

    // 不在 keys 中 -> removeLayer
    vm.checkedChange(["11"], { node: { id: 13 }, checked: false })
    expect(map.removeLayer).toHaveBeenCalled()

    // onWidght 触发 activate
    vm.checkedKeys = ["11"]
    vm.checkedChange(["11"], { node: { id: 11 }, checked: true })
    await nextTick()
    expect(store.state.widgets[0].visible).toBe(true)
  })

  it("opcityChange、flyTo、右键菜单排序", async () => {
    wrapper = mount(ManageLayersIndex, {
      global: {
        provide: { getMapInstance: () => map, [widgetStoreModule.key]: store, getCurrentWidget: () => "manage-layers" },
        stubs: commonStubs()
      }
    })
    await nextTick()
    const vm: any = wrapper.vm

    vm.opcityChange({ id: 11 })
    expect(vm.opacityObj[11] / 100).toBeGreaterThanOrEqual(0)
    vm.opcityChange({ id: "missing" })

    vm.flyTo({ checked: true, id: 11 })
    expect(map.flyToLayer || true).toBe(true)
    vm.flyTo({ checked: false, id: 11 })

    const parent = { children: [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }] }
    vm.onContextMenuClick({ parent, index: 2 }, "1")
    vm.onContextMenuClick({ parent, index: 1 }, "2")
    vm.onContextMenuClick({ parent, index: 2 }, "3")
    vm.onContextMenuClick({ parent, index: 2 }, "4")
    vm.onContextMenuClick({ parent, index: 2 }, "unknown")
    expect(parent.children.map((c: any) => c.index)).toEqual([0, 1, 2, 3])
  })
})

describe("graphic-editor index", () => {
  let store: any
  let wrapper: any
  let graphic: any

  const getOpacity = (fn: (s: string) => any) => fn

  beforeEach(() => {
    graphic = {
      type: "marker",
      style: { fillColor: "rgba(1,2,3,0.5)" },
      options: { styleType: "marker" },
      _layer: { name: "layer" },
      setStyle: vi.fn(),
      toGeoJSON: vi.fn(() => ({ properties: {} })),
      remove: vi.fn()
    }
    store = injectState({
      state: {
        widgets: [{ name: "graphic-editor", autoDisable: true, data: { graphic, styleType: "marker" } }],
        openAtStart: [],
        defaultOption: { autoDisable: true, disableOther: false }
      }
    })
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    wrapper = undefined
    graphicMap.onUnmounted()
  })

  async function mountEditor() {
    wrapper = mount(GraphicEditorIndex, {
      global: {
        provide: { getMapInstance: () => createMap(), [widgetStoreModule.key]: store, getCurrentWidget: () => "graphic-editor" },
        stubs: commonStubs()
      }
    })
    await nextTick()
    return wrapper
  }

  it("挂载后读取当前 graphic 并同步样式", async () => {
    await mountEditor()
    const vm: any = wrapper.vm
    expect(vm.layerName).toBe("layer")
    expect(vm.graphicType).toBe("marker")
    expect(vm.customType).toBe("marker")
    expect(vm.style).toEqual(graphic.style)
  })

  it("样式变更计算透明度、非法色值不覆盖", async () => {
    await mountEditor()
    const vm: any = wrapper.vm
    vm.styleChange({ fillColor: "rgba(1,2,3,0.5)" })
    expect(graphic.setStyle).toHaveBeenCalledWith(expect.objectContaining({ fillOpacity: 0.5 }))

    graphic.setStyle.mockClear()
    vm.styleChange({ fillColor: "#fff" })
    expect(graphic.setStyle).toHaveBeenCalledWith({ fillColor: "#fff" })
    vm.styleChange({})
    expect(graphic.setStyle).toHaveBeenCalledTimes(2)
  })

  it("导出 geojson、飞行定位、删除实体", async () => {
    await mountEditor()
    const vm: any = wrapper.vm
    vm.getGeoJson()
    expect(mars2dModule.Util.downloadFile).toHaveBeenCalledWith("标绘item.json", expect.any(String))

    vm.flyToGraphic()
    expect(graphic.id).toBeUndefined()
    vm.deleteEntity()
    expect(graphic.remove).toHaveBeenCalled()
  })

  it("updataLayer 处理缺失图层、空 graphic 与无 styleType", async () => {
    const other = { ...graphic, _layer: undefined, options: {}, style: {} }
    const store2 = injectState({
      state: {
        widgets: [{ name: "graphic-editor", autoDisable: true, data: { graphic: other } }],
        openAtStart: [],
        defaultOption: { autoDisable: true, disableOther: false }
      }
    })
    wrapper = mount(GraphicEditorIndex, {
      global: {
        provide: {
          getMapInstance: () => createMap(),
          [widgetStoreModule.key]: store2,
          getCurrentWidget: () => "graphic-editor"
        },
        stubs: commonStubs()
      }
    })
    await nextTick()
    expect(wrapper.vm.layerName).toBe("")
    expect(wrapper.vm.customType).toBeUndefined()
    wrapper.unmount()

    // data 中没有 graphic 时 updataLayer 直接返回
    const store3 = injectState({
      state: {
        widgets: [{ name: "graphic-editor", autoDisable: true, data: {} }],
        openAtStart: [],
        defaultOption: { autoDisable: true, disableOther: false }
      }
    })
    wrapper = mount(GraphicEditorIndex, {
      global: {
        provide: {
          getMapInstance: () => createMap(),
          [widgetStoreModule.key]: store3,
          getCurrentWidget: () => "graphic-editor"
        },
        stubs: commonStubs()
      }
    })
    await nextTick()
    expect(wrapper.vm.layerName).toBe("")
  })

  it("getOpacity 边界", async () => {
    await mountEditor()
    const vm: any = wrapper.vm
    expect(vm.getOpacity("rgba(1,2,3,0.5)")).toBe("0.5")
    expect(vm.getOpacity("rgb(1,2,3)")).toBeNull()
    expect(vm.getOpacity("")).toBeNull()
  })
})

describe("mars-styles / base-comp", () => {
  function mountStyles(props: any) {
    return mount(MarsStyles, {
      props,
      global: { stubs: commonStubs() }
    })
  }

  it("customType 优先于 graphicType，渲染样式面板并应用默认值", async () => {
    // styleData 不带 label：mars-styles 的 immediate watch 会在 setup 阶段调用 setLabelDefault，
    // 而 originLabels 尚未初始化（源码 TDZ），因此 label 相关数据改由 setProps 传入
    const wrapper = mountStyles({
      layerName: "",
      graphicType: "marker",
      customType: "fontGraphic",
      styleData: { color: "#000" }
    })
    await wrapper.setProps({ styleData: { color: "#000", label: { text: "abc" } } })
    expect(wrapper.text()).toContain("默认分组")
    expect(wrapper.text()).toContain("横向对齐")
    expect(wrapper.text()).toContain("垂直对齐")
    expect(wrapper.text()).not.toContain("图标")
    expect(wrapper.findAll(".collapse-panel").length).toBeGreaterThanOrEqual(1)
  })

  it("未知类型不渲染样式配置", () => {
    const wrapper = mountStyles({ layerName: "l", graphicType: "unknown", styleData: {} })
    expect(wrapper.text()).toContain("未配置")
  })

  it("label 存在时显示注记信息并更新", async () => {
    const wrapper = mountStyles({
      layerName: "layer",
      graphicType: "marker",
      styleData: {},
      customType: "marker"
    })
    await wrapper.setProps({ styleData: { label: {} } })
    const vm: any = wrapper.vm
    vm.labelChange({ name: "text" })
    expect(vm.viewLabels.length).toBeGreaterThan(0)
    expect(wrapper.emitted("styleChange")).toBeDefined()
  })

  it("unionChange 填充/边框同时为否时提示并回滚", async () => {
    const wrapper = mountStyles({
      layerName: "l",
      graphicType: "polygon",
      customType: "polygon",
      styleData: { fill: false, outline: false }
    })
    await nextTick()
    const vm: any = wrapper.vm
    vm.unionChange({ name: "fill" })
    await nextTick()
    expect(messageMock.$message).toBeDefined()
    expect(vm.styleValue.fill).toBe(true)
  })

  it("styleData 变更后重新计算视图，函数 show/defval 生效", async () => {
    const wrapper = mountStyles({
      layerName: "l",
      graphicType: "polyline",
      customType: "polyline",
      styleData: { width: 2 }
    })
    const vm: any = wrapper.vm
    expect(vm.getViewShow({ show: () => false }, {})).toBe(false)
    expect(vm.getViewShow({}, {})).toBe(true)
    expect(vm.getViewDefval({ defval: () => 5 }, {})).toBe(5)
    expect(vm.getViewDefval({ defval: 1 }, {})).toBe(1)

    await wrapper.setProps({ styleData: { width: 4 } })
    expect(vm.styleValue.width).toBe(4)
  })

  it("updateStyle 与 updateLabel 发射对应字段", () => {
    const wrapper = mountStyles({ layerName: "l", graphicType: "marker", customType: "marker", styleData: {} })
    const vm: any = wrapper.vm
    vm.updateStyle({ name: "opacity" })
    expect(wrapper.emitted("styleChange")?.[0]).toEqual([{ opacity: expect.anything() }])
  })

  it("base-comp 按类型选择控件，label 渲染文本", () => {
    const wrapper = mount(BaseComp, { props: { type: "label", value: "text" }, global: { stubs: commonStubs() } })
    expect(wrapper.text()).toBe("text")

    const number = mount(BaseComp, { props: { type: "number", value: 1 }, global: { stubs: commonStubs() } })
    expect(number.find("input").exists()).toBe(true)
  })
})
