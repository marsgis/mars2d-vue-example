<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="randomPoints()" type="button">随机点</mars-button>
      <mars-button @click="randomPolylines()" type="button">随机线</mars-button>
      <mars-button @click="randomPolygons()" type="button">随机面</mars-button>
      <mars-button @click="clearAll()" type="button">清除</mars-button>
    </a-space>
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
