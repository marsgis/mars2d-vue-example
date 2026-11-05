<template>
  <div class="example-page">
    <h1 class="sr-only">Mars2D 开发中心 · 功能示例</h1>

    <div class="page-body">
      <!-- 侧栏分类 -->
      <aside id="category-panel" class="sidebar" :class="{ 'is-open': mobileFilterOpen }"
        :inert="isMobile && !mobileFilterOpen ? true : undefined" aria-label="示例分类">
        <nav class="sidebar-nav">
          <div v-for="item in examples_list" :key="item.id" class="sidebar-group">
            <button type="button" class="side1-item" :class="{ active: activeFirstId === item.id }"
              :aria-expanded="expandedFirstId === item.id" :aria-controls="'sidebar-' + item.id"
              @click="toggleFirst(item)">
              <mars-icon class="cat-icon" :icon="categoryIcon(item.icon)" width="15" color="currentColor"
                aria-hidden="true"></mars-icon>
              <span class="name">{{ item.name }}</span>
              <span class="count">{{ item.count }}</span>
              <mars-icon class="chevron" :icon="expandedFirstId === item.id ? 'down' : 'right'" width="16"></mars-icon>
            </button>
            <div v-show="expandedFirstId === item.id" :id="'sidebar-' + item.id" class="sidebar-children">
              <a v-for="item1 in item.children" :key="item1.id" class="side2-item"
                :class="{ active: activeSecondId === item1.id }" :href="'#' + item1.id"
                @click.prevent="clickSecond(item1)">
                <span class="dot" aria-hidden="true"></span>
                <span class="name">{{ item1.name }}</span>
                <span class="count">{{ item1.count }}</span>
              </a>
            </div>
          </div>
        </nav>

        <div class="sidebar-foot">
          <span class="total">共 <strong>{{ allCount }}</strong> 个示例</span>
          <span class="downloads">
            <button type="button" class="download-btn" title="下载功能清单.txt" aria-label="下载功能清单.txt" @click="downloadTxt">
              <mars-icon icon="file-txt" width="16"></mars-icon>
            </button>
            <button type="button" class="download-btn" title="下载功能清单.csv" aria-label="下载功能清单.csv" @click="downloadCsv">
              <mars-icon icon="file-excel" width="16"></mars-icon>
            </button>
          </span>
        </div>
      </aside>

      <!-- 窄屏抽屉遮罩 -->
      <div v-if="mobileFilterOpen" class="sidebar-mask" aria-hidden="true" @click="closeMobileFilter(true)"></div>

      <!-- 右栏：工具条固定在顶部，示例卡片区域滚动 -->
      <div class="content-col">
        <!-- 工具条：搜索 / 结果统计 / 说明 / 移动端分类入口 -->
        <div class="page-head" :class="{ 'is-stuck': wrapFixed }">
          <div class="page-head-inner">
            <div class="search-box">
              <input v-model="searchValue" type="text" placeholder="输入示例名称或 API 关键字" aria-label="按示例名称或 API 筛选"
                @input="searchDetail" @keyup.enter="searchDetail" />
              <button v-if="searchValue" type="button" class="search-clear" aria-label="清空筛选" @click="clearAll">
                <mars-icon icon="close" width="16"></mars-icon>
              </button>
              <button type="button" class="search-btn" aria-label="搜索" @click="searchDetail">
                <mars-icon icon="search" width="20" color="#4D5669"></mars-icon>
              </button>
            </div>

            <p v-if="!loading && !loadFailed && searchValue" class="result-hint" role="status">
              筛选到 <strong>{{ resultCount }}</strong> 个示例
            </p>

            <!-- <div class="npm-badges" aria-hidden="true">
              <a href="https://www.npmjs.com/package/mars2d" target="_blank" rel="noopener">
                <img src="https://img.shields.io/npm/v/mars2d.svg?style=flat&logo=npm&label=mars2d" alt=""
                  loading="lazy" />
              </a>
              <a href="https://www.npmjs.com/package/leaflet" target="_blank" rel="noopener">
                <img src="https://img.shields.io/npm/v/leaflet.svg?style=flat&logo=npm&label=leaflet" alt=""
                  loading="lazy" />
              </a>
            </div> -->

            <div class="head-actions">
              <!-- 打开方式开关：开启时点击卡片进 editor-vue（编辑），关闭时进 read-vue（预览） -->
              <label class="mode-switch" title="开启时点击示例卡片打开编辑器，关闭时打开预览页">
                <input v-model="editorMode" type="checkbox" class="mode-switch-input" aria-label="切换示例打开方式：编辑或预览" />
                <span class="mode-switch-track" aria-hidden="true"></span>
                <span class="mode-switch-label">编辑</span>
              </label>

              <button ref="filterBtn" type="button" class="mobile-filter-btn" :class="{ 'is-open': mobileFilterOpen }"
                :aria-expanded="mobileFilterOpen" aria-controls="category-panel" @click="toggleMobileFilter">
                <span class="label">分类</span>
                <strong>{{ activeFirstName }}</strong>
                <span class="chevron" aria-hidden="true"></span>
              </button>

              <!-- 轻量说明浮层：入口页未安装 ant-design-vue，这里用原生展开层避免为单个弹层引入整套组件 -->
              <div class="help-wrap">
                <button type="button" class="top-action-btn" :aria-expanded="guideOpen" aria-controls="guide-panel"
                  title="查看示例说明" @click="guideOpen = !guideOpen">
                  <mars-icon icon="help" width="17" color="#2468f2"></mars-icon>
                  <span>示例说明</span>
                </button>
                <div v-if="guideOpen" id="guide-panel" class="guide-panel" role="dialog" aria-label="示例说明">
                  <div class="action-panel-head">
                    <span class="action-panel-title">示例说明</span>
                    <span class="action-panel-kicker">GUIDE</span>
                  </div>
                  <ul class="action-panel-list">
                    <li>点击示例卡片会在新窗口打开示例，可查看并修改源码。</li>
                    <li>名称带 Demo 的示例仅用于演示功能，仅供参考。</li>
                    <li>部分示例打开后带有“已知功能提示”，请注意能力边界。</li>
                    <li>缩略图与在线服务依赖网络，加载受限时可能显示不全。</li>
                  </ul>
                  <div class="action-panel-foot">
                    <!-- <a class="action-foot-link" :href="docsUrl" target="_blank" rel="noopener">开发教程</a>
                    <span class="action-foot-divider"></span> -->
                    <a class="action-foot-link" href="https://gitee.com/marsgis/mars2d-vue-example" target="_blank"
                      rel="noopener">Gitee源码</a>
                    <span class="action-foot-divider"></span>
                    <a class="action-foot-link" href="http://mars2d.cn/contact.html"
                      target="_blank">反馈问题</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content">
          <div v-if="loading" class="list-skeleton" aria-hidden="true">
            <div v-for="n in 8" :key="n" class="sk-card"></div>
          </div>

          <div v-else-if="loadFailed" class="state-card" role="alert">
            <p>示例清单加载失败，请检查网络后重试。</p>
            <button type="button" class="state-btn" @click="retryLoad">重新加载</button>
          </div>

          <div v-else-if="!renderList.length" class="state-card">
            <p>没有找到与“{{ searchValue }}”匹配的示例。</p>
            <button type="button" class="state-btn" @click="clearAll">清空筛选</button>
          </div>

          <template v-else>
            <section v-for="item in renderList" :id="item.id" :key="item.id" class="category">
              <header class="category-title">
                <span class="title-box">
                  <mars-icon class="cat-icon" :icon="categoryIcon(item.icon)" width="16" color="currentColor"
                    aria-hidden="true"></mars-icon>
                  <span class="title">{{ item.name }}（{{ item.count }}）</span>
                </span>
                <span class="line" aria-hidden="true"></span>
              </header>

              <div v-for="item1 in item.children" :id="item1.id" :key="item1.id" class="sub-group">
                <h2 class="sub-title">
                  {{ item1.name }}（{{ item1.count }}）
                  <span v-if="item1.details" class="help-wrap" :class="{ 'is-open': detailOpenId === item1.id }">
                    <button type="button" class="help-btn" :aria-label="item1.name + ' 说明'"
                      :aria-describedby="'detail-' + item1.id" @click="onDetailClick(item1.id)">
                      <mars-icon icon="help" width="18" color="#2468f2"></mars-icon>
                    </button>
                    <span :id="'detail-' + item1.id" class="detail-tip" role="tooltip">{{ item1.details }}</span>
                  </span>
                </h2>

                <ul class="cards">
                  <li v-for="item2 in item1.children" :key="item2.id" class="card" role="button" tabindex="0"
                    :title="getTitle(item2)" :aria-label="item2.name" @click="jumpurl(item2)"
                    @keydown.enter.prevent="jumpurl(item2)" @keydown.space.prevent="jumpurl(item2)">
                    <span v-if="isnew(item2)" class="new-flag" title="这是最近新加的功能">新</span>
                    <div class="pic">
                      <img :src="item2.thumbnail" :alt="item2.name" loading="lazy" decoding="async"
                        @error="imgOnError" />
                    </div>
                    <p class="card-name">
                      {{ item2.name }}
                      <!-- <svg v-if="item2.hasPannel === true" class="vue" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 221" aria-hidden="true">
                        <path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z" />
                        <path fill="#41B883" d="M0 0l128 220.8L256 0h-51.2L128 132.48 50.56 0H0z" />
                        <path fill="#35495E" d="M50.56 0L128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56z" />
                      </svg> -->
                      <span v-if="item2.plugins" class="plugin"
                        :title="'该功能需要引入 mars2d-' + item2.plugins + '.js 插件才能使用。'">[{{ item2.plugins }}插件]</span>
                    </p>
                    <span class="hide-info" aria-hidden="true">{{ item2.main }} {{ item2.api }}</span>
                  </li>
                </ul>
              </div>
            </section>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarsIcon from "@mars/components/mars-ui/mars-icon/index.vue"
