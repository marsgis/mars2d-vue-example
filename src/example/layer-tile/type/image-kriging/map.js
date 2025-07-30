import * as mars2d from "mars2d"
import { kriging, kriging_bounds, kriging_colors } from "./krigingConfig"
let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {}

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.setView([38.028658, 105.403119], 5)

  showHeatLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

// 显示热力图
function showHeatLayer() {
  mars2d.Util.fetchJson({
    url: "//data.mars2d.cn/file/geojson/temperature.json"
  })
    .then((geojson) => {
      const image = loadkriging(geojson.features, kriging_bounds, kriging_colors) // kriging_bounds, kriging_colors在js/temperature_data.js中定义
      const tileLayer = new mars2d.layer.ImageLayer({
        url: image,
        rectangle: {
          xmin: 73.4766,
          xmax: 135.088,
          ymin: 18.1055,
          ymax: 53.5693
        },
        alpha: 0.4
      })
      map.addLayer(tileLayer)
    })
    .catch((error) => {
      console.log("请求出错了", error)
    })
}

// 根据 克里金法 插值绘制图片
function loadkriging(tempture, bounds, colors) {
  const canvas = document.createElement("canvas")
  canvas.width = 1000
  canvas.height = 1000

  const t = []
  const x = []
  const y = []
  for (let i = 0, len = tempture.length; i < len; i++) {
    t.push(tempture[i].properties.Temperatur) // 权重值
    x.push(tempture[i].geometry.coordinates[0]) // x
    y.push(tempture[i].geometry.coordinates[1]) // y
  }
  // 1.用克里金训练一个variogram对象
  const variogram = kriging.train(t, x, y, "exponential", 0, 100)

  // 2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
  // bounds:普通的geojson格式的面的格式的coordinates。
  const grid = kriging.grid(bounds, variogram, 0.05)
  // 3.将得到的格网预测值渲染到canvas画布上
  kriging.plot(canvas, grid, [73.4766, 135.088], [18.1055, 53.5693], colors)

  const image = canvas.toDataURL("image/png")
  return image
}
