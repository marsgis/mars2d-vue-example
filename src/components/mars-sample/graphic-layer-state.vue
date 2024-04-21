<template>
  <div class="f-mb">
    <a-space>
      <span class="mars-pannel-item-label">图层状态:</span>
      <a-checkbox v-model:checked="formState.enabledShowHide" @change="onChangeShow" title="显示隐藏状态">显示</a-checkbox>
      <mars-button v-if="!formState.enabledOpacity" @click="onClickFlyTo" class="width-80" title="视角定位" size="small"
                   shape="round">
        <mars-icon icon="focus-one" class="icon-vertical-a" />
        定位
      </mars-button>
    </a-space>

    <div v-if="formState.enabledOpacity">
      <a-space>
        <span class="mars-pannel-item-label" title="不是所有矢量数据均支持修改全局透明度">透明度:</span>
        <mars-slider v-model:value="formState.opacity" :min="0.0" :max="1.0" :step="0.1" @change="onOpacityChange" />

        <mars-button @click="onClickFlyTo" class="width-80" title="视角定位" size="small" shape="round">
          <mars-icon icon="focus-one" class="icon-vertical-a" />
          定位
        </mars-button>
      </a-space>

    </div>
  </div>

  <div class="f-mb" v-if="props.interaction">
    <a-space>
      <span class="mars-pannel-item-label">图层交互:</span>
      <a-checkbox v-model:checked="formState.enabledPopup" @change="onChangePopup"
                  title="是否绑定Popup鼠标单击弹窗">单击Popup</a-checkbox>
      <a-checkbox v-model:checked="formState.enabledTooltip" @change="onChangeTooltip"
                  title="是否绑定Tooltip鼠标移入弹窗">移入Tooltip</a-checkbox>
    </a-space>
    <a-checkbox class="right-menu" v-model:checked="formState.enabledRightMenu" @change="onChangeRightMenu"
                title="是否绑定右键菜单">右键菜单</a-checkbox>
  </div>

  <div class="f-mb" v-if="props.enabledDraw">
    <a-space>
      <span class="mars-pannel-item-label">数据维护:</span>

      <a-checkbox v-if="props.interaction && formState.enabledEdit" v-model:checked="formState.hasEdit"
                  @change="onChangeHasEdit" title="是否单击进行编辑状态">是否编辑</a-checkbox>

      <a-checkbox v-if="enabledTable" v-model:checked="formState.hasTable" title="显示图层内所有矢量数据列表">显示列表</a-checkbox>
    </a-space>

    <a-space>
      <mars-button class="width-80 right-menu" v-if="!formState.isDrawing" @click="onClickStartDraw">{{ props.drawLabel1
        }}</mars-button>
      <mars-button v-if="props.drawLabel2 && !formState.isDrawing" class="width-80 f-mt" @click="onClickStartDraw2">{{
        props.drawLabel2
      }}</mars-button>
      <mars-button v-if="formState.isDrawing" class="width-80 right-menu" @click="onClickClearDrawing"
                   danger>取消绘制</mars-button>
    </a-space>
  </div>

  <div class="f-mb">
    <a-space>
      <span class="mars-pannel-item-label">数据测试:</span>
      <mars-input-number :min="1" :max="1000000" v-model:value="formState.count" step="1"></mars-input-number>
      <span class="text-color">条</span>
      <mars-button @click="addRandomGraphicByCount">生成</mars-button>
      <mars-button @click="onClickClear" danger>
        <mars-icon icon="delete" class="icon-vertical-a" />
        清除
      </mars-button>
    </a-space>
  </div>

  <div class="f-mb">
    <a-space>
      <span class="mars-pannel-item-label">数据导出:</span>
      <a-upload :multiple="false" name="file" accept=".json,.geojson" :file-list="fileList" :showUploadList="false"
                :supportServerRender="true" :beforeUpload="() => false" @change="onClickImpFile">
        <mars-button class="width-230" title="打开GeoJSON">
          <mars-icon icon="folder-open" class="icon-vertical-a" />
          打开
        </mars-button>
      </a-upload>
    </a-space>

    <div class="right-menu">
      <a-space>
        <mars-button class="width-110" @click="expGeoJSONFile" title="保存GeoJSON">
          导出GeoJSON
        </mars-button>
        <mars-button class="width-110" @click="expJSONFile" title="导出构造参数Json"> 导出构造JSON </mars-button>
      </a-space>
    </div>

  </div>

  <div class="f-mb data-list">
    <mars-table size="small" v-if="enabledTable && formState.hasTable" :pagination="{ pageSize: currentPage }"
                :customRow="graphicCustomRowObj" :dataSource="graphicDataList" :columns="graphicColumns"
                :scroll="{ y: 400 }" @change="pageSizeChange" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'caozuo'">
          <a-space>
            <mars-icon title="修改矢量数据样式" icon="file-editing" color="#031A3D" class="icon-vertical-a"
                       @click.stop="startEditGraphic(record)" />
            <mars-icon title="删除矢量数据" icon="delete-one" color="#F96868" class="icon-vertical-a"
                       @click.stop="deleteGraphic(record)" />
          </a-space>
        </template>

        <template v-else>
          {{ record.name }}
        </template>
      </template>
    </mars-table>
  </div>
