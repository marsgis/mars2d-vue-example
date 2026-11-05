import { describe, expect, it } from "vitest"
import { CATEGORY_ICONS, FALLBACK_CATEGORY_ICON, resolveCategoryIcon } from "../../src/components/mars-work/category-icon"

describe("components: category-icon", () => {
  it("兼容历史的 Font Awesome 写法", () => {
    expect(resolveCategoryIcon("fa-globe")).toBe("globe")
    expect(resolveCategoryIcon("fa-cubes")).toBe("cube")
    expect(resolveCategoryIcon("fa-briefcase")).toBe("briefcase")
    expect(resolveCategoryIcon("fa-photo")).toBe("picture")
    expect(resolveCategoryIcon("fa-server")).toBe("server")
    expect(resolveCategoryIcon("fa-puzzle-piece")).toBe("puzzle")
    expect(resolveCategoryIcon("fa-futbol-o")).toBe("football")
    expect(resolveCategoryIcon("fa-street-view")).toBe("local")
  })

  it("配置可直接写简化名（不带 fa- 前缀），大小写与空格不敏感", () => {
    expect(resolveCategoryIcon("globe")).toBe("globe")
    expect(resolveCategoryIcon("  FA-Cubes ")).toBe("cube")
    expect(resolveCategoryIcon("Puzzle-Piece")).toBe("puzzle")
  })

  it("未配置或无法识别时回退默认图标", () => {
    expect(FALLBACK_CATEGORY_ICON).toBe("globe")
    expect(resolveCategoryIcon()).toBe(FALLBACK_CATEGORY_ICON)
    expect(resolveCategoryIcon(null)).toBe(FALLBACK_CATEGORY_ICON)
    expect(resolveCategoryIcon("")).toBe(FALLBACK_CATEGORY_ICON)
    expect(resolveCategoryIcon("fa-not-exist")).toBe(FALLBACK_CATEGORY_ICON)
  })

  it("内置图标表都指向合法图标名，且可通过简化名取到", () => {
    for (const [name, icon] of Object.entries(CATEGORY_ICONS)) {
      expect(icon).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      expect(resolveCategoryIcon(name)).toBe(icon)
    }
  })
})
