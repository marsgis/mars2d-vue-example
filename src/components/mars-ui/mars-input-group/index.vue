<template>
  <a-space>
    <template v-for="(item, i) in value" :key="i">
      <mars-input v-model:value="values[i]" @change="(v: string) => itemChange(v, i)" :suffix="props.units[i]" />
    </template>
  </a-space>
</template>
<script lang="ts" setup>
import { watchEffect, ref } from "vue"
const props = defineProps<{
  value: string[]
  units: string[]
}>()

const values = ref<string[]>([])

watchEffect(() => {
  // 复制一份，避免 v-model 回写时直接修改父组件传入的 props 数组
  values.value = [...(props.value || [])]
})

const emits = defineEmits(["update:value", "change"])

function itemChange(v: string, i: number) {
  emits("update:value", values.value)
  emits("change", values.value)
}
</script>
<script lang="ts">
export default {
  name: "mars-input-group"
}
</script>
<style lang="less" scoped></style>
