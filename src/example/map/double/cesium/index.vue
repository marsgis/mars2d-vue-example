<template>
  <div class="mars-onlybtns-pannel">
    <a-space>
      <mars-button @click="viewTo23D">分屏</mars-button>
      <mars-button @click="viewTo2d">仅2D</mars-button>
      <mars-button @click="viewTo3d">仅3D</mars-button>
    </a-space>
  </div>
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
