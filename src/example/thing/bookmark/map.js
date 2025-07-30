import * as mars2d from "mars2d"

let map
let expImg

export const eventTarget = new mars2d.BaseClass() // 事件对象，用于抛出事件到vue中

// 初始化地图业务，生命周期钩子函数（必须），框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  expImg = new mars2d.thing.ExpImg()
  map.addThing(expImg)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}


// 添加书签
export function butAddTxtName(name) {
  // 动态的获取index
  const item = {
    name,
    view: map.getView()
  }

  expImg.expAll({
    download: false,
    calllback: function (base64) {
      item.img = base64
      // 回调
      eventTarget.fire("addImgObject", { item })
    }
  })
}
export function butAddTxtName2(name) {
  // 动态的获取index
  const item = {
    name,
    view: map.getView()
  }

  expImg.expByDraw({
    download: false,
    calllback: function (base64) {
      item.img = base64
      // 回调
      eventTarget.fire("addImgObject", { item })
    }
  })
}

// 飞向视角
export function flytoView(view) {
  map.setView(view.center, view.zoom)
}
