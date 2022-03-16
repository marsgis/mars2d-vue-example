<template>
  <mars-dialog title="底图" :width="360" :height="360" :top="50" :right="10">
    <ul class="basemap">
      <li v-for="(item, i) in baseMaps" :key="i" class="basemap-card" :class="{ 'active-card': active === item.uuid }" @click="changeBaseMaps(item)">
        <div><img class="icon" :src="`${item.options.icon || 'img/basemaps/bingAerial.png'}`" /></div>
        <div>{{ item.name }}</div>
      </li>
    </ul>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onUnmounted, ref, markRaw } from "vue"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import * as mapWork from "./map"

// 启用map.ts生命周期
useLifecycle(mapWork)

const baseMaps = ref<any[]>([])

const active = ref("")

const chkHasTerrain = ref(false)

mapWork.eventTarget.on("mapLoaded", initData)

onUnmounted(() => {
  mapWork.eventTarget.off("mapLoaded", initData)
})

function initData(e: any) {
  baseMaps.value = e.baseMaps.map((m: any) => {
    if (m.isAdded && m.show) {
      active.value = m.uuid
    }
    return {
      name: m.name,
      uuid: m.uuid,
      options: markRaw(m.options)
    }
  })

  chkHasTerrain.value = e.hasTerrain || false
}

function changeBaseMaps(item: any) {
  mapWork.changeBaseMaps((active.value = item.uuid))
}
</script>
<style lang="less" scoped>
.basemap {
  height: calc(100% - 40px);
}
.basemap-card {
  display: inline-block;
  width: 75px;
  list-style-type: none;
  margin-top: 10px;
  margin-left: 10px;
  float: left;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: @mars-basecolor;
  &:hover {
    .active-card();
  }
  .icon {
    border: 2px solid @mars-basecolor-reverse;
    width: 75px;
    height: 70px;
  }
}

.active-card {
  color: @primary-color !important;
  .icon {
    border-color: @primary-color;
  }
}
</style>
