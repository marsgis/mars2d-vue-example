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
  const colorRgb = color.value.toLowerCase()

  const regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/ // 判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
  const rsa = colorRgb.replace(/\s+/g, "").match(regRgba)
  if (rsa) {
    let r = parseInt(rsa[1]).toString(16)
    r = r.length === 1 ? "0" + r : r
    let g = (+rsa[2]).toString(16)
    g = g.length === 1 ? "0" + g : g
    let b = (+rsa[3]).toString(16)
    b = b.length === 1 ? "0" + b : b
    // const a = +(rsa[5] ? rsa[5] : 1) * 100

    mapWork.onChangeColor({
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16)
      // alpha: Math.ceil(a)
    })
  } else {
    console.log("颜色获取失败", colorRgb)
  }
}
</script>
