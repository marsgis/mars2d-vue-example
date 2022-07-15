<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span>缓冲半径:</span>
        <mars-input-number class="radius" @change="radiusChange" v-model:value="radiusVal" :min="1" :step="1" :max="999"></mars-input-number>公里
      </a-space>
    </div>

    <a-space>
      <span>绘制:</span>
      <mars-button @click="drawPoint">点</mars-button>
      <mars-button @click="drawPolyline">线</mars-button>
      <mars-button @click="drawPolygon">面</mars-button>
      <mars-button @click="deleteAll">清除</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const radiusVal = ref<number>(1)

// 点
const drawPoint = () => {
  mapWork.drawPoint()
}
// 线
const drawPolyline = () => {
  mapWork.drawPolyline()
}

// 面
const drawPolygon = () => {
  mapWork.drawPolygon()
}

const radiusChange = () => {
  mapWork.radiusChange(radiusVal.value)
}

radiusChange()

const deleteAll = () => {
  mapWork.deleteAll()
}
</script>
<style scoped lang="less">
.mars-dialog-item-label {
  width: 55px;
}
.ant-input-number {
  width: 120px !important;
}
</style>
