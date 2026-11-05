import { Popover } from "ant-design-vue"
import { ColorPicker } from "vue-color-kit"
import MarsButton from "../mars-button/index.vue"
import { App, defineComponent, h, onBeforeUnmount, ref, watch } from "vue"
import "./mars-color-picker.less"

/**
 * 颜色选择器
 *
 * @copyright mars2d.cn
 * @author 木遥 2022-01-01
 */
const MarsColorPicker = defineComponent({
  name: "mars-color-picker",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    hiddenAlpha: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    // 用 ref 保存内部选色值：面板内的 ColorPicker 需要随受控值变化重新渲染
    const pointColor = ref(props.value || "")
    let oldColor = pointColor.value
    const visible = ref(false)
    let colorObject: any = null

    // 父组件外部更新 value（如重置样式）时同步内部选色值，保持受控语义
    watch(
      () => props.value,
      (value) => {
        pointColor.value = value || ""
        oldColor = pointColor.value
      }
    )

    const changeColor = (color: any) => {
      pointColor.value = `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})` // color.hex
      colorObject = color

      emitChangeEvent()
    }
    const cancel = () => {
      visible.value = false
      pointColor.value = oldColor
      emitChangeEvent()
    }
    const choose = () => {
      visible.value = false
      // 确定后将当前色记录为基准色，保证取消时能正确回退
      oldColor = pointColor.value
      emitChangeEvent()
    }

    let timeTik: ReturnType<typeof setTimeout> | undefined // 防抖
    const emitChangeEvent = () => {
      if (timeTik) {
        clearTimeout(timeTik)
      }
      timeTik = setTimeout(() => {
        context.emit("update:value", pointColor.value)
        context.emit("change", colorObject)
      }, 50)
    }

    // 卸载时清理防抖定时器，避免组件销毁后继续向父级派发事件
    onBeforeUnmount(() => {
      if (timeTik) {
        clearTimeout(timeTik)
      }
    })

    const Buttons = [
      h(
        MarsButton,
        { size: "small", onClick: choose },
        {
          default: () => "确定"
        }
      ),
      h(
        MarsButton,
        { size: "small", class: "ml5", style: { backgroundColor: "var(--mars-disable-color)" }, onClick: cancel },
        {
          default: () => "取消"
        }
      )
    ]

    return () => {
      // 面板内容在渲染期构造，使 ColorPicker 每次都能拿到当前选色值
      const content = [
        h(ColorPicker, { suckerHide: true, color: pointColor.value, onChangeColor: changeColor } as any /* TODO 强制给any类型 */),
        h("div", { class: "mars-color-btns" }, Buttons)
      ]

      return h("div", { class: "mars-color-view" }, [h(
        Popover,
        {
          trigger: "click",
          placement: "right",
          overlayClassName: props.hiddenAlpha ? "overlay-className" : "", // 打开的面板样式,隐藏透明度面板
          // overlayClassName: "overlayClassName", // 打开的面板样式,隐藏透明度面板
          open: visible.value,
          "onUpdate:visible": (v: boolean) => {
            visible.value = v
          },
          color: "var(--mars-control-bg)"
        },
        {
          default: () => h("div", { class: "mars-color-picker", style: { backgroundColor: props.value } }),
          content: () => h("div", null, content)
        }
      ),
      h("div", { class: "mars-color-bg" }),
      h("label", { class: "mars-color-label", innerText: props.value })])
    }
  }
})

export function install(app: App): App {
  app.component(MarsColorPicker.name!, MarsColorPicker)
  return app
}
export default MarsColorPicker
