<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div  class="canvas-marker-input f-mb">
      显示：
      <mars-input v-model:value="txtCount" min="0.1" max="100.0" step="0.1" />
      <span class="extra-label">万条</span>
    </div>

    <div  class="canvas-marker-btns">
        <mars-button @click="OnClickShowData">生成</mars-button>
        <mars-button @click="OnClickShowData2">生成个性绘制</mars-button>
        <mars-button @click="OnClickClearData" danger>清除</mars-button>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

const txtCount = ref(1)

const OnClickShowData = () => {
  window.$showLoading()
  const startTime = new Date().getTime()

  mapWork.addMarkers(txtCount.value * 10000)

  window.$hideLoading()
  const endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  const usedTime = (endTime - startTime) / 1000

  $message("共耗时" + usedTime.toFixed(2) + "秒")
}
const OnClickShowData2 = () => {
  window.$showLoading()
  const startTime = new Date().getTime()

  mapWork.addCustomDrawMarkers(txtCount.value * 10000)

  window.$hideLoading()
  const endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  const usedTime = (endTime - startTime) / 1000
  console.log(usedTime)

  $message("共耗时" + usedTime.toFixed(2) + "秒")
}
const OnClickClearData = () => {
  mapWork.clearData()
}
</script>

<style scoped lang="less">
.canvas-marker-input {
  display: grid;
  align-items: center;
  grid-template-columns:45px repeat(1, 1fr) 35px;
  gap: 4px;

  .extra-label {
    color: var(--mars-extra-text-color);
    text-align: right;
  }
}

.canvas-marker-btns {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
</style>
