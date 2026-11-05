import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 单元测试配置（对齐 mars3d-vue-example）
 * - 只覆盖 tests/unit；不改变 vite.config.mts 的构建与 dev server 行为
 * - 覆盖率分母＝入口页 + 公共层（src/pages、src/components、src/utils、src/widgets）
 *   src/example 为示例工程内容，示例差异较大，单列不计入
 * - 门槛：全仓业务源码行 ≥90%，入口页行/分支 100%
 */
export default defineConfig({
  plugins: [
    vue({
      template: {
        // 测试环境下 @vitejs/plugin-vue 默认 includeAbsolute:true，
        // 会把 <img src="/img/..."> 转成 import，导致 createRequire 解析失败。
        transformAssetUrls: { includeAbsolute: false }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@mars": path.resolve(__dirname, "src")
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/unit/setup.ts"],
    include: ["tests/unit/**/*.spec.ts"],
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json", "lcov"],
      reportsDirectory: "coverage",
      include: ["src/pages/**", "src/components/**", "src/utils/**", "src/widgets/**"],
      exclude: [
        "src/example/**",
        "**/*.d.ts",
        "**/assets/**",
        "**/*.less",
        "**/*.css",
        "**/*.json",
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.md",
        "tests/**"
      ],
      thresholds: {
        lines: 90,
        "src/pages/**": {
          lines: 100,
          branches: 100
        }
      }
    }
  }
})
