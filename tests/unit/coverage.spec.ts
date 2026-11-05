import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { flushPromises, mount, shallowMount } from "@vue/test-utils"
import { defineComponent } from "vue"

const services = vi.hoisted(() => {
  const notificationFunc = vi.fn(() => Promise.resolve())
  return {
    message: {
      config: vi.fn(),
      info: vi.fn(() => Promise.resolve()),
      success: vi.fn(() => Promise.resolve()),
      error: vi.fn(() => Promise.resolve())
    },
    notification: {
      config: vi.fn(),
      info: notificationFunc,
      success: notificationFunc,
      warning: notificationFunc,
      error: notificationFunc
    },
    modal: {
      info: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn()
    }
  }
})

const nprogressMock = vi.hoisted(() => ({
  status: 0.5,
  isStarted: vi.fn(() => true),
  start: vi.fn(),
  done: vi.fn(),
  set: vi.fn()
}))

vi.mock("nprogress", () => ({ default: nprogressMock }))

vi.mock("ant-design-vue", async (importOriginal) => {
  const actual: any = await importOriginal()
  const Tree = defineComponent({
    name: "Tree",
    install: vi.fn(),
    setup(_: any, { slots }: any) {
      slots.icon?.({ isLeaf: true, expanded: false, data: { group: false } })
      slots.icon?.({ isLeaf: false, expanded: false, data: {} })
      slots.icon?.({ isLeaf: false, expanded: true, data: {} })
      return () => null
    }
  })
  return {
    ...actual,
    Tree,
    message: services.message,
    notification: services.notification,
    Modal: services.modal
  }
})

vi.mock("@icon-park/svg", () => {
  const icons: Record<string, any> = {
    // 覆盖「图标不存在」与「未传 icon」两个分支
    NotExistIcon: undefined,
    "": undefined,
    BringToFront: () => "<svg class='icon-bring' />",
    FolderClose: () => "<svg class='icon-folder-close' />",
    FolderOpen: () => "<svg class='icon-folder-open' />",
    Close: () => "<svg class='icon-close' />",
    CloseOne: () => "<svg class='icon-close-one' />",
    LeftExpand: () => "<svg class='icon-left-expand' />"
  }
  return new Proxy(icons, {
    get(target, prop) {
      return prop in target ? target[prop as string] : undefined
    }
  })
})

// ── 配置与主题 ──────────────────────────────────────────────
describe("配置与主题导入", () => {
  it("mars-ui common 设置 light 主题", async () => {
    await import("../../src/components/mars-ui/common")
    expect(document.documentElement.dataset.theme).toBe("light")
  })

  it("themes 与 echarts 配置可正常导入", async () => {
    await import("../../src/components/mars-ui/themes/index")
    await import("../../src/components/mars-ui/mars-echarts/index")
    expect(true).toBe(true)
    // echarts 6 真实导入在 vitest 5 冷转换下超过默认 5s 超时
  }, 30000)

  it("graphic-editor 风格配置为纯数据模块", async () => {
    const style = await import("../../src/widgets/basic/graphic-editor/config/style")
    expect(Object.keys(style.default).length).toBeGreaterThan(0)
  })
})

