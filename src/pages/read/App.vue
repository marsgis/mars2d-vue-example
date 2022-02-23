<template>
  <ConfigProvider :locale="locale">
    <a-spin :spinning="loading" wrapperClassName="global-spin">
      <div id="mars-main-view" class="mars-main-view">
        <div id="centerDiv2D">
          <div id="mars2dContainer" class="mars2d-container"></div>
        </div>
        <main-operation v-if="showPannel" @childMounted="onChildMounted" @childUnmounted="childUnmounted" />

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
    </a-spin>
  </ConfigProvider>
</template>

<script setup lang="ts">
/**
 * 渲染主入口
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import zhCN from "ant-design-vue/es/locale/zh_CN"
import { getCurrentInstance, onMounted, provide, ref } from "vue"
import { ConfigProvider } from "ant-design-vue"
import { getQueryString } from "@mars/utils/mars-util"
import MainOperation from "@mars/components/mars-work/main-operation.vue"
import { getResourcesByLibs, loadScript, LoadSource, getCompConfig } from "mars-editor"
import { useWidget, Widget } from "@mars/widgets/common/store/widget"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

const globalProperties = getCurrentInstance()!.appContext.config.globalProperties

const resourcePath = (process.env.EXAMPLE_SOURCE_PATH || "") + "example/"

const { widgets, openAtStart, activate, isActivate, disable } = useWidget()

const locale = zhCN

const mapLoaded = ref(false) // map加载完成

const showPannel = ref(false) // 是否加载面板

let mapWork: any | null = null

let mapInstance: any = null
provide("getMapInstance", () => {
  return mapInstance
})

const loading = ref(false)

const marsOnload = (map: any) => {
  mapInstance = map
  mapLoaded.value = true
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

onMounted(async () => {
  const exampleId = getQueryString("id")

  const config = await getCompConfig(exampleId)
  if (config) {
    window.currentPath = `${resourcePath}${config?.main}/` // 当前示例的配置

    Object.defineProperty(window, "mapWork", {
      get() {
        return mapWork
      },
      set(value) {
        mapWork = value // 赋值后vue中使用
        marsOnload(window._mapInstance)
        if (config.vuePanel) {
          // 开始构造vue面板
          showPannel.value = true
        } else {
          onChildMounted()
        }
      }
    })

    const loadQueen: string[] = []
    let resources = getResourcesByLibs(config.libs, process.env.BASE_URL + "lib/")
    if (config.resources) {
      resources = resources.concat([...config.resources])
    }

    resources.forEach((dep: string) => {
      let url
      if (dep.startsWith("/") || dep.startsWith("http") || dep.startsWith(resourcePath)) {
        url = dep
      } else {
        url = resourcePath + config.main + "/" + dep
      }
      loadQueen.push(url)
    })
    loadQueen.push("temp/styles/style.css")

    LoadSource(loadQueen).then(() => {
      loadScript(`${resourcePath}${config.main}/map.js`, false)
      loadScript("/temp/scripts/common.js", false)
    })
  }
})

function onChildMounted() {
  const map = window._mapInstance

  globalProperties.map = map // map的挂载,方便vue组件内使用

  if (mapWork) {

    mapWork.map = map
    if (mapWork.onMounted) {
      mapWork.onMounted(map)
    }
  }
}

function childUnmounted() {
  if (mapWork.onUnmounted) {
    mapWork.onUnmounted()
  }
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

<style lang="less">
.mars-main-view {
  height: 100%;
  position: relative;
}
.global-spin,
.ant-spin-container {
  height: 100%;
}
</style>
