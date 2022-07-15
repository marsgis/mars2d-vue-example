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
