<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div class="isinpoly-btns">
      <mars-button @click="drawRectangle">矩形</mars-button>
      <mars-button @click="drawPolygon">面</mars-button>
      <mars-button @click="drawCircle">圆</mars-button>
    </div>

    <mars-button class="w-full" @click="removeAll" danger>清除</mars-button>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const drawRectangle = () => {
  mapWork.drawRectangle()
}
const drawPolygon = () => {
  mapWork.drawPolygon()
}
const drawCircle = () => {
  mapWork.drawCircle()
}

const removeAll = () => {
  mapWork.removeAll()
}

</script>

<style scoped lang="less">
.isinpoly-btns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}
</style>
