import fs from "fs"
import path from "path"
import type { Plugin } from "vite"

/**
 * 发布产物清理：vite 会把 public/ 整个目录复制进 outDir，其中包含大量线上用不到的
 * 调试与源码副本（*.map、*-src.*、第三方 package.json 等）。
 * 构建结束（closeBundle）时按规则删除，并去掉保留 js 末尾指向已删除 map 的 sourceMappingURL 注释，
 * 避免浏览器额外请求 404。
 *
 * 说明：
 * - 发布模式（环境变量 BUILD_RELEASE=1，见 ai-docs/小工具/build-2d-example.bat）额外删除
 *   config/thumbnail 与 index.html；命令行传 --release 也识别。
 * - 必须在 rollup-plugin-copy 之后注册：后者在 closeBundle 里把 src/example、src/components 拷到 outDir，
 *   需要在此一并清掉的部分依赖该顺序（closeBundle 按注册顺序串行执行）。
 * - 只作用于构建产物：public/ 源文件与 npm run serve 下的调试能力保持不变
 */
// 需要从构建产物里剔除的文件（都来自 public/ 与 src/example 的复制，实测有命中）；
// 第三方 LICENSE / README 属合规文件，不在此列。
// 注：vite 只复制 public/ 与打包产物，不像 es5 的 gulp 会整目录拷贝，
//     因此 .git/、node_modules/、.vscode/、eslint/prettier 配置等无需再列。
const prunePathDef = [
  ".map", // 第三方 sourcemap（约 11 个 / 13+ MB）
  "-src.", // 源码副本
  "-test", // 测试示例（由 src/example 拷贝而来）
  "/package.json" // 第三方 package.json
]

// 仅 --release 时删除，按 outDir 下的相对路径精确匹配（目录同时匹配其子路径）
const releaseOnlyDef = ["config/thumbnail", "index.html"]

export default function cleanDistPlugin(): Plugin {
  let outDir = ""
  const isRelease = process.env.BUILD_RELEASE === "1" || process.argv.includes("--release")

  return {
    name: "mars2d:clean-dist",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      if (!outDir || !fs.existsSync(outDir)) {
        return
      }
      const removed: string[] = []
      prune(outDir, outDir, isRelease, removed)
      if (removed.length > 0) {
        console.log(`[clean-dist] 已移除 ${removed.length} 项发布产物：`)
        removed.slice(0, 10).forEach((item) => console.log(`  - ${item}`))
        if (removed.length > 10) {
          console.log(`  ... 其余 ${removed.length - 10} 项`)
        }
      }
    }
  }
}

function prune(dir: string, outDir: string, isRelease: boolean, removed: string[]): void {
  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name)
    const relPath = path.relative(outDir, fullPath).replace(/\\/g, "/")
    const matchPath = "/" + relPath

    const hit =
      prunePathDef.some((t) => matchPath.indexOf(t) !== -1) ||
      (isRelease && releaseOnlyDef.some((t) => relPath === t || relPath.startsWith(t + "/")))

    if (hit) {
      fs.rmSync(fullPath, { recursive: true, force: true })
      removed.push(relPath)
      continue
    }

    if (fs.statSync(fullPath).isDirectory()) {
      prune(fullPath, outDir, isRelease, removed)
    } else if (fullPath.endsWith(".js")) {
      stripSourceMappingUrl(fullPath)
    }
  }
}

const SOURCE_MAPPING_URL = /(?:\/\/[#@][ \t]*sourceMappingURL=[^\r\n]*\s*|\/\*[#@][ \t]*sourceMappingURL=[\s\S]*?\*\/\s*)$/

function stripSourceMappingUrl(file: string): void {
  const source = fs.readFileSync(file, "utf8")
  const stripped = source.replace(SOURCE_MAPPING_URL, "")
  if (stripped !== source) {
    fs.writeFileSync(file, stripped)
  }
}
