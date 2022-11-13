
/**
 * Mars2D地理信息平台  mars2d
 *
 * 版本信息：v3.1.8
 * 编译日期：2022-11-13 11:50:48
 * 版权所有：Copyright by 火星科技  http://mars2d.cn
 * 使用单位：免费公开版 ，2021-10-01
 */
import * as L from "leaflet"
export { L }

declare const version: string
declare const update: string
declare const name: string
declare const proj4: any
declare const esri: any


/**
 * 国内偏移坐标系 枚举
 */
declare enum ChinaCRS {
    /**
     * 标准无偏坐标系
     */
    WGS84 = "WGS84",
    /**
     * 国测局(GCJ02)偏移坐标系
     */
    GCJ02 = "GCJ02",
    /**
     * 百度(BD09) 偏移坐标系  [暂未支持直接转换]
     */
    BAIDU = "BD09"
}

/**
 * 坐标系 枚举
 */
declare enum CRS {
    /**
     * Web墨卡托投影坐标系
     */
    EPSG3857 = "EPSG:3857",
    /**
     * WGS84地理坐标系
     */
    EPSG4326 = "EPSG:4326",
    /**
     * 中国大地2000 （CGCS2000）地理坐标系
     */
    EPSG4490 = "EPSG:4490",
    /**
     * 单张图片
     */
    IMAGE = "IMAGE",
    /**
     * 警用PGIS支持
     */
    PGIS = "PGIS",
    /**
     * 百度
     */
    BAIDU = "BAIDU",
    /**
     * CGCS2000 Gauss-Kruger Zone 平面投影，3度分带，横坐标前加带号。
     * 范围：EPSG:4513 到 EPSG:4533 (目前仅坐标转换使用)
     */
    CGCS2000_GK_Zone_3 = "CGCS2000_GK_Zone_3",
    /**
     * CGCS2000 Gauss-Kruger Zone 平面投影，6度分带，横坐标前加带号。
     * 范围：EPSG:4491 到 EPSG:4501 (目前仅坐标转换使用)
     */
    CGCS2000_GK_Zone_6 = "CGCS2000_GK_Zone_6",
    /**
     * CGCS2000 Gauss-Kruger CM 平面投影，3度分带，横坐标前不加带号。
     * 范围：EPSG:4534 到 EPSG:4554 (目前仅坐标转换使用)
     */
    CGCS2000_GK_CM_3 = "CGCS2000_GK_CM_3",
    /**
     * CGCS2000 Gauss-Kruger CM 平面投影，6度分带，横坐标前不加带号。
     * 范围：EPSG:4502 到 EPSG:4512 (目前仅坐标转换使用)
     */
    CGCS2000_GK_CM_6 = "CGCS2000_GK_CM_6"
}

/**
 * 事件类型 枚举（所有事件统一的入口）
 */
declare enum EventType {
    /**
     * 添加对象
     */
    add = "add",
    /**
     * 移除对象
     */
    remove = "remove",
    /**
     * 添加矢量数据时[图层上监听时使用]
     */
    addGraphic = "addGraphic",
    /**
     * 移除矢量数据时[图层上监听时使用]
     */
    removeGraphic = "removeGraphic",
    /**
     * 添加图层[map上监听时使用]
     */
    addLayer = "addLayer",
    /**
     * 移除图层[map上监听时使用]
     */
    removeLayer = "removeLayer",
    /**
     * 显示了对象
     */
    show = "show",
    /**
     * 隐藏了对象
     */
    hide = "hide",
    /**
     * 更新了对象
     */
    update = "update",
    /**
     * 开始
     */
    start = "start",
    /**
     * 变化了
     */
    change = "change",
    /**
     * 多个数据异步分析时，完成所有的回调事件
     */
    end = "end",
    /**
     * 完成
     */
    stop = "stop",
    /**
     * 完成加载，执行所有内部处理后
     */
    load = "load",
    /**
     * 更新了坐标
     */
    updatePosition = "updatePosition",
    /**
     * 更新了属性
     */
    updateAttr = "updateAttr",
    /**
     * 更新了样式
     */
    updateStyle = "updateStyle",
    /**
     * 鼠标右键事件
     */
    rightClick = "contextmenu",
    /**
     * 鼠标单击事件
     */
    click = "click",
    /**
     * 鼠标双击事件
     */
    dblclick = "dblclick",
    /**
     * 鼠标按下
     */
    mousedown = "mousedown",
    /**
     * 鼠标按下后释放
     */
    mouseup = "mouseup",
    /**
     * 鼠标移入 鼠标事件
     */
    mousemove = "mousemove",
    /**
     * 鼠标 事件
     */
    mouseover = "mouseover",
    /**
     * 鼠标移出 鼠标事件
     */
    mouseout = "mouseout",
    /**
     * 按键按下 键盘事件
     */
    keydown = "keydown",
    /**
     * 按键按下后释放 键盘事件
     */
    keyup = "keyup",
    /**
     * 放大地图开始
     */
    zoomstart = "zoomstart",
    /**
     * 放大地图
     */
    zoom = "zoom",
    /**
     * 放大地图结束
     */
    zoomend = "zoomend",
    /**
     * 开始移动地图
     */
    movestart = "movestart",
    /**
     * 移动地图
     */
    move = "move",
    /**
     * 移动地图结束
     */
    moveend = "moveend",
    /**
     * 添加图层
     */
    layeradd = "layeradd",
    /**
     * 图层移除
     */
    layerremove = "layerremove",
    /**
     * popup关闭
     */
    popupclose = "popupclose",
    /**
     * popup开启
     */
    popupopen = "popupopen",
    /**
     * tooltip关闭
     */
    tooltipclose = "tooltipclose",
    /**
     * tooltip开启
     */
    tooltipopen = "tooltipopen",
    /**
     * 开始绘制 标绘事件
     */
    drawStart = "drawStart",
    /**
     * 正在移动鼠标中，绘制过程中鼠标移动了点 标绘事件
     */
    drawMouseMove = "drawMouseMove",
    /**
     * 绘制过程中增加了点 标绘事件
     */
    drawAddPoint = "drawAddPoint",
    /**
     * 绘制过程中删除了最后一个点 标绘事件
     */
    drawRemovePoint = "drawRemovePoint",
    /**
     * 创建完成 标绘事件
     */
    drawCreated = "drawCreated",
    /**
     * 开始编辑 标绘事件
     */
    editStart = "editStart",
    /**
     * 正在移动鼠标中，正在编辑拖拽修改点中（MOUSE_MOVE） 标绘事件
     */
    editMouseMove = "editMouseMove",
    /**
     * 编辑修改了点（LEFT_UP）标绘事件
     */
    editMovePoint = "editMovePoint",
    /**
     * 编辑删除了点 标绘事件
     */
    editRemovePoint = "editRemovePoint",
    /**
     * 编辑增加了中间点 标绘事件
     */
    editAddPoint = "editAddPoint",
    /**
     * 图上编辑修改了相关style属性 标绘事件
     */
    editStyle = "editStyle",
    /**
     * 停止编辑 标绘事件
     */
    editStop = "editStop"
}

/**
 * 矢量数据类型
 */
declare enum GraphicType {
    marker,
    movingMarker,
    divGraphic,
    divLightPoint,
    divUpLabel,
    divBoderLabel,
    fontGraphic,
    label,
    point,
    circle,
    ellipse,
    polyline,
    brushLine,
    polygon,
    rectangle,
    image,
    canvasImage,
    distanceMeasure,
    areaMeasure,
    attackArrow,
    attackArrowPW,
    attackArrowYW,
    doubleArrow,
    fineArrow,
    fineArrowYW,
    straightArrow,
    lune,
    sector,
    regular,
    isosTriangle,
    closeVurve,
    gatheringPlace
}

/**
 * 一个原点相对于一个物体的水平位置
 */
declare enum HorizontalOrigin {
    /**
     * 原点在物体的左边
     */
    LEFT = 1,
    /**
     * 原点在物体的水平中心
     */
    CENTER = 0,
    /**
     * 原点在物体的水平右边
     */
    RIGHT = -1
}

/**
 * 图层类型
 */
declare enum LayerType {
    group,
    tdt,
    baidu,
    gaode,
    tencent,
    osm,
    google,
    mapbox,
    image,
    imageRotated,
    xyz,
    tile,
    arcgis,
    arcgis_cache,
    arcgis_compact,
    arcgis_tile,
    arcgis_dynamic,
    arcgis_image,
    wms,
    wmts,
    graphic,
    geojson,
    pbf,
    wfs,
    arcgis_feature,
    canvasMarker,
    cluster,
    graticule,
    dayNight,
    mapv,
    echarts,
    heat
}

/**
 * 地图切换控件内使用的图层类型
 */
declare enum MapSwichType {
    /**
     * 电子地图
     */
    Vec = 0,
    /**
     * 影像地图
     */
    Img = 1,
    /**
     * 三维
     */
    Map3D = 2,
    /**
     * 全景
     */
    Pano = 3
}

/**
 * 状态 枚举
 */
declare enum State {
    /**
     * 初始化
     */
    INITIALIZED = "inited",
    /**
     * 已添加到地图上
     */
    ADDED = "added",
    /**
     * 已移除地图
     */
    REMOVED = "removed",
    /**
     * 已销毁对象
     */
    DESTROY = "destroy"
}

/**
 * SDK中涉及到的所有第3方地图服务的Token令牌key，
 * 【重要提示：为了避免后期失效，请全部重新赋值换成自己的key】
 */
declare namespace Token {
    /**
     * mapbox地图key，
     * 官网：{@link https://account.mapbox.com}
     */
    const mapbox: string;
    /**
     * 更新mapbox地图key
     * @param item - token值
     */
    function updateMapbox(item: string): any | void;
    /**
     * 天地图key数组，
     * 官网： {@link https://console.tianditu.gov.cn/api/key}
     */
    const tiandituArr: string[];
    /**
     * 天地图key，
     */
    const tianditu: string;
    /**
     * 更新天地图key
     * @param item - token值
     */
    function updateTianditu(item: string | string[]): any | void;
    /**
     * 高德key数组，
     * 官网： {@link https://console.amap.com/dev/key/app}
     */
    const gaodeArr: string[];
    /**
     * 高德key，
     */
    const gaode: string;
    /**
     * 更新高德key
     * @param item - token值
     */
    function updateGaode(item: string | string[]): any | void;
    /**
     * 百度key数组，
     * 官网： {@link http://lbsyun.baidu.com/apiconsole/key#/home}
     */
    const baiduArr: string[];
    /**
     * 百度key，
     */
    const baidu: string;
    /**
     * 更新百度key
     * @param item - token值
     */
    function updateBaidu(item: string | string[]): any | void;
    /**
     * 更新所有SDK涉及的第3放Token值（如果具体使用类中传入时，已传入值优先）
     * @param token - 集合
     * @param [token.tianditu] - 天地图
     * @param [token.gaode] - 高德
     * @param [token.baidu] - 百度
     * @param [token.mapbox] - mapbox地图
     */
    function updateAll(token: {
        tianditu?: string | string[];
        gaode?: string | string[];
        baidu?: string | string[];
        mapbox?: string;
    }): any | void;
}

/**
 * 一个原点相对于一个物体的垂直位置
 */
declare enum VerticalOrigin {
    /**
     * 原点在物体的顶部
     */
    TOP = -1,
    /**
     * 原点在物体的中间
     */
    CENTER = 0,
    /**
     * 原点在物体的底部
     */
    BOTTOM = 1
}

/**
 * 鼠标经纬度等信息状态栏,
 * 一般在页面下侧区域
 * @param [options] - 参数对象，包括以下：
 * @param [options.template] - 展示的内容格式化字符串,
 * 支持以下模版配置：
 * 【鼠标所在位置】 经度:{lng}， 纬度:{lat}，
 * 【地图的】 层级：{level}，
 * @param [options.latDecimal = 6] - 保留的{lat}和{lng}的小数位
 * @param [options.levelDecimal = 0] - 保留的{level}的小数位
 * @param [options.crs] - 按指定坐标系显示坐标值,  配置后template可以加模板：【鼠标所在位置对应的crs坐标系】 X或经度值：{crsx}， Y或纬度值：{crsy}
 * @param [options.crsDecimal = 1] - 保留的{crsx}和{crsy}的小数位
 * @param [options.cacheTime = 50] - 鼠标移动的缓存时间
 * @param [options.style] - 可以CSS样式，如:
 * @param [options.style.top] - css定位top位置, 如 top: '10px'
 * @param [options.style.bottom] - css定位bottom位置
 * @param [options.style.left] - css定位left位置
 * @param [options.style.right] - css定位right位置
 */
declare class LocationBar extends L.Control {
    constructor(options?: {
        template?: string;
        latDecimal?: number;
        levelDecimal?: number;
        crs?: string | CRS;
        crsDecimal?: number;
        cacheTime?: number;
        style?: {
            top?: string;
            bottom?: string;
            left?: string;
            right?: string;
        };
    });
    /**
     * 显示的数据
     */
    readonly locationData: any;
}

/**
 * 卷帘对比 控件
 * @param [options] - 参数对象，包括以下：
 * @param [options.leftLayer] - 左侧区域瓦片图层
 * @param [options.rightLayer] - 右侧区域瓦片图层
 */
declare class MapSplit extends L.Control {
    constructor(options?: {
        leftLayer?: L.TileLayer | L.TileLayer[];
        rightLayer?: L.TileLayer | L.TileLayer[];
    });
    /**
     * 左侧区域瓦片图层
     */
    leftLayer: L.TileLayer | L.TileLayer[];
    /**
     * 右侧区域瓦片图层
     */
    rightLayer: L.TileLayer | L.TileLayer[];
}

/**
 * 地图切换控件，支持与三维地图、全景切换。
 * @param [options] - 参数对象，包括以下：
 * @param [options.selected = MapSwichType.Vec] - 默认选择的类型
 * @param [options.hasPano = false] - 是否存在全景按钮
 */
declare class MapSwich extends L.Control {
    constructor(options?: {
        selected?: MapSwichType;
        hasPano?: boolean;
    });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement;
    /**
     * 绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param data - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
}

/**
 * 鹰眼地图
 * @param [options] - 参数对象，包括以下：
 * @param [options.mapOptions] - 扩展鹰眼地图的构造参数选项。
 * @param [options.minimized = false] - 默认展示时是否最小化
 * @param [options.position = 'bottomright'] - 位置参数,标准Leaflet.Control，与所有其他控件一样使用
 * @param [options.width = 150] - 地图的宽度，以像素为单位
 * @param [options.height = 150] - 地图的高度，以像素为单位
 * @param [options.collapsedWidth = 20] - 折叠标记的宽度和折叠时的小地图（以像素为单位）
 * @param [options.collapsedHeight = 20] - 折叠标记的高度和折叠时的小地图（以像素为单位）
 * @param [options.toggleDisplay = false] - 设置小地图是否应该有一个按钮来最小化它
 * @param [options.zoomLevelOffset = -5] - 与主地图的缩放相比，偏移应用于小地图的缩放。可以为正或负
 * @param [options.zoomLevelFixed = false] - 覆盖偏移以将固定缩放级别应用于小地图，而不管主地图缩放。将其设置为任何有效的缩放级别，如果使用未设置zoomLevelOffset。
 * @param [options.centerFixed = false] - 不管主图的视图/位置如何，都可以将固定位置应用于小地图。防止平移小地图，但允许缩放（在小地图和主地图中）。如果小地图放大，它将始终放大centerFixed点。您可以传入一个LatLng等效对象。
 * @param [options.zoomAnimation = false] - 设置小地图是否应该有动画缩放（将导致它在主地图移动后滞后）
 * @param [options.autoToggleDisplay = false] - 设置如果父映射边界不适合小地图范围内的小地图是否应自动隐藏。当设置'zoomLevelFixed'时特别有用。
 * @param [options.aimingRectOptions = { color: "#ff7800", weight: 1 }] - 通过传递Path.Options对象来设置瞄准矩形的样式。
 * @param [options.shadowRectOptions = { color: "#0000ff", weight: 1, opacity: 0.1, fill: false }] - 通过传入Path.Options对象来设置瞄准阴影矩形的样式。
 */
declare class OverviewMap extends L.Control {
    constructor(options?: {
        mapOptions?: Map.Options;
        minimized?: boolean;
        position?: string;
        width?: number;
        height?: number;
        collapsedWidth?: number;
        collapsedHeight?: number;
        toggleDisplay?: boolean;
        zoomLevelOffset?: number;
        zoomLevelFixed?: boolean;
        centerFixed?: boolean;
        zoomAnimation?: boolean;
        autoToggleDisplay?: boolean;
        aimingRectOptions?: any;
        shadowRectOptions?: any;
    });
}

/**
 * 地图导航控件（鱼骨形状）
 * @param [options] - 参数对象，包括以下：
 * @param [options.style] - 可以CSS样式，如:
 * @param [options.style.top] - css定位top位置, 如 top: '10px'
 * @param [options.style.bottom] - css定位bottom位置
 * @param [options.style.left] - css定位left位置
 * @param [options.style.right] - css定位right位置
 * @param [options.countryLevel] - 按指定的地图级别，在滑动条上创建“国家”标记，比如4
 * @param [options.provinceLevel] - 按指定的地图级别，在滑动条上创建“省级”标记，比如7
 * @param [options.cityLevel] - 按指定的地图级别，在滑动条上创建“城市”标记，比如10
 * @param [options.streetLevel] - 按指定的地图级别，在滑动条上创建“街道”标记，比如14
 */
declare class Slider extends L.Control {
    constructor(options?: {
        style?: {
            top?: string;
            bottom?: string;
            left?: string;
            right?: string;
        };
        countryLevel?: number;
        provinceLevel?: number;
        cityLevel?: number;
        streetLevel?: number;
    });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement;
}

/**
 * 小Tooltip鼠标提示控件（比如标绘中使用的提示）
 * @param map - 地图对象
 */
declare class SmallTooltip extends BaseClass {
    constructor(map: Map);
    /**
     * 设置对象的启用和禁用状态。
     */
    enabled: boolean;
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement;
    /**
     * 更新信息窗口显示内容
     * @param labelText - 信息内容
     * @param labelText.text - 主提示信息
     * @param [labelText.subtext] - 辅助提示信息
     * @returns 当前对象本身,可以链式调用
     */
    updateContent(labelText: {
        text: string;
        subtext?: string;
    }): any | SmallTooltip;
    /**
     * 更新信息窗口的位置
     * @param pos - 位置
     * @returns 当前对象本身,可以链式调用
     */
    updatePosition(pos: L.Point | L.LatLng): any | SmallTooltip;
    /**
     * 增加错误样式
     * @returns 当前对象本身,可以链式调用
     */
    showAsError(): any | SmallTooltip;
    /**
     * 移除错误样式
     * @returns 当前对象本身,可以链式调用
     */
    removeError(): any | SmallTooltip;
    /**
     * 打开弹窗
     * @param latLng - 弹窗位置
     * @param message - 提示消息
     * @returns 无
     */
    open(latLng: L.Point | L.LatLng, message: string): any | void;
    /**
     * 关闭弹窗
     * @returns 无
     */
    close(): any | void;
    /**
     * 销毁当前控件
     * @returns 无
     */
    destroy(): any | void;
}

/**
 * 内置的多个按钮工具栏
 * @param [options] - 参数对象，包括以下：
 * @param [options.position = "bottomleft"] - 控件的位置
 * @param [options.item = ["home", "location", "fullscreen"]] - 显示的按钮配置,支持配置的值："home", "location", "fullscreen","clear"
 * @param [options.center] - 自定义home默认区域的中心点
 * @param [options.zoom] - 自定义home默认区域的层级
 * @param [options.onGoLocate] - 自定义“定位至当前所在位置”按钮回调方法
 * @param [options.noLocPoint] - 是否显示定位后的原点
 * @param [options.onFullscreen] - 自定义“进入全屏”按钮回调方法
 * @param [options.onClear] - “清除所有操作”按钮回调方法
 */
declare class ToolBar extends L.Control {
    constructor(options?: {
        position?: string;
        item?: string[];
        center?: L.LatLng;
        zoom?: number;
        onGoLocate?: (...params: any[]) => any;
        noLocPoint?: boolean;
        onFullscreen?: (...params: any[]) => any;
        onClear?: (...params: any[]) => any;
    });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement;
}

/**
 * 工具栏 单个按钮控件
 * @param options - 参数对象，包括以下：
 * @param [options.title = ''] - 按钮标题
 * @param [options.icon] - 按钮字体图标  图片url路径 或 字体图标class名
 * @param [options.click] - 按钮单击后的回调方法
 * @param [options.position = "bottomleft"] - 控件的位置
 * @param [options.insertIndex] - 可以自定义插入到父容器中的index顺序，默认是插入到最后面。
 * @param [options.insertBefore] - 可以自定义插入到指定兄弟容器的前面，与insertIndex二选一。
 */
declare class ToolButton extends L.Control {
    constructor(options: {
        title?: string;
        icon?: string;
        click?: (...params: any[]) => any;
        position?: string;
        insertIndex?: number;
        insertBefore?: HTMLElement;
    });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement;
}

/**
 * 基础类
 * @param [options] - 参数名称
 */
declare class BaseClass {
    constructor(options?: any);
    /**
     * 当前类的构造参数
     */
    readonly options: any;
    /**
     * 销毁当前对象
     * @param [noDel = false] - false:会自动delete释放所有属性，true：不delete绑定的变量
     * @returns 无
     */
    destroy(noDel?: boolean): any | void;
    /**
     * 绑定指定类型事件监听器,
     * 支持在监听中调用 event.stopPropagation(); 组织事件冒泡
     * @param types - 事件类型
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    on(types: EventType | string | EventType[], fn?: (...params: any[]) => any, context?: any): any | BaseClass;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型,未传值时解绑所有事件
     * @param [fn] - 绑定的监听器回调方法,未传值时解绑所有指定类型对应事件
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    off(types?: EventType | string | EventType[], fn?: (...params: any[]) => any, context?: any): any | BaseClass;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 当前对象本身,可以链式调用
     */
    fire(type: EventType | string, data?: any, propagate?: BaseClass | any): any | BaseClass;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: EventType | string, propagate?: BaseClass): any | boolean;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param types - 事件类型
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    once(types: EventType | string | EventType[], fn?: (...params: any[]) => any, context?: any): any | BaseClass;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | BaseClass;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | BaseClass;
    /**
     * 是否绑定了抛出事件到指定父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    hasEventParent(obj: any): any | BaseClass;
}

declare namespace BaseThing {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * thing.on(mars2d.EventType.add, function (event) {
     *   console.log('添加了对象', event)
     * })
     * @property add - 添加对象
     * @property remove - 移除对象
     */
    type EventType = {
        add: string;
        remove: string;
    };
}

/**
 * Thing对象(如分析、量算类等) 的基类
 * @param [options] - 参数对象，包括以下：
 * @param [options.id = createGuid()] - 对象的id标识
 * @param [options.enabled = true] - 对象的启用状态
 * @param [options.eventParent] - 指定的事件冒泡对象，默认为所加入的map对象，false时不冒泡事件
 */
declare class BaseThing extends BaseClass {
    constructor(options?: {
        id?: string | number;
        enabled?: boolean;
        eventParent?: BaseClass | boolean;
    });
    /**
     * 当前对象的状态
     */
    readonly state: State;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 设置对象的启用和禁用状态。
     */
    enabled: boolean;
    /**
     * 添加到地图上，同 map.addThing
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | BaseThing;
    /**
     * 从地图上移除，同map.removeThing
     * @param [destroy] - 是否调用destroy释放
     * @returns 无
     */
    remove(destroy?: boolean): any | void;
    /**
     * 对象添加到地图前创建一些对象的钩子方法，
     * 只会调用一次
     * @returns 无
     */
    _mountedHook(): any | void;
    /**
     * 对象添加到地图上的创建钩子方法，
     * 每次add时都会调用
     * @returns 无
     */
    _addedHook(): any | void;
    /**
     * 对象从地图上移除的创建钩子方法，
     * 每次remove时都会调用
     * @returns 无
     */
    _removedHook(): any | void;
    /**
     * 当前类的构造参数
     */
    readonly options: any;
    /**
     * 销毁当前对象
     * @param [noDel = false] - false:会自动delete释放所有属性，true：不delete绑定的变量
     * @returns 无
     */
    destroy(noDel?: boolean): any | void;
}

/**
 * 自定义集合存储管理类
 */
declare class MarsArray {
    /**
     * 获取总数量
     */
    readonly length: number;
    /**
     * 获取集合中的数组列表
     */
    readonly values: any[];
    /**
     * 确定提供的键是否在数组中
     * @param key - 主键
     * @returns 是否在数组中
     */
    contains(key: string | number): any | boolean;
    /**
     * 将提供的键与提供的值关联起来。如果密钥已经存在, 存在时，它将被新值覆盖。
     * @param key - 主键
     * @param value - 与提供的键相关联的值
     */
    set(key: string | number, value: any): any | void;
    /**
     * 检索与提供的键关联的值
     * @param key - 主键
     * @returns 关联的值，如果键在集合中不存在，则为未定义。
     */
    get(key: string | number): any | any;
    /**
     * 根据指定属性获取对象
     * @param attrValue - 属性值
     * @param [attrName = 'id'] - 属性键
     * @param [exObj = 'options'] - 查找的二级对象属性键
     * @returns 关联的值，如果键在集合中不存在，则为未定义。
     */
    getByAttr(attrValue: string | number, attrName?: string, exObj?: string): any | any;
    /**
     * 根据指定属性获取符合条件对象数组
     * @param attrValue - 属性值
     * @param [attrName = 'id'] - 属性键
     * @param [exObj = 'options'] - 查找的二级对象属性键
     * @returns 数组
     */
    getListByAttr(attrValue: string | number, attrName?: string, exObj?: string): any | any[];
    /**
     * 从集合中移除键值对
     * @param key - 主键
     * @returns 是否移除
     */
    remove(key: string | number): any | boolean;
    /**
     * 遍历每一个对象并将其作为参数传递给回调函数
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     */
    forEach(method: (...params: any[]) => any, context?: any): any | void;
    /**
     * 清空集合
     */
    removeAll(): any | void;
    /**
     * 销毁对象
     */
    destroy(): any | void;
}

/**
 * 全局JsDoc变量 (只是注释使用，非mars2d变量)
 */
declare namespace Globe {
    /**
     * Popup或Tooltip配置的数组方式对象
     * @property field - 字段名称
     * @property name - 显示的对应自定义名称
     * @property [type] - 默认为label文本，也可以支持：'button'按钮，'html' html内容。
     * @property [callback] - 当type为'button'按钮时，单击后触发的事件。
     * @property [html] - 当type为'html'时，对于拼接的html内容。
     * @property [format] - 使用window上有效的格式化js方法名称或function回调方法，来格式化字符串值。
     * @property [unit] - 追加的计量单位值。
     * @property [className] - 自定义样式名称
     */
    type getTemplateHtml_template = {
        field: string;
        name: string;
        type?: string;
        callback?: string;
        html?: string;
        format?: string | ((...params: any[]) => any);
        unit?: string;
        className?: string;
    };
}

/**
 * 画笔自由曲线 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class BrushLine extends Polyline {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polyline.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * Canvas图片矩形 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class CanvasImage extends L.Path {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Image.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | CanvasImage;
    /**
     * 将线移动到所有路径层的顶部
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | CanvasImage;
    /**
     * 将线移动到所有路径层的底部
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | CanvasImage;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | CanvasImage;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | CanvasImage;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | CanvasImage;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | CanvasImage;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | CanvasImage;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | CanvasImage;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | CanvasImage;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | CanvasImage;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | CanvasImage;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | CanvasImage;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | CanvasImage;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | CanvasImage;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | CanvasImage;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | CanvasImage;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[];
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | any): any | CanvasImage;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
    /**
     * 设置图片URL
     * @param url - 图片URL
     * @returns 当前对象本身，可以链式调用
     */
    setUrl(url: string): any | CanvasImage;
    /**
     * 用传递的LatLngBounds边界重绘图片
     * @param bounds - 边界
     * @returns 当前对象本身，可以链式调用
     */
    setBounds(bounds: L.LatLngBounds): any | CanvasImage;
    /**
     * 获取线的矩形边界
     * @returns 当前对象本身，可以链式调用
     */
    getBounds(): any | CanvasImage;
    /**
     * 获取指定坐标的颜色值
     * @param latnlg - 坐标
     * @returns 颜色值，如 rgba(255,0,0,0.5)
     */
    getRgba(latnlg: L.LatLng): any | string;
}

declare namespace Circle {
    /**
     * 圆矢量对象 支持的样式信息
     * @property radius - 圆的半径，以米为单位。
     * @property [rotation = 0] - 方向，单位：角度值
     * @property [startAngle = 0] - 当为扇形时的开始角度值
     * @property [stopAngle = 360] - 当为扇形时的结束角度值
     * @property [fill = true] - 是否填充
     * @property [fillColor = '#3388ff'] - 填充颜色
     * @property [fillOpacity = 1.0] - 填充透明度，取值范围：0.0-1.0
     * @property [image] - 填充的图片的url
     * @property [imageOpacity = 1.0] - 填充图片的透明度
     * @property [fillRule = 'evenodd'] - 用于定义填充形状
     * @property [outline = true] - 是否边框
     * @property [outlineColor = '#3388ff'] - 边框颜色
     * @property [outlineOpacity = 1.0] - 边框透明度，取值范围：0.0-1.0
     * @property [outlineWidth = 2] - 边框宽度
     * @property [lineCap = 'round'] - 边框中，线两段使用的形状, 如: butt、round、square
     * @property [lineJoin = 'round'] - 边框中，线转折处使用的形状, 如: miter、round、bevel
     * @property [dashArray] - 边框中，定义虚线线型，用于定义笔划模式,如："5, 10" 、 "5, 5, 1, 5"
     * @property [dashOffset] - 边框中，指定了dash模式到路径开始的距离，如果使用了一个百分比值，那么这个值就代表了当前viewport的一个百分比,值可以取为负值。
     * @property [smoothFactor = 1.0] - 边框中，数值的大小可以简化每个缩放级别的折线。更多的意味着更好的性能和更平滑的外观，而更少的意味着更准确的表示。
     * @property [noClip = false] - 边框中，禁用折线裁剪
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [renderer] - 使用的Renderer 特定实例。优先于地图的默认渲染器。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        radius: number;
        rotation?: number;
        startAngle?: number;
        stopAngle?: number;
        fill?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        image?: string;
        imageOpacity?: number;
        fillRule?: string;
        outline?: boolean;
        outlineColor?: string;
        outlineOpacity?: number;
        outlineWidth?: number;
        lineCap?: string;
        lineJoin?: string;
        dashArray?: string;
        dashOffset?: string;
        smoothFactor?: number;
        noClip?: boolean;
        interactive?: boolean;
        renderer?: L.Renderer;
        highlight?: Circle.StyleOptions;
        label?: Label.StyleOptions;
    };
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * * @property {String} add 在矢量数据添加到图层(或地图)上之后触发
     * @example
     * //绑定监听事件
     * graphic.on('click', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property remove - 在矢量数据从图层(或地图)上移除之后触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        remove: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 圆 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Circle extends L.Circle {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: Circle.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 返回半径值
     * @returns 半径值
     */
    getRadius(): any | number;
    /**
     * 修改半径值
     * @param radius - 半径值
     * @returns 当前对象本身，可以链式调用
     */
    setRadius(radius: number): any | Circle;
    /**
     * 返回圆的中心位置
     * @returns 经纬度对象
     */
    getLatLng(): any | L.LatLng;
    /**
     * 修改中心位置
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng): any | Circle;
    /**
     * 获取圆的矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | Circle;
    /**
     * 将圆移动到所有路径层的顶部
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | Circle;
    /**
     * 将圆移动到所有路径层的底部
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | Circle;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | Circle;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Circle;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | Circle;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | Circle;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | Circle;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | Circle;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | Circle;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | Circle;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | Circle;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | Circle;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | Circle;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | Circle;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Circle;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Circle;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置
     */
    latlng: L.LatLng;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[];
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][];
    /**
     * 矩形的边线坐标集合
     */
    readonly outlineLatlngs: L.LatLng[];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 周长距离（单位：米）
     */
    readonly distance: number;
    /**
     * 面积（单位：平方米）
     */
    readonly area: number;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 半径， 单位：米
     */
    radius: number;
    /**
     * 是否为扇形
     */
    readonly isSector: boolean;
    /**
     * 开始角度
     */
    startAngle: number;
    /**
     * 结束角度
     */
    stopAngle: number;
    /**
     * 方向，角度值
     */
    rotation: number;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | any): any | Circle;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
    /**
     * 判断指定坐标是否在当前圆内
     * @param latlng - 坐标
     * @returns 是否在圆内
     */
    isInPoly(latlng: L.LatLng): any | boolean;
    /**
     * 获取圆的边线坐标集合
     * @param [closure = true] - 是否闭合，true时会添加第0个点进行闭合。
     * @param [count] - 点的数量
     * @returns 边线坐标数组
     */
    getOutlineLatlngs(closure?: boolean, count?: number): any | L.LatLng[];
}

declare namespace DivBoderLabel {
    /**
     * 动态边框文本 支持的样式信息
     * @property text - 文本内容
     * @property [font_size = 15] - 字体大小
     * @property [font_family = "楷体"] - 字体 ,可选项：微软雅黑,宋体,楷体,隶书,黑体 等
     * @property [color = "#15d1f2"] - 文本CSS颜色
     * @property [boderColor = "#15d1f2"] - 边框CSS颜色
     * @property [width] - 面板宽度（px像素值），默认根据文本内容和字体大小自动计算
     * @property [height] - 面板高度（px像素值），默认根据文本内容和字体大小自动计算
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [draggable = false] - 标记是否可以用鼠标/触摸拖动
     * @property [keyboard = true] - 标记是否可以用键盘按键并按回车键
     * @property [zIndexOffset = 0] - 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用这个选项，设置一个较大的值即可，比如1000（或是相反地设置一个较大的负值）
     * @property [riseOnHover = false] - 如果为true，当您将鼠标悬停在其上时，标记将会放在其他顶部。
     * @property [riseOffset = 250] - 用于riseOnHover功能的z-index偏移量。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     */
    type StyleOptions = {
        text: string;
        font_size?: number;
        font_family?: string;
        color?: string;
        boderColor?: string;
        width?: number;
        height?: number;
        opacity?: number;
        draggable?: boolean;
        keyboard?: boolean;
        zIndexOffset?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
        interactive?: boolean;
    };
}

