/**
 * ts下为window定义全局变量
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2022-01-01
 */

export { }
declare global {
  interface Window {
    configLibs: any // 第3方公共类库配置文件

    _mapInstance: any // map地图对象
    mapWork: any, // map.js内部对象
    currentPath: string, // 当前示例的所在目录路径

    $message: any // 公用信息弹窗方法
    $alert: any
    $notify: any
    $showLoading: any
    $hideLoading: any
  }
}
