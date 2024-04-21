<template>
  <mars-dialog :visible="true" width="332" right="10" top="10">
    <div class="f-mb">
      <layer-state :label-span="11" />
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="11">点状（单个坐标）:</a-col>
        <a-col :span="13">
          <div class="graphiclayer-btns">
            <template v-for="(item, index) in dom[0]" :key="index">
              <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
            </template>
          </div>
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row>
        <a-col :span="11">线面状（多个坐标）:</a-col>
        <a-col :span="13">
          <div class="graphiclayer-btns">
            <template v-for="(item, index) in dom[1]" :key="index">
              <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
            </template>
          </div>
        </a-col>
      </a-row>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import LayerState from "@mars/components/mars-sample/layer-state.vue"

const dom = [
  [
    {
      name: "图标点",
      href: "editor-vue.html?id=graphic/basis/marker"
    },
    {
      name: "运动点",
      href: "editor-vue.html?id=graphic/basis/movingMarker"
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
    },
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
.ant-row {
  :deep(.ant-col-11) {
    text-align: right;
    padding-right: 8px;
  }

  :deep(.ant-space) {
    display: grid;
    grid-template-columns: 70px repeat(1, 1fr);

    .ant-checkbox + span {
      padding-inline-end: 0;
    }
  }

  .graphiclayer-btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
