<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span>数据:</span>
        <mars-button @click="drawPolygon">绘制障碍面</mars-button>
        <mars-button @click="startPoint">绘制起点</mars-button>
        <mars-button @click="endPoint">绘制终点</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>计算:</span>
        <mars-button @click="shortestPath">最短路径</mars-button>
        <mars-button @click="clearAll">清除</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 绘制障碍面
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 绘制起点
const startPoint = () => {
  mapWork.startPoint()
}
// 绘制终点
const endPoint = () => {
  mapWork.endPoint()
}
// 计算最短路径
const shortestPath = () => {
  mapWork.shortestPath()
}
// 清除
const clearAll = () => {
  mapWork.clearLayer()
}
</script>
<style scoped lang="less">
.mars-dialog-item-label {
  width: 30px;
}
</style>
