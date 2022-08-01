// poi查询按钮 控件
class PoiQueryButton extends mars2d.control.ToolButton {
  /**
   * 创建_container控件容器对象的方法，
   * 只会调用一次
   * @return {void}  无
   * @private
   */
  _mountedHook() {
    // 初始化页面
    this._initQueryUI()

    // 查询控制器
    this._gaodePOI = new mars2d.query.GaodePOI()

    // 创建矢量数据图层
    this.graphicLayer = new mars2d.layer.GraphicLayer()
    this._map.addLayer(this.graphicLayer)

    // 鼠标单击后的信息面板弹窗
    this.graphicLayer.bindPopup(function (event) {
      const item = event.attr
      if (!item) {
        return
      }
      let inHtml = `<div class="mars2d-template-titile"><a href="https://www.amap.com/detail/${item.id}"  target="_black" style="color: #ffffff; ">${item.name}</a></div><div class="mars2d-template-content" >`

      const phone = String(item.tel).trim()
      if (phone) {
        inHtml += "<div><label>电话</label>" + phone + "</div>"
      }

      const dz = String(item.address).trim()
      if (item.address) {
        inHtml += "<div><label>地址</label>" + dz + "</div>"
      }

      const fl = String(item.type).trim()
      if (item.type) {
        if (fl !== "") {
          inHtml += "<div><label>类别</label>" + fl + "</div>"
        }
      }
      inHtml += "</div>"

      return inHtml
    })
  }

  clear() {
    const ulList = this._queryResultContainer.querySelector(".searchResults")
    const gaodesousuo = this._queryResultContainer.querySelector(".gaodesousuo")
    if (ulList) {
      ulList.remove()
    }
    if (this.resultNextPages) {
      this.resultNextPages.remove()
    }
    if (gaodesousuo) {
      gaodesousuo.remove()
    }
    if (this.graphicLayer) {
      this.graphicLayer.clear()
    }
  }

