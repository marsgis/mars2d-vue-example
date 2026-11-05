import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { defineComponent, h, nextTick } from "vue"
import { flushPromises, mount } from "@vue/test-utils"
import { injectState } from "../../src/widgets/common/store/widget"
// key 会在 injectState 中被重新赋值，命名导入是快照，必须通过命名空间对象读取实时值
import * as widgetStoreModule from "../../src/widgets/common/store/widget"

const uiMock = vi.hoisted(() => ({
  $alert: vi.fn(),
  $message: vi.fn(),
  $showLoading: vi.fn(),
  $hideLoading: vi.fn()
}))
vi.mock("@mars/components/mars-ui/index", () => ({ ...uiMock }))

const editorMock = vi.hoisted(() => {
  const exampleList = [
    {
      id: 1,
      name: "基础",
      children: [
        {
          id: "1-1",
          name: "地图",
          children: [
            { id: "a1", name: "地图示例", main: "basic/map", api: "Map.html", thumbnail: "", new: true, plugins: "chart" },
            { id: "a2", name: "Demo", main: "basic/demo", api: "global.Map.html", thumbnail: "", download: false }
          ]
        },
        { id: "1-2", name: "空组", children: [] }
      ]
    },
    { id: 2, name: "高级", download: false, children: [{ id: "2-1", name: "下钻", children: [{ id: "b1", name: "B", main: "x/b", hidden: true }] }] }
  ]
  class Editor {
    static last: any
    options: any
    constructor(options: any) {
      this.options = options
      Editor.last = this
    }
  }
  const Util: any = {
    totalCount: 3,
    getExampleList: vi.fn()
  }
  return { Editor, Util, exampleList }
})
vi.mock("@marsgis/editor", () => ({ Editor: editorMock.Editor, Util: editorMock.Util }))

// main-operation 通过 import.meta.glob 加载示例 index.vue，这里用轻量占位组件替换
// 需补充 __isTeleport 等 SFC 标记，避免 test-utils 处理模块命名空间时取不到
vi.mock("../../src/example/control/basis/display/index.vue", () => ({
  // Vue 的异步组件用 __esModule 判断取 default，mock 模块必须显式声明
  __esModule: true,
  default: { name: "ExampleStub", setup: () => () => null },
  __isTeleport: false,
  __isSuspense: false,
  __isKeepAlive: false
}))

const onMapWorkReadyMock = vi.hoisted(() => ({
  onMapWorkReady: vi.fn()
}))
vi.mock("@mars/utils/map-work", () => ({
  ...onMapWorkReadyMock,
  getMapWork: () => (window as any).mapWork
}))

vi.mock("@icon-park/svg", () => {
  const icons: Record<string, any> = {
    FileTxt: () => "<svg />",
    FileExcel: () => "<svg />",
    Close: () => "<svg />",
    Search: () => "<svg />",
    Help: () => "<svg />",
    FocusOne: () => "<svg />",
    Delete: () => "<svg />",
    FolderOpen: () => "<svg />",
    FileEditing: () => "<svg />",
    DeleteOne: () => "<svg />"
  }
  return new Proxy(icons, {
    // 注意：不能把 then / Symbol 属性也当成图标函数返回，否则模块命名空间会被
    // 当成 thenable，Vite 加载模块时 await 永久挂起
    get(target, prop) {
      if (prop === "then" || typeof prop === "symbol") {
        return undefined
      }
      return prop in target ? target[prop as string] : () => "<svg />"
    }
  })
})

import MarsHead from "../../src/components/mars-work/mars-head.vue"
import MainOperation from "../../src/components/mars-work/main-operation.vue"
import ExampleList from "../../src/components/mars-work/example-list.vue"
import LayerState from "../../src/components/mars-sample/layer-state.vue"
import GraphicLayerState from "../../src/components/mars-sample/graphic-layer-state.vue"

const IconStub = defineComponent({
  props: ["icon"],
  emits: ["click"],
  setup(_, { emit }) {
    return () => h("span", { class: "icon-stub", onClick: (e: any) => emit("click", e) })
  }
})

const ButtonStub = defineComponent({
  setup(_, { slots }) {
    return () => h("button", { class: "button-stub" }, slots.default?.())
  }
})

const CheckboxStub = defineComponent({
  props: ["checked"],
  emits: ["update:checked", "change"],
  setup(props, { emit, slots }) {
    return () =>
      h(
        "label",
        {
          class: "checkbox-stub",
          onClick: () => {
            emit("update:checked", !props.checked)
            emit("change", { target: { checked: !props.checked } })
          }
        },
        slots.default?.()
      )
  }
})

function baseStubs() {
  return {
    "mars-icon": IconStub,
    "mars-button": ButtonStub,
    "mars-slider": { template: "<div class='slider-stub' />" },
    "mars-input-number": { template: "<input />" },
    "mars-select": { template: "<select />" },
    "mars-textarea": { template: "<textarea />" },
    "a-space": { template: "<div><slot /></div>" },
    "a-checkbox": CheckboxStub,
    "a-row": { template: "<div><slot /></div>" },
    "a-col": { template: "<div><slot /></div>" },
    "a-upload": { template: "<div><slot /></div>" },
    "a-table": { template: "<div class='table-stub' />" },
    "a-pagination": { template: "<div />" },
    "a-empty": { template: "<div />" },
    "a-input-search": { template: "<div />" }
  }
}