</template>

<script lang="ts" setup>
/**
 * 公共组件：封装矢量图层操作
 * @copyright 火星科技 mars2d.cn
 * @author 火星渣渣灰 2022-08-31
 */
import { ref, reactive, onMounted, markRaw } from "vue"
import type { UnwrapRef } from "vue"
import { $alert, $message, $showLoading, $hideLoading } from "@mars/components/mars-ui/index"
import { useWidget } from "@mars/widgets/common/store/widget"

const props = withDefaults(
  defineProps<{
    interaction?: boolean // 是否可以鼠标拾取和交互
    enabledDraw?: boolean // 是否可以绘制
    enabledTable?: boolean // 是否显示表格
    drawLabel1?: string // 绘制按钮 文本
    drawLabel2?: string // 绘制按钮2 文本
    defaultCount?: number // 默认的数据量
    customEditor?: string
  }>(),
  {
    interaction: true,
    enabledDraw: true,
    enabledTable: true,
    drawLabel1: "图上标绘",
    drawLabel2: undefined,
    defaultCount: 100,
    customEditor: ""
  }
)

interface FormState {
  enabledShowHide: boolean
  enabledPopup: boolean
  enabledTooltip: boolean
  enabledRightMenu: boolean
  enabledOpacity: boolean
  opacity: number
  enabledEdit: boolean
  hasEdit: boolean
  hasTable: boolean
  count: number
  isDrawing: boolean
}

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledPopup: true,
  enabledTooltip: false,
  enabledRightMenu: false,
  enabledOpacity: true,
  opacity: 1,
  enabledEdit: true,
  hasEdit: true,
  hasTable: false,
  count: props.defaultCount,
  isDrawing: false
})

const currentPage = ref(5) // 分页查询每页条数

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork
const mars2d = mapWork.mars2d

onMounted(() => {
  // 恢复默认状态
  if (mapWork.eventTarget) {
    mapWork.eventTarget.on("defuatData", (item: any) => {
      formState.opacity = 1.0
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
      formState.hasEdit = layer.isEditing

      const graphics = layer.getGraphics()

      if (graphics.length > 0) {
        const lastgraphic = graphics[graphics.length - 1]
        formState.enabledOpacity = lastgraphic.hasOpacity
      }

      formState.hasTable = graphics.length > 0

      layer.on("drawStart drawMouseMove drawCreated addGraphic removeGraphic ", function (e) {
        setTimeout(() => {
          formState.isDrawing = layer.isDrawing
        }, 10)
      })
    }
  }, 500)
})

