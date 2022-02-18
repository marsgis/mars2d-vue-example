<template>
  <mars-pannel :visible="true" right="10" top="10">
    <span>提示：请单击地图，分析拾取点最近的体育场所。</span>
    <mars-button @click="clearAll">清除</mars-button>
  </mars-pannel>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
// 清除
const clearAll = () => {
  mapWork.clearlayer()
}
</script>
