<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <mars-slider  v-model:value="rotate" :min="0.0" :max="360.0" :step="0.1" @change="changeRotate" ></mars-slider>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"

onMounted(() => {
  mapWork.map.on("rotate", function () {
    rotate.value = mapWork.map.getBearing()
  })
})

const rotate = ref(0)

function changeRotate() {
  mapWork.changeRotate(rotate.value)
}

</script>
