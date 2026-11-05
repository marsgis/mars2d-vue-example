import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"

// ───────────────────────────────────────────────────────────
// 顶层 mock（vitest 会提升到文件顶部执行）
// 通过模块级变量在 beforeEach 中切换实现
// ───────────────────────────────────────────────────────────
const mocks = vi.hoisted(() => ({
  // pages/*/main.ts
  createApp: vi.fn(() => ({ mount: vi.fn(), use: vi.fn(), unmount: vi.fn() })),
  // pages/index/App.vue
  open: vi.fn(),
  // editor
  editorInstance: { on: vi.fn(), render: vi.fn() },
  Editor: vi.fn(function () {
    return mocks.editorInstance
  }),
  // editor 入口预校验示例配置
  getCompConfig: vi.fn(() => Promise.resolve({ hasPannel: false })),
  // mars-util
  getQueryString: vi.fn(),
  getExampleId: vi.fn(() => "test/example"),
  normalizeExampleId: vi.fn((id: string) => id),
  renderExampleEmptyState: vi.fn(),
  // mars-ui
  MarsUIInstall: vi.fn(),
  // widget store
  injectState: vi.fn(() => ({})),
  key: Symbol("widget-key"),
  useWidgetStore: vi.fn(() => ({ state: { widgets: [], openAtStart: [] } })),
  // map-work
  markMapWorkReady: vi.fn()
}))

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>()
  return { ...actual, createApp: mocks.createApp }
})

vi.mock("@marsgis/editor", () => ({
  Editor: mocks.Editor,
  Util: { getCompConfig: mocks.getCompConfig }
}))
vi.mock("@marsgis/editor/dist/editor.css", () => ({}))
vi.mock("@mars/components/mars-ui", () => ({ default: mocks.MarsUIInstall }))
vi.mock("@mars/components/mars-ui/common", () => ({}))
vi.mock("@mars/widgets/common/store/widget", () => ({
  injectState: mocks.injectState,
  key: mocks.key,
  useWidgetStore: mocks.useWidgetStore
}))
vi.mock("@mars/widgets/widget-store", () => ({ default: {} }))
vi.mock("@mars/utils/mars-util", () => ({
  getQueryString: mocks.getQueryString,
  getExampleId: mocks.getExampleId,
  normalizeExampleId: mocks.normalizeExampleId,
  renderExampleEmptyState: mocks.renderExampleEmptyState
}))
vi.mock("@mars/utils/map-work", () => ({ markMapWorkReady: mocks.markMapWorkReady }))
vi.mock("@mars/components/mars-work/example-list.vue", () => ({
  default: { name: "ExampleList", template: "<div />", emits: ["jump"] }
}))
vi.mock("@/components/mars-work/mars-head.vue", () => ({
  default: { name: "Head", template: "<div />", emits: ["clickNav"] }
}))
vi.mock("@mars/components/mars-work/main-operation.vue", () => ({
  default: { name: "MainOperation", template: "<div />", emits: ["childMounted"] }
}))
vi.mock("@mars/widgets/widget.vue", () => ({
  default: { name: "MarsWidget", template: "<div />", emits: ["update:visible"] }
}))
vi.mock("ant-design-vue", () => ({
  ConfigProvider: { name: "ConfigProvider", template: "<div><slot /></div>" }
}))
vi.mock("ant-design-vue/es/locale/zh_CN", () => ({ default: {} }))

