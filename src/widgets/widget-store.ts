/**
 * 功能示例 的 widget配置（更多请参考基础项目Vue版）
 * @copyright 火星科技 mars2d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@mars/widgets/common/store/widget"
import { StoreOptions } from "vuex"

const store: StoreOptions<WidgetState> = {
  state: {
    widgets: [
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/query-poi/index.vue"))),
        name: "query-poi",
        autoDisable: true
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-basemap/index.vue"))),
        name: "manage-basemap",
        group: "manage"
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/index.vue"))),
        name: "manage-layers",
        group: "manage",
        disableOther: ["roamfly"]
      },

      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/graphic-editor/index.vue"))),
        name: "graphic-editor",
        meta: {
          props: {
            position: {
              left: 50,
              top: 10,
              bottom: 50
            }
          }
        }
      },
      {
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/tools-button/index.vue"))),
        name: "tools-button",
        disableOther: false,
        autoDisable: false
      }
    ],
    openAtStart: ["tools-button"]
  }
}

export default store
