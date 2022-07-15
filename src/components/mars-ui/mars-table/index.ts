import { Table } from "ant-design-vue"
import { App, defineComponent, h } from "vue"

/**
 * 下拉菜单
 *
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2022-01-01
 */

const MarsTable = defineComponent({
  name: "mars-table",
  inheritAttrs: false,
  setup(props, context) {
    return () => h(Table, { ...context.attrs, ...props }, context.slots)
  }
})

export function install(app: App): App {
  app.component(MarsTable.name, MarsTable)
  return app
}
export default MarsTable
