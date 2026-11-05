import { describe, expect, it, vi } from "vitest"
import { defineComponent, h, nextTick } from "vue"
import { mount } from "@vue/test-utils"
import MarsGui from "../../src/components/mars-ui/mars-gui/index.vue"
import { components, type GuiItem } from "../../src/components/mars-ui/mars-gui/index"

const FormStub = defineComponent({
  name: "a-form",
  props: { labelCol: Object, wrapperCol: Object },
  setup(_, { slots }) {
    return () => h("div", { class: "form-stub" }, slots.default?.())
  }
})

const FormItemStub = defineComponent({
  name: "a-form-item",
  props: { label: String },
  setup(props, { slots }) {
    return () => h("div", { class: "form-item", "data-label": props.label ?? "" }, slots.default?.())
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
        onChange: (e: any) => {
          emit("update:value", e.target.value)
          emit("change", e.target.value)
        }
      })
  }
})

const controlStub = { template: "<div class='control-stub'><slot /></div>" }

function mountGui(options: GuiItem[], props: any = {}) {
  return mount(MarsGui, {
    props: { options, ...props },
    global: {
      components: {
        "a-form": FormStub,
        "a-form-item": FormItemStub,
        "mars-input": InputStub,
        "mars-input-number": controlStub,
        "mars-switch": controlStub,
        "mars-slider": controlStub,
        "mars-color-picker": controlStub,
        "mars-select": controlStub,
        "mars-textarea": controlStub,
        "mars-input-group": controlStub
      }
    }
  })
}

describe("mars-gui · 类型映射", () => {
  it("组件映射覆盖受支持类型", () => {
    expect(Object.keys(components).sort()).toEqual(
      ["checkbox", "color", "input", "inputGroup", "number", "radio", "select", "slider", "switch", "textarea"].sort()
    )
    expect(components.color).toBe("mars-color-picker")
    expect(components.inputGroup).toBe("mars-input-group")
  })
})

describe("mars-gui · 渲染", () => {
  it("默认显示，label 取自 option", () => {
    const options: GuiItem[] = [{ type: "input", field: "name", value: "old", label: "名称" }]
    const wrapper = mountGui(options)
    expect(wrapper.find(".form-item").attributes("data-label")).toBe("名称")
    expect(wrapper.find("input").element.value).toBe("old")
  })

  it("show 为 false 时不渲染；show 为函数时按表单数据求值", async () => {
    const hidden: GuiItem[] = [{ type: "input", field: "a", value: "1", show: () => false }]
    expect(mountGui(hidden).find(".form-item").exists()).toBe(false)

    const options: GuiItem[] = [
      { type: "input", field: "mode", value: "custom" },
      { type: "input", field: "extra", value: "", show: (data) => data.mode === "custom" }
    ]
    const wrapper = mountGui(options)
    expect(wrapper.findAll(".form-item")).toHaveLength(2)

    await wrapper.find(".stub-control").setValue("plain")
    expect(wrapper.findAll(".form-item")).toHaveLength(1)
  })

  it("控件变更写回内部副本，并派发 change(formData)", async () => {
    const options: GuiItem[] = [
      { type: "input", field: "a", value: "old" },
      { type: "input", field: "b", value: "keep" }
    ]
    const wrapper = mountGui(options)
    const input = wrapper.find("input")
    ;(input.element as HTMLInputElement).value = "new"
    await input.trigger("change")

    expect(options[0].value).toBe("old")
    expect(wrapper.emitted("change")?.[0]?.[0]).toEqual({ a: "new", b: "keep" })
  })

  it("option.change 存在时优先调用它且不再 emit change", async () => {
    const calls: any[] = []
    const options: GuiItem[] = [
      { type: "input", field: "a", value: "old", change: (value, formData) => calls.push([value, formData]) }
    ]
    const wrapper = mountGui(options)
    const input = wrapper.find("input")
    ;(input.element as HTMLInputElement).value = "new"
    await input.trigger("change")

    expect(calls).toEqual([["new", { a: "new" }]])
    expect(wrapper.emitted("change")).toBeUndefined()
  })

  it("extra 字符串按 {field} 占位替换，extra 存在时预留宽度", () => {
    const options: GuiItem[] = [
      { type: "input", field: "count", value: "3" },
      { type: "input", field: "a", value: "", extra: "共 {count} 个", extraWidth: 100, extraAfter: "米" }
    ]
    const wrapper = mountGui(options)
    expect(wrapper.find(".mars-gui-extra").text()).toBe("共 3 个")
    expect(wrapper.find(".extra_follow_close").text()).toBe("米")
    expect(wrapper.findAll(".form-item")[1].find("div").attributes("style")).toContain("calc(100% - 100px)")
  })

  it("无 extra 时占满整行", () => {
    const options: GuiItem[] = [{ type: "input", field: "a", value: "" }]
    const style = mountGui(options).find(".form-item > div").attributes("style")
    expect(style).toContain("width: 100%")
  })

  it("extraWidth 为 0 时按 0 计算，缺省时按 63 计算", () => {
    const zero = mountGui([{ type: "input", field: "a", value: "", extra: "x", extraWidth: 0 }])
    expect(zero.find(".form-item > div").attributes("style")).toContain("calc(100% - 0px)")

    const fallback = mountGui([{ type: "input", field: "a", value: "", extra: "x" }])
    expect(fallback.find(".form-item > div").attributes("style")).toContain("calc(100% - 63px)")
  })

  it("extraType=custom 时渲染 extra 返回的组件标签", () => {
    const options: GuiItem[] = [{ type: "input", field: "a", value: "", extra: "em", extraType: "custom" }]
    const wrapper = mountGui(options)
    expect(wrapper.find(".mars-gui-extra em").exists()).toBe(true)
  })

  it("labelCol 与 noPadding 控制表单属性", () => {
    const wrapper = mountGui([{ type: "input", field: "a", value: "" }], { labelCol: 4, noPadding: true })
    expect(wrapper.find(".form-stub").exists()).toBe(true)
    expect(wrapper.find(".mars-gui-form").classes()).toContain("pad-none")
    expect(wrapper.findComponent(FormStub).props("labelCol")).toEqual({ span: 4 })
  })
})

