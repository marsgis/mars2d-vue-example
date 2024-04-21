<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-form :label-col="labelCol">
      <a-form-item label="当前层级" >
        <!-- range滑动 -->
        <mars-slider
              @change=";(data[0] as any).change(0)"
              v-model:value="data[0].value"
              :min="data[0].min"
              :max="data[0].max"
              :step="data[0].step"
            />
      </a-form-item>
      <a-form-item label="显示底图" >
        <a-radio-group
              @change=";(data[1] as any).change(1)"
              v-if="data[1].operation === 'checked'"
              v-model:value="data[1].value"
              :name="'radioGroup' + 1"
            >
              <a-radio value="1">是</a-radio>
              <a-radio value="2">否</a-radio>
            </a-radio-group>
      </a-form-item>
      <a-form-item label="地球背景色" >
        <mars-color-picker
              v-if="data[2].operation === 'color'"
              @change=";(data[2] as any).change(2)"
              v-model:value="data[2].value"
            />
      </a-form-item>
      <a-form-item label="是否右键菜单" >
        <a-radio-group
              @change=";(data[3] as any).change(3)"
              v-if="data[3].operation === 'checked'"
              v-model:value="data[3].value"
              :name="'radioGroup' + 1"
            >
              <a-radio value="1">是</a-radio>
              <a-radio value="2">否</a-radio>
            </a-radio-group>
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const labelCol = { style: { width: "97px" } }

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
</script>
<style scoped lang="less">
:deep(.marsColorView) {
  margin-left: 12px;
}
</style>
