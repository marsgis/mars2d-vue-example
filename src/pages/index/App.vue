<template>
  <!--导航-->
  <Head :navActive="navActive" @clickNav="clickNav" />
  <example-list v-show="!showIframe" @jump="jumpUrl"></example-list>
  <iframe v-show="showIframe" style="width: 100%; height: 100vh; overflow: auto; margin-top: 68px" frameborder="0" :src="iframeSrc"></iframe>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import ExampleList from "@mars/components/mars-work/example-list.vue"
import Head from "@/components/mars-work/mars-head.vue"

const iframeSrc = ref("")
const navActive = ref(0)
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

const clickNav = (url) => {
  if (url) {
    showIframe.value = true
    iframeSrc.value = url
    navActive.value = 1
  } else {
    navActive.value = 0
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
.download {
  color: #d5e5f8;
  a {
    color: #91adc6;
  }
}
</style>