/**
 * 动态边框文本 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class DivBoderLabel extends DivGraphic {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: DivBoderLabel.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

declare namespace DivGraphic {
    /**
     * DIV点 支持的样式信息
     * @property html - HTML内容
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [horizontalOrigin] - 横向方向的定位
     * @property [verticalOrigin] - 垂直方向的定位
     * @property [offsetX] - horizontalOrigin定位基础上，横向方向偏移数值
     * @property [offsetY] - verticalOrigin定位基础上，垂直方向偏移数值
     * @property [iconSize] - icon图片的大小（单位：像素），设置后width、height即失效。
     * @property [iconAnchor] - 自定义图标的“指示地理位置的锚点”的坐标（相对于其左上角）。 以便图标显示准确位于标记的地理位置。 如果指定大小，则iconAnchor默认为图标中心点，也可以在带有负边距的CSS中设置。设置后horizontalOrigin、verticalOrigin即失效。
     * @property [className] - 自定义样式class名称
     * @property [draggable = false] - 标记是否可以用鼠标/触摸拖动
     * @property [keyboard = true] - 标记是否可以用键盘按键并按回车键
     * @property [zIndexOffset = 0] - 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用这个选项，设置一个较大的值即可，比如1000（或是相反地设置一个较大的负值）
     * @property [riseOnHover = false] - 如果为true，当您将鼠标悬停在其上时，标记将会放在其他顶部。
     * @property [riseOffset = 250] - 用于riseOnHover功能的z-index偏移量。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        html: string;
        opacity?: number;
        horizontalOrigin?: HorizontalOrigin;
        verticalOrigin?: VerticalOrigin;
        offsetX?: number;
        offsetY?: number;
        iconSize?: L.Point | number[];
        iconAnchor?: L.Point | number[];
        className?: string;
        draggable?: boolean;
        keyboard?: boolean;
        zIndexOffset?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
        interactive?: boolean;
        highlight?: DivGraphic.StyleOptions;
        label?: Label.StyleOptions;
    };
}

/**
 * DIV点 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class DivGraphic extends Marker {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: DivGraphic.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

declare namespace DivLightPoint {
    /**
     * 动画扩散点 支持的样式信息
     * @property [color = '#f33349'] - CSS颜色
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [draggable = false] - 标记是否可以用鼠标/触摸拖动
     * @property [keyboard = true] - 标记是否可以用键盘按键并按回车键
     * @property [zIndexOffset = 0] - 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用这个选项，设置一个较大的值即可，比如1000（或是相反地设置一个较大的负值）
     * @property [riseOnHover = false] - 如果为true，当您将鼠标悬停在其上时，标记将会放在其他顶部。
     * @property [riseOffset = 250] - 用于riseOnHover功能的z-index偏移量。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     */
    type StyleOptions = {
        color?: string;
        opacity?: number;
        draggable?: boolean;
        keyboard?: boolean;
        zIndexOffset?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
        interactive?: boolean;
    };
}

/**
 * 动画扩散点 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class DivLightPoint extends DivGraphic {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: DivLightPoint.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

declare namespace DivUpLabel {
    /**
     * 竖直文字 支持的样式信息
     * @property text - 文本内容
     * @property [color = "white"] - 文本CSS颜色
     * @property [font_size = 15] - 字体大小
     * @property [font_family = "楷体"] - 字体 ,可选项：微软雅黑,宋体,楷体,隶书,黑体 等
     * @property [lineHeight = 100] - 底部线的高度值（单位：px像素）
     * @property [circleSize = 10] - 底部圆圈的大小（单位：px像素）
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [draggable = false] - 标记是否可以用鼠标/触摸拖动
     * @property [keyboard = true] - 标记是否可以用键盘按键并按回车键
     * @property [zIndexOffset = 0] - 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用这个选项，设置一个较大的值即可，比如1000（或是相反地设置一个较大的负值）
     * @property [riseOnHover = false] - 如果为true，当您将鼠标悬停在其上时，标记将会放在其他顶部。
     * @property [riseOffset = 250] - 用于riseOnHover功能的z-index偏移量。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     */
    type StyleOptions = {
        text: string;
        color?: string;
        font_size?: number;
        font_family?: string;
        lineHeight?: number;
        circleSize?: number;
        opacity?: number;
        draggable?: boolean;
        keyboard?: boolean;
        zIndexOffset?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
        interactive?: boolean;
    };
}

/**
 * 竖直文字 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class DivUpLabel extends DivGraphic {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: DivUpLabel.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 标绘处理类 基类
 * @param [options.id] - 矢量数据id标识
 */
declare class BaseDraw extends L.Handler {
    constructor();
    /**
     * 销毁当前对象
     * @returns 无
     */
    destroy(): any | void;
}

/**
 * 点状对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class BaseSimpleShape extends BaseDraw {
    constructor();
}

/**
 * 面积测量 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawAreaMeasure extends DrawPolygon {
    constructor();
}

/**
 * 自由绘制线 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawBrushLine extends BaseSimpleShape {
    constructor();
}

/**
 * 圆  对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawCircle extends BaseSimpleShape {
    constructor();
}

/**
 * 测量长度 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawDistanceMeasure extends DrawPolyline {
    constructor();
}

/**
 * DIV点 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawDivGraphic extends DrawMarker {
    constructor();
}

/**
 * 椭圆 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawEllipse extends BaseSimpleShape {
    constructor();
}

/**
 * FontMarker注记点 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawFontGraphic extends DrawMarker {
    constructor();
}

/**
 * 矩形图片 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawImage extends DrawRectangle {
    constructor();
}

/**
 * 文字注记 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawLabel extends DrawMarker {
    constructor();
}

/**
 * 图标点 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawMarker extends BaseDraw {
    constructor();
}

/**
 * 像素点 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawPoint extends DrawMarker {
    constructor();
}

/**
 * 面  对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawPolygon extends DrawPolyline {
    constructor();
}

/**
 * 线 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawPolyline extends BaseDraw {
    constructor();
}

/**
 * 矩形 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawRectangle extends BaseSimpleShape {
    constructor();
}

/**
 * 军事标绘 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class BaseDrawPlot extends DrawPolygon {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawAttackArrow extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawAttackArrowPW extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawAttackArrowYW extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawCloseVurve extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawDoubleArrow extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawFineArrow extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawFineArrowYW extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawGatheringPlace extends BaseDrawPlot {
    constructor();
}

/**
 * 对象标绘处理类
 * @param [options.id] - 矢量数据id标识
 */
declare class DrawStraightArrow extends BaseDrawPlot {
    constructor();
}

/**
 * 矢量对象 编辑处理基类，内部使用
 * @param [options.id] - 矢量数据id标识
 */
declare class BaseEditSimpleShape extends L.Handler {
    constructor();
    /**
     * 开始编辑
     * @returns 当前对象本身，可以链式调用
     */
    enable(): any | BaseEditSimpleShape;
    /**
     * 停止编辑
     * @returns 当前对象本身，可以链式调用
     */
    disable(): any | BaseEditSimpleShape;
    /**
     * 更新所有编辑点marker
     * @returns 当前对象本身，可以链式调用
     */
    updateMarkers(): any | BaseEditSimpleShape;
}

/**
 * 圆 编辑处理类，内部使用
 * @param [options.id] - 矢量数据id标识
 */
declare class EditCircle extends EditCircleMarker {
    constructor();
}

/**
 * 像素圆点 编辑处理类，内部使用
 * @param [options.id] - 矢量数据id标识
 */
declare class EditCircleMarker extends BaseEditSimpleShape {
    constructor();
}

/**
 * 椭圆 编辑处理类，内部使用
 * @param [options.id] - 矢量数据id标识
 */
declare class EditEllipse extends EditCircleMarker {
    constructor();
}

/**
 * Maerk点 编辑处理类，内部使用
 * @param [options.id] - 矢量数据id标识
 */
declare class EditMarker extends L.Handler {
    constructor();
    /**
     * 开始编辑
     * @returns 当前对象本身，可以链式调用
     */
    enable(): any | BaseEditSimpleShape;
    /**
     * 停止编辑
     * @returns 当前对象本身，可以链式调用
     */
    disable(): any | BaseEditSimpleShape;
}

/**
 * 线面对象 编辑处理类，内部使用
 * @param [options.id] - 矢量数据id标识
 */
declare class EditPoly extends L.Handler {
    constructor();
    /**
     * 开始编辑
     * @returns 当前对象本身，可以链式调用
     */
    enable(): any | BaseEditSimpleShape;
    /**
     * 停止编辑
     * @returns 当前对象本身，可以链式调用
     */
    disable(): any | BaseEditSimpleShape;
    /**
     * 更新所有编辑点marker
     * @returns 当前对象本身，可以链式调用
     */
    updateMarkers(): any | BaseEditSimpleShape;
}

/**
 * 矩形 编辑处理类，内部使用
 * @param [options.id] - 矢量数据id标识
 */
declare class EditRectangle extends BaseEditSimpleShape {
    constructor();
}

declare namespace Ellipse {
    /**
     * 椭圆矢量对象 支持的样式信息
     * @property semiMinorAxis - 圆的短半轴半径，以米为单位。
     * @property semiMajorAxis - 圆的长半轴半径，以米为单位。
     * @property [rotation = 0] - 方向，单位：角度值
     * @property [startAngle = 0] - 当为扇形时的开始角度值
     * @property [stopAngle = 360] - 当为扇形时的结束角度值
     * @property [fill = true] - 是否填充
     * @property [fillColor = '#3388ff'] - 填充颜色
     * @property [fillOpacity = 1.0] - 填充透明度，取值范围：0.0-1.0
     * @property [fillRule = 'evenodd'] - 用于定义填充形状
     * @property [outline = true] - 是否边框
     * @property [outlineColor = '#3388ff'] - 边框颜色
     * @property [outlineOpacity = 1.0] - 边框透明度，取值范围：0.0-1.0
     * @property [outlineWidth = 2] - 边框宽度
     * @property [lineCap = 'round'] - 边框中，线两段使用的形状, 如: butt、round、square
     * @property [lineJoin = 'round'] - 边框中，线转折处使用的形状, 如: miter、round、bevel
     * @property [dashArray] - 边框中，定义虚线线型，用于定义笔划模式,如："5, 10" 、 "5, 5, 1, 5"
     * @property [dashOffset] - 边框中，指定了dash模式到路径开始的距离，如果使用了一个百分比值，那么这个值就代表了当前viewport的一个百分比,值可以取为负值。
     * @property [smoothFactor = 1.0] - 边框中，数值的大小可以简化每个缩放级别的折线。更多的意味着更好的性能和更平滑的外观，而更少的意味着更准确的表示。
     * @property [noClip = false] - 边框中，禁用折线裁剪
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [renderer] - 使用的Renderer 特定实例。优先于地图的默认渲染器。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        semiMinorAxis: number;
        semiMajorAxis: number;
        rotation?: number;
        startAngle?: number;
        stopAngle?: number;
        fill?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        fillRule?: string;
        outline?: boolean;
        outlineColor?: string;
        outlineOpacity?: number;
        outlineWidth?: number;
        lineCap?: string;
        lineJoin?: string;
        dashArray?: string;
        dashOffset?: string;
        smoothFactor?: number;
        noClip?: boolean;
        interactive?: boolean;
        renderer?: L.Renderer;
        highlight?: Ellipse.StyleOptions;
        label?: Label.StyleOptions;
    };
}

/**
 * 椭圆 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Ellipse extends L.Path {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: Ellipse.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | Ellipse;
    /**
     * 将圆移动到所有路径层的顶部
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | Ellipse;
    /**
     * 将圆移动到所有路径层的底部
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | Ellipse;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | Ellipse;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Ellipse;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | Ellipse;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | Ellipse;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | Ellipse;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | Ellipse;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | Ellipse;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | Ellipse;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | Ellipse;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | Ellipse;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | Ellipse;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | Ellipse;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Ellipse;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Ellipse;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置
     */
    latlng: L.LatLng;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[];
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 短半轴 半径， 单位：米
     */
    semiMinorAxis: number;
    /**
     * 长半轴 半径， 单位：米
     */
    semiMajorAxis: number;
    /**
     * 方向，角度值
     */
    rotation: number;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | Ellipse.StyleOptions): any | Ellipse;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
    /**
     * 获取矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 修改椭圆中心位置
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng): any | Ellipse;
    /**
     * 返回椭圆的中心位置
     * @returns 经纬度对象
     */
    getLatLng(): any | L.LatLng;
}

declare namespace FontGraphic {
    /**
     * font文字点 支持的样式信息
     * @property iconClass - font文字点的class名称
     * @property [color = "white"] - 文本CSS颜色
     * @property [size = 15] - 字体大小
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [draggable = false] - 标记是否可以用鼠标/触摸拖动
     * @property [keyboard = true] - 标记是否可以用键盘按键并按回车键
     * @property [zIndexOffset = 0] - 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用这个选项，设置一个较大的值即可，比如1000（或是相反地设置一个较大的负值）
     * @property [riseOnHover = false] - 如果为true，当您将鼠标悬停在其上时，标记将会放在其他顶部。
     * @property [riseOffset = 250] - 用于riseOnHover功能的z-index偏移量。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     */
    type StyleOptions = {
        iconClass: string;
        color?: string;
        size?: number;
        opacity?: number;
        draggable?: boolean;
        keyboard?: boolean;
        zIndexOffset?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
        interactive?: boolean;
    };
}

/**
 * font文字点 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class FontGraphic extends DivGraphic {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: FontGraphic.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

declare namespace Image {
    /**
     * 图片矩形 支持的样式信息
     * @property url - 图片url地址
     * @property [opacity = 1] - 瓦片的不透明度。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        url: string;
        opacity?: number;
        interactive?: boolean;
        crossOrigin?: boolean;
        highlight?: Image.StyleOptions;
        label?: Label.StyleOptions;
    };
}

/**
 * 图片矩形 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Image extends Rectangle {
    constructor(options: {
        latlngs: L.LatLng[] | L.LatLngBounds;
        style?: Image.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 更新图片范围边界
     * @param latLngBounds - 矩形边界
     * @returns 当前对象本身，可以链式调用
     */
    setLatLngs(latLngBounds: L.LatLngBounds | L.LatLng[]): any | Image;
    /**
     * 更新不透明度
     * @param opacity - 透明度
     * @returns 当前对象本身，可以链式调用
     */
    setOpacity(opacity: number): any | Image;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | Image.StyleOptions): any | Image;
}

declare namespace Label {
    /**
     * 文本点 支持的样式信息
     * @property [text = "文字"] - 文本内容，换行可以用换行符'\n'。
     * @property [horizontalOrigin] - 横向方向的定位
     * @property [verticalOrigin] - 垂直方向的定位
     * @property [offsetX] - horizontalOrigin定位基础上，横向方向偏移数值
     * @property [offsetY] - verticalOrigin定位基础上，垂直方向偏移数值
     * @property [iconAnchor] - 自定义图标的“指示地理位置的锚点”的坐标（相对于其左上角）。 以便图标显示准确位于标记的地理位置。 如果指定大小，则iconAnchor默认为图标中心点，也可以在带有负边距的CSS中设置。设置后horizontalOrigin、verticalOrigin即失效。
     * @property [color = "#ffffff"] - 文本颜色
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [font_family = "楷体"] - 字体 ,可选项：微软雅黑,宋体,楷体,隶书,黑体 等
     * @property [font_size = 30] - 字体大小
     * @property [font_weight = "normal"] - 是否加粗 ,可选项：bold (解释：是),normal (解释：否),
     * @property [font_style = "normal"] - 是否斜体 ,可选项：italic (解释：是),normal (解释：否),
     * @property [font = '30px normal normal 楷体'] - 上叙4个属性的一次性指定CSS字体的属性。
     * @property [border = false] - 是否边线
     * @property [border_width] - 边线宽度
     * @property [border_style] - 边线透明度
     * @property [border_color] - 边线颜色
     * @property [background = false] - 是否背景
     * @property [background_color] - 背景颜色
     * @property [className] - 自定义样式class名称
     * @property [draggable = false] - 标记是否可以用鼠标/触摸拖动
     * @property [keyboard = true] - 标记是否可以用键盘按键并按回车键
     * @property [zIndexOffset = 0] - 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用这个选项，设置一个较大的值即可，比如1000（或是相反地设置一个较大的负值）
     * @property [riseOnHover = false] - 如果为true，当您将鼠标悬停在其上时，标记将会放在其他顶部。
     * @property [riseOffset = 250] - 用于riseOnHover功能的z-index偏移量。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     */
    type StyleOptions = {
        text?: string;
        horizontalOrigin?: HorizontalOrigin;
        verticalOrigin?: VerticalOrigin;
        offsetX?: number;
        offsetY?: number;
        iconAnchor?: L.Point | number[];
        color?: string;
        opacity?: number;
        font_family?: string;
        font_size?: number;
        font_weight?: string;
        font_style?: string;
        font?: string;
        border?: boolean;
        border_width?: number;
        border_style?: string;
        border_color?: string;
        background?: boolean;
        background_color?: string;
        className?: string;
        draggable?: boolean;
        keyboard?: boolean;
        zIndexOffset?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
        interactive?: boolean;
        highlight?: Label.StyleOptions;
    };
}

/**
 * 文本点  矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Label extends DivGraphic {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: Label.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 文本内容
     */
    text: string;
}

declare namespace Marker {
    /**
     * 图标点Marker 支持的样式信息
     * @property image - 图片URI地址
     * @property [iconUrl] - 图片URI地址，同image
     * @property [iconRetinaUrl] - 用于Retina屏幕设备大尺寸版本的图标图像的URL
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [width] - 图标的宽度(以像素为单位)
     * @property [height] - 图标的高度(以像素为单位)
     * @property [iconSize] - icon图片的大小（单位：像素），设置后width、height即失效。
     * @property [rotationAngle = 0] - 旋转角度（度数值，0-360度），正北为0，逆时针旋转
     * @property [horizontalOrigin] - 横向方向的定位
     * @property [verticalOrigin] - 垂直方向的定位
     * @property [offsetX] - horizontalOrigin定位基础上，横向方向偏移数值
     * @property [offsetY] - verticalOrigin定位基础上，垂直方向偏移数值
     * @property [iconAnchor] - 自定义图标的“指示地理位置的锚点”的坐标（相对于其左上角）。 以便图标显示准确位于标记的地理位置。 如果指定大小，则iconAnchor默认为图标中心点，也可以在带有负边距的CSS中设置。设置后horizontalOrigin、verticalOrigin即失效。
     * @property [popupAnchor] - popup弹窗相对于图标的锚点“打开”的点的坐标。
     * @property [tooltipAnchor] - tooltip弹窗相对于图标的锚点“打开”的点的坐标。
     * @property [className] - 要分配给图标和阴影图像的自定义css类名称。
     * @property [shadowUrl] - 图标阴影图像的URL。如果未指定，将不会创建阴影图像。
     * @property [shadowRetinaUrl] - 用于Retina屏幕设备大尺寸版本的图标图像阴影图像的URL。如果未指定，将不会创建阴影图像。
     * @property [shadowSize] - 阴影部分的图片大小（单位：像素）
     * @property [shadowAnchor] - 阴影（相对于其左上角）的“提示”的坐标（与未指定的iconAnchor相同）。
     * @property [draggable = false] - 标记是否可以用鼠标/触摸拖动
     * @property [keyboard = true] - 标记是否可以用键盘按键并按回车键
     * @property [title] - 显示在标记悬停上的浏览器Tooltip提示的文本
     * @property [alt] - alt图标图像属性的文本（对辅助功能有用）
     * @property [zIndexOffset = 0] - 默认情况下，注记图片的叠置顺序由纬度自动设置.如果你想将某一注记放置于其他之上可用这个选项，设置一个较大的值即可，比如1000（或是相反地设置一个较大的负值）
     * @property [riseOnHover = false] - 如果为true，当您将鼠标悬停在其上时，标记将会放在其他顶部。
     * @property [riseOffset = 250] - 用于riseOnHover功能的z-index偏移量。
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [magic] - 使用magic加载动画，并指定其动画样式名称
     * @property [pulse] - 标识当前为pulse扩散动画点
     * @property [pulseColor = "red"] - pulse动画点的背景颜色
     * @property [pulseShadowColor = "red"] - pulse动画点的shadow颜色
     * @property [pulseDuration = 1] - pulse动画点单次动画时长（单位：秒）
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        image: string;
        iconUrl?: string;
        iconRetinaUrl?: string;
        opacity?: number;
        width?: number;
        height?: number;
        iconSize?: L.Point | number[];
        rotationAngle?: number;
        horizontalOrigin?: HorizontalOrigin;
        verticalOrigin?: VerticalOrigin;
        offsetX?: number;
        offsetY?: number;
        iconAnchor?: L.Point | number[];
        popupAnchor?: L.Point | number[];
        tooltipAnchor?: L.Point | number[];
        className?: string;
        shadowUrl?: string;
        shadowRetinaUrl?: string;
        shadowSize?: L.Point | number[];
        shadowAnchor?: L.Point | number[];
        draggable?: boolean;
        keyboard?: boolean;
        title?: string;
        alt?: string;
        zIndexOffset?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
        interactive?: boolean;
        magic?: string;
        pulse?: boolean;
        pulseColor?: boolean;
        pulseShadowColor?: boolean;
        pulseDuration?: boolean;
        highlight?: Marker.StyleOptions;
        label?: Label.StyleOptions;
    };
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * marker.on('move', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property move - 当标记通过 setLatLng 或者 dragging时触发。旧的和新的坐标包含在事件参数中oldLatLng，latlng
     * @property dragstart - 标记开始移动时发生（因为拖动）
     * @property movestart - 当绑定到当前图层的Popup弹窗打开时触发
     * @property drag - 当用户拖动注记时不断触发
     * @property dragend - 当用户停止拖动注记时触发
     * @property moveend - 当标记停止移动（由于拖动）时发出 * @property {String} add 在矢量数据添加到图层(或地图)上之后触发
     * @property remove - 在矢量数据从图层(或地图)上移除之后触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        move: string;
        dragstart: string;
        movestart: string;
        drag: string;
        dragend: string;
        moveend: string;
        remove: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 图标点Marker 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Marker extends L.Marker {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: Marker.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 返回图标点的LatLng经纬度对象
     * @returns 经纬度对象
     */
    getLatLng(): any | L.LatLng;
    /**
     * 修改位置
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng): any | Marker;
    /**
     * 改变zIndex顺序
     * @param offset - zIndex顺序
     * @returns 当前对象本身，可以链式调用
     */
    setZIndexOffset(offset: number): any | Marker;
    /**
     * 改变透明度
     * @param opacity - 透明度
     * @returns 当前对象本身，可以链式调用
     */
    setOpacity(opacity: number): any | Marker;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | Marker;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Marker;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | Marker;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | Marker;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | Marker;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | Marker;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | Marker;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | Marker;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | Marker;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | Marker;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | Marker;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | Marker;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Marker;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Marker;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置
     */
    latlng: L.LatLng;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[];
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 获取对象的DOM容器
     */
    readonly container: HTMLElement;
    /**
     * 获取当前图标对应DIV的高宽，返回结果示例：{width:10,height;20}
     */
    readonly divSize: any;
    /**
     * 是否显示测试点，可以进行用于比较测试div的位置，方便调试CSS。
     */
    testPoint: boolean;
    /**
     * 设置 旋转角度（度数值，0-360度）
     * @param angle - 旋转角度（度数值，0-360度）
     * @returns 当前对象本身，可以链式调用
     */
    setRotationAngle(angle: number): any | Marker;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | Marker.StyleOptions): any | Marker;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
}

/**
 * 面积测量对象，
 * 非直接调用，由 Measure 类统一创建及管理
 * @param options - 参数对象，包括以下：
 * @param options.style - 样式信息
 * @param [options.attr] - 附件的属性信息，可以任意附加属性，导出geojson或json时会自动处理导出。
 * @param [options.label] - 测量结果文本的样式
 * @param [options.id] - 矢量数据id标识
 */
declare class AreaMeasure extends Polygon {
    constructor(options: {
        style: Polygon.StyleOptions;
        attr?: any;
        label?: Label.StyleOptions;
        id?: string | number;
    });
    /**
     * 测量结果
     */
    readonly measured: any;
    /**
     * 更新测量结果的文本
     * @param unit - 计量单位,{@link MeasureUtil#formatArea} 可选值：计量单位，可选值：auto、m、km、mu、ha 。auto时根据面积值自动选用m或km
     * @returns 无
     */
    updateText(unit: string): any | void;
}

/**
 * 距离量算对象，
 * 非直接调用，由 Measure 类统一创建及管理
 * @param options - 参数对象，包括以下：
 * @param options.style - 样式信息
 * @param [options.attr] - 附件的属性信息，可以任意附加属性，导出geojson或json时会自动处理导出。
 * @param [options.label] - 测量结果文本的样式
 * @param [options.id] - 矢量数据id标识
 */
declare class DistanceMeasure extends Polyline {
    constructor(options: {
        style: Polyline.StyleOptions;
        attr?: any;
        label?: Label.StyleOptions;
        id?: string | number;
    });
    /**
     * 测量结果
     */
    readonly measured: any;
    /**
     * 更新测量结果的文本
     * @param unit - 计量单位,{@link MeasureUtil#formatDistance} 可选值：auto、m、km、mile、zhang 等。auto时根据距离值自动选用k或km
     * @returns 无
     */
    updateText(unit: string): any | void;
}

/**
 * 运动图标点 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 运动的坐标轨迹点
 * @param options.durations - 运动轨迹点对应的时长（单位：毫秒）
 * @param [options.style] - 样式参数，还包括：<br/>
 * //  * @param {Boolean} [options.style.autostart] 是否添加后就开始运动
 * //  * @param {Boolean} [options.style.loop] 是否重复运动
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class MovingMarker extends Marker {
    constructor(options: {
        latlngs: L.LatLng[];
        durations: number[] | number;
        style?: Marker.StyleOptions | any;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 是否在运动中
     */
    readonly isRunning: boolean;
    /**
     * 是否已停止
     */
    readonly isEnded: boolean;
    /**
     * 是否启动了
     */
    readonly isStarted: boolean;
    /**
     * 是否暂停了
     */
    readonly isPaused: boolean;
    /**
     * 开始运动
     * @returns 当前对象本身，可以链式调用
     */
    start(): any | MovingMarker;
    /**
     * 继续运动
     * @returns 当前对象本身，可以链式调用
     */
    resume(): any | MovingMarker;
    /**
     * 暂停运动
     * @returns 当前对象本身，可以链式调用
     */
    pause(): any | MovingMarker;
    /**
     * 停止运动
     * @param [elapsedTime = 0] - 延迟时间
     * @returns 当前对象本身，可以链式调用
     */
    stop(elapsedTime?: number): any | MovingMarker;
    /**
     * 在轨迹尾部，添加新的坐标点
     * @param latlng - 坐标点
     * @param duration - 时长，单位 毫秒
     * @returns 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng, duration: number): any | MovingMarker;
    /**
     * 移动到新的位置
     * @param latlng - 坐标点
     * @param duration - 时长，单位 毫秒
     * @returns 当前对象本身，可以链式调用
     */
    moveTo(latlng: L.LatLng, duration: number): any | MovingMarker;
}

/**
 * 攻击箭头 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class AttackArrow extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 攻击箭头(平尾) 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class AttackArrowPW extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 攻击箭头（燕尾） 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class AttackArrowYW extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 军事标绘 矢量对象基类
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class BasePlot extends Polygon {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 向矢量对象添加一个给定点。
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng): any | Polygon;
}

/**
 * 闭合曲面(3个点) 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class CloseVurve extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 双箭头（钳击） 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class DoubleArrow extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 直箭头(2个点) 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class FineArrow extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 燕尾直箭头(2个点) 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class FineArrowYW extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 集结地(3个点) 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class GatheringPlace extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

/**
 * 直箭头(2个点) 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class StraightArrow extends BasePlot {
    constructor(options: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
}

declare namespace Point {
    /**
     * 像素圆点 支持的样式信息
     * @property pixelSize - 像素圆点的半径，单位为像素
     * @property [radius] - 同 pixelSize (别名)
     * @property [color = '#3388ff'] - 填充颜色
     * @property [opacity = 1.0] - 填充透明度，取值范围：0.0-1.0
     * @property [outline = true] - 是否边框
     * @property [outlineColor = '#3388ff'] - 边框颜色
     * @property [outlineOpacity = 1.0] - 边框透明度，取值范围：0.0-1.0
     * @property [outlineWidth = 2] - 边框宽度
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [renderer] - 使用的Renderer 特定实例。优先于地图的默认渲染器。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        pixelSize: number;
        radius?: number;
        color?: string;
        opacity?: number;
        outline?: boolean;
        outlineColor?: string;
        outlineOpacity?: number;
        outlineWidth?: number;
        interactive?: boolean;
        renderer?: L.Renderer;
        highlight?: Point.StyleOptions;
        label?: Label.StyleOptions;
    };
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * * @property {String} add 在矢量数据添加到图层(或地图)上之后触发
     * @example
     * //绑定监听事件
     * graphic.on('click', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property remove - 在矢量数据从图层(或地图)上移除之后触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        remove: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 像素圆点 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlng - 坐标位置
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Point extends L.CircleMarker {
    constructor(options: {
        latlng: L.LatLng | number[];
        style?: Point.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 返回半径值
     * @returns 半径值
     */
    getRadius(): any | number;
    /**
     * 修改半径值
     * @param radius - 半径值
     * @returns 当前对象本身，可以链式调用
     */
    setRadius(radius: number): any | Point;
    /**
     * 返回圆的LatLng经纬度对象
     * @returns 经纬度对象
     */
    getLatLng(): any | L.LatLng;
    /**
     * 修改位置
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng): any | Point;
    /**
     * 获取线的矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | Point;
    /**
     * 将线移动到所有路径层的顶部
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | Point;
    /**
     * 将线移动到所有路径层的底部
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | Point;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | Point;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Point;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | Point;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | Point;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | Point;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | Point;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | Point;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | Point;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | Point;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | Point;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | Point;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | Point;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Point;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Point;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置
     */
    latlng: L.LatLng;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[];
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 半径， 单位：像素
     */
    pixelSize: number;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | Point.StyleOptions): any | Point;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
}

declare namespace Polygon {
    /**
     * 面矢量对象 支持的样式信息
     * @property [fill = true] - 是否填充
     * @property [fillColor = '#3388ff'] - 填充颜色
     * @property [fillOpacity = 1.0] - 填充透明度，取值范围：0.0-1.0
     * @property [fillRule = 'evenodd'] - 用于定义填充形状
     * @property [image] - 填充的图片的url
     * @property [imageOpacity = 1.0] - 填充图片的透明度
     * @property [outline = true] - 是否边框
     * @property [outlineColor = '#3388ff'] - 边框颜色
     * @property [outlineOpacity = 1.0] - 边框透明度，取值范围：0.0-1.0
     * @property [outlineWidth = 2] - 边框宽度
     * @property [lineCap = 'round'] - 边框中，线两段使用的形状, 如: butt、round、square
     * @property [lineJoin = 'round'] - 边框中，线转折处使用的形状, 如: miter、round、bevel
     * @property [dashArray] - 边框中，定义虚线线型，用于定义笔划模式,如："5, 10" 、 "5, 5, 1, 5"
     * @property [dashOffset] - 边框中，指定了dash模式到路径开始的距离，如果使用了一个百分比值，那么这个值就代表了当前viewport的一个百分比,值可以取为负值。
     * @property [smoothFactor = 1.0] - 边框中，数值的大小可以简化每个缩放级别的折线。更多的意味着更好的性能和更平滑的外观，而更少的意味着更准确的表示。
     * @property [noClip = false] - 边框中，禁用折线裁剪
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [renderer] - 使用的Renderer 特定实例。优先于地图的默认渲染器。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        fill?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        fillRule?: string;
        image?: string;
        imageOpacity?: number;
        outline?: boolean;
        outlineColor?: string;
        outlineOpacity?: number;
        outlineWidth?: number;
        lineCap?: string;
        lineJoin?: string;
        dashArray?: string;
        dashOffset?: string;
        smoothFactor?: number;
        noClip?: boolean;
        interactive?: boolean;
        renderer?: L.Renderer;
        highlight?: Polygon.StyleOptions;
        label?: Label.StyleOptions;
    };
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * * @property {String} add 在矢量数据添加到图层(或地图)上之后触发
     * @example
     * //绑定监听事件
     * graphic.on('click', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property remove - 在矢量数据从图层(或地图)上移除之后触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        remove: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 面 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Polygon extends L.Polygon {
    constructor(options: {
        latlngs: L.LatLng[] | any;
        style?: Polygon.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 返回矢量对象的坐标点的数组，或者在多矢量对象的情况下返回嵌套的点阵列。
     * @returns 经纬度数组
     */
    getLatLngs(): any | L.LatLng[];
    /**
     * 用给定的地理位置数组代替更新矢量对象中的所有点。
     * @param latlngs - 经纬度数组
     * @returns 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[]): any | Polygon;
    /**
     * 向矢量对象添加一个给定点。
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng): any | Polygon;
    /**
     * 获取线的矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | Polygon;
    /**
     * 将线移动到所有路径层的顶部
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | Polygon;
    /**
     * 将线移动到所有路径层的底部
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | Polygon;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | Polygon;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Polygon;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | Polygon;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | Polygon;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | Polygon;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | Polygon;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | Polygon;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | Polygon;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | Polygon;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | Polygon;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | Polygon;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | Polygon;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Polygon;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Polygon;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[];
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 周长距离（单位：米）
     */
    readonly distance: number;
    /**
     * 面积（单位：平方米）
     */
    readonly area: number;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | Polygon.StyleOptions): any | Polygon;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
    /**
     * 判断指定坐标是否在当前面内
     * @param latlng - 坐标
     * @returns 是否在面内
     */
    isInPoly(latlng: L.LatLng): any | boolean;
}

