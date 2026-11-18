<template>
  <mars-dialog :visible="true" right="10" top="10">
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

// 高德路况图层已在 map.js 内做「先移除再加」，重复点击不会叠层
const addGaodeLayer = () => {
  mapWork.addGaodeLayer()
}

// 百度路况是百度坐标系（BD09），无法叠在本示例的高德/3857 底图上，
// 因此按钮改为打开百度示例看效果（真实项目里做百度路况要单独用 crs: BAIDU 的地图）
const addBaiduLayer = () => {
  window.open("/editor-vue.html?id=layer-tile/online/baidu")
}
</script>
