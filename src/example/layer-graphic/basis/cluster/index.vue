<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="onCheckDefault">默认样式</mars-button>
      <mars-button @click="onCheckCustom">自定义样式</mars-button>
      <mars-button @click="onCheckPhoto">照片点</mars-button>
      <mars-button @click="onCheckClear">清除</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"

const onCheckDefault = () => {
  mapWork.addLayer()
}
const onCheckCustom = () => {
  mapWork.addCustomLayer()
}
const onCheckPhoto = () => {
  mapWork.addCustomPhotoLayer()
}
const onCheckClear = () => {
  mapWork.removeLayer()
}
</script>
