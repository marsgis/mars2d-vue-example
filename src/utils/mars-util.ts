/**
 * 项目内通用 静态Util方法
 *
 * @copyright mars2d.cn
 * @author 木遥 2022-01-01
 */
import request from "./request"

/**
 * 判断是否 "经度,纬度" 字符串值
 *
 * @export
 * @param {string} text 传入的字符串
 * @return {boolean} 是否 经度,纬度
 */
export function isLonLat(text: string): boolean {
  const reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]*)?)|180(([.][0]*)?)),-?((0|[1-8]?[0-9]?)(([.][0-9]*)?)|90(([.][0]*)?))$/
  return reg.test(text)
}

/**
 * 设置自动高度值
 * @param {function} callback 窗口大小变化时的回调,返回当前计算完成的高度
 * @param {number} [lose=0] 窗口高度基础上减少的值
 * @param {string} [container="mars-main-view"] 窗口id
 * @return {void}
 */
export function setAutoHeight(callback: (v: number) => void, lose = 0, container = "mars-main-view"): () => void {
  const wapper = document.getElementById(container) || document.body

  const resize = () => {
    const wapperHeight = wapper?.clientHeight || 0
    callback(Math.max(0, wapperHeight - lose))
  }

  window.addEventListener("resize", resize)
  // 只执行一次初始计算（原实现先 callback 再 resize()，会重复触发）
  resize()

  // 返回清理函数，组件卸载时务必调用，避免 window resize 监听泄漏
  return () => {
    window.removeEventListener("resize", resize)
  }
}

/**
 *  获取URL参数
 *
 * @export
 * @param {string} parameter url值
 * @return {string | null}  参数值
 */
export function getQueryString(parameter: string): string | null {
  return new URL(window.location.href).searchParams.get(parameter)
}
/**
 *  归一化示例ID（兼容传入 src/example/ 前缀、/map.js 后缀与反斜杠）
 * @export
 * @param {string} exampleId 原始示例ID
 * @return {string}  归一化后的示例ID
 */
export function normalizeExampleId(exampleId: string): string {
  return exampleId.replace(/\\/gm, "/").replace("src/example/", "").replace("/map.js", "")
}

/**
 *  获取示例ID
 * @export
 * @return {string}  示例ID
 */
export function getExampleId(): string {
  const exampleId = getQueryString("id")
  if (!exampleId) {
    throw new Error("id不能为空")
  }
  return normalizeExampleId(exampleId)
}

/**
 * 渲染示例空态：非法/缺失 ?id= 时给出用户可读提示与返回入口
 * 说明：exampleId 来自 URL，一律走 textContent 赋值，避免注入
 * @export
 * @param {string | null} exampleId 归一化后的示例ID，缺失时传 null
 * @return {void}
 */
export function renderExampleEmptyState(exampleId: string | null): void {
  const root = document.getElementById("root")
  if (!root) {
    return
  }
  const wrapper = document.createElement("div")
  wrapper.style.cssText =
    "position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#1f1f1f;z-index:999;"

  const text = document.createElement("p")
  text.style.cssText = "margin:0;color:rgba(255,255,255,0.85);font-size:16px;"
  text.textContent = exampleId ? `未找到示例「${exampleId}」，它可能已被移除或更名` : "当前链接缺少示例参数 id"

  const link = document.createElement("a")
  link.style.cssText = "margin-top:12px;color:#4dabf7;font-size:14px;text-decoration:none;"
  link.href = `${process.env.BASE_URL}index.html`
  link.textContent = "返回示例列表"

  wrapper.appendChild(text)
  wrapper.appendChild(link)
  root.appendChild(wrapper)
}

/**
 * 判断是否是pc端
 *
 * @export
 * @return { boolean } 是否是pc端
 */
export function isPc() {
  const userAgentInfo = navigator.userAgent
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    // 注意必须用 > -1：UA 以关键词开头时 indexOf 为 0，> 0 会漏判
    if (userAgentInfo.indexOf(Agents[v]) > -1) {
      flag = false
      break
    }
  }
  return flag
}

/**
 * 请求服务返回JSON结果
 *
 * @param {object} options 请求参数
 * @param {string} options.url 服务URL地址
 * @param {string} [options.method="get"] 请求方法，需要 POST 等场景时传入
 * @return {Promise<object>} 返回Promise异步处理结果，对象为JSON数据
 */
export async function fetchJson(options: { url: string; [key: string]: any }) {
  const result = await request({ ...options, url: options.url })
  return result.data
}
