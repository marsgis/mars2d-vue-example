<template>
  <!--导航-->
  <Head @clickNav="clickNav" />
  <main id="main">
    <example-list v-show="!showIframe" @jump="jumpUrl"></example-list>
    <!-- 文档页按需创建：避免初始 src="" 把当前页面再加载到隐藏 iframe 中 -->
    <iframe v-if="showIframe" class="doc-frame" title="Mars2D 文档" :src="iframeSrc"></iframe>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import ExampleList from "@mars/components/mars-work/example-list.vue"
import Head from "@/components/mars-work/mars-head.vue"

const iframeSrc = ref("")
const showIframe = ref(false)

const jumpUrl = (item: any) => {
  let url = process.env.BASE_URL
  if (process.env.EDITOR_MODE) {
    url += "editor-vue.html"
  } else {
    url += "read-vue.html"
  }

  // 处理参数
  url += `?key=${item.id}&id=` + encodeURI(item.main)
  if (item.params) {
    url += `&${item.params}`
  }
  window.open(url, "_blank")
}

const clickNav = (item: any) => {
  if (item.page) {
    iframeSrc.value = item.page
    showIframe.value = true
  } else {
    showIframe.value = false
  }
}
</script>

<style lang="less">
body {
  background-color: #fff;
}
* {
  padding: 0;
  margin: 0;
}

.hide {
  display: none;
}
ul,
li {
  list-style: none;
}
.center {
  text-align: center;
}
a {
  color: #666;
  text-decoration: none;
}
img {
  border: 0;
}
input,
textarea,
select {
  color: #797979;
  border: 0;
  outline: none;
  resize: none;
}
input:focus,
textarea:focus,
select:focus {
  outline: 0;
}
textarea {
  resize: vertical;
  resize: none;
}
em,
i,
strike {
  font-style: normal;
}
.hide {
  display: none !important;
}
.block {
  display: block;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
  height: 0;
}
.text-r {
  text-align: right;
}
.ell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.no-select-text {
  /*禁止文本被多次点击选中*/
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.i-icon-right {
  color: #fff;
  opacity: 0.6;
}

/* 文档 iframe：占满顶栏以下的视口高度 */
.doc-frame {
  display: block;
  width: 100%;
  height: calc(100vh - var(--mh-header-height, 76px));
  border: 0;
}
</style>