// 获取map.js中定义的需要管理的图层
function getManagerLayer() {
  if (mapWork.getManagerLayer) {
    return mapWork.getManagerLayer()
  }
  return mapWork.graphicLayer
}

// 分页查询每页条数
const pageSizeChange = (pagination) => {
  currentPage.value = pagination.pageSize
}

// 是否编辑
const onChangeHasEdit = () => {
  const layer = getManagerLayer()
  layer.hasEdit = formState.hasEdit

  // 编辑时，为了方便操作自动关闭Popup，真实项目中请按需修改
  formState.enabledPopup = !formState.hasEdit
  onChangePopup()
}

// 调整透明度
const onOpacityChange = () => {
  const layer = getManagerLayer()
  layer.opacity = formState.opacity
}

// 生成大数据
const addRandomGraphicByCount = () => {
  $showLoading()
  const startTime = new Date().getTime()

  const result = mapWork.addRandomGraphicByCount(formState.count)

  $hideLoading()
  const endTime = new Date().getTime()
  const usedTime = (endTime - startTime) / 1000 // 两个时间戳相差的毫秒数
  $message(`生成${result || formState.count}条数据，共耗时${usedTime.toFixed(2)}秒`)

  const layer = getManagerLayer()
  initGraphicableData(layer)
  layer.flyTo({ duration: 0, heading: 0, pitch: -40, scale: 1.2 })
}

const onClickFlyTo = () => {
  const layer = getManagerLayer()
  if (layer.graphics.length !== 0) {
    layer.flyTo({ scale: 1.2 })
    // const map = layer._map
    // map.once("dragend", function() {
    //   map.fire("zoomend")
    // })
  }
}

const onClickStartDraw = () => {
  mapWork.startDrawGraphic()
  const layer = getManagerLayer()
  formState.isDrawing = layer?.isDrawing
}
const onClickStartDraw2 = () => {
  mapWork.startDrawGraphic2()
  const layer = getManagerLayer()
  formState.isDrawing = layer?.isDrawing
}
const onClickClearDrawing = () => {
  const layer = getManagerLayer()
  layer.clearDrawing()
  formState.isDrawing = layer?.isDrawing
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
    // TODO：手动关闭打开的popup,但是数据绑定的无法关闭
    layer.closePopup()
    layer.unbindPopup()
  }
}

const onChangeTooltip = () => {
  const layer = getManagerLayer()
  if (formState.enabledTooltip) {
    layer.bindTooltip(function (event) {
      const attr = getAttrForEvent(event)
      attr["类型"] = event.graphic?.type
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
  graphicLayer.bindPopup(
    function (event) {
      const attr = getAttrForEvent(event)
      attr["类型"] = event.graphic?.type
      attr["来源"] = "我是layer上绑定的Popup"
      attr["备注"] = "我支持鼠标交互"

      return mars2d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })

      // return new Promise((resolve) => {
      //   //这里可以进行后端接口请求数据，setTimeout测试异步
      //   setTimeout(() => {
      //     resolve('Promise异步回调显示的弹窗内容信息')
      //   }, 2000)
      // })
    },
    { pointerEvents: true }
  )
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
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        graphicLayer.removeGraphic(graphic)
        if (parent) {
          graphicLayer.removeGraphic(parent)
        }
      }
    },
    {
      text: "计算长度",
      icon: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "polyline" ||
          graphic.type === "polylineP" ||
          graphic.type === "curve" ||
          graphic.type === "curveP" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "polylineVolumeP" ||
          graphic.type === "corridor" ||
          graphic.type === "corridorP" ||
          graphic.type === "wall" ||
          graphic.type === "wallP"
        )
      },
      callback: (e) => {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      icon: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP"
        )
      },
      callback: (e) => {
        const graphic = e.graphic
        const strDis = mars2d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      icon: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          ((graphic.type === "polygon" ||
            graphic.type === "polygonP" ||
            graphic.type === "wall" ||
            graphic.type === "scrollWall" ||
            graphic.type === "water") &&
            graphic.positionsShow?.length > 2)
        )
      },
      callback: (e) => {
        const graphic = e.graphic
        const strArea = mars2d.MeasureUtil.formatArea(graphic.area)
        $alert("该对象的面积为:" + strArea)
      }
    }
  ])
}