beforeEach(() => {
  vi.clearAllMocks()
  window.history.replaceState({}, "", "/")
  mocks.createApp.mockReset()
  mocks.createApp.mockImplementation(() => ({
    mount: vi.fn(),
    use: vi.fn().mockReturnThis(),
    unmount: vi.fn()
  }))
  mocks.getQueryString.mockReset()
  mocks.getQueryString.mockReturnValue(null)
  mocks.getExampleId.mockReset()
  mocks.getExampleId.mockImplementation(() => "test/example")
  mocks.renderExampleEmptyState.mockReset()
  mocks.normalizeExampleId.mockImplementation((id: string) => id)
  mocks.useWidgetStore.mockReset()
  mocks.useWidgetStore.mockReturnValue({ state: { widgets: [], openAtStart: [] } })
  mocks.editorInstance = { on: vi.fn(), render: vi.fn() }
  mocks.getCompConfig.mockReset()
  mocks.getCompConfig.mockResolvedValue({ hasPannel: false })
  mocks.Editor.mockImplementation(function () {
    return mocks.editorInstance
  })
  vi.stubGlobal("open", mocks.open)
  delete (window as any).marsEditor
  delete (window as any).mapWork
  delete (window as any)._mapInstance
  delete process.env.EDITOR_MODE
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

// ───────────────────────────────────────────────────────────
// pages/index/main.ts
// ───────────────────────────────────────────────────────────
describe("pages/index/main.ts", () => {
  it("创建应用并挂载到 #app", async () => {
    const mountFn = vi.fn()
    mocks.createApp.mockReturnValue({ mount: mountFn })
    await import("../../src/pages/index/main")
    expect(mocks.createApp).toHaveBeenCalledTimes(1)
    expect(mountFn).toHaveBeenCalledWith("#app")
  })
})

// ───────────────────────────────────────────────────────────
// pages/index/App.vue
// ───────────────────────────────────────────────────────────
describe("pages/index/App.vue", () => {
  it("jumpUrl 按 EDITOR_MODE 生成 editor-vue / read-vue 地址", async () => {
    process.env.BASE_URL = "/"

    process.env.EDITOR_MODE = "1"
    const { default: App } = await import("../../src/pages/index/App.vue")
    const wrapper = mount(App)
    wrapper.vm.jumpUrl({ id: "k", main: "map/create/options" })
    expect(mocks.open).toHaveBeenLastCalledWith("/editor-vue.html?key=k&id=map/create/options", "_blank")

    delete process.env.EDITOR_MODE
    wrapper.vm.jumpUrl({ id: "k2", main: "map/a b", params: "a=1&b=2" })
    expect(mocks.open).toHaveBeenLastCalledWith("/read-vue.html?key=k2&id=map/a%20b&a=1&b=2", "_blank")
    wrapper.unmount()
  })

  it("clickNav 带 page 时显示 iframe，否则隐藏", async () => {
    const { default: App } = await import("../../src/pages/index/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()

    wrapper.vm.clickNav({ page: "https://example.com" })
    expect(wrapper.vm.showIframe).toBe(true)
    expect(wrapper.vm.iframeSrc).toBe("https://example.com")
    await wrapper.vm.$nextTick()
    expect(wrapper.find("iframe").exists()).toBe(true)

    wrapper.vm.clickNav({})
    expect(wrapper.vm.showIframe).toBe(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.find("iframe").exists()).toBe(false)
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// pages/read/main.ts
// ───────────────────────────────────────────────────────────
describe("pages/read/main.ts", () => {
  it("缺少 id 时渲染空态并中止", async () => {
    mocks.getQueryString.mockReturnValue(null)
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    expect(mocks.renderExampleEmptyState).toHaveBeenCalledWith(null)
    expect(mocks.editorInstance.render).not.toHaveBeenCalled()
  })

  it("#root 不存在时直接返回", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/x" : null))
    document.body.innerHTML = '<div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    expect(mocks.editorInstance.render).not.toHaveBeenCalled()
    expect(mocks.renderExampleEmptyState).not.toHaveBeenCalled()
  })

  it("存在 id 时调用 marsEditor.render 并注册 loaded", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/y" : key === "key" ? "k" : null))
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    expect(document.oncontextmenu).toBeTypeOf("function")
    const ev = new MouseEvent("contextmenu", { cancelable: true })
    document.dispatchEvent(ev)
    expect(ev.defaultPrevented).toBe(true)

    expect(mocks.editorInstance.render).toHaveBeenCalledWith({
      container: document.getElementById("root"),
      exampleId: "map/y",
      exampleKey: "k"
    })
    expect((window as any).marsEditor).toBe(mocks.editorInstance)
  })

  it("loaded 有面板与无面板分支，重复触发会销毁旧 UI", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/z" : null))
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    const loadedCb = (mocks.editorInstance.on as any).mock.calls.find((c: any[]) => c[0] === "loaded")[1]

    // hasPannel=false 走简单占位分支（无面板）
    loadedCb({ hasPannel: false })
    const app1 = mocks.createApp.mock.results[0].value
    expect(mocks.createApp.mock.calls[0][0].template).toBe("<div></div>")
    expect(app1.use).not.toHaveBeenCalled()
    expect(mocks.MarsUIInstall).toHaveBeenCalledWith(app1)
    expect(app1.mount).toHaveBeenCalledWith("#mars-ui-root")

    // 第二次 loaded 先销毁旧 UI，再按 hasPannel=true 走完整应用分支
    loadedCb({ hasPannel: true })
    expect(app1.unmount).toHaveBeenCalled()
    const app2 = mocks.createApp.mock.results[1].value
    expect(app2.use).toHaveBeenCalled()
    expect(mocks.MarsUIInstall).toHaveBeenCalledWith(app2)
    expect(app2.mount).toHaveBeenCalledWith("#mars-ui-root")
  })
})

// ───────────────────────────────────────────────────────────
// pages/editor/main.ts
// ───────────────────────────────────────────────────────────
describe("pages/editor/main.ts", () => {
  it("editor 入口接收 code/full 参数并渲染", async () => {
    mocks.getQueryString.mockImplementation((key: string) =>
      key === "id" ? "test/example" : key === "code" ? "abc" : key === "full" ? "1" : key === "key" ? "k" : null
    )
    mocks.getCompConfig.mockResolvedValue({ hasPannel: true })
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    const ev = new MouseEvent("contextmenu", { cancelable: true })
    document.dispatchEvent(ev)
    expect(ev.defaultPrevented).toBe(true)
    await vi.waitFor(() =>
      expect(mocks.editorInstance.render).toHaveBeenCalledWith({
        container: document.getElementById("root"),
        exampleId: "test/example",
        exampleKey: "k"
      })
    )
    expect((window as any).marsEditor).toBe(mocks.editorInstance)
  })

  it("缺少 id 时渲染空态并中止", async () => {
    mocks.getQueryString.mockReturnValue(null)
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    await vi.waitFor(() => expect(mocks.renderExampleEmptyState).toHaveBeenCalledWith(null))
    expect(mocks.editorInstance.render).not.toHaveBeenCalled()
    expect(mocks.getCompConfig).not.toHaveBeenCalled()
  })

  it("示例配置不存在时渲染空态并中止", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "test/missing" : null))
    mocks.getCompConfig.mockResolvedValue(null)
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    await vi.waitFor(() => expect(mocks.renderExampleEmptyState).toHaveBeenCalledWith("test/missing"))
    expect(mocks.editorInstance.render).not.toHaveBeenCalled()
  })

  it("loaded 有面板与无面板分支，重复触发会销毁旧 UI", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "test/example" : null))
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    await vi.waitFor(() => expect(mocks.editorInstance.render).toHaveBeenCalled())
    const loadedCb = (mocks.editorInstance.on as any).mock.calls.find((c: any[]) => c[0] === "loaded")[1]

    // hasPannel=false 走简单占位分支（无面板）
    loadedCb({ hasPannel: false })
    const app1 = mocks.createApp.mock.results[0].value
    expect(mocks.createApp.mock.calls[0][0].template).toBe("<div></div>")
    expect(app1.use).not.toHaveBeenCalled()
    expect(mocks.MarsUIInstall).toHaveBeenCalledWith(app1)
    expect(app1.mount).toHaveBeenCalledWith("#mars-ui-root")

    // 第二次 loaded 先销毁旧 UI，再按 hasPannel=true 走完整应用分支
    loadedCb({ hasPannel: true })
    expect(app1.unmount).toHaveBeenCalled()
    const app2 = mocks.createApp.mock.results[1].value
    expect(app2.use).toHaveBeenCalled()
    expect(mocks.MarsUIInstall).toHaveBeenCalledWith(app2)
    expect(app2.mount).toHaveBeenCalledWith("#mars-ui-root")
  })
})

