<template>
  <a-space>
    <span class="mars-pannel-item-label">数据管理:</span>
    <mars-button @click="onClickClear">清除</mars-button>
    <mars-button @click="onClickExpFile" title="保存GeoJSON">
      <mars-icon icon="save" class="icon-vertical-a" />
      保存
    </mars-button>
    <a-upload
      :multiple="false"
      name="file"
      accept="json,geojson"
      :file-list="fileList"
      :showUploadList="false"
      :supportServerRender="true"
      :beforeUpload="beforeUploade"
      @change="onClickImpFile"
    >
      <mars-button title="打开GeoJSON">
        <mars-icon icon="upload-one" class="icon-vertical-a" />
        打开
      </mars-button>
    </a-upload>
  </a-space>
</template>

<script setup lang="ts">
/**
 * 公共组件：用来运行或保存GEOJSON
 * @copyright 火星科技 mars2d.cn
 * @author 木遥 2022-01-01
 */
import { ref } from "vue"
import { message } from "ant-design-vue"
import { $message } from "@mars/components/mars-ui/index"

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork
const mars2d = mapWork.mars2d

//  清除数据
const onClickClear = () => {
  mapWork.graphicLayer.clear()
}
// 保存geojson
const onClickExpFile = () => {
  const graphicLayer = mapWork.graphicLayer

  if (graphicLayer.length === 0) {
    $message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayer.toGeoJSON()
  mars2d.Util.downloadFile("我的标注.json", JSON.stringify(geojson))
}
// 打开geojson
const beforeUploade = (file: FileItem) => {
  // fileList.value = [file]
  return false
}
const onClickImpFile = (info: any) => {
  const graphicLayer = mapWork.graphicLayer

  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType === "json" || fileType === "geojson") {
    const reader = new FileReader()
    reader.readAsText(item, "UTF-8")
    reader.onloadend = function (e) {
      const json = this.result
      graphicLayer.loadGeoJSON(json, {
        flyTo: true
      })
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
    message.error("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

const fileList = ref([])
</script>
