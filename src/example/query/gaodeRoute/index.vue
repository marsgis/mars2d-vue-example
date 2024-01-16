<template>
  <mars-dialog :visible="true" right="10" top="10" customClass="gaodeRoutePannel">
    <a-form>
      <a-form-item label="方式">
        <mars-select v-model:value="selectWay" :options="selectWayOptions"> </mars-select>
      </a-form-item>
      <div style="color: #000"></div>
      <a-form-item label="起点">
        <a-space>
          <mars-input v-model:value="strat"></mars-input>
          <mars-button @click="startPoint">选点</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item label="终点">
        <a-space>
          <mars-input v-model:value="end"></mars-input>
          <mars-button @click="endPoint">选点</mars-button>
        </a-space>
      </a-form-item>

      <div class="f-tac">
        <a-space>
          <mars-button @click="btnAnalyse">开始分析</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
          <mars-button @click="saveGeoJSON">保存GeoJSON</mars-button>
        </a-space>
      </div>

      <div v-show="wayShow" class="showRoam">
        <p style="color: #cad1d1">总距离：{{ allDiatance }}</p>
        <p style="color: #cad1d1">预计时间：{{ useTime }}</p>
        <p style="color: #cad1d1">导航：{{ dh }}</p>
      </div>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const strat = ref("")
const end = ref("")
const selectWay = ref("1")
const wayShow = ref(false)
const allDiatance = ref("")
const useTime = ref("")
const dh = ref("")

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

mapWork.eventTarget.on("analyse", function (event: any) {
  wayShow.value = true

  useTime.value = event.allTime
  allDiatance.value = event.allDistance
  dh.value = event.dhHtml
})

// 起点
const startPoint = () => {
  mapWork.startPoint(selectWay.value)
}
mapWork.eventTarget.on("start", function (event: any) {
  strat.value = getData(event.point.lng) + "," + getData(event.point.lat)
  wayShow.value = false
})
// 终点
const endPoint = () => {
  mapWork.endPoint(selectWay.value)
}
mapWork.eventTarget.on("end", function (event: any) {
  end.value = getData(event.point.lng) + "," + getData(event.point.lat)
  wayShow.value = false
})

function getData(num) {
  return num.toFixed(6)
}

// 开始分析
const btnAnalyse = () => {
  mapWork.btnAnalyse(selectWay.value)
}
// 清除数据
const removeAll = () => {
  mapWork.removeAll()

  wayShow.value = false
  strat.value = ""
  end.value = ""
}

// 保存GeoJSON
const saveGeoJSON = () => {
  mapWork.saveGeoJSON()
}
</script>
<style lang="less">
.gaodeRoutePannel {
  right: 10px !important;
  top: 10px !important;
  max-height: calc(100% - 51px) !important;
  overflow: auto !important;
}
</style>
<style scoped lang="less">
.showRoam {
  top: 250px;
  word-break: break-all;
  width: 300px;
  padding: 5px;
  line-height: 25px;
  color: #000 !important;
  p {
    color: #000 !important;
  }
}
.ant-select {
  width: 250px;
}
</style>
