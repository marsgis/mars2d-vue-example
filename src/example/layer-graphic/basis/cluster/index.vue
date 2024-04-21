<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <a-space>
      <mars-button @click="onCheckDefault">默认样式</mars-button>
      <mars-button @click="onCheckCustom">自定义样式</mars-button>
      <mars-button @click="onCheckPhoto">照片点</mars-button>
    </a-space>
    <mars-button class="w-full" @click="onCheckClear" danger>清除</mars-button>
  </mars-dialog>
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

<style scoped lang="less">
.ant-space {
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;

  :deep(.ant-space-item) {
    flex-grow: 1;

    .mars-button {
      width: 100%;
    }
  }
}
</style>
