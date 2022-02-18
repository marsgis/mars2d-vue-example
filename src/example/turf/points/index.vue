<template>
  <mars-pannel :visible="true" right="10" top="10">
   <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">原始数据:</span>
        <mars-button @click="randomPoints">随机点</mars-button>
        <mars-button @click="clearAll">清除</mars-button>
      </a-space>
    </div>

    <a-space>
      <span class="mars-pannel-item-label">相关计算:</span>
      <mars-button @click="convexPolygon">计算包围面</mars-button>
      <mars-button @click="voronoiPolygon">计算泰森多边形</mars-button>
      <mars-button @click="tinPolygon">计算TIN多边形</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
import { ref } from "vue"


// 随机点
const randomPoints = () => {
  mapWork.randomPoints()
}

// 清除
const clearAll = () => {
  mapWork.clearlayer()
}

// 计算包围面
const convexPolygon = () => {
  mapWork.convexPolygon()
}

// 计算泰森多边形
const voronoiPolygon = () => {
  mapWork.voronoiPolygon()
}

// 计算TIN多边形
const tinPolygon = () => {
  mapWork.tinPolygon()
}
</script>
