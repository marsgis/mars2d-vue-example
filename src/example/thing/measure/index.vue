<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="distance">长度</mars-button>
      <mars-button @click="area">测量面积</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const distance = () => {
  mapWork.distance()
}

const area = () => {
  mapWork.area()
}

const clearLayer = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less"></style>
