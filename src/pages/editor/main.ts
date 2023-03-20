import { createApp, defineComponent } from "vue"
import Application from "./App.vue"
import MarsUIInstall from "@mars/components/mars-ui"
import { injectState, getInjectKey } from "@mars/widgets/common/store/widget"
import { getExampleId, getQueryString } from "@mars/utils/mars-util"
import { cloneDeep } from "lodash"
import store from "@mars/widgets/widget-store"
import { Editor as MarsgisEditor } from "@marsgis/editor"
import "@marsgis/editor/dist/style.css"
import "@mars/components/mars-ui/common"

// https跳转处理
const protocol = window.location.protocol
if (protocol === "https:") {
  window.location.href = window.location.href.replace("https", "http")
}
document.oncontextmenu = function (e) {
  e.preventDefault()
}

const marsEditor = new MarsgisEditor({
  packageName: "mars2d",
  baseUrl: process.env.BASE_URL,
  code: getQueryString("code"),
  fullScreen: getQueryString("full"),
  configLibs: window.configLibs,
  resourcePublicPath: process.env.EXAMPLE_SOURCE_PATH,
  thumbnailPublicPath: "/config/",
  libPublicPath: "/lib/",
  framework: "vue",
  configSourceUrl: `${process.env.BASE_URL}config/example.json`,
  UIFile: "{main}/index.vue"
})
window.marsEditor = marsEditor

let inited = false
marsEditor.on("loaded", (exampleConfig) => {
  if (inited) {
    destoryUI()
  }

  window.document.getElementById("btn-jump-react").style.display = "none" // 隐藏技术栈

  initUI(!exampleConfig.hasPannel)
  inited = true
})

let vueApp
function initUI(simple: boolean) {
  if (simple) {
    vueApp = createApp(
      defineComponent({
        template: "<div></div>"
      })
    )
  } else {
    vueApp = createApp(Application)
    const key = getInjectKey()

    vueApp.use(injectState(cloneDeep(store)), key)
  }

  MarsUIInstall(vueApp, {
    dialog: {
      position: {
        left: 50,
        bottom: 50
      },
      warpper: "#mars-main-view"
    }
  })

  vueApp.mount("#mars-ui-root")
}

function destoryUI() {
  vueApp.unmount()
  vueApp = null
}

marsEditor.render({
  container: document.getElementById("root"),
  exampleId: getExampleId(),
  exampleKey: getQueryString("key"),
  fullName: getQueryString("name")
})