declare namespace Polyline {
    /**
     * 线矢量对象 支持的样式信息
     * @property [color = '#3388ff'] - 颜色
     * @property [opacity = 1.0] - 透明度，取值范围：0.0-1.0
     * @property [width = 2] - 线宽
     * @property [offset] - 平行偏移值（像素），可用于平行线
     * @property [gradientColors] - 多颜色线时，颜色数组
     * @property [lineCap = 'round'] - 在线两段使用的形状, 如: butt、round、square
     * @property [lineJoin = 'round'] - 在线转折处使用的形状, 如: miter、round、bevel
     * @property [dashArray] - 定义虚线线型，用于定义笔划模式,如："5, 10" 、 "5, 5, 1, 5"
     * @property [dashOffset] - 指定了dash模式到路径开始的距离，如果使用了一个百分比值，那么这个值就代表了当前viewport的一个百分比,值可以取为负值。
     * @property [smoothFactor = 1.0] - 数值的大小可以简化每个缩放级别的折线。更多的意味着更好的性能和更平滑的外观，而更少的意味着更准确的表示。
     * @property [noClip = false] - 禁用折线裁剪
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [renderer] - 使用的Renderer 特定实例。优先于地图的默认渲染器。
     * @property [snakingSpeed = 300] - 在snakeIn方法中的速度（像素/秒）
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        color?: string;
        opacity?: number;
        width?: number;
        offset?: number;
        gradientColors?: string[];
        lineCap?: string;
        lineJoin?: string;
        dashArray?: string;
        dashOffset?: string;
        smoothFactor?: number;
        noClip?: boolean;
        interactive?: boolean;
        renderer?: L.Renderer;
        snakingSpeed?: number;
        highlight?: Polyline.StyleOptions;
        label?: Label.StyleOptions;
    };
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * graphic.on('click', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property add - 在矢量数据添加到图层(或地图)上之后触发
     * @property remove - 在矢量数据从图层(或地图)上移除之后触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        add: string;
        remove: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 线 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Polyline extends L.Polyline {
    constructor(options: {
        latlngs: L.LatLng[] | any;
        style?: Polyline.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 返回折线的坐标点的数组，或者在多折线的情况下返回嵌套的点阵列。
     * @returns 经纬度数组
     */
    getLatLngs(): any | L.LatLng[];
    /**
     * 用给定的地理位置数组代替更新折线中的所有点。
     * @param latlngs - 经纬度数组
     * @returns 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[]): any | Polyline;
    /**
     * 向折线添加一个给定点。 默认情况下，在多折线的情况下，将折线的第一个线添加，但可以通过将特定的线作为LatLng数组（您可以使用之前访问getLatLngs）来覆盖。
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng): any | Polyline;
    /**
     * 获取线的矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | Polyline;
    /**
     * 将线移动到所有路径层的顶部
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | Polyline;
    /**
     * 将线移动到所有路径层的底部
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | Polyline;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | Polyline;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Polyline;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | Polyline;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | Polyline;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | Polyline;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | Polyline;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | Polyline;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | Polyline;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | Polyline;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | Polyline;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | Polyline;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | Polyline;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Polyline;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Polyline;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[];
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 距离（单位：米）
     */
    readonly distance: number;
    /**
     * 围合的面积（单位：平方米）
     */
    readonly area: number;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | Polyline.StyleOptions): any | Polyline;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
    /**
     * 设置线的偏移值，常用于平行线
     * @param offset - 偏移值（像素）
     * @returns 当前对象本身，可以链式调用
     */
    setOffset(offset: number): any | Polyline;
}

declare namespace Rectangle {
    /**
     * 矩形矢量对象 支持的样式信息
     * @property [fill = true] - 是否填充
     * @property [fillColor = '#3388ff'] - 填充颜色
     * @property [fillOpacity = 1.0] - 填充透明度，取值范围：0.0-1.0
     * @property [image] - 填充的图片的url
     * @property [imageOpacity = 1.0] - 填充图片的透明度
     * @property [fillRule = 'evenodd'] - 用于定义填充形状
     * @property [outline = true] - 是否边框
     * @property [outlineColor = '#3388ff'] - 边框颜色
     * @property [outlineOpacity = 1.0] - 边框透明度，取值范围：0.0-1.0
     * @property [outlineWidth = 2] - 边框宽度
     * @property [lineCap = 'round'] - 边框中，线两段使用的形状, 如: butt、round、square
     * @property [lineJoin = 'round'] - 边框中，线转折处使用的形状, 如: miter、round、bevel
     * @property [dashArray] - 边框中，定义虚线线型，用于定义笔划模式,如："5, 10" 、 "5, 5, 1, 5"
     * @property [dashOffset] - 边框中，指定了dash模式到路径开始的距离，如果使用了一个百分比值，那么这个值就代表了当前viewport的一个百分比,值可以取为负值。
     * @property [smoothFactor = 1.0] - 边框中，数值的大小可以简化每个缩放级别的折线。更多的意味着更好的性能和更平滑的外观，而更少的意味着更准确的表示。
     * @property [noClip = false] - 边框中，禁用折线裁剪
     * @property [interactive = true] - 是否触发鼠标事件，如果false，该层不会发出鼠标事件，并且将作为底层地图的一部分。
     * @property [renderer] - 使用的Renderer 特定实例。优先于地图的默认渲染器。
     * @property [highlight] - 【预留功能，待后续版本开发】鼠标移入或单击(type:'click')后的对应高亮的部分样式，创建Graphic后也可以openHighlight、closeHighlight方法来手动调用
     * @property [label] - 【预留功能，待后续版本开发】支持附带文字的显示
     */
    type StyleOptions = {
        fill?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        image?: string;
        imageOpacity?: number;
        fillRule?: string;
        outline?: boolean;
        outlineColor?: string;
        outlineOpacity?: number;
        outlineWidth?: number;
        lineCap?: string;
        lineJoin?: string;
        dashArray?: string;
        dashOffset?: string;
        smoothFactor?: number;
        noClip?: boolean;
        interactive?: boolean;
        renderer?: L.Renderer;
        highlight?: Rectangle.StyleOptions;
        label?: Label.StyleOptions;
    };
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * * @property {String} add 在矢量数据添加到图层(或地图)上之后触发
     * @example
     * //绑定监听事件
     * graphic.on('click', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property remove - 在矢量数据从图层(或地图)上移除之后触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        remove: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 矩形 矢量对象
 * @param options - 参数对象，包括以下：
 * @param options.latlngs - 坐标数组
 * @param [options.style] - 样式参数
 * @param [options.attr] - 属性信息
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param [options.popupOptions] - popup弹窗时的配置参数
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数
 * @param [options.id] - 矢量数据id标识
 */
declare class Rectangle extends L.Rectangle {
    constructor(options: {
        latlngs: L.LatLng[] | L.LatLngBounds;
        style?: Rectangle.StyleOptions;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
    });
    /**
     * 用传递的LatLngBounds边界重绘矩形。
     * @param latLngBounds - 边界
     * @returns 当前对象本身，可以链式调用
     */
    setBounds(latLngBounds: L.LatLngBounds): any | Rectangle;
    /**
     * 返回矢量对象的坐标点的数组，或者在多矢量对象的情况下返回嵌套的点阵列。
     * @returns 经纬度数组
     */
    getLatLngs(): any | L.LatLng[];
    /**
     * 用给定的地理位置数组代替更新矢量对象中的所有点。
     * @param latlngs - 经纬度数组
     * @returns 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[]): any | Rectangle;
    /**
     * 向矢量对象添加一个给定点。
     * @param latlng - 经纬度对象
     * @returns 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng): any | Rectangle;
    /**
     * 获取线的矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | Rectangle;
    /**
     * 将线移动到所有路径层的顶部
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | Rectangle;
    /**
     * 将线移动到所有路径层的底部
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | Rectangle;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | Rectangle;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Rectangle;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | Rectangle;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | Rectangle;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | Rectangle;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | Rectangle;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | Rectangle;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | Rectangle;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | Rectangle;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | Rectangle;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | Rectangle;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | Rectangle;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Rectangle;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Rectangle;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[];
    /**
     * 矩形的边线坐标集合
     */
    readonly outlineLatlngs: L.LatLng[];
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][];
    /**
     * 中心点
     */
    readonly center: L.LatLng;
    /**
     * 周长距离（单位：米）
     */
    readonly distance: number;
    /**
     * 面积（单位：平方米）
     */
    readonly area: number;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 设置 样式信息 的钩子方法
     * @param newStyle - 本次更新的部分样式信息,内部会合并属性
     * @returns 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any | Rectangle.StyleOptions): any | Rectangle;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param [options] - 参数对象:
     * @param [options.precision] - 保留经纬度的小数位数
     * @returns GeoJSON格式规范对象
     */
    toGeoJSON(options?: any | {
        precision?: number;
    }): any | any;
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns 导出的坐标、样式及属性等信息
     */
    toJSON(): any | any;
    /**
     * 判断指定坐标是否在当前矩形内
     * @param latlng - 坐标
     * @returns 是否在矩形内
     */
    isInPoly(latlng: L.LatLng): any | boolean;
}

/**
 * 大数据Marker点 图层（基于Canvas渲染）
 * @param options - 参数对象，包括以下：
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class CanvasMarkerLayer extends L.Layer {
    constructor(options: {
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | CanvasMarkerLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 添加 图标点矢量对象 到本图层
     * @param marker - 图标点矢量对象
     * @returns 当前对象本身，可以链式调用
     */
    addGraphic(marker: Marker): any | CanvasMarkerLayer;
    /**
     * 添加 图标点矢量对象数组 到本图层
     * @param markers - 图标点矢量对象数组
     * @returns 当前对象本身，可以链式调用
     */
    addGraphics(markers: Marker[]): any | CanvasMarkerLayer;
    /**
     * 移除指定矢量对象
     * @param marker - 指定矢量对象
     * @param [redraw = true] - 是否重绘
     * @returns 当前对象本身，可以链式调用
     */
    removeGraphic(marker: Marker, redraw?: boolean): any | CanvasMarkerLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | CanvasMarkerLayer;
    /**
     * 清除图层内所有矢量数据
     * @returns 无
     */
    clear(): any | void;
    /**
     * 增加绑定鼠标单击事件
     * @param listener - 事件方法
     * @returns 当前对象本身，可以链式调用
     */
    addOnClickListener(listener: (...params: any[]) => any): any | CanvasMarkerLayer;
    /**
     * 增加绑定鼠标移入事件
     * @param listener - 事件方法
     * @returns 当前对象本身，可以链式调用
     */
    addOnHoverListener(listener: (...params: any[]) => any): any | CanvasMarkerLayer;
}

declare namespace ClusterLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * markers.on('clusterclick', function (a) {
     *  a.layer.zoomToBounds({padding: [20, 20]});
     * });
     * @property clusterclick - 单击聚合点
     * @property clustermouseover - 鼠标移入聚合点
     * @property clustermouseout - 鼠标移出聚合点
     * @property animationend - 当标记聚类/非聚集动画完成时触发
     * @property spiderfied - 当重叠的标记被spiderified时触发（Contains cluster和markersattributes）
     * @property unspiderfied - 当重叠标记得到隐藏时触发（Contains cluster和markersattributes）
     */
    type EventType = {
        clusterclick: string;
        clustermouseover: string;
        clustermouseout: string;
        animationend: string;
        spiderfied: string;
        unspiderfied: string;
    };
}

/**
 * 聚合点 图层
 * @param options - 参数对象，包括以下：
 * @param [options.zoomToBoundsOnClick = true] - 当你点击一个集群时，是否缩放到它的边界
 * @param [options.showCoverageOnHover = true] - 将鼠标悬停在集群上时，是否显示其标记的边界
 * @param [options.spiderLegPolylineOptions] - 允许你指定聚群单击散开的连接线样式。
 * @param [options.polygonOptions] - 集群的Polygon边界的样式
 * @param [options.maxClusterRadius = 80] - 集群将从中央标记覆盖的最大半径（以像素为单位）。减少会使更多，更小的群集。 您也可以使用接受当前地图缩放的函数，并以像素为单位返回最大群集半径。
 * @param [options.singleMarkerMode = false] - 如果设置为true，则覆盖所有添加标记的图标，使其显示为1尺寸的群集。注意：标记不会被集群对象替换，只会替换它们的图标。因此，他们仍然对正常事件作出反应，选项disableClusteringAtZoom不会恢复其以前的图标
 * @param [options.removeOutsideVisibleBounds = true] - 当离开视图太远的集群和标记，是否将其从地图中移除以获得性能。
 * @param [options.spiderfyOnMaxZoom = true] - 当在最底层级别时，点击一个集群时，如果他们重叠着，我们是否可以通过spiderLeg连接线散开方式看到它的所有标记。
 * @param [options.spiderfyDistanceMultiplier = 1] - 从1增加增加距离中心的距离，spiderfied marker被放置。如果您使用大标记图标，则使用
 * @param [options.animate = true] - 在缩放时是否有平滑分割/合并群集子项的动画。如果L.DomUtil.TRANSITION为false，则此选项不起作用（不可能有动画）
 * @param [options.chunkedLoading = false] - 在执行addLayer方法时，将处理分成很小的时间间隔，这样页面就不会冻结。
 * @param [options.chunkInterval = 200] - 在执行addLayer方法时， 暂停之前让页面的其他部分处理的时间间隔（以毫秒为单位）。 特别是，这样可以防止页面在添加大量标记时被冻结。
 * @param [options.chunkDelay = 50] - 在执行addLayer方法时， 连续处理周期之间的时间延迟（以毫秒为单位）
 * @param [options.chunkProgress = true] - 在每个chunkInterval结尾调用的回调函数。通常用于实现进度指示器。
 * @param [options.iconCreateFunction] - 自定义创建集群图标的功能
 * @param [options.disableClusteringAtZoom] - 如果设置，在此缩放级别及以下，标记将不会聚集,注意：在使用disableClusteringAtZoom时，您可能有兴趣禁用spiderfyOnMaxZoom选项。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ClusterLayer extends L.Layer {
    constructor(options: {
        zoomToBoundsOnClick?: boolean;
        showCoverageOnHover?: boolean;
        spiderLegPolylineOptions?: Polyline.StyleOptions | any;
        polygonOptions?: Polygon.StyleOptions | any;
        maxClusterRadius?: number | ((...params: any[]) => any);
        singleMarkerMode?: boolean;
        removeOutsideVisibleBounds?: boolean;
        spiderfyOnMaxZoom?: boolean;
        spiderfyDistanceMultiplier?: number;
        animate?: boolean;
        chunkedLoading?: boolean;
        chunkInterval?: number;
        chunkDelay?: number;
        chunkProgress?: boolean;
        iconCreateFunction?: (...params: any[]) => any;
        disableClusteringAtZoom?: number;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 想要获取标记的可见父项（自身或包含在其中的群集当前在地图上可见）。
     * @param marker - 标记
     * @returns 可见父项（自身或包含在其中的群集当前在地图上可见）。 如果标记及其父集合当前不可见，则返回null（它们不在可见视点附近）
     */
    getVisibleParent(marker: Marker): any | Marker;
    /**
     * 如果您已自定义群集图标以使用所包含标记中的某些数据，并且之后数据发生更改，请使用此方法强制刷新群集图标。
     * @example
     * //没有参数强制重新绘制标记集群组中的所有集群图标。
     * markers.refreshClusters();
     * //用一个标记。
     * markers.refreshClusters(myMarker);
     * //使用一个数组或一个标记映射来强制只重新绘制它们的父集群。
     * markers.refreshClusters([myMarker0, myMarker33]);
     * markers.refreshClusters({id_0: myMarker0, id_any: myMarker33});
     * @param [markers] - 标记
     * @returns 当前对象本身，可以链式调用
     */
    refreshClusters(markers?: Marker | Marker[]): any | ClusterLayer;
    /**
     * 缩放以显示给定的标记（如果需要的话，spiderfying），当标记在地图上可见时调用回调。
     * @param marker - 标记
     * @param callback - 标记
     * @returns 当前对象本身，可以链式调用
     */
    zoomToShowLayer(marker: Marker, callback: (...params: any[]) => any): any | ClusterLayer;
    /**
     * 将图层置于所有图层之上
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | ClusterLayer;
    /**
     * 将图层置于所有图层之下
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | ClusterLayer;
    /**
     * 获取图层矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 将图层内的矢量数据转为GeoJSON格式对象
     * @returns 返回GeoJSON格式对象（作为GeoJSON GeometryCollection）。
     */
    toGeoJSON(): any | any;
    /**
     * 调用setZIndex此组中包含的每个图层，传递z-index。
     * @param zIndex - 图层顺序值
     * @returns 当前对象本身，可以链式调用
     */
    setZIndex(zIndex: number): any | ClusterLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | ClusterLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | ClusterLayer;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | ClusterLayer;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | ClusterLayer;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | ClusterLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | ClusterLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | ClusterLayer;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | ClusterLayer;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | ClusterLayer;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | ClusterLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | ClusterLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | ClusterLayer;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | ClusterLayer;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | ClusterLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 添加 图标点矢量对象 到本图层
     * @param graphic - 图标点矢量对象
     * @returns 当前对象本身，可以链式调用
     */
    addGraphic(graphic: Marker): any | ClusterLayer;
    /**
     * 移除指定矢量对象
     * @param graphic - 指定矢量对象
     * @returns 当前对象本身，可以链式调用
     */
    removeGraphic(graphic: Marker): any | ClusterLayer;
    /**
     * 是否包含Graphic矢量数据
     * @param graphic - 矢量数据
     * @returns 是否包含
     */
    hasGraphic(graphic: any): any | boolean;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    eachGraphic(method: (...params: any[]) => any, context?: any): any | ClusterLayer;
    /**
     * 清除图层内所有矢量数据
     * @returns 无
     */
    clear(): any | void;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的数据范围
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyTo(options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | ClusterLayer;
}

/**
 * 昼夜区域 图层
 * @param options - 参数对象，包括以下：
 * @param [options.time = new Date()] - 当前时间
 * @param [options.fillColor = "#00"] - 填充颜色
 * @param [options.fillOpacity = 0.5] - 填充透明度
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class DayNightLayer extends L.Polygon {
    constructor(options: {
        time?: Date;
        fillColor?: string;
        fillOpacity?: number;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 设置当前时间
     * @param date - 时间
     * @returns 当前对象本身，可以链式调用
     */
    setTime(date: Date): any | DayNightLayer;
}

declare namespace GeoJsonLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * geojsonLayer.on('load', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property load - geojson数据加载完成
     * @property layeradd - 添加矢量数据之后触发
     * @property layerremove - 移除矢量数据之后触发
     * @property add - 添加到map地图上之后触发
     * @property remove - 从地图map上移除之后触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        load: string;
        layeradd: string;
        layerremove: string;
        add: string;
        remove: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * GeoJSON 矢量数据 图层
 * @param options - 参数对象，包括以下：
 * @param [options.url] - geojson文件或服务url地址
 * @param [options.data] - geojson格式规范数据对象，与url二选一即可。
 * @param [options.crs] - 原始数据的坐标系，如'EPSG:3857'
 * @param [options.chinaCRS] - 标识数据的国内坐标系（用于自动纠偏或加偏）
 * @param [options.format] - 可以对加载的geojson数据进行格式化或转换操作
 * @param [options.onCreateGraphic] - 解析geojson后，外部自定义方法来创建Graphic对象
 * @param [options.mask] - 标识是否绘制区域边界的反选遮罩层
 * @param [options.graphicOptions] - 默认的graphic的构造参数，每种不同类型数据都有不同的属性，具体见各{@link GraphicType}矢量数据的构造参数。
 * @param [options.queryParameters] - 一个对象，其中包含在检索URL资源时将发送的查询参数。比如：queryParameters: {'access_token': '123-435-456-000'}
 * @param [options.headers] - 一个对象，将发送URL的其他HTTP标头。比如：headers: { 'X-My-Header': 'valueOfHeader' }
 * @param [options.symbol] - 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param [options.symbol.type] - 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param options.symbol.styleOptions - Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param [options.symbol.styleField] - 按 styleField 属性设置不同样式。
 * @param [options.symbol.styleFieldOptions] - 按styleField值与对应style样式的键值对象。
 * @param [options.symbol.callback] - 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param [options.popupOptions] - popup弹窗时的配置参数,还包括：
 * @param [options.popupOptions.title] - 固定的标题名称
 * @param [options.popupOptions.titleField] - 标题对应的属性字段名称
 * @param [options.popupOptions.noTitle] - 不显示标题
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑定，参数与popup属性完全相同。
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数,还包括：
 * @param [options.tooltipOptions.title] - 固定的标题名称
 * @param [options.tooltipOptions.titleField] - 标题对应的属性字段名称
 * @param [options.tooltipOptions.noTitle] - 不显示标题
 * @param [options.contextmenuItems] - 绑定的右键菜单值，也可以bindContextMenu方法绑定
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.zIndex] - 瓦片层的显式zIndex
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GeoJsonLayer extends GraphicLayer {
    constructor(options: {
        url?: string;
        data?: any;
        crs?: string;
        chinaCRS?: ChinaCRS;
        format?: (...params: any[]) => any;
        onCreateGraphic?: (...params: any[]) => any;
        mask?: boolean | any;
        graphicOptions?: any;
        queryParameters?: any;
        headers?: any;
        symbol?: {
            type?: GraphicType | string;
            styleOptions: any;
            styleField?: string;
            styleFieldOptions?: any;
            callback?: (...params: any[]) => any;
        };
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        popupOptions?: {
            title?: string;
            titleField?: string;
            noTitle?: string;
        };
        tooltip?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any;
        tooltipOptions?: {
            title?: string;
            titleField?: string;
            noTitle?: string;
        };
        contextmenuItems?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        zIndex?: number;
        pane?: string;
    });
    /**
     * 加载新数据 或 刷新数据
     * @param [newOptions] - 新设定的参数，会与类的构造参数合并。
     * @param [newOptions.url] - geojson文件或服务url地址
     * @param [newOptions.data] - geojson格式规范数据对象，与url二选一即可。
     * @param [newOptions.类参数] - 包含当前类支持的所有参数
     * @param [newOptions.通用参数] - 包含父类支持的所有参数
     * @returns 当前对象本身，可以链式调用
     */
    load(newOptions?: {
        url?: string;
        data?: any;
        类参数?: any;
        通用参数?: any;
    }): any | GeoJsonLayer;
    /**
     * 将图层内的矢量数据转为GeoJSON格式对象
     * @returns 返回GeoJSON格式对象（作为GeoJSON GeometryCollection）。
     */
    toGeoJSON(): any | any;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
}

declare namespace GraphicLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * graphicLayer.on('popupopen', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property layeradd - 添加矢量数据之后触发
     * @property layerremove - 移除矢量数据之后触发
     * @property add - 添加到map地图上之后触发
     * @property remove - 从地图map上移除之后触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     * @property drawStart - 开始绘制 标绘事件
     * @property drawMouseMove - 正在移动鼠标中，绘制过程中鼠标移动了点 标绘事件
     * @property drawAddPoint - 绘制过程中增加了点 标绘事件
     * @property drawRemovePoint - 绘制过程中删除了最后一个点 标绘事件
     * @property drawCreated - 创建完成 标绘事件
     * @property editStart - 开始编辑 标绘事件
     * @property editMouseMove - 正在移动鼠标中，正在编辑拖拽修改点中标绘事件
     * @property editMovePoint - 编辑修改了点标绘事件
     * @property editRemovePoint - 编辑删除了点 标绘事件
     * @property editAddPoint - 编辑增加了中间点标绘事件
     * @property editStyle - 图上编辑修改了相关style属性 标绘事件
     * @property editStop - 停止编辑 标绘事件
     */
    type EventType = {
        layeradd: string;
        layerremove: string;
        add: string;
        remove: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
        drawStart: string;
        drawMouseMove: string;
        drawAddPoint: string;
        drawRemovePoint: string;
        drawCreated: string;
        editStart: string;
        editMouseMove: string;
        editMovePoint: string;
        editRemovePoint: string;
        editAddPoint: string;
        editStyle: string;
        editStop: string;
    };
}

/**
 * 矢量数据图层
 * @param [options] - 参数对象，包括以下：
 * @param [options.hasEdit = false] - 是否自动激活编辑（true时，单击后自动激活编辑）
 * @param [options.isAutoEditing = true] - 完成标绘时是否自动启动编辑(需要hasEdit:true时)
 * @param [options.isContinued = false] - 是否连续标绘
 * @param [options.symbol] - 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param [options.symbol.type] - 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param options.symbol.styleOptions - Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param [options.symbol.styleField] - 按 styleField 属性设置不同样式。
 * @param [options.symbol.styleFieldOptions] - 按styleField值与对应style样式的键值对象。
 * @param [options.symbol.callback] - 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param [options.popupOptions] - popup弹窗时的配置参数,还包括：
 * @param [options.popupOptions.title] - 固定的标题名称
 * @param [options.popupOptions.titleField] - 标题对应的属性字段名称
 * @param [options.popupOptions.noTitle] - 不显示标题
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑定，参数与popup属性完全相同。
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数,还包括：
 * @param [options.tooltipOptions.title] - 固定的标题名称
 * @param [options.tooltipOptions.titleField] - 标题对应的属性字段名称
 * @param [options.tooltipOptions.noTitle] - 不显示标题
 * @param [options.contextmenuItems] - 绑定的右键菜单值，也可以bindContextMenu方法绑定
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.zIndex] - 瓦片层的显式zIndex
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GraphicLayer extends L.FeatureGroup {
    constructor(options?: {
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        isContinued?: boolean;
        symbol?: {
            type?: GraphicType | string;
            styleOptions: any;
            styleField?: string;
            styleFieldOptions?: any;
            callback?: (...params: any[]) => any;
        };
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        popupOptions?: {
            title?: string;
            titleField?: string;
            noTitle?: string;
        };
        tooltip?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any;
        tooltipOptions?: {
            title?: string;
            titleField?: string;
            noTitle?: string;
        };
        contextmenuItems?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        zIndex?: number;
        pane?: string;
    });
    /**
     * 将图层置于所有图层之上
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | GraphicLayer;
    /**
     * 将图层置于所有图层之下
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | GraphicLayer;
    /**
     * 获取图层矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 将图层内的矢量数据转为GeoJSON格式对象
     * @returns 返回GeoJSON格式对象（作为GeoJSON GeometryCollection）。
     */
    toGeoJSON(): any | any;
    /**
     * 调用setZIndex此组中包含的每个图层，传递z-index。
     * @param zIndex - 图层顺序值
     * @returns 当前对象本身，可以链式调用
     */
    setZIndex(zIndex: number): any | GraphicLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | GraphicLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | GraphicLayer;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | GraphicLayer;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | GraphicLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | GraphicLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | GraphicLayer;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | GraphicLayer;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | GraphicLayer;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | GraphicLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | GraphicLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | GraphicLayer;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | GraphicLayer;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | GraphicLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 是否自动激活编辑（true时，单击后自动激活编辑）
     */
    hasEdit: boolean;
    /**
     * 是否正在绘制中
     */
    readonly hasDrawing: boolean;
    /**
     * 是否正在编辑状态
     */
    readonly isEditing: boolean;
    /**
     * 图层内的Graphic矢量数据个数
     */
    readonly length: number;
    /**
     * 当前图层内的矢量数据数组
     */
    readonly graphics: L.Layer[];
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number;
    /**
     * 添加Graphic矢量数据
     * @param graphic - 待添加的矢量数据 或 矢量数据构造参数
     * @returns 矢量数据
     */
    addGraphic(graphic: L.Layer | any | L.Layer[]): any | L.Layer | L.Layer[];
    /**
     * 移除Graphic矢量数据
     * @param graphic - 矢量数据
     * @returns 当前对象本身，可以链式调用
     */
    removeGraphic(graphic: L.Layer): any | GraphicLayer;
    /**
     * 是否包含Graphic矢量数据
     * @param graphic - 矢量数据
     * @returns 是否包含
     */
    hasGraphic(graphic: any): any | boolean;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    eachGraphic(method: (...params: any[]) => any, context?: any): any | GraphicLayer;
    /**
     * 获取图层内 所有矢量数据
     * @returns 矢量数据数组
     */
    getGraphics(): any | L.Layer[];
    /**
     * 根据id取矢量数据对象
     * @param id - 矢量数据id
     * @returns 矢量数据对象
     */
    getGraphicById(id: number | string): any | L.Layer;
    /**
     * 清除图层内所有矢量数据
     * @returns 无
     */
    clear(): any | void;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 是否有绑定的右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    hasContextMenu(): any | boolean;
    /**
     * 将图层转为Json简单对象，用于存储后再传参加载
     * @returns Json简单对象
     */
    toJSON(): any | any;
    /**
     * 将图层内的矢量数据转为GeoJSON格式对象
     * @returns 返回GeoJSON格式对象（作为GeoJSON GeometryCollection）。
     */
    toGeoJSON(): any | any;
    /**
     * 加载转换GeoJSON格式规范数据为Graphic后加载到图层中。
     * @param geojson - GeoJSON格式规范数据
     * @param [options] - 加载控制参数,包含：
     * @param [options.clear = false] - 是否清除图层已有数据
     * @param [options.flyTo = false] - 是否加载完成后进行飞行到数据区域
     * @param [options.type] - 转为指定的类型
     * @param [options.style] - 可以设置指定style样式,每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
     * @param [options.crs] - 原始数据的坐标系，如'EPSG:3857' （可以从 {@link http://epsg.io }查询）
     * @param [options.onEachFeature] - 创建每个Graphic前的回调
     * @returns 转换后的Graphic对象数组
     */
    loadGeoJSON(geojson: string | any, options?: {
        clear?: boolean;
        flyTo?: boolean;
        type?: GraphicType | string;
        style?: any;
        crs?: string;
        onEachFeature?: (...params: any[]) => any;
    }): any | Marker[] | Polyline[] | Polygon[] | Circle[] | Rectangle[] | any;
    /**
     * 打开Popup弹窗
     * @param graphic - 矢量数据
     * @param [latlng] - 指定弹出的位置
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(graphic: Marker | Polyline | Polygon | any, latlng?: L.LatLng): any | GraphicLayer;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的数据范围
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyTo(options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | GraphicLayer;
    /**
     * 是否存在Popup绑定
     * @returns 是否存在Popup绑定
     */
    hasPopup(): any | boolean;
    /**
     * 是否绑定了tooltip
     * @returns 是否绑定
     */
    hasTooltip(): any | boolean;
    /**
     * 开始绘制矢量数据，绘制的数据会加载在当前图层。
     * @param options - Graphic构造参数,包含：
     * @param options.type - 类型
     * @param [options.style] - 按type支持 {@link GraphicType} 类的构造方法参数
     * @param [options.attr] - 附带的属性信息
     * @param [options.success] - 绘制创建完成的回调方法，同drawCreated事件，例如： success: function (graphic){  }
     * @returns 创建完成的矢量数据对象
     */
    startDraw(options: {
        type: GraphicType | string;
        style?: any;
        attr?: any;
        success?: (...params: any[]) => any;
    }): any | L.Layer;
    /**
     * 停止绘制，如有未完成的绘制会自动删除
     * @returns 当前对象本身,可以链式调用
     */
    stopDraw(): any | GraphicLayer;
    /**
     * 完成绘制和编辑，如有未完成的绘制会自动完成。
     * 在移动端需要调用此方法来类似PC端双击结束。
     * @returns 当前对象本身,可以链式调用
     */
    endDraw(): any | GraphicLayer;
    /**
     * 激活编辑，绑定相关处理，同 hasEdit=true
     * @returns 当前对象本身,可以链式调用
     */
    activateEdit(): any | GraphicLayer;
    /**
     * 释放编辑，解除绑定相关事件，同 hasEdit=false
     * @returns 当前对象本身,可以链式调用
     */
    disableEdit(): any | GraphicLayer;
    /**
     * 激活编辑指定的矢量数据
     * @param graphic - 需要激活编辑的矢量数据
     * @returns 当前对象本身,可以链式调用
     */
    startEditing(graphic: Marker | Polyline | Polygon | Circle | Rectangle | any): any | GraphicLayer;
    /**
     * 停止编辑，释放正在编辑的对象。
     * @param [graphic] - 需要停止编辑的矢量数据，默认为上一次正在编辑的对象
     * @returns 当前对象本身,可以链式调用
     */
    stopEditing(graphic?: Marker | Polyline | Polygon | Circle | Rectangle | any): any | GraphicLayer;
    /**
     * 销毁当前图层
     * @returns 无
     */
    destroy(): any | void;
}

/**
 * 经纬网 图层
 * @param options - 参数对象，包括以下：
 * @param [options.zoomInterval=[
        { start: 2, end: 2, interval: 40 },
        { start: 3, end: 3, interval: 20 },
        { start: 4, end: 4, interval: 10 },
        { start: 5, end: 7, interval: 5 },
        { start: 8, end: 10, interval: 1 },
        { start: 11, end: 11, interval: 0.5 },
        { start: 12, end: 12, interval: 0.2 },
        { start: 13, end: 20, interval: 0.1 },
      ]] - 不同层级的经纬网间隔配置
 * @param [options.show = true] - 是否渲染经纬网
 * @param [options.color = "#aaa"] - 线的颜色
 * @param [options.opacity = 1] - 线的透明度
 * @param [options.weight = 0.8] - 线的宽度
 * @param [options.showLabel = true] - 是否显示文本
 * @param [options.font = "12px Verdana"] - 文本的大小和字体
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GraticuleLayer extends L.Layer {
    constructor(options: {
        show?: boolean;
        color?: string;
        opacity?: number;
        weight?: number;
        showLabel?: boolean;
        font?: string;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 设置图层的是否渲染
     */
    show: boolean;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | GraticuleLayer;
    /**
     * 设置透明度
     * @param opacity - 透明度
     * @returns 当前对象本身，可以链式调用
     */
    setOpacity(opacity: number): any | GraticuleLayer;
    /**
     * 清除图层内所有矢量数据
     * @returns 无
     */
    clear(): any | void;
    /**
     * 绘制指定矩形区域的经纬网
     * @param bounds - 指定矩形区域,还包括：
     * @param bounds.row - 行数
     * @param bounds.col - 列数
     * @returns 当前对象本身，可以链式调用
     */
    customGrid(bounds: {
        row: number;
        col: number;
    }): any | GraticuleLayer;
}

/**
 * 热力图图层
 * @param [latlngs] - 坐标数组，每个点中的可选第三个参数altitude表示点强度。除非max指定选项，否则强度应介于0.0和之间1.0。
 * @param [options] - 参数对象，包括以下：
 * @param [options.minOpacity] - 热力开始时的最小不透明度
 * @param [options.maxZoom] - 点达到最大强度的缩放级别（强度随缩放缩放），maxZoom默认情况下等于地图
 * @param [options.max = 1.0] - 最大点强度
 * @param [options.radius = 25] - 默认情况下，热图的每个“点”的半径
 * @param [options.blur = 15] - 默认情况下的模糊量
 * @param [options.gradient] - 颜色渐变配置，例如：{0.4: 'blue', 0.65: 'lime', 1: 'red'}
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class HeatLayer extends L.Layer {
    constructor(latlngs?: L.LatLng[] | any, options?: {
        minOpacity?: number;
        maxZoom?: number;
        max?: number;
        radius?: number;
        blur?: number;
        gradient?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 设置新的坐标数组
     * @param latlngs - 坐标数组
     * @returns 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[]): any | HeatLayer;
    /**
     * 添加新的坐标点
     * @param latlng - 坐标
     * @returns 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng): any | HeatLayer;
    /**
     * 设置新的配置信息
     * @param options - 同当前类构造参数
     * @returns 当前对象本身，可以链式调用
     */
    setOptions(options: any): any | HeatLayer;
    /**
     * 重新绘制图层
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | HeatLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | HeatLayer;
}

/**
 * A `VectorGrid` is a generic, abstract class for displaying tiled vector data.
 * it provides facilities for symbolizing and rendering the data in the vector
 * tiles, but lacks the functionality to fetch the vector tiles from wherever
 * they are.
 * @param options - 参数对象
 */
