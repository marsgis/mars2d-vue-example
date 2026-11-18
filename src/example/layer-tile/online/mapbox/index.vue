<template>
  <!-- 面板按钮对应 map.js 里「方式2」的两个方法：创建地图后动态叠加 / 移除 MapboxLayer -->
  <div class="map_btn">
    <a-space :size="10">
      <mars-button @click="addLayer">
        <div class="btn_content">
          <img class="btn_img" src="/img/icon/layers.png" alt="">
          <span>叠加图层</span>
        </div>
      </mars-button>
      <mars-button @click="removeLayer">
        <div class="btn_content">
          <img class="btn_img" src="/img/icon/delete.png" alt="">
          <span> 移除图层</span>
        </div>
      </mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as mapWork from "./map.js"
import { useWidget } from "@mars/widgets/common/store/widget"

const { activate } = useWidget()

onMounted(() => {
  activate("query-poi")
})

// 叠加/移除都在 map.js 内做判空与去重，面板只负责转发点击
const addLayer = () => {
  mapWork.addLayer()
}

const removeLayer = () => {
  mapWork.removeLayer()
}
</script>
<style lang="less" scoped>
.map_btn {
  position: absolute;
  bottom: 0px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 160px;
    height: 46px;
  }

  .btn_content {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn_img {
      margin-right:8px;
    }
  }
}
</style>
