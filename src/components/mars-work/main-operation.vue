<template>
  <PannelComponent v-if="loaded" @vue:before-mount="onChildMounted" @vue:unmounted="onChildUnmounted" />
</template>
<script lang="ts" setup>
/**
 * 操作面板入口
 * @copyright mars2d.cn
 * @author 木遥 2022-01-01
 */
import { defineAsyncComponent, h, ref, provide, type Component } from "vue"
import { getExampleId } from "@mars/utils/mars-util"

const modules = import.meta.glob<{ default: Component }>("../../example/**/index.vue")

let componentName: string | null = ""

let PannelComponent: any

// 示例面板不是 widget，调用方（如 useWidget）拿到 null 即走非 widget 分支
provide("getCurrentWidget", () => {
  return null
})

const emits = defineEmits(["childMounted", "childUnmounted"])

const loaded = ref(false)
const exampleId = getExampleId()
if (exampleId) {
  componentName = exampleId
  PannelComponent = defineAsyncComponent({
    loader: modules[`../../example/${componentName}/index.vue`],
    errorComponent: {
      render() {
        return h("")
      }
    }
  })
  // console.log(PannelComponent)
  loaded.value = true
}
const onChildMounted = (e: any) => {
  emits("childMounted")
}

const onChildUnmounted = () => {
  emits("childUnmounted")
}
</script>

<style scoped lang="less"></style>
