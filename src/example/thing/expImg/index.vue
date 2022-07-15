<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="showMapImg">查看场景出图</mars-button>
      <mars-button @click="downLoad">全屏导出</mars-button>
      <mars-button @click="downLoad2">框选导出</mars-button>
    </a-space>
  </mars-dialog>

  <mars-dialog top="50" left="50" width="calc(100% - 100px)" title="场景出图" v-model:visible="showImg">
    <img :src="imges" class="show-img" />
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const showImg = ref(false)
const imges = ref()

mapWork.eventTarget.on("loadOk", function (event: any) {
  imges.value = event.base64
  showImg.value = true
})

const showMapImg = () => {
  mapWork.showMapImg()
}
const downLoad = () => {
  mapWork.downLoad()
}

const downLoad2 = () => {
  mapWork.downLoad2()
}
</script>
<style scoped lang="less">
.show-img {
  width: 100%;
  max-height: 100%;
}
</style>
