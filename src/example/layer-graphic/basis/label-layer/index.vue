<template>
  <mars-dialog :visible="true" width="300" right="10" top="10">
    <div class="label-layer-btns">
      <mars-button @click="toggleCollision">{{ collision ? "碰撞：开" : "碰撞：关" }}</mars-button>
      <mars-button @click="showBatch">追加3千标签</mars-button>
      <mars-button danger @click="clearBatch">清理追加</mars-button>
    </div>
    <div class="label-layer-tip">sourceLayer 读取图形 labelStyle；线标签按切线旋转。</div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

const collision = ref(true)

const toggleCollision = () => {
  collision.value = !collision.value
  mapWork.setCollision(collision.value)
}

const showBatch = () => {
  const start = performance.now()
  mapWork.addBatch(3000)
  $message(`已追加 3000 条，用时 ${Math.round(performance.now() - start)} ms，共 ${mapWork.getCount()} 条`)
}

const clearBatch = () => {
  mapWork.clearBatch()
  $message(`已清理追加数据，当前 ${mapWork.getCount()} 条`)
}
</script>

<style scoped lang="less">
.label-layer-btns {
  display: grid;
  gap: 6px;
  grid-template-columns: 1fr;
}

.label-layer-tip {
  margin-top: 8px;
  color: var(--mars-extra-text-color);
  font-size: 12px;
  line-height: 1.5;
}
</style>
