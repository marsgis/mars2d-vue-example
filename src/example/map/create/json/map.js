import * as mars2d from "mars2d"

function initMap() {
  // 读取 config.json 配置文件
  mars2d.Util.fetchJson({
    url: "config/config.json"
  })
    .then((json) => {
      console.log("读取 config.json 配置文件完成", json) // 打印测试信息

      // 创建三维地球场景
      const map = new mars2d.Map("mars2dContainer", json)

      // 打印测试信息
      console.log("mars2d的Map主对象构造完成", map)
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
      globalAlert(error && error.message, "出错了")
    })
}