  // 初始化所有相关UI
  _initQueryUI() {
    // 高度值获取
    this.parentContainer = this._map._controlCorners.bottomleft
    this._container = this.parentContainer.firstChild
    this._container.style.display = "inline-block"
    this._container.firstChild.setAttribute("title", this.options.title || "POI查询")

    // 创建控件的图标
    const image = L.DomUtil.create("img", "", this._container.firstChild)
    image.setAttribute("src", `img/icon/search_black.svg`)

    // 鼠标移入移出
    let cacheTarget
    this._container.addEventListener("mouseover", (e) => {
      // 缓存，提高效率
      if (cacheTarget === this.id) {
        return
      }
      cacheTarget = this.id

      if (this._queryInputContainer.style.display !== "block") {
        this.toolSearchNoShow("block")
        this.toolActive()
        L.DomUtil.addClass(this._container, "queryPoiButton")

        this._container.style.height = this.parentContainer.offsetHeight + 40 + "px"
        this._queryResultContainer.style.height = this.parentContainer.offsetHeight - 10 + "px"
      }
    })
    this._container.addEventListener("mouseout", (e) => {
      cacheTarget = null
      const queryVal = this._queryInputContainer.querySelector(".searchInput").value
      if (queryVal.length === 0) {
        this.clear()
        this.toolSearchNoShow("none")
        L.DomUtil.removeClass(this._container, "queryPoiButton")
        this._container.style.height = ""
      }
    })

    // input面板，在queryPoiButton下面
    this._queryInputContainer = L.DomUtil.create("div", "toolSearch")
    this._container.appendChild(this._queryInputContainer)

    // 搜寻结果，在mars3dContainer面板下面
    this._queryResultContainer = L.DomUtil.create("div", "poiButtonResult")
    this._container.appendChild(this._queryResultContainer)
    this.toolSearchNoShow("none")

    // 创建input输入框
    const textInput = L.DomUtil.create("input", "searchInput")
    textInput.type = "search"
    textInput.setAttribute("placeholder", "请输入地址...")
    this._queryInputContainer.appendChild(textInput)

    // input的单击事件
    const deleteInput = L.DomUtil.create("div", "deleteInput", this._queryInputContainer)

    this._addPElement(deleteInput, "×", () => {
      this._queryInputContainer.querySelector(".searchInput").value = ""
      this.clear()
      this.toolSearchNoShow("none")
      L.DomUtil.removeClass(this._container, "queryPoiButton")
      this._container.style.height = ""
      cacheTarget = null
    })

    // 绑定change事件
    let timetik
    textInput.addEventListener("input", () => {
      this.clear()
      clearTimeout(timetik)
      timetik = setTimeout(() => {
        const queryVal = this._queryInputContainer.querySelector(".searchInput").value
        if (queryVal.length !== 0) {
          deleteInput.style.display = "block"
          this.autoTip(queryVal)
        }
      }, 250)
    })

    // 绑定回车键
    textInput.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        clearTimeout(timetik)
        // 让change事件执行完成之后，在执行以下操作
        timetik = setTimeout(() => {
          this.clear()
          this.showPages = 1
          this.strartQueryPOI()
        }, 250)
      }
    })
  }

  toolActive() {
    this._queryInputContainer.style.display = "block"
    const searchInput = this._queryInputContainer.querySelector(".searchInput")
    searchInput.focus()
    if (document.activeElement.tagName === "INPUT" && searchInput.value === "") {
      return
    }
    this.clear()
    this.showPages = 1
    this.strartQueryPOI()
  }

  // 根据输入框内容，查询显示列表
  strartQueryPOI() {
    const text = this._queryInputContainer.querySelector(".searchInput").value
    if (text.trim().length === 0) {
      globalMsg("请输入搜索关键字！")
      return
    }
    // 输入经纬度数字时
    if (this.isLonLat(text)) {
      this.centerAtLonLat(text)
      return
    }
    this.queryTextByServer(text)
  }

  queryTextByServer(text) {
    this._gaodePOI.queryText({
      text: text,
      count: 10,
      page: this.showPages - 1,
      success: (result) => {
        const pois = result.list
        if (pois.length > 0) {
          result.list.forEach((item, index) => {
            if (!item.x || !item.y) {
              return
            }
            // 在地图上将搜寻的结果展现为矢量数据
            const graphic = new mars2d.graphic.Point({
              id: item.id,
              latlng: [item.y, item.x],
              style: {
                name: item.name,
                pixelSize: 8,
                color: "#3388ff",
                outline: true,
                outlineColor: "#ffffff",
                outlineWidth: 2,
                // 预留功能，后续支持高亮
                highlight: {
                  type: mars2d.EventType.click,
                  color: "#ff0000"
                },
                // 预留功能，后续支持文本
                label: {
                  text: item.name,
                  font_size: 20,
                  color: "rgb(240,255,255)",
                  outline: true,
                  outlineWidth: 2
                }
              },
              attr: item
            })
            this.graphicLayer.addGraphic(graphic)
          })
          this.graphicLayer.flyTo({
            radius: 2000
          })
          this.showDifferentPagesResult(result)
        } else {
          globalMsg("没有找到相关信息")
        }
      }
    })
  }

  flyTo(item) {
    const graphic = this.graphicLayer.getGraphicById(item.id)
    if (graphic === null) {
      globalMsg(item.name + " 无经纬度坐标信息！")
      return
    }
    // 预留功能，后续支持高亮操作
    /* graphic.openHighlight() */

    this._map.flyToGraphic(graphic)
  }

  // 构造查询结果的面板Html
  showDifferentPagesResult(result) {
    this._queryResultContainer.innerHTML = ""

    // 页面上显示结果li列表
    const resultDiv = document.createElement("div")
    resultDiv.className = "searchResults"

    const suggestionsList = document.createElement("ul")
    resultDiv.appendChild(suggestionsList)

    this._queryResultContainer.appendChild(resultDiv)

    result.list.forEach((item, index) => {
      const name = item.name
      if (!item.x || !item.y) {
        return
      }

      let number
      if (this.showPages > 1) {
        number = (this.showPages - 1) * 10 + index + 1
      } else {
        number = index + 1
      }
      const suggestions = document.createElement("li")
      const resultList = document.createTextNode(number + ". " + name)

      suggestionsList.appendChild(suggestions)
      suggestions.appendChild(resultList)
      suggestions.addEventListener("click", () => {
        this.flyTo(item)
      })
    })
    let allPages
    if (result.allcount < 11) {
      allPages = Math.ceil(result.allcount / 10)
    } else {
      allPages = Math.round(result.allcount / 10)
    }
    // 全部的页数 10 = result.count
    this.resultNextPages = document.createElement("div")
    this.resultNextPages.className = "resultNextPages"
    this._queryResultContainer.appendChild(this.resultNextPages)

    // 共加载条数
    this._addPElement(this.resultNextPages, "共加载了" + result.allcount + "条", null)

    // 展示的页数
    this._addPElement(this.resultNextPages, this.showPages + "/" + allPages + "页", null)

    // 首页
    this._addPElement(this.resultNextPages, "首页", () => {
      this.showPages = 1
      this.pagesClickToPages()
    })

    // 上一页
    this._addPElement(this.resultNextPages, "<", () => {
      if (this.showPages === 1) {
        globalMsg("当前已是第一页！")
        return
      }
      this.showPages--
      this.pagesClickToPages()
    })

    // 下一页
    this._addPElement(this.resultNextPages, ">", () => {
      if (this.showPages >= allPages) {
        globalMsg("当前已是最后一页！")
        return
      }
      this.showPages++
      this.pagesClickToPages() // 查询结果
    })
  }

  // 添加p元素
  _addPElement(parentElement, chilidWord, callback) {
    const allResult = document.createElement("p")
    const allResultWord = document.createTextNode(chilidWord)
    parentElement.appendChild(allResult) // 添加p元素

    allResult.appendChild(allResultWord) // 给p元素添加内容

    allResult.addEventListener("click", callback)
  }

  // 点击上、下一页，清空当前页
  pagesClickToPages() {
    if (this.graphicLayer) {
      this.graphicLayer.clear()
    }
    this.strartQueryPOI()
  }

  autoTip(text) {
    this._gaodePOI.autoTip({
      text: text,
      success: (result) => {
        const pois = result.list
        const gaodesousuo = this._queryResultContainer.querySelector(".gaodesousuo")
        if (gaodesousuo) {
          gaodesousuo.remove()
        }
        const resultDiv = document.createElement("div")
        resultDiv.className = "searchResults gaodesousuo"

        const suggestionsList = document.createElement("ul")
        resultDiv.appendChild(suggestionsList)

        this._queryResultContainer.appendChild(resultDiv)

        if (pois.length > 0) {
          result.list.forEach((item) => {
            const name = item.name

            const suggestions = document.createElement("li")
            const resultList = document.createTextNode(name)
            const fa_search = document.createElement("img")
            fa_search.src = "img/icon/search.svg"
            suggestions.appendChild(fa_search)

            suggestionsList.appendChild(suggestions)
            suggestions.appendChild(resultList)
            suggestions.addEventListener("click", () => {
              this._queryInputContainer.querySelector(".searchInput").value = name

              this.showPages = 1
              this.queryTextByServer(name)
            })
          })
        } else {
          resultDiv.style.display = "none"
        }
      }
    })
  }

  toolSearchNoShow(val) {
    this._queryInputContainer.style.display = val
    this._queryResultContainer.style.display = val
  }

  //= ===========================坐标定位处理====================================
  isLonLat(text) {
    const reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]*)?)|180(([.][0]*)?)),-?((0|[1-8]?[0-9]?)(([.][0-9]*)?)|90(([.][0]*)?))$/
    return reg.test(text)
  }

  centerAtLonLat(text) {
    const arr = text.split(",")
    if (arr.length !== 2) {
      return
    }

    this._queryResultContainer.style.display = "none"
    const jd = Number(arr[0])
    const wd = Number(arr[1])
    if (isNaN(jd) || isNaN(wd)) {
      return
    }

    this._map.setCameraView({ lng: jd, lat: wd, minz: 2500 })

    // 添加实体

    const graphic = new mars2d.graphic.Point({
      latlng: [wd, jd],
      style: {
        color: "#3388ff",
        pixelSize: 8,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
    this.graphicLayer.addGraphic(graphic)

    graphic.bindPopup(`<div class="mars2d-template-titile">坐标定位</div>
              <div class="mars2d-template-content" >
                <div><label>经度</label> ${jd}</div>
                <div><label>纬度</label>${wd}</div>
              </div>`)

    setTimeout(() => {
      graphic.openPopup()
    }, 3000)
  }
}
