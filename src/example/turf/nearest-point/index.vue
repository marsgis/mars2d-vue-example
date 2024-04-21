<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <span>提示：请单击地图，分析拾取点最近的机场。</span>
    <mars-button class="w-full f-mt" @click="clearAll" danger>清除</mars-button>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
// 清除
const clearAll = () => {
  mapWork.clearlayer()
}
</script>
