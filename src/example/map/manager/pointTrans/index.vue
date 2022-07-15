<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-form>
      <a-form-item label="范围">
        <a-radio-group v-model:value="formState.radioFanwei" @change="changeFanwei">
          <a-radio value="1">十进制</a-radio>
          <a-radio value="2">度分秒</a-radio>
          <a-radio value="3" title="2000平面坐标">平面坐标</a-radio>
        </a-radio-group>
      </a-form-item>

      <!-- 十进制的面板 -->
      <div v-show="formState.radioFanwei == '1'">
        <a-form-item label="经度" class="decimal-system">
          <mars-input v-model:value="formState.jd"> </mars-input>
        </a-form-item>
        <a-form-item label="纬度" class="decimal-system">
          <mars-input v-model:value="formState.wd"> </mars-input>
        </a-form-item>
      </div>

      <!-- 度分秒的面板 -->
      <div v-show="formState.radioFanwei == '2'">
        <a-form-item label="经度">
          <a-space>
            <mars-input v-model:value="formState.jdDegree" class="degree-minutes"> </mars-input>°
            <mars-input v-model:value="formState.jdMinute" class="degree-minutes"> </mars-input>'
            <mars-input v-model:value="formState.jdSecond" class="degree-minutes"> </mars-input>"
          </a-space>
        </a-form-item>
        <a-form-item label="纬度">
          <a-space>
            <mars-input v-model:value="formState.wdDegree" class="degree-minutes"> </mars-input>°
            <mars-input v-model:value="formState.wdMinute" class="degree-minutes"> </mars-input>'
            <mars-input v-model:value="formState.wdSecond" class="degree-minutes"> </mars-input>"
          </a-space>
        </a-form-item>
      </div>

      <!-- 平面坐标的面板 -->
      <div v-show="formState.radioFanwei == '3'">
        <a-form-item label="分带">
          <a-radio-group v-model:value="formState.radioFendai" @change="changeFendai">
            <a-radio value="1">三度带</a-radio>
            <a-radio value="2">六度带</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="纵坐标" class="decimal-system">
          <mars-input v-model:value="formState.gk6X"> </mars-input>
        </a-form-item>
        <a-form-item label="横坐标" class="decimal-system">
          <mars-input v-model:value="formState.gk6Y"> </mars-input>
        </a-form-item>
      </div>

      <a-form-item class="f-pt f-tac">
        <a-space>
          <mars-button @click="bindMourseClick">图上拾取</mars-button>
          <mars-button @click="submitCenter">坐标定位</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import * as mapWork from "./map.js"
import { $alert } from "@mars/components/mars-ui/index"

const formState = reactive({
  radioFanwei: "1",
  radioFendai: "2",
  jd: 0,
  wd: 0,
  jdDegree: 0,
  jdMinute: 0,
  jdSecond: 0,
  wdDegree: 0,
  wdMinute: 0,
  wdSecond: 0,
  gk6X: 0,
  gk6Y: 0
})

// 全局中间变量
let currJD: number
let currWD: number

onMounted(() => {
  // 默认显示地图中心点坐标
  mapWork.eventTarget.on("loadOK", function (event: any) {
    const point = event.point
    currJD = point.lng
    currWD = point.lat
    formState.jd = mapWork.marsUtilFormtNum(currJD, 6)
    formState.wd = mapWork.marsUtilFormtNum(currWD, 6)
  })
})

const changeFanwei = () => {
  switch (formState.radioFanwei) {
    case "2": // 度分秒
      formState.jdDegree = mapWork.marsPointTrans(currJD).degree
      formState.jdMinute = mapWork.marsPointTrans(currJD).minute
      formState.jdSecond = mapWork.marsPointTrans(currJD).second

      formState.wdDegree = mapWork.marsPointTrans(currWD).degree
      formState.wdMinute = mapWork.marsPointTrans(currWD).minute
      formState.wdSecond = mapWork.marsPointTrans(currWD).second
      break
    case "3": // CGCS2000
      changeFendai()
      break
    default:
      // 十进制
      formState.jd = mapWork.marsUtilFormtNum(currJD, 6)
      formState.wd = mapWork.marsUtilFormtNum(currWD, 6)
      break
  }
}

const changeFendai = () => {
  if (formState.radioFendai === "2") {
    // 十进制转2000平面六分度
    const zoon6 = mapWork.marsProj4Trans(currJD, currWD, formState.radioFendai)
    formState.gk6X = mapWork.marsUtilFormtNum(zoon6[0], 1)
    formState.gk6Y = mapWork.marsUtilFormtNum(zoon6[1], 1)
  } else {
    // 十进制转2000平面三分度
    const zone3 = mapWork.marsProj4Trans(currJD, currWD, formState.radioFendai)
    formState.gk6X = mapWork.marsUtilFormtNum(zone3[0], 1)
    formState.gk6Y = mapWork.marsUtilFormtNum(zone3[1], 1)
  }
}

const bindMourseClick = () => {
  mapWork.bindMourseClick()

  mapWork.eventTarget.on("clickMap", (event: any) => {
    currJD = event.coordinate.lng
    currWD = event.coordinate.lat
    formState.jd = mapWork.marsUtilFormtNum(currJD, 6)
    formState.wd = mapWork.marsUtilFormtNum(currWD, 6)
    changeFanwei()
    // 更新面板
    mapWork.updateMarker(false, currJD, currWD)
  })
}
const submitCenter = () => {
  if (formState.jd > 180 || formState.jd < -180) {
    $alert("请输入有效的经度值！")
    return
  }
  if (formState.wd > 90 || formState.wd < -90) {
    $alert("请输入有效的纬度值！")
    return
  }
  mapWork.updateMarker(true, formState.jd, formState.wd)
}
</script>
<style scoped lang="less">
.decimal-system {
  width: 225px;
}
.degree-minutes {
  width: 90px;
}
</style>
