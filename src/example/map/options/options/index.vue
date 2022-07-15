<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-table :columns="columns" :data-source="data" bordered :pagination="false">
      <template #bodyCell="{ column, text, index }">
        <template v-if="column.dataIndex === 'name'">
          <a href="https://mars2d.cn/api/Map.html#.sceneOptions" target="_black">{{ text }}</a>
        </template>

        <!-- select下拉选择 -->
        <template v-if="column.dataIndex === 'operation'">
          <!-- radio -->
          <a-radio-group
            @change="(data[index] as any).change(index)"
            v-if="data[index].operation === 'checked'"
            v-model:value="data[index].value"
            :name="'radioGroup' + index"
          >
            <a-radio value="1">是</a-radio>
            <a-radio value="2">否</a-radio>
          </a-radio-group>
          <!-- 颜色选择器 -->
          <mars-color-picker
            v-if="data[index].operation === 'color'"
            @change="(data[index] as any).change(index)"
            v-model:value="data[index].value"
          />

          <!-- range滑动 -->
          <mars-slider
            @change="(data[index] as any).change(index)"
            v-if="data[index].operation === 'range'"
            v-model:value="data[index].value"
            :min="data[index].min"
            :max="data[index].max"
            :step="data[index].step"
          />
        </template>
      </template>
    </a-table>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { TableColumnType } from "ant-design-vue"
import * as mapWork from "./map.js"

const data = ref([
  {
    key: "1",
    describe: "当前层级",
    operation: "range",
    min: 1,
    max: 18,
    step: 1,
    value: 18,
    change(index: number) {
      mapWork.setMapOptions("zoom", data.value[index].value)
    }
  },
  {
    key: "2",
    describe: "显示底图",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(data.value[index].value) === 1) {
        mapWork.showBaseMap(true)
      } else {
        mapWork.showBaseMap(false)
      }
    }
  },
  {
    key: "3",
    describe: "地球背景色",
    operation: "color",
    value: "#dddddd",
    change(index: number) {
      mapWork.setMapOptions("backgroundColor", data.value[index].value)
    }
  },
  {
    key: "4",
    name: "场景Scene",
    describe: "是否右键菜单",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(data.value[index].value) === 1) {
        mapWork.setMapOptions("defaultContextMenu", true)
      } else {
        mapWork.setMapOptions("defaultContextMenu", false)
      }
    }
  }
])

const columns: TableColumnType[] = [
  {
    title: "场景描述",
    dataIndex: "describe"
  },
  {
    title: "操作",
    dataIndex: "operation"
  }
]
</script>
<style scoped lang="less">
:deep(.marsColorView) {
  margin-left: 12px;
}
:deep(.ant-table-tbody > tr > td) {
  padding: 4px;
}
//调整head行属性
:deep(.ant-table-tbody > tr > th) {
  padding: 4px;
}
</style>
