<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <a-space>
        <span>步长:</span>
        <mars-input-number v-model:value="step" :min="1" :max="10" />
        公里
        <mars-button @click="pointGrid">点</mars-button>
        <mars-button @click="triangleGrid">三角网</mars-button>
        <mars-button @click="squareGrid">方格网</mars-button>
        <mars-button @click="hexGrid">蜂窝网</mars-button>
      </a-space>
    </a-space>
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
:deep(.ant-input-number-input-wrap) {
  width: 80px;
}
</style>
