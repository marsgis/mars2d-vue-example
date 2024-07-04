<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-form-item label="rgb叠加颜色">
      <mars-color-picker v-model:value="color" @change="onChangeColor" />
    </a-form-item>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const color = ref("rgb(51, 59, 112)")
const onChangeColor = () => {
  const colorRgb = color.value.toLowerCase()
  mapWork.onChangeColor(colorRgb)
}
</script>
