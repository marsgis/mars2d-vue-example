<template>
  <a-collapse v-model:activeKey="styleCollapse">
    <a-collapse-panel v-if="props.styleConfig" key="1" :showArrow="false" header="+ 样式信息">
      <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
        <tr>
          <td>所在图层</td>
          <td>{{ layerName || "默认分组" }}</td>
        </tr>
        <tr>
          <td>标号类型</td>
          <td>{{ entityName }}</td>
        </tr>
        <template v-for="(item, i) in props.styleConfig.style" :key="i">
          <tr v-if="styleValue && styleShowIt(item)">
            <td>{{ item.label }}</td>
            <td>
              <span v-if="item.type === 'label'" class="attr-editor-label">{{ styleValue[item.name] }}</span>
              <component
                v-else
                :is="getComponent(item.type)"
                size="small"
                v-model:value="styleValue[item.name]"
                :min="item.min || item.min === 0 ? item.min : -Infinity"
                :max="item.max || item.max === 0 ? item.max : Infinity"
                :step="item.step || 0.1"
                :options="item.data || []"
                @change="unionChange(item)"
              >
              </component>
            </td>
          </tr>
        </template>
      </table>
    </a-collapse-panel>
    <a-collapse-panel v-if="styleValue && styleValue.label" key="2" :showArrow="false" header="+ 注记信息">
      <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
        <template v-for="(item, i) in labelConfig.style" :key="i">
          <tr v-if="labelShowIt(item)">
            <td>{{ item.label }}</td>
            <td>
              <component
                :is="getComponent(item.type)"
                size="small"
                v-model:value="styleValue.label[item.name]"
                :min="item.min || item.min === 0 ? item.min : -Infinity"
                :max="item.max || item.max === 0 ? item.max : Infinity"
                :step="item.step || 0.1"
                :options="item.data || []"
                @change="unionLabelChange"
              ></component>
            </td>
          </tr>
        </template>
      </table>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from "vue"
import _ from "lodash"
import { $message } from "@mars/components/mars-ui/index"

const props = defineProps<{
  styleConfig: any
  style: any
}>()

const emit = defineEmits(["styleChange"])

const getGraphicAttr = inject<() => any>("getGraphicAttr")!
const getGraphic = inject<() => any>("getGraphic")!

const layerName = ref("")
const entityName = ref("")
const styleValue = ref<any>(null)
const showImpacts = ref<any[]>([])
const showLabelImpacts = ref<any[]>([])
const labelConfig = getLabelConfig()

watch(
  props,
  () => {
    if (props && props.style) {
      styleValue.value = _.cloneDeep(props.style)
      setDefault()
      const gp = getGraphic()
      if (gp) {
        layerName.value = gp._layer.name
        entityName.value = gp.name || props.styleConfig.name
      }
      setImpacts()
      if (props.style.label) {
        setLabelDefault()
        setLabelImpacts()
      }
    }

    getLabelConfig()
  },
  {
    immediate: true
  }
)

const styleCollapse = ref(["1", "2"])

const components = {
  number: "mars-input-number",
  radio: "mars-switch",
  slider: "mars-slider",
  color: "mars-color-picker",
  combobox: "mars-select",
  textarea: "mars-textarea",
  label: "span"
}
function getComponent(type: keyof typeof components) {
  return components[type]
}

function getLabelConfig() {
  const graphicAttr = getGraphicAttr()

  return graphicAttr.label
}

function setDefault() {
  if (props.styleConfig.style) {
    props.styleConfig.style.forEach((item: any) => {
      if (!styleValue.value[item.name] && styleValue.value[item.name] !== 0 && styleValue.value[item.name] !== false) {
        styleValue.value[item.name] = item.defval
      }
    })
  }
}

function setImpacts() {
  let allImpacts: any[] = []
  if (props.styleConfig.style) {
    props.styleConfig.style.forEach((item: any) => {
      if (item.impact && styleValue.value[item.name] === true) {
        allImpacts = allImpacts.concat(item.impact)
      }
      if (item.data && _.isArray(item.data)) {
        item.data.forEach((op: any) => {
          if (op.impact && styleValue.value[item.name] === op.value) {
            allImpacts = allImpacts.concat(op.impact)
          }
        })
      }
    })
  }
  showImpacts.value = _.uniq(allImpacts)
}

function setLabelDefault() {
  labelConfig.style.forEach((item: any) => {
    if (!styleValue.value.label[item.name] && styleValue.value.label[item.name] !== 0) {
      styleValue.value.label[item.name] = item.defval
    }
  })
}
function setLabelImpacts() {
  let allImpacts: any[] = []

  labelConfig.style.forEach((item: any) => {
    if (item.impact && styleValue.value.label[item.name] === true) {
      allImpacts = allImpacts.concat(item.impact)
    }
    if (item.data && _.isArray(item.data)) {
      item.data.forEach((op: any) => {
        if (op.impact && styleValue.value.label[item.name] === op.value) {
          allImpacts = allImpacts.concat(op.impact)
        }
      })
    }
  })
  showLabelImpacts.value = _.uniq(allImpacts)
}

function updateStyle(item: any) {
  const data: Record<string, any> = {
    [item.name]: styleValue.value[item.name]
  }
  if (item.impact) {
    item.impact.forEach((im: string) => {
      data[im] = styleValue.value[im]
    })
  }
  if (item.data && Array.isArray(item.data)) {
    item.data.forEach((it: any) => {
      if (it.impact) {
        it.impact.forEach((im: string) => {
          data[im] = styleValue.value[im]
        })
      }
    })
  }

  emit("styleChange", data)
}

function unionChange(item: any) {
  if (item.name === "fill" || item.name === "outline") {
    if (styleValue.value.fill === false && styleValue.value.outline === false) {
      $message("填充和边框不能同时为否")
      styleValue.value[item.name] = true
      return
    }
  }
  setImpacts()
  updateStyle(item)
}

function unionLabelChange(item: any) {
  setLabelDefault()
  setLabelImpacts()
  updateStyle({ name: "label" })
}

// style的显示处理
function styleShowIt(item: any) {
  if (item.type === "hidden") {
    return false
  }
  if (item.isImpact && !showImpacts.value.includes(item.name)) {
    return false
  }

  const attrName = item.name

  // 以下对样式互斥的处理。

  // 贴地对象
  if (styleValue.value.clampToGround) {
    if (
      attrName === "fill" || // 不能取消填充。
      attrName === "height" || // 没有高度
      attrName === "outline" ||
      attrName === "outlineWidth" ||
      attrName === "outlineColor" ||
      attrName === "outlineOpacity" ||
      attrName === "hasShadows" ||
      attrName === "diffHeight"
    ) {
      return false
    }
  } else {
    if (attrName === "zIndex") {
      return false
    }
  }

  // 三维立体对象
  if (styleValue.value.diffHeight > 0) {
    if (attrName === "clampToGround" || attrName === "outlineWidth") {
      return false
    }
  }

  return true
}

// 注记属性的显示处理
function labelShowIt(item: any) {
  return item.type !== "hidden" && (!item.isImpact || (item.isImpact && showLabelImpacts.value.includes(item.name)))
}
</script>

<style lang="less" scoped>
.attr-editor-label {
  word-break: break-all;
}
</style>
