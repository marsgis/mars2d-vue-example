<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <span class="text-color">效果：</span>
      <mars-button @click="divGraphicYellow"> 效果一 </mars-button>
      <mars-button @click="divGraphicBule"> 效果二</mars-button>
      <mars-button @click="divGraphicWhite"> 效果三 </mars-button>
    </a-space>
  </mars-dialog>
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

<style lang="less" scoped>
.text-color {
  font-size: 14px;
  color: var(--mars-tree-hover-text);
}

.mars-button {
  width: 78px;
}
</style>
