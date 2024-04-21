<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div class="line-btns f-mb">
      <span class="mars-pannel-item-label">原始数据:</span>
      <mars-button @click="drawLine">绘制线</mars-button>
    </div>

    <div class="line-btns btn-more f-mb">
      <span class="mars-pannel-item-label">计算平行线:</span>
      <mars-input-number v-model:value="distance" :min="1" :max="10" addon-after="公里" />
      <mars-button @click="parallelLines">计算</mars-button>
    </div>

    <div class="line-btns f-mb">
      <span class="mars-pannel-item-label">计算曲线:</span>
      <mars-button @click="calculationCurve">计算</mars-button>
    </div>


    <mars-button class="w-full" @click="clearAll" danger>清除</mars-button>
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

<style lang="less" scoped> .line-btns {
   display: grid;
   grid-template-columns: 74px repeat(1, 1fr);
   align-items: center;
   gap: 10px;
 }

 .btn-more {
   grid-template-columns: 74px repeat(2, 1fr);
 }
</style>
