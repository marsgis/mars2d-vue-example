<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <mars-button class="btn" @click="onBindMapDemo">Map上直接弹出</mars-button>
    <mars-button class="btn" @click="onBindLayerDemo">图层上绑定</mars-button>
    <mars-button class="btn" @click="onBindLayerDemo2">图层上预定义配置</mars-button>

    <mars-button class="btn" @click="onBindGraphicDemo1">Graphic上绑定</mars-button>
    <mars-button class="btn" @click="onBindGraphicDemo2">Graphic上局部刷新</mars-button>
  </mars-dialog>
  <mars-dialog width="100%" left="100" right="100" top="100" bottom="100" title="查看详情" v-model:visible="showLayer">
    <iframe src="http://marsgis.cn/" frameborder="0" width="100%" height="100%"></iframe>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const showLayer = ref(false)

mapWork.eventTarget.on("showWebsite", function (event: any) {
  showLayer.value = event.showHistoryLayer
})

// Map上直接弹出
const onBindMapDemo = () => {
  mapWork.bindMapDemo()
}
// 图层上绑定
const onBindLayerDemo = () => {
  mapWork.bindLayerDemo()
}
const onBindLayerDemo2 = () => {
  mapWork.bindLayerDemo2()
}

const onBindGraphicDemo1 = () => {
  mapWork.bindGraphicDemo1()
}
const onBindGraphicDemo2 = () => {
  mapWork.bindGraphicDemo2()
}
</script>

<style scoped lang="less">
.history-layer {
  width: 100%;
  height: 90%;
  top: 70px;
  left: 0;
  overflow: hidden;
}
.btn {
  width: 145px;
  &:nth-child(2n-1) {
    margin-right: 10px;
  }
  &:nth-child(-n+4) {
    margin-bottom: 10px;
  }
}
</style>
