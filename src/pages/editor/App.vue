<template>
  <a-spin :spinning="loading" wrapperClassName="global-spin">
    <mars-editor ref="editorRef" :id="id" :full-name="name">
      <div class="mars-main-view" id="mars-main-view">
        <main-operation @childMounted="onChildMounted" />

        <template v-if="mapLoaded">
          <template v-for="comp in widgets" :key="comp.key">
            <component
              v-if="openAtStart.includes(comp.name) && comp.visible"
              :is="comp.component"
              v-model:visible="comp.visible"
              v-bind="getWidgetAttr(comp)"
            />
          </template>
        </template>
      </div>
    </mars-editor>
  </a-spin>
</template>

<script setup lang="ts">
import { getQueryString } from "@mars/utils/mars-util"
import { getCurrentInstance, ref, provide } from "vue"
import MainOperation from "@mars/components/mars-work/main-operation.vue"
import { useWidget, Widget } from "@mars/widgets/common/store/widget"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

const globalProperties = getCurrentInstance()!.appContext.config.globalProperties

const loading = ref(false)
const mapLoaded = ref(false) // map加载完成

const { widgets, openAtStart, activate, isActivate, disable } = useWidget()

const id = getQueryString("id")
const name = getQueryString("name")

const editorRef = ref()

let mapInstance: any = null
provide("getMapInstance", () => {
  return mapInstance
})

const marsOnload = (map: any) => {
  mapInstance = map
  mapLoaded.value = true
}

function onChildMounted() {
  editorRef.value.setMap() // 通知执行mapWork.onMounted
  marsOnload(window._mapInstance)
}

const getWidgetAttr = (widget: Widget) => {
  let attr = {}
  if (widget.meta && widget.meta.props) {
    attr = {
      ...attr,
      ...widget.meta.props
    }
  }
  if (widget.data && widget.data.props) {
    attr = {
      ...attr,
      ...widget.data.props
    }
  }
  return attr
}

let loadingNum = 0
window.$showLoading = globalProperties.$showLoading = (type = "mask") => {
  loadingNum++
  if (type === "mask") {
    loading.value = true
  } else if (type === "top") {
    nprogress.start()
    const interval = setInterval(() => {
      if (nprogress.isStarted() && nprogress.status < 0.8) {
        nprogress.set(nprogress.status + 0.1)
      } else {
        clearInterval(interval)
      }
    }, 500)
  } else {
    loadingNum--
  }
}

window.$hideLoading = globalProperties.$hideLoading = (type = "mask") => {
  loadingNum = Math.max(0, --loadingNum)
  if (loadingNum === 0) {
    if (type === "mask") {
      loading.value = false
    } else if (type === "top") {
      nprogress.done()
    } else {
      loadingNum++
    }
  }
}
</script>
<style lang="less" scoped>
.global-spin {
  height: 100%;
  :deep(.ant-spin-container) {
    height: 100%;
  }
  :deep(.ant-spin) {
    max-height: inherit !important;
  }
}
:deep(.global-spin > div) {
  height: 100%;
}
</style>
