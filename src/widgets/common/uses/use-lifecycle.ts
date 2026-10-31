/**
 * 组件中开启 map.ts 生命周期
 * @copyright mars2d.cn
 * @author 火星吴彦祖 2022-02-19
 */
import { inject, onBeforeMount, onBeforeUnmount } from "vue"

/**
 * 将 Vue 组件的生命周期桥接到 map.ts 中的 onMounted/onUnmounted。
 * 详细约定见 mars2d-vue-project 同名文件，两套模板保持行为一致。
 *
 * @param mapWork map.ts 的模块命名空间（包含可选的 onMounted/onUnmounted）
 */
export default function useLifecycle(mapWork: any): void {
  const getMapInstance = inject<() => any>("getMapInstance")
  if (!getMapInstance) {
    console.warn("[useLifecycle] 未找到 getMapInstance 注入，地图生命周期不会执行")
    return
  }

  let mounted = false
  onBeforeMount(() => {
    if (!mapWork || typeof mapWork.onMounted !== "function") {
      return
    }
    const map = getMapInstance()
    if (!map) {
      console.warn("[useLifecycle] 地图实例尚未创建，跳过 onMounted")
      return
    }
    try {
      mapWork.onMounted(map)
      mounted = true
    } catch (err) {
      console.error("[useLifecycle] onMounted 执行失败", err)
    }
  })

  onBeforeUnmount(() => {
    if (!mounted || !mapWork || typeof mapWork.onUnmounted !== "function") {
      return
    }
    try {
      mapWork.onUnmounted()
    } catch (err) {
      console.error("[useLifecycle] onUnmounted 执行失败", err)
    }
  })
}
