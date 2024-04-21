<template>
  <div class="map_btn">
    <a-space :size="10">
      <mars-button @click="createMap">
        <div class="btn_content">
          <img class="btn_img" src="/img/icon/earth.png" alt="">
          <span>创建地图</span>
        </div>
      </mars-button>
      <mars-button @click="destroyMap">
        <div class="btn_content">
          <img class="btn_img" src="/img/icon/delete.png" alt="">
          <span> 销毁地图</span>
        </div>
      </mars-button>
    </a-space>
  </div>
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
<style lang="less" scoped>
.map_btn {
  position: absolute;
  top: 10px;
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
