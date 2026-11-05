import { describe, expect, it } from "vitest"
import { defineComponent, h } from "vue"
import { mount } from "@vue/test-utils"
import MarsColor from "../../src/components/mars-ui/mars-color/index.vue"
import MarsInputGroup from "../../src/components/mars-ui/mars-input-group/index.vue"

const SpaceStub = defineComponent({
  name: "a-space",
  setup(_, { slots }) {
    return () => h("div", { class: "space-stub" }, slots.default?.())
  }
})

const InputStub = defineComponent({
  name: "mars-input",
  props: { value: { type: null }, suffix: String },
  emits: ["update:value", "change"],
  setup(props, { emit }) {
    return () =>
      h("input", {
        class: "stub-control",
        value: props.value ?? "",
        "data-suffix": props.suffix ?? "",
        onChange: (e: any) => {
          emit("update:value", e.target.value)
          emit("change", e.target.value)
        }
      })
  }
})

describe("mars-color · 事件与受控同步", () => {
  it("初始色值渲染到色块与文字", () => {
    const wrapper = mount(MarsColor, { props: { value: "#ff0000" } })
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe("#ff0000")
    expect(wrapper.find("label").text()).toBe("#ff0000")
  })

  it("用户选择颜色时派发 update:value 与 change，并同步内部显示", async () => {
    const wrapper = mount(MarsColor, { props: { value: "#ff0000" } })
    const input = wrapper.find("input")
    ;(input.element as HTMLInputElement).value = "#00ff00"
    await input.trigger("change")

    expect(wrapper.emitted("update:value")?.[0]).toEqual(["#00ff00"])
    expect(wrapper.emitted("change")?.[0]).toEqual(["#00ff00"])
    expect(wrapper.find("label").text()).toBe("#00ff00")
  })

  it("父级重置 value 后内部显示跟随", async () => {
    const wrapper = mount(MarsColor, { props: { value: "#ff0000" } })
    await wrapper.setProps({ value: "#0000ff" })

    expect(wrapper.find("label").text()).toBe("#0000ff")
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe("#0000ff")
  })

  it("父级传入 rgba 时色块归一化为 hex、文字保留原值", () => {
    const wrapper = mount(MarsColor, { props: { value: "rgba(255, 0, 0, 1)" } })

    expect((wrapper.find("input").element as HTMLInputElement).value).toBe("#ff0000")
    expect(wrapper.find("label").text()).toBe("rgba(255, 0, 0, 1)")
  })

  it("非法色值回退到白色", () => {
    const wrapper = mount(MarsColor, { props: { value: "not-a-color" } })
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe("#ffffff")
    expect(wrapper.find("label").text()).toBe("not-a-color")
  })
})

describe("mars-input-group · 数组输入", () => {
  function mountGroup(value: string[], units: string[] = []) {
    return mount(MarsInputGroup, {
      props: { value, units },
      global: { components: { "a-space": SpaceStub, "mars-input": InputStub } }
    })
  }

  it("按 value 数量渲染输入框并透传单位后缀", () => {
    const wrapper = mountGroup(["1", "2"], ["m", "s"])
    const inputs = wrapper.findAll("input")
    expect(inputs).toHaveLength(2)
    expect(inputs[0].attributes("data-suffix")).toBe("m")
    expect(inputs[1].attributes("data-suffix")).toBe("s")
  })

  it("编辑后派发 update:value 与 change", async () => {
    const value = ["a", "b"]
    const wrapper = mountGroup(value)
    const input = wrapper.findAll("input")[0]
    ;(input.element as HTMLInputElement).value = "x"
    await input.trigger("change")

    const emittedValue = wrapper.emitted("update:value")?.[0]?.[0] as string[]
    expect(emittedValue).toEqual(["x", "b"])
    expect(wrapper.emitted("change")?.[0]?.[0]).toEqual(["x", "b"])
  })

  it("父级更新 value 后重新渲染", async () => {
    const wrapper = mountGroup(["1"])
    await wrapper.setProps({ value: ["1", "2", "3"] })
    expect(wrapper.findAll("input")).toHaveLength(3)
  })

  it("没有单位时后缀为空", () => {
    const wrapper = mountGroup(["1"])
    expect(wrapper.find("input").attributes("data-suffix")).toBe("")
  })
})
