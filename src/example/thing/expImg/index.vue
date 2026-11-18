<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="showMapImg">查看场景出图</mars-button>
      <mars-button @click="downLoad">全屏导出</mars-button>
      <mars-button @click="downLoad2">框选导出</mars-button>
      <mars-button @click="shotPartImg">局部截图</mars-button>
    </a-space>
  </mars-dialog>

  <mars-dialog top="50" left="50" width="calc(100% - 100px)" title="场景出图" v-model:visible="showImg">
    <img :src="imges" class="show-img" alt="场景出图预览" />
  </mars-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue"
import * as mapWork from "./map.js"

const showImg = ref(false)
const imges = ref()

const onLoadOk = (event: any) => {
  imges.value = event.base64
  showImg.value = true
}
mapWork.eventTarget.on("loadOk", onLoadOk)

// 局部截图完成：与「查看场景出图」复用同一个预览弹窗
const onShowPartImg = (event: any) => {
  imges.value = event.base64
  showImg.value = true
}
mapWork.eventTarget.on("showPartImg", onShowPartImg)

onBeforeUnmount(() => {
  mapWork.eventTarget.off("loadOk", onLoadOk)
  mapWork.eventTarget.off("showPartImg", onShowPartImg)
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

// 截取部分图片
const shotPartImg = () => {
  mapWork.shotPartImg()
}
</script>
<style scoped lang="less">
.show-img {
  width: 100%;
  // 弹窗高度是 auto，百分比 max-height 不会生效；按视口给上限，避免大图溢出
  max-height: calc(100vh - 220px);
  object-fit: contain;
}
</style>
