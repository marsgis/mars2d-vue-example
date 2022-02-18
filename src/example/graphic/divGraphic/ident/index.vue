<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      效果：
      <mars-button @click="divGraphicYellow"> 效果一 </mars-button>
      <mars-button @click="divGraphicBule"> 效果二</mars-button>
      <mars-button @click="divGraphicWhite"> 效果三 </mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const divGraphicYellow = () => {
  mapWork.divGraphicYellow()
}
const divGraphicBule = () => {
  mapWork.divGraphicBule()
}
const divGraphicWhite = () => {
  mapWork.divGraphicWhite()
}
</script>
