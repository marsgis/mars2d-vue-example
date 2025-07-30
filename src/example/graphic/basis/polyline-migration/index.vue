<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="setData">初始化</mars-button>
      <mars-button @click="hide">隐藏</mars-button>
      <mars-button @click="show">显示</mars-button>
      <mars-button @click="pause">暂停</mars-button>
      <mars-button @click="play">播放</mars-button>
      <mars-button @click="destroy">销毁</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const setData = () => {
  mapWork.setData()
}
const hide = () => {
  mapWork.hide()
}
const show = () => {
  mapWork.show()
}
const pause = () => {
  mapWork.pause()
}
const play = () => {
  mapWork.play()
}
const destroy = () => {
  mapWork.destroy()
}
</script>
