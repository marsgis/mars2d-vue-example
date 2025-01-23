<template>
  <mars-dialog :nopadding = "true" :draggable="true" title="属性编辑" width="315" top="60" bottom="40" left="10" :minWidth="200">
    <div class="top-handle-bar">
      <a-space>
        <mars-icon icon="send" width="20" @click="flyToGraphic" title="飞行定位"></mars-icon>
        <mars-icon icon="delete" width="20" @click="deleteEntity" title="删除"></mars-icon>
        <mars-icon icon="save" width="20" @click="getGeoJson" title="导出geojson"></mars-icon>
      </a-space>
    </div>
    <div class="attr-editor-main">
      <mars-styles :style="style" :layerName="layerName" :customType="customType" :graphicType="graphicType" @styleChange="styleChange" />
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from "vue"
import _ from "lodash"
import MarsStyles from "./mars-styles.vue"
import * as mapWork from "./map"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import { useWidget } from "@mars/widgets/common/store/widget"

const { currentWidget } = useWidget()

const layerName = ref("")
const customType = ref("")
const graphicType = ref("")
const style = ref(null)
let graphic

// 启用map.ts生命周期
useLifecycle(mapWork)

onMounted(() => {
  graphic = currentWidget.data.graphic
  updataLayer()
})

if (currentWidget) {
  currentWidget.onUpdate((e) => {
    graphic = e.data?.graphic
    updataLayer()
  })
}

// 监听到矢量数据发生变化
function updataLayer() {
  if (!graphic) {
    return
  }

  layerName.value = graphic._layer?.name || ""
  graphicType.value = graphic.type
  customType.value = currentWidget.data.styleType || graphic.options.styleType

  // console.log("开始编辑style样式", graphic)
  style.value = _.cloneDeep(graphic.style)
}

// 样式修改
function styleChange(style: any) {
  style = toRaw(style)
  // console.log("修改了style样式", style)
  const opacity = getOpacity(style.fillColor)
  if (style.fillColor && opacity) {
    style.fillOpacity = opacity * 1
  }
  graphic.setStyle(style)
}

function getOpacity(str) {
  if (str) {
    const regex = /\(([^)]+)\)/
    const match = str.match(regex)

    if (match && match[1] && match[1].split(",").length === 4) {
      return match[1].split(",")[3]
    }
  }

  return null
}

// *********************  删除定位保存文件方法  ******************* //
function getGeoJson() {
  const geojson = graphic.toGeoJSON() // 文件处理
  geojson.properties._layer = graphic._layer.name

  mapWork.downloadFile("标绘item.json", JSON.stringify(geojson))
}

function flyToGraphic() {
  mapWork.flyToGrapgic(graphic) // 事件处理
}

function deleteEntity() {
  graphic.remove() // 删除
}
</script>
<style lang="less" scoped>
.top-handle-bar {
  border-bottom: 1px solid #cde1de;
  padding: 5px 0 2px 12px;

  :deep(.mars-icon) {
    cursor: pointer;
  }
}

.attr-editor-main {
  // 编辑面板高度问题
  height: calc(100% - 70px);
  overflow-y: auto;

  :deep(*) {
    font-size: 12px;
  }
}

:deep(.ant-tabs-nav) {
  margin: 0;
}

:deep(.ant-select),
:deep(.ant-input-number) {
  width: 100%;
}
</style>
