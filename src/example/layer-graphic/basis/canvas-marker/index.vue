<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div>
      <a-space>
        显示：
        <mars-input v-model:value="txtCount" min="0.1" max="100.0" step="0.1" />
        万条
        <mars-button @click="OnClickShowData">生成</mars-button>
        <mars-button @click="OnClickShowData2">生成个性绘制</mars-button>
        <mars-button @click="OnClickClearData">清除</mars-button>
      </a-space>
    </div>
    <div>
      <a-space> </a-space>
    </div>
  </mars-pannel>
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

<style>
.mars-input {
  width: 100px;
}
</style>