declare class VectorGrid extends L.GridLayer {
    constructor(options: any);
}

/**
 * PBF矢量瓦片图层
 * @param options - 参数对象，包括以下：
 * @param options.url - WFS服务URL地址
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param [options.interactive = false] - 是否允许鼠标交互，比如触发单击事件
 * @param [options.style] - 样式设置，单图层传入样式对象或回调方法，多图层时传入图层名+对应的样式的键值对
 * @param [options.filter] - 筛选数据的回调方法
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.fetchOptions] - fetch方法请求瓦片时的第2个参数
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class PbfLayer extends VectorGrid {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        interactive?: boolean;
        style?: ((...params: any[]) => any) | any;
        filter?: (...params: any[]) => any;
        tms?: boolean;
        fetchOptions?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
}

/**
 * 网格 基类图层
 * @param options - 参数对象，包括以下：
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.cellSize = 512] - 网格中瓦片的宽度和高度。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class VirtualGrid extends L.Layer {
    constructor(options: {
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        cellSize?: number;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | VirtualGrid;
}

/**
 * WFS 矢量数据 图层
 * @param options - 参数对象，包括以下：
 * @param options.url - WMS服务的URL。
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param options.typeNS - 要包含的图层的空间名
 * @param options.typeName - 要包含的图层名
 * @param [options.geometryField = "the_geom"] - 服务内的geometry字段名称
 * @param [options.filter] - 筛选数据，如 new L.Filter.Like("OBJECTID", 68) 更多filter参考{@link https://github.com/Flexberry/Leaflet-WFST#filter}
 * @param [options.minZoom = 0] - 最小的缩放级别，一般建议设置大些，与图层数据量有关系。
 * @param [options.maxZoom = 21] - 最大的缩放级别
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.cellSize = 512] - 网格中瓦片的宽度和高度。
 * @param [options.maxFeatures = 2000] - 每次请求的返回的最大矢量对象数量
 * @param [options.symbol] - 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param [options.symbol.type] - 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param options.symbol.styleOptions - Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param [options.symbol.styleField] - 按 styleField 属性设置不同样式。
 * @param [options.symbol.styleFieldOptions] - 按styleField值与对应style样式的键值对象。
 * @param [options.symbol.callback] - 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param [options.popup] - 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param [options.popupOptions] - popup弹窗时的配置参数,还包括：
 * @param [options.popupOptions.title] - 固定的标题名称
 * @param [options.popupOptions.titleField] - 标题对应的属性字段名称
 * @param [options.popupOptions.noTitle] - 不显示标题
 * @param [options.tooltip] - 绑定的tooltip弹窗值，也可以bindTooltip方法绑定，参数与popup属性完全相同。
 * @param [options.tooltipOptions] - tooltip弹窗时的配置参数,还包括：
 * @param [options.tooltipOptions.title] - 固定的标题名称
 * @param [options.tooltipOptions.titleField] - 标题对应的属性字段名称
 * @param [options.tooltipOptions.noTitle] - 不显示标题
 * @param [options.contextmenuItems] - 绑定的右键菜单值，也可以bindContextMenu方法绑定
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class WfsLayer extends VirtualGrid {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        typeNS: string;
        typeName: string;
        geometryField?: string;
        filter?: any;
        minZoom?: number;
        maxZoom?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        cellSize?: number;
        maxFeatures?: number;
        symbol?: {
            type?: GraphicType | string;
            styleOptions: any;
            styleField?: string;
            styleFieldOptions?: any;
            callback?: (...params: any[]) => any;
        };
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        popupOptions?: {
            title?: string;
            titleField?: string;
            noTitle?: string;
        };
        tooltip?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any;
        tooltipOptions?: {
            title?: string;
            titleField?: string;
            noTitle?: string;
        };
        contextmenuItems?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 设置覆盖的透明度
     * @param opacity - 透明度，取值范围 0-1
     * @returns 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number): any | WfsLayer;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    eachGraphic(method: (...params: any[]) => any, context?: any): any | WfsLayer;
    /**
     * 清除图层内所有矢量数据
     * @returns 无
     */
    clear(): any | void;
    /**
     * 根据id取矢量数据对象
     * @param id - 矢量数据id
     * @returns 矢量数据对象
     */
    getGraphicById(id: number): any | L.Layer;
    /**
     * 将图层置于所有图层之下
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | WfsLayer;
    /**
     * 将图层置于所有图层之上
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | WfsLayer;
    /**
     * 获取图层矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 定位地图至当前图层数据区域
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyTo(options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | WfsLayer;
}

declare namespace GroupLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * groupLayer.on('add', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property add - 在图层添加到地图上之后触发
     * @property remove - 在图层从地图上移除之后触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        add: string;
        remove: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 图层组  图层
 * @param [options] - 参数对象，包括以下：
 * @param [options.layers] - 子图层列表,支持 {@link LayerType} 所有图层
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GroupLayer extends L.LayerGroup {
    constructor(options?: {
        layers?: L.Layer | any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 将图层内的矢量数据转为GeoJSON格式对象
     * @returns 返回GeoJSON格式对象（作为GeoJSON GeometryCollection）。
     */
    toGeoJSON(): any | any;
    /**
     * 判断图层是否存在当前图层组中
     * @returns 如果给定图层当前已添加到组中，则返回true。
     */
    hasLayer(): any | boolean;
    /**
     * 从组中删除所有图层
     * @returns 当前对象本身，可以链式调用
     */
    clearLayers(): any | GroupLayer;
    /**
     * 遍历当前的所有子图层
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    eachLayer(method: (...params: any[]) => any, context?: any): any | GroupLayer;
    /**
     * 获取指定id的图层
     * @param id - 图层id
     * @returns 图层
     */
    getLayer(id: number): any | L.Layer;
    /**
     * 获取图层的id
     * @param layer - 图层
     * @returns 图层的id
     */
    getLayerId(layer: L.Layer): any | number;
    /**
     * 返回添加到组中的所有图层的数组
     * @returns 图层数组
     */
    getLayers(): any | L.Layer[];
    /**
     * 调用setZIndex此组中包含的每个图层，传递z-index。
     * @param zIndex - 图层顺序值
     * @returns 当前对象本身，可以链式调用
     */
    setZIndex(zIndex: number): any | GroupLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | GroupLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | GroupLayer;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | GroupLayer;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | GroupLayer;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | GroupLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | GroupLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | GroupLayer;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | GroupLayer;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | GroupLayer;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | GroupLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | GroupLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | GroupLayer;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | GroupLayer;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | GroupLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 透明度
     */
    opacity: number;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 是否空组 ，空组目前就图层管理用于图层分组节点（虚拟节点）。
     */
    readonly hasEmptyGroup: boolean;
    /**
     * 是否有子图层
     */
    readonly hasChildLayer: boolean;
    /**
     * 子图层的个数
     */
    readonly length: number;
    /**
     * 添加图层
     * @param childlayer - 添加的子图层
     * @returns 当前对象本身，可以链式调用
     */
    addLayer(childlayer: L.Layer): any | GroupLayer;
    /**
     * 移除图层
     * @param childlayer - 移除的子图层 或 图层ID
     * @returns 当前对象本身，可以链式调用
     */
    removeLayer(childlayer: L.Layer | number): any | GroupLayer;
    /**
     * 定位地图至当前图层数据区域
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyTo(options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | GroupLayer;
}

/**
 * ArcGIS规则松散型切片 图层
 * @param options - 参数对象，包括以下：
 * @param options.url - 用于请求瓦片图块的URL模板。它具有以下关键字:
 * <ul>
 *     <li><code>{z}</code>: 切片方案中切片的级别。零级是四叉树金字塔的根。</li>
 *     <li><code>{x}</code>:切片方案中的图块X坐标，其中0是最西端的图块。</li>
 *     <li><code>{y}</code>: 切片方案中的图块Y坐标，其中0是最北的图块。</li>
 *     <li><code>{s}</code>:可用的子域之一，用于克服浏览器对每个主机的并发请求数的限制。</li>
 * </ul>
 * @param [options.upperCase] - url请求的瓦片图片名称是否大写。
 * @param [options.subdomains = ''] - 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisCacheLayer extends TileLayer {
    constructor(options: {
        url: string;
        upperCase?: boolean;
        subdomains?: string | string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 仅在内部调用，返回给定坐标的瓦片的URL。扩展类TileLayer可以覆盖此功能，以提供自定义图块URL命名方案。
     * @param coords - 瓦片的xyz信息
     * @returns 瓦片图片URL地址
     */
    getTileUrl(coords: any): any | string;
}

/**
 * ArcGIS规则紧凑型（bundle）切片  图层
 * @param options - 参数对象，包括以下：
 * @param options.url - 用于请求瓦片图块的URL模板，比如："http://data.mars2d.cn/arcgis_cache/hfghBundle/_alllayers"
 * @param [options.upperCase] - url请求的瓦片图片名称是否大写。
 * @param [options.subdomains = ''] - 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisCompactLayer extends TileLayer {
    constructor(options: {
        url: string;
        upperCase?: boolean;
        subdomains?: string | string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * ArcGIS瓦片  图层
 * @param options - 参数对象，包括以下：
 * @param options.url - 用于请求瓦片图块的URL模板，比如："http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer"
 * @param [options.subdomains = ''] - 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisLayer extends TileLayer {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * 百度瓦片 图层
 * @param options - 参数对象，包括以下：
 * @param [options.layer] - 图层类型，以及以下内容:<br />
 * <ul>
 *     <li><code>vec</code>: 电子图层</li>
 *     <li><code>img_d</code>: 卫星影像</li>
 *     <li><code>img_z</code>: 影像注记</li>
 *     <li><code>custom</code>: 自定义样式图层</li>
 *     <li><code>time</code>: 实时路况信息</li>
 *     <li><code>streetview</code>: 街景覆盖图层</li>
 * </ul>
 * @param [options.url] - 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param [options.subdomains = "012"] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是一个数组，数组中的每个元素都是一个子域。
 * @param [options.bigfont] - 当layer为vec或img_z时，来标识使用是否大写字体。
 * @param [options.style] - 当layer为custom时，标识的样式，可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms = true] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class BaiduLayer extends TileLayer {
    constructor(options: {
        layer?: string;
        url?: string;
        subdomains?: string | string[];
        bigfont?: boolean;
        style?: string;
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * 高德瓦片 图层
 * @param options - 参数对象，包括以下：
 * @param [options.layer] - 图层类型，以及以下内容:<br />
 * <ul>
 *     <li><code>vec</code>: 电子图层</li>
 *     <li><code>img_d</code>: 卫星影像</li>
 *     <li><code>img_z</code>: 影像注记</li>
 *     <li><code>time</code>: 实时路况信息</li>
 * </ul>
 * @param [options.url] - 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param [options.subdomains = "1234"] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param [options.bigfont] - 当layer为vec时，来标识使用是否大写字体。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GaodeLayer extends TileLayer {
    constructor(options: {
        layer?: string;
        url?: string;
        subdomains?: string | string[];
        bigfont?: boolean;
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * 谷歌瓦片 图层
 * @param options - 参数对象，包括以下：
 * @param [options.layer] - 图层类型，以及以下内容:<br />
 * <ul>
 *     <li><code>vec</code>: 电子图层</li>
 *     <li><code>img_d</code>: 卫星影像</li>
 *     <li><code>img_z</code>: 影像注记</li>
 *     <li><code>ter</code>: 地形渲染图</li>
 * </ul>
 * @param [options.url] - 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GoogleLayer extends TileLayer {
    constructor(options: {
        layer?: string;
        url?: string;
        subdomains?: string | string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

declare namespace ImageLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * imageLayer.on('click', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property add - 在图层添加到地图上之后触发
     * @property remove - 在图层从地图上移除之后触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        add: string;
        remove: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * 单张图片 图层
 * @param options - 参数对象，包括以下：
 * @param options.url - 图片url地址
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.interactive = false] - 如果true，当点击或悬停时，图像叠加层将发出鼠标事件mouse events 。
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ImageLayer extends L.ImageOverlay {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        opacity?: number;
        interactive?: boolean;
        crossOrigin?: boolean;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 将图层置于所有图层之上
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | ImageLayer;
    /**
     * 将图层置于所有图层之下
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | ImageLayer;
    /**
     * 设置覆盖的透明度
     * @param opacity - 透明度，取值范围 0-1
     * @returns 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number): any | ImageLayer;
    /**
     * 设置图层矩形边界
     * @param bounds - 矩形边界
     * @returns 当前对象本身,可以链式调用
     */
    setBounds(bounds: L.LatLngBounds): any | ImageLayer;
    /**
     * 获取图层矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | ImageLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | ImageLayer;
    /**
     * 绑定Popup弹窗配置
     * @param content - Popup弹窗内容
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup, options?: Map.PopupOptions | any): any | ImageLayer;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | ImageLayer;
    /**
     * 打开Popup弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng): any | ImageLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | ImageLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Popup弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup): any | ImageLayer;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定Tooltip弹窗配置
     * @param content - Tooltip弹窗内容
     * @param [options] - Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip, options?: Map.TooltipOptions | any): any | ImageLayer;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindTooltip(): any | ImageLayer;
    /**
     * 打开Tooltip弹窗
     * @param [latlng] - 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng): any | ImageLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(): any | ImageLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isTooltipOpen(): any | boolean;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param content - Tooltip弹窗内容
     * @returns 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip): any | ImageLayer;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns Tooltip弹窗对象
     */
    getTooltip(): any | L.Tooltip;
    /**
     * 绑定右键菜单
     * @param contextmenuItems - 右键菜单数组
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 解除绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | ImageLayer;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | ImageLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 图层服务地址
     */
    url: string;
    /**
     * 是否可以调整图层顺序（在同类型图层间）
     */
    readonly hasZIndex: boolean;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number;
}

/**
 * 可旋转的单张图片 图层
 * @param options - 参数对象，包括以下：
 * @param options.url - 图片url地址
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param [options.topleft] - 图片左上角坐标
 * @param [options.topright] - 图片右上角坐标
 * @param [options.bottomleft] - 图片左下角坐标
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ImageRotatedLayer extends ImageLayer {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        topleft?: L.LatLng;
        topright?: L.LatLng;
        bottomleft?: L.LatLng;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * Mapbox地图服务
 * @param options - 参数对象，包括以下：
 * @param [options.url = 'https://api.mapbox.com/styles/v1/'] - Mapbox服务器网址。
 * @param [options.username = 'marsgis'] - 地图帐户的用户名。
 * @param options.styleId - Mapbox样式ID。
 * @param [options.accessToken = mars2d.Token.mapbox] - 图像的Token公共访问令牌。
 * @param [options.tilesize = 512] - 图像块的大小。
 * @param [options.scaleFactor = true] - 确定贴图是否以 @2x 比例因子渲染。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class MapboxLayer extends TileLayer {
    constructor(options: {
        url?: string;
        username?: string;
        styleId: string;
        accessToken?: string;
        tilesize?: number;
        scaleFactor?: boolean;
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * OSM在线服务 图层
 * @param options - 参数对象，包括以下：
 * @param [options.url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'] - 服务url地址
 * @param [options.subdomains = 'abc'] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class OsmLayer extends TileLayer {
    constructor(options: {
        url?: string;
        subdomains?: string | string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * 天地图瓦片 图层
 * @param options - 参数对象，包括以下：
 * @param [options.layer] - 图层类型，以及以下内容:<br />
 * <ul>
 *     <li><code>vec_d</code>: 电子图层</li>
 *     <li><code>vec_z</code>: 电子注记</li>
 *     <li><code>vec_e</code>: 电子注记英文</li>
 *     <li><code>img_d</code>: 卫星影像</li>
 *     <li><code>img_z</code>: 影像注记</li>
 *     <li><code>img_e</code>: 影像注记英文</li>
 *     <li><code>ter_d</code>: 地形渲染图</li>
 *     <li><code>ter_z</code>: 地形渲染图注记</li>
 * </ul>
 * @param [options.key = mars2d.Token.tiandituArr] - 天地图服务Token，可以自行注册官网： {@link https://console.tianditu.gov.cn/api/key}
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class TdtLayer extends WmtsLayer {
    constructor(options: {
        layer?: string;
        key?: string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

/**
 * 腾讯瓦片 图层
 * @param options - 参数对象，包括以下：
 * @param [options.layer] - 图层类型，以及以下内容:<br />
 * <ul>
 *     <li><code>vec</code>: 电子图层</li>
 *     <li><code>img_d</code>: 卫星影像</li>
 *     <li><code>img_z</code>: 影像注记</li>
 *     <li><code>custom</code>: 地形渲染图</li>
 * </ul>
 * @param [options.style] - 当layer为custom时，标识的样式，可选值：灰白地图:3,暗色地图:4
 * @param [options.url] - 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是一个数组，数组中的每个元素都是一个子域。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class TencentLayer extends TileLayer {
    constructor(options: {
        layer?: string;
        style?: string;
        url?: string;
        subdomains?: string | string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
}

declare namespace TileLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * tileLayer.on('load', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property loading - 当栅格图层开始加载瓦片时触发
     * @property load - 当栅格图层加载可视瓦片时触发
     * @property tileloadstart - 当瓦片请求或开始加载时触发
     * @property tileload - 当加载瓦片时触发
     * @property tileerror - 当加载瓦片出错时触发
     * @property tileunload - 当瓦片移除时触发
     * @property add - 在图层添加到地图上之后触发
     * @property remove - 在图层从地图上移除之后触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property tooltipopen - 当Tooltip提示框绑定到这个图层并打开时触发
     * @property tooltipclose - 当Tooltip提示框绑定到这个图层并关闭时触发
     */
    type EventType = {
        loading: string;
        load: string;
        tileloadstart: string;
        tileload: string;
        tileerror: string;
        tileunload: string;
        add: string;
        remove: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
    };
}

/**
 * XYZ瓦片图层
 * @param options - 参数对象，包括以下：
 * @param options.url - 用于请求瓦片图块的URL模板。它具有以下关键字:
 * <ul>
 *     <li><code>{z}</code>: 切片方案中切片的级别。零级是四叉树金字塔的根。</li>
 *     <li><code>{x}</code>:切片方案中的图块X坐标，其中0是最西端的图块。</li>
 *     <li><code>{y}</code>: 切片方案中的图块Y坐标，其中0是最北的图块。</li>
 *     <li><code>{reverseY}</code>:切片方案中的图块Y坐标，其中0是最南端的图块,用于TMS服务。</li>
 *     <li><code>{s}</code>:可用的子域之一，用于克服浏览器对每个主机的并发请求数的限制。</li>
 * </ul>
 * @param [options.subdomains = ''] - 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class TileLayer extends L.TileLayer {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 将图层置于所有图层之上
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | TileLayer;
    /**
     * 将图层置于所有图层之下
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | TileLayer;
    /**
     * 设置覆盖的透明度
     * @param opacity - 透明度，取值范围 0-1
     * @returns 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number): any | TileLayer;
    /**
     * 设置图层矩形边界
     * @param bounds - 矩形边界
     * @returns 当前对象本身,可以链式调用
     */
    setBounds(bounds: L.LatLngBounds): any | TileLayer;
    /**
     * 获取图层矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | TileLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | TileLayer;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | TileLayer;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | TileLayer;
    /**
     * 获取图层对应的DOM容器
     */
    readonly container: HTMLElement;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 图层服务地址
     */
    url: string;
    /**
     * 是否可以调整图层顺序（在同类型图层间）
     */
    readonly hasZIndex: boolean;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number;
    /**
     * 图层矩形边界
     */
    bounds: L.LatLngBounds;
    /**
     * 透明度
     */
    opacity: number;
    /**
     * 仅在内部调用，返回给定坐标的瓦片的URL。扩展类TileLayer可以覆盖此功能，以提供自定义图块URL命名方案。
     * @param coords - 瓦片的xyz信息
     * @returns 瓦片图片URL地址
     */
    getTileUrl(coords: any): any | string;
    /**
     * 设置自定义颜色
     * @param customColor - 自定义颜色回调处理方法
     * @returns 无
     */
    setCustomColor(customColor: (...params: any[]) => any): any | void;
    /**
     * 定位地图至当前图层数据区域
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyTo(options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | TileLayer;
    /**
     * 销毁当前对象
     * @param [noDel = false] - false:会自动delete释放所有属性，true：不delete绑定的变量
     * @returns 无
     */
    destroy(noDel?: boolean): any | void;
}

/**
 * WMS服务 图层
 * @param options - 参数对象，包括以下：
 * @param options.url - WMS服务的URL。
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param options.layers - 要包含的图层，用逗号分隔。
 * @param options.style - WMTS请求的样式名称，用逗号分隔。
 * @param [options.format = 'image/jpeg'] - 要从服务器检索的瓦片图像的MIME类型。
 * @param [options.transparent = false] - 如果true，WMS服务将返回具有透明度的图像。
 * @param [options.uppercase = false] - 如果true，WMS请求参数名称将是大写。
 * @param [options.version = '1.1.1'] - 使用WMS服务版本
 * @param [options.crs] - 坐标参考系统用于WMS请求，默认为映射CRS。如果您不确定这是什么意思，请不要更改。
 * @param [options.interactive = true] - 是否触发鼠标事件，如果false，图层不会发出鼠标click事件和popup。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class WmsLayer extends L.TileLayer.WMS {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        layers: string;
        style: string;
        format?: string;
        transparent?: boolean;
        uppercase?: boolean;
        version?: string;
        crs?: L.CRS;
        interactive?: boolean;
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 使用新参数更新合并参数，并更新服务。
     * @param params - 合并参数
     * @param [noRedraw] - 是否在当前屏幕范围重新请求图块,为true时不请求
     * @returns 当前对象本身,可以链式调用
     */
    setParams(params: any, noRedraw?: boolean): any | WmsLayer;
    /**
     * 将图层置于所有图层之上
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | WmsLayer;
    /**
     * 将图层置于所有图层之下
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | WmsLayer;
    /**
     * 设置覆盖的透明度
     * @param opacity - 透明度，取值范围 0-1
     * @returns 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number): any | WmsLayer;
    /**
     * 设置图层矩形边界
     * @param bounds - 矩形边界
     * @returns 当前对象本身,可以链式调用
     */
    setBounds(bounds: L.LatLngBounds): any | WmsLayer;
    /**
     * 获取图层矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | WmsLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | WmsLayer;
    /**
     * 关闭打开的弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(): any | WmsLayer;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns 是否打开弹窗
     */
    isPopupOpen(): any | boolean;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns Popup弹窗对象
     */
    getPopup(): any | L.Popup;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | WmsLayer;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | WmsLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 图层服务地址
     */
    url: string;
    /**
     * 是否可以调整图层顺序（在同类型图层间）
     */
    readonly hasZIndex: boolean;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number;
    /**
     * 绑定Popup弹窗配置
     * @param fn - Popup弹窗模板或回调方法
     * @param [popupOptions] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(fn: string | any | ((...params: any[]) => any), popupOptions?: Map.PopupOptions): any | WmsLayer;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | WmsLayer;
}

/**
 * WMTS服务 图层
 * @param options - 参数对象，包括以下：
 * @param options.url - WMTS GetTile操作(用于kvp编码的请求)或tile-URL模板(用于RESTful请求)的基本URL。tile-URL模板应该包含以下变量:&#123;style&#125;, &#123;TileMatrixSet&#125;, &#123;TileMatrix&#125;, &#123;TileRow&#125;, &#123;TileCol&#125; 前两个是可选的，如果实际值是硬编码的或者服务器不需要。 &#123;s&#125;关键字可用于指定子域。
 * @param [options.subdomains] - URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param options.layer - WMTS请求的层名。
 * @param [options.style = ''] - WMTS请求的样式名称。
 * @param [options.tilematrixSet] - 用于WMTS请求的TileMatrixSet的标识符。
 * @param [options.tileMatrixLabels] - 用于WMTS请求的tilematrix，瓦片矩阵中用于WMTS请求的标识符列表，对应tilematrix参数，每个瓦片矩阵级别一个。
 * @param [options.tilematrixBefore] - 用于WMTS请求的tilematrix，当tileMatrixLabels是有规律的前缀+层级时，可以用tilematrixBefore配置前缀字符串即可。
 * @param [options.format = 'image/png'] - 要从服务器检索的瓦片图像的MIME类型。
 * @param [options.version = '1.0.0'] - 使用WMTS服务版本
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.rectangle] - 瓦片数据的矩形区域范围
 * @param options.rectangle.xmin - 最小经度值, -180 至 180
 * @param options.rectangle.xmax - 最大纬度值, -180 至 180
 * @param options.rectangle.ymin - 最小纬度值, -90 至 90
 * @param options.rectangle.ymax - 最大纬度值, -90 至 90
 * @param [options.bbox] - bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param [options.bounds] - leaflet原生写法，同rectangle或bbox
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.show = true] - 图层是否显示
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class WmtsLayer extends TileLayer {
    constructor(options: {
        url: string;
        subdomains?: string | string[];
        layer: string;
        style?: string;
        tilematrixSet?: string;
        tileMatrixLabels?: string[];
        tilematrixBefore?: string;
        format?: string;
        version?: string;
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        rectangle?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        bbox?: number[];
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
    });
    /**
     * 仅在内部调用，返回给定坐标的瓦片的URL。扩展类TileLayer可以覆盖此功能，以提供自定义图块URL命名方案。
     * @param coords - 瓦片的xyz信息
     * @returns 瓦片图片URL地址
     */
    getTileUrl(coords: any): any | string;
}

