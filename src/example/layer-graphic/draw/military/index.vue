<template>
  <mars-dialog :visible="true" width="435" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <data-manage />
    </div>

    <a-row class="military-row">
      <a-col :span="5">图上标绘：</a-col>
      <a-col :span="19">
        <a-space>
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
      </a-col>
    </a-row>
  </mars-dialog>
</template>

<script setup lang="ts">
import { markRaw } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

const { activate, disable, isActivate, updateWidget } = useWidget()
const drawPolygon = (type: string) => {
  mapWork.drawPolygon(type)
}

// 属性面板
/* const showEditor = (e: any) => {
  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: {
        graphic: markRaw(e.graphic)
      }
    })
  } else {
    updateWidget("graphic-editor", {
      data: {
        graphic: markRaw(e.graphic)
      }
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
}) */
</script>

<style scoped lang="less">
.military-row {
  .ant-space {
    flex-wrap: wrap;
  }
}
</style>
