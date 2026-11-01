<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <a class="skip-link" href="#main">跳到主要内容</a>

    <div class="site-nav">
      <a class="site-brand" :href="homeUrl" aria-label="Mars2D 开发者中心首页" @click.prevent="onBrandClick">
        <img src="/img/head/logo.png" alt="" width="34" height="34" />
        <strong>Mars2D</strong>
        <span>开发者中心</span>
      </a>

      <nav ref="desktopNav" class="desktop-nav" aria-label="主导航">
        <div v-for="(item, index) in navList" :key="item.name" class="nav-item" :class="{ active: activeIndex === index }">
          <button type="button" :aria-current="activeIndex === index ? 'page' : undefined" @click="selectNav(index, item)">
            {{ item.name }}
          </button>
        </div>
      </nav>

      <button
        class="nav-toggle"
        :class="{ 'is-open': mobileOpen }"
        type="button"
        aria-controls="mobile-menu"
        :aria-expanded="mobileOpen"
        :aria-label="mobileOpen ? '关闭导航' : '展开导航'"
        @click="toggleMobile"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <nav v-if="mobileOpen" id="mobile-menu" ref="mobileNav" class="mobile-menu" aria-label="移动导航">
      <button
        v-for="(item, index) in navList"
        :key="item.name"
        type="button"
        class="mobile-nav-item"
        :class="{ active: activeIndex === index }"
        :aria-current="activeIndex === index ? 'page' : undefined"
        @click="selectNav(index, item)"
      >
        {{ item.name }}
      </button>
    </nav>
  </header>
</template>

<script>
// 顶栏高度是页面内其它吸顶元素（示例列表工具条、侧栏、文档 iframe）的基准，统一由全局 CSS 变量提供
export default {
  props: {
    // 1 起的栏目序号，传入时由父级控制高亮；不传时使用组件内部点击状态
    activeNav: {
      type: Number,
      default: 0
    }
  },
  emits: ["clickNav"],
  data () {
    // 文档与 API 域名，与站点其它页面保持一致
    const host = "//mars2d.cn"
    return {
      scrolled: false,
      mobileOpen: false,
      internalActive: 0,
      navList: [
        {
          name: "功能示例",
          url: "/"
        },
        {
          name: "开发教程",
          page: `${host}/docs/`
        },
        {
          name: "API 文档",
          page: `${host}/api/Map.html`
        }
      ]
    }
  },
  computed: {
    homeUrl () {
      return process.env.BASE_URL || "/"
    },
    activeIndex () {
      return this.activeNav >= 1 ? this.activeNav - 1 : this.internalActive
    }
  },
  mounted () {
    window.addEventListener("scroll", this.onScroll, { passive: true })
    document.addEventListener("pointerdown", this.onDocumentPointerDown)
    window.addEventListener("keydown", this.onKeydown)
    window.addEventListener("resize", this.onResize)
    this.onScroll()
  },
  beforeUnmount () {
    window.removeEventListener("scroll", this.onScroll)
    document.removeEventListener("pointerdown", this.onDocumentPointerDown)
    window.removeEventListener("keydown", this.onKeydown)
    window.removeEventListener("resize", this.onResize)
  },
  methods: {
    onScroll () {
      this.scrolled = window.scrollY > 8
    },
    selectNav (index, item) {
      this.internalActive = index
      this.mobileOpen = false
      this.$emit("clickNav", item)
    },
    onBrandClick () {
      this.selectNav(0, this.navList[0])
    },
    toggleMobile () {
      this.mobileOpen = !this.mobileOpen
      if (this.mobileOpen) {
        this.$nextTick(() => {
          const first = this.$refs.mobileNav && this.$refs.mobileNav.querySelector(".mobile-nav-item")
          if (first) {
            first.focus()
          }
        })
      }
    },
    closeMobile (restoreFocus = false) {
      if (!this.mobileOpen) {
        return
      }
      this.mobileOpen = false
      if (restoreFocus) {
        const toggle = this.$el.querySelector(".nav-toggle")
        if (toggle) {
          toggle.focus()
        }
      }
    },
    // 点击页面其它位置收起移动菜单，避免菜单悬浮遮挡内容
    onDocumentPointerDown (event) {
      if (!this.mobileOpen) {
        return
      }
      const target = event.target
      if (!target || !this.$el.contains(target)) {
        this.closeMobile()
      }
    },
    onKeydown (event) {
      if (event.key === "Escape") {
        this.closeMobile(true)
      }
    },
    // 放大到桌面断点时收起移动菜单，避免隐藏菜单残留展开状态
    onResize () {
      if (window.innerWidth > 820) {
        this.closeMobile()
      }
    }
  }
}
</script>