declare namespace Map {
    /**
     * 地图参数
     * @property zoom - 当前地图层级
     * @property [minZoom] - 地图最小缩放等级，地图不显示小于minZoom的级别.
     * @property [maxZoom] - 地图最大缩放等级，地图不显示大于maxZoom的级别.
     * @property center - 初始化地图的中心点位置
     * @property center.lng - 经度值, 180 - 180
     * @property center.lat - 纬度值, -90 - 90
     * @property [extent] - 当前地图矩形范围,与center二选一
     * @property extent.xmin - 最小经度值, -180 至 180
     * @property extent.xmax - 最大纬度值, -180 至 180
     * @property extent.ymin - 最小纬度值, -90 至 90
     * @property extent.ymax - 最大纬度值, -90 至 90
     * @property [centerAutoLevel = 15] - 定位地图至目标点时(比如{@link Map#flyToPoint}方法)，当地图级别小于此值时自动放大至该级别
     * @property [maxBounds] - 当这个选项被设置后，地图被限制在给定的地理边界内， 当用户平移将地图拖动到视图以外的范围时会出现弹回的效果， 并且也不允许缩小视图到给定范围以外的区域（这取决于地图的尺寸）. 要动态设置此限制，请使用setMaxBounds方法。
     * @property [crs = CRS.EPSG3857] - 地图坐标系。如果你不确定坐标系这是什么意思，请不要改变它
     * @property [chinaCRS = ChinaCRS.WGS84] - 标识当前地图的国内坐标系（用于部分图层内对比判断来自动纠偏或加偏）
     * @property [renderer] - 在地图上绘制矢量图层的默认方法，使用 L.SVG 或 L.Canvas 默认情况下取决于浏览器支持。
     * @property [closePopupOnClick = true] - 如果你不想让Popup弹窗在用户点击地图时关闭，那就把它设为false
     * @property [zoomSnap = 1] - 强制地图的缩放级别始终为此的倍数，特别是在 fitBounds() 缩放或缩小后。默认情况下，缩放级别将捕捉到最接近的整数; 较低的值（例如0.5 or 0.1）允许更大的粒度。数值0意味着缩放级别将不会被fitBounds放大或缩小。 可以设置小于1（例如0.5）的值允许更大的展示粒度。
     * @property [zoomDelta = 1] - 控制当使用了 zoomIn()、 zoomOut()以及按+ -键或者使用Zoom控件之后，地图的缩放级别的改变的级别值
     * @property [trackResize = true] - 地图是否自动处理浏览器窗口调整大小以更新自身
     * @property [boxZoom = true] - 按住Shift键的同时拖动鼠标，地图是否可以缩放到指定的矩形区域。
     * @property [doubleClickZoom = true] - 地图是否可以通过双击放大，并通过双击同时按住shift缩小。如果设置为 'center'，双击缩放将缩放到视图的中心，而不管鼠标在哪里。
     * @property [dragging = true] - 地图是否可以通过鼠标/触摸拖动。
     * @property [zoomAnimation = true] - 是否启用地图缩放动画。默认情况下，它在支持除Android之外的所有支持CSS3的浏览器中启用。
     * @property [zoomAnimationThreshold = 4] - 如果缩放差异超过此值，则不会生成缩放。
     * @property [fadeAnimation = true] - 是否启用了淡出动画。默认情况下，它在支持除Android之外的所有支持CSS3的浏览器中启用。
     * @property [markerZoomAnimation = true] - marker标记是否使用缩放动画进行缩放。默认情况下，它在支持除Android之外的所有支持CSS3的浏览器中启用。
     * @property [transform3DLimit = 2^23] - 定义CSS翻译转换的最大尺寸.默认值不应该改变，除非web浏览器在做了一个大的panBy之后，在错误的位置放置了一个位置.
     * @property [inertia = false] - 如果启用，则平移地图将具有惯性效应，其中地图在拖动的同时建立动量并继续沿相同方向移动一段时间。在触摸设备上感觉特别好。默认情况下启用，除非在旧的Android设备上运行。
     * @property [inertiaDeceleration = 3000] - 惯性运动减速的速度，以像素/秒为单位。
     * @property [inertiaMaxSpeed = Infinity] - 惯性运动的最大速度，以像素/秒为单位。
     * @property [worldCopyJump = false] - 启用此选项后，地图将跟踪当您平移到另一个“复制”的世界地图时，一些如标记和矢量图层等所有叠加元素仍然同步可见。
     * @property [maxBoundsViscosity = 0.0] - 如果maxBounds设置，该选项将控制当拖动地图时边界的固定度。默认值0.0允许用户以正常速度拖动界限，较高的值将减慢地图拖动,如设置值1.0将使边界完全固定，防止用户拖动界限。
     * @property [keyboard = true] - 地图是否可以获得焦点，并且允许用户通过键盘和+/-来进行浏览地图
     * @property [keyboardPanDelta = 80] - 按箭头键时平移地图时，平移的像素数量。
     * @property [scrollWheelZoom = true] - 是否可以使用鼠标滚轮放大地图。如果设置为'center'，它将缩放到视图的中心，而不管鼠标在哪里。
     * @property [wheelDebounceTime = 40] - 限制鼠标滚轮的速度（以毫秒为单位）。默认情况下，用户无法通过鼠标滚轮比40 ms更多的缩放一次。
     * @property [wheelPxPerZoomLevel = 60] - 多少滚动像素（由L.DomEvent.getWheelDelta报告）意味着一个完整缩放级别的更改。 较小的值将使滚轮变焦更快（反之亦然）
     * @property [tap = true] - 是否启用移动设备以支持即时点击（在iOS / Android上修复200ms点击延迟）和触控（触发contextmenu事件）。
     * @property [tapTolerance = 15] - 用户在触摸时，移动手指的像素数超过此值时被认为是有效的tap。
     * @property [touchZoom] - 是否可以通过用两根手指触摸拖动来缩放地图。如果设置为'center'，它将缩放到视图的中心，而不管触摸事件（手指）在哪里。 仅在具有触控功能的网络浏览器中有效，旧版Android除外。
     * @property [bounceAtZoomLimits = true] - 如果您不希望在地图缩放超过最小/最大缩放范围时反弹，请将其设置为false。
     * @property [copyright = true] - 是否显示火星科技的Logo
     * @property [defaultContextMenu = true] - 是否绑定默认的地图右键菜单
     * @property [contextmenuItems] - 自定义绑定右键菜单配置数组
     * @property [control] - 控件参数
     * @property basemaps - 底图图层配置
     * @property [operationallayers] - 可以叠加显示的图层配置
     * @property [layers] - 默认添加到地图上的图层组, 这是leaflet原生的参数，传入构造好的leaflet图层。
     */
    type Options = {
        zoom: number;
        minZoom?: number;
        maxZoom?: number;
        center: {
            lng: number;
            lat: number;
        };
        extent?: {
            xmin: number;
            xmax: number;
            ymin: number;
            ymax: number;
        };
        centerAutoLevel?: number;
        maxBounds?: L.LatLngBounds;
        crs?: CRS | L.CRS | any;
        chinaCRS?: ChinaCRS;
        renderer?: L.Renderer;
        closePopupOnClick?: boolean;
        zoomSnap?: number;
        zoomDelta?: number;
        trackResize?: boolean;
        boxZoom?: boolean;
        doubleClickZoom?: boolean | string;
        dragging?: boolean;
        zoomAnimation?: boolean;
        zoomAnimationThreshold?: number;
        fadeAnimation?: boolean;
        markerZoomAnimation?: boolean;
        transform3DLimit?: number;
        inertia?: boolean;
        inertiaDeceleration?: number;
        inertiaMaxSpeed?: number;
        worldCopyJump?: boolean;
        maxBoundsViscosity?: number;
        keyboard?: boolean;
        keyboardPanDelta?: number;
        scrollWheelZoom?: boolean | string;
        wheelDebounceTime?: number;
        wheelPxPerZoomLevel?: number;
        tap?: boolean;
        tapTolerance?: number;
        touchZoom?: boolean | string;
        bounceAtZoomLimits?: boolean;
        copyright?: boolean;
        defaultContextMenu?: boolean;
        contextmenuItems?: any;
        control?: Map.controlOptions;
        basemaps: Map.basemapOptions[];
        operationallayers?: Map.layerOptions[];
        layers?: L.Layer[];
    };
    /**
     * 底图图层配置,只支持{@link TileLayer}等瓦片图层
     * @property type - 图层类型
     * @property [id] - 图层id标识
     * @property [pid = -1] - 图层父级的id，一般图层管理中使用
     * @property [name = ''] - 图层名称
     * @property [show = false] - 图层是否显示
     * @property [其他参数] - 每种不同type都有自己的不同属性，具体参考{@link LayerType}找到type对应的图层类,查看其构造参数
     */
    type basemapOptions = {
        type: string;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        其他参数?: any;
    };
    /**
     * 可以叠加显示的图层配置
     * @property type - 图层类型
     * @property [id] - 图层id标识
     * @property [pid = -1] - 图层父级的id，一般图层管理中使用
     * @property [name = ''] - 图层名称
     * @property [show = false] - 图层是否显示
     * @property [其他参数] - 每种type都有自己的不同属性，具体参考{@link LayerType}找到type对应的图层类,查看其构造参数
     */
    type layerOptions = {
        type: string;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        其他参数?: any;
    };
    /**
     * 控件参数
     * @property [scale] - 显示比例尺 {@link L.control.scale}
     * @property [zoom] - 放大缩小控件 {@link L.control.zoom}
     * @property [zoom.position = "bottomright"] - 控件的位置
     * @property [zoom.zoomInText = "+"] - 在“放大”按钮上设置的显示文本
     * @property [zoom.zoomInTitle = "Zoom in"] - 在“放大”按钮上设置鼠标悬停提示文本
     * @property [zoom.zoomOutText = "-"] - 在“缩小”按钮上设置显示文本
     * @property [zoom.zoomOutTitle = "Zoom out"] - 在“缩小”按钮上设置鼠标悬停提示文本
     * @property [layers] - 图层控制控件,    {@link L.control.layers}
     * @property [layers.position = "bottomright"] - 控件的位置
     * @property [locationBar] - 鼠标提示控件,    {@link LocationBar}
     * @property [locationBar.template] - 展示的内容格式化字符串, 支持以下模版配置：【鼠标所在位置】 经度:{lng}， 纬度:{lat}，【地图的】 层级：{level}，
     * @property [locationBar.latDecimal = 6] - 保留的{lat}和{lng}的小数位
     * @property [locationBar.crs] - 按指定坐标系显示坐标值,  配置后template可以加模板：【鼠标所在位置对应的crs坐标系】 X或经度值：{crsx}， Y或纬度值：{crsy}
     * @property [locationBar.crsDecimal = 1] - 保留的{crsx}和{crsy}的小数位
     * @property [locationBar.cacheTime = 50] - 鼠标移动的缓存时间
     * @property [locationBar.style] - 可以CSS样式，如:
     * @property [locationBar.style.top] - css定位top位置, 如 top: '10px'
     * @property [locationBar.style.bottom] - css定位bottom位置
     * @property [locationBar.style.left] - css定位left位置
     * @property [locationBar.style.right] - css定位right位置
     * @property [toolBar] - 鼠标提示控件,    {@link ToolBar}
     * @property [toolBar.position = "bottomright"] - 控件的位置
     * @property [toolBar.item = ["home", "location", "fullscreen"]] - 显示的按钮配置,支持配置的值："home", "location", "fullscreen","clear"
     * @property [toolBar.noLocPoint] - 是否显示定位后的原点
     */
    type controlOptions = {
        scale?: boolean | any;
        zoom?: {
            position?: string;
            zoomInText?: string;
            zoomInTitle?: string;
            zoomOutText?: string;
            zoomOutTitle?: string;
        };
        layers?: {
            position?: string;
        };
        locationBar?: {
            template?: string;
            latDecimal?: number;
            crs?: string | CRS;
            crsDecimal?: number;
            cacheTime?: number;
            style?: {
                top?: string;
                bottom?: string;
                left?: string;
                right?: string;
            };
        };
        toolBar?: {
            position?: string;
            item?: string[];
            noLocPoint?: boolean;
        };
    };
    /**
     * Map支持的{@link EventType}事件类型，也支持传字符串值
     * @example
     * //绑定监听事件
     * map.on(mars2d.EventType.click, function (event) {
     *   console.log('单击了地图对象', event)
     * })
     * @property layeradd - 当一个新的图层加到地图上时触发
     * @property layerremove - 当图层从地图上移出时触发
     * @property baselayerchange - 当通过图层控件 layer control改变底图图层时触发
     * @property overlayadd - 当通过图层控件 layer control添加显示覆盖层时引发
     * @property overlayremove - 当通过图层控件 layer control隐藏移除覆盖层时引发
     * @property zoomlevelschange - 当地图上的缩放级别数量，因添加或删除图层而发生变化时触发
     * @property resize - 当地图调整大小时触发
     * @property load - 当地图初始化的完成时候触发（当地图的中心点和缩放级别在第一时间设置时）
     * @property unload - 用 remove 方法销毁地图时引发
     * @property viewreset - 当地图需要重绘其内容时发生（这通常发生在地图缩放或加载）。对于创建自定义叠加层非常有用
     * @property movestart - 当地图的视图开始变化时触发（例如用户开始拖动地图）
     * @property moveend - 当地图的中心停止更改后时发生（例如用户停止拖动地图）
     * @property zoomstart - 当地图缩放即将更改时会触发（例如缩放动画之前）
     * @property zoom - 任何缩放级别的更改都会反复触发，包括缩放和fly动画
     * @property zoomend - 当地图级别发生变化后时发生，任何动画之后都会触发
     * @property zoomanim - 在缩放动画的每一帧上播放时触发
     * @property popupopen - popup弹窗打开后
     * @property popupclose - popup弹窗关闭
     * @property tooltipopen - 在地图里打开Tooltip提示框提示时触发
     * @property tooltipclose - 在地图里关闭Tooltip提示框提示时触发
     * @property locationfound - 当定位(调用 map.locate 方法) 成功时触发
     * @property locationerror - 当定位 (调用 map.locate 方法) 失败时触发
     * @property autopanstart - 当打开弹出窗口时，地图开始自动移动时触发
     * @property click - 当用户点击（或taps点击）地图时触发
     * @property dblclick - 当用户双击（或 double-taps双击）地图时触发
     * @property mousedown - 当用户在地图上按下鼠标按钮时触发
     * @property mouseup - 当用户在地图上释放鼠标按钮时触发
     * @property mouseover - 当鼠标进入地图时触发
     * @property mouseout - 当鼠标离开地图时触发
     * @property mousemove - 鼠标在地图上移动时触发
     * @property contextmenu - 当用户在地图上按下鼠标右键时触发，如果此事件上有侦听器，则会阻止默认浏览器上下文菜单显示。当用户持有一次触摸（也称为长按）时，也会在手机上触发
     * @property keypress - 当地图处于获取焦点时，用户从键盘上按下一个键时触发
     * @property preclick - 鼠标点击地图前触发（有时当您希望在任何现有的点击处理程序开始运行之前处理一些事情时有用）
     */
    type EventType = {
        layeradd: string;
        layerremove: string;
        baselayerchange: string;
        overlayadd: string;
        overlayremove: string;
        zoomlevelschange: string;
        resize: string;
        load: string;
        unload: string;
        viewreset: string;
        movestart: string;
        moveend: string;
        zoomstart: string;
        zoom: string;
        zoomend: string;
        zoomanim: string;
        popupopen: string;
        popupclose: string;
        tooltipopen: string;
        tooltipclose: string;
        locationfound: string;
        locationerror: string;
        autopanstart: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseup: string;
        mouseover: string;
        mouseout: string;
        mousemove: string;
        contextmenu: string;
        keypress: string;
        preclick: string;
    };
    /**
     * Popup弹窗的构造参数
     * @property [maxWidth = 300] - 弹窗的最大宽度，单位为像素
     * @property [minWidth = 50] - 弹窗的最小宽度，单位为像素
     * @property [maxHeight] - 如果设置，如果内容超过此高度时，则在弹出窗口中显示滚动条
     * @property [autoPan = true] - 如果您不希望地图进行平移动画以适应打开的弹出窗口， 请将其设置为false
     * @property [autoPanPaddingTopLeft] - 执行自动平移后，弹窗和地图视图左上角之间的边距
     * @property [autoPanPaddingBottomRight] - 执行自动平移后，弹窗和地图视图右下角之间的边距
     * @property [autoPanPadding = L.Point(5, 5)] - 相当于将左上角和右下角的自动平移填充设置为相同的值
     * @property [keepInView = false] - 如果你想防止用户在屏幕打开时弹出屏幕上的弹出窗口，将其设置为true
     * @property [closeButton = true] - 弹窗中是否存在关闭按钮
     * @property [closeOnClick] - 如果要覆盖用户在地图上单击的弹出窗口关闭的默认行为，请设置它。默认为Map的closePopupOnClick选项。
     * @property [autoClose = true] - 如果在打开另一个弹窗时，是否自动关闭之前的弹窗.
     * @property [className] - 要分配给弹窗的自定义的css类名
     * @property [offset = L.Point(0, 7)] - 弹出位置的偏移量。用于在某些叠加层上打开弹出窗口时控制该锚点
     * @property [pane = 'popupPane'] - 指定添加popup弹窗至地图的pane窗格名称
     */
    type PopupOptions = {
        maxWidth?: number;
        minWidth?: number;
        maxHeight?: number;
        autoPan?: boolean;
        autoPanPaddingTopLeft?: L.Point;
        autoPanPaddingBottomRight?: L.Point;
        autoPanPadding?: L.Point;
        keepInView?: boolean;
        closeButton?: boolean;
        closeOnClick?: boolean;
        autoClose?: boolean;
        className?: string;
        offset?: L.Point;
        pane?: string;
    };
    /**
     * Tooltip弹窗的构造参数
     * @property [pane = 'tooltipPane'] - 指定添加popup弹窗至地图的pane窗格名称
     * @property [offset = L.Point(0, 0)] - 弹出位置的偏移量。用于在某些叠加层上打开弹出窗口时控制该锚点
     * @property [direction = 'auto'] - 方向打开工具提示。可能的值有：right，left， top，bottom，center，auto。 auto将间dynamicaly切换right并left根据地图上的工具提示位置。
     * @property [permanent = false] - 是否永久打开tooltip提示，仅在鼠标悬停时显示
     * @property [sticky = false] - 如果为true，则tooltip将跟随鼠标，而不是固定在功能中心。
     * @property [interactive = false] - 如果为true，则工具提示将侦听功能事件。
     * @property [opacity = 0.9] - 设置tooltip容器的不透明度。
     * @property [className] - 要分配给弹窗的自定义的css类名
     */
    type TooltipOptions = {
        pane?: string;
        offset?: L.Point;
        direction?: string;
        permanent?: boolean;
        sticky?: boolean;
        interactive?: boolean;
        opacity?: number;
        className?: string;
    };
}

/**
 * 地图类 ，这是构造地图的一切的开始起点。
 * @param id - 地图div容器的id或dom
 * @param options - 地图构造参数
 */
declare class Map extends L.Map {
    constructor(id: string | HTMLElement, options: Map.Options);
    /**
     * 当前类的原始构造参数
     */
    readonly marsOptions: any;
    /**
     * 获取地图DOM容器。
     */
    readonly container: HTMLElement;
    /**
     * 获取地图所有控件。
     */
    readonly controls: any;
    /**
     * 获取或设置当前显示的底图，设置时可以传入图层id或name
     */
    basemap: string | number | L.TileLayer;
    /**
     * 当前地图层级
     */
    zoom: number;
    /**
     * 当前地图中心点
     */
    center: L.LatLng;
    /**
     * 当前地图层级
     */
    bounds: L.LatLngBounds;
    /**
     * 当前地图坐标系
     */
    crs: string;
    /**
     * 默认绑定的图层，简单场景时快捷方便使用
     */
    readonly graphicLayer: GraphicLayer;
    /**
     * 小Tooltip鼠标提示控件
     */
    readonly smallTooltip: SmallTooltip;
    /**
     * 获取地图的配置参数，即new Map传入的参数。
     * @returns 地图的配置参数
     */
    getOptions(): any | any;
    /**
     * 添加图层到地图上
     * @param layer - 图层
     * @param [addToControl = false] - 当存在layers控件时，是否添加到图层管理控件
     * @returns 当前对象本身，可以链式调用
     */
    addLayer(layer: L.Layer, addToControl?: boolean): any | Map;
    /**
     * 从地图上移除一个指定的图层
     * @param layer - 图层
     * @param [removeFromControl = false] - 当存在layers控件时，是否从图层管理控件移除
     * @returns 当前对象本身，可以链式调用
     */
    removeLayer(layer: L.Layer, removeFromControl?: boolean): any | Map;
    /**
     * 获取图层ID值，按顺序取值。
     * 没有id的图层，会自动使用本方法进行id赋值处理
     * @returns 图层ID
     */
    getNextLayerId(): any | number;
    /**
     * 根据属性获取指定图层，包括config.json配置的图层
     * @param attrValue - 属性值
     * @param [attrName = 'id'] - 属性键
     * @returns 图层
     */
    getLayer(attrValue: string | number, attrName?: string): any | L.Layer;
    /**
     * 根据ID或取图层
     * @param id - 图层id
     * @returns 图层
     */
    getLayerById(id: string | number): any | L.Layer;
    /**
     * 根据指定属性获取图层
     * @param attrValue - 属性值
     * @param [attrName = 'id'] - 属性键
     * @returns 图层
     */
    getLayerByAttr(attrValue: string | number, attrName?: string): any | L.Layer | any;
    /**
     * 根据指定属性获取图层列表
     * @param attrValue - 属性值
     * @param [attrName = 'id'] - 属性键
     * @returns 图层对象列表
     */
    getLayersByAttr(attrValue: string | number, attrName?: string): any | L.Layer[] | any;
    /**
     * 获取所有图层
     * @param [options] - 参数对象，包括以下：
     * @param [options.basemaps] - 默认不比较及处理，true:返回所有basemps中配置图层，false：排除所有所有basemps中配置图层
     * @param [options.layers] - 默认不比较及处理，true:返回所有operationallayers中配置图层，false：排除所有operationallayers中配置图层
     * @returns 图层数组
     */
    getLayers(options?: {
        basemaps?: boolean;
        layers?: boolean;
    }): any | L.Layer[];
    /**
     * 获取所有basemps底图图层
     * @param [removeEmptyGroup = false] - 是否移除 空图层组
     * @returns 图层数组
     */
    getBasemaps(removeEmptyGroup?: boolean): any | L.TileLayer[];
    /**
     * 获取所有瓦片图层，可以用于卷帘对比
     * @returns 图层数组
     */
    getTileLayers(): any | L.TileLayer[];
    /**
     * 获取默认右键菜单
     * @returns 默认右键菜单数组
     */
    getDefaultContextMenu(): any | any;
    /**
     * 绑定右键菜单幕
     * @param arr - 菜单配置
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(arr: any): any | Map;
    /**
     * 取消绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 显示小提示窗，一般用于鼠标操作的提示。
     * @param position - 显示的屏幕坐标位置
     * @param message - 显示的内容
     * @returns 当前对象本身，可以链式调用
     */
    openSmallTooltip(position: L.Point | L.LatLng, message: string | any): any | Map;
    /**
     * 关闭小提示窗
     * @returns 当前对象本身，可以链式调用
     */
    closeSmallTooltip(): any | Map;
    /**
     * 判断是否已经全屏
     * @returns 是否已经全屏
     */
    isFullscreen(): any | boolean;
    /**
     * 切换全屏和不全屏
     * @returns 是否已经全屏
     */
    toggleFullscreen(): any | boolean;
    /**
     * 设置鼠标的默认状态样式
     * @param [val] - cursor样式
     * @returns 无
     */
    setCursor(val?: string): any | void;
    /**
     * 添加Thing对象到地图上
     * @param item - Thing对象
     * @returns 当前对象本身，可以链式调用
     */
    addThing(item: BaseThing): any | Map;
    /**
     * 移除Thing对象
     * @param item - 需要移除的Thing对象
     * @param [hasDestroy] - 是否释放
     * @returns 当前对象本身，可以链式调用
     */
    removeThing(item: BaseThing, hasDestroy?: boolean): any | Map;
    /**
     * 是否有指定的Thing对象存在（就是已经addThing的图层）
     * @param thing - 指定的Thing对象或Thing对象ID
     * @returns 是否存在
     */
    hasThing(thing: BaseThing | string): any | boolean;
    /**
     * 遍历每一个Thing对象并将其作为参数传递给回调函数
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    eachThing(method: (...params: any[]) => any, context?: any): any | Map;
    /**
     * 根据指定属性获取Thing对象
     * @param attrValue - 属性值
     * @param [attrName = 'id'] - 属性名称
     * @returns Thing对象
     */
    getThing(attrValue: string | number | boolean, attrName?: string): any | BaseThing;
    /**
     * 获取当前层级和中心点
     * @returns 获取当前层级和中心点
     */
    getView(): any | any;
    /**
     * 回到默认区域
     * @param [options] - 定位参数，包括:
     * @param [options.animate = false] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @param [options.paddingTopLeft] - extent时，设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - extent时，同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - extent时，相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - extent时，最大层级
     * @returns 当前对象本身，可以链式调用
     */
    flyHome(options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
        paddingTopLeft?: L.Point;
        paddingBottomRight?: L.Point;
        padding?: L.Point;
        maxZoom?: number;
    }): any | Map;
    /**
     * 定位地图至矢量对象处
     * @param graphic - 矢量对象
     * @param [options] - 定位参数，包括:
     * @param [options.scale] - 线面数据时，通过在每个方向上按给定百分比扩展当前边界，返回更大的边界
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @param [options.paddingTopLeft] - 线面数据时，设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 线面数据时，同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 线面数据时，相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 线面数据时，最大层级
     * @returns 当前对象本身，可以链式调用
     */
    flyToGraphic(graphic: any, options?: {
        scale?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
        paddingTopLeft?: L.Point;
        paddingBottomRight?: L.Point;
        padding?: L.Point;
        maxZoom?: number;
    }): any | Map;
    /**
     * 定位地图至目标点
     * @param center - 目标点坐标
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyToPoint(center: L.LatLng, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | Map;
    /**
     * 获取精确的像素坐标，
     * 当需要绘制比较平滑的曲线的时候可调用此方法代替 latLngToContainerPoint
     * @param latlng - 经纬度坐标
     * @returns 像素坐标
     */
    latLngToAccurateContainerPoint(latlng: L.LatLng): any | L.Point;
    /**
     * 判断是否在加载瓦片中
     * @returns 是否在加载瓦片中
     */
    isLoading(): any | boolean;
    /**
     * 设置Scene场景参数
     * @param options - 地图参数
     * @returns 当前对象本身，可以链式调用
     */
    setOptions(options: Map.Options): any | Map;
    /**
     * 返回 地图的当前边界，格式为 {xmin: 117.024994, xmax: 117.414322, ymin: 31.711229, ymax: 32.029617}
     * @param [precision = 6] - 保留小数位
     * @returns 地图边界 ，格式为 {xmin: 117.024994, xmax: 117.414322, ymin: 31.711229, ymax: 32.029617}
     */
    getExtent(precision?: number): any | any;
    /**
     * 销毁地图
     * @returns 无
     */
    destroy(): any | void;
    /**
     * 添加控件到地图上
     * @param control - 控件
     * @returns 当前对象本身，可以链式调用
     */
    addControl(control: L.Control): any | Map;
    /**
     * 从地图上移除一个指定的控件
     * @param control - 控件
     * @returns 当前对象本身，可以链式调用
     */
    removeControl(control: L.Control): any | Map;
    /**
     * 遍历地图的图层
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    eachLayer(method: (...params: any[]) => any, context?: any): any | Map;
    /**
     * 关闭右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    hide(): any | Map;
    /**
     * 绑定右键菜单幕
     * @param arr - 菜单配置
     * @returns 当前对象本身，可以链式调用
     */
    bindContextMenu(arr: any): any | Map;
    /**
     * 获取绑定的右键菜单
     * @returns 右键菜单数组
     */
    getContextMenu(): any | any;
    /**
     * 取消绑定右键菜单
     * @returns 当前对象本身，可以链式调用
     */
    unbindContextMenu(): any | Map;
    /**
     * 打开指定的Popup弹窗（如果之前有打开其他的，会自动关闭，确保只有一个）
     * @param content - Popup弹窗内容
     * //  * @param {L.LatLng} [latlng] 位置
     * //  * @param {Map.PopupOptions|Object} [options] Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    openPopup(content: string | HTMLElement | L.Popup | any): any | Map;
    /**
     * 关闭之前打开的（或给定某个）Popup弹窗
     * @param [popup] - 关闭之前打开的（或给定某个）Popup弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closePopup(popup?: L.Popup): any | Map;
    /**
     * 创建并打开具有指定内容和选项的Tooltip鼠标工具提示。
     * @param content - Tooltip弹窗内容
     * //  * @param {L.LatLng} [latlng] 位置
     * //  * @param {Map.TooltipOptions|Object} [options] Tooltip弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    openTooltip(content: string | HTMLElement | L.Tooltip | any): any | Map;
    /**
     * 关闭之前打开的（或给定某个）Tooltip鼠标工具提示
     * @param [tooltip] - 关闭之前打开的（或给定某个）Tooltip弹窗
     * @returns 当前对象本身，可以链式调用
     */
    closeTooltip(tooltip?: L.Tooltip): any | Map;
    /**
     * 定位地图至指定位置和层级
     * @param center - 经纬度坐标
     * @param [zoom] - 层级，未指定时不缩放
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    setView(center: L.LatLng, zoom?: number, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | Map;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的地理中心和级别
     * @param latlng - 经纬度坐标
     * @param [zoom] - 层级，未指定时不缩放
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyTo(latlng: L.LatLng, zoom?: number, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | Map;
    /**
     * 设置地图的zoom缩放级别
     * @param zoom - 层级
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns 当前对象本身，可以链式调用
     */
    setZoom(zoom: number, options?: {
        animate?: boolean;
    }): any | Map;
    /**
     * 放大地图级别
     * @param [delta = 1] - 改变的级别值，delta为空时，默认值取自map构造参数中的zoomDelta
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns 当前对象本身，可以链式调用
     */
    zoomIn(delta?: number, options?: {
        animate?: boolean;
    }): any | Map;
    /**
     * 缩小地图级别
     * @param [delta = 1] - 改变的级别值，delta为空时，默认值取自map构造参数中的zoomDelta
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns 当前对象本身，可以链式调用
     */
    zoomOut(delta?: number, options?: {
        animate?: boolean;
    }): any | Map;
    /**
     * 缩放地图，同时保持地图上的指定地理位置不变（例如内部用于滚动缩放和双击缩放）。
     * @param latlng - 位置 ,当为Point时相对于左上角的指定像素位置不变。
     * @param zoom - 层级
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns 当前对象本身，可以链式调用
     */
    setZoomAround(latlng: L.LatLng | L.Point, zoom: number, options?: {
        animate?: boolean;
    }): any | Map;
    /**
     * 将地图的视图设置在给定的矩形地理范围内,地图会自动计算最大缩放级别和中心点.
     * @param bounds - 矩形地理范围
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    fitBounds(bounds: L.LatLngBounds, options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | Map;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的矩形范围，类似fitBounds方法
     * @param bounds - 矩形地理范围
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyToBounds(bounds: L.LatLngBounds, options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | Map;
    /**
     * 平移地图到给定的中心点
     * @param latlng - 中心点
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    panTo(latlng: L.LatLng, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | Map;
    /**
     * 地图按指定像素的偏移值平移
     * @param offset - 平移的像素偏移值
     * @returns 当前对象本身，可以链式调用
     */
    panBy(offset: L.Point): any | Map;
    /**
     * 限制地图的视图在给定的边界里面 (参考 地图的 maxBounds 参数选项)
     * @param bounds - 最大边界
     * @returns 当前对象本身，可以链式调用
     */
    setMaxBounds(bounds: L.LatLngBounds): any | Map;
    /**
     * 设置地图最小缩放级别 (参考 minZoom 参数选项)
     * @param zoom - 最小缩放级别
     * @returns 当前对象本身，可以链式调用
     */
    setMinZoom(zoom: number): any | Map;
    /**
     * 设置地图最大缩放级别 (参考 maxZoom 参数选项)
     * @param zoom - 最大缩放级别
     * @returns 当前对象本身，可以链式调用
     */
    setMaxZoom(zoom: number): any | Map;
    /**
     * 将地图放置到位于给定范围内的最接近的视图（如果不在），并使用特定的options选项（如果有的话）控制动画。
     * @param bounds - 范围
     * @param [options] - 定位参数，包括:
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    panInsideBounds(bounds: L.LatLngBounds, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | Map;
    /**
     * 设检查地图容器大小是否已更改，并更新地图。当地图容器div大小有变化后，请调用。
     * @param [options] - 控制参数,直接传入Boolean时代表是否动画,object时可以控制是否平移动画等
     * @returns 当前对象本身，可以链式调用
     */
    invalidateSize(options?: any | boolean): any | Map;
    /**
     * 停止当前运行panTo或flyTo动画，如果有的话。
     * @returns 当前对象本身，可以链式调用
     */
    stop(): any | Map;
    /**
     * 尝试使用Geolocation API定位用户，触发具有locationfound成功的位置数据的locationerror事件或失败的事件，并且可以根据检测精度（或者如果地理位置失败）将地图视图设置为用户的位置。
     * 请注意，如果您的页面不使用HTTPS，则此方法将在最新流行浏览器（Chrome 50及更高版本）中失败。有关Locate options详细信息，请参阅。
     * @param [options] - 控制参数:
     * @param [options.watch = false] - 如果true，使用W3C watchPosition方法开始连续观察位置变化（而不是检测到位置变化）。您可以稍后停止观看使用 map.stopLocate()方法。
     * @param [options.setView = false] - 如果true自动将地图视图设置为与检测精度相关的用户位置，或者如果地理位置失败，则自动将其设置为世界视图。
     * @param [options.maxZoom = Infinity] - 使用setView选项时，自动查看设置的最大缩放级别.
     * @param [options.timeout = 10000] - 在触发locationerror事件之前等待地理位置响应的毫秒数 。
     * @param [options.maximumAge = 0] - 检测到的位置的最大生命周期 如果小于上次地理位置响应以来的毫秒数，locate将返回缓存的位置
     * @param [options.enableHighAccuracy = false] - 是否实现高精度，请参阅W3C规范中的说明。
     * @returns 当前对象本身，可以链式调用
     */
    locate(options?: {
        watch?: boolean;
        setView?: boolean;
        maxZoom?: number;
        timeout?: number;
        maximumAge?: number;
        enableHighAccuracy?: boolean;
    }): any | Map;
    /**
     * 停止执行已调用了的map.locate()。
     * @returns 当前对象本身，可以链式调用
     */
    stopLocate(): any | Map;
    /**
     * 返回地图视图的中心点经纬度
     * @returns 中心点经纬度
     */
    getCenter(): any | L.LatLng;
    /**
     * 返回当前地图视图的矩形边界
     * @returns 地图矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 返回地图此时的缩放级别
     * @returns 地图级别
     */
    getZoom(): any | number;
    /**
     * 返回地图最小缩放级别（如果设置了地图或图层的minZoom参数），默认为0
     * @returns 地图最小缩放级别
     */
    getMinZoom(): any | number;
    /**
     * 返回地图最大缩放级别（如果设置了地图或图层的maxZoom参数）
     * @returns 最大缩放级别
     */
    getMaxZoom(): any | number;
    /**
     * 返回给定范围完全适合地图视图的最大缩放级别。
     * @param bounds - 给定范围
     * @param [inside = false] - 设置为true，则该方法将返回地图视图适合整个给定边界的最小缩放级别。
     * @returns 适合地图视图的最大缩放级别
     */
    getBoundsZoom(bounds: L.LatLngBounds, inside?: boolean): any | number;
    /**
     * 返回地图容器的当前大小
     * @returns 地图容器的当前大小（以像素为单位）
     */
    getSize(): any | L.Point;
    /**
     * 返回当前地图视图的像素坐标的边界（在自定义层和覆盖实现中有用）
     * @returns 地图视图的像素坐标的边界
     */
    getPixelBounds(): any | L.Bounds;
    /**
     * 返回当前地图视图左上角的像素坐标（在自定义层和覆盖实现中有用）
     * @returns 地图视图左上角的像素坐标
     */
    getPixelOrigin(): any | L.Bounds;
    /**
     * 返回zoom缩放级别的世界边界的像素坐标
     * @param [zoom] - 缩放级别, zoom为空时使用地图的当前缩放级别。
     * @returns 地图视图的像素坐标的边界
     */
    getPixelWorldBounds(zoom?: number): any | L.Bounds;
    /**
     * 返回要应用于 从fromZoom缩放级别 到 toZoom缩放级别 地图缩放的转换的比例因子Scale。（内部使用来帮助缩放动画）
     * @param toZoom - 结束缩放级别
     * @param fromZoom - 开始缩放级别
     * @returns 地图缩放的转换的比例因子Scale
     */
    getZoomScale(toZoom: number, fromZoom: number): any | number;
    /**
     * 返回地图最终到达的缩放级别，如果它处于fromZoom 级别，并且所有内容都按比例缩放scale。 getZoomScale的逆向方法.
     * @param scale - 地图缩放的转换的比例因子Scale
     * @param fromZoom - 最终到达的缩放级别
     * @returns 地图缩放的转换的比例因子Scale
     */
    getScaleZoom(scale: number, fromZoom: number): any | number;
    /**
     * 根据地图CRS坐标系进行投影转换方法, 地理坐标 转 像素坐标
     * @param latlng - 地理位置
     * @param zoom - 地图级别
     * @returns 像素坐标（相对于CRS原点）
     */
    project(latlng: L.LatLng, zoom: number): any | L.Point;
    /**
     * 根据地图CRS坐标系进行投影转换方法, 像素坐标 转 地理坐标。
     * 逆向 project 方法
     * @param point - 像素坐标（相对于CRS原点）
     * @param zoom - 地图级别
     * @returns 地理位置
     */
    unproject(point: L.Point, zoom: number): any | L.LatLng;
    /**
     * 给定相应像素坐标，转换为相应的地理坐标（对于当前缩放级别）
     * @param point - 像素坐标(相对于[origin pixel]{@link Map#getPixelOrigin})
     * @returns 地理位置
     */
    layerPointToLatLng(point: L.Point): any | L.LatLng;
    /**
     * 给定地理坐标，转换为相应像素坐标。（在地图上进行位置叠加时比较有用）
     * @param latlng - 地理位置
     * @returns 像素坐标(相对于[origin pixel]{@link Map#getPixelOrigin})
     */
    latLngToLayerPoint(latlng: L.LatLng): any | L.Point;
    /**
     * 如果它们在CRS的边界之外，则返回一个LatLng，lat并lng根据地图的CRS wrapLat和wrapLng属性进行包装。默认情况下，这意味着经度包裹在数据线周围，所以它的值在-180和+180度之间。
     * @param latlng - 地理位置
     * @returns 地理位置
     */
    wrapLatLng(latlng: L.LatLng): any | L.LatLng;
    /**
     * 返回LatLngBounds与给定的大小相同的大小，确保其中心在CRS的边界内。默认情况下，这意味着中心经度被包裹在数据线周围，因此它的值在-180和+180度之间，并且大多数边界与CRS的界限重叠。
     * @param bounds - 地图范围
     * @returns 地图范围
     */
    wrapLatLngBounds(bounds: L.LatLngBounds): any | L.LatLngBounds;
    /**
     * 根据地图的参考系来返回两个地理位置之间的距离
     * @param latlng1 - 地理位置1
     * @param latlng2 - 地理位置2
     * @returns 距离，单位：米
     */
    distance(latlng1: L.LatLng, latlng2: L.LatLng): any | L.LatLngBounds;
    /**
     * 给定相对于地图container容器的像素坐标，返回相对于[origin pixel]{@link Map#getPixelOrigin}的相应像素坐标。
     * @param point - 像素坐标，相对于地图container容器
     * @returns 像素坐标，相对于 [origin pixel]{@link Map#getPixelOrigin}
     */
    containerPointToLayerPoint(point: L.Point): any | L.Point;
    /**
     * 给定相对于[origin pixel]{@link Map#getPixelOrigin}的像素坐标，返回相对于地图container容器的相应像素坐标。
     * @param point - 像素坐标， 相对于 [origin pixel]{@link Map#getPixelOrigin}
     * @returns 像素坐标，相对于地图container容器
     */
    layerPointToContainerPoint(point: L.Point): any | L.Point;
    /**
     * 给定相对于地图container容器的像素坐标，返回对应的地理坐标（对于当前缩放级别）。
     * @param point - 像素坐标， 相对于 [origin pixel]{@link Map#getPixelOrigin}
     * @returns 地理坐标
     */
    containerPointToLatLng(point: L.Point): any | L.LatLng;
    /**
     * 给定地理坐标，返回相对于地图container容器的相应像素坐标。
     * @param latlng - 地理坐标
     * @returns 像素坐标， 相对于地图container容器
     */
    latLngToContainerPoint(latlng: L.LatLng): any | L.Point;
    /**
     * 给定一个MouseEvent对象，返回相对于发生事件的地图容器的像素坐标（与地图左上角相关）。
     * @param event - MouseEvent对象
     * @returns 像素坐标，相对于地图container容器
     */
    mouseEventToContainerPoint(event: L.LeafletMouseEvent | any): any | L.Point;
    /**
     * 给定一个MouseEvent对象，返回相对于事件发生的[origin pixel]{@link Map#getPixelOrigin}的像素坐标。
     * @param event - MouseEvent对象
     * @returns 像素坐标，相对于地图container容器
     */
    mouseEventToLayerPoint(event: L.LeafletMouseEvent | any): any | L.Point;
    /**
     * 给定一个MouseEvent对象，返回发生事件的地理坐标。
     * @param event - MouseEvent对象
     * @returns 地理坐标
     */
    mouseEventToLatLng(event: L.LeafletMouseEvent | any): any | L.LatLng;
    /**
     * 加一个新的 L.Handler到地图上，给他一个名字和构造函数。
     * @param name - 名称
     * @param handler - Handler构造函数
     * @returns 当前对象本身，可以链式调用
     */
    addHandler(name: string, handler: any): any | Map;
    /**
     * 释放清除这个地图和清除所有的相关事件监听器
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | Map;
    /**
     * 如果尚未存在，创建具有给定名称的新映射窗格map pane，然后返回
     * @param name - 名称
     * @param [container] - 指定父级容器，container为空时，加入在地图主容器下。
     * @returns 窗格map pane
     */
    createPane(name: string, container?: HTMLElement): any | HTMLElement;
    /**
     * 返回一个普通对象，其中包含所有窗格的名称为键，并将窗格Pane作为值。
     * @returns 窗格map pane
     */
    getPanes(): any | any;
    /**
     * 获取 地图DOM容器
     * @returns 地图DOM容器
     */
    getContainer(): any | HTMLElement;
    /**
     * 方便异步执行后续方法函数Fn。 当地图以视图（中心和缩放）初始化和至少一个层初始化时，或者当它已经初始化时， 立即运行给定的函数Fn，没有时会等初始化后执行函数Fn.
     * @param fn - 方法函数
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    whenReady(fn: (...params: any[]) => any, context?: any): any | Map;
    /**
     * 绑定指定类型事件监听器
     * @param type - 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    on(type: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    off(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param [data] - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    fire(type: string | EventType, data?: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param [types] - 事件类型，Object时删除一组类型/侦听器对。
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    once(types?: string | EventType | any, fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    listens(type: string | EventType, propagate?: BaseClass): any | boolean;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): any | Map;
    /**
     * 移除抛出事件到父类
     * @param obj - 父类对象
     * @returns 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): any | Map;
}

declare namespace EchartsLayer {
    /**
     * Echarts图层参数
     * @property [Echarts本身] - 支持Echarts本身所有Options参数，具体查阅 [Echarts配置项手册]{@link https://echarts.apache.org/zh/option.html}
     * @property [id = createGuid()] - 图层id标识
     * @property [pid = -1] - 图层父级的id，一般图层管理中使用
     * @property [name = ''] - 图层名称
     * @property [pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
     */
    type Options = {
        Echarts本身?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    };
}

