import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  getExampleId,
  getQueryString,
  isLonLat,
  isPc,
  normalizeExampleId,
  renderExampleEmptyState,
  setAutoHeight
} from "../../src/utils/mars-util"

describe("mars-util · isLonLat", () => {
  it("接受合法的经度,纬度字符串", () => {
    expect(isLonLat("116.1,39.9")).toBe(true)
    expect(isLonLat("-180,90")).toBe(true)
    expect(isLonLat("0,0")).toBe(true)
  })

  it("拒绝越界、缺省或非数字格式", () => {
    expect(isLonLat("181,0")).toBe(false)
    expect(isLonLat("116.1")).toBe(false)
    expect(isLonLat("abc,def")).toBe(false)
  })
})

describe("mars-util · setAutoHeight", () => {
  let callback: ReturnType<typeof vi.fn>

  beforeEach(() => {
    callback = vi.fn()
    document.body.innerHTML = ""
  })

  afterEach(() => {
    document.body.innerHTML = ""
  })

  function makeContainer(id: string, height: number) {
    const el = document.createElement("div")
    el.id = id
    Object.defineProperty(el, "clientHeight", { value: height, configurable: true })
    document.body.appendChild(el)
    return el
  }

  it("按容器高度减去 lose 计算，并返回可清理的监听函数", () => {
    makeContainer("sanbox-warpper", 500)
    const cleanup = setAutoHeight(callback, 100, "sanbox-warpper")
    expect(callback).toHaveBeenLastCalledWith(400)

    window.dispatchEvent(new Event("resize"))
    expect(callback).toHaveBeenLastCalledWith(400)

    cleanup()
    window.dispatchEvent(new Event("resize"))
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("默认容器 mars-main-view，不存在时回退 body", () => {
    makeContainer("mars-main-view", 300)
    const cleanup = setAutoHeight(callback)
    expect(callback).toHaveBeenLastCalledWith(300)
    cleanup()

    document.body.innerHTML = ""
    const cleanup2 = setAutoHeight(callback, 20)
    expect(callback).toHaveBeenLastCalledWith(0)
    cleanup2()
  })
})

describe("mars-util · URL 与示例 ID", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/")
  })

  afterEach(() => {
    window.history.replaceState(null, "", "/")
  })

  it("getQueryString 读取当前 URL 参数，不存在返回 null", () => {
    window.history.replaceState(null, "", "/?id=foo&key=bar")
    expect(getQueryString("id")).toBe("foo")
    expect(getQueryString("key")).toBe("bar")
    expect(getQueryString("none")).toBeNull()
  })

  it("normalizeExampleId 兼容前缀、后缀与反斜杠", () => {
    expect(normalizeExampleId("src/example/basic/map/map.js")).toBe("basic/map")
    expect(normalizeExampleId("basic\\map\\map.js")).toBe("basic/map")
    expect(normalizeExampleId("basic/map")).toBe("basic/map")
  })

  it("getExampleId 缺少 id 时抛错，存在时归一化返回", () => {
    expect(() => getExampleId()).toThrow("id不能为空")
    window.history.replaceState(null, "", "/?id=src/example/basic/map/map.js")
    expect(getExampleId()).toBe("basic/map")
  })
})

describe("mars-util · renderExampleEmptyState", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  afterEach(() => {
    document.body.innerHTML = ""
  })

  it("没有 #root 时静默返回", () => {
    renderExampleEmptyState(null)
    expect(document.querySelector("#root")).toBeNull()
  })

  it("exampleId 为空时提示缺少参数", () => {
    const root = document.createElement("div")
    root.id = "root"
    document.body.appendChild(root)
    renderExampleEmptyState(null)
    expect(root.querySelector("p")?.textContent).toBe("当前链接缺少示例参数 id")
    expect(root.querySelector("a")?.getAttribute("href")).toContain("index.html")
  })

  it("exampleId 存在时提示未找到并使用 textContent 防注入", () => {
    const root = document.createElement("div")
    root.id = "root"
    document.body.appendChild(root)
    renderExampleEmptyState("basic/<script>")
    expect(root.querySelector("p")?.textContent).toContain("basic/<script>")
    expect(root.querySelectorAll("script")).toHaveLength(0)
  })
})

describe("mars-util · isPc", () => {
  const original = Object.getOwnPropertyDescriptor(window.navigator, "userAgent")

  function setUA(ua: string) {
    Object.defineProperty(window.navigator, "userAgent", { value: ua, configurable: true })
  }

  afterEach(() => {
    if (original) Object.defineProperty(window.navigator, "userAgent", original)
  })

  it("桌面 UA 返回 true", () => {
    setUA("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
    expect(isPc()).toBe(true)
  })

  it("移动 UA 返回 false（包含开头即为关键词的情况）", () => {
    setUA("Android 10 Mobile Safari")
    expect(isPc()).toBe(false)
    setUA("iPhone OS 16")
    expect(isPc()).toBe(false)
  })
})
