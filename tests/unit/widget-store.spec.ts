import { beforeEach, describe, expect, it, vi } from "vitest"
import { defineComponent, h, nextTick } from "vue"
import { mount } from "@vue/test-utils"
import type { StoreOptions } from "vuex"
import { injectState, key, useWidget, useWidgetStore, type WidgetState } from "../../src/widgets/common/store/widget"
import storeConfig from "../../src/widgets/widget-store"

function baseOptions(): StoreOptions<WidgetState> {
  return {
    state: {
      widgets: [
        { name: "a", autoDisable: true },
        { name: "b", autoDisable: true },
        { name: "c", autoDisable: false }
      ],
      openAtStart: ["a"],
      defaultOption: { autoDisable: true, disableOther: false, meta: { fromDefault: 1 } }
    }
  }
}

function createWidgetStore(options: StoreOptions<WidgetState> = baseOptions()) {
  return injectState(options)
}

const Probe = defineComponent({
  setup() {
    const api = useWidget()
    ;(window as any).__widgetApi = api
    return () => h("div", { class: "probe" })
  }
})

function mountProbe(extraProvide: Record<any, any> = {}) {
  return mount(Probe, {
    global: {
      provide: { [key]: (window as any).__widgetStore, ...extraProvide }
    }
  })
}

/** onUpdate 内部依赖 onUnmounted，必须在 setup 期间注册才能验证清理 */
function mountHook(register: (api: any) => void, extraProvide: Record<any, any> = {}) {
  ;(window as any).__widgetApi = undefined
  const Hook = defineComponent({
    setup() {
      const api = useWidget()
      ;(window as any).__widgetApi = api
      register(api)
      return () => h("div")
    }
  })
  return mount(Hook, {
    global: {
      provide: { [key]: (window as any).__widgetStore, ...extraProvide }
    }
  })
}

describe("widget store · 初始化", () => {
  beforeEach(() => {
    console.warn = vi.fn()
    ;(window as any).__widgetStore = undefined
  })

  it("injectState 参数为空时抛错", () => {
    expect(() => injectState(undefined as any)).toThrow("injectState 参数不能为空")
  })

  it("state 为函数时展开为对象，并补全 widgets/openAtStart", () => {
    const options = {
      state: () => ({ widgets: [{ name: "a" }] })
    } as StoreOptions<WidgetState>
    const store = injectState(options)
    expect(store.state.openAtStart).toEqual([])
    expect(store.state.widgets).toHaveLength(1)
    expect(store.state.defaultOption).toEqual({ autoDisable: true, disableOther: false })
  })

  it("state 函数返回空时给出安全默认值", () => {
    const store = injectState({ state: () => undefined as any } as any)
    expect(store.state.widgets).toEqual([])
    expect(store.state.openAtStart).toEqual([])
  })

  it("按 openAtStart 初始化 visible，并合并 defaultOption / meta", () => {
    const store = createWidgetStore()
    const a = store.state.widgets.find((item) => item.name === "a")!
    const b = store.state.widgets.find((item) => item.name === "b")!
    expect(a.visible).toBe(true)
    expect(b.visible).toBe(false)
    expect(a.key).toBeTruthy()
    expect(a.meta).toEqual({ fromDefault: 1 })
    expect(store.state.defaultOption?.autoDisable).toBe(true)
  })

  it("覆盖 widgets 中自定义 autoDisable/group/disableOther，不影响默认项", () => {
    const options = baseOptions()
    ;(options.state as WidgetState).widgets = [{ name: "a", autoDisable: false, group: "g", disableOther: ["b"] }]
    const store = createWidgetStore(options)
    const widget = store.state.widgets[0]
    expect(widget.autoDisable).toBe(false)
    expect(widget.group).toBe("g")
    expect(widget.disableOther).toEqual(["b"])
  })

  it("addAlive 不重复追加", () => {
    const store = createWidgetStore()
    store.commit("addAlive", "a")
    store.commit("addAlive", "b")
    expect(store.state.openAtStart).toEqual(["a", "b"])
  })
})

