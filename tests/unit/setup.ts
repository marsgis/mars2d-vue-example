/**
 * 测试全局 setup：阻止 jsdom 加载本地图片资源
 */
import { vi } from "vitest"

// 1) Patch url.fileURLToPath：Windows 下 file:///img/... 无盘符会抛错
// eslint-disable-next-line @typescript-eslint/no-var-requires
const urlMod = require("url")
const origFileURLToPath = urlMod.fileURLToPath
urlMod.fileURLToPath = function (url: any) {
  try {
    return origFileURLToPath(url)
  } catch (e) {
    return "C:\\dummy"
  }
}

// 2) Patch fs 所有可能被 jsdom 调用的读取接口
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fsMod = require("fs")
const emptyBuf = Buffer.alloc(0)
const isFileUrl = (p: any) => typeof p === "string" && p.startsWith("file://")

const patchFsFn = (obj: any, name: string, sync: boolean) => {
  const orig = obj[name]
  if (typeof orig !== "function") return
  obj[name] = function (path: any, ...args: any[]) {
    if (isFileUrl(path)) {
      if (sync) return name.includes("Stat") ? {} : emptyBuf
      const cb = args[args.length - 1]
      if (typeof cb === "function") cb(null, name.includes("Stat") ? {} : emptyBuf)
      return Promise.resolve(emptyBuf)
    }
    return orig.apply(this, arguments)
  }
}

patchFsFn(fsMod, "readFile", false)
patchFsFn(fsMod, "readFileSync", true)
patchFsFn(fsMod, "open", false)
patchFsFn(fsMod, "openSync", true)
patchFsFn(fsMod, "createReadStream", false)
patchFsFn(fsMod, "stat", false)
patchFsFn(fsMod, "statSync", true)
patchFsFn(fsMod, "access", false)
patchFsFn(fsMod, "accessSync", true)

if (fsMod.promises) {
  patchFsFn(fsMod.promises, "readFile", false)
  patchFsFn(fsMod.promises, "open", false)
  patchFsFn(fsMod.promises, "stat", false)
  patchFsFn(fsMod.promises, "access", false)
}

// 2.1) jsdom 的 atob 对超长/无填充 base64 会抛 InvalidCharacterError。
// Vite 4 + Vitest 0.34 在 jsdom 下解析 vue 的 browser 构建时会触发该解码，
// 这里用 Buffer 做宽松兜底，避免环境层报错掩盖真实用例。
const _origAtob = window.atob?.bind(window)
if (_origAtob) {
  window.atob = function (input: string) {
    try {
      return _origAtob(input)
    } catch (e) {
      return Buffer.from(input, "base64").toString("binary")
    }
  }
}

// 3) 覆盖 HTMLImageElement.prototype.src
Object.defineProperty(HTMLImageElement.prototype, "src", {
  configurable: true,
  set() {
    /* noop */
  },
  get() {
    return ""
  }
})

// 4) 覆盖 Element.prototype.setAttribute + setAttributeNode 等所有属性设置入口
const _origSetAttribute = Element.prototype.setAttribute
Element.prototype.setAttribute = function (name: string, value: string) {
  if (name === "src") return
  return _origSetAttribute.call(this, name, value)
}
const _origSetAttributeNS = Element.prototype.setAttributeNS
if (_origSetAttributeNS) {
  Element.prototype.setAttributeNS = function (ns: string | null, name: string, value: string) {
    if (name === "src" || name.endsWith(":src")) return
    return _origSetAttributeNS.call(this, ns, name, value)
  }
}
const _origSetAttributeNode = Element.prototype.setAttributeNode
if (_origSetAttributeNode) {
  Element.prototype.setAttributeNode = function (attr: Attr) {
    if (attr && attr.name === "src") return attr
    return _origSetAttributeNode.call(this, attr)
  }
}

// 5) Canvas mock
vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
  clearRect: vi.fn(),
  drawImage: vi.fn(),
  fillText: vi.fn()
} as any)
vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue("data:image/png")
