<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div v-html="html"></div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { onMapWorkReady } from "@mars/utils/map-work"
import * as mapWork from "./map.js"

const html = ref()

const onInitHtml = (event: any) => {
  html.value = event.html
}

let offMapWorkReady: (() => void) | null = null

onMounted(() => {
  mapWork.eventTarget.on("initHtml", onInitHtml)
  // addLegend 在 map.js onMounted 中同步 fire，若面板挂载晚于地图初始化会错过事件；
  // 等地图业务就绪后补调一次，确保图例渲染
  offMapWorkReady = onMapWorkReady(() => {
    mapWork.addLegend()
  })
})

onBeforeUnmount(() => {
  mapWork.eventTarget.off("initHtml", onInitHtml)
  if (offMapWorkReady) {
    offMapWorkReady()
    offMapWorkReady = null
  }
})
</script>

<style lang="less">
.legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;

  .legend-color {
    width: 50px;
    height: 20px;
    display: inline-block;
    margin-right: 5px;

  }
}
</style>