import { resolveCategoryIcon } from "./category-icon"

export default {
  components: {
    MarsIcon
  },
  data () {
    return {
      examples_list: [], // 全量配置
      list: [], // 当前展示的配置（搜索过滤后）
      searchValue: "",
      allCount: 0, // 示例总数
      loading: true, // 清单与编辑器模块加载中
      loadFailed: false, // 示例清单（config/example.json）加载失败
      wrapFixed: false, // 页面滚动后工具条阴影（工具条本身由 CSS sticky 吸顶）
      mobileFilterOpen: false, // 窄屏分类面板
      isMobile: false, // 窄屏断点（分类面板改为抽屉）
      guideOpen: false, // 工具条“示例说明”浮层
      detailOpenId: null, // 当前展开的子分类说明
      activeFirstId: null, // 侧栏当前高亮的一级分类
      expandedFirstId: null, // 侧栏当前展开的一级分类
      activeSecondId: null // 侧栏当前选中的二级分类
    }
  },
  computed: {
    docsUrl () {
      return "//mars2d.cn/docs/"
    },
    // 实际渲染的树：过滤掉无 main 的占位项和空分组，避免出现空标题与空网格
    renderList () {
      return (this.list || [])
        .map((item) => {
          const children = (item.children || [])
            .map((item1) => ({
              ...item1,
              children: (item1.children || []).filter((item2) => this.isVisible(item2))
            }))
            .filter((item1) => item1.children.length > 0)
          return { ...item, children }
        })
        .filter((item) => item.children.length > 0)
    },
    resultCount () {
      return this.renderList.reduce(
        (total, item) => total + item.children.reduce((sum, item1) => sum + item1.children.length, 0),
        0
      )
    },
    activeFirstName () {
      const matched = this.examples_list.find((item) => item.id === this.activeFirstId)
      return matched ? matched.name : "全部"
    }
  },
  created () {
    window.scrollTo(0, 0)
    this.initExampleList()
  },
  mounted () {
    window.addEventListener("scroll", this.isfixed, { passive: true })
    document.addEventListener("pointerdown", this.onDocumentPointerDown)
    window.addEventListener("keydown", this.onKeydown)
    // 断点与样式中的 1100px 保持一致：窄屏时分类改为抽屉，关闭状态不可聚焦
    if (window.matchMedia) {
      this.mobileQuery = window.matchMedia("(max-width: 1100px)")
      this.isMobile = this.mobileQuery.matches
      this.mobileQuery.addEventListener("change", this.onViewportChange)
    }
  },
  beforeUnmount () {
    // 组件卸载时移除监听，避免事件泄漏
    window.removeEventListener("scroll", this.isfixed)
    document.removeEventListener("pointerdown", this.onDocumentPointerDown)
    window.removeEventListener("keydown", this.onKeydown)
    this.mobileQuery?.removeEventListener("change", this.onViewportChange)
  },
  methods: {
    // 分类图标：配置里的 icon（兼容 fa-* 写法）→ mars-icon 图标名
    categoryIcon (icon) {
      return resolveCategoryIcon(icon)
    },
    // 动态引入 @marsgis/editor，首页首屏不再预加载编辑器与 monaco。
    // 编辑器实例仅用于初始化 Util 的静态配置（configSourceUrl 等），Util.getExampleList() 依赖该配置。
    async initExampleList () {
      this.loading = true
      this.loadFailed = false
      try {
        const { Editor: MarsgisEditor, Util } = await import("@marsgis/editor")
        const baseUrl = process.env.BASE_URL || "/"
        this.marsEditor = new MarsgisEditor({
          baseUrl,
          thumbnailPublicPath: baseUrl + "config/thumbnail/",
          configSourceUrl: baseUrl + "config/example.json"
        })
        const data = await Util.getExampleList()
        this.examples_list = data
        this.list = data
        this.allCount = Util.totalCount
        this.initActiveState(data)
      } catch {
        // 清单请求失败（网络/404）或编辑器模块加载失败时给出可见反馈，避免只显示空列表
        this.loadFailed = true
      } finally {
        this.loading = false
      }
    },
    retryLoad () {
      this.initExampleList()
    },
    // 默认展开首个分类并选中其第一个子分类，与线上示例页保持一致
    initActiveState (list) {
      const first = (list || [])[0]
      if (!first) {
        return
      }
      this.activeFirstId = first.id
      this.expandedFirstId = first.id
      const firstChild = (first.children || []).find((item) => item.children && item.children.length)
      this.activeSecondId = firstChild ? firstChild.id : null
    },
    isVisible (item) {
      return !!item.main && item.hidden !== true
    },
    clearBoth () {
      this.clearAll()
    },
    // 点击一级分类：展开并高亮，再次点击收起（移动端抽屉中再次点击当前分类也应关闭抽屉并定位）
    toggleFirst (item) {
      if (this.activeFirstId === item.id && this.expandedFirstId === item.id && !this.isMobile) {
        this.expandedFirstId = null
        return
      }
      this.activeFirstId = item.id
      this.expandedFirstId = item.id
      this.closeMobileFilter()
      this.scrollToSection(item.id)
    },
    // 点击二级分类：展开所属一级分类、标记选中、清空搜索并定位到对应分组
    clickSecond (item1) {
      const parent = this.renderList.find((item) => item.children.some((child) => child.id === item1.id))
      if (parent) {
        this.activeFirstId = parent.id
        this.expandedFirstId = parent.id
      }
      this.activeSecondId = item1.id
      this.closeMobileFilter()
      this.clearBoth()
      this.scrollToSection(item1.id)
    },
    toggleMobileFilter () {
      this.mobileFilterOpen = !this.mobileFilterOpen
      if (this.mobileFilterOpen) {
        // 打开抽屉时把焦点移入其中，方便键盘/读屏用户直接浏览分类
        this.$nextTick(() => {
          this.$el.querySelector(".sidebar .side1-item")?.focus()
        })
      }
    },
    closeMobileFilter (restoreFocus = false) {
      if (!this.mobileFilterOpen) {
        return
      }
      this.mobileFilterOpen = false
      // 抽屉关闭后把焦点交还触发按钮，避免焦点停留在 inert 区域
      if (restoreFocus) {
        this.$refs.filterBtn?.focus()
      }
    },
    onViewportChange (event) {
      this.isMobile = event.matches
      if (!event.matches) {
        this.mobileFilterOpen = false
      }
    },
    // 桌面端说明提示由 CSS :hover/:focus 控制；触屏没有 hover，改为点击切换
    onDetailClick (id) {
      if (window.matchMedia && window.matchMedia("(hover: none)").matches) {
        this.detailOpenId = this.detailOpenId === id ? null : id
      }
    },
    // 点击浮层以外区域或按 Esc 时收起浮层，避免遮挡内容
    onDocumentPointerDown (event) {
      const target = event.target
      if (target && target.closest && target.closest(".help-wrap")) {
        return
      }
      this.guideOpen = false
      this.detailOpenId = null
    },
    onKeydown (event) {
      if (event.key === "Escape") {
        this.guideOpen = false
        this.detailOpenId = null
        this.closeMobileFilter(true)
      }
    },
    scrollToSection (id) {
      this.$nextTick(() => {
        const target = document.getElementById(id)
        if (target && target.scrollIntoView) {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      })
    },
    isnew (item) {
      return item.new
    },
    isfixed () {
      const scrolltopTemp = document.documentElement.scrollTop || document.body.scrollTop
      this.wrapFixed = scrolltopTemp > 70
    },
    getTitle (item) {
      let title = item.name + "\n目录：" + item.main
      if (item.api) {
        const apiName = item.api.replaceAll(".html", "").replaceAll("global.", "")
        title += "\nAPI：mars2d." + apiName
      }
      return title
    },
    jumpurl (item) {
      this.$emit("jump", item, this.editorMode)
    },
    imgOnError (event) {
      const img = event.target || event.srcElement
      if (!img) {
        return
      }
      img.src = (process.env.BASE_URL || "/") + "config/thumbnail/map-options-basemaps.jpg"
      img.onerror = null
    },
    matchItem (item, keyword) {
      return [item.name, item.api, item.main].some((field) => (field || "").toLowerCase().includes(keyword))
    },
    searchDetail () {
      const keyword = (this.searchValue || "").trim().toLowerCase()
      if (!keyword) {
        this.list = this.examples_list
        return
      }
      const newList = JSON.parse(JSON.stringify(this.examples_list))
      this.list = newList.reduce((result, item) => {
        const children = (item.children || []).reduce((groups, item1) => {
          const cards = (item1.children || []).filter((item2) => this.matchItem(item2, keyword))
          if (cards.length) {
            groups.push({ ...item1, children: cards, count: cards.length })
          }
          return groups
        }, [])
        if (children.length) {
          result.push({ ...item, children, count: children.reduce((sum, group) => sum + group.children.length, 0) })
        }
        return result
      }, [])
    },
    clearAll () {
      this.searchValue = ""
      this.searchDetail()
    },
    downloadTxt () {
      this.downloadFile("Mars2D功能清单.txt", this.getAllName())
    },
    downloadCsv () {
      this.downloadFile("Mars2D功能清单.csv", this.getVerDiff())
    },
    downloadFile (fileName, string) {
      const isCsv = fileName.endsWith(".csv")
      const blob = new Blob([isCsv ? "\ufeff" + string : string], {
        type: isCsv ? "text/csv;charset=utf-8" : "text/plain;charset=utf-8"
      })
      const aLink = document.createElement("a")
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      aLink.style.display = "none"
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
      if (URL.revokeObjectURL) {
        URL.revokeObjectURL(aLink.href)
      }
    },
    getStandardName (item) {
      let name = item.name
      if (name.indexOf("Demo") !== -1) {
        return false
      }
      const idx = name.indexOf("(")
      if (idx !== -1) {
        name = name.substring(0, idx)
      }
      return name
    },
    getVerDiff () {
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
              return
            }
            cacheNames[name] = true
            arrNew += (++index) + "," + item.name + "," + item2.name + "," + name + "," + item3.main + "\n"
          })
        })
      })
      return arrNew
    },
    getAllName () {
      let arrNew = "Mars2D功能清单："
      const qianzhui = "功能 "
      let index1 = 0
      const cacheNames = {}
      this.examples_list.forEach((item) => {
        if (!item.children || item.download === false) {
          return
        }
        arrNew += "\n\n" + qianzhui + (++index1) + "  " + item.name
        let index2 = 0
        item.children.forEach((item2) => {
          if (!item2.children || item2.download === false) {
            return
          }
          arrNew += "\n" + qianzhui + index1 + "." + (++index2) + "  " + item2.name + "："
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
              return
            }
            cacheNames[name] = true
            ++index3
            arrNew += index3 === 1 ? name : "," + name
          })
        })
      })
      return arrNew
    }
  }
}
</script>

