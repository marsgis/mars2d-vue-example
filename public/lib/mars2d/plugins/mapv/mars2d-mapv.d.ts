/**
 * mars2d-mapv 插件类型声明
 *
 * 图层类的完整参数与成员声明在主包的 mars2d.d.ts 中，这里按值再导出，避免重复维护。
 * 说明：运行时还会 re-export mapv 的全部成员，但 mapv 自身未提供类型声明，故此处不生成对应类型。
 */
import * as mars2d from "mars2d"

/** MapV 可视化图层 */
export const MapVLayer: typeof mars2d.layer.MapVLayer