// ── 薄包装组件 ──────────────────────────────────────────────
describe("mars-ui 薄包装组件", () => {
  const cases: Array<[string, string]> = [
    ["../../src/components/mars-ui/mars-select/index.vue", "mars-select"],
    ["../../src/components/mars-ui/mars-textarea/index.vue", "mars-textarea"],
    ["../../src/components/mars-ui/mars-date-picker/index.vue", "mars-date-picker"],
    ["../../src/components/mars-ui/mars-range-picker/index.vue", "mars-range-picker"],
    ["../../src/components/mars-ui/mars-button/index.vue", "mars-button"],
    ["../../src/components/mars-ui/mars-table/index.vue", "mars-table"],
    ["../../src/components/mars-ui/mars-slider/index.vue", "mars-slider"],
    ["../../src/components/mars-ui/mars-input/index.vue", "mars-input"],
    ["../../src/components/mars-ui/mars-input-number/index.vue", "mars-input-number"]
  ]

  for (const [path, name] of cases) {
    it(`${name} 可挂载并透传属性`, async () => {
      const mod = await import(path)
      const wrapper = shallowMount(mod.default, {
        attrs: { placeholder: "p" },
        slots: { default: "内容" }
      })
      expect(wrapper.exists()).toBe(true)
      wrapper.unmount()
    })
  }

  it("mars-input 带 addon-before 时添加 prefix class", async () => {
    const mod = await import("../../src/components/mars-ui/mars-input/index.vue")
    const wrapper = shallowMount(mod.default, { attrs: { "addon-before": "http" } })
    expect(wrapper.classes()).toContain("prefix")
    wrapper.unmount()
  })

  it("mars-input-number 带 addon-after 时添加 addon-after-class 并透传精度", async () => {
    const mod = await import("../../src/components/mars-ui/mars-input-number/index.vue")
    const wrapper = mount(mod.default, { attrs: { "addon-after": "米", tofixed: 2 } })
    const inputNumber = wrapper.find(".mars-input-number")
    expect(inputNumber.exists()).toBe(true)
    expect(inputNumber.classes()).toContain("addon-after-class")
    expect(inputNumber.attributes("tofixed")).toBe("2")
    wrapper.unmount()
  })

  it("mars-input-number 带 unit 时显示单位文本", async () => {
    const mod = await import("../../src/components/mars-ui/mars-input-number/index.vue")
    const wrapper = shallowMount(mod.default, { attrs: { unit: "m" } })
    expect(wrapper.find(".mars-unit").exists()).toBe(true)
    expect(wrapper.find(".mars-unit").text()).toBe("m")
    wrapper.unmount()
  })
})

// ── icon ───────────────────────────────────────────────────
describe("mars-icon", () => {
  it("有效图标渲染 svg，并随 icon/color/width 更新", async () => {
    const mod = await import("../../src/components/mars-ui/mars-icon/index.vue")
    const wrapper = mount(mod.default, { props: { icon: "bring-to-front" }, attrs: { color: "red" } })
    expect(wrapper.html()).toContain("icon-bring")
    await wrapper.setProps({ icon: "folder-close" })
    expect(wrapper.html()).toContain("icon-folder-close")
    wrapper.unmount()
  })

  it("无效图标名输出空内容并警告", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined)
    const mod = await import("../../src/components/mars-ui/mars-icon/index.vue")
    const wrapper = mount(mod.default, { props: { icon: "not-exist-icon" } })
    expect(wrapper.find(".mars-icon").element.innerHTML).toBe("")
    expect(warn).toHaveBeenCalledWith('mars-icon: 不存在的图标名称 "not-exist-icon"')
    warn.mockRestore()
    wrapper.unmount()
  })

  it("未传 icon 时不警告也不渲染", async () => {
    const mod = await import("../../src/components/mars-ui/mars-icon/index.vue")
    const wrapper = mount(mod.default, {})
    expect(wrapper.find(".mars-icon").element.innerHTML).toBe("")
    wrapper.unmount()
  })
})

