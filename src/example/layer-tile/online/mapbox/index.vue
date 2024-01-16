<template>
  <mars-dialog :visible="true" right="40" top="10">
    <a-space>
      <mars-button @click="addLayer"> 添加图层 </mars-button>
      <mars-button @click="removeLayer"> 移除图层 </mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as mapWork from "./map.js"
import { useWidget } from "@mars/widgets/common/store/widget"

const { activate } = useWidget()

onMounted(() => {
  activate("query-poi")
})

const addLayer = () => {
  mapWork.addLayer()
}

const removeLayer = () => {
  mapWork.removeLayer()
}
</script>
