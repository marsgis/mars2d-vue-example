<template>
  <mars-dialog :visible="true" width="280" right="10" top="10">
    <div class="arc-polyline-btns">
      <mars-button @click="regenerate">重新生成</mars-button>
    </div>
    <div class="arc-polyline-tip">16 条迁徙弧线共享一个 canvas/动画循环；圆弧、发光拖尾、箭头、脉冲与终点文字对齐 leaflet.migrationLayer 效果。点击弧线可打开弹窗。</div>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

const regenerate = () => {
  mapWork.regenerate()
  $message(`已重新生成 ${mapWork.getCount()} 条弧线`)
}
</script>

<style scoped lang="less">
.arc-polyline-btns {
  display: grid;
  gap: 6px;
}

.arc-polyline-tip {
  margin-top: 8px;
  color: var(--mars-extra-text-color);
  font-size: 12px;
  line-height: 1.5;
}
</style>
