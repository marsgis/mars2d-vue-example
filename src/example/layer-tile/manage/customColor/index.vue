<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      rgb叠加颜色：
      <mars-color-picker v-model:value="color" @change="onChangeColor" />
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const color = ref("rgb(51, 59, 112)")
const onChangeColor = () => {
  mapWork.onChangeColor(colorRgb())
}

function colorRgb() {
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let colorRgb = color.value.toLowerCase()
  if (reg.test(colorRgb)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (colorRgb.length === 4) {
      let colorNew = "#"
      for (let i = 1; i < 4; i += 1) {
        colorNew += colorRgb.slice(i, i + 1).concat(colorRgb.slice(i, i + 1))
      }
      colorRgb = colorNew
    }
    // 处理六位的颜色值，转为RGB
    const colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + colorRgb.slice(i, i + 2)))
    }

    return { r: colorChange[0], g: colorChange[1], b: colorChange[2] }
  } else {
    return color
  }
}
</script>
