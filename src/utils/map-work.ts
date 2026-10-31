/**
 * map.js 业务就绪事件流
 *
 * @copyright mars2d.cn
 *
 * 背景（为什么需要这个文件）：
 * 1. window.mapWork 由 public/temp/js/common.js 在 iframe 内地图创建完成后赋值（parentGlobal.mapWork = window）；
 * 2. map.js 里真正创建图层等对象的 onMounted(mapInstance)，需要框架（pages/editor|read/App.vue）调用
 *    window.marsEditor.useLifecycle() 才会执行；
 * 3. 面板组件（index.vue -> graphic-layer-state.vue 等）的 onMounted 与上一步没有强制的先后约束：
 *    - 新框架：面板 before-mount 时触发 useLifecycle()，面板 onMounted 晚于 map.js onMounted；
 *    - 旧框架/极端网络时序：面板 onMounted 早于 map.js onMounted，此时 mapWork.graphicLayer 还是 undefined。
 *
 * 事件流约定：
 *   框架：useLifecycle() 执行完 -> markMapWorkReady()
 *   面板：onMapWorkReady(cb) 订阅 -> 无论谁先谁后，cb 都会在图层对象可用后执行一次
 *
 * 说明：
 * - 就绪状态以 mapWork 对象本身（每次“运行”都是新的 iframe window）为标识，
 *   因此重新运行示例后不会沿用上一轮的就绪状态；
 * - 为兼容没有派发就绪事件的旧版框架，onMapWorkReady 支持传入 probe 兜底探测。
 */

/** 等待中的回调 */
interface MapWorkWaiter {
  mapWork: any
  callback: (mapWork: any) => void
  stop: () => void
}

const waiters: MapWorkWaiter[] = []

/** 已经执行完 onMounted 的地图业务对象（iframe 内的 window） */
let readyMapWork: any = null

/**
 * 获取当前示例的地图业务对象
 * @returns map.js 所在 iframe 的 window（map.js 内 export 的变量都在它上面）
 */
export function getMapWork(): any {
  return window.mapWork
}

/**
 * 地图业务（map.js 的 onMounted）是否已执行完成
 * @param mapWork 地图业务对象，默认取 window.mapWork
 */
export function isMapWorkReady(mapWork: any = getMapWork()): boolean {
  return !!mapWork && readyMapWork === mapWork
}

/**
 * 标记地图业务已就绪，并通知所有等待中的面板组件
 * 由框架在 window.marsEditor.useLifecycle() 之后调用一次。
 * @param mapWork 地图业务对象，默认取 window.mapWork
 */
export function markMapWorkReady(mapWork: any = getMapWork()): void {
  if (!mapWork) {
    return
  }
  readyMapWork = mapWork

  // 旧一轮（旧 iframe）的等待者不会再被触发，直接丢弃，避免内存泄漏
  for (let i = waiters.length - 1; i >= 0; i--) {
    if (waiters[i].mapWork !== mapWork) {
      waiters.splice(i, 1)
    }
  }

  const targets = waiters.filter((item) => item.mapWork === mapWork)
  targets.forEach((item) => {
    item.stop()
    try {
      item.callback(mapWork)
    } catch (err) {
      console.error("[map-work] 地图业务就绪回调执行失败", err)
    }
  })
}

/** onMapWorkReady 的配置项 */
export interface MapWorkReadyOptions {
  /** 兜底探测：旧版框架未调用 markMapWorkReady 时，用该函数判断图层等对象是否已创建 */
  probe?: () => boolean
  /** 探测间隔（毫秒），默认 50 */
  interval?: number
  /** 探测超时（毫秒），默认 10000，超时后停止探测（不会误触发回调） */
  timeout?: number
}

/**
 * 等待地图业务就绪（map.js 的 onMounted 已执行完成）
 * @param callback 就绪回调，只会执行一次
 * @param options 兜底探测配置
 * @returns 取消等待的函数，组件卸载时调用
 */
export function onMapWorkReady(callback: (mapWork: any) => void, options: MapWorkReadyOptions = {}): () => void {
  const mapWork = getMapWork()
  if (!mapWork) {
    console.warn("[map-work] window.mapWork 尚未赋值，无法监听地图业务就绪事件")
    return () => {}
  }

  // 已经就绪（面板挂载晚于 map.js onMounted），直接执行
  if (readyMapWork === mapWork) {
    callback(mapWork)
    return () => {}
  }

  let timer: any = null
  const waiter: MapWorkWaiter = {
    mapWork,
    callback,
    stop: () => {}
  }
  waiter.stop = () => {
    const index = waiters.indexOf(waiter)
    if (index !== -1) {
      waiters.splice(index, 1)
    }
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
  waiters.push(waiter)

  // 兼容旧版框架：没有就绪事件时，用探测函数兜底
  if (options.probe) {
    const interval = options.interval ?? 50
    const timeout = options.timeout ?? 10000
    const startTime = Date.now()
    timer = setInterval(() => {
      if (readyMapWork === mapWork) {
        return // 已由 markMapWorkReady 触发，stop() 中会清理定时器
      }

      let ready = false
      try {
        ready = !!options.probe!()
      } catch (err) {
        ready = false
      }
      if (ready) {
        markMapWorkReady(mapWork)
        return
      }
      if (Date.now() - startTime >= timeout) {
        waiter.stop()
      }
    }, interval)
  }

  return waiter.stop
}