/**
 * Echarts图层，
 * 【需要引入 echarts 库 和 mars2d-echarts 插件库】
 * @param options - 参数对象
 */
declare class EchartsLayer extends L.Layer {
    constructor(options: EchartsLayer.Options | any);
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * echarts对象，是echarts.init方法返回的 echartsInstance 实例
     */
    readonly layer: HTMLCanvasElement;
    /**
     * 设置层级
     * @param zIndex - canvas层级
     * @returns 无
     */
    setZIndex(zIndex: number): any | void;
    /**
     * 设置图表实例的配置项以及数据，
     * 万能接口，所有参数和数据的修改都可以通过 setOption 完成，
     * ECharts 会合并新的参数和数据，然后刷新图表。
     * 如果开启动画的话，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
     * @param option - 图表的配置项和数据，具体见 [Echarts配置项手册]{@link https://echarts.apache.org/zh/option.html}。
     * @param [notMerge = false] - 是否不跟之前设置的 option 进行合并。默认为 false。即表示合并。合并的规则，详见 组件合并模式。如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
     * @param [lazyUpdate = false] - 在设置完 option 后是否不立即更新图表，默认为 false，即同步立即更新。如果为 true，则会在下一个 animation frame 中，才更新图表。
     * @returns 无
     */
    setEchartsOption(option: any, notMerge?: boolean, lazyUpdate?: boolean): any | void;
}

declare namespace ArcGisDynamicLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * tileLayer.on('load', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property loading - 当新功能开始加载时触发。
     * @property load - 当地图当前边界中的所有要素都已加载时触发。
     * @property requeststart - 当对服务的请求开始时触发。
     * @property requestend - 当对服务的请求结束时触发。
     * @property requestsuccess - 当对服务的请求成功时触发。
     * @property requesterror - 当对服务的请求响应错误时触发。
     * @property authenticationrequired - 当对服务的请求失败并需要身份验证时，这将被触发。
     */
    type EventType = {
        loading: string;
        load: string;
        requeststart: string;
        requestend: string;
        requestsuccess: string;
        requesterror: string;
        authenticationrequired: string;
    };
}

/**
 * ArcGIS Server 动态服务图层，
 * 【需要引入mars2d-esri 插件库】
 * @param options - 参数对象，包括以下：
 * @param options.url - ArcGIS Server服务地址，如：https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/
 * @param [options.layers] - 一个层id的数组，显示服务中的指定图层集合。
 * @param [options.layerDefs] - SQL筛选器，以定义服务呈现的图像中包含哪些特性。对象与键一起使用，将每个查询映射到其各自的层。{ 3: "STATE_NAME='Kansas'", 9: "POP2007>25000" }
 * @param [options.format = 'png24'] - 图像的输出格式
 * @param [options.transparent = true] - 是否允许服务器产生透明的图像。
 * @param [options.opacity = 1] - 图层的不透明度。应该是介于0(完全透明)和1(完全不透明)之间的值。
 * @param [options.dynamicLayers] - 用于覆盖服务定义的图层符号系统的一个或多个 JSON 对象的数组。需要哪些支持10.1+地图服务请求。
 * @param [options.disableCache = false] - 如果启用，将时间戳附加到每个请求以确保在服务器端创建新图像。
 * @param [options.popup] - popup弹窗配置
 * @param [options.minZoom] - 图层将显示在地图上的最远缩放级别。
 * @param [options.maxZoom] - 图层将显示在地图上的最近缩放级别。
 * @param [options.token] - 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param [options.proxy] - 代理服务URL
 * @param [options.useCors = true] - 如果此服务在发出 GET 请求时应使用 CORS。
 * @param [options.zIndex] - 用于图层间排序
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisDynamicLayer extends L.TileLayer {
    constructor(options: {
        url: string;
        layers?: string[];
        layerDefs?: any;
        format?: string;
        transparent?: boolean;
        opacity?: number;
        dynamicLayers?: any;
        disableCache?: boolean;
        popup?: string;
        minZoom?: number;
        maxZoom?: number;
        token?: string;
        proxy?: string;
        useCors?: boolean;
        zIndex?: number;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 在所有其他叠加层下方重绘此层。
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | ArcGisDynamicLayer;
    /**
     * 在所有其他叠加层之上重绘此层。
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | ArcGisDynamicLayer;
    /**
     * 绑定Popup弹窗配置
     * @example
     * dynamicMapLayer.bindPopup(function(err, featureCollection, response){
     *     let count = featureCollection.features.length;
     *     return (count) ? count + ' features' : false;
     * });
     * @param content - Popup弹窗回调方法
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: (...params: any[]) => any, options?: Map.PopupOptions | any): any | ArcGisDynamicLayer;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | ArcGisDynamicLayer;
    /**
     * 返回层构造函数中指定的可见层数组。
     * @returns 可见层数组
     */
    getLayers(): any | string[];
    /**
     * 重绘图层以显示传递的图层 id 数组。
     * @param layers - 可见层数组
     * @returns 当前对象本身，可以链式调用
     */
    setLayers(layers: string[]): any | ArcGisDynamicLayer;
    /**
     * 返回用于渲染的当前层SQL筛选器。
     * @returns SQL筛选器
     */
    getLayerDefs(): any | any;
    /**
     * 使用SQL筛选器新图层定义重绘图层, [layerDefs]{@link https://developers.arcgis.com/rest/services-reference/enterprise/export-map.htm}选项。
     * @param layerDefs - SQL筛选器
     * @returns 当前对象本身，可以链式调用
     */
    setLayerDefs(layerDefs: any): any | ArcGisDynamicLayer;
    /**
     * 返回一组 JSON 对象，表示从地图服务请求的修改后的图层符号系统。
     * @returns SQL筛选器
     */
    getDynamicLayers(): any | any;
    /**
     * 在您想要修改服务本身中定义的图层符号系统的情况下，用于以数组形式插入原始 dynamicLayers JSON。
     * @param dynamicLayers - SQL筛选器
     * @returns 当前对象本身，可以链式调用
     */
    setDynamicLayers(dynamicLayers: any): any | ArcGisDynamicLayer;
    /**
     * 请求有关此要素图层的元数据。将使用error和调用回调metadata。
     * @example
     * dynamicMapLayer.metadata(function(error, metadata){
     *   console.log(metadata);
     * });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    metadata(callback: (...params: any[]) => any, context?: any): any | ArcGisDynamicLayer;
    /**
     * 返回一个IdentifyFeatures新对象，可用于识别该图层上的要素。您的回调函数将传递一个带有结果或错误的GeoJSON。
     * @example
     * dynamicMapLayer.identify()
     *   .at(latlng)
     *   .run(function(error, featureCollection){
     *     console.log(featureCollection);
     *   });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns [L.esri.services.IdentifyFeatures对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/identify-features.html}
     */
    identify(callback: (...params: any[]) => any, context?: any): any | any;
    /**
     * 返回IdentifyFeatures可用于查找特征的新对象。您的回调函数将传递一个带有结果或错误的GeoJSON。
     * @example
     * dynamicMapLayer.find()
     *   .layers('18')
     *   .text('Colorado')
     *   .run(function(error, featureCollection){
     *     console.log(featureCollection);
     *   });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns [L.esri.Find对象]{@link http://esri.github.io/esri-leaflet//api-reference/tasks/find.html}
     */
    find(callback: (...params: any[]) => any, context?: any): any | any;
    /**
     * 返回L.esri.Query可用于查询此服务的新对象。
     * @example
     * mapService.query()
     *   .layer(0)
     *   .within(latlngbounds)
     *   .run(function(error, featureCollection, response){
     *     console.log(featureCollection);
     *   });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns [L.esri.Query对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/query.html}
     */
    query(callback: (...params: any[]) => any, context?: any): any | any;
    /**
     * 用于向服务发出新请求并绘制响应。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | ArcGisDynamicLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | ArcGisDynamicLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | ArcGisDynamicLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 透明度
     */
    opacity: number;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 用于向服务发出新请求并绘制响应。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | ArcGisDynamicLayer;
    /**
     * 从地图上存在的要素图层重新绘制所有要素。
     * @returns 当前对象本身，可以链式调用
     */
    refresh(): any | ArcGisDynamicLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | ArcGisDynamicLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | ArcGisDynamicLayer;
}

declare namespace ArcGisFeatureLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * tileLayer.on('load', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property loading - 当新功能开始加载时触发。
     * @property load - 当地图当前边界中的所有要素都已加载时触发。
     * @property createfeature - 首次加载要素图层中的要素时触发
     * @property removefeature - 当图层上的要素从地图中移除时触发
     * @property addfeature - 当先前删除的要素添加回地图时触发
     * @property click - 当用户单击（or taps）地图时触发
     * @property dblclick - 当用户双击（or double-taps）地图时触发
     * @property mousedown - 当用户在图层上按下鼠标按钮时触发
     * @property mouseover - 当鼠标进入图层时触发
     * @property mouseout - 当鼠标离开图层时触发
     * @property popupopen - 当绑定到当前图层的Popup弹窗打开时触发
     * @property popupclose - 当绑定到当前图层的Popup弹窗关闭时触发
     * @property requeststart - 当对服务的请求开始时触发。
     * @property requestend - 当对服务的请求结束时触发。
     * @property requestsuccess - 当对服务的请求成功时触发。
     * @property requesterror - 当对服务的请求响应错误时触发。
     * @property authenticationrequired - 当对服务的请求失败并需要身份验证时，这将被触发。
     */
    type EventType = {
        loading: string;
        load: string;
        createfeature: string;
        removefeature: string;
        addfeature: string;
        click: string;
        dblclick: string;
        mousedown: string;
        mouseover: string;
        mouseout: string;
        popupopen: string;
        popupclose: string;
        requeststart: string;
        requestend: string;
        requestsuccess: string;
        requesterror: string;
        authenticationrequired: string;
    };
}

/**
 * ArcGIS Server WFS矢量服务图层，
 * 【需要引入mars2d-esri 插件库】
 * @param options - 参数对象，包括以下：
 * @param options.url - ArcGIS Server服务地址,如：https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer
 * @param [options.where] - 用于过滤服务器端的特性的可选表达式。字符串值应该用单引号表示，即:"FIELDNAME = '字段值'";可以找到有关有效SQL语法的更多信息。
 * @param [options.minZoom] - 图层将显示在地图上的最远缩放级别。
 * @param [options.maxZoom] - 图层将显示在地图上的最近缩放级别。
 * @param [options.token] - 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param [options.proxy] - 代理服务URL
 * @param [options.useCors = true] - 如果此服务在发出 GET 请求时应使用 CORS。
 * @param [options.onEachFeature] - 提供了一个机会来内省图层中的各个 GeoJSON 功能。
 * @param [options.symbol] - 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param [options.symbol.type] - 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param options.symbol.styleOptions - Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param [options.symbol.styleField] - 按 styleField 属性设置不同样式。
 * @param [options.symbol.styleFieldOptions] - 按styleField值与对应style样式的键值对象。
 * @param [options.symbol.callback] - 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisFeatureLayer extends L.Layer {
    constructor(options: {
        url: string;
        where?: string;
        minZoom?: number;
        maxZoom?: number;
        token?: string;
        proxy?: string;
        useCors?: boolean;
        onEachFeature?: (...params: any[]) => any;
        symbol?: {
            type?: GraphicType | string;
            styleOptions: any;
            styleField?: string;
            styleFieldOptions?: any;
            callback?: (...params: any[]) => any;
        };
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 返回当前where设置
     * @returns where设置
     */
    getWhere(): any | string;
    /**
     * 设置新where选项并刷新图层以反映新where过滤器。
     * @param where - where设置
     * @param [callback] - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    setWhere(where: string, callback?: (...params: any[]) => any, context?: any): any | ArcGisFeatureLayer;
    /**
     * 请求有关此要素图层的元数据。将使用error和调用回调metadata。
     * @example
     * featureLayer.metadata(function(error, metadata){
     *   console.log(metadata);
     * });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    metadata(callback: (...params: any[]) => any, context?: any): any | ArcGisFeatureLayer;
    /**
     * 返回L.esri.Query可用于查询此服务的新对象。
     * @example
     * featureLayer.query()
     *   .within(latlngbounds)
     *   .where("Direction = 'WEST'")
     *   .run(function(error, featureCollection){
     *     console.log(featureCollection);
     *   });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns [L.esri.Query对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/query.html}
     */
    query(callback: (...params: any[]) => any, context?: any): any | any;
    /**
     * 向要素图层添加新要素。如果创建成功，这也会将该功能添加到地图中。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param feature - GeoJSON Feature对象
     * @param [callback] - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    addFeature(feature: any, callback?: (...params: any[]) => any, context?: any): any | ArcGisFeatureLayer;
    /**
     * 更新要素图层上提供的要素。这也会更新地图上的要素。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param feature - GeoJSON Feature对象
     * @param [callback] - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    updateFeature(feature: any, callback?: (...params: any[]) => any, context?: any): any | ArcGisFeatureLayer;
    /**
     * 从要素图层中删除具有提供的 id 的要素。如果该要素存在，这也会从地图中删除该要素。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param id - 要素的 id
     * @param [callback] - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    deleteFeature(id: string | number, callback?: (...params: any[]) => any, context?: any): any | ArcGisFeatureLayer;
    /**
     * 从要素层中删除具有提供的 id 的要素数组。这也会从地图中删除特征（如果存在）。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param ids - 要素的id数组
     * @param [callback] - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    deleteFeatures(ids: string[] | number[], callback?: (...params: any[]) => any, context?: any): any | ArcGisFeatureLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @example
     * fl.on('load', function  () {
     *   fl.eachGraphic(function(layer) {
     *     console.log(layer.feature);
     *   });
     * }
     * @param method - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身,可以链式调用
     */
    eachGraphic(method: (...params: any[]) => any, context?: any): any | GraphicLayer;
    /**
     * 根据Feature 的 id取矢量数据对象
     * @param id - Feature 的 id
     * @returns 矢量数据对象
     */
    getGraphicById(id: string | number): any | L.Layer;
    /**
     * 获取图层矩形边界
     * @returns 矩形边界
     */
    getBounds(): any | L.LatLngBounds;
    /**
     * 定位地图至当前图层数据区域
     * @param [options] - 定位参数，包括:
     * @param [options.paddingTopLeft] - 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param [options.paddingBottomRight] - 同上，不考虑地图容器右下角时使用。
     * @param [options.padding] - 相当于将左上和右下填充设置为相同的值。
     * @param [options.maxZoom] - 最大层级
     * @param [options.animate = true] - 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param [options.duration = 0.25] - 动画平移的持续时间，以秒为单位。
     * @param [options.easeLinearity = 0.25] - 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param [options.noMoveStart = false] - 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns 当前对象本身，可以链式调用
     */
    flyTo(options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }): any | ArcGisFeatureLayer;
}

declare namespace ArcGisImageLayer {
    /**
     * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
     * @example
     * //绑定监听事件
     * tileLayer.on('load', function (event) {
     *   console.log('触发了事件',event)
     * });
     * @property loading - 当新功能开始加载时触发。
     * @property load - 当地图当前边界中的所有要素都已加载时触发。
     * @property requeststart - 当对服务的请求开始时触发。
     * @property requestend - 当对服务的请求结束时触发。
     * @property requestsuccess - 当对服务的请求成功时触发。
     * @property requesterror - 当对服务的请求响应错误时触发。
     * @property authenticationrequired - 当对服务的请求失败并需要身份验证时，这将被触发。
     */
    type EventType = {
        loading: string;
        load: string;
        requeststart: string;
        requestend: string;
        requestsuccess: string;
        requesterror: string;
        authenticationrequired: string;
    };
}

/**
 * ArcGIS Server Image服务图层，
 * 【需要引入mars2d-esri 插件库】
 * @example
 * let arcGisImageLayer = new ArcGisImageLayer({
 *   url: 'https://ihttmagery.oregonexplorer.info/arcgis/rest/services/NAIP_2011/NAIP_2011_Dynamic/ImageServer'
 * })
 * arcGisImageLayer.setBandIds('3,0,1').addTo(map);
 * @param options - 参数对象，包括以下：
 * @param options.url - ArcGIS Server服务地址,比如：'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer'
 * @param [options.format = 'jpegpng'] - 图像的输出格式
 * @param [options.opacity = 1] - 图层的不透明度。应该是介于0(完全透明)和1(完全不透明)之间的值。
 * @param [options.bandIds] - 如果有多个波段，您可以指定要导出的波段。
 * @param [options.noData] - 代表无信息的像素值。
 * @param [options.noDataInterpretation] - noData设置的解释。
 * @param [options.pixelType] - 除非需要，否则在大多数 exportImage 用例中保留pixelType未指定或。
 * @param [options.minZoom] - 图层将显示在地图上的最远缩放级别。
 * @param [options.maxZoom] - 图层将显示在地图上的最近缩放级别。
 * @param [options.zIndex] - 用于图层间排序
 * @param [options.token] - 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param [options.proxy] - 代理服务URL
 * @param [options.useCors = true] - 如果此服务在发出 GET 请求时应使用 CORS。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisImageLayer extends L.TileLayer {
    constructor(options: {
        url: string;
        format?: string;
        opacity?: number;
        bandIds?: string;
        noData?: number;
        noDataInterpretation?: string;
        pixelType?: string;
        minZoom?: number;
        maxZoom?: number;
        zIndex?: number;
        token?: string;
        proxy?: string;
        useCors?: boolean;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 在所有其他叠加层下方重绘此层。
     * @returns 当前对象本身,可以链式调用
     */
    bringToBack(): any | ArcGisImageLayer;
    /**
     * 在所有其他叠加层之上重绘此层。
     * @returns 当前对象本身,可以链式调用
     */
    bringToFront(): any | ArcGisImageLayer;
    /**
     * 绑定Popup弹窗配置
     * @example
     * imageMapLayer.bindPopup(function(err, identifyResults, response){
     *     let value = results.pixel.properties.value;
     *     return (value) ? 'Pixel value: ' + value : false;
     *   });
     * @param content - Popup弹窗回调方法
     * @param [options] - Popup弹窗参数
     * @returns 当前对象本身，可以链式调用
     */
    bindPopup(content: (...params: any[]) => any, options?: Map.PopupOptions | any): any | ArcGisImageLayer;
    /**
     * 解除绑定Popup弹窗配置
     * @returns 当前对象本身，可以链式调用
     */
    unbindPopup(): any | ArcGisImageLayer;
    /**
     * 返回当前波段值。
     * @returns 波段值
     */
    getBandIds(): any | string;
    /**
     * 指定要导出的单个波段，或者您可以通过指定波段编号来更改波段组合（红色、绿色、蓝色）。
     * @param bandIds - 波段值
     * @returns 当前对象本身，可以链式调用
     */
    setBandIds(bandIds: string | number[]): any | ArcGisImageLayer;
    /**
     * 返回当前无数据值。
     * @returns 无数据值
     */
    getNoData(): any | string;
    /**
     * 指定单个值或一组值以将其视为无数据。没有数据将值呈现为透明。
     * @param noData - 无数据值
     * @param [noDataInterpretation] - 可以是esriNoDataMatchAny| esriNoDataMatchAll.
     * @returns 当前对象本身，可以链式调用
     */
    setNoData(noData: number | number[], noDataInterpretation?: string): any | ArcGisImageLayer;
    /**
     * 返回当前像素类型。
     * @returns 像素类型也称为数据类型
     */
    getPixelType(): any | string;
    /**
     * 像素类型也称为数据类型，与存储在栅格中的值的类型有关，例如有符号整数、无符号整数或浮点数。可能的值：C128、C64、F32、F64、S16、S32、S8、U1、U16、U2、U32、U4、U8、UNKNOWN。
     * @param pixelType - 像素类型也称为数据类型
     * @returns 当前对象本身，可以链式调用
     */
    setPixelType(pixelType: string): any | ArcGisImageLayer;
    /**
     * 请求有关此要素图层的元数据。将使用error和调用回调metadata。
     * @example
     * featureLayer.metadata(function(error, metadata){
     *   console.log(metadata);
     * });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    metadata(callback: (...params: any[]) => any, context?: any): any | ArcGisImageLayer;
    /**
     * 返回L.esri.Query可用于查询此服务的新对象。
     * @example
     * imageService.query()
     *   .within(latlngbounds)
     *   .run(function(error, featureCollection, response){
     *     console.log(featureCollection);
     * });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns [L.esri.Query对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/query.html}
     */
    query(callback: (...params: any[]) => any, context?: any): any | any;
    /**
     * 返回图层的当前渲染规则。
     * @returns 当前渲染规则
     */
    getRenderingRule(): any | any;
    /**
     * 使用传递的渲染规则重绘图层。
     * @param renderingRule - 当前渲染规则
     * @returns 当前对象本身，可以链式调用
     */
    setRenderingRule(renderingRule: any): any | ArcGisImageLayer;
    /**
     * 返回图层的当前镶嵌规则。
     * @returns 镶嵌规则
     */
    getMosaicRule(): any | any;
    /**
     * 使用传递的镶嵌规则重绘图层。
     * @param mosaicRule - 镶嵌规则
     * @returns 当前对象本身，可以链式调用
     */
    setMosaicRule(mosaicRule: any): any | ArcGisImageLayer;
    /**
     * 用于向服务发出新请求并绘制响应。
     * @returns 当前对象本身，可以链式调用
     */
    redraw(): any | ArcGisImageLayer;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | ArcGisImageLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | ArcGisImageLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 透明度
     */
    opacity: number;
    /**
     * 波段值
     */
    bandIds: string | number[];
    /**
     * 显示隐藏状态
     */
    show: boolean;
}

/**
 * ArcGIS Server 瓦片地图服务图层，
 * 【需要引入mars2d-esri 插件库】
 * @param options - 参数对象，包括以下：
 * @param options.url - ArcGIS Server服务地址,比如：'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer'
 * @param [options.zoomOffsetAllowance = 0.1] - 如果启用correctZoomLevels，这将控制重新映射贴图级别的每个缩放级别上的差异的容错量。
 * @param [options.token] - 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param [options.proxy] - 代理服务URL
 * @param [options.useCors = true] - 如果此服务在发出 GET 请求时应使用 CORS。
 * @param [options.opacity = 1] - 瓦片的不透明度。
 * @param [options.minZoom = 0] - 最小的缩放级别
 * @param [options.maxZoom = 18] - 最大的缩放级别
 * @param [options.maxNativeZoom] - 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param [options.minNativeZoom] - 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param [options.zIndex = 1] - 瓦片层的显式zIndex
 * @param [options.bounds] - 自定义加载的瓦片矩形范围
 * @param [options.errorTileUrl] - 显示加载瓦片失败时，显示的图片的url
 * @param [options.tms] - 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param [options.zoomReverse = false] - 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param [options.xOffset] - 对URL中地图的缩放级别x值加上xOffset值
 * @param [options.yOffset] - 对URL中地图的缩放级别y值加上yOffset值
 * @param [options.zOffset] - 对URL中地图的缩放级别z值加上zOffset值
 * @param [options.customTags] - 自定义对瓦片请求参数处理
 * @param [options.tileSize = 256] - 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param [options.className] - 要分配给瓦片图层的自定义类名称
 * @param [options.keepBuffer = 2] - 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param [options.detectRetina = false] - 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param [options.crossOrigin = false] - 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param [options.updateInterval = 200] - 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param [options.updateWhenZooming = true] - 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param [options.noWrap = false] - 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param [options.chinaCRS] - 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'tilePane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisTileLayer extends L.TileLayer {
    constructor(options: {
        url: string;
        zoomOffsetAllowance?: number;
        token?: string;
        proxy?: string;
        useCors?: boolean;
        opacity?: number;
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        zIndex?: number;
        bounds?: L.LatLngBounds;
        errorTileUrl?: string;
        tms?: boolean;
        zoomReverse?: boolean;
        xOffset?: number;
        yOffset?: number;
        zOffset?: number;
        customTags?: (...params: any[]) => any;
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    });
    /**
     * 请求有关此要素图层的元数据。将使用error和调用回调metadata。
     * @example
     * dynamicMapLayer.metadata(function(error, metadata){
     *   console.log(metadata);
     * });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 当前对象本身，可以链式调用
     */
    metadata(callback: (...params: any[]) => any, context?: any): any | ArcGisTileLayer;
    /**
     * 返回一个IdentifyFeatures新对象，可用于识别该图层上的要素。您的回调函数将传递一个带有结果或错误的GeoJSON。
     * @example
     * dynamicMapLayer.identify()
     *   .at(latlng)
     *   .run(function(error, featureCollection){
     *     console.log(featureCollection);
     *   });
     * @param callback - 回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns [L.esri.services.IdentifyFeatures对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/identify-features.html}
     */
    identify(callback: (...params: any[]) => any, context?: any): any | any;
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | ArcGisTileLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | ArcGisTileLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 显示隐藏状态
     */
    show: boolean;
}

/**
 * MapV图层
 * 【需要引入 mapv.js 库 和 mars2d-mapv 插件库】
 * @param options - 图层参数，包括：
 * @param [options.data] - new mapv.DataSet(data)的data值，如有传入时可以用于替代dataSet参数
 * @param [options.多个参数] - 支持mapv本身所有drawOptions图层样式参数，具体查阅 [mapv库drawOptions文档]{@link https://github.com/huiyan-fe/mapv/wiki/%E7%B1%BB%E5%8F%82%E8%80%83} ，也可以 [在线编辑图层样式]{@link https://mapv.baidu.com/editor/}
 * @param [options.id = createGuid()] - 图层id标识
 * @param [options.pid = -1] - 图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 图层名称
 * @param [options.pane = 'overlayPane'] - 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 * @param [dataSet] - mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
 */
declare class MapVLayer extends L.Layer {
    constructor(options: {
        data?: any;
        多个参数?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
    } | any, dataSet?: any);
    /**
     * 将图层添加到地图
     * @param map - 地图对象
     * @returns 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): any | MapVLayer;
    /**
     * 将图层从地图上移除
     * @returns 当前对象本身，可以链式调用
     */
    remove(): any | MapVLayer;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean;
    /**
     * 对象的pid标识
     */
    pid: string | number;
    /**
     * 对象的id标识
     */
    id: string | number;
    /**
     * 名称 标识
     */
    name: string;
    /**
     * 新增mapv数据
     * @param dataSet - mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
     * @returns 无
     */
    addData(dataSet: any): any | void;
    /**
     * 更新mapv数据
     * @param dataSet - mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
     * @returns 无
     */
    updateData(dataSet: any): any | void;
    /**
     * 获取数据
     * @returns mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
     */
    getData(): any | any;
    /**
     * 删除指定数据
     * @param data - mapv.DataSet数据集
     * @returns 无
     */
    removeData(data: any): any | void;
    /**
     * 删除所有数据
     * @returns 无
     */
    removeAllData(): any | void;
    /**
     * 重绘图层
     * @returns 无
     */
    draw(): any | void;
    /**
     * 设置层级
     * @param zIndex - canvas层级
     * @returns 无
     */
    setZIndex(zIndex: number): any | void;
    /**
     * 获取 canvas。
     * @returns 返回 mapV 图层包含的 canvas 对象。
     */
    getCanvas(): any | HTMLCanvasElement;
    /**
     * 获取容器。
     * @returns 返回包含 mapV 图层的 dom 对象。
     */
    getContainer(): any | HTMLElement;
    /**
     * 获取左上角坐标。
     * @returns 返回左上角坐标。
     */
    getTopLeft(): any | L.Bounds;
}

declare namespace BaseWidget {
    /**
     * widget 配置参数
     * @property name - 必须，中文名称，用于标识和弹窗标题。
     * @property uri - 必须，JS文件路径，路径是相对于widgets目录的路径。如："widgets/bookmark/widget.js"
     * @property [id] - 定义该插件的唯一标识,方便后续判断。
     * @property [autoDisable = true] - 激活其他新插件时，是否自动释放本插件
     * @property [disableOther = true] - 激活本插件时，是否释放其它已激活的插件
     * @property [group] - 配置group后，同group下的widget互斥，打开任意一个会自动释放其他的
     * @property [windowOptions] - 存在弹窗的插件的弹窗相关参数配置，更多参数请参考 [layer弹窗API]{@link https://www.layui.com/doc/modules/layer.html} 包括：
     * @property [windowOptions.width] - 窗口宽度，可以是 像素数字(像素值) 或者 字符串(屏幕宽度百分比)，示例：200 或 "20%"
     * @property [windowOptions.height] - 窗口高度，可以是 像素数字(像素值) 或者 字符串(屏幕高度百分比)，示例：600 或 "50%"
     * @property [windowOptions.position = 'auto'] - 窗口所在位置坐标，配置字符串可选值：auto垂直水平居中，t顶部,b底部,r右边缘,l左边缘,lt左上角,lb左下角,rt右上角,rb右下角；也可以配置对象：
     * @property [windowOptions.position.top] - 位置css的top值，可以是 像素数字(像素值) 或者 字符串(屏幕高度百分比)，示例：10 或 "5%"
     * @property [windowOptions.position.bottom] - 位置css的top值，可以是 像素数字(像素值) 或者 字符串(屏幕高度百分比)，示例：10 或 "5%"
     * @property [windowOptions.position.left] - 位置css的top值，可以是 像素数字(像素值) 或者 字符串(屏幕宽度百分比)，示例：10 或 "5%"
     * @property [windowOptions.position.right] - 位置css的top值，可以是 像素数字(像素值) 或者 字符串(屏幕宽度百分比)，示例：10 或 "5%"
     * @property [windowOptions.minHeight] - 限定的窗口最小高度(像素值)，默认不限制
     * @property [windowOptions.maxHeight] - 限定的窗口最大高度(像素值)，默认不限制
     * @property [windowOptions.minWidth] - 限定的窗口最小宽度(像素值)，默认不限制
     * @property [windowOptions.maxWidth] - 限定的窗口最大宽度(像素值)，默认不限制
     * @property [windowOptions.maxmin = true] - 是否可以在弹层右下角拖动来拉伸尺寸
     * @property [windowOptions.shade = 0] - 遮罩，默认为0不显示，可配置数字0.3透明度的黑色背景（'#000'），其他颜色，可以shade: [0.8, '#393D49']
     * @property [windowOptions.shadeClose = false] - 当shade是存在的，点击弹层外区域后是否关闭弹窗。
     * @property [windowOptions.closeBtn = 1] - 当为0时，不显示关闭按钮，配置1和2来展示两种风格的关闭按钮
     * @property [windowOptions.noTitle = false] - 是否不显示标题，为true是不显示标题
     * @property [windowOptions.show = true] - 激活后是否显示弹窗，false时激活后自动隐藏弹窗。
     * @property [openAtStart = false] - 打开系统后是否自动启动本插件
     * @property [style] - 添加到widget的view中的class样式名
     * @property [css] - 添加到widget的css值
     * @property [多个参数] - 传入数据等，定义的任意参数在widget内部方法中都可以通过this.config获取到
     */
    type widgetOptions = {
        name: string;
        uri: string;
        id?: string;
        autoDisable?: boolean;
        disableOther?: boolean;
        group?: string;
        windowOptions?: {
            width?: number | string;
            height?: number | string;
            position?: {
                top?: number | string;
                bottom?: number | string;
                left?: number | string;
                right?: number | string;
            };
            minHeight?: number;
            maxHeight?: number;
            minWidth?: number;
            maxWidth?: number;
            maxmin?: boolean;
            shade?: number | any[];
            shadeClose?: boolean;
            closeBtn?: number;
            noTitle?: number;
            show?: boolean;
        };
        openAtStart?: boolean;
        style?: string;
        css?: any;
        多个参数?: any;
    };
}

/**
 * widget基础类,
 * 需要继承后使用，不用手动实例化，框架内部自动实例化及相关处理。
 * 【需要引入  mars2d-widget 插件库】
 * @example
 * //使用示例
 * class MyWidget extends mars2d.widget.BaseWidget {
 *   //外部资源配置
 *   get resources() {
 *     return [
 *       'js/test.js', //当前同目录下
 *       './lib/dom2img/dom-to-image.js', //主页面相同目录下
 *     ]
 *   }
 *   //弹窗配置
 *   get view() {
 *     return {
 *       type: 'window',
 *       url: 'view.html',
 *       windowOptions: {  width: 250 },
 *     }
 *   }
 *   //初始化[仅执行1次]
 *   create() {}
 *   //每个窗口创建完成后调用
 *   winCreateOK(opt, result) {
 *     this.viewWindow = result
 *   }
 *   //打开激活
 *   activate() {}
 *   //关闭释放
 *   disable() {
 *     this.viewWindow = null
 *   }
 * }
 *
 * //注册到widget管理器中。
 * mars2d.widget.bindClass(MyWidget)
 * @param map - 地图对象
 * @param options - 配置参数
 */