<style scoped lang="less">
.example-page {
  /* 吸顶工具条高度：侧栏与锚点定位据此让出空间 */
  --toolbar-height: 63px;
  min-height: calc(100vh - var(--mh-header-height, 76px));
  background: #fff;
  color: #14253d;
  font-family:
    "PingFang SC",
    "Microsoft YaHei",
    -apple-system,
    "Helvetica Neue",
    Arial,
    sans-serif;
}

/* 仅屏幕阅读器可见（不引入视觉变化） */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ---------- 工具条 ---------- */
.page-head {
  position: sticky;
  top: var(--mh-header-height, 76px);
  z-index: 30;
  padding: 11px 16px 11px 0;
  background:
    radial-gradient(680px 120px at 8% -30%, #d5f3e6 0%, transparent 62%),
    linear-gradient(100deg, #f0faf5 0%, #f6fbff 42%, #eff5ff 74%, #e9f2ff 100%);
  border-bottom: 1px solid #e2e6e9;
  transition: box-shadow 0.2s;
}

.page-head.is-stuck {
  box-shadow: 0 8px 24px #16335c16;
}

.page-head-inner {
  display: flex;
  padding-left: 16px;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  width: 400px;
  max-width: 100%;
  height: 40px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-box:focus-within {
  border-color: #8fb6ff;
  box-shadow: 0 0 0 3px #2468f21f;
}

.search-box input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 4px 0 14px;
  border: 0;
  background: transparent;
  font-size: 14px;
  color: #14253d;
}

.search-box input::placeholder {
  color: #9aa7b8;
}

.search-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: #8ba0b8;
  cursor: pointer;
}

.search-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 100%;
  padding: 0;
  border: 0;
  border-left: 1px solid #edf2f8;
  background: none;
  cursor: pointer;
}

