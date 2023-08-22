<template>
  <div class="page-wrap">
    <!--导航-->

    <div class="page-box">
      <!--   侧边栏  -->
      <div class="sidebar">
        <div class="sidebar-1" v-for="item in examples_list" :key="item.id">
          <div class="side1-item">
            <i class="fa" :class="item.icon"></i>
            <p class="name">{{ item.name }} ({{ item.count }})</p>
            <mars-icon icon="right" width="24"></mars-icon>
          </div>
          <div class="sidebar-2">
            <div class="side2-item" @click="clearBoth" v-for="item1 in item.children" :key="item1.id">
              <span>·</span>
              <a class="a" :href="'#' + item1.id">{{ item1.name }} ({{ item1.count }})</a>
            </div>
          </div>
        </div>

        <div class="download">
          <div>【共 {{ allCount }} 个示例】</div>
          <div>
            <a href="javascript:downloadExampleTxt();">下载功能清单.txt</a>
          </div>
          <div>
            <a href="javascript:downloadExampleCsv()">下载功能清单.csv</a>
          </div>
        </div>
      </div>
      <!--主体-->
      <div class="contain">
        <div class="search-wrap" :class="{ wrapIsfixed: wrapFixed }">
          <div class="search-l">
            <input type="text" placeholder="请输入示例名称筛选..." v-model="searchValue" @input="searchDetail" @keyup.enter="searchDetail" />
            <div class="ss-pic" @click="searchDetail">
              <mars-icon icon="search" width="24" color="#ffffff"></mars-icon>
            </div>
            <div class="clear-value" v-if="searchValue" @click="clearAll">
              <mars-icon icon="close" width="18"></mars-icon>
            </div>
          </div>

          <div class="search-r">
            <mars-icon class="icon" icon="help" size="20" fill="#bbbbbb"></mars-icon>
            <p class="look">查看说明</p>
            <div class="sanjiao"></div>
            <div class="sanjiao-1"></div>
            <div class="explain">
              <div class="explain-wrap">
                <div class="sm-pic">
                  <mars-icon icon="agreement" size="24" fill="#008aff"></mars-icon>
                </div>
                <div class="sm">说明</div>
                <div class="line1">
                  <span></span>
                </div>
              </div>
              <p>1. 您可以访问<a :href="`https://gitee.com/marsgis/mars2d-vue-example`" target="_black">GitHub</a>下载当前示例代码到本地运行</p>
              <p>2. 名称内有 demo 的属于存在已知问题的示例，此处仅做演示</p>
              <p>
                3. 如果您访问体验当中发现bug问题或有好的建议，欢迎随时反馈给
                <a href="http://marsgis.cn/weixin.html" target="_blank">我们</a>.
              </p>
              <p>
                4. 如果缺少您想要的示例，可以整理需求发送邮件至
                <a href="mailto:wh@marsgis.cn" rel="nofollow">wh@marsgis.cn</a>
              </p>
              <p>
                <a target="_black" href="https://www.npmjs.com/package/mars2d">
                  <img alt="Npm version" src="https://img.shields.io/npm/v/mars2d?style=flat&logo=npm&label=版本号" />
                </a>

                <a target="_black" href="https://www.npmjs.com/package/mars2d">
                  <img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars2d?style=flat&logo=npm&label=下载量" />
                </a>
                <a target="_black" href="https://github.com/marsgis/mars2d">
                  <img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars2d?style=flat&logo=github" />
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="big" v-for="item in list" :key="item.id">
          <div class="start" v-if="item.children.length !== 0">
            <!-- <div class="fa" :class="item.icon"></div> -->
            <p>{{ item.name }} ({{ item.count }})</p>
            <div class="line">
              <span></span>
            </div>
          </div>
          <!--创建三维场景-->
          <div :id="item1.id" class="three" v-for="item1 in item.children" :key="item1.id">
            <h3 v-if="item1.children.length !== 0">
              {{ item1.name }} ({{ item1.count }})
              <div class="question" v-if="item1.details">
                <mars-icon class="icon" icon="help" size="20" fill="#bbbbbb"></mars-icon>
                <div class="sanjiao1"></div>
                <div class="sanjiao2"></div>
                <div class="tan1">
                  <p>
                    <span class="color">说明：</span>
                    {{ item1.details }}
                  </p>
                </div>
              </div>
            </h3>
            <ul>
              <template v-for="item2 in item1.children" :key="item2.id">
                <li
                  v-if="item2.main && item2.hidden != true"
                  :title="item2.name + '  ' + item2.main"
                  @click="jumpurl(item2)"
                  style="overflow: hidden"
                >
                  <span title="这是最近新加的功能" :class="{ nweVer: isNew }" v-if="isnew(item2)">新</span>
                  <div class="pic">
                    <img :src="item2.thumbnail" :onerror="imgOnError" />
                  </div>
                  <p>
                    {{ item2.name }}

                    <svg
                      class="vue"
                      v-if="item2.hasPannel === true"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin meet"
                      viewBox="0 0 256 221"
                    >
                      <path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" />
                      <path fill="#41B883" d="M0 0l128 220.8L256 0h-51.2L128 132.48 50.56 0H0z" />
                      <path fill="#35495E" d="M50.56 0L128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56z" />
                    </svg>

                    <span
                      v-show="item2.plugins"
                      style="color: rgba(0, 147, 255, 0.7)"
                      :title="`'该功能需要引入 mars2d-${item2.plugins}.js 插件才能使用。'`"
                      >[{{ item2.plugins }}插件]</span
                    >
                  </p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor as MarsgisEditor, Util } from "@marsgis/editor"
