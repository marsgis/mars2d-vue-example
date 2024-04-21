<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div class="random-btns">
      <mars-button @click="randomPoints()" type="button">随机点</mars-button>
      <mars-button @click="randomPolylines()" type="button">随机线</mars-button>
      <mars-button @click="randomPolygons()" type="button">随机面</mars-button>
    </div>

    <mars-button class="w-full" @click="clearAll()" type="button" danger>清除</mars-button>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 随机点
const randomPoints = () => {
  mapWork.randomPoints()
}

// 随机点
const randomPolylines = () => {
  mapWork.randomPolylines()
}

// 随机点
const randomPolygons = () => {
  mapWork.randomPolygons()
}

// 随机点
const clearAll = () => {
  mapWork.clearAll()
}
</script>

<style scoped lang="less">
.random-btns{
  display: grid;
  grid-template-columns:repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}
</style>
