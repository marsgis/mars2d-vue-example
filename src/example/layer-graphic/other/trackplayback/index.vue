<template>
  <mars-dialog :visible="showDialog" right="10" top="10" width="330">
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="轨迹" class="topCheckContent">
        <a-checkbox v-model:checked="formState.showTrackPoint" @change="showTrackPoint">轨迹点</a-checkbox>
        <a-checkbox v-model:checked="formState.showTrackLine" @change="showTrackLine">轨迹线</a-checkbox>
      </a-form-item>
      <a-form-item label="控制">
        <a-space>
          <mars-button v-if="!currentStatus" type="primary" @click="controlPlaying">播放</mars-button>
          <mars-button v-if="currentStatus" type="primary" @click="controlPlaying">暂停</mars-button>
          <mars-button type="primary" @click="mapWork.rePlaying">刷新</mars-button>
          <mars-button type="primary" @click="mapWork.quickSpeed">快放</mars-button>
          <mars-button type="primary" @click="mapWork.slowSpeed">慢放</mars-button>
        </a-space>
        <a-space v-if="infoData">
          <mars-slider :min="infoData.simpleStartTime" :max="infoData.simpleEndTime" @change="changeSlider" />
        </a-space>
      </a-form-item>

      <a-form-item v-if="infoData" label="信息">
        <div>开始时间：{{ infoData.startTime }}</div>
        <div>结束时间：{{ infoData.endTime }}</div>
        <div>当前时间：{{ infoData.curTime }}</div>
        <div>速度：{{ infoData.speed }}</div>
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import * as mapWork from "./map.js"

const showDialog = ref(false)
const currentStatus = ref(false) // false暂停

const infoData = ref()

const formState = reactive({
  showTrackPoint: false,
  showTrackLine: false
})

mapWork.eventTarget.on("dataLoad", ({ info }) => {

  infoData.value = {
    curTime: info.curTime,
    endTime: info.endTime,
    speed: info.speed,
    startTime: info.startTime,
    simpleCurTime: info.simpleCurTime,
    simpleStartTime: info.simpleStartTime,
    simpleEndTime: info.simpleEndTime
  }
  showDialog.value = true
})

function showTrackPoint() {
  mapWork.showTrackPoint(formState.showTrackPoint)
}
function showTrackLine() {
  mapWork.showTrackLine(formState.showTrackLine)
}

function controlPlaying() {
  mapWork.controlPlaying(!currentStatus.value)
  currentStatus.value = !currentStatus.value
}

function changeSlider(e) {
  mapWork.setCursor(e)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 220px;
}
</style>
