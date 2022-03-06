<template>
  <mars-pannel :visible="true" right="10" top="10" width="350">
    <div class="arcgis-contain">
      <a-form>
        <div class="f-mb">
          <a-space>
            <span>名称</span>
            <mars-input class="inputServe" v-model:value="serverName" placeholder="请输入查询关键字"></mars-input>
          </a-space>
        </div>

        <div class="f-mb">
          <a-space>
            <span>范围</span>
            <mars-button @click="drawRectangle">框选范围</mars-button>
            <mars-button @click="drawCircle">圆形范围</mars-button>
            <mars-button @click="drawPolygon">多边形范围</mars-button>
          </a-space>
        </div>

        <div class="f-mb">
          <a-space>
            <span>操作</span>
            <mars-button @click="query">查询</mars-button>
            <mars-button @click="removeAll">清除</mars-button>
          </a-space>
        </div>

        <div v-show="show">
          <div class="f-mb">
            <a-table :pagination="false" :dataSource="dataSource" :columns="columns" :custom-row="customRow" size="small" bordered />
          </div>
          <div class="f-mb querybar-fr">
            <a-space>
              <span>找到{{ allLength }}条结果</span>
              <span>第{{ nowPage }}/{{ allPage }}页</span>
              <mars-button class="button" @click="showFirstPage">首页</mars-button>
              <mars-button class="button" @click="showPretPage">&lt;</mars-button>
              <mars-button class="button" @click="showNextPage">&gt;</mars-button>
            </a-space>
          </div>
        </div>
      </a-form>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

interface DataItem {
  key: number
  name: string
  type: string
  uuid: string
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
      dataSource.value.push({ index: index + 1, name: item["项目名称"], type: item["设施级别"], uuid: item.graphic.uuid })
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
      if (record.uuid == null) {
        $message(record.name + " 无经纬度坐标信息！")
        return
      }
      mapWork.flyToGraphic(toRaw(record.uuid))
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
  allLength.value = e.result.allCount
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
.inputServe {
  width: 250px;
}
.querybar-fr {
  position: relative;
  bottom: 3px;
  right: -6px;
}
.arcgis-contain {
  width: 322px;
  span {
    color: #000;
  }
}
</style>
