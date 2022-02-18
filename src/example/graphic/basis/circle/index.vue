<template>
  <mars-pannel
    ><div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据维护:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="mapWork.graphicLayer.hasEdit = enabledEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <data-manage />
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
import DataManage from "@/components/mars-sample/data-manage.vue"
import * as mapWork from "./map.js"

const enabledEdit = ref(false)

const onClickStartDraw = () => {
  mapWork.onClickStartDraw()
}
</script>
