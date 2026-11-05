import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

type MapWorkModule = typeof import("../../src/utils/map-work")

let mod: MapWorkModule
const originWarn = console.warn
const originError = console.error

async function load(): Promise<MapWorkModule> {
  vi.resetModules()
  return import("../../src/utils/map-work")
}

describe("map-work · 就绪状态与订阅", () => {
  beforeEach(async () => {
    vi.resetModules()
    mod = await import("../../src/utils/map-work")
    ;(window as any).mapWork = undefined
    vi.useFakeTimers()
    console.warn = vi.fn()
    console.error = vi.fn()
  })

  afterEach(() => {
    vi.useRealTimers()
    console.warn = originWarn
    console.error = originError
    ;(window as any).mapWork = undefined
  })

  it("window.mapWork 未赋值时警告并返回 noop 取消函数", () => {
    const cancel = mod.onMapWorkReady(() => undefined)
    expect(console.warn).toHaveBeenCalled()
    expect(typeof cancel).toBe("function")
    cancel()
    expect(mod.getMapWork()).toBeUndefined()
    expect(mod.isMapWorkReady()).toBe(false)
  })

  it("markMapWorkReady 无参数时直接返回", () => {
    mod.markMapWorkReady()
    expect(mod.isMapWorkReady()).toBe(false)
  })

  it("已就绪时立即执行回调，且只执行一次", () => {
    const work = { id: 1 }
    ;(window as any).mapWork = work
    mod.markMapWorkReady(work)
    expect(mod.isMapWorkReady(work)).toBe(true)
    const cb = vi.fn()
    const cancel = mod.onMapWorkReady(cb)
    expect(cb).toHaveBeenCalledWith(work)
    cancel()
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it("等待中的回调在标记就绪时执行，回调异常被捕获", () => {
    const work = { id: "a" }
    const cb = vi.fn(() => {
      throw new Error("boom")
    })
    ;(window as any).mapWork = work
    mod.onMapWorkReady(cb)
    mod.markMapWorkReady(work)
    expect(cb).toHaveBeenCalledWith(work)
    expect(console.error).toHaveBeenCalled()
  })

  it("标记新的 mapWork 会丢弃旧一轮等待者", () => {
    const oldWork = { id: "old" }
    const newWork = { id: "new" }
    ;(window as any).mapWork = oldWork
    const oldCb = vi.fn()
    mod.onMapWorkReady(oldCb)

    ;(window as any).mapWork = newWork
    const newCb = vi.fn()
    mod.onMapWorkReady(newCb)

    mod.markMapWorkReady(newWork)
    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).toHaveBeenCalledWith(newWork)
  })

  it("取消等待后不再触发回调", () => {
    const work = { id: "x" }
    ;(window as any).mapWork = work
    const cb = vi.fn()
    const cancel = mod.onMapWorkReady(cb)
    cancel()
    mod.markMapWorkReady(work)
    expect(cb).not.toHaveBeenCalled()
    // 已标记就绪后再取消不会重复触发
    const cb2 = vi.fn()
    mod.onMapWorkReady(cb2)
    expect(cb2).toHaveBeenCalledTimes(1)
  })

  it("probe 探测成功后触发回调并清理定时器", () => {
    const work = { id: "probe" }
    ;(window as any).mapWork = work
    const cb = vi.fn()
    const probe = vi.fn(() => true)
    mod.onMapWorkReady(cb, { probe, interval: 10 })
    vi.advanceTimersByTime(10)
    expect(probe).toHaveBeenCalled()
    expect(cb).toHaveBeenCalledWith(work)
    expect(vi.getTimerCount()).toBe(0)
  })

  it("probe 抛错视为未就绪，超时后停止探测且不回调", () => {
    const work = { id: "timeout" }
    ;(window as any).mapWork = work
    const cb = vi.fn()
    const probe = vi.fn(() => {
      throw new Error("nope")
    })
    mod.onMapWorkReady(cb, { probe, interval: 10, timeout: 0 })
    vi.advanceTimersByTime(10)
    expect(probe).toHaveBeenCalled()
    expect(cb).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })

  it("probe 未启用时不创建定时器", () => {
    const work = { id: "none" }
    ;(window as any).mapWork = work
    const cb = vi.fn()
    mod.onMapWorkReady(cb)
    expect(vi.getTimerCount()).toBe(0)
    expect(cb).not.toHaveBeenCalled()
  })

  it("重新 import 后等待者模块状态隔离", async () => {
    const work = { id: "reload" }
    ;(window as any).mapWork = work
    const cb = vi.fn()
    mod.onMapWorkReady(cb)
    const nextMod = await load()
    ;(window as any).mapWork = work
    nextMod.onMapWorkReady(cb)
    nextMod.markMapWorkReady(work)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(nextMod.isMapWorkReady(work)).toBe(true)
  })
})
