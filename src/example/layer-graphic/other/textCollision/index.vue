<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-checkbox v-model:checked="enabled" @change="onChangeEnabled"> 是否文本碰撞检测</a-checkbox>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const enabled = ref(true)
const onChangeEnabled = () => {
  mapWork.setCollisionDetection(enabled.value)
}
</script>

<style scoped lang="less"></style>
