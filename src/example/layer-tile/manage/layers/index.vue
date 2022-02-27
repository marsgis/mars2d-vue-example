<template>
  <mars-pannel :visible="true" right="10" top="10">
    <mars-tree checkable :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys" @check="checkedChange">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </mars-tree>
  </mars-pannel>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

const treeData = ref<any[]>([])

const expandedKeys = ref<string[]>([])

const checkedKeys = ref<string[]>([])

const layersObj: any = {}

mapWork.eventTarget.on("loadOK", () => {
  initTree()
})

const checkedChange = (keys: string[], e: any) => {
  const layer = layersObj[e.node.key]

  if (layer) {
    if (!layer.isAdded) {
      mapWork.addLayer(layer)
    }

    // 处理子节点
    if (e.node.children && e.node.children.length) {
      renderChildNode(keys, e.node.children)
    }

    if (keys.indexOf(e.node.key) !== -1) {
      layer.show = true
    } else {
      console.log(layer)
      mapWork.removeLayer(layer)
      // layer.show = false
    }
  }
}

function renderChildNode(keys: string[], children: any[]) {
  children.forEach((child) => {
    const layer = layersObj[child.key]
    if (layer) {
      if (!layer.isAdded) {
        mapWork.addLayer(layer)
      }

      if (keys.indexOf(child.key) !== -1) {
        layer.show = true
      } else {
        layer.show = false
      }
      if (child.children) {
        renderChildNode(keys, child.children)
      }
    }
  })
}

function initTree() {
  const layers = window.mapWork.map.getLayers({
    basemaps: true, // 是否取config.json中的basempas
    layers: true // 是否取config.json中的layers
  })

  // 遍历出config.json中所有的basempas和layers
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i]

    if (layer == null || layer.options.noLayerManage) {
      continue
    }

    if (layer && layer.pid === -1) {
      const node: any = {
        title: layer.name,
        key: layer.uuid,
        id: layer.id,
        pId: layer.pid,
        uuid: layer.uuid
      }
      node.children = findChild(node, layers)
      treeData.value.push(node)
      layersObj[layer.uuid] = layer
      expandedKeys.value.push(node.key)
    }
  }
}

function findChild(parent: any, list: any[]) {
  return list
    .filter((item: any) => item.pid === parent.id)
    .map((item: any) => {
      const node: any = {
        title: item.name,
        key: item.uuid,
        id: item.id,
        pId: item.pid,
        uuid: item.uuid
      }
      layersObj[item.uuid] = item
      if (item.hasChildLayer) {
        node.children = findChild(node, list)
      }

      if (item.isAdded) {
        checkedKeys.value.push(node.key)
      }
      return node
    })
}
</script>

<style scoped lang="less">
.manager-mars-pannel {
  width: 220px;
  overflow-y: auto;
}
:deep(.ant-form-item) {
  margin-bottom: 10px;
}
</style>
