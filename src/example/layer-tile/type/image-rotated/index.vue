<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      透明度：
      <mars-slider v-model:value="opacity" :min="0" :max="1" :step="0.1" @change="changeImageOpacity" />
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const opacity = ref(0.8)
const changeImageOpacity = () => {
  mapWork.changeImageOpacity(opacity.value)
}
</script>

<style scoped lang="less">
.ant-slider {
  width: 150px;
}
</style>
