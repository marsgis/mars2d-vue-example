<template>
  <div class="top-nav">
    <div class="logo-wrap">
      <div class="l-logo mobile_hide">
        <img src="/img/head/logo.png" />
        <span class="logo-name">Mars2D</span>
      </div>
      <div class="l-logo pc_hide">
        <img src="/img/head/logo.png" />
        <span class="logo-name">Mars2D</span>
      </div>
      <div class="r-item mobile_hide">
        <div
          class="nav-name"
          :class="navActive === index ? 'active' : ''"
          @click="changeNav(index, item)"
          v-for="(item, index) in nav_list"
          :key="index"
          @mouseover="selectStyle(index)"
          @mouseleave="leaver(index)"
        >
          {{ item.name }}
          <!-- <span v-if="item.children" class="iconfont iconjiantouarrow483"></span> -->
          <mars-icon v-if="item.children" icon="down" class="icon-vertical-a" />
          <div class="select" v-if="item.children && indexActive === index">
            <div class="item-select" v-for="(nav, ids) in item.children" :key="ids" @click="showPage(nav)">
              {{ nav.name }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="r-icon pc_hide" @click="showPath">
        <img src="../assets/img/18.png" />
      </div> -->
    </div>
    <div class="mb-fix" v-if="needPath">
      <div v-for="(item, index) in nav_list" :key="index">
        <div class="nav-path" @click="changeNav(index, item)">
          <div class="nav-msg">{{ item.name }}</div>
          <div class="nav-pic"><img src="/img/head/r-1.png" /></div>
        </div>
        <div class="select" v-if="item.children && indexActive === index">
          <div class="item-select" v-for="(childItem, childIdx) in item.children" :key="childIdx" @click="showPage(childItem)">
            {{ childItem.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarsIcon from "@/components/mars-ui/mars-icon/index.vue"
export default {
  components: {
    MarsIcon
  },
  props: {
    navActive: Number
  },
  emits: ["clickNav"],
  data() {
    return {
      indexActive: "",
      nav_list: [
        // {
        {
          url: "/",
          name: "功能"
        },
        {
          name: "开发",
          children: [
            {
              name: "开发教程",
              attr: "//mars2d.cn/dev/guide/index.html"
            },
            {
              name: "API文档",
              attr: "//mars2d.cn/api/Map.html"
            }
          ]
        }
      ],
      activeUrl: "/",
      needPath: false,
      hoverActive: -1
    }
  },
  watch: {
    navActive(e) {
      // console.log(e)
    }
  },
  methods: {
    selectStyle(index) {
      this.indexActive = index
    },
    leaver() {
      this.indexActive = -1
    },
    showPath() {
      this.needPath = !this.needPath
    },
    changeNav(index, item) {
      if (item.children) {
        this.indexActive = index
      } else {
        this.showPage(item)
      }
    },
    showPage(item) {
      this.$emit("clickNav", item.attr)
      this.needPath = false
    }
  }
}
</script>

<style scoped lang="less">
@media screen and (min-width: 993px) {
  .pc_hide {
    display: none !important;
  }
  .logo-wrap {
    max-width: 1080px;
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bg-pic {
    width: 100%;
    height: 800px;
  }

  .l-logo {
    display: flex;
    align-items: center;
    img {
      height: 50px;
    }
  }
  .logo-name {
    font-size: 25px;
    line-height: 24px;
    color: #ffffff;
  }

  .logo-wrap .r-item {
    display: flex;
    align-items: center;
  }

  .nav-name {
    font-size: 16px;
    color: #ffffff;
    margin-left: 56px;
    line-height: 50px;
    cursor: pointer;
    position: relative;
  }

  .select {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.65);
    width: 150px;
    z-index: 999;
  }

  .nav-name:hover {
    color: #f08519;
  }

  .nav-name:hover .select {
    color: #fff;
  }

  .nav-name.active {
    color: #f08519;
  }

  .item-select {
    line-height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .item-select:hover {
    color: #f08519;
  }
  .top-nav {
    width: 100%;
    height: 68px;
    // background: rgba(0, 0, 0, 0.65);
    background: #333;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 0 10px 0;
    box-sizing: border-box;
    z-index: 9999;
  }
}
@media screen and (max-width: 992px) {
  .mobile_hide {
    display: none !important;
  }
  .mb-fix {
    background: white;
    top: 80px;
    right: 0;
    padding: 0 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
  }
  .nav-path {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .nav-msg {
    font-size: 24px;
    line-height: 32px;
    color: #333333;
  }

  .item-select {
    padding: 15px 0;
    border-bottom: 1px solid #f1f1f1;
    font-size: 15px;
    color: #333333;
  }
  .nav-pic {
    width: 10px;
    height: 18px;
  }
  .top-nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 12px 0 11px 0;
    box-sizing: border-box;
    z-index: 9999;
  }
  .top-nav {
    background: white !important;
    height: 80px !important;
    padding-top: 13px !important;
    padding-bottom: unset !important;
    padding-right: 13px !important;
    padding-left: 27px !important;
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .l-logo {
    img {
      height: 50px;
    }
  }
  .logo-name {
    font-size: 30px;
    line-height: 40px;
    color: #888888;
  }
  .r-item {
    display: flex;
  }
  .check-item {
    width: 50%;
    flex: 0 0 auto;
  }
  .r-icon {
    width: 24px;
    height: 23px;
    position: relative;
  }
  .r-icon img {
    width: 100%;
    height: 100%;
  }
}
</style>
