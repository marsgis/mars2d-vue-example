import { createApp } from "vue"
import Application from "./App.vue"
import { getQueryString } from "@mars/utils/mars-util"
import { useEditor } from "mars-editor"
import MarsUIInstall from "@mars/components/mars-ui"
import { injectState, key } from "@/widgets/common/store/widget"
import store from "@mars/widgets/widget-store"

// https跳转处理
const protocol = window.location.protocol
if (protocol === "https:") {
  window.location.href = window.location.href.replace("https", "http")
}

const app = createApp(Application)

MarsUIInstall(app, {
  dialog: {
    position: {
      left: 50,
      bottom: 50
    }
  }
})

app.use(injectState(store), key)

useEditor(app, {
  packageName: "mars2d",
  baseUrl: process.env.BASE_URL,
  code: getQueryString("code") || "0",
  fullScreen: getQueryString("full") || "0",
  resourcePath: process.env.EXAMPLE_SOURCE_PATH,
  configLibs: window.configLibs,
  homepage: "http://mars2d.cn/example.html",
  configSource: `${process.env.BASE_URL}config/example.json`,
  sourceFile: false
})

document.oncontextmenu = function (e) {
  e.preventDefault()
}

// 设置自适应高度指令
app.directive("auto-height", {
  mounted(el, binding) {
    const container = document.getElementById("sanbox-warpper")
    const loseHeight = binding.value || 0
    let wapperHeight = container?.clientHeight || 0
    el.style.height = `${wapperHeight - loseHeight}px`

    window.onresize = () => {
      wapperHeight = container?.clientHeight || 0
      const resizeHeight = wapperHeight - loseHeight
      el.style.height = `${resizeHeight}px`
    }
  }
})

app.mount("#app")
