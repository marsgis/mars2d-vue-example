<template>
  <a-row>
    <a-col :span="labelSpan" v-if="props.label !== ''">
      <span class="mars-dialog-item-label">{{ props.label }}</span>
    </a-col>
    <a-col :span="buttonSpan">
      <a-space>
        <a-checkbox v-model:checked="formState.enabledShowHide" @change="onChangeShow" title="显示隐藏状态">显示</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledPopup" @change="onChangePopup" title="是否绑定Popup鼠标单击弹窗">Popup</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledTooltip" @change="onChangeTooltip" title="是否绑定Tooltip鼠标移入弹窗">Tooltip</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledRightMenu" @change="onChangeRightMenu" title="是否绑定右键菜单">右键菜单</a-checkbox>
      </a-space>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
/**
 * 公共组件：封装图层状态操作
 * @copyright 火星科技 mars2d.cn
 * @author 火星渣渣灰 2022-01-01
 */
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import { $alert } from "@mars/components/mars-ui/index"

const props = withDefaults(
  defineProps<{
    label?: string
  labelSpan?: number
  }>(),
  {
    label: "图层状态:",
    labelSpan: 5
  }
)

const labelSpan = props.labelSpan || 5
const buttonSpan = 24 - labelSpan

interface FormState {
  enabledShowHide: boolean
  enabledPopup: boolean
  enabledTooltip: boolean
  enabledRightMenu: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork
const mars2d = mapWork.mars2d

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledPopup: false,
  enabledTooltip: false,
  enabledRightMenu: false
})

// 恢复默认状态
if (mapWork.eventTarget) {
  mapWork.eventTarget.on("defuatData", (item: any) => {
    formState.enabledShowHide = item.enabledShowHide
    formState.enabledPopup = item.enabledPopup
    formState.enabledTooltip = item.enabledTooltip
    formState.enabledRightMenu = item.enabledRightMenu
  })
}
setTimeout(() => {
    const layer = getManagerLayer()
    if (layer) {
      formState.enabledShowHide = layer.show

      formState.enabledPopup = layer.hasPopup()
      formState.enabledTooltip = layer.hasTooltip()
      formState.enabledRightMenu = layer.hasContextMenu()
    }
  }, 500)

// 获取map.js中定义的需要管理的图层
function getManagerLayer() {
  if (mapWork.getManagerLayer) {
    return mapWork.getManagerLayer()
  }
  return mapWork.graphicLayer
}

const onChangeShow = () => {
  const layer = getManagerLayer()
  layer.show = formState.enabledShowHide
}
const onChangePopup = () => {
  const layer = getManagerLayer()
  if (formState.enabledPopup) {
    if (mapWork.bindLayerPopup) {
      mapWork.bindLayerPopup()
    } else {
      bindLayerPopup()
    }
  } else {
    layer.unbindPopup()
  }
}

const onChangeTooltip = () => {
  const layer = getManagerLayer()
  if (formState.enabledTooltip) {
    // layer.bindTooltip("我是layer上绑定的Tooltip")
    layer.bindTooltip(function (event) {
      const attr = getAttrForEvent(event)
      attr["类型"] = event.type
      attr["来源"] = "我是layer上绑定的Toolip"
      attr["备注"] = "我支持鼠标移入交互"

      return mars2d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
    })
  } else {
    layer.unbindTooltip()
  }
}

const onChangeRightMenu = () => {
  const layer = getManagerLayer()
  if (formState.enabledRightMenu) {
    if (mapWork.bindLayerContextMenu) {
      mapWork.bindLayerContextMenu()
    } else {
      bindLayerContextMenu()
    }
  } else {
    layer.unbindContextMenu(true)
  }
}

// 在图层绑定Popup弹窗
function bindLayerPopup() {
  const graphicLayer = getManagerLayer()
  graphicLayer.bindPopup(function (event) {
    const attr = getAttrForEvent(event)
    attr["类型"] = event.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars2d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
  })
}

function getAttrForEvent(event) {
  if (event?.graphic?.attr) {
    return event.graphic.attr
  }
  if (!event.czmObject) {
    return {}
  }

  let attr = event.czmObject._attr || event.czmObject.properties || event.czmObject.attribute
  if (attr && attr.type && attr.attr) {
    attr = attr.attr // 兼容历史数据,V2内部标绘生产的geojson
  }
  return attr ?? {}
}

// 绑定右键菜单
function bindLayerContextMenu() {
  const graphicLayer = getManagerLayer()

  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.editing) {
          return false
        }
        return !graphic.editing.enabled()
      },
      callback: function (e) {
        const graphic = e.graphic
        graphicLayer.startEditing(graphic)
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.editing) {
          return false
        }
        return graphic.editing.enabled()
      },
      callback: function (e) {
        const graphic = e.graphic
        graphicLayer.stopEditing()
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "polyline" || graphic.type === "brushLine"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars2d.MeasureUtil.formatArea(graphic.area)
        $alert("该对象的面积为:" + strArea)
      }
    }
  ])
}
</script>

<style scoped lang="less">
.ant-space {
  flex-wrap: wrap;
}
</style>