describe("widget store · activate / disable", () => {
  let store: ReturnType<typeof injectState>

  beforeEach(() => {
    console.warn = vi.fn()
    store = createWidgetStore()
  })

  it("参数为空或缺少 name 时仅警告", async () => {
    await store.dispatch("activate", null)
    await store.dispatch("activate", "")
    await store.dispatch("activate", { name: "" })
    await store.dispatch("activate", { name: "missing" })
    expect(console.warn).toHaveBeenCalledTimes(4)
  })

  it("激活已存在 widget：nextTick 后可见、写入 data 并加入 openAtStart", async () => {
    await store.dispatch("activate", { name: "b", data: { props: { x: 1 } }, reload: true })
    await nextTick()
    const b = store.state.widgets.find((item) => item.name === "b")!
    expect(b.visible).toBe(true)
    expect(b.data).toEqual({ props: { x: 1 } })
    expect(store.state.openAtStart).toContain("b")
  })

  it("再次激活且 reload=true 时重置 key", async () => {
    const b = store.state.widgets.find((item) => item.name === "b")!
    await store.dispatch("activate", { name: "b", reload: true })
    await nextTick()
    const oldKey = b.key
    await store.dispatch("activate", { name: "b", reload: true })
    await nextTick()
    expect(b.key).not.toBe(oldKey)
  })

  it("同 group 互斥，不同 group 不关闭", async () => {
    const options = baseOptions()
    ;(options.state as WidgetState).widgets = [
      { name: "a", group: "g" },
      { name: "b", group: "g" },
      { name: "c", group: "other" }
    ]
    store = createWidgetStore(options)
    await store.dispatch("activate", { name: "a" })
    await store.dispatch("activate", { name: "b" })
    await store.dispatch("activate", { name: "c" })
    expect(store.state.widgets.find((item) => item.name === "a")!.visible).toBe(false)
    expect(store.state.widgets.find((item) => item.name === "b")!.visible).toBe(true)
    expect(store.state.widgets.find((item) => item.name === "c")!.visible).toBe(true)
  })

  it("disableOther 为数组时逐个关闭指定 widget 并清空 data", async () => {
    const options = baseOptions()
    ;(options.state as WidgetState).widgets = [
      { name: "a", disableOther: ["b"] },
      { name: "b", data: { temp: 1 }, visible: true }
    ]
    store = createWidgetStore(options)
    await store.dispatch("activate", { name: "a" })
    await nextTick()
    const b = store.state.widgets.find((item) => item.name === "b")!
    expect(b.visible).toBe(false)
    expect(b.data).toBeUndefined()
  })

  it("disableOther 为 true 时关闭其他 autoDisable 的 widget", async () => {
    const options = baseOptions()
    ;(options.state as WidgetState).widgets = [
      { name: "a", disableOther: true },
      { name: "b", autoDisable: true, visible: true },
      { name: "c", autoDisable: false, visible: true }
    ]
    store = createWidgetStore(options)
    await store.dispatch("activate", { name: "a" })
    await nextTick()
    expect(store.state.widgets.find((item) => item.name === "b")!.visible).toBe(false)
    expect(store.state.widgets.find((item) => item.name === "c")!.visible).toBe(true)
  })

  it("disable 不存在时无操作，存在时清空 data 并隐藏", async () => {
    const options = baseOptions()
    ;(options.state as WidgetState).widgets = [{ name: "a", data: { temp: 1 }, visible: true }]
    store = createWidgetStore(options)
    await store.dispatch("disable", "missing")
    expect(store.state.widgets[0].visible).toBe(true)
    await store.dispatch("disable", "a")
    expect(store.state.widgets[0].visible).toBe(false)
    expect(store.state.widgets[0].data).toBeUndefined()
  })

  it("disableAll 默认只关 autoDisable，hasAll 为 true 时全部关闭", async () => {
    const options = baseOptions()
    ;(options.state as WidgetState).widgets = [
      { name: "a", autoDisable: true, visible: true },
      { name: "b", autoDisable: true, visible: false },
      { name: "c", autoDisable: false, visible: true }
    ]
    store = createWidgetStore(options)
    await store.dispatch("disableAll", false)
    expect(store.state.widgets[0].visible).toBe(false)
    expect(store.state.widgets[2].visible).toBe(true)
    await store.dispatch("disableAll", true)
    expect(store.state.widgets[2].visible).toBe(false)
  })
})

