<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据维护:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="mapWork.graphicLayer.hasEdit = enabledEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">透明度:</span>
        <mars-slider v-model:value="opacity" :min="0" :max="1" :step="0.1" @change="onChangeImageOpacity" />
      </a-space>
    </div>

    <data-manage />
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import * as mapWork from "./map.js"

const opacity = ref(0.8)
const enabledEdit = ref(false)

const onClickStartDraw = () => {
  mapWork.onClickStartDraw()
}

const onChangeImageOpacity = () => {
  mapWork.onChangeImageOpacity(opacity.value)
}
</script>

<style scoped lang="less">
.ant-slider {
  width: 150px;
}
</style>
