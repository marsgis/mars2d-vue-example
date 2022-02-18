<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <span>底图透明度：</span>
      <mars-slider @change="opacityChange" v-model:value="opacity" :min="0" :max="100" :step="1.0" />{{opacity}}%
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const opacity = ref(100)

const opacityChange = () => {
  mapWork.opacityChange(opacity.value)
}
</script>
<style scoped lang="less">
.infoView {
  width: 254px;
}
.ant-slider {
  width: 100px;
}
</style>
