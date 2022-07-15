<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span>原始数据:</span>
        <mars-button @click="drawLine">绘制线</mars-button>
        <mars-button @click="clearAll">清除</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>计算平行线:</span>
        <mars-input-number v-model:value="distance" :min="1" :max="10" />公里
        <mars-button @click="parallelLines">计算</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>计算曲线:</span>
        <mars-button @click="calculationCurve">计算</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

const distance = ref(5)

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}

// 清除
const clearAll = () => {
  mapWork.clearLayer()
}

// 绘制平行线
const parallelLines = () => {
  mapWork.parallelLines(distance.value)
}

// 绘制曲线
const calculationCurve = () => {
  mapWork.calculationCurve()
}
</script>

<style scoped>

</style>
