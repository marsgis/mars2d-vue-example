/**
 * 示例分类图标
 *
 * 分类图标不再依赖 Font Awesome 字体库，改用内置的一套 IconPark 图标，
 * 由 mars-icon 直接渲染 SVG，与页面内其它图标保持同一套风格。
 *
 * 配置里的 icon 只写一个简单名字即可（如 "icon": "globe"），
 * 同时兼容历史的 FA 写法（"icon": "fa-globe"），这里统一归一化后查表；
 * 新增分类图标时，在下表补一行即可，未知取值会回退到默认图标。
 *
 * @copyright mars2d.cn
 */

/** 归一化图标名 → IconPark 图标名（注释为当前使用该图标的分类） */
export const CATEGORY_ICONS: Record<string, string> = {
  // 快速开始
  globe: "globe",
  // 二维场景
  cubes: "cube",
  // 控件
  briefcase: "briefcase",
  // 瓦片图层
  photo: "picture",
  // 矢量图层
  server: "server",
  // 矢量数据
  "puzzle-piece": "puzzle",
  // 空间分析
  "futbol-o": "football",
  // 其他图层
  "street-view": "local"
}

/** 未配置或无法识别时使用的图标（地球，即「快速开始」分类的图标） */
export const FALLBACK_CATEGORY_ICON = "globe"

/**
 * 把配置里的 icon 解析为 mars-icon 可用的图标名
 * - 兼容 FA 写法："fa-globe" → "globe"
 * - 大小写、首尾空格不敏感
 * - 未知取值回退到默认图标，避免分类标题出现空白
 * @param icon 配置中的 icon 值
 * @returns IconPark 图标名
 */
export function resolveCategoryIcon(icon?: string | null): string {
  const name = String(icon ?? "").trim().toLowerCase().replace(/^fa-/, "")
  return CATEGORY_ICONS[name] || FALLBACK_CATEGORY_ICON
}