// ───────────────────────────────────────────────────────────
// pages/editor|read App.vue onChildMounted
// ───────────────────────────────────────────────────────────
function mountWorkApp(path: "../../src/pages/editor/App.vue" | "../../src/pages/read/App.vue") {
  return import(path).then(({ default: App }) => mount(App))
}

describe.each([
  ["editor", "../../src/pages/editor/App.vue"],
  ["read", "../../src/pages/read/App.vue"]
] as const)("pages/%s/App.vue onChildMounted", (_name, path) => {
  it("首次挂载触发 useLifecycle 并标记就绪", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 1 }
    ;(window as any)._mapInstance = { id: "map" }
    const wrapper = await mountWorkApp(path)
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    vm.onChildMounted()
    expect(useLifecycle).toHaveBeenCalledTimes(1)
    expect(mocks.markMapWorkReady).toHaveBeenCalledTimes(1)
    expect(vm.mapLoaded).toBe(true)
    vm.onChildMounted()
    expect(useLifecycle).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it("useLifecycle 抛错时仍标记就绪", async () => {
    const err = new Error("boom")
    const useLifecycle = vi.fn(() => {
      throw err
    })
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 3 }
    const wrapper = await mountWorkApp(path)
    await wrapper.vm.$nextTick()
    ;(wrapper.vm as any).onChildMounted()
    expect(errorSpy).toHaveBeenCalledWith("[example] mapWork.onMounted 执行失败", err)
    expect(mocks.markMapWorkReady).toHaveBeenCalledTimes(1)
    errorSpy.mockRestore()
    wrapper.unmount()
  })

  it("mapLoaded 后渲染 openAtStart 的 widget，且 getMapInstance 返回地图实例", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 10 }
    ;(window as any)._mapInstance = { id: "map-instance" }
    mocks.useWidgetStore.mockReturnValue({
      state: {
        widgets: [
          { name: "w1", visible: true, key: "k1" },
          { name: "w2", visible: true, key: "k2" }
        ],
        openAtStart: ["w1"]
      }
    })
    let getMapInstanceFn: any = null
    const { default: App } = await import(path)
    const wrapper = mount(App, {
      global: {
        stubs: {
          MainOperation: {
            name: "MainOperation",
            inject: ["getMapInstance"],
            template: "<div />",
            created() {
              getMapInstanceFn = (this as any).getMapInstance
            }
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    vm.onChildMounted()
    await wrapper.vm.$nextTick()

    // 仅 openAtStart 中的 widget 被渲染
    const widgets = wrapper.findAllComponents({ name: "MarsWidget" })
    expect(widgets.length).toBe(1)
    expect(getMapInstanceFn()).toEqual({ id: "map-instance" })
    // v-model:visible 回写
    widgets[0].vm.$emit("update:visible", false)
    await wrapper.vm.$nextTick()
    expect(vm.widgets[0].visible).toBe(false)
    wrapper.unmount()
  })
})
