<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="6">点状（单个坐标）:</a-col>
        <a-col :span="17">
          <a-space>
            <div v-for="(item, index) in dom[0]" :key="index">
              <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
            </div>
          </a-space>
          <a-space style="margin-top: 8px;">
            <div v-for="(item, index) in dom[1]" :key="index">
              <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
            </div>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="6">线面状（多个坐标）:</a-col>
        <a-col :span="17">
          <a-space>
            <div v-for="(item, index) in dom[2]" :key="index">
              <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
            </div>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const dom = [
  [
    {
      name: "图标点",
      href: "editor-vue.html?id=graphic/basis/marker"
    },
    {
      name: "运动点",
      href: "editor-vue.html?id=graphic/basis/marker-moving"
    },
    {
      name: "像素点",
      href: "editor-vue.html?id=graphic/basis/point"
    },
    {
      name: "文本",
      href: "editor-vue.html?id=graphic/basis/label"
    },
    {
      name: "DIV点",
      href: "editor-vue.html?id=graphic/divGraphic/basis"
    },
    {
      name: "圆",
      href: "editor-vue.html?id=graphic/basis/circle"
    }
  ],
  [
    {
      name: "椭圆",
      href: "editor-vue.html?id=graphic/basis/ellipse"
    }
  ],
  [
    {
      name: "线",
      href: "editor-vue.html?id=graphic/basis/polyline"
    },
    {
      name: "平行线",
      href: "editor-vue.html?id=graphic/basis/polyline-offset"
    },
    {
      name: "矩形",
      href: "editor-vue.html?id=graphic/basis/rectangle"
    },
    {
      name: "图片",
      href: "editor-vue.html?id=graphic/basis/image"
    },
    {
      name: "面",
      href: "editor-vue.html?id=graphic/basis/polygon"
    }
  ]
]
</script>

<style scoped lang="less">
.infoView {
  width: 495px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
</style>