//  清除数据
const onClickClear = () => {
  const layer = getManagerLayer()

  layer.enabledEvent = false // 关闭事件，大数据removeGraphic时效率低
  layer.clear()
  layer.enabledEvent = true

  // 清除列表
  graphicDataList.value = []
  if (props.customEditor) {
    emit("onStopEditor")
  } else {
    disable("graphic-editor")
  }
}
// 保存json
const expJSONFile = () => {
  const graphicLayer = getManagerLayer()

  if (graphicLayer.length === 0) {
    $message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayer.toJSON()
  mars2d.Util.downloadFile("矢量数据构造参数.json", JSON.stringify(geojson))
}
// 保存geojson
const expGeoJSONFile = () => {
  const graphicLayer = getManagerLayer()

  if (graphicLayer.length === 0) {
    $message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayer.toGeoJSON()
  mars2d.Util.downloadFile("矢量数据GeoJSON.json", JSON.stringify(geojson))
}
// 打开geojson
const onClickImpFile = (info: any) => {
  const graphicLayer = getManagerLayer()

  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType === "json" || fileType === "geojson") {
    const reader = new FileReader()
    reader.readAsText(item, "UTF-8")
    reader.onloadend = function (e) {
      const geojson = JSON.parse(this.result as string)
      console.log("打开了json文件", geojson)

      if (geojson.type === "graphic" && geojson.data) {
        graphicLayer.addGraphic(geojson.data)
        graphicLayer.flyTo()
      } else {
        graphicLayer.loadGeoJSON(geojson, { flyTo: true })
      }

      initGraphicableData(graphicLayer)
    }
  } else if (fileType === "kml") {
    const reader = new FileReader()
    reader.readAsText(item, "UTF-8")
    reader.onloadend = function (e) {
      const strkml = this.result

      mapWork.kgUtil.toGeoJSON(strkml).then((geojson) => {
        console.log("kml2geojson转换结果为", geojson)

        graphicLayer.loadGeoJSON(geojson, {
          flyTo: true
        })
      })
    }
  } else if (fileType === "kmz") {
    // 加载input文件控件的二进制流

    mapWork.kgUtil.toGeoJSON(item).then((geojson) => {
      console.log("kmz2geojson", geojson)

      graphicLayer.loadGeoJSON(geojson, {
        flyTo: true
      })
    })
  } else {
    $message("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

const fileList = ref([])

// 数据编辑属性面板 相关处理
const { activate, disable, isActivate, updateWidget } = useWidget()
onMounted(() => {
  const graphicLayer = getManagerLayer()

  // 矢量数据创建完成
  graphicLayer.on(mars2d.EventType.drawCreated, function (e) {
    if (formState.hasEdit || props.customEditor) {
      showEditor(e.graphic)
    }
  })
  // 修改了矢量数据
  graphicLayer.on("editStart editMovePoint editStyle editRemovePoint", function (e) {
    showEditor(e.graphic)
  })
  // 停止编辑
  graphicLayer.on("editStop removeGraphic", function (e) {
    setTimeout(() => {
      disable("graphic-editor")
      // if (!graphicLayer.isEditing) {
      //   if (props.customEditor) {
      //     emit("onStopEditor")
      //   } else {
      //     disable("graphic-editor")
      //   }
      // }
    }, 100)
  })
})

const showEditor = (graphic: any) => {
  if (props.customEditor === graphic.type) {
    disable("graphic-editor") // 关闭属性面板
    emit("onStartEditor", {
      graphicId: graphic.id,
      graphicName: getGraphicName(graphic)
    })
    return
  }

  emit("onStopEditor") // 关闭参数调节面板

  const graphicLayer = getManagerLayer()
  graphicLayer.startEditing(graphic)

  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: {
        graphic: markRaw(graphic)
      }
    })
  } else {
    updateWidget("graphic-editor", {
      data: {
        graphic: markRaw(graphic)
      }
    })
  }
}

// 数据列表
interface GraphicTableItem {
  key: number
  name: string
}
const graphicDataList = ref<GraphicTableItem[]>([])

// 列表名称
const graphicColumns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo",
    width: 60,
    align: "center"
  }
]