.search-clear:focus-visible,
.search-btn:focus-visible,
.mobile-filter-btn:focus-visible,
.top-action-btn:focus-visible {
  outline: 2px solid #2468f266;
  outline-offset: 2px;
  border-radius: 4px;
}

.result-hint {
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
}

.result-hint strong {
  padding: 0 2px;
  font-size: 15px;
  font-weight: 600;
  color: #008aff;
}

/* npm 版本徽标：与 mars2d.cn 示例页同一套 shields.io 徽章 */
.npm-badges {
  display: flex;
  align-items: center;
  gap: 6px;
}

.npm-badges a {
  display: inline-flex;
  line-height: 0;
}

.npm-badges img {
  height: 20px;
  width: auto;
}

.head-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.mobile-filter-btn {
  display: none;
  align-items: center;
  gap: 7px;
  height: 34px;
  max-width: 220px;
  padding: 0 12px;
  border: 1px solid #d8e2ee;
  border-radius: 6px;
  background: #fff;
  color: #33475f;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.mobile-filter-btn .label {
  flex: none;
  white-space: nowrap;
  color: #8ba0b8;
}

.mobile-filter-btn strong {
  min-width: 0;
  overflow: hidden;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.mobile-filter-btn .chevron {
  width: 0;
  height: 0;
  margin-left: 2px;
  border-top: 5px solid currentColor;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  opacity: 0.55;
}

.mobile-filter-btn.is-open .chevron {
  transform: rotate(180deg);
}

.top-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid #d8e2ee;
  border-radius: 6px;
  background: #fff;
  color: #33475f;
  font-family: inherit;
  font-size: 13px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    color 0.2s;
}