declare class BaseWidget extends BaseClass {
    constructor(map: Map, options: BaseWidget.widgetOptions);
    /**
     * 获取当前地图
     */
    readonly map: Map;
    /**
     * 获取当前配置参数
     */
    readonly options: BaseWidget.widgetOptions;
    /**
     * 获取当前配置参数，别名，同options
     */
    readonly config: BaseWidget.widgetOptions;
    /**
     * 获取当前widget的目录路径
     */
    readonly path: string;
    /**
     * 是否激活状态
     */
    readonly isActivate: boolean;
    /**
     * 是否已创建
     */
    readonly isCreate: boolean;
    /**
     * 该模块依赖的外部js、css资源文件，会在实例化之前加入的页面中。
     * 默认引用是当前widget所在同path目录的资源，
     * 相当于html主页面的资源 或 外部资源 请 以 “/” 或 “.” 或 “http” 开始的url
     */
    readonly resources: string[];
    /**
     * 定义关联的view弹窗或页面配置信息，目前支持3种类型，
     * （1）type:'window'，iframe模式弹窗 ,参考_example示例， 独立的html子页面，比较自由，简单粗暴、无任何限制；可以每个页面用不同的UI和第三方插件不用考虑冲突问题；任何水平的开发人员均容易快速开发。
     * （2）type:'divwindow'，div元素模式弹窗 参考_example_divwin示例，可直接互相访问，这种模式弊端是易引起模块间id命名冲突，在css和html中命名时需注意。
     * （3）type:'append'，任意html元素 参考_example_append示例，任意div节点，比较自由。
     * 为空时表示当前模块无关联的view页面，
     * 其中url地址规则，参考resources说明
     */
    readonly view: any | any;
    /**
     * 激活widget，同 mars2d.widget.activate方法
     * @returns 无
     */
    activateBase(): any | void;
    /**
     * 构造方法完成后的钩子方法，子类继承后按需使用
     * @returns 无
     */
    init(): any | void;
    /**
     * 模块初始化，仅首次初始化执行1次
     * @param [endfun] - 当create内存在异步时，可以异步后调用下endfun
     * @returns 无
     */
    create(endfun?: (...params: any[]) => any): any | void;
    /**
     * 遍历所有view配置
     * @param callback - 回调方法
     * @param [index] - 当有多个view时，可以指定单个操作的view的index
     * @returns callback执行的返回结果
     */
    eachView(callback: (...params: any[]) => any, index?: number): any | any;
    /**
     * 更新窗口大小或位置，改变了主页面尺寸后需要调用(内部已自动调用)。
     * @returns 无
     */
    indexResize(): any | void;
    /**
     * 每个view窗口或页面创建完成后调用的钩子方法
     * @param opt - 对应的view配置
     * @param result - 得到iframe页的窗口对象 或 view的html内容
     * @returns 无
     */
    winCreateOK(opt: any, result: any | string): any | void;
    /**
     * 窗口最大化后触发后 的钩子方法
     * @returns 无
     */
    winFull(): any | void;
    /**
     * 窗口最小化后触发 的钩子方法
     * @returns 无
     */
    winMin(): any | void;
    /**
     * 最小化窗口
     * @returns 无
     */
    minView(): any | void;
    /**
     * 还原窗口
     * @returns 无
     */
    restoreView(): any | void;
    /**
     * 最大化窗口
     * @returns 无
     */
    fullView(): any | void;
    /**
     * 窗口还原后触发 的钩子方法
     * @returns 无
     */
    winRestore(): any | void;
    /**
     * 激活模块之前 的钩子方法
     * @returns 无
     */
    beforeActivate(): any | void;
    /**
     * 激活模块【类内部实现方法】
     * @returns 无
     */
    activate(): any | void;
    /**
     * 释放插件，同 mars2d.widget.disable方法
     * @returns 无
     */
    disableBase(): any | void;
    /**
     * 释放模块前
     * @returns 无
     */
    beforeDisable(): any | void;
    /**
     * 释放模块【类内部实现方法】
     * @returns 无
     */
    disable(): any | void;
    /**
     * 还原配置为初始状态
     * @returns 无
     */
    resetConfig(): any | void;
    /**
     * 设置view弹窗的显示和隐藏，基于修改css实现
     * @param show - 是否显示
     * @param [index] - 当有多个view时，可以指定单个操作的view的index
     * @returns 无
     */
    setViewShow(show: boolean, index?: number): any | void;
    /**
     * 设置view弹窗的css
     * @param style - css值
     * @param [index] - 当有多个view时，可以指定单个操作的view的index
     * @returns 无
     */
    setViewCss(style: any, index?: number): any | void;
    /**
     * 设置view弹窗的标题
     * @param title - css值
     * @param [index] - 当有多个view时，可以指定单个操作的view的index
     * @returns 无
     */
    setTitle(title: string, index?: number): any | void;
    /**
     * 读取html页面的内容
     * @param url - html页面的url
     * @param callback - 读取完成后的回调方法
     * @returns 无
     */
    getHtml(url: string, callback: (...params: any[]) => any): any | void;
}

/**
 * widget事件类型枚举, mars2d.widget.EventType
 * 【需要引入  mars2d-widget 插件库】
 */
declare enum WidgetEventType {
    /**
     * 在实例初始化之后、创建之前执行
     */
    beforeCreate = "beforeCreate",
    /**
     * 实例创建后执行
     */
    created = "created",
    /**
     * 在activat挂载开始之前调用
     */
    beforeActivate = "beforeActivate",
    /**
     * activate方法调用后
     */
    activated = "activated",
    /**
     * view弹窗构造完成后后调用
     */
    openView = "openView",
    /**
     * 实例销毁之前调用
     */
    beforeDisable = "beforeDisable",
    /**
     * 实例销毁完成调用
     */
    disabled = "disabled",
    /**
     * 加载完成 未做任何其他处理前
     */
    loadBefore = "loadBefore",
    /**
     * 加载完成，执行所有内部处理后
     */
    load = "load"
}

/**
 * widget模块化框架，公共处理类
 * 【需要引入  mars2d-widget 插件库】
 */
declare namespace widget {
    /**
     * 初始化widget管理器，在构造完成map后调用一次即可。
     * @example
     * let widgetCfg ={
     *   "version": "2017",
     *   "defaultOptions": {
     *     "style": "dark",
     *     "windowOptions": {
     *       "skin": "layer-mars-dialog animation-scale-up",
     *       "position": {
     *         "top": 50,
     *         "right": 10
     *       },
     *       "maxmin": false,
     *       "resize": true
     *     },
     *     "autoReset": false,
     *     "autoDisable": true,
     *     "disableOther": true
     *   },
     *   "openAtStart": [
     *     {
     *       "name": "放大缩小按钮",
     *       "uri": "widgets/toolButton/zoom.js"
     *     }
     *   ],
     *   "widgets": [
     *     {
     *       "name": "模板-div弹窗",
     *       "uri": "widgets/_example_divwin/widget.js"
     *     },
     *     {
     *       "name": "模板-append模板",
     *       "uri": "widgets/_example_append/widget.js"
     *     }
     *   ]
     * }
     * mars2d.widget.init(map, widgetCfg, './')
     * @param map - 地图对象
     * @param [widgetcfg = {}] - 全局配置(一般存放在widget.json)，包括：
     * @param [widgetcfg.defaultOptions] - 所有widget的默认参数值，可以系统内所有widget相同配置统一在此处传入，额外的个性化的再配置到各widget中。
     * @param [widgetcfg.openAtStart] - 默认自启动并不可释放的插件，其中autoDisable和openAtStart固定，设置无效。
     * @param [widgetcfg.widgets] - 所有插件配置，传入后后续激活时，只用传入uri即可。
     * @param [widgetcfg.version] - 加载资源时，附加的参数，主要为了清理浏览器缓存，可选值："time"（实时时间戳）或固定的字符串值，每次发布新版本换下固定值。
     * @param [widgetcfg.debugger] - 是否显示插件测试栏，true时会在地图下侧显示所有插件测试按钮，方便测试。
     * @param [_basePath = ''] - widgets目录所在的主路径(统一前缀), 如果widgets目录不在主页面一起或存在路由时，可以传入自定义主目录，值为 widgets目录相对于当前html页面的相对路径。
     * @returns 无
     */
    function init(map: Map, widgetcfg?: {
        defaultOptions?: BaseWidget.widgetOptions;
        openAtStart?: BaseWidget.widgetOptions[];
        widgets?: BaseWidget.widgetOptions[];
        version?: string;
        debugger?: boolean;
    }, _basePath?: string): any | void;
    /**
     * 获取默认init时中传入配置的 windowOptions 参数
     * @returns windowOptions参数默认值
     */
    function getDefWindowOptions(): any | any;
    /**
     * 激活指定 widget模块
     * @example
     * //常用方式，直接使用uri
     * mars2d.widget.activate("widgets/bookmark/widget.js");
     *
     * //使用对象，可以传入更多参数，具体参数参看配置项手册，。
     * mars2d.widget.activate({
     *   name:"视角书签"
     *   uri: "widgets/bookmark/widget.js",
     *   autoDisable: true,
     *   testdata:'测试数据1987', //传数据进widget内部，widget内部使用this.config.testdata获取到传的数据
     *   success:function(thisWidget){
     *     //创建完成的回调方法
     *   }
     * });
     * @param item - 指widget模块的uri 或 指模块的配置参数,当有配置参数时，参数优先级是：
     * 【activate方法传入的配置 > init方法传入的配置(widget.json) > widget.js内部配置的】
     * @param [item.map] - 当单页面简单场景没有init时，也可以传入map来使用单个widget
     * @param [noDisableOther = false] - 不释放其他已激活的widget
     * @returns 指widget模块对象
     */
    function activate(item: {
        map?: Map;
    }, noDisableOther?: boolean): any | BaseWidget.widgetOptions;
    /**
     * 获取指定的widget配置信息
     * @param uri - widget的uri 或 id
     * @returns widget配置信息
     */
    function getWidget(uri: string): any | BaseWidget.widgetOptions;
    /**
     * 获取指定的widget 对应的实例化对象
     * @param uri - widget的uri 或 id
     * @returns widget对应的实例化对象
     */
    function getClass(uri: string): any | BaseWidget;
    /**
     * 获取widget的当前激活状态
     * @param uri - widget的uri 或 id
     * @returns 是否激活
     */
    function isActivate(uri: string): any | boolean;
    /**
     * 释放指定的widget
     * @param uri - widget的uri 或 id
     * @returns 是否成功调用了释放
     */
    function disable(uri: string | string[]): any | boolean;
    /**
     * 关闭释放所有widget
     * @param [nodisable] - 传string时 指定不释放的widget的uri或id ，传true值强制释放所有widget(默认autoDisable为false的widet不会释放)
     * @param [group] - 指定强制释放的group名(默认autoDisable为false的widet不会释放)，传入group值后会强制释放所有同group组的widget
     * @returns 无
     */
    function disableAll(nodisable?: string | boolean, group?: string): any | void;
    /**
     * 关闭释放同组widget
     * @param group - 指定强制释放的group名
     * @param [nodisable] - 指定不释放的widget的uri或id
     * @returns 无
     */
    function disableGroup(group: string, nodisable?: string): any | void;
    /**
     * 遍历所有widget
     * @param method - 回调方法
     * @returns 无
     */
    function eachWidget(method: (...params: any[]) => any): any | void;
    /**
     * 绑定类到当前对应js的widget中。
     * @param _class - 定义的BaseWidget子类
     * @returns 实例化后的对象
     */
    function bindClass(_class: BaseWidget): any | any;
    /**
     * 移除Widget测试栏（当有开启debugger时）
     * @returns 无
     */
    function removeDebugeBar(): any | void;
    /**
     * 获取配置的version配置参数，用于附加清除浏览器缓存
     * @returns 配置的version参数
     */
    function getCacheVersion(): any | string;
    /**
     * 获取init方法传入的主目录配置参数
     * @returns 主目录配置参数
     */
    function getBasePath(): any | string;
    /**
     * 销毁对象
     * @returns 无
     */
    function destroy(): any | void;
    /**
     * 绑定指定类型事件监听器
     * @param types - 事件类型
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    function on(types: WidgetEventType | WidgetEventType[], fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 解除绑定指定类型事件监听器
     * @param types - 事件类型
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    function off(types: WidgetEventType | WidgetEventType[], fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 触发指定类型的事件。
     * @param type - 事件类型
     * @param data - 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param [propagate = null] - 将事件传播给父类 (用addEventParent设置)
     * @returns 无
     */
    function fire(type: WidgetEventType, data: any, propagate?: BaseClass | any): any | void;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param types - 事件类型
     * @param [fn] - 绑定的监听器回调方法
     * @param [context] - 侦听器的上下文(this关键字将指向的对象)。
     * @returns 无
     */
    function once(types: WidgetEventType | WidgetEventType[], fn?: (...params: any[]) => any, context?: any): any | void;
    /**
     * 是否有绑定指定的事件
     * @param type - 事件类型
     * @param [propagate = null] - 是否判断指定的父类 (用addEventParent设置的)
     * @returns 是否存在
     */
    function listens(type: WidgetEventType, propagate?: BaseClass): any | boolean;
}

/**
 * 高德 POI查询 工具类，
 * 参考文档： https://lbs.amap.com/api/webservice/guide/api/search
 * @param [options] - 参数对象，包括以下：
 * @param [options.key = mars2d.Token.gaodeArr] - 百度KEY,在实际项目中请使用自己申请的高德KEY，因为我们的key不保证长期有效。
 * @param [options.headers = {}] - 将被添加到HTTP请求头。
 */
