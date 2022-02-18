<template>
  <PannelComponent v-if="loaded" @vnode-mounted="onChildMounted" />
</template>
<script lang="ts" setup>
/**
 * 操作面板入口
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { defineAsyncComponent, h, ref } from "vue"
import { getQueryString } from "@mars/utils/mars-util"

const modules = import.meta.glob("../../example/**/index.vue")

let componentName: string | null = ""

let PannelComponent: any

const emits = defineEmits(["childMounted"])

const loaded = ref(false)
const exampleId = getQueryString("id")
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
</script>

<style scoped lang="less"></style>
