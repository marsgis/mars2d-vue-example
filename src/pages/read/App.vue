<template>
  <config-provider :locale="locale">
    <main-operation @childMounted="onChildMounted" />
    <template v-if="mapLoaded">
      <template v-for="comp in widgets" :key="comp.key">
        <mars-widget v-if="openAtStart.includes(comp.name) && comp.visible" v-model:visible="comp.visible" :widget="comp" />
      </template>
    </template>
  </config-provider>
</template>

<script setup lang="ts">
import { ref, provide, computed } from "vue"
import MainOperation from "@mars/components/mars-work/main-operation.vue"
import { useWidgetStore } from "@mars/widgets/common/store/widget"
import MarsWidget from "@mars/widgets/widget.vue"
import { ConfigProvider } from "ant-design-vue"
import locale from "ant-design-vue/lib/locale-provider/zh_CN"

const widgetStore = useWidgetStore()

const mapLoaded = ref(false) // map加载完成

const widgets = computed(() => widgetStore.state.widgets)
const openAtStart = computed(() => widgetStore.state.openAtStart)

let mapInstance: any = null
provide("getMapInstance", () => {
  return mapInstance
})

const marsOnload = (map: any) => {
  mapInstance = map
  mapLoaded.value = true
}

function onChildMounted() {
  window.marsEditor.useLifecycle() // 通知执行mapWork.onMounted
  marsOnload(window._mapInstance)
}
</script>
<style lang="less">
.marsgis-editor__container .layout-right {
  position: absolute !important;
}
</style>
