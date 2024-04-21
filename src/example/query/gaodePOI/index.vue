<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">


    <div>
      <a-space align="start">
        <span class="mars-pannel-item-label">范围：</span>
        <div>
          <a-radio-group v-model:value="radioFanwei">
            <a-radio value="1">指定城市</a-radio>
            <a-radio value="2" class="current-view">当前视域</a-radio>
            <a-radio value="3">指定范围</a-radio>
          </a-radio-group>
        </div>
      </a-space>
    </div>



    <div class="f-pt" v-show="radioFanwei === '1'">
      <a-space>
        <span class="mars-pannel-item-label">城市：</span>
        <a-cascader v-model:value="value" :allowClear="false" popupClassName="mars-select-dropdown" :options="options"
          @change="onChange" />
      </a-space>
    </div>



    <div class="f-pt f-mb">
      <a-space>
        <span class="mars-pannel-item-label">关键字：</span>
        <mars-input v-model:value="serverName" placeholder="查询名称和地址"></mars-input>
      </a-space>
    </div>



    <div v-show="radioFanwei === '3'" class="range-select f-mb">
      <a-space>
        <span class="mars-pannel-item-label">框选：</span>
        <div>
          <a-space>
            <mars-button @click="drawRectangle">框选范围</mars-button>
            <mars-button @click="drawCircle">圆形范围</mars-button>
            <mars-button class="long-btn" @click="drawPolygon">多边形范围</mars-button>
          </a-space>
        </div>
      </a-space>
    </div>



    <div class="f-mb">
      <a-space>
        <mars-button @click="query">查询</mars-button>
        <mars-button @click="removeAll" danger>清除</mars-button>
      </a-space>

    </div>

    <div v-show="show">
      <a-form-item>
        <a-table :pagination="true" :dataSource="dataSource" :columns="columns" :custom-row="customRow" size="small"
          bordered :scroll="{ y: 400 }" />
      </a-form-item>
    </div>
  </mars-dialog>
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
const show = ref(false)
const cityShiVal = ref("340100")


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

  mapWork.query(radioFanwei.value, cityShiVal.value, serverName.value)

}

// 城市的数据
interface Option {
  value: string
  label: string
  children?: Option[]
}

const value = ref<string[]>(["340000", "340100"])
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
  cityShiVal.value = selectedOptions[1].value

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

<style scoped lang="less">
.ant-input,
.ant-cascader {
  width: 230px !important;
}

.mars-button {
  width: 146px !important;
}

.range-select {
  .mars-button {
    width: 72px !important;
  }

  .long-btn {
    padding-left: 1px;
  }
}


:deep(.ant-table-row:nth-of-type(even)) {
  background-color: transparent !important;
}

.item-label {
  margin-left: 18px;
  color: rgba(234, 242, 255, 0.8);
}

.current-view {
  margin-left: 10px;
}
</style>
