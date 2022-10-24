<template>
  <mars-dialog :visible="true" width="592" right="10" top="10">
    <div class="f-mb">
      <a-row>
        <a-col :span="3">图层状态:</a-col>
        <a-col :span="21">
          <a-space>
            <a-checkbox v-model:checked="enabledShowHide" @change="onChangeShow">显示隐藏</a-checkbox>
            <a-checkbox v-model:checked="enabledPopup" @change="onChangePopup">Popup绑定</a-checkbox>
            <a-checkbox v-model:checked="enabledTooltip" @change="onChangeTooltip">Tooltip</a-checkbox>
            <a-checkbox v-model:checked="enabledRightMenu" @change="onChangeContextMenu">右键绑定</a-checkbox>
            <a-checkbox v-model:checked="isEditable" @change="isEditableChange">是否编辑</a-checkbox>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <data-manage />
    </div>

    <a-row class="military-row">
      <a-col :span="3">图上标绘：</a-col>
      <a-col :span="21">
        <a-space>
          <mars-button @click="drawPolygon('straightArrow')">粗直箭头</mars-button>
          <mars-button @click="drawPolygon('fineArrow')">粗单尖直箭头</mars-button>
          <mars-button @click="drawPolygon('fineArrowYW')">燕尾直箭头</mars-button>
          <mars-button @click="drawPolygon('attackArrow')">攻击箭头</mars-button>

          <mars-button @click="drawPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
          <mars-button @click="drawPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          <mars-button @click="drawPolygon('doubleArrow')">钳击箭头</mars-button>
          <mars-button @click="drawPolygon('closeVurve')">闭合曲面</mars-button>

          <mars-button @click="drawPolygon('gatheringPlace')">集结地</mars-button>
        </a-space>
      </a-col>
    </a-row>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

const { activate, disable, isActivate, updateWidget } = useWidget()
const drawPolygon = (type: string) => {
  mapWork.drawPolygon(type)
}

onMounted(() => {
  const mars2d = window.mapWork.mars2d
  // 矢量数据创建完成
  mapWork.graphicLayer.on(mars2d.EventType.drawCreated, function (e) {
    showEditor(e)
  })
  mapWork.graphicLayer.on("editStart editMovePoint editStyle editRemovePoint", function (e) {
    showEditor(e)
  })

  mapWork.graphicLayer.on("editStop removeGraphic ", function (e) {
    setTimeout(() => {
      disable("graphic-editor")
    }, 100)
  })
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
const enabledPopup = ref(false)
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
</style>