declare class GaodePOI {
    constructor(options?: {
        key?: string[];
        headers?: any;
    });
    /**
     * 高德key数组，内部轮询使用
     */
    keys: string[];
    /**
     * 轮询取单个key进行使用
     */
    readonly key: string;
    /**
     * 根据经纬度坐标获取地址，逆地理编码
     * @param queryOptions - 查询参数
     * @param [queryOptions.location = null] - 经纬度坐标
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    getAddress(queryOptions: {
        location?: L.LatLng;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | GaodePOI;
    /**
     * 高德搜索提示
     * @param queryOptions - 查询参数
     * @param queryOptions.text - 输入建议关键字（支持拼音）
     * @param [queryOptions.location = null] - 建议使用location参数，可在此location附近优先返回搜索关键词信息,在请求参数city不为空时生效
     * @param [queryOptions.city = null] - 可以重新限定查询的区域，默认为类构造时传入的city
     * @param [queryOptions.citylimit = false] - 取值为"true"，仅返回city中指定城市检索结果
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    autoTip(queryOptions: {
        text: string;
        location?: L.LatLng;
        city?: string;
        citylimit?: boolean;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | GaodePOI;
    /**
     * 按限定区域搜索
     * @param queryOptions - 查询参数
     * @param queryOptions.text - 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param [queryOptions.types = ''] - 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param [queryOptions.graphic] - 限定的搜索区域
     * @param [queryOptions.limit = false] - 取值为"true"，严格返回限定区域内检索结果
     * @param [queryOptions.page = 0] - 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param [queryOptions.count = 20] - 单次召回POI数量，默认为10条记录，最大返回20条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param [queryOptions.error] - 查询失败的回调方法
     * @param [queryOptions.success] - 查询完成的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    query(queryOptions: {
        text: string;
        types?: string;
        graphic?: Marker | Polyline | Polygon | Circle | Rectangle | any;
        limit?: boolean;
        page?: number;
        count?: number;
        error?: (...params: any[]) => any;
        success?: (...params: any[]) => any;
    }): any | GaodePOI;
    /**
     * 关键字搜索
     * @param queryOptions - 查询参数
     * @param queryOptions.text - 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param [queryOptions.types = ''] - 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param [queryOptions.city = null] - 可以重新限定查询的区域，默认为类构造时传入的city
     * @param [queryOptions.citylimit = false] - 取值为"true"，仅返回city中指定城市检索结果
     * @param [queryOptions.count = 20] - 单次召回POI数量，最大返回25条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param [queryOptions.page = 0] - 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    queryText(queryOptions: {
        text: string;
        types?: string;
        city?: string;
        citylimit?: boolean;
        count?: number;
        page?: number;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | GaodePOI;
    /**
     * 周边搜索(圆形搜索)
     * @param queryOptions - 查询参数
     * @param queryOptions.text - 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param [queryOptions.types = ''] - 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param [queryOptions.location = null] - 圆形区域检索中心点，取值范围:0-50000。规则：大于50000按默认值，单位：米
     * @param [queryOptions.radius = 3000] - 圆形区域检索半径，单位为米。（增加区域内数据召回权重，如需严格限制召回数据在区域内，请搭配使用radiuslimit参数），当半径过大，超过中心点所在城市边界时，会变为城市范围检索，检索范围为中心点所在城市
     * @param [queryOptions.limit = false] - 是否严格限定召回结果在设置检索半径范围内。true（是），false（否）。设置为true时会影响返回结果中total准确性及每页召回poi数量， 设置为false时可能会召回检索半径外的poi。
     * @param [queryOptions.count = 20] - 单次召回POI数量，最大返回25条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param [queryOptions.page = 0] - 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    queryCircle(queryOptions: {
        text: string;
        types?: string;
        location?: L.LatLng;
        radius?: number;
        limit?: boolean;
        count?: number;
        page?: number;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | GaodePOI;
    /**
     * 多边形搜索
     * @param queryOptions - 查询参数
     * @param queryOptions.text - 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param [queryOptions.types = ''] - 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param queryOptions.polygon - 经纬度数组，经纬度小数点后不得超过6位。多边形为矩形时，可传入左上右下两顶点坐标对；其他情况下首尾坐标对需相同。
     * @param [queryOptions.count = 20] - 单次召回POI数量，最大返回25条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param [queryOptions.page = 0] - 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    queryPolygon(queryOptions: {
        text: string;
        types?: string;
        polygon: L.LatLng[];
        count?: number;
        page?: number;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | GaodePOI;
}

/**
 * 高德 路径规划  工具类，
 * 参考文档：https://lbs.amap.com/api/webservice/guide/api/direction
 * @param [options] - 参数对象，包括以下：
 * @param [options.key = mars2d.Token.gaodeArr] - 百度KEY,在实际项目中请使用自己申请的高德KEY，因为我们的key不保证长期有效。
 * @param [options.headers = {}] - 将被添加到HTTP请求头。
 */
declare class GaodeRoute {
    constructor(options?: {
        key?: string[];
        headers?: any;
    });
    /**
     * 高德key数组，内部轮询使用
     */
    keys: string[];
    /**
     * 轮询取单个key进行使用
     */
    readonly key: string;
    /**
     * 按指定类别自动查询
     * @param queryOptions - 查询参数
     * @param queryOptions.type - 类型
     * @param queryOptions.points - 按起点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    query(queryOptions: {
        type: GaodeRoute.RouteType;
        points: any[][];
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | GaodeRoute;
    /**
     * 按指定类别自动查询(多个路线数组，递归处理)
     * @param queryOptions - 查询参数
     * @param queryOptions.type - 类型
     * @param queryOptions.points - 多条，按起点终点 顺序的坐标数组,如[
     *  [ [117.500244, 40.417801],[117.500244, 40.417801] ],
     *  [ [117.500244, 40.417801],[117.500244, 40.417801] ]
     * ]
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 无
     */
    queryArr(queryOptions: {
        type: GaodeRoute.RouteType;
        points: any[][];
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | void;
    /**
     * 计算结果中的最短距离的导航路径
     * @param data - queryArr返回的结果数组
     * @returns 返回路线数据和index顺序
     */
    getShortestPath(data: any): any | any;
    /**
     * 步行路径规划 (单个查询)
     * @param queryOptions - 查询参数
     * @param queryOptions.points - 按起点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 无
     */
    queryWalking(queryOptions: {
        points: any[][];
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | void;
    /**
     * 骑行路径查询 (单个查询)
     * @param queryOptions - 查询参数
     * @param queryOptions.points - 按起点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 无
     */
    queryBicycling(queryOptions: {
        points: any[][];
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | void;
    /**
     * 驾车路径规划查询
     * @param queryOptions - 查询参数
     * @param queryOptions.points - 按起点、途经点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param queryOptions.avoidpolygons - 区域避让数组(支持多个)，支持32个避让区域，每个区域最多可有16个顶点。避让区域不能超过81平方公里，否则避让区域会失效。
     * @param [queryOptions.extensions = 'base'] - 返回结果控制,可选值：core/all  base:返回基本信息；all：返回全部信息
     * @param [queryOptions.strategy = 0] - 驾车选择策略，参考高德官网说明，默认为0：速度优先，不考虑当时路况，此路线不一定距离最短
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 无
     */
    queryDriving(queryOptions: {
        points: any[][];
        avoidpolygons: any[][];
        extensions?: string;
        strategy?: string;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | void;
}

declare namespace GaodeRoute {
    /**
     * 路径规划方式
     */
    enum RouteType {
        Walking,
        Bicycling,
        Driving
    }
}

declare namespace QueryArcServer {
    /**
     * 当前类支持的{@link EventType}事件类型
     * @example
     * //绑定监听事件
     * layer.on(mars2d.EventType.load, function (event) {
     *   console.log('矢量数据对象加载完成', event)
     * })
     * @property click - 左键单击 鼠标事件
     * @property load - 完成加载，执行所有内部处理后
     */
    type EventType = {
        click: string;
        load: string;
    };
}

/**
 * ArcGIS WFS矢量服务查询类
 * @param options - 参数对象，包括以下：
 * @param options.url - ArcGIS服务地址, 示例：'http://server.mars2d.cn/arcgis/rest/services/mars/hefei/MapServer/37'
 * @param [options.pageSize = 10] - 每页条数
 * @param [options.headers = {}] - 将被添加到HTTP请求头。
 *
 * //以下是GeoJsonLayer图层参数
 * @param [options.id = createGuid()] - 赋予给layer图层，图层id标识
 * @param [options.pid = -1] - 赋予给layer图层，图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 赋予给layer图层，图层名称
 * @param [options.symbol] - 赋予给layer图层，图层矢量数据的style样式，参考{@link GeoJsonLayer}
 * @param [options.graphicOptions] - 赋予给layer图层，图层默认的graphic的构造参数，参考{@link GeoJsonLayer}
 * @param [options.popup] - 赋予给layer图层，图层绑定的popup弹窗值，参考{@link GeoJsonLayer}
 * @param [options.tooltip] - 赋予给layer图层，图层绑定的tooltip弹窗值，参考{@link GeoJsonLayer}
 */
declare class QueryArcServer extends BaseClass {
    constructor(options: {
        url: string;
        pageSize?: number;
        headers?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        symbol?: any | ((...params: any[]) => any);
        graphicOptions?: any;
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        tooltip?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any;
    });
    /**
     * ArcGIS服务地址
     */
    url: string;
    /**
     * 分页的 每页条数
     */
    pageSize: number;
    /**
     * 总记录数
     */
    readonly allCount: number;
    /**
     * 总页数
     */
    readonly allPage: number;
    /**
     * 页码，当前第几页
     */
    readonly pageIndex: number;
    /**
     * 用于显示查询结果的GeoJsonLayer图层，图层参数在当前类构造方法中传入
     */
    readonly layer: GeoJsonLayer;
    /**
     * 首页，查看第1页数据
     * @returns 无
     */
    showFirstPage(): any | void;
    /**
     * 上一页
     * @returns 无
     */
    showPretPage(): any | void;
    /**
     * 下一页
     * @returns 无
     */
    showNextPage(): any | void;
    /**
     * 跳转到指定页
     * @param pageIndex - 指定页
     * @returns 无
     */
    showPage(pageIndex: number): any | void;
    /**
     * 按指定类别自动查询
     * @param queryOptions - 查询参数
     * @param [queryOptions.text] - 检索关键字。
     * @param [queryOptions.column] - 检索关键字的字段名称。
     * @param [queryOptions.like = true] - 检索关键字时，是否模糊匹配，false时精确查询。
     * @param [queryOptions.where] - 自定义的检索条件，与text二选一
     * @param [queryOptions.graphic] - 限定的搜索区域
     * @param [queryOptions.page = true] - 是否分页查询,false时不分页，一次性查询返回
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    query(queryOptions: {
        text?: string;
        column?: string;
        like?: boolean;
        where?: string;
        graphic?: Rectangle | Polygon | Circle | any;
        page?: boolean;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | QueryArcServer;
    /**
     * 清除
     * @returns 无
     */
    clear(): any | void;
    /**
     * 当前类的构造参数
     */
    readonly options: any;
}

/**
 * GeoServer WFS服务查询类
 * @param options - 参数对象，包括以下：
 * @param options.url - GeoServer服务地址, 示例：'http://server.mars2d.cn/geoserver/mars/wfs'
 * @param options.layer - 图层名称（命名空间:图层名称），多个图层名称用逗号隔开
 * @param [options.headers = {}] - 将被添加到HTTP请求头。
 *
 * //以下是GeoJsonLayer图层参数
 * @param [options.id = createGuid()] - 赋予给layer图层，图层id标识
 * @param [options.pid = -1] - 赋予给layer图层，图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 赋予给layer图层，图层名称
 * @param [options.symbol] - 赋予给layer图层，图层矢量数据的style样式，参考{@link GeoJsonLayer}
 * @param [options.graphicOptions] - 赋予给layer图层，图层默认的graphic的构造参数，参考{@link GeoJsonLayer}
 * @param [options.popup] - 赋予给layer图层，图层绑定的popup弹窗值，参考{@link GeoJsonLayer}
 * @param [options.tooltip] - 赋予给layer图层，图层绑定的tooltip弹窗值，参考{@link GeoJsonLayer}
 */
declare class QueryGeoServer extends BaseClass {
    constructor(options: {
        url: string;
        layer: string;
        headers?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        symbol?: any | ((...params: any[]) => any);
        graphicOptions?: any;
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        tooltip?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any;
    });
    /**
     * 用于显示查询结果的GeoJsonLayer图层，图层参数在当前类构造方法中传入
     */
    readonly layer: GeoJsonLayer;
    /**
     * 查询服务，基于filter条件
     * @param queryOptions - 查询参数
     * @param [queryOptions.text] - 检索关键字
     * @param [queryOptions.column] - 检索关键字时，对应的字段名称
     * @param [queryOptions.like = true] - 检索关键字时，是否模糊匹配，false时精确查询
     * @param [queryOptions.graphic] - 限定的搜索区域
     * @param [queryOptions.geometryName = 'the_geom'] - 限定的搜索区域时，对应的geometry字段名称
     * @param [queryOptions.maxFeatures = 1000] - 返回结果最大数量
     * @param [queryOptions.sortBy] - 排序的属性名称，默认升序，降序时+D
     * @param [queryOptions.更多参数] - WFS服务支持的其他参数，均支持
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    query(queryOptions: {
        text?: string;
        column?: string;
        like?: boolean;
        graphic?: Rectangle | Polygon | Circle | any;
        geometryName?: string;
        maxFeatures?: number;
        sortBy?: string;
        更多参数?: any;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | QueryGeoServer;
    /**
     * 查询服务，基于cql_filter条件
     * @param queryOptions - 查询参数
     * @param queryOptions.parameters.cql_filter - 筛选服务数据的[SQL语句]{@link https://docs.geoserver.org/2.12.2/user/services/wfs/vendor.html#wfs-vendor-parameters}
     * @param [queryOptions.graphic] - 限定的搜索区域,自动转换后加入到cql_filter中，也可以外部自行处理
     * @param [queryOptions.geometryName = 'the_geom'] - 限定的搜索区域时，对应的geometry字段名称
     * @param [queryOptions.maxFeatures = 1000] - 返回结果最大数量
     * @param [queryOptions.sortBy] - 排序的属性名称，默认升序，降序时+D
     * @param [queryOptions.更多参数] - WFS服务支持的其他参数，均支持
     * @param [queryOptions.success] - 查询完成的回调方法
     * @param [queryOptions.error] - 查询失败的回调方法
     * @returns 当前对象本身，可以链式调用
     */
    queryBySql(queryOptions: {
        graphic?: Rectangle | Polygon | Circle | any;
        geometryName?: string;
        maxFeatures?: number;
        sortBy?: string;
        更多参数?: any;
        success?: (...params: any[]) => any;
        error?: (...params: any[]) => any;
    }): any | QueryGeoServer;
    /**
     * 清除
     * @returns 无
     */
    clear(): any | void;
    /**
     * 当前类的构造参数
     */
    readonly options: any;
}

/**
 * 地图截图处理类，
 * 内部导出部分依赖domtoimage库，需要额外引入。
 * @param [options] - 参数对象，包括以下：
 * @param [options.eleid] - 导出的DIV对象id，默认为map所在的父容器
 * @param [options.id = createGuid()] - 对象的id标识
 * @param [options.enabled = true] - 对象的启用状态
 * @param [options.eventParent] - 指定的事件冒泡对象，默认为所加入的map对象，false时不冒泡事件
 */
declare class ExpImg extends BaseThing {
    constructor(options?: {
        eleid?: string;
        id?: string | number;
        enabled?: boolean;
        eventParent?: BaseClass | boolean;
    });
    /**
     * 经纬网图层
     */
    readonly graticuleLayer: GraticuleLayer;
    /**
     * 按纸张尺寸设置容器大小
     * @param [size] - 纸张尺寸，默认为全屏,支持：A4H、A4Z、A3H、A3Z
     * @returns 无
     */
    changeSize(size?: string): any | void;
    /**
     * 绘制经纬网
     * @param options - 控制参数
     * @param options.row - 行数
     * @param options.col - 列数
     * @returns 无
     */
    drawGraticule(options: {
        row: number;
        col: number;
    }): any | void;
    /**
     * 激活绘制矩形区域，并导出自定义区域的截图
     * @param [options] - 控制参数
     * @param [options.download = true] - 是否下载
     * @param [options.fileName = "地图截图"] - 导出的图片名称
     * @param [options.calllback] - 导出完成的回调方法
     * @returns 无
     */
    expByDraw(options?: {
        download?: number;
        fileName?: number;
        calllback?: (...params: any[]) => any;
    }): any | void;
    /**
     * 按当前地图区域进行全部截图
     * @param [options] - 控制参数
     * @param [options.download = true] - 是否下载
     * @param [options.fileName = "地图截图"] - 导出的图片名称
     * @param [options.calllback] - 导出完成的回调方法
     * @returns 无
     */
    expAll(options?: {
        download?: boolean;
        fileName?: number;
        calllback?: (...params: any[]) => any;
    }): any | void;
}

/**
 * 图上量算类
 * @param [options] - 参数对象，包括以下：
 * @param [options.hasEdit = false] - 是否可编辑
 * @param [options.isAutoEditing = true] - 完成测量时是否自动启动编辑(需要hasEdit:true时)
 * @param [options.isContinued = false] - 是否连续测量
 * @param [options.label] - 测量结果文本的样式
 * @param [options.id = createGuid()] - 对象的id标识
 * @param [options.enabled = true] - 对象的启用状态
 * @param [options.eventParent] - 指定的事件冒泡对象，默认为所加入的map对象，false时不冒泡事件
 * @param [options.pid = -1] - 量算对应的图层父级的id，一般图层管理中使用
 * @param [options.name = ''] - 量算对应的图层名称
 */
declare class Measure extends BaseThing {
    constructor(options?: {
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        isContinued?: boolean;
        label?: Label.StyleOptions;
        id?: string | number;
        enabled?: boolean;
        eventParent?: BaseClass | boolean;
        pid?: string | number;
        name?: string;
    });
    /**
     * 对应的矢量图层
     */
    readonly graphicLayer: GraphicLayer;
    /**
     * 图层内的Graphic集合对象
     */
    readonly graphics: Marker[] | Polyline[] | Polygon[] | Circle[] | Rectangle[] | any;
    /**
     * 是否有进行量算
     */
    readonly hasMeasure: boolean;
    /**
     * 测量 空间长度
     * @param options - 控制参数
     * @param [options.style] - 路线的样式
     * @param [options.unit = 'auto'] - 计量单位,{@link MeasureUtil#formatDistance}可选值：auto、m、km、mile、zhang 。auto时根据距离值自动选用k或km
     * @param [options.maxPointNum = 9999] - 绘制时，最多允许点的个数
     * @param [options.showAddText = true] - 是否显示每一段的增加部分距离，如（+10.1km）
     * @returns 长度测量控制类 对象
     */
    distance(options: {
        style?: Polyline.StyleOptions;
        unit?: string;
        maxPointNum?: number;
        showAddText?: boolean;
    }): any | DistanceMeasure;
    /**
     * 面积测量（水平面）
     * @param options - 控制参数
     * @param [options.style] - 面的样式
     * @param [options.unit = 'auto'] - 计量单位,{@link MeasureUtil#formatArea}可选值：auto、m、km、mu、ha 。auto时根据面积值自动选用k或km
     * @returns 面积测量控制类 对象
     */
    area(options: {
        style?: Polygon.StyleOptions;
        unit?: string;
    }): any | AreaMeasure;
    /**
     * 取消并停止绘制，如有未完成的绘制会自动删除
     * @returns 当前对象本身,可以链式调用
     */
    stopDraw(): any | Measure;
    /**
     * 完成绘制和编辑，如有未完成的绘制会自动完成。
     * 在移动端需要调用此方法来类似PC端双击结束。
     * @returns 无
     */
    endDraw(): any | void;
    /**
     * 清除测量
     * @returns 无
     */
    clear(): any | void;
    /**
     * 更新量测结果的单位
     * @param unit - 计量单位,{@link MeasureUtil#formatDistance}{@link MeasureUtil#formatArea} 可选值：auto、m、km、mile、zhang 等。auto时根据距离值自动选用k或km
     * @returns 无
     */
    updateUnit(unit: string): any | void;
    /**
     * 销毁当前对象
     * @param [noDel = false] - false:会自动delete释放所有属性，true：不delete绑定的变量
     * @returns 无
     */
    destroy(noDel?: boolean): any | void;
}

/**
 * 转换options参数处理基类
 * @param options - 参数名称
 */
declare class BaseOptsConver {
    constructor(options: any);
}

/**
 * Circle 转换options参数处理类
 * @param options - 参数名称
 */
declare class CircleStyleConver extends BaseOptsConver {
    constructor(options: any);
}

/**
 * DivGraphic 转换options样式参数处理类
 * @param options - 参数名称
 */
declare class DivGraphicStyleConver extends MarkerStyleConver {
    constructor(options: any);
}

/**
 * Label 转换options样式参数处理类
 * @param options - 参数名称
 */
declare class LabelStyleConver extends DivGraphicStyleConver {
    constructor(options: any);
}

/**
 * Marker 转换options样式参数处理类
 * @param options - 参数名称
 */
declare class MarkerStyleConver extends BaseOptsConver {
    constructor(options: any);
}

/**
 * Point 转换options样式参数处理类
 * @param options - 参数名称
 */
declare class PointStyleConver extends BaseOptsConver {
    constructor(options: any);
}

/**
 * Polygon 转换options样式参数处理类
 * @param options - 参数名称
 */
declare class PolygonStyleConver extends BaseOptsConver {
    constructor(options: any);
    /**
     * style样式属性赋值到 entity
     * @param style - 样式
     * @param entityGraphic - 矢量数据对应的 Leaflet内部对象
     * @returns 矢量数据所需的Leaflet内部对象
     */
    static toLeafletVal(style: Polygon.StyleOptions, entityGraphic: L.Polygon | null): any | L.Polygon;
}

/**
 * Polyline 转换options样式参数处理类
 * @param options - 参数名称
 */
declare class PolylineStyleConver extends BaseOptsConver {
    constructor(options: any);
}

/**
 * Rectangle 转换options样式参数处理类
 * @param options - 参数名称
 */
declare class RectangleStyleConver extends BaseOptsConver {
    constructor(options: any);
}

/**
 * 矢量数据 相关静态方法
 */
declare namespace DrawUtil {
    /**
     * 是否有指定类型矢量对象
     * @param type - 矢量标绘类型
     * @returns 是否有指定类型
     */
    function hasType(type: string): any | boolean;
    /**
     * 注册矢量标绘类
     * @param type - 矢量标绘类型
     * @param drawClass - 矢量标绘类
     * @returns 无
     */
    function register(type: string, drawClass: BaseDraw): any | void;
    /**
     * 根据 矢量标绘类型 获取 矢量标绘类
     * @param type - 矢量标绘类型
     * @returns 矢量标绘类
     */
    function getClass(type: string): any | BaseDraw | undefined;
    /**
     * 标绘中tooltip提示文字对象
     */
    const DrawMsg: any;
}

/**
 * 矢量数据 相关静态方法
 */
declare namespace GraphicUtil {
    /**
     * 是否有指定类型矢量对象
     * @param type - 矢量数据类型
     * @returns 是否有指定类型
     */
    function hasType(type: string): any | boolean;
    /**
     * 判断该类型是否点状对象
     * @param type - 矢量数据类型
     * @returns 是否点状对象类型
     */
    function isPointType(type: string): any | boolean;
    /**
     * 注册矢量数据类
     * @param type - 矢量数据类型
     * @param graphicClass - 矢量数据类
     * @returns 无
     */
    function register(type: string, graphicClass: Marker | Polyline | Polygon | Circle | Rectangle | any): any | void;
    /**
     * 根据 矢量数据类型 获取 矢量数据类
     * @param type - 矢量数据类型
     * @returns 矢量数据类
     */
    function getClass(type: string): any | Marker | Polyline | Polygon | Circle | Rectangle | any | undefined;
    /**
     * 根据类型和参数 创建Graphic工厂方法
     * @param type - 数据类型
     * @param options - 构造参数， 按type支持{@link GraphicType}类的构造方法参数
     * @returns 创建完成的矢量数据对象
     */
    function create(type: any, options: any): any | Marker | Polyline | Polygon | Circle | Rectangle | any;
}

/**
 * 图层相关 静态方法
 */
declare namespace LayerUtil {
    /**
     * 注册图层类
     * @param type - 图层类型
     * @param layerClass - 图层类
     * @returns 无
     */
    function register(type: string, layerClass: L.Layer | any): any | void;
    /**
     * 根据 图层类型 获取 图层类
     * @param type - 图层类型
     * @returns 图层类
     */
    function getClass(type: LayerType): any | L.Layer | any | undefined;
    /**
     * 创建图层工厂方法
     * @param options - 图层参数，包括：
     * @param options.type - 图层类型
     * @param options.其他 - 具体见各{@link LayerType}对应的图层类的构造方法参数
     * @param [templateValues = {}] - url模版
     * @returns 创建完成的图层对象
     */
    function create(options: {
        type: LayerType;
        其他: any;
    }, templateValues?: any): any | L.Layer | any;
    /**
     * 克隆图层
     * @param layer - 图层
     * @returns 克隆的图层
     */
    function cloneLayer(layer: any): any | any;
}

/**
 * SDK内部统一调用console.* 打印日志的控制类，在外部可以按需开启和关闭。
 */
declare namespace Log {
    /**
     * 是否 console.log 打印普通日志信息，可以按需关闭或开启
     * @param val - 是否打印
     * @returns 无
     */
    function hasInfo(val: boolean): any | void;
    /**
     * 是否 console.warn 打印警告日志信息，可以按需关闭或开启，但不建议关闭
     * @param val - 是否打印
     * @returns 无
     */
    function hasWarn(val: boolean): any | void;
    /**
     * 是否 console.error 打印错误日志信息，可以按需关闭或开启，但不建议关闭
     * @param val - 是否打印
     * @returns 无
     */
    function hasError(val: boolean): any | void;
    /**
     * console.log 打印普通日志信息,方便开发调试
     * @param sources - 打印的日志内容
     * @returns 无
     */
    function logInfo(sources: string | any): any | void;
    /**
     * console.warn 打印警告日志信息,方便开发调试
     * @param sources - 打印的警告日志内容
     * @returns 无
     */
    function logWarn(sources: string | any): any | void;
    /**
     * console.warn 打印错误日志信息,方便开发调试定位问题
     * @param sources - 打印的错误日志内容
     * @returns 无
     */
    function logError(sources: string | any): any | void;
}

/**
 * 图上量算 的 常用静态方法
 */
declare namespace MeasureUtil {
    /**
     * 求坐标数组的空间距离
     * @param coords - 坐标数组
     * @returns 距离（单位：米）
     */
    function getDistance(coords: L.LatLng[]): any | number;
    /**
     * 计算面积（空间平面）
     * @param coords - 坐标数组
     * @returns 面积，单位：平方米
     */
    function getArea(coords: L.LatLng[]): any | number;
    /**
     * 度数值 转 弧度值
     * @param degrees - 度数值
     * @returns 弧度值
     */
    function toRadians(degrees: number): any | number;
    /**
     * 计算2点的角度值，角度已正北为0度，顺时针为正方向
     * 【像素坐标，latlng通过map.latLngToContainerPoint 转换下】
     * @param pt1 - 需要计算的点 像素坐标
     * @param pt2 - 目标点，以该点为参考中心。 像素坐标
     * @returns 返回角度值，0-360度
     */
    function getAngle(pt1: L.Point | number[], pt2: L.Point | number[]): any | number;
    /**
     * 格式化显示距离值, 可指定单位
     * @param val - 距离值，米
     * @param [unit = 'auto'] - 计量单位, 可选值：auto、m、km、mile、zhang 。auto时根据距离值自动选用k或km
     * @returns 带单位的格式化距离值字符串，如：20.17 米
     */
    function formatDistance(val: number, unit?: string): any | string;
    /**
     * 格式化显示面积值, 可指定单位
     * @param val - 面积值，平方米
     * @param [unit = 'auto'] - 计量单位，可选值：auto、m、km、mu、ha 。auto时根据面积值自动选用m或km
     * @returns 带单位的格式化面积值字符串，如：20.21 平方公里
     */
    function formatArea(val: number, unit?: string): any | string;
}

/**
 * 坐标点的转换 相关静态方法。
 * 提供了平台内部不同坐标系之间的坐标转换、提供了国内偏移坐标系与标准坐标的转换。
 */
declare namespace PointTrans {
    /**
     * 经度纬度数组 转为 LatLng坐标值
     * @param coord - 经度纬度数组
     * @returns LatLng坐标值
     */
    function coord2latlng(coord: number[]): any | L.LatLng;
    /**
     * 经度纬度数组列表 转为 LatLng坐标值列表
     * @param coords - 经度纬度数组列表
     * @returns LatLng坐标值列表
     */
    function coords2latlngs(coords: any[][]): any | L.LatLng[];
    /**
     * LatLng坐标值 转为 经度纬度数组
     * @param latlng - LatLng坐标值
     * @returns 经度纬度数组
     */
    function latlng2coord(latlng: L.LatLng): any | number[];
    /**
     * LatLng坐标值列表 转为 经度纬度数组列表
     * @param latlngs - LatLng坐标值列表
     * @returns 经度纬度数组列表
     */
    function latlngs2coords(latlngs: L.LatLng[]): any | any[][];
    /**
     * LatLng坐标值数组 转为 WebMercator投影平面坐标数组
     * @param arr - LatLng坐标值数组
     * @returns WebMercator投影平面坐标数组
     */
    function latlngs2mercators(arr: L.LatLng[]): any | any[][];
    /**
     * WebMercator投影平面坐标数组 转为  LatLng坐标值数组
     * @param arr - WebMercator投影平面坐标数组
     * @returns LatLng坐标值数组
     */
    function mercators2latlngs(arr: any[][]): any | L.LatLng[];
    /**
     * WebMercator投影平面坐标数组 转为  LatLng坐标值数组
     * @param point - WebMercator投影平面坐标数组
     * @returns LatLng坐标值数组
     */
    function mercator2latlng(point: any[]): any | L.LatLng;
    /**
     * 经度/纬度 十进制 转为 度分秒格式
     * @param value - 经度或纬度值
     * @returns 度分秒对象，如： { degree:113, minute:24, second:40 }
     */
    function degree2dms(value: number): any | any;
    /**
     * 经度/纬度  度分秒 转为 十进制
     * @param degree - 度
     * @param minute - 分
     * @param second - 秒
     * @returns 十进制
     */
    function dms2degree(degree: number, minute: number, second: number): any | number;
    /**
     * 根据经度值 获取CGCS2000投影坐标对应的 EPSG值
     * @param lng - 经度值
     * @param [fd6 = false] - 是否为6度分带， true:6度分带,false:3度分带
     * @param [hasAddDH = true] - 横坐标前是否加带号
     * @returns EPSG值
     */
    function getCGCS2000EPSGByLng(lng: number, fd6?: boolean, hasAddDH?: boolean): any | string | undefined;
    /**
     * 根据加带号的横坐标值 获取CGCS2000投影坐标对应的EPSG值
     * @param x - 根据加带号的横坐标值
     * @returns EPSG值
     */
    function getCGCS2000EPSGByX(x: number): any | string | undefined;
    /**
     * 使用proj4转换坐标（支持任意坐标系），
     * 坐标系 可以在 {@link http://epsg.io }进行查询，已经内置支持 EPSG:4326、EPSG:3857、EPSG:4490、EPSG:4491至4554
     * @param arrdata - 原始坐标,示例：[39396641,3882123]
     * @param fromProjParams - 原始坐标的坐标系，如'EPSG:4527'
     * @param [toProjParams = 'EPSG:4326'] - 转为返回的结果坐标系
     * @returns 返回结果坐标系的对应坐标,示例：[115.866936, 35.062583]
     */
    function proj4Trans(arrdata: number[], fromProjParams: string | CRS, toProjParams?: string | CRS): any | number[];
    /**
     * 使用proj4转换坐标数组（支持任意坐标系），
     * 坐标系 可以在 {@link http://epsg.io }进行查询，已经内置支持 EPSG:4326、EPSG:3857、EPSG:4490、EPSG:4491至4554
     * @param coords - 原始坐标数组,示例：[[39396641,3882123],[39396623,3882134]]
     * @param fromProjParams - 原始坐标的坐标系，如'EPSG:4527'
     * @param [toProjParams = 'EPSG:4326'] - 转为返回的结果坐标系
     * @returns 返回结果坐标系的对应坐标数组,示例：[[115.866936, 35.062583],[115.866923, 35.062565]]
     */
    function proj4TransArr(coords: number[], fromProjParams: string, toProjParams?: string): any | number[];
    /**
     * 经纬度地理坐标 转 投影平面坐标
     * @param lnglat - 经纬度坐标,示例：[123.123456,32.654321,20.1]
     * @returns WebMercator投影平面坐标,示例：[13048882,3741659,20.1]
     */
    function lonlat2mercator(lnglat: number[]): any | number[];
    /**
     * 经纬度地理坐标数组 转 投影平面坐标数组
     * @param arr - 经纬度坐标数组,示例：[ [123.123456,32.654321,20.1], [111.123456,22.654321,21.2] ]
     * @returns WebMercator投影平面坐标数组,示例：[[13048882,3741659,20.1],[13048882,3741659,21.2] ]
     */
    function lonlats2mercators(arr: any[][]): any | any[][];
    /**
     * 投影平面坐标 转 经纬度地理坐标
     * @param point - WebMercator投影平面坐标,示例：[13048882,3741659,20.1]
     * @returns 经纬度坐标,示例：[123.123456,32.654321,20.1]
     */
    function mercator2lonlat(point: number[]): any | number[];
    /**
     * 投影平面坐标数组 转 经纬度地理坐标数组
     * @param arr - WebMercator投影平面坐标数组,示例：[[13048882,3741659,20.1],[13048882,3741659,21.2] ]
     * @returns 经纬度坐标数组,示例：[ [123.123456,32.654321,20.1], [111.123456,22.654321,21.2] ]
     */
    function mercators2lonlats(arr: any[][]): any | any[][];
    /**
     * 经纬度坐标转换，
     * 百度坐标 (BD09) 转换为 国测局坐标 (GCJ02)
     * @param arrdata - 百度坐标 (BD09)坐标数据，示例：[117.225590,31.832916]
     * @returns 国测局坐标 (GCJ02)坐标数据，示例：[:117.22559,31.832917]
     */
    function bd2gcj(arrdata: number[]): any | number[];
    /**
     * 经纬度坐标转换，
     * 国测局坐标 (GCJ02) 转换为 百度坐标 (BD09)
     * @param arrdata - 高德谷歌等国测局坐标 (GCJ02) 坐标数据，示例：[117.225590,31.832916]
     * @returns 百度坐标 (BD09)坐标数据，示例：[117.232039,31.839177]
     */
    function gcj2bd(arrdata: number[]): any | number[];
    /**
     * 经纬度坐标转换，
     * 标准无偏坐标（WGS84） 转为 国测局坐标 (GCJ02)
     * @param arrdata - 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
     * @returns 国测局坐标 (GCJ02)坐标数据，示例：[117.225590,31.832916]
     */
    function wgs2gcj(arrdata: number[]): any | number[];
    /**
     * 经纬度坐标转换，
     * 国测局坐标 (GCJ02)  转换为 标准无偏坐标（WGS84）
     * @param arrdata - 国测局坐标 (GCJ02)坐标数据，示例：[117.225590,31.832916]
     * @returns 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
     */
    function gcj2wgs(arrdata: number[]): any | number[];
    /**
     * 经纬度坐标转换，
     * 百度坐标 (BD09) 转 标准无偏坐标（WGS84）
     * @param arrdata - 百度坐标 (BD09)坐标数据，示例：[117.232039,31.839177]
     * @returns 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
     */
    function bd2wgs(arrdata: number[]): any | number[];
    /**
     * 标准无偏坐标（WGS84）  转 百度坐标 (BD09)
     * @param arrdata - 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
     * @returns 百度坐标 (BD09)坐标数据，示例：[117.232039,31.839177]
     */
    function wgs2bd(arrdata: number[]): any | number[];
    /**
     * 【方式2】经纬度地理坐标 转 投影平面坐标
     * @param arrdata - 经纬度坐标,示例：[117.220101,31.834907]
     * @returns WebMercator投影平面坐标,示例：[13048882.06,3741659.72]
     */
    function jwd2mct(arrdata: number[]): any | number[];
    /**
     * 【方式2】投影平面坐标 转 经纬度地理坐标
     * @param arrdata - WebMercator投影平面坐标，示例：[13048882.06,3741659.72]
     * @returns 经纬度坐标数据，示例：[117.220101,31.834907]
     */
    function mct2jwd(arrdata: number[]): any | number[];
}

/**
 * 单个坐标或位置矩阵相关的处理 静态方法
 */
declare namespace PointUtil {
    /**
     * 获取PointTrans中对应的坐标转换方法
     * srcCoordType 转 dstCoordType 对应的方法名称
     * @param srcCoordType - 原始的坐标系
     * @param dstCoordType - 转换后的坐标系
     * @returns PointTrans中对应的坐标转换方法
     */
    function getTransFun(srcCoordType: ChinaCRS, dstCoordType: ChinaCRS):  (...params: any[]) => any;
    /**
     * 克隆坐标数组
     * @param latlngs - 坐标数组
     * @returns 新的坐标数组
     */
    function cloneLatLngs(latlngs: L.LatLng[]): any | L.LatLng[];
    /**
     * 克隆坐标
     * @param latlng - 坐标
     * @returns 新的坐标
     */
    function cloneLatLng(latlng: L.LatLng): any | L.LatLng;
    /**
     * 从起点到终点按"curr/all"比例的新的位置点坐标
     * @param p1 - 起点坐标
     * @param p2 - 终点坐标
     * @param all - 总秒数
     * @param curr - 当前秒数
     * @returns 新的坐标
     */
    function interpolatePosition(p1: L.LatLng, p2: L.LatLng, all: number, curr: number): any | L.LatLng;
    /**
     * 计算指定角度和距离处的点
     * @param center - 现有点
     * @param distance - 距离
     * @param angle - 角度
     * @returns 目前点
     */
    function getPointByDistanceAngle(center: L.LatLng, distance: number, angle: number): any | L.LatLng;
}

/**
 * 线面对象 静态方法
 */
declare namespace PolyUtil {
    /**
     * 检查两条线段是否相交
     * @param p - 线段1起点
     * @param p1 - 线段1终点
     * @param p2 - 线段2起点
     * @param p3 - 线段2终点
     * @returns 两条线段是否相交
     */
    function segmentsIntersect(p: L.Point | number[], p1: L.Point | number[], p2: L.Point | number[], p3: L.Point | number[]): any | boolean;
    /**
     * 计算平行线坐标
     * @param pts - 坐标数组
     * @param offset - 偏移值
     * @returns 平行线坐标数组
     */
    function getOffsetPoints(pts: L.LatLng[], offset: number): any | L.LatLng[];
    /**
     * 计算圆的边线坐标列表
     * @param center - 中心点
     * @param radius - 半径
     * @param [count = 100] - 点个数
     * @returns 边界线坐标数组
     */
    function getCircleOutlineLatlngs(center: L.LatLng, radius: number, count?: number): any | L.LatLng[];
    /**
     * 在 指定bbox区域 内生成 指定数量(概略) 的网格坐标点，
     * 目前常用于生成坐标点，测试数据量
     * @param bounds - 区域范围
     * @param count - 数量(概略)，返回坐标接近此数字
     * @returns 坐标集合 ,如： {points:[LngLatPoint,LngLatPoint], size: 500 }
     */
    function getGridPoints(bounds: L.LatLngBounds, count: number): any | any;
}

/**
 * 常用静态方法
 */
declare namespace Util {
    /**
     * 赋予默认值
     * @param a - 判断的对象
     * @param b - 默认值
     * @returns 当a有效时返回a,当a为空时返回默认值b
     */
    function defaultValue(a: any, b: any): any | any;
    /**
     * 判断对象是否为空
     * @param a - 判断的对象
     * @returns 对象是否为空
     */
    function defined(a: any): any | boolean;
    /**
     * 判断对象是否为number类型
     * @param obj - 对象
     * @returns 是否为number类型
     */
    function isnumber(obj: any): any | boolean;
    /**
     * 判断对象是否为String类型
     * @param obj - 对象
     * @returns 是否为String类型
     */
    function isString(obj: any): any | boolean;
    /**
     * 判断对象是否为Boolean类型
     * @param obj - 对象
     * @returns 是否为Boolean类型
     */
    function isBoolean(obj: any): any | boolean;
    /**
     * 判断对象是否为Object类型
     * @param obj - 对象
     * @returns 是否为Object类型
     */
    function isObject(obj: any): any | boolean;
    /**
     * 判断对象是否为纯粹的Object类型
     * （所谓"纯粹的对象"，就是该对象是通过"{}"或"new Object"创建的）
     * @param obj - 对象
     * @returns 是否为Object类型
     */
    function isPlainObject(obj: any): any | boolean;
    /**
     * 判断对象是否为function方法
     * @param val - 对象
     * @returns 是否为function方法
     */
    function isFunction(val: any): any | boolean;
    /**
     * 判断对象是否为简单类型（包括：String\Boolean\number\Array）
     * @param value - 对象
     * @returns 是否为简单类型（包括：String\Boolean\number\Array）
     */
    function isSimpleType(value: any): any | boolean;
    /**
     * 格式化数字，返回指定小数位的数字
     * @param num - 数字
     * @param [digits = 0] - 小数位数
     * @returns 返回digits指定小数位的数字
     */
    function formatNum(num: number, digits?: number): any | number;
    /**
     * 按指定长度,对数字进行补零，返回指定长度的字符串
     * @param numStr - 数字对象,示例：1234
     * @param n - 指定长度，示例：8
     * @returns 补零后的指定长度的字符串，示例：'00001234'
     */
    function padLeft0(numStr: number | string, n: number): any | string;
    /**
     * 根据空格分割字符串，并返回字符串数组（会自动去掉首位空格）
     * @param str - 字符串
     * @returns 分割后的字符串数组
     */
    function splitWords(str: string): any | string[];
    /**
     * 除去字符串首尾的空格
     * @param str - 字符串
     * @returns 除去首尾空格的字符串
     */
    function trim(str: string): any | string;
    /**
     * 获取字符串长度，区分中文和英文
     * @param str - 字符串
     * @returns 字符串长度
     */
    function getStrLength(str: string): any | number;
    /**
     * 根据数据和格式化字符串模板，返回字符串
     * @example
     * let str = mars2d.Util.template("<div>名称：{name}</div>", { name:"火星科技", date:"2017-8-25"} );
     *  //str结果为 : "<div>名称：火星科技</div>"
     * @param str - 格式化字符串模版，属性字段为大括号，如 {name}
     * @param data - 数据对象
     * @param [toEmpty = false] - 是否将模板中未匹配项转为空值
     * @returns 返回字符串
     */
    function template(str: string, data: any, toEmpty?: boolean): any | string;
    /**
     * 获取随机唯一uuid字符串,包含数字、大写字母、小写字母
     * @param [prefix = 'M'] - 前缀
     * @returns 字符串
     */
    function createGuid(prefix?: string): any | string;
    /**
     * 获取Popup或Tooltip格式化Html字符串
     * @example
     * //template可以是'all' ，返回数据的全部属性信息
     * tiles3dLayer.bindPopup(function (event) {
     *   let attr = event.graphic.attr
     *   return mars2d.Util.getTemplateHtml({ title: '桥梁', template: 'all', attr: attr })
     * })
     *
     * //template可以是格式化字符串模板
     * let html = mars2d.Util.getTemplateHtml({ title: '火星项目', template:  "名称：{项目名称}<br />类型：{设施类型}<br />面积：{用地面积}亩<br />位置：{具体位置}", attr: item })
     *
     * //可以是数组的template，按数组顺序构造，并转义字段名称
     * //
     * let html = mars2d.Util.getTemplateHtml({
     *   title: '塔杆',
     *   template: [
     *     { field: 'roadName', name: '所属线路' },
     *     { field: 'towerId', name: '杆塔编号' },
     *     { field: '杆塔型号', name: '杆塔型号' },
     *     { field: '杆塔性质', name: '杆塔性质' },
     *     { field: '杆塔类型', name: '杆塔类型' },
     *     { field: '设计单位', name: '设计单位' },
     *     { field: 'height', name: '海拔高度' },
     *   ],
     *   attr: item,
     * })
     * @param [options = {}] - 参数对象:
     * @param options.attr - 属性值
     * @param options.template - 模版配置，支持：'all'、数组、字符串模板
     * @param [options.title] - 标题
     * @param [options.edit = false] - 是否返回编辑输入框
     * @param [options.width = 190] - edit:true时的，编辑输入框宽度值
     * @returns Html字符串
     */
    function getTemplateHtml(options?: {
        attr: any;
        template: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any;
        title?: string;
        edit?: boolean;
        width?: number;
    }): any | string;
    /**
     * 取属性值，最简的键值对。
     * 方便popup、tooltip等构造方法使用
     * @param attr - 属性对象
     * @param [options = {}] - 参数对象:
     * @param options.onlySimpleType - 是否只获取简易类型的对象
     * @returns 最简的键值对属性对象
     */
    function getAttrVal(attr: any, options?: {
        onlySimpleType: boolean;
    }): any | any;
    /**
     * 合并对象，对二级子属性为Object的对象也会进行融合。
     * @param dest - 目标对象
     * @param sources - 需要融入合并的对象
     * @returns 融合后的对象
     */
    function merge(dest: any, sources: any): any | any;
    /**
     * 复制克隆对象
     * @param obj - 原始对象
     * @param [removeKeys = []] - 不复制的属性名 数组
     * @param [level = 5] - 拷贝的层级最大深度,避免死循环
     * @returns 克隆后的对象
     */
    function clone(obj: any, removeKeys?: string[], level?: number): any | any;
    /**
     * 随机获取数组中的一个元素
     * @param arr - 数组
     * @returns 获取到的随机元素
     */
    function getArrayRandomOne(arr: any[]): any | any;
    /**
     * 移除数组中的指定对象
     * @param arr - 数组
     * @param val - 需要移除的数组元素对象
     * @returns 对象是否移除成功
     */
    function removeArrayItem(arr: any[], val: any): any | boolean;
    /**
     * 根据属性 和symbol配置 取style样式信息
     * @param symbol - symbol配置
     * @param symbol.styleOptions - Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
     * @param [symbol.styleField] - 按 styleField 属性设置不同样式。
     * @param [symbol.styleFieldOptions] - 按styleField值与对应style样式的键值对象。
     * @param [symbol.callback] - 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
     * @param [attr] - 数据属性对象
     * @returns style样式
     */
    function getSymbolStyle(symbol: {
        styleOptions: any;
        styleField?: string;
        styleFieldOptions?: any;
        callback?: (...params: any[]) => any;
    }, attr?: any): any | any;
    /**
     * 获取GeoJSON中的features数组集合（自动判断数据来源）
     * @param geojson - geojson对象
     * @returns features数组集合
     */
    function getGeoJsonFeatures(geojson: any): any | any;
    /**
     * GeoJSON 转为 Graphic构造参数数组
     * style有3种方式控制: 1.传type及style参数；2.传symbol参数；3.数据本身的feature.properties.style；
     * 优先级为：1>2>3
     * @param geojson - geojson对象
     * @param [options = {}] - 控制参数
     * @param [options.type] - 转为指定的类型
     * @param [options.style = {}] - Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
     * @param [options.symbol] - symbol配置，与style二选一
     * @param [options.symbol.type] - 标识数据类型
     * @param [options.symbol.merge] - 是否合并并覆盖json中已有的style，默认不合并，仅适用symbol配置。
     * @param options.symbol.styleOptions - Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
     * @param [options.symbol.styleField] - 按 styleField 属性设置不同样式。
     * @param [options.symbol.styleFieldOptions] - 按styleField值与对应style样式的键值对象。
     * @param [options.symbol.callback] - 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
     * @param [options.crs] - 原始数据的坐标系，如'EPSG:3857' （可以从 {@link http://epsg.io }查询）
     * @returns Graphic构造参数数组
     */
    function geoJsonToGraphics(geojson: any, options?: {
        type?: GraphicType | string;
        style?: any;
        symbol?: {
            type?: GraphicType | string;
            merge?: boolean;
            styleOptions: any;
            styleField?: string;
            styleFieldOptions?: any;
            callback?: (...params: any[]) => any;
        };
        crs?: string;
    }): any | any;
    /**
     * GeoJSON格式的Feature单个对象转为 Graphic构造参数（用于创建Graphic）
     * @param feature - geojson单个Feature对象
     * @param [options = {}] - 参数，包括：
     * @param [options.type] - 转为指定的类型
     * @param [options.style = {}] - Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
     * @param [options.crs] - 原始数据的坐标系，如'EPSG:3857' （可以从 {@link http://epsg.io }查询）
     * @param [options.onPointTrans] - 坐标转换方法，可用于对每个坐标做额外转换处理
     * @returns Graphic构造参数（用于创建Graphic）
     */
    function featureToGraphic(feature: any, options?: {
        type?: GraphicType | string;
        style?: any;
        crs?: string;
        onPointTrans?: (...params: any[]) => any;
    }): any | any;
    /**
     * 导出下载图片文件
     * @param name - 图片文件名称，不需要后缀名
     * @param base64 - 图片内容，base64格式
     * @returns 无
     */
    function downloadBase64Image(name: string, base64: string): any | void;
    /**
     * 导出下载文本文件
     * @param fileName - 文件完整名称，需要含后缀名
     * @param string - 文本内容
     * @returns 无
     */
    function downloadFile(fileName: string, string: string): any | void;
    /**
     * 执行alert弹窗
     * @param msg - 弹窗内的内容
     * @param [title] - 弹窗的标题
     * @returns 无
     */
    function alert(msg: string, title?: string): any | void;
    /**
     * 执行msg提示窗（自动消失）
     * @param msg - 弹窗内的内容
     * @returns 无
     */
    function msg(msg: string): any | void;
    /**
     * 将 时间 转化为指定格式的字符串
     * @example
     * mars2d.Util.formatDate(date,"yyyy-MM-dd HH:mm:ss") ==> 2017-08-25 08:08:00
     * mars2d.Util.formatDate(date,"yyyy-MM-dd HH:mm:ss.S") ==> 2017-08-25 08:08:00.423
     * mars2d.Util.formatDate(date,"yyyy-M-d HH:mm:ss") ==> 2017-8-5 08:08:00
     * @param date - 时间
     * @param fmt - 格式模版，月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符; 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字).
     * @returns 指定格式的字符串
     */
    function formatDate(date: Date, fmt: string): any | string;
    /**
     * 格式化时长
     * @param strtime - 时长
     * @returns 格式化字符串，如XX小时XX分钟
     */
    function formatTime(strtime: number): any | string;
    /**
     * 请求服务返回json结果，方法是基于axios库精简的
     * @param options - 请求参数
     * @param options.url - 服务URL地址
     * @param [options.queryParameters] - 与请求一起发送的 URL 参数,例如 {id: 1987 }
     * @param [options.method = "get"] - 请求类型
     * @param [options.timeout = 0] - 是否超时
     * @param [options.headers] - 一个对象，将发送的其他HTTP标头。比如：headers: { 'X-My-Header': 'valueOfHeader' }
     * @returns 返回Promise异步处理结果，对象为response对象
     */
    function fetchJson(options: {
        url: string;
        queryParameters?: any;
        method?: string;
        timeout?: number;
        headers?: any;
    }): any | Promise<any>;
    /**
     * 请求服务返回结果，方法是基于axios库精简的
     * @param options - 请求参数
     * @param options.url - 服务URL地址
     * @param [options.queryParameters] - 与请求一起发送的 URL 参数,例如 {id: 1987 }
     * @param [options.method = "get"] - 请求类型
     * @param [options.timeout = 0] - 是否超时
     * @param [options.headers] - 一个对象，将发送的其他HTTP标头。比如：headers: { 'X-My-Header': 'valueOfHeader' }
     * @returns 返回Promise异步处理结果，对象为response对象
     */
    function sendAjax(options: {
        url: string;
        queryParameters?: any;
        method?: string;
        timeout?: number;
        headers?: any;
    }): any | Promise<any>;
    /**
     * 获取随机颜色
     * @returns /返回rgb(r,g,b)格式颜色
     */
    function randomColor(): any | string;
    /**
     * 毫米数值 转为 像素数值
     * @param mm - 毫米数值
     * @returns 像素数值
     */
    function mm2px(mm: number): any | number;
}




/**
 * 控件类 命名空间，
 * 教程 http://mars2d.cn/dev/guide/map/control.html
 */
declare namespace control {
  export { ToolBar }
  export { LocationBar }
  export { MapSwich }
  export { OverviewMap }
  export { Slider }
  export { ToolButton }
}

/**
 * 矢量数据类 命名空间，
 * 教程 http://mars2d.cn/dev/guide/map/graphic.html
 */
declare namespace graphic {

  //edit
  export { BaseEditSimpleShape }
  export { EditMarker }
  export { EditCircleMarker }
  export { EditCircle }
  export { EditEllipse }
  export { EditPoly }
  export { EditRectangle }

  //
  export { Marker }
  export { MovingMarker }
  export { Label }
  export { DivGraphic }
  export { DivLightPoint }
  export { DivBoderLabel }
  export { DivUpLabel }
  export { Point }
  export { Polyline }
  export { Polygon }
  export { Circle }
  export { Ellipse }
  export { Rectangle }
  export { Image }
  export { CanvasImage }

  export { AttackArrow }
  export { AttackArrowPW }
  export { AttackArrowYW }
  export { CloseVurve }
  export { DoubleArrow }
  export { FineArrow }
  export { FineArrowYW }
  export { GatheringPlace }
  export { StraightArrow }

  export { DistanceMeasure }
  export { AreaMeasure }

  //draw
  export { BaseDraw }
  export { BaseSimpleShape }
  export { DrawMarker }
  export { DrawPoint }
  export { DrawFontGraphic }
  export { DrawLabel }
  export { DrawDivGraphic }
  export { DrawPolyline }
  export { DrawPolygon }
  export { DrawBrushLine }
  export { DrawDistanceMeasure }
  export { DrawAreaMeasure }

  export { DrawCircle }
  export { DrawEllipse }
  export { DrawRectangle }
  export { DrawImage }
  export { BaseDrawPlot }
  export { DrawAttackArrow }
  export { DrawAttackArrowPW }
  export { DrawAttackArrowYW }
  export { DrawCloseVurve }
  export { DrawDoubleArrow }
  export { DrawFineArrow }
  export { DrawFineArrowYW }
  export { DrawGatheringPlace }
  export { DrawStraightArrow }
}

/**
 * 图层类 命名空间，
 * 教程 http://mars2d.cn/dev/guide/map/layer.html
 */
declare namespace layer {
  export { GroupLayer }
  export { TileLayer }
  export { TileLayer as XyzLayer }
  export { ArcGisLayer }
  export { ArcGisCacheLayer }
  export { ArcGisCompactLayer }
  export { BaiduLayer }
  export { GoogleLayer }
  export { ImageLayer }
  export { ImageRotatedLayer }
  export { OsmLayer }
  export { TdtLayer }
  export { TencentLayer }
  export { WmsLayer }
  export { WmtsLayer }
  export { GaodeLayer }
  export { MapboxLayer }

  export { VirtualGrid }
  export { GraphicLayer }
  export { GeoJsonLayer }
  export { DayNightLayer }
  export { GraticuleLayer }
  export { ClusterLayer }
  export { PbfLayer }
  export { WfsLayer }
  export { HeatLayer }
  export { CanvasMarkerLayer }

  export { EchartsLayer }
  export { MapVLayer }
  export { ArcGisDynamicLayer }
  export { ArcGisFeatureLayer }
  export { ArcGisImageLayer }
  export { ArcGisTileLayer }
}

/**
 * 服务查询类 命名空间
 */
declare namespace query {
  export { GaodePOI }
  export { GaodeRoute }
  export { QueryArcServer }
  export { QueryGeoServer }
}


/**
 * 管理或分析类 命名空间，
 * 教程 http://mars2d.cn/dev/guide/map/thing.html
 */
declare namespace thing {
  export { Measure }
  export { ExpImg }
}


export {
  name, update, version, proj4, esri,
  BaseClass, BaseThing, SmallTooltip, Token, CRS, ChinaCRS, EventType, GraphicType, LayerType, HorizontalOrigin, VerticalOrigin, MapSwichType, State,
  Util, Log, GraphicUtil, LayerUtil, PointUtil, PointTrans, PolyUtil, DrawUtil, MeasureUtil,
  BaseOptsConver, MarkerStyleConver, DivGraphicStyleConver, LabelStyleConver, PointStyleConver, CircleStyleConver, PolylineStyleConver, PolygonStyleConver, RectangleStyleConver,
  control, graphic, layer, thing, query,
  Map,
};
