<template>
  <config-provider :locale="locale">
    <main-operation @childMounted="onChildMounted" />
    <template v-if="mapLoaded">
      <template v-for="comp in widgets" :key="comp.key">
        <mars-widget v-if="openAtStart.includes(comp.name) && comp.visible" v-model:visible="comp.visible"
          :widget="comp" />
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
import locale from "ant-design-vue/es/locale/zh_CN"
import { markMapWorkReady } from "@mars/utils/map-work"

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

// 同一次地图业务（同一个 mapWork）只执行一次 onMounted，
// 防止面板重复挂载导致图层等对象被创建两次
let initedMapWork: any = null

function onChildMounted() {
  if (initedMapWork === window.mapWork) {
    return
  }
  initedMapWork = window.mapWork

  try {
    window.marsEditor.useLifecycle() // 通知执行mapWork.onMounted
  } catch (err) {
    // 单个示例 map.js 初始化异常时，不影响面板继续渲染（具体错误可查看控制台）
    console.error("[example] mapWork.onMounted 执行失败", err)
  } finally {
    // 地图业务初始化完成，通知面板组件（如 graphic-layer-state.vue）再访问图层等对象
    markMapWorkReady()
    marsOnload(window._mapInstance)
  }
}
</script>
<style lang="less">
.marsgis-editor__container .layout-right {
  position: absolute !important;
}
</style>
