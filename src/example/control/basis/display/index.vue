<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span>按钮:</span>
        <a-checkbox v-model:checked="formState.enabledView" @change="onBindView">视角复位</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledBtnLocation" @change="onBindBtnLocation">定位</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledFullScreen" @change="onBindFullScreen">全屏</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledZoomIn" @change="onBindZoomIn">地图放大</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledZoomOut" @change="onBindZoomOut">地图缩小</a-checkbox>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>面板:</span>
        <a-checkbox v-model:checked="formState.enabledLegend" @change="onBindLegend">比例尺</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledLocation" @change="onBindLocation">鼠标提示信息(左下角)</a-checkbox>
      </a-space>
    </div>
  </mars-pannel>
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
  enabledLegend: true
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

// 面板
const onBindLocation = () => {
  mapWork.bindLocationBar(formState.enabledLocation)
}
const onBindLegend = () => {
  mapWork.bindLegend(formState.enabledLegend)
}
</script>
