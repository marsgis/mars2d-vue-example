<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-form>
      <div class="f-mb arcgis-btns_label">
        <span class="mars-pannel-item-label">名称：</span>
        <mars-input class="grid-item_3" v-model:value="serverName" placeholder="请输入查询关键字"></mars-input>
      </div>

      <div class="f-mb arcgis-btns_label">
        <span class="mars-pannel-item-label">范围：</span>
        <mars-button @click="drawRectangle">框选范围</mars-button>
        <mars-button @click="drawCircle">圆形范围</mars-button>
        <mars-button class="long-btn" @click="drawPolygon">多边形范围</mars-button>
      </div>

      <div class="arcgis-btns">
        <mars-button @click="query">查询</mars-button>
        <mars-button @click="removeAll" danger>清除</mars-button>
      </div>

      <div v-show="show" class="f-pt">
        <div class="f-mb ">
          <a-table :pagination="{ pageSize: 5 }"   :dataSource="dataSource" :columns="columns" :custom-row="customRow"
            size="small" bordered />
        </div>
        <div class="querybar-fr">
          <span>找到{{ allLength }}条结果</span>
        </div>
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
  type: string
  id: string
}

const serverName = ref("")
const allLength = ref(0)
const nowPage = ref(0)
const allPage = ref(0)
const show = ref(false)

// 表格数据
const dataSource = ref([])
onMounted(() => {
  mapWork.eventTarget.on("beforUI", function (event: any) {
    show.value = true
    dataSource.value = []
    event.list.forEach((item: any, index: number) => {
      dataSource.value.push({ index: index + 1, name: item["项目名称"], type: item["设施级别"], id: item.graphic.id })
    })
  })
})

const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "级别",
    dataIndex: "type",
    key: "type"
  }
])

const customRow = (record: DataItem) => {
  return {
    onClick: () => {
      if (record.id == null) {
        $message(record.name + " 无经纬度坐标信息！")
        return
      }
      mapWork.flyToGraphic(toRaw(record.id))
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
  mapWork.query(serverName.value)
}

mapWork.eventTarget.on("result", (e: any) => {
  allLength.value = e.result.count
  allPage.value = e.result.allPage
  nowPage.value = e.result.pageIndex
})

// 清除数据
const removeAll = () => {
  show.value = false
  dataSource.value = []
  mapWork.removeAll()
}

// 操作查询的数据
const showFirstPage = () => {
  mapWork.showFirstPage()
}
const showPretPage = () => {
  mapWork.showPretPage()
}
const showNextPage = () => {
  mapWork.showNextPage()
}
</script>

<style scoped lang="less">
.querybar-fr {
  position: absolute;
  bottom: 26px;
  color: rgba(3, 26, 61, 0.3);
}

.arcgis-btns_label {
  display: grid;
  grid-template-columns: 45px repeat(3, 1fr);
  align-items: center;
  gap: 5px;

  .mars-pannel-item-label {
    min-width: 45px;
  }

  .long-btn {
    padding-left: 1px !important;
  }

  .grid-item_3 {
    grid-column: 2 / span 4;
  }
}

.arcgis-btns {
  display: flex;
  gap: 5px;

  .mars-button {
    flex-grow: 1;
  }
}
</style>
