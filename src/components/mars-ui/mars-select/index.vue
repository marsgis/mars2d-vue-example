<template>
  <a-select class="mars-select" popupClassName="mars-select-dropdown" v-bind="attrs">
    <template v-for="(comp, name) in slots" :key="name" v-slot:[name]>
      <component :is="comp" />
    </template>
  </a-select>
</template>
<script lang="ts">
import { useAttrs, useSlots, defineComponent } from "vue"
export default defineComponent({
  name: "mars-select",
  inheritAttrs: false,
  setup() {
    const attrs = useAttrs()
    const slots = useSlots()
    return {
      attrs,
      slots
    }
  }
})
</script>
<style lang="less" scoped>
.mars-select {
  width: 100%;
  height: 32px;
  background-color: var(--mars-control-bg);
  border-radius: 2px;
  box-shadow: none;
  :deep(.ant-select-selector) {
    height: 100% !important; 
    border-color: var(--mars-control-border);
    border-radius: 2px;
    background: none;
    color: var(--mars-text-color);
    &:hover,
    &:focus {
      border-color: var(--mars-hover-color);
    }
    .ant-select-selection-item {
      color: var(--mars-control-text) !important;
    }
  }

  :deep(.ant-select-arrow) {
    // 这里会导致下拉菜单右边的箭头不明显，暂时注释 效果看query/gaodeRoute这个示例
    // color: var(--mars-control-placeholder) !important;
  }
}
</style>
<style lang="less"></style>
