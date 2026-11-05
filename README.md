<p align="center">
<img src="http://mars2d.cn/logo.png" width="300px" />
</p>

<p align="center">基于 Vue3.x 的 Mars2D🌎功能示例项目 </p>


<p align="center">
<a target="_black" href="https://github.com/marsgis/mars2d">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars2d?style=flat&logo=github">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars2d">
<img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars2d?style=flat&logo=npm">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars2d">
<img alt="Npm version" src="https://img.shields.io/npm/v/mars2d.svg?style=flat&logo=npm&label=version"/>
</a>
</p>


## 项目介绍

这是一个基于 Vue3.0 开发的 Mars2D 功能示例演示项目，面向 Mars2D 平台的使用者与学习者：以「示例列表 → 打开示例 → 阅读/编辑源码 → 实时运行」为核心闭环，用 185 个独立示例演示 Mars2D 二维地图平台的各功能点（地图创建、控件、瓦片图层、矢量图层、矢量数据、空间分析等）。

 > 如果您不熟悉Vue，对原生JS比较熟悉，可以阅读：
 [功能示例原生JS版教程](http://mars2d.cn/docs/guide/example-es5/) 、
 [mars2d-es5-example代码](https://gitee.com/marsgis/mars2d-es5-example)


## 项目特性
- **最新技术栈**：使用 Vue3 / Vite 4 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **示例即文档**：每个功能点对应一个可运行、可编辑的独立示例，地图业务与 UI 面板解耦



## 视频讲解
建议先看一遍视频讲解，再实际操作，您可以[新页面查看高清视频](https://www.bilibili.com/video/BV1pb4y1W7NG/)



## 技术栈与版本

| 分类 | 技术 | 声明版本（package.json） | 实装版本 |
|---|---|---|---|
| 框架 | Vue | ^3.4.15 | 3.4.19 |
| 构建 | Vite | ^4.5.2 | 4.5.2 |
| 语言 | TypeScript | ~5.2.2 | 5.2.2 |
| UI 库 | ant-design-vue | ^4.1.2 | 4.1.2 |
| UI 封装 | 项目内置 mars-ui（src/components/mars-ui） | 随项目 | — |
| 图标 | @icon-park/svg | ^1.4.2 | — |
| 地图 | mars2d | ^3.3.4 | 3.3.4 |
| 地图底层 | Leaflet（mars2d 传递依赖） | — | 1.9.4 |
| 状态管理 | vuex | ^4.1.0 | 4.1.0 |
| 请求 | axios | ^1.6.7 | 1.6.7 |
| 代码编辑器 | monaco-editor / @marsgis/editor | ^0.52.2 / ^1.5.2 | 0.52.2 / 1.5.2 |
| 图表 | echarts | ^5.5.0 | 5.5.0 |

其他依赖：dayjs、lodash、localforage、uuid、split.js、vue-color-kit、nprogress、core-js。

环境要求（package.json#engines）：

- Node >= 18.0.0
- npm >= 9.0.0
- 包管理器：npm（仓库锁文件为 package-lock.json）

说明：示例运行时加载的 mars2d/leaflet 等地图库来自 `public/lib/`（script 标签方式，见「地图初始化与销毁链路」），npm 中的 mars2d 包用于类型与构建期依赖。



## 目录结构与职责

```
mars2d-vue-example
├── build               自定义构建插件（vite-example-plugin：示例代码的编译期转换）
├── docs                工程过程记录与决策清单（a* 过程记录 / b* 待确认结论）
├── public              无需编译构建的静态资源【重要】
│   ├── config          项目和功能的配置文件（config.json 地图初始配置、example.json 示例清单、thumbnail 缩略图）
│   ├── font            字体（HarmonyOS Sans SC）
│   ├── img             图片资源
│   ├── lib             示例依赖资源（leaflet、mars2d、echarts、turf 等 + includeLibs.js 依赖清单）
│   └── temp            示例的公共基础代码（iframe 模板 template.html、common.js、公共 css）
├── src                 主要项目代码
│   ├── components      vue组件代码【重要】（mars-ui 组件库、mars-work 示例框架组件）
│   ├── example         示例代码【重要】（每个示例一个目录：map.js + 可选 index.vue）
│   ├── misc            ts 模块定义与 window 全局类型声明
│   ├── pages           页面入口（index 列表页 / editor 编辑器页 / read 阅读页）
│   ├── utils           工具方法（mars-util、map-work）
│   └── widgets         公共 widget 与状态管理（示例页内置面板：POI查询、底图管理、图层管理等）
├── eslint.config.mjs   eslint配置文件（flat config）
├── index.html          列表页入口
├── editor-vue.html     编辑器页面入口
├── read-vue.html       阅读页入口
├── package.json        项目配置信息
├── tsconfig.json       TypeScript 配置
└── vite.config.mts     vite 配置文件
```

与示例相关的3个主要目录是：`src\example`、`public`、`src\components`(部分功能依赖)。

不要随意改动的部分：

- `src/example/**/map.js`：文件名固定，是示例框架的约定入口，不可改名
- `public/temp/`：示例 iframe 的公共基础代码（模板、common.js），所有示例共用
- `public/lib/includeLibs.js`：第三方库加载清单，示例依赖按此配置加载
- `build/vite-example-plugin.mts`：负责示例代码的编译期转换（map.js 与面板的桥接），改动会影响全部示例的运行

### 示例主目录

- 位置 src/example
- 项目中的每一个示例对应了本目录下的一个 map.js 文件，如果包含 ui 面板，需要创建一个 index.vue
- 一些情况下可以将 example 视为 public 下的一个目录
- 顶层分类目录：map（创建/管理）、control（控件）、graphic（矢量要素）、layer-graphic（矢量图层）、layer-tile（瓦片图层）、layer-other（其他图层）、query（查询）、thing（专题应用）、turf（空间分析）、a-test（测试）


### 依赖资源

配置的依赖会在html中按配置顺序加载，注意配置时依赖之间的先后顺序。

1. libs 依赖，公共的通用依赖，统一放在`public/lib/`目录下，并由includeLibs.js统一配置。 libs中通常会是一些开源的 js 库，如果示例只依赖 mars2d 相关资源，可省略libs字段。

```json
{
  "name": "天地图地形",
  "main": "terrain/terrainTDT",
  "hasPannel": true,
  "libs": ["mars2d", "mars2d-esri"],
  "thumbnail": "b10_terrain_tdt.jpg"
}
```

> 通过 includeLibs.js 中的 isLocal 变量，手动控制使用本地资源，还是 CDN 资源

2. resources 依赖，一些个性化的资源,在开发过程中提取封装的文件的依赖资源，比如只是单个示例本身使用的一些js、css文件。

```json
{
  "name": "POI兴趣点搜索(Leaflet原生)",
  "main": "control/leaflet/geocoder",
  "resources": ["leafletControl.css"],
  "thumbnail": "d10_geocoder.jpg"
}
```
同级目录下只需要配置文件名，不在同级目录的 需配置打包后文件位置的绝对路径如 `/example/graphic/apply/typhoon/Typhoon.js`



## 启动与构建

### 下载代码
- [Github](https://github.com/marsgis/mars2d-vue-example)

```
git clone git@github.com:marsgis/mars2d-vue-example.git
```

- [Gitee](https://gitee.com/marsgis/mars2d-vue-example)：国内码云，下载速度快些。

```
git clone git@gitee.com:marsgis/mars2d-vue-example.git
```

### 运行环境

- Node >= 18.0.0，npm >= 9.0.0（package.json#engines）
- 推荐使用 vscode，安装参考[开发环境搭建教程](/guide/start/env.html)
- 安装 vscode 插件，推荐安装 volar（并禁用 vetur）、ESlint 、 Prettier
- 配置 vscode 参数， setting.json相关配置
```json
{
  "eslint.format.enable": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

- 下载最新lib
建议从[http://mars2d.cn/download.html](http://mars2d.cn/download.html)下载最新mars2d类库后覆盖至`public/lib/`目录下，更新mars2d为最新版本。


### 启动前置条件

- 已安装满足 engines 要求的 Node 与 npm
- 已执行依赖安装
- 地图底图服务可访问（默认使用天地图等在线底图，离线环境处理见「开发中常见问题」）

### 运行命令

命令均来自 package.json#scripts，原样使用：

| 命令 | 作用 |
|---|---|
| `npm install` | 安装依赖 |
| `npm run serve` | 启动开发服务（vite --host） |
| `npm run dev` | 启动开发服务（vite） |
| `npm run build` | 构建（先跑 lint 再 vite build） |
| `npm run build2` | 大内存模式构建（node --max_old_space_size） |
| `npm run preview` | 预览构建产物（vite preview） |
| `npm run serve:dist` | 用 http-server 伺服 dist 目录 |
| `npm run lint` | 类型检查（vue-tsc）+ 公共层严格类型检查 + ESLint |
| `npm run lint:strict` | 仅公共层（`components`/`widgets`/`utils`/`misc`/`pages`）的 `strict` 类型检查 |
| `npm run lint:fix` | 类型检查 + ESLint 自动修复 |
| `npm run eslint` | 仅 ESLint 检查（不带 --fix） |
| `npm run test:unit` | 运行 `tests/unit` 单元测试（Vitest） |
| `npm run test:watch` | 监听模式运行单元测试 |
| `npm run test:coverage` | 运行单元测试并输出覆盖率报告（`coverage/`） |
| `npm run clean-cache` | 清理 node_modules 缓存 |
| `npm run clean-lib` | 删除 node_modules |

开发服务地址：`http://localhost:2001`（vite.config.mts 中 server.host=localhost、port=2001）。

#### 首次运行前安装依赖
```
npm install

//或使用代理
npm i --registry=http://registry.taobao.org
```

#### 启动开发环境
```
npm run serve
```

#### 编译构建
```
npm run build
```


### 环境变量清单

环境变量定义在 .env / .env.development / .env.production，经 vite 的 define 注入到 `process.env`：

| 名称 | 作用 | .env | .env.development | .env.production | 是否必填 |
|---|---|---|---|---|---|
| VITE_BASE_URL | 部署 base 目录（同时作为构建输出子目录） | / | / | / | 必填 |
| VITE_EXAMPLE_SOURCE_PATH | 示例源码目录位置（编辑器定位源码用） | 空 | src/example | example | 必填 |
| VITE_EDITOR_MODE | 示例列表页跳转目标：1 跳编辑器页，0 跳阅读页 | 1 | 0 | 1 | 必填 |

代理配置：无（vite.config.mts 未配置 server.proxy）。


### 运行效果
 [在线体验](http://mars2d.cn/example.html)

 ![image](http://marsgis.cn/img/project/mars2d-doc/example1.jpg)



## 路由与页面清单

项目不使用 vue-router，采用多 HTML 入口 + URL 查询参数的方式组织页面：

| 路径 | 组件 | 作用 | 需登录 | 需地图 | 备注 |
|---|---|---|---|---|---|
| /（index.html） | src/pages/index/App.vue | 示例列表页：分组浏览、搜索、下载功能清单 | 否 | 否 | 点击示例卡片新窗口打开示例页 |
| /editor-vue.html?id=示例路径 | src/pages/editor/App.vue | 示例编辑器页：左侧源码编辑、右侧实时运行 | 否 | 是 | id 为 src/example 下相对路径；可带 key、code、full 参数 |
| /read-vue.html?id=示例路径 | src/pages/read/App.vue | 示例阅读页：只读运行示例 | 否 | 是 | 列表页在 VITE_EDITOR_MODE=0 时跳转到此 |

示例清单数据源：`public/config/example.json`，共 8 个顶层分组（快速开始、二维场景、控件、瓦片图层、矢量图层、矢量数据、空间分析、其他图层），185 个示例条目。

示例访问示例：`http://localhost:2001/editor-vue.html?id=map/sample`



## 公共能力

### 组件

- `src/components/mars-ui`：项目内置 UI 组件库，基于 ant-design-vue 二次封装，统一深色/浅色主题下的外观。
  - 容器与表单：mars-dialog（浮动面板）、mars-gui（属性表单）、mars-table、mars-tree、mars-select、mars-input、mars-input-number、mars-input-group、mars-textarea、mars-date-picker、mars-range-picker、mars-slider、mars-switch、mars-button、mars-dropdown、mars-color、mars-color-picker、mars-icon
  - 命令式提示：$message、$alert、$notify、$showLoading / $hideLoading（mars-ui/index.ts 统一导出并挂载到 window）
  - 图表封装：mars-echarts
  - 安装方式：`MarsUIInstall(app, config)`（mars-ui/index.ts 默认导出），同时注册所需的 ant-design-vue 组件
- `src/components/mars-work`：示例框架组件。
  - example-list.vue：列表页主体（分组导航、搜索、示例卡片）
  - mars-head.vue：列表页顶部导航
  - main-operation.vue：编辑器/阅读页的面板入口，按 URL 中的示例 id 动态加载 `src/example/{id}/index.vue`

### widget 体系（示例页内置面板）

- `src/widgets/widget-store.ts`：widget 注册表，内置 5 个：query-poi（POI 查询）、manage-basemap（底图管理）、manage-layers（图层管理）、graphic-editor（要素编辑）、tools-button（工具按钮，默认开启）
- `src/widgets/common/store/widget.ts`：基于 vuex 的 widget 状态管理，提供 `injectState`（创建 store）、`useWidget` / `useWidgetStore`（激活/关闭/互斥/传参）
- `src/widgets/common/uses/use-lifecycle.ts`：`useLifecycle(mapWork)`，把 Vue 组件生命周期桥接到业务模块 map.ts 的 onMounted / onUnmounted
- `src/widgets/widget.vue`：widget 渲染容器（按注册表异步加载组件）
- 每个 widget 目录含 index.vue（UI）与 map.ts（地图业务），遵循与示例相同的 UI/地图分离原则

### 工具函数

- `src/utils/mars-util.ts`：getQueryString（URL 参数）、getExampleId（解析示例 id）、isLonLat、setAutoHeight（返回清理函数）、isPc
- `src/utils/map-work.ts`：面板与 map.js 业务的就绪桥接。getMapWork（取 window.mapWork）、isMapWorkReady、markMapWorkReady（框架侧标记就绪）、onMapWorkReady（面板侧等待就绪，支持探测兜底）

### 接口模块与状态模块

- 无统一的接口封装模块，见「数据流与接口约定」
- 状态管理仅 vuex 一份 widget store（上述 widget 体系），无其他全局 store



## 数据流与接口约定

- 请求实例位置：无统一请求实例。axios 仅在个别示例中直接引用（src/example/query/poi/index.vue、src/example/map/create/ui/index.vue、src/example/graphic/apply/typhoon/index.vue）
- baseURL 来源：无统一配置；示例内按各自数据源使用完整 URL（如 `//data.mars3d.cn/file/...`）
- 地图配置加载：不走 axios，使用 `mars2d.Util.fetchJson` 读取 `config/config.json`（public/temp/js/common.js）
- 鉴权：无（纯示例项目，不涉及登录态）
- 拦截器 / 错误处理：无统一拦截器；各示例自行处理请求异常；config.json 加载失败时通过 globalAlert 弹窗提示（common.js）
- 超时与取消：无统一配置
- mock：无
- 全局提示方法：map.js 内可直接使用预加载的 globalMsg / globalAlert / globalNotify / showLoading / hideLoading（由 public/temp/js/common.js 桥接到父窗口的 $message 等）



## 地图初始化与销毁链路

示例的地图运行在 iframe 中（与编辑器/面板所在的主页面隔离），整体链路：

1. **入口加载**：editor-vue.html / read-vue.html 先加载 `/lib/includeLibs.js`（注册 `window.configLibs` 第三方库清单），再加载 `src/pages/editor|read/main.ts`
2. **编辑器实例**：main.ts 中 `new MarsgisEditor(...)`（@marsgis/editor），传入示例清单地址 `config/example.json`、库路径等；监听其 `loaded` 事件后创建并挂载 Vue 面板应用（含 widget store）
3. **示例资源注入**：编辑器框架按 example.json 中该示例的 libs / resources 配置，在 iframe（public/temp/template.html）中按顺序加载依赖，再加载示例的 map.js
4. **地图构造**：iframe 内 public/temp/js/common.js 的 init() 先用 `mars2d.Util.fetchJson` 读取 `config/config.json`，然后调用 map.js 定义的 `initMap(options)`（未定义时用内置 globalInitMap），`new mars2d.Map("mars2dContainer", options)` 构造地图
5. **对象绑定**：构造完成后 `window._mapInstance`（地图实例）与 `window.mapWork`（map.js 所在 iframe 的 window，map.js 内所有导出都在其上）挂到父窗口
6. **业务初始化**：面板挂载后，main-operation.vue 向上发出 childMounted → 页面 App.vue 调用 `window.marsEditor.useLifecycle()` 触发 map.js 的 `onMounted(map)`；随后 `markMapWorkReady()` 通知所有通过 `onMapWorkReady` 等待的面板组件
7. **面板访问地图**：index.vue 中通过 `window.mapWork` 访问 map.js 定义的对象；访问 onMounted 中才创建的对象（如图层）时必须用 `onMapWorkReady` 等待就绪
8. **反向通信**：map.js 通过 `eventTarget.fire(...)`（mars2d.BaseClass 事件）抛事件给 index.vue 监听
9. **销毁时机**：
   - 切换示例：编辑器框架重建 iframe；主页面侧在 `loaded` 事件中先 `destoryUI()` 卸载旧 Vue 应用再重建
   - widget：`useLifecycle` 在组件 onBeforeUnmount 时调用 map.ts 的 `onUnmounted`，负责移除该业务注册的图层与事件
   - App.vue 以 `initedMapWork` 标记保证同一次地图业务只执行一次 onMounted，防止重复初始化

职责约定：

- 涉及地图业务的操作均写在 map.js 中；涉及 UI 层面、和地图无关的操作均写在 index.vue 中，vue 中不得使用 mars2d 和 L 开头的类
- 删除 index.vue 时 map.js 需正常运行；删除 map.js 时 index.vue 需正常展示 UI（除 mapWork 相关操作无响应外）



## 样式与设计规范

### 样式入口

- 各页面 main.ts 导入 `@mars/components/mars-ui/common`：设置 `document.documentElement.dataset.theme = "light"`
- mars-ui/index.ts 汇总导入：index.less（组件公共样式）、function.less、themes（dark/light 两套主题）
- base.less 是全局基础样式（ant-design-vue 二次主题化、popup 样式、滚动条样式），会自动注入到每个 less 文件之前

### CSS 变量

- 变量文件：`src/components/mars-ui/themes/light/index.less` 与 `themes/dark/index.less`，分别挂在 `:root[data-theme="light"]` / `:root[data-theme="dark"]`
- 命名约定：`--mars-` 前缀，按类别分段：
  - 字体：`--mars-font-family`（"HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif）、`--mars-font-size-xs/sm/md/lg/xl`（12/13/14/16/20px）、`--mars-font-weight-regular/medium`、`--mars-line-height`
  - 圆角：`--mars-radius-xs/sm/md/lg`（2/4/6/10px）
  - 间距：`--mars-space-xs/sm/md/lg/xl`（4/8/12/16/24px）
  - 颜色：`--mars-primary-color`、`--mars-text-color`、`--mars-control-bg/border/text`、`--mars-table-*`、`--mars-dropdown-bg` 等
  - 尺寸与动效：`--mars-control-height`（32px）、`--mars-dialog-header-height`（44px）、`--mars-transition-fast`
- 新增样式变量须先进入上述主题变量文件（light/dark 两份同步），再在组件中使用，不写魔法值

### UI 库主题定制

- ant-design-vue 组件的主题覆盖集中在 base.less 的 `.mars-main-view` 作用域内（collapse、form、table、checkbox、radio、cascader、pagination、tabs 等）
- ant-design-vue 样式按需引入（构建期自动解析各组件样式文件）

### 断点与布局

- 示例编辑/阅读页为 PC 端固定全屏布局，无断点适配
- 列表页有局部响应式处理（@media 断点：720 / 770 / 992 / 1080 / 1150 / 1280 / 1400px，见 example-list.vue 与 mars-head.vue）

### 字体

- 全站字体：HarmonyOS Sans SC，字体文件位于 public/font/HarmonyOS_Sans_SC/，在 index.html 以 @font-face 声明



## 单个示例的内部结构

每个示例都是一个单独的文件夹，均放在`src\example`示例目录下的子目录，因为示例众多，建议多级目录来管理。

### 示例相关文件
示例目录下，一般有2个文件（地图业务与UI解耦）：

- map.js文件：涉及地图业务的操作均写在 map.js 中；

- index.vue 文件：是一个Vue组件面板，涉及 UI 层面、和地图无关的操作均写在 index.vue 中；


### 内部构流程图
示例的内部构造处理流程图：

![image](http://mars2d.cn/dev/img/guide/example-vue-one.jpg)



## 添加新的示例

下面我们以`src\example\map\sample\`为示例说明。

### 1. 配置文件 example.json 中修改配置

在 `public/config/example.json` 中加上对应的配置项，这样就能在示例列表页面看到对应的示例卡片。

```json
{
  "name": "示例名称",
  "main": "map/sample", //示例的相对路径
  "hasPannel": true, // 可选参数，表示是否存在ui面板，默认false
  "libs": [], // 通用依赖项，可选参数 默认 ["mars2d"]
  "resources": ["leafletControl.css"], // 个性化依赖项, 可选参数，默认 []
  "thumbnail": "thumbnail.jpg" // 缩略图可选, 默认为 thumbnail.jpg
}
```
> 注：上述配置`main`为`src\example`下的相对路径

### 2. 新建示例对应目录

在`src\example`示例目录下新建对应示例的子目录，因为示例众多，建议多级目录来管理，当前我们新建了`src\example\map\sample\`目录。


### 3. 新建 map.js 地图业务文件

在目录下新建`map.js`（文件名固定不可修改）主入口文件 map.js 主要用于处理地图相关业务。
在文件中必须加上 initMap 方法来初始化地图和相关业务,比如：

最简结构如下
```js
var map
// 事件对象，用于抛出事件给vue
var eventTarget = new mars2d.BaseClass()

// 构造地图主方法【必须】
function initMap(options) {
  // 创建二维地图场景
  map = new mars2d.Map("mars2dContainer", options)
}
```

> 在 map.js 中 存在以下全局方法, 并且已预先加载了 mars2d 相关依赖

```js
globalMsg(msg, type, ...args) // message
globalAlert(msg, title, ...args) // alert
globalNotify(msg, disc, ...args) // notify
showLoading(type) // 显示loading
hideLoading(type) // 关闭loading
```

完成后我们即可访问 [http://localhost:2001/editor-vue.html?id=map/sample](http://localhost:2001/editor-vue.html?id=map/sample)来查看示例的效果。


### 4. (按需可选)配置其他依赖资源

 按示例本身需要来配置libs和resources依赖。


### 5.  (按需可选)新建`index.vue`业务窗口面板

在目录下新增`index.vue`文件，该文件主要是用于 UI 面板相关的业务代码。
创建控件 Vue 面板，可以参考已有示例加上相关业务面板。

同时在example.json中的对应示例增加配置`hasPannel:true`

最简模板如下:
```html
<template>
  <mars-dialog> </mars-dialog>
</template>
<script lang="ts" setup>
</script>
<style scoped lang="less"></style>
```


#### 5.1. `index.vue`面板操作`map.js`内地图相关对象时。

需要在 vue 中加上下面代码进行访问

index.vue 文件中：
```js
// mapWork是map.js内定义的所有对象,目前在示例框架中做好了封装传递过来的。
const mapWork = window.mapWork

// 滑动条修改事件
const onSliderChange = () => {
  mapWork.updateBrightness(formState.brightness)
}
```

map.js 文件中：
```js
// map.js中
function updateBrightness(val) {
  bloomEffect.brightness = val
}
```

> ⚠️ 生命周期注意：`map.js` 的 `onMounted` 与 `index.vue` 的 `onMounted` 之间没有固定先后顺序
> （框架调用 `useLifecycle()` 的时机与面板挂载时机并不绑定）。如果面板要访问 `onMounted` 里才创建的对象
> （如 `graphicLayer`），请用 `onMapWorkReady` 等待地图业务就绪，否则会出现
> 访问 `window.mapWork` 上未定义属性的报错。

index.vue 文件中：
```js
import { onMapWorkReady } from "@mars/utils/map-work"

onMounted(() => {
  // 无论 map.js 的 onMounted 先执行还是后执行，回调都只会在图层等对象创建完成后执行一次
  offMapWorkReady = onMapWorkReady(() => {
    mapWork.graphicLayer.flyTo()
  })
})

onBeforeUnmount(() => {
  offMapWorkReady && offMapWorkReady()
})
```

#### 5.2. `map.js`地图业务中需要操作`index.vue`面板时。

map.js 文件中：
```js
// 抛出事件
var eventTarget = new mars2d.BaseClass()

//完成操作或取到相关数据后
eventTarget.fire("loadOk", { 需要传递到vue中使用的对象 })
```

index.vue 文件中：

```js
// 取到js中的数据
mapWork.eventTarget.on("loadOk", function (event: any) {})
```

#### 5.3. `map.js`和`index.vue`各自代码业务分离的原则

原则：

- 涉及地图业务的操作均写在 map.js 中
- 涉及 UI 层面、和地图无关的操作均写在 index.vue 中,vue 中不得使用 mars2d 和 L 开头的类


**如何区分？**

- 删除 index.vue 时不影响地图本身业务，map.js 需要正常运行 ！！！
- 删除 map.js 时，index.vue 需要正常展示 UI(除 mapWork 相关操作无响应外) ！！！



## 阅读示例源码和调试学习
 示例的目的是演示平台的每个功能点，可以按需求或兴趣去学习每一个示例，
- （1）学习中可以查询相关类的API文档
- （2）尝试修改源码中参数、方法等，来体验不同的呈现效果。




## 开发中常见问题

### 1. 局域网离线使用时注意事项
 平台所有代码层面来说支持离线运行和使用的，但需要注意的是离线时的地图服务的相关处理。

 如果局域网内有相关地形、卫星底图服务可以按内网服务类型和URL地址替换下`config.json`或`构造Map的代码中`的默认地形和底图。

 如果局域网内没有相关服务，可以按下面处理：
- 修改config.json中`terrain`配置中，将已有的`"show": true`配置，改为`"show": false`
- 修改config.json中`basemaps`数组配置中，将已有的`"show": true`的图层，将该值改为`"show": false` ，并将单张图片或离线地图加上`"show": true`，并修改相关URL地址。
- 您也可以参考教程[发布地图数据服务](/guide/data/server.html)进行部署离线地图服务，里面也有一些示例离线数据。


### 2. src\example\中增加的资源访问 404

因为新增静态资源涉及拷贝，需要重启服务 `npm run serve`



## 如何反馈问题？
- 发现您发现项目中存在的问题或者需要优化的地方；
- 如果您有一些自己全新编写的示例，希望也开源与大家分享。

提交方式：
- 欢迎在github或gitee上[提交PR](https://github.com/marsgis/mars2d-vue-example/pulls)
- 如果对git不熟悉，也可以整理示例代码发送邮件到 wh@marsgis.cn 由我们来整理集成。




## Mars2D 是什么
  `Mars2D平台` 是一款免费的二维地图客户端开发平台，基于[Leaflet](http://leafletjs.com/)优化提升与B/S架构设计，支持多行业扩展的轻量级高效能GIS开发平台，提供了全新的大数据可视化、实时流数据可视化功能，通过本平台可快速实现浏览器和移动端上美观、流畅的地图呈现与空间分析，完成平台在不同行业的灵活应用。


### 相关网站
- Mars2D官网：[http://mars2d.cn](http://mars2d.cn)

- Mars2D开源项目列表：[https://github.com/marsgis/mars2d](https://github.com/marsgis/mars2d)


## 📄 开源协议 / License

### 1. 本项目授权
本仓库项目源代码基于 **Apache License 2.0** 完全开源（见根目录 `LICENSE`），
在遵守协议的前提下，可自由使用、修改、分发和再授权，**包括用于商业目的**。

### 2. Mars2D SDK 为独立授权
各模板运行时依赖的 **Mars2D SDK 核心类库**（`mars2d`，通过 `npm install mars2d`安装或 CDN 引入）是独立授权的产品，不属于本项目开源代码：
- 免费版：可正常商用，但**必须保留**页面 Logo 和 F12 控制台版权信息，不得移除或遮挡；
- 商业授权版：可去除 Logo、将版权信息替换为贵单位名称，并提供盖章授权文件。如有需要请购买 Mars2D SDK 商业授权 👉 <http://mars2d.cn/buy.html>
