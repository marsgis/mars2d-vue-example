<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="onClickstart"> 开始 </mars-button>
      <mars-button @click="onClickOut"> 停止 </mars-button>
      <mars-button @click="onClickPause"> 暂停 </mars-button>
      <mars-button @click="onClickContinue"> 继续 </mars-button>
    </a-space>
  </mars-dialog>
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