import MarsIcon from "@mars/components/mars-ui/mars-icon/index.vue"
import { nextTick } from "vue"

export default {
  components: {
    MarsIcon
  },
  data() {
    return {
      examples_list: [],
      list: [], // 当前列表（含查询筛选后的）
      indexActive: "",
      navActive: 1, // head的激活顺序
      searchValue: "",
      isNew: true, // 提示点的样式
      wrapFixed: false
    }
  },
  created() {
    const marsEditor = new MarsgisEditor({
      baseUrl: process.env.BASE_URL,
      thumbnailPublicPath: "/config/thumbnail/",
      configSourceUrl: `${process.env.BASE_URL}config/example.json`
    })

    window.scrollTo(0, 0)
  },
  mounted() {
    Util.getExampleList().then((data) => {
      this.examples_list = data
      this.list = data
      this.allCount = Util.totalCount
      nextTick(() => {
        this.show()
      })
    })
    window.downloadExampleTxt = () => {
      this.downloadFile("Mars2D功能清单.txt", this.getAllName())
    }
    window.downloadExampleCsv = () => {
      this.downloadFile("Mars2D功能清单.csv", this.getVerDiff())
    }
    window.addEventListener("scroll", this.isfixed)
  },
  methods: {
    clearBoth() {
      this.clearAll()
    },
    show() {
      const side2 = document.querySelectorAll(".sidebar-2")
      const side1Item = document.querySelectorAll(".side1-item")
      const p = document.querySelectorAll(".sidebar-1 p")
      const side2Item = document.querySelectorAll(".side2-item")
      const a = document.querySelectorAll(".a")

      for (let i = 0; i < side1Item.length; i++) {
        side1Item[i].onclick = function () {
          for (let j = 0; j < side1Item.length; j++) {
            if (i === j) {
              /* side2[j].style.display='block' */
              side1Item[j].classList.add("active1")
              side1Item[j].classList.add("active3")
              p[j].classList.add("active3")
              const x = side2[i].style.display
              if (x !== "block") {
                side2[j].style.display = "block"
              } else {
                side2[j].style.display = "none"
              }
            } else {
              side2[j].style.display = "none"
              side1Item[j].classList.remove("active1")
              side1Item[j].classList.remove("active3")
              p[j].classList.remove("active3")
            }
          }
        }
      }
      for (let i = 0; i < side2Item.length; i++) {
        side2Item[i].onclick = function () {
          for (let j = 0; j < side2Item.length; j++) {
            if (i === j) {
              side2Item[j].classList.add("active2")
              a[j].style.color = "#f08519"
              a[j].style.opacity = 1.0
            } else {
              side2Item[j].classList.remove("active2")
              a[j].style.color = "#FFFFFF"
              a[j].style.opacity = 0.6
            }
          }
        }
      }
    },
    isnew(item) {
      return item.new
    },
    isfixed() {
      const scrolltopTemp = document.documentElement.scrollTop || document.body.scrollTop
      if (scrolltopTemp > 70) {
        return (this.wrapFixed = true)
      } else {
        return (this.wrapFixed = false)
      }
    },
    jumpurl(item) {
      this.$emit("jump", item)
    },
    imgOnError(e) {
      const img = e.srcElement
      img.src = "/config/thumbnail/map-options-basemaps.jpg"
      img.onerror = null
    },
    searchDetail() {
      if (!this.searchValue) {
        this.list = this.examples_list
        return
      }
      const searchValue = this.searchValue.toLowerCase()
      const newList = JSON.parse(JSON.stringify(this.examples_list))
      newList.forEach((item) => {
        if (item.children) {
          const childrenList = []
          item.children.forEach((ite) => {
            if (ite.children) {
              const lis = []
              ite.children.forEach((itemes) => {
                if (itemes.name.toLowerCase().search(searchValue) !== -1) {
                  lis.push(itemes)
                }
              })
              ite.children = lis
            }
            if (ite.children.length !== 0) {
              childrenList.push(ite)
            }
          })
          item.children = childrenList
        }
      })
      this.list = newList
    },
    clearAll() {
      this.searchValue = ""
      this.searchDetail()
    },
    downloadFile(fileName, string) {
      const blob = new Blob([string])
      const aLink = document.createElement("a")
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    },
    getStandardName(item) {
      let name = item.name
      if (name.indexOf("Demo") !== -1) {
        return false
      }

      const idx = name.indexOf("(")
      if (idx !== -1) {
        name = name.substr(0, idx)
      }

      return name
    },

    getVerDiff() {
      let arrNew = "序号,分类,子分类,功能名称,示例ID\n"
      let index = 0
      const cacheNames = {}
      this.examples_list.forEach((item) => {
        if (!item.children || item.download === false) {
          return
        }
        item.children.forEach((item2) => {
          if (!item2.children || item2.download === false) {
            return
          }
          item2.children.forEach((item3) => {
            if (item3.download === false || item3.hidden) {
              return
            }
            const name = this.getStandardName(item3)
            if (!name) {
              return
            }
            if (cacheNames[name]) {
              // console.log("已存在", name)
              return
            }
            cacheNames[name] = true

            arrNew += `${++index},${item.name},${item2.name},${name},${item3.main}\n`
          })
        })
      })

      return arrNew
    },

    getAllName() {
      let arrNew = "Mars2D功能清单："
      const qianzhui = "功能 "

      let index1 = 0
      const cacheNames = {}
      this.examples_list.forEach((item) => {
        if (!item.children || item.download === false) {
          return
        }
        arrNew += `\n\n${qianzhui}${++index1}  ${item.name}`

        let index2 = 0
        item.children.forEach((item2) => {
          if (!item2.children || item2.download === false) {
            return
          }
          arrNew += `\n${qianzhui}${index1}.${++index2}  ${item2.name}：`

          let index3 = 0
          item2.children.forEach((item3) => {
            if (item3.download === false || item3.hidden) {
              return
            }
            const name = this.getStandardName(item3)
            if (!name) {
              return
            }
            if (cacheNames[name]) {
              // console.log("已存在", name)
              return
            }
            cacheNames[name] = true

            ++index3
            if (index3 === 1) {
              arrNew += `${name}`
            } else {
              arrNew += `,${name}`
            }
          })
          // arrNew += "\n"
        })
      })
      return arrNew
    }
  }
}
</script>

