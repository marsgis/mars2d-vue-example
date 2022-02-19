"use script"

const vueGlobal = window.parent || window

vueGlobal.mars2d = mars2d// widget中使用

function init() {
  // 读取 config.json 配置文件
  mars2d.Util.fetchJson({ url: "config/config.json" })
    .then(function (json) {
      console.log("读取 config.json 配置文件完成", json) // 打印测试信息

      // 构建地图
      const initMapFun = window.initMap ? window.initMap : globalInitMap
      vueGlobal._mapInstance = initMapFun(json.mars2d)
      vueGlobal.mapWork = window // 这句话是将当前js对象绑定赋予给index.vue内进行调用
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
      globalAlert(error ? error.message : "加载JSON出错")
    })
}
init()

// 构造地图主方法【必须】
function globalInitMap(options) {
  if (window.mapOptions) {
    if (typeof window.mapOptions === "function") {
      options = window.mapOptions(options) || options
    } else {
      window.mapOptions = options = mars2d.Util.merge(options, window.mapOptions)
    }
  }

  // 创建三维地球场景
  return new mars2d.Map("mars2dContainer", options)
}

// 调用vue的消息提示（自动消失）
function globalMsg(msg, type, ...args) {
  return vueGlobal.$message(msg, type, ...args)
}

// 调用vue的弹窗提示（手动单击确定关闭窗口）
function globalAlert(msg, title, ...args) {
  return vueGlobal.$alert(msg, title, ...args)
}

// 调用vue的右上角信息提示（可关闭）
function globalNotify(msg, disc, ...args) {
  return vueGlobal.$notify(msg, disc, ...args)
}

function showLoading(type) {
  vueGlobal.$showLoading(type)
}

function hideLoading(type) {
  vueGlobal.$hideLoading(type)
}
