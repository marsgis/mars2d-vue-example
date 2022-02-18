<template>
  <mars-editor-list @jump="jumpUrl"></mars-editor-list>
</template>

<script lang="ts" setup>
const jumpUrl = (item: any) => {
  let url = process.env.BASE_URL
  if (process.env.EDITOR_MODE) {
    url += "editor.html"
  } else {
    url += "read.html"
  }

  // 处理参数
  url += "?id=" + encodeURI(item.main)
  if (item.params) {
    url += `&${item.params}&name=${item.fullName}`
  }
  window.open(url, "_blank")
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
