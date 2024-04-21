<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <span class="title-vertical_line">图上标绘</span>

    <div class="measure-btns">
      <mars-button @click="distance">长度</mars-button>
      <mars-button @click="area">测量面积</mars-button>
    </div>

    <mars-button class="w-full" @click="clearLayer" danger>清除</mars-button>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const distance = () => {
  mapWork.distance()
}

const area = () => {
  mapWork.area()
}

const clearLayer = () => {
  mapWork.clear()
}
</script>

<style scoped lang="less">
.measure-btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 10px;
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
