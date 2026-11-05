<template>
  <div class="mars-color">
    <input
      type="color"
      aria-label="颜色选择"
      :style="{ backgroundColor: color }"
      v-model="inputColor"
      @change="changeColor"
    />
    <label> {{ color }} </label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue"

// 原生 input[type=color] 只接受 #rrggbb。父级可能与 mars-color-picker 共用同一字段（其值为 rgba()），
// 直接绑定会让色块回退为黑色、与文字不一致；这里仅为原生控件做归一化，文字仍显示父级原值。
const toHexColor = (value: string): string => {
  if (/^#[0-9a-f]{6}$/i.test(value)) {
    return value
  }
  const matched = value?.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (!matched) {
    return "#FFFFFF"
  }
  return (
    "#" +
    matched
      .slice(1, 4)
      .map((item) => Number(item).toString(16).padStart(2, "0"))
      .join("")
  )
}

export default defineComponent({
  name: "mars-color",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "#FFFFFF"
    }
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    // 使用 ref 保证色块与文字随选择实时更新，并与父组件 value 保持受控同步
    const color = ref(props.value)
    watch(
      () => props.value,
      (value) => {
        color.value = value
      }
    )
    const changeColor = (e: any) => {
      const value = e.target.value
      color.value = value
      context.emit("update:value", value)
      context.emit("change", value)
    }
    // 原生色块只接受 hex；用户选择后写回的是 hex，保持原有受控语义
    const inputColor = computed({
      get: () => toHexColor(color.value),
      set: (value: string) => {
        color.value = value
      }
    })
    return {
      color,
      inputColor,
      changeColor
    }
  }
})
</script>
<style lang="less" scoped>
.mars-color {
  width: 100%;
  height: 32px;
  background-color: var(--mars-control-bg);
  border: 1px solid;
  border-color: var(--mars-control-border);
  border-radius: 2px;
  padding: 3px 4px;
  &:hover {
    border-color: var(--mars-primary-color);
  }

  > input {
    outline: none !important;
    width: 24px;
    height: 24px;
    cursor: pointer;
    border: 1px solid var(--mars-control-border);
  }
  > label {
    height: 32px;
    line-height: 32px;
    color: var(--mars-control-text);
    font-family: var(--mars-font-family);
    font-size: 14px;
    font-weight: normal;
    display: inline-block;
    position: absolute;
    top: 0;
    margin-left: 10px;
  }
}

// 去掉颜色input 内置颜色线
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 0;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  margin: 0;
}
</style>
