<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div class="input f-mb">
      <span class="f-tal">步长:</span>
      <mars-input-number v-model:value="step" :min="1" :max="10" />
      公里
    </div>
    <div class="btns">
      <mars-button @click="pointGrid">点</mars-button>
      <mars-button @click="triangleGrid">三角网</mars-button>
      <mars-button @click="squareGrid">方格网</mars-button>
      <mars-button @click="hexGrid">蜂窝网</mars-button>

    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
import { ref } from "vue"

const step = ref<number>(5)
// 三角网
const triangleGrid = () => {
  mapWork.triangleGrid(step.value)
}

// 点
const pointGrid = () => {
  mapWork.pointGrid(step.value)
}

// 方格网
const squareGrid = () => {
  mapWork.squareGrid(step.value)
}

// 蜂窝网
const hexGrid = () => {
  mapWork.hexGrid(step.value)
}
</script>
<style lang="less" scoped>
.btns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.input {
  display: grid;
  grid-template-columns: 40px repeat(1, 1fr) 35px;
  align-items: center;
  text-align: right;
}
</style>
