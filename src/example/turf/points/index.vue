<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <span class="title-vertical_line">相关计算</span>

    <div class="points-btns f-mb">
      <mars-button @click="convexPolygon">计算包围面</mars-button>
      <mars-button class="f-fs12" @click="voronoiPolygon">计算泰森多边形</mars-button>
      <mars-button class="f-fs12" @click="tinPolygon">计算TIN多边形</mars-button>

    </div>

    <div class="points-btns btns-little">
      <mars-button @click="randomPoints">随机点</mars-button>
      <mars-button @click="clearAll" danger>清除</mars-button>
    </div>
  </mars-dialog>
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

<style scoped lang="less">
.points-btns {
  display: grid;
  grid-template-columns: repeat(3, 94px);
  gap: 10px;
}

.btns-little {
  grid-template-columns: repeat(2, 146px);
}

// 有竖线的标题
.title-vertical_line {
  padding-left: 12px;
  font-family: var(--mars-font-family);
  font-size: 14px;
  font-weight: normal;
  color: var(--mars-control-text);
  position: relative;
  margin-bottom: 8px;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 0;
    width: 4px;
    height: 18px;
    border-radius: 2px;
    background-color: var(--mars-primary-color);
  }
}
</style>
