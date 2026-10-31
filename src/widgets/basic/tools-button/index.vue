<template>
  <div></div>
</template>

<script setup lang="ts">
/**
 * 导航菜单按钮 （控件）
 * @copyright mars2d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import { onUnmounted } from "vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import * as mapWork from "./map"

const { activate, isActivate, disable } = useWidget()

// 启用map.ts生命周期
useLifecycle(mapWork)

mapWork.eventTarget.on("openManageLayer", () => {
  if (!isActivate("manage-layers")) {
    activate("manage-layers")
  } else {
    disable("manage-layers")
  }
})
mapWork.eventTarget.on("openManageBasemaps", () => {
  if (!isActivate("manage-basemap")) {
    activate("manage-basemap")
  } else {
    disable("manage-basemap")
  }
})

// 控件销毁时清理事件中心，避免重复挂载后回调叠加
onUnmounted(() => {
  mapWork.eventTarget.off()
})
</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
