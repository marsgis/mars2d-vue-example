<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="createMap"> 创建地图 </mars-button>
      <mars-button @click="destroyMap"> 销毁地图 </mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const createMap = () => {
  mapWork.createMap()
}
const destroyMap = () => {
  mapWork.destroyMap()
}
</script>
