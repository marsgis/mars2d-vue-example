<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="viewTo23D">分屏</mars-button>
      <mars-button @click="viewTo2d">仅2D</mars-button>
      <mars-button @click="viewTo3d">仅3D</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const viewTo23D = () => {
  mapWork.viewTo23D()
}

const viewTo2d = () => {
  mapWork.viewTo2d()
}
const viewTo3d = () => {
  mapWork.viewTo3d()
}
</script>
