/**
 * mars2d-esri 插件类型声明
 *
 * 插件运行时向主库注入 `mars2d.esri`（`L.esri` 同一命名空间），并导出以下图层类。
 * 图层类的完整参数与成员声明在主包的 mars2d.d.ts 中，这里按值再导出，避免重复维护。
 */
import * as mars2d from "mars2d"

/** ArcGIS Server 图片图层 */
export const ArcGisImageLayer: typeof mars2d.layer.ArcGisImageLayer
/** ArcGIS Server 瓦片图层 */
export const ArcGisTileLayer: typeof mars2d.layer.ArcGisTileLayer
/** ArcGIS Server 动态图层 */
export const ArcGisDynamicLayer: typeof mars2d.layer.ArcGisDynamicLayer
/** ArcGIS Server 矢量要素图层 */
export const ArcGisFeatureLayer: typeof mars2d.layer.ArcGisFeatureLayer
