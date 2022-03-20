<template>
  <mars-pannel :visible="true" right="10" top="10" width="400">
    <a-form>
      <a-form-item label="范围">
        <a-radio-group v-model:value="radioFanwei">
          <a-radio value="1">指定城市</a-radio>
          <a-radio value="2">当前视域</a-radio>
          <a-radio value="3">指定范围</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="城市" v-show="radioFanwei === '1'">
        <a-cascader v-model:value="value" :options="options" @change="onChange">
          <a href="#">{{ citySheng }} / {{ cityShi }}</a>
        </a-cascader>
      </a-form-item>

      <a-form-item label="关键字">
        <mars-input v-model:value="serverName" placeholder="查询名称和地址"></mars-input>
      </a-form-item>

      <a-form-item label="框选" v-show="radioFanwei === '3'">
        <a-space>
          <mars-button @click="drawRectangle">框选范围</mars-button>
          <mars-button @click="drawCircle">圆形范围</mars-button>
          <mars-button @click="drawPolygon">多边形范围</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item class="f-tac">
        <a-space>
          <mars-button @click="query">查询</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <div v-show="show">
        <a-form-item>
          <a-table
            :pagination="true"
            :dataSource="dataSource"
            :columns="columns"
            :custom-row="customRow"
            size="small"
            bordered
            :scroll="{ y: 400 }"
          />
        </a-form-item>
      </div>
    </a-form>
  </mars-pannel>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import axios from "axios"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

interface DataItem {
  key: number
  name: string
  graphic: any
}

const radioFanwei = ref("1")
const serverName = ref<string>("")
const citySheng = ref("安徽省")
const cityShi = ref("合肥市")
const show = ref(false)

const columns = ref([
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address"
  }
])

const customRow = (record: DataItem) => {
  return {
    onClick: () => {
      if (record.graphic == null) {
        $message(record.name + " 无经纬度坐标信息！")
        return
      }
      // 预留功能，后续支持该方法
      /* record.graphic.openHighlight() */
      mapWork.flytoGraphic(record.graphic)
    }
  }
}

// 绘制范围
const drawRectangle = () => {
  show.value = false
  mapWork.drawRectangle()
}

const drawCircle = () => {
  show.value = false
  mapWork.drawCircle()
}

const drawPolygon = () => {
  show.value = false
  mapWork.drawPolygon()
}

// 查询数据
const query = () => {
  show.value = false
  mapWork.clearAll(true)

  mapWork.clearAll(radioFanwei.value === "3")

  mapWork.query(radioFanwei.value, cityShi.value, serverName.value)

}

// 城市的数据
interface Option {
  value: string
  label: string
  children?: Option[]
}

const value = ref<string[]>([])
const options = ref<Option[]>([])

// 读取JSON数据
function fetchAttrJson() {
  return axios.get(`//data.mars3d.cn/file/geojson/areas/config.json`)
}

onBeforeMount(async () => {
  const { data }: any = await fetchAttrJson()
  options.value = data
})

// 改变选择的城市
const onChange = (_value: string, selectedOptions: Option[]) => {
  citySheng.value = selectedOptions[0].label
  cityShi.value = selectedOptions[1].label
}

// 表格数据
const dataSource = ref<any>([])

mapWork.eventTarget.on("tableData", (e: any) => {
  show.value = true
  dataSource.value = []
  e.data.forEach((item: any, index: number) => {
    dataSource.value.push({ key: index, name: item.name, type: item.type, address: item.address, graphic: item.graphic })
  })
})

// 清除数据
const removeAll = () => {
  show.value = false
  dataSource.value = []
  mapWork.clearAll()
}
</script>
<style scoped lang="less"></style>
