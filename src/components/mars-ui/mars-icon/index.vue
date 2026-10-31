<template>
  <span class="mars-icon" v-html="svgComponent"></span>
</template>
<script lang="ts">
import { computed, useAttrs, defineComponent } from "vue"
import * as svgModule from "@icon-park/svg"
import _ from "lodash"
export default defineComponent({
  name: "mars-icon",
  // inheritAttrs: false,
  props: {
    icon: {
      type: String
    },
    color: {
      type: String
    },
    width: {
      type: [String, Number],
      default: "14"
    }
  },
  setup(props) {
    const attrs = useAttrs()
    const iconName = computed(() => _.upperFirst(_.camelCase(props.icon)))

    // 图标名/颜色/尺寸会随状态动态变化（如密码显示隐藏、布局切换），必须用 computed 生成，
    // 否则组件只会在首次渲染时取一次值，后续 prop 变化不会更新。
    const svgComponent = computed(() => {
      const iconFn = (svgModule as any)[iconName.value]
      if (typeof iconFn !== "function") {
        // 图标名写错时不应抛异常导致整个组件树渲染失败，输出占位即可
        if (iconName.value) {
          console.warn(`mars-icon: 不存在的图标名称 "${props.icon}"`)
        }
        return ""
      }
      return iconFn({
        theme: "outline",
        fill: props.color,
        size: props.width,
        ...attrs
      })
    })

    return {
      attrs,
      svgComponent
    }
  }
})
</script>
<style lang="less" scoped>
.mars-icon {
  vertical-align: middle;
  line-height: 1;
}
</style>
