<template>
  <mars-dialog :visible="true" right="10" top="10" bottom="40">
    <mars-tree checkable :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys" @check="checkedChange">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>
<script lang="ts" setup>
import { ref, nextTick, reactive } from "vue"
import * as mapWork from "./map.js"

const treeData = ref<any[]>([])

const expandedKeys = ref<string[]>([])

const checkedKeys = ref<string[]>([])

const layersObj: any = {}
let layers: any

mapWork.eventTarget.on("loadOK", () => {
  initTree()
})

const checkedChange = (keys: string[], e: any) => {
  const layer = layersObj[e.node.id]

  if (layer) {
    if (!layer.isAdded) {
      mapWork.addLayer(layer)
    }

    // 特殊处理同目录下的单选的互斥的节点，可在config对应图层节点中配置"radio":true即可
    if (layer.options.radio && e.checked) {
      // 循环所有的图层
      for (const i in layersObj) {
        const item = layersObj[i]
        // 循环所有的打开的图层
        checkedKeys.value.forEach((key, index) => {
          // 在所有图层中筛选与打开图层对应key值的图层 以及 与当前操作的图层的pid相同的图层
          if (item === layersObj[key] && layer.pid === layersObj[key].pid) {
            // 筛选出不是当前的其他图层进行图层隐藏以及移除
            if (item !== layer) {
              checkedKeys.value.splice(index, 1)
              item.show = false
            }
          }
        })
      }
    }

    // 处理子节点
    if (e.node.children && e.node.children.length) {
      renderChildNode(keys, e.node.children)
    }
    if (keys.indexOf(e.node.id) !== -1) {
      layer.show = true

      if (layer.options.center) {
        layer.flyTo()
      }
    } else {
      layer.show = false
      mapWork.removeLayer(layer, layers)
    }
  }
}

function renderChildNode(keys: string[], children: any[]) {
  children.forEach((child) => {
    const layer = layersObj[child.id]

    if (layer) {
      if (!layer.isAdded) {
        mapWork.addLayer(layer)
      }
      if (keys.indexOf(child.id) !== -1) {
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
  layers = mapWork.getLayers()
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i] // 创建图层

    if (!layer._hasMapInit && layer.pid === -1) {
      layer.pid = 99 // 示例中创建的图层都放到99分组下面
    }

    if (layer && layer.pid === -1) {
      const node: any = reactive({
        index: i,
        title: layer.name || `未命名(${layer.type})`,
        key: layer.id,
        id: layer.id,
        pId: layer.pid,
        hasZIndex: layer.hasZIndex,
        hasOpacity: layer.hasOpacity,
        opacity: 100 * (layer.opacity || 0)
      })
      layersObj[layer.id] = layer

      node.children = findChild(node, layers)
      treeData.value.push(node)

      expandedKeys.value.push(node.key)
    }
  }

  treeData.value.forEach((data: any) => {
    data.children.forEach((item: any) => {
      if (item.children) {
        item.children.forEach((chil: any) => {
          if (layersObj[chil.key].options.radio) {
            chil.parent.disabled = true
          }
        })
      }
    })
  })
}

function findChild(parent: any, list: any[]) {
  return list
    .filter((item: any) => item.pid === parent.id)
    .reverse()
    .map((item: any, i: number) => {
      const node: any = {
        index: i,
        title: item.name || `未命名(${item.type})`,
        key: item.id,
        id: item.id,
        pId: item.pid,
        hasZIndex: item.hasZIndex,
        hasOpacity: item.hasOpacity,
        opacity: 100 * (item.opacity || 0),
        parent
      }

      layersObj[item.id] = item
      node.children = findChild(node, list)
      expandedKeys.value.push(node.key)

      if (item.isAdded) {
        nextTick(() => {
          checkedKeys.value.push(node.key)
        })
      }
      return node
    })
}
</script>

<style scoped lang="less">
.manager-mars-dialog {
  width: 220px;
  overflow-y: auto;
}
:deep(.ant-form-item) {
  margin-bottom: 10px;
}
</style>
