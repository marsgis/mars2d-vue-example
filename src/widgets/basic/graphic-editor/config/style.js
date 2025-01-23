const styleConfig = {
  // 点状
  label: {
    name: "文字",
    style: [
      { name: "text", label: "内容", type: "textarea", defval: "文字" },
      { name: "opacity", label: "透明度", type: "slider", defval: 1, min: 0, max: 1, step: 0.01 },

      { name: "color", label: "颜色", type: "color", defval: "#0081c2" },
      { name: "font_size", label: "字体大小", type: "number", defval: 30 },
      {
        name: "font_family",
        label: "字体",
        type: "combobox",
        defval: "黑体",
        data: [
          { label: "黑体", value: "黑体" },
          { label: "宋体", value: "宋体" },
          { label: "楷体", value: "楷体" },
          { label: "微软雅黑", value: "微软雅黑" }
        ]
      },
      {
        name: "font_style",
        label: "是否斜体",
        type: "combobox",
        defval: "normal",
        data: [
          { label: "是", value: "italic" },
          { label: "否", value: "normal" }
        ]
      },
      {
        name: "font_weight",
        label: "是否加粗",
        type: "combobox",
        defval: "normal",
        data: [
          { label: "是", value: "bold" },
          { label: "否", value: "normal" }
        ]
      },
      { name: "background", label: "是否背景", type: "radio", defval: false },
      {
        name: "background_color",
        label: "背景颜色",
        type: "color",
        defval: "#ccc",
        show(style, allStyle, graphicType) {
          return style.background
        }
      },

      { name: "border", label: "是否边框", type: "radio", defval: false },
      {
        name: "border_color",
        label: "边框颜色",
        type: "color",
        defval: "#5928de",
        show(style, allStyle, graphicType) {
          return style.border
        }
      },
      {
        name: "border_width",
        label: "边框宽度",
        type: "number",
        defval: 3,
        show(style, allStyle, graphicType) {
          return style.border
        }
      },
      {
        name: "border_style",
        label: "边框样式",
        type: "combobox",
        defval: "solid",
        data: [
          { label: "实线", value: "solid" },
          { label: "双实线", value: "double" },
          { label: "3D凹槽", value: "groove" },
          { label: "菱形", value: "ridge" },
          { label: "3D凹", value: "inset" },
          { label: "3D凸", value: "outset" }
        ],
        show(style, allStyle, graphicType) {
          return style.border
        }
      },
      {
        name: "horizontalOrigin",
        label: "横向对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "左边", value: 1 },
          { label: "居中", value: 0 },
          { label: "右边", value: -1 }
        ]
      },
      {
        name: "verticalOrigin",
        label: "垂直对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "顶部", value: -1 },
          { label: "居中", value: 0 },
          { label: "底部", value: 1 }
        ]
      },
      { name: "offsetX", label: "横向偏移值", type: "number", defval: 0 },
      { name: "offsetY", label: "垂直偏移值", type: "number", defval: 0 }
    ]
  },
  marker: {
    name: "点标记",
    style: [
      { name: "image", label: "图标", type: "label", defval: "" },
      { name: "opacity", label: "透明度", type: "slider", defval: 1, min: 0, max: 1, step: 0.01 },
      { name: "width", label: "宽度", type: "number", defval: 30 },
      { name: "height", label: "高度", type: "number", defval: 30 },

      {
        name: "horizontalOrigin",
        label: "横向对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "左边", value: 1 },
          { label: "居中", value: 0 },
          { label: "右边", value: -1 }
        ]
      },
      {
        name: "verticalOrigin",
        label: "垂直对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "顶部", value: -1 },
          { label: "居中", value: 0 },
          { label: "底部", value: 1 }
        ]
      },
      { name: "offsetX", label: "横向偏移值", type: "number", defval: 0 },
      { name: "offsetY", label: "垂直偏移值", type: "number", defval: 0 },
      { name: "rotationAngle", label: "旋转角度", type: "slider", defval: 0, min: 0, max: 360, step: 1 }
    ]
  },
  divGraphic: {
    name: "DIV点",
    style: [
      { name: "opacity", label: "透明度", type: "slider", defval: 1, min: 0, max: 1, step: 0.01 },
      {
        name: "horizontalOrigin",
        label: "横向对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "左边", value: 1 },
          { label: "居中", value: 0 },
          { label: "右边", value: -1 }
        ]
      },
      {
        name: "verticalOrigin",
        label: "垂直对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "顶部", value: -1 },
          { label: "居中", value: 0 },
          { label: "底部", value: 1 }
        ]
      },
      { name: "offsetX", label: "横向偏移值", type: "number", defval: 0 },
      { name: "offsetY", label: "垂直偏移值", type: "number", defval: 0 }
    ]
  },
  fontGraphic: {
    name: "字体图标点",
    style: [
      { name: "opacity", label: "透明度", type: "slider", defval: 1, min: 0, max: 1, step: 0.01 },

      { name: "size", label: "大小", type: "number", defval: 50 },
      { name: "color", label: "颜色", type: "color", defval: "#000000" },
      { name: "iconClass", label: "字体class", type: "hidden", defval: "fa fa-crosshairs" },
      {
        name: "horizontalOrigin",
        label: "横向对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "左边", value: 1 },
          { label: "居中", value: 0 },
          { label: "右边", value: -1 }
        ]
      },
      {
        name: "verticalOrigin",
        label: "垂直对齐",
        type: "combobox",
        defval: 0,
        data: [
          { label: "顶部", value: -1 },
          { label: "居中", value: 0 },
          { label: "底部", value: 1 }
        ]
      }
    ]
  },
  point: {
    name: "点",
    style: [
      { name: "pixelSize", label: "大小", type: "number", defval: 6 },
      { name: "color", label: "颜色", type: "color", defval: "#3388ff" },
      { name: "outline", label: "是否边框", type: "radio", defval: false },
      {
        name: "outlineColor",
        label: "边框颜色",
        type: "color",
        defval: "#3388ff",
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "outlineWidth",
        label: "边框宽度",
        type: "number",
        defval: 2,
        show(style, allStyle, graphicType) {
          return style.outline
        }
      }
    ]
  },
  polyline: {
    name: "线",
    extends: ["brushLine"],
    style: [
      { name: "color", label: "颜色", type: "color", defval: "#3388ff" },
      { name: "width", label: "线宽", type: "number", defval: 3 },
      {
        name: "dashArray",
        label: "线型",
        type: "combobox",
        defval: "",
        data: [
          { label: "实线", value: "" },
          { label: "虚线", value: "5, 10" },
          { label: "虚点线", value: "1, 5" },
          { label: "点画线1", value: "5, 5, 1, 5" },
          { label: "点画线2", value: "15, 10, 5, 10" }
        ]
      },
      {
        name: "dashSpeed",
        label: "虚线速度",
        type: "number",
        defval: 0,
        show(style, allStyle, graphicType) {
          return style.dashArray
        }
      },
      { name: "offset", label: "平行偏移", type: "number", defval: 0 }
    ]
  },
  polygon: {
    name: "面",
    extends: [
      "straightArrow",
      "fineArrow",
      "fineArrowYW",
      "attackArrow",
      "attackArrowPW",
      "doubleArrow",
      "closeVurve",
      "gatheringPlace",
      "attackArrowYW"
    ],
    style: [
      { name: "fill", label: "是否填充", type: "radio", defval: true },

      {
        name: "fillColor",
        label: "填充颜色",
        type: "color",
        defval: "#3388ff",
        show(style, allStyle, graphicType) {
          return style.fill && !style.image
        }
      },
      {
        name: "image",
        label: "图片",
        type: "label",
        defval: "",
        show(style, allStyle, graphicType) {
          return style.fill && style.image
        }
      },

      { name: "outline", label: "是否边框", type: "radio", defval: true },
      {
        name: "outlineColor",
        label: "边框颜色",
        type: "color",
        defval: "#3388ff",
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "outlineWidth",
        label: "边框宽度",
        type: "number",
        defval: 2,
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "dashArray",
        label: "线型",
        type: "combobox",
        defval: "",
        data: [
          { label: "实线", value: "" },
          { label: "虚线", value: "5, 10" },
          { label: "虚点线", value: "1, 5" },
          { label: "点画线1", value: "5, 5, 1, 5" },
          { label: "点画线2", value: "15, 10, 5, 10" }
        ],
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "dashSpeed",
        label: "虚线速度",
        type: "number",
        defval: 0,
        show(style, allStyle, graphicType) {
          return style.dashArray
        }
      }
    ]
  },
  rectangle: {
    name: "矩形",
    style: [
      { name: "fill", label: "是否填充", type: "radio", defval: true },
      {
        name: "fillColor",
        label: "填充颜色",
        type: "color",
        defval: "#3388ff",
        show(style, allStyle, graphicType) {
          return style.fill
        }
      },

      { name: "outline", label: "是否边框", type: "radio", defval: true },
      {
        name: "outlineColor",
        label: "边框颜色",
        type: "color",
        defval: "#3388ff",
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "outlineWidth",
        label: "边框宽度",
        type: "number",
        defval: 2,
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "dashArray",
        label: "线型",
        type: "combobox",
        defval: "",
        data: [
          { label: "实线", value: "" },
          { label: "虚线", value: "5, 10" },
          { label: "虚点线", value: "1, 5" },
          { label: "点画线1", value: "5, 5, 1, 5" },
          { label: "点画线2", value: "15, 10, 5, 10" }
        ]
      },
      {
        name: "dashSpeed",
        label: "虚线速度",
        type: "number",
        defval: 0,
        show(style, allStyle, graphicType) {
          return style.dashArray
        }
      }
    ]
  },
  circle: {
    name: "圆",
    style: [
      { name: "radius", label: "半径", type: "number", defval: 0 },

      { name: "fill", label: "是否填充", type: "radio", defval: true },
      {
        name: "fillColor",
        label: "填充颜色",
        type: "color",
        defval: "#3388ff",
        show(style, allStyle, graphicType) {
          return style.fill
        }
      },

      { name: "outline", label: "是否边框", type: "radio", defval: true },
      {
        name: "outlineColor",
        label: "边框颜色",
        type: "color",
        defval: "#3388ff",
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "outlineWidth",
        label: "边框宽度",
        type: "number",
        defval: 2,
        show(style, allStyle, graphicType) {
          return style.outline
        }
      },
      {
        name: "dashArray",
        label: "线型",
        type: "combobox",
        defval: "",
        data: [
          { label: "实线", value: "" },
          { label: "虚线", value: "5, 10" },
          { label: "虚点线", value: "1, 5" },
          { label: "点画线1", value: "5, 5, 1, 5" },
          { label: "点画线2", value: "15, 10, 5, 10" }
        ]
      },
      {
        name: "dashSpeed",
        label: "虚线速度",
        type: "number",
        defval: 0,
        show(style, allStyle, graphicType) {
          return style.dashArray
        }
      },

      { name: "startAngle", label: "开始角度", type: "number", defval: 0 },
      { name: "stopAngle", label: "结束角度", type: "number", defval: 360 }
    ]
  },
  image: {
    name: "图片",
    style: [
      { name: "url", label: "路径", type: "label", defval: "" },
      { name: "opacity", label: "透明度", type: "slider", defval: 1, min: 0, max: 1, step: 0.01 }
    ]
  }
}

// 部分矢量对应与其他基本类型完全相同配置时，复制配置
for (const key in styleConfig) {
  styleConfig[key].type = key // 标识类型

  if (styleConfig[key].extends) {
    styleConfig[key].extends.forEach((element) => {
      styleConfig[element] = styleConfig[key]
    })
  }
}

// window.styleConfig = styleConfig
export default styleConfig
