<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-form>
      <a-form-item label="服务：">
        <mars-select v-model:value="selectService" :options="serviceOptions" @change="changeService"> </mars-select>
      </a-form-item>
      <a-form-item label="名称：">
        <mars-input v-model:value="serverName" placeholder="请输入查询关键字"></mars-input>
      </a-form-item>

      <a-form-item label="范围：">
        <div class="buttons">
          <mars-button @click="drawPoint">点查询</mars-button>
          <mars-button @click="drawRectangle">框选范围</mars-button>
          <mars-button @click="drawCircle">圆形范围</mars-button>
          <mars-button @click="drawPolygon">多边形范围</mars-button>
        </div>
      </a-form-item>

      <a-form-item>
        <div class="buttons">
          <mars-button @click="query">查询</mars-button>
          <mars-button @click="removeAll" danger>清除</mars-button>
        </div>
      </a-form-item>

      <div v-show="show">
        <a-form-item>
          <a-table :pagination="true" :dataSource="dataSource" :columns="columns" :custom-row="customRow" size="small"
            bordered :scroll="{ y: 400 }" />
        </a-form-item>
      </div>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

interface DataItem {
  key: number
  name: string
  age: number
  address: string
  graphic: any
}

const serverName = ref("")
const show = ref(false)

// 表格数据
const dataSource = ref([])
const columns = ref([])

mapWork.eventTarget.on("befortUI", function (event: any) {
  dataSource.value = []
  getServeColumnsAndData(event.list)

  show.value = true
})

// 服务
const selectService = ref("hfjy")
const serviceOptions = ref([
  {
    value: "hfjy",
    label: "点"
  },
  {
    value: "hfdl",
    label: "线"
  },
  {
    value: "hfgh",
    label: "面"
  }
])
const changeService = () => {
  mapWork.changeService(selectService.value)
}

const customRow = (record: DataItem) => {
  return {
    onClick: () => {
      if (record.graphic == null) {
        $message(record.name + " 无经纬度坐标信息！")
        return
      }
      mapWork.flyToGraphic(toRaw(record.graphic))
    }
  }
}

// 绘制范围
const drawPoint = () => {
  show.value = false
  mapWork.drawPoint()
}
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
  mapWork.query(serverName.value, selectService.value)
}
// 清除数据
const removeAll = () => {
  serverName.value = ""
  show.value = false
  dataSource.value = []
  mapWork.clearAll()
}

function getServeColumnsAndData(list) {
  switch (selectService.value) {
    case "hfjy": {
      columns.value = [
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "类型", dataIndex: "type", key: "type" },
        { title: "住址", dataIndex: "address", key: "address" }
      ]

      dataSource.value = list.map((item: any, index: number) => {
        return { key: index, name: item["项目名称"], type: item["设施类型"], address: item["具体位置"], graphic: item.graphic }
      })
      break
    }
    case "hfdl": {
      columns.value = [
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "标识", dataIndex: "address", key: "address" }
      ]

      dataSource.value = list.map((item: any, index: number) => {
        return { key: index, name: item.NAME, address: item.address, graphic: item.graphic }
      })
      break
    }
    case "hfgh": {
      columns.value = [
        { title: "名称", dataIndex: "name", key: "name" },
        { title: "规划", dataIndex: "guihua", key: "guihua" },
        { title: "用地编号", dataIndex: "order", key: "order" },
        { title: "用地面积", dataIndex: "area", key: "area" }
      ]

      dataSource.value = list.map((item: any, index: number) => {
        return { key: index, name: item["用地名称"], guihua: item["规划用地"], order: item["规划用地"], area: item.Shape_Area, graphic: item.graphic }
      })
      break
    }

    default:
      break
  }
}
</script>

<style scoped lang="less">
.mars-input {
  width: 255px;
}

.buttons {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}

.ant-form {
  padding: 0 !important;
}
</style>
