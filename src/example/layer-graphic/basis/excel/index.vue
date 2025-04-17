<template>
  <mars-dialog :visible="true" right="10" top="10" width="300">


    <div class="f-pt">
      <a-space>
        <mars-button @click="mapWork.downloadCsvModel">下载CSV模版</mars-button>
        <mars-button @click="mapWork.downloadExcelModel">下载Excel模版</mars-button>
      </a-space>
    </div>

    <div class="f-pt">
      <a-space>
        <a-upload :multiple="false" name="file" accept=".xls,.xlsx,.csv" :file-list="fileList" :showUploadList="false"
          :supportServerRender="true" :beforeUpload="() => false" @change="onClickImpFile">
          <mars-button class="open-file-btn" title="打开GeoJSON">
            打开文件
          </mars-button>
        </a-upload>
        <mars-button @click="mapWork.startDrawGraphic">标绘</mars-button>
        <mars-button @click="mapWork.clearData">清除</mars-button>
      </a-space>
    </div>

    <div class="f-pt">
      <a-space>
        <mars-button @click="mapWork.downloadCsvData">导出CSV</mars-button>
        <mars-button @click="mapWork.downloadExcelData">导出Excel</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const fileList = ref([])

// 打开geojson
const onClickImpFile = (info: any) => {
  const item = info.file
  mapWork.openFile(item)
}

</script>
<style lang="less"></style>
