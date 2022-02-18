/**
 * index页面的widget配置
 * @copyright 火星科技 mars2d.cn
 * @author 火星吴彦祖 2021-12-30
 */
import { defineAsyncComponent, markRaw } from "vue"
import { WidgetState } from "@/widgets/common/store/widget"
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
        component: markRaw(defineAsyncComponent(() => import("@mars/widgets/basic/manage-layers/index.vue"))),
        name: "manage-layers",
        group: "manage"
      }
    ],
    openAtStart: []
  }
}

export default store
