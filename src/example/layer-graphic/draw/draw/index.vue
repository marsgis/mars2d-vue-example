<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <data-manage />
        <a-space  class="save-file">
          <mars-button @click="onClickSaveKml">另存KML</mars-button>
          <mars-button @click="onClickSaveWKT">另存WKT</mars-button>
        </a-space>
    </div>

    <a-space>
      <span>图上标绘：</span>
      <mars-button @click="drawMarker">图标点</mars-button>
      <mars-button @click="drawPoint">点</mars-button>
      <mars-button @click="drawLabel">文字</mars-button>
      <mars-button @click="drawDivMarker">DIV点</mars-button>

      <mars-button @click="drawPolyline">线</mars-button>
      <mars-button @click="drawCurveLine">自由线</mars-button>
      <mars-button @click="drawPolygon">面</mars-button>
      <mars-button @click="drawCircle">圆</mars-button>

      <mars-button @click="drawRectangle">矩形</mars-button>
      <mars-button @click="drawImage">图片</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, markRaw } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

const { activate, disable, isActivate, updateWidget } = useWidget()

const drawMarker = () => {
  mapWork.drawMarker()
}

const drawPoint = () => {
  mapWork.drawPoint()
}

const drawLabel = () => {
  mapWork.drawLabel()
}

const drawDivMarker = () => {
  mapWork.drawDivMarker()
}

const drawPolyline = () => {
  mapWork.drawPolyline()
}

const drawCurveLine = () => {
  mapWork.drawCurveLine()
}

const drawPolygon = () => {
  mapWork.drawPolygon()
}
const drawCircle = () => {
  mapWork.drawCircle()
}
const drawRectangle = () => {
  mapWork.drawRectangle()
}

const drawImage = () => {
  mapWork.drawImage()
}

const onClickSaveKml = () => {
  mapWork.onClickSaveKml()
}

const onClickSaveWKT = () => {
  mapWork.onClickSaveWKT()
}



// 属性面板
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
mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  // if (enabledEdit.value) {
    showEditor(e)
  // }
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  showEditor(e)
})

// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  disable("graphic-editor")
})

</script>

<style scoped lang="less">
.save-file {
  margin-left: 10px;
}
</style>