<style lang="less">
/* 全局变量：顶栏高度，供吸顶工具条/侧栏/文档 iframe 复用 */
:root {
  --mh-header-height: 76px;
}

@media (max-width: 820px) {
  :root {
    --mh-header-height: 64px;
  }
}
</style>

<style scoped lang="less">
.skip-link {
  position: absolute;
  left: 16px;
  top: -60px;
  z-index: 1100;
  padding: 10px 16px;
  border-radius: 4px;
  background: #2468f2;
  color: #fff;
  font-size: 13px;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 10px;
  color: #fff;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(16, 27, 45, 0.96);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid #ffffff14;
  color: #edf3fc;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}

.site-header.is-scrolled {
  background: rgba(13, 23, 38, 0.98);
  box-shadow: 0 10px 30px #02091540;
}

.site-nav {
  max-width: 1560px;
  width: calc(100% - 48px);
  height: var(--mh-header-height);
  margin: auto;
  display: flex;
  align-items: center;
  gap: 26px;
}

.site-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #f5f8ff;
  white-space: nowrap;
}

.site-brand:hover {
  color: #fff;
}

.site-brand img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.site-brand strong {
  font-size: 27px;
  font-weight: 600;
  letter-spacing: -1px;
}

.site-brand > span {
  font-size: 18px;
  color: #a1b2ca;
  border-left: 1px solid #ffffff24;
  padding-left: 12px;
  margin-left: 4px;
}

.desktop-nav {
  display: flex;
  gap: 26px;
  align-items: center;
  margin-left: auto;
  height: 100%;
}

.nav-item {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.nav-item > button {
  font: inherit;
  font-size: 17px;
  color: #c9d5e6;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 27px 0;
}

.nav-item > button:hover {
  color: #fff;
}

.nav-item.active > button {
  color: #91baff;
}

.nav-item.active:after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 3px;
  background: #2468f2;
  border-radius: 2px 2px 0 0;
  left: 0;
  right: 0;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 6px;
  width: 40px;
  height: 40px;
  margin-left: auto;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;

  span {
    display: block;
    width: 24px;
    height: 2px;
    border-radius: 2px;
    background: #ffffff;
    transition:
      transform 0.2s,
      opacity 0.2s;
  }

  &.is-open {
    span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
}

.nav-toggle:focus-visible,
.nav-item > button:focus-visible,
.mobile-nav-item:focus-visible,
.site-brand:focus-visible {
  outline: 2px solid #8fb6ff;
  outline-offset: 3px;
  border-radius: 4px;
}

.mobile-menu {
  display: none;
}

@media (max-width: 820px) {
  .site-nav {
    width: calc(100% - 32px);
    gap: 16px;
  }

  .site-brand strong {
    font-size: 24px;
  }

  .site-brand > span {
    display: none;
  }

  .desktop-nav {
    display: none;
  }

  .nav-toggle {
    display: flex;
  }

  .mobile-menu {
    display: block;
    max-height: calc(100dvh - var(--mh-header-height));
    overflow: auto;
    padding: 4px 16px 16px;
    border-top: 1px solid #ffffff14;
    background: rgba(13, 23, 38, 0.99);
  }

  .mobile-nav-item {
    display: block;
    width: 100%;
    padding: 15px 4px;
    border: 0;
    border-bottom: 1px solid #ffffff14;
    background: none;
    color: #e5edf9;
    font: inherit;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
  }

  .mobile-nav-item.active {
    color: #91baff;
    box-shadow: inset 3px 0 0 #2468f2;
    padding-left: 12px;
  }
}
</style>
