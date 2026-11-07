/**
 * monaco-editor ESM 官方 worker 接入（Vite 原生 ?worker），替代已停更的 vite-plugin-monaco-editor。
 * 需在创建任何 monaco 编辑器前引入（编辑器/只读页入口均通过 @marsgis/editor 间接使用 monaco）。
 * 与原插件保持一致：仅打包 editorWorkerService 与 typescript 两个 worker，其余 label 走默认编辑器 worker。
 */
// monaco-editor 0.57 起 package.json exports 把深层模块统一映射到 esm/vs 下，路径需去掉 esm/vs 前缀
import type {} from "monaco-editor" // 仅引入类型，使 self.MonacoEnvironment 获得 monaco.Environment 声明
import EditorWorker from "monaco-editor/editor/editor.worker?worker"
import TsWorker from "monaco-editor/language/typescript/ts.worker?worker"

self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string): Worker {
    if (label === "typescript" || label === "javascript") {
      return new TsWorker()
    }
    return new EditorWorker()
  }
}