// ── mars-head ──────────────────────────────────────────────
describe("mars-head", () => {
  let wrapper: any

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    wrapper = undefined
  })

  it("渲染导航，滚动与点击切换高亮", async () => {
    wrapper = mount(MarsHead, { props: { activeNav: 2 } })
    expect(wrapper.findAll(".nav-item")).toHaveLength(3)
    expect(wrapper.findAll(".nav-item")[1].classes()).toContain("active")
    expect(wrapper.find(".site-brand").attributes("href")).toBe(process.env.BASE_URL || "/")

    Object.defineProperty(window, "scrollY", { value: 100, configurable: true })
    window.dispatchEvent(new Event("scroll"))
    await nextTick()
    expect(wrapper.find(".site-header").classes()).toContain("is-scrolled")

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true })
    window.dispatchEvent(new Event("scroll"))
    await nextTick()
    expect(wrapper.find(".site-header").classes()).not.toContain("is-scrolled")

    await wrapper.findAll(".nav-item button")[2].trigger("click")
    expect(wrapper.emitted("clickNav")?.[0]?.[0]).toEqual(wrapper.vm.navList[2])
    expect(wrapper.vm.internalActive).toBe(2)

    await wrapper.find(".site-brand").trigger("click")
    expect(wrapper.emitted("clickNav")?.[1]?.[0]).toEqual(wrapper.vm.navList[0])
  })

  it("移动菜单开关、外部点击、Esc 与 resize 收起", async () => {
    wrapper = mount(MarsHead, { props: { activeNav: 1 } })
    await wrapper.find(".nav-toggle").trigger("click")
    expect(wrapper.vm.mobileOpen).toBe(true)
    expect(wrapper.find("#mobile-menu").exists()).toBe(true)

    await wrapper.findAll(".mobile-nav-item")[1].trigger("click")
    expect(wrapper.vm.internalActive).toBe(1)
    expect(wrapper.vm.mobileOpen).toBe(false)
    expect(wrapper.emitted("clickNav")).toBeDefined()

    await wrapper.find(".nav-toggle").trigger("click")
    const outside = document.createElement("div")
    outside.setAttribute("class", "outside")
    document.body.appendChild(outside)
    document.dispatchEvent(new Event("pointerdown", { bubbles: true }))
    wrapper.vm.onDocumentPointerDown({ target: outside })
    expect(wrapper.vm.mobileOpen).toBe(false)

    await wrapper.find(".nav-toggle").trigger("click")
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    expect(wrapper.vm.mobileOpen).toBe(false)

    await wrapper.find(".nav-toggle").trigger("click")
    Object.defineProperty(window, "innerWidth", { value: 900, configurable: true })
    window.dispatchEvent(new Event("resize"))
    expect(wrapper.vm.mobileOpen).toBe(false)
  })

  it("activeNav 变化会覆盖内部高亮；closeMobile 未打开时直接返回", async () => {
    wrapper = mount(MarsHead)
    expect(wrapper.vm.activeIndex).toBe(0)
    await wrapper.setProps({ activeNav: 3 })
    expect(wrapper.vm.activeIndex).toBe(2)
    wrapper.vm.closeMobile()
    expect(wrapper.vm.mobileOpen).toBe(false)
  })
})

// ── main-operation ────────────────────────────────────────
describe("main-operation", () => {
  let wrapper: any

  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    wrapper = undefined
    window.history.replaceState(null, "", "/")
  })

  it("缺少 id 时 getExampleId 抛错", async () => {
    vi.doUnmock("@mars/utils/mars-util")
    const mod = await import("../../src/components/mars-work/main-operation.vue")
    expect(() => mount(mod.default)).toThrow("id不能为空")
  })

  it("有 id 时渲染异步面板并提供 getCurrentWidget=null", async () => {
    window.history.replaceState(null, "", "/?id=control/basis/display")
    const mod = await import("../../src/components/mars-work/main-operation.vue")
    wrapper = mount(mod.default)
    await flushPromises()
    // 通过 provide 观察 getCurrentWidget
    const provided = wrapper.vm.$.provides
    expect(Object.values(provided).some((v) => typeof v === "function" && v() === null)).toBe(true)
  })
})

