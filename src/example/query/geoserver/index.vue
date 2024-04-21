<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-form>
      <a-form-item label="名称：">
        <mars-input v-model:value="serverName" placeholder="请输入查询关键字"></mars-input>
      </a-form-item>

      <a-form-item label="范围：">
        <div class="draw-range">
          <a-space>
            <mars-button @click="drawRectangle">框选范围</mars-button>
            <mars-button @click="drawCircle">圆形范围</mars-button>
            <mars-button class="long-btn" @click="drawPolygon">多边形范围</mars-button>
          </a-space>
        </div>

      </a-form-item>

      <a-form-item>
        <div class="footer">
          <a-space>
            <mars-button @click="query">查询</mars-button>
            <mars-button @click="removeAll" danger>清除</mars-button>
          </a-space>
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
import { onMounted, ref, toRaw } from "vue"
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

onMounted(() => {
  mapWork.eventTarget.on("befortUI", function (event: any) {
    show.value = true
    dataSource.value = []
    event.list.forEach((item: any, index: number) => {
      dataSource.value.push({ key: index, name: item["项目名称"], type: item["设施类型"], address: item["具体位置"], graphic: item.graphic })
    })
  })
})

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

const rowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  onSelect: (record: DataItem, selected: boolean) => {
    if (record.graphic == null) {
      $message(record.name + " 无经纬度坐标信息！")
      return
    }
    if (selected) {
      record.graphic.openHighlight()
      record.graphic.flyTo({
        radius: 1000, // 点数据：radius控制视距距离
        scale: 1.5, // 线面数据：scale控制边界的放大比例
        complete: () => {
          record.graphic.openPopup()
        }
      })
    } else {
      record.graphic.closeHighlight()
    }
  }
})

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
  mapWork.query(serverName.value)
}
// 清除数据
const removeAll = () => {
  serverName.value = ""
  show.value = false
  dataSource.value = []
  mapWork.clearAll()
}
</script>

<style scoped lang="less">
.mars-input {
  width: 255px;
}

.draw-range {
  .mars-button {
    width: 80px;
  }

  .long-btn {
    padding-left: 1px !important;
  }
}

.footer {
  .mars-button {
    width: 145px;
  }
}

.ant-form {
  padding: 0 !important;
}
</style>
