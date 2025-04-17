<template>
  <mars-dialog :visible="true" right="10" top="10" width="250">
    <div>
      <a-space>
        <span title="平移的步长（单位：米）">平移步长:</span>
        <mars-slider v-model:value="slideStep" @change="onChangeSlider" tooltipPlacement="bottom" :min="0" :max="300"
          :step="0.01" />
      </a-space>
    </div>
  </mars-dialog>


  <mars-dialog :visible="true" left="10" top="10">
      <div class="keyboard-img">
        <div v-for="(item, index) in codeList" :key="index" class="zm"
          :class="{ 'active': activeValue === item.codeValue, [item.codeClass]: true }">{{ item.codeName }}</div>
      </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import * as mapWork from "./map.js"

const slideStep = ref<number>(10)
const activeValue = ref(0)


const list = [
  {
    codeValue: 81,
    codeName: "Q",
    codeClass: "zm_q"
  },
  {
    codeValue: 87,
    codeName: "W",
    codeClass: "zm_w"
  },
  {
    codeValue: 69,
    codeName: "E",
    codeClass: "zm_e"
  },
  {
    codeValue: 65,
    codeName: "A",
    codeClass: "zm_a"
  },
  {
    codeValue: 83,
    codeName: "S",
    codeClass: "zm_s"
  },
  {
    codeValue: 68,
    codeName: "D",
    codeClass: "zm_d"
  }
]

const codeList = computed(() => list.filter((item) => item.codeValue === activeValue.value))


const onChangeSlider = () => {
  mapWork.changeSlider(slideStep.value)
}
mapWork.eventTarget.on("keydown", function (event) {
  activeValue.value = event.keyCode
})
mapWork.eventTarget.on("keyup", function (event) {
  activeValue.value = undefined
})

</script>


<style scoped lang="less">
.ant-slider {
  width: 120px;
}

.keyboard-btns {
  display: grid;
  grid-template-columns: 70px repeat(2, 1fr);
  align-items: center;
}


  .keyboard-img {
    width: 155px;
    height: 180px;
    background-image: url(./img/keyboard.png);
    filter: invert(100%);
    clip-path: polygon(0% 0%, 152px 0%, 155px 14px, 155px 100%, 0% 100%);

    .zm {
      width: 28px;
      height: 25px;
      padding: 4px 8px;
      // border: 1px solid #abacae;
      border-radius: 4px;
      color: #fdfdfd;
      text-align: center;
      position: absolute;
      padding: 0px;
      line-height: 25px;

      &:hover {
        background: #006aff;
      }
    }

    .active {
      background: #006aff;
    }


    .zm_q {
      left: 51px;
      top: 59px;
    }

    .zm_w {
      left: 82px;
      top: 59px;
    }

    .zm_e {
      left: 111px;
      top: 59px;
    }

    .zm_a {
      left: 58px;
      top: 88px;
    }

    .zm_s {
      left: 87px;
      top: 88px;
    }

    .zm_d {
      left: 118px;
      top: 88px;
    }
  }
</style>