.top-action-btn:hover {
  border-color: #9fc0ef;
  background: #f7faff;
  color: #2468f2;
}

/* 编辑/预览开关：原生 checkbox + 轨道滑块，视觉与工具条按钮一致 */
.mode-switch {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 12px;
  border: 1px solid #d8e2ee;
  border-radius: 6px;
  background: #fff;
  font-size: 13px;
  color: #33475f;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.mode-switch:hover {
  border-color: #9fc0ef;
  background: #f7faff;
}

.mode-switch-input {
  display: none;
}

.mode-switch-track {
  position: relative;
  flex: none;
  width: 30px;
  height: 16px;
  border-radius: 8px;
  background: #c3cfdd;
  transition: background 0.2s;
}

.mode-switch-track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px #0b1c3240;
  transition: transform 0.2s;
}

.mode-switch-input:checked + .mode-switch-track {
  background: #2468f2;
}

.mode-switch-input:checked + .mode-switch-track::after {
  transform: translateX(14px);
}

.mode-switch-input:focus-visible + .mode-switch-track {
  outline: 2px solid #9fc0ef;
  outline-offset: 1px;
}

.mode-switch-label {
  line-height: 1;
}

/* ---------- 主体两栏 ---------- */
/* 通栏两栏：分类树贴左、内容贴右，不再保留页面外边距 */
.page-body {
  padding: 0 0 72px;
  display: grid;
  grid-template-columns: 264px minmax(0, 1fr);
  gap: 0;
  align-items: start;
}

