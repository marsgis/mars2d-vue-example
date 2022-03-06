<template>
  <mars-pannel :visible="true" right="10" top="10" width="400">
    <a-form>
      <a-form-item label="名称">
        <mars-input class="inputServe" v-model:value="serverName" placeholder="请输入查询关键字"></mars-input>
      </a-form-item>

      <a-form-item label="范围">
        <a-space>
          <mars-button @click="drawRectangle">框选范围</mars-button>
          <mars-button @click="drawCircle">圆形范围</mars-button>
          <mars-button @click="drawPolygon">多边形范围</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item label="操作">
        <a-space>
          <mars-button @click="query">查询</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item v-show="show">
        <a-tabs v-model:activeKey="activeKey" :centered="true" :tabBarGutter="55">
          <a-tab-pane key="1" tab="表格" force-render :forceRender="true">
            <a-form-item>
              <a-table :pagination="false" :dataSource="dataSource" :columns="columns" :scroll="{ y: tableScrollHeight }" size="small" bordered />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="饼状图" :forceRender="true">
            <div id="pieChart" class="chart"></div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="柱状图" :forceRender="true">
            <div id="histogram" class="chart"></div>
          </a-tab-pane>
        </a-tabs>
      </a-form-item>
    </a-form>
  </mars-pannel>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { setAutoHeight } from "@mars/utils/mars-util"
import * as echarts from "echarts"
import * as mapWork from "./map.js"

const serverName = ref("")
const show = ref<boolean>(false)
const activeKey = ref("1")

// 表格数据
const dataSource = ref([])
// 取到js中的数据
mapWork.eventTarget.on("loadOk", function (event: any) {
  const arrPie = [] // 饼状图:名称+面积
  const arrTable = [] // 表格: 名称+面积+数量
  const arrType = [] // 柱状图:名称
  const arrArea = [] // 柱状图:面积
  event.list.forEach((item: any, index: any) => {
    arrType.push(item.type)
    arrArea.push(item.area)
    arrPie.push({ name: item.type, value: item.area })
    arrTable.push({ key: index, index: index + 1, type: item.type, num: item.count, area: item.area })
  })

  // 表格数据
  dataSource.value = arrTable

  // 饼状图数据
  const pieDom: any = document.getElementById("pieChart")
  const pieEcharts = echarts.init(pieDom)

  // echarts饼状图
  const pieEchartsOption = {
    title: {
      text: "饼状图",
      left: "center",
      textStyle: {
        color: "#000"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} 亩</br>占比 : {d}%",
      backgroundColor: "rgba(63, 72, 84, 0.1)",
      textStyle: {
        color: "#000"
      }
    },
    series: [
      {
        name: "用地面积",
        type: "pie",
        radius: "50%",
        data: arrPie,
        textStyle: {
          color: "#000"
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.2)"
          }
        }
      }
    ]
  }

  pieEcharts.setOption(pieEchartsOption)

  // 柱状图数据
  const histogramDom: any = document.getElementById("histogram")
  const histogramECharts = echarts.init(histogramDom)

  // echarts柱状图
  const histogramOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(63, 72, 84, 0.1)",
      formatter: "{b}: {c} 亩",
      textStyle: {
        color: "#000"
      }
    },
    title: {
      text: "柱状图",
      left: "center",
      textStyle: {
        color: "#000"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      show: false
    },
    yAxis: {
      type: "category",
      data: arrType,
      axisLabel: {
        textStyle: {
          color: " #000"
        }
      }
    },
    series: [
      {
        type: "bar",
        data: arrArea,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#000"
              }
            }
          }
        }
      }
    ]
  }
  histogramECharts.setOption(histogramOption)

  if (dataSource.value.length !== 0) {
    show.value = true
  } else {
    show.value = false
  }
})

const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "类别",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "数量",
    dataIndex: "num",
    key: "num"
  },
  {
    title: "面积（亩）",
    dataIndex: "area",
    key: "area"
  }
])

// 绘制范围
const drawRectangle = () => {
  mapWork.drawRectangle()
}
const drawCircle = () => {
  mapWork.drawCircle()
}
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 查询数据
const query = () => {
  mapWork.queryData(serverName.value)
}

// 清除数据
const removeAll = () => {
  show.value = false
  mapWork.clearAll()
}

const tableScrollHeight = ref(0)

onMounted(() => {
  setAutoHeight((height: number) => {
    tableScrollHeight.value = height
  }, 400)
})
</script>
<style scoped lang="less">
:deep(.ant-tabs-tab-btn) {
  color: #000 !important;
}
.inputServe {
  width: 250px;
}
.chart {
  width: 380px;
  height: 250px;
}
</style>
