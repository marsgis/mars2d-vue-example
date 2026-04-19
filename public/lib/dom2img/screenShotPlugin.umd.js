(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.screenShotPlugin = factory());
})(this, (function () { 'use strict';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var __assign = function () {
    __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  var toolbar = [
      {
          id: 1,
          title: "square"
      },
      {
          id: 2,
          title: "round"
      },
      {
          id: 3,
          title: "right-top"
      },
      {
          id: 4,
          title: "brush"
      },
      {
          id: 5,
          title: "mosaicPen"
      },
      {
          id: 6,
          title: "text"
      },
      {
          id: 7,
          title: "separateLine"
      },
      {
          id: 8,
          title: "save"
      },
      {
          id: 9,
          title: "undo"
      },
      {
          id: 10,
          title: "close"
      },
      {
          id: 11,
          title: "confirm"
      }
  ];

  function getSelectedClassName(index) {
      var className = "";
      switch (index) {
          case 1:
              className = "square-active";
              break;
          case 2:
              className = "round-active";
              break;
          case 3:
              className = "right-top-active";
              break;
          case 4:
              className = "brush-active";
              break;
          case 5:
              className = "mosaicPen-active";
              break;
          case 6:
              className = "text-active";
      }
      return className;
  }

  /**
   * 获取画笔选项对应的选中时的class名
   * @param itemName
   */
  function getBrushSelectedName(itemName) {
      var className = "";
      switch (itemName) {
          case 1:
              className = "brush-small-active";
              break;
          case 2:
              className = "brush-medium-active";
              break;
          case 3:
              className = "brush-big-active";
              break;
      }
      return className;
  }

  /**
   * 为当前点击项添加选中时的class，移除其兄弟元素选中时的class
   * @param mouseEvent 需要进行操作的元素
   * @param index 当前点击项
   * @param isOption 是否为画笔选项
   */
  function setSelectedClassName(mouseEvent, index, isOption) {
      // 获取当前点击项选中时的class名
      var className = getSelectedClassName(index);
      if (isOption) {
          // 获取画笔选项选中时的对应的class
          className = getBrushSelectedName(index);
      }
      // 解决event 在火狐和Safari浏览上的兼容性问题
      var path = mouseEvent.path || (mouseEvent.composedPath && mouseEvent.composedPath());
      // 获取div下的所有子元素
      var nodes = path[1].children;
      for (var i = 0; i < nodes.length; i++) {
          var item = nodes[i];
          var itemId = Number(item.getAttribute("data-id"));
          // 自定义的图标则重置其选中状态
          if (itemId > 100 && index !== Number.MAX_VALUE) {
              console.log("reset icon");
              var icon = item.getAttribute("data-icon");
              item.style.backgroundImage = "url(".concat(icon, ")");
          }
          // 如果工具栏中已经有选中的class则将其移除
          if (item.className.includes("active")) {
              item.classList.remove(item.classList[2]);
          }
      }
      if (className) {
          // 给当前点击项添加选中时的class
          mouseEvent.target.className += " " + className;
      }
  }

  /**
   * 计算截图工具栏画笔选项三角形角标位置
   * @param index
   */
  function calculateOptionIcoPosition(index) {
      switch (index) {
          case 1:
              return 24 - 8;
          case 2:
              return 24 * 2 + 8;
          case 3:
              return 24 * 4 - 6;
          case 4:
              return 24 * 5 + 8;
          case 5:
              return 24 * 7 + 6;
          case 6:
              return 24 * 9 - 6;
          default:
              return 0;
      }
  }

  /**
   * 取出一条历史记录
   */
  function takeOutHistory() {
      var _a;
      var data = new InitData();
      data.popHistory();
      var screenShortCanvas = (_a = data.getScreenShotContainer()) === null || _a === void 0 ? void 0 : _a.getContext("2d");
      if (screenShortCanvas != null) {
          if (data.getHistory().length > 0) {
              screenShortCanvas.putImageData(data.getHistory()[data.getHistory().length - 1]["data"], 0, 0);
          }
      }
      data.setUndoClickNum(data.getUndoClickNum() + 1);
      // 历史记录已取完，禁用撤回按钮点击
      if (data.getHistory().length - 1 <= 0) {
          data.setUndoClickNum(0);
          data.setUndoStatus(false);
      }
  }

  /**
   * 获取截图工具栏相对于视口的位置
   */
  function getToolRelativePosition(left, top, dom) {
      if (dom === void 0) { dom = document.body; }
      var rect = dom.getBoundingClientRect();
      return { left: left || Math.abs(rect.left), top: top || Math.abs(rect.top) };
  }

  var enableWebRtc = true;
  // electron环境下使用webrtc需要自己传入屏幕流
  var screenFlow = null;
  // 数据初始化标识
  var initStatus$1 = false;
  // 画布宽高
  var canvasWidth = 0;
  var canvasHeight = 0;
  // 展示截屏图片至容器
  var showScreenData = false;
  var screenShotDom = null;
  var destroyContainer = true;
  // 蒙层颜色
  var maskColor = { r: 0, g: 0, b: 0, a: 0.6 };
  var writeBase64 = true;
  var cutBoxBdColor = "#2CABFF";
  // 最大可撤销次数
  var maxUndoNum = 15;
  // 是否使用等比例箭头
  var useRatioArrow = false;
  // 开启图片自适应
  var imgAutoFit = false;
  // 自定义传入图片尺寸
  var useCustomImgSize = false;
  var customImgSize = { w: 0, h: 0 };
  // 调用者定义的工具栏数据
  var userToolbar = [];
  var h2cCrossImgLoadErrFn = null;
  var saveCallback = null;
  var saveImgTitle = null;
  var canvasEvents = null;
  var PlugInParameters = /** @class */ (function () {
      function PlugInParameters() {
          // 标识为true时则初始化数据
          if (initStatus$1) {
              enableWebRtc = true;
              canvasWidth = 0;
              canvasHeight = 0;
              cutBoxBdColor = "#2CABFF";
              showScreenData = false;
              writeBase64 = true;
              screenFlow = null;
              // 初始化完成设置其值为false
              initStatus$1 = false;
              screenShotDom = null;
              saveCallback = null;
              maxUndoNum = 15;
              useRatioArrow = false;
              imgAutoFit = false;
              saveImgTitle = null;
              destroyContainer = true;
              userToolbar = [];
              h2cCrossImgLoadErrFn = null;
          }
      }
      // 设置数据初始化标识
      PlugInParameters.prototype.setInitStatus = function (status) {
          initStatus$1 = status;
      };
      // 获取数据初始化标识
      PlugInParameters.prototype.getInitStatus = function () {
          return initStatus$1;
      };
      // 获取webrtc启用状态
      PlugInParameters.prototype.getWebRtcStatus = function () {
          return enableWebRtc;
      };
      // 设置webrtc启用状态
      PlugInParameters.prototype.setWebRtcStatus = function (status) {
          enableWebRtc = status;
      };
      PlugInParameters.prototype.setScreenShotDom = function (dom) {
          screenShotDom = dom;
      };
      PlugInParameters.prototype.getCutBoxBdColor = function () {
          return cutBoxBdColor;
      };
      PlugInParameters.prototype.setCutBoxBdColor = function (color) {
          cutBoxBdColor = color;
      };
      PlugInParameters.prototype.getScreenShotDom = function () {
          return screenShotDom;
      };
      // 获取屏幕流
      PlugInParameters.prototype.getScreenFlow = function () {
          return screenFlow;
      };
      // 设置屏幕流
      PlugInParameters.prototype.setScreenFlow = function (stream) {
          screenFlow = stream;
      };
      // 获取画布宽高
      PlugInParameters.prototype.getCanvasSize = function () {
          return { canvasWidth: canvasWidth, canvasHeight: canvasHeight };
      };
      // 设置画布宽高
      PlugInParameters.prototype.setCanvasSize = function (width, height) {
          canvasWidth = width;
          canvasHeight = height;
      };
      // 获取展示图片至容器的状态
      PlugInParameters.prototype.getShowScreenDataStatus = function () {
          return showScreenData;
      };
      // 设置展示图片至容器的状态
      PlugInParameters.prototype.setShowScreenDataStatus = function (status) {
          showScreenData = status;
      };
      // 设置蒙层颜色
      PlugInParameters.prototype.setMaskColor = function (color) {
          maskColor.r = color.r;
          maskColor.g = color.g;
          maskColor.b = color.b;
          maskColor.a = color.a;
      };
      PlugInParameters.prototype.getMaskColor = function () {
          return maskColor;
      };
      // 设置截图数据的写入状态
      PlugInParameters.prototype.setWriteImgState = function (state) {
          writeBase64 = state;
      };
      PlugInParameters.prototype.getWriteImgState = function () {
          return writeBase64;
      };
      PlugInParameters.prototype.setSaveCallback = function (saveFn) {
          saveCallback = saveFn;
      };
      PlugInParameters.prototype.getSaveCallback = function () {
          return saveCallback;
      };
      PlugInParameters.prototype.setMaxUndoNum = function (num) {
          maxUndoNum = num;
      };
      PlugInParameters.prototype.getMaxUndoNum = function () {
          return maxUndoNum;
      };
      PlugInParameters.prototype.setRatioArrow = function (state) {
          useRatioArrow = state;
      };
      PlugInParameters.prototype.getRatioArrow = function () {
          return useRatioArrow;
      };
      PlugInParameters.prototype.setImgAutoFit = function (state) {
          imgAutoFit = state;
      };
      PlugInParameters.prototype.getImgAutoFit = function () {
          return imgAutoFit;
      };
      PlugInParameters.prototype.setUseCustomImgSize = function (state, sizeInfo) {
          if (state && sizeInfo) {
              useCustomImgSize = true;
              customImgSize = sizeInfo;
          }
      };
      PlugInParameters.prototype.getCustomImgSize = function () {
          return {
              useCustomImgSize: useCustomImgSize,
              customImgSize: customImgSize
          };
      };
      PlugInParameters.prototype.setSaveImgTitle = function (title) {
          saveImgTitle = title;
      };
      PlugInParameters.prototype.getSaveImgTitle = function () {
          return saveImgTitle;
      };
      PlugInParameters.prototype.setDestroyContainerState = function (state) {
          destroyContainer = state;
      };
      PlugInParameters.prototype.getDestroyContainerState = function () {
          return destroyContainer;
      };
      PlugInParameters.prototype.setUserToolbar = function (toolbar) {
          var toolbarData = [];
          for (var i = 0; i < toolbar.length; i++) {
              var item = toolbar[i];
              // 自定义工具栏id从100开始
              toolbarData.push(__assign(__assign({}, item), { id: 100 + (i + 1) }));
          }
          userToolbar = toolbarData;
      };
      PlugInParameters.prototype.getUserToolbar = function () {
          return userToolbar;
      };
      PlugInParameters.prototype.setH2cCrossImgLoadErrFn = function (fn) {
          h2cCrossImgLoadErrFn = fn;
      };
      PlugInParameters.prototype.getH2cCrossImgLoadErrFn = function () {
          return h2cCrossImgLoadErrFn;
      };
      PlugInParameters.prototype.setCanvasEvents = function (event) {
          canvasEvents = event;
      };
      PlugInParameters.prototype.getCanvasEvents = function () {
          return canvasEvents;
      };
      return PlugInParameters;
  }());

  // 裁剪框修剪状态
  var draggingTrim = false;
  // 裁剪框拖拽状态
  var dragging = false;
  // 截图工具栏点击状态
  var toolClickStatus = false;
  // 当前选择的颜色
  var selectedColor = "#F53340";
  // 当前点击的工具栏名称
  var toolName = "";
  // 当前点击的工具栏id
  var toolId = null;
  //  当前选择的画笔大小
  var penSize = 2;
  // 马赛克工具的笔触大小
  var mosaicPenSize = 10;
  // 裁剪框顶点边框直径大小
  var borderSize = 10;
  // 撤销点击次数
  var undoClickNum = 0;
  // 画笔历史记录
  var history = [];
  // 文本输入工具栏点击状态
  var textClickStatus = false;
  // 工具栏超出截图容器状态
  var toolPositionStatus = false;
  // 裁剪框位置参数
  var cutOutBoxPosition = {
      startX: 0,
      startY: 0,
      width: 0,
      height: 0
  };
  // 获取截图容器dom
  var screenShotController = null;
  // 获取截图工具栏容器dom
  var toolController = null;
  var cutBoxSizeContainer = null;
  // 获取文本输入区域dom
  var textInputController = null;
  // 截图工具栏画笔选择dom
  var optionIcoController = null;
  // 截图工具栏文字大小选择dom
  var optionTextSizeController = null;
  var brushSelectionController = null;
  var textSizeContainer = null;
  var fontSize = 17;
  var optionController = null;
  var colorSelectController = null;
  var rightPanel = null;
  var colorSelectPanel = null;
  var undoController = null;
  // 屏幕截图容器
  var screenShotImageController = null;
  // 截图容器是否可滚动
  var noScrollStatus = false;
  // 数据初始化标识
  var initStatus = false;
  // 当前工具栏内选中的工具
  var activeTool = "";
  var textInfo;
  // 是否需要还原页面的滚动条状态
  var resetScrollbarState = false;
  // 当前是否处于文本编辑状态
  var textEditState = false;
  var InitData = /** @class */ (function () {
      function InitData() {
          // 标识为true时则初始化数据
          if (initStatus) {
              // 初始化完成设置其值为false
              initStatus = false;
              screenShotController = null;
              dragging = false;
              toolController = null;
              textInputController = null;
              optionController = null;
              optionIcoController = null;
              optionTextSizeController = null;
              brushSelectionController = null;
              textSizeContainer = null;
              cutBoxSizeContainer = null;
              cutOutBoxPosition = {
                  startX: 0,
                  startY: 0,
                  width: 0,
                  height: 0
              };
              toolClickStatus = false;
              resetScrollbarState = false;
              textEditState = false;
              toolPositionStatus = false;
              selectedColor = "#F53340";
              toolName = "";
              toolId = null;
              penSize = 2;
              fontSize = 17;
              mosaicPenSize = 10;
              history = [];
              undoClickNum = 0;
              colorSelectController = null;
              rightPanel = null;
              colorSelectPanel = null;
              undoController = null;
          }
      }
      // 设置数据初始化标识
      InitData.prototype.setInitStatus = function (status) {
          initStatus = status;
      };
      // 设置截图容器宽高
      InitData.prototype.setScreenShotInfo = function (width, height) {
          this.getScreenShotContainer();
          if (screenShotController == null)
              return;
          // 增加截图锁屏
          if (noScrollStatus) {
              document.body.classList.add("__screenshot-lock-scroll");
          }
          screenShotController.width = width;
          screenShotController.height = height;
      };
      // 设置截图容器位置
      InitData.prototype.setScreenShotPosition = function (left, top) {
          this.getScreenShotContainer();
          if (screenShotController == null)
              return;
          var _a = getToolRelativePosition(left, top), rLeft = _a.left, rTop = _a.top;
          screenShotController.style.left = rLeft + "px";
          screenShotController.style.top = rTop + "px";
      };
      // 显示截图区域容器
      InitData.prototype.showScreenShotPanel = function () {
          this.getScreenShotContainer();
          if (screenShotController == null)
              return;
          screenShotController.style.display = "block";
      };
      // 获取截图容器dom
      InitData.prototype.getScreenShotContainer = function () {
          screenShotController = document.getElementById("screenShotContainer");
          return screenShotController;
      };
      // 获取截图工具栏dom
      InitData.prototype.getToolController = function () {
          toolController = document.getElementById("toolPanel");
          return toolController;
      };
      // 获取裁剪框尺寸显示容器
      InitData.prototype.getCutBoxSizeContainer = function () {
          cutBoxSizeContainer = document.getElementById("cutBoxSizePanel");
          return cutBoxSizeContainer;
      };
      // 获取文本输入区域dom
      InitData.prototype.getTextInputController = function () {
          textInputController = document.getElementById("textInputPanel");
          return textInputController;
      };
      // 获取文本输入工具栏展示状态
      InitData.prototype.getTextStatus = function () {
          return textClickStatus;
      };
      // 获取屏幕截图容器
      InitData.prototype.getScreenShotImageController = function () {
          return screenShotImageController;
      };
      // 设置屏幕截图
      InitData.prototype.setScreenShotImageController = function (imageController) {
          screenShotImageController = imageController;
      };
      // 设置截图工具栏展示状态
      InitData.prototype.setToolStatus = function (status) {
          toolController = this.getToolController();
          if (status) {
              toolController.style.display = "block";
              return;
          }
          toolController.style.display = "none";
      };
      // 设置裁剪框尺寸显示容器展示状态
      InitData.prototype.setCutBoxSizeStatus = function (status) {
          if (cutBoxSizeContainer == null)
              return;
          if (status) {
              cutBoxSizeContainer.style.display = "flex";
              return;
          }
          cutBoxSizeContainer.style.display = "none";
      };
      // 设置裁剪框尺寸显示容器位置
      InitData.prototype.setCutBoxSizePosition = function (x, y) {
          if (cutBoxSizeContainer == null)
              return;
          var _a = getToolRelativePosition(x, y), left = _a.left, top = _a.top;
          cutBoxSizeContainer.style.left = left + "px";
          var sscTop = 0;
          if (screenShotController) {
              sscTop = parseInt(screenShotController.style.top);
          }
          cutBoxSizeContainer.style.top = top + sscTop + "px";
      };
      InitData.prototype.setTextEditState = function (state) {
          textEditState = state;
      };
      InitData.prototype.getTextEditState = function () {
          return textEditState;
      };
      // 设置裁剪框尺寸
      InitData.prototype.setCutBoxSize = function (width, height) {
          if (cutBoxSizeContainer == null)
              return;
          // width和height保留整数
          width = Math.floor(width);
          height = Math.floor(height);
          var childrenPanel = cutBoxSizeContainer.childNodes;
          // p标签已存在直接更改文本值即可
          if (childrenPanel.length > 0) {
              childrenPanel[0].innerText = "".concat(width, " * ").concat(height);
              return;
          }
          // 不存在则渲染
          var textPanel = document.createElement("p");
          textPanel.innerText = "".concat(width, " * ").concat(height);
          cutBoxSizeContainer.appendChild(textPanel);
      };
      // 设置文本输入工具栏展示状态
      InitData.prototype.setTextStatus = function (status) {
          textInputController = this.getTextInputController();
          if (textInputController == null)
              return;
          if (status) {
              // 显示文本输入工具
              textInputController.style.display = "block";
              return;
          }
          textInputController.style.display = "none";
      };
      // 设置截图工具位置信息
      InitData.prototype.setToolInfo = function (left, top) {
          toolController = document.getElementById("toolPanel");
          var _a = getToolRelativePosition(left, top), rLeft = _a.left, rTop = _a.top;
          toolController.style.left = rLeft + "px";
          var sscTop = 0;
          if (screenShotController) {
              sscTop = parseInt(screenShotController.style.top);
          }
          toolController.style.top = rTop + sscTop + "px";
      };
      // 获取截图工具栏点击状态
      InitData.prototype.getToolClickStatus = function () {
          return toolClickStatus;
      };
      // 设置截图工具栏点击状态
      InitData.prototype.setToolClickStatus = function (status) {
          toolClickStatus = status;
      };
      InitData.prototype.setResetScrollbarState = function (state) {
          resetScrollbarState = state;
      };
      InitData.prototype.getResetScrollbarState = function () {
          return resetScrollbarState;
      };
      // 获取裁剪框位置信息
      InitData.prototype.getCutOutBoxPosition = function () {
          return cutOutBoxPosition;
      };
      InitData.prototype.getDragging = function () {
          return dragging;
      };
      InitData.prototype.setDragging = function (status) {
          dragging = status;
      };
      InitData.prototype.getDraggingTrim = function () {
          return draggingTrim;
      };
      InitData.prototype.getToolPositionStatus = function () {
          return toolPositionStatus;
      };
      InitData.prototype.setToolPositionStatus = function (status) {
          toolPositionStatus = status;
      };
      InitData.prototype.setDraggingTrim = function (status) {
          draggingTrim = status;
      };
      // 设置裁剪框位置信息
      InitData.prototype.setCutOutBoxPosition = function (mouseX, mouseY, width, height) {
          cutOutBoxPosition.startX = mouseX;
          cutOutBoxPosition.startY = mouseY;
          cutOutBoxPosition.width = width;
          cutOutBoxPosition.height = height;
      };
      InitData.prototype.setFontSize = function (size) {
          fontSize = size;
      };
      // 设置截图工具栏画笔选择工具展示状态
      InitData.prototype.setOptionStatus = function (status) {
          // 获取截图工具栏与三角形角标容器
          optionIcoController = this.getOptionIcoController();
          optionController = this.getOptionController();
          if (optionIcoController == null || optionController == null)
              return;
          if (status) {
              optionIcoController.style.display = "block";
              optionController.style.display = "block";
              return;
          }
          optionIcoController.style.display = "none";
          optionController.style.display = "none";
      };
      InitData.prototype.getFontSize = function () {
          return fontSize;
      };
      // 设置截图工具栏文字大小下拉框选项选择工具展示状态
      InitData.prototype.setTextSizeOptionStatus = function (status) {
          optionTextSizeController = this.getOptionTextSizeController();
          if (optionTextSizeController == null)
              return;
          if (status) {
              optionTextSizeController.style.display = "flex";
              return;
          }
          optionTextSizeController.style.display = "none";
      };
      InitData.prototype.setTextSizePanelStatus = function (status) {
          textSizeContainer = this.getTextSizeContainer();
          if (textSizeContainer == null)
              return;
          if (status) {
              console.log("显示");
              textSizeContainer.style.display = "flex";
              return;
          }
          textSizeContainer.style.display = "none";
      };
      InitData.prototype.setBrushSelectionStatus = function (status) {
          brushSelectionController = this.getBrushSelectionController();
          if (brushSelectionController == null)
              return;
          if (status) {
              brushSelectionController.style.display = "block";
              return;
          }
          brushSelectionController.style.display = "none";
      };
      // 隐藏画笔工具栏三角形角标
      InitData.prototype.hiddenOptionIcoStatus = function () {
          optionIcoController = this.getOptionIcoController();
          if (optionIcoController == null)
              return;
          optionIcoController.style.display = "none";
      };
      // 获取截图工具栏画笔选择工具dom
      InitData.prototype.getOptionIcoController = function () {
          optionIcoController = document.getElementById("optionIcoController");
          return optionIcoController;
      };
      InitData.prototype.getTextSizeContainer = function () {
          textSizeContainer = document.getElementById("textSizePanel");
          return textSizeContainer;
      };
      InitData.prototype.getOptionTextSizeController = function () {
          optionTextSizeController = document.getElementById("textSelectPanel");
          return optionTextSizeController;
      };
      InitData.prototype.getBrushSelectionController = function () {
          brushSelectionController = document.getElementById("brushSelectPanel");
          return brushSelectionController;
      };
      InitData.prototype.getOptionController = function () {
          optionController = document.getElementById("optionPanel");
          return optionController;
      };
      // 设置画笔选择工具栏位置
      InitData.prototype.setOptionPosition = function (position) {
          // 获取截图工具栏与三角形角标容器
          optionIcoController = this.getOptionIcoController();
          optionController = this.getOptionController();
          if (optionIcoController == null || optionController == null)
              return;
          // 修改位置
          var toolPosition = this.getToolPosition();
          if (toolPosition == null)
              return;
          var icoLeft = toolPosition.left + position + "px";
          var icoTop = toolPosition.top + 44 + "px";
          var optionLeft = toolPosition.left + "px";
          var optionTop = toolPosition.top + 44 + 6 + "px";
          optionIcoController.style.left = icoLeft;
          optionIcoController.style.top = icoTop;
          optionController.style.left = optionLeft;
          optionController.style.top = optionTop;
      };
      // 获取工具栏位置
      InitData.prototype.getToolPosition = function () {
          toolController = this.getToolController();
          if (toolController == null)
              return;
          return {
              left: toolController.offsetLeft,
              top: toolController.offsetTop
          };
      };
      // 获取/设置当前选择的颜色
      InitData.prototype.getSelectedColor = function () {
          return selectedColor;
      };
      InitData.prototype.setSelectedColor = function (color) {
          selectedColor = color;
          colorSelectPanel = this.getColorSelectPanel();
          if (colorSelectPanel == null)
              return;
          colorSelectPanel.style.backgroundColor = selectedColor;
      };
      InitData.prototype.getColorSelectPanel = function () {
          colorSelectPanel = document.getElementById("colorSelectPanel");
          return colorSelectPanel;
      };
      // 获取/设置当前点击的工具栏条目名称
      InitData.prototype.getToolName = function () {
          return toolName;
      };
      InitData.prototype.setToolName = function (itemName) {
          toolName = itemName;
      };
      InitData.prototype.getToolId = function () {
          return toolId;
      };
      InitData.prototype.setToolId = function (id) {
          toolId = id;
      };
      // 获取/设置当前画笔大小
      InitData.prototype.getPenSize = function () {
          return penSize;
      };
      InitData.prototype.setPenSize = function (size) {
          penSize = size;
      };
      InitData.prototype.getMosaicPenSize = function () {
          return mosaicPenSize;
      };
      InitData.prototype.setMosaicPenSize = function (size) {
          mosaicPenSize = size;
      };
      InitData.prototype.getBorderSize = function () {
          return borderSize;
      };
      InitData.prototype.getHistory = function () {
          return history;
      };
      InitData.prototype.shiftHistory = function () {
          return history.shift();
      };
      InitData.prototype.popHistory = function () {
          return history.pop();
      };
      InitData.prototype.pushHistory = function (item) {
          history.push(item);
      };
      InitData.prototype.getUndoClickNum = function () {
          return undoClickNum;
      };
      InitData.prototype.setUndoClickNum = function (clickNumber) {
          undoClickNum = clickNumber;
      };
      InitData.prototype.getColorPanel = function () {
          colorSelectController = document.getElementById("colorPanel");
          return colorSelectController;
      };
      InitData.prototype.setColorPanelStatus = function (status) {
          colorSelectController = this.getColorPanel();
          if (colorSelectController == null)
              return;
          if (status) {
              colorSelectController.style.display = "flex";
              return;
          }
          colorSelectController.style.display = "none";
      };
      InitData.prototype.getNoScrollStatus = function () {
          return noScrollStatus;
      };
      InitData.prototype.setNoScrollStatus = function (status) {
          if (status != null) {
              noScrollStatus = status;
          }
      };
      InitData.prototype.setActiveToolName = function (toolName) {
          activeTool = toolName;
      };
      InitData.prototype.getActiveToolName = function () {
          return activeTool;
      };
      InitData.prototype.setTextInfo = function (info) {
          textInfo = info;
      };
      InitData.prototype.getTextInfo = function () {
          return textInfo;
      };
      InitData.prototype.getRightPanel = function () {
          rightPanel = document.getElementById("rightPanel");
          return rightPanel;
      };
      InitData.prototype.setRightPanel = function (status) {
          rightPanel = this.getRightPanel();
          if (rightPanel == null)
              return;
          if (status) {
              rightPanel.style.display = "flex";
              return;
          }
          rightPanel.style.display = "none";
      };
      InitData.prototype.setUndoStatus = function (status) {
          undoController = this.getUndoController();
          if (undoController == null)
              return;
          if (status) {
              // 启用撤销按钮
              undoController.classList.add("undo");
              undoController.classList.remove("undo-disabled");
              undoController.addEventListener("click", this.cancelEvent);
              return;
          }
          // 禁用撤销按钮
          undoController.classList.add("undo-disabled");
          undoController.classList.remove("undo");
          undoController.removeEventListener("click", this.cancelEvent);
      };
      InitData.prototype.cancelEvent = function () {
          takeOutHistory();
      };
      InitData.prototype.getUndoController = function () {
          undoController = document.getElementById("undoPanel");
          return undoController;
      };
      // 销毁截图容器
      InitData.prototype.destroyDOM = function () {
          if (screenShotController == null ||
              toolController == null ||
              optionIcoController == null ||
              optionController == null ||
              textInputController == null ||
              cutBoxSizeContainer == null)
              return;
          var plugInParameters = new PlugInParameters();
          // 销毁dom
          if (noScrollStatus) {
              document.body.classList.remove("__screenshot-lock-scroll");
          }
          document.body.removeChild(screenShotController);
          document.body.removeChild(toolController);
          document.body.removeChild(optionIcoController);
          document.body.removeChild(optionController);
          document.body.removeChild(textInputController);
          document.body.removeChild(cutBoxSizeContainer);
          if (document.body.classList.contains("no-cursor")) {
              document.body.classList.remove("no-cursor");
          }
          if (resetScrollbarState) {
              // 还原滚动条状态
              document.documentElement.classList.remove("hidden-screen-shot-scroll");
              document.body.classList.remove("hidden-screen-shot-scroll");
          }
          // 重置插件全局参数状态
          plugInParameters.setInitStatus(true);
      };
      return InitData;
  }());

  // 获取canvas上下文对象，对高分屏进行修复
  function getCanvas2dCtx(canvas, width, height) {
      // 获取设备像素比
      var dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      var ctx = canvas.getContext("2d");
      // 对画布进行缩放处理
      if (ctx) {
          ctx.scale(dpr, dpr);
      }
      return ctx;
  }

  function saveCanvasToImage(context, startX, startY, width, height) {
      var plugInParameters = new PlugInParameters();
      // 获取设备像素比
      var dpr = window.devicePixelRatio || 1;
      // 获取裁剪框区域图片信息
      // 获取裁剪框区域图片信息
      var img = context.getImageData(startX * dpr, startY * dpr, width * dpr, height * dpr);
      // 创建canvas标签，用于存放裁剪区域的图片
      var canvas = document.createElement("canvas");
      // 获取裁剪框区域画布
      var imgContext = getCanvas2dCtx(canvas, width, height);
      if (imgContext) {
          // 将图片放进裁剪框内
          imgContext.putImageData(img, 0, 0);
          var a = document.createElement("a");
          // 获取图片
          a.href = canvas.toDataURL("png");
          // 获取用户传入的文件名
          var imgName = (plugInParameters === null || plugInParameters === void 0 ? void 0 : plugInParameters.getSaveImgTitle()) || new Date().getTime();
          // 下载图片
          a.download = "".concat(imgName, ".png");
          a.click();
      }
  }

  /**
   * 将指定区域的canvas转换为base64格式的图片
   */
  function saveCanvasToBase64(context, startX, startY, width, height, quality, writeBase64) {
      if (quality === void 0) { quality = 0.75; }
      if (writeBase64 === void 0) { writeBase64 = true; }
      // 获取设备像素比
      var dpr = window.devicePixelRatio || 1;
      // 获取裁剪框区域图片信息
      var img = context.getImageData(startX * dpr, startY * dpr, width * dpr, height * dpr);
      // 创建canvas标签，用于存放裁剪区域的图片
      var canvas = document.createElement("canvas");
      // 获取裁剪框区域画布
      var imgContext = getCanvas2dCtx(canvas, width, height);
      if (imgContext) {
          // 将图片放进canvas中
          imgContext.putImageData(img, 0, 0);
          if (writeBase64) {
              // 将图片自动添加至剪贴板中
              canvas === null || canvas === void 0 ? void 0 : canvas.toBlob(function (blob) {
                  var _a;
                  var _b;
                  if (blob == null)
                      return;
                  var Clipboard = window.ClipboardItem;
                  // 浏览器不支持Clipboard
                  if (Clipboard == null)
                      return canvas.toDataURL("png");
                  var clipboardItem = new Clipboard((_a = {},
                      _a[blob.type] = blob,
                      _a));
                  (_b = navigator.clipboard) === null || _b === void 0 ? void 0 : _b.write([clipboardItem]).then(function () {
                      return "写入成功";
                  });
              }, "image/png", quality);
          }
          return canvas.toDataURL("png");
      }
      return "";
  }

  /**
   * 将指定区域的canvas转为图片
   */
  function getCanvasImgData(isSave) {
      var _a;
      var data = new InitData();
      var plugInParameters = new PlugInParameters();
      var screenShotCanvas = (_a = data.getScreenShotContainer()) === null || _a === void 0 ? void 0 : _a.getContext("2d");
      // 获取裁剪区域位置信息
      var _b = data.getCutOutBoxPosition(), startX = _b.startX, startY = _b.startY, width = _b.width, height = _b.height;
      var base64 = "";
      if (screenShotCanvas) {
          if (isSave) {
              // 将canvas转为图片
              saveCanvasToImage(screenShotCanvas, startX, startY, width, height);
          }
          else {
              // 将canvas转为base64
              base64 = saveCanvasToBase64(screenShotCanvas, startX, startY, width, height, 0.75, plugInParameters.getWriteImgState());
          }
      }
      return base64;
  }

  /**
   * 绘制裁剪框
   * @param mouseX 鼠标x轴坐标
   * @param mouseY 鼠标y轴坐标
   * @param width 裁剪框宽度
   * @param height 裁剪框高度
   * @param context 需要进行绘制的canvas画布
   * @param borderSize 边框节点直径
   * @param controller 需要进行操作的canvas容器
   * @param imageController 图片canvas容器
   * @param drawBorders
   * @private
   */
  function drawCutOutBox(mouseX, mouseY, width, height, context, borderSize, controller, imageController, drawBorders) {
      if (drawBorders === void 0) { drawBorders = true; }
      // 获取画布宽高
      var canvasWidth = controller === null || controller === void 0 ? void 0 : controller.width;
      var canvasHeight = controller === null || controller === void 0 ? void 0 : controller.height;
      var dpr = window.devicePixelRatio || 1;
      var data = new PlugInParameters();
      // 画布、图片不存在则return
      if (!canvasWidth || !canvasHeight || !imageController || !controller)
          return;
      // 清除画布
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      width = width != 0 ? width : 5;
      height = height != 0 ? height : 5;
      // 绘制蒙层
      context.save();
      var maskColor = data.getMaskColor();
      context.fillStyle = "rgba(0, 0, 0, .6)";
      if (maskColor) {
          context.fillStyle = "rgba(".concat(maskColor.r, ", ").concat(maskColor.g, ", ").concat(maskColor.b, ", ").concat(maskColor.a, ")");
      }
      context.fillRect(0, 0, canvasWidth, canvasHeight);
      // 将蒙层凿开
      context.globalCompositeOperation = "source-atop";
      // 裁剪选择框
      context.clearRect(mouseX, mouseY, width, height);
      // 绘制8个边框像素点并保存坐标信息以及事件参数
      context.globalCompositeOperation = "source-over";
      context.fillStyle = data.getCutBoxBdColor();
      // 是否绘制裁剪框的8个像素点
      if (drawBorders) {
          // 像素点大小
          var size = borderSize;
          // 绘制像素点
          context.fillRect(mouseX - size / 2, mouseY - size / 2, size, size);
          context.fillRect(mouseX - size / 2 + width / 2, mouseY - size / 2, size, size);
          context.fillRect(mouseX - size / 2 + width, mouseY - size / 2, size, size);
          context.fillRect(mouseX - size / 2, mouseY - size / 2 + height / 2, size, size);
          context.fillRect(mouseX - size / 2 + width, mouseY - size / 2 + height / 2, size, size);
          context.fillRect(mouseX - size / 2, mouseY - size / 2 + height, size, size);
          context.fillRect(mouseX - size / 2 + width / 2, mouseY - size / 2 + height, size, size);
          context.fillRect(mouseX - size / 2 + width, mouseY - size / 2 + height, size, size);
      }
      // 绘制结束
      context.restore();
      // 使用drawImage将图片绘制到蒙层下方
      context.save();
      context.globalCompositeOperation = "destination-over";
      // 图片尺寸使用canvas容器的css中的尺寸
      var _a = {
          imgWidth: parseInt(controller === null || controller === void 0 ? void 0 : controller.style.width),
          imgHeight: parseInt(controller === null || controller === void 0 ? void 0 : controller.style.height)
      }, imgWidth = _a.imgWidth, imgHeight = _a.imgHeight;
      // 用户有传入截图dom绘制时使用其dom的尺寸
      var screenShotDom = data.getScreenShotDom();
      if (screenShotDom != null) {
          imgWidth = screenShotDom.clientWidth;
          imgHeight = screenShotDom.clientHeight;
      }
      // 用户有传入自定义尺寸则使用
      if (data.getCustomImgSize().useCustomImgSize) {
          var _b = data.getCustomImgSize().customImgSize, w = _b.w, h = _b.h;
          imgWidth = w;
          imgHeight = h;
      }
      // 非webrtc模式、未开启图片自适应、未自定义图片尺寸、未传入截图dom时，图片的宽高不做处理
      if (!data.getWebRtcStatus() &&
          !data.getImgAutoFit() &&
          !data.getCustomImgSize().useCustomImgSize &&
          screenShotDom == null) {
          imgWidth = imageController.width / dpr;
          imgHeight = imageController.height / dpr;
      }
      context.drawImage(imageController, 0, 0, imgWidth, imgHeight);
      context.restore();
      // 返回裁剪框临时位置信息
      if (width > 0 && height > 0) {
          // 考虑左上往右下拉区域的情况
          return {
              startX: mouseX,
              startY: mouseY,
              width: width,
              height: height
          };
      }
      else if (width < 0 && height < 0) {
          // 考虑右下往左上拉区域的情况
          return {
              startX: mouseX + width,
              startY: mouseY + height,
              width: Math.abs(width),
              height: Math.abs(height)
          };
      }
      else if (width > 0 && height < 0) {
          // 考虑左下往右上拉区域的情况
          return {
              startX: mouseX,
              startY: mouseY + height,
              width: width,
              height: Math.abs(height)
          };
      }
      else if (width < 0 && height > 0) {
          // 考虑右上往左下拉区域的情况
          return {
              startX: mouseX + width,
              startY: mouseY,
              width: Math.abs(width),
              height: height
          };
      }
      return {
          startX: mouseX,
          startY: mouseY,
          width: width,
          height: height
      };
  }

  /**
   * 绘制文本
   * @param text 需要进行绘制的文字
   * @param mouseX 绘制位置的X轴坐标
   * @param mouseY 绘制位置的Y轴坐标
   * @param color 字体颜色
   * @param fontSize 字体大小
   * @param context 需要你行绘制的画布
   */
  function drawText(text, mouseX, mouseY, color, fontSize, context) {
      context.save();
      context.lineWidth = 1;
      context.fillStyle = color;
      context.textBaseline = "middle";
      context.font = "bold ".concat(fontSize, "px none");
      // 处理换行符并绘制多行文本
      var lines = text.split("\n"); // 根据换行符拆分文本为多行
      console.log(lines);
      var lineHeight = fontSize * 1.4; // 设定行高为字体大小的1.4倍
      lines.forEach(function (line, index) {
          // 调整每行的垂直位置
          var lineY = mouseY + lineHeight * index;
          context.fillText(line, mouseX, lineY);
      });
      context.restore();
  }

  // 保存当前画布状态
  function addHistory() {
      var data = new InitData();
      var plugInParameters = new PlugInParameters();
      var screenShotController = data.getScreenShotContainer();
      if (screenShotController == null)
          return;
      // 获取canvas容器
      // 获取canvas画布与容器
      var context = screenShotController.getContext("2d");
      var controller = screenShotController;
      if (data.getHistory().length > plugInParameters.getMaxUndoNum()) {
          // 删除最早的一条画布记录
          data.shiftHistory();
      }
      // 保存当前画布状态
      data.pushHistory({
          data: context.getImageData(0, 0, controller.width, controller.height)
      });
      // 启用撤销按钮
      data.setUndoStatus(true);
  }
  function showLastHistory(context) {
      var data = new InitData();
      context.putImageData(data.getHistory()[data.getHistory().length - 1]["data"], 0, 0);
  }

  /**
   * 裁剪框工具栏点击事件
   */
  function getToolbarContainer() {
      var data = new InitData();
      var textInputController = data.getTextInputController();
      var screenShotController = data.getScreenShotContainer();
      var ScreenShotImageController = data.getScreenShotImageController();
      if (screenShotController == null || ScreenShotImageController == null)
          return null;
      var screenShotCanvas = screenShotController.getContext("2d");
      return {
          textInputController: textInputController,
          screenShotController: screenShotController,
          ScreenShotImageController: ScreenShotImageController,
          screenShotCanvas: screenShotCanvas
      };
  }
  // 隐藏文本输入框
  function hideTextInput(toolName, screenShotCanvas) {
      var data = new InitData();
      var textInputController = data.getTextInputController();
      if ((textInputController != null && data.getTextStatus()) ||
          (textInputController != null && toolName !== "text")) {
          var text = textInputController.innerText;
          if (text && text !== "") {
              var _a = data.getTextInfo(), positionX = _a.positionX, positionY = _a.positionY, color = _a.color, size = _a.size;
              drawText(text, positionX, positionY, color, size, screenShotCanvas);
              // 添加历史记录
              addHistory();
          }
          textInputController.innerHTML = "";
          data.setTextStatus(false);
      }
  }
  // 绘制无像素点的裁剪框
  function drawCutOutBoxWithoutPixel(screenShotCanvas, screenShotController, ScreenShotImageController) {
      var _a, _b;
      var data = new InitData();
      var leftValue = ((_a = data.getToolPosition()) === null || _a === void 0 ? void 0 : _a.left) || 0;
      var topValue = ((_b = data.getToolPosition()) === null || _b === void 0 ? void 0 : _b.top) || 0;
      // 工具栏位置超出时，对其进行修正处理
      if (topValue && data.getToolPositionStatus()) {
          // 调整工具栏位置
          data.setToolInfo(leftValue, topValue - 46);
      }
      data.setToolStatus(true);
      // 获取裁剪框位置信息
      var cutBoxPosition = data.getCutOutBoxPosition();
      // 开始绘制无像素点裁剪框
      drawCutOutBox(cutBoxPosition.startX, cutBoxPosition.startY, cutBoxPosition.width, cutBoxPosition.height, screenShotCanvas, data.getBorderSize(), screenShotController, ScreenShotImageController, false);
  }
  function toolClickEvent(toolName, index, mouseEvent, completeCallback, closeCallback) {
      var _a;
      var data = new InitData();
      var plugInParameters = new PlugInParameters();
      data.setActiveToolName(toolName);
      data.setToolId(index);
      var toolBarContainer = getToolbarContainer();
      if (toolBarContainer == null) {
          return;
      }
      var screenShotController = toolBarContainer.screenShotController, ScreenShotImageController = toolBarContainer.ScreenShotImageController, screenShotCanvas = toolBarContainer.screenShotCanvas;
      // 工具栏尚未点击，当前属于首次点击，重新绘制一个无像素点的裁剪框
      if (!data.getToolClickStatus()) {
          drawCutOutBoxWithoutPixel(screenShotCanvas, screenShotController, ScreenShotImageController);
      }
      // 更新当前点击的工具栏条目
      data.setToolName(toolName);
      // 为当前点击项添加选中时的class名
      setSelectedClassName(mouseEvent, index, false);
      if (toolName === "text") {
          // 显示文字选择容器
          data.setTextSizePanelStatus(true);
          // 隐藏画笔尺寸选择容器
          data.setBrushSelectionStatus(false);
          // 颜色选择容器添加布局兼容样式
          (_a = data.getColorSelectPanel()) === null || _a === void 0 ? void 0 : _a.classList.add("text-select-status");
      }
      else {
          // 隐藏下拉选择框
          data.setTextSizePanelStatus(false);
          // 显示画笔尺寸选择容器
          data.setBrushSelectionStatus(true);
      }
      // 显示选项面板
      data.setOptionStatus(true);
      // 设置选项面板位置
      data.setOptionPosition(calculateOptionIcoPosition(index));
      data.setRightPanel(true);
      if (toolName == "mosaicPen") {
          // 马赛克工具隐藏右侧颜色面板与角标
          data.setRightPanel(false);
          data.hiddenOptionIcoStatus();
      }
      // 清空文本输入区域的内容并隐藏文本输入框
      hideTextInput(toolName, screenShotCanvas);
      // 初始化点击状态
      data.setDragging(false);
      data.setDraggingTrim(false);
      // 保存图片
      if (toolName == "save") {
          getCanvasImgData(true);
          var callback = plugInParameters.getSaveCallback();
          if (callback) {
              callback(0, "保存成功");
          }
          // 销毁组件
          data.destroyDOM();
          data.setInitStatus(true);
      }
      // 销毁组件
      if (toolName == "close") {
          // 触发关闭回调函数
          if (closeCallback) {
              closeCallback();
          }
          data.destroyDOM();
          data.setInitStatus(true);
      }
      // 确认截图
      if (toolName == "confirm") {
          var base64 = getCanvasImgData(false);
          // 触发回调函数，截图数据回传给插件调用者
          if (completeCallback) {
              completeCallback({ base64: base64, cutInfo: data.getCutOutBoxPosition() });
          }
          if (!plugInParameters.getDestroyContainerState()) {
              // 隐藏工具栏
              data.setToolStatus(false);
              data.setOptionStatus(false);
              return;
          }
          // 销毁组件
          data.destroyDOM();
          data.setInitStatus(true);
      }
      // 撤销
      if (toolName == "undo") {
          // 隐藏画笔选项工具栏
          data.setOptionStatus(false);
          takeOutHistory();
      }
      // 设置裁剪框工具栏为点击状态
      data.setToolClickStatus(true);
  }
  // 处理用户自定义工具栏的点击事件
  function toolClickEventForUserDefined(index, toolName, activeIcon, clickFn, mouseEvent) {
      var data = new InitData();
      data.setActiveToolName(toolName);
      data.setToolId(index);
      var target = mouseEvent.target;
      target.style.backgroundImage = "url(".concat(activeIcon, ")");
      var toolBarContainer = getToolbarContainer();
      if (toolBarContainer == null) {
          return;
      }
      var screenShotController = toolBarContainer.screenShotController, ScreenShotImageController = toolBarContainer.ScreenShotImageController, screenShotCanvas = toolBarContainer.screenShotCanvas;
      // 工具栏尚未点击，当前属于首次点击，重新绘制一个无像素点的裁剪框
      if (!data.getToolClickStatus()) {
          drawCutOutBoxWithoutPixel(screenShotCanvas, screenShotController, ScreenShotImageController);
      }
      clickFn({
          screenShotCanvas: screenShotCanvas,
          screenShotController: screenShotController,
          ScreenShotImageController: ScreenShotImageController,
          currentInfo: {
              toolName: toolName,
              toolId: index
          }
      });
      data.setToolName(toolName);
      setSelectedClassName(mouseEvent, Number.MAX_VALUE, false);
      // 隐藏选项面板
      data.setOptionStatus(false);
      hideTextInput(toolName, screenShotCanvas);
      // 初始化点击状态
      data.setDragging(false);
      data.setDraggingTrim(false);
      // 设置裁剪框工具栏为点击状态
      data.setToolClickStatus(true);
  }

  /**
   * 设置画笔大小
   * @param size
   * @param index
   * @param mouseEvent
   */
  function setBrushSize(size, index, mouseEvent) {
      var data = new InitData();
      // 为当前点击项添加选中时的class名
      setSelectedClassName(mouseEvent, index, true);
      var sizeNum = 2;
      switch (size) {
          case "small":
              sizeNum = 2;
              break;
          case "medium":
              sizeNum = 5;
              break;
          case "big":
              sizeNum = 10;
              break;
      }
      data.setPenSize(sizeNum);
      return sizeNum;
  }
  /**
   * 设置马赛克工具的笔触大小
   * @param size
   * @param index
   * @param mouseEvent
   */
  function setMosaicPenSize(size, index, mouseEvent) {
      var data = new InitData();
      // 为当前点击项添加选中时的class名
      setSelectedClassName(mouseEvent, index, true);
      var sizeNum = 10;
      switch (size) {
          case "small":
              sizeNum = 10;
              break;
          case "medium":
              sizeNum = 20;
              break;
          case "big":
              sizeNum = 40;
              break;
      }
      data.setMosaicPenSize(sizeNum);
      return sizeNum;
  }

  function selectColor() {
      var data = new InitData();
      // 显示颜色选择面板
      data.setColorPanelStatus(true);
  }

  function getColor(index) {
      var data = new InitData();
      var currentColor = "#F53440";
      switch (index) {
          case 1:
              currentColor = "#F53440";
              break;
          case 2:
              currentColor = "#F65E95";
              break;
          case 3:
              currentColor = "#D254CF";
              break;
          case 4:
              currentColor = "#12A9D7";
              break;
          case 5:
              currentColor = "#30A345";
              break;
          case 6:
              currentColor = "#FACF50";
              break;
          case 7:
              currentColor = "#F66632";
              break;
          case 8:
              currentColor = "#989998";
              break;
          case 9:
              currentColor = "#000000";
              break;
          case 10:
              currentColor = "#FEFFFF";
              break;
      }
      data.setSelectedColor(currentColor);
      // 隐藏颜色选择面板
      data.setColorPanelStatus(false);
      return currentColor;
  }

  function selectTextSize() {
      var data = new InitData();
      // 显示文字大小选择面板
      data.setTextSizeOptionStatus(true);
  }
  function setTextSize(size) {
      var data = new InitData();
      // 设置字体大小
      data.setFontSize(size);
  }
  function getTextSize() {
      var data = new InitData();
      // 获取字体大小
      return data.getFontSize();
  }
  function hiddenTextSizeOptionStatus() {
      var data = new InitData();
      // 隐藏文字大小选择面板
      data.setTextSizeOptionStatus(false);
  }
  function hiddenColorPanelStatus() {
      var data = new InitData();
      // 隐藏颜色选择面板
      data.setColorPanelStatus(false);
  }

  var CreateDom = /** @class */ (function () {
      function CreateDom(options) {
          var _a;
          this.textFontSizeList = [
              12,
              13,
              14,
              15,
              16,
              17,
              20,
              24,
              36,
              48,
              64,
              72,
              96
          ];
          var plugInParameters = new PlugInParameters();
          this.screenShotController = document.createElement("canvas");
          this.toolController = document.createElement("div");
          this.optionIcoController = document.createElement("div");
          this.optionController = document.createElement("div");
          this.cutBoxSizeContainer = document.createElement("div");
          this.textInputController = document.createElement("div");
          this.completeCallback = options === null || options === void 0 ? void 0 : options.completeCallback;
          this.closeCallback = options === null || options === void 0 ? void 0 : options.closeCallback;
          this.hiddenIcoArr = [];
          this.toolbar = Object.assign([], toolbar);
          this.data = new InitData();
          this.optionController.addEventListener("click", function (evt) {
              var target = evt.target;
              if (target.id === "colorSelectPanel" || target.id === "textSizePanel") {
                  return;
              }
              // 点击工具栏的其他位置则隐藏文字大小选择面板与颜色选择面板
              hiddenTextSizeOptionStatus();
              hiddenColorPanelStatus();
          });
          // 成功回调函数不存在则设置一个默认的
          if (!options ||
              !Object.prototype.hasOwnProperty.call(options, "completeCallback")) {
              this.completeCallback = function (imgInfo) {
                  sessionStorage.setItem("screenShotImg", JSON.stringify(imgInfo));
              };
          }
          // 筛选需要隐藏的图标
          if (options === null || options === void 0 ? void 0 : options.hiddenToolIco) {
              for (var iconKey in options.hiddenToolIco) {
                  if (options.hiddenToolIco[iconKey]) {
                      this.filterHideIcon(iconKey);
                  }
              }
          }
          // 为所有dom设置id
          this.setAllControllerId();
          // 为画笔绘制选项角标设置class
          this.setOptionIcoClassName();
          // 将自定义的数据插入到默认数据的倒数第二个位置
          (_a = this.toolbar).splice.apply(_a, __spreadArray([toolbar.length - 2,
              0], plugInParameters.getUserToolbar(), false));
          // 渲染工具栏
          this.setToolBarIco();
          // 渲染文字大小选择容器
          this.setTextSizeSelectPanel();
          // 渲染画笔相关选项
          this.setBrushSelectPanel();
          // 渲染文本输入
          this.setTextInputPanel();
          // 渲染页面
          this.setDomToBody();
          // 隐藏所有dom
          this.hiddenAllDom();
      }
      // 渲染截图工具栏图标
      CreateDom.prototype.setToolBarIco = function () {
          for (var i = 0; i < this.toolbar.length; i++) {
              var item = this.toolbar[i];
              // 判断是否有需要隐藏的图标
              var icoHiddenStatus = false;
              for (var j = 0; j < this.hiddenIcoArr.length; j++) {
                  if (this.hiddenIcoArr[j] === item.title) {
                      icoHiddenStatus = true;
                      break;
                  }
              }
              // 图标隐藏状态为true则直接跳过本次循环
              if (icoHiddenStatus)
                  continue;
              var itemPanel = document.createElement("div");
              // 给itemPanel绑定点击事件
              this.bindToolClickEvent(itemPanel, item);
              itemPanel.setAttribute("data-title", item.title);
              itemPanel.setAttribute("data-id", item.id + "");
              if (item === null || item === void 0 ? void 0 : item.icon) {
                  itemPanel.setAttribute("data-icon", item.icon);
              }
              this.toolController.appendChild(itemPanel);
          }
          // 有需要隐藏的截图工具栏时，则修改其最小宽度
          if (this.hiddenIcoArr.length > 0) {
              this.toolController.style.minWidth = "24px";
          }
      };
      // 渲染文字大小选择容器
      CreateDom.prototype.setTextSizeSelectPanel = function () {
          // 创建文字展示容器
          var textSizePanel = document.createElement("div");
          textSizePanel.className = "text-size-panel";
          textSizePanel.innerText = "".concat(getTextSize(), " px");
          textSizePanel.id = "textSizePanel";
          // 创建文字大小选择容器
          var textSelectPanel = document.createElement("div");
          textSelectPanel.className = "text-select-panel";
          textSelectPanel.id = "textSelectPanel";
          var _loop_1 = function (i) {
              var itemPanel = document.createElement("div");
              var size = this_1.textFontSizeList[i];
              itemPanel.className = "text-item";
              itemPanel.setAttribute("data-value", "".concat(size));
              itemPanel.innerText = "".concat(size, " px");
              // 添加点击监听
              itemPanel.addEventListener("click", function () {
                  // 隐藏容器
                  textSelectPanel.style.display = "none";
                  var currentTextSize = itemPanel.getAttribute("data-value");
                  // 容器赋值
                  textSizePanel.innerText = "".concat(currentTextSize, " px");
                  if (currentTextSize) {
                      setTextSize(+currentTextSize);
                  }
              });
              textSelectPanel.appendChild(itemPanel);
          };
          var this_1 = this;
          // 创建文字选择下拉
          for (var i = 0; i < this.textFontSizeList.length; i++) {
              _loop_1(i);
          }
          textSizePanel.style.display = "none";
          textSelectPanel.style.display = "none";
          // 容器点击时，展示文字大小选择容器
          textSizePanel.addEventListener("click", function () {
              selectTextSize();
          });
          this.optionController.appendChild(textSizePanel);
          this.optionController.appendChild(textSelectPanel);
      };
      // 渲染画笔大小选择图标与颜色选择容器
      CreateDom.prototype.setBrushSelectPanel = function () {
          // 创建画笔选择容器
          var brushSelectPanel = document.createElement("div");
          brushSelectPanel.id = "brushSelectPanel";
          brushSelectPanel.className = "brush-select-panel";
          for (var i = 0; i < 3; i++) {
              // 创建画笔图标容器
              var itemPanel = document.createElement("div");
              itemPanel.className = "item-panel";
              switch (i) {
                  case 0:
                      itemPanel.classList.add("brush-small");
                      itemPanel.classList.add("brush-small-active");
                      itemPanel.addEventListener("click", function (e) {
                          setBrushSize("small", 1, e);
                          setMosaicPenSize("small", 1, e);
                      });
                      break;
                  case 1:
                      itemPanel.classList.add("brush-medium");
                      itemPanel.addEventListener("click", function (e) {
                          setBrushSize("medium", 2, e);
                          setMosaicPenSize("medium", 2, e);
                      });
                      break;
                  case 2:
                      itemPanel.classList.add("brush-big");
                      itemPanel.addEventListener("click", function (e) {
                          setBrushSize("big", 3, e);
                          setMosaicPenSize("big", 3, e);
                      });
                      break;
              }
              brushSelectPanel.appendChild(itemPanel);
          }
          // 右侧颜色选择容器
          var rightPanel = document.createElement("div");
          rightPanel.className = "right-panel";
          // 创建颜色选择容器
          var colorSelectPanel = document.createElement("div");
          colorSelectPanel.className = "color-select-panel";
          colorSelectPanel.id = "colorSelectPanel";
          colorSelectPanel.addEventListener("click", function () {
              selectColor();
          });
          // 创建颜色显示容器
          var colorPanel = document.createElement("div");
          colorPanel.id = "colorPanel";
          colorPanel.className = "color-panel";
          colorPanel.style.display = "none";
          var _loop_2 = function (i) {
              var colorItem = document.createElement("div");
              colorItem.className = "color-item";
              colorItem.addEventListener("click", function () {
                  getColor(i + 1);
              });
              colorItem.setAttribute("data-index", i + "");
              colorPanel.appendChild(colorItem);
          };
          for (var i = 0; i < 10; i++) {
              _loop_2(i);
          }
          rightPanel.appendChild(colorPanel);
          rightPanel.appendChild(colorSelectPanel);
          rightPanel.id = "rightPanel";
          // 创建颜色下拉箭头选择容器
          var pullDownArrow = document.createElement("div");
          pullDownArrow.className = "pull-down-arrow";
          pullDownArrow.addEventListener("click", function () {
              selectColor();
          });
          rightPanel.appendChild(pullDownArrow);
          // 向画笔绘制选项容器追加画笔选择和颜色显示容器
          this.optionController.appendChild(brushSelectPanel);
          this.optionController.appendChild(rightPanel);
      };
      // 渲染文本输入区域容器
      CreateDom.prototype.setTextInputPanel = function () {
          // 让div可编辑
          this.textInputController.contentEditable = "true";
          // 关闭拼写检查
          this.textInputController.spellcheck = false;
      };
      // 为所有Dom设置id
      CreateDom.prototype.setAllControllerId = function () {
          this.screenShotController.id = "screenShotContainer";
          this.toolController.id = "toolPanel";
          this.optionIcoController.id = "optionIcoController";
          this.optionController.id = "optionPanel";
          this.cutBoxSizeContainer.id = "cutBoxSizePanel";
          this.textInputController.id = "textInputPanel";
      };
      // 隐藏所有dom
      CreateDom.prototype.hiddenAllDom = function () {
          this.screenShotController.style.display = "none";
          this.toolController.style.display = "none";
          this.optionIcoController.style.display = "none";
          this.optionController.style.display = "none";
          this.cutBoxSizeContainer.style.display = "none";
          this.textInputController.style.display = "none";
      };
      // 将截图相关dom渲染至body
      CreateDom.prototype.setDomToBody = function () {
          this.clearBody();
          document.body.appendChild(this.screenShotController);
          document.body.appendChild(this.toolController);
          document.body.appendChild(this.optionIcoController);
          document.body.appendChild(this.optionController);
          document.body.appendChild(this.cutBoxSizeContainer);
          document.body.appendChild(this.textInputController);
      };
      // 清除截图相关dom
      CreateDom.prototype.clearBody = function () {
          var _a, _b, _c, _d, _e, _f;
          (_a = document.getElementById("screenShotContainer")) === null || _a === void 0 ? void 0 : _a.remove();
          (_b = document.getElementById("toolPanel")) === null || _b === void 0 ? void 0 : _b.remove();
          (_c = document.getElementById("optionIcoController")) === null || _c === void 0 ? void 0 : _c.remove();
          (_d = document.getElementById("optionPanel")) === null || _d === void 0 ? void 0 : _d.remove();
          (_e = document.getElementById("optionPanel")) === null || _e === void 0 ? void 0 : _e.remove();
          (_f = document.getElementById("textInputPanel")) === null || _f === void 0 ? void 0 : _f.remove();
      };
      // 设置画笔绘制选项顶部ico样式
      CreateDom.prototype.setOptionIcoClassName = function () {
          this.optionIcoController.className = "ico-panel";
      };
      // 将需要隐藏的图标放入对应的数组中
      CreateDom.prototype.filterHideIcon = function (icons) {
          switch (icons) {
              case "rightTop":
                  this.hiddenIcoArr.push("right-top");
                  break;
              default:
                  this.hiddenIcoArr.push(icons);
                  break;
          }
      };
      // 为工具栏绑定点击事件
      CreateDom.prototype.bindToolClickEvent = function (itemPanel, item) {
          var _this = this;
          // 撤销按钮单独处理
          if (item.title == "undo") {
              itemPanel.className = "item-panel undo-disabled";
              itemPanel.id = "undoPanel";
              return;
          }
          itemPanel.className = "item-panel ".concat(item.title);
          // 默认数据的处理
          if (item.id <= 100) {
              itemPanel.addEventListener("click", function (e) {
                  toolClickEvent(item.title, item.id, e, _this.completeCallback, _this.closeCallback);
              });
              return;
          }
          // 用户自定义数据的处理
          itemPanel.addEventListener("click", function (e) {
              toolClickEventForUserDefined(item.id, item.title, item.activeIcon, item.clickFn, e);
          });
          // 渲染图标
          itemPanel.style.backgroundImage = "url(".concat(item.icon, ")");
          itemPanel.style.backgroundSize = "cover";
          // 鼠标移入时修改图标
          itemPanel.addEventListener("mouseenter", function (e) {
              _this.switchBgIcon(e, item.activeIcon, _this.data.getToolId());
          });
          // 鼠标移出时恢复图标
          itemPanel.addEventListener("mouseleave", function (e) {
              _this.switchBgIcon(e, item.icon, _this.data.getToolId());
          });
      };
      CreateDom.prototype.switchBgIcon = function (e, imgUrl, toolId) {
          var elItem = e.target;
          var itemId = Number(elItem.getAttribute("data-id"));
          // 当前图标处于选中状态时停止图标的更换
          if (toolId === itemId) {
              return;
          }
          elItem.style.backgroundImage = "url(".concat(imgUrl, ")");
      };
      return CreateDom;
  }());

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;
    if (!css || typeof document === 'undefined') {
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "#screenShotContainer{cursor:crosshair;left:0;position:absolute;top:0}#toolPanel{background:#fff;box-sizing:content-box;height:24px;left:0;min-width:392px;padding:10px;position:absolute;top:0;z-index:999999999}#toolPanel .item-panel{float:left;height:24px;margin-right:15px;width:24px}#toolPanel .item-panel:last-child{margin-right:0}#toolPanel .square{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAORJREFUaAXtmLENwkAQBA0iI6ULeqAKmqMHCiCmBzrBMdzK+fvlXVsgzUsX3d3u/2z2w8CBAAQgAAEItAmcqn2veld9Nip5yVPezbNrdqemhM5Vz47Z5MilxF5VV1dUNG6uyIJ9ecq7efbN7tQ8dsysNTLr3fOAtS4X0eUBEYyGCAkY8CKrJBDBaIiQgAEvskoCEYyGCAkY8CKrJBDBaIiQgAEvskoCEYyGCAkY8CKrJBDBaIiQgAEvstqTwBhxWiYy633o0H3UjD5at/4flae87aMv7p/9XrdfhwAEIAABCPw1gS8CdEV3aG1wFQAAAABJRU5ErkJggg==\");background-size:cover}#toolPanel .square:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAARFJREFUaAXtmLENwkAMRe8QUoTogIoV2AGJjgHoWICRYABm4Dq2oaIkoFSHja6M4lN+FBD5lNj+//x+KjvHHwmQAAmQwJAJeGv55TUuqup1lL5tjHFq9XdR996XohOKYnK4bfy9SXPcVNRaevxKHn+2eruqi5eTJdbJewfpzsPzMbuUJ0ikxbB6qrc1OrIa+vps6t6R420uUCf8S/9xgW+nwQSYAEiAnxAIEB5nAjBCUIAJgADhcSYAIwQFmAAIEB5nAjBCUIAJgADhcSYAIwQFmAAIEB7//wTSoRUm1UYgx9s87opx0ENr3/dR9VRva3FzAT1x65VYBPc5t0rLMKeeyH/O6zn97CEBEiABEhgugTemKDubNjFCTQAAAABJRU5ErkJggg==\")}#toolPanel .square-active,#toolPanel .square:active{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAPJJREFUaAXtmDEOwjAMRRuEVCFWJm7D1r0cgiNxlG7chokVoU4hkTJWcdQfKCovY2x/x+9nctNwIAABCEDgnwk4a/jjzR/G8XUNeZ33fm/l14g7555BZ2jb3eV+co+c5jYXjLH4+PDw3sqrGU+g+tA7yp5z2ptcMMW6gpxPpZi9zQG+9W2mCJT0NgeYEv6lOwZY2g0cwAGRAF9IBCiX44CMUBTAARGgXI4DMkJRAAdEgHI5DsgIRQEcEAHK5TggIxQFcEAEKJev34G0aJVJzREo6V3iwDCneaUas7e5nY4r7rQlXmS9XgkEMhCAAAQgsFICb9uiLZTmm16RAAAAAElFTkSuQmCC\")}#toolPanel .round{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAi5JREFUaAXtmL9OwzAYxAsS7cLGwp+dSkh0ZmFgYusjdehD8BIsiBegEkM3xo4siDIjmFjgfk2uA1LSlDhpLXzS1VFj3/n77MR2Op2ElIGUgZSBlIH/nIGdgMF3pXUlDsUz8Tinis4850zlvfggfolbgUP14kZ8F78rkrq0oe3G0JPzWPwU3fEnXY9ERuJU3M/JNf9xjzquT1s00GoVZG4quiO3uu6v0QPq0sbt0WptNAYye8nNn1VeiH8FbdEgEDTPxUZBltz5ia4PArihgZaDaGwkejJhqDGaiHtiKKA1EdHGA6/g4GHDgCEPkfnfHUTT0wmvoGBY/bZh3jYFtEkSXkGnEu9shHlzNA2/nfAMgq5UvEj1gyiWi+BBsvDEuzaupYAgC1Bb8GKHdyl2S+9mN4d5nbsKdUNVsZe9C3WrBMDGDDxmRSu/9rJ3oWmVANhVgtesaOXXXvauZfqh1jwDbMzaAl544l2KKiNggZBnB2sWlfYiiFJUCWCeKxyVKoW9aa+3VbLrBHCySizgfXs5eYXSVQKY5a0vC1XC37CXvWs5bPVCViWy6LcSBBn1Zo4Aot9OE8RY5L0c5YGGAHriVCSIiRjdkVJ9XkylaA/1BAAGooNgOtU5YtLW52A0G/+sIo8FeKg9nZhSUX3YykLIngkebB/2CYST1Ejc+k+L6uMSjAbrhM/NBLKKwT7uetu67E2NC1ZsMs8xMKrP6zViTk1TBlIGUgZSBjacgR/CFam/GpziJgAAAABJRU5ErkJggg==\");background-size:cover}#toolPanel .round:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA4hJREFUaAXtWEFrE0EUfrNJTVJBRK1oK6JYEVoQigr1IFKwBxVE0ZP+C6+KB9Gr/0JPFUUQDxaK9GCgSg9SQawI0lalKlKwSUyy4/smOzEEMm+SbJXQncsm+2a+b743b2feG6KkJR5IPJB4IPHAZvaAikv86ILesvqpNFGl8AIpGiFNg/wcNPiaVvj3Cr97m6LgycD+zMzCqPodB3fXAgZm9J6wVLxFOrymibb5TIpJ10gF94NM9vbqhPriM6ZVn44FDL/XmZ8f1m9oUte11ltBwGDzWgWPA6JZSqtllcqs4L2ulgapoodColNKhxdZ6Jjpr9QvRfre9kP9dxcPqxLetds6EmC8Xiw80qTHQahITSkKbn47m33nM4Fdz4pHNIV3ePyVaHw+yOYudbIabQvYPV06Wi1XnzL5PlLqI6Xo6o/J/rzPxJv77Hi+Pk5VekBaH2QnLKXTqXNfJzNvmvu5/rclIPL8HCbPhC+yfbnLy2fUdxeBZBua1juL5cJDxjwNEbwSJ9pZCQ5Xv4aYD2thYyZ/YCA32e3kwQwMYMEhcAw4wOU3KyJvAbUPlmOewwaef31clX1JpH7AAiawWcQ4uKQx1u4VQrWtsrBodpu0OtlpzFvSVk/zTVT0S8W7U5DJDfuEktcKYJ/H5HmZpzZq8hAFbHCAy5wtrZQ2vBcF4ITFIYUx2Cobxm7IzzoHcxpugUUUgPQAJyzH2rzvPi9wOs3gABc4we3szEZRgMltuCNOWAksLrvlstwuXFEAx80IALjjrAsoTludK+J2YcsCkFWicW7jAorVZrkstwNcFhClxDYxc2DFZqpz2XTcgSwLiAbrPiSb/6bVufhUkxhlAShG0IqlvRJYbPa/XJ8lTFkAKik0zuclsNjslstyO4BlAVwGYjyKEQdOrKY6V8TtAhcFoIYFACopF1CcNstluV3YogAU4Pz1rqEMRCXlAovDVqvWaAyc4JYwRQHm9oALcAChDJQAu7XXOZjT5+bCa2vs+XQaeTluD4x3uYZFGditp5vHG0zUx9zA5VMLoK8YQuiEhqsPztXzKMBRwx57xcdNTA1YwIyK+zy4fKG9QsiC9XRRDxFY1lRf6jyvxBJuEQqVwpwpA63CNp8YCwxgARPXKr6hY6naWgE7KFqJ3rzYsiJ6+mrRisCztsX24OVuowj8/l/X683zSP4nHkg8kHgg8cDm8sAfhkzSnCu/+OAAAAAASUVORK5CYII=\")}#toolPanel .round-active,#toolPanel .round:active{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAqJJREFUaAXtWDFLHEEUfrNn3LsIIRYGOcQml8YDu0BKr7BREKzzL2wDFopt/kXqQCBdwDZgKWeTsxE5FRsREr2Eu8l8uzewCLvvzbp7q9xMM3M7b973vjdzM+89It+8B7wHvAe8B6bZA6oo8u2unr0+G3SGNNoiRSukqWn6ZqRfU9+M++bbSY2CbwvL4WG3rf4Wgf1oAguHenE0uN8lPfqoiV5JjDKgt6SCL0FY37vuqEvJmjSZ3ARav3R4c/rnkya1o7WeSwPI+q6U+q1If3799uVB750aZMmmzeUiEHn9/u6rJv0hTbHLd0XqZ1BvbOfZDWcCb34MVof/ht+N8UsuRnKyhsT5zExt42o9POZkk/NOBMaePyraeGsQSJideO+yE4FdzPU486P42BTq+SQuHAMMYCW/Z43FBOI/bDFnPssg/K+AlSWTnBMdofiqvOvlvW2SgJIxbqcgbLQkR0m0A7jnJ2U8CAIrelsEbFkCeGHxSAl0FStiMCNsRitLAOGB9IVlsJymgQlsbhFLIIptOC0lzUuwWQJRYFaSgaxaBIVM4wkgqqyqCbB5AjYkroKEAJsnUIXhFtO8anaY1vMEkIxU1y44aJ4AMqmqmgCbJ2DSwKrsRwrKYbMEkMNySsqal2CzBJCAm4jvtiwj0/QCE9hp8/Y7SyCqHpgE3C6YWG8wJZULlgAMRvUAIe6kjI/D6fqeBE9EAHE5qgcShUXIAEuSCwBLRACCKH2geoBxmQ0YwJJiiAmgboPSBxJvqXJXuXFSv+1SIxITgDHY1tqL2mYZJKATZRXp0bHOEeXEVtj2T6mw5bQDlgC8NN9qrAWK9h9zO0W3jdEBXa6et7bk2gG7GH1csXiGxd0kCYyrKq8/tMP/9h7wHvAe8B6YLg/8B7td+kBEJNs9AAAAAElFTkSuQmCC\")}#toolPanel .right-top{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAgNJREFUaAXtmE0rRkEUx6/XsrC1okRPYWWhbCQWFmxsbCyelKysZGFnISWSlJBIkpT0ZO8T2Nmy8QGQkrzn7X8yU9N97h0z923uZE79u3PPPXPmd05zPeN6njPXAdcB1wHXgf/cgQqDxddi7QLULqgJ4xNoFVKyLAqoB0kbJILSuBWqgvz2Cked3xl2Xx32IIa/C3OLEAdu1Mx1qxmfePgpMn7HEM1XtkrlSPXAKYTeqIeXRV6UeSSONAoggH4oahFaBUhqi/2oAxmuId3t1Bt75QQTRCmiIcH1E0mlU8Sd7oppvAN+hks4zvzOkPvc7H/ORz+UOxB/Dx6FMfeJV4rNlW2AhgPOY/zXdprOEz2dZzj8ggAmK2JQiDM6XBLgFwNIwopoDojN3EVbhXd+WbK6v4gnxGZxuJQged6sAL8ijfx9KBZxrhCfasgMsvPOK5/nMYeKuILmIGNGBzgOv2aMIuLCkwL8esQcxqZNYOUvVsCmMYqIC49h3ieD38LV+F8QnTpGBXj6+bcKfgTAHxC9tLu2wQ8D+J3B7+GaxWkWyyRjQ0jzBlHn9yGr4AcA/MLgD2yD7wPwM4M/xDXoYxTc+bQeYPF/Qo4wtgq+G8APEO35Y9vgOwF8z+BLuKbxCRJp07NtpKbO05di6+CpLS3QOFRDN85cB1wHXAdcB1wH8tqBH3D6o7sgJgNQAAAAAElFTkSuQmCC\");background-size:cover}#toolPanel .right-top:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAwdJREFUaAXtmD1s00AUx9+7JCgBIdEoNJ1QyoDqAQkJNkCqYGgEMwMDCwsLLOyUAitsMDCzsVUdSghVJTYkmJBI+VhgoOJTgiLH+fA93nNICFHjnGNXMZKfFPt89+z7/d/dO58DkFgSgSQCSQSSCISIAIa4N9StpXXK2m7zELmuRZosjWgxzDQhvs5AdvHTAn426SBt4hTGh0H32U7daiPOAZKFRBYQWj+d+iwAqd6ziYDkgmi+hfYBLp3ptfkUIhWwRKTuVRtl7eqzgMCgxKD2jNc/AwqhBylHxDYCvuXiKxZWA1AbXLlJ5FaR4LgP8z9NkQq4W7Gva4LFDnCnH4a0GXCDo14DxT/NsOlUrTS1692LY9jqp5lZrZeaUoH4q7/erxypACI8ITFm6DWF6nY6Q7WPp7IfEDmmA/Zt4FouXYUWaC4Q8IiY2d85aObv66UQ7osD084T6anN07n328EPewhpbXltCDydzCxSAV/Kux8CKp5ClOJAPiis2ufNMDpempO8U5KcMLNIBUiX38u5W2OL4NXJw0Y1OQGhRPwZAaTsZAWMI6JYoWlOnjyvAD++lnHTGwmDQ+RTqL/PINPJRcebPijLbQDbUQHCkVKpFU7qrZGJ3VuBzBNYnr+jAvY/bh5xdWuN30x7ObGf+YngPVC8RqAHz/Oa3wXLs4XsSd/VSdOcRBSU+QrkuXs3RXwYhC8Vcudk2+CXE90RUGnzt7BgR76dHgbfH6P8o/o1IH2Tu3d5Dl/AbG7FdewtHinnykJuzxKibCiMLNIcMIEXqsGRcBv1G1JPRG+CwMs9kQkwhZdOxfpFMPlVqeMReCrnIBaJgKDwXUARoRRcQgT5+nqZIbzTbTM9h86BceFNAUf5hRIwaXgRN7aAOMCPLSAu8GMJiBN8YAFxgw8kII7wxgLiCm8kIM7wIwXEHd5XwP8ALwJSchi0YrVxuK3b6/KRLR8j3f38oF8crrf9a7HVbl9muNjDDw1g8YlzMF+pXzz6nDJDnZKGJAJJBJIIJBFIIhCDCPwGO3q+e4PmVA0AAAAASUVORK5CYII=\")}#toolPanel .right-top-active,#toolPanel .right-top:active{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAjBJREFUaAXtmDlLA0EUgN/brMaINiEqgoIoglEEQf+A4AXWlja2WuRPWPtPBLXywsZSS402NlYeSSPGHJt9zrisSOIeM9llR5wpsuy8zcz3vTmYXQBddAZ0BnQGdAb+cwYwKfmZG+ouPdYn69jMA2EegNgVRsGA/fJq715YrtgFcpfUT9XKFFgGA2SQCBw0TwATDDrVCoqI1dJab6a13uve9ArI1udO3heIcPMLlmXWfquMOG3ZzoWR+xUWfvGLt8YiF6Am7BLQitNRAG0rDbtHouIv1Z5VhmdENmCaBUR4lv07ICYrUFpOF8k0F2Ulkh8BlvryUvpWVgINI9kRcKeOrIQBPXduG2Gu0a+BH70KSyCUn1ZRaP3EKsBduISV7loPtSZIbAHz9mMXGDipz5m1xiEhbgdKoNgWGrsAh2/ajXMiGEYbFoMWtqHSCLjw7NiQZceDg7GBTCFoTYjuQLGNQBt8LrNxvYAN3qGfRMoWn0KRH+b84LmAW7JntWm0rAs2vQZ5HQJWXtcyfWy0hM4fkS7isPAcuH0k6F4UnrcTmYAIPO+YF1eC5f+B7VBHTq3YbyRTSAZeDNP76Y4FkoTnWh0JJA3fkYAK8NICqsBLCagELyygGryQgIrwoQVUhQ8loDJ8oIDq8L4CfwGeC7R9m+SVQ6e1Wcu2Lr5fRn6c53lcpfLrp8WGZe0wSOdNSmF4z0QOnVXHs8cfW/NX1OX5kA7oDOgM6AzoDOgMKJCBTz35SoU1TFsiAAAAAElFTkSuQmCC\")}#toolPanel .brush{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAArJJREFUaAXtl7tu1UAURS+IDokkvEOABkENFVADEl+UXwglXb4EiY6UvN+PyzMlFZCCBhpYi3ikKWznWJixI3ykfce58mTWGc/Zx3c2m2LagWkHph2YdmAX78Ap2G+hp2gN7Ue7Ji5D+gP9ynSP6wU0+rgI4U+Uw6fr0SexAvhmA/zokxD+fQX/hHHeksjonsQJYN9VwA8ZF9Fx9Lr6Lu1+PprEKApb+LcV6CPGJZRipyRupBuHGpdZOB2Vx1wfrAFpS+JFzf3FvhLsDfJYeObr4Pn6TzQlsZ5uKD0eY8EEb6M6FAAwiTlKdfCJ6yOBeb3fInwqzmdcR+CFsLA9ZiawiU6j4nGUFV8hIZ6jwygSwj9AzvuIfM0oHj7ul0gIiy8Krysl+A9cn0TFQ3ihE3z07ApvX3CeTW4QeHfa4yKET8BjFAldyb7gPJucnbp4CG+hCuHZ7wKfCtYmZ7MrHrqLFim8rqP7RMJ59gXnDQbv408Q+r0eHok8aT3fTl08hE+PX4gofH7cuiTda4K6Rio8H390B3WlVOget2jS3Npf5JbX5ezmFmuhR2ulP3L+k50y+bWWF3UNXUlrtWC7WCy39xd5m7fZRP16FPALAN9H7mCXNu8x8bg4zw7tMSoeB1jRn3VC+IIVbfMWqIXqPAt3EHh/i96tILq8HQqvRQpvh9Y6B4lLrCrEZxR9L9dS59U8O7RNa7C4zsomcDtIoCtprc6xQxeB38tCTaHzGFvbQ+un8HfQOST8FfQF/fPoIwEtdQMJ7+vFVfQVFYm2BOy6xrftofZTV9pAZ5GvF0XhWW+2z4+G2OkIJfgzzBf+GmpLtmGZv/s6ksAFllhFJpTrPH/rOr5eCL+FRhXr0OgobbJDm9Rg0fYEbkJljexB7m6d7LLf0RTTDkw7MO3Af7oDvwFjWdeSB4jgWgAAAABJRU5ErkJggg==\");background-size:cover}#toolPanel .brush:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABOFJREFUaAXtmVtzU1UUgNfaSZOckwFKW8ql6DDeRaugCOMDTE5vMuMP4J/4pk/+AB/9J9RSmqI8OCqKBUUEsYNQSymYjvScxKRnudZOT8xkcrJ3GhJ8yOnDydnXb133pQD9p6+Bvgb6GuhroAMNYAd9O+46dImeg2Lpc6JwTBGcTyrn0wcf4GY7Az8zAUbP++9XABYBKBUBo8Jv9ihn5s40bkRlprcyNehG/fCCf6qMcKkeXuahkE5uhMHcCxdoj+28PbfA8EV/jMp4mWmPxEG2Y4meWkDgocxuI/AqcRUBbzYToh1L9EyAkbnNQwyfJ6KXEOHK7lTaUxknx79vtBJi/xeUbVYflfVEAIGnLRT4lxn4+2zWnV72sPDQw1WVdidaCVGh4OMIttm76wKMzNJBCnGBgF7hgPvBAXf67mn8K4IxCQGAH0Ztm727KsC+PB0gCBZY868CwlUH3al7Z/FxI4hBiMuN7eu/uybA6DztD0uBuM1rDP+jk2wOH8HUhKgPbIW/D7iZT6I2zd5dEUDgtyp+FR5gieEn70/ho2YA9WUcrUVA5UsZZ6jljMLc6hl8WN+m8XeysaDTb84ao5Wyzz4Pr/NY1zIZhvfM8EfyNPh3MbjAsXKc8e+kFeRWpp0/TDwJU4N26g98SfvKZT/Pfd5gFV5n+IkVD9dNYzz/Fe194mv4E6z53yADubUp956pn9Q/NQsI/D++vwBUhU+5DH/GDn5z02fNw7uIeJvS4D327OBFgKeylTiUp5FikeEBxnnEnwbQneBd5ZpM0Oo5PEtDATA8wTsMfwsGwHs06d5v1aexrmMLbMNf5IHHWRs/J9uBJ3+eNX+c3eZXVOStT2ZXGgFN3x3FwNg8DRfLvsC/LatpYsCdWJsxa176BaHuV4VPMPxM+/Ai3I5dSMzvA0MQHGPz/6LSjie53KQxDV/R/VhovIngeOtn8U9Tv7j6HQmgfTcyP0MwfM4Gvs7d3mpH6Dh4KW97IZOUpwMv8l3WoA28ZKntQGd4uGFrsVbwUtdWEAu8TnmSNSTwtO+azV9LsQBvSqAnkhwrHj4wwdnUW7uQXilLnDVI5+tbnDVyNoEnK3OZauuDdYq1gZc2VgLULfMn2Hdvc77O2eTrbsNbCSAH7I2KXubfk2WeeJm3WSn1hq66JzrKarouK7NpY2ar9fp2LdeBoa9pdynQ8CdlgyV7FBt4OQeEvCfiReooT3YtlXUnuwEvgsRmITmLYiGY4/28hs/w7tAaXp8D9G50STZ03YIXAWKzUFkF41ChUxwkq+kkejZbWzk+bh9i5AQmhxirrbSA7PSJtUBiSw3KoMQgDH/XNIE+uFOwyBarHh8tDzGmcU31sQIQhloA9v2CaZDarcP2wd0FuxOYaVyb+lgBgKgqALYWQN+0hbiobx34yiTu4G4Ds5M2sTFApPYChIAh1a5AGicYyvuHofTfZZXc99RfmTS278Z3rACAbAHOgxyMTV1I4LEIovkXeW9z5VnAi0JiBeBg1C4kB47hWf+jqkBqkIG5nAaxRMe47iAvbt/tSjvTy6dbu1o3tN9SAEQV8j8emJXOMeg5bQ12qeipGge/3ZVxZuSaMCrv9TvWAkj4GUMqdiH+wwJ/Fzgg+K0KfP3N77BAKWeJ4Z/0Gro/X18DfQ30NfD/0cC/yGVeCCJ5w/QAAAAASUVORK5CYII=\")}#toolPanel .brush-active,#toolPanel .brush:active{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA45JREFUaAXtmFtPE0EUx8/ZFuwuQS5yE9EYjJdoiLeoL2rYUpAPZXwwfgA/DiBQ1BfjXcQbKhoFREQsUXYLpXs8U9xkQzLb2d22+LDtw+zOnDPz+59zdnZagPgTRyCOQByBOAIRIoARfCO7dt2j9oKVv0lEfQxyP6npt75fw/UgE++agO5R62DegSkA6nWBEfFhU0IfmhvENbevXKuVM6jGeGvW6tlwIOuFF+twJi6uFe2x3jvUpLpuzTOwb8I6AJtwl4COyCCDZKKmGSjBF2DKDz5oJmqWgbax9W5ycIrL5Kgs8jv7RSaSqKf9HuyaZKAEX8RsEHg3E1uOfX2nMO991QW0jdB+jvwkl80x78Kq1wRw2c+2qgLas9RFYE9y5I/7QfiNcRnN+I1XTUDHOHU6G7YomxN+AL5jiJ/qjNQNP5uqCBDwxS0rGjzgXCqB/UtX8YefgITfYJixzlHqKBYZHuBkGP9tH4bXoH9xyPhabo6KCiidbQoWv2HhVLmFZeMI+BFS0L+cMeZlNt7+ipWQgN+0rEmgCPCIH4jhV001eCGkIhnozlLbhs3wAH3e6AS55t3mPdSBuZo2FoL4Rc6AgM/nrYlI8ICzqFH/z4Fg8EJopAwcGKd9+UIJ/nSQqHltueZnMUHmylDDordf9Tr0WahnhFotYHiCM6qL7bTjsnmHoJsrw/ht55jqfVLV0Gsn4G2yxrkvCvxbbY9u/jBxyTt30OvAz8Ch+9Rig3WH9/mzQRdz7RHhTSXgxXyBBAj49XWGJzjnwgRtuWZfJ5JG5Mi76yoLOJyl5n/w513nwC3Cq6RmmMsZ/B7YV+Kg9AwI+N95W5RNJPg6NMSPk2UJS6jusruQ+IG9tiXg6UKoFYQTwky9YaTLHczCzO9bQq0PaK/4lyASPMDLasFvx0Yim0+VDVtkT/B5/pLERKV7OpUyBhZNXFExDmMjzUBBs/siwSO80OuMdDXhhWCpgERRaw4TkZIPwnM9aQwsZPBn6DkUHaUCCJ1QAnhXeGZAbeCFRqkA/p8vsAB+wz7V0cjMD+OqYgAjm0nfA0RaC4CjvADDP2loMAa/XMFfyk4VMJRnANUzsFvwQr9UAO9ASiXE5/nHjXuMTK0j7yZPKgBRK1s/DP+oMaUPfjYx505Y61b6DCDhbT77aHwM4C/m+D4H6HCr5VAT906O6vVphv9Ta+h4vTgCcQTiCPw/EfgLJV9RSXPyCEcAAAAASUVORK5CYII=\")}#toolPanel .mosaicPen{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAOtJREFUaAXtmckNwjAQRcNSBg3QCkVRIXQBZxogghlxQ7Zl8YKSSG8kX2bx8r4PtmYYNAlIQAJLJXCOjT1jvGYet1j/FKNom6L348zN7xrx3tC1N7GSdwz/I8ahEq+6pyJfXaAzcIm83EvRtkXvipweYG6xVEAFIAGvEASIy1UAI4QTqAAEiMtVACOEE6xegdb58w2eb3Fqf/1XrF4BD0DvF61XAUqQ1qsAJUjrVYASpPUqQAnSehWgBGm9ClCCtH7fmOAesWwuTPEnaCzTFRq7sr6Ssq2T7Z2pPiS/zpOdomx3aRKQgAQWSOANmudym8Lt+O8AAAAASUVORK5CYII=\");background-size:cover}#toolPanel .mosaicPen:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXxJREFUaAXtWU1Kw0AUfm90UeyuIih4Add6ATeinkP0TIrnqOLGC+gtFASxu0o2zpgpSUngvaTtS6YtfFkl37zf78tiZh4RHjAABsDAOhlgLfnBS3btvX8MIRxpNilwJv50O+72+2IwlvLtSmDEiuIPtfVlcGZ6X8a+ZhvoxP/5hxw7ruHFh9pAhfkxDfhucr73IQVowkZP0xDXfy6HZ012TWv7z9O3EOhUs3Hawhxfsfi5f88vrQ2swnzPNdfCtzZQs97ADzSwblGgABQwMoBfyEig2R0KmCk0BoACRgLN7uqBptwKmzN0FGByNRRr3fpfSD3QROLiScpyGClV1NhbRJwyhma79QqgAU3aVDgUSMW0lgcKaMykwqFAKqa1PFBAYyYVDgX6ZHr0+iteqVdzbqwCs+KzcF8tVnpXt9NxMkL5cCHez0uOi2D5vf7sadsSi7GywpkoMPOXaJODagNxrBMnI03DBS1ol3gs3jl302VMxAIDYAAMdMfAP+EdVKaWg/p6AAAAAElFTkSuQmCC\")}#toolPanel .mosaicPen-active,#toolPanel .mosaicPen:active{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAV9JREFUaAXtmU1KBDEQhauiC9GdIih4Add6BhnmHOKhxHOoeAY9hjAgLkfcTGo6Mo2ZpivW2F3GgZdNJ5VKVfK9XuSHCAUEQAAEahJgLfnx0+c0xngnIqeaz1/Ymfg17ISbt6u9+758u33GZFtN/kTr38TOTC+b+K/5Cp3HRbxtbGdr9lVDXcA3ef4gkv2+wVbb++Tg0urb9Tt6nD+L0EXX3rZDW9G/wyavxx2nx7CAcRJ5RcECvMha40IBKykvPyjgRdYaFwpYSXn5QQEvsta4UMBKystP3U6PmfDwYS6/jddspYtl63+hogLpJDXkMDKEfBF71rn1CmABmZpVqlCgCvYsKRTIYFSpQoEq2LOkUCCDUaUKBapgz5L+cwXS1X65qNvp9DJCzeNCup8vh9B7fzqM6CPbnq+rfWHmWWvpftUFpGed9DJSelzoBvNop8mHEK49YiMmCIAACAwnsARsm0C5E2sdIAAAAABJRU5ErkJggg==\")}#toolPanel .separateLine{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAoCAYAAADUgSt0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABlJREFUeNpi4WUQTWMAAiYGKBhl0IIBEGAA+zwA23Qf36YAAAAASUVORK5CYII=\");background-size:cover;width:1px}#toolPanel .text{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAupJREFUaAXtmE2ITlEYx8dn1EiUSYkSKRNRzMpEUayQolgZpXyVBStqdmY1ZDGyIKywsSCFSSE7Y2OiFBuTCPlokPIR/j+et+68zX3Pe+49933vne5T/857znme//M/5z33nHNvS0tp5QyUM1DOwFidgXUa2Edhd1EHeE/C/whDwgShUNYutYivYHOh1EvsKRP/1sr+Ig2gVWKHTfhqld+E38JCoRC2VypZOvdN7Tmrn7B67otBE7zdlK6w+geVU60tt0WniX2jcnJE5QNr3xVpy+XPSyb0WJW6ndb+sKo9V9U2qfku/BLmVimbovp7gWejo6ovN9WjJvBqjKJe678Q09/U5vHK/kJghtcLo9kCNbKdsq3OHM2hmW2blBzxz4VxNYTcNL/DNXya0nXLhB1yZN9ofq6BOmjCdkeXxgwHdXSpbXD4Nqz7uDKxfM7XmfGI+V+r0z9TN7ZHTlgGsLLOTLPkV9lu59UZk5lbl5gRP+CZ4aLF9XjGBXdHOAPo8mReZXFct6NXDk+adO7RSxpLydceKYDB7/ANjPpPjFY8fx8w/36V8z1jcb8hLBP2C5eFhhrbJScqMxgCS5OqT/oPcC3mbs9XB9ZxUmMiZgv8C/uSkvjGcVV4JjDznKxpbLGC4fkiTEtD5BPLZY2kQwIna1q7IwL4Ks9UWj5nPNdlEnKihrCtIoHvSQgyFwcvKrywcJLyAhPCeA5fCQxijS+h7xLYowR8ZbsivPNNFuPPhJy1Ph7mzGySmHlZZ6Y4SUPaHJH9FH4I7EqZGJ9JED+YCfv/fxX+7oz4/32oIgHLKAtbK1L4Xwos06C2RGyQDwutQZlHkj1VlTxbRjanr5024r70VDUZDlqe2zW9PDs5IT8bcbtnrK/7dAV8Ffh6scg3OM6frY2/9W6cQ+D2M5bvZCjeyr19WyhCB89yG8AnlUFedgZE9FjgHGiUXVei1wI33tTGlhZ8W3Oo4oaQ9KrvoC67yxkYWzPwF7rCpZtbo68bAAAAAElFTkSuQmCC\");background-size:cover}#toolPanel .text:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABOpJREFUaAXtWd1vG0UQ3zk7ju0koCROUkWhUFEqQVB4KH1rKVGIXQlUgSoEDy1qpVI+/4VK+SMQFLUIgQQtEkKt+LLr0FQUeIAi8ZUCUkE0qBWJ46A0sc92zzf87i6Oncj4bs/rB5D9cre3szO/38zuzO5aiPav7YG2B9oe+F96oP+8PtH3aW4pltSPtpKg1jLlZT4O3b2m4ONPMgdaZYdaobhvunifuGXMVnQTicez+7rOVdoqny2JABnlFy2QAL5gg2Vht1UCr+hSHoGBGe42C/nrLMRtAU3ba5qcZBLhgNB2ZPaFr1YMq3oqjwAX8wct8HD/pUwi8rkgPi2YqSzMF1SBrtWjnIDJwgaqkXjVMoRpZD+F4MMjX3Gk1riKd6UEBtL6boAaA+j5oZHIBxbAxUTXt0T0tWDRl79ZeFoF6FodSgmUy1xZrKdmR6m0bojIiQav9693NfuijMBQigfh5QOYNOVOotdrgfWEwu8JElkW/GD/dG5XbV+z78oIGFxAxeUQps9HNxLRP2uB/TFOBcH0pv3NUJtSlRCYYtaY+ZgFkDVtbdHWUhAiGNJOYEUjCPTUSJL7Nvb6bykh8Eoy/xig34nFejU72ZmuB2dhIvwbZFJgECkI/Ug9GT/flBAwyZkW8O9rIIEyUP9XSa0QeB4RU1JEmyYw+FnhbizcOAnSo90RZ57Xxy9ejkc/huw1gN8+lCzG/0VM6nPTBIxbqLCWN4nPzO2hvxtZnyJCsJwMVSazknIbDXHta4rAXTMcxry25zNplYrb2GZHV/gUolBiFo8Op/WtjaXde5sisFJAZUWFhVe/WYx3XXY3J8RfD1EGqfZ9EA8Uy+ZzXsY0kmmKAECsTQOn0jYyVNsXqEbr6Ogsh2r7ZN99E4ilcjuREnehwi71hMNnZAwvxKNfYtz3mEaD83M6qrf/X9DvUBh/yRlLqRWjtK0/XZRTZRqfQMcDprBT8Gm5wVVpX7l46yXuza3qOLSo2R53BINj85OdP1ZheX/zFYH8qn7EBo/pAw/Meze3SZJFL4raFqNsp1RfBx7pCFgVNJbSf8XzHk0T+7Hf/3ATLM9NTLt72TCuoHqvUndkeHE3rXgevCYovYhhdNICj43ZnFNZZU1W5bFv+hngZ6Cvm1fzz1R7vL9JEyDTqaDEdMKqrN5N1ZdEDbd3r5hKvqaQFIHhVP4OZA7sPKkU1MJv1Ick93UsFDmLKNxAQRyNndf3yo0WQopAkRmVkwNWJZ1P0IKssXryF8fJIOaTVh+uYKT3R54J7LzMHbBh33PWVNJ6mKS/4Rx3EmvKwMAncK+0RUaBZwLXsvoBTJ8hKP/BrqQyVlxksxPR60iH57Cr7SgXC8+6iG/o9kwA9z12eDGg7pFxg1Y/jerNxTGZy2BPBIZSxfvhnT3w0k0KR9/xg89tTDYRuYDF/AsK5MiFtL7fTb7S74mAwWuHD6K3M+O0Whms/Ikjqa1TYjG7Eoh9wT3w/kFLMQcDjgHlyB2FtwcjbyEKORY0EZsu7PBixpUA5/KHENYeKL649EjnFS9K/cr8PknLsPWufUQ1vF0GuxNg4dz3cIsW7ya2Aa3DThL4Z+ewl8OOKwFsGUo4fPy0bSBydpOtljQz8dB31u0eEoa+vCya/2vKSmkyaU0Fqync9D08w762+irst3W0PfBf8sA/GcCs3A4F3NoAAAAASUVORK5CYII=\")}#toolPanel .text-active,#toolPanel .text:active{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABFBJREFUaAXtWd1rHFUUv2e/srumSpNNUkrUirSglbwU6UulhriJglRERIVWKmgltiCITxYhhfY/EBWKDwr65ENFhWxTuwU/HsQH8aMqSMFqimmaQtLd+Whm5/ib2S7sTnYyc+/cfajsPOzMPffe3zm/c8+5XytE/+l7oO+Bvgf+lx4YPmtODc3XV4cr9ZO9JJjqGXiD3xYs7hRMrz/LnO6Vnp4QGDpnP8iC93tGM/NgtWI9d1sRIKfxWrvBrsBo9Ogh3bgjVR50LWORBcKn9RAhhlK7lh/P/9kS6XprDyG2jYMdxnuWMlNDuKd0Gd2Oo52Ay2K2XUHrG6SeGv+OC62yrrdWAiML5j4YNiEQMkEDiXnAWLOPBOVJy1oJNBrcTF6ETHfD+M3ucnVpiCJ5wLEKj6675t+CRNaL+TAEytHelani92H1snJtI+Cw9TKyNbeZ8b5x66Q1mbUQmGNOYcGKFd8s3MnxeR6S9XRYey0E3pk3noT37+2WvBsUs0ibwnhjg1xRoIWASyIieTutY0GzGLHQPOlsvXkpMYHRr6z7haBpqNkwdYaqZh4aXbCfCK2XqEhMwFl3Z28lrpRHXXZPSNgZ2lRKaRBlR5Xza7axCN8rJCVxPkM7rpQLl4O4MuVEI3DDsp5XM94zkclyxVsyxnZrm4gAjOjYNndTsJkM24tDu3/F2pHgUSZQqtT34NDyMBLYVdWPmaj47z/WC6r9vX7KBJjF0aZiVsbw+oPE8SaO2q9SEt/zNW+t10wcWvRsj7OZzMRSeeBnFQoZlU5GzXzJN57EdXhgSQXD78NiKxaPbU7D9XKp6zkiClt6BLwVtFQx/8B7ZyolDlybuePzKCVh9cML9gPsOBeJqEaDhe3X9tGNsLZhcun4hdKyZzz2PZePTRe/DAOOI18pD/wG46vAG+Sa8WKcPsE20gTI9YdbENP7c6Q+A7UMwY7oXe8boaQUQlIEtleMuzH7YOdJNzOp/ActI5K8J3KFMxiFK2Cwu3TW3C+LJUXAZn4VvkoTiU+XZuiqrLJu7S9MkoMF7bRX57ryC2NsAnt+4Cx04NQlRDrVHHbvW8fDOTqNnHKA9TTulbbJYMYm8NeK+QzCZwzgP12dLn4roySqLc7Ii5gOP8Oqlm3Y1itR7dvrYxPAfY+/70EHP+naQbR8E/m4CKcjMpfBsQiMVeyH4J1H4KU1yhc/1mJwAGRlpnAeyfw7Fsjx8wvmgUB1aDEWAYebUyfi9KPlSaqFoiWtYPGeDyGRzJEESt/wFnj/oAfMmXRTQVJDQ/rflSl8iFGo48w8VTpn7Qpp1iGOJMB14xCGdQuAL1x/bOBiR2/NhUtlWoWuT+AwEg6OqjGeaAIs/PsezEC9Sd6AkelU1teD/xQOxznsRBLAluEmrgt/uW+kcCagqyfF5encj1gov8CEYa6uiuR/TXlTmsy0poPVHG76Hq2y0lZfh/4+Rt8Dt5MH/gPfHXmcyfgZhQAAAABJRU5ErkJggg==\")}#toolPanel .save{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAY9JREFUaAXtWDFKQ0EQDSaNliFl5F9AyBEscgKLHMLGQ9jkCBYeIkUkNxAsLA0eQLAT7bQR8xYZEPmzM7t/d/iaWRgW9r19M/Mm+flkMPDlDrgDNR24gXiIP7u+UHmIauugmrKRsDdgZDSbxifAWmME+ASMjGbT+ARYa4wAn4CR0WwanwBrjRGw1xO4g8n0usztNAcOp/N7IqbuXSbwmposwn+LYNWgKZRfEORi7h6MaKpVKQifFWhgIeSoDl91aOK6enWKBIfgPGQ08Yg7Rwp9E8oJsrwjtN+DD3BnJpUlJDlPaOAiQTeZ2uW/nJWiiXVyRd8X1HXRxyAnzxiXnhCk8Xt/BjbJEf6hKV6npCKRIZzi/BNBOrSHszlzR3NMOiJXTYwoXQIjHdqXEb4GIh2RqyZGlIbAbhGkFd6bRhG+BiItkasmCkrHwLeI8LxvBK4GVtelJmqyFuS01tXlbbRgbflS3kC+d2Vu+gTK+Jiv4hPI967MzdivY3ju9n61fYQ2Pa66z7X12DYv7T87sAMM9Kzb7VMBMwAAAABJRU5ErkJggg==\");background-size:cover}#toolPanel .save:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAuRJREFUaAXtWE1oE1EQntmkTXYLIok/KEGvQvVWKFgo5JKk9OShmoMepAp6KvTgxf+DFw+CPahIr5FCQT0U2xRK9VIU9VBQ8W6IKEktQjaJJjvOBgNJNtvd7PYFhbewZHfevO+b+Wb2vd0AyEMqIBUQpkBkpbRknsIIGDgoEhwIJoXiM7gimkA0vkxAtMJO+LICTgqJHpcVEK2wE76sgJNCosdlBUQr7IQvK+CkkOjx/74C6FWh6Ir+mohGvc5vnYcI74upoZFWm9trzxUgoB9uSRz9CLcdfWwcvH/QhPAiVGmTP1oiCDhTnNDmbDi6mqPZ0mUy4AEgbA8O4HRXJxdGzy1kYkdX9VNUp6ecQDWAwdHvqcFNF5xwMFs9XqP6W27BMACe3prQFt3M6+bjuYVMsGJCe4aoPOJ2CtWhtnD4HWndSFptsQ1Sf1NtoRE8wryf4E1cXwmYAOqe8Cy3wUcO6FiloN83bTsd5Z+Ve9x2w4j4ObxPm9nJ182Y7wRyJ7E8gME0B1ThwC5ElvUpO+JGy5FxqdFyEEznR1C383Vr952ASfQtGfoASLMNUqTHh9bKRzsDiKzrMTJo/q/9itvnpROn896SgNf/corJoYdchedchb3VX5SZIgo0yW4RKVCFTGPFQljqdcUycezisiTAJJONs8new68K6jS3Rw6Axtaz+s3m1Lls5RoQjfOG9TUU0s437T392sRlTaAn1HbnXAq3MIBneWk0DMKr+7Pl8QOr+hgHf8O0gaKcy8ex0D7L392uJmCGUkiorxSkO1wFhbPI1Ax4wtcB3nDuFhPqmr9wrbN3PQGTIp7UbgPiBu8PMVb/CD8bb06E1etWev8WIQksItbDCGlW/ZO53vOrwpmXcaz5D9eK4P1dyIrVZskntS9sGG4zCrgRUgEBcdpCygRspenTgKxAn4S2pZEVsJWmTwO2+0BkuUR9isEXTbcWeuELUezkfzk2sZlLdKmAjQJ/ANa802uhvjOOAAAAAElFTkSuQmCC\")}#toolPanel .save:active{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAmNJREFUaAXtWL9rFEEUft/mcne7AYuY0v8gpDsQ7A7h7oIK6bxCi5AfrZDCLoWFjX+Bhf9BijRB0wixEVOkEIykDTkuGHKbNMkpqJO3p5tsuNnM3OwMKMzBcbPvx/fe+97sG26I/Mcz4BlwxsDk5tlG8nUWgIFLLsFJ0AOn+AweuA7gGt8X4JphFb7vgIoh13rfAdcMq/B9B1QMudb7DrhmWIXvO6BiyLX+v+8ATBm6vXn+SQhx19Q/6wfQTq81UcvKdNfGHRAkTnSDKO0ETpU2OQbGBVAFSwSKc3D1xaDTchkL+g7XLY0LiOtRBwEW/8BBXIfVeMJfH4Hlw/vhvoaH1MS4gASt14jWgeA1kRj9XRLsA3oTz0Zr0sw0hYUKSGKEt6ornMiuZrxLMwB71ano2aXAcFG4gM499MdRanNC33VzYOp/jFGp3a3hXNcnz65wAQnwt2blC0GsDIKke1sW8Ur3/KhV/iwzGVU2tHfTe5y4NfFwVDA+G9b5bJi7yY9n/gbP/Ec32ch0eXkN3wsVuMsJKVzoU7/GZ8QdWRKc/GGlEs3LdEpZTl5WtlAavNNCjDE8IcJvutourE5GJsuC4Gm3juPU3sav1QKShI4b4YcA4iUNxmR6Pggmn171GuF7G0lnMawXkIDXm9EL7sDHQRH8zBNqe6YarmYD21o7KWAN+FUFtZn1r8m8L4/j8VYdP20lncUZfomz2gLrbjM6YPfpAhBark46oBXZkpEvwBKRxjC+A8bUWXL0HbBEpDFM7jkw+e5s9L+JxmmYO8q20FtzOOee/3Juzov3ATwDMgYuAKebdW38MyGrAAAAAElFTkSuQmCC\")}#toolPanel .close{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAUJJREFUaAXtmD0KwkAQhdPZWNho4wlEvIKnyDE8k3ewyE08hXaWWuh74MAihvzNbCY6C8MKgdnveybsJkURIxKIBCKBSCAS+JMEZvAsUYsMvnOLNQj/RJ1RS4sF0JMhnVB31BalOpg84a0kCF+9+18xm4TEphYSn/A7rGM2tCWywksqWhKjwGtJjAo/VMIFfF8JV/BdJVzCt5VwDd8kMQn4Ook1LlQo7uDcYU03KfRXGek+cUPHScFLAkxe4B/4vZcLU5jTe57wVgdAkyxSeN7zTN7iAJgFXh7Y9JmwfJ8YJJUmf0EngZemriWa4F1LtIV3KdEV3pVEX3gXEkPhR5XQgh9FQhs+q4QVfBYJa/g6CbXPmAeswAPZtx1WFteaV2gkZ6dSq+kGjY4o9e+VNYBMnvD852NEApFAJBAJRAK/m8ALlHeZDLF6LwcAAAAASUVORK5CYII=\");background-size:cover}#toolPanel .close:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAjZJREFUaAXtmN1KAkEUx2d0V3EpCUUQuonozleIQC0Coa7qEXqlLrrpAYIgujEoBIleIKKLPugyNSwNdtGy055kY7VNZ2fPXESzIIoze+b3++/XYRnTm05AJ6AT0AnoBP5DAks3kMyc2FsLNZhT7ZurwYzoGjHRie17Z4N9wEG3Z5/n65AT3S/MPAwpW7WPBj2nna/2CiL7CgukE6lTxtkVA1bo23aNWgLh27f2IQBsMoAOsxJNUoGHIn9JWFZRhYQH7wJX3M+TaRilxxXeEhHgIpP8czB5PAJ4JFAGpUQX89fxfgfBN9aSl974tO/QAliQSiIqPLJICVBIUMBHEogiQQUfWUBGghKeRCCMBDU8mYCIhAp4UoFJEqrgyQWCJHjaWoeOveeOfT+kwtznseakTfo2OqnoyHOC8VfGYNad//WEpYRHBiUCWDh7AfPQca4RHjh/N0yz3CqbdRyj3ISbuTCL4jk/PG2G8BzAGLz1d6kbQGQiFxi/YDF5FQ2gFyipwDg8dpV42qjqYlGC7Brww7tFW4ZhlP0X7MiFTdDFekeARGAavLeYConIAqLwqiQiCYSFVyEhLSALTy0hJRAVnlIitAAVPJVEKAFqeAoJYQFV8FElhARUw/8mkU5ay/g+yhsP+hZqJZ7vnB1354pr++MJG1RU9j98v2Ryq+T1Tt2+szqtlpAAi8fPOGf7JjeK/vZgWnGZ8cY6b2LyLMa3M4upY5kaeh+dgE5AJ6AT0An8mQQ+AcXxBv2nkpz+AAAAAElFTkSuQmCC\")}#toolPanel .undo-disabled{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA/pJREFUaAXtmU9Ik2Ecx93cdJbEDlIQBKvoZOVBbzL8n5jdOowET4HQH8MOXZW6ehHFpAjqErJDR7P8w4QQdhiBhR2izFOHFTRkObO59fmt94Wx+bx73V5lg/eBn8//7+/3/T2/93n2PFZV2cn2gO0B2wO2B0rwgKOEuXlTV1dXT+7s7FxNp9PtSKPD4fCRn5CBlLcob5KvIysej+d1a2trNA/kgA2WEFhaWvKj9wHSh5EuMzZAIsm4eWS8u7v7nZk5+40piQCGn8PgSYD7BRyj/pK9pW2BcqSuru6r1+uNSV8sFvMmEonz9LXQd4WmXspu6SPN1dTUDLe1tX37XzX/t2gCy8vLNzDgKVKPQTFkwul0Tnd0dPw0oz4UCjWkUqk7zB9BvMyPI0NdXV2zZubrYwwJAAymI60P1nM8P0rfQ6nTH8TT94qNZ/luWJlJ8AIa3hgh9UjXVShXElhcXLyEcSEx1OVyzeBZidmqLOP3qA739PTMFFJiph99txg3hVSj1zQJJQGW+GIymfwoygH8hNxnyRuovkTE+ADGvyK3LEHiOmBBpJpwHDATTkoCa2trx6PRaDzbOkh8Z0VO03bbKs9n40tZW4nH6Iq73e7LhT5sZy6AXm9qavpN+Ydel1wzPgn42XA4nNnfs/utKItjwA+iq353d1dCyjApCcgsgPbb1lyAP4jH45/5Hm5SNsQw1K7olE0B3bL99qNDzhhlKqR8PwIZMAw/hTxjOw1HIpFjSg1FdMiOBoEJbaockMpkSAADlQQ0RAmxN83NzX+UGorskDMFEnIw9slWq4IxJKAIIcEK0zfo8/nOsGePUpZdydKkHYhyqrvk95UK3PB3C4Z9ASAzl3KCwiz5NNvbexWgle3oXgDvGnk7+QskLxkS6OzsXCHGp5m1UVtb+9zv9//KQzjEBpwVEQcijSo1hgQASDHxrmryYbfLj8Ht7W3ZDX0qXYbfgGrSUbXrv2RZAeWZU9YEzDiqrAnIHUJIEEJbKjJlTUAuQGI4IbRZkQQwvEUMZwXWK5IAhsvVUwisVBwBuXJidC/GJ+UFwxICgHpUQFa3a/dlufTPG11XTX/EnMiDe3t7H4x+WFlFQnQQ/yMa3rgRrmkCeCQA6AW5gBsBWtGnXfJlC50r9GZkmgCxKJeMOCQC2rXPClvzMARbdIgueSvKG5DTYJoAntgAdEibP6VdwHPgSqtqmJlrpOgqdB8WbaYJyGB5JQB4jGI1ErRyJTSszIuE6DDzIiE2KV8lpFOVst6GZI8uz4ctlfF6Ox4bwPgnxGv5Pi3qxqpyVqJyH3ezSWlPH/J6UFnP69kkpCwH0FH/gyPXBrtue8D2gO0B2wMH8sA/gAT1Qeh5oB4AAAAASUVORK5CYII=\");background-size:cover}#toolPanel .undo{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAp1JREFUaAXtmb1LHEEYxs8oiSiIgWDtR2lsJI2FcKRIYZsqoiAIAYs0/gEe2Aip0wqWqfVIbReS1GlSXRMQIwgKgh+QPL+wLyzDLsrM7N0uzgvP7czsvM/7sTuzM3OtVpKUgZSBlIGUgYAMDAXoFqlOqXFFaAvzwrQwISAXQk/4KRwLX4RToRayLC8OhVvh7wNBX3TQHZjMynJXMKdvVD4SPghLAk/kaQbKtHGPPvQ1PThmhL7KO1m7FHDiXOgIL4SHCn3RQRcOuOCMKmVjZEdWMAo+C2TXV9CFw/jgjiILYjkTeOQjOUZz/k5tW7n20CJccBJIlCBeZmQQMnO8EVazNgy9FWILnBZE8Os0LjJ7rHb9nbXFzLybBLixx5gIHtjM0+a8XZn+Pgo2v6sYXWxMMDsFyTdpm+Pu9UT3NoUnQRaKlRnYNjsFfScsE67z+fp3GRsr9iOotSNt7PCx85Y9aeaddcu8YrvCsLeFckW+E3zseGW9p+n3Unadpv5VWBOeCVXKkcixt+Fr5HVGAMmVsC8sCv0SvkHYPvA1yAD9JGwLz31JAvRYOxHAjwCOgary7hPAn4F6EWCclSwBXJdxVDGHl9mqpL3uAUxmUV+URV/3AOYyx3tNDeBV5jir4UKp+xNgCY8c//9t2E+UpYQb86jbUGG9I26m0KDFXN6/dVV+Cd4LqzzZPWVsRFlO5+10VSEjLLGrFlvGYzOazIqJbR5BNGZL6UbPRpsAGrGpd523emOOVczhoqsFYWMiZGCja+88fFHOhIqcdts4I7IxUdujRddpt87AttmJ7LGHZRvITorNCNllSQwo08Y9+tAXHQBH8BmQOLyFow8+OH0/Xi87vPWNhCyvCG2hUX9wyN8kKQMpAykDjzED/wAOt9HUp+PK6gAAAABJRU5ErkJggg==\");background-size:cover}#toolPanel .undo:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABOlJREFUaAXtWU2IW1UUPufmZ/KSUcoknYhUqIouHEdcWLqxoDA2E/82goMFdzIgpcWFiriw1YWb2UilDAri30JmIYKlJhkLFQTpQhBGZ+NPZyitNm3mh2knL5kk93jOewam8b6Xl0wYI+TB5L137z0/37nnnXPuGYDBNbDAwAIDCwwssAML4A5o/0WaLtBoXVeeBNCPAeAYAe3n++3uQtpAwGUAWgRQ34VV7JtiBq+5c93/9gTA3rx9SBO9RghZIAoHUgexjgQ5hThzfdL6PhCNYdGOAKTPVe6p1RungOAphzdiDYEKgDgf0vAjKuuP1D5Yl7nSZdhD2r63oeARBnmYADN8j7h0cDaC6lgxYy057x38+AIgIuSLTPxSufILbPEPec0wICuJ6r1YNHb6z8exZFrfOnbneUpVtipHgfQrbIA9LOcmS5ouZeNftK71ezcC2H+eYhtVe5799SH2289jYevklQlcaTIaydtvseC3nXfEuQhax7v1Z/luamTzLtKUy0+dWJ203mnKanc3AkgWygdJ04VtxGuo8MR41JpdqFbedJXHBio6tpJJzG5b1/VjsrD5Mml8n40W4t0MDMIIIP1tdbxWry/w5HXW6Cf2ocOiGb9f5ud9/NTgl6nVyfiXXWtsIBzJl59jd5oTEArwSBB3UgY+0LCiy+44Dq9kExml4Fn20d9c5XkG4eeQUgsm2p2MiUFkV4WHfF/pgn13O35GAKVH8QYTljiOW6PnKF3KJM7ccZf1IFvldd6FDfbXhxsN/ctIrjwzcoH+ifPtRAWbd1ySvysJDjXS7FL+lxGAkLhJB6BOrhUWx3CLt3QmFInfz0Qf8RKO9/Qqrpd/3VuoZP3FdDYrQYEVWJfwLDnGj9oTALvLkhCqOtyyjdcmsFjKJl5SGD7AQhaJIK21/oqjScJPUCdzTkTjsCw0kiD9aD0BILoAOBPcAuAkkUoVNp/RUHuX9+kBlzmtccKq+QnqdE5yCifEmmR3CbVe9N4AgJwdINAOAEk8yYL9xqm8fVFr+Jq3N8OJpyLuRDE8IC7mJaSbcUmITlbn0sStr8xcPOsWRaElDQ12cziYzJc/q1bs5/mjHhI2HJF+Z+Vn48PWx5cO4ZqZdQ9GuSThgPG0WxzCJyaOngD0bUM/4E17k6PBuPyx2po/7DMhUKeLmaF5rxLDJKTbMamn6g4xjnnx8AQgoXQ0V36igTBNqJajGj69mrWWhRGH0l25pBgEXWYnkLLcfO2WLmbpbUbHFin616VylU22tZqNO+7bSuL5Ebcu7Nf3vgYgZwjXcLThZcC+BiAHIFG8WRWYQPQ1AOf05mgt52jz1dcAOAc4Zbw0Aczq84zXxH89LpnfOTfz4V86GF76dARAjppejHo97p6XKcIZP+d3XA0MIJm3X7xRtRf8CqtegXBkyGGfL2m7+PENDICLuikuKe5zDuB+HHsw5x7yOYQinG3XMwoMIBIOHZfWB39YU3IA74GeRhYOb5YhsqRXZFy0bTAwgOJE7CL747TQSvfAOYBvY9SLR+HpdiY49rOsII2uwABEQadLwC0PhhDiCmuulzvhWt7tSEhbJUhHQnTqqpjr+8aWIGt3pfL2ES5zP5DuAZuhv1qL7ZRvzvd9c7epaLv7/7a93gpMEtBu/4OjVYfB+8ACAwsMLDCwQEcW+BshWTaR4gPCwwAAAABJRU5ErkJggg==\")}#toolPanel .confirm{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAN5JREFUaAXtmE0KwjAQhXsuvUZBxIU9RN17WZfeQNE3iwEXSqJmknnwAkMaOovvfSn9myYNGZABGZABGZABGagxMKNpX9OYsecEqAfqmhGuxOTwdzQeS83Zzq8AMvMGv6CoBjX862WzUGkHrOBH7ZjMu3l74h180WFubv4CaLv3nhnhjXmHuqGiQzQ3b/A+okOEwkeH6AIfFaIrfOsQQ+BbhRgK/2+IFPC/hkgF/22IlPC1IVLDl0JQwH8KQQX/LgTtB7i/O1H+PfCd2OBg6wvNMiADMiADMiADMkBg4Akg3m3A8SMAAwAAAABJRU5ErkJggg==\");background-size:cover}#toolPanel .confirm:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAWBJREFUaAXtmDtOw0AQhmcCDa0xOQycgB4JIRokboCgBlo6JA5AQSoOsFruROlNQ3bZAQWCoyTY+/BG+t1Efmjn+z+vPesQYYMBGIABGIABGICBjQYqbU5qZc7aF47aB0rc9+A3ZN2rZffU5tttHyhtX+AtuQcitsx8VRrfWp5am+tKNa5SZravphdrLy7t5HbD+2mzveYBP9DDIG8bTBuR/9Xx9PQ8140INb/UidnRo7X2pVbNXeoQf5oU8eX78d5z15pLAUZMvtvxzBLdpgwRA35l2ANtTn33+5CHKkWI0GmzEnzxRKoQWeDnQWKHyAofO8Qg8LFCDAofGqII+L4hioLvGqJI+P+GKBp+U4jc8DwH6vMrfcKvOSZEbsevSe79EqT5+QDvubbpyhEUQIothvgu7v89yAQv9YIDyCC/IYhzwkvtaNtYm8PxmzmKNiAGggEYgAEYgAEYgIH0Bj4BteBmoOo+DxkAAAAASUVORK5CYII=\")}.__screenshot-lock-scroll{height:100%!important;margin:0;overflow:hidden!important}.ico-panel{border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #fff;height:0;left:23px;position:absolute;top:0;transform:rotate(180deg);width:0;z-index:999999999}.ico-panel img{height:100%;width:100%}#optionPanel{background:#fff;border-radius:5px;box-sizing:content-box;height:20px;left:0;padding:10px;position:absolute;top:6px;z-index:999999999}#optionPanel .text-size-panel{align-items:center;border:1px solid #bebfca;border-radius:3px;cursor:pointer;display:flex;float:left;font-size:14px;height:20px;justify-content:center;overflow:hidden;width:65px}#optionPanel .text-select-panel{background:#fff;border:1px solid #d8dcea;border-radius:3px;display:flex;flex-wrap:wrap;justify-content:center;left:10px;position:absolute;top:-321px;width:65px}#optionPanel .text-select-panel .text-item{cursor:pointer;font-size:14px;height:20px;margin-bottom:5px;text-align:center;width:45px}#optionPanel .text-select-panel .text-item:hover{background:#bebfca}#optionPanel .text-select-panel .text-item:first-child{margin-top:5px}#optionPanel .brush-select-panel{float:left;height:20px}#optionPanel .brush-select-panel .item-panel{float:left;height:20px;margin-right:18px;width:20px}#optionPanel .brush-select-panel .item-panel:first-child{margin-left:2px}#optionPanel .brush-select-panel .item-panel:last-child{margin-right:0}#optionPanel .brush-select-panel .brush-small{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKlJREFUeNrs18EKgkAUhWEnwmW1amObHqKeo0ftOfIh3OSmlba0xXSEK4SICAoz4X/gINwL8sE4C533Pok5myTyAAQIECBAgAAB/jdwO/cFO3dsH3v1qmY2LtWHWr/9KyxQOag3Nf2ZnQ17V6vQR3zp4bqktgv+DWYjuxO3eELKkd0zBmCuNgPzxnbBgZXd1kL9WIslbnAbx38xQIAAAQIECBDgqoFfAQYAhLQbgzDvXkAAAAAASUVORK5CYII=\");background-size:cover}#optionPanel .brush-select-panel .brush-small-active,#optionPanel .brush-select-panel .brush-small:active,#optionPanel .brush-select-panel .brush-small:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALhJREFUeNpi/P//P8NgBkwMgxyMOnDUgaMOHHXgqANHHTjqwFEHDm0HslBqAB+jGIhSBeIOIHaBCu8B4gogvv3p/yuKzGektMEKdKA6kDoBxAJoUh+A2ALowJsDHcVtWBzHABVro9RwaoTgRxCFQ/oLMAR5R3MxAbAHj9yuweDAamiGYMCSSaoHgwNvgHIrEK8D4s9QvA4qdmPAM8loVTfqwFEHjjpw1IGjDhx14KgDRx04pB0IEGAAHeMoHW2kl/cAAAAASUVORK5CYII=\")}#optionPanel .brush-select-panel .brush-medium{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAS9JREFUeNrs2EsLgkAQB/BWupQQHXpczbp36/EB6ptH1M2D17RLhx6XQG9lszCBxEa5zoTQDPxvjv52RR1UWZbVqlxOreIlQAEKUID/Dqx/e2BL9d4t0MP0IS7kBkkgZ0iMub82XrMjLdBQGjXTdgO6jRlpC2QDiX51ixVkClkacMbNhyywR/0COIGMLfrG2MsK9C1xeaTPBdTHzgkezHmR6zoFd88lAOpzDDmAHuHrzeMA9giBXQ5ggxDY5ADeq/4tTgmvm3IAL4TAEwcwJgTGHMAdTillK8FzsTwkawLgGkcylm+xXnlQAhcU2T3baWYLCS36QuzlmahzpX/mrCAHnPE+zYRXhO1strzMRK0n5D0OEQNIJzdMPEf+CGHWL3klf7cEKEABClCApeohwADD8zb9WRTsHgAAAABJRU5ErkJggg==\");background-size:cover}#optionPanel .brush-select-panel .brush-medium-active,#optionPanel .brush-select-panel .brush-medium:active,#optionPanel .brush-select-panel .brush-medium:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU9JREFUeNpi/P//P8NgBkwMgxyMOnDUgaMOHHXgSHcgC7EK+RjFsAmzAXEAFFsCsRQQ/wLiJ0B8HojXA/FGqBgK+PT/FVH2MhJb1WFxYCAQdwGxCgGtd4C4HIjXkeNAcqKYGYg7oRaqEKEepGYtVA8zzaIYCbQBcRkZ+mB6ymmZSULIdByyI0NI0UBKGgRliLtALENhxnwKxErANPiL2iEYSgXHgYA0EIfRIooDqFi8BdDCgaZUdKAJLRwoQUUHStLCgb8YBgCQ4sDnVLT3OS0ceImKDjxDCwduoKIDN9DCgauhrRRKwVOoWTTJJEVUcGAhEP+kVV0M8nk3BY7rJiX0yG1uVQLxFDL0TYXqpXmT/y8Q50JbJXeIUH8HWo/nQPWSBChpUcOa/KHQ1rUxtCEAywhnoU3+1XRp8o/26kYdOOrAUQeOOnDUgVgBQIABAPYuSgtJpajwAAAAAElFTkSuQmCC\")}#optionPanel .brush-select-panel .brush-big{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaNJREFUeNrcmMFKw0AQhpOqRdGUCloD2lMv1T6B6RMI4sOK4BM0b1Clh56skFahpVaUaln/wBQkzKYmTbJTB75TSPJlN7uzM7ZSypIc9sYIVuxa0nsdUAcuqIIDUKZrczADExCAJ/CW5OFTNUolaIMGaIGThB80BF3QByoPwVPQptFaJ8JR7YDnrAS3gAfOM/69HoEPFusI7oIrcJzTGngB9+AzjWAod5PBlP5lym+jkqsEt8E1qBW0m4Q2d+A7KljS3OAVKGfRuzzuQkmzWpsG9uQmvTtW0KatxFS0yUEr2ChgUcRFlRy0ghcC0m9LJ+hQXjUdYQqtcIJ1QYeYM07QFSTocoKHggSrnOC+IEGHEywLEtyJyySi4rfgXJDXFyf4LkhwxgmOBQmOOcFAkGDACQ4ECQ44wamQURySC7vNPAgQ7MYdt/pUxJiKCTloBRUV1abCj3YduEwSVvw9A3I9bqHqUl2HSsGiYqSbuY0t3JexR62Po5zkXqn18ZG2N7PsMlxaQptH0TrBs7Jpv/mrMte/bGByx/LiWsBSQ7zgjwADAPqYqQ1c9nN+AAAAAElFTkSuQmCC\");background-size:cover}#optionPanel .brush-select-panel .brush-big-active,#optionPanel .brush-select-panel .brush-big:active,#optionPanel .brush-select-panel .brush-big:hover{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhRJREFUeNrUmLtPAkEQh+/UghCxw06JNuCjJURBK+OjsNVEW4KF6P+iYKGF9rYWhmClKKGg8wGNRu2kA4M25PyNGRKFPb0Fjlsm+SKG3MyXLLezs7phGJrK0acpHgP1D0P6sOyzY2AJRMAE8AEPf1cBz+ABZEAKPMkkLxtv33/1+hJbFOwHayAOZuh5i/WoSBYkwSmo2SG4ABIg0OaqFcAOuLAiaOU36AKHIN0BOY1zpDmnq92XxAsuQcyG33+Mc3tbFaQHr0DQxpc0yDW8soJucAb8XdhJ/FzLLSO4B0Jd3O5CXNOSIL2tUQf25CjX/lOQ/t93sHEkeK81FVznruBUBLgRmApuK9B+42aC1FtnFRCkFjouElyW6K12hs6HkCbBsEKnrLBIcEohwUmR4IhCgj6RoEchwcGeOfL/FKwo5PUuEnxVSPBFJHivkOCdSDCjkOC1SDDF05fTYbBLk+AjuFFAMMsuwm3mQAHB5K/G3DAX02HxtkPjZasz8zQN9mZzcY2Haqdit/HWQdRJaOI/cUDumAd6S1MdnWpzXZTLma2cmWAVrIJiF+SKXKsqe7NQAvMgb6NcnmuUWrn6oKBXaQ4c2SBHOSNcQ2tVkOIDbIHFDi15kXNRzk+Z49Z/keaxYIN3e9m2SM9sco605QlK8oZVaxhTV3iZaGMfpTT8XZmPTAU+hJxr7V4B98KJWsn4EmAAKPJ2SXt/mW0AAAAASUVORK5CYII=\")}#optionPanel .right-panel{align-items:center;display:flex;float:left;margin-left:39px}#optionPanel .right-panel .color-panel{background:#fff;border:1px solid #e5e6e5;border-radius:5px;display:flex;flex-wrap:wrap;justify-content:center;position:absolute;right:28px;top:-225px;width:72px}#optionPanel .right-panel .color-panel .color-item{height:20px;margin-bottom:5px;width:62px}#optionPanel .right-panel .color-panel .color-item:first-child{background:#f53440;margin-top:5px}#optionPanel .right-panel .color-panel .color-item:nth-child(2){background:#f65e95}#optionPanel .right-panel .color-panel .color-item:nth-child(3){background:#d254cf}#optionPanel .right-panel .color-panel .color-item:nth-child(4){background:#12a9d7}#optionPanel .right-panel .color-panel .color-item:nth-child(5){background:#30a345}#optionPanel .right-panel .color-panel .color-item:nth-child(6){background:#facf50}#optionPanel .right-panel .color-panel .color-item:nth-child(7){background:#f66632}#optionPanel .right-panel .color-panel .color-item:nth-child(8){background:#989998}#optionPanel .right-panel .color-panel .color-item:nth-child(9){background:#000}#optionPanel .right-panel .color-panel .color-item:nth-child(10){background:#feffff;border:1px solid #e5e6e5}#optionPanel .right-panel .color-select-panel{background:#f53340;border:1px solid #e5e6e5;height:20px;width:62px}#optionPanel .right-panel .color-select-panel.text-select-status{margin-left:31px}#optionPanel .right-panel .pull-down-arrow{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAQCAYAAAABOs/SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANNJREFUeNq01TEKwjAUxvHXOAhKJ3Fwc9PVzbWipxCdHLyMV9AD6A2EegRdvYBOnd3E70ELIcT2JU0C/1BI4AeB8pKUhlMiOqAtKijuGqEj2ne61D/jY1V2QZ+IaI7maKywrdETzdAVDSKi/Lp3tGP4hRYRcRPlly1Uech4FgG3onygtEvvwDijNxtqwiHxCp3YUBscAm9E/8FtcBFaB/vgYrQJdsGdUAkswZ1RKVyH6+hDivJKMCTa/CY9DV26DBlX2MTJB/WFK/yEvmjjM05/AgwANuZSRB8r5twAAAAASUVORK5CYII=\");background-size:cover;height:8px;margin-left:10px;width:15px}#cutBoxSizePanel{align-items:center;background:rgba(0,0,0,.4);border-radius:3px;color:#fff;display:flex;font-size:14px;height:25px;justify-content:center;width:85px}#cutBoxSizePanel,#textInputPanel{left:0;position:absolute;top:0;z-index:999999999}#textInputPanel{border:none;box-sizing:border-box;font-weight:700;margin:0;min-height:20px;min-width:20px;outline:none;padding:0}.hidden-screen-shot-scroll{height:100vh;overflow:hidden;width:100vw}.no-cursor *{cursor:none}";
  styleInject(css_248z);

  /**
   * 绘制蒙层
   * @param context 需要进行绘制canvas
   * @param imgData 屏幕截图canvas容器
   */
  function drawMasking(context, imgData) {
      var data = new PlugInParameters();
      var plugInParameters = new PlugInParameters();
      var canvasSize = plugInParameters.getCanvasSize();
      var viewSize = {
          width: parseFloat(window.getComputedStyle(document.body).width),
          height: parseFloat(window.getComputedStyle(document.body).height)
      };
      var maxWidth = Math.max(viewSize.width || 0, Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), Math.max(document.body.offsetWidth, document.documentElement.offsetWidth), Math.max(document.body.clientWidth, document.documentElement.clientWidth));
      var maxHeight = Math.max(viewSize.height || 0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight));
      // 清除画布
      context.clearRect(0, 0, maxWidth, maxHeight);
      // 屏幕截图存在且展示截图数据的状态为true则进行绘制
      if (imgData != null && plugInParameters.getShowScreenDataStatus()) {
          // 调用者传了画布尺寸则使用，否则使用窗口宽高
          if (canvasSize.canvasWidth !== 0 && canvasSize.canvasHeight !== 0) {
              context.drawImage(imgData, 0, 0, canvasSize.canvasWidth, canvasSize.canvasHeight);
          }
          else {
              context.drawImage(imgData, 0, 0, maxWidth, maxHeight);
          }
      }
      // 绘制蒙层
      context.save();
      var maskColor = data.getMaskColor();
      context.fillStyle = "rgba(0, 0, 0, .6)";
      if (maskColor) {
          context.fillStyle = "rgba(".concat(maskColor.r, ", ").concat(maskColor.g, ", ").concat(maskColor.b, ", ").concat(maskColor.a, ")");
      }
      if (canvasSize.canvasWidth !== 0 && canvasSize.canvasHeight !== 0) {
          context.fillRect(0, 0, canvasSize.canvasWidth, canvasSize.canvasHeight);
      }
      else {
          context.fillRect(0, 0, maxWidth, maxHeight);
      }
      // 绘制结束
      context.restore();
  }

  /**
   * 对参数进行处理，小于0则返回0
   */
  function nonNegativeData(data) {
      return data > 0 ? data : 0;
  }
  /**
   * 计算传进来的数据，不让其移出可视区域
   * @param data 需要计算的数据
   * @param trimDistance 裁剪框宽度
   * @param canvasDistance 画布宽度
   */
  function fixedData(data, trimDistance, canvasDistance) {
      if (nonNegativeData(data) + trimDistance > canvasDistance) {
          return nonNegativeData(canvasDistance - trimDistance);
      }
      else {
          return nonNegativeData(data);
      }
  }

  /**
   * 画笔绘制
   * @param context
   * @param mouseX
   * @param mouseY
   * @param size
   * @param color
   */
  function drawPencil(context, mouseX, mouseY, size, color) {
      // 开始绘制
      context.save();
      // 设置边框大小
      context.lineWidth = size;
      // 设置边框颜色
      context.strokeStyle = color;
      context.lineTo(mouseX, mouseY);
      context.stroke();
      // 绘制结束
      context.restore();
  }
  /**
   * 画笔初始化
   */
  function initPencil(context, mouseX, mouseY) {
      // 开始||清空一条路径
      context.beginPath();
      // 移动画笔位置
      context.moveTo(mouseX, mouseY);
  }

  /**
   * 绘制矩形
   * @param mouseX
   * @param mouseY
   * @param width
   * @param height
   * @param color 边框颜色
   * @param borderWidth 边框大小
   * @param context 需要进行绘制的canvas画布
   */
  function drawRectangle(mouseX, mouseY, width, height, color, borderWidth, context) {
      context.save();
      // 设置边框颜色
      context.strokeStyle = color;
      // 设置边框大小
      context.lineWidth = borderWidth;
      context.beginPath();
      // 绘制矩形
      context.rect(mouseX, mouseY, width, height);
      context.stroke();
      // 绘制结束
      context.restore();
  }

  /**
   * 绘制圆形
   * @param context 需要进行绘制的画布
   * @param mouseX 当前鼠标x轴坐标
   * @param mouseY 当前鼠标y轴坐标
   * @param mouseStartX 鼠标按下时的x轴坐标
   * @param mouseStartY 鼠标按下时的y轴坐标
   * @param borderWidth 边框宽度
   * @param color 边框颜色
   */
  function drawCircle(context, mouseX, mouseY, mouseStartX, mouseStartY, borderWidth, color) {
      // 坐标边界处理，解决反向绘制椭圆时的报错问题
      var startX = mouseX < mouseStartX ? mouseX : mouseStartX;
      var startY = mouseY < mouseStartY ? mouseY : mouseStartY;
      var endX = mouseX >= mouseStartX ? mouseX : mouseStartX;
      var endY = mouseY >= mouseStartY ? mouseY : mouseStartY;
      // 计算圆的半径
      var radiusX = (endX - startX) * 0.5;
      var radiusY = (endY - startY) * 0.5;
      // 计算圆心的x、y坐标
      var centerX = startX + radiusX;
      var centerY = startY + radiusY;
      // 开始绘制
      context.save();
      context.beginPath();
      context.lineWidth = borderWidth;
      context.strokeStyle = color;
      if (typeof context.ellipse === "function") {
          // 绘制圆，旋转角度与起始角度都为0，结束角度为2*PI
          context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      }
      else {
          throw "你的浏览器不支持ellipse，无法绘制椭圆";
      }
      context.stroke();
      context.closePath();
      // 结束绘制
      context.restore();
  }

  var DrawArrow = /** @class */ (function () {
      function DrawArrow() {
          // 起始点与结束点
          this.beginPoint = { x: 0, y: 0 };
          this.stopPoint = { x: 0, y: 0 };
          // 多边形的尺寸信息
          this.polygonVertex = [];
          // 起点与X轴之间的夹角角度值
          this.angle = 0;
          // 箭头信息
          this.arrowInfo = {
              edgeLen: 50,
              angle: 30 // 箭头的头部角度
          };
          this.size = 1;
      }
      /**
       * 绘制箭头
       * @param ctx 需要进行绘制的画布
       * @param originX 鼠标按下时的x轴坐标
       * @param originY 鼠标按下式的y轴坐标
       * @param x 当前鼠标x轴坐标
       * @param y 当前鼠标y轴坐标
       * @param color 箭头颜色
       * @param size 箭头尺寸
       */
      DrawArrow.prototype.draw = function (ctx, originX, originY, x, y, color, size) {
          this.beginPoint.x = originX;
          this.beginPoint.y = originY;
          this.stopPoint.x = x;
          this.stopPoint.y = y;
          this.arrowCord(this.beginPoint, this.stopPoint);
          this.sideCord();
          this.drawArrow(ctx, color);
          switch (size) {
              case 2:
                  this.size = 1;
                  break;
              case 5:
                  this.size = 1.3;
                  break;
              case 10:
                  this.size = 1.7;
                  break;
              default:
                  this.size = 1;
                  break;
          }
      };
      // 计算箭头底边两个点位置信息
      DrawArrow.prototype.arrowCord = function (beginPoint, stopPoint) {
          this.polygonVertex[0] = beginPoint.x;
          // 多边形的第一个顶点设为起点
          this.polygonVertex[1] = beginPoint.y;
          this.polygonVertex[6] = stopPoint.x;
          // 第七个顶点设为终点
          this.polygonVertex[7] = stopPoint.y;
          // 计算夹角
          this.getRadian(beginPoint, stopPoint);
          // 使用三角函数计算出8、9顶点的坐标
          this.polygonVertex[8] =
              stopPoint.x -
                  this.arrowInfo.edgeLen *
                      Math.cos((Math.PI / 180) * (this.angle + this.arrowInfo.angle));
          this.polygonVertex[9] =
              stopPoint.y -
                  this.arrowInfo.edgeLen *
                      Math.sin((Math.PI / 180) * (this.angle + this.arrowInfo.angle));
          // 使用三角函数计算出4、5顶点的坐标
          this.polygonVertex[4] =
              stopPoint.x -
                  this.arrowInfo.edgeLen *
                      Math.cos((Math.PI / 180) * (this.angle - this.arrowInfo.angle));
          this.polygonVertex[5] =
              stopPoint.y -
                  this.arrowInfo.edgeLen *
                      Math.sin((Math.PI / 180) * (this.angle - this.arrowInfo.angle));
      };
      // 计算两个点之间的夹角
      DrawArrow.prototype.getRadian = function (beginPoint, stopPoint) {
          // 使用atan2算出夹角（弧度），并将其转换为角度值(弧度 / 180)
          this.angle =
              (Math.atan2(stopPoint.y - beginPoint.y, stopPoint.x - beginPoint.x) /
                  Math.PI) *
                  180;
          this.setArrowInfo(50 * this.size, 30 * this.size);
          this.dynArrowSize();
      };
      // 计算另两个底边侧面点
      DrawArrow.prototype.sideCord = function () {
          var midpoint = { x: 0, y: 0 };
          midpoint.x = (this.polygonVertex[4] + this.polygonVertex[8]) / 2;
          // 通过求出第5个顶点和第9个顶点的横纵坐标的平均值，得到多边形的中心点坐标，
          midpoint.y = (this.polygonVertex[5] + this.polygonVertex[9]) / 2;
          this.polygonVertex[2] = (this.polygonVertex[4] + midpoint.x) / 2;
          this.polygonVertex[3] = (this.polygonVertex[5] + midpoint.y) / 2;
          this.polygonVertex[10] = (this.polygonVertex[8] + midpoint.x) / 2;
          this.polygonVertex[11] = (this.polygonVertex[9] + midpoint.y) / 2;
      };
      /**
       * 设置箭头的相关绘制信息
       * @param edgeLen 长度
       * @param angle 角度
       * @private
       */
      DrawArrow.prototype.setArrowInfo = function (edgeLen, angle) {
          this.arrowInfo.edgeLen = edgeLen;
          this.arrowInfo.angle = angle;
      };
      // 计算箭头尺寸
      DrawArrow.prototype.dynArrowSize = function () {
          var x = this.stopPoint.x - this.beginPoint.x;
          var y = this.stopPoint.y - this.beginPoint.y;
          // 计算两点之间的直线距离
          var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          // 根据箭头始点和终点之间的距离自适应地调整箭头大小。
          if (length < 50) {
              this.arrowInfo.edgeLen = length / 2;
          }
          else if (length < 250) {
              this.arrowInfo.edgeLen /= 2;
          }
          else if (length < 500) {
              this.arrowInfo.edgeLen = (this.arrowInfo.edgeLen * length) / 500;
          }
      };
      // 在画布上画出递增变粗的箭头
      DrawArrow.prototype.drawArrow = function (ctx, color) {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(this.polygonVertex[0], this.polygonVertex[1]);
          ctx.lineTo(this.polygonVertex[2], this.polygonVertex[3]);
          ctx.lineTo(this.polygonVertex[4], this.polygonVertex[5]);
          ctx.lineTo(this.polygonVertex[6], this.polygonVertex[7]);
          ctx.lineTo(this.polygonVertex[8], this.polygonVertex[9]);
          ctx.lineTo(this.polygonVertex[10], this.polygonVertex[11]);
          ctx.closePath();
          ctx.fill();
      };
      return DrawArrow;
  }());

  /**
   * 获取图像指定坐标位置的颜色
   * @param imgData 需要进行操作的图片
   * @param x x点坐标
   * @param y y点坐标
   */
  var getAxisColor = function (imgData, x, y) {
      var w = imgData.width;
      var d = imgData.data;
      var color = [];
      color[0] = d[4 * (y * w + x)];
      color[1] = d[4 * (y * w + x) + 1];
      color[2] = d[4 * (y * w + x) + 2];
      color[3] = d[4 * (y * w + x) + 3];
      return color;
  };
  /**
   * 设置图像指定坐标位置的颜色
   * @param imgData 需要进行操作的图片
   * @param x x点坐标
   * @param y y点坐标
   * @param color 颜色数组
   */
  var setAxisColor = function (imgData, x, y, color) {
      var w = imgData.width;
      var d = imgData.data;
      d[4 * (y * w + x)] = color[0];
      d[4 * (y * w + x) + 1] = color[1];
      d[4 * (y * w + x) + 2] = color[2];
      d[4 * (y * w + x) + 3] = color[3];
  };
  /**
   * 绘制马赛克
   *    实现思路：
   *      1. 获取鼠标划过路径区域的图像信息
   *      2. 将区域内的像素点绘制成周围相近的颜色
   * @param mouseX 当前鼠标X轴坐标
   * @param mouseY 当前鼠标Y轴坐标
   * @param size 马赛克画笔大小
   * @param degreeOfBlur 马赛克模糊度
   * @param context 需要进行绘制的画布
   */
  function drawMosaic(mouseX, mouseY, size, degreeOfBlur, context) {
      // 获取设备像素比
      var dpr = window.devicePixelRatio || 1;
      // 获取鼠标经过区域的图片像素信息
      var imgData = context.getImageData(mouseX * dpr, mouseY * dpr, size * dpr, size * dpr);
      // 获取图像宽高
      var w = imgData.width;
      var h = imgData.height;
      // 等分图像宽高
      var stepW = w / degreeOfBlur;
      var stepH = h / degreeOfBlur;
      // 循环画布像素点
      for (var i = 0; i < stepH; i++) {
          for (var j = 0; j < stepW; j++) {
              // 随机获取一个小方格的随机颜色
              var color = getAxisColor(imgData, j * degreeOfBlur + Math.floor(Math.random() * degreeOfBlur), i * degreeOfBlur + Math.floor(Math.random() * degreeOfBlur));
              // 循环小方格的像素点
              for (var k = 0; k < degreeOfBlur; k++) {
                  for (var l = 0; l < degreeOfBlur; l++) {
                      // 设置小方格的颜色
                      setAxisColor(imgData, j * degreeOfBlur + l, i * degreeOfBlur + k, color);
                  }
              }
          }
      }
      // 渲染打上马赛克后的图像信息
      context.putImageData(imgData, mouseX * dpr, mouseY * dpr);
  }

  /**
   * 缩放裁剪框
   * @param currentX 当前鼠标X轴坐标
   * @param currentY 当前鼠标Y轴坐标
   * @param startX 裁剪框当前X轴坐标
   * @param startY 裁剪框当前Y轴坐标
   * @param width 裁剪框宽度
   * @param height 裁剪框高度
   * @param option 当前操作的节点
   * @private
   */
  function zoomCutOutBoxPosition(currentX, currentY, startX, startY, width, height, option) {
      // 临时坐标
      var tempStartX, tempStartY, tempWidth, tempHeight = 0;
      // 判断操作方向
      switch (option) {
          case 2: // n
              tempStartY =
                  currentY - (startY + height) > 0 ? startY + height : currentY;
              tempHeight = nonNegativeData(height - (currentY - startY));
              return {
                  tempStartX: startX,
                  tempStartY: tempStartY,
                  tempWidth: width,
                  tempHeight: tempHeight
              };
          case 3: // s
              tempHeight = nonNegativeData(currentY - startY);
              return {
                  tempStartX: startX,
                  tempStartY: startY,
                  tempWidth: width,
                  tempHeight: tempHeight
              };
          case 4: // w
              tempStartX = currentX - (startX + width) > 0 ? startX + width : currentX;
              tempWidth = nonNegativeData(width - (currentX - startX));
              return {
                  tempStartX: tempStartX,
                  tempStartY: startY,
                  tempWidth: tempWidth,
                  tempHeight: height
              };
          case 5: // e
              tempWidth = nonNegativeData(currentX - startX);
              return {
                  tempStartX: startX,
                  tempStartY: startY,
                  tempWidth: tempWidth,
                  tempHeight: height
              };
          case 6: // nw
              tempStartX = currentX - (startX + width) > 0 ? startX + width : currentX;
              tempStartY =
                  currentY - (startY + height) > 0 ? startY + height : currentY;
              tempWidth = nonNegativeData(width - (currentX - startX));
              tempHeight = nonNegativeData(height - (currentY - startY));
              return {
                  tempStartX: tempStartX,
                  tempStartY: tempStartY,
                  tempWidth: tempWidth,
                  tempHeight: tempHeight
              };
          case 7: // se
              tempWidth = nonNegativeData(currentX - startX);
              tempHeight = nonNegativeData(currentY - startY);
              return {
                  tempStartX: startX,
                  tempStartY: startY,
                  tempWidth: tempWidth,
                  tempHeight: tempHeight
              };
          case 8: // ne
              tempStartY =
                  currentY - (startY + height) > 0 ? startY + height : currentY;
              tempWidth = nonNegativeData(currentX - startX);
              tempHeight = nonNegativeData(height - (currentY - startY));
              return {
                  tempStartX: startX,
                  tempStartY: tempStartY,
                  tempWidth: tempWidth,
                  tempHeight: tempHeight
              };
          case 9: // sw
              tempStartX = currentX - (startX + width) > 0 ? startX + width : currentX;
              tempWidth = nonNegativeData(width - (currentX - startX));
              tempHeight = nonNegativeData(currentY - startY);
              return {
                  tempStartX: tempStartX,
                  tempStartY: startY,
                  tempWidth: tempWidth,
                  tempHeight: tempHeight
              };
      }
  }

  /**
   * 保存边框节点的相关信息
   * @param borderSize 边框节点直径大小
   * @param positionInfo 裁剪框位置信息
   * @private
   */
  function saveBorderArrInfo(borderSize, positionInfo) {
      // 获取裁剪框位置信息
      var startX = positionInfo.startX, startY = positionInfo.startY, width = positionInfo.width, height = positionInfo.height;
      var halfBorderSize = borderSize / 2;
      var borderArr = [];
      // 移动, n北s南e东w西
      borderArr[0] = {
          x: startX + halfBorderSize,
          y: startY + halfBorderSize,
          width: width - borderSize,
          height: height - borderSize,
          index: 1,
          option: 1
      };
      // n
      borderArr[1] = {
          x: startX + halfBorderSize,
          y: startY,
          width: width - borderSize,
          height: halfBorderSize,
          index: 2,
          option: 2
      };
      borderArr[2] = {
          x: startX - halfBorderSize + width / 2,
          y: startY - halfBorderSize,
          width: borderSize,
          height: halfBorderSize,
          index: 2,
          option: 2
      };
      // s
      borderArr[3] = {
          x: startX + halfBorderSize,
          y: startY - halfBorderSize + height,
          width: width - borderSize,
          height: halfBorderSize,
          index: 2,
          option: 3
      };
      borderArr[4] = {
          x: startX - halfBorderSize + width / 2,
          y: startY + height,
          width: borderSize,
          height: halfBorderSize,
          index: 2,
          option: 3
      };
      // w
      borderArr[5] = {
          x: startX,
          y: startY + halfBorderSize,
          width: halfBorderSize,
          height: height - borderSize,
          index: 3,
          option: 4
      };
      borderArr[6] = {
          x: startX - halfBorderSize,
          y: startY - halfBorderSize + height / 2,
          width: halfBorderSize,
          height: borderSize,
          index: 3,
          option: 4
      };
      // e
      borderArr[7] = {
          x: startX - halfBorderSize + width,
          y: startY + halfBorderSize,
          width: halfBorderSize,
          height: height - borderSize,
          index: 3,
          option: 5
      };
      borderArr[8] = {
          x: startX + width,
          y: startY - halfBorderSize + height / 2,
          width: halfBorderSize,
          height: borderSize,
          index: 3,
          option: 5
      };
      // nw
      borderArr[9] = {
          x: startX - halfBorderSize,
          y: startY - halfBorderSize,
          width: borderSize,
          height: borderSize,
          index: 4,
          option: 6
      };
      // se
      borderArr[10] = {
          x: startX - halfBorderSize + width,
          y: startY - halfBorderSize + height,
          width: borderSize,
          height: borderSize,
          index: 4,
          option: 7
      };
      // ne
      borderArr[11] = {
          x: startX - halfBorderSize + width,
          y: startY - halfBorderSize,
          width: borderSize,
          height: borderSize,
          index: 5,
          option: 8
      };
      // sw
      borderArr[12] = {
          x: startX - halfBorderSize,
          y: startY - halfBorderSize + height,
          width: borderSize,
          height: borderSize,
          index: 5,
          option: 9
      };
      return borderArr;
  }

  /**
   * 计算截图工具栏位置
   * @param position 裁剪框位置信息
   * @param toolWidth 截图工具栏宽度
   * @param containerWidth 截图容器宽度
   * @param placement 展示位置
   * @param containerLocation 截图容器位置信息
   */
  function calculateToolLocation(position, toolWidth, containerWidth, placement, containerLocation) {
      // 工具栏X轴坐标 = (裁剪框的宽度 - 工具栏的宽度) / 2 + (裁剪框距离左侧的距离 - 容器距离左侧的距离)
      var mouseX = (position.width - toolWidth) / 2 +
          (position.startX - containerLocation.left);
      // 左对齐
      if (placement === "left") {
          mouseX = position.startX;
      }
      // 右对齐
      if (placement === "right") {
          mouseX = position.startX + position.width - toolWidth;
      }
      // 工具栏超出画布左侧可视区域，进行位置修正
      if (mouseX < 0)
          mouseX = 0;
      // 计算工具栏在画布内的占用面积
      var toolSize = mouseX + toolWidth;
      // 工具栏超出画布右侧可视区域，进行位置修正
      if (toolSize > containerWidth) {
          mouseX = containerWidth - toolWidth;
      }
      // 工具栏Y轴坐标
      var mouseY = position.startY + position.height + 10;
      if ((position.width < 0 && position.height < 0) ||
          (position.width > 0 && position.height < 0)) {
          // 从右下角或者左下角拖动时，工具条y轴的位置应该为position.startY + 10
          mouseY = position.startY + 10;
      }
      // 需要减去容器本身距离顶部的距离
      mouseY -= containerLocation.top;
      return {
          mouseX: mouseX,
          mouseY: mouseY
      };
  }

  const PREFIX = "[modern-screenshot]";
  const IN_BROWSER = typeof window !== "undefined";
  const SUPPORT_WEB_WORKER = IN_BROWSER && "Worker" in window;
  const USER_AGENT = IN_BROWSER ? window.navigator?.userAgent : "";
  const IN_CHROME = USER_AGENT.includes("Chrome");
  const IN_SAFARI = USER_AGENT.includes("AppleWebKit") && !IN_CHROME;
  const IN_FIREFOX = USER_AGENT.includes("Firefox");
  const isContext = value => value && "__CONTEXT__" in value;
  const isCssFontFaceRule = rule => rule.constructor.name === "CSSFontFaceRule";
  const isCSSImportRule = rule => rule.constructor.name === "CSSImportRule";
  const isElementNode = node => node.nodeType === 1;
  const isSVGElementNode = node => typeof node.className === "object";
  const isSVGImageElementNode = node => node.tagName === "image";
  const isSVGUseElementNode = node => node.tagName === "use";
  const isHTMLElementNode = node => isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
  const isCommentNode = node => node.nodeType === 8;
  const isTextNode = node => node.nodeType === 3;
  const isImageElement = node => node.tagName === "IMG";
  const isVideoElement = node => node.tagName === "VIDEO";
  const isCanvasElement = node => node.tagName === "CANVAS";
  const isTextareaElement = node => node.tagName === "TEXTAREA";
  const isInputElement = node => node.tagName === "INPUT";
  const isStyleElement = node => node.tagName === "STYLE";
  const isScriptElement = node => node.tagName === "SCRIPT";
  const isSelectElement = node => node.tagName === "SELECT";
  const isSlotElement = node => node.tagName === "SLOT";
  const isIFrameElement = node => node.tagName === "IFRAME";
  const consoleWarn = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return console.warn(PREFIX, ...args);
  };
  function supportWebp(ownerDocument) {
    const canvas = ownerDocument?.createElement?.("canvas");
    if (canvas) {
      canvas.height = canvas.width = 1;
    }
    return Boolean(canvas) && "toDataURL" in canvas && Boolean(canvas.toDataURL("image/webp").includes("image/webp"));
  }
  const isDataUrl = url => url.startsWith("data:");
  function resolveUrl(url, baseUrl) {
    if (url.match(/^[a-z]+:\/\//i)) return url;
    if (IN_BROWSER && url.match(/^\/\//)) return window.location.protocol + url;
    if (url.match(/^[a-z]+:/i)) return url;
    if (!IN_BROWSER) return url;
    const doc = getDocument().implementation.createHTMLDocument();
    const base = doc.createElement("base");
    const a = doc.createElement("a");
    doc.head.appendChild(base);
    doc.body.appendChild(a);
    if (baseUrl) base.href = baseUrl;
    a.href = url;
    return a.href;
  }
  function getDocument(target) {
    return (target && isElementNode(target) ? target?.ownerDocument : target) ?? window.document;
  }
  const XMLNS = "http://www.w3.org/2000/svg";
  function createSvg(width, height, ownerDocument) {
    const svg = getDocument(ownerDocument).createElementNS(XMLNS, "svg");
    svg.setAttributeNS(null, "width", width.toString());
    svg.setAttributeNS(null, "height", height.toString());
    svg.setAttributeNS(null, "viewBox", `0 0 ${width} ${height}`);
    return svg;
  }
  function svgToDataUrl(svg, removeControlCharacter) {
    let xhtml = new XMLSerializer().serializeToString(svg);
    if (removeControlCharacter) {
      xhtml = xhtml.replace(/[\u0000-\u0008\v\f\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/gu, "");
    }
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xhtml)}`;
  }
  function readBlob(blob, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.onabort = () => reject(new Error(`Failed read blob to ${type}`));
      if (type === "dataUrl") {
        reader.readAsDataURL(blob);
      } else if (type === "arrayBuffer") {
        reader.readAsArrayBuffer(blob);
      }
    });
  }
  const blobToDataUrl = blob => readBlob(blob, "dataUrl");
  function createImage(url, ownerDocument) {
    const img = getDocument(ownerDocument).createElement("img");
    img.decoding = "sync";
    img.loading = "eager";
    img.src = url;
    return img;
  }
  function loadMedia(media, options) {
    return new Promise(resolve => {
      const {
        timeout,
        ownerDocument,
        onError: userOnError,
        onWarn
      } = options ?? {};
      const node = typeof media === "string" ? createImage(media, getDocument(ownerDocument)) : media;
      let timer = null;
      let removeEventListeners = null;
      function onResolve() {
        resolve(node);
        timer && clearTimeout(timer);
        removeEventListeners?.();
      }
      if (timeout) {
        timer = setTimeout(onResolve, timeout);
      }
      if (isVideoElement(node)) {
        const currentSrc = node.currentSrc || node.src;
        if (!currentSrc) {
          if (node.poster) {
            return loadMedia(node.poster, options).then(resolve);
          }
          return onResolve();
        }
        if (node.readyState >= 2) {
          return onResolve();
        }
        const onLoadeddata = onResolve;
        const onError = error => {
          onWarn?.("Failed video load", currentSrc, error);
          userOnError?.(error);
          onResolve();
        };
        removeEventListeners = () => {
          node.removeEventListener("loadeddata", onLoadeddata);
          node.removeEventListener("error", onError);
        };
        node.addEventListener("loadeddata", onLoadeddata, {
          once: true
        });
        node.addEventListener("error", onError, {
          once: true
        });
      } else {
        const currentSrc = isSVGImageElementNode(node) ? node.href.baseVal : node.currentSrc || node.src;
        if (!currentSrc) {
          return onResolve();
        }
        const onLoad = async () => {
          if (isImageElement(node) && "decode" in node) {
            try {
              await node.decode();
            } catch (error) {
              onWarn?.("Failed to decode image, trying to render anyway", node.dataset.originalSrc || currentSrc, error);
            }
          }
          onResolve();
        };
        const onError = error => {
          onWarn?.("Failed image load", node.dataset.originalSrc || currentSrc, error);
          onResolve();
        };
        if (isImageElement(node) && node.complete) {
          return onLoad();
        }
        removeEventListeners = () => {
          node.removeEventListener("load", onLoad);
          node.removeEventListener("error", onError);
        };
        node.addEventListener("load", onLoad, {
          once: true
        });
        node.addEventListener("error", onError, {
          once: true
        });
      }
    });
  }
  async function waitUntilLoad(node, options) {
    if (isHTMLElementNode(node)) {
      if (isImageElement(node) || isVideoElement(node)) {
        await loadMedia(node, options);
      } else {
        await Promise.all(["img", "video"].flatMap(selectors => {
          return Array.from(node.querySelectorAll(selectors)).map(el => loadMedia(el, options));
        }));
      }
    }
  }
  const uuid = /* @__PURE__ */function uuid2() {
    let counter = 0;
    const random = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
    return () => {
      counter += 1;
      return `u${random()}${counter}`;
    };
  }();
  function splitFontFamily(fontFamily) {
    return fontFamily?.split(",").map(val => val.trim().replace(/"|'/g, "").toLowerCase()).filter(Boolean);
  }
  let uid = 0;
  function createLogger(debug) {
    const prefix = `${PREFIX}[#${uid}]`;
    uid++;
    return {
      // eslint-disable-next-line no-console
      time: label => debug && console.time(`${prefix} ${label}`),
      // eslint-disable-next-line no-console
      timeEnd: label => debug && console.timeEnd(`${prefix} ${label}`),
      warn: function () {
        return debug && consoleWarn(...arguments);
      }
    };
  }
  function getDefaultRequestInit(bypassingCache) {
    return {
      cache: bypassingCache ? "no-cache" : "force-cache"
    };
  }
  async function orCreateContext(node, options) {
    return isContext(node) ? node : createContext(node, {
      ...options,
      autoDestruct: true
    });
  }
  async function createContext(node, options) {
    const {
      scale = 1,
      workerUrl,
      workerNumber = 1
    } = options || {};
    const debug = Boolean(options?.debug);
    const features = options?.features ?? true;
    const ownerDocument = node.ownerDocument ?? (IN_BROWSER ? window.document : void 0);
    const ownerWindow = node.ownerDocument?.defaultView ?? (IN_BROWSER ? window : void 0);
    const requests = /* @__PURE__ */new Map();
    const context = {
      // Options
      width: 0,
      height: 0,
      quality: 1,
      type: "image/png",
      scale,
      backgroundColor: null,
      style: null,
      filter: null,
      maximumCanvasSize: 0,
      timeout: 3e4,
      progress: null,
      debug,
      fetch: {
        requestInit: getDefaultRequestInit(options?.fetch?.bypassingCache),
        placeholderImage: "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        bypassingCache: false,
        ...options?.fetch
      },
      fetchFn: null,
      font: {},
      drawImageInterval: 100,
      workerUrl: null,
      workerNumber,
      onCloneNode: null,
      onEmbedNode: null,
      onCreateForeignObjectSvg: null,
      includeStyleProperties: null,
      autoDestruct: false,
      ...options,
      // InternalContext
      __CONTEXT__: true,
      log: createLogger(debug),
      node,
      ownerDocument,
      ownerWindow,
      dpi: scale === 1 ? null : 96 * scale,
      svgStyleElement: createStyleElement(ownerDocument),
      svgDefsElement: ownerDocument?.createElementNS(XMLNS, "defs"),
      svgStyles: /* @__PURE__ */new Map(),
      defaultComputedStyles: /* @__PURE__ */new Map(),
      workers: [...Array.from({
        length: SUPPORT_WEB_WORKER && workerUrl && workerNumber ? workerNumber : 0
      })].map(() => {
        try {
          const worker = new Worker(workerUrl);
          worker.onmessage = async event => {
            const {
              url,
              result
            } = event.data;
            if (result) {
              requests.get(url)?.resolve?.(result);
            } else {
              requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
            }
          };
          worker.onmessageerror = event => {
            const {
              url
            } = event.data;
            requests.get(url)?.reject?.(new Error(`Error receiving message from worker: ${url}`));
          };
          return worker;
        } catch (error) {
          context.log.warn("Failed to new Worker", error);
          return null;
        }
      }).filter(Boolean),
      fontFamilies: /* @__PURE__ */new Map(),
      fontCssTexts: /* @__PURE__ */new Map(),
      acceptOfImage: `${[supportWebp(ownerDocument) && "image/webp", "image/svg+xml", "image/*", "*/*"].filter(Boolean).join(",")};q=0.8`,
      requests,
      drawImageCount: 0,
      tasks: [],
      features,
      isEnable: key => {
        if (key === "restoreScrollPosition") {
          return typeof features === "boolean" ? false : features[key] ?? false;
        }
        if (typeof features === "boolean") {
          return features;
        }
        return features[key] ?? true;
      }
    };
    context.log.time("wait until load");
    await waitUntilLoad(node, {
      timeout: context.timeout,
      onWarn: context.log.warn
    });
    context.log.timeEnd("wait until load");
    const {
      width,
      height
    } = resolveBoundingBox(node, context);
    context.width = width;
    context.height = height;
    return context;
  }
  function createStyleElement(ownerDocument) {
    if (!ownerDocument) return void 0;
    const style = ownerDocument.createElement("style");
    const cssText = style.ownerDocument.createTextNode(`
.______background-clip--text {
  background-clip: text;
  -webkit-background-clip: text;
}
`);
    style.appendChild(cssText);
    return style;
  }
  function resolveBoundingBox(node, context) {
    let {
      width,
      height
    } = context;
    if (isElementNode(node) && (!width || !height)) {
      const box = node.getBoundingClientRect();
      width = width || box.width || Number(node.getAttribute("width")) || 0;
      height = height || box.height || Number(node.getAttribute("height")) || 0;
    }
    return {
      width,
      height
    };
  }
  async function imageToCanvas(image, context) {
    const {
      log,
      timeout,
      drawImageCount,
      drawImageInterval
    } = context;
    log.time("image to canvas");
    const loaded = await loadMedia(image, {
      timeout,
      onWarn: context.log.warn
    });
    const {
      canvas,
      context2d
    } = createCanvas(image.ownerDocument, context);
    const drawImage = () => {
      try {
        context2d?.drawImage(loaded, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        context.log.warn("Failed to drawImage", error);
      }
    };
    drawImage();
    if (context.isEnable("fixSvgXmlDecode")) {
      for (let i = 0; i < drawImageCount; i++) {
        await new Promise(resolve => {
          setTimeout(() => {
            drawImage();
            resolve();
          }, i + drawImageInterval);
        });
      }
    }
    context.drawImageCount = 0;
    log.timeEnd("image to canvas");
    return canvas;
  }
  function createCanvas(ownerDocument, context) {
    const {
      width,
      height,
      scale,
      backgroundColor,
      maximumCanvasSize: max
    } = context;
    const canvas = ownerDocument.createElement("canvas");
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    if (max) {
      if (canvas.width > max || canvas.height > max) {
        if (canvas.width > max && canvas.height > max) {
          if (canvas.width > canvas.height) {
            canvas.height *= max / canvas.width;
            canvas.width = max;
          } else {
            canvas.width *= max / canvas.height;
            canvas.height = max;
          }
        } else if (canvas.width > max) {
          canvas.height *= max / canvas.width;
          canvas.width = max;
        } else {
          canvas.width *= max / canvas.height;
          canvas.height = max;
        }
      }
    }
    const context2d = canvas.getContext("2d");
    if (context2d && backgroundColor) {
      context2d.fillStyle = backgroundColor;
      context2d.fillRect(0, 0, canvas.width, canvas.height);
    }
    return {
      canvas,
      context2d
    };
  }
  function cloneCanvas(canvas, context) {
    if (canvas.ownerDocument) {
      try {
        const dataURL = canvas.toDataURL();
        if (dataURL !== "data:,") {
          return createImage(dataURL, canvas.ownerDocument);
        }
      } catch (error) {
        context.log.warn("Failed to clone canvas", error);
      }
    }
    const cloned = canvas.cloneNode(false);
    const ctx = canvas.getContext("2d");
    const clonedCtx = cloned.getContext("2d");
    try {
      if (ctx && clonedCtx) {
        clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
      }
      return cloned;
    } catch (error) {
      context.log.warn("Failed to clone canvas", error);
    }
    return cloned;
  }
  function cloneIframe(iframe, context) {
    try {
      if (iframe?.contentDocument?.body) {
        return cloneNode(iframe.contentDocument.body, context);
      }
    } catch (error) {
      context.log.warn("Failed to clone iframe", error);
    }
    return iframe.cloneNode(false);
  }
  function cloneImage(image) {
    const cloned = image.cloneNode(false);
    if (image.currentSrc && image.currentSrc !== image.src) {
      cloned.src = image.currentSrc;
      cloned.srcset = "";
    }
    if (cloned.loading === "lazy") {
      cloned.loading = "eager";
    }
    return cloned;
  }
  async function cloneVideo(video, context) {
    if (video.ownerDocument && !video.currentSrc && video.poster) {
      return createImage(video.poster, video.ownerDocument);
    }
    const cloned = video.cloneNode(false);
    cloned.crossOrigin = "anonymous";
    if (video.currentSrc && video.currentSrc !== video.src) {
      cloned.src = video.currentSrc;
    }
    const ownerDocument = cloned.ownerDocument;
    if (ownerDocument) {
      let canPlay = true;
      await loadMedia(cloned, {
        onError: () => canPlay = false,
        onWarn: context.log.warn
      });
      if (!canPlay) {
        if (video.poster) {
          return createImage(video.poster, video.ownerDocument);
        }
        return cloned;
      }
      cloned.currentTime = video.currentTime;
      await new Promise(resolve => {
        cloned.addEventListener("seeked", resolve, {
          once: true
        });
      });
      const canvas = ownerDocument.createElement("canvas");
      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;
      try {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(cloned, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        context.log.warn("Failed to clone video", error);
        if (video.poster) {
          return createImage(video.poster, video.ownerDocument);
        }
        return cloned;
      }
      return cloneCanvas(canvas, context);
    }
    return cloned;
  }
  function cloneElement(node, context) {
    if (isCanvasElement(node)) {
      return cloneCanvas(node, context);
    }
    if (isIFrameElement(node)) {
      return cloneIframe(node, context);
    }
    if (isImageElement(node)) {
      return cloneImage(node);
    }
    if (isVideoElement(node)) {
      return cloneVideo(node, context);
    }
    return node.cloneNode(false);
  }
  function getSandBox(context) {
    let sandbox = context.sandbox;
    if (!sandbox) {
      const {
        ownerDocument
      } = context;
      try {
        if (ownerDocument) {
          sandbox = ownerDocument.createElement("iframe");
          sandbox.id = `__SANDBOX__-${uuid()}`;
          sandbox.width = "0";
          sandbox.height = "0";
          sandbox.style.visibility = "hidden";
          sandbox.style.position = "fixed";
          ownerDocument.body.appendChild(sandbox);
          sandbox.contentWindow?.document.write('<!DOCTYPE html><meta charset="UTF-8"><title></title><body>');
          context.sandbox = sandbox;
        }
      } catch (error) {
        context.log.warn("Failed to getSandBox", error);
      }
    }
    return sandbox;
  }
  const ignoredStyles = ["width", "height", "-webkit-text-fill-color"];
  const includedAttributes = ["stroke", "fill"];
  function getDefaultStyle(node, pseudoElement, context) {
    const {
      defaultComputedStyles
    } = context;
    const nodeName = node.nodeName.toLowerCase();
    const isSvgNode = isSVGElementNode(node) && nodeName !== "svg";
    const attributes = isSvgNode ? includedAttributes.map(name => [name, node.getAttribute(name)]).filter(_ref => {
      let [, value] = _ref;
      return value !== null;
    }) : [];
    const key = [isSvgNode && "svg", nodeName, attributes.map((name, value) => `${name}=${value}`).join(","), pseudoElement].filter(Boolean).join(":");
    if (defaultComputedStyles.has(key)) return defaultComputedStyles.get(key);
    const sandbox = getSandBox(context);
    const sandboxWindow = sandbox?.contentWindow;
    if (!sandboxWindow) return /* @__PURE__ */new Map();
    const sandboxDocument = sandboxWindow?.document;
    let root;
    let el;
    if (isSvgNode) {
      root = sandboxDocument.createElementNS(XMLNS, "svg");
      el = root.ownerDocument.createElementNS(root.namespaceURI, nodeName);
      attributes.forEach(_ref2 => {
        let [name, value] = _ref2;
        el.setAttributeNS(null, name, value);
      });
      root.appendChild(el);
    } else {
      root = el = sandboxDocument.createElement(nodeName);
    }
    el.textContent = " ";
    sandboxDocument.body.appendChild(root);
    const computedStyle = sandboxWindow.getComputedStyle(el, pseudoElement);
    const styles = /* @__PURE__ */new Map();
    for (let len = computedStyle.length, i = 0; i < len; i++) {
      const name = computedStyle.item(i);
      if (ignoredStyles.includes(name)) continue;
      styles.set(name, computedStyle.getPropertyValue(name));
    }
    sandboxDocument.body.removeChild(root);
    defaultComputedStyles.set(key, styles);
    return styles;
  }
  function getDiffStyle(style, defaultStyle, includeStyleProperties) {
    const diffStyle = /* @__PURE__ */new Map();
    const prefixs = [];
    const prefixTree = /* @__PURE__ */new Map();
    if (includeStyleProperties) {
      for (const name of includeStyleProperties) {
        applyTo(name);
      }
    } else {
      for (let len = style.length, i = 0; i < len; i++) {
        const name = style.item(i);
        applyTo(name);
      }
    }
    for (let len = prefixs.length, i = 0; i < len; i++) {
      prefixTree.get(prefixs[i])?.forEach((value, name) => diffStyle.set(name, value));
    }
    function applyTo(name) {
      const value = style.getPropertyValue(name);
      const priority = style.getPropertyPriority(name);
      const subIndex = name.lastIndexOf("-");
      const prefix = subIndex > -1 ? name.substring(0, subIndex) : void 0;
      if (prefix) {
        let map = prefixTree.get(prefix);
        if (!map) {
          map = /* @__PURE__ */new Map();
          prefixTree.set(prefix, map);
        }
        map.set(name, [value, priority]);
      }
      if (defaultStyle.get(name) === value && !priority) return;
      if (prefix) {
        prefixs.push(prefix);
      } else {
        diffStyle.set(name, [value, priority]);
      }
    }
    return diffStyle;
  }
  function copyCssStyles(node, cloned, isRoot, context) {
    const {
      ownerWindow,
      includeStyleProperties,
      currentParentNodeStyle
    } = context;
    const clonedStyle = cloned.style;
    const computedStyle = ownerWindow.getComputedStyle(node);
    const defaultStyle = getDefaultStyle(node, null, context);
    currentParentNodeStyle?.forEach((_, key) => {
      defaultStyle.delete(key);
    });
    const style = getDiffStyle(computedStyle, defaultStyle, includeStyleProperties);
    style.delete("transition-property");
    style.delete("all");
    style.delete("d");
    style.delete("content");
    if (isRoot) {
      style.delete("margin-top");
      style.delete("margin-right");
      style.delete("margin-bottom");
      style.delete("margin-left");
      style.delete("margin-block-start");
      style.delete("margin-block-end");
      style.delete("margin-inline-start");
      style.delete("margin-inline-end");
      style.set("box-sizing", ["border-box", ""]);
    }
    if (style.get("background-clip")?.[0] === "text") {
      cloned.classList.add("______background-clip--text");
    }
    if (IN_CHROME) {
      if (!style.has("font-kerning")) style.set("font-kerning", ["normal", ""]);
      if ((style.get("overflow-x")?.[0] === "hidden" || style.get("overflow-y")?.[0] === "hidden") && style.get("text-overflow")?.[0] === "ellipsis" && node.scrollWidth === node.clientWidth) {
        style.set("text-overflow", ["clip", ""]);
      }
    }
    for (let len = clonedStyle.length, i = 0; i < len; i++) {
      clonedStyle.removeProperty(clonedStyle.item(i));
    }
    style.forEach((_ref3, name) => {
      let [value, priority] = _ref3;
      clonedStyle.setProperty(name, value, priority);
    });
    return style;
  }
  function copyInputValue(node, cloned) {
    if (isTextareaElement(node) || isInputElement(node) || isSelectElement(node)) {
      cloned.setAttribute("value", node.value);
    }
  }
  const pseudoClasses = [":before", ":after"
  // ':placeholder', TODO
  ];

  const scrollbarPseudoClasses = [":-webkit-scrollbar", ":-webkit-scrollbar-button",
  // ':-webkit-scrollbar:horizontal', TODO
  ":-webkit-scrollbar-thumb", ":-webkit-scrollbar-track", ":-webkit-scrollbar-track-piece",
  // ':-webkit-scrollbar:vertical', TODO
  ":-webkit-scrollbar-corner", ":-webkit-resizer"];
  function copyPseudoClass(node, cloned, copyScrollbar, context, addWordToFontFamilies) {
    const {
      ownerWindow,
      svgStyleElement,
      svgStyles,
      currentNodeStyle
    } = context;
    if (!svgStyleElement || !ownerWindow) return;
    function copyBy(pseudoClass) {
      const computedStyle = ownerWindow.getComputedStyle(node, pseudoClass);
      let content = computedStyle.getPropertyValue("content");
      if (!content || content === "none") return;
      addWordToFontFamilies?.(content);
      content = content.replace(/(')|(")|(counter\(.+\))/g, "");
      const klasses = [uuid()];
      const defaultStyle = getDefaultStyle(node, pseudoClass, context);
      currentNodeStyle?.forEach((_, key) => {
        defaultStyle.delete(key);
      });
      const style = getDiffStyle(computedStyle, defaultStyle, context.includeStyleProperties);
      style.delete("content");
      style.delete("-webkit-locale");
      if (style.get("background-clip")?.[0] === "text") {
        cloned.classList.add("______background-clip--text");
      }
      const cloneStyle = [`content: '${content}';`];
      style.forEach((_ref4, name) => {
        let [value, priority] = _ref4;
        cloneStyle.push(`${name}: ${value}${priority ? " !important" : ""};`);
      });
      if (cloneStyle.length === 1) return;
      try {
        cloned.className = [cloned.className, ...klasses].join(" ");
      } catch (err) {
        context.log.warn("Failed to copyPseudoClass", err);
        return;
      }
      const cssText = cloneStyle.join("\n  ");
      let allClasses = svgStyles.get(cssText);
      if (!allClasses) {
        allClasses = [];
        svgStyles.set(cssText, allClasses);
      }
      allClasses.push(`.${klasses[0]}:${pseudoClass}`);
    }
    pseudoClasses.forEach(copyBy);
    if (copyScrollbar) scrollbarPseudoClasses.forEach(copyBy);
  }
  const excludeParentNodes = /* @__PURE__ */new Set(["symbol"
  // test/fixtures/svg.symbol.html
  ]);

  async function appendChildNode(node, cloned, child, context, addWordToFontFamilies) {
    if (isElementNode(child) && (isStyleElement(child) || isScriptElement(child))) return;
    if (context.filter && !context.filter(child)) return;
    if (excludeParentNodes.has(cloned.nodeName) || excludeParentNodes.has(child.nodeName)) {
      context.currentParentNodeStyle = void 0;
    } else {
      context.currentParentNodeStyle = context.currentNodeStyle;
    }
    const childCloned = await cloneNode(child, context, false, addWordToFontFamilies);
    if (context.isEnable("restoreScrollPosition")) {
      restoreScrollPosition(node, childCloned);
    }
    cloned.appendChild(childCloned);
  }
  async function cloneChildNodes(node, cloned, context, addWordToFontFamilies) {
    const firstChild = (isElementNode(node) ? node.shadowRoot?.firstChild : void 0) ?? node.firstChild;
    for (let child = firstChild; child; child = child.nextSibling) {
      if (isCommentNode(child)) continue;
      if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === "function") {
        const nodes = child.assignedNodes();
        for (let i = 0; i < nodes.length; i++) {
          await appendChildNode(node, cloned, nodes[i], context, addWordToFontFamilies);
        }
      } else {
        await appendChildNode(node, cloned, child, context, addWordToFontFamilies);
      }
    }
  }
  function restoreScrollPosition(node, chlidCloned) {
    if (!isHTMLElementNode(node) || !isHTMLElementNode(chlidCloned)) return;
    const {
      scrollTop,
      scrollLeft
    } = node;
    if (!scrollTop && !scrollLeft) {
      return;
    }
    const {
      transform
    } = chlidCloned.style;
    const matrix = new DOMMatrix(transform);
    const {
      a,
      b,
      c,
      d
    } = matrix;
    matrix.a = 1;
    matrix.b = 0;
    matrix.c = 0;
    matrix.d = 1;
    matrix.translateSelf(-scrollLeft, -scrollTop);
    matrix.a = a;
    matrix.b = b;
    matrix.c = c;
    matrix.d = d;
    chlidCloned.style.transform = matrix.toString();
  }
  function applyCssStyleWithOptions(cloned, context) {
    const {
      backgroundColor,
      width,
      height,
      style: styles
    } = context;
    const clonedStyle = cloned.style;
    if (backgroundColor) clonedStyle.setProperty("background-color", backgroundColor, "important");
    if (width) clonedStyle.setProperty("width", `${width}px`, "important");
    if (height) clonedStyle.setProperty("height", `${height}px`, "important");
    if (styles) {
      for (const name in styles) clonedStyle[name] = styles[name];
    }
  }
  const NORMAL_ATTRIBUTE_RE = /^[\w-:]+$/;
  async function cloneNode(node, context) {
    let isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let addWordToFontFamilies = arguments.length > 3 ? arguments[3] : undefined;
    const {
      ownerDocument,
      ownerWindow,
      fontFamilies
    } = context;
    if (ownerDocument && isTextNode(node)) {
      if (addWordToFontFamilies && /\S/.test(node.data)) {
        addWordToFontFamilies(node.data);
      }
      return ownerDocument.createTextNode(node.data);
    }
    if (ownerDocument && ownerWindow && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
      const cloned2 = await cloneElement(node, context);
      if (context.isEnable("removeAbnormalAttributes")) {
        const names = cloned2.getAttributeNames();
        for (let len = names.length, i = 0; i < len; i++) {
          const name = names[i];
          if (!NORMAL_ATTRIBUTE_RE.test(name)) {
            cloned2.removeAttribute(name);
          }
        }
      }
      const style = context.currentNodeStyle = copyCssStyles(node, cloned2, isRoot, context);
      if (isRoot) applyCssStyleWithOptions(cloned2, context);
      let copyScrollbar = false;
      if (context.isEnable("copyScrollbar")) {
        const overflow = [style.get("overflow-x")?.[0], style.get("overflow-y")?.[0]];
        copyScrollbar = overflow.includes("scroll") || (overflow.includes("auto") || overflow.includes("overlay")) && (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth);
      }
      const textTransform = style.get("text-transform")?.[0];
      const families = splitFontFamily(style.get("font-family")?.[0]);
      const addWordToFontFamilies2 = families ? word => {
        if (textTransform === "uppercase") {
          word = word.toUpperCase();
        } else if (textTransform === "lowercase") {
          word = word.toLowerCase();
        } else if (textTransform === "capitalize") {
          word = word[0].toUpperCase() + word.substring(1);
        }
        families.forEach(family => {
          let fontFamily = fontFamilies.get(family);
          if (!fontFamily) {
            fontFamilies.set(family, fontFamily = /* @__PURE__ */new Set());
          }
          word.split("").forEach(text => fontFamily.add(text));
        });
      } : void 0;
      copyPseudoClass(node, cloned2, copyScrollbar, context, addWordToFontFamilies2);
      copyInputValue(node, cloned2);
      if (!isVideoElement(node)) {
        await cloneChildNodes(node, cloned2, context, addWordToFontFamilies2);
      }
      return cloned2;
    }
    const cloned = node.cloneNode(false);
    await cloneChildNodes(node, cloned, context);
    return cloned;
  }
  function destroyContext(context) {
    context.ownerDocument = void 0;
    context.ownerWindow = void 0;
    context.svgStyleElement = void 0;
    context.svgDefsElement = void 0;
    context.svgStyles.clear();
    context.defaultComputedStyles.clear();
    if (context.sandbox) {
      try {
        context.sandbox.remove();
      } catch (err) {
        context.log.warn("Failed to destroyContext", err);
      }
      context.sandbox = void 0;
    }
    context.workers = [];
    context.fontFamilies.clear();
    context.fontCssTexts.clear();
    context.requests.clear();
    context.tasks = [];
  }
  function baseFetch(options) {
    const {
      url,
      timeout,
      responseType,
      ...requestInit
    } = options;
    const controller = new AbortController();
    const timer = timeout ? setTimeout(() => controller.abort(), timeout) : void 0;
    return fetch(url, {
      signal: controller.signal,
      ...requestInit
    }).then(response => {
      if (!response.ok) {
        throw new Error("Failed fetch, not 2xx response", {
          cause: response
        });
      }
      switch (responseType) {
        case "arrayBuffer":
          return response.arrayBuffer();
        case "dataUrl":
          return response.blob().then(blobToDataUrl);
        case "text":
        default:
          return response.text();
      }
    }).finally(() => clearTimeout(timer));
  }
  function contextFetch(context, options) {
    const {
      url: rawUrl,
      requestType = "text",
      responseType = "text",
      imageDom
    } = options;
    let url = rawUrl;
    const {
      timeout,
      acceptOfImage,
      requests,
      fetchFn,
      fetch: {
        requestInit,
        bypassingCache,
        placeholderImage
      },
      font,
      workers,
      fontFamilies
    } = context;
    if (requestType === "image" && (IN_SAFARI || IN_FIREFOX)) {
      context.drawImageCount++;
    }
    let request = requests.get(rawUrl);
    if (!request) {
      if (bypassingCache) {
        if (bypassingCache instanceof RegExp && bypassingCache.test(url)) {
          url += (/\?/.test(url) ? "&" : "?") + /* @__PURE__ */new Date().getTime();
        }
      }
      const canFontMinify = requestType.startsWith("font") && font && font.minify;
      const fontTexts = /* @__PURE__ */new Set();
      if (canFontMinify) {
        const families = requestType.split(";")[1].split(",");
        families.forEach(family => {
          if (!fontFamilies.has(family)) return;
          fontFamilies.get(family).forEach(text => fontTexts.add(text));
        });
      }
      const needFontMinify = canFontMinify && fontTexts.size;
      const baseFetchOptions = {
        url,
        timeout,
        responseType: needFontMinify ? "arrayBuffer" : responseType,
        headers: requestType === "image" ? {
          accept: acceptOfImage
        } : void 0,
        ...requestInit
      };
      request = {
        type: requestType,
        resolve: void 0,
        reject: void 0,
        response: null
      };
      request.response = (async () => {
        if (fetchFn && requestType === "image") {
          const result = await fetchFn(rawUrl);
          if (result) return result;
        }
        if (!IN_SAFARI && rawUrl.startsWith("http") && workers.length) {
          return new Promise((resolve, reject) => {
            const worker = workers[requests.size & workers.length - 1];
            worker.postMessage({
              rawUrl,
              ...baseFetchOptions
            });
            request.resolve = resolve;
            request.reject = reject;
          });
        }
        return baseFetch(baseFetchOptions);
      })().catch(error => {
        requests.delete(rawUrl);
        if (requestType === "image" && placeholderImage) {
          context.log.warn("Failed to fetch image base64, trying to use placeholder image", url);
          return typeof placeholderImage === "string" ? placeholderImage : placeholderImage(imageDom);
        }
        throw error;
      });
      requests.set(rawUrl, request);
    }
    return request.response;
  }
  async function replaceCssUrlToDataUrl(cssText, baseUrl, context, isImage) {
    if (!hasCssUrl(cssText)) return cssText;
    for (const [rawUrl, url] of parseCssUrls(cssText, baseUrl)) {
      try {
        const dataUrl = await contextFetch(context, {
          url,
          requestType: isImage ? "image" : "text",
          responseType: "dataUrl"
        });
        cssText = cssText.replace(toRE(rawUrl), `$1${dataUrl}$3`);
      } catch (error) {
        context.log.warn("Failed to fetch css data url", rawUrl, error);
      }
    }
    return cssText;
  }
  function hasCssUrl(cssText) {
    return /url\((['"]?)([^'"]+?)\1\)/.test(cssText);
  }
  const URL_RE = /url\((['"]?)([^'"]+?)\1\)/g;
  function parseCssUrls(cssText, baseUrl) {
    const result = [];
    cssText.replace(URL_RE, (raw, quotation, url) => {
      result.push([url, resolveUrl(url, baseUrl)]);
      return raw;
    });
    return result.filter(_ref5 => {
      let [url] = _ref5;
      return !isDataUrl(url);
    });
  }
  function toRE(url) {
    const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
  }
  const properties = ["background-image", "border-image-source", "-webkit-border-image", "-webkit-mask-image", "list-style-image"];
  function embedCssStyleImage(style, context) {
    return properties.map(property => {
      const value = style.getPropertyValue(property);
      if (!value || value === "none") {
        return null;
      }
      if (IN_SAFARI || IN_FIREFOX) {
        context.drawImageCount++;
      }
      return replaceCssUrlToDataUrl(value, null, context, true).then(newValue => {
        if (!newValue || value === newValue) return;
        style.setProperty(property, newValue, style.getPropertyPriority(property));
      });
    }).filter(Boolean);
  }
  function embedImageElement(cloned, context) {
    if (isImageElement(cloned)) {
      const originalSrc = cloned.currentSrc || cloned.src;
      if (!isDataUrl(originalSrc)) {
        return [contextFetch(context, {
          url: originalSrc,
          imageDom: cloned,
          requestType: "image",
          responseType: "dataUrl"
        }).then(url => {
          if (!url) return;
          cloned.srcset = "";
          cloned.dataset.originalSrc = originalSrc;
          cloned.src = url || "";
        })];
      }
      if (IN_SAFARI || IN_FIREFOX) {
        context.drawImageCount++;
      }
    } else if (isSVGElementNode(cloned) && !isDataUrl(cloned.href.baseVal)) {
      const originalSrc = cloned.href.baseVal;
      return [contextFetch(context, {
        url: originalSrc,
        imageDom: cloned,
        requestType: "image",
        responseType: "dataUrl"
      }).then(url => {
        if (!url) return;
        cloned.dataset.originalSrc = originalSrc;
        cloned.href.baseVal = url || "";
      })];
    }
    return [];
  }
  function embedSvgUse(cloned, context) {
    const {
      ownerDocument,
      svgDefsElement
    } = context;
    const href = cloned.getAttribute("href") ?? cloned.getAttribute("xlink:href");
    if (!href) return [];
    const [svgUrl, id] = href.split("#");
    if (id) {
      const query = `#${id}`;
      const definition = ownerDocument?.querySelector(`svg ${query}`);
      if (svgUrl) {
        cloned.setAttribute("href", query);
      }
      if (svgDefsElement?.querySelector(query)) return [];
      if (definition) {
        svgDefsElement?.appendChild(definition.cloneNode(true));
        return [];
      } else if (svgUrl) {
        return [contextFetch(context, {
          url: svgUrl,
          responseType: "text"
        }).then(svgData => {
          svgDefsElement?.insertAdjacentHTML("beforeend", svgData);
        })];
      }
    }
    return [];
  }
  function embedNode(cloned, context) {
    const {
      tasks
    } = context;
    if (isElementNode(cloned)) {
      if (isImageElement(cloned) || isSVGImageElementNode(cloned)) {
        tasks.push(...embedImageElement(cloned, context));
      }
      if (isSVGUseElementNode(cloned)) {
        tasks.push(...embedSvgUse(cloned, context));
      }
    }
    if (isHTMLElementNode(cloned)) {
      tasks.push(...embedCssStyleImage(cloned.style, context));
    }
    cloned.childNodes.forEach(child => {
      embedNode(child, context);
    });
  }
  async function embedWebFont(clone, context) {
    const {
      ownerDocument,
      svgStyleElement,
      fontFamilies,
      fontCssTexts,
      tasks,
      font
    } = context;
    if (!ownerDocument || !svgStyleElement || !fontFamilies.size) {
      return;
    }
    if (font && font.cssText) {
      const cssText = filterPreferredFormat(font.cssText, context);
      svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
    } else {
      const styleSheets = Array.from(ownerDocument.styleSheets).filter(styleSheet => {
        try {
          return "cssRules" in styleSheet && Boolean(styleSheet.cssRules.length);
        } catch (error) {
          context.log.warn(`Error while reading CSS rules from ${styleSheet.href}`, error);
          return false;
        }
      });
      await Promise.all(styleSheets.flatMap(styleSheet => {
        return Array.from(styleSheet.cssRules).map(async (cssRule, index) => {
          if (isCSSImportRule(cssRule)) {
            let importIndex = index + 1;
            const baseUrl = cssRule.href;
            let cssText = "";
            try {
              cssText = await contextFetch(context, {
                url: baseUrl,
                requestType: "text",
                responseType: "text"
              });
            } catch (error) {
              context.log.warn(`Error fetch remote css import from ${baseUrl}`, error);
            }
            const replacedCssText = cssText.replace(URL_RE, (raw, quotation, url) => raw.replace(url, resolveUrl(url, baseUrl)));
            for (const rule of parseCss(replacedCssText)) {
              try {
                styleSheet.insertRule(rule, rule.startsWith("@import") ? importIndex += 1 : styleSheet.cssRules.length);
              } catch (error) {
                context.log.warn("Error inserting rule from remote css import", {
                  rule,
                  error
                });
              }
            }
          }
        });
      }));
      const cssRules = styleSheets.flatMap(styleSheet => Array.from(styleSheet.cssRules));
      cssRules.filter(cssRule => isCssFontFaceRule(cssRule) && hasCssUrl(cssRule.style.getPropertyValue("src")) && splitFontFamily(cssRule.style.getPropertyValue("font-family"))?.some(val => fontFamilies.has(val))).forEach(value => {
        const rule = value;
        const cssText = fontCssTexts.get(rule.cssText);
        if (cssText) {
          svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText}
`));
        } else {
          tasks.push(replaceCssUrlToDataUrl(rule.cssText, rule.parentStyleSheet ? rule.parentStyleSheet.href : null, context).then(cssText2 => {
            cssText2 = filterPreferredFormat(cssText2, context);
            fontCssTexts.set(rule.cssText, cssText2);
            svgStyleElement.appendChild(ownerDocument.createTextNode(`${cssText2}
`));
          }));
        }
      });
    }
  }
  const COMMENTS_RE = /(\/\*[\s\S]*?\*\/)/g;
  const KEYFRAMES_RE = /((@.*?keyframes [\s\S]*?){([\s\S]*?}\s*?)})/gi;
  function parseCss(source) {
    if (source == null) return [];
    const result = [];
    let cssText = source.replace(COMMENTS_RE, "");
    while (true) {
      const matches = KEYFRAMES_RE.exec(cssText);
      if (!matches) break;
      result.push(matches[0]);
    }
    cssText = cssText.replace(KEYFRAMES_RE, "");
    const IMPORT_RE = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
    const UNIFIED_RE = new RegExp(
    // eslint-disable-next-line
    "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
    while (true) {
      let matches = IMPORT_RE.exec(cssText);
      if (!matches) {
        matches = UNIFIED_RE.exec(cssText);
        if (!matches) {
          break;
        } else {
          IMPORT_RE.lastIndex = UNIFIED_RE.lastIndex;
        }
      } else {
        UNIFIED_RE.lastIndex = IMPORT_RE.lastIndex;
      }
      result.push(matches[0]);
    }
    return result;
  }
  const URL_WITH_FORMAT_RE = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
  const FONT_SRC_RE = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
  function filterPreferredFormat(str, context) {
    const {
      font
    } = context;
    const preferredFormat = font ? font?.preferredFormat : void 0;
    return preferredFormat ? str.replace(FONT_SRC_RE, match => {
      while (true) {
        const [src,, format] = URL_WITH_FORMAT_RE.exec(match) || [];
        if (!format) return "";
        if (format === preferredFormat) return `src: ${src};`;
      }
    }) : str;
  }
  async function domToForeignObjectSvg(node, options) {
    const context = await orCreateContext(node, options);
    if (isElementNode(context.node) && isSVGElementNode(context.node)) return context.node;
    const {
      ownerDocument,
      log,
      tasks,
      svgStyleElement,
      svgDefsElement,
      svgStyles,
      font,
      progress,
      autoDestruct,
      onCloneNode,
      onEmbedNode,
      onCreateForeignObjectSvg
    } = context;
    log.time("clone node");
    const clone = await cloneNode(context.node, context, true);
    if (svgStyleElement && ownerDocument) {
      let allCssText = "";
      svgStyles.forEach((klasses, cssText) => {
        allCssText += `${klasses.join(",\n")} {
  ${cssText}
}
`;
      });
      svgStyleElement.appendChild(ownerDocument.createTextNode(allCssText));
    }
    log.timeEnd("clone node");
    await onCloneNode?.(clone);
    if (font !== false && isElementNode(clone)) {
      log.time("embed web font");
      await embedWebFont(clone, context);
      log.timeEnd("embed web font");
    }
    log.time("embed node");
    embedNode(clone, context);
    const count = tasks.length;
    let current = 0;
    const runTask = async () => {
      while (true) {
        const task = tasks.pop();
        if (!task) break;
        try {
          await task;
        } catch (error) {
          context.log.warn("Failed to run task", error);
        }
        progress?.(++current, count);
      }
    };
    progress?.(current, count);
    await Promise.all([...Array.from({
      length: 4
    })].map(runTask));
    log.timeEnd("embed node");
    await onEmbedNode?.(clone);
    const svg = createForeignObjectSvg(clone, context);
    svgDefsElement && svg.insertBefore(svgDefsElement, svg.children[0]);
    svgStyleElement && svg.insertBefore(svgStyleElement, svg.children[0]);
    autoDestruct && destroyContext(context);
    await onCreateForeignObjectSvg?.(svg);
    return svg;
  }
  function createForeignObjectSvg(clone, context) {
    const {
      width,
      height
    } = context;
    const svg = createSvg(width, height, clone.ownerDocument);
    const foreignObject = svg.ownerDocument.createElementNS(svg.namespaceURI, "foreignObject");
    foreignObject.setAttributeNS(null, "x", "0%");
    foreignObject.setAttributeNS(null, "y", "0%");
    foreignObject.setAttributeNS(null, "width", "100%");
    foreignObject.setAttributeNS(null, "height", "100%");
    foreignObject.append(clone);
    svg.appendChild(foreignObject);
    return svg;
  }
  async function domToCanvas(node, options) {
    const context = await orCreateContext(node, options);
    const svg = await domToForeignObjectSvg(context);
    const dataUrl = svgToDataUrl(svg, context.isEnable("removeControlCharacter"));
    if (!context.autoDestruct) {
      context.svgStyleElement = createStyleElement(context.ownerDocument);
      context.svgDefsElement = context.ownerDocument?.createElementNS(XMLNS, "defs");
      context.svgStyles.clear();
    }
    const image = createImage(dataUrl, svg.ownerDocument);
    return await imageToCanvas(image, context);
  }

  /**
   * 获取工具栏工具边界绘制状态
   * @param startX x轴绘制起点
   * @param startY y轴绘制起点
   * @param cutBoxPosition 裁剪框位置信息
   */
  function getDrawBoundaryStatus(startX, startY, cutBoxPosition) {
      if (startX < cutBoxPosition.startX ||
          startY < cutBoxPosition.startY ||
          startX > cutBoxPosition.startX + cutBoxPosition.width ||
          startY > cutBoxPosition.startY + cutBoxPosition.height) {
          // 无法绘制
          return false;
      }
      // 可以绘制
      return true;
  }

  // 键盘按下事件处理类
  var KeyboardEventHandle = /** @class */ (function () {
      function KeyboardEventHandle(screenShotController, toolController) {
          var _this = this;
          // 截图工具栏容器
          this.toolController = null;
          var data = new InitData();
          var textInputContainer = document.getElementById("textInputPanel");
          this.toolController = toolController;
          // 调整截图容器显示权重
          screenShotController.tabIndex = 999999999;
          // 监听全局键盘按下事件
          document.body.addEventListener("keydown", function (event) {
              // 文本输入框存在时则终止
              if (data.getTextEditState()) {
                  data.setTextEditState(false);
                  return;
              }
              if (event.code === "Escape") {
                  // ESC按下，触发取消截图事件
                  _this.triggerEvent("close");
              }
              if (event.code === "Enter" &&
                  textInputContainer &&
                  textInputContainer.style.display !== "block") {
                  // Enter按下，触发确认截图事件
                  _this.triggerEvent("confirm");
              }
              // 按下command+z或者ctrl+z快捷键选中撤销工具
              if ((event.metaKey || event.ctrlKey) && event.code === "KeyZ") {
                  _this.triggerEvent("undo");
              }
          });
      }
      /**
       * 触发工具栏指定模块的点击事件
       * @param eventName 事件名, 与截图工具栏中的data-title属性值保持一致
       * @private
       */
      KeyboardEventHandle.prototype.triggerEvent = function (eventName) {
          if (this.toolController == null)
              return;
          for (var i = 0; i < this.toolController.childNodes.length; i++) {
              var childNode = this.toolController.childNodes[i];
              var toolName = childNode.getAttribute("data-title");
              if (toolName === eventName) {
                  // 执行参数事件
                  childNode.click();
              }
          }
      };
      return KeyboardEventHandle;
  }());

  // 为插件的全局参数设置数据
  function setPlugInParameters(options) {
      var plugInParameters = new PlugInParameters();
      // webrtc启用状态, 默认为true，如果设置了false则修改默认值
      if ((options === null || options === void 0 ? void 0 : options.enableWebRtc) === false) {
          plugInParameters.setWebRtcStatus(false);
          plugInParameters.setInitStatus(false);
      }
      // 读取并设置参数中的视频流数据
      if ((options === null || options === void 0 ? void 0 : options.screenFlow) instanceof MediaStream) {
          plugInParameters.setScreenFlow(options.screenFlow);
      }
      // 读取参数中的画布宽高, 两者都存在时才设置
      if ((options === null || options === void 0 ? void 0 : options.canvasWidth) && (options === null || options === void 0 ? void 0 : options.canvasHeight)) {
          plugInParameters.setCanvasSize(options.canvasWidth, options.canvasHeight);
      }
      // 读取参数设置默认展示截屏数据的状态，默认为false，如果设置了true才修改
      if ((options === null || options === void 0 ? void 0 : options.showScreenData) === true) {
          plugInParameters.setShowScreenDataStatus(true);
      }
      if ((options === null || options === void 0 ? void 0 : options.maskColor) && typeof options.maskColor === "object") {
          plugInParameters.setMaskColor(options.maskColor);
      }
      // 调用者关闭了剪切板写入，则修改全局变量（默认为true）
      if ((options === null || options === void 0 ? void 0 : options.writeBase64) === false) {
          plugInParameters.setWriteImgState(options.writeBase64);
      }
      // 调用者传入了截图dom
      if (options === null || options === void 0 ? void 0 : options.screenShotDom) {
          plugInParameters.setScreenShotDom(options.screenShotDom);
      }
      // 调用者传入了裁剪区域边框像素点颜色信息
      if (options === null || options === void 0 ? void 0 : options.cutBoxBdColor) {
          plugInParameters.setCutBoxBdColor(options.cutBoxBdColor);
      }
      // 调用者传入了保存截图回调
      if (options === null || options === void 0 ? void 0 : options.saveCallback) {
          plugInParameters.setSaveCallback(options.saveCallback);
      }
      // 设置最大撤销次数
      if (options === null || options === void 0 ? void 0 : options.maxUndoNum) {
          plugInParameters.setMaxUndoNum(options.maxUndoNum);
      }
      // 箭头绘制工具是否使用等比例绘制方式
      if (options === null || options === void 0 ? void 0 : options.useRatioArrow) {
          plugInParameters.setRatioArrow(options.useRatioArrow);
      }
      // 设置图片自适应开启状态
      if (options === null || options === void 0 ? void 0 : options.imgAutoFit) {
          plugInParameters.setImgAutoFit(options.imgAutoFit);
      }
      // 设置图片尺寸
      if ((options === null || options === void 0 ? void 0 : options.useCustomImgSize) && (options === null || options === void 0 ? void 0 : options.customImgSize)) {
          plugInParameters.setUseCustomImgSize(options.useCustomImgSize, options.customImgSize);
      }
      // 设置图片保存时的文件名称
      if (options === null || options === void 0 ? void 0 : options.saveImgTitle) {
          plugInParameters.setSaveImgTitle(options.saveImgTitle);
      }
      // 确认截图时，是否需要销毁dom
      if ((options === null || options === void 0 ? void 0 : options.destroyContainer) === false) {
          console.log("状态设置", options.destroyContainer);
          plugInParameters.setDestroyContainerState(options.destroyContainer);
      }
      // 设置用户定义的toolbar数据
      if (options === null || options === void 0 ? void 0 : options.userToolbar) {
          plugInParameters.setUserToolbar(options.userToolbar);
      }
      // h2c模式下，跨域图片加载失败时的回调函数
      if (options === null || options === void 0 ? void 0 : options.h2cImgLoadErrCallback) {
          plugInParameters.setH2cCrossImgLoadErrFn(options.h2cImgLoadErrCallback);
      }
      // 处理用户定义的画布事件
      if (options === null || options === void 0 ? void 0 : options.canvasEvents) {
          plugInParameters.setCanvasEvents(options.canvasEvents);
      }
  }

  function updateContainerMouseStyle(container, toolName) {
      switch (toolName) {
          case "text":
              container.style.cursor = "text";
              break;
          default:
              container.style.cursor = "default";
              break;
      }
  }

  function isPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
          "Android",
          "iPhone",
          "SymbianOS",
          "Windows Phone",
          "iPad",
          "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
              flag = false;
              break;
          }
      }
      return flag;
  }
  // 检测设备是否支持触摸
  function isTouchDevice() {
      // 检查navigator.maxTouchPoints
      var maxTouchPoints = "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
      // 检查旧版API navigator.msMaxTouchPoints
      var msMaxTouchPoints = "msMaxTouchPoints" in navigator && navigator.msMaxTouchPoints > 0;
      // 检查触摸事件处理器
      var touchEvent = "ontouchstart" in window;
      // 使用CSS媒体查询检查指针类型
      var coarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      // 如果以上任何一种方法返回true，则设备支持触摸
      return maxTouchPoints || msMaxTouchPoints || touchEvent || coarsePointer;
  }

  /**
   * 绘制箭头
   * @param context 需要进行绘制的画布
   * @param mouseStartX 鼠标按下时的x轴坐标 P1
   * @param mouseStartY 鼠标按下式的y轴坐标 P1
   * @param mouseX 当前鼠标x轴坐标 P2
   * @param mouseY 当前鼠标y轴坐标 P2
   * @param theta 箭头斜线与直线的夹角角度 (θ) P3 ---> (P1、P2) || P4 ---> P1(P1、P2)
   * @param slashLength 箭头斜线的长度 P3 ---> P2 || P4 ---> P2
   * @param borderWidth 边框宽度
   * @param color 边框颜色
   */
  function drawLineArrow(context, mouseStartX, mouseStartY, mouseX, mouseY, theta, slashLength, borderWidth, color) {
      /**
       * 已知:
       *    1. P1、P2的坐标
       *    2. 箭头斜线(P3 || P4) ---> P2直线的长度
       *    3. 箭头斜线(P3 || P4) ---> (P1、P2)直线的夹角角度(θ)
       * 求:
       *    P3、P4的坐标
       */
      var angle = (Math.atan2(mouseStartY - mouseY, mouseStartX - mouseX) * 180) / Math.PI, // 通过atan2来获取箭头的角度
      angle1 = ((angle + theta) * Math.PI) / 180, // P3点的角度
      angle2 = ((angle - theta) * Math.PI) / 180, // P4点的角度
      topX = slashLength * Math.cos(angle1), // P3点的x轴坐标
      topY = slashLength * Math.sin(angle1), // P3点的y轴坐标
      botX = slashLength * Math.cos(angle2), // P4点的X轴坐标
      botY = slashLength * Math.sin(angle2); // P4点的Y轴坐标
      // 开始绘制
      context.save();
      context.beginPath();
      // P3的坐标位置
      var arrowX = mouseStartX - topX, arrowY = mouseStartY - topY;
      // 移动笔触到P3坐标
      context.moveTo(arrowX, arrowY);
      // 移动笔触到P1
      context.moveTo(mouseStartX, mouseStartY);
      // 绘制P1到P2的直线
      context.lineTo(mouseX, mouseY);
      // 计算P3的位置
      arrowX = mouseX + topX;
      arrowY = mouseY + topY;
      // 移动笔触到P3坐标
      context.moveTo(arrowX, arrowY);
      // 绘制P2到P3的斜线
      context.lineTo(mouseX, mouseY);
      // 计算P4的位置
      arrowX = mouseX + botX;
      arrowY = mouseY + botY;
      // 绘制P2到P4的斜线
      context.lineTo(arrowX, arrowY);
      // 上色
      context.strokeStyle = color;
      context.lineWidth = borderWidth;
      // 填充
      context.stroke();
      // 结束绘制
      context.restore();
  }

  var ScreenShot = /** @class */ (function () {
      function ScreenShot(options) {
          var _this = this;
          this.screenShotDom = null;
          this.wrcReplyTime = 500;
          this.keyboardEventHandle = null;
          // 图形位置参数
          this.drawGraphPosition = {
              startX: 0,
              startY: 0,
              width: 0,
              height: 0
          };
          // 临时图形位置参数
          this.tempGraphPosition = {
              startX: 0,
              startY: 0,
              width: 0,
              height: 0
          };
          this.wrcImgPosition = { x: 0, y: 0, w: 0, h: 0 };
          // 是否隐藏页面滚动条
          this.hiddenScrollBar = {
              color: "#000000",
              fillState: false,
              state: false,
              fillWidth: 0,
              fillHeight: 0
          };
          this.wrcWindowMode = false;
          // 裁剪框边框节点坐标事件
          this.cutOutBoxBorderArr = [];
          // 当前操作的边框节点
          this.borderOption = null;
          // 点击裁剪框时的鼠标坐标
          this.movePosition = {
              moveStartX: 0,
              moveStartY: 0
          };
          // 鼠标拖动状态
          this.dragFlag = false;
          // 单击截取屏启用状态
          this.clickCutFullScreen = false;
          // 全屏截取状态
          this.getFullScreenStatus = false;
          // 上一个裁剪框坐标信息
          this.drawGraphPrevX = 0;
          this.drawGraphPrevY = 0;
          // 马赛克涂抹区域大小
          this.degreeOfBlur = 5;
          this.dpr = window.devicePixelRatio || 1;
          // 截全屏时工具栏展示的位置要减去的高度
          this.fullScreenDiffHeight = 60;
          // 截图容器位置信息
          this.position = { left: 0, top: 0 };
          this.imgSrc = null;
          this.loadCrossImg = false;
          // 鼠标是否在裁剪框内
          this.mouseInsideCropBox = false;
          this.proxyUrl = undefined;
          this.h2cIgnoreElementsFn = function () { return false; };
          this.useCORS = false;
          this.drawStatus = false;
          // webrtc模式下的屏幕流数据
          this.captureStream = null;
          this.cropBoxInfo = null;
          // 文本输入框位置
          this.textInputPosition = {
              mouseX: 0,
              mouseY: 0
          };
          // 工具栏显示位置
          this.placement = "center";
          // 递增变粗箭头的实现
          this.drawArrow = new DrawArrow();
          this.customRightClickEvent = {
              state: false
          };
          this.sendStream = function (stream, cancelCallback, triggerCallback) {
              if (stream instanceof MediaStream) {
                  _this.videoController.srcObject = stream;
                  _this.loadScreenFlowData(triggerCallback);
              }
              else {
                  if (cancelCallback != null) {
                      cancelCallback({
                          code: -1,
                          msg: "视频流接入失败"
                      });
                  }
                  // 销毁截图组件
                  _this.data.destroyDOM();
                  throw "\u89C6\u9891\u6D41\u63A5\u5165\u5931\u8D25";
              }
              return stream;
          };
          // 开始捕捉屏幕
          this.startCapture = function (cancelCallback) { return __awaiter(_this, void 0, void 0, function () {
              var captureStream, mediaWidth, mediaHeight, curTabState, displayConfig, err_1;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          captureStream = null;
                          mediaWidth = this.screenShotImageController.width * this.dpr;
                          mediaHeight = this.screenShotImageController.height * this.dpr;
                          curTabState = true;
                          displayConfig = {};
                          // 窗口模式启用时则
                          if (this.wrcWindowMode) {
                              mediaWidth = window.screen.width * this.dpr;
                              mediaHeight = window.screen.height * this.dpr;
                              curTabState = false;
                              displayConfig = {
                                  displaySurface: "window"
                              };
                          }
                          _a.label = 1;
                      case 1:
                          _a.trys.push([1, 3, , 4]);
                          return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia({
                                  audio: false,
                                  video: __assign({ width: mediaWidth, height: mediaHeight }, displayConfig),
                                  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                                  // @ts-ignore
                                  // 当前标签页
                                  preferCurrentTab: curTabState
                              })];
                      case 2:
                          // 捕获屏幕
                          captureStream = _a.sent();
                          // 将MediaStream输出至video标签
                          this.videoController.srcObject = captureStream;
                          // 储存屏幕流数据
                          this.captureStream = captureStream;
                          return [3 /*break*/, 4];
                      case 3:
                          err_1 = _a.sent();
                          if (cancelCallback != null) {
                              cancelCallback({
                                  code: -1,
                                  msg: "浏览器不支持webrtc或者用户未授权",
                                  errorInfo: err_1
                              });
                          }
                          // 销毁截图组件
                          this.data.destroyDOM();
                          if (cancelCallback == null) {
                              throw "\u6D4F\u89C8\u5668\u4E0D\u652F\u6301webrtc\u6216\u8005\u7528\u6237\u672A\u6388\u6743( ".concat(err_1, " )");
                          }
                          return [3 /*break*/, 4];
                      case 4: return [2 /*return*/, captureStream];
                  }
              });
          }); };
          // 停止捕捉屏幕
          this.stopCapture = function () {
              var srcObject = _this.videoController.srcObject;
              if (srcObject && "getTracks" in srcObject) {
                  var tracks = srcObject.getTracks();
                  tracks.forEach(function (track) { return track.stop(); });
                  _this.videoController.srcObject = null;
              }
          };
          // 截屏
          this.screenShot = function (cancelCallback, triggerCallback) {
              // 开始捕捉屏幕
              _this.startCapture(cancelCallback).then(function () {
                  _this.loadScreenFlowData(triggerCallback);
              });
          };
          // 鼠标按下事件
          this.mouseDownEvent = function (event) {
              var _a;
              // 隐藏颜色选择面板
              _this.data.setColorPanelStatus(false);
              // 隐藏文字大小选择面板
              _this.data.setTextSizeOptionStatus(false);
              // 非鼠标左键按下则终止
              if (event instanceof MouseEvent && event.button != 0)
                  return;
              // 当前处于移动端触摸时，需要在按下时判断当前坐标点是否处于裁剪框内，主动更新draggingTrim状态（移动端的move事件只会在按下时才会触发）
              if (isTouchDevice() &&
                  event instanceof TouchEvent &&
                  _this.screenShotCanvas) {
                  _this.operatingCutOutBox(event.touches[0].pageX, event.touches[0].pageY, _this.tempGraphPosition.startX, _this.tempGraphPosition.startY, _this.tempGraphPosition.width, _this.tempGraphPosition.height, _this.screenShotCanvas);
              }
              // 当前操作的是撤销
              if (_this.data.getToolName() == "undo")
                  return;
              _this.data.setDragging(true);
              _this.drawStatus = false;
              // 重置工具栏超出状态
              _this.data.setToolPositionStatus(false);
              var mouseX = nonNegativeData(event instanceof MouseEvent ? event.offsetX : event.touches[0].pageX);
              var mouseY = nonNegativeData(event instanceof MouseEvent ? event.offsetY : event.touches[0].pageY);
              // 如果当前操作的是截图工具栏
              if (_this.data.getToolClickStatus()) {
                  // 记录当前鼠标开始坐标
                  _this.drawGraphPosition.startX = mouseX;
                  _this.drawGraphPosition.startY = mouseY;
                  _this.isCustomTool() &&
                      ((_a = _this.plugInParameters
                          .getCanvasEvents()) === null || _a === void 0 ? void 0 : _a.mouseDownFn(event, mouseX, mouseY, addHistory));
              }
              // 当前操作的是画笔
              if (_this.data.getToolName() == "brush" && _this.screenShotCanvas) {
                  // 初始化画笔
                  initPencil(_this.screenShotCanvas, mouseX, mouseY);
              }
              // 当前操作的文本
              if (_this.data.getToolName() == "text" &&
                  _this.textInputController &&
                  _this.screenShotContainer &&
                  _this.screenShotCanvas) {
                  if (!_this.mouseInsideCropBox) {
                      return;
                  }
                  // 显示文本输入区域
                  _this.data.setTextStatus(true);
                  // 判断输入框位置是否变化
                  if (_this.textInputPosition.mouseX != 0 &&
                      _this.textInputPosition.mouseY != 0 &&
                      _this.textInputPosition.mouseX != mouseX &&
                      _this.textInputPosition.mouseY != mouseY) {
                      drawText(_this.textInputController.innerText, _this.textInputPosition.mouseX, _this.textInputPosition.mouseY, _this.data.getSelectedColor(), _this.data.getFontSize(), _this.screenShotCanvas);
                      // 输入框内容不为空时则隐藏
                      if (_this.textInputController.innerText !== "") {
                          // 隐藏输入框
                          _this.data.setTextStatus(false);
                      }
                      // 清空文本输入区域的内容
                      _this.textInputController.innerHTML = "";
                      // 保存绘制记录
                      addHistory();
                  }
                  // 计算文本框显示位置, 需要加上截图容器的位置信息
                  var textMouseX = mouseX + _this.position.left;
                  // 设置文本框位置等信息
                  _this.textInputController.style.left = textMouseX + "px";
                  _this.textInputController.style.fontSize = _this.data.getFontSize() + "px";
                  _this.textInputController.style.fontFamily = "none";
                  _this.textInputController.style.color = _this.data.getSelectedColor();
                  // 部分操作需要等dom渲染完毕执行
                  setTimeout(function () {
                      if (_this.textInputController) {
                          // 获取输入框容器的高度
                          var containerHeight = _this.textInputController.offsetHeight;
                          // 输入框容器y轴的位置需要在坐标的基础上再加上容器高度的一半，容器的位置就正好居中于光标
                          // canvas渲染的时候就不会出现位置不一致的问题了
                          var textMouseY = mouseY - Math.floor(containerHeight / 2) + _this.position.top;
                          _this.textInputController.style.top = textMouseY + "px";
                          // 获取焦点
                          _this.textInputController.focus();
                          // 记录当前输入框位置
                          _this.textInputPosition = { mouseX: mouseX, mouseY: mouseY };
                          _this.data.setTextInfo({
                              positionX: mouseX,
                              positionY: mouseY,
                              color: _this.data.getSelectedColor(),
                              size: _this.data.getFontSize()
                          });
                      }
                  });
              }
              // 如果操作的是裁剪框
              if (_this.borderOption) {
                  // 设置为拖动状态
                  _this.data.setDraggingTrim(true);
                  // 记录移动时的起始点坐标
                  _this.movePosition.moveStartX = mouseX;
                  _this.movePosition.moveStartY = mouseY;
              }
              else {
                  // 保存当前裁剪框的坐标
                  _this.drawGraphPrevX = _this.drawGraphPosition.startX;
                  _this.drawGraphPrevY = _this.drawGraphPosition.startY;
                  // 绘制裁剪框,记录当前鼠标开始坐标
                  _this.drawGraphPosition.startX = mouseX;
                  _this.drawGraphPosition.startY = mouseY;
              }
          };
          // 鼠标移动事件
          this.mouseMoveEvent = function (event) {
              var _a;
              if (_this.screenShotCanvas == null ||
                  _this.screenShotContainer == null ||
                  _this.data.getToolName() == "undo") {
                  return;
              }
              // 去除默认事件
              event.preventDefault();
              // 工具栏未选择且鼠标处于按下状态时
              if (!_this.data.getToolClickStatus() && _this.data.getDragging()) {
                  // 修改拖动状态为true;
                  _this.dragFlag = true;
                  // 隐藏截图工具栏
                  _this.data.setToolStatus(false);
                  // 隐藏裁剪框尺寸显示容器
                  _this.data.setCutBoxSizeStatus(false);
              }
              // 获取当前绘制中的工具位置信息
              var _b = _this.drawGraphPosition, startX = _b.startX, startY = _b.startY, width = _b.width, height = _b.height;
              // 获取当前鼠标坐标
              var currentX = nonNegativeData(event instanceof MouseEvent ? event.offsetX : event.touches[0].pageX);
              var currentY = nonNegativeData(event instanceof MouseEvent ? event.offsetY : event.touches[0].pageY);
              // 绘制中工具的临时宽高
              var tempWidth = currentX - startX;
              var tempHeight = currentY - startY;
              // 工具栏绘制
              if (_this.data.getToolClickStatus() && _this.data.getDragging()) {
                  // 获取裁剪框位置信息
                  var cutBoxPosition = _this.data.getCutOutBoxPosition();
                  // 绘制中工具的起始x、y坐标不能小于裁剪框的起始坐标
                  // 绘制中工具的起始x、y坐标不能大于裁剪框的结束标作
                  // 当前鼠标的x坐标不能小于裁剪框起始x坐标，不能大于裁剪框的结束坐标
                  // 当前鼠标的y坐标不能小于裁剪框起始y坐标，不能大于裁剪框的结束坐标
                  if (!getDrawBoundaryStatus(startX, startY, cutBoxPosition) ||
                      !getDrawBoundaryStatus(currentX, currentY, cutBoxPosition))
                      return;
                  // 当前操作的不是马赛克则显示最后一次画布绘制时的状态
                  if (_this.data.getToolName() != "mosaicPen") {
                      _this.showLastHistory();
                      _this.drawStatus = true;
                  }
                  _this.isCustomTool() &&
                      ((_a = _this.plugInParameters.getCanvasEvents()) === null || _a === void 0 ? void 0 : _a.mouseMoveFn(event, {
                          startX: startX,
                          startY: startY,
                          currentX: currentX,
                          currentY: currentY
                      }, showLastHistory));
                  switch (_this.data.getToolName()) {
                      case "square":
                          drawRectangle(startX, startY, tempWidth, tempHeight, _this.data.getSelectedColor(), _this.data.getPenSize(), _this.screenShotCanvas);
                          break;
                      case "round":
                          drawCircle(_this.screenShotCanvas, currentX, currentY, startX, startY, _this.data.getPenSize(), _this.data.getSelectedColor());
                          break;
                      case "right-top":
                          // 绘制等比例箭头
                          if (_this.plugInParameters.getRatioArrow()) {
                              drawLineArrow(_this.screenShotCanvas, startX, startY, currentX, currentY, 30, 10, _this.data.getPenSize(), _this.data.getSelectedColor());
                              return;
                          }
                          _this.drawArrow.draw(_this.screenShotCanvas, startX, startY, currentX, currentY, _this.data.getSelectedColor(), _this.data.getPenSize());
                          break;
                      case "brush":
                          // 画笔绘制
                          drawPencil(_this.screenShotCanvas, currentX, currentY, _this.data.getPenSize(), _this.data.getSelectedColor());
                          break;
                      case "mosaicPen":
                          // 当前为马赛克工具则修改绘制状态
                          // 前面做了判断，此处需要特殊处理
                          if (!_this.drawStatus) {
                              _this.showLastHistory();
                              _this.drawStatus = true;
                          }
                          // 绘制马赛克，为了确保鼠标位置在绘制区域中间，所以对x、y坐标进行-10处理
                          drawMosaic(currentX - 10, currentY - 10, _this.data.getMosaicPenSize(), _this.degreeOfBlur, _this.screenShotCanvas);
                          break;
                  }
                  return;
              }
              // 执行裁剪框操作函数
              _this.operatingCutOutBox(currentX, currentY, startX, startY, width, height, _this.screenShotCanvas);
              // 如果鼠标未点击或者当前操作的是裁剪框都return
              if (!_this.data.getDragging() || _this.data.getDraggingTrim())
                  return;
              // 绘制裁剪框
              _this.tempGraphPosition = drawCutOutBox(startX, startY, tempWidth, tempHeight, _this.screenShotCanvas, _this.data.getBorderSize(), _this.screenShotContainer, _this.screenShotImageController);
          };
          // 鼠标抬起事件
          this.mouseUpEvent = function () {
              var _a;
              // 当前操作的是撤销
              if (_this.data.getToolName() == "undo")
                  return;
              // 绘制结束
              _this.data.setDragging(false);
              _this.data.setDraggingTrim(false);
              // 截图容器判空
              if (_this.screenShotCanvas == null || _this.screenShotContainer == null) {
                  return;
              }
              // 工具栏未点击且鼠标未拖动且单击截屏状态为false则复原裁剪框位置
              if (!_this.data.getToolClickStatus() &&
                  !_this.dragFlag &&
                  !_this.clickCutFullScreen) {
                  // 复原裁剪框的坐标
                  _this.drawGraphPosition.startX = _this.drawGraphPrevX;
                  _this.drawGraphPosition.startY = _this.drawGraphPrevY;
                  return;
              }
              // 调用者尚未拖拽生成选区
              // 鼠标尚未拖动
              // 单击截取屏幕状态为true
              // 则截取整个屏幕
              var cutBoxPosition = _this.data.getCutOutBoxPosition();
              if (cutBoxPosition.width === 0 &&
                  cutBoxPosition.height === 0 &&
                  cutBoxPosition.startX === 0 &&
                  cutBoxPosition.startY === 0 &&
                  !_this.dragFlag &&
                  _this.clickCutFullScreen) {
                  var borderSize = _this.data.getBorderSize();
                  _this.getFullScreenStatus = true;
                  // 设置裁剪框位置为全屏
                  _this.tempGraphPosition = drawCutOutBox(0, 0, _this.screenShotContainer.width - borderSize / 2, _this.screenShotContainer.height - borderSize / 2, _this.screenShotCanvas, borderSize, _this.screenShotContainer, _this.screenShotImageController);
              }
              if (_this.screenShotContainer == null || _this.screenShotCanvas == null) {
                  return;
              }
              // 工具栏已点击且进行了绘制
              if (_this.data.getToolClickStatus() && _this.drawStatus) {
                  _this.isCustomTool() &&
                      ((_a = _this.plugInParameters.getCanvasEvents()) === null || _a === void 0 ? void 0 : _a.mouseUpFn(showLastHistory));
                  // 保存绘制记录
                  addHistory();
                  return;
              }
              else if (_this.data.getToolClickStatus() && !_this.drawStatus) {
                  // 工具栏点击了但尚未进行绘制
                  return;
              }
              // 保存绘制后的图形位置信息
              _this.drawGraphPosition = _this.tempGraphPosition;
              // 如果工具栏未点击则保存裁剪框位置
              if (!_this.data.getToolClickStatus()) {
                  var _b = _this.drawGraphPosition, startX = _b.startX, startY = _b.startY, width = _b.width, height = _b.height;
                  _this.data.setCutOutBoxPosition(startX, startY, width, height);
              }
              // 保存边框节点信息
              _this.cutOutBoxBorderArr = saveBorderArrInfo(_this.data.getBorderSize(), _this.drawGraphPosition);
              // 鼠标按下且拖动时重新渲染工具栏
              if ((_this.screenShotContainer != null && _this.dragFlag) ||
                  _this.clickCutFullScreen) {
                  // 修改鼠标状态为拖动
                  _this.screenShotContainer.style.cursor = "move";
                  // 显示截图工具栏
                  _this.data.setToolStatus(true);
                  // 显示裁剪框尺寸显示容器
                  _this.data.setCutBoxSizeStatus(true);
                  // 复原拖动状态
                  _this.dragFlag = false;
                  if (_this.toolController != null) {
                      _this.showToolBar();
                  }
              }
          };
          this.plugInParameters = new PlugInParameters();
          // 提取options中的有用参数设置到全局参数中
          setPlugInParameters(options);
          // 创建截图所需dom并设置回调函数
          new CreateDom(options);
          // 创建并获取webrtc模式所需要的辅助dom
          this.videoController = document.createElement("video");
          this.videoController.autoplay = true;
          this.screenShotImageController = document.createElement("canvas");
          // 实例化响应式data
          this.data = new InitData();
          // 设置插件的可选参数
          this.setOptionalParameter(options);
          // 获取截图区域canvas容器(获取的同时也会为InitData中的全局变量赋值)
          this.setGlobalParameter();
          // 修改截图容器可滚动状态
          this.data.setNoScrollStatus(options === null || options === void 0 ? void 0 : options.noScroll);
          // 加载截图组件
          this.load(options === null || options === void 0 ? void 0 : options.triggerCallback, options === null || options === void 0 ? void 0 : options.cancelCallback);
          if (this.toolController == null ||
              this.screenShotContainer == null ||
              this.textInputController == null) {
              return;
          }
          // 截图组件加载完毕后，对层级进行调整
          this.adjustContainerLevels((options === null || options === void 0 ? void 0 : options.level) ? options.level : 0);
          // 创建键盘事件监听
          this.keyboardEventHandle = new KeyboardEventHandle(this.screenShotContainer, this.toolController);
          // 给输入容器设置快捷键监听
          this.registerContainerShortcuts(this.textInputController);
          if (this.customRightClickEvent.state) {
              // 给截图容器添加右键事件监听
              this.registerForRightClickEvent(this.screenShotContainer);
          }
      }
      // 获取截图区域canvas容器
      ScreenShot.prototype.getCanvasController = function () {
          return this.screenShotContainer;
      };
      // 销毁组件方法
      ScreenShot.prototype.destroyComponents = function () {
          this.data.destroyDOM();
          this.data.setInitStatus(true);
      };
      // 确认截图方法
      ScreenShot.prototype.completeScreenshot = function () {
          if (this.keyboardEventHandle) {
              this.keyboardEventHandle.triggerEvent("confirm");
          }
      };
      // 注册右键事件
      ScreenShot.prototype.registerForRightClickEvent = function (container) {
          var _this = this;
          container.addEventListener("contextmenu", function (e) {
              e.preventDefault();
              // 调用者传入了自定义事件则执行
              if (_this.customRightClickEvent.handleFn) {
                  _this.customRightClickEvent.handleFn();
                  return;
              }
              // 销毁组件
              _this.destroyComponents();
          });
      };
      // 加载截图组件
      ScreenShot.prototype.load = function (triggerCallback, cancelCallback) {
          var _this = this;
          var canvasSize = this.plugInParameters.getCanvasSize();
          var viewSize = {
              width: parseFloat(window.getComputedStyle(document.body).width),
              height: parseFloat(window.getComputedStyle(document.body).height)
          };
          // 设置截图区域canvas宽高
          this.data.setScreenShotInfo(viewSize.width, viewSize.height);
          // 设置截图容器位置
          this.data.setScreenShotPosition(this.position.left, this.position.top);
          // 设置截图图片存放容器宽高
          this.screenShotImageController.width = viewSize.width;
          this.screenShotImageController.height = viewSize.height;
          // 用户有传宽高则使用用户传进来的
          if (canvasSize.canvasWidth !== 0 && canvasSize.canvasHeight !== 0) {
              this.data.setScreenShotInfo(canvasSize.canvasWidth, canvasSize.canvasHeight);
              this.screenShotImageController.width = canvasSize.canvasWidth;
              this.screenShotImageController.height = canvasSize.canvasHeight;
          }
          // 获取截图区域canvas容器画布
          if (this.screenShotContainer == null)
              return;
          var context = getCanvas2dCtx(this.screenShotContainer, this.screenShotImageController.width, this.screenShotImageController.height);
          if (context == null)
              return;
          // 显示截图区域容器
          this.data.showScreenShotPanel();
          if (!this.plugInParameters.getWebRtcStatus()) {
              // 判断用户是否自己传入截屏图片
              if (this.imgSrc != null) {
                  this.drawPictures(triggerCallback, context, this.imgSrc);
                  return;
              }
              // html2canvas截屏
              domToCanvas(this.screenShotDom ? this.screenShotDom : document.body, {
              // onclone: this.loadCrossImg ? drawCrossImg : undefined,
              // proxy: this.proxyUrl,
              // ignoreElements: this.h2cIgnoreElementsFn,
              // useCORS: this.useCORS
              })
                  .then(function (canvas) {
                  // 装载截图的dom为null则退出
                  if (_this.screenShotContainer == null)
                      return;
                  // 存储html2canvas截取的内容
                  _this.screenShotImageController = canvas;
                  // 初始化截图容器
                  _this.initScreenShot(triggerCallback, context, canvas);
              })
                  .catch(function (err) {
                  if (triggerCallback != null) {
                      // 获取页面元素成功，执行回调函数
                      triggerCallback({ code: -1, msg: err });
                  }
              });
              return;
          }
          // 调用者有传入屏幕流数据则使用
          if (this.plugInParameters.getScreenFlow()) {
              this.sendStream(this.plugInParameters.getScreenFlow(), cancelCallback, triggerCallback);
              return;
          }
          // 隐藏光标
          document.body.classList.add("no-cursor");
          // 使用webrtc实现截屏
          this.screenShot(cancelCallback, triggerCallback);
      };
      ScreenShot.prototype.loadScreenFlowData = function (triggerCallback) {
          var _this = this;
          setTimeout(function () {
              var _a, _b, _c;
              // 获取截图区域canvas容器画布
              if (_this.screenShotContainer == null)
                  return;
              var canvasSize = _this.plugInParameters.getCanvasSize();
              var containerWidth = (_a = _this.screenShotImageController) === null || _a === void 0 ? void 0 : _a.width;
              var containerHeight = (_b = _this.screenShotImageController) === null || _b === void 0 ? void 0 : _b.height;
              // 用户有传宽高时，则使用用户的
              if (canvasSize.canvasWidth !== 0 && canvasSize.canvasHeight !== 0) {
                  containerWidth = canvasSize.canvasWidth;
                  containerHeight = canvasSize.canvasHeight;
              }
              var imgContainerWidth = containerWidth;
              var imgContainerHeight = containerHeight;
              if (_this.wrcWindowMode) {
                  imgContainerWidth = containerWidth * _this.dpr;
                  imgContainerHeight = containerHeight * _this.dpr;
              }
              var context = getCanvas2dCtx(_this.screenShotContainer, containerWidth, containerHeight);
              var imgContext = getCanvas2dCtx(_this.screenShotImageController, imgContainerWidth, imgContainerHeight);
              if (context == null || imgContext == null)
                  return;
              // 赋值截图区域canvas画布
              _this.screenShotCanvas = context;
              var _d = _this.videoController, videoWidth = _d.videoWidth, videoHeight = _d.videoHeight;
              if (_this.wrcWindowMode) {
                  // 从窗口视频流中获取body内容
                  var bodyImgData = _this.getWindowContentData(videoWidth, videoHeight, containerWidth * _this.dpr, containerHeight * _this.dpr);
                  if (bodyImgData == null)
                      return;
                  // 将body内容绘制到图片容器里
                  imgContext.putImageData(bodyImgData, 0, 0);
              }
              else {
                  // 对webrtc源提供的图像宽高进行修复
                  var fixWidth = containerWidth;
                  var fixHeight = (videoHeight * containerWidth) / videoWidth;
                  if (fixHeight > containerHeight) {
                      fixWidth = (containerWidth * containerHeight) / fixHeight;
                      fixHeight = containerHeight;
                  }
                  // 对视频容器的内容进行裁剪
                  fixWidth = _this.wrcImgPosition.w > 0 ? _this.wrcImgPosition.w : fixWidth;
                  fixHeight =
                      _this.wrcImgPosition.h > 0 ? _this.wrcImgPosition.h : fixHeight;
                  imgContext === null || imgContext === void 0 ? void 0 : imgContext.drawImage(_this.videoController, _this.wrcImgPosition.x, _this.wrcImgPosition.y, fixWidth, fixHeight);
                  // 隐藏滚动条会出现部分内容未截取到，需要进行修复
                  var diffHeight = containerHeight - fixHeight;
                  if (_this.hiddenScrollBar.state &&
                      diffHeight > 0 &&
                      _this.hiddenScrollBar.fillState) {
                      // 填充容器的剩余部分
                      imgContext.beginPath();
                      var fillWidth = containerWidth;
                      var fillHeight = diffHeight;
                      if (_this.hiddenScrollBar.fillWidth > 0) {
                          fillWidth = _this.hiddenScrollBar.fillWidth;
                      }
                      if (_this.hiddenScrollBar.fillHeight > 0) {
                          fillHeight = _this.hiddenScrollBar.fillHeight;
                      }
                      imgContext.rect(0, fixHeight, fillWidth, fillHeight);
                      imgContext.fillStyle = _this.hiddenScrollBar.color;
                      imgContext.fill();
                  }
              }
              // 初始化截图容器
              _this.initScreenShot(undefined, context, _this.screenShotImageController);
              var displaySurface = null;
              var displayLabel = null;
              if (_this.captureStream) {
                  // 获取当前选择的窗口类型
                  displaySurface = (_c = _this.captureStream.getVideoTracks()[0].getSettings()) === null || _c === void 0 ? void 0 : _c.displaySurface;
                  // 获取当前选择的标签页标识
                  displayLabel = _this.captureStream.getVideoTracks()[0].label;
              }
              // 执行截图成功回调
              if (triggerCallback) {
                  triggerCallback({
                      code: 0,
                      msg: "截图加载完成",
                      displaySurface: displaySurface,
                      displayLabel: displayLabel
                  });
              }
              // 停止捕捉屏幕
              _this.stopCapture();
              // 重置光标状态
              document.body.classList.remove("no-cursor");
          }, this.wrcReplyTime);
      };
      // 调整插件容器层级
      ScreenShot.prototype.adjustContainerLevels = function (level) {
          if (this.screenShotContainer == null ||
              this.toolController == null ||
              this.textInputController == null ||
              this.optionIcoController == null ||
              this.optionController == null ||
              this.cutBoxSizeContainer == null ||
              level <= 0) {
              return;
          }
          this.screenShotContainer.style.zIndex = "".concat(level);
          this.toolController.style.zIndex = "".concat(level + 1);
          this.textInputController.style.zIndex = "".concat(level + 1);
          this.optionIcoController.style.zIndex = "".concat(level + 1);
          this.optionController.style.zIndex = "".concat(level + 1);
          this.cutBoxSizeContainer.style.zIndex = "".concat(level + 1);
      };
      // 初始化裁剪框
      ScreenShot.prototype.initCropBox = function (cropBoxInfo) {
          var startX = cropBoxInfo.x;
          var startY = cropBoxInfo.y;
          var width = cropBoxInfo.w;
          var height = cropBoxInfo.h;
          if (this.screenShotContainer == null)
              return;
          this.drawGraphPosition = { startX: startX, startY: startY, width: width, height: height };
          this.data.setCutOutBoxPosition(startX, startY, width, height);
          drawCutOutBox(startX, startY, width, height, this.screenShotCanvas, this.data.getBorderSize(), this.screenShotContainer, this.screenShotImageController);
          // 保存边框节点信息
          this.cutOutBoxBorderArr = saveBorderArrInfo(this.data.getBorderSize(), this.drawGraphPosition);
          // 修改鼠标状态为拖动
          this.screenShotContainer.style.cursor = "move";
          // 显示截图工具栏
          this.data.setToolStatus(true);
          // 显示裁剪框尺寸显示容器
          this.data.setCutBoxSizeStatus(true);
          if (this.toolController != null) {
              // 渲染截图工具栏
              this.showToolBar();
          }
      };
      /**
       * 从窗口数据流中截取页面body内容
       * @param videoWidth 窗口宽度
       * @param videoHeight 窗口高度
       * @param containerWidth body内容宽度
       * @param containerHeight body内容高度
       * @private
       */
      ScreenShot.prototype.getWindowContentData = function (videoWidth, videoHeight, containerWidth, containerHeight) {
          var videoCanvas = document.createElement("canvas");
          videoCanvas.width = videoWidth;
          videoCanvas.height = videoHeight;
          var videoContext = getCanvas2dCtx(videoCanvas, videoWidth, videoHeight);
          if (videoContext) {
              videoContext.drawImage(this.videoController, 0, 0);
              var startX = 0;
              var startY = videoHeight - containerHeight;
              var width = containerWidth;
              var height = videoHeight - startY;
              // 获取裁剪框区域图片信息;
              return videoContext.getImageData(startX * this.dpr, startY * this.dpr, width * this.dpr, height * this.dpr);
          }
          return null;
      };
      // 为指定容器绑定快捷键
      ScreenShot.prototype.registerContainerShortcuts = function (container) {
          var _this = this;
          container.addEventListener("keydown", function (event) {
              if (_this.screenShotCanvas == null)
                  return;
              // command/ctrl + enter 将输入框的文字绘制到画布内
              // 按下ESC时如果有内容则绘制
              if (((event.metaKey || event.ctrlKey) && event.code === "Enter") ||
                  event.code === "Escape") {
                  _this.data.setTextEditState(true);
                  var text = container.innerText;
                  if (!text || text === "") {
                      // 隐藏输入框
                      _this.data.setTextStatus(false);
                      return;
                  }
                  drawText(text, _this.textInputPosition.mouseX, _this.textInputPosition.mouseY, _this.data.getSelectedColor(), _this.data.getFontSize(), _this.screenShotCanvas);
                  // 清空文本输入区域的内容
                  container.innerHTML = "";
                  // 隐藏输入框
                  _this.data.setTextStatus(false);
                  // 保存绘制记录
                  addHistory();
              }
          });
      };
      ScreenShot.prototype.showToolBar = function () {
          if (this.toolController == null || this.screenShotContainer == null)
              return;
          // 计算截图工具栏位置
          var toolLocation = calculateToolLocation(this.drawGraphPosition, this.toolController.offsetWidth, this.screenShotContainer.width / this.dpr, this.placement, this.position);
          var containerHeight = this.screenShotContainer.height / this.dpr;
          // 工具栏的位置超出截图容器时，调整工具栏位置防止超出
          if (toolLocation.mouseY > containerHeight - 64) {
              toolLocation.mouseY -= this.drawGraphPosition.height + 64;
              // 超出屏幕顶部时
              if (toolLocation.mouseY < 0) {
                  var containerHeight_1 = parseInt(this.screenShotContainer.style.height);
                  toolLocation.mouseY = containerHeight_1 - this.fullScreenDiffHeight;
              }
              // 设置工具栏超出状态为true
              this.data.setToolPositionStatus(true);
              // 隐藏裁剪框尺寸显示容器
              this.data.setCutBoxSizeStatus(false);
          }
          // 当前截取的是全屏，则修改工具栏的位置到截图容器最底部，防止超出
          if (this.getFullScreenStatus) {
              var containerHeight_2 = parseInt(this.screenShotContainer.style.height);
              // 重新计算工具栏的x轴位置
              var toolPositionX = (this.drawGraphPosition.width / this.dpr -
                  this.toolController.offsetWidth) /
                  2;
              toolLocation.mouseY = containerHeight_2 - this.fullScreenDiffHeight;
              toolLocation.mouseX = toolPositionX;
          }
          // 显示并设置截图工具栏位置
          this.data.setToolInfo(toolLocation.mouseX + this.position.left, toolLocation.mouseY + this.position.top);
          // 设置裁剪框尺寸显示容器位置
          this.data.setCutBoxSizePosition(this.drawGraphPosition.startX, this.drawGraphPosition.startY - 35);
          // 渲染裁剪框尺寸
          this.data.setCutBoxSize(this.drawGraphPosition.width, this.drawGraphPosition.height);
          // 状态重置
          this.getFullScreenStatus = false;
      };
      ScreenShot.prototype.setGlobalParameter = function () {
          this.screenShotContainer = this.data.getScreenShotContainer();
          this.toolController = this.data.getToolController();
          this.textInputController = this.data.getTextInputController();
          this.optionController = this.data.getOptionController();
          this.optionIcoController = this.data.getOptionIcoController();
          this.cutBoxSizeContainer = this.data.getCutBoxSizeContainer();
      };
      ScreenShot.prototype.setOptionalParameter = function (options) {
          var _a, _b;
          // 单击截取全屏启用状态,默认为false
          if ((options === null || options === void 0 ? void 0 : options.clickCutFullScreen) === true) {
              this.clickCutFullScreen = true;
          }
          // 判断调用者是否传了截图进来
          if ((options === null || options === void 0 ? void 0 : options.imgSrc) != null) {
              this.imgSrc = options.imgSrc;
          }
          // 是否加载跨域图片
          if ((options === null || options === void 0 ? void 0 : options.loadCrossImg) === true) {
              this.loadCrossImg = true;
          }
          // 跨域时的代理服务器地址
          if (options === null || options === void 0 ? void 0 : options.proxyUrl) {
              this.proxyUrl = options.proxyUrl;
          }
          if (options === null || options === void 0 ? void 0 : options.useCORS) {
              this.useCORS = options.useCORS;
          }
          if (options === null || options === void 0 ? void 0 : options.h2cIgnoreElementsCallback) {
              this.h2cIgnoreElementsFn = options.h2cIgnoreElementsCallback;
          }
          // 设置截图容器的位置信息
          if ((options === null || options === void 0 ? void 0 : options.position) != null) {
              if (((_a = options.position) === null || _a === void 0 ? void 0 : _a.top) != null) {
                  this.position.top = options.position.top;
              }
              if (((_b = options.position) === null || _b === void 0 ? void 0 : _b.left) != null) {
                  this.position.left = options.position.left;
              }
          }
          // 截图容器dom
          if (options === null || options === void 0 ? void 0 : options.screenShotDom) {
              this.screenShotDom = options.screenShotDom;
          }
          // webrtc截图等待时间
          if (options === null || options === void 0 ? void 0 : options.wrcReplyTime) {
              this.wrcReplyTime = options.wrcReplyTime;
          }
          // 是否初始化裁剪框
          if (options === null || options === void 0 ? void 0 : options.cropBoxInfo) {
              this.cropBoxInfo = options.cropBoxInfo;
          }
          // 是否需要更改工具栏的展示位置
          if (options === null || options === void 0 ? void 0 : options.toolPosition) {
              this.placement = options.toolPosition;
          }
          // 是否需要对webrtc模式下捕获到的内容进行裁剪
          if (options === null || options === void 0 ? void 0 : options.wrcImgPosition) {
              var _c = options.wrcImgPosition, x = _c.x, y = _c.y;
              // 坐标需要取负数才能正确的裁剪
              this.wrcImgPosition.x = Math.abs(x) * -1;
              this.wrcImgPosition.y = Math.abs(y) * -1;
          }
          // 是否隐藏滚动条
          if ((options === null || options === void 0 ? void 0 : options.hiddenScrollBar) != null) {
              var _d = options.hiddenScrollBar, state = _d.state, color = _d.color, fillWidth = _d.fillWidth, fillHeight = _d.fillHeight, fillState = _d.fillState;
              this.hiddenScrollBar = {
                  state: state,
                  color: color ? color : "#000000",
                  fillWidth: fillWidth ? fillWidth : 0,
                  fillHeight: fillHeight ? fillHeight : 0,
                  fillState: fillState ? fillState : false
              };
              if (state) {
                  this.data.setResetScrollbarState(true);
                  // 设置页面宽高并隐藏滚动条
                  document.documentElement.classList.add("hidden-screen-shot-scroll");
                  document.body.classList.add("hidden-screen-shot-scroll");
              }
          }
          // 是否启用窗口截图模式
          if ((options === null || options === void 0 ? void 0 : options.wrcWindowMode) != null) {
              this.wrcWindowMode = options.wrcWindowMode;
          }
          if ((options === null || options === void 0 ? void 0 : options.customRightClickEvent) != null) {
              this.customRightClickEvent = options.customRightClickEvent;
          }
      };
      /**
       * 操作裁剪框
       * @param currentX 裁剪框当前x轴坐标
       * @param currentY 裁剪框当前y轴坐标
       * @param startX 鼠标x轴坐标
       * @param startY 鼠标y轴坐标
       * @param width 裁剪框宽度
       * @param height 裁剪框高度
       * @param context 需要进行绘制的canvas画布
       * @private
       */
      ScreenShot.prototype.operatingCutOutBox = function (currentX, currentY, startX, startY, width, height, context) {
          // canvas元素不存在
          if (this.screenShotContainer == null) {
              return;
          }
          // 获取鼠标按下时的坐标
          var _a = this.movePosition, moveStartX = _a.moveStartX, moveStartY = _a.moveStartY;
          // 裁剪框边框节点事件存在且裁剪框未进行操作，则对鼠标样式进行修改
          if (this.cutOutBoxBorderArr.length > 0 && !this.data.getDraggingTrim()) {
              // 标识鼠标是否在裁剪框内
              var flag = false;
              // 判断鼠标位置
              context.beginPath();
              for (var i = 0; i < this.cutOutBoxBorderArr.length; i++) {
                  context.rect(this.cutOutBoxBorderArr[i].x, this.cutOutBoxBorderArr[i].y, this.cutOutBoxBorderArr[i].width, this.cutOutBoxBorderArr[i].height);
                  // 当前坐标点处于8个可操作点上，修改鼠标指针样式
                  if (context.isPointInPath(currentX * this.dpr, currentY * this.dpr)) {
                      switch (this.cutOutBoxBorderArr[i].index) {
                          case 1:
                              if (this.data.getToolClickStatus()) {
                                  // 修改截图容器内的鼠标样式
                                  updateContainerMouseStyle(this.screenShotContainer, this.data.getActiveToolName());
                              }
                              else {
                                  this.screenShotContainer.style.cursor = "move";
                              }
                              break;
                          case 2:
                              // 工具栏被点击则不改变指针样式
                              if (this.data.getToolClickStatus())
                                  break;
                              this.screenShotContainer.style.cursor = "ns-resize";
                              break;
                          case 3:
                              if (this.data.getToolClickStatus())
                                  break;
                              this.screenShotContainer.style.cursor = "ew-resize";
                              break;
                          case 4:
                              if (this.data.getToolClickStatus())
                                  break;
                              this.screenShotContainer.style.cursor = "nwse-resize";
                              break;
                          case 5:
                              if (this.data.getToolClickStatus())
                                  break;
                              this.screenShotContainer.style.cursor = "nesw-resize";
                              break;
                      }
                      this.borderOption = this.cutOutBoxBorderArr[i].option;
                      flag = true;
                      break;
                  }
              }
              this.mouseInsideCropBox = flag;
              context.closePath();
              if (!flag) {
                  // 鼠标移出裁剪框重置鼠标样式
                  this.screenShotContainer.style.cursor = "default";
                  // 重置当前操作的边框节点为null
                  this.borderOption = null;
              }
          }
          // 裁剪框正在被操作
          if (this.data.getDraggingTrim()) {
              // 当前操作节点为1时则为移动裁剪框
              if (this.borderOption === 1) {
                  // 计算要移动的x轴坐标
                  var x = fixedData(currentX - (moveStartX - startX), width, this.screenShotContainer.width);
                  // 计算要移动的y轴坐标
                  var y = fixedData(currentY - (moveStartY - startY), height, this.screenShotContainer.height);
                  // 计算画布面积
                  var containerWidth = this.screenShotContainer.width / this.dpr;
                  var containerHeight = this.screenShotContainer.height / this.dpr;
                  // 计算裁剪框在画布上所占的面积
                  var cutOutBoxSizeX = x + width;
                  var cutOutBoxSizeY = y + height;
                  // 超出画布的可视区域，进行位置修正
                  if (cutOutBoxSizeX > containerWidth) {
                      x = containerWidth - width;
                  }
                  if (cutOutBoxSizeY > containerHeight) {
                      y = containerHeight - height;
                  }
                  // 重新绘制裁剪框
                  this.tempGraphPosition = drawCutOutBox(x, y, width, height, context, this.data.getBorderSize(), this.screenShotContainer, this.screenShotImageController);
              }
              else {
                  // 裁剪框其他8个点的拖拽事件
                  var _b = zoomCutOutBoxPosition(currentX, currentY, startX, startY, width, height, this.borderOption), tempStartX = _b.tempStartX, tempStartY = _b.tempStartY, tempWidth = _b.tempWidth, tempHeight = _b.tempHeight;
                  // 绘制裁剪框
                  this.tempGraphPosition = drawCutOutBox(tempStartX, tempStartY, tempWidth, tempHeight, context, this.data.getBorderSize(), this.screenShotContainer, this.screenShotImageController);
              }
          }
      };
      /**
       * 显示最新的画布状态
       * @private
       */
      ScreenShot.prototype.showLastHistory = function () {
          if (this.screenShotCanvas != null) {
              var context = this.screenShotCanvas;
              if (this.data.getHistory().length <= 0) {
                  addHistory();
              }
              context.putImageData(this.data.getHistory()[this.data.getHistory().length - 1]["data"], 0, 0);
          }
      };
      // 为截图容器添加鼠标||触摸的事件监听
      ScreenShot.prototype.setScreenShotContainerEventListener = function () {
          var _a, _b, _c, _d, _e, _f;
          if (isPC()) {
              // 添加鼠标事件监听
              (_a = this.screenShotContainer) === null || _a === void 0 ? void 0 : _a.addEventListener("mousedown", this.mouseDownEvent);
              (_b = this.screenShotContainer) === null || _b === void 0 ? void 0 : _b.addEventListener("mousemove", this.mouseMoveEvent);
              (_c = this.screenShotContainer) === null || _c === void 0 ? void 0 : _c.addEventListener("mouseup", this.mouseUpEvent);
          }
          // 设备不支持触摸事件则退出
          if (!isTouchDevice())
              return;
          // 设置触摸监听
          (_d = this.screenShotContainer) === null || _d === void 0 ? void 0 : _d.addEventListener("touchstart", this.mouseDownEvent, false);
          (_e = this.screenShotContainer) === null || _e === void 0 ? void 0 : _e.addEventListener("touchmove", this.mouseMoveEvent, false);
          (_f = this.screenShotContainer) === null || _f === void 0 ? void 0 : _f.addEventListener("touchend", this.mouseUpEvent, false);
      };
      /**
       * 向截图容器中绘制图片
       * @param triggerCallback
       * @param context
       * @param imgSrc
       * @private
       */
      ScreenShot.prototype.drawPictures = function (triggerCallback, context, imgSrc) {
          var _this = this;
          var imgContainer = new Image();
          imgContainer.src = imgSrc;
          imgContainer.width = this.screenShotImageController.width;
          imgContainer.height = this.screenShotImageController.height;
          imgContainer.crossOrigin = "Anonymous";
          imgContainer.onload = function () {
              var _a;
              // 装载截图的dom为null则退出
              if (_this.screenShotContainer == null)
                  return;
              // 将用户传递的图片绘制到图片容器里
              (_a = _this.screenShotImageController
                  .getContext("2d")) === null || _a === void 0 ? void 0 : _a.drawImage(imgContainer, 0, 0, _this.screenShotImageController.width, _this.screenShotImageController.height);
              // 初始化截图容器
              _this.initScreenShot(triggerCallback, context, _this.screenShotImageController);
          };
      };
      /**
       * 初始化截图容器
       * @param triggerCallback
       * @param context
       * @param screenShotContainer
       * @private
       */
      ScreenShot.prototype.initScreenShot = function (triggerCallback, context, screenShotContainer) {
          if (triggerCallback != null) {
              // 加载成功，执行回调函数
              triggerCallback({ code: 0, msg: "截图加载完成" });
          }
          // 赋值截图区域canvas画布
          this.screenShotCanvas = context;
          // 存储屏幕截图
          this.data.setScreenShotImageController(screenShotContainer);
          // 绘制蒙层
          drawMasking(context, screenShotContainer);
          // 截图容器添加鼠标点击/触摸事件的监听
          this.setScreenShotContainerEventListener();
          // 是否初始化裁剪框
          if (this.cropBoxInfo != null && Object.keys(this.cropBoxInfo).length == 4) {
              this.initCropBox(this.cropBoxInfo);
          }
      };
      // 判断当前工具栏是否为自定义工具栏
      ScreenShot.prototype.isCustomTool = function () {
          var toolId = this.data.getToolId();
          return toolId && toolId > 100;
      };
      return ScreenShot;
  }());

  return ScreenShot;

}));
