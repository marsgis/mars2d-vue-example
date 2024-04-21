<template>
  <div class="mars-onlybtns-pannel">
    <a-space>
      <mars-button @click="onClickstart"> 开始 </mars-button>
      <mars-button @click="onClickOut" danger> 停止 </mars-button>
      <mars-button @click="onClickPause" class="snakein-pause"> 暂停 </mars-button>
      <mars-button @click="onClickContinue" class="snakein-continue"> 继续 </mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const onClickstart = () => {
  mapWork.onClickstart()
}
const onClickOut = () => {
  mapWork.onClickOut()
}
const onClickPause = () => {
  mapWork.onClickPause()
}
const onClickContinue = () => {
  mapWork.onClickContinue()
}
</script>

<style scoped lang="less">
.snakein-pause {
  background-color: #EA9124;
}

.snakein-continue {
  background-color: #3BD5B3;
}
</style>
