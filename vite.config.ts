import path from "path"
import type { ConfigEnv } from "vite"
import { defineConfig, loadEnv } from "vite" // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from "@vitejs/plugin-vue"
import examplePlugin from "./build/vite-example-plugin"
import copyPlugin from "rollup-plugin-copy"
import monacoEditorPlugin from "vite-plugin-monaco-editor"
import eslintPlugin from "vite-plugin-eslint"
import { createStyleImportPlugin, AndDesignVueResolve } from "vite-plugin-style-import"

export default ({ mode }: ConfigEnv) => {
  const root = process.cwd()
  // 获取 .env 文件里定义的环境变量
  const ENV = loadEnv(mode, root)

  console.log(`当前环境信息：`, mode)
  console.log(`ENV：`, ENV)

  return defineConfig({
    base: ENV.VITE_BASE_URL,
    server: {
      host: "localhost",
      port: 2001
    },
    define: {
      "process.env": {
        mode,
        BASE_URL: ENV.VITE_BASE_URL,
        EXAMPLE_SOURCE_PATH: ENV.VITE_EXAMPLE_SOURCE_PATH,
        EDITOR_MODE: ENV.VITE_EDITOR_MODE !== "0"
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@mars": path.join(__dirname, "src")
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json"]
    },
    // optimizeDeps: {
    //   exclude: ["leaflet"]
    // },
    json: {
      // 支持从 .json 文件中进行按名导入
      namedExports: true,
      stringify: false
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, "src/components/mars-ui/base.less")}";`
        }
      }
    },
    build: {
      // 输出路径
      outDir: path.join("./dist", ENV.VITE_BASE_URL),
      // 小于此阈值的导入或引用资源将内联为 base64 编码， 以避免额外的http请求， 设置为 0, 可以完全禁用此项，
      assetsInlineLimit: 4096,
      // 启动 / 禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 构建后是否生成 soutrce map 文件
      sourcemap: false,
      // 自定义rollup-commonjs插件选项
      commonjsOptions: {
        include: /node_modules|packages/
      },
      // 静态资源文件生成的目录
      assetsDir: "example/assets-vue",
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "index.html"),
          editor: path.resolve(__dirname, "editor-vue.html"),
          read: path.resolve(__dirname, "read-vue.html")
        },
        output: {
          chunkFileNames: "example/assets-vue/js/[name]-[hash].js",
          entryFileNames: "example/assets-vue/js/[name]-[hash].js",
          assetFileNames: "example/assets-vue/[ext]/[name]-[hash].[ext]"
        }
      },
      // 当设置为 true, 构建后将会生成 manifest.json 文件
      manifest: false,
      // 用来指定是应用哪种混淆器 boolean | 'terser' | 'esbuild'
      minify: "terser",
      // 传递给 Terser 的更多 minify 选项
      terserOptions: {},
      // 设置为false 来禁用将构建好的文件写入磁盘
      write: true,
      // 默认情况下 若 outDir 在 root 目录下， 则 Vite 会在构建时清空该目录。
      emptyOutDir: true
    },
    plugins: [
      vue(),
      eslintPlugin({ cache: false }),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
        libs: [
          {
            libraryName: "ant-design-vue",
            esModule: true,
            resolveStyle: (name) => {
              if (name === "auto-complete") {
                return `ant-design-vue/es/${name}/index`
              }
              return `ant-design-vue/es/${name}/style/index`
            }
          }
        ]
      }),
      examplePlugin(mode),
      monacoEditorPlugin({ publicPath: "example/assets-monaco" }),
      {
        ...copyPlugin({
          hook: "closeBundle",
          targets: [
            {
              src: "src/components/**/*.vue",
              dest: "dist/vue",
              rename: (_name, _extension, fullPath) => {
                return fullPath.split("components")[1]
              }
            },
            {
              src: "src/example/**/*.*",
              dest: "dist/example",
              rename: (_name, _extension, fullPath) => {
                return fullPath.split("example")[1]
              }
            }
          ]
        })
      }
    ]
  })
}