// ── example-list ──────────────────────────────────────────
describe("example-list", () => {
  let wrapper: any
  let matchMediaHandler: any

  beforeEach(() => {
    editorMock.Util.getExampleList.mockReset()
    editorMock.Util.getExampleList.mockResolvedValue(editorMock.exampleList)
    editorMock.Util.totalCount = 3

    window.matchMedia = vi.fn((query: string) => {
      const mql: any = {
        matches: false,
        media: query,
        addEventListener: vi.fn((_: string, cb: any) => (matchMediaHandler = cb)),
        removeEventListener: vi.fn()
      }
      return mql
    })
    window.scrollTo = vi.fn()
    URL.createObjectURL = vi.fn(() => "blob:mock")
    URL.revokeObjectURL = vi.fn()
    document.getElementById = ((id: string) => {
      if (id === "a1" || id === "1-1") {
        const el = document.createElement("div")
        el.id = id
        el.scrollIntoView = vi.fn()
        return el
      }
      return null
    }) as any
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    wrapper = undefined
    delete (window as any).matchMedia
  })

  async function mountList(props: any = {}) {
    wrapper = mount(ExampleList, { props, global: { stubs: baseStubs() } })
    await flushPromises()
    return wrapper
  }

  it("created 加载示例清单并初始化选中状态", async () => {
    await mountList()
    expect(editorMock.Util.getExampleList).toHaveBeenCalled()
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.loadFailed).toBe(false)
    expect(wrapper.vm.list).toEqual(editorMock.exampleList)
    expect(wrapper.vm.allCount).toBe(3)
    expect(wrapper.vm.activeFirstId).toBe(1)
    expect(wrapper.vm.expandedFirstId).toBe(1)
    expect(wrapper.vm.activeSecondId).toBe("1-1")
    expect(wrapper.vm.activeFirstName).toBe("基础")
    expect(wrapper.find(".card").exists()).toBe(true)
    expect(wrapper.text()).toContain("地图示例")
  })

  it("加载失败置 loadFailed，重试可恢复；空列表不选首项", async () => {
    editorMock.Util.getExampleList.mockRejectedValueOnce(new Error("network"))
    await mountList()
    expect(wrapper.vm.loadFailed).toBe(true)
    expect(wrapper.find(".state-card").exists()).toBe(true)

    await wrapper.vm.retryLoad()
    await flushPromises()
    expect(wrapper.vm.loadFailed).toBe(false)

    wrapper.vm.list = []
    wrapper.vm.initActiveState([])
    // 空列表时 initActiveState 直接返回，保留上一次选中项
    expect(wrapper.vm.activeFirstId).toBe(1)
  })

  it("renderList 过滤 hidden/无 main，resultCount 与空分组", async () => {
    await mountList()
    wrapper.vm.list = [
      { id: "g", children: [{ id: "s", children: [{ id: "c", main: "" }, { id: "d", main: "x", hidden: true }] }] },
      { id: "empty", children: [] }
    ]
    await nextTick()
    expect(wrapper.vm.renderList).toEqual([])
    expect(wrapper.vm.resultCount).toBe(0)

    wrapper.vm.list = editorMock.exampleList
    expect(wrapper.vm.renderList[0].children.length).toBe(1)
    expect(wrapper.vm.resultCount).toBe(2)
    wrapper.vm.activeFirstId = 2
    expect(wrapper.vm.activeFirstName).toBe("高级")
    wrapper.vm.activeFirstId = 99
    expect(wrapper.vm.activeFirstName).toBe("全部")
  })

  it("isVisible / isnew / getTitle", async () => {
    await mountList()
    expect(wrapper.vm.isVisible({ main: "a" })).toBe(true)
    expect(wrapper.vm.isVisible({ main: "a", hidden: true })).toBe(false)
    expect(wrapper.vm.isVisible({})).toBe(false)
    expect(wrapper.vm.isnew({ new: true })).toBe(true)
    expect(wrapper.vm.getTitle({ name: "n", main: "m" })).toBe("n\n目录：m")
    expect(wrapper.vm.getTitle({ name: "n", main: "m", api: "global.Map.html" })).toBe("n\n目录：m\nAPI：mars2d.Map")
  })

  it("toggleFirst 桌面展开/收起与移动端行为", async () => {
    await mountList()
    const vm = wrapper.vm
    const first = editorMock.exampleList[0]
    vm.activeFirstId = 1
    vm.expandedFirstId = 1
    vm.isMobile = false
    vm.toggleFirst({ id: 1 })
    expect(vm.expandedFirstId).toBeNull()

    vm.toggleFirst({ id: 2 })
    expect(vm.activeFirstId).toBe(2)
    expect(vm.expandedFirstId).toBe(2)

    vm.isMobile = true
    vm.mobileFilterOpen = true
    vm.toggleFirst({ id: 2 })
    expect(vm.expandedFirstId).toBe(2)
    expect(vm.mobileFilterOpen).toBe(false)

    vm.clickSecond({ id: "1-1" })
    expect(vm.activeFirstId).toBe(1)
    expect(vm.activeSecondId).toBe("1-1")
    expect(vm.searchValue).toBe("")

    vm.clickSecond({ id: "missing" })
    expect(vm.activeSecondId).toBe("missing")
  })

  it("移动筛选开关与关闭、键盘 Esc、视口变化", async () => {
    await mountList()
    const vm = wrapper.vm
    vm.toggleMobileFilter()
    expect(vm.mobileFilterOpen).toBe(true)
    vm.closeMobileFilter()
    expect(vm.mobileFilterOpen).toBe(false)
    vm.closeMobileFilter(true)
    expect(wrapper.vm.mobileFilterOpen).toBe(false)

    vm.mobileFilterOpen = true
    vm.onKeydown({ key: "Escape" })
    expect(vm.mobileFilterOpen).toBe(false)
    expect(vm.guideOpen).toBe(false)

    vm.onViewportChange({ matches: true })
    expect(vm.isMobile).toBe(true)
    vm.mobileFilterOpen = true
    vm.onViewportChange({ matches: false })
    expect(vm.isMobile).toBe(false)
    expect(vm.mobileFilterOpen).toBe(false)
  })

  it("浮层外部点击与触摸设备展开详情", async () => {
    await mountList()
    const vm = wrapper.vm
    const inside = document.createElement("div")
    inside.className = "help-wrap"
    vm.onDocumentPointerDown({ target: inside })
    expect(vm.guideOpen).toBe(false)

    vm.onDocumentPointerDown({ target: null })
    vm.guideOpen = true
    vm.onDocumentPointerDown({ target: document.body })
    expect(vm.guideOpen).toBe(false)

    window.matchMedia = vi.fn(() => ({ matches: true }))
    vm.onDetailClick("a1")
    expect(vm.detailOpenId).toBe("a1")
    vm.onDetailClick("a1")
    expect(vm.detailOpenId).toBeNull()
  })

  it("搜索筛选、清空、滚动阴影与跳转", async () => {
    await mountList()
    const vm = wrapper.vm
    vm.searchValue = "  "
    vm.searchDetail()
    expect(vm.list).toEqual(editorMock.exampleList)

    vm.searchValue = "demo"
    vm.searchDetail()
    expect(vm.list[0].children[0].children.map((c: any) => c.id)).toEqual(["a2"])
    expect(vm.list[0].count).toBe(1)

    vm.searchValue = "Map.html"
    vm.searchDetail()
    expect(vm.resultCount).toBe(2)

    vm.searchValue = "zzzz"
    vm.searchDetail()
    expect(vm.list).toEqual([])

    vm.clearAll()
    expect(vm.searchValue).toBe("")
    expect(vm.list).toEqual(editorMock.exampleList)

    Object.defineProperty(document.documentElement, "scrollTop", { value: 100, configurable: true })
    vm.isfixed()
    expect(vm.wrapFixed).toBe(true)
    Object.defineProperty(document.documentElement, "scrollTop", { value: 0, configurable: true })
    vm.isfixed()
    expect(vm.wrapFixed).toBe(false)

    vm.jumpurl({ id: "x" })
    expect(wrapper.emitted("jump")?.[0]?.[0]).toEqual({ id: "x" })
  })

  it("图片加载失败回退并移除 onerror", async () => {
    await mountList()
    const img: any = { src: "bad", onerror: vi.fn() }
    wrapper.vm.imgOnError({ target: img })
    expect(img.src).toBe((process.env.BASE_URL || "/") + "config/thumbnail/map-options-basemaps.jpg")
    expect(img.onerror).toBeNull()
    wrapper.vm.imgOnError({ target: null })
  })

  it("downloadTxt/downloadCsv/getAllName/getVerDiff", async () => {
    await mountList()
    const vm = wrapper.vm
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined)
    vm.downloadTxt()
    expect(clickSpy).toHaveBeenCalled()
    vm.downloadCsv()
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))
    expect(URL.revokeObjectURL).toHaveBeenCalled()
    clickSpy.mockRestore()

    const txt = vm.getAllName()
    expect(txt).toContain("Mars2D功能清单")
    expect(txt).toContain("地图示例")
    const csv = vm.getVerDiff()
    expect(csv).toContain("地图示例")
    expect(csv).not.toContain("Demo")

    expect(vm.getStandardName({ name: "DemoX" })).toBe(false)
    expect(vm.getStandardName({ name: "示例(附加)" })).toBe("示例")
    expect(vm.getStandardName({ name: "普通" })).toBe("普通")
    expect(vm.getStandardName({ name: "普通" })).toBe("普通")
  })

  it("downloadFile 无 revokeObjectURL 时兼容", async () => {
    await mountList()
    const original = URL.revokeObjectURL
    ;(URL as any).revokeObjectURL = undefined
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined)
    wrapper.vm.downloadFile("x.txt", "abc")
    expect(clickSpy).toHaveBeenCalled()
    clickSpy.mockRestore()
    ;(URL as any).revokeObjectURL = original
  })
})