describe("widget store · useWidget API", () => {
  let store: ReturnType<typeof injectState>

  beforeEach(() => {
    console.warn = vi.fn()
    store = createWidgetStore()
    ;(window as any).__widgetStore = store
    ;(window as any).__widgetApi = undefined
  })

  it("useWidgetStore 返回注入的 store", () => {
    const apiComp = defineComponent({
      setup() {
        ;(window as any).__store = useWidgetStore()
        return () => h("div")
      }
    })
    mount(apiComp, { global: { provide: { [key]: store } } })
    expect((window as any).__store).toBe(store)
  })

  it("getWidget 不存在返回 null，存在返回带 onUpdate 的副本并在卸载时解除订阅", () => {
    const nullWrapper = mountProbe()
    const api = (window as any).__widgetApi
    expect(api.currentWidget).toBeUndefined()
    expect(api.getWidget("missing")).toBeNull()
    nullWrapper.unmount()

    const cb = vi.fn()
    const wrapper = mountHook((hookApi) => {
      const widget = hookApi.getWidget("a")
      expect(widget.name).toBe("a")
      widget.onUpdate(cb)
    })
    api.updateWidget("a", 1, 2)
    expect(cb).toHaveBeenCalledWith(1, 2)
    wrapper.unmount()
    api.updateWidget("a", 3)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it("setVisible / isActivate 处理存在与不存在的 widget", () => {
    const wrapper = mountProbe()
    const api = (window as any).__widgetApi
    expect(api.isActivate("a")).toBe(true)
    expect(api.isActivate("missing")).toBe(false)
    api.setVisible("missing", true)
    expect(console.warn).toHaveBeenCalled()
    api.setVisible("b", true)
    expect(api.isActivate("b")).toBe(true)
    wrapper.unmount()
  })

  it("activate 支持字符串、对象与数组，disable 支持单个与数组", async () => {
    const wrapper = mountProbe()
    const api = (window as any).__widgetApi
    api.activate("b")
    api.activate({ name: "c", data: { props: { a: 1 } } })
    api.activate(["a", { name: "b" }], false)
    await nextTick()
    expect(api.isActivate("b")).toBe(true)
    expect(api.isActivate("c")).toBe(true)

    api.disable("a")
    api.disable(["b", "c"])
    await nextTick()
    expect(api.isActivate("a")).toBe(false)
    expect(api.isActivate("b")).toBe(false)
    expect(api.isActivate("c")).toBe(false)

    api.disableAll(true)
    await nextTick()
    expect(store.state.widgets.every((item) => !item.visible)).toBe(true)
    wrapper.unmount()
  })

  it("注入 getCurrentWidget 时提供 currentWidget，并可订阅卸载", async () => {
    const cb = vi.fn()
    const wrapper = mountHook(
      (api) => {
        expect(api.currentWidget.name).toBe("a")
        api.currentWidget.onUpdate(cb)
      },
      { getCurrentWidget: () => "a" }
    )
    const api = (window as any).__widgetApi
    api.updateWidget("a", "evt")
    expect(cb).toHaveBeenCalledWith("evt")
    wrapper.unmount()
    api.updateWidget("a", "after")
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it("getCurrentWidget 返回值不存在时 currentWidget 仅含 onUpdate", () => {
    const wrapper = mountProbe({ getCurrentWidget: () => "missing" })
    const api = (window as any).__widgetApi
    expect(api.currentWidget.name).toBeUndefined()
    expect(typeof api.currentWidget.onUpdate).toBe("function")
    wrapper.unmount()
  })
})

describe("widget-store 配置", () => {
  it("包含 mars2d 的五个示例 widget 与默认打开项", async () => {
    expect(storeConfig.state?.widgets?.map((item) => item.name)).toEqual([
      "query-poi",
      "manage-basemap",
      "manage-layers",
      "graphic-editor",
      "tools-button"
    ])
    expect(storeConfig.state?.openAtStart).toEqual(["tools-button"])
    const manage = storeConfig.state?.widgets?.filter((item) => item.group === "manage") || []
    expect(manage.map((item) => item.name)).toEqual(["manage-basemap", "manage-layers"])

    // 触发异步组件工厂，确保各 widget 组件模块可被解析
    // 注：首次冷转换需真实加载 mars2d 包，单次约 40s+，并行高负载时可能更慢，超时阈值放宽到 120s
    for (const widget of storeConfig.state?.widgets || []) {
      const comp: any = widget.component
      if (comp && typeof comp.__asyncLoader === "function") {
        await comp.__asyncLoader()
      }
    }
  }, 120000)
})
