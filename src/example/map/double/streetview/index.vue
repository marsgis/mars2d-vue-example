<template>
  <div class="mars-onlybtns-pannel">
    <a-space>
      <mars-button @click="splitScreen">分屏</mars-button>
      <mars-button @click="streetscape">仅街景</mars-button>
      <mars-button @click="viewTo2d">仅2D</mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const splitScreen = () => {
  mapWork.splitScreen()
}

const viewTo2d = () => {
  mapWork.viewTo2d()
}
const streetscape = () => {
  mapWork.streetscape()
}

</script>

<style scoped lang="less">
.infoView {
  left: 43%;
  width: 210px;
}
</style>
