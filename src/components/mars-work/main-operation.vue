<template>
  <PannelComponent v-if="loaded" @vnode-before-mount="onChildMounted" @vnode-unmounted="onChildUnmounted" />
</template>
<script lang="ts" setup>
/**
 * 操作面板入口
 * @copyright 火星科技 mars2d.cn
 * @author 木遥 2022-01-01
 */
import { defineAsyncComponent, h, ref } from "vue"
import { getExampleId } from "@mars/utils/mars-util"

const modules = import.meta.glob("../../example/**/index.vue")

let componentName: string | null = ""

let PannelComponent: any

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