describe("mars-gui · 暴露的增删改查方法", () => {
  function setup() {
    const options: GuiItem[] = [
      { type: "input", field: "a", value: "1" },
      { type: "input", field: "b", value: "2" }
    ]
    const wrapper = mountGui(options)
    return { wrapper, vm: wrapper.vm as any }
  }

  it("delete 支持按 field 与按下标，非法参数不动数组", async () => {
    const { vm } = setup()
    vm.delete("a")
    expect(vm.getValues()).toEqual({ b: "2" })

    vm.delete(0)
    expect(vm.getValues()).toEqual({})

    const third = setup().vm
    third.delete(9)
    third.delete(-1)
    third.delete("missing")
    expect(third.getValues()).toEqual({ a: "1", b: "2" })
    await nextTick()
  })

  it("insert 支持一次插入多项", async () => {
    const { vm } = setup()
    vm.insert(1, { type: "input", field: "c", value: "3" }, { type: "input", field: "d", value: "4" })
    await nextTick()
    expect(vm.getValues()).toEqual({ a: "1", d: "4", c: "3", b: "2" })
  })

  it("updateField / updateExtra / updateFields 只写命中字段", async () => {
    const { vm } = setup()
    vm.updateField("b", "9")
    vm.updateExtra("a", "说明")
    await nextTick()
    expect(vm.getValues()).toEqual({ a: "1", b: "9" })

    vm.updateFields({ a: "", b: 0 })
    await nextTick()
    expect(vm.getValues()).toEqual({ a: "1", b: "9" })
  })

  it("getValue 命中返回值，未命中抛错", () => {
    const { vm } = setup()
    expect(vm.getValue("a")).toBe("1")
    expect(() => vm.getValue("missing")).toThrow("field is not exist")
  })

  it("方法在 options 更新后仍基于最新副本", async () => {
    const { wrapper, vm } = setup()
    await wrapper.setProps({ options: [{ type: "input", field: "x", value: "y" }] })
    expect(vm.getValues()).toEqual({ x: "y" })
    vm.updateField("x", "z")
    expect(vm.getValue("x")).toBe("z")
  })
})
