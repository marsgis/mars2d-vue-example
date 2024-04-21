<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="label">景点视角:</div>
    <a-space>
      <mars-button class="btn" @click="changeView1">故宫</mars-button>
      <mars-button class="btn" @click="changeView2">珠峰</mars-button>
      <mars-button class="btn" @click="changeView3">华山</mars-button>
      <mars-button class="btn" @click="changeView4">大别山</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"


const changeView1 = () => {
  mapWork.changeView1()
}
const changeView2 = () => {
  mapWork.changeView2()
}
const changeView3 = () => {
  mapWork.changeView3()
}

const changeView4 = () => {
  mapWork.changeView4()
}
</script>
<style lang="less" scoped>
.label {
  margin-bottom: 10px;
  font-size: 14px;
}
.btn {
  width: 69px;
}
</style>