<style scoped>
.page-wrap {
  padding-top: 0px;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
}
.page-box {
  height: calc(100vh - 0px);
}

/*侧边栏*/
.sidebar {
  width: 240px;
  z-index: 10;
  position: fixed;
  top: 68px;
  left: 0px;
  overflow-y: auto;
  padding-top: 10px;
  box-sizing: border-box;
  /* border: 1px solid red;*/
  background-color: #2a2d3e;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

img {
  object-fit: cover;
}
.active1 {
  background: linear-gradient(90deg, #008aff 0%, #51a6ee 100%);
}
.active3 {
  color: #fff;
  opacity: 1;
}
.side1-item {
  margin-left: 10px;
  margin-bottom: 10px;
  width: 230px;
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
}
.side1-item .fa {
  text-align: center;
  width: 30px;
  font-size: 20px;
}
.side1-item .name {
  width: 165px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 20px;
  color: #fff;
  opacity: 0.6;
  margin-left: 10px;
}
.side1-item .iconfont {
  color: #ffffff;
  opacity: 0.6;
  font-size: 12px;
}
.sidebar-2 {
  margin-left: 0px;
  display: none;
  left: 0px;
  top: 46px;
  padding-bottom: 10px;
}
.side2-item {
  cursor: pointer;
  margin-left: 40px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #ffffff;
  opacity: 0.6;
  margin-bottom: 19px;
}
.side2-item span {
  padding-right: 10px;
}
.side2-item a {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #ffffff;
  opacity: 0.6;
}
.active2 {
  color: #f08519;
}
.active3 {
  opacity: 1 !important;
}
/*主体*/
.contain {
  box-sizing: border-box;
}
.search-wrap {
  margin-top: 5px;
  margin-left: 38px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
}
.wrapIsfixed {
  width: calc(100% - 270px);
  position: fixed;
  top: 0px;
  min-width: 50px;
}
.search-l {
  align-items: center;
  position: relative;
  width: 298px;
  height: 40px;
  display: flex;
  border: 1px solid #008aff;
  background-color: #ffffffb5;
  border-radius: 10px;
}
.search-l input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}
.clear-value {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.clear-value img {
  width: 100%;
  height: 100%;
}
input {
  width: 170px;
  height: 19px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  margin-left: 15px;
}
input::-webkit-input-placeholder {
  color: #cccccc;
}
input:-moz-placeholder {
  color: #008aff;
}
input::-moz-placeholder {
  color: #008aff;
}
input:-ms-input-placeholder {
  color: #008aff;
}
.ss-pic {
  width: 62px;
  height: 40px;
  padding-top: 8px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #008aff 0%, #4ca4ef 100%);
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 0px 10px 10px 0px;
  text-align: center;
  cursor: pointer;
}
.ss-pic img {
  height: 18px;
  margin-top: 11px;
}
.search-r {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #666666;
  position: relative;
}
.search-r .look {
  font-size: 16px;
  line-height: 20px;
  color: #666666;
  width: 80px;
  margin-right: 20px;
  vertical-align: middle;
}
.search-r:hover .sanjiao {
  display: block;
}
.search-r:hover .sanjiao-1 {
  display: block;
}
.search-r:hover .explain {
  display: block;
}

.search-r .icon {
  margin-right: 5px;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1;
}

/*弹框*/
.sanjiao {
  position: absolute;
  top: 40px;
  left: 48px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px rgba(120, 120, 120, 0.22);
  transform: rotate(45deg);
  z-index: 2;
  display: none;
}

.sanjiao-1 {
  position: absolute;
  top: 50px;
  left: 48px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  transform: rotate(45deg);
  z-index: 10;
  display: none;
}
.explain {
  position: absolute;
  top: 54px;
  left: -470px;
  width: 582px;
  box-shadow: 0px 3px 12px rgba(120, 120, 120, 0.22);
  z-index: 999;
  background-color: #fff;
  display: none;
}

.explain-wrap {
  display: flex;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 20px;
}

.sm-pic {
  margin-left: 17px;
  padding: 8px 10px;
  background: rgba(38, 151, 255, 0.2);
  border-radius: 10px;
}

.sm-pic img {
  height: 18px;
  margin-left: 15px;
  margin-top: 12px;
}

.sm {
  font-size: 19px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  margin-left: 14px;
  color: #000000;
}

.line1 {
  width: 426px;
  height: 1px;
  background-color: #e1f0ff;
  position: relative;
  margin-left: 13px;
}

.line1 span {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 106px;
  height: 1px;
  background-color: #008aff;
}

.explain p {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 15px;
  color: #666666;
  opacity: 0.6;
  margin-bottom: 20px;
  margin-left: 27px;
}
.explain p a {
  color: rgb(34 128 254);
}

.explain p span {
  padding-left: 5px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #008aff;
  opacity: 1;
}

.nweVer {
  width: 33px;
  height: 26px;
  position: relative;
  bottom: -2%;
  left: 45%;
  background: red;
  display: inline-block;
  border-radius: 50%;
  margin: -7px;
  color: white;
  text-align: center;
  line-height: 26px;
}

/*快速开始*/
.start {
  margin-left: 15px;
  margin-top: 15px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #666666;
  display: flex;
  align-items: center;
}

.start p {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #018afe;
  height: 30px;
}

.start .fa {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  text-align: center;
  color: #018afe;
  margin-right: 10px;
  border-radius: 10px;
  background-color: rgba(76, 164, 239, 0.1);
}

.start .line {
  flex: 1;
  height: 1px;
  background-color: #dfdfdf;
  margin-left: 32px;
  position: relative;
}

.start span {
  width: 105px;
  height: 1px;
  background-color: #4e97d9;
  position: absolute;
  top: 0px;
  left: 0px;
}

.big .three {
  border-bottom: 1px solid #dfdfdf;
  padding-top: 22px;
  padding-bottom: 16px;
  margin-left: 37px;
  margin-bottom: 8px;
}

.big .three:nth-last-child(1) {
  border-bottom: none;
}

.three h3 {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: #000000;
  display: flex;
  align-items: center;
}

.three ul {
  margin-top: 15px;
  flex-wrap: wrap;
  display: flex;
}

.three li {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(112, 112, 112, 0.53);
  background-color: #ffffff;
  opacity: 1;
  border-radius: 10px;
  margin-bottom: 28px;
  padding-top: 10px;
  cursor: pointer;
}

/*.three  li:nth-child(5n+5){*/
/*    margin-right: unset;*/
/*}*/
.three li:hover {
  box-shadow: 0px 6px 12px rgba(0, 138, 255, 0.56);
  background-color: #018afe;
  transition-duration: 1s;
}

.three li:hover p {
  color: #ffffff;
  transition-duration: 1s;
}

.three li .pic {
  width: 90%;
  height: 80%;
  margin: 3px 0px 10px 0px;
}

.three li .pic img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.three li .vue {
  width: 14px;
  vertical-align: middle;
}

.three ul p {
  width: 90%;
  padding: 0px 5%;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #000000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.three {
  /*width: 1521px;*/
  margin-left: 37px;
  padding-top: 22px;
}

.three .three ul {
  border: none;
}

.question {
  width: 27px;
  height: 27px;
  position: relative;
}

.question .icon {
  line-height: 1;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}

.three .tan1 {
  min-width: 500px;
  top: -10px;
  left: 70px;
  position: absolute;
  background: #ffffff;
  border-radius: 6px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  display: none;
  z-index: 4;
  box-shadow: 0px 3px 12px rgba(120, 120, 120, 0.22);
}

.three .tan1 p {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #aaaaaa;
  padding: 15px 5px;
}

.tan1 span {
  color: #000000;
}

.three .sanjiao1 {
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  box-shadow: 0px 3px 10px 12px rgba(120, 120, 120, 0.22);
  transform: rotate(45deg);
  margin-left: 20px;
  display: none;
  position: absolute;
  top: 4px;
  left: 40px;
  z-index: 2;
}

.three .sanjiao2 {
  width: 20px;
  height: 20px;
  background-color: #fff;
  transform: rotate(45deg);
  margin-left: 20px;
  display: none;
  position: absolute;
  top: 4px;
  left: 40px;
  z-index: 5;
}

.three .question:hover .tan1 {
  display: block;
}

.three .question:hover .sanjiao1 {
  display: block;
}

.three .question:hover .sanjiao2 {
  display: block;
}

.no-message {
  width: 328px;
  height: 236px;
}

.no-message img {
  width: 100%;
  height: 100%;
}

.no-title {
  font-size: 26px;
  color: #8d8d8d;
}

.all-no {
  width: 500px;
  height: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 200px;
}

.select {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -118px;
  background-color: #2a2d3e;
  width: 150px;
  height: 100px;
  z-index: 999;
}

.nav-item:hover {
  color: #f08519;
}

.nav-item:hover .select {
  color: #fff;
}

.item-select {
  line-height: 50px;
  padding-left: 20px;
  box-sizing: border-box;
}

.item-select:hover {
  color: #f08519;
}

.download {
  text-align: center;
  margin: 40px 0 20px 0;
}
.download div {
  margin-top: 5px;
}

@media screen and (min-width: 770px) {
  /*侧边导航*/
  .pc_hide {
    display: none !important;
  }
  .sidebar {
    height: 100vh;
  }

  /*右侧内容*/
  .contain {
    padding: 10px 0px 0px 250px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .nav-item {
    font-size: 20px;
    line-height: 26px;
    color: #ffffff;
    margin-right: 60px;
    cursor: pointer;
    position: relative;
  }
}

@media screen and (min-width: 1400px) {
  .three li {
    width: 18%;
    margin-right: 1.5%;
    max-width: 280px;
  }
}
@media screen and (max-width: 1150px) {
  .nav-item {
    font-size: 20px;
    line-height: 26px;
    color: #ffffff;
    margin-right: 40px;
    cursor: pointer;
    position: relative;
  }
}
@media screen and (max-width: 1400px) and (min-width: 1200px) {
  .three li {
    width: 23%;
    margin-right: 1.5%;
  }
}
@media screen and (max-width: 1200px) and (min-width: 990px) {
  .three li {
    width: 31%;
    margin-right: 1.5%;
  }
}
@media screen and (max-width: 990px) and (min-width: 770px) {
  .three li {
    width: 48%;
    margin-right: 1.5%;
  }
}
@media screen and (max-width: 770px) {
  .mobile_hide {
    display: none !important;
  }
  .nav-item {
    font-size: 20px;
    line-height: 26px;
    color: #ffffff;
    flex: 1;
    cursor: pointer;
    position: relative;
  }
  /*侧边导航*/
  .sidebar {
    display: none !important;
  }
  .three li {
    width: 95%;
  }

  .search-wrap {
    margin-top: 100px;
  }
  .search-l {
    height: 35px;
  }
  .ss-pic {
    width: 40px;
    height: 35px;
  }
  .ss-pic img {
    width: 24px;
    margin-top: 8px;
    margin-left: 8px;
  }
  .explain {
    width: 300px;
    left: -190px;
    height: 320px;
  }
  .search-r img {
    padding: 0px 7px;
  }
  .line1 {
    width: 150px;
  }
}
@media screen and (max-width: 1280px) {
  .explain {
    width: 464px;
    left: -343px;
  }
  .explain .sm {
    width: 55px;
    font-size: 15px;
  }
  .explain-wrap {
    margin: 10px 0px;
  }
  .explain p {
    font-size: 13px;
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .sm-pic {
    width: 40px;
    height: 40px;
    font-size: 0px;
  }
  .sm-pic img {
    margin-left: 12px;
    margin-top: 10px;
  }
}
</style>
