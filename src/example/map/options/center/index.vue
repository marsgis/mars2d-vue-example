<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <label>景点视角:</label>
      <mars-button @click="changeView1">故宫</mars-button>
      <mars-button @click="changeView2">珠峰</mars-button>
      <mars-button @click="changeView3">华山</mars-button>
      <mars-button @click="changeView4">大别山</mars-button>
    </a-space>
  </mars-pannel>
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

