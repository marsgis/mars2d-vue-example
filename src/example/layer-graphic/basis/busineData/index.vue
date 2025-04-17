<template>
  <mars-dialog :visible="true" right="10" top="10" customClass="pannel" width="300">
    <mars-tree checkable :height="600" :tree-data="treeData" v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys" @check="checkedChange" @select="flyToGraphic">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue"
import * as mapWork from "./map.js"

mapWork.eventTarget.on("refTree", (event: any) => {
  initTree(event.list)
})

// 初始化树控件
const treeData = ref<any[]>()
const checkedKeys = ref<any[]>([])
const expandedKeys = ref<any[]>([])

function initTree(list: any[] = []) {
  // 重置上一次的树状数据
  const showIds = [] // 是显示状态的图层id集合
  const openIds = [] // 展开的树节点id集合（如果不想展开，对应图层配置open:false）

  const data = []
  const groups: any = []
  list.forEach((item, index) => {
    const group = item["地区"]
    if (!group) {
      return
    }

    if (!groups.includes(group)) {
      const node: any = { key: index, group: true, children: [], title: group }

      findChilds(list, (item) => item["地区"] === group, (item) => {
        const graphic = item.graphic
        const child: any = { key: graphic.id, group: false, title: item["高校名称"] }
        node.children.push(child)

        if (graphic.show || graphic.isAdded) {
          showIds.push(graphic.id)
        }

      })

      data.push(node)
      groups.push(group)
      openIds.push(index)
    }
  })
  console.log("获取到的graphics树", data)

  // 赋予树控件
  treeData.value = data
  nextTick(() => {
    checkedKeys.value = showIds
    expandedKeys.value = openIds
  })
}

function findChilds(list, filtFunc, callback) {
  list.forEach((item) => {
    if (filtFunc(item)) {
      callback(item)
    }
  })
}

// 树控件 勾选事件
function checkedChange(keys: string[], e: any) {
  const node = e.node
  const checked = e.checked

  const graphic = mapWork.getGraphicById(node.key)
  if (graphic) {
    graphic.show = checked
  }

  // 处理子节点
  if (node.children && node.children.length) {
    node.children.forEach((child) => {
      checkedChange(keys, { node: child, checked: e.checked })
    })
  }
}

// 点击节点 定位
const flyToGraphic = (keys: any, item: any) => {
  const graphic = mapWork.getGraphicById(item.node.key)

  if (graphic && (graphic.show ?? true)) {
    mapWork.map.flyToGraphic(graphic, { duration: 2 })
    mapWork.graphicLayer.openPopup(graphic)
  }
}
</script>
<style scoped lang="less">
.geojson-example {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  align-content: center;
  flex-wrap: wrap;

  .mars-button {
    width: 94px;
  }

  .floor {
    padding-left: 5px !important;
  }
}


:deep(.ant-slider) {
  width: 230px;
}
</style>
