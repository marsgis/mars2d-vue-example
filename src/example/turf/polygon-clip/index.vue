<template>
  <div class="mars-onlybtns-pannel">
    <a-space>
      <mars-button @click="drawLine">绘制线</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}

// 清除
const clearAll = () => {
  mapWork.clear()
}
</script>
