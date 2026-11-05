import { afterEach, describe, expect, it, vi } from "vitest"
import request from "../../src/utils/request"
import { fetchJson } from "../../src/utils/mars-util"

const originalAdapter = request.defaults.adapter

/** 用桩 adapter 替换网络层，避免真实请求 */
function stubAdapter(handler: (config: any) => Promise<any>) {
  request.defaults.adapter = handler as any
}

describe("request 实例契约", () => {
  afterEach(() => {
    request.defaults.adapter = originalAdapter
  })

  it("超时为 15 秒", () => {
    expect(request.defaults.timeout).toBe(15000)
  })

  it("未注册请求/响应拦截器", () => {
    expect((request.interceptors.request as any).handlers.length).toBe(0)
    expect((request.interceptors.response as any).handlers.length).toBe(0)
  })
})

describe("fetchJson", () => {
  afterEach(() => {
    request.defaults.adapter = originalAdapter
  })

  it("返回响应体中的 data", async () => {
    const adapter = vi.fn(async (config: any) => ({
      data: { list: [1, 2] },
      status: 200,
      statusText: "OK",
      headers: {},
      config
    }))
    stubAdapter(adapter)

    await expect(fetchJson({ url: "/api/demo" })).resolves.toEqual({ list: [1, 2] })

    expect(adapter).toHaveBeenCalledTimes(1)
    expect(adapter.mock.calls[0][0].url).toBe("/api/demo")
    expect(adapter.mock.calls[0][0].timeout).toBe(15000)
  })

  it("请求参数原样透传", async () => {
    const adapter = vi.fn(async (config: any) => ({ data: {}, status: 200, statusText: "OK", headers: {}, config }))
    stubAdapter(adapter)

    await fetchJson({ url: "/api/list", method: "post", params: { page: 2 } })

    const config = adapter.mock.calls[0][0]
    expect(config.method).toBe("post")
    expect(config.params).toEqual({ page: 2 })
  })

  it("请求失败时原样抛出", async () => {
    const error = new Error("network down")
    stubAdapter(() => Promise.reject(error))

    await expect(fetchJson({ url: "/api/demo" })).rejects.toBe(error)
  })
})
