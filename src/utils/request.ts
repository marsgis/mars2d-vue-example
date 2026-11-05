/**
 * 项目内统一 axios 实例
 *
 * 约定：
 * - 统一 15s 超时，避免示例请求长时间挂起；
 * - 不注册全局提示拦截器，失败统一以 AxiosError reject，由调用方决定提示方式；
 * - 需要取 JSON 数据的场景优先使用 `mars-util.ts#fetchJson`。
 */
import axios from "axios"

const request = axios.create({
  timeout: 15000
})

export default request
