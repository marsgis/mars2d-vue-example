import nprogress from "nprogress"
import "nprogress/nprogress.css"
import { App } from "vue"

/**
 * loading组件
 * @export
 * @param {App} app vue实例
 * @copyright mars2d.cn
 * @author 火星吴彦祖 2022-02-19
 * @returns { void }
 */
let loadingNum = 0
// 进度条自增使用全局唯一定时器：如果每次 $showLoading 都新建 interval，
// 并发请求时会有多个定时器同时跑，且 hide 时无法全部回收。
let progressTimer: any = null

function startProgress() {
  if (progressTimer) {
    return
  }
  progressTimer = setInterval(() => {
    if (nprogress.isStarted() && nprogress.status < 0.8) {
      nprogress.set(nprogress.status + 0.1)
    } else {
      stopProgress()
    }
  }, 500)
}

function stopProgress() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

export const $showLoading = () => {
  loadingNum++
  nprogress.start()
  startProgress()
}
export const $hideLoading = () => {
  loadingNum = Math.max(0, --loadingNum)
  if (loadingNum === 0) {
    stopProgress()
    nprogress.done()
  }
}
export default function (app: App): void {
  app.config.globalProperties.$showLoading = $showLoading
  app.config.globalProperties.$hideLoading = $hideLoading
}
