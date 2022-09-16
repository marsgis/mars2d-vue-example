<template>
  <a-collapse :key="globalKey" v-model:activeKey="styleCollapse">
    <a-collapse-panel v-if="viewStyles" key="1" :showArrow="false" header="+ 样式信息">
      <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
        <tr>
          <td>所在图层</td>
          <td>{{ layerName || "默认分组" }}</td>
        </tr>
        <tr>
          <td>标号类型</td>
          <td>{{ graphicType }}</td>
        </tr>
        <tr>
          <td>样式类型</td>
          <td>{{ styleType || "未配置" }}</td>
        </tr>
        <template v-if="styleValue">
          <template v-for="(item, i) in viewStyles" :key="i">
            <!-- 不是hidden类型 -->
            <template v-if="item.type !== 'hidden'">
              <tr>
                <td>{{ item.label }}</td>
                <td>
                  <base-comp
                    :type="item.type"
                    size="small"
                    v-model:value="styleValue[item.name]"
                    :min="item.min || item.min === 0 ? item.min : -Infinity"
                    :max="item.max || item.max === 0 ? item.max : Infinity"
                    :step="item.step || 0.1"
                    :options="item.data || []"
                    @change="unionChange(item, item.data)"
                  ></base-comp>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </table>
    </a-collapse-panel>
    <a-collapse-panel v-if="styleValue && styleValue.label" key="2" :showArrow="false" header="+ 注记信息">
      <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
        <template v-for="(item, i) in viewLabels" :key="i">
          <tr>
            <td>{{ item.label }}</td>
            <td>
              <base-comp
                :type="item.type"
                size="small"
                v-model:value="styleValue.label[item.name]"
                :min="item.min || item.min === 0 ? item.min : -Infinity"
                :max="item.max || item.max === 0 ? item.max : Infinity"
                :step="item.step || 0.1"
                :options="item.data || []"
                @change="labelChange(item)"
              ></base-comp>
            </td>
          </tr>
        </template>
      </table>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch, toRaw } from "vue"
import _ from "lodash"
import { $message } from "@mars/components/mars-ui/index"
import BaseComp from "./component/base-comp.vue"
import styleConfigAll from "./config/style.js"

const props = defineProps<{
  layerName: string
  graphicType: string
  customType?: string
  style: any
}>()

const emit = defineEmits(["styleChange"])

const styleValue = ref<any>({})
const viewStyles = ref<any[]>([])
const styleType = ref("")

let originStyles = [] // 原始的完整style配置
const globalKey = ref(0)
watch(
  props,
  () => {
    if (props && props.style) {
      globalKey.value++
      setDefault() // 处理初始化默认值（不做任何修改之前的状态）
      updateViewStyles() // 处理属性控件的显示隐藏

      if (styleValue.value.label) {
        setLabelDefault()
        updateViewLabels()
      }
    }
  },
  {
    immediate: true
  }
)

const styleCollapse = ref(["1", "2"])

// 非材质属性改变
function unionChange(item: any, selectOptions?: any[]) {
  const name = item.name
  if (name === "fill" || name === "outline") {
    if (styleValue.value.fill === false && styleValue.value.outline === false) {
      $message("填充和边框不能同时为否")
      nextTick(() => {
        styleValue.value[name] = true
      })
      return
    }
  }

  // 处理属性控件的显示隐藏
  updateViewStyles()

  // 控制图层样式改变
  updateStyle(item)
}

// 更新属性的显示隐藏，通过配置中的show属性来控制
function updateViewStyles() {
  viewStyles.value = originStyles.filter((item) => {
    const isShow = getViewShow(item, styleValue.value)
    return isShow
  })
}

function getViewShow(config, styleOptions) {
  if (typeof config.show === "function") {
    return config.show(styleOptions, styleValue.value, props.graphicType)
  }
  return true
}

function getViewDefval(config, styleOptions) {
  if (typeof config.defval === "function") {
    return config.defval(styleOptions, styleValue.value, props.graphicType)
  } else {
    return config.defval
  }
}

// 设置初始化的默认值
function setDefault() {
  styleValue.value = _.cloneDeep(props.style)

  const styleConfig = styleConfigAll[props.customType] || styleConfigAll[props.graphicType]
  if (!styleConfig) {
    return
  }

  styleType.value = styleConfig.type
  originStyles = _.cloneDeep(styleConfig.style)
}

function updateStyle(item: any) {
  const val = styleValue.value[item.name]
  const data: Record<string, any> = {
    [item.name]: val
  }

  emit("styleChange", data)
}

// label相关处理
let originLabels
const viewLabels = ref<any[]>([])

function setLabelDefault() {
  originLabels = _.cloneDeep(styleConfigAll.label.style)
  if (originLabels) {
    originLabels.forEach((item: any) => {
      styleValue.value.label[item.name] = styleValue.value.label[item.name] ?? getViewDefval(item, styleValue.value.label) // 数据中没有的地方使用默认值
    })
  }
}
// 更新属性的显示隐藏，通过配置中的show属性来控制
function updateViewLabels() {
  viewLabels.value = originLabels.filter((item) => {
    return getViewShow(item, styleValue.value.label)
  })
}

function labelChange(item: any) {
  // 处理属性控件的显示隐藏
  updateViewLabels()

  // 控制图层样式改变
  updateLabel(item.name)
}

function updateLabel(name) {
  const label: Record<string, any> = {
    [name]: styleValue.value.label[name]
  }
  emit("styleChange", { label })
}
</script>

<style lang="less" scoped>
.attr-editor-label {
  word-break: break-all;
}
</style>
