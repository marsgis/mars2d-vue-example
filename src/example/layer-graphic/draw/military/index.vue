<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <div class="f-mb">
      <a-row>
        <a-col :span="6">图层状态:</a-col>
        <a-col :span="18">
          <div class="military-checkboxs">
            <a-checkbox v-model:checked="enabledShowHide" @change="onChangeShow">显示</a-checkbox>
            <a-checkbox v-model:checked="enabledPopup" @change="onChangePopup">Popup</a-checkbox>
            <a-checkbox v-model:checked="enabledTooltip" @change="onChangeTooltip">Tooltip</a-checkbox>
            <a-checkbox v-model:checked="enabledRightMenu" @change="onChangeContextMenu">右键菜单</a-checkbox>
            <a-checkbox v-model:checked="isEditable" @change="isEditableChange">是否编辑</a-checkbox>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <data-manage :labelSpan="6" />
    </div>

    <a-row class="military-row">
      <a-col :span="6">图上标绘：</a-col>
      <a-col :span="18">
        <div class="military-btns">
          <mars-button @click="drawPolygon('straightArrow')">粗直箭头</mars-button>
          <mars-button @click="drawPolygon('fineArrow')">粗单尖直箭头</mars-button>
          <mars-button @click="drawPolygon('fineArrowYW')">燕尾直箭头</mars-button>
          <mars-button @click="drawPolygon('attackArrow')">攻击箭头</mars-button>

          <mars-button @click="drawPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
          <mars-button @click="drawPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          <mars-button @click="drawPolygon('doubleArrow')">钳击箭头</mars-button>
          <mars-button @click="drawPolygon('closeVurve')">闭合曲面</mars-button>

          <mars-button @click="drawPolygon('gatheringPlace')">集结地</mars-button>
        </div>
      </a-col>
    </a-row>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, onBeforeUnmount } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import { onMapWorkReady } from "@mars/utils/map-work"
import * as mapWork from "./map.js"

const { activate, disable, isActivate, updateWidget } = useWidget()
const drawPolygon = (type: string) => {
  mapWork.drawPolygon(type)
}

// map.js 的 onMounted 里才创建 graphicLayer，面板挂载与它没有固定先后顺序，
// 因此等"地图业务就绪"后再绑定图层事件，避免访问 undefined
let graphicLayerIns: any = null
let mars2dIns: any = null
let offMapWorkReady: (() => void) | null = null
let closeEditorTimer: ReturnType<typeof setTimeout> | null = null

const onDrawCreated = (e: any) => {
  showEditor(e)
}
const onEditStart = (e: any) => {
  showEditor(e)
}
const onEditStop = () => {
  // 停止编辑后属性面板还要接收最后一次更新，延迟 100ms 再关闭
  if (closeEditorTimer) {
    clearTimeout(closeEditorTimer)
  }
  closeEditorTimer = setTimeout(() => {
    closeEditorTimer = null
    disable("graphic-editor")
  }, 100)
}

onMounted(() => {
  offMapWorkReady = onMapWorkReady((mapWorkIns: any) => {
    graphicLayerIns = mapWorkIns.graphicLayer
    mars2dIns = mapWorkIns.mars2d
    if (!graphicLayerIns) {
      return
    }
    // 矢量数据创建完成
    graphicLayerIns.on(mars2dIns.EventType.drawCreated, onDrawCreated)
    graphicLayerIns.on("editStart editMovePoint editStyle editRemovePoint", onEditStart)

    graphicLayerIns.on("editStop removeGraphic ", onEditStop)
  })
})

onBeforeUnmount(() => {
  if (offMapWorkReady) {
    offMapWorkReady()
    offMapWorkReady = null
  }
  if (closeEditorTimer) {
    clearTimeout(closeEditorTimer)
    closeEditorTimer = null
  }
  // 解绑面板注册的图层事件，避免切换示例后旧面板回调残留
  if (graphicLayerIns) {
    graphicLayerIns.off(mars2dIns.EventType.drawCreated, onDrawCreated)
    graphicLayerIns.off("editStart editMovePoint editStyle editRemovePoint", onEditStart)
    graphicLayerIns.off("editStop removeGraphic ", onEditStop)
    graphicLayerIns = null
  }
})

const isEditable = ref(true)

const isEditableChange = () => {
  mapWork.graphicLayer.hasEdit = isEditable.value
}

// 显示隐藏
const enabledShowHide = ref(true)
const onChangeShow = () => {
  mapWork.graphicLayer.show = enabledShowHide.value
}

// 是否绑定Popup
const enabledPopup = ref(true)
const onChangePopup = () => {
  if (enabledPopup.value) {
    mapWork.bindLayerPopup()
  } else {
    mapWork.graphicLayer.unbindPopup()
  }
}

// 是否绑定Tooltip
const enabledTooltip = ref(false)
const onChangeTooltip = () => {
  if (enabledTooltip.value) {
    mapWork.graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    mapWork.graphicLayer.unbindTooltip()
  }
}

// 是否绑定右键菜单
const enabledRightMenu = ref(true)
const onChangeContextMenu = () => {
  if (enabledRightMenu.value) {
    mapWork.bindLayerContextMenu()
  } else {
    mapWork.graphicLayer.unbindContextMenu(true)
  }
}

const showEditor = (e: any) => {
  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: { graphic: markRaw(e.graphic) }
    })
  } else {
    updateWidget("graphic-editor", {
      data: { graphic: markRaw(e.graphic) }
    })
  }
}
</script>

<style scoped lang="less">
.military-row {
  .ant-space {
    flex-wrap: wrap;
  }
}

.military-checkboxs {
  display: flex;
  gap: 8px 3px;
  flex-wrap: wrap;
}

.military-btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 8px;
}
</style>
