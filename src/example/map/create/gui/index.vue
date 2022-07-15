<template>
  <mars-dialog :visible="true" top="20" right="10" :width="400">
    <!-- 方式一： 通过组件api 删除或添加显示的元素， option不需要是响应式数据 -->
    <h3 class="f-push-10-t">表单一</h3>
    <mars-gui ref="marsGuiRef" :options="options" @change="gui1Change"></mars-gui>

    <!-- 方式二： 直接通过options控制显示元素， option需要是响应式数据 -->
    <h3 class="f-push-10-t">表单二</h3>
    <div class="f-mb">
      <mars-gui :options="options2"></mars-gui>
    </div>
    <div class="f-mb">
      <a-space>
        <mars-button @click="deleteJingdu">删除数字</mars-button>
        <mars-button @click="deleteFirst">删除第一个</mars-button>
        <mars-button @click="insertOne">插入一个</mars-button>
        <mars-button @click="insertMore">插入多个</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <mars-button @click="updateExtra">改变后缀</mars-button>
        <mars-button @click="updateAll">完全替换</mars-button>
        <mars-button @click="updateAllDate">批量更新</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { $message } from "@mars/components/mars-ui"
import MarsButton from "@mars/components/mars-ui/mars-button/index.vue"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"
import * as mapWork from "./map.js"
import { ref, h, defineComponent } from "vue"

const options: GuiItem[] = [
  {
    type: "inputGroup",
    field: "dufenmiao",
    label: "度分秒",
    extra: "{type}-{dufenmiao}",
    value: [1, 2, 3],
    units: ["度", "分", "秒"],
    change(data) {
      console.log(data)
    }
  },
  {
    type: "select",
    field: "car",
    label: "下拉选择",
    value: "小汽车",
    data: [
      {
        label: "小汽车",
        value: "小汽车"
      },
      {
        label: "货车",
        value: "货车"
      },
      {
        label: "救护车",
        value: "救护车"
      }
    ],
    change(data) {
      $message("你选择了：" + data)
    },
    extra(data) {
      return data.car
    }
  },
  {
    type: "input",
    field: "inputValue",
    label: "输入框",
    value: "mars3d",
    change(data) {
      $message("你输入了：" + data)
    },
    extra: h(
      MarsButton,
      {
        onClick: () => {
          alert("点击了")
        }
      },
      "测试"
    ),
    extraType: "custom"
    // extra: "<mars-button>测试</mars-button>"
  },
  {
    type: "textarea",
    field: "remark",
    label: "备注",
    value: "火星科技",
    change(data) {
      $message("你输入了：" + data)
    }
  },
  {
    type: "number",
    field: "count",
    label: "数字",
    step: 0.1,
    min: -10,
    max: 100,
    value: 0.3,
    change(data) {
      $message("你输入了：" + data)
    }
  },
  {
    type: "color",
    field: "chooseColor",
    label: "选择颜色",
    value: "#fff",
    change(data) {
      console.log(data)
    }
  },
  {
    type: "checkbox",
    field: "type",
    label: "多选",
    value: ["火星"],

    data: [
      {
        label: "火星",
        value: "火星"
      },
      {
        label: "地球",
        value: "地球"
      },
      {
        label: "太阳",
        value: "太阳"
      }
    ],
    change(data) {
      if (data[0]) {
        $message("你选择了：" + data)
      } else {
        $message("取消所有选择")
      }
    }
  },
  {
    type: "radio",
    field: "type2",
    label: "单选",
    value: "火星",
    // 显示过滤器 可以直接传递boolen
    show(data) {
      return data.speed !== "2"
    },
    data: [
      {
        label: "火星",
        value: "火星"
      },
      {
        label: "地球",
        value: "地球"
      },
      {
        label: "太阳",
        value: "太阳"
      }
    ],
    change(data) {
      $message("你选择了：" + data)
    }
  },
  {
    type: "slider",
    field: "opcity",
    label: "滑动输入",
    step: 0.05,
    min: -0.5,
    max: 1.5,
    value: 0,
    extra: "{opcity}",
    change(data) {
      mapWork.updateBrightness(data)
      console.log(data)
    }
  },
  {
    type: "slider",
    field: "range",
    label: "双向滑动",
    step: 0.1,
    range: true,
    min: -10,
    max: 100,
    value: [1, 50],
    extra: "{range}",
    change(data) {
      console.log(data)
    }
  },
  {
    type: "switch",
    field: "opener",
    label: "允许鼠标操作",
    value: true,
    change(data) {
      mapWork.enableMapMouseController(data) // 调用地图方法
    }
  }
]

const marsGuiRef = ref()

// 删除数字
function deleteJingdu() {
  marsGuiRef.value.delete("count")
}

// 删除第一个
function deleteFirst() {
  marsGuiRef.value.delete(0)
}

// 在指定位置插入内容
function insertOne() {
  marsGuiRef.value.insert(3, {
    type: "input",
    field: "weidu",
    label: "纬度",
    value: "122.234324",
    change(data) {
      console.log(data)
    }
  })
}

// 在指点位置插入更多内容
function insertMore() {
  marsGuiRef.value.insert(
    6,
    {
      type: "input",
      field: "field1",
      label: "字段1",
      value: "字段一",
      change(data) {
        console.log(data)
      }
    },
    {
      type: "input",
      field: "field2",
      label: "字段2",
      value: "字段二",
      change(data) {
        console.log(data)
      }
    }
  )
}

// 更新显示面板
function updateExtra() {
  marsGuiRef.value.updateExtra("dufenmiao", "测试改变为显示经度{jingdu}")
}

// gui对象改变时就会触发
function gui1Change(data) {
  console.log(data) // data为该gui对象包含的所有数据
}

const options2 = ref<GuiItem[]>([
  {
    type: "input",
    field: "field1",
    label: "字段1",
    value: "字段一",
    change(data) {
      console.log(data)
    }
  }
])

// 更新gui所有内容
function updateAll() {
  options2.value = [
    {
      type: "input",
      field: "field2",
      label: "字段2",
      value: "字段二",
      change(data) {
        console.log(data)
      }
    }
  ]
}

function updateAllDate() {
  marsGuiRef.value.updateFields({
    opcity: 0.8,
    car: "货车"
  })
}
</script>
<style lang="less"></style>