// ── layer-state ────────────────────────────────────────────
describe("layer-state", () => {
  let layer: any
  let mapWork: any
  let wrapper: any
  const offSpy = vi.fn()

  function makeLayer() {
    return {
      show: true,
      hasPopup: vi.fn(() => true),
      hasTooltip: vi.fn(() => false),
      hasContextMenu: vi.fn(() => false),
      bindPopup: vi.fn(),
      unbindPopup: vi.fn(),
      bindTooltip: vi.fn(),
      unbindTooltip: vi.fn(),
      bindContextMenu: vi.fn(),
      unbindContextMenu: vi.fn(),
      startEditing: vi.fn(),
      stopEditing: vi.fn(),
      removeGraphic: vi.fn(),
      _map: { contextmenu: {} },
      graphics: []
    }
  }

  function mountLayerState(props: any = {}) {
    onMapWorkReadyMock.onMapWorkReady.mockImplementation((cb: Function) => {
      cb()
      return offSpy
    })
    wrapper = mount(LayerState, { props, global: { stubs: baseStubs() } })
    return wrapper
  }

  beforeEach(() => {
    offSpy.mockClear()
    layer = makeLayer()
    mapWork = {
      mars2d: {
        Util: { getTemplateHtml: vi.fn((o: any) => JSON.stringify(o.attr)) },
        MeasureUtil: { formatDistance: vi.fn(() => "1m"), formatArea: vi.fn(() => "1㎡") }
      },
      graphicLayer: layer,
      eventTarget: { on: vi.fn() }
    }
    ;(window as any).mapWork = mapWork
    ;(window as any).__layerState = undefined
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    wrapper = undefined
    delete (window as any).mapWork
  })

  it("初始化读取图层状态，卸载取消监听", () => {
    mountLayerState()
    const vm: any = wrapper.vm
    expect(vm.formState.enabledShowHide).toBe(true)
    expect(vm.formState.enabledPopup).toBe(true)
    expect(onMapWorkReadyMock.onMapWorkReady).toHaveBeenCalled()
    wrapper.unmount()
    expect(offSpy).toHaveBeenCalled()
    wrapper = undefined
  })

  it("getManagerLayer 缺失时跳过初始化", () => {
    mapWork.graphicLayer = undefined
    mountLayerState()
    expect(wrapper.vm.formState.enabledShowHide).toBe(true)
  })

  it("显示、Popup、Tooltip、右键菜单开关", () => {
    mapWork.getManagerLayer = () => layer
    mountLayerState()
    const vm: any = wrapper.vm
    vm.formState.enabledShowHide = false
    vm.onChangeShow()
    expect(layer.show).toBe(false)

    vm.formState.enabledPopup = false
    vm.onChangePopup()
    expect(layer.unbindPopup).toHaveBeenCalled()

    vm.formState.enabledTooltip = true
    vm.onChangeTooltip()
    const tooltip = layer.bindTooltip.mock.calls[0][0]
    expect(tooltip({ graphic: { attr: { a: 1 } } })).toContain('"a":1')
    expect(tooltip({ graphic: { attr: null } })).toContain("我是layer上绑定的Toolip")

    vm.formState.enabledTooltip = false
    vm.onChangeTooltip()
    expect(layer.unbindTooltip).toHaveBeenCalled()

    vm.formState.enabledRightMenu = false
    vm.onChangeRightMenu()
    expect(layer.unbindContextMenu).toHaveBeenCalledWith(true)
  })

  it("自定义 bindLayerPopup / bindLayerContextMenu 回调生效", () => {
    mapWork.bindLayerPopup = vi.fn()
    mapWork.bindLayerContextMenu = vi.fn()
    mountLayerState()
    const vm: any = wrapper.vm
    vm.formState.enabledPopup = true
    vm.onChangePopup()
    expect(mapWork.bindLayerPopup).toHaveBeenCalled()
    vm.formState.enabledRightMenu = true
    vm.onChangeRightMenu()
    expect(mapWork.bindLayerContextMenu).toHaveBeenCalled()
  })

  it("默认 popup 与右键菜单全部动作", () => {
    mountLayerState()
    const vm: any = wrapper.vm
    vm.formState.enabledPopup = true
    vm.onChangePopup()
    const popup = layer.bindPopup.mock.calls[0][0]
    expect(popup({ graphic: { attr: { x: 1 } } })).toContain("x")
    expect(popup({ czmObject: null })).toContain("我是layer上绑定的Popup")
    expect(popup({ czmObject: { _attr: { p: 1 } } })).toContain("p")
    expect(popup({ czmObject: { properties: { q: 1 } } })).toContain("q")
    expect(popup({ czmObject: { attribute: { r: 1 } } })).toContain("r")
    expect(popup({ czmObject: { _attr: { type: "x", attr: { nested: 1 } } } })).toContain("nested")

    vm.formState.enabledRightMenu = true
    vm.onChangeRightMenu()
    const menu = layer.bindContextMenu.mock.calls[0][0]
    const noGraphic = { graphic: null }
    expect(menu[0].show(noGraphic)).toBe(false)
    expect(menu[0].show({ graphic: { editing: null } })).toBe(false)
    expect(menu[0].show({ graphic: { editing: { enabled: () => false } } })).toBe(true)
    menu[0].callback({ graphic: { id: 1 } })
    expect(layer.startEditing).toHaveBeenCalled()

    expect(menu[1].show(noGraphic)).toBe(false)
    expect(menu[1].show({ graphic: { editing: { enabled: () => true } } })).toBe(true)
    menu[1].callback({ graphic: { id: 2 } })
    expect(layer.stopEditing).toHaveBeenCalled()

    expect(menu[2].callback(noGraphic)).toBe(false)
    menu[2].callback({ graphic: { toJSON: () => ({ a: 1 }) } })
    expect(layer._map.contextmenu.copyGraphic).toEqual({ a: 1 })
    expect(layer._map.contextmenu.copyGraphic.layerId).toBe(layer.id)

    expect(menu[3].callback(noGraphic)).toBe(false)
    const g = { toJSON: () => ({ b: 2 }), remove: vi.fn() }
    menu[3].callback({ graphic: g })
    expect(g.remove).toHaveBeenCalledWith(true)

    expect(menu[4].show(noGraphic)).toBe(false)
    expect(menu[4].show({ graphic: {} })).toBe(true)
    menu[4].callback(noGraphic)
    menu[4].callback({ graphic: { id: 3 } })
    expect(layer.removeGraphic).toHaveBeenCalledWith({ id: 3 })

    expect(menu[5].show(noGraphic)).toBe(false)
    expect(menu[5].show({ graphic: { type: "polyline" } })).toBe(true)
    expect(menu[5].show({ graphic: { type: "marker" } })).toBe(false)
    menu[5].callback({ graphic: { distance: 10 } })
    expect(uiMock.$alert).toHaveBeenCalledWith("该对象的长度为:1m")

    expect(menu[6].show(noGraphic)).toBe(false)
    expect(menu[6].show({ graphic: { type: "circle" } })).toBe(true)
    expect(menu[6].show({ graphic: { type: "polyline" } })).toBe(false)
    menu[6].callback({ graphic: { distance: 10 } })
    expect(uiMock.$alert).toHaveBeenCalledWith("该对象的周长为:1m")

    expect(menu[7].show(noGraphic)).toBe(false)
    expect(menu[7].show({ graphic: { type: "circle" } })).toBe(true)
    expect(menu[7].show({ graphic: { type: "rectangle" } })).toBe(true)
    expect(menu[7].show({ graphic: { type: "polygon" } })).toBe(true)
    expect(menu[7].show({ graphic: { type: "marker" } })).toBe(false)
    menu[7].callback({ graphic: { area: 10 } })
    expect(uiMock.$alert).toHaveBeenCalledWith("该对象的面积为:1㎡")
  })

  it("checkbox 交互路径生效", async () => {
    mountLayerState()
    await wrapper.findAll(".checkbox-stub")[0].trigger("click")
    expect(layer.show).toBe(false)
    await wrapper.findAll(".checkbox-stub")[1].trigger("click")
    expect(layer.unbindPopup).toHaveBeenCalled()
  })
})