/* 右栏：工具条吸顶 + 卡片区域 */
.content-col {
  min-width: 0;
}

/* ---------- 侧栏 ---------- */
/* 左侧分类树直达顶栏下方，滚动页面时保持固定 */
.sidebar {
  position: sticky;
  top: var(--mh-header-height, 76px);
  height: calc(100vh - var(--mh-header-height, 76px));
  display: flex;
  flex-direction: column;
  border: 1px solid #e8eef6;
  border-top: 0;
  border-left: 0;
  border-radius: 0 0 8px 0;
  background: linear-gradient(180deg, #f8fdfb 0%, #f2f6fa 100%);
  overflow: hidden;
}

.sidebar-mask {
  display: none;
}

.sidebar-nav {
  flex: 1;
  min-height: 0;
  padding: 6px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.side1-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 6px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: #1d2b3f;
  font: inherit;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
}

.side1-item:hover {
  background: #e9f2ff;
  color: #2468f2;
}

.side1-item.active {
  color: #2468f2;
  background: #e6f0ff;
}

.side1-item .cat-icon {
  display: inline-flex;
  flex: none;
  justify-content: center;
  width: 18px;
  color: #7aa6ff;
}

.side1-item .name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.side1-item .count {
  font-size: 12px;
  color: #93a4ba;
}

.side1-item .chevron {
  flex: none;
  color: #9db1c9;
}

.sidebar-children {
  padding: 2px 0 6px;
}

.side2-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 6px 6px 24px;
  border-radius: 6px;
  font-size: 13px;
  color: #45576e;
  transition:
    background 0.15s,
    color 0.15s;
}

.side2-item:hover {
  background: #eef5ff;
  color: #2468f2;
}

.side2-item.active {
  color: #2468f2;
  font-weight: 500;
}

.side2-item .dot {
  width: 3px;
  height: 3px;
  flex: none;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}

.side2-item .name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.side2-item .count {
  font-size: 11px;
  color: #9db1c9;
}

