<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div v-html="html"></div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const html = ref()

mapWork.eventTarget.on("initHtml", (event: any) => {
  html.value = event.html
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
