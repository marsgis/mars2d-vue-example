<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <data-manage />
    </div>

    <a-space>
      <span>图上标绘：</span>
      <mars-button @click="drawPolygon('straightArrow')">粗直箭头</mars-button>
      <mars-button @click="drawPolygon('fineArrow')">粗单尖直箭头</mars-button>
      <mars-button @click="drawPolygon('fineArrowYW')">燕尾直箭头</mars-button>
      <mars-button @click="drawPolygon('attackArrow')">攻击箭头</mars-button>

      <mars-button @click="drawPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
      <mars-button @click="drawPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
      <mars-button @click="drawPolygon('doubleArrow')">钳击箭头</mars-button>
      <mars-button @click="drawPolygon('closeVurve')">闭合曲面</mars-button>

      <mars-button @click="drawPolygon('gatheringPlace')">集结地</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
import DataManage from "@/components/mars-sample/data-manage.vue"
import * as mapWork from "./map.js"

const drawPolygon = (type: string) => {
  mapWork.drawPolygon(type)
}

</script>

<style scoped lang="less"></style>
