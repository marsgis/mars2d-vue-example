<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
      <a-form :label-col="{ span: 3 }"
        :wrapper-col="{ span: 18 }">
        <a-form-item label="按钮" class="topCheckContent">
          <a-checkbox v-model:checked="formState.enabledView" @change="onBindView">视角复位</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledBtnLocation" @change="onBindBtnLocation">定位</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledFullScreen" @change="onBindFullScreen">全屏</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledZoomIn" @change="onBindZoomIn">地图放大</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledZoomOut" @change="onBindZoomOut">地图缩小</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledLayerPicker" @change="onBindBaseLayerPicker">底图切换</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledLayersTool" @change="onBindLayersTool">图层控制</a-checkbox>
        </a-form-item>
        <a-form-item label="面板">
          <a-checkbox v-model:checked="formState.enabledLegend" @change="onBindLegend">比例尺</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledLocation" @change="onBindLocation">鼠标提示信息(左下角)</a-checkbox>
        </a-form-item>
      </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledPOI: boolean
  enabledView: boolean
  enabledBtnLocation: boolean
  enabledSceneModePicker: boolean
  enabledBaseLayerPicker: boolean
  enabledFullScreen: boolean
  enabledVR: boolean
  enabledHelpButton: boolean

  enabledLocation: boolean
  enabledClock: boolean
  enabledTimeLine: boolean
  enabledNav: boolean
  enabledLegend: boolean
  enabledZoomIn: boolean
  enabledZoomOut: boolean
  enabledLayerPicker: boolean
  enabledLayersTool: boolean
}

const formState: UnwrapRef<FormState> = reactive({
  enabledPOI: true,
  enabledView: true,
  enabledBtnLocation: true,
  enabledSceneModePicker: true,
  enabledBaseLayerPicker: true,
  enabledFullScreen: true,
  enabledVR: true,
  enabledHelpButton: true,
  enabledZoomIn: true,
  enabledZoomOut: true,

  enabledLocation: true,
  enabledClock: true,
  enabledTimeLine: true,
  enabledNav: true,
  enabledLegend: true,
  enabledLayerPicker: true,
  enabledLayersTool: true
})

// 按钮
const onBindView = () => {
  mapWork.bindView(formState.enabledView)
}
const onBindBtnLocation = () => {
  mapWork.bindBtnLocation(formState.enabledBtnLocation)
}

const onBindFullScreen = () => {
  mapWork.bindFullScreen(formState.enabledFullScreen)
}

const onBindZoomIn = () => {
  mapWork.bindZoomIn(formState.enabledZoomIn)
}
const onBindZoomOut = () => {
  mapWork.bindZoomOut(formState.enabledZoomOut)
}
const onBindBaseLayerPicker = () => {
  mapWork.bindBaseLayerPicker(formState.enabledLayerPicker)
}
const onBindLayersTool = () => {
  mapWork.bindBindLayersTool(formState.enabledLayersTool)
}

// 面板
const onBindLocation = () => {
  mapWork.bindLocationBar(formState.enabledLocation)
}
const onBindLegend = () => {
  mapWork.bindLegend(formState.enabledLegend)
}
</script>
<style lang="less" scoped>
:deep(.ant-form-item-control-input) {
  width:260px;
  margin-left: 10px;
}

.topCheckContent .ant-form-item-control-input-content label {
  margin-bottom: 8px;
}

.topCheckContent {
  :deep(.ant-form-item-label) {
    display: flex;
    margin-top: -7px !important;
  }
}
</style>