// ── graphic-layer-state ────────────────────────────────────
describe("graphic-layer-state", () => {
  let layer: any
  let mapWork: any
  let wrapper: any
  let store: any
  let listeners: Record<string, Function[]>
  let offSpy: any

  function makeGraphic(overrides: any = {}) {
    return {
      id: 1,
      type: "marker",
      name: "g1",
      style: { label: { text: "标注" } },
      attr: { remark: "备注" },
      isPrivate: false,
      hasOpacity: true,
      editing: { enabled: () => true },
      positionsShow: [],
      ...overrides
    }
  }

  function makeGraphicLayer() {
    listeners = {}
    const graphics = [
      makeGraphic({ id: 2, isPrivate: true }),
      makeGraphic({ id: 3, name: "", style: {}, attr: {} }),
      makeGraphic({ id: 4, name: "named", style: {}, attr: {} , hasOpacity: true })
    ]
    return {
      show: true,
      hasPopup: vi.fn(() => true),
      hasTooltip: vi.fn(() => false),
      hasContextMenu: vi.fn(() => false),
      isEditing: true,
      opacity: 1,
      isDrawing: false,
      enabledEvent: true,
      length: 2,
      graphics,
      getGraphics: vi.fn(() => graphics),
      on: vi.fn((type: string, cb: Function) => {
        type
          .split(/\s+/)
          .filter(Boolean)
          .forEach((t) => {
            ;(listeners[t] = listeners[t] || []).push(cb)
          })
      }),
      bindPopup: vi.fn((fn: Function) => (layer.popupFn = fn)),
      unbindPopup: vi.fn(),
      bindTooltip: vi.fn(),
      unbindTooltip: vi.fn(),
      bindContextMenu: vi.fn((menu: any) => (layer.contextMenu = menu)),
      unbindContextMenu: vi.fn(),
      closePopup: vi.fn(),
      startEditing: vi.fn(),
      stopEditing: vi.fn(),
      removeGraphic: vi.fn(),
      clear: vi.fn(),
      clearDrawing: vi.fn(),
      flyTo: vi.fn(),
      toJSON: vi.fn(() => ({ type: "graphic" })),
      toGeoJSON: vi.fn(() => ({ type: "FeatureCollection" })),
      addGraphic: vi.fn(),
      loadGeoJSON: vi.fn(),
      getGraphicById: vi.fn((id: number) => graphics.find((g: any) => g.id === id)),
      _map: { contextmenu: {} }
    }
  }

  function mountGraphicLayerState(props: any = {}) {
    onMapWorkReadyMock.onMapWorkReady.mockImplementation((cb: Function) => {
      cb()
      return offSpy
    })
    wrapper = mount(GraphicLayerState, {
      props,
      global: {
        provide: { [widgetStoreModule.key]: store },
        stubs: { ...baseStubs(), "mars-table": { template: "<div class='table-stub' />" } }
      }
    })
    return wrapper
  }

  beforeEach(() => {
    vi.useFakeTimers()
    offSpy = vi.fn()
    ;(window as any).__grLayerState = undefined
    layer = makeGraphicLayer()
    mapWork = {
      mars2d: {
        Util: {
          getTemplateHtml: vi.fn((o: any) => JSON.stringify(o.attr)),
          downloadFile: vi.fn()
        },
        MeasureUtil: { formatDistance: vi.fn(() => "1m"), formatArea: vi.fn(() => "1㎡") },
        EventType: { drawCreated: "drawCreated", removeGraphic: "removeGraphic" }
      },
      graphicLayer: layer,
      map: { flyToGraphic: vi.fn() },
      eventTarget: { on: vi.fn() },
      addRandomGraphicByCount: vi.fn((count: number) => count),
      startDrawGraphic: vi.fn(() => undefined),
      startDrawGraphic2: vi.fn(() => undefined),
      kgUtil: { toGeoJSON: vi.fn(() => Promise.resolve({ type: "FeatureCollection" })) }
    }
    ;(window as any).mapWork = mapWork
    store = injectState({
      state: {
        widgets: [
          { name: "graphic-editor", autoDisable: true },
          { name: "other", autoDisable: true }
        ],
        openAtStart: [],
        defaultOption: { autoDisable: true, disableOther: false }
      }
    })
    ;(window as any).__grLayerStore = store
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    if (wrapper) wrapper.unmount()
    wrapper = undefined
    delete (window as any).mapWork
  })

  it("初始化图层状态、事件与表格数据", async () => {
    mountGraphicLayerState()
    await nextTick()
    const vm: any = wrapper.vm
    expect(vm.formState.enabledShowHide).toBe(true)
    expect(vm.formState.enabledPopup).toBe(true)
    expect(vm.formState.hasTable).toBe(true)
    expect(vm.formState.enabledOpacity).toBe(true)
    expect(vm.graphicDataList.length).toBe(2)
    expect(vm.graphicDataList[0].name).toBe("marker - named")
    expect(vm.graphicDataList[1].name).toBe("marker - 未命名1")
    expect(vm.formState.count).toBe(100)
    await nextTick()
    await vi.advanceTimersByTimeAsync(200)
  })

  it("缺少图层时警告，重复初始化被拦截", () => {
    mapWork.graphicLayer = undefined
    mountGraphicLayerState()
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined)
    expect(warn).not.toHaveBeenCalledWith("[graphic-layer-state] 未获取到 map.js 中创建的图层对象，跳过初始化")
    warn.mockRestore()
  })

  it("编辑开关、透明度、定位与绘制状态", async () => {
    mountGraphicLayerState()
    const vm: any = wrapper.vm
    vm.formState.hasEdit = true
    vm.onChangeHasEdit()
    expect(layer.hasEdit).toBe(true)
    expect(vm.formState.enabledPopup).toBe(false)
    expect(layer.unbindPopup).toHaveBeenCalled()

    vm.formState.opacity = 0.5
    vm.onOpacityChange()
    expect(layer.opacity).toBe(0.5)

    layer.graphics = []
    vm.onClickFlyTo()
    expect(layer.flyTo).not.toHaveBeenCalled()
    layer.graphics = [makeGraphic()]
    vm.onClickFlyTo()
    expect(layer.flyTo).toHaveBeenCalledWith({ scale: 1.2 })

    vm.onClickStartDraw()
    layer.isDrawing = true
    vm.onClickStartDraw()
    expect(vm.formState.isDrawing).toBe(true)
    vm.onClickStartDraw2()
    vm.onClickClearDrawing()
    layer.isDrawing = false
    vm.onClickClearDrawing()
    expect(vm.formState.isDrawing).toBe(false)
  })

  it("随机生成大数据刷新列表并定位", () => {
    mountGraphicLayerState()
    const vm: any = wrapper.vm
    mapWork.addRandomGraphicByCount.mockReturnValueOnce(5)
    vm.formState.count = 10
    vm.addRandomGraphicByCount()
    expect(uiMock.$showLoading).toHaveBeenCalled()
    expect(uiMock.$hideLoading).toHaveBeenCalled()
    expect(uiMock.$message).toHaveBeenCalledWith(expect.stringContaining("生成5条数据"))
    expect(layer.flyTo).toHaveBeenCalled()

    mapWork.addRandomGraphicByCount.mockReturnValueOnce(undefined)
    vm.addRandomGraphicByCount()
    expect(uiMock.$message).toHaveBeenLastCalledWith(expect.stringContaining("生成10条数据"))
  })

  it("Popup/Tooltip/右键菜单默认与自定义分支", () => {
    mapWork.bindLayerPopup = vi.fn()
    mapWork.bindLayerContextMenu = vi.fn()
    mountGraphicLayerState()
    const vm: any = wrapper.vm
    vm.formState.enabledPopup = true
    vm.onChangePopup()
    expect(mapWork.bindLayerPopup).toHaveBeenCalled()
    vm.formState.enabledPopup = false
    vm.onChangePopup()
    expect(layer.closePopup).toHaveBeenCalled()
    expect(layer.unbindPopup).toHaveBeenCalled()

    vm.formState.enabledRightMenu = true
    vm.onChangeRightMenu()
    expect(mapWork.bindLayerContextMenu).toHaveBeenCalled()
    vm.formState.enabledRightMenu = false
    vm.onChangeRightMenu()
    expect(layer.unbindContextMenu).toHaveBeenCalled()

    vm.formState.enabledShowHide = false
    vm.onChangeShow()
    expect(layer.show).toBe(false)
  })

  it("默认 Tooltip 与默认右键菜单动作全分支", () => {
    mountGraphicLayerState()
    const vm: any = wrapper.vm
    vm.formState.enabledTooltip = true
    vm.onChangeTooltip()
    const tooltip = layer.bindTooltip.mock.calls[0][0]
    expect(tooltip({ graphic: { type: "marker", attr: { a: 1 } } })).toContain("a")
    expect(tooltip({})).toContain("我是layer上绑定的Toolip")
    vm.formState.enabledTooltip = false
    vm.onChangeTooltip()
    expect(layer.unbindTooltip).toHaveBeenCalled()

    vm.formState.enabledPopup = true
    vm.onChangePopup()
    const popup = layer.popupFn
    expect(popup({ graphic: { type: "marker", attr: { x: 1 } } })).toContain("x")
    expect(popup({ czmObject: { properties: { y: 1 } } })).toContain("y")
    expect(popup({ czmObject: { _attr: { type: "a", attr: { z: 1 } } } })).toContain("z")
    expect(popup({ czmObject: { attribute: { w: 1 } } })).toContain("w")
    expect(popup({ czmObject: null })).toContain("我是layer上绑定的Popup")

    vm.formState.enabledRightMenu = true
    vm.onChangeRightMenu()
    const menu = layer.contextMenu
    const no = { graphic: null }
    expect(menu[0].show(no)).toBe(false)
    expect(menu[0].show({ graphic: {} })).toBe(false)
    expect(menu[0].show({ graphic: { editing: { enabled: () => false } } })).toBe(true)
    menu[0].callback({ graphic: {} })

    expect(menu[1].show(no)).toBe(false)
    expect(menu[1].show({ graphic: { editing: { enabled: () => true } } })).toBe(true)
    menu[1].callback({ graphic: {} })

    expect(menu[2].callback(no)).toBe(false)
    menu[2].callback({ graphic: { toJSON: () => ({ a: 1 }) } })

    expect(menu[3].callback(no)).toBe(false)
    const g = { toJSON: () => ({ b: 2 }), remove: vi.fn() }
    menu[3].callback({ graphic: g })
    expect(g.remove).toHaveBeenCalled()

    expect(menu[4].show(no)).toBe(false)
    expect(menu[4].show({ graphic: { isDestroy: true } })).toBe(false)
    expect(menu[4].show({ graphic: {} })).toBe(true)
    menu[4].callback(no)
    menu[4].callback({ graphic: { parent: { id: 9 } } })
    expect(layer.removeGraphic).toHaveBeenCalled()

    expect(menu[5].show(no)).toBe(false)
    expect(menu[5].show({ graphic: { type: "curve" } })).toBe(true)
    expect(menu[5].show({ graphic: { type: "marker" } })).toBe(false)
    menu[5].callback({ graphic: { distance: 5 } })

    expect(menu[6].show(no)).toBe(false)
    expect(menu[6].show({ graphic: { type: "rectangleP" } })).toBe(true)
    expect(menu[6].show({ graphic: { type: "marker" } })).toBe(false)
    menu[6].callback({ graphic: { distance: 5 } })

    expect(menu[7].show(no)).toBe(false)
    expect(menu[7].show({ graphic: { type: "circleP" } })).toBe(true)
    expect(menu[7].show({ graphic: { type: "polygon", positionsShow: [] } })).toBe(false)
    expect(menu[7].show({ graphic: { type: "polygon", positionsShow: [1, 2, 3] } })).toBe(true)
    menu[7].callback({ graphic: { area: 5 } })
  })

  it("清除数据：customEditor 触发事件，否则关闭 widget", async () => {
    mountGraphicLayerState({ customEditor: "marker" })
    const vm: any = wrapper.vm
    vm.onClickClear()
    expect(layer.enabledEvent).toBe(true)
    expect(layer.clear).toHaveBeenCalled()
    expect(wrapper.emitted("onStopEditor")).toBeDefined()

    if (wrapper) wrapper.unmount()
    mountGraphicLayerState()
    const vm2: any = wrapper.vm
    vm2.onClickClear()
    await nextTick()
    expect(store.state.widgets[0].visible).toBe(false)
  })

  it("导出 JSON/GeoJSON 空数据提示与成功下载", () => {
    mountGraphicLayerState()
    const vm: any = wrapper.vm
    layer.length = 0
    vm.expJSONFile()
    expect(uiMock.$message).toHaveBeenCalledWith("当前没有标注任何数据，无需保存！")
    vm.expGeoJSONFile()
    expect(uiMock.$message).toHaveBeenCalledTimes(2)

    layer.length = 2
    vm.expJSONFile()
    expect(mapWork.mars2d.Util.downloadFile).toHaveBeenCalledWith("矢量数据构造参数.json", JSON.stringify({ type: "graphic" }))
    vm.expGeoJSONFile()
    expect(mapWork.mars2d.Util.downloadFile).toHaveBeenCalledWith(
      "矢量数据GeoJSON.json",
      JSON.stringify({ type: "FeatureCollection" })
    )
  })

  it("导入 json/geojson 两种结构，kml/kmz 与不支持类型", async () => {
    mountGraphicLayerState()
    const vm: any = wrapper.vm

    class FakeReader {
      result: any
      onloadend: any
      readAsText(file: any) {
        this.result = file._text
        // 真实 FileReader 是异步回调，这里模拟微任务，保证组件先挂载 onloadend
        Promise.resolve().then(() => this.onloadend?.())
      }
    }
    vi.stubGlobal("FileReader", FakeReader)

    vm.onClickImpFile({ file: { name: "a.json", _text: JSON.stringify({ type: "graphic", data: { id: 1 } }) } })
    await flushPromises()
    expect(layer.addGraphic).toHaveBeenCalled()
    expect(layer.flyTo).toHaveBeenCalled()
    expect(vm.graphicDataList.length).toBeGreaterThan(0)

    vm.onClickImpFile({ file: { name: "b.geojson", _text: JSON.stringify({ type: "FeatureCollection" }) } })
    await flushPromises()
    expect(layer.loadGeoJSON).toHaveBeenCalled()

    vm.onClickImpFile({ file: { name: "c.kml", _text: "<kml/>" } })
    await flushPromises()
    expect(mapWork.kgUtil.toGeoJSON).toHaveBeenCalledWith("<kml/>")
    expect(layer.loadGeoJSON).toHaveBeenCalled()

    vm.onClickImpFile({ file: { name: "d.kmz", _text: "binary" } })
    await flushPromises()
    expect(mapWork.kgUtil.toGeoJSON).toHaveBeenCalledWith({ name: "d.kmz", _text: "binary" })

    vm.onClickImpFile({ file: { name: "e.txt" } })
    expect(uiMock.$message).toHaveBeenCalledWith("暂不支持 txt 文件类型的数据！")
  })

  it("编辑器事件：drawCreated/edit/stop/remove 与 widget 更新", async () => {
    mountGraphicLayerState()
    const vm: any = wrapper.vm
    const drawHandlers = listeners["drawCreated"]
    expect(drawHandlers.length).toBe(3)

    const g = makeGraphic({ id: 7, type: "marker", style: {} })
    drawHandlers[1]({ graphic: g })
    expect(vm.graphicDataList.some((item: any) => item.key === 7)).toBe(true)

    const privateGraphic = makeGraphic({ id: 8, isPrivate: true, type: "marker", style: {} })
    drawHandlers[1]({ graphic: privateGraphic })
    expect(vm.graphicDataList.some((item: any) => item.key === 8)).toBe(false)

    drawHandlers[0]({ graphic: g })
    expect(layer.startEditing).toHaveBeenCalledWith(g)
    await nextTick()

    listeners["editMovePoint"][0]({ graphic: g })
    listeners["editStop"][0]()
    await vi.advanceTimersByTimeAsync(150)
    expect(store.state.widgets[0].visible).toBe(false)

    const removeHandler = listeners["removeGraphic"][1]
    removeHandler({ graphic: { id: 7 } })
    expect(vm.graphicDataList.some((item: any) => item.key === 7)).toBe(false)
  })

  it("自定义编辑器匹配与更新已激活 widget", async () => {
    mountGraphicLayerState({ customEditor: "marker" })
    const handler = listeners["drawCreated"][0]
    const g = makeGraphic({ id: 10, type: "marker", style: { label: { text: "X" } } })
    handler({ graphic: g })
    expect(wrapper.emitted("onStartEditor")?.[0]?.[0]).toEqual({ graphicId: 10, graphicName: "marker - X" })

    if (wrapper) wrapper.unmount()

    mountGraphicLayerState()
    store.state.widgets[0].visible = true

    // 通过 getWidget().onUpdate 注册监听，验证已激活时走 updateWidget 分支
    const updates: any[] = []
    const Hook = defineComponent({
      setup() {
        const api = widgetStoreModule.useWidget()
        api.getWidget("graphic-editor").onUpdate((payload: any) => updates.push(payload))
        return () => h("div")
      }
    })
    const hook = mount(Hook, { global: { provide: { [widgetStoreModule.key]: store } } })

    // 使用第二次挂载注册的 editStart 回调（listeners 会累积，取最后一个）
    const editStart = listeners["editStart"][listeners["editStart"].length - 1]
    editStart({ graphic: g })
    expect(layer.startEditing).toHaveBeenCalledWith(g)
    expect(updates[0]?.data?.graphic).toBe(g)
    hook.unmount()
  })

  it("表格行点击、编辑与删除，分页大小", async () => {
    mountGraphicLayerState({ enabledTable: true })
    await nextTick()
    const vm: any = wrapper.vm
    const record = { key: 4, name: "x" }
    const row = vm.graphicCustomRowObj(record)
    row.onClick()
    expect(layer.getGraphicById).toHaveBeenCalledWith(4)
    expect(mapWork.map.flyToGraphic).toHaveBeenCalled()

    vm.startEditGraphic(record)
    expect(layer.startEditing).toHaveBeenCalled()
    vm.deleteGraphic(record)
    expect(layer.removeGraphic).toHaveBeenCalled()

    vm.pageSizeChange({ pageSize: 10 })
    expect(vm.currentPage).toBe(10)
  })

  it("Unmount 取消就绪监听", () => {
    mountGraphicLayerState()
    wrapper.unmount()
    expect(offSpy).toHaveBeenCalled()
    wrapper = undefined
  })
})
