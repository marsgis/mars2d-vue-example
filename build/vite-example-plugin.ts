import fs from "fs"
export default function examplePlugin(mode: string) {
  return {
    name: "transform-example",
    load(id: string) {
      // 填坑：在transform中处理的是编译后的文件内容，导致了一些bug
      if (id.endsWith(".vue") || /widgets\/.*\/map.ts/.test(id)) {
        const data = fs.readFileSync(id)
        let source = data.toString()

        if (source.indexOf(`from "./map.js"`) !== -1) {
          source = source.replace(/import \* as (\S*) from \"\.\/map\.js\"/g, "const $1 = window.mapWork")
        }
        if (source.indexOf(`from "mars2d"`) !== -1) {
          source = source.replace(/import \* as (\S*) from \"mars2d\"/g, "const $1 = window.mars2d")
        }
        if (source.indexOf(`from "mars3d"`) !== -1) {
          source = source.replace(/import \* as (\S*) from \"mars3d\"/g, "const $1 = window.mars3d")
        }
        return source
      }
    },
    transform(source: string, id: string) {
      let code = source
      if (/example\/.*\/map.js/.test(id) && mode === "development") {
        // 替换let const
        code = code.replace(new RegExp("export let ", "gm"), "var ")
        code = code.replace(new RegExp("export const ", "gm"), "var ")

        // 浏览器中运行时，删除export import
        code = code.replace(new RegExp("export ", "gm"), "")
        code = code.replace(new RegExp("import ", "gm"), "// import ")

        // 删除const L = mars2d.L
        code = code.replace("const L = mars2d.L", "")
        // 删除const Cesium = mars3d.Cesium
        code = code.replace("const Cesium = mars3d.Cesium", "")
      }
      return {
        code
      }
    }
  }
}
