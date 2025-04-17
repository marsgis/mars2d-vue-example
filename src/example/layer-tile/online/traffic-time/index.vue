<template>
  <mars-dialog :visible="true" right="10" top="10" >
    <a-space>
      <mars-button @click="addGaodeLayer">高德交通态势图</mars-button>
      <mars-button @click="addBaiduLayer">百度交通态势图</mars-button>
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

const addGaodeLayer = () => {
  mapWork.addGaodeLayer()
}

const addBaiduLayer = () => {
  window.open("/editor-vue.html?id=layer-tile/online/baidu")
}
</script>
