<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      示例：
      <div v-for="(item, index) in dom" :key="index">
        <mars-button @click="item.callback">{{ item.name }}</mars-button>
      </div>
    </a-space>
  </mars-dialog>
</template>
<script setup lang="ts">
import * as mapWork from "./map.js"

const dom = [
  {
    name: "省界线",
    callback: () => mapWork.showChinaLineDemo()
  },
  {
    name: "规划面",
    callback: () => mapWork.showGuihuaDemo()
  },
  {
    name: "安徽各市",
    callback: () => mapWork.showAnhuiDemo()
  },
  {
    name: "世界各国",
    callback: () => mapWork.showWorldDemo()
  },
  {
    name: "标绘数据",
    callback: () => mapWork.showDrawDemo()
  },
  {
    name: "体育设施点",
    callback: () => mapWork.showPointDemo()
  }
]
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
