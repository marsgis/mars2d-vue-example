<template>
  <mars-dialog :visible="true" right="10" top="10" bottom="40" width="330">
    <div class="f-mb f-tac">
      <a-space>
        <mars-input v-model:value="formState.input" placeholder="输入名称"></mars-input>
        <mars-button @click="butAddTxtName(false)">添加</mars-button>
        <mars-button @click="butAddTxtName(true)">框选添加</mars-button>
      </a-space>
    </div>
    <div class="bookmarkView">
      <div v-bind:class="formState.found ? 'addNewImg' : 'noFound'" :key="value.name"
        v-for="(value, index) in formState.imgObject">
        <img class="markImg" :src="value.img" @click="flytoView(value)" v-show="formState.found" />
        <p class="name">{{ value.name }}
          <mars-icon icon="delete" class="deleteImg" color="#000000" @click="butDeleteTxtName(index)"
            v-show="formState.found" />
        </p>

      </div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

const formState = reactive({
  input: "",
  found: false,
  imgObject: [{ name: "没有匹配的值", img: "", view: "" }]
})

onMounted(() => {
  getLocalStorage()
})

// 读取历史记录
function getLocalStorage() {
  try {
    const data = JSON.parse(localStorage.getItem("bookmark"))
    if (data && data.length > 0) {
      console.log("历史数据", data)
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // 删除未匹配项
        if (formState.imgObject[0].img === "") {
          formState.imgObject.splice(0, 1)
          formState.found = true
        }
        formState.imgObject.push(item)
      }
    }
  } catch (err) { }
}

// 添加视角书签
const butAddTxtName = (isDraw) => {
  const name = formState.input
  const imgObject = formState.imgObject

  if (!name) {
    $message("请输入名称")
    return
  }

  // 删除未匹配项
  if (imgObject[0].img === "") {
    formState.imgObject.splice(0, 1)
    formState.found = true
  }

  // 不能使用相同名称
  if (formState.imgObject.some((item) => item.name === name)) {
    $message(name + " 已存在，请更换名称!")
    return
  }

  // 动态的获取index
  if (isDraw) {
    mapWork.butAddTxtName2(name)
  } else {
    mapWork.butAddTxtName(name)
  }

  // UI处理
  formState.input = ""
}

// 触发事件
mapWork.eventTarget.on("addImgObject", (event: any) => {
  formState.imgObject.push(event.item)

  // 记录到历史
  localStorage.setItem("bookmark", JSON.stringify(formState.imgObject))
})

// 视角操作
const flytoView = (val: any) => {
  mapWork.flytoView(val.view)
}

const butDeleteTxtName = (index: number) => {
  formState.imgObject.splice(index, 1)

  if (formState.imgObject.length === 0) {
    formState.imgObject = [{ name: "没有匹配的值", img: "", view: "" }]
    formState.found = false
    localStorage.removeItem("bookmark")
    return
  }
  // 记录到历史
  localStorage.setItem("bookmark", JSON.stringify(formState.imgObject))
}
</script>
<style scoped lang="less">
.bookmarkView {
  width: 300px;
  height: calc(100% - 50px);
  border: 1px solid var(--mars-control-border);
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;

  .noFound {
    border: none;
    padding-bottom: 15px;
    border-bottom: 0.5px solid var(--mars-control-border);
    width: 100%;
    padding-left: 30%;
  }

  .addNewImg {
    position: relative;
    border: 1px solid var(--mars-control-border);
    margin-top: 22px;

    &:first-child {
      margin-top: 0;
    }

    &:after {
      content: "";
      width: calc(100% + 20px);
      height: 1px;
      background-color: var(--mars-control-border);
      position: absolute;
      bottom: -13px;
      left: -10px;
    }

    .name {
      position: relative;
      margin: auto;
      white-space: nowrap;
      overflow-x: hidden;
      text-align: center;
      text-overflow: ellipsis;
      padding: 3px 30px 5px;

      &:hover {
        white-space: normal;
        word-wrap: break-word;
      }

      .deleteImg {
        position: absolute;
        top: 6px;
        right: 5px;
      }
    }
  }


  .markImg {
    height: 160px;
    width: 100%;
    z-index: 0;

    &:hover {
      background-color: red;
    }
  }

}
</style>
