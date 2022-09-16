<template>
  <mars-dialog :visible="true" right="10" top="10">
    <graphic-layer-state :enabledDraw="false" />
  </mars-dialog>
</template>

<script setup lang="ts">
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
</script>
