import { createApp } from "vue"
import Application from "./App.vue"
import { useList } from "mars-editor"

const app = createApp(Application)

useList(app, {
  packageName: "mars2d",
  baseUrl: process.env.BASE_URL,
  configLibs: window.configLibs,
  resourcePath: process.env.EXAMPLE_SOURCE_PATH,
  configSource: `${process.env.BASE_URL}config/example.json`
})

app.mount("#app")
