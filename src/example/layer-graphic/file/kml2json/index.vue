<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <!-- <a-space> -->
    <div class="example-list">
      <mars-button @click="shoRailway">铁路</mars-button>
      <mars-button @click="showExpressway">高速公路</mars-button>
      <mars-button @click="showMeteorological">气象等值面</mars-button>
      <mars-button class="gdp-btn" @click="showGDP">国家GDP数据</mars-button>
      <mars-button class="gdp-btn" @click="showSafetyNotice">海上安全通告</mars-button>
    </div>

    <!-- </a-space> -->
    <div class="f-pt">
      <layer-state />
    </div>
  </mars-dialog>

  <!-- <mars-dialog :visible="true" right="10" top="120" customClass="pannel">
    <mars-tree checkable :tree-data="treeData" @check="checkedChange" v-model:checkedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog> -->
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const treeData = ref<any[]>([
  {
    title: "全部",
    key: 0,
    id: -1,
    children: []
  }
])
const selectedKeys = ref<string[]>([])
const expandedKeys = ref<any[]>([])
expandedKeys.value.push(0)

const layersObj: any = {}

mapWork.treeEvent.on("tree", (event: any) => {
  initTree(event)
})

const checkedChange = (_keys: string[], checkedNodes: any) => {
  const node = checkedNodes.node
  if (!node.children && node.checked) {
    layersObj[node.key].show = false
  }
  if (!node.children && !node.checked) {
    layersObj[node.key].show = true
  }

  if (node.id === -1 && node.checked) {
    node.children.forEach((element: any) => {
      layersObj[element.key].show = false
    })
  }
  if (node.id === -1 && !node.checked) {
    node.children.forEach((element: any) => {
      layersObj[element.key].show = true
    })
  }
  mapWork.flyToEntity()
}

// 初始化树控件
function initTree(event: any) {
  const modelList = event.treeData

  const tree = []
  const selects: string[] = []
  for (let i = 0; i < modelList.length; i++) {
    const node = modelList[i].graphic

    if (node) {
      const nodeList: any = {
        title: node.name || "未命名",
        key: node.id
      }
      tree.push(nodeList)
      selects.push(nodeList.key)
      layersObj[nodeList.key] = node
    }
  }
  treeData.value[0].children = tree

  nextTick(() => {
    selectedKeys.value = selects
  })
}

const shoRailway = () => {
  selectedKeys.value = []

  mapWork.shoRailway()
}
const showExpressway = () => {
  selectedKeys.value = []

  mapWork.showExpressway()
}
const showMeteorological = () => {
  selectedKeys.value = []

  mapWork.showMeteorological()
}
const showGDP = () => {
  selectedKeys.value = []

  mapWork.showGDP()
}
const showSafetyNotice = () => {
  selectedKeys.value = []

  mapWork.showSafetyNotice()
}
</script>
<style lang="less">
.pannel {
  max-height: 750px;
  overflow-y: auto;
}

.example-list {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  align-content: center;
  flex-wrap: wrap;

  .gdp-btn {
    padding-left: 5px;
  }

  .mars-button {
    width: 93px;
  }
}
</style>
