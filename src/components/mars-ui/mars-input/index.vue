<template>
  <a-input class="mars-input" v-bind="attrs" :class="{prefix: attrs['addon-before']}">
    <template v-for="(comp, name) in slots" :key="name" v-slot:[name]>
      <component :is="comp" />
    </template>
  </a-input>
</template>
<script lang="ts">
import { useAttrs, useSlots, defineComponent } from "vue"
export default defineComponent({
  name: "mars-input",
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
.mars-input {
  height: var(--mars-control-height, 32px);
  color: var(--mars-control-text);
  background-color: var(--mars-control-bg);
  font-size: var(--mars-font-size-xs, 12px) !important;
  border: 1px solid;
  border-color: var(--mars-control-border);
  border-radius: var(--mars-radius-sm, 4px);
  font-family: var(--mars-font-family);
  transition: border-color var(--mars-transition-fast, 0.2s ease);
  &::placeholder {
    color: var(--mars-control-placeholder);
  }
  :deep(.ant-input) {
    background-color: transparent !important;
    border-color: var(--mars-control-border);
    color: var(--mars-control-text);
    font-size: var(--mars-font-size-md, 14px);
    &::placeholder {
      color: var(--mars-control-placeholder);
    }
  }
  :deep(.ant-input-suffix .anticon) {
    color: var(--mars-control-text);
  }
  &:hover {
    border-color: var(--mars-hover-color);
  }
}
.prefix  {
  :deep(.ant-input) {
    border: 0px;
    padding: 4px;
    text-align: right;
  }
}
:deep(.ant-input-group-addon) {
  padding: 0px 0px 0px 7px;
  border-radius: 0px !important;
  border-color: transparent;
  color: #fff;
}
.ant-input-affix-wrapper-focused {
  box-shadow: none;
}
.mars-input[disabled] {
  color: var(--mars-disable-color);
}
</style>