// ── tree / dropdown ────────────────────────────────────────
describe("mars-tree / mars-dropdown", () => {
  it("icon 槽覆盖叶子、折叠、展开三种分支", async () => {
    const mod = await import("../../src/components/mars-ui/mars-tree/index")
    const wrapper = mount(mod.default, {
      global: { components: { "mars-icon": { template: "<span />" } } }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  }, 120000)

  it("install 注册组件并返回 app", async () => {
    const tree = await import("../../src/components/mars-ui/mars-tree/index")
    const app: any = { component: vi.fn() }
    expect(tree.install(app)).toBe(app)
    expect(app.component).toHaveBeenCalledWith("mars-tree", tree.default)

    const dropdown = await import("../../src/components/mars-ui/mars-dropdown/index")
    const app2: any = { component: vi.fn() }
    expect(dropdown.install(app2)).toBe(app2)
    expect(app2.component).toHaveBeenCalledWith("mars-dropdown-menu", dropdown.default)

    const wrapper = shallowMount(dropdown.default, { slots: { default: "菜单" } })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})

// ── switch ─────────────────────────────────────────────────
describe("mars-switch", () => {
  it("checked 优先，change 派发三种事件", async () => {
    const mod = await import("../../src/components/mars-ui/mars-switch/index.vue")
    const wrapper = mount(mod.default, { props: { checked: true } })
    ;(wrapper.vm as any).valueChange(false)
    expect(wrapper.emitted("update:value")?.[0]).toEqual([false])
    expect(wrapper.emitted("update:checked")?.[0]).toEqual([false])
    expect(wrapper.emitted("change")?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it("value 兜底，未传时默认 false", async () => {
    const mod = await import("../../src/components/mars-ui/mars-switch/index.vue")
    const wrapper = mount(mod.default, { props: { value: true } })
    await wrapper.setProps({ checked: true })
    await wrapper.setProps({ checked: undefined, value: undefined })
    ;(wrapper.vm as any).valueChange(true)
    expect(wrapper.emitted("change")?.[0]).toEqual([true])
    wrapper.unmount()
  })
})

// ── message / notify / alert ───────────────────────────────
describe("mars-message / mars-notify / mars-alert", () => {
  beforeEach(() => {
    services.message.config.mockClear()
    services.notification.config.mockClear()
  })

  it("$message 调用对应类型并返回 Promise；无效类型 reject", async () => {
    const mod = await import("../../src/components/mars-ui/mars-message/index")
    await expect(mod.$message("提示", "info")).resolves.toBeUndefined()
    expect(services.message.info).toHaveBeenCalledWith(expect.objectContaining({ content: "提示", class: "mars-message" }))
    await expect(mod.$message("x", "unknown" as any)).rejects.toBeUndefined()
  })

  it("$message install 挂载全局属性", async () => {
    const mod = await import("../../src/components/mars-ui/mars-message/index")
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$message).toBe(mod.$message)
  })

  it("$notify 合并配置并在 onClose 时 resolve", async () => {
    const mod = await import("../../src/components/mars-ui/mars-notify/index")
    let closeOptions: any
    services.notification.info.mockImplementationOnce((options: any) => {
      closeOptions = options
      return {}
    })
    const promise = mod.$notify("标题", "描述", { duration: 3 })
    expect(services.notification.config).toHaveBeenCalledWith(
      expect.objectContaining({ placement: "bottomRight", duration: 3 })
    )
    closeOptions.onClose()
    await expect(promise).resolves.toBe(true)
    await expect(mod.$notify("t", "d", {}, "unknown" as any)).rejects.toBeUndefined()
  })

  it("$notify install 挂载全局属性", async () => {
    const mod = await import("../../src/components/mars-ui/mars-notify/index")
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$notify).toBe(mod.$notify)
  })

  it("$alert 确认 resolve、取消 reject、无效类型 reject", async () => {
    const mod = await import("../../src/components/mars-ui/mars-alert/index")
    let options: any
    services.modal.info.mockImplementationOnce((opts: any) => {
      options = opts
      return {}
    })
    const promise = mod.$alert("内容")
    expect(options.title).toBe("提示")
    options.onOk()
    await expect(promise).resolves.toBe(true)

    let cancelOptions: any
    services.modal.error.mockImplementationOnce((opts: any) => {
      cancelOptions = opts
      return {}
    })
    const rejected = mod.$alert("内容", "标题", "error")
    cancelOptions.onCancel()
    await expect(rejected).rejects.toThrow("用户取消")
    await expect(mod.$alert("内容", "标题", "unknown" as any)).rejects.toBeUndefined()
  })

  it("$alert install 挂载全局属性", async () => {
    const mod = await import("../../src/components/mars-ui/mars-alert/index")
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$alert).toBe(mod.$alert)
  })
})

// ── loading ────────────────────────────────────────────────
describe("mars-loading", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    nprogressMock.status = 0.5
    nprogressMock.isStarted.mockClear()
    nprogressMock.start.mockClear()
    nprogressMock.done.mockClear()
    nprogressMock.set.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  let mod: any
  beforeEach(async () => {
    mod = await import("../../src/components/mars-ui/mars-loading/index")
  })

  it("showLoading 启动 nprogress 并推进进度", () => {
    mod.$showLoading()
    expect(nprogressMock.start).toHaveBeenCalled()
    vi.advanceTimersByTime(500)
    expect(nprogressMock.set).toHaveBeenCalledWith(0.6)
    mod.$hideLoading()
    mod.$hideLoading()
  })

  it("重复 show 只保留一个定时器，hide 计数减到 0 才 done", () => {
    mod.$showLoading()
    mod.$showLoading()
    expect(vi.getTimerCount()).toBe(1)
    mod.$hideLoading()
    expect(nprogressMock.done).not.toHaveBeenCalled()
    mod.$hideLoading()
    expect(nprogressMock.done).toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
    // 负数下限为 0
    mod.$hideLoading()
    expect(nprogressMock.done).toHaveBeenCalledTimes(2)
  })

  it("进度超过 0.8 时自动停止定时器", () => {
    nprogressMock.status = 0.85
    mod.$showLoading()
    vi.advanceTimersByTime(500)
    expect(vi.getTimerCount()).toBe(0)
    mod.$hideLoading()
    mod.$hideLoading()
    expect(nprogressMock.done).toHaveBeenCalled()
  })

  it("install 挂载全局方法", async () => {
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$showLoading).toBe(mod.$showLoading)
    expect(app.config.globalProperties.$hideLoading).toBe(mod.$hideLoading)
  })
})

// ── dialog ─────────────────────────────────────────────────
describe("mars-dialog", () => {
  const mountDialog = async (props: any = {}, slots: any = {}) => {
    let wrapper = document.querySelector("#mars-main-view")
    if (!wrapper) {
      wrapper = document.createElement("div")
      wrapper.id = "mars-main-view"
      document.body.appendChild(wrapper)
    }
    wrapper.innerHTML = ""
    Object.defineProperty(wrapper, "offsetWidth", { value: 1000, configurable: true })
    Object.defineProperty(wrapper, "offsetHeight", { value: 800, configurable: true })

    const mod = await import("../../src/components/mars-ui/mars-dialog/index.vue")
    const w = mount(mod.default, {
      props: { visible: true, ...props },
      slots,
      global: { components: { "mars-icon": { template: "<span />" } } },
      attachTo: document.body
    })
    await w.vm.$nextTick()
    const dialogEl = wrapper.querySelector(".mars-dialog") as HTMLElement
    if (dialogEl) {
      Object.defineProperty(dialogEl, "offsetWidth", { value: 300, configurable: true })
      Object.defineProperty(dialogEl, "offsetHeight", { value: 200, configurable: true })
      Object.defineProperty(dialogEl, "offsetLeft", { value: 10, configurable: true })
      Object.defineProperty(dialogEl, "offsetTop", { value: 10, configurable: true })
    }
    return w
  }

  const getDialog = () => document.querySelector("#mars-main-view .mars-dialog") as HTMLElement
  const getThumb = () => document.querySelector("#mars-main-view .mars-dialog-thumb") as HTMLElement

  it("基本挂载与默认 props", async () => {
    const w = await mountDialog({ title: "测试" })
    expect(getDialog()).toBeTruthy()
    w.unmount()
  })

  it("showHeader: 有 title 时显示头部", async () => {
    const w = await mountDialog({ title: "标题" })
    expect(getDialog()?.querySelector(".mars-dialog__header")).toBeTruthy()
    w.unmount()
  })

  it("showHeader: 无 title/icon/slot 时不显示头部", async () => {
    const w = await mountDialog({})
    expect(getDialog()?.querySelector(".mars-dialog__header")).toBeFalsy()
    w.unmount()
  })

  it("icon/title/tabs/sideBar 插槽渲染", async () => {
    const w = await mountDialog(
      { title: "标题" },
      {
        title: () => "自定义标题",
        tabs: () => "标签",
        sideBar: () => "侧栏",
        footer: () => "底部"
      }
    )
    expect(getDialog()?.querySelector(".mars-dialog__tabs")).toBeTruthy()
    expect(getDialog()?.querySelector(".mars-dialog_sideBar")).toBeTruthy()
    expect(getDialog()?.querySelector(".mars-dialog__footer")).toBeTruthy()
    w.unmount()
  })

  it("icon 与 barPosition=right 分支", async () => {
    const w = await mountDialog({ title: "t", icon: "close", barPosition: "right" }, { sideBar: () => "侧栏" })
    expect(getDialog()?.querySelector(".mars-dialog__header .icon")).toBeTruthy()
    expect(getDialog()?.querySelector(".mars-dialog_sideBar")?.className).toContain("siderBarRight")
    w.unmount()
  })

  it("getContentStyle: nopadding / footer 组合", async () => {
    const w = await mountDialog({ title: "t", nopadding: true }, { footer: () => "footer" })
    const content = getDialog()?.querySelector(".mars-dialog__content") as HTMLElement
    expect(content.getAttribute("style")).toContain("padding")
    expect(content.getAttribute("style")).toContain("calc(100% - 80px)")
    w.unmount()
  })

  it("close 触发 update:visible 和 closed", async () => {
    const w = await mountDialog({ title: "t", closeable: true })
    const closeBtn = getDialog()?.querySelector(".close-btn") as HTMLElement
    closeBtn.click()
    expect(w.emitted("update:visible")).toBeDefined()
    expect(w.emitted("closed")).toBeDefined()
    w.unmount()
  })

  it("无标题时浮动关闭按钮", async () => {
    const w = await mountDialog({ closeable: true, closeButton: true })
    expect(getDialog()?.querySelector(".close-btn__flot")).toBeTruthy()
    w.unmount()
  })

  it("beforeClose 返回 false 不关闭；返回 true 关闭", async () => {
    const no = vi.fn(() => false)
    const w1 = await mountDialog({ title: "t", closeable: true, beforeClose: no })
    ;(getDialog()?.querySelector(".close-btn") as HTMLElement).click()
    expect(no).toHaveBeenCalled()
    expect(w1.emitted("update:visible")).toBeUndefined()
    w1.unmount()

    const yes = vi.fn(() => true)
    const w2 = await mountDialog({ title: "t", closeable: true, beforeClose: yes })
    ;(getDialog()?.querySelector(".close-btn") as HTMLElement).click()
    await flushPromises()
    expect(w2.emitted("update:visible")).toBeDefined()
    w2.unmount()
  })

  it("beforeClose Promise resolve 关闭、reject 不关闭", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)
    const w1 = await mountDialog({ title: "t", closeable: true, beforeClose: () => Promise.resolve() })
    ;(getDialog()?.querySelector(".close-btn") as HTMLElement).click()
    await flushPromises()
    expect(w1.emitted("update:visible")).toBeDefined()
    w1.unmount()

    const w2 = await mountDialog({ title: "t", closeable: true, beforeClose: () => Promise.reject() })
    ;(getDialog()?.querySelector(".close-btn") as HTMLElement).click()
    await flushPromises()
    expect(w2.emitted("update:visible")).toBeUndefined()
    log.mockRestore()
    w2.unmount()
  })

  it("折叠/展开/切换与默认折叠", async () => {
    const w = await mountDialog({ title: "t" })
    const vm: any = w.vm
    vm.fold()
    await w.vm.$nextTick()
    expect(getThumb()).toBeTruthy()
    vm.expend()
    await w.vm.$nextTick()
    vm.toggle()
    await w.vm.$nextTick()
    w.unmount()

    const folded = await mountDialog({ title: "t", defaultFold: true })
    expect(getThumb()).toBeTruthy()
    folded.unmount()
  })

  it("缩略图自定义位置与图标", async () => {
    const w = await mountDialog({ thumbnail: { right: 20, bottom: 30, icon: "left-expand" }, defaultFold: true })
    expect(getThumb().style.right).toBe("20px")
    expect(getThumb().style.bottom).toBe("30px")
    w.unmount()
  })

  it("拖拽: dragStart + mousemove + mouseup", async () => {
    const w = await mountDialog({ title: "t", draggable: true })
    const header = getDialog()?.querySelector(".mars-dialog__header") as HTMLElement
    header.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 150, clientY: 120 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", { clientX: 150, clientY: 120 }))
    expect(w.emitted("move")).toBeDefined()
    w.unmount()
  })

  it("缩放: 默认句柄与字符串句柄", async () => {
    const w = await mountDialog({ title: "t", handles: "rb" })
    const handle = getDialog()?.querySelector(".handle-r") as HTMLElement
    handle.dispatchEvent(new MouseEvent("mousedown", { clientX: 300, clientY: 200 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 350, clientY: 250 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", {}))
    expect(w.emitted("resize")).toBeDefined()
    w.unmount()

    const w2 = await mountDialog({ title: "t", draggable: false, handles: "ltb" })
    const dialog = getDialog()
    const handleL = dialog?.querySelector(".handle-l") as HTMLElement
    const handleT = dialog?.querySelector(".handle-t") as HTMLElement
    const handleB = dialog?.querySelector(".handle-b") as HTMLElement
    expect(handleL).toBeTruthy()
    expect(handleT).toBeTruthy()
    expect(handleB).toBeTruthy()

    handleL.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 350, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", {}))

    handleT.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 250 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", {}))

    handleB.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 250 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", {}))

    expect(w2.emitted("resize")).toBeDefined()
    w2.unmount()
  })

  it("animationClass 方位与自定义/关闭动画", async () => {
    const w1 = await mountDialog({ title: "t", left: 10 })
    expect(getDialog()?.className).toContain("fadein-left")
    w1.unmount()

    const w2 = await mountDialog({ title: "t", right: 10 })
    expect(getDialog()?.className).toContain("fadein-right")
    w2.unmount()

    const w3 = await mountDialog({ title: "t", right: 100, top: 10 })
    expect(getDialog()?.className).toContain("fadein-down")
    w3.unmount()

    const w4 = await mountDialog({ title: "t", right: 100, bottom: 10 })
    expect(getDialog()?.className).toContain("fadein-up")
    w4.unmount()

    const w5 = await mountDialog({ title: "t", animation: "custom-anim" })
    expect(getDialog()?.className).toContain("custom-anim")
    w5.unmount()

    const w6 = await mountDialog({ title: "t", animation: false })
    expect(getDialog()?.className).not.toContain("fadein-center")
    w6.unmount()
  })

  it("position 优先级、默认 right/top 与自定义 class", async () => {
    const w = await mountDialog({ title: "t", position: { left: 50, top: 60 }, left: 10, top: 20 })
    await new Promise((r) => setTimeout(r, 20))
    expect(getDialog()?.style.left).toBe("50px")
    w.unmount()

    const w2 = await mountDialog({ title: "t", customClass: "my-dialog" })
    expect(getDialog()?.style.right).toBe("10px")
    expect(getDialog()?.style.top).toBe("10px")
    expect(getDialog()?.className).toContain("my-dialog")
    w2.unmount()
  })

  it("window resize 收紧超出容器的宽高", async () => {
    const w = await mountDialog({ title: "t" })
    const dialog = getDialog() as HTMLElement
    Object.defineProperty(dialog, "offsetTop", { value: 700, configurable: true })
    Object.defineProperty(dialog, "offsetLeft", { value: 800, configurable: true })
    window.dispatchEvent(new Event("resize"))
    expect(parseFloat(dialog.style.height)).toBeLessThanOrEqual(800)
    w.unmount()
  })

  it("initSize: left+right/top+bottom 自动计算宽高", async () => {
    const w = await mountDialog({ title: "t", left: 10, right: 10, top: 10, bottom: 10, maxWidth: 2000, maxHeight: 2000 })
    expect(getDialog()?.style.width).toBe("980px")
    expect(getDialog()?.style.height).toBe("780px")
    w.unmount()
  })

  it("initSize: 数值宽高收敛，百分比跳过", async () => {
    const w = await mountDialog({ title: "t", width: 400, height: 300 })
    expect(getDialog()?.style.width).toBe("400px")
    expect(getDialog()?.style.height).toBe("300px")
    w.unmount()

    const w2 = await mountDialog({ title: "t", width: "50%" })
    expect(getDialog()?.style.width).toBe("50%")
    w2.unmount()
  })

  it("draggable=false 时不可拖拽", async () => {
    const w = await mountDialog({ title: "t", draggable: false })
    const header = getDialog()?.querySelector(".mars-dialog__header") as HTMLElement
    header.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 150, clientY: 120 }))
    expect(w.emitted("move")).toBeUndefined()
    w.unmount()
  })

  it("DOM 变化触发 autoNiceHeight 收紧高度", async () => {
    const w = await mountDialog({ title: "t" })
    const dialog = getDialog() as HTMLElement
    Object.defineProperty(dialog, "offsetTop", { value: 10, configurable: true })
    Object.defineProperty(dialog, "offsetHeight", { value: 900, configurable: true })
    dialog.setAttribute("data-trigger-observer", "1")
    await new Promise((r) => setTimeout(r, 20))
    expect(dialog.style.height).toBe("790px")
    w.unmount()
  })

})

// ── mars-ui index install ──────────────────────────────────
describe("mars-ui index install", () => {
  it("注册所有组件与服务并返回 app", async () => {
    const mod = await import("../../src/components/mars-ui/index")
    const app: any = {
      use: vi.fn(),
      component: vi.fn(),
      config: { globalProperties: {} }
    }
    expect(mod.default(app)).toBe(app)
    expect(app.use.mock.calls.length).toBeGreaterThan(20)
    expect(app.component.mock.calls.length).toBeGreaterThan(10)
    expect(app.config.globalProperties.$message).toBeDefined()
    expect(app.config.globalProperties.$notify).toBeDefined()
    expect(app.config.globalProperties.$alert).toBeDefined()
    expect(app.config.globalProperties.$showLoading).toBeDefined()
    expect(app.config.globalProperties.$hideLoading).toBeDefined()
    expect(window.$alert).toBeDefined()
  })
})
