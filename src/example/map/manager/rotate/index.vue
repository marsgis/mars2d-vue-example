<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <mars-slider  v-model:value="rotate" :min="0.0" :max="360.0" :step="0.1" @change="changeRotate" ></mars-slider>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as mapWork from "./map.js"

const rotate = ref(0)

const onMapRotate = () => {
  rotate.value = mapWork.map.getBearing()
}

onMounted(() => {
  mapWork.map.on("rotate", onMapRotate)
})

onBeforeUnmount(() => {
  // map.js 的 onUnmounted 会把 map 置空，这里需判空
  if (mapWork.map) {
    mapWork.map.off("rotate", onMapRotate)
  }
})

function changeRotate() {
  mapWork.changeRotate(rotate.value)
}

</script>
