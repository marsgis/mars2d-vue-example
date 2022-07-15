<template>
  <mars-dialog
    ><div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-dialog-item-label">数据维护:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="mapWork.graphicLayer.hasEdit = enabledEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <data-manage />
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, markRaw } from "vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import * as mapWork from "./map.js"

const { activate, disable, isActivate, updateWidget } = useWidget()
const enabledEdit = ref(false)

const onClickStartDraw = () => {
  mapWork.onClickStartDraw()
}

// 属性面板
const showEditor = (e: any) => {
  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: { graphic: markRaw(e.graphic) }
    })
  } else {
    updateWidget("graphic-editor", {
      data: { graphic: markRaw(e.graphic) }
    })
  }
}
mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  // if (enabledEdit.value) {
  showEditor(e)
  // }
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  showEditor(e)
})

// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  disable("graphic-editor")
})
</script>
