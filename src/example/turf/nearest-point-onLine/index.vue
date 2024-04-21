<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div class="nearest-btns">
      <mars-button @click="drawLine">绘制线</mars-button>
      <mars-button @click="nearPoint">计算最近点</mars-button>
      <mars-button class="grid-item_2" @click="clearAll" danger>清除</mars-button>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}
// 计算最近点
const nearPoint = () => {
  mapWork.drawPoint()
}
// 清除
const clearAll = () => {
  mapWork.clearLayer()
}
</script>

<style scoped lang="less">
.nearest-btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  .grid-item_2 {
    grid-column: 1 / span 2;
  }
}
</style>
