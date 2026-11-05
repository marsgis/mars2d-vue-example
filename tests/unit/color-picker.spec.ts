import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mount, type DOMWrapper } from "@vue/test-utils"

vi.mock("vue-color-kit", async () => {
  const { defineComponent, h } = await import("vue")
  return {
    ColorPicker: defineComponent({
      name: "ColorPicker",
      props: { color: String, suckerHide: Boolean, onChangeColor: Function },
      setup(props) {
        return () => h("div", { class: "color-kit", "data-color": props.color ?? "" })
      }
    })
  }
})

vi.mock("ant-design-vue", async () => {
  const { defineComponent, h } = await import("vue")
  return {
    Popover: defineComponent({
      name: "Popover",
      props: { trigger: String, placement: String, overlayClassName: String, open: Boolean, color: String },
      emits: ["update:visible"],
      setup(props, { emit, slots }) {
        return () =>
          h(
            "div",
            {
              class: "popover-stub",
              "data-open": String(props.open),
              onClick: () => emit("update:visible", true)
            },
            [slots.default?.(), props.open ? slots.content?.() : null]
          )
      }
    })
  }
})

vi.mock("../../src/components/mars-ui/mars-button/index.vue", async () => {
  const { defineComponent, h } = await import("vue")
  return {
    default: defineComponent({
      name: "mars-button",
      setup(_, { slots }) {
        return () => h("button", { class: "btn-stub" }, slots.default?.())
      }
    })
  }
})

import MarsColorPicker from "../../src/components/mars-ui/mars-color-picker/index"

/** jsdom 未实现 innerText 时 Vue 会退化为属性，两种形态都读取 */
function labelText(wrapper: DOMWrapper<Element>) {
  return wrapper.text() || wrapper.attributes("innertext") || ""
}

/** jsdom 会把颜色归一为 rgb()/rgba()，用同样的归一化结果做期望值 */
function cssColor(value: string) {
  const el = document.createElement("div")
  el.style.backgroundColor = value
  return el.style.backgroundColor.replace(/\s/g, "")
}

async function openPane(wrapper: ReturnType<typeof mount>) {
  await wrapper.find(".popover-stub").trigger("click")
}

describe("mars-color-picker · 受控值与面板", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("初始渲染使用传入 value，面板默认关闭", () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "rgba(255,255,255,1)" } })
    expect(wrapper.find(".mars-color-picker").element.style.backgroundColor.replace(/\s/g, "")).toBe(cssColor("rgba(255,255,255,1)"))
    expect(labelText(wrapper.find(".mars-color-label"))).toBe("rgba(255,255,255,1)")
    expect(wrapper.findComponent({ name: "Popover" }).props("open")).toBe(false)
    expect(wrapper.findComponent({ name: "ColorPicker" }).exists()).toBe(false)
  })

  it("父级更新 value 后色块、文字与面板内选色器同步（C002 / C011 回归）", async () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "#ff0000" } })
    await openPane(wrapper)
    expect(wrapper.findComponent({ name: "ColorPicker" }).props("color")).toBe("#ff0000")

    await wrapper.setProps({ value: "#0000ff" })
    expect(wrapper.findComponent({ name: "ColorPicker" }).props("color")).toBe("#0000ff")
    expect(wrapper.find(".mars-color-picker").element.style.backgroundColor.replace(/\s/g, "")).toBe(cssColor("#0000ff"))
    expect(labelText(wrapper.find(".mars-color-label"))).toBe("#0000ff")
  })

  it("选色后 50ms 防抖派发 update:value 与 change", async () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "#ff0000" } })
    await openPane(wrapper)
    const colorObject = { rgba: { r: 1, g: 2, b: 3, a: 1 } }
    wrapper.findComponent({ name: "ColorPicker" }).props("onChangeColor")(colorObject)

    vi.advanceTimersByTime(49)
    expect(wrapper.emitted("update:value")).toBeUndefined()
    vi.advanceTimersByTime(1)
    expect(wrapper.emitted("update:value")?.[0]).toEqual(["rgba(1,2,3,1)"])
    expect(wrapper.emitted("change")?.[0]).toEqual([colorObject])
  })

  it("多次选色只派发最后一次（防抖合并）", async () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "#ff0000" } })
    await openPane(wrapper)
    const change = wrapper.findComponent({ name: "ColorPicker" }).props("onChangeColor")
    change({ rgba: { r: 1, g: 1, b: 1, a: 1 } })
    vi.advanceTimersByTime(20)
    change({ rgba: { r: 2, g: 2, b: 2, a: 1 } })
    vi.advanceTimersByTime(50)

    expect(wrapper.emitted("update:value")).toHaveLength(1)
    expect(wrapper.emitted("update:value")?.[0]).toEqual(["rgba(2,2,2,1)"])
  })

  it("取消回退到打开前的基准色", async () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "#ff0000" } })
    await openPane(wrapper)
    wrapper.findComponent({ name: "ColorPicker" }).props("onChangeColor")({ rgba: { r: 0, g: 0, b: 0, a: 1 } })

    const buttons = wrapper.findAll(".btn-stub")
    expect(buttons.map((b) => b.text())).toEqual(["确定", "取消"])
    await buttons[1].trigger("click")
    vi.advanceTimersByTime(50)

    expect(wrapper.emitted("update:value")?.[0]).toEqual(["#ff0000"])
  })

  it("确定后把当前色记为基准色，再次取消回退到确定值", async () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "#ff0000" } })
    await openPane(wrapper)
    const change = wrapper.findComponent({ name: "ColorPicker" }).props("onChangeColor")
    change({ rgba: { r: 0, g: 128, b: 0, a: 1 } })
    await wrapper.findAll(".btn-stub")[0].trigger("click")
    vi.advanceTimersByTime(50)

    change({ rgba: { r: 9, g: 9, b: 9, a: 1 } })
    await openPane(wrapper)
    await wrapper.findAll(".btn-stub")[1].trigger("click")
    vi.advanceTimersByTime(50)

    expect(wrapper.emitted("update:value")?.at(-1)).toEqual(["rgba(0,128,0,1)"])
  })

  it("卸载后未到期的防抖不再派发（C002 回归）", async () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "#ff0000" } })
    await openPane(wrapper)
    wrapper.findComponent({ name: "ColorPicker" }).props("onChangeColor")({ rgba: { r: 1, g: 2, b: 3, a: 1 } })
    wrapper.unmount()
    vi.advanceTimersByTime(100)

    expect(wrapper.emitted("update:value")).toBeUndefined()
  })

  it("hiddenAlpha 切换面板样式类", async () => {
    const wrapper = mount(MarsColorPicker, { props: { value: "#ff0000" } })
    expect(wrapper.findComponent({ name: "Popover" }).props("overlayClassName")).toBe("")
    await wrapper.setProps({ hiddenAlpha: true })
    expect(wrapper.findComponent({ name: "Popover" }).props("overlayClassName")).toBe("overlay-className")
  })
})
