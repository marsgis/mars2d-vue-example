<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div class="buffer-input f-mb">
      <span class="mars-pannel-item-label">缓冲半径:</span>
      <mars-input-number @change="radiusChange" v-model:value="radiusVal" :min="1" :step="1"
                         :max="999"></mars-input-number>
      <span class="extra-label">公里</span>
    </div>

    <div class="buffer-btns">
      <mars-button @click="drawPoint">点</mars-button>
      <mars-button @click="drawPolyline">线</mars-button>
      <mars-button @click="drawPolygon">面</mars-button>
      <mars-button @click="deleteAll" danger>清除</mars-button>
    </div>
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
.buffer-input {
  display: grid;
  align-items: center;
  grid-template-columns:65px repeat(1, 1fr) 35px;
  gap: 4px;

  .extra-label {
    color: var(--mars-extra-text-color);
    text-align: right;
  }
}

.buffer-btns {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}
</style>
