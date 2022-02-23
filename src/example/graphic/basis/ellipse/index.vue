<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>

    <data-manage />
  </mars-pannel>
</template>

<script setup lang="ts">
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import * as mapWork from "./map.js"
</script>