onMounted(() => {
  const graphicLayer = getManagerLayer()
  initGraphicableData(graphicLayer)

  graphicLayer.on(mars2d.EventType.drawCreated, function (event) {
    const graphic = event.graphic
    if (graphic.isPrivate) {
      return
    }

    graphicDataList.value.push({
      key: graphic.id,
      name: getGraphicName(graphic)
    })
  })

  graphicLayer.on(mars2d.EventType.removeGraphic, function (event) {
    const graphicId = event.graphic.id
    const idx = graphicDataList.value.findIndex((item) => item.key === graphicId)
    if (idx !== -1) {
      graphicDataList.value.splice(idx, 1)
    }
  })
})

function initGraphicableData(graphicLayer) {
  const list = graphicLayer.graphics
  for (let i = list.length - 1; i >= 0; i--) {
    const graphic = list[i]
    if (graphic.isPrivate) {
      continue
    }

    graphicDataList.value.push({
      key: graphic.id,
      name: getGraphicName(graphic)
    })
  }
}

let graphicIndex = 0
function getGraphicName(graphic) {
  if (graphic?.style?.label?.text) {
    return `${graphic.type} - ${graphic.style.label.text}`
  }

  if (graphic.name) {
    return `${graphic.type} - ${graphic.name}`
  }

  if (graphic?.attr?.remark) {
    return `${graphic.type} - ${graphic.attr.remark}`
  }

  graphic.name = `未命名${++graphicIndex}`
  return `${graphic.type} - ${graphic.name}`
}

// 表格行: 点击含，飞行定位
const graphicCustomRowObj = (recode: any) => {
  return {
    onClick: () => {
      const graphicLayer = getManagerLayer()
      const graphic = graphicLayer.getGraphicById(recode.key)
      mapWork.map.flyToGraphic(graphic)
    }
  }
}

const emit = defineEmits(["onStartEditor", "onStopEditor"])

// 表格行: 开始编辑graphic
function startEditGraphic(record: GraphicTableItem) {
  const graphicLayer = getManagerLayer()
  const graphic = graphicLayer.getGraphicById(record.key)
  showEditor(graphic) // 修改style
}

// 表格行: 删除graphic
const deleteGraphic = (record: GraphicTableItem) => {
  const graphicLayer = getManagerLayer()
  const graphic = graphicLayer.getGraphicById(record.key)
  // graphic && graphic.remove()
  graphic && graphicLayer.removeGraphic(graphic)
}
</script>

<style scoped lang="less">
.mars-pannel-item-label {
  width: auto;
}

.ant-input-number {
  width: 80px;
}

:deep(.ant-slider) {
  width: 114px;
}

:deep(.ant-table-pagination) {
  margin: 10px 0 1px 0 !important;
}

.data-list {
  width: 298px;
}

.width-64 {
  width: 64px;
}

.width-80 {
  width: 80px;
}

.width-230 {
  width: 230px;
}

.width-110 {
  width: 110px;
}

.right-menu {
  margin-top: 10px;
  margin-left: 69px;
}

.text-color {
  font-size: 14px;
  color: rgba(3, 26, 61, 0.3);
}
</style>
