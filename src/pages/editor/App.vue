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
/* 二维电子图右侧预览区头部样式：深蓝电子图风格，覆盖 @marsgis/editor 默认深灰 */
.marsgis-editor__container .layout-right .layout-right__header
.marsgis-editor__container .mars-dropdown .mars-dropdown-content
.marsgis-editor__container .gutter {
  background-color: #1a3a5c !important;
  border-bottom: 1px solid #2a5278 !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3) !important;
}


.marsgis-editor__container .layout-right .layout-right__header .fullname {
  color: #e6f0fa !important;
}

/* 头部按钮/链接（收起源代码、API、教程、下载、开源、技术栈等）：天蓝可读，hover 更亮 */
.marsgis-editor__container .layout-right .layout-right__header .mars-link-btn-primary {
  color: #5cadff !important;
}

.marsgis-editor__container .layout-right .layout-right__header .mars-link-btn-primary:hover {
  color: #9fd0ff !important;
}

/* #other-intro 容器残留近黑色文字，在深蓝底上不可见，统一为浅蓝灰 */
.marsgis-editor__container .layout-right .layout-right__header #other-intro {
  color: #c0d4e8 !important;
}
</style>
