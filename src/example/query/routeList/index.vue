<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-form>
      <a-form-item label="服务">
        <mars-select v-model:value="selectService" :options="serviceOptions" @change="changeService"> </mars-select>
      </a-form-item>
      <a-form-item label="方式">
        <mars-select class="selectWidth" v-model:value="selectWay" :options="selectWayOptions"> </mars-select>
      </a-form-item>

      <a-form-item label="起点">
        <a-space>
          <mars-input class="inputWidth" v-model:value="strat"></mars-input>
          <mars-button @click="stratPoint">选点</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item label="终点">
        <a-space>
          <p class="inputWidth end-input">
            共<span style="color: red">{{ count }}</span>条POI点
          </p>
          <mars-button @click="endPoint">查询</mars-button>
        </a-space>
      </a-form-item>
      <div v-show="wayShow" class="f-pt">
        <a-table :pagination="{ pageSize: 5 }" :dataSource="dataSource" :columns="columns" :custom-row="customRow"
          size="small" bordered></a-table>
      </div>

      <div class="footer">
        <a-space>
          <mars-button @click="btnAnalyse">开始分析</mars-button>
          <mars-button @click="removeAll" danger>清除</mars-button>
        </a-space>
      </div>


    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

interface DataItem {
  key: number
  index: number
  name: string
  length: number
  time: string
  graphic: any
}

const strat = ref("")
const count = ref(0)
const selectWay = ref("1")
const wayShow = ref(false)

const selectService = ref("gaode")
const serviceOptions = ref([
  {
    value: "tdt",
    label: "天地图服务"
  },
  {
    value: "gaode",
    label: "高德服务"
  },
  {
    value: "baidu",
    label: "百度服务"
  }
])
const changeService = () => {
  mapWork.changeService(selectService.value)
}

// 表格数据
const dataSource = ref<any[]>([])
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    width: 35
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "总距离",
    dataIndex: "length",
    key: "length"
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time"
  }
]
const customRow = (record: DataItem) => {
  return {
    onClick: () => {
      mapWork.centerAtRoute(record.graphic)
    }
  }
}
// 下拉菜单
const selectWayOptions = ref([
  {
    value: "1",
    label: "步行路线查询"
  },
  {
    // 2-行车路线
    value: "3",
    label: "驾车路线查询"
  }
])

// 起点
const stratPoint = () => {
  mapWork.stratPoint()
}
mapWork.eventTarget.on("star", function (event: any) {
  strat.value = event.latlng.lng.toFixed(6) + "," + event.latlng.lat.toFixed(6)
})
// 终点POI
const endPoint = () => {
  mapWork.endPoint()
  wayShow.value = false
}
mapWork.eventTarget.on("end", function (event: any) {
  count.value = event.count
})
// 开始分析
const btnAnalyse = () => {
  wayShow.value = false
  dataSource.value = []

  mapWork.btnAnalyse(selectWay.value)
}

mapWork.eventTarget.on("analyse", function (event: any) {
  wayShow.value = true

  dataSource.value.push({
    key: event.i,
    index: event.i + 1,
    name: event.name,
    length: event.distance,
    time: event.time,
    graphic: event.id
  })
})

// 清除数据
const removeAll = () => {
  mapWork.removeAll()
  strat.value = ""
  count.value = 0
  wayShow.value = false
}
</script>

<style scoped lang="less">
.ant-form {
  padding: 0 !important;
}

.selectWidth {
  width: 260px;
}


.inputWidth,
.end-input {
  width: 205px;
}

.footer {
  padding-top: 10px;
  .mars-button {
    width: 148px;
  }
}

.end-input {
  height: 32px;
  line-height: 32px;
  border-radius: 2px;
  border: 1px solid;
  border-color: var(--mars-control-border);
  padding: 0px 12px;
}
</style>
