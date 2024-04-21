<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-checkbox v-model:checked="enabledSmallTooltip" @change="formStateChange">启用/禁用</a-checkbox>
  </mars-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const enabledSmallTooltip = ref<boolean>(true)
const formStateChange = () => {
  mapWork.enabledSmallTooltip(enabledSmallTooltip.value)
}
</script>