.sidebar-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 5px 10px;
  border-top: 1px solid #e6edf6;
  background: #fff;
  font-size: 12px;
  color: #7a8ca3;
}

.sidebar-foot .total {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sidebar-foot .total strong {
  padding: 0 2px;
  font-size: 14px;
  color: #008aff;
}

.sidebar-foot .downloads {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 2px;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: none;
  color: #6b7f96;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
}

.download-btn:hover {
  background: #eaf2ff;
  color: #2468f2;
}

.download-btn:focus-visible,
.side1-item:focus-visible,
.side2-item:focus-visible {
  outline: 2px solid #008aff;
  outline-offset: 2px;
}

/* ---------- 示例内容 ---------- */
.content {
  min-width: 0;
  padding: 20px 16px 0 0;
}

.category {
  scroll-margin-top: calc(var(--mh-header-height, 76px) + var(--toolbar-height) + 8px);
}

.category+.category {
  margin-top: 26px;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 18px;
}

.title-box {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: none;
  min-width: 136px;
  max-width: 100%;
  height: 36px;
  padding: 0 12px;
  border-radius: 4px;
  background: #def0ff;
  color: #038bfe;
}

.title-box .cat-icon {
  display: inline-flex;
  flex: none;
  justify-content: center;
  width: 18px;
}

.title-box .title {
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.line {
  position: relative;
  flex: 1;
  height: 1px;
  background: #e1f0ff;
}

.line::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 106px;
  height: 1px;
  background: #008aff;
}

.sub-group {
  margin-left: 20px;
  scroll-margin-top: calc(var(--mh-header-height, 76px) + var(--toolbar-height) + 8px);
}

.sub-title {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 15px 0;
  font-size: 18px;
  font-weight: 400;
  color: #071228;
}

.help-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 6px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
}

.help-btn:hover,
.help-btn:focus-visible {
  background: #eaf2ff;
  outline: none;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px 24px;
}

.card {
  position: relative;
  padding: 8px;
  border-radius: 6px;
  background: #f2f6fa;
  cursor: pointer;
  overflow: hidden;
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}

.card:hover {
  box-shadow: 0 10px 24px #16335c24;
  transform: translateY(-2px);
}

.card:focus-visible {
  outline: 2px solid #2468f266;
  outline-offset: 2px;
}

.card .pic {
  width: 100%;
  aspect-ratio: 275 / 200;
  border-radius: 4px;
  background: #e8eef6;
  overflow: hidden;
}

.card .pic img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.card:hover .pic img {
  transform: scale(1.06);
}

.card-name {
  padding: 10px 2px 2px;
  font-size: 14px;
  line-height: 1.5;
  color: #071228;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-name .vue {
  width: 14px;
  height: 14px;
  vertical-align: -2px;
}

.card-name .plugin {
  font-size: 12px;
  color: rgba(0, 147, 255, 0.75);
}

.new-flag {
  position: absolute;
  z-index: 2;
  top: 12px;
  left: 12px;
  height: 20px;
  padding: 0 7px;
  border-radius: 10px;
  background: #f5222d;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
}

.hide-info {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 8px;
  opacity: 0.01;
  pointer-events: none;
}

/* 骨架屏 */
.list-skeleton {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px 24px;
}

