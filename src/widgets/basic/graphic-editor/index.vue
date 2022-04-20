<template>
  <mars-dialog title="属性编辑" width="260" top="60" bottom="40" left="10" :minWidth="200">
    <div class="top-handle-bar">
      <a-space>
        <mars-icon icon="send" width="20" @click="flyToGraphic" title="飞行定位"></mars-icon>
        <mars-icon icon="delete" width="20" @click="deleteEntity" title="删除"></mars-icon>
        <mars-icon icon="save" width="20" @click="getGeoJson" title="导出geojson"></mars-icon>
      </a-space>
    </div>
    <div class="attr-editor-main">
      <mars-styles :styleConfig="styleConfig" :style="style" @styleChange="styleChange" />
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from "vue"
import useLifecycle from "@mars/widgets/common/uses/use-lifecycle"
import MarsStyles from "./mars-styles.vue"
import graphicAttr from "./attr.json"
import * as mapWork from "./map"
import _ from "lodash"
import { useWidget } from "@mars/widgets/common/store/widget"

const { currentWidget } = useWidget()

// 启用map.ts生命周期
useLifecycle(mapWork)

provide("getGraphicAttr", () => {
  return graphicAttr
})

const graphic = currentWidget.data.graphic
provide("getGraphic", () => {
  return graphic
})

const styleConfig = ref(null)
const style = ref(null)

onMounted(() => {
  updataLayer()
})

// 监听到矢量数据发生变化
function updataLayer(graphicLayer?: any) {
  let gp: any
  if (graphicLayer) {
    gp = graphicLayer
  } else {
    gp = graphic
  }
  if (gp) {
    style.value = _.cloneDeep(gp.style)
    const config = (graphicAttr as any)[gp.options.edittype || gp.type] || {}
    styleConfig.value = config
  }
}

if (currentWidget) {
  currentWidget.onUpdate((e) => {
    updataLayer(e.data.graphic)
  })
}

function flyToGraphic() {
  // 事件处理
  graphic.flyTo()
}

function deleteEntity() {
  // 删除
  graphic.remove()
}

function getGeoJson() {
  // 文件处理
  const geojson = graphic.toGeoJSON()
  geojson.properties._layer = graphic._layer.name

  mapWork.downloadFile("标绘item.json", JSON.stringify(geojson))
}

function styleChange(style: any) {
  console.log("修改了graphic样式", style)
  graphic.setStyle(style)
}
</script>
<style lang="less" scoped>
.top-handle-bar {
  border-bottom: 1px solid #cde1de;
  padding: 5px 0 2px 0;
  :deep(.i-icon) {
    cursor: pointer;
  }
}
.attr-editor-main {
  height: calc(100% - 40px);
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