.sk-card {
  height: 216px;
  border-radius: 6px;
  background: linear-gradient(90deg, #f2f3f5 25%, #e8eaed 37%, #f2f3f5 63%);
  background-size: 400% 100%;
  animation: sk-shimmer 1.4s ease infinite;
}

@keyframes sk-shimmer {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

/* 加载失败 / 无结果 */
.state-card {
  margin-top: 6px;
  padding: 48px 24px;
  border: 1px solid #e6edf6;
  border-radius: 8px;
  background: #f8fbff;
  font-size: 14px;
  color: #64748b;
  text-align: center;
}

.state-btn {
  height: 36px;
  margin-top: 16px;
  padding: 0 18px;
  border: 1px solid #2468f2;
  border-radius: 5px;
  background: #2468f2;
  color: #fff;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}

.state-btn:hover {
  background: #1456da;
}

/* ---------- 响应式 ---------- */
/* 桌面端改为应用式布局：整页不滚动，左栏固定，仅右侧列表面板内部滚动（同时消除页面级横向滚动条） */
@media (min-width: 1101px) {
  .example-page {
    height: calc(100vh - var(--mh-header-height, 76px));
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* 工具条成为页面内的固定行，不再依赖吸顶 */
  .page-head {
    position: static;
  }

  .page-body {
    flex: 1;
    min-height: 0;
    align-items: stretch;
    overflow: hidden;
    /* 旧滚动模式的底部留白改由滚动容器内的 .content 提供，避免固定高度下出现空白条 */
    padding-bottom: 0;
  }

  /* 左栏占满容器高度，内部导航自行滚动 */
  .sidebar {
    position: static;
    height: auto;
  }

  /* 右栏为唯一滚动容器 */
  .content-col {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
  }

  /* 滚动到底时卡片与底边留出间距（替代原 .page-body 的 padding-bottom） */
  .content {
    padding: 20px 16px 24px 0;
  }

  /* 锚点定位改为相对滚动容器，无需再让出吸顶工具条高度 */
  .category,
  .sub-group {
    scroll-margin-top: 8px;
  }
}

@media (max-width: 1100px) {
  .page-body {
    grid-template-columns: minmax(0, 1fr);
  }

  /* 断点以下分类收成抽屉，内容成为唯一一栏，需要补回左右内边距 */
  .page-head {
    padding: 11px 16px;
  }

  .content {
    padding: 20px 16px 0;
  }

  .mobile-filter-btn {
    display: inline-flex;
  }

  /* 窄屏分类改为左侧抽屉，不挤占卡片区域；关闭状态通过 inert 不可聚焦 */
  .sidebar {
    position: fixed;
    top: var(--mh-header-height, 76px);
    bottom: 0;
    left: 0;
    z-index: 90;
    width: min(86vw, 320px);
    height: auto;
    border-top: 0;
    border-radius: 0 8px 8px 0;
    box-shadow: 12px 0 32px #0b1c3226;
    transform: translateX(-105%);
    transition: transform 0.25s ease;
  }

  .sidebar.is-open {
    transform: none;
  }

  .sidebar-mask {
    display: block;
    position: fixed;
    inset: var(--mh-header-height, 76px) 0 0;
    z-index: 80;
    background: #0b1c3259;
  }

  .sidebar-nav {
    max-height: none;
  }
}

@media (max-width: 820px) {
  .example-page {
    /* 窄屏工具条换成搜索框 + 操作按钮两行 */
    --toolbar-height: 110px;
  }

  .page-head-inner {
    gap: 10px;
  }

  .search-box {
    width: 100%;
    order: 1;
  }

  .result-hint {
    order: 2;
  }

  .head-actions {
    order: 2;
  }

  .npm-badges {
    display: none;
  }

  .sub-group {
    margin-left: 0;
  }

  .cards {
    gap: 16px;
  }
}

@media (max-width: 560px) {
  .page-body {
    padding-bottom: 48px;
  }

  .cards,
  .list-skeleton {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 14px;
  }

  .card-name {
    font-size: 13px;
  }

  .sub-title {
    font-size: 16px;
  }

  .category-title {
    gap: 10px;
  }

  .title-box .title {
    font-size: 15px;
  }

  .head-actions {
    width: 100%;
    margin-left: 0;
  }

  .mobile-filter-btn {
    max-width: 48%;
  }
}

/* ---------- 浮层（不依赖 ant-design-vue，入口页无需安装整套组件） ---------- */
.help-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.guide-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 60;
  width: 340px;
  max-width: calc(100vw - 32px);
  padding: 16px 18px;
  border: 1px solid #e6edf6;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 16px 40px #14253d1f;
  color: #14253d;
}

.action-panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.action-panel-title {
  font-size: 15px;
  font-weight: 600;
  color: #132842;
}

.action-panel-kicker {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.4px;
  color: #8ba0b8;
}

.action-panel-list {
  display: grid;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.action-panel-list li {
  position: relative;
  padding-left: 13px;
  font-size: 12px;
  line-height: 1.75;
  color: #5f7288;
}

.action-panel-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #7fb0ef;
}

.action-panel-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #edf2f8;
  font-size: 12px;
}

.action-foot-link {
  color: #2468f2;
}

.action-foot-link:hover {
  color: #1456da;
}

.action-foot-divider {
  width: 1px;
  height: 11px;
  background: #dfe8f3;
}

.detail-tip {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  width: max-content;
  max-width: min(420px, calc(100vw - 48px));
  padding: 10px 12px;
  border-radius: 6px;
  background: #132842;
  color: #e8f0fc;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.7;
  text-align: left;
  box-shadow: 0 10px 24px #0b1c3255;
  /* 隐藏时不参与布局：绝对定位的 max-content 宽 tooltip 会撑宽移动端视口 */
  display: none;
  pointer-events: none;
}

/* 鼠标移入（或键盘聚焦）时显示说明；触屏由 .is-open 兜底 */
.help-wrap:hover .detail-tip,
.help-wrap:focus-within .detail-tip,
.help-wrap.is-open .detail-tip {
  display: block;
}
</style>
