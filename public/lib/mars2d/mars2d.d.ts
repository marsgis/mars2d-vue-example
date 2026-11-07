
/**
 * Mars2D地理信息平台  mars2d 免费公开版
 * 版本信息：v3.5.1
 * 编译日期：2026-11-05 08:15 ZX
 * 版权所有：Copyright by http://mars2d.cn
 *
 * Apache-2.0 WITH Mars2D Additional Terms | https://mars2d.cn
 * Runtime logo and F12 console notice must be retained.
 * Commercial license: http://mars2d.cn/buy.html
 */
import * as L from "leaflet"
export { L }

/** 由 mars2d-esri 插件在运行时注入，主包本身不提供 */
declare const esri: any


declare const version: string
declare const update: string
declare const name: string
declare const website: string
declare const proj4: any
declare const ChinaCRS: {
  readonly WGS84: "WGS84";
  readonly GCJ02: "GCJ02";
  readonly BAIDU: "BD09";
};
declare type ChinaCRS = (typeof ChinaCRS)[keyof typeof ChinaCRS];
declare const CRS: {
  readonly EPSG3857: "EPSG:3857";
  readonly EPSG4326: "EPSG:4326";
  readonly EPSG4490: "EPSG:4490";
  readonly IMAGE: "IMAGE";
  readonly PGIS: "PGIS";
  readonly BAIDU: "BAIDU";
  readonly CGCS2000_GK_Zone_3: "CGCS2000_GK_Zone_3";
  readonly CGCS2000_GK_Zone_6: "CGCS2000_GK_Zone_6";
  readonly CGCS2000_GK_CM_3: "CGCS2000_GK_CM_3";
  readonly CGCS2000_GK_CM_6: "CGCS2000_GK_CM_6";
};
declare type CRS = (typeof CRS)[keyof typeof CRS];
declare const EventType: {
  readonly add: "add";
  readonly remove: "remove";
  readonly addGraphic: "addGraphic";
  readonly removeGraphic: "removeGraphic";
  readonly addLayer: "addLayer";
  readonly removeLayer: "removeLayer";
  readonly show: "show";
  readonly hide: "hide";
  readonly update: "update";
  readonly start: "start";
  readonly change: "change";
  readonly end: "end";
  readonly stop: "stop";
  readonly load: "load";
  readonly updatePosition: "updatePosition";
  readonly updateAttr: "updateAttr";
  readonly updateStyle: "updateStyle";
  readonly rightClick: "contextmenu";
  readonly click: "click";
  readonly dblclick: "dblclick";
  readonly mousedown: "mousedown";
  readonly mouseup: "mouseup";
  readonly mousemove: "mousemove";
  readonly mouseover: "mouseover";
  readonly mouseout: "mouseout";
  readonly keydown: "keydown";
  readonly keyup: "keyup";
  readonly zoomstart: "zoomstart";
  readonly zoom: "zoom";
  readonly zoomend: "zoomend";
  readonly movestart: "movestart";
  readonly move: "move";
  readonly moveend: "moveend";
  readonly layeradd: "layeradd";
  readonly layerremove: "layerremove";
  readonly popupclose: "popupclose";
  readonly popupopen: "popupopen";
  readonly tooltipclose: "tooltipclose";
  readonly tooltipopen: "tooltipopen";
  readonly drawStart: "drawStart";
  readonly drawMouseMove: "drawMouseMove";
  readonly drawAddPoint: "drawAddPoint";
  readonly drawRemovePoint: "drawRemovePoint";
  readonly drawCreated: "drawCreated";
  readonly editStart: "editStart";
  readonly editMouseMove: "editMouseMove";
  readonly editMovePoint: "editMovePoint";
  readonly editRemovePoint: "editRemovePoint";
  readonly editAddPoint: "editAddPoint";
  readonly editStyle: "editStyle";
  readonly editStop: "editStop";
};
declare type EventType = (typeof EventType)[keyof typeof EventType];
declare const GraphicType: {
  readonly marker: "marker";
  readonly movingMarker: "movingMarker";
  readonly divGraphic: "divGraphic";
  readonly divLightPoint: "divLightPoint";
  readonly divUpLabel: "divUpLabel";
  readonly divBoderLabel: "divBoderLabel";
  readonly fontGraphic: "fontGraphic";
  readonly label: "label";
  readonly point: "point";
  readonly circle: "circle";
  readonly ellipse: "ellipse";
  readonly polyline: "polyline";
  readonly brushLine: "brushLine";
  readonly antPath: "antPath";
  readonly polygon: "polygon";
  readonly rectangle: "rectangle";
  readonly image: "image";
  readonly canvasImage: "canvasImage";
  readonly distanceMeasure: "distanceMeasure";
  readonly areaMeasure: "areaMeasure";
  readonly attackArrow: "attackArrow";
  readonly attackArrowPW: "attackArrowPW";
  readonly attackArrowYW: "attackArrowYW";
  readonly doubleArrow: "doubleArrow";
  readonly fineArrow: "fineArrow";
  readonly fineArrowYW: "fineArrowYW";
  readonly straightArrow: "straightArrow";
  readonly closeVurve: "closeVurve";
  readonly gatheringPlace: "gatheringPlace";
  readonly bouncingMarker: "bouncingMarker";
  readonly div: "div";
  readonly featureGroup: "featureGroup";
  readonly polyDecorator: "polyDecorator";
  readonly rain: "rain";
  readonly snow: "snow";
};
declare type GraphicType = (typeof GraphicType)[keyof typeof GraphicType];
declare const LayerType: {
  readonly group: "group";
  readonly tdt: "tdt";
  readonly baidu: "baidu";
  readonly gaode: "gaode";
  readonly tencent: "tencent";
  readonly osm: "osm";
  readonly google: "google";
  readonly mapbox: "mapbox";
  readonly image: "image";
  readonly imageRotated: "imageRotated";
  readonly xyz: "xyz";
  readonly tile: "tile";
  readonly arcgis: "arcgis";
  readonly wms: "wms";
  readonly wmts: "wmts";
  readonly arcgis_cache: "arcgis_cache";
  readonly arcgis_compact: "arcgis_compact";
  readonly arcgis_tile: "arcgis_tile";
  readonly arcgis_dynamic: "arcgis_dynamic";
  readonly arcgis_image: "arcgis_image";
  readonly sm_tile: "sm_tile";
  readonly graphic: "graphic";
  readonly geojson: "geojson";
  readonly pbf: "pbf";
  readonly wfs: "wfs";
  readonly arcgis_feature: "arcgis_feature";
  readonly canvasMarker: "canvasMarker";
  readonly cluster: "cluster";
  readonly graticule: "graticule";
  readonly dayNight: "dayNight";
  readonly heat: "heat";
  readonly mapv: "mapv";
  readonly echarts: "echarts";
  readonly busineData: "busineData";
  readonly empty: "empty";
  readonly virtualGrid: "virtualGrid";
};
declare type LayerType = (typeof LayerType)[keyof typeof LayerType];
declare const QueryServiceType: {
  readonly TDT: "tdt";
  readonly GAODE: "gaode";
  readonly BAIDU: "baidu";
};
declare type QueryServiceType = (typeof QueryServiceType)[keyof typeof QueryServiceType];
declare const State: {
  readonly INITIALIZED: "inited";
  readonly ADDED: "added";
  readonly REMOVED: "removed";
  readonly DESTROY: "destroy";
};
declare type State = (typeof State)[keyof typeof State];
declare const HorizontalOrigin: {
  readonly LEFT: 1;
  readonly CENTER: 0;
  readonly RIGHT: "";
};
declare type HorizontalOrigin = (typeof HorizontalOrigin)[keyof typeof HorizontalOrigin];
declare const MapSwichType: {
  readonly Vec: 0;
  readonly Img: 1;
  readonly Map3D: 2;
  readonly Pano: 3;
};
declare type MapSwichType = (typeof MapSwichType)[keyof typeof MapSwichType];
declare const QueryRouteType: {
  readonly Walking: 1;
  readonly Bicycling: 2;
  readonly Driving: 3;
};
declare type QueryRouteType = (typeof QueryRouteType)[keyof typeof QueryRouteType];
declare const VerticalOrigin: {
  readonly TOP: "";
  readonly CENTER: 0;
  readonly BOTTOM: 1;
};
declare type VerticalOrigin = (typeof VerticalOrigin)[keyof typeof VerticalOrigin];
declare namespace Globe {
  /**
   * Popup或Tooltip配置的数组方式对象
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
 * 鼠标经纬度等信息状态栏,
 * 一般在页面下侧区域
 * @param {any} [options] 参数对象，包括以下：
 * @param {string} [options.template] 展示的内容格式化字符串,
支持以下模版配置：
【鼠标所在位置】 经度:{lng}， 纬度:{lat}，
【地图的】 层级：{level}，
 * @param {number} [options.latDecimal] 保留的{lat}和{lng}的小数位
 * @param {number} [options.levelDecimal] 保留的{level}的小数位
 * @param {string | CRS} [options.crs] 按指定坐标系显示坐标值,  配置后template可以加模板：【鼠标所在位置对应的crs坐标系】 X或经度值：{crsx}， Y或纬度值：{crsy}
 * @param {number} [options.crsDecimal] 保留的{crsx}和{crsy}的小数位
 * @param {number} [options.cacheTime] 鼠标移动的缓存时间
 * @param {any} [options.style] 可以CSS样式，如：{ top: '10px', left: '10px' }，会合并到控件容器样式
 */
declare class LocationBar extends L.Control {
    constructor(options?: {
        template?: string;
        latDecimal?: number;
        levelDecimal?: number;
        crs?: string | CRS;
        crsDecimal?: number;
        cacheTime?: number;
        style?: any;
      });
    /**
     * 显示的数据
     */
    readonly locationData: any;
    onAdd(): void | any;
    onRemove(): void | any;
}

/**
 * 卷帘对比 控件
 * @param {any} options 参数对象（必填，不传时构造函数会报错），包括以下：
 * @param {L.TileLayer | L.TileLayer[]} options.leftLayer 左侧区域瓦片图层
 * @param {L.TileLayer | L.TileLayer[]} options.rightLayer 右侧区域瓦片图层
 */
declare class MapSplit extends L.Control {
    constructor(options: {
        leftLayer: L.TileLayer | L.TileLayer[];
        rightLayer: L.TileLayer | L.TileLayer[];
      });
    /**
     * 左侧区域瓦片图层
     */
    leftLayer: L.TileLayer | L.TileLayer[] | any;
    /**
     * 右侧区域瓦片图层
     */
    rightLayer: L.TileLayer | L.TileLayer[] | any;
    initialize(): void | any;
    getPosition(): void | any;
    setPosition(): void | any;
    addTo(): void | any;
    remove(): void | any;
    setLeftLayers(): void | any;
    setRightLayers(): void | any;
    clipLayer(): void | any;
    on(): void | any;
    off(): void | any;
    once(): void | any;
    fire(): void | any;
}

/**
 * 地图切换控件，支持与三维地图、全景切换。
 * @param {any} [options] 参数对象，包括以下：
 * @param {MapSwichType} [options.selected] 默认选择的类型
 * @param {boolean} [options.hasPano] 是否存在全景按钮
 */
declare class MapSwich extends L.Control {
    constructor(options?: {
        selected?: MapSwichType;
        hasPano?: boolean;
      });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement | any;
    addTo(): void | any;
    remove(): void | any;
    onAdd(): void | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {BaseClass} 事件对象（支持链式调用）
     */
    on(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): BaseClass | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {BaseClass} 事件对象（支持链式调用）
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): BaseClass | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} data 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {BaseClass} 事件对象（支持链式调用）
     */
    fire(type: string | EventType | any, data: any, propagate?: BaseClass | any): BaseClass | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {BaseClass} 事件对象（支持链式调用）
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): BaseClass | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
}

/**
 * 鹰眼地图
 * @param {any} [options] 参数对象，包括以下：
 * @param {Map.Options} [options.mapOptions] 扩展鹰眼地图的构造参数选项。
 * @param {boolean} [options.minimized] 默认展示时是否最小化
 * @param {string} [options.position] 位置参数,标准Leaflet.Control，与所有其他控件一样使用
 * @param {number} [options.width] 地图的宽度，以像素为单位
 * @param {number} [options.height] 地图的高度，以像素为单位
 * @param {number} [options.collapsedWidth] 折叠标记的宽度和折叠时的小地图（以像素为单位）
 * @param {number} [options.collapsedHeight] 折叠标记的高度和折叠时的小地图（以像素为单位）
 * @param {boolean} [options.toggleDisplay] 设置小地图是否应该有一个按钮来最小化它
 * @param {number} [options.zoomLevelOffset] 与主地图的缩放相比，偏移应用于小地图的缩放。可以为正或负
 * @param {boolean} [options.zoomLevelFixed] 覆盖偏移以将固定缩放级别应用于小地图，而不管主地图缩放。将其设置为任何有效的缩放级别，如果使用未设置zoomLevelOffset。
 * @param {boolean} [options.centerFixed] 不管主图的视图/位置如何，都可以将固定位置应用于小地图。防止平移小地图，但允许缩放（在小地图和主地图中）。如果小地图放大，它将始终放大centerFixed点。您可以传入一个LatLng等效对象。
 * @param {boolean} [options.zoomAnimation] 设置小地图是否应该有动画缩放（将导致它在主地图移动后滞后）
 * @param {boolean} [options.autoToggleDisplay] 设置如果父映射边界不适合小地图范围内的小地图是否应自动隐藏。当设置'zoomLevelFixed'时特别有用。
 * @param {any} [options.aimingRectOptions] 通过传递Path.Options对象来设置瞄准矩形的样式。
 * @param {any} [options.shadowRectOptions] 通过传入Path.Options对象来设置瞄准阴影矩形的样式。
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
 * @param {any} [options] 参数对象，包括以下：
 * @param {any} [options.style] 可以CSS样式，如：{ top: '10px', left: '10px' }，会合并到控件容器样式
 * @param {number} [options.countryLevel] 按指定的地图级别，在滑动条上创建“国家”标记，比如4
 * @param {number} [options.provinceLevel] 按指定的地图级别，在滑动条上创建“省级”标记，比如7
 * @param {number} [options.cityLevel] 按指定的地图级别，在滑动条上创建“城市”标记，比如10
 * @param {number} [options.streetLevel] 按指定的地图级别，在滑动条上创建“街道”标记，比如14
 */
declare class Slider extends L.Control {
    constructor(options?: {
        style?: any;
        countryLevel?: number;
        provinceLevel?: number;
        cityLevel?: number;
        streetLevel?: number;
      });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement | any;
    onAdd(): void | any;
    onRemove(): void | any;
    show(): void | any;
    hide(): void | any;
    setValue(): void | any;
    getValue(): void | any;
}

/**
 * 基础类
 * @param {any} [options] 参数名称
 */
declare class BaseClass {
    constructor(options?: any);
    /**
     * 当前类的构造参数
     */
    readonly options: any;
    /**
     * 销毁当前对象
     * @param {boolean} [noDel] false:会自动delete释放所有属性，true：不delete绑定的变量
     * @returns {void} 无
     */
    destroy(noDel?: boolean): void | any;
    /**
     * 绑定指定类型事件监听器,
     * 支持在监听中调用 event.stopPropagation(); 组织事件冒泡
     * @param {EventType | string | EventType[]} types 事件类型
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {BaseClass} 当前对象本身,可以链式调用
     */
    on(types: EventType | string | EventType[], fn?: ((...params: any[]) => any), context?: any): BaseClass | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {EventType | string | EventType[]} [types] 事件类型,未传值时解绑所有事件
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法,未传值时解绑所有指定类型对应事件
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {BaseClass} 当前对象本身,可以链式调用
     */
    off(types?: EventType | string | EventType[], fn?: ((...params: any[]) => any), context?: any): BaseClass | any;
    /**
     * 触发指定类型的事件。
     * @param {EventType | string} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {BaseClass} 当前对象本身,可以链式调用
     */
    fire(type: EventType | string, data?: any, propagate?: BaseClass | any): BaseClass | any;
    /**
     * 是否有绑定指定的事件
     * @param {EventType | string} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: EventType | string, propagate?: any): boolean | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {EventType | string | EventType[]} types 事件类型
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {BaseClass} 当前对象本身,可以链式调用
     */
    once(types: EventType | string | EventType[], fn?: ((...params: any[]) => any), context?: any): BaseClass | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {BaseClass} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): BaseClass | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {BaseClass} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): BaseClass | any;
    /**
     * 是否绑定了抛出事件到指定父类
     * @param {any} obj 父类对象
     * @returns {BaseClass} 当前对象本身,可以链式调用
     */
    hasEventParent(obj: any): BaseClass | any;
}

/**
 * 小Tooltip鼠标提示控件（比如标绘中使用的提示）
 * @param {Map} map 地图对象
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
     * @param {any} labelText 信息内容
     * @param {string} labelText.text 主提示信息
     * @param {string} [labelText.subtext] 辅助提示信息
     * @returns {SmallTooltip} 当前对象本身,可以链式调用
     */
    updateContent(labelText?: {
        text: string;
        subtext?: string;
      }): SmallTooltip | any;
    /**
     * 更新信息窗口的位置
     * @param {L.Point | L.LatLng} pos 位置
     * @returns {SmallTooltip} 当前对象本身,可以链式调用
     */
    updatePosition(pos: L.Point | L.LatLng): SmallTooltip | any;
    /**
     * 增加错误样式
     * @returns {SmallTooltip} 当前对象本身,可以链式调用
     */
    showAsError(): SmallTooltip | any;
    /**
     * 移除错误样式
     * @returns {SmallTooltip} 当前对象本身,可以链式调用
     */
    removeError(): SmallTooltip | any;
    /**
     * 打开弹窗
     * @param {L.Point | L.LatLng} latLng 弹窗位置
     * @param {string} message 提示消息
     * @returns {void} 无
     */
    open(latLng: L.Point | L.LatLng, message: string): void | any;
    /**
     * 关闭弹窗
     * @returns {void} 无
     */
    close(): void | any;
}

/**
 * 内置的多个按钮工具栏
 * @param {any} [options] 参数对象，包括以下：
 * @param {string} [options.position] 控件的位置
 * @param {string[]} [options.item] 显示的按钮配置,支持配置的值："home", "location", "fullscreen","clear"
 * @param {L.LatLng} [options.center] 自定义home默认区域的中心点
 * @param {number} [options.zoom] 自定义home默认区域的层级
 * @param {((...params: any[]) => any)} [options.onGoLocate] 自定义“定位至当前所在位置”按钮回调方法
 * @param {number} [options.showPointTime] 显示定位后的原点的时长,0时不显示,999时一直显示
 * @param {((...params: any[]) => any)} [options.onFullscreen] 自定义“进入全屏”按钮回调方法
 * @param {((...params: any[]) => any)} [options.onClear] “清除所有操作”按钮回调方法
 */
declare class ToolBar extends L.Control {
    constructor(options?: {
        position?: string;
        item?: string[];
        center?: L.LatLng | any;
        zoom?: number;
        onGoLocate?: ((...params: any[]) => any);
        showPointTime?: number;
        onFullscreen?: ((...params: any[]) => any);
        onClear?: ((...params: any[]) => any);
      });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement | any;
    onAdd(): void | any;
    onLocationFound(): void | any;
    onLocationError(): void | any;
    onRemove(): void | any;
}

/**
 * 工具栏 单个按钮控件
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.title] 按钮标题
 * @param {string} [options.icon] 按钮字体图标  图片url路径 或 字体图标class名
 * @param {((...params: any[]) => any)} [options.click] 按钮单击后的回调方法
 * @param {string} [options.position] 控件的位置
 * @param {number} [options.insertIndex] 可以自定义插入到父容器中的index顺序，默认是插入到最后面。
 * @param {HTMLElement} [options.insertBefore] 可以自定义插入到指定兄弟容器的前面，与insertIndex二选一。
 */
declare class ToolButton extends L.Control {
    constructor(options?: {
        title?: string;
        icon?: string;
        click?: ((...params: any[]) => any);
        position?: string;
        insertIndex?: number;
        insertBefore?: HTMLElement;
      });
    /**
     * 获取控件对应的DOM容器
     */
    readonly container: HTMLElement | any;
    onAdd(): void | any;
    addTo(): void | any;
    /**
     * 修改按钮标题
     * @param {string} title 按钮标题
     * @returns {void} 无返回值
     */
    setTitle(title: string | any): void | any;
    /**
     * 修改按钮图标
     * @param {string} img 按钮图片url路径
     * @returns {void} 无返回值
     */
    setIcon(img: string | any): void | any;
    /**
     * 修改按钮位置
     * @param {string} pos 按钮位置 'topleft','topright','bottomleft','bottomright'
     * @returns {void} 无返回值
     */
    setPosition(pos: string | any): void | any;
}

/**
 * Thing对象(如分析、量算类等) 的基类
 * @param {any} [options] 参数对象，包括以下：
 * @param {string | number} [options.id] 对象的id标识
 * @param {boolean} [options.enabled] 对象的启用状态
 * @param {BaseClass | boolean} [options.eventParent] 指定的事件冒泡对象，默认为所加入的map对象，false时不冒泡事件
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
     * @param {Map} map 地图对象
     * @returns {BaseThing} 当前对象本身，可以链式调用
     */
    addTo(map: Map): BaseThing | any;
    /**
     * 从地图上移除，同map.removeThing
     * @param {boolean} [destroy] 是否调用destroy释放
     * @returns {void} 无
     */
    remove(destroy?: boolean): void | any;
}
declare namespace BaseThing {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
thing.on(mars2d.EventType.add, function (event) {
  console.log('添加了对象', event)
})
   */
  type EventType = {
    add: string;
    remove: string;
  };
}

/**
 * 自定义集合存储管理类
 */
declare class MarsArray {
    constructor();
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
     * @param {string | number} key 主键
     * @returns {boolean} 是否在数组中
     */
    contains(key: string | number): boolean | any;
    /**
     * 将提供的键与提供的值关联起来。如果密钥已经存在, 存在时，它将被新值覆盖。
     * 
     * 注意：覆盖已有键时，旧元素会先被移除，新值追加到末尾——即 {@link MarsArray#values} 的顺序会变化。
     * @param {string | number} key 主键
     * @param {any} value 与提供的键相关联的值
     * @returns {void}
     */
    set(key: string | number, value: any): void | any;
    /**
     * 检索与提供的键关联的值
     * @param {string | number} key 主键
     * @returns {any} 关联的值，如果键在集合中不存在，则为未定义。
     */
    get(key: string | number): any;
    /**
     * 根据指定属性获取对象
     * @param {string | number} attrValue 属性值
     * @param {string} [attrName] 属性键
     * @param {string} [exObj] 查找的二级对象属性键
     * @returns {any} 关联的值，如果键在集合中不存在，则为未定义。
     */
    getByAttr(attrValue: string | number, attrName?: string, exObj?: string): any;
    /**
     * 根据指定属性获取符合条件对象数组
     * @param {string | number} attrValue 属性值
     * @param {string} [attrName] 属性键
     * @param {string} [exObj] 查找的二级对象属性键
     * @returns {any[]} 数组
     */
    getListByAttr(attrValue: string | number, attrName?: string, exObj?: string): any[] | any;
    /**
     * 从集合中移除键值对
     * 
     * 注意：单次移除是 O(n)——按值定位（indexOf）后还要搬移数组元素。
     * 需要一次移除多个主键时请用 {@link MarsArray#removeMany}，逐个调用会退化成 O(n²)。
     * @param {string | number} key 主键
     * @returns {boolean} 是否移除
     */
    remove(key: string | number): boolean | any;
    /**
     * 批量从集合中移除键值对。
     * 
     * 一次性遍历数组完成整理（先按主键删哈希，再一次压实数组），
     * 避免逐个 remove 时反复 indexOf + splice 造成 O(n²)；保留剩余元素的原有顺序。
     * @param {(string | number)[]} keys 主键数组
     * @returns {number} 实际移除的数量
     */
    removeMany(keys: (string | number)[]): number | any;
    /**
     * 遍历每一个对象并将其作为参数传递给回调函数
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void}
     */
    forEach(method: ((...params: any[]) => any), context?: any): void | any;
    /**
     * 清空集合
     * @returns {void}
     */
    removeAll(): void | any;
    /**
     * 销毁对象
     * @returns {void}
     */
    destroy(): void | any;
}

/**
 * 动画铁路线  矢量对象 ，暂不支持编辑
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | any} [options.latlngs] 坐标数组
 * @param {L.LatLng | any} [options.latlng] 坐标(use: L.circle 时)
 * @param {AntPath.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class AntPath extends L.FeatureGroup {
    constructor(options?: {
        latlngs?: L.LatLng[] | any;
        latlng?: L.LatLng | any;
        style?: AntPath.StyleOptions | any;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    onAdd(): void | any;
    onRemove(): void | any;
    pause(): void | any;
    resume(): void | any;
    bringToFront(): void | any;
    bringToBack(): void | any;
    removeFrom(): void | any;
    setStyle(): void | any;
    reverse(): void | any;
    redraw(): void | any;
    addLatLng(): void | any;
    setLatLngs(): void | any;
    getLatLngs(): void | any;
    getBounds(): void | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
    newLatLngIntersects(): void | any;
    getRadius(): void | any;
    setRadius(): void | any;
}
declare namespace AntPath {
  /**
   * 动画铁路线 矢量对象 支持的样式信息
   */
  type StyleOptions = any | {
    delay?: number;
    pulseColor?: string;
    hardwareAccelerated?: boolean;
    reverse?: boolean;
    paused?: boolean;
    graphicType?: string;
    dashArray?: string | number[];
    color?: string;
    opacity?: number;
    width?: number;
    offset?: number;
    gradientColors?: string[];
    lineCap?: string;
    lineJoin?: string;
    smoothFactor?: number;
    noClip?: boolean;
    interactive?: boolean;
    renderer?: L.Renderer;
    highlight?: Polyline.StyleOptions;
    label?: Label.StyleOptions;
  };
}

/**
 * 图标点Marker 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {Marker.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Marker extends L.Marker {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: Marker.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 返回图标点的LatLng经纬度对象
     * @returns {L.LatLng} 经纬度对象
     */
    getLatLng(): L.LatLng | any;
    /**
     * 改变zIndex顺序
     * @param {number} offset zIndex顺序
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    setZIndexOffset(offset: number | any): Marker | any;
    /**
     * 改变透明度
     * @param {number} opacity 透明度
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    setOpacity(opacity: number | any): Marker | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): Marker | any;
    /**
     * 将图层从地图上移除
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    remove(): Marker | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): Marker | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    unbindPopup(): Marker | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): Marker | any;
    /**
     * 关闭打开的弹窗
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    closePopup(): Marker | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): Marker | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): Marker | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    unbindTooltip(): Marker | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): Marker | any;
    /**
     * 关闭打开的弹窗
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    closeTooltip(): Marker | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): Marker | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Marker} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Marker | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Marker} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Marker | any;
    /**
     * 销毁矢量对象
     * @returns {void} 无
     */
    destroy(): void | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置
     */
    latlng: L.LatLng | any;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[] | any;
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 获取对象的DOM容器
     */
    readonly container: HTMLElement | any;
    /**
     * 获取当前图标对应DIV的高宽，返回结果示例：{width:10,height;20}
     */
    readonly divSize: any;
    /**
     * 是否显示测试点，可以进行用于比较测试div的位置，方便调试CSS。
     */
    testPoint: boolean | any;
    initialize(): void | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 修改位置
     * @param {L.LatLng} latlng 经纬度对象
     * @param {boolean} [updateEditeMarkers] 是否在编辑状态更新编辑点
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng | any, updateEditeMarkers?: boolean | any): Marker | any;
    /**
     * 设置 旋转角度（度数值，0-360度）
     * @param {number} angle 旋转角度（度数值，0-360度）
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    setRotationAngle(angle: number | any): Marker | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {Marker.StyleOptions} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {Marker} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: Marker.StyleOptions | any): Marker | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
}
declare namespace Marker {
  /**
   * 图标点Marker 支持的样式信息
   */
  type StyleOptions = any | {
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
    minZoom?: number;
    maxZoom?: number;
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
    pulseColor?: string;
    pulseShadowColor?: string;
    pulseDuration?: number;
    highlight?: Marker.StyleOptions;
    label?: Label.StyleOptions;
  };
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
marker.on('move', function (event) {
  console.log('触发了事件',event)
});
   */
  type EventType = {
    move: string;
    dragstart: string;
    movestart: string;
    drag: string;
    dragend: string;
    moveend: string;
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
 * 弹跳动态点 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {BouncingMarker.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class BouncingMarker extends Marker {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: BouncingMarker.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    setBouncingOptions(): void | any;
    /**
     * 标记是否正在跳动，true表示正在跳动，false表示没有跳动
     * @returns {boolean} true表示正在跳动，false表示没有跳动
     */
    isBouncing(): boolean | any;
    /**
     * 开启弹跳
     * @param {number} times 弹跳的次数，如果不传值，表示一直跳
     * @returns {BouncingMarker} bouncingMarker
     */
    bounce(times: number): BouncingMarker | any;
    /**
     * 关闭弹跳
     * @param {boolean} immediate 是否立即停止，默认为false
     * @returns {BouncingMarker} bouncingMarker
     */
    stopBouncing(immediate: boolean): BouncingMarker | any;
    /**
     * 开始或停止标记的弹跳
     * @returns {BouncingMarker} bouncingMarker
     */
    toggleBouncing(): BouncingMarker | any;
    setIcon(): void | any;
    getBouncingMarkers(): void | any;
    stopAllBouncingMarkers(): void | any;
}
declare namespace BouncingMarker {
  /**
   * 弹跳动态点 支持的样式信息
   */
  type StyleOptions = any | {
    bounceTimes?: number;
    bounceHeight?: number;
    contractHeight?: number;
    bounceSpeed?: number;
    contractSpeed?: number;
    shadowAngle?: number;
    elastic?: boolean;
    exclusive?: boolean;
    immediateStop?: boolean;
    opacity?: number;
    horizontalOrigin?: HorizontalOrigin;
    verticalOrigin?: VerticalOrigin;
    offsetX?: number;
    offsetY?: number;
    iconSize?: L.Point | number[];
    iconAnchor?: L.Point | number[];
    className?: string;
    minZoom?: number;
    maxZoom?: number;
    draggable?: boolean;
    keyboard?: boolean;
    zIndexOffset?: number;
    riseOnHover?: boolean;
    riseOffset?: number;
    interactive?: boolean;
    highlight?: BouncingMarker.StyleOptions;
    label?: Label.StyleOptions;
  };
  /**
   * 当前类支持的{@link Marker.EventType}事件类型
   */
  type EventType = {
    bounceend: string;
  };
}

/**
 * 线 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | any} options.latlngs 坐标数组
 * @param {Polyline.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {boolean} [options.hasMoveEdit] 编辑时，是否可以整体平移
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Polyline extends L.Polyline {
    constructor(options?: {
        latlngs: L.LatLng[] | any;
        style?: Polyline.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        hasMoveEdit?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 返回折线的坐标点的数组，或者在多折线的情况下返回嵌套的点阵列。
     * @returns {L.LatLng[]} 经纬度数组
     */
    getLatLngs(): L.LatLng[] | any;
    /**
     * 向折线添加一个给定点。 默认情况下，在多折线的情况下，将折线的第一个线添加，但可以通过将特定的线作为LatLng数组（您可以使用之前访问getLatLngs）来覆盖。
     * @param {L.LatLng} latlng 经纬度对象
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng | any): Polyline | any;
    /**
     * 获取线的矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    redraw(): Polyline | any;
    /**
     * 将线移动到所有路径层的底部
     * @returns {Polyline} 当前对象本身,可以链式调用
     */
    bringToBack(): Polyline | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): Polyline | any;
    /**
     * 将图层从地图上移除
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    remove(): Polyline | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): Polyline | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    unbindPopup(): Polyline | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): Polyline | any;
    /**
     * 关闭打开的弹窗
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    closePopup(): Polyline | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): Polyline | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): Polyline | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    unbindTooltip(): Polyline | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): Polyline | any;
    /**
     * 关闭打开的弹窗
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    closeTooltip(): Polyline | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): Polyline | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Polyline} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Polyline | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Polyline} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Polyline | any;
    /**
     * 销毁矢量对象
     * @returns {void} 无
     */
    destroy(): void | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[] | any;
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 距离（单位：米）
     */
    readonly distance: number | any;
    /**
     * 围合的面积（单位：平方米）
     */
    readonly area: number | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    initialize(): void | any;
    /**
     * 用给定的地理位置数组代替更新折线中的所有点。
     * @param {L.LatLng[]} latlngs 经纬度数组
     * @param {boolean} [updateEditeMarkers] 是否在编辑状态更新编辑点
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[] | any, updateEditeMarkers?: boolean | any): Polyline | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {Polyline.StyleOptions} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: Polyline.StyleOptions | any): Polyline | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
    /**
     * 设置线的偏移值，常用于平行线
     * @param {number} offset 偏移值（像素）
     * @returns {Polyline} 当前对象本身，可以链式调用
     */
    setOffset(offset: number | any): Polyline | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 将线移动到所有路径层的顶部
     * @returns {Polyline} 当前对象本身,可以链式调用
     */
    bringToFront(): Polyline | any;
}
declare namespace Polyline {
  /**
   * 线矢量对象 支持的样式信息
   */
  type StyleOptions = any | {
    color?: string;
    opacity?: number;
    width?: number;
    offset?: number;
    gradientColors?: string[];
    lineCap?: string;
    lineJoin?: string;
    dashArray?: string;
    dashSpeed?: number;
    dashOffset?: string;
    smoothFactor?: number;
    noClip?: boolean;
    interactive?: boolean;
    renderer?: L.Renderer;
    snakingSpeed?: number;
    text?: string;
    textOptions?: {
      orientation?: number | string;
      repeat?: boolean;
      gap?: number;
      offset?: number;
      below?: boolean;
      center?: boolean | any;
      attributes?: any;
    };
    highlight?: Polyline.StyleOptions;
    label?: Label.StyleOptions;
  };
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
graphic.on('click', function (event) {
  console.log('触发了事件',event)
});
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
 * 画笔自由曲线 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polyline.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class BrushLine extends Polyline {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polyline.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * Canvas图片矩形 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Image.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class CanvasImage extends L.Path {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Image.StyleOptions | any;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    redraw(): CanvasImage | any;
    /**
     * 将线移动到所有路径层的顶部
     * @returns {CanvasImage} 当前对象本身,可以链式调用
     */
    bringToFront(): CanvasImage | any;
    /**
     * 将线移动到所有路径层的底部
     * @returns {CanvasImage} 当前对象本身,可以链式调用
     */
    bringToBack(): CanvasImage | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): CanvasImage | any;
    /**
     * 将图层从地图上移除
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    remove(): CanvasImage | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): CanvasImage | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    unbindPopup(): CanvasImage | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): CanvasImage | any;
    /**
     * 关闭打开的弹窗
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    closePopup(): CanvasImage | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): CanvasImage | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): CanvasImage | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    unbindTooltip(): CanvasImage | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): CanvasImage | any;
    /**
     * 关闭打开的弹窗
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    closeTooltip(): CanvasImage | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): CanvasImage | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {CanvasImage} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): CanvasImage | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {CanvasImage} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): CanvasImage | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[] | any;
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    initialize(): void | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {any} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any): CanvasImage | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
    /**
     * 设置图片URL
     * @param {string} url 图片URL
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    setUrl(url: string | any): CanvasImage | any;
    /**
     * 用传递的LatLngBounds边界重绘图片
     * @param {L.LatLngBounds} bounds 边界
     * @param {boolean} [updateEditeMarkers] 是否在编辑状态更新编辑点
     * @returns {CanvasImage} 当前对象本身，可以链式调用
     */
    setBounds(bounds: L.LatLngBounds | any, updateEditeMarkers?: boolean | any): CanvasImage | any;
    /**
     * 获取矩形四个角点的经纬度数组（本类继承 L.Path，无 L.Polygon 的 getLatLngs，需自行提供）
     * @returns {L.LatLng[]} 经纬度数组
     */
    getLatLngs(): L.LatLng[] | any;
    /**
     * 获取图片的矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 获取指定坐标的颜色值
     * @param {L.LatLng} latnlg 坐标
     * @returns {string} 颜色值，如 rgba(255,0,0,0.5)
     */
    getRgba(latnlg: L.LatLng | any): string | any;
}

/**
 * 圆 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {Circle.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Circle extends L.Circle {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: Circle.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 返回半径值
     * @returns {number} 半径值
     */
    getRadius(): number | any;
    /**
     * 修改半径值
     * @param {number} radius 半径值
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    setRadius(radius: number | any): Circle | any;
    /**
     * 返回圆的中心位置
     * @returns {L.LatLng} 经纬度对象
     */
    getLatLng(): L.LatLng | any;
    /**
     * 获取圆的矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    redraw(): Circle | any;
    /**
     * 将圆移动到所有路径层的顶部
     * @returns {Circle} 当前对象本身,可以链式调用
     */
    bringToFront(): Circle | any;
    /**
     * 将圆移动到所有路径层的底部
     * @returns {Circle} 当前对象本身,可以链式调用
     */
    bringToBack(): Circle | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): Circle | any;
    /**
     * 将图层从地图上移除
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    remove(): Circle | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): Circle | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    unbindPopup(): Circle | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): Circle | any;
    /**
     * 关闭打开的弹窗
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    closePopup(): Circle | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): Circle | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): Circle | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    unbindTooltip(): Circle | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): Circle | any;
    /**
     * 关闭打开的弹窗
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    closeTooltip(): Circle | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): Circle | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Circle} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Circle | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Circle} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Circle | any;
    /**
     * 销毁矢量对象
     * @returns {void} 无
     */
    destroy(): void | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置
     */
    latlng: L.LatLng | any;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[] | any;
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][] | any;
    /**
     * 圆的边线坐标集合
     */
    readonly outlineLatlngs: L.LatLng[] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 周长距离（单位：米）
     */
    readonly distance: number | any;
    /**
     * 面积（单位：平方米）
     */
    readonly area: number | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 半径， 单位：米
     */
    radius: number | any;
    /**
     * 是否为扇形
     */
    readonly isSector: boolean | any;
    /**
     * 开始角度
     */
    startAngle: number | any;
    /**
     * 结束角度
     */
    stopAngle: number | any;
    /**
     * 方向，角度值
     */
    rotation: number | any;
    initialize(): void | any;
    /**
     * 修改中心位置
     * @param {L.LatLng} latlng 经纬度对象
     * @param {boolean} [updateEditeMarkers] 是否在编辑状态更新编辑点
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng | any, updateEditeMarkers?: boolean | any): Circle | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {any} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {Circle} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: any): Circle | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {boolean} [options.outline] 是否导出为圆的边线坐标
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        outline?: boolean;
        precision?: number;
      } | any): any;
    /**
     * 判断指定坐标是否在当前圆内
     * @param {L.LatLng} latlng 坐标
     * @returns {boolean} 是否在圆内
     */
    isInPoly(latlng: L.LatLng | any): boolean | any;
    /**
     * 获取圆的边线坐标集合
     * @param {boolean} [closure] 是否闭合，true时会添加第0个点进行闭合。
     * @param {number} [count] 点的数量
     * @returns {L.LatLng[]} 边线坐标数组
     */
    getOutlineLatlngs(closure?: boolean | any, count?: number | any): L.LatLng[] | any;
    onAdd(): void | any;
    onRemove(): void | any;
}
declare namespace Circle {
  /**
   * 圆矢量对象 支持的样式信息
   */
  type StyleOptions = any | {
    radius: number;
    rotation?: number;
    startAngle?: number;
    stopAngle?: number;
    diffuse?: number;
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
    dashSpeed?: number;
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
   * @example //绑定监听事件
graphic.on('click', function (event) {
  console.log('触发了事件',event)
});
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
 * DIV点 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {DivGraphic.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DivGraphic extends Marker {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: DivGraphic.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
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
   */
  type StyleOptions = any | {
    html: string;
    opacity?: number;
    horizontalOrigin?: HorizontalOrigin;
    verticalOrigin?: VerticalOrigin;
    offsetX?: number;
    offsetY?: number;
    iconSize?: L.Point | number[];
    iconAnchor?: L.Point | number[];
    className?: string;
    minZoom?: number;
    maxZoom?: number;
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
 * 动态边框文本 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {DivBoderLabel.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DivBoderLabel extends DivGraphic {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: DivBoderLabel.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}
declare namespace DivBoderLabel {
  /**
   * 动态边框文本 支持的样式信息
   */
  type StyleOptions = any | {
    text: string;
    font_size?: number;
    font_family?: string;
    color?: string;
    boderColor?: string;
    shadowColor?: string;
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
 * 动画扩散点 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {DivLightPoint.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DivLightPoint extends DivGraphic {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: DivLightPoint.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
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
   */
  type StyleOptions = any | {
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
 * 竖直文字 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {DivUpLabel.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DivUpLabel extends DivGraphic {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: DivUpLabel.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
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
   */
  type StyleOptions = any | {
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
 * 标绘处理类 基类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class BaseDraw extends L.Handler {
    constructor(options?: {
        id?: string | number;
      });
    initialize(): void | any;
    fireGraphic(): void | any;
    enable(): void | any;
    disable(): void | any;
    addHooks(): void | any;
    removeHooks(): void | any;
    setOptions(): void | any;
    /**
     * 销毁当前对象
     * @returns {void} 无
     */
    destroy(): void | any;
}

/**
 * 简单形状（圆/椭圆/矩形/图片/自由线）标绘处理基类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class BaseSimpleShape extends BaseDraw {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 线 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawPolyline extends BaseDraw {
    constructor(options?: {
        id?: string | number;
      });
    deleteLastVertex(): void | any;
    addVertex(): void | any;
    completeShape(): void | any;
}

/**
 * AntPath  对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawAntPath extends DrawPolyline {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 面  对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawPolygon extends DrawPolyline {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 面积测量 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawAreaMeasure extends DrawPolygon {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 图标点 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawMarker extends BaseDraw {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 弹跳动态点（BouncingMarker）对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawBouncingMarker extends DrawMarker {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 自由绘制线 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawBrushLine extends BaseSimpleShape {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 圆  对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawCircle extends BaseSimpleShape {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 测量长度 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawDistanceMeasure extends DrawPolyline {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * DIV点 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawDivGraphic extends DrawMarker {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 椭圆 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawEllipse extends BaseSimpleShape {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * font文字点（FontGraphic）对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawFontGraphic extends DrawMarker {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 矩形 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawRectangle extends BaseSimpleShape {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 矩形图片 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawImage extends DrawRectangle {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 文字注记 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawLabel extends DrawMarker {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 像素点 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawPoint extends DrawMarker {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对线面进行装饰的箭头等点状样式的矢量对象（如箭头线）  对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawPolyDecorator extends BaseDraw {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 面  对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawRain extends DrawPolyline {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 面  对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawSnow extends DrawPolyline {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 军事标绘 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class BaseDrawPlot extends DrawPolygon {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawAttackArrow extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawAttackArrowPW extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawAttackArrowYW extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawCloseVurve extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawDoubleArrow extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawFineArrow extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawFineArrowYW extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawGatheringPlace extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 对象标绘处理类
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DrawStraightArrow extends BaseDrawPlot {
    constructor(options?: {
        id?: string | number;
      });
}

/**
 * 矢量对象 编辑处理基类，内部使用
 * @param {any} [options] 编辑控制参数
 * @param {L.DivIcon} [options.moveIcon] 移动编辑点的图标
 * @param {L.DivIcon} [options.resizeIcon] 缩放编辑点的图标
 * @param {L.DivIcon} [options.rotateIcon] 旋转编辑点的图标
 */
declare class BaseEditSimpleShape extends L.Handler {
    constructor(options?: {
        moveIcon?: L.DivIcon;
        resizeIcon?: L.DivIcon;
        rotateIcon?: L.DivIcon;
      });
    initialize(): void | any;
    fireGraphic(): void | any;
    /**
     * 开始编辑
     * @returns {BaseEditSimpleShape} 当前对象本身，可以链式调用
     */
    enable(): BaseEditSimpleShape | any;
    /**
     * 停止编辑
     * @returns {BaseEditSimpleShape} 当前对象本身，可以链式调用
     */
    disable(): BaseEditSimpleShape | any;
    addHooks(): void | any;
    removeHooks(): void | any;
    /**
     * 更新所有编辑点marker
     * @returns {BaseEditSimpleShape} 当前对象本身，可以链式调用
     */
    updateMarkers(): BaseEditSimpleShape | any;
}

/**
 * 像素圆点 编辑处理类，内部使用
 * @param {any} [options] 编辑控制参数（moveIcon/resizeIcon/rotateIcon，均为 L.DivIcon）
 */
declare class EditCircleMarker extends BaseEditSimpleShape {
    constructor(options?: any);
}

/**
 * 圆 编辑处理类，内部使用
 * @param {any} [options] 编辑控制参数（moveIcon/resizeIcon/rotateIcon，均为 L.DivIcon）
 */
declare class EditCircle extends EditCircleMarker {
    constructor(options?: any);
}

/**
 * 椭圆 编辑处理类，内部使用
 * @param {any} [options] 编辑控制参数（moveIcon/resizeIcon/rotateIcon，均为 L.DivIcon）
 */
declare class EditEllipse extends EditCircleMarker {
    constructor(options?: any);
}

/**
 * Marker点 编辑处理类，内部使用
 * @param {Marker} marker 需要编辑的图标点
 * @param {any} [options] 编辑控制参数（moveIcon 等，均为 L.DivIcon）
 */
declare class EditMarker extends L.Handler {
    constructor(marker: Marker, options?: any);
    initialize(): void | any;
    fireGraphic(): void | any;
    /**
     * 开始编辑
     * @returns {EditMarker} 当前对象本身，可以链式调用
     */
    enable(): EditMarker | any;
    /**
     * 停止编辑
     * @returns {EditMarker} 当前对象本身，可以链式调用
     */
    disable(): EditMarker | any;
    addHooks(): void | any;
    removeHooks(): void | any;
}

/**
 * 线面对象 编辑处理类，内部使用
 * @param {Polyline | Polygon} graphic 需要编辑的矢量对象
 */
declare class EditPoly extends L.Handler {
    constructor(graphic: Polyline | Polygon);
    initialize(): void | any;
    fireGraphic(): void | any;
    /**
     * 开始编辑
     * @returns {EditPoly} 当前对象本身，可以链式调用
     */
    enable(): EditPoly | any;
    /**
     * 停止编辑
     * @returns {EditPoly} 当前对象本身，可以链式调用
     */
    disable(): EditPoly | any;
    addHooks(): void | any;
    removeHooks(): void | any;
    /**
     * 更新所有编辑点marker
     * @returns {EditPoly} 当前对象本身，可以链式调用
     */
    updateMarkers(): EditPoly | any;
}

/**
 * 矩形 编辑处理类，内部使用
 * @param {any} [options] 编辑控制参数（moveIcon/resizeIcon/rotateIcon，均为 L.DivIcon）
 */
declare class EditRectangle extends BaseEditSimpleShape {
    constructor(options?: any);
}

/**
 * 椭圆 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {Ellipse.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Ellipse extends L.Path {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: Ellipse.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    redraw(): Ellipse | any;
    /**
     * 将圆移动到所有路径层的顶部
     * @returns {Ellipse} 当前对象本身,可以链式调用
     */
    bringToFront(): Ellipse | any;
    /**
     * 将圆移动到所有路径层的底部
     * @returns {Ellipse} 当前对象本身,可以链式调用
     */
    bringToBack(): Ellipse | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): Ellipse | any;
    /**
     * 将图层从地图上移除
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    remove(): Ellipse | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): Ellipse | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    unbindPopup(): Ellipse | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): Ellipse | any;
    /**
     * 关闭打开的弹窗
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    closePopup(): Ellipse | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): Ellipse | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): Ellipse | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    unbindTooltip(): Ellipse | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): Ellipse | any;
    /**
     * 关闭打开的弹窗
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    closeTooltip(): Ellipse | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): Ellipse | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Ellipse} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Ellipse | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Ellipse} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Ellipse | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置
     */
    latlng: L.LatLng | any;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[] | any;
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 短半轴 半径， 单位：米
     */
    semiMinorAxis: number | any;
    /**
     * 长半轴 半径， 单位：米
     */
    semiMajorAxis: number | any;
    /**
     * 方向，角度值
     */
    rotation: number | any;
    initialize(): void | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {Ellipse.StyleOptions} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: Ellipse.StyleOptions | any): Ellipse | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
    /**
     * 获取矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 修改椭圆中心位置
     * @param {L.LatLng} latlng 经纬度对象
     * @param {boolean} [updateEditeMarkers] 是否在编辑状态更新编辑点
     * @returns {Ellipse} 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng | any, updateEditeMarkers?: boolean | any): Ellipse | any;
    /**
     * 返回椭圆的中心位置
     * @returns {L.LatLng} 经纬度对象
     */
    getLatLng(): L.LatLng | any;
}
declare namespace Ellipse {
  /**
   * 椭圆矢量对象 支持的样式信息
   */
  type StyleOptions = any | {
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
    dashSpeed?: number;
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
 * 继承FeatureGroup的矢量对象基类
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | any} [options.latlngs] 坐标数组
 * @param {L.LatLng | any} [options.latlng] 坐标(use: L.circle 时)
 * @param {any} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class FeatureGroup extends L.FeatureGroup {
    constructor(options?: {
        latlngs?: L.LatLng[] | any;
        latlng?: L.LatLng | any;
        style?: any;
        attr?: any;
        id?: string | number;
      });
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[] | any;
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 距离（单位：米）
     */
    readonly distance: number | any;
    /**
     * 围合的面积（单位：平方米）
     */
    readonly area: number | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    setStyle(): void | any;
    setLatLngs(): void | any;
    /**
     * 获取成员矢量对象的坐标数组（与 getBounds 一致，按成员聚合）
     * @returns {L.LatLng[]} 经纬度数组
     */
    getLatLngs(): L.LatLng[] | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
}

/**
 * font文字点 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {FontGraphic.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class FontGraphic extends DivGraphic {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: FontGraphic.StyleOptions | any;
        attr?: any;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}
declare namespace FontGraphic {
  /**
   * font文字点 支持的样式信息
   */
  type StyleOptions = any | {
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
 * 矩形 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | L.LatLngBounds} options.latlngs 坐标数组
 * @param {Rectangle.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Rectangle extends L.Rectangle {
    constructor(options?: {
        latlngs: L.LatLng[] | L.LatLngBounds;
        style?: Rectangle.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 返回矢量对象的坐标点的数组，或者在多矢量对象的情况下返回嵌套的点阵列。
     * @returns {L.LatLng[]} 经纬度数组
     */
    getLatLngs(): L.LatLng[] | any;
    /**
     * 用给定的地理位置数组代替更新矢量对象中的所有点。
     * @param {L.LatLng[]} latlngs 经纬度数组
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[] | any): Rectangle | any;
    /**
     * 向矢量对象添加一个给定点。
     * @param {L.LatLng} latlng 经纬度对象
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng | any): Rectangle | any;
    /**
     * 获取线的矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    redraw(): Rectangle | any;
    /**
     * 将线移动到所有路径层的顶部
     * @returns {Rectangle} 当前对象本身,可以链式调用
     */
    bringToFront(): Rectangle | any;
    /**
     * 将线移动到所有路径层的底部
     * @returns {Rectangle} 当前对象本身,可以链式调用
     */
    bringToBack(): Rectangle | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): Rectangle | any;
    /**
     * 将图层从地图上移除
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    remove(): Rectangle | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): Rectangle | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    unbindPopup(): Rectangle | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): Rectangle | any;
    /**
     * 关闭打开的弹窗
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    closePopup(): Rectangle | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): Rectangle | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): Rectangle | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    unbindTooltip(): Rectangle | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): Rectangle | any;
    /**
     * 关闭打开的弹窗
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    closeTooltip(): Rectangle | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): Rectangle | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Rectangle} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Rectangle | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Rectangle} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Rectangle | any;
    /**
     * 销毁矢量对象
     * @returns {void} 无
     */
    destroy(): void | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[] | any;
    /**
     * 设置矩形边界
     * @param {L.LatLngBounds} latLngBounds 矩形边界
     * @param {boolean} [updateEditeMarkers] 是否同步更新编辑点
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    setBounds(latLngBounds: L.LatLngBounds | any, updateEditeMarkers?: boolean | any): Rectangle | any;
    /**
     * 矩形的边线坐标集合
     */
    readonly outlineLatlngs: L.LatLng[] | any;
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    readonly coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 周长距离（单位：米）
     */
    readonly distance: number | any;
    /**
     * 面积（单位：平方米）
     */
    readonly area: number | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    initialize(): void | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {Rectangle.StyleOptions} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {Rectangle} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: Rectangle.StyleOptions | any): Rectangle | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {boolean} [options.outline] 是否导出为矩形的边线坐标
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        outline?: boolean;
        precision?: number;
      } | any): any;
    /**
     * 判断指定坐标是否在当前矩形内
     * @param {L.LatLng} latlng 坐标
     * @returns {boolean} 是否在矩形内
     */
    isInPoly(latlng: L.LatLng | any): boolean | any;
}
declare namespace Rectangle {
  /**
   * 矩形矢量对象 支持的样式信息
   */
  type StyleOptions = any | {
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
   * @example //绑定监听事件
graphic.on('click', function (event) {
  console.log('触发了事件',event)
});
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
 * 图片矩形 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | L.LatLngBounds} options.latlngs 坐标数组
 * @param {Image.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Image extends Rectangle {
    constructor(options?: {
        latlngs: L.LatLng[] | L.LatLngBounds;
        style?: Image.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 更新不透明度
     * @param {number} opacity 透明度
     * @returns {Image} 当前对象本身，可以链式调用
     */
    setOpacity(opacity: number): Image | any;
}
declare namespace Image {
  /**
   * 图片矩形 支持的样式信息
   */
  type StyleOptions = any | {
    url: string;
    opacity?: number;
    interactive?: boolean;
    crossOrigin?: boolean;
    zIndex?: number;
    highlight?: Image.StyleOptions;
    label?: Label.StyleOptions;
  };
}

/**
 * 文本点  矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {Label.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Label extends DivGraphic {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: Label.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
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
declare namespace Label {
  /**
   * 文本点 支持的样式信息
   */
  type StyleOptions = any | {
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
    minZoom?: number;
    maxZoom?: number;
    draggable?: boolean;
    keyboard?: boolean;
    zIndexOffset?: number;
    riseOnHover?: boolean;
    riseOffset?: number;
    interactive?: boolean;
    merge?: boolean;
    highlight?: Label.StyleOptions;
  };
}

/**
 * 面 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | any} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.hasMoveEdit] 编辑时，是否可以整体平移
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Polygon extends L.Polygon {
    constructor(options?: {
        latlngs: L.LatLng[] | any;
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        hasMoveEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 返回矢量对象的坐标点的数组，或者在多矢量对象的情况下返回嵌套的点阵列。
     * @returns {L.LatLng[]} 经纬度数组
     */
    getLatLngs(): L.LatLng[] | any;
    /**
     * 向矢量对象添加一个给定点。
     * @param {L.LatLng} latlng 经纬度对象
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng | any): Polygon | any;
    /**
     * 获取面的矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    redraw(): Polygon | any;
    /**
     * 将线移动到所有路径层的顶部
     * @returns {Polygon} 当前对象本身,可以链式调用
     */
    bringToFront(): Polygon | any;
    /**
     * 将线移动到所有路径层的底部
     * @returns {Polygon} 当前对象本身,可以链式调用
     */
    bringToBack(): Polygon | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): Polygon | any;
    /**
     * 将图层从地图上移除
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    remove(): Polygon | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): Polygon | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    unbindPopup(): Polygon | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): Polygon | any;
    /**
     * 关闭打开的弹窗
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    closePopup(): Polygon | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): Polygon | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): Polygon | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    unbindTooltip(): Polygon | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): Polygon | any;
    /**
     * 关闭打开的弹窗
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    closeTooltip(): Polygon | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): Polygon | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Polygon} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Polygon | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Polygon} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Polygon | any;
    /**
     * 销毁矢量对象
     * @returns {void} 无
     */
    destroy(): void | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置数组
     */
    latlngs: L.LatLng[] | any;
    /**
     * 经纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321], [111.123456,22.654321] ]
     */
    coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
    /**
     * 周长距离（单位：米）
     */
    readonly distance: number | any;
    /**
     * 面积（单位：平方米）
     */
    readonly area: number | any;
    /**
     * 属性信息
     */
    attr: any;
    /**
     * 样式信息
     */
    style: any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    initialize(): void | any;
    /**
     * 用给定的地理位置数组代替更新矢量对象中的所有点。
     * @param {L.LatLng[]} latlngs 经纬度数组
     * @param {boolean} [updateEditeMarkers] 是否在编辑状态更新编辑点
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[] | any, updateEditeMarkers?: boolean | any): Polygon | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {Polygon.StyleOptions} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {Polygon} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: Polygon.StyleOptions | any): Polygon | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
    /**
     * 判断指定坐标是否在当前面内
     * @param {L.LatLng} latlng 坐标
     * @returns {boolean} 是否在面内
     */
    isInPoly(latlng: L.LatLng | any): boolean | any;
}
declare namespace Polygon {
  /**
   * 面矢量对象 支持的样式信息
   */
  type StyleOptions = any | {
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
    dashSpeed?: number;
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
   * @example //绑定监听事件
graphic.on('click', function (event) {
  console.log('触发了事件',event)
});
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
 * 面积测量对象，
 * 非直接调用，由 Measure 类统一创建及管理
 * @param {any} options 参数对象，包括以下：
 * @param {Polygon.StyleOptions} options.style 样式信息
 * @param {any} [options.attr] 附件的属性信息，可以任意附加属性，导出geojson或json时会自动处理导出。
 * @param {Label.StyleOptions} [options.label] 测量结果文本的样式
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class AreaMeasure extends Polygon {
    constructor(options?: {
        style: Polygon.StyleOptions | any;
        attr?: any;
        label?: Label.StyleOptions;
        id?: string | number;
      });
    /**
     * 测量结果
     */
    readonly measured: any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 更新测量结果的文本
     * @param {string} [unit] 计量单位,{@link MeasureUtil#formatArea} 可选值：auto、m、km、mu、ha 。不传时沿用当前 marsOptions.unit
     * @returns {void} 无
     */
    updateText(unit?: string): void | any;
}

/**
 * 距离量算对象，
 * 非直接调用，由 Measure 类统一创建及管理
 * @param {any} options 参数对象，包括以下：
 * @param {Polyline.StyleOptions} options.style 样式信息
 * @param {any} [options.attr] 附件的属性信息，可以任意附加属性，导出geojson或json时会自动处理导出。
 * @param {Label.StyleOptions} [options.label] 测量结果文本的样式
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DistanceMeasure extends Polyline {
    constructor(options?: {
        style: Polyline.StyleOptions | any;
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
     * @param {string} [unit] 计量单位,{@link MeasureUtil#formatDistance} 可选值：auto、m、km、mile、zhang 等。不传时沿用当前 marsOptions.unit
     * @returns {void} 无
     */
    updateText(unit?: string): void | any;
}

/**
 * 运动图标点 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 运动的坐标轨迹点
 * @param {number[] | number} options.durations 运动轨迹点对应的时长（单位：毫秒）
 * @param {Marker.StyleOptions | any} [options.style] 样式参数，还包括：<br/>
//  * @param {Boolean} [options.style.autostart] 是否添加后就开始运动
//  * @param {Boolean} [options.style.loop] 是否重复运动
 * @param {any} [options.attr] 属性信息
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class MovingMarker extends Marker {
    constructor(options?: {
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
     * @returns {MovingMarker} 当前对象本身，可以链式调用
     */
    start(): MovingMarker | any;
    /**
     * 继续运动
     * @returns {MovingMarker} 当前对象本身，可以链式调用
     */
    resume(): MovingMarker | any;
    /**
     * 暂停运动
     * @returns {MovingMarker} 当前对象本身，可以链式调用
     */
    pause(): MovingMarker | any;
    /**
     * 停止运动
     * @param {number} [elapsedTime] 延迟时间
     * @returns {MovingMarker} 当前对象本身，可以链式调用
     */
    stop(elapsedTime?: number): MovingMarker | any;
    /**
     * 在轨迹尾部，添加新的坐标点
     * @param {L.LatLng} latlng 坐标点
     * @param {number} duration 时长，单位 毫秒
     * @returns {MovingMarker} 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng, duration: number): MovingMarker | any;
    /**
     * 移动到新的位置
     * @param {L.LatLng} latlng 坐标点
     * @param {number} duration 时长，单位 毫秒
     * @returns {MovingMarker} 当前对象本身，可以链式调用
     */
    moveTo(latlng: L.LatLng, duration: number): MovingMarker | any;
    /**
     * 按index设置各点位时长
     * @param {number} pointIndex 顺序Index
     * @param {number} duration 时长，单位 毫秒
     * @returns {void}
     */
    addStation(pointIndex: number, duration: number): void | any;
}

/**
 * 军事标绘 矢量对象基类
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {boolean} [options.hasMoveEdit] 编辑时，是否可以整体平移
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class BasePlot extends Polygon {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        hasMoveEdit?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 向标绘对象添加一个点
     * @param {L.LatLng} latlng 添加的坐标
     * @param {L.LatLng[]} [latlngs] 多环时的目标环数组
     * @returns {BasePlot} 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng, latlngs?: L.LatLng[]): BasePlot | any;
}

/**
 * 攻击箭头 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class AttackArrow extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 攻击箭头(平尾) 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class AttackArrowPW extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 攻击箭头（燕尾） 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class AttackArrowYW extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 闭合曲面(3个点) 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class CloseVurve extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 双箭头（钳击） 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class DoubleArrow extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 直箭头(2个点) 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class FineArrow extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 燕尾直箭头(2个点) 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class FineArrowYW extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 集结地(3个点) 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class GatheringPlace extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 直箭头(2个点) 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[]} options.latlngs 坐标数组
 * @param {Polygon.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class StraightArrow extends BasePlot {
    constructor(options?: {
        latlngs: L.LatLng[];
        style?: Polygon.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
}

/**
 * 像素圆点 矢量对象
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng | number[]} options.latlng 坐标位置
 * @param {Point.StyleOptions} [options.style] 样式参数
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Point extends L.CircleMarker {
    constructor(options?: {
        latlng: L.LatLng | number[];
        style?: Point.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    /**
     * 将矢量数据的坐标、样式及属性等信息导出为对象，可以用于存储。
     * @returns {any} 导出的坐标、样式及属性等信息
     */
    toJSON(): any;
    /**
     * 返回半径值
     * @returns {number} 半径值
     */
    getRadius(): number | any;
    /**
     * 修改半径值
     * @param {number} radius 半径值
     * @returns {Point} 当前对象本身，可以链式调用
     */
    setRadius(radius: number | any): Point | any;
    /**
     * 返回圆的LatLng经纬度对象
     * @returns {L.LatLng} 经纬度对象
     */
    getLatLng(): L.LatLng | any;
    /**
     * 获取线的矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 重新绘制。在更改路径所使用的坐标之后会很有用。
     * @returns {Point} 当前对象本身，可以链式调用
     */
    redraw(): Point | any;
    /**
     * 将线移动到所有路径层的顶部
     * @returns {Point} 当前对象本身,可以链式调用
     */
    bringToFront(): Point | any;
    /**
     * 将线移动到所有路径层的底部
     * @returns {Point} 当前对象本身,可以链式调用
     */
    bringToBack(): Point | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {Point} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): Point | any;
    /**
     * 将图层从地图上移除
     * @returns {Point} 当前对象本身，可以链式调用
     */
    remove(): Point | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Point} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): Point | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {Point} 当前对象本身，可以链式调用
     */
    unbindPopup(): Point | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Point} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): Point | any;
    /**
     * 关闭打开的弹窗
     * @returns {Point} 当前对象本身，可以链式调用
     */
    closePopup(): Point | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {Point} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): Point | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Point} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): Point | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {Point} 当前对象本身，可以链式调用
     */
    unbindTooltip(): Point | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {Point} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): Point | any;
    /**
     * 关闭打开的弹窗
     * @returns {Point} 当前对象本身，可以链式调用
     */
    closeTooltip(): Point | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {Point} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): Point | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Point} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Point | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Point} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Point | any;
    /**
     * 销毁矢量对象
     * @returns {void} 无
     */
    destroy(): void | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 坐标位置
     */
    latlng: L.LatLng | any;
    /**
     * 坐标位置数组 , 主要为了兼容线面数据的使用（比如标绘中）
     */
    latlngs: L.LatLng[] | any;
    /**
     * 获取或设置 经度、纬度位置坐标(数组对象)，示例 [ [123.123456,32.654321] ]
     */
    coordinates: any[][] | any;
    /**
     * 中心点
     */
    readonly center: L.LatLng | any;
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
    pixelSize: number | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    initialize(): void | any;
    /**
     * 修改位置
     * @param {L.LatLng} latlng 经纬度对象
     * @param {boolean} [updateEditeMarkers] 是否在编辑状态更新编辑点
     * @returns {Point} 当前对象本身，可以链式调用
     */
    setLatLng(latlng: L.LatLng | any, updateEditeMarkers?: boolean | any): Point | any;
    /**
     * 设置 样式信息 的钩子方法
     * @param {Point.StyleOptions} newStyle 本次更新的部分样式信息,内部会合并属性
     * @returns {Point} 当前对象本身，可以链式调用
     */
    setStyle(newStyle: Point.StyleOptions | any): Point | any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象:
     * @param {number} [options.precision] 保留经纬度的小数位数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: {
        precision?: number;
      } | any): any;
}
declare namespace Point {
  /**
   * 像素圆点 支持的样式信息
   */
  type StyleOptions = any | {
    pixelSize?: number;
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
   * @example //绑定监听事件
graphic.on('click', function (event) {
  console.log('触发了事件',event)
});
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
 * 对线面进行装饰的箭头等点状样式的矢量对象（如箭头线）
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | any} [options.latlngs] 坐标数组
 * @param {PolyDecorator.StyleOptions} [options.style] 样式参数一般是{offset: 0, ...},如果一个装饰效果需要两个symbol，这个参数也可以是[{offset: 0, ...},{offset: 1, ...}]
 * @param {any} [options.attr] 属性信息
 * @param {boolean} [options.hasEdit] 是否可以编辑
 * @param {boolean} [options.isAutoEditing] 是否构造后就自动启动编辑(需要hasEdit:true时)
 * @param {string | HTMLElement | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | any[] | ((...params: any[]) => any)} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class PolyDecorator extends FeatureGroup {
    constructor(options?: {
        latlngs?: L.LatLng[] | any;
        style?: PolyDecorator.StyleOptions | any;
        attr?: any;
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        popup?: string | HTMLElement | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        tooltip?: string | any[] | ((...params: any[]) => any);
        tooltipOptions?: Map.TooltipOptions;
        id?: string | number;
      });
    onAdd(): void | any;
    onRemove(): void | any;
    newLatLngIntersects(): void | any;
    addLatLng(): void | any;
    getJsonStyle(): void | any;
    toJSON(): void | any;
    getReverseLatlngs(): void | any;
    getBounds(): void | any;
    redraw(): void | any;
}
declare namespace PolyDecorator {
  /**
   * 图案样式参数
   */
  type SymbolOptions = any | {
    type: string;
    pixelSize?: number;
    pathOptions?: any;
    markerOptions?: any;
  };
  /**
   * 对线面进行装饰的箭头等点状样式的 矢量对象 支持的样式信息
   */
  type StyleOptions = any | {
    offset?: number;
    endOffset?: number;
    repeat?: number;
    symbol: PolyDecorator.SymbolOptions | any;
  };
}

/**
 * 雨 矢量对象
 * 说明：不支持交互
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | any[][]} options.latlngs 坐标数组
 * @param {Rain.StyleOptions} [options.style] 样式参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Rain extends Polygon {
    constructor(options?: {
        latlngs: L.LatLng[] | any[][];
        style?: Rain.StyleOptions | any;
        id?: string | number;
      });
    superInitialize(): void | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 蛇形动画基于 SVG/canvas 路径，不适用于 WebGL 粒子渲染，保持空实现以兼容通用调用
     * @returns {Rain} 当前对象本身，可以链式调用
     */
    snakeIn(): Rain | any;
    /**
     * 获取线上距离指定图层点最近的点（不依赖渲染器维护的 _parts，按当前坐标投影计算）
     * @param {L.Point} p 图层像素坐标
     * @returns {L.Point | null} 最近点，未挂图时返回 null
     */
    closestLayerPoint(p: L.Point): L.Point | null | any;
    drawScene(): void | any;
    render(): void | any;
    superSetStyle(): void | any;
    rgb2hex(): void | any;
}
declare namespace Rain {
  /**
   * 雨 支持的样式信息
   */
  type StyleOptions = any | {
    color?: string;
    angle?: number;
    width?: number;
    length?: number;
    spacing?: number;
    interval?: number;
    speed?: number;
  };
}

/**
 * 雪 矢量对象
 * 说明：不支持交互
 * @param {any} options 参数对象，包括以下：
 * @param {L.LatLng[] | any[][]} options.latlngs 坐标数组
 * @param {Snow.StyleOptions} [options.style] 样式参数
 * @param {string | number} [options.id] 矢量数据id标识
 */
declare class Snow extends Rain {
    constructor(options?: {
        latlngs: L.LatLng[] | any[][];
        style?: Snow.StyleOptions | any;
        id?: string | number;
      });
}
declare namespace Snow {
  /**
   * 雪 支持的样式信息
   */
  type StyleOptions = any | {
    speed?: number;
    layersCount?: number;
    density?: number;
    size?: number;
    color?: string;
    opacity?: number;
  };
}

/**
 * 矢量数据图层
 * 
 * 注意：本图层创建的矢量默认使用地图的渲染器（未指定时是 SVG，每个矢量对应一个 DOM 节点）。
 * 面/线要素数量上千后平移与缩放会明显变慢，实测数据见 {@link Map} 构造参数 `renderer` 的说明。
 * 大数据量时给地图或本图层的 graphicOptions 传入同一个 Canvas 渲染器实例：
 * @param {any} [options] 参数对象，包括以下：
 * @param {boolean} [options.hasEdit] 是否自动激活编辑（true时，单击后自动激活编辑）
 * @param {boolean} [options.isAutoEditing] 完成标绘时是否自动启动编辑(需要hasEdit:true时)
 * @param {boolean} [options.isContinued] 是否连续标绘
 * @param {boolean} [options.isDblclickForDrawEnd] 是否双击自动结束标绘
 * @param {any | ((...params: any[]) => any)} [options.symbol] 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)，GraphicLayer图层仅loadGeoJSON方法中有效
 * @param {GraphicType | string} [options.symbol.type] 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param {any} options.symbol.styleOptions Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param {string} [options.symbol.styleField] 按 styleField 属性设置不同样式。
 * @param {any} [options.symbol.styleFieldOptions] 按styleField值与对应style样式的键值对象。
 * @param {((...params: any[]) => any)} [options.symbol.callback] 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数,还包括：
 * @param {string} [options.popupOptions.title] 固定的标题名称
 * @param {string} [options.popupOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.popupOptions.noTitle] 不显示标题
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑定，参数与popup属性完全相同。
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数,还包括：
 * @param {string} [options.tooltipOptions.title] 固定的标题名称
 * @param {string} [options.tooltipOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.tooltipOptions.noTitle] 不显示标题
 * @param {any} [options.contextmenuItems] 绑定的右键菜单值，也可以bindContextMenu方法绑定
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 * @param {any} [options.graphicOptions] 默认的 graphic 构造参数，会被合并进 addGraphic/loadGeoJSON 的每一项（可统一指定 renderer、pane、popup 等），具体见各 {@link GraphicType} 矢量数据的构造参数。
 * @example // 方式一：整张地图统一使用 Canvas 渲染器
const map = new mars2d.Map("mars3dContainer", { renderer: L.canvas() });

// 方式二：只让本图层的矢量走 Canvas（同一实例可被该图层所有矢量共享）
const canvasRenderer = L.canvas({ padding: 0.5 });
const layer = new mars2d.layer.GraphicLayer({ graphicOptions: { renderer: canvasRenderer } });
map.addLayer(layer);
layer.loadGeoJSON(geojson);
 */
declare class GraphicLayer extends L.FeatureGroup {
    constructor(options?: {
        hasEdit?: boolean;
        isAutoEditing?: boolean;
        isContinued?: boolean;
        isDblclickForDrawEnd?: boolean;
        symbol?: {
          type?: GraphicType | string;
          styleOptions: any;
          styleField?: string;
          styleFieldOptions?: any;
          callback?: ((...params: any[]) => any);
        } | any;
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
        graphicOptions?: any;
      });
    /**
     * 获取图层矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 调用setZIndex此组中包含的每个图层，传递z-index。
     * @param {number} zIndex 图层顺序值
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    setZIndex(zIndex: number | any): GraphicLayer | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): GraphicLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    remove(): GraphicLayer | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): GraphicLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): GraphicLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    closePopup(): GraphicLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): GraphicLayer | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): GraphicLayer | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    unbindTooltip(): GraphicLayer | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): GraphicLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    closeTooltip(): GraphicLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): GraphicLayer | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): GraphicLayer | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): GraphicLayer | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 是否自动激活编辑（true时，单击后自动激活编辑）
     */
    hasEdit: boolean | any;
    /**
     * 是否正在绘制中
     */
    readonly isDrawing: boolean | any;
    /**
     * 是否正在编辑状态
     */
    readonly isEditing: boolean | any;
    /**
     * 图层内的Graphic矢量数据个数
     */
    readonly length: number | any;
    /**
     * 当前图层内的矢量数据数组
     */
    readonly graphics: L.Layer[] | any;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    onAdd(): void | any;
    onRemove(): void | any;
    addLayer(): void | any;
    /**
     * 添加Graphic矢量数据
     * @param {L.Layer | any | L.Layer[]} graphic 待添加的矢量数据 或 矢量数据构造参数
     * @returns {L.Layer | L.Layer[]} 矢量数据
     */
    addGraphic(graphic: L.Layer | any | L.Layer[]): L.Layer | L.Layer[] | any;
    removeLayer(): void | any;
    /**
     * 移除Graphic矢量数据
     * @param {L.Layer} graphic 矢量数据
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    removeGraphic(graphic: L.Layer | any): GraphicLayer | any;
    /**
     * 是否包含Graphic矢量数据
     * @param {any} graphic 矢量数据
     * @returns {boolean} 是否包含
     */
    hasGraphic(graphic: any): boolean | any;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    eachGraphic(method: ((...params: any[]) => any) | any, context?: any): GraphicLayer | any;
    /**
     * 获取图层内 所有矢量数据
     * @param {boolean} [hasPrivate] 是否取私有的graphic
     * @returns {L.Layer[]} 矢量数据数组
     */
    getGraphics(hasPrivate?: boolean | any): L.Layer[] | any;
    /**
     * 根据id取矢量数据对象
     * @param {number | string} id 矢量数据id
     * @returns {L.Layer | undefined} 矢量数据对象，未找到时返回 undefined
     */
    getGraphicById(id: number | string | any): L.Layer | undefined | any;
    /**
     * 根据 指定属性 获取 单个矢量数据对象（多个匹配时取首个）
     * @param {string | number} attrValue 属性值
     * @param {string} [attrName] 属性键
     * @returns {any} 矢量数据对象
     */
    getGraphicByAttr(attrValue: string | number | any, attrName?: string | any): any;
    /**
     * 清除图层内所有矢量数据
     * @returns {void} 无
     */
    clear(): void | any;
    /**
     * 批量清空图层内的矢量数据（避免逐个 remove 时 MarsArray 的 indexOf+splice 造成 O(n²)）
     * @returns {GraphicLayer} 当前对象本身
     */
    clearLayers(): GraphicLayer | any;
    /**
     * 设置覆盖的透明度
     * @param {number} opacity 透明度，取值范围 0-1
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number | any): GraphicLayer | any;
    /**
     * 绑定右键菜单
     * @param {any[]} content 右键菜单配置数组，数组中每一项包括：
     * @param {string} [content.text] 菜单文字
     * @param {string} [content.iconCls] 小图标css
     * @param {((...params: any[]) => any) | boolean} [content.show] 菜单项是否显示的回调方法
     * @param {((...params: any[]) => any)} [content.callback] 菜单项单击后的回调方法
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     * @example //在layer上绑定右键菜单
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        let graphic = e.graphic;
        if (!graphic || !graphic.editing) {
          return false;
        }
        return !graphic.editing.enabled();
      },
      callback: function (e) {
        let graphic = e.graphic;
        if (graphic && graphic.editing) {
          graphic.editing.enable();
        }
      },
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        let graphic = e.graphic;
        if (!graphic || !graphic.editing) {
          return false;
        }
        return graphic.editing.enabled();
      },
      callback: function (e) {
        let graphic = e.graphic;
        if (graphic && graphic.editing) {
          graphic.editing.disable();
        }
      },
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        let graphic = event.graphic;
        if (!graphic) {
          return false;
        } else {
          return true;
        }
      },
      callback: function (e) {
        let graphic = e.graphic;
        if (!graphic) {
          return;
        }
        graphicLayer.removeGraphic(graphic);
      },
    },
  ]);
     */
    bindContextMenu(content?: {
        text?: string;
        iconCls?: string;
        show?: ((...params: any[]) => any) | boolean;
        callback?: ((...params: any[]) => any);
      }[] | any): GraphicLayer | any;
    /**
     * 解除绑定的右键菜单
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): GraphicLayer | any;
    /**
     * 获取绑定的右键菜单数组
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 是否有绑定的右键菜单
     * @returns {boolean} 是否已绑定右键菜单
     */
    hasContextMenu(): boolean | any;
    /**
     * 参数方式添加矢量对象, 同addGraphic
     * @param {any | any[] | string} json 矢量数据构造参数，可以用toJSON方法导出的值； 传string时对应的值存放的json路径地址。
     * @param {any} [options] 加载控制参数,包含：
     * @param {boolean} [options.clear] 是否清除图层已有数据
     * @param {boolean} [options.flyTo] 是否加载完成后进行飞行到数据区域
     * @param {((...params: any[]) => any)} [options.onEachFeature] 创建每个Graphic前的回调
     * @returns {Promise<(any[] | any)>} 绘制创建完成的Promise 添加后的Graphic对象
     */
    loadJSON(json: any | any[] | string, options?: {
        clear?: boolean;
        flyTo?: boolean;
        onEachFeature?: ((...params: any[]) => any);
      } | any): Promise<(any[] | any)> | any;
    /**
     * 将图层转为Json简单对象，用于存储后再传参加载
     * @returns {any} Json简单对象
     */
    toJSON(): any;
    /**
     * 将图层数据导出为GeoJSON格式规范对象。
     * @param {any} [options] 参数对象: 预留参数
     * @returns {any} GeoJSON格式规范对象
     */
    toGeoJSON(options?: any): any;
    /**
     * 加载转换GeoJSON格式规范数据为Graphic后加载到图层中。
     * @param {string | any} geojson GeoJSON格式规范数据
     * @param {any} [options] 加载控制参数,包含：
     * @param {boolean} [options.clear] 是否清除图层已有数据
     * @param {boolean} [options.flyTo] 是否加载完成后进行飞行到数据区域
     * @param {GraphicType | string} [options.type] 转为指定的类型
     * @param {any} [options.style] 可以设置指定style样式,每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
     * @param {string} [options.crs] 原始数据的坐标系，如'EPSG:3857' （可以从 {@link http://epsg.io }查询）
     * @param {((...params: any[]) => any)} [options.onEachFeature] 创建每个Graphic前的回调
     * @param {((...params: any[]) => any)} [options.filter] 数据筛选方法，方法体内返回false时排除数据 filter:function(feature){return true}
     * @returns {Marker[] | Polyline[] | Polygon[] | Circle[] | Rectangle[] | any} 转换后的Graphic对象数组
     */
    loadGeoJSON(geojson: string | any, options?: {
        clear?: boolean;
        flyTo?: boolean;
        type?: GraphicType | string;
        style?: any;
        crs?: string;
        onEachFeature?: ((...params: any[]) => any);
        filter?: ((...params: any[]) => any);
      } | any): Marker[] | Polyline[] | Polygon[] | Circle[] | Rectangle[] | any;
    /**
     * 将图层置于所有图层之下
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): GraphicLayer | any;
    /**
     * 将图层置于所有图层之上
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): GraphicLayer | any;
    /**
     * 打开Popup弹窗
     * @param {Marker | Polyline | Polygon | any} graphic 矢量数据
     * @param {L.LatLng} [latlng] 指定弹出的位置
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
     */
    openPopup(graphic: Marker | Polyline | Polygon | any, latlng?: L.LatLng | any): GraphicLayer | any;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的数据范围
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {GraphicLayer} 当前对象本身，可以链式调用
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
      } | any): GraphicLayer | any;
    /**
     * 是否存在Popup绑定
     * @returns {boolean} 是否存在Popup绑定
     */
    hasPopup(): boolean | any;
    /**
     * 是否绑定了tooltip
     * @returns {boolean} 是否绑定
     */
    hasTooltip(): boolean | any;
    /**
     * 开始绘制矢量数据，绘制的数据会加载在当前图层。
     * @param {any} options Graphic构造参数,包含：
     * @param {GraphicType | string} options.type 类型
     * @param {any} [options.style] 按type支持 {@link GraphicType} 类的构造方法参数
     * @param {any} [options.attr] 附带的属性信息
     * @param {number} [options.maxPointNum] 绘制时，最多允许点的个数, 仅部分线面对象支持。
     * @param {((...params: any[]) => any)} [options.success] 绘制创建完成的回调方法，同drawCreated事件，例如： success: function (graphic){  }
     * @returns {Promise<(any | null)>} 创建完成的矢量数据对象，取消绘制或类型未注册时返回 null
     */
    startDraw(options?: {
        type: GraphicType | string;
        style?: any;
        attr?: any;
        maxPointNum?: number;
        success?: ((...params: any[]) => any);
      } | any): Promise<(any | null)> | any;
    /**
     * 完成绘制和编辑，如有未完成的绘制会自动完成。
     * 在移动端需要调用此方法来类似PC端双击结束。
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    endDraw(): GraphicLayer | any;
    /**
     * 停止绘制。
     * 线面对象：未完成的绘制会自动删除，已绘制的会完成在最后一个点位；
     * 点状对象：会结束停留在最后一个点位，未完成的绘制会自动删除
     * 如果需要清除正在绘制的对象，请用 clearDrawing() 方法
     * @returns {boolean} 是否清除了未完成的对象
     */
    stopDraw(): boolean | any;
    /**
     * 清除正在绘制的对象
     * @returns {boolean} 是否清除了对象
     */
    clearDrawing(): boolean | any;
    /**
     * 激活编辑，绑定相关处理，同 hasEdit=true
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    activateEdit(): GraphicLayer | any;
    /**
     * 释放编辑，解除绑定相关事件，同 hasEdit=false
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    disableEdit(): GraphicLayer | any;
    /**
     * 激活编辑指定的矢量数据
     * @param {Marker | Polyline | Polygon | Circle | Rectangle | any} graphic 需要激活编辑的矢量数据
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    startEditing(graphic: Marker | Polyline | Polygon | Circle | Rectangle | any): GraphicLayer | any;
    /**
     * 停止编辑，释放正在编辑的对象。
     * @param {Marker | Polyline | Polygon | Circle | Rectangle | any} [graphic] 需要停止编辑的矢量数据，默认为上一次正在编辑的对象
     * @returns {GraphicLayer} 当前对象本身,可以链式调用
     */
    stopEditing(graphic?: Marker | Polyline | Polygon | Circle | Rectangle | any): GraphicLayer | any;
    /**
     * 销毁当前图层
     * @returns {void} 无
     */
    destroy(): void | any;
}
declare namespace GraphicLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
graphicLayer.on('popupopen', function (event) {
  console.log('触发了事件',event)
});
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
 * 业务数据(通过API接口获取)图层, 主要是为了封装后简化使用，或直接配置到config.json，也可以自行构造Graphic矢量对象加到GraphicLayer。<br />
 * 
 * 样式信息：通过symbol配置graphic类型和样式<br />
 * 坐标信息：建议接口返回中有规范的坐标字段lng\alt或用formatLatlng方法自定义解析
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.url] geojson文件或服务url地址
 * @param {any} [options.data] geojson格式规范数据对象，与url二选一即可。
 * @param {string} [options.dataColumn] 接口返回数据中，对应的业务数据数组所在的读取字段名称，支持多级(用.分割)；如果数据直接返回数组时可以不配置。
 * @param {((...params: any[]) => any)} [options.formatData] 可以对加载的数据进行格式化或转换操作
 * @param {((...params: any[]) => any)} [options.formatLatlng] 可以对加载的坐标进行格式化或转换操作 (优先级：formatLatlng方法>latlng字段>latColumn和lngColumn字段)
 * @param {string} [options.lngColumn] 点坐标时，经度值对应的字段名称, 如果数据内有latlng字段，latlng的优先级高于lngColumn (优先级：formatLatlng>latlng>lngColumn)
 * @param {string} [options.latColumn] 点坐标时，纬度值对应的字段名称
 * @param {((...params: any[]) => any)} [options.onCreateGraphic] 解析geojson后，外部自定义方法来创建Graphic对象
 * @param {((...params: any[]) => any)} [options.filter] 数据筛选方法，方法体内返回false时排除数据 filter:function(feature){return true}
 * @param {any | ((...params: any[]) => any)} [options.symbol] 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param {GraphicType | string} [options.symbol.type] 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param {any} options.symbol.styleOptions Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param {string} [options.symbol.styleField] 按 styleField 属性设置不同样式。
 * @param {any} [options.symbol.styleFieldOptions] 按styleField值与对应style样式的键值对象。
 * @param {boolean} [options.symbol.merge] 是否与数据自带的style合并，默认不合并。合并时数据自带的style优先（symbol样式不会覆盖数据自带样式）。
 * @param {((...params: any[]) => any)} [options.symbol.callback] 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param {any} [options.graphicOptions] 默认的graphic的构造参数，每种不同类型数据都有不同的属性，具体见各{@link GraphicType}矢量数据的构造参数。
 * @param {string} [options.proxy] 加载资源时要使用的代理服务url。
 * @param {any} [options.queryParameters] 一个对象，其中包含在检索资源时将发送的查询参数。比如：queryParameters: {'access_token': '123-435-456-000'}
 * @param {any} [options.headers] 一个对象，将发送的其他HTTP标头。比如：headers: { 'X-My-Header': 'valueOfHeader' }
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数,还包括：
 * @param {string} [options.popupOptions.title] 固定的标题名称
 * @param {string} [options.popupOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.popupOptions.noTitle] 不显示标题
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑定，参数与popup属性完全相同。
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数,还包括：
 * @param {string} [options.tooltipOptions.title] 固定的标题名称
 * @param {string} [options.tooltipOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.tooltipOptions.noTitle] 不显示标题
 * @param {any} [options.contextmenuItems] 绑定的右键菜单值，也可以bindContextMenu方法绑定
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class BusineDataLayer extends GraphicLayer {
    constructor(options?: {
        url?: string;
        data?: any;
        dataColumn?: string;
        formatData?: ((...params: any[]) => any);
        formatLatlng?: ((...params: any[]) => any);
        lngColumn?: string;
        latColumn?: string;
        onCreateGraphic?: ((...params: any[]) => any);
        filter?: ((...params: any[]) => any);
        symbol?: {
          type?: GraphicType | string;
          styleOptions: any;
          styleField?: string;
          styleFieldOptions?: any;
          merge?: boolean;
          callback?: ((...params: any[]) => any);
        } | any;
        graphicOptions?: any;
        proxy?: string;
        queryParameters?: any;
        headers?: any;
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
     * @param {any} [newOptions] 新设定的参数，会与类的构造参数合并。
     * @param {string} [newOptions.url] geojson文件或服务url地址
     * @param {any} [newOptions.data] geojson格式规范数据对象，与url二选一即可。
     * @param {any} [newOptions.clear] 是否清楚当前图层的所有数据，默认true
     * @param {any} [newOptions.类参数] 包含当前类支持的所有参数
     * @param {any} [newOptions.通用参数] 包含父类支持的所有参数
     * @returns {BusineDataLayer} 当前对象本身，可以链式调用
     */
    load(newOptions?: {
        url?: string;
        data?: any;
        clear?: any;
        类参数?: any;
        通用参数?: any;
      }): BusineDataLayer | any;
}
declare namespace BusineDataLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
BusineDataLayer.on('load', function (event) {
  console.log('触发了事件',event)
});
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
 * 大数据Marker点 图层（基于Canvas渲染）
 * @param {any} options 参数对象，包括以下：
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class CanvasMarkerLayer extends L.Layer {
    constructor(options?: {
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
      });
    /**
     * 将图层从地图上移除
     * @returns {CanvasMarkerLayer} 当前对象本身，可以链式调用
     */
    remove(): CanvasMarkerLayer | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    initialize(): void | any;
    setOptions(): void | any;
    redraw(): void | any;
    /**
     * 获取本图层的 Canvas 2D 绘图上下文（customDraw 回调中绘制个性点时使用）
     * @returns {CanvasRenderingContext2D | null} 2D 上下文，图层尚未初始化 Canvas 时返回 null
     */
    getContext(): CanvasRenderingContext2D | null | any;
    /**
     * 添加 图标点矢量对象 到本图层
     * @param {Marker} marker 图标点矢量对象
     * @returns {CanvasMarkerLayer} 当前对象本身，可以链式调用
     */
    addGraphic(marker: Marker | any): CanvasMarkerLayer | any;
    addMarker(): void | any;
    /**
     * 添加 图标点矢量对象数组 到本图层
     * @param {Marker[]} markers 图标点矢量对象数组
     * @returns {CanvasMarkerLayer} 当前对象本身，可以链式调用
     */
    addGraphics(markers: Marker[] | any): CanvasMarkerLayer | any;
    addMarkers(): void | any;
    /**
     * 移除指定矢量对象
     * @param {Marker} marker 指定矢量对象
     * @param {boolean} [redraw] 是否重绘
     * @returns {CanvasMarkerLayer} 当前对象本身，可以链式调用
     */
    removeGraphic(marker: Marker | any, redraw?: boolean | any): CanvasMarkerLayer | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {CanvasMarkerLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): CanvasMarkerLayer | any;
    /**
     * 清除图层内所有矢量数据
     * @returns {void} 无
     */
    clear(): void | any;
    /**
     * 增加绑定鼠标单击事件
     * @param {((...params: any[]) => any)} listener 事件方法
     * @returns {CanvasMarkerLayer} 当前对象本身，可以链式调用
     */
    addOnClickListener(listener: ((...params: any[]) => any) | any): CanvasMarkerLayer | any;
    /**
     * 增加绑定鼠标移入事件
     * @param {((...params: any[]) => any)} listener 事件方法
     * @returns {CanvasMarkerLayer} 当前对象本身，可以链式调用
     */
    addOnHoverListener(listener: ((...params: any[]) => any) | any): CanvasMarkerLayer | any;
}

/**
 * 聚合点 图层
 * @param {any} options 参数对象，包括以下：
 * @param {boolean} [options.zoomToBoundsOnClick] 当你点击一个集群时，是否缩放到它的边界
 * @param {boolean} [options.showCoverageOnHover] 将鼠标悬停在集群上时，是否显示其标记的边界
 * @param {Polyline.StyleOptions | any} [options.spiderLegPolylineOptions] 允许你指定聚群单击散开的连接线样式。
 * @param {Polygon.StyleOptions | any} [options.polygonOptions] 集群的Polygon边界的样式
 * @param {number | ((...params: any[]) => any)} [options.maxClusterRadius] 集群将从中央标记覆盖的最大半径（以像素为单位）。减少会使更多，更小的群集。 您也可以使用接受当前地图缩放的函数，并以像素为单位返回最大群集半径。
 * @param {boolean} [options.singleMarkerMode] 如果设置为true，则覆盖所有添加标记的图标，使其显示为1尺寸的群集。注意：标记不会被集群对象替换，只会替换它们的图标。因此，他们仍然对正常事件作出反应，选项disableClusteringAtZoom不会恢复其以前的图标
 * @param {boolean} [options.removeOutsideVisibleBounds] 当离开视图太远的集群和标记，是否将其从地图中移除以获得性能。
 * @param {boolean} [options.spiderfyOnMaxZoom] 当在最底层级别时，点击一个集群时，如果他们重叠着，我们是否可以通过spiderLeg连接线散开方式看到它的所有标记。
 * @param {number} [options.spiderfyDistanceMultiplier] 从1增加增加距离中心的距离，spiderfied marker被放置。如果您使用大标记图标，则使用
 * @param {boolean} [options.animate] 在缩放时是否有平滑分割/合并群集子项的动画。如果L.DomUtil.TRANSITION为false，则此选项不起作用（不可能有动画）
 * @param {boolean} [options.chunkedLoading] 在执行addLayer方法时，将处理分成很小的时间间隔，这样页面就不会冻结。
 * @param {number} [options.chunkInterval] 在执行addLayer方法时， 暂停之前让页面的其他部分处理的时间间隔（以毫秒为单位）。 特别是，这样可以防止页面在添加大量标记时被冻结。
 * @param {number} [options.chunkDelay] 在执行addLayer方法时， 连续处理周期之间的时间延迟（以毫秒为单位）
 * @param {((...params: any[]) => any)} [options.chunkProgress] 在每个chunkInterval结尾调用的回调函数（是函数不是布尔值，默认不设置）。通常用于实现进度指示器。
 * @param {((...params: any[]) => any)} [options.iconCreateFunction] 自定义创建集群图标的功能
 * @param {number} [options.disableClusteringAtZoom] 如果设置，在此缩放级别及以下，标记将不会聚集,注意：在使用disableClusteringAtZoom时，您可能有兴趣禁用spiderfyOnMaxZoom选项。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ClusterLayer extends L.Layer {
    constructor(options?: {
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
        chunkProgress?: ((...params: any[]) => any);
        iconCreateFunction?: ((...params: any[]) => any);
        disableClusteringAtZoom?: number;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
      });
    /**
     * 想要获取标记的可见父项（自身或包含在其中的群集当前在地图上可见）。
     * @param {Marker} marker 标记
     * @returns {Marker} 可见父项（自身或包含在其中的群集当前在地图上可见）。 如果标记及其父集合当前不可见，则返回null（它们不在可见视点附近）
     */
    getVisibleParent(marker: Marker | any): Marker | any;
    /**
     * 如果您已自定义群集图标以使用所包含标记中的某些数据，并且之后数据发生更改，请使用此方法强制刷新群集图标。
     * @param {Marker | Marker[]} [markers] 标记
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     * @example //没有参数强制重新绘制标记集群组中的所有集群图标。
markers.refreshClusters();
//用一个标记。
markers.refreshClusters(myMarker);
//使用一个数组或一个标记映射来强制只重新绘制它们的父集群。
markers.refreshClusters([myMarker0, myMarker33]);
markers.refreshClusters({id_0: myMarker0, id_any: myMarker33});
     */
    refreshClusters(markers?: Marker | Marker[] | any): ClusterLayer | any;
    /**
     * 缩放以显示给定的标记（如果需要的话，spiderfying），当标记在地图上可见时调用回调。
     * @param {Marker} marker 标记
     * @param {((...params: any[]) => any)} callback 标记
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    zoomToShowLayer(marker: Marker | any, callback: ((...params: any[]) => any) | any): ClusterLayer | any;
    /**
     * 将图层置于所有图层之上
     * @returns {ClusterLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): ClusterLayer | any;
    /**
     * 将图层置于所有图层之下
     * @returns {ClusterLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): ClusterLayer | any;
    /**
     * 获取图层矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 将图层内的矢量数据转为GeoJSON格式对象
     * @returns {any} 返回GeoJSON格式对象（作为GeoJSON GeometryCollection）。
     */
    toGeoJSON(): any;
    /**
     * 调用setZIndex此组中包含的每个图层，传递z-index。
     * @param {number} zIndex 图层顺序值
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    setZIndex(zIndex: number | any): ClusterLayer | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): ClusterLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    remove(): ClusterLayer | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): ClusterLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    closePopup(): ClusterLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): ClusterLayer | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): ClusterLayer | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    unbindTooltip(): ClusterLayer | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): ClusterLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    closeTooltip(): ClusterLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): ClusterLayer | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定右键菜单
     * @param {any[]} contextmenuItems 右键菜单数组
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(contextmenuItems: any[] | any): Map | any;
    /**
     * 获取绑定的右键菜单
     * @returns {any[]} 右键菜单数组
     */
    getContextMenu(): any[] | any;
    /**
     * 解除绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {ClusterLayer} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): ClusterLayer | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {ClusterLayer} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): ClusterLayer | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    addLayer(): void | any;
    /**
     * 添加 图标点矢量对象 到本图层
     * @param {Marker | any | (Marker | any)[]} graphic 图标点矢量对象或构造参数
     * @returns {ClusterLayer | ClusterLayer[]} 当前对象本身，可以链式调用
     */
    addGraphic(graphic: Marker | any | (Marker | any)[]): ClusterLayer | ClusterLayer[] | any;
    removeLayer(): void | any;
    /**
     * 移除指定矢量对象
     * @param {Marker} graphic 指定矢量对象
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    removeGraphic(graphic: Marker | any): ClusterLayer | any;
    /**
     * 是否包含Graphic矢量数据
     * @param {any} graphic 矢量数据
     * @returns {boolean} 是否包含
     */
    hasGraphic(graphic: any): boolean | any;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ClusterLayer} 当前对象本身,可以链式调用
     */
    eachGraphic(method: ((...params: any[]) => any) | any, context?: any): ClusterLayer | any;
    /**
     * 清除图层内所有矢量数据
     * @returns {void} 无
     */
    clear(): void | any;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的数据范围
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
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
      } | any): ClusterLayer | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): ClusterLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {ClusterLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): ClusterLayer | any;
    /**
     * 是否开启聚合，如果修改聚合属性请调用setOptions方法
     */
    clusterEnabled: boolean | any;
    onAdd(): void | any;
    onRemove(): void | any;
    disableClustering(): void | any;
    disableClusteringKeepSpiderfy(): void | any;
    enableClustering(): void | any;
    unfreeze(): void | any;
    freezeAtZoom(): void | any;
}
declare namespace ClusterLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
markers.on('clusterclick', function (a) {
 a.layer.zoomToBounds({padding: [20, 20]});
});
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
 * 昼夜区域 图层
 * @param {any} options 参数对象，包括以下：
 * @param {Date} [options.time] 当前时间
 * @param {string} [options.fillColor] 填充颜色
 * @param {number} [options.fillOpacity] 填充透明度
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class DayNightLayer extends L.Polygon {
    constructor(options?: {
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
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    initialize(): void | any;
    /**
     * 设置当前时间
     * @param {Date} date 时间
     * @returns {DayNightLayer} 当前对象本身，可以链式调用
     */
    setTime(date: Date | any): DayNightLayer | any;
}

/**
 * GeoJSON 矢量数据 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.url] geojson文件或服务url地址
 * @param {any} [options.data] geojson格式规范数据对象，与url二选一即可。
 * @param {string} [options.crs] 原始数据的坐标系，如'EPSG:3857'
 * @param {ChinaCRS} [options.chinaCRS] 标识数据的国内坐标系（用于自动纠偏或加偏）
 * @param {((...params: any[]) => any)} [options.format] 可以对加载的geojson数据进行格式化或转换操作
 * @param {((...params: any[]) => any)} [options.onCreateGraphic] 解析geojson后，外部自定义方法来创建Graphic对象
 * @param {((...params: any[]) => any)} [options.filter] 数据筛选方法，方法体内返回false时排除数据 filter:function(feature){return true}
 * @param {boolean | any} [options.mask] 标识是否绘制区域边界的反选遮罩层
 * @param {any} [options.graphicOptions] 默认的graphic的构造参数，每种不同类型数据都有不同的属性，具体见各{@link GraphicType}矢量数据的构造参数。
 * @param {any} [options.queryParameters] 一个对象，其中包含在检索URL资源时将发送的查询参数。比如：queryParameters: {'access_token': '123-435-456-000'}
 * @param {any} [options.headers] 一个对象，将发送URL的其他HTTP标头。比如：headers: { 'X-My-Header': 'valueOfHeader' }
 * @param {any | ((...params: any[]) => any)} [options.symbol] 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param {GraphicType | string} [options.symbol.type] 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param {any} options.symbol.styleOptions Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param {string} [options.symbol.styleField] 按 styleField 属性设置不同样式。
 * @param {any} [options.symbol.styleFieldOptions] 按styleField值与对应style样式的键值对象。
 * @param {((...params: any[]) => any)} [options.symbol.callback] 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数,还包括：
 * @param {string} [options.popupOptions.title] 固定的标题名称
 * @param {string} [options.popupOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.popupOptions.noTitle] 不显示标题
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑定，参数与popup属性完全相同。
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数,还包括：
 * @param {string} [options.tooltipOptions.title] 固定的标题名称
 * @param {string} [options.tooltipOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.tooltipOptions.noTitle] 不显示标题
 * @param {any} [options.contextmenuItems] 绑定的右键菜单值，也可以bindContextMenu方法绑定
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GeoJsonLayer extends GraphicLayer {
    constructor(options?: {
        url?: string;
        data?: any;
        crs?: string;
        chinaCRS?: ChinaCRS;
        format?: ((...params: any[]) => any);
        onCreateGraphic?: ((...params: any[]) => any);
        filter?: ((...params: any[]) => any);
        mask?: boolean | any;
        graphicOptions?: any;
        queryParameters?: any;
        headers?: any;
        symbol?: {
          type?: GraphicType | string;
          styleOptions: any;
          styleField?: string;
          styleFieldOptions?: any;
          callback?: ((...params: any[]) => any);
        } | any;
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
     * @param {any} [newOptions] 新设定的参数，会与类的构造参数合并。
     * @param {string} [newOptions.url] geojson文件或服务url地址
     * @param {any} [newOptions.data] geojson格式规范数据对象，与url二选一即可。
     * @param {any} [newOptions.类参数] 包含当前类支持的所有参数
     * @param {any} [newOptions.通用参数] 包含父类支持的所有参数
     * @returns {GeoJsonLayer} 当前对象本身，可以链式调用
     */
    load(newOptions?: {
        url?: string;
        data?: any;
        类参数?: any;
        通用参数?: any;
      }): GeoJsonLayer | any;
}
declare namespace GeoJsonLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
geojsonLayer.on('load', function (event) {
  console.log('触发了事件',event)
});
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
 * 经纬网 图层
 * @param {any} options 参数对象，包括以下：
 * @param {any[]} [options.zoomInterval] 不同层级的经纬网间隔配置，默认按下表设置。
 * @param {boolean} [options.show] 是否渲染经纬网
 * @param {string} [options.color] 线的颜色
 * @param {number} [options.opacity] 线的透明度
 * @param {number} [options.weight] 线的宽度
 * @param {boolean} [options.showLabel] 是否显示文本
 * @param {string} [options.font] 文本的大小和字体
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 * @example // 默认 zoomInterval（start/end 为缩放级别，interval 为经纬度间隔）
const zoomInterval = [
  { start: 2, end: 2, interval: 40 },
  { start: 3, end: 3, interval: 20 },
  { start: 4, end: 4, interval: 10 },
  { start: 5, end: 7, interval: 5 },
  { start: 8, end: 10, interval: 1 },
  { start: 11, end: 11, interval: 0.5 },
  { start: 12, end: 12, interval: 0.2 },
  { start: 13, end: 20, interval: 0.1 }
]
 */
declare class GraticuleLayer extends L.Layer {
    constructor(options?: {
        zoomInterval?: any[];
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
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 设置图层的是否渲染
     */
    show: boolean | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    initialize(): void | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {GraticuleLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): GraticuleLayer | any;
    /**
     * 设置透明度
     * @param {number} opacity 透明度
     * @returns {GraticuleLayer} 当前对象本身，可以链式调用
     */
    setOpacity(opacity: number | any): GraticuleLayer | any;
    /**
     * 清除图层内所有矢量数据
     * @returns {void} 无
     */
    clear(): void | any;
    /**
     * 绘制指定矩形区域的经纬网
     * @param {L.LatLngBounds} bounds 指定矩形区域,还包括：
     * @param {number} bounds.row 行数
     * @param {number} bounds.col 列数
     * @returns {GraticuleLayer} 当前对象本身，可以链式调用
     */
    customGrid(bounds: {
        row: number;
        col: number;
      } | any): GraticuleLayer | any;
}

/**
 * 热力图图层
 * @param {L.LatLng[] | any[]} [latlngs] 坐标数组，每个点中的可选第三个参数altitude表示点强度。除非max指定选项，否则强度应介于0.0和之间1.0。
 * @param {any} [options] 参数对象，包括以下：
 * @param {number} [options.minOpacity] 热力开始时的最小不透明度
 * @param {number} [options.maxZoom] 点达到最大强度的缩放级别（强度随缩放缩放），maxZoom默认情况下等于地图
 * @param {number} [options.max] 最大点强度
 * @param {number} [options.radius] 默认情况下，热图的每个“点”的半径
 * @param {number} [options.blur] 默认情况下的模糊量
 * @param {any} [options.gradient] 颜色渐变配置，例如：{0.4: 'blue', 0.65: 'lime', 1: 'red'}
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class HeatLayer extends L.Layer {
    constructor(latlngs?: L.LatLng[] | any[], options?: {
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
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    initialize(): void | any;
    /**
     * 设置新的坐标数组
     * @param {L.LatLng[]} latlngs 坐标数组
     * @returns {HeatLayer} 当前对象本身，可以链式调用
     */
    setLatLngs(latlngs: L.LatLng[] | any): HeatLayer | any;
    /**
     * 添加新的坐标点
     * @param {L.LatLng} latlng 坐标
     * @returns {HeatLayer} 当前对象本身，可以链式调用
     */
    addLatLng(latlng: L.LatLng | any): HeatLayer | any;
    /**
     * 设置新的配置信息
     * @param {any} options 同当前类构造参数
     * @returns {HeatLayer} 当前对象本身，可以链式调用
     */
    setOptions(options: any): HeatLayer | any;
    /**
     * 重新绘制图层
     * @returns {HeatLayer} 当前对象本身，可以链式调用
     */
    redraw(): HeatLayer | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {HeatLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): HeatLayer | any;
}

/**
 * A `VectorGrid` is a generic, abstract class for displaying tiled vector data.
 * it provides facilities for symbolizing and rendering the data in the vector
 * tiles, but lacks the functionality to fetch the vector tiles from wherever
 * they are.
 * @param {any} options 参数对象
 */
declare class VectorGrid extends L.GridLayer {
    constructor(options: any);
}

/**
 * PBF矢量瓦片图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url PBF/矢量瓦片（VectorTile）服务URL地址
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {boolean} [options.interactive] 是否允许鼠标交互，比如触发单击事件
 * @param {((...params: any[]) => any) | any} [options.style] 样式设置，单图层传入样式对象或回调方法，多图层时传入图层名+对应的样式的键值对
 * @param {((...params: any[]) => any)} [options.filter] 筛选数据的回调方法
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class PbfLayer extends VectorGrid {
    constructor(options?: {
        url: string;
        subdomains?: string | string[];
        interactive?: boolean;
        style?: ((...params: any[]) => any) | any;
        filter?: ((...params: any[]) => any);
        tms?: boolean;
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
    setUrl(): void | any;
}

/**
 * 网格 基类图层
 * @param {any} options 参数对象，包括以下：
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {number} [options.cellSize] 网格中瓦片的宽度和高度。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class VirtualGrid extends L.Layer {
    constructor(options?: {
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
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    onAdd(): void | any;
    onRemove(): void | any;
    getEvents(): void | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {VirtualGrid} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): VirtualGrid | any;
    removeFrom(): void | any;
}

/**
 * WFS 矢量数据 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url WFS服务的URL。
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {string} options.typeNS 要包含的图层的空间名
 * @param {string} options.typeName 要包含的图层名
 * @param {string} [options.geometryField] 服务内的geometry字段名称
 * @param {any} [options.filter] 筛选数据，如 new L.Filter.Like("OBJECTID", 68) 更多filter参考{@link https://github.com/Flexberry/Leaflet-WFST#filter}
 * @param {number} [options.minZoom] 最小的缩放级别，一般建议设置大些，与图层数据量有关系。
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {number} [options.cellSize] 网格中瓦片的宽度和高度。
 * @param {number} [options.maxFeatures] 每次请求的返回的最大矢量对象数量
 * @param {any | ((...params: any[]) => any)} [options.symbol] 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param {GraphicType | string} [options.symbol.type] 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param {any} options.symbol.styleOptions Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param {string} [options.symbol.styleField] 按 styleField 属性设置不同样式。
 * @param {any} [options.symbol.styleFieldOptions] 按styleField值与对应style样式的键值对象。
 * @param {((...params: any[]) => any)} [options.symbol.callback] 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数,还包括：
 * @param {string} [options.popupOptions.title] 固定的标题名称
 * @param {string} [options.popupOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.popupOptions.noTitle] 不显示标题
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any} [options.tooltip] 绑定的tooltip弹窗值，也可以bindTooltip方法绑定，参数与popup属性完全相同。
 * @param {Map.TooltipOptions} [options.tooltipOptions] tooltip弹窗时的配置参数,还包括：
 * @param {string} [options.tooltipOptions.title] 固定的标题名称
 * @param {string} [options.tooltipOptions.titleField] 标题对应的属性字段名称
 * @param {string} [options.tooltipOptions.noTitle] 不显示标题
 * @param {any} [options.contextmenuItems] 绑定的右键菜单值，也可以bindContextMenu方法绑定
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class WfsLayer extends VirtualGrid {
    constructor(options?: {
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
          callback?: ((...params: any[]) => any);
        } | any;
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
     * 透明度
     */
    opacity: number;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean;
    initialize(): void | any;
    createCell(): void | any;
    cellEnter(): void | any;
    cellLeave(): void | any;
    namespaceName(): void | any;
    /**
     * 设置覆盖的透明度
     * @param {number} opacity 透明度，取值范围 0-1
     * @returns {WfsLayer} 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number): WfsLayer | any;
    describeFeatureType(): void | any;
    bindGetFeature(): void | any;
    query(): void | any;
    loadFeatures(): void | any;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {WfsLayer} 当前对象本身,可以链式调用
     */
    eachGraphic(method: ((...params: any[]) => any), context?: any): WfsLayer | any;
    setStyle(): void | any;
    setFeatureStyle(): void | any;
    addLayers(): void | any;
    removeLayers(): void | any;
    /**
     * 清除图层内所有矢量数据
     * @returns {void} 无
     */
    clear(): void | any;
    /**
     * 根据id取矢量数据对象
     * @param {number} id 矢量数据id
     * @returns {L.Layer} 矢量数据对象
     */
    getGraphicById(id: number): L.Layer | any;
    /**
     * 将图层置于所有图层之下
     * @returns {WfsLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): WfsLayer | any;
    /**
     * 将图层置于所有图层之上
     * @returns {WfsLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): WfsLayer | any;
    /**
     * 获取图层矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 定位地图至当前图层数据区域
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {WfsLayer} 当前对象本身，可以链式调用
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
      }): WfsLayer | any;
}

/**
 * 图层组  图层
 * @param {any} [options] 参数对象，包括以下：
 * @param {any[]} [options.layers] 子图层配置数组（每项为图层构造参数对象，支持 {@link LayerType} 所有图层）
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GroupLayer extends L.LayerGroup {
    constructor(options?: {
        layers?: any[];
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
      });
    /**
     * 将图层内的矢量数据转为GeoJSON格式对象
     * @returns {any} 返回GeoJSON格式对象（作为GeoJSON GeometryCollection）。
     */
    toGeoJSON(): any;
    /**
     * 判断图层是否存在当前图层组中
     * @returns {boolean} 如果给定图层当前已添加到组中，则返回true。
     */
    hasLayer(): boolean | any;
    /**
     * 从组中删除所有图层
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    clearLayers(): GroupLayer | any;
    /**
     * 遍历当前的所有子图层
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    eachLayer(method: ((...params: any[]) => any) | any, context?: any): GroupLayer | any;
    /**
     * 获取指定id的图层
     * @param {number} id 图层id
     * @returns {L.Layer} 图层
     */
    getLayer(id: number | any): L.Layer | any;
    /**
     * 获取图层的id
     * @param {L.Layer} layer 图层
     * @returns {number} 图层的id
     */
    getLayerId(layer: L.Layer | any): number | any;
    /**
     * 返回添加到组中的所有图层的数组
     * @returns {L.Layer[]} 图层数组
     */
    getLayers(): L.Layer[] | any;
    /**
     * 调用setZIndex此组中包含的每个图层，传递z-index。
     * @param {number} zIndex 图层顺序值
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    setZIndex(zIndex: number | any): GroupLayer | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): GroupLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    remove(): GroupLayer | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): GroupLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): GroupLayer | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): GroupLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    closePopup(): GroupLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): GroupLayer | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): GroupLayer | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    unbindTooltip(): GroupLayer | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): GroupLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    closeTooltip(): GroupLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): GroupLayer | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {GroupLayer} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): GroupLayer | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {GroupLayer} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): GroupLayer | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    /**
     * 是否可以调整图层顺序（在同类型图层间）
     */
    readonly hasZIndex: boolean | any;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    onAdd(): void | any;
    /**
     * 是否空组 ，空组目前就图层管理用于图层分组节点（虚拟节点）。
     */
    readonly hasEmptyGroup: boolean | any;
    /**
     * 是否有子图层
     */
    readonly hasChildLayer: boolean | any;
    /**
     * 子图层的个数
     */
    readonly length: number | any;
    /**
     * 添加图层
     * @param {L.Layer} childlayer 添加的子图层
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    addLayer(childlayer: L.Layer | any): GroupLayer | any;
    /**
     * 移除图层
     * @param {L.Layer | number} childlayer 移除的子图层 或 图层ID
     * @returns {GroupLayer} 当前对象本身，可以链式调用
     */
    removeLayer(childlayer: L.Layer | number | any): GroupLayer | any;
    getBounds(): void | any;
    /**
     * 定位地图至当前图层数据区域
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {GroupLayer} 当前对象本身，可以链式调用
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
      } | any): GroupLayer | any;
}
declare namespace GroupLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
groupLayer.on('add', function (event) {
  console.log('触发了事件',event)
});
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
 * XYZ瓦片图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url 用于请求瓦片图块的URL模板。它具有以下关键字:
<ul>
    <li><code>{z}</code>: 切片方案中切片的级别。零级是四叉树金字塔的根。</li>
    <li><code>{x}</code>:切片方案中的图块X坐标，其中0是最西端的图块。</li>
    <li><code>{y}</code>: 切片方案中的图块Y坐标，其中0是最北的图块。</li>
    <li><code>{reverseY}</code>:切片方案中的图块Y坐标，其中0是最南端的图块,用于TMS服务。</li>
    <li><code>{s}</code>:可用的子域之一，用于克服浏览器对每个主机的并发请求数的限制。</li>
</ul>
 * @param {string | string[]} [options.subdomains] 瓦片服务的子域名（未设置时取 Leaflet 默认值 abc）。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param {string} [options.proxy] 代理服务URL
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {CRS} [options.crs] 瓦片服务的坐标系（如 CRS.EPSG3857/CRS.EPSG4326），用于 {scale} 模板与 4326/3857 重投影判断。
 * @param {string | ((...params: any[]) => any)} [options.customColor] 设置自定义颜色
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class TileLayer extends L.TileLayer {
    constructor(options?: {
        url: string;
        subdomains?: string | string[];
        proxy?: string;
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
        customTags?: ((...params: any[]) => any);
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        crs?: CRS;
        customColor?: string | ((...params: any[]) => any);
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
      });
    /**
     * 将图层置于所有图层之上
     * @returns {TileLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): TileLayer | any;
    /**
     * 将图层置于所有图层之下
     * @returns {TileLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): TileLayer | any;
    /**
     * 设置覆盖的透明度
     * @param {number} opacity 透明度，取值范围 0-1
     * @returns {TileLayer} 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number | any): TileLayer | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {TileLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): TileLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {TileLayer} 当前对象本身，可以链式调用
     */
    remove(): TileLayer | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {TileLayer} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): TileLayer | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {TileLayer} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): TileLayer | any;
    /**
     * 获取图层对应的DOM容器
     */
    readonly container: HTMLElement | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 图层服务地址
     */
    url: string | any;
    /**
     * 是否可以调整图层顺序（在同类型图层间）
     */
    readonly hasZIndex: boolean | any;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number | any;
    /**
     * 图层矩形边界
     */
    bounds: L.LatLngBounds | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    /**
     * 仅在内部调用，返回给定坐标的瓦片的URL。扩展类TileLayer可以覆盖此功能，以提供自定义图块URL命名方案。
     * @param {any} coords 瓦片的xyz信息
     * @returns {string} 瓦片图片URL地址
     */
    getTileUrl(coords: any): string | any;
    /**
     * 设置自定义颜色
     */
    customColor: string | ((...params: any[]) => any) | any;
    /**
     * 设置图层矩形边界
     * @param {L.LatLngBounds} bounds 矩形边界
     * @returns {void}
     */
    setBounds(bounds: L.LatLngBounds | any): void | any;
    /**
     * 获取图层矩形边界(构造参数设置的)
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 定位地图至当前图层数据区域
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {TileLayer} 当前对象本身，可以链式调用
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
      } | any): TileLayer | any;
    /**
     * 销毁当前对象
     * @param {boolean} [noDel] false:会自动delete释放所有属性，true：不delete绑定的变量
     * @returns {void} 无
     */
    destroy(noDel?: boolean | any): void | any;
    createTile(): void | any;
}
declare namespace TileLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
tileLayer.on('load', function (event) {
  console.log('触发了事件',event)
});
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
 * ArcGIS规则松散型切片 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url 用于请求瓦片图块的URL模板。它具有以下关键字:
<ul>
    <li><code>{z}</code>: 切片方案中切片的级别。零级是四叉树金字塔的根。</li>
    <li><code>{x}</code>:切片方案中的图块X坐标，其中0是最西端的图块。</li>
    <li><code>{y}</code>: 切片方案中的图块Y坐标，其中0是最北的图块。</li>
    <li><code>{s}</code>:可用的子域之一，用于克服浏览器对每个主机的并发请求数的限制。</li>
</ul>
 * @param {boolean} [options.upperCase] url请求的瓦片图片名称是否大写。
 * @param {string | string[]} [options.subdomains] 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisCacheLayer extends TileLayer {
    constructor(options?: {
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
        customTags?: ((...params: any[]) => any);
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
 * ArcGIS规则紧凑型（bundle）切片  图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url 用于请求瓦片图块的URL模板，比如："http://data.mars2d.cn/arcgis_cache/hfghBundle/_alllayers"
 * @param {boolean} [options.upperCase] url请求的瓦片图片名称是否大写。
 * @param {string | string[]} [options.subdomains] 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisCompactLayer extends TileLayer {
    constructor(options?: {
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
        customTags?: ((...params: any[]) => any);
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
    getMapPictureBinary(): void | any;
    getPictureBuffer(): void | any;
}

/**
 * ArcGIS瓦片  图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url 用于请求瓦片图块的URL模板，比如："https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"
 * @param {string | string[]} [options.subdomains] 瓦片服务的子域名。可以以一个字符串的形式（每个字母都是子域名）或一个字符串数组的形式传递。
 * @param {string} [options.token] 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param {string} [options.proxy] 代理服务URL
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisLayer extends TileLayer {
    constructor(options?: {
        url: string;
        subdomains?: string | string[];
        token?: string;
        proxy?: string;
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
        customTags?: ((...params: any[]) => any);
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
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.layer] 图层类型，以及以下内容:<br />
<ul>
    <li><code>vec</code>: 电子图层</li>
    <li><code>img_d</code>: 卫星影像</li>
    <li><code>img_z</code>: 影像注记</li>
    <li><code>custom</code>: 自定义样式图层</li>
    <li><code>time</code>: 实时路况信息</li>
    <li><code>streetview</code>: 街景覆盖图层</li>
</ul>
 * @param {string} [options.url] 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是一个数组，数组中的每个元素都是一个子域。
 * @param {boolean} [options.bigfont] 当layer为vec或img_z时，来标识使用是否大写字体。
 * @param {string} [options.style] 当layer为custom时，标识的样式，可选值：dark,midnight,grayscale,hardedge,light,redalert,googlelite,grassgreen,pink,darkgreen,bluish
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class BaiduLayer extends TileLayer {
    constructor(options?: {
        layer?: string;
        url?: string;
        subdomains?: string | string[];
        bigfont?: boolean;
        style?: string | any;
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
        customTags?: ((...params: any[]) => any);
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
 * 空白图层， 比如用于无底图的切换
 * @param {any} options 参数对象，包括以下：
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class EmptyTileLayer extends L.Layer {
    constructor(options?: {
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
      });
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    onAdd(): void | any;
    onRemove(): void | any;
    getContainer(): void | any;
}

/**
 * 高德瓦片 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.layer] 图层类型，以及以下内容:<br />
<ul>
    <li><code>vec</code>: 电子图层</li>
    <li><code>img_d</code>: 卫星影像</li>
    <li><code>img_z</code>: 影像注记</li>
    <li><code>time</code>: 实时路况信息</li>
</ul>
 * @param {string} [options.url] 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {boolean} [options.bigfont] 当layer为vec时，来标识使用是否大写字体。
 * @param {string} [options.proxy] 代理服务URL
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GaodeLayer extends TileLayer {
    constructor(options?: {
        layer?: string;
        url?: string;
        subdomains?: string | string[];
        bigfont?: boolean;
        proxy?: string;
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
        customTags?: ((...params: any[]) => any);
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
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.layer] 图层类型，以及以下内容:<br />
<ul>
    <li><code>vec</code>: 电子图层</li>
    <li><code>img_d</code>: 卫星影像</li>
    <li><code>img_z</code>: 影像注记</li>
    <li><code>ter</code>: 地形渲染图</li>
</ul>
 * @param {string} [options.url] 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class GoogleLayer extends TileLayer {
    constructor(options?: {
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
        customTags?: ((...params: any[]) => any);
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
 * 单张图片 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url 图片url地址
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {boolean} [options.interactive] 如果true，当点击或悬停时，图像叠加层将发出鼠标事件mouse events 。
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.zIndex] css的叠加顺序
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ImageLayer extends L.ImageOverlay {
    constructor(options?: {
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
        zIndex?: number;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
      });
    /**
     * 将图层置于所有图层之上
     * @returns {ImageLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): ImageLayer | any;
    /**
     * 将图层置于所有图层之下
     * @returns {ImageLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): ImageLayer | any;
    /**
     * 设置覆盖的透明度
     * @param {number} opacity 透明度，取值范围 0-1
     * @returns {ImageLayer} 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number | any): ImageLayer | any;
    /**
     * 设置图层矩形边界
     * @param {L.LatLngBounds} bounds 矩形边界
     * @returns {ImageLayer} 当前对象本身,可以链式调用
     */
    setBounds(bounds: L.LatLngBounds | any): ImageLayer | any;
    /**
     * 获取图层矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): ImageLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    remove(): ImageLayer | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Popup} content Popup弹窗内容
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    bindPopup(content: string | HTMLElement | ((...params: any[]) => any) | L.Popup | any, options?: Map.PopupOptions | any): ImageLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): ImageLayer | any;
    /**
     * 打开Popup弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    openPopup(latlng?: L.LatLng | any): ImageLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    closePopup(): ImageLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Popup} content Popup弹窗内容
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    setPopupContent(content: string | HTMLElement | L.Popup | any): ImageLayer | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定Tooltip弹窗配置
     * @param {string | HTMLElement | ((...params: any[]) => any) | L.Tooltip} content Tooltip弹窗内容
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    bindTooltip(content: string | HTMLElement | ((...params: any[]) => any) | L.Tooltip | any, options?: Map.TooltipOptions | any): ImageLayer | any;
    /**
     * 解除绑定Tooltip弹窗配置
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    unbindTooltip(): ImageLayer | any;
    /**
     * 打开Tooltip弹窗
     * @param {L.LatLng} [latlng] 位置,如果latlng没有设置则在默认的所在位置打开。
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    openTooltip(latlng?: L.LatLng | any): ImageLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    closeTooltip(): ImageLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isTooltipOpen(): boolean | any;
    /**
     * 设定绑定在图层上的弹窗的内容
     * @param {string | HTMLElement | L.Tooltip} content Tooltip弹窗内容
     * @returns {ImageLayer} 当前对象本身，可以链式调用
     */
    setTooltipContent(content: string | HTMLElement | L.Tooltip | any): ImageLayer | any;
    /**
     * 获取当前绑定在图层上的Tooltip弹窗对象
     * @returns {L.Tooltip} Tooltip弹窗对象
     */
    getTooltip(): L.Tooltip | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {ImageLayer} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): ImageLayer | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {ImageLayer} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): ImageLayer | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 图层服务地址
     */
    url: string | any;
    /**
     * 是否可以调整图层顺序（在同类型图层间）
     */
    readonly hasZIndex: boolean | any;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    getLatLngs(): void | any;
    toGeoJSON(): void | any;
}
declare namespace ImageLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
imageLayer.on('click', function (event) {
  console.log('触发了事件',event)
});
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
 * 可旋转的单张图片 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url 图片url地址
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {L.LatLng} options.topleft 图片左上角坐标（必填）
 * @param {L.LatLng} options.topright 图片右上角坐标（必填）
 * @param {L.LatLng} options.bottomleft 图片左下角坐标（必填）
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ImageRotatedLayer extends ImageLayer {
    constructor(options?: {
        url: string;
        subdomains?: string | string[];
        topleft: L.LatLng;
        topright: L.LatLng;
        bottomleft: L.LatLng;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
      });
    onAdd(): void | any;
    onRemove(): void | any;
    setPosition(): void | any;
    setUrl(): void | any;
}

/**
 * Mapbox地图服务
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.url] Mapbox服务器网址。
 * @param {string} [options.username] 地图帐户的用户名。
 * @param {string} options.styleId Mapbox样式ID。
 * @param {string} [options.accessToken] 图像的Token公共访问令牌。
 * @param {number} [options.tilesize] 图像块的大小。
 * @param {boolean} [options.scaleFactor] 确定贴图是否以 @2x 比例因子渲染。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class MapboxLayer extends TileLayer {
    constructor(options?: {
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
        customTags?: ((...params: any[]) => any);
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
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.url] 服务url地址
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class OsmLayer extends TileLayer {
    constructor(options?: {
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
        customTags?: ((...params: any[]) => any);
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
 * 超图SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)。使用 TileImage 资源出图。
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url 服务地址，例如:https://iserver.supermap.io/iserver/services/map-world/rest/maps/World
 * @param {string | string[]} [options.subdomains] 子域名数组。
 * @param {string} [options.layersID] 获取进行切片的地图图层 ID，即指定进行地图切片的图层，可以是临时图层集，也可以是当前地图中图层的组合
 * @param {boolean} [options.redirect] 是否重定向，如果为 true，则将请求重定向到瓦片的真实地址；如果为 false，则响应体中是瓦片的字节流。
 * @param {boolean} [options.transparent] 是否背景透明。
 * @param {boolean} [options.cacheEnabled] 启用缓存。
 * @param {any} [options.prjCoordSys] 请求的地图的坐标参考系统。 如：prjCoordSys={"epsgCode":3857}。
 * @param {boolean} [options.overlapDisplayed] 地图对象在同一范围内时，是否重叠显示。
 * @param {string} [options.overlapDisplayedOptions] 避免地图对象压盖显示的过滤选项。
 * @param {string} [options.tileversion] 切片版本名称，cacheEnabled 为 true 时有效。如果没有设置 tileversion 参数，而且当前地图的切片集中存在多个版本，则默认使用最后一个更新版本。
 * @param {CRS} [options.crs] 坐标系统类。
 * @param {string} [options.tileProxy] 服务代理地址。
 * @param {string} [options.format] 瓦片表述类型，支持 "png" 、"webp"、"bmp" 、"jpg"、 "gif" 等图片格式。
 * @param {number | L.Point} [options.tileSize] 瓦片大小。
 * @param {any} [options.rasterfunction] 栅格分析参数。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class SmTileLayer extends TileLayer {
    constructor(options?: {
        url: string;
        subdomains?: string | string[];
        layersID?: string;
        redirect?: boolean;
        transparent?: boolean;
        cacheEnabled?: boolean;
        prjCoordSys?: any;
        overlapDisplayed?: boolean;
        overlapDisplayedOptions?: string;
        tileversion?: string;
        crs?: CRS;
        tileProxy?: string;
        format?: string;
        tileSize?: number | L.Point;
        rasterfunction?: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
      });
    onAdd(): void | any;
    /**
     * 根据缩放级别获取比例尺。
     * @param {number} zoom 缩放级别
     * @returns {number} 比例尺
     */
    getScale(zoom: number): number | any;
    /**
     * 通过行列号获取比例尺。
     * @param {any} coords 行列号
     * @returns {number} 比例尺
     */
    getScaleFromCoords(coords: any): number | any;
    setUrl(): void | any;
    getDefaultScale(): void | any;
    setTileSetsInfo(): void | any;
    lastTilesVersion(): void | any;
    nextTilesVersion(): void | any;
    changeTilesVersion(): void | any;
    updateCurrentTileSetsIndex(): void | any;
    mergeTileVersionParam(): void | any;
}

/**
 * WMTS服务 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url WMTS GetTile操作(用于kvp编码的请求)或tile-URL模板(用于RESTful请求)的基本URL。tile-URL模板应该包含以下变量:&#123;style&#125;, &#123;TileMatrixSet&#125;, &#123;TileMatrix&#125;, &#123;TileRow&#125;, &#123;TileCol&#125; 前两个是可选的，如果实际值是硬编码的或者服务器不需要。 &#123;s&#125;关键字可用于指定子域。
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {string} options.layer WMTS请求的层名。
 * @param {string} [options.style] WMTS请求的样式名称。
 * @param {string} [options.tilematrixSet] 用于WMTS请求的TileMatrixSet的标识符。
 * @param {string[]} [options.tileMatrixLabels] 用于WMTS请求的tilematrix，瓦片矩阵中用于WMTS请求的标识符列表，对应tilematrix参数，每个瓦片矩阵级别一个。
 * @param {string} [options.tilematrixBefore] 用于WMTS请求的tilematrix，当tileMatrixLabels是有规律的前缀+层级时，可以用tilematrixBefore配置前缀字符串即可。
 * @param {string} [options.format] 要从服务器检索的瓦片图像的MIME类型。
 * @param {string} [options.version] 使用WMTS服务版本
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string} [options.pickFeaturesUrl] enablePickFeatures为true时，用于单击查看矢量对象功能的对应wms服务url。
 * @param {any} [options.getFeatureInfoParameters] 在单击坐标处通过GetFeatureInfo请求接口时,传递给WMS服务器的附加参数。
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {any} [highlight] 鼠标移单击后高亮对应的矢量对象的样式
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class WmtsLayer extends TileLayer {
    constructor(options?: {
        url: string;
        subdomains?: string | string[];
        layer: string;
        style?: string | any;
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
        customTags?: ((...params: any[]) => any);
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        pickFeaturesUrl?: string;
        getFeatureInfoParameters?: any;
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
      }, highlight?: any);
    getParamString(): void | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | any | ((...params: any[]) => any)} fn Popup弹窗模板或回调方法
     * @param {Map.PopupOptions} [popupOptions] Popup弹窗参数
     * @returns {WmtsLayer} 当前对象本身，可以链式调用
     */
    bindPopup(fn: string | any | ((...params: any[]) => any), popupOptions?: Map.PopupOptions): WmtsLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {WmtsLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): WmtsLayer | any;
}

/**
 * 天地图瓦片 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.layer] 图层类型，以及以下内容:<br />
<ul>
    <li><code>vec_d</code>: 电子图层</li>
    <li><code>vec_z</code>: 电子注记</li>
    <li><code>vec_e</code>: 电子注记英文</li>
    <li><code>img_d</code>: 卫星影像</li>
    <li><code>img_z</code>: 影像注记</li>
    <li><code>img_e</code>: 影像注记英文</li>
    <li><code>ter_d</code>: 地形渲染图</li>
    <li><code>ter_z</code>: 地形渲染图注记</li>
</ul>
 * @param {string[]} [options.key] 天地图服务Token，可以自行注册官网： {@link https://console.tianditu.gov.cn/api/key}
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class TdtLayer extends WmtsLayer {
    constructor(options?: {
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
        customTags?: ((...params: any[]) => any);
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
 * @param {any} options 参数对象，包括以下：
 * @param {string} [options.layer] 图层类型，以及以下内容:<br />
<ul>
    <li><code>vec</code>: 电子图层</li>
    <li><code>img_d</code>: 卫星影像</li>
    <li><code>img_z</code>: 影像注记</li>
    <li><code>custom</code>: 地形渲染图</li>
</ul>
 * @param {string} [options.style] 当layer为custom时，标识的样式，可选值：灰白地图:3,暗色地图:4
 * @param {string} [options.url] 当未指定layer类型时，可以传入外部指定url的服务地址，常用于离线服务。
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是一个数组，数组中的每个元素都是一个子域。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class TencentLayer extends TileLayer {
    constructor(options?: {
        layer?: string;
        style?: string | any;
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
        customTags?: ((...params: any[]) => any);
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
 * WMS服务 图层
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url WMS服务的URL。
 * @param {string | string[]} [options.subdomains] URL模板中用于 {s} 占位符的子域。 如果此参数是单个字符串，则字符串中的每个字符都是一个子域。如果是 一个数组，数组中的每个元素都是一个子域。
 * @param {string} options.layers 要包含的图层，用逗号分隔。
 * @param {string} [options.styles] WMS请求的样式名称，用逗号分隔（对应 Leaflet WMS 的 styles 参数）。
 * @param {string} [options.format] 要从服务器检索的瓦片图像的MIME类型。
 * @param {boolean} [options.transparent] 如果true，WMS服务将返回具有透明度的图像。
 * @param {boolean} [options.uppercase] 如果true，WMS请求参数名称将是大写。
 * @param {string} [options.version] 使用WMS服务版本
 * @param {L.CRS} [options.crs] 坐标参考系统用于WMS请求，默认为映射CRS。如果您不确定这是什么意思，请不要更改。
 * @param {string} [options.cql_filter] 筛选服务数据的SQL语句
 * @param {boolean} [options.interactive] 是否触发鼠标事件，如果false，图层不会发出鼠标click事件和popup。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {any} [options.rectangle] 瓦片数据的矩形区域范围
 * @param {number} options.rectangle.xmin 最小经度值, -180 至 180
 * @param {number} options.rectangle.xmax 最大纬度值, -180 至 180
 * @param {number} options.rectangle.ymin 最小纬度值, -90 至 90
 * @param {number} options.rectangle.ymax 最大纬度值, -90 至 90
 * @param {number[]} [options.bbox] bbox规范的瓦片数据的矩形区域范围,与rectangle二选一即可。
 * @param {L.LatLngBounds} [options.bounds] leaflet原生写法，同rectangle或bbox
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {boolean} [options.show] 图层是否显示
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class WmsLayer extends L.TileLayer.WMS {
    constructor(options?: {
        url: string;
        subdomains?: string | string[];
        layers: string;
        styles?: string;
        format?: string;
        transparent?: boolean;
        uppercase?: boolean;
        version?: string;
        crs?: L.CRS;
        cql_filter?: string;
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
        tileSize?: number | L.Point;
        className?: string;
        keepBuffer?: number;
        detectRetina?: boolean;
        crossOrigin?: boolean;
        updateInterval?: number;
        updateWhenZooming?: boolean;
        noWrap?: boolean;
        chinaCRS?: ChinaCRS;
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        id?: string | number;
        pid?: string | number;
        name?: string;
        show?: boolean;
        pane?: string;
      });
    /**
     * 使用新参数更新合并参数，并更新服务。
     * @param {any} params 合并参数
     * @param {boolean} [noRedraw] 是否在当前屏幕范围重新请求图块,为true时不请求
     * @returns {WmsLayer} 当前对象本身,可以链式调用
     */
    setParams(params: any, noRedraw?: boolean | any): WmsLayer | any;
    /**
     * 将图层置于所有图层之上
     * @returns {WmsLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): WmsLayer | any;
    /**
     * 将图层置于所有图层之下
     * @returns {WmsLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): WmsLayer | any;
    /**
     * 设置覆盖的透明度
     * @param {number} opacity 透明度，取值范围 0-1
     * @returns {WmsLayer} 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number | any): WmsLayer | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {WmsLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): WmsLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {WmsLayer} 当前对象本身，可以链式调用
     */
    remove(): WmsLayer | any;
    /**
     * 关闭打开的弹窗
     * @returns {WmsLayer} 当前对象本身，可以链式调用
     */
    closePopup(): WmsLayer | any;
    /**
     * 当前绑定的弹窗是是否打开
     * @returns {boolean} 是否打开弹窗
     */
    isPopupOpen(): boolean | any;
    /**
     * 获取当前绑定在图层上的Popup弹窗对象
     * @returns {L.Popup} Popup弹窗对象
     */
    getPopup(): L.Popup | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {WmsLayer} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): WmsLayer | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {WmsLayer} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): WmsLayer | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 图层服务地址
     */
    url: string | any;
    /**
     * 是否可以调整图层顺序（在同类型图层间）
     */
    readonly hasZIndex: boolean | any;
    /**
     * 图层顺序，数字大的在上面。
     */
    zIndex: number | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    initialize(): void | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 绑定Popup弹窗配置
     * @param {string | any | ((...params: any[]) => any)} fn Popup弹窗模板或回调方法
     * @param {Map.PopupOptions} [popupOptions] Popup弹窗参数
     * @returns {WmsLayer} 当前对象本身，可以链式调用
     */
    bindPopup(fn: string | any | ((...params: any[]) => any), popupOptions?: Map.PopupOptions | any): WmsLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {WmsLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): WmsLayer | any;
    /**
     * 设置图层矩形边界
     * @param {L.LatLngBounds} bounds 矩形边界
     * @returns {void}
     */
    setBounds(bounds: L.LatLngBounds | any): void | any;
    /**
     * 获取图层矩形边界(构造参数设置的)
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
}

/**
 * 地图类 ，这是构造地图的一切的开始起点。
 * @param {string | HTMLElement} id 地图div容器的id或dom
 * @param {Map.Options} options 地图构造参数
 */
declare class Map extends L.Map {
    constructor(id: string | HTMLElement, options: Map.Options);
    // eslint-disable-next-line no-use-before-define
    contextmenu: Map.ContextMenu;
    /**
     * 当前类的原始构造参数
     */
    readonly marsOptions: any;
    initialize(): void | any;
    /**
     * 获取地图DOM容器。
     */
    readonly container: HTMLElement | any;
    /**
     * 获取地图所有控件。
     */
    readonly controls: any;
    /**
     * 获取或设置当前显示的底图，设置时可以传入图层id或name
     */
    basemap: string | number | L.TileLayer | any;
    /**
     * 当前地图层级
     */
    zoom: number | any;
    /**
     * 当前地图中心点
     */
    center: L.LatLng | any;
    /**
     * 当前地图显示范围
     */
    bounds: L.LatLngBounds | any;
    /**
     * 当前地图坐标系
     */
    crs: string | any;
    /**
     * 默认绑定的图层，简单场景时快捷方便使用
     */
    readonly graphicLayer: GraphicLayer | any;
    /**
     * 小Tooltip鼠标提示控件
     */
    readonly smallTooltip: SmallTooltip | any;
    /**
     * 判断所有图层是否在加载瓦片中
     */
    readonly isLoading: boolean | any;
    /**
     * 获取地图的配置参数，即new Map传入的参数。
     * @returns {any} 地图的配置参数
     */
    getOptions(): any;
    /**
     * 添加图层到地图上
     * @param {any} layer 图层
     * @param {boolean} [addToControl] 当存在layers控件时，是否添加到图层管理控件
     * @returns {L.Layer} 添加的图层对象（注意：不是 Map，不能链式调用）
     */
    addLayer(layer: any, addToControl?: boolean | any): L.Layer | any;
    /**
     * 从地图上移除一个指定的图层
     * 
     * 注意：每移除一个图层都会在内部图层列表里做一次 O(n) 的按值删除。
     * 需要一次移除多个图层时请用 {@link Map#removeLayers}，循环调用在大量图层场景会退化成 O(n²)。
     * @param {L.Layer | any} layer 图层
     * @param {boolean} [removeFromControl] 当存在layers控件时，是否从图层管理控件移除
     * @returns {Map} 当前对象本身，可以链式调用
     */
    removeLayer(layer: L.Layer | any, removeFromControl?: boolean | any): Map | any;
    /**
     * 批量从地图上移除图层。
     * 
     * 与逐个调用 {@link Map#removeLayer} 的结果一致（同样按图层触发 removeLayer 事件、同步图层管理控件），
     * 区别是内部图层列表只做一次批量清理，避免大批量移除时的 O(n²)。
     * @param {L.Layer[]} layers 图层数组（null/undefined 元素会被忽略）
     * @param {boolean} [removeFromControl] 当存在layers控件时，是否从图层管理控件移除
     * @returns {Map} 当前对象本身，可以链式调用
     */
    removeLayers(layers: L.Layer[] | any, removeFromControl?: boolean | any): Map | any;
    /**
     * 获取图层ID值，按顺序取值。
     * 没有id的图层，会自动使用本方法进行id赋值处理
     * @returns {number} 图层ID
     */
    getNextLayerId(): number | any;
    /**
     * 根据属性获取指定图层，包括config.json配置的图层
     * @param {string | number} attrValue 属性值
     * @param {string} [attrName] 属性键
     * @returns {L.Layer} 图层
     */
    getLayer(attrValue: string | number | any, attrName?: string | any): L.Layer | any;
    /**
     * 根据ID或取图层
     * @param {string | number} id 图层id
     * @returns {L.Layer} 图层
     */
    getLayerById(id: string | number | any): L.Layer | any;
    /**
     * 根据指定属性获取图层
     * @param {string | number} attrValue 属性值
     * @param {string} [attrName] 属性键
     * @returns {L.Layer | any} 图层
     */
    getLayerByAttr(attrValue: string | number | any, attrName?: string | any): L.Layer | any;
    /**
     * 根据指定属性获取图层列表
     * @param {string | number} attrValue 属性值
     * @param {string} [attrName] 属性键
     * @returns {L.Layer[] | any} 图层对象列表
     */
    getLayersByAttr(attrValue: string | number | any, attrName?: string | any): L.Layer[] | any;
    /**
     * 获取所有图层
     * @param {any} [options] 参数对象，包括以下：
     * @param {boolean} [options.basemaps] 默认不比较及处理，true:返回所有basemps中配置图层，false：排除所有所有basemps中配置图层
     * @param {boolean} [options.layers] 默认不比较及处理，true:返回所有operationallayers中配置图层，false：排除所有operationallayers中配置图层
     * @param {((...params: any[]) => any)} [options.filter] 筛选方法，方法体内返回false时排除数据 filter:function(feature){return true}
     * @returns {L.Layer[]} 图层数组
     */
    getLayers(options?: {
        basemaps?: boolean;
        layers?: boolean;
        filter?: ((...params: any[]) => any);
      } | any): L.Layer[] | any;
    /**
     * 获取所有图层的配置信息，通常用于配置图层树
     * @param {any} [options] 参数对象，包括以下：
     * @param {((...params: any[]) => any)} [options.filter] 筛选方法，方法体内返回false时排除数据 filter:function(feature){return true}
     * @param {((...params: any[]) => any)} [options.forEach] 递归调用图层配置信息，可以对导出的图层数据进行格式化或转换键值操作
     * @param {((...params: any[]) => any) | string} [options.autoGroup] 自动分组(string时指定属性进行分组，比如传 autoGroup:"type")，注意：如果map有group图层时，该参数无效。
     * @param {boolean} [options.basemaps] 默认不比较及处理，true:返回所有basemps中配置图层，false：排除所有所有basemps中配置图层[但已加到map的除外]
     * @param {boolean} [options.childs] 是否获取GroupLayer内的已经实例化的子图层（默认 false，内部固定传 childs:false）, 但没有加到map的图层不会去读取内部子图层
     * @returns {any} 返回值包括 { list: [id与pid关联的原始数组],  tree: [按children组织好的上下级树数组]}
     */
    getLayrsTree(options?: {
        filter?: ((...params: any[]) => any);
        forEach?: ((...params: any[]) => any);
        autoGroup?: ((...params: any[]) => any) | string;
        basemaps?: boolean;
        childs?: boolean;
      } | any): any;
    /**
     * 获取所有basemps底图图层
     * @param {boolean} [removeEmptyGroup] 是否移除 空图层组
     * @returns {L.TileLayer[]} 图层数组
     */
    getBasemaps(removeEmptyGroup?: boolean | any): L.TileLayer[] | any;
    /**
     * 获取所有瓦片图层，可以用于卷帘对比
     * @returns {L.TileLayer[]} 图层数组
     */
    getTileLayers(): L.TileLayer[] | any;
    /**
     * 添加控件到地图上
     * @param {L.Control} control 控件
     * @returns {Map} 当前对象本身，可以链式调用
     */
    addControl(control: L.Control | any): Map | any;
    /**
     * 从地图上移除一个指定的控件
     * @param {L.Control} control 控件
     * @returns {Map} 当前对象本身，可以链式调用
     */
    removeControl(control: L.Control | any): Map | any;
    /**
     * 获取默认右键菜单
     * @returns {any[]} 默认右键菜单数组
     */
    getDefaultContextMenu(): any[] | any;
    /**
     * 绑定右键菜单
     * @param {any[]} arr 菜单配置
     * @returns {Map} 当前对象本身，可以链式调用
     */
    bindContextMenu(arr: any[] | any): Map | any;
    /**
     * 取消绑定右键菜单
     * @returns {Map} 当前对象本身，可以链式调用
     */
    unbindContextMenu(): Map | any;
    /**
     * 显示小提示窗，一般用于鼠标操作的提示。
     * @param {L.Point | L.LatLng} position 显示的屏幕坐标位置
     * @param {string | any} message 显示的内容
     * @returns {Map} 当前对象本身，可以链式调用
     */
    openSmallTooltip(position: L.Point | L.LatLng | any, message: string | any): Map | any;
    /**
     * 关闭小提示窗
     * @returns {Map} 当前对象本身，可以链式调用
     */
    closeSmallTooltip(): Map | any;
    /**
     * 判断是否已经全屏
     * @returns {boolean | undefined} 是否已经全屏（浏览器不支持全屏时返回 undefined）
     */
    isFullscreen(): boolean | undefined | any;
    /**
     * 请求进入或退出全屏
     * @returns {boolean} true 表示已发出进入全屏请求，实际状态可用 isFullscreen 查询
     */
    toggleFullscreen(): boolean | any;
    /**
     * 设置鼠标的默认状态样式
     * @param {string} [val] cursor样式
     * @returns {void} 无
     */
    setCursor(val?: string | any): void | any;
    /**
     * 添加Thing对象到地图上
     * @param {BaseThing} item Thing对象
     * @returns {Map} 当前对象本身，可以链式调用
     */
    addThing(item: BaseThing | any): Map | any;
    /**
     * 移除Thing对象
     * @param {BaseThing} item 需要移除的Thing对象
     * @param {boolean} [hasDestroy] 是否释放
     * @returns {Map} 当前对象本身，可以链式调用
     */
    removeThing(item: BaseThing | any, hasDestroy?: boolean | any): Map | any;
    /**
     * 是否有指定的Thing对象存在（就是已经addThing的图层）
     * @param {BaseThing | string} thing 指定的Thing对象或Thing对象ID
     * @returns {boolean} 是否存在
     */
    hasThing(thing: BaseThing | string | any): boolean | any;
    /**
     * 遍历每一个Thing对象并将其作为参数传递给回调函数
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {Map} 当前对象本身,可以链式调用
     */
    eachThing(method: ((...params: any[]) => any) | any, context?: any): Map | any;
    /**
     * 根据指定属性获取Thing对象
     * @param {string | number | boolean} attrValue 属性值
     * @param {string} [attrName] 属性名称
     * @returns {BaseThing} Thing对象
     */
    getThing(attrValue: string | number | boolean | any, attrName?: string | any): BaseThing | any;
    /**
     * 获取当前层级和中心点
     * @returns {any} 获取当前层级和中心点
     */
    getView(): any;
    /**
     * 回到默认区域
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @param {L.Point} [options.paddingTopLeft] extent时，设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point} [options.paddingBottomRight] extent时，同上，不考虑地图容器右下角时使用。
     * @param {L.Point} [options.padding] extent时，相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] extent时，最大层级
     * @returns {Map} 当前对象本身，可以链式调用
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
      } | any): Map | any;
    /**
     * 定位地图至矢量对象处
     * @param {any} graphic 矢量对象
     * @param {any} [options] 定位参数，包括:
     * @param {number} [options.scale] 线面数据时，通过在每个方向上按给定百分比扩展当前边界，返回更大的边界
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @param {L.Point} [options.paddingTopLeft] 线面数据时，设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point} [options.paddingBottomRight] 线面数据时，同上，不考虑地图容器右下角时使用。
     * @param {L.Point} [options.padding] 线面数据时，相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 线面数据时，最大层级
     * @returns {Map} 当前对象本身，可以链式调用
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
      } | any): Map | any;
    /**
     * 定位地图至目标点
     * @param {L.LatLng} center 目标点坐标
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    flyToPoint(center: L.LatLng | any, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
      } | any): Map | any;
    /**
     * 获取精确的像素坐标，
     * 当需要绘制比较平滑的曲线的时候可调用此方法代替 latLngToContainerPoint
     * @param {L.LatLng} latlng 经纬度坐标
     * @returns {L.Point} 像素坐标
     */
    latLngToAccurateContainerPoint(latlng: L.LatLng | any): L.Point | any;
    /**
     * 设置Scene场景参数
     * @param {Map.Options} options 地图参数
     * @returns {Map} 当前对象本身，可以链式调用
     */
    setOptions(options: Map.Options | any): Map | any;
    /**
     * 返回 地图的当前边界，格式为 {xmin: 117.024994, xmax: 117.414322, ymin: 31.711229, ymax: 32.029617}
     * @param {number} [precision] 保留小数位
     * @returns {any} 地图边界 ，格式为 {xmin: 117.024994, xmax: 117.414322, ymin: 31.711229, ymax: 32.029617}
     */
    getExtent(precision?: number | any): any;
    remove(): void | any;
    /**
     * 销毁地图
     * @returns {void} 无
     */
    destroy(): void | any;
    /**
     * 遍历地图的图层
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    eachLayer(method: ((...params: any[]) => any) | any, context?: any): Map | any;
    /**
     * 打开指定的Popup弹窗（如果之前有打开其他的，会自动关闭，确保只有一个）
     * @param {string | HTMLElement | L.Popup | any} content Popup弹窗内容
     * @param {L.LatLng} [latlng] 位置
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {Map} 当前对象本身，可以链式调用
     */
    openPopup(content: string | HTMLElement | L.Popup | any, latlng?: L.LatLng | any, options?: Map.PopupOptions | any): Map | any;
    /**
     * 关闭之前打开的（或给定某个）Popup弹窗
     * @param {L.Popup} [popup] 关闭之前打开的（或给定某个）Popup弹窗
     * @returns {Map} 当前对象本身，可以链式调用
     */
    closePopup(popup?: L.Popup | any): Map | any;
    /**
     * 创建并打开具有指定内容和选项的Tooltip鼠标工具提示。
     * @param {string | HTMLElement | L.Tooltip | any} content Tooltip弹窗内容
     * @param {L.LatLng} [latlng] 位置
     * @param {Map.TooltipOptions | any} [options] Tooltip弹窗参数
     * @returns {Map} 当前对象本身，可以链式调用
     */
    openTooltip(content: string | HTMLElement | L.Tooltip | any, latlng?: L.LatLng | any, options?: Map.TooltipOptions | any): Map | any;
    /**
     * 关闭之前打开的（或给定某个）Tooltip鼠标工具提示
     * @param {L.Tooltip} [tooltip] 关闭之前打开的（或给定某个）Tooltip弹窗
     * @returns {Map} 当前对象本身，可以链式调用
     */
    closeTooltip(tooltip?: L.Tooltip | any): Map | any;
    /**
     * 定位地图至指定位置和层级
     * @param {L.LatLng} center 经纬度坐标
     * @param {number} [zoom] 层级，未指定时不缩放
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    setView(center: L.LatLng | any, zoom?: number | any, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
      } | any): Map | any;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的地理中心和级别
     * @param {L.LatLng} latlng 经纬度坐标
     * @param {number} [zoom] 层级，未指定时不缩放
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    flyTo(latlng: L.LatLng | any, zoom?: number | any, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
      } | any): Map | any;
    /**
     * 设置地图的zoom缩放级别
     * @param {number} zoom 层级
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    setZoom(zoom: number | any, options?: {
        animate?: boolean;
      } | any): Map | any;
    /**
     * 放大地图级别
     * @param {number} [delta] 改变的级别值，delta为空时，默认值取自map构造参数中的zoomDelta
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    zoomIn(delta?: number | any, options?: {
        animate?: boolean;
      } | any): Map | any;
    /**
     * 缩小地图级别
     * @param {number} [delta] 改变的级别值，delta为空时，默认值取自map构造参数中的zoomDelta
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    zoomOut(delta?: number | any, options?: {
        animate?: boolean;
      } | any): Map | any;
    /**
     * 缩放地图，同时保持地图上的指定地理位置不变（例如内部用于滚动缩放和双击缩放）。
     * @param {L.LatLng | L.Point} latlng 位置 ,当为Point时相对于左上角的指定像素位置不变。
     * @param {number} zoom 层级
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    setZoomAround(latlng: L.LatLng | L.Point | any, zoom: number | any, options?: {
        animate?: boolean;
      } | any): Map | any;
    /**
     * 将地图的视图设置在给定的矩形地理范围内,地图会自动计算最大缩放级别和中心点.
     * @param {L.LatLngBounds} bounds 矩形地理范围
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    fitBounds(bounds: L.LatLngBounds | any, options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
      } | any): Map | any;
    /**
     * 执行平滑的飞行动画，移动缩放地图范围至指定的矩形范围，类似fitBounds方法
     * @param {L.LatLngBounds} bounds 矩形地理范围
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    flyToBounds(bounds: L.LatLngBounds | any, options?: {
        paddingTopLeft?: L.Point | number[];
        paddingBottomRight?: L.Point | number[];
        padding?: L.Point | number[];
        maxZoom?: number;
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
      } | any): Map | any;
    /**
     * 平移地图到给定的中心点
     * @param {L.LatLng} latlng 中心点
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    panTo(latlng: L.LatLng | any, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
      } | any): Map | any;
    /**
     * 地图按指定像素的偏移值平移
     * @param {L.Point} offset 平移的像素偏移值
     * @returns {Map} 当前对象本身，可以链式调用
     */
    panBy(offset: L.Point | any): Map | any;
    /**
     * 限制地图的视图在给定的边界里面 (参考 地图的 maxBounds 参数选项)
     * @param {L.LatLngBounds | null} bounds 最大边界，传入 null 可清除限制
     * @returns {Map} 当前对象本身，可以链式调用
     */
    setMaxBounds(bounds: L.LatLngBounds | null | any): Map | any;
    /**
     * 设置地图最小缩放级别 (参考 minZoom 参数选项)
     * @param {number} zoom 最小缩放级别
     * @returns {Map} 当前对象本身，可以链式调用
     */
    setMinZoom(zoom: number | any): Map | any;
    /**
     * 设置地图最大缩放级别 (参考 maxZoom 参数选项)
     * @param {number} zoom 最大缩放级别
     * @returns {Map} 当前对象本身，可以链式调用
     */
    setMaxZoom(zoom: number | any): Map | any;
    /**
     * 将地图放置到位于给定范围内的最接近的视图（如果不在），并使用特定的options选项（如果有的话）控制动画。
     * @param {L.LatLngBounds} bounds 范围
     * @param {any} [options] 定位参数，包括:
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    panInsideBounds(bounds: L.LatLngBounds | any, options?: {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
      } | any): Map | any;
    /**
     * 设检查地图容器大小是否已更改，并更新地图。当地图容器div大小有变化后，请调用。
     * @param {any | boolean} [options] 控制参数,直接传入Boolean时代表是否动画,object时可以控制是否平移动画等
     * @returns {Map} 当前对象本身，可以链式调用
     */
    invalidateSize(options?: any | boolean): Map | any;
    /**
     * 停止当前运行panTo或flyTo动画，如果有的话。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    stop(): Map | any;
    /**
     * 尝试使用Geolocation API定位用户，触发具有locationfound成功的位置数据的locationerror事件或失败的事件，并且可以根据检测精度（或者如果地理位置失败）将地图视图设置为用户的位置。
     * 请注意，如果您的页面不使用HTTPS，则此方法将在最新流行浏览器（Chrome 50及更高版本）中失败。有关Locate options详细信息，请参阅。
     * @param {any} [options] 控制参数:
     * @param {boolean} [options.watch] 如果true，使用W3C watchPosition方法开始连续观察位置变化（而不是检测到位置变化）。您可以稍后停止观看使用 map.stopLocate()方法。
     * @param {boolean} [options.setView] 如果true自动将地图视图设置为与检测精度相关的用户位置，或者如果地理位置失败，则自动将其设置为世界视图。
     * @param {number} [options.maxZoom] 使用setView选项时，自动查看设置的最大缩放级别.
     * @param {number} [options.timeout] 在触发locationerror事件之前等待地理位置响应的毫秒数 。
     * @param {number} [options.maximumAge] 检测到的位置的最大生命周期 如果小于上次地理位置响应以来的毫秒数，locate将返回缓存的位置
     * @param {boolean} [options.enableHighAccuracy] 是否实现高精度，请参阅W3C规范中的说明。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    locate(options?: {
        watch?: boolean;
        setView?: boolean;
        maxZoom?: number;
        timeout?: number;
        maximumAge?: number;
        enableHighAccuracy?: boolean;
      } | any): Map | any;
    /**
     * 停止执行已调用了的map.locate()。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    stopLocate(): Map | any;
    /**
     * 返回地图视图的中心点经纬度
     * @returns {L.LatLng} 中心点经纬度
     */
    getCenter(): L.LatLng | any;
    /**
     * 返回当前地图视图的矩形边界
     * @returns {L.LatLngBounds} 地图矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 返回地图此时的缩放级别
     * @returns {number} 地图级别
     */
    getZoom(): number | any;
    /**
     * 返回地图最小缩放级别（如果设置了地图或图层的minZoom参数），默认为0
     * @returns {number} 地图最小缩放级别
     */
    getMinZoom(): number | any;
    /**
     * 返回地图最大缩放级别（如果设置了地图或图层的maxZoom参数）
     * @returns {number} 最大缩放级别
     */
    getMaxZoom(): number | any;
    /**
     * 返回给定范围完全适合地图视图的最大缩放级别。
     * @param {L.LatLngBounds} bounds 给定范围
     * @param {boolean} [inside] 设置为true，则该方法将返回地图视图适合整个给定边界的最小缩放级别。
     * @returns {number} 适合地图视图的最大缩放级别
     */
    getBoundsZoom(bounds: L.LatLngBounds | any, inside?: boolean | any): number | any;
    /**
     * 返回地图容器的当前大小
     * @returns {L.Point} 地图容器的当前大小（以像素为单位）
     */
    getSize(): L.Point | any;
    /**
     * 返回当前地图视图的像素坐标的边界（在自定义层和覆盖实现中有用）
     * @returns {L.Bounds} 地图视图的像素坐标的边界
     */
    getPixelBounds(): L.Bounds | any;
    /**
     * 返回当前地图视图左上角的像素坐标（在自定义层和覆盖实现中有用）
     * @returns {L.Point} 地图视图左上角的像素坐标
     */
    getPixelOrigin(): L.Point | any;
    /**
     * 返回zoom缩放级别的世界边界的像素坐标
     * @param {number} [zoom] 缩放级别, zoom为空时使用地图的当前缩放级别。
     * @returns {L.Bounds} 地图视图的像素坐标的边界
     */
    getPixelWorldBounds(zoom?: number | any): L.Bounds | any;
    /**
     * 返回要应用于 从fromZoom缩放级别 到 toZoom缩放级别 地图缩放的转换的比例因子Scale。（内部使用来帮助缩放动画）
     * @param {number} toZoom 结束缩放级别
     * @param {number} fromZoom 开始缩放级别
     * @returns {number} 地图缩放的转换的比例因子Scale
     */
    getZoomScale(toZoom: number | any, fromZoom: number | any): number | any;
    /**
     * 返回地图最终到达的缩放级别，如果它处于fromZoom 级别，并且所有内容都按比例缩放scale。 getZoomScale的逆向方法.
     * @param {number} scale 地图缩放的转换的比例因子Scale
     * @param {number} fromZoom 最终到达的缩放级别
     * @returns {number} 地图缩放的转换的比例因子Scale
     */
    getScaleZoom(scale: number | any, fromZoom: number | any): number | any;
    /**
     * 根据地图CRS坐标系进行投影转换方法, 地理坐标 转 像素坐标
     * @param {L.LatLng} latlng 地理位置
     * @param {number} zoom 地图级别
     * @returns {L.Point} 像素坐标（相对于CRS原点）
     */
    project(latlng: L.LatLng | any, zoom: number | any): L.Point | any;
    /**
     * 根据地图CRS坐标系进行投影转换方法, 像素坐标 转 地理坐标。
     * 逆向 project 方法
     * @param {L.Point} point 像素坐标（相对于CRS原点）
     * @param {number} zoom 地图级别
     * @returns {L.LatLng} 地理位置
     */
    unproject(point: L.Point | any, zoom: number | any): L.LatLng | any;
    /**
     * 给定相应像素坐标，转换为相应的地理坐标（对于当前缩放级别）
     * @param {L.Point} point 像素坐标(相对于[origin pixel]{@link Map#getPixelOrigin})
     * @returns {L.LatLng} 地理位置
     */
    layerPointToLatLng(point: L.Point | any): L.LatLng | any;
    /**
     * 给定地理坐标，转换为相应像素坐标。（在地图上进行位置叠加时比较有用）
     * @param {L.LatLng} latlng 地理位置
     * @returns {L.Point} 像素坐标(相对于[origin pixel]{@link Map#getPixelOrigin})
     */
    latLngToLayerPoint(latlng: L.LatLng | any): L.Point | any;
    /**
     * 如果它们在CRS的边界之外，则返回一个LatLng，lat并lng根据地图的CRS wrapLat和wrapLng属性进行包装。默认情况下，这意味着经度包裹在数据线周围，所以它的值在-180和+180度之间。
     * @param {L.LatLng} latlng 地理位置
     * @returns {L.LatLng} 地理位置
     */
    wrapLatLng(latlng: L.LatLng | any): L.LatLng | any;
    /**
     * 返回LatLngBounds与给定的大小相同的大小，确保其中心在CRS的边界内。默认情况下，这意味着中心经度被包裹在数据线周围，因此它的值在-180和+180度之间，并且大多数边界与CRS的界限重叠。
     * @param {L.LatLngBounds} bounds 地图范围
     * @returns {L.LatLngBounds} 地图范围
     */
    wrapLatLngBounds(bounds: L.LatLngBounds | any): L.LatLngBounds | any;
    /**
     * 根据地图的参考系来返回两个地理位置之间的距离
     * @param {L.LatLng} latlng1 地理位置1
     * @param {L.LatLng} latlng2 地理位置2
     * @returns {number} 距离，单位：米
     */
    distance(latlng1: L.LatLng | any, latlng2: L.LatLng | any): number | any;
    /**
     * 给定相对于地图container容器的像素坐标，返回相对于[origin pixel]{@link Map#getPixelOrigin}的相应像素坐标。
     * @param {L.Point} point 像素坐标，相对于地图container容器
     * @returns {L.Point} 像素坐标，相对于 [origin pixel]{@link Map#getPixelOrigin}
     */
    containerPointToLayerPoint(point: L.Point | any): L.Point | any;
    /**
     * 给定相对于[origin pixel]{@link Map#getPixelOrigin}的像素坐标，返回相对于地图container容器的相应像素坐标。
     * @param {L.Point} point 像素坐标， 相对于 [origin pixel]{@link Map#getPixelOrigin}
     * @returns {L.Point} 像素坐标，相对于地图container容器
     */
    layerPointToContainerPoint(point: L.Point | any): L.Point | any;
    /**
     * 给定相对于地图container容器的像素坐标，返回对应的地理坐标（对于当前缩放级别）。
     * @param {L.Point} point 像素坐标， 相对于 [origin pixel]{@link Map#getPixelOrigin}
     * @returns {L.LatLng} 地理坐标
     */
    containerPointToLatLng(point: L.Point | any): L.LatLng | any;
    /**
     * 给定地理坐标，返回相对于地图container容器的相应像素坐标。
     * @param {L.LatLng} latlng 地理坐标
     * @returns {L.Point} 像素坐标， 相对于地图container容器
     */
    latLngToContainerPoint(latlng: L.LatLng | any): L.Point | any;
    /**
     * 给定一个MouseEvent对象，返回相对于发生事件的地图容器的像素坐标（与地图左上角相关）。
     * @param {L.LeafletMouseEvent | any} event MouseEvent对象
     * @returns {L.Point} 像素坐标，相对于地图container容器
     */
    mouseEventToContainerPoint(event: L.LeafletMouseEvent | any): L.Point | any;
    /**
     * 给定一个MouseEvent对象，返回相对于事件发生的[origin pixel]{@link Map#getPixelOrigin}的像素坐标。
     * @param {L.LeafletMouseEvent | any} event MouseEvent对象
     * @returns {L.Point} 像素坐标，相对于地图container容器
     */
    mouseEventToLayerPoint(event: L.LeafletMouseEvent | any): L.Point | any;
    /**
     * 给定一个MouseEvent对象，返回发生事件的地理坐标。
     * @param {L.LeafletMouseEvent | any} event MouseEvent对象
     * @returns {L.LatLng} 地理坐标
     */
    mouseEventToLatLng(event: L.LeafletMouseEvent | any): L.LatLng | any;
    /**
     * 加一个新的 L.Handler到地图上，给他一个名字和构造函数。
     * @param {string} name 名称
     * @param {any} handler Handler构造函数
     * @returns {Map} 当前对象本身，可以链式调用
     */
    addHandler(name: string | any, handler: any): Map | any;
    /**
     * 如果尚未存在，创建具有给定名称的新映射窗格map pane，然后返回
     * @param {string} name 名称
     * @param {HTMLElement} [container] 指定父级容器，container为空时，加入在地图主容器下。
     * @returns {HTMLElement} 窗格map pane
     */
    createPane(name: string | any, container?: HTMLElement | any): HTMLElement | any;
    /**
     * 返回一个普通对象，其中包含所有窗格的名称为键，并将窗格Pane作为值。
     * @returns {any} 窗格map pane
     */
    getPanes(): any;
    /**
     * 获取 地图DOM容器
     * @returns {HTMLElement} 地图DOM容器
     */
    getContainer(): HTMLElement | any;
    /**
     * 方便异步执行后续方法函数Fn。 当地图以视图（中心和缩放）初始化和至少一个层初始化时，或者当它已经初始化时， 立即运行给定的函数Fn，没有时会等初始化后执行函数Fn.
     * @param {((...params: any[]) => any)} fn 方法函数
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {Map} 当前对象本身，可以链式调用
     */
    whenReady(fn: ((...params: any[]) => any) | any, context?: any): Map | any;
    /**
     * 绑定指定类型事件监听器
     * @param {string | EventType | any} type 事件类型，当是Object时可以添加一组类型/侦听器对，例如 {click: onClick, mousemove: onMouseMove}
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    on(type: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    off(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 触发指定类型的事件。
     * @param {string | EventType} type 事件类型
     * @param {any} [data] 传输的数据或对象，可在事件回调方法中event对象中获取进行使用
     * @param {BaseClass | any} [propagate] 将事件传播给父类 (用addEventParent设置)
     * @returns {void} 无
     */
    fire(type: string | EventType | any, data?: any, propagate?: BaseClass | any): void | any;
    /**
     * 绑定一次性执行的指定类型事件监听器
     * 与on类似，监听器只会被触发一次，然后被删除。
     * @param {string | EventType | any} [types] 事件类型，Object时删除一组类型/侦听器对。
     * @param {((...params: any[]) => any)} [fn] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {void} 无
     */
    once(types?: string | EventType | any, fn?: ((...params: any[]) => any) | any, context?: any): void | any;
    /**
     * 是否有绑定指定的事件
     * @param {string | EventType} type 事件类型
     * @param {any} [propagate] 是否判断指定的父类 (用addEventParent设置的)
     * @returns {boolean} 是否存在
     */
    listens(type: string | EventType | any, propagate?: any): boolean | any;
    /**
     * 添加抛出事件到父类，它将接收传播的事件
     * @param {any} obj 父类对象
     * @returns {Map} 当前对象本身,可以链式调用
     */
    addEventParent(obj: any): Map | any;
    /**
     * 移除抛出事件到父类
     * @param {any} obj 父类对象
     * @returns {Map} 当前对象本身,可以链式调用
     */
    removeEventParent(obj: any): Map | any;
}
declare namespace Map {
  /**
   * 地图参数
   */
  type Options = any | {
    zoom: number;
    minZoom?: number;
    maxZoom?: number;
    center: {
      lng: number;
      lat: number;
    } | any;
    extent?: {
      xmin: number;
      xmax: number;
      ymin: number;
      ymax: number;
    };
    centerAutoLevel?: number;
    maxBounds?: L.LatLngBounds;
    crs?: CRS | L.CRS | string | any;
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
    preferCanvas?: boolean;
    copyright?: boolean;
    defaultContextMenu?: boolean;
    contextmenuItems?: any[] | any;
    control?: Map.controlOptions;
    basemaps: Map.basemapOptions[] | any[];
    operationallayers?: Map.layerOptions[] | any[];
    layers?: L.Layer[] | any[];
  };
  /**
   * 底图图层配置,只支持{@link TileLayer}等瓦片图层
   */
  type basemapOptions = any | {
    type: string;
    id?: string | number;
    pid?: string | number;
    name?: string;
    show?: boolean;
    [key: string]: any;
  };
  /**
   * 可以叠加显示的图层配置
   */
  type layerOptions = any | {
    type: string;
    id?: string | number;
    pid?: string | number;
    name?: string;
    show?: boolean;
    [key: string]: any;
  };
  /**
   * 控件参数
   */
  type controlOptions = any | {
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
      } | any;
    };
    toolBar?: {
      position?: string;
      item?: string[];
      noLocPoint?: boolean;
    };
  };
  /**
   * Map支持的{@link EventType}事件类型，也支持传字符串值
   * @example //绑定监听事件
map.on(mars2d.EventType.click, function (event) {
  console.log('单击了地图对象', event)
})
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
   */
  type PopupOptions = any | {
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
   */
  type TooltipOptions = any | {
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
 * Echarts图层，
 * 【需要引入 echarts 库 和 mars2d-echarts 插件库】
 * @param {EchartsLayer.Options | any} options 参数对象
 */
declare class EchartsLayer extends L.Layer {
    constructor(options: EchartsLayer.Options | any);
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * echarts对象，是echarts.init方法返回的 echartsInstance 实例
     */
    readonly layer: any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 设置层级
     * @param {number} zIndex canvas层级
     * @returns {void} 无
     */
    setZIndex(zIndex: number | any): void | any;
    /**
     * 设置图表实例的配置项以及数据，
     * 万能接口，所有参数和数据的修改都可以通过 setOption 完成，
     * ECharts 会合并新的参数和数据，然后刷新图表。
     * 如果开启动画的话，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
     * @param {any} option 图表的配置项和数据，具体见 [Echarts配置项手册]{@link https://echarts.apache.org/zh/option.html}。
     * @param {boolean} [notMerge] 是否不跟之前设置的 option 进行合并。默认为 false。即表示合并。合并的规则，详见 组件合并模式。如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
     * @param {boolean} [lazyUpdate] 在设置完 option 后是否不立即更新图表，默认为 false，即同步立即更新。如果为 true，则会在下一个 animation frame 中，才更新图表。
     * @returns {void} 无
     */
    setEchartsOption(option: any, notMerge?: boolean | any, lazyUpdate?: boolean | any): void | any;
    /**
     * 绑定事件处理函数,
     * @param {string | any} [eventName] 事件名称，全小写，例如'click'，'mousemove', 'legendselected' ,可以参考[echarts官网说明]{@link https://echarts.apache.org/zh/api.html#echartsInstance.on}
     * @param {((...params: any[]) => any)} [callback] 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {EchartsLayer} 当前对象本身,可以链式调用
     */
    on(eventName?: string | any, callback?: ((...params: any[]) => any) | any, context?: any): EchartsLayer | any;
    /**
     * 带条件的绑定事件处理函数
     * @param {string} eventName 事件名称，全小写，例如'click'，'mousemove', 'legendselected'
     * @param {string | any} query 可选的过滤条件，能够只在指定的组件或者元素上进行响应。可以参考[echarts官网说明]{@link https://echarts.apache.org/zh/api.html#echartsInstance.on}
     * @param {((...params: any[]) => any)} callback 绑定的监听器回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)
     * @returns {EchartsLayer} 当前对象本身,可以链式调用
     */
    onByQuery(eventName: string | any, query: string | any, callback: ((...params: any[]) => any) | any, context?: any): EchartsLayer | any;
    /**
     * 解除绑定指定类型事件监听器
     * @param {string | any} [eventName] 事件名称，全小写，例如'click'，'mousemove', 'legendselected'
     * @param {((...params: any[]) => any)} [callback] 绑定的监听器回调方法,未传值时解绑所有指定类型对应事件
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {EchartsLayer} 当前对象本身,可以链式调用
     */
    off(eventName?: string | any, callback?: ((...params: any[]) => any) | any, context?: any): EchartsLayer | any;
}
declare namespace EchartsLayer {
  /**
   * Echarts图层参数
   */
  type Options = any | {
    Echarts本身?: any;
    id?: string | number;
    pid?: string | number;
    name?: string;
    pane?: string;
  };
}

/**
 * ArcGIS Server 动态服务图层，【需要引入mars2d-esri 插件库】
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url ArcGIS Server服务地址，如：https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/
 * @param {string[]} [options.layers] 一个层id的数组，显示服务中的指定图层集合。
 * @param {any} [options.layerDefs] SQL筛选器，以定义服务呈现的图像中包含哪些特性。对象与键一起使用，将每个查询映射到其各自的层。{ 3: "STATE_NAME='Kansas'", 9: "POP2007>25000" }
 * @param {string} [options.format] 图像的输出格式
 * @param {boolean} [options.transparent] 是否允许服务器产生透明的图像。
 * @param {number} [options.opacity] 图层的不透明度。应该是介于0(完全透明)和1(完全不透明)之间的值。
 * @param {any} [options.dynamicLayers] 用于覆盖服务定义的图层符号系统的一个或多个 JSON 对象的数组。需要哪些支持10.1+地图服务请求。
 * @param {boolean} [options.disableCache] 如果启用，将时间戳附加到每个请求以确保在服务器端创建新图像。
 * @param {number} [options.minZoom] 图层将显示在地图上的最远缩放级别。
 * @param {number} [options.maxZoom] 图层将显示在地图上的最近缩放级别。
 * @param {string} [options.token] 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param {string} [options.proxy] 代理服务URL
 * @param {boolean} [options.useCors] 如果此服务在发出 GET 请求时应使用 CORS。
 * @param {number} [options.zIndex] 用于图层间排序
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {any} [highlight] 鼠标移单击后高亮对应的矢量对象的样式
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisDynamicLayer extends L.Layer {
    constructor(options?: {
        url: string;
        layers?: string[];
        layerDefs?: any;
        format?: string;
        transparent?: boolean;
        opacity?: number;
        dynamicLayers?: any;
        disableCache?: boolean;
        minZoom?: number;
        maxZoom?: number;
        token?: string;
        proxy?: string;
        useCors?: boolean;
        zIndex?: number;
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
      }, highlight?: any);
    /**
     * 在所有其他叠加层下方重绘此层。
     * @returns {ArcGisDynamicLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): ArcGisDynamicLayer | any;
    /**
     * 在所有其他叠加层之上重绘此层。
     * @returns {ArcGisDynamicLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): ArcGisDynamicLayer | any;
    /**
     * 绑定Popup弹窗配置
     * @param {((...params: any[]) => any)} content Popup弹窗回调方法
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {ArcGisDynamicLayer} 当前对象本身，可以链式调用
     * @example dynamicMapLayer.bindPopup(function(err, featureCollection, response){
    var count = featureCollection.features.length;
    return (count) ? count + ' features' : false;
});
     */
    bindPopup(content: ((...params: any[]) => any) | any, options?: Map.PopupOptions | any): ArcGisDynamicLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {ArcGisDynamicLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): ArcGisDynamicLayer | any;
    /**
     * 返回层构造函数中指定的可见层数组。
     * @returns {string[]} 可见层数组
     */
    getLayers(): string[] | any;
    /**
     * 重绘图层以显示传递的图层 id 数组。
     * @param {string[]} layers 可见层数组
     * @returns {ArcGisDynamicLayer} 当前对象本身，可以链式调用
     */
    setLayers(layers: string[] | any): ArcGisDynamicLayer | any;
    /**
     * 返回用于渲染的当前层SQL筛选器。
     * @returns {any} SQL筛选器
     */
    getLayerDefs(): any;
    /**
     * 使用SQL筛选器新图层定义重绘图层, [layerDefs]{@link https://developers.arcgis.com/rest/services-reference/enterprise/export-map.htm}选项。
     * @param {any} layerDefs SQL筛选器
     * @returns {ArcGisDynamicLayer} 当前对象本身，可以链式调用
     */
    setLayerDefs(layerDefs: any): ArcGisDynamicLayer | any;
    /**
     * 返回一组 JSON 对象，表示从地图服务请求的修改后的图层符号系统。
     * @returns {any[]} SQL筛选器
     */
    getDynamicLayers(): any[] | any;
    /**
     * 在您想要修改服务本身中定义的图层符号系统的情况下，用于以数组形式插入原始 dynamicLayers JSON。
     * @param {any[]} dynamicLayers SQL筛选器
     * @returns {ArcGisDynamicLayer} 当前对象本身，可以链式调用
     */
    setDynamicLayers(dynamicLayers: any[] | any): ArcGisDynamicLayer | any;
    /**
     * 请求有关此要素图层的元数据。将使用error和调用回调metadata。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisDynamicLayer} 当前对象本身，可以链式调用
     * @example dynamicMapLayer.metadata(function(error, metadata){
  console.log(metadata);
});
     */
    metadata(callback: ((...params: any[]) => any) | any, context?: any): ArcGisDynamicLayer | any;
    /**
     * 返回一个IdentifyFeatures新对象，可用于识别该图层上的要素。您的回调函数将传递一个带有结果或错误的GeoJSON。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {any} [L.esri.services.IdentifyFeatures对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/identify-features.html}
     * @example dynamicMapLayer.identify()
  .at(latlng)
  .run(function(error, featureCollection){
    console.log(featureCollection);
  });
     */
    identify(callback: ((...params: any[]) => any) | any, context?: any): any;
    /**
     * 返回IdentifyFeatures可用于查找特征的新对象。您的回调函数将传递一个带有结果或错误的GeoJSON。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {any} [L.esri.Find对象]{@link http://esri.github.io/esri-leaflet//api-reference/tasks/find.html}
     * @example dynamicMapLayer.find()
  .layers('18')
  .text('Colorado')
  .run(function(error, featureCollection){
    console.log(featureCollection);
  });
     */
    find(callback: ((...params: any[]) => any) | any, context?: any): any;
    /**
     * 返回L.esri.Query可用于查询此服务的新对象。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {any} [L.esri.Query对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/query.html}
     * @example mapService.query()
  .layer(0)
  .within(latlngbounds)
  .run(function(error, featureCollection, response){
    console.log(featureCollection);
  });
     */
    query(callback: ((...params: any[]) => any) | any, context?: any): any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    initialize(): void | any;
    onAdd(): void | any;
    onRemove(): void | any;
}
declare namespace ArcGisDynamicLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
tileLayer.on('load', function (event) {
  console.log('触发了事件',event)
});
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
 * ArcGIS Server WFS矢量服务图层，
 * 【需要引入mars2d-esri 插件库】
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url ArcGIS Server服务地址,如：https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer
 * @param {string} [options.where] 用于过滤服务器端的特性的可选表达式。字符串值应该用单引号表示，即:"FIELDNAME = '字段值'";可以找到有关有效SQL语法的更多信息。
 * @param {number} [options.minZoom] 图层将显示在地图上的最远缩放级别。
 * @param {number} [options.maxZoom] 图层将显示在地图上的最近缩放级别。
 * @param {string} [options.token] 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param {string} [options.proxy] 代理服务URL
 * @param {boolean} [options.useCors] 如果此服务在发出 GET 请求时应使用 CORS。
 * @param {((...params: any[]) => any)} [options.onEachFeature] 提供了一个机会来内省图层中的各个 GeoJSON 功能。
 * @param {any | ((...params: any[]) => any)} [options.symbol] 矢量数据的style样式,为Function时是完全自定义的回调处理 symbol(attr, style, feature)
 * @param {GraphicType | string} [options.symbol.type] 标识数据类型，默认是根据数据生成 point、polyline、polygon
 * @param {any} options.symbol.styleOptions Style样式，每种不同类型数据都有不同的样式，具体见各{@link GraphicType}矢量数据的style参数。
 * @param {string} [options.symbol.styleField] 按 styleField 属性设置不同样式。
 * @param {any} [options.symbol.styleFieldOptions] 按styleField值与对应style样式的键值对象。
 * @param {((...params: any[]) => any)} [options.symbol.callback] 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 绑定的popup弹窗值，也可以bindPopup方法绑定，支持：'all'、数组、字符串模板
 * @param {Map.PopupOptions} [options.popupOptions] popup弹窗时的配置参数
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisFeatureLayer extends L.Layer {
    constructor(options?: {
        url: string;
        where?: string;
        minZoom?: number;
        maxZoom?: number;
        token?: string;
        proxy?: string;
        useCors?: boolean;
        onEachFeature?: ((...params: any[]) => any);
        symbol?: {
          type?: GraphicType | string;
          styleOptions: any;
          styleField?: string;
          styleFieldOptions?: any;
          callback?: ((...params: any[]) => any);
        } | any;
        popup?: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any);
        popupOptions?: Map.PopupOptions;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
      });
    /**
     * 返回当前where设置
     * @returns {string} where设置
     */
    getWhere(): string | any;
    /**
     * 设置新where选项并刷新图层以反映新where过滤器。
     * @param {string} where where设置
     * @param {((...params: any[]) => any)} [callback] 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    setWhere(where: string | any, callback?: ((...params: any[]) => any) | any, context?: any): ArcGisFeatureLayer | any;
    /**
     * 请求有关此要素图层的元数据。将使用error和调用回调metadata。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     * @example featureLayer.metadata(function(error, metadata){
  console.log(metadata);
});
     */
    metadata(callback: ((...params: any[]) => any) | any, context?: any): ArcGisFeatureLayer | any;
    /**
     * 返回L.esri.Query可用于查询此服务的新对象。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {any} [L.esri.Query对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/query.html}
     * @example featureLayer.query()
  .within(latlngbounds)
  .where("Direction = 'WEST'")
  .run(function(error, featureCollection){
    console.log(featureCollection);
  });
     */
    query(callback: ((...params: any[]) => any) | any, context?: any): any;
    /**
     * 向要素图层添加新要素。如果创建成功，这也会将该功能添加到地图中。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param {any} feature GeoJSON Feature对象
     * @param {((...params: any[]) => any)} [callback] 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    addFeature(feature: any, callback?: ((...params: any[]) => any) | any, context?: any): ArcGisFeatureLayer | any;
    /**
     * 更新要素图层上提供的要素。这也会更新地图上的要素。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param {any} feature GeoJSON Feature对象
     * @param {((...params: any[]) => any)} [callback] 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    updateFeature(feature: any, callback?: ((...params: any[]) => any) | any, context?: any): ArcGisFeatureLayer | any;
    /**
     * 从要素图层中删除具有提供的 id 的要素。如果该要素存在，这也会从地图中删除该要素。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param {string | number} id 要素的 id
     * @param {((...params: any[]) => any)} [callback] 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    deleteFeature(id: string | number | any, callback?: ((...params: any[]) => any) | any, context?: any): ArcGisFeatureLayer | any;
    /**
     * 从要素层中删除具有提供的 id 的要素数组。这也会从地图中删除特征（如果存在）。
     * <ul>
     * <li>需要以有权在 ArcGIS Online 中编辑服务的用户或创建服务的用户身份进行身份验证。</li>
     * <li>需要Create在服务上启用该功能。您可以通过在功能下检查服务的元数据来检查创建是否存在。</li>
     * </ul>
     * @param {string[] | number[]} ids 要素的id数组
     * @param {((...params: any[]) => any)} [callback] 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    deleteFeatures(ids: string[] | number[] | any, callback?: ((...params: any[]) => any) | any, context?: any): ArcGisFeatureLayer | any;
    /**
     * 从要素层使用提供的 id 重绘要素。
     * @param {string | number} id 要素的 id
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    redraw(id: string | number | any): ArcGisFeatureLayer | any;
    /**
     * 从地图上存在的要素图层重新绘制所有要素。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    refresh(): ArcGisFeatureLayer | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): ArcGisFeatureLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
     */
    remove(): ArcGisFeatureLayer | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    initialize(): void | any;
    createNewLayer(): void | any;
    /**
     * 遍历所有矢量数据并将其作为参数传递给回调函数
     * @param {((...params: any[]) => any)} method 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisFeatureLayer} 当前对象本身,可以链式调用
     * @example fl.on('load', function  () {
  fl.eachGraphic(function(layer) {
    console.log(layer.feature);
  });
}
     */
    eachGraphic(method: ((...params: any[]) => any) | any, context?: any): ArcGisFeatureLayer | any;
    /**
     * 根据Feature 的 id取矢量数据对象
     * @param {string | number} id Feature 的 id
     * @returns {L.Layer} 矢量数据对象
     */
    getGraphicById(id: string | number | any): L.Layer | any;
    /**
     * 设置覆盖的透明度
     * @param {number} opacity 透明度，取值范围 0-1
     * @returns {ArcGisFeatureLayer} 当前对象本身,可以链式调用
     */
    setOpacity(opacity: number | any): ArcGisFeatureLayer | any;
    /**
     * 获取图层矩形边界
     * @returns {L.LatLngBounds} 矩形边界
     */
    getBounds(): L.LatLngBounds | any;
    /**
     * 定位地图至当前图层数据区域
     * @param {any} [options] 定位参数，包括:
     * @param {L.Point | number[]} [options.paddingTopLeft] 设置在将视图设置为适合边界时不应考虑的地图容器左上角的填充量。如果您在地图上有一些控件重叠式（如侧边栏），而且您不希望它们遮挡您正在缩放的对象，则很有用。
     * @param {L.Point | number[]} [options.paddingBottomRight] 同上，不考虑地图容器右下角时使用。
     * @param {L.Point | number[]} [options.padding] 相当于将左上和右下填充设置为相同的值。
     * @param {number} [options.maxZoom] 最大层级
     * @param {boolean} [options.animate] 是否进行动画缩放。false时始终重置视图完全没有动画。
     * @param {number} [options.duration] 动画平移的持续时间，以秒为单位。
     * @param {number} [options.easeLinearity] 平移动画宽松的曲率因子 [Cubic Bezier curve曲线]{@link https://cubic-bezier.com/}的第三个参数。1.0表示线性动画，而这个数字越小，曲线越鞠躬。
     * @param {boolean} [options.noMoveStart] 如果true，平移不会movestart在启动时触发事件（内部用于平移惯性）。
     * @returns {ArcGisFeatureLayer} 当前对象本身，可以链式调用
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
      } | any): ArcGisFeatureLayer | any;
}
declare namespace ArcGisFeatureLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
tileLayer.on('load', function (event) {
  console.log('触发了事件',event)
});
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
 * ArcGIS Server Image服务图层，
 * 【需要引入mars2d-esri 插件库】
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url ArcGIS Server服务地址,比如：'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer'
 * @param {string} [options.format] 图像的输出格式
 * @param {number} [options.opacity] 图层的不透明度。应该是介于0(完全透明)和1(完全不透明)之间的值。
 * @param {string} [options.bandIds] 如果有多个波段，您可以指定要导出的波段。
 * @param {number} [options.noData] 代表无信息的像素值。
 * @param {string} [options.noDataInterpretation] noData设置的解释。
 * @param {string} [options.pixelType] 除非需要，否则在大多数 exportImage 用例中保留pixelType未指定或。
 * @param {number} [options.minZoom] 图层将显示在地图上的最远缩放级别。
 * @param {number} [options.maxZoom] 图层将显示在地图上的最近缩放级别。
 * @param {number} [options.zIndex] 用于图层间排序
 * @param {string} [options.token] 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param {string} [options.proxy] 代理服务URL
 * @param {boolean} [options.useCors] 如果此服务在发出 GET 请求时应使用 CORS。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 * @example let arcGisImageLayer = new ArcGisImageLayer({
  url: 'https://ihttmagery.oregonexplorer.info/arcgis/rest/services/NAIP_2011/NAIP_2011_Dynamic/ImageServer'
})
arcGisImageLayer.setBandIds('3,0,1').addTo(map);
 */
declare class ArcGisImageLayer extends L.Layer {
    constructor(options?: {
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
     * @returns {ArcGisImageLayer} 当前对象本身,可以链式调用
     */
    bringToBack(): ArcGisImageLayer | any;
    /**
     * 在所有其他叠加层之上重绘此层。
     * @returns {ArcGisImageLayer} 当前对象本身,可以链式调用
     */
    bringToFront(): ArcGisImageLayer | any;
    /**
     * 绑定Popup弹窗配置
     * @param {((...params: any[]) => any)} content Popup弹窗回调方法
     * @param {Map.PopupOptions | any} [options] Popup弹窗参数
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     * @example imageMapLayer.bindPopup(function(err, identifyResults, response){
    var value = results.pixel.properties.value;
    return (value) ? 'Pixel value: ' + value : false;
  });
     */
    bindPopup(content: ((...params: any[]) => any) | any, options?: Map.PopupOptions | any): ArcGisImageLayer | any;
    /**
     * 解除绑定Popup弹窗配置
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    unbindPopup(): ArcGisImageLayer | any;
    /**
     * 返回当前波段值。
     * @returns {string} 波段值
     */
    getBandIds(): string | any;
    /**
     * 指定要导出的单个波段，或者您可以通过指定波段编号来更改波段组合（红色、绿色、蓝色）。
     * @param {string | number[]} bandIds 波段值
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    setBandIds(bandIds: string | number[] | any): ArcGisImageLayer | any;
    /**
     * 返回当前无数据值。
     * @returns {string} 无数据值
     */
    getNoData(): string | any;
    /**
     * 指定单个值或一组值以将其视为无数据。没有数据将值呈现为透明。
     * @param {number | number[]} noData 无数据值
     * @param {string} [noDataInterpretation] 可以是esriNoDataMatchAny| esriNoDataMatchAll.
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    setNoData(noData: number | number[] | any, noDataInterpretation?: string | any): ArcGisImageLayer | any;
    /**
     * 返回当前像素类型。
     * @returns {string} 像素类型也称为数据类型
     */
    getPixelType(): string | any;
    /**
     * 像素类型也称为数据类型，与存储在栅格中的值的类型有关，例如有符号整数、无符号整数或浮点数。可能的值：C128、C64、F32、F64、S16、S32、S8、U1、U16、U2、U32、U4、U8、UNKNOWN。
     * @param {string} pixelType 像素类型也称为数据类型
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    setPixelType(pixelType: string | any): ArcGisImageLayer | any;
    /**
     * 请求有关此要素图层的元数据。将使用error和调用回调metadata。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     * @example featureLayer.metadata(function(error, metadata){
  console.log(metadata);
});
     */
    metadata(callback: ((...params: any[]) => any) | any, context?: any): ArcGisImageLayer | any;
    /**
     * 返回L.esri.Query可用于查询此服务的新对象。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {any} [L.esri.Query对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/query.html}
     * @example imageService.query()
  .within(latlngbounds)
  .run(function(error, featureCollection, response){
    console.log(featureCollection);
});
     */
    query(callback: ((...params: any[]) => any) | any, context?: any): any;
    /**
     * 返回图层的当前渲染规则。
     * @returns {any} 当前渲染规则
     */
    getRenderingRule(): any;
    /**
     * 使用传递的渲染规则重绘图层。
     * @param {any} renderingRule 当前渲染规则
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    setRenderingRule(renderingRule: any): ArcGisImageLayer | any;
    /**
     * 返回图层的当前镶嵌规则。
     * @returns {any} 镶嵌规则
     */
    getMosaicRule(): any;
    /**
     * 使用传递的镶嵌规则重绘图层。
     * @param {any} mosaicRule 镶嵌规则
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    setMosaicRule(mosaicRule: any): ArcGisImageLayer | any;
    /**
     * 用于向服务发出新请求并绘制响应。
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    redraw(): ArcGisImageLayer | any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): ArcGisImageLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {ArcGisImageLayer} 当前对象本身，可以链式调用
     */
    remove(): ArcGisImageLayer | any;
    initialize(): void | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    /**
     * 波段值
     */
    bandIds: string | number[] | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
}
declare namespace ArcGisImageLayer {
  /**
   * 当前类支持的{@link EventType}事件类型（包括自定义字符串事件名）
   * @example //绑定监听事件
tileLayer.on('load', function (event) {
  console.log('触发了事件',event)
});
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
 * ArcGIS Server 瓦片地图服务图层，
 * 【需要引入mars2d-esri 插件库】
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url ArcGIS Server服务地址,比如：'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/World/MODIS/ImageServer'
 * @param {number} [options.zoomOffsetAllowance] 如果启用correctZoomLevels，这将控制重新映射贴图级别的每个缩放级别上的差异的容错量。
 * @param {string} [options.token] 如果您在服务需要传递令牌，它将包含在对服务的所有请求中。
 * @param {string} [options.proxy] 代理服务URL
 * @param {boolean} [options.useCors] 如果此服务在发出 GET 请求时应使用 CORS。
 * @param {number} [options.opacity] 瓦片的不透明度。
 * @param {number} [options.minZoom] 最小的缩放级别
 * @param {number} [options.maxZoom] 最大的缩放级别
 * @param {number} [options.maxNativeZoom] 瓦片来源可用的最大缩放倍数。如果指定，则所有缩放级别上的图块maxNativeZoom将高于将从maxNativeZoom级别加载并自动缩放。
 * @param {number} [options.minNativeZoom] 瓦片来源可用的最小缩放数。如果指定，所有缩放级别上的图块minNativeZoom将从minNativeZoom级别加载并自动缩放。
 * @param {number} [options.zIndex] 瓦片层的显式zIndex
 * @param {L.LatLngBounds} [options.bounds] 自定义加载的瓦片矩形范围
 * @param {string} [options.errorTileUrl] 显示加载瓦片失败时，显示的图片的url
 * @param {boolean} [options.tms] 如果此值为true，反转切片Y轴的编号（对于TMS服务需将此项打开）
 * @param {boolean} [options.zoomReverse] 如果设置为true，则URL网址中使用的缩放z数字将被颠倒（maxZoom - zoom而不是zoom）
 * @param {number} [options.xOffset] 对URL中地图的缩放级别x值加上xOffset值
 * @param {number} [options.yOffset] 对URL中地图的缩放级别y值加上yOffset值
 * @param {number} [options.zOffset] 对URL中地图的缩放级别z值加上zOffset值
 * @param {((...params: any[]) => any)} [options.customTags] 自定义对瓦片请求参数处理 ，比如：customTags:function(data, original){data.z+=1;}
 * @param {number | L.Point} [options.tileSize] 网格中瓦片的宽度和高度。如果宽度和高度相等，则使用数字，否则L.point(width, height)。
 * @param {string} [options.className] 要分配给瓦片图层的自定义类名称
 * @param {number} [options.keepBuffer] 当平移地图时，在卸载它们之前，先保留许多行和列的数据块。
 * @param {boolean} [options.detectRetina] 如果此项为true，并且用户是视网膜显示模式，会请求规定大小一般的四个切片和一个地区内一个更大的缩放级别来利用高分辨率.
 * @param {boolean} [options.crossOrigin] 如果为true，则所有图块将其crossOrigin属性设置为“*”。如果要访问像素数据，则需要这样做。
 * @param {number} [options.updateInterval] 当平移时，updateInterval毫秒不会更新一次瓦片。
 * @param {boolean} [options.updateWhenZooming] 默认情况下，平滑缩放动画（touch zoom 或flyTo()） 会在整个缩放级别更新网格图层。设置此选项false将仅在平滑动画结束时更新网格层。
 * @param {boolean} [options.noWrap] 该层是否在子午线断面。 如果为true，GridLayer只能在低缩放级别显示一次。当地图CRS 不包围时，没有任何效果。 可以结合使用bounds 以防止在CRS限制之外请求瓦片。
 * @param {ChinaCRS} [options.chinaCRS] 标识瓦片的国内坐标系（用于自动纠偏或加偏），自动将瓦片转为map对应的chinaCRS类型坐标系。
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 */
declare class ArcGisTileLayer extends L.Layer {
    constructor(options?: {
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
        customTags?: ((...params: any[]) => any);
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
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {ArcGisTileLayer} 当前对象本身，可以链式调用
     * @example dynamicMapLayer.metadata(function(error, metadata){
  console.log(metadata);
});
     */
    metadata(callback: ((...params: any[]) => any) | any, context?: any): ArcGisTileLayer | any;
    /**
     * 返回一个IdentifyFeatures新对象，可用于识别该图层上的要素。您的回调函数将传递一个带有结果或错误的GeoJSON。
     * @param {((...params: any[]) => any)} callback 回调方法
     * @param {any} [context] 侦听器的上下文(this关键字将指向的对象)。
     * @returns {any} [L.esri.services.IdentifyFeatures对象]{@link http://esri.github.io/esri-leaflet/api-reference/tasks/identify-features.html}
     * @example dynamicMapLayer.identify()
  .at(latlng)
  .run(function(error, featureCollection){
    console.log(featureCollection);
  });
     */
    identify(callback: ((...params: any[]) => any) | any, context?: any): any;
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {ArcGisTileLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): ArcGisTileLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {ArcGisTileLayer} 当前对象本身，可以链式调用
     */
    remove(): ArcGisTileLayer | any;
    initialize(): void | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    /**
     * 显示隐藏状态
     */
    show: boolean | any;
    /**
     * 透明度
     */
    opacity: number | any;
    /**
     * 是否可以调整透明度
     */
    readonly hasOpacity: boolean | any;
    getTileUrl(): void | any;
}

/**
 * MapV图层
 * 【需要引入 mapv.js 库 和 mars2d-mapv 插件库】
 * @param {any} options 图层参数，包括：
 * @param {any} [options.data] new mapv.DataSet(data)的data值，如有传入时可以用于替代dataSet参数
 * @param {any} [options.多个参数] 支持mapv本身所有drawOptions图层样式参数，具体查阅 [mapv库drawOptions文档]{@link https://github.com/huiyan-fe/mapv/wiki/%E7%B1%BB%E5%8F%82%E8%80%83} ，也可以 [在线编辑图层样式]{@link https://mapv.baidu.com/editor/}
 * @param {string | number} [options.id] 图层id标识
 * @param {string | number} [options.pid] 图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 图层名称
 * @param {string} [options.pane] 指定图层添加到地图的哪个pane的DIV中，用于控制不同层级显示的，优先级高于zIndex。
 * @param {any} [dataSet] mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
 */
declare class MapVLayer extends L.Layer {
    constructor(options?: {
        data?: any;
        [key: string]: any;
        id?: string | number;
        pid?: string | number;
        name?: string;
        pane?: string;
      }, dataSet?: any);
    /**
     * 将图层添加到地图
     * @param {Map} map 地图对象
     * @returns {MapVLayer} 当前对象本身，可以链式调用
     */
    addTo(map: Map | any): MapVLayer | any;
    /**
     * 将图层从地图上移除
     * @returns {MapVLayer} 当前对象本身，可以链式调用
     */
    remove(): MapVLayer | any;
    initialize(): void | any;
    /**
     * 是否已添加到地图
     */
    readonly isAdded: boolean | any;
    /**
     * 对象的pid标识
     */
    pid: string | number | any;
    /**
     * 对象的id标识
     */
    id: string | number | any;
    /**
     * 名称 标识
     */
    name: string | any;
    onAdd(): void | any;
    onRemove(): void | any;
    /**
     * 新增mapv数据
     * @param {any} dataSet mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
     * @returns {void} 无
     */
    addData(dataSet: any): void | any;
    /**
     * 更新mapv数据
     * @param {any} dataSet mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
     * @returns {void} 无
     */
    updateData(dataSet: any): void | any;
    /**
     * 获取数据
     * @returns {any} mapv.DataSet数据集,可以参考[ MapV数据集对象说明]{@link https://github.com/huiyan-fe/mapv/blob/master/src/data/DataSet.md}
     */
    getData(): any;
    /**
     * 删除指定数据
     * @param {any} data mapv.DataSet数据集
     * @returns {void} 无
     */
    removeData(data: any): void | any;
    /**
     * 删除所有数据
     * @returns {void} 无
     */
    removeAllData(): void | any;
    /**
     * 重绘图层
     * @returns {void} 无
     */
    draw(): void | any;
    /**
     * 设置层级
     * @param {number} zIndex canvas层级
     * @returns {void} 无
     */
    setZIndex(zIndex: number | any): void | any;
    render(): void | any;
    /**
     * 获取 canvas。
     * @returns {HTMLCanvasElement} 返回 mapV 图层包含的 canvas 对象。
     */
    getCanvas(): HTMLCanvasElement | any;
    /**
     * 获取容器。
     * @returns {HTMLElement} 返回包含 mapV 图层的 dom 对象。
     */
    getContainer(): HTMLElement | any;
    /**
     * 获取左上角坐标。
     * @returns {L.LatLng | undefined} 返回左上角坐标（地图未添加时为 undefined）。
     */
    getTopLeft(): L.LatLng | undefined | any;
    redraw(): void | any;
}

/**
 * POI查询 工具类基类（统一的方法、参数及回传的值）
 * @param {any} [options] 参数对象，包括以下：
 * @param {string | string[]} [options.key] 相关服务的Token值
 * @param {any} [options.headers] 将被添加到HTTP请求头。
 */
declare class BaseQueryPOI {
    constructor(options?: {
        key?: string | string[];
        headers?: any;
      });
    /**
     * 相关服务的Token值，内部轮询使用
     */
    keys: string[];
    /**
     * 轮询取单个key进行使用
     */
    readonly key: string;
}

/**
 * 路径规划查询 工具类基类（统一的方法、参数及回传的值）
 * @param {any} [options] 参数对象，包括以下：
 * @param {string | string[]} [options.key] 相关服务的Token值
 * @param {any} [options.headers] 将被添加到HTTP请求头。
 */
declare class BaseQueryRoute {
    constructor(options?: {
        key?: string | string[];
        headers?: any;
      });
    /**
     * 相关服务的Token值，内部轮询使用
     */
    keys: string[];
    /**
     * 轮询取单个key进行使用
     */
    readonly key: string;
}

/**
 * ArcGIS WFS矢量服务查询类
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url ArcGIS服务地址, 示例：'http://server.mars2d.cn/arcgis/rest/services/mars/hefei/MapServer/37'
 * @param {number} [options.pageSize] 每页条数
 * @param {any} [options.headers] 将被添加到HTTP请求头。

//以下是GeoJsonLayer图层参数
 * @param {string | number} [options.id] 赋予给layer图层，图层id标识
 * @param {string | number} [options.pid] 赋予给layer图层，图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 赋予给layer图层，图层名称
 * @param {any | ((...params: any[]) => any)} [options.symbol] 赋予给layer图层，图层矢量数据的style样式，参考{@link GeoJsonLayer}
 * @param {any} [options.graphicOptions] 赋予给layer图层，图层默认的graphic的构造参数，参考{@link GeoJsonLayer}
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 赋予给layer图层，图层绑定的popup弹窗值，参考{@link GeoJsonLayer}
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any} [options.tooltip] 赋予给layer图层，图层绑定的tooltip弹窗值，参考{@link GeoJsonLayer}
 */
declare class QueryArcServer extends BaseClass {
    constructor(options?: {
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
     * 页码，当前第几页（有 setter：赋值会立即按新页码重新查询）
     */
    pageIndex: number;
    /**
     * 用于显示查询结果的GeoJsonLayer图层，图层参数在当前类构造方法中传入
     */
    readonly layer: GeoJsonLayer;
    /**
     * 首页，查看第1页数据
     * @returns {void} 无
     */
    showFirstPage(): void | any;
    /**
     * 上一页
     * @returns {void} 无
     */
    showPretPage(): void | any;
    /**
     * 下一页
     * @returns {void} 无
     */
    showNextPage(): void | any;
    /**
     * 跳转到指定页
     * @param {number} pageIndex 指定页
     * @returns {void} 无
     */
    showPage(pageIndex: number): void | any;
    /**
     * 按指定类别自动查询
     * @param {any} queryOptions 查询参数
     * @param {string} [queryOptions.text] 检索关键字。
     * @param {string} [queryOptions.column] 检索关键字的字段名称。
     * @param {boolean} [queryOptions.like] 检索关键字时，是否模糊匹配，false时精确查询。
     * @param {string} [queryOptions.where] 自定义的检索条件，与text二选一
     * @param {Rectangle | Polygon | Circle | any} [queryOptions.graphic] 限定的搜索区域
     * @param {boolean} [queryOptions.page] 是否分页查询,false时不分页，一次性查询返回
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {void} 无（请求在内部发起，本方法不返回 Promise 或 this）
     */
    query(queryOptions?: {
        text?: string;
        column?: string;
        like?: boolean;
        where?: string;
        graphic?: Rectangle | Polygon | Circle | any;
        page?: boolean;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): void | any;
    processFeatureCollection(): void | any;
    geoJsonLayer_onLoadHandler(): void | any;
    geoJsonLayer_onClickHandler(): void | any;
    /**
     * 清除
     * @returns {void} 无
     */
    clear(): void | any;
}
declare namespace QueryArcServer {
  /**
   * 当前类支持的{@link EventType}事件类型
   * @example //绑定监听事件
layer.on(mars2d.EventType.load, function (event) {
  console.log('矢量数据对象加载完成', event)
})
   */
  type EventType = {
    click: string;
    load: string;
  };
}

/**
 * GeoServer WFS服务查询类
 * @param {any} options 参数对象，包括以下：
 * @param {string} options.url GeoServer服务地址, 示例：'http://server.mars2d.cn/geoserver/mars/wfs'
 * @param {string} options.layer 图层名称（命名空间:图层名称），多个图层名称用逗号隔开
 * @param {any} [options.headers] 将被添加到HTTP请求头。

//以下是GeoJsonLayer图层参数
 * @param {string | number} [options.id] 赋予给layer图层，图层id标识
 * @param {string | number} [options.pid] 赋予给layer图层，图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 赋予给layer图层，图层名称
 * @param {any | ((...params: any[]) => any)} [options.symbol] 赋予给layer图层，图层矢量数据的style样式，参考{@link GeoJsonLayer}
 * @param {any} [options.graphicOptions] 赋予给layer图层，图层默认的graphic的构造参数，参考{@link GeoJsonLayer}
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any)} [options.popup] 赋予给layer图层，图层绑定的popup弹窗值，参考{@link GeoJsonLayer}
 * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any} [options.tooltip] 赋予给layer图层，图层绑定的tooltip弹窗值，参考{@link GeoJsonLayer}
 */
declare class QueryGeoServer extends BaseClass {
    constructor(options?: {
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
     * @param {any} queryOptions 查询参数
     * @param {string} [queryOptions.text] 检索关键字
     * @param {string} [queryOptions.column] 检索关键字时，对应的字段名称
     * @param {boolean} [queryOptions.like] 检索关键字时，是否模糊匹配，false时精确查询
     * @param {Rectangle | Polygon | Circle | any} [queryOptions.graphic] 限定的搜索区域
     * @param {string} [queryOptions.geometryName] 限定的搜索区域时，对应的geometry字段名称
     * @param {number} [queryOptions.maxFeatures] 返回结果最大数量
     * @param {string} [queryOptions.sortBy] 排序的属性名称，默认升序，降序时+D
     * @param {any} [queryOptions.更多参数] WFS服务支持的其他参数，均支持
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {void} 无（请求在内部发起，本方法不返回 Promise 或 this）
     */
    query(queryOptions?: {
        text?: string;
        column?: string;
        like?: boolean;
        graphic?: Rectangle | Polygon | Circle | any;
        geometryName?: string;
        maxFeatures?: number;
        sortBy?: string;
        [key: string]: any;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): void | any;
    /**
     * 查询服务，基于cql_filter条件
     * @param {any} queryOptions 查询参数
     * @param {string} [queryOptions.cql_filter] 筛选服务数据的 CQL 语句，默认 "1=1"{@link https://docs.geoserver.org/2.12.2/user/services/wfs/vendor.html#wfs-vendor-parameters}
     * @param {Rectangle | Polygon | Circle | any} [queryOptions.graphic] 限定的搜索区域,自动转换后加入到cql_filter中，也可以外部自行处理
     * @param {string} [queryOptions.geometryName] 限定的搜索区域时，对应的geometry字段名称
     * @param {number} [queryOptions.maxFeatures] 返回结果最大数量
     * @param {string} [queryOptions.sortBy] 排序的属性名称，默认升序，降序时+D
     * @param {any} [queryOptions.更多参数] WFS服务支持的其他参数，均支持
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {void} 无（请求在内部发起，本方法不返回 Promise 或 this）
     */
    queryBySql(queryOptions?: {
        cql_filter?: string;
        graphic?: Rectangle | Polygon | Circle | any;
        geometryName?: string;
        maxFeatures?: number;
        sortBy?: string;
        [key: string]: any;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): void | any;
    processFeatureCollection(): void | any;
    geoJsonLayer_onLoadHandler(): void | any;
    geoJsonLayer_onClickHandler(): void | any;
    /**
     * 清除
     * @returns {void} 无
     */
    clear(): void | any;
}

/**
 * POI查询 工具类基类（统一的方法、参数及回传的值）
 * @param {any} [options] 参数对象，包括以下：
 * @param {QueryServiceType | string} [options.service] 服务类型，支持："tdt"天地图POI服务,"baidu"百度POI服务,,"gaode"高德POI服务
 * @param {string | string[]} [options.key] 对应服务的Token值
 * @param {string} [options.city] 百度POI时，限定查询的区域，支持城市及对应百度编码（Citycode）（指定的区域的返回结果加权，可能返回其他城市高权重结果。若要对返回结果区域严格限制，请使用city_limit参数）
 * @param {any} [options.headers] 将被添加到HTTP请求头。
 */
declare class QueryPOI {
    constructor(options?: {
        service?: QueryServiceType | string;
        key?: string | string[];
        city?: string;
        headers?: any;
      });
    /**
     * 更新参数
     * @param {any} options 与类的构造方法参数相同
     * @returns {void}
     */
    setOptions(options: any): void | any;
    /**
     * 根据经纬度坐标获取地址，逆地理编码
     * @param {any} queryOptions 查询参数
     * @param {L.LatLng} [queryOptions.location] 经纬度坐标
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    getAddress(queryOptions?: {
        location?: L.LatLng;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 搜索提示
     * @param {any} queryOptions 查询参数
     * @param {string} queryOptions.text 输入建议关键字（支持拼音）
     * @param {L.LatLng | string | any[] | any} [queryOptions.location] 建议使用location参数，可在此location附近优先返回搜索关键词信息,在请求参数city不为空时生效
     * @param {string} [queryOptions.city] 可以限定查询的行政区
     * @param {boolean} [queryOptions.citylimit] 取值为"true"，仅返回city中指定城市检索结果（传 city 时实现会先置为 true，可用该参数显式覆盖）
     * @param {string} [queryOptions.level] TdtPOI时，查询的级别,1-18级
     * @param {any} [queryOptions.extent] TdtPOI时，查询的地图范围: { xmin: 70,  xmax: 140,  ymin: 0,  ymax: 55 } ，可以传入extent: map.getExtent()
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    autoTip(queryOptions?: {
        text: string;
        location?: L.LatLng | string | any[] | any;
        city?: string;
        citylimit?: boolean;
        level?: string;
        extent?: any;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 根据ID获取POI点详情
     * @param {any} queryOptions 查询参数
     * @param {string} queryOptions.id AOI唯一标识， 最多可以传入1个id，传入目标区域的poiid即可
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    detail(queryOptions?: {
        id: string;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 搜索
     * @param {any} queryOptions 查询参数
     * @param {string} queryOptions.text 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param {string} [queryOptions.types] 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param {L.Layer | any} [queryOptions.graphic] 限定的搜索区域
     * @param {boolean} [queryOptions.limit] 取值为"true"，严格返回限定区域内检索结果
     * @param {string} [queryOptions.level] TdtPOI时，查询的级别,1-18级
     * @param {any} [queryOptions.extent] TdtPOI时，查询的地图范围: { xmin: 70,  xmax: 140,  ymin: 0,  ymax: 55 } ，可以传入extent: map.getExtent()
     * @param {number} [queryOptions.page] 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param {number} [queryOptions.count] 单次召回POI数量，默认为10条记录，最大返回20条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    query(queryOptions?: {
        text: string;
        types?: string;
        graphic?: L.Layer | any;
        limit?: boolean;
        level?: string;
        extent?: any;
        page?: number;
        count?: number;
        error?: ((...params: any[]) => any);
        success?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 关键字搜索
     * @param {any} queryOptions 查询参数
     * @param {string} queryOptions.text 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param {string} [queryOptions.types] 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param {string} [queryOptions.city] 可以重新限定查询的区域，默认为类构造时传入的city
     * @param {boolean} [queryOptions.citylimit] 取值为"true"，仅返回city中指定城市检索结果（传 city 时实现会先置为 true，可用该参数显式覆盖）
     * @param {string} [queryOptions.level] TdtPOI时，查询的级别,1-18级
     * @param {any} [queryOptions.extent] TdtPOI时，查询的地图范围: { xmin: 70,  xmax: 140,  ymin: 0,  ymax: 55 } ，可以传入extent: map.getExtent()
     * @param {number} [queryOptions.count] 单次召回POI数量，最大返回25条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param {number} [queryOptions.page] 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    queryText(queryOptions?: {
        text: string;
        types?: string;
        city?: string;
        citylimit?: boolean;
        level?: string;
        extent?: any;
        count?: number;
        page?: number;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 周边搜索(圆形搜索)
     * @param {any} queryOptions 查询参数
     * @param {string} queryOptions.text 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param {string} [queryOptions.types] 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param {L.LatLng} [queryOptions.location] 圆形区域检索中心点（需含 lat/lng，代码直接读取 location.lat/location.lng）
     * @param {number} [queryOptions.radius] 圆形区域检索半径，单位为米。（增加区域内数据召回权重，如需严格限制召回数据在区域内，请搭配使用radiuslimit参数），当半径过大，超过中心点所在城市边界时，会变为城市范围检索，检索范围为中心点所在城市
     * @param {boolean} [queryOptions.limit] 是否严格限定召回结果在设置检索半径范围内。true（是），false（否）。设置为true时会影响返回结果中total准确性及每页召回poi数量， 设置为false时可能会召回检索半径外的poi。
     * @param {number} [queryOptions.count] 单次召回POI数量，最大返回25条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param {number} [queryOptions.page] 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    queryCircle(queryOptions?: {
        text: string;
        types?: string;
        location?: L.LatLng;
        radius?: number;
        limit?: boolean;
        count?: number;
        page?: number;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 多边形搜索
     * @param {any} queryOptions 查询参数
     * @param {string} queryOptions.text 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param {string} [queryOptions.types] 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param {any[][]} queryOptions.polygon 经纬度数组，经纬度小数点后不得超过6位。多边形为矩形时，可传入左上右下两顶点坐标对；其他情况下首尾坐标对需相同。
     * @param {boolean} [queryOptions.limit] 是否严格限定召回结果在设置检索的多边形或矩形范围内。true（是），false（否）。设置为true时会影响返回结果中total准确性及每页召回poi数量， 设置为false时可能会召回检索半径外的poi。
     * @param {number} [queryOptions.count] 单次召回POI数量，最大返回25条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param {number} [queryOptions.page] 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    queryPolygon(queryOptions?: {
        text: string;
        types?: string;
        polygon: any[][];
        limit?: boolean;
        count?: number;
        page?: number;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 矩形范围内搜索（可用于视野内，瓦片格内）
     * @param {any} queryOptions 查询参数
     * @param {string} queryOptions.text 检索关键字。支持多个关键字并集检索，不同关键字间以空格符号分隔，最多支持10个关键字检索。
     * @param {string} [queryOptions.types] 检索分类偏好，与text组合进行检索，多个分类以","分隔（POI分类），如果需要严格按分类检索，请通过text参数设置
     * @param {any[][] | any} queryOptions.extent 可传入左上右下两顶点坐标对或{ xmin: 70,  xmax: 140,  ymin: 0,  ymax: 55 }；
     * @param {boolean} [queryOptions.limit] 是否严格限定召回结果在设置检索的多边形或矩形范围内。true（是），false（否）。设置为true时会影响返回结果中total准确性及每页召回poi数量， 设置为false时可能会召回检索半径外的poi。
     * @param {number} [queryOptions.count] 单次召回POI数量，最大返回25条。多关键字检索时，返回的记录数为关键字个数*count。多关键词检索时，单页返回总数=关键词数量*count
     * @param {number} [queryOptions.page] 分页页码，默认为0, 0代表第一页，1代表第二页，以此类推。常与 count 搭配使用，仅当返回结果为poi时可以翻页。
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    queryExtent(queryOptions?: {
        text: string;
        types?: string;
        extent: any[][] | any;
        limit?: boolean;
        count?: number;
        page?: number;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
}

/**
 * 查询路径规划
 * @param {any} [options] 参数对象，包括以下：
 * @param {QueryServiceType | string} [options.service] 服务类型，支持："tdt"天地图POI服务,"baidu"百度POI服务,,"gaode"高德POI服务
 * @param {string | string[]} [options.key] 对应服务的Token值
 * @param {any} [options.headers] 将被添加到HTTP请求头。
 */
declare class QueryRoute {
    constructor(options?: {
        service?: QueryServiceType | string;
        key?: string | string[];
        headers?: any;
      });
    /**
     * 更新参数
     * @param {any} options 与类的构造方法参数相同
     * @returns {void}
     */
    setOptions(options: any): void | any;
    /**
     * 按指定类别自动查询
     * @param {any} queryOptions 查询参数
     * @param {QueryRouteType | string} queryOptions.type 类型
     * @param {any[][]} queryOptions.points 按起点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    query(queryOptions?: {
        type: QueryRouteType | string;
        points: any[][];
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 按指定类别自动查询(多个路线数组，递归处理)
     * @param {any} queryOptions 查询参数
     * @param {QueryRouteType} queryOptions.type 类型
     * @param {any[][]} queryOptions.points 多条，按起点终点 顺序的坐标数组,如[
 [ [117.500244, 40.417801],[117.500244, 40.417801] ],
 [ [117.500244, 40.417801],[117.500244, 40.417801] ]
]
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<(any | null)[]>} 查询完成的Promise，结果为各段路径对象数组（失败段为 null），等价于 success 参数
     */
    queryArr(queryOptions?: {
        type: QueryRouteType;
        points: any[][];
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<(any | null)[]> | any;
    /**
     * 步行路径规划 (单个查询)
     * @param {any} queryOptions 查询参数
     * @param {any[][]} queryOptions.points 按起点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    queryWalking(queryOptions?: {
        points: any[][];
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 骑行路径查询 (单个查询)
     * @param {any} queryOptions 查询参数
     * @param {any[][]} queryOptions.points 按起点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    queryBicycling(queryOptions?: {
        points: any[][];
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 驾车路径规划查询
     * @param {any} queryOptions 查询参数
     * @param {any[][]} queryOptions.points 按起点、途经点、终点 顺序的坐标数组,如[[117.500244, 40.417801],[117.500244, 40.417801]]
     * @param {any[][]} queryOptions.avoidpolygons 区域避让数组(支持多个)，支持32个避让区域，每个区域最多可有16个顶点。避让区域不能超过81平方公里，否则避让区域会失效。
     * @param {string} [queryOptions.strategy] 驾车选择策略，参考高德官网说明，默认为0：速度优先，不考虑当时路况，此路线不一定距离最短
     * @param {((...params: any[]) => any)} [queryOptions.success] 查询完成的回调方法
     * @param {((...params: any[]) => any)} [queryOptions.error] 查询失败的回调方法
     * @returns {Promise<any>} 查询完成的Promise,等价于success参数
     */
    queryDriving(queryOptions?: {
        points: any[][];
        avoidpolygons: any[][];
        strategy?: string;
        success?: ((...params: any[]) => any);
        error?: ((...params: any[]) => any);
      }): Promise<any> | any;
    /**
     * 计算结果中的最短距离的导航路径
     * @param {any[]} data queryArr返回的结果数组
     * @returns {any} 返回路线数据和index顺序
     */
    getShortestPath(data: any[]): any;
}

/**
 * 地图截图处理类，
 * 内部导出部分依赖domtoimage库，需要额外引入。
 * @param {any} [options] 参数对象，包括以下：
 * @param {string} [options.eleid] 导出的DIV对象id，默认为map所在的父容器
 * @param {string | number} [options.id] 对象的id标识
 * @param {boolean} [options.enabled] 对象的启用状态
 * @param {BaseClass | boolean} [options.eventParent] 指定的事件冒泡对象，默认为所加入的map对象，false时不冒泡事件
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
    invalidateSize(): void | any;
    /**
     * 按纸张尺寸设置容器大小
     * @param {string} [size] 纸张尺寸，默认为全屏,支持：A4H、A4Z、A3H、A3Z
     * @returns {void} 无
     */
    changeSize(size?: string): void | any;
    /**
     * 绘制经纬网
     * @param {any} options 控制参数
     * @param {number} options.row 行数
     * @param {number} options.col 列数
     * @returns {void} 无
     */
    drawGraticule(options: {
        row: number;
        col: number;
      }): void | any;
    /**
     * 激活绘制矩形区域，并导出自定义区域的截图
     * @param {any} [options] 控制参数
     * @param {boolean} [options.download] 是否下载
     * @param {string} [options.fileName] 导出的图片名称
     * @param {((...params: any[]) => any)} [options.calllback] 导出完成的回调方法
     * @returns {void} 无
     */
    expByDraw(options?: {
        download?: boolean;
        fileName?: string;
        calllback?: ((...params: any[]) => any);
      }): void | any;
    /**
     * 按当前地图区域进行全部截图
     * @param {any} [options] 控制参数
     * @param {boolean} [options.download] 是否下载
     * @param {string} [options.fileName] 导出的图片名称
     * @param {((...params: any[]) => any)} [options.calllback] 导出完成的回调方法
     * @returns {Promise<string>} 无
     */
    expAll(options?: {
        download?: boolean;
        fileName?: string;
        calllback?: ((...params: any[]) => any);
      }): Promise<string> | any;
}

/**
 * 键盘漫游功能
 * @param {any} [options] 参数对象，包括以下
 * @param {string | number} [options.id] 对象的id标识
 * @param {boolean} [options.enabled] 对象的启用状态
 * @param {number} [options.moveStep] 步长（米）
 * @param {BaseClass | boolean} [options.eventParent] 指定的事件冒泡对象，默认为所加入的map对象，false时不冒泡事件
 */
declare class KeyboardRoam extends BaseThing {
    constructor(options?: {
        id?: string | number;
        enabled?: boolean;
        moveStep?: number;
        eventParent?: BaseClass | boolean;
      });
    /**
     * 步幅
     */
    moveStep: number;
    /**
     * 更新参数
     * @param {any} options 与类的构造方法参数相同
     * @param {any} [funOptions] 方法参数，包括以下
     * @param {boolean} [funOptions.merge] 是否合并参数, 如是完整覆盖不合并老的options，请传入fasle
     * @returns {BaseThing | any} 当前对象本身，可以链式调用
     */
    setOptions(options: any, funOptions?: {
        merge?: boolean;
      }): BaseThing | any;
}
declare namespace KeyboardRoam {
  /**
   * 当前类支持的{@link EventType}事件类型
   * @example //绑定监听事件
roam.on(mars2d.EventType.keydown, function (event) {
  console.log('按下了方向键', event)
})
   */
  type EventType = {
    keydown: string;
    keyup: string;
  };
}

/**
 * 图上量算类
 * @param {any} [options] 参数对象，包括以下：
 * @param {boolean} [options.hasEdit] 是否可编辑（量算图层固定按 true 传入，可用 false 关闭）
 * @param {boolean} [options.isAutoEditing] 完成测量时是否自动启动编辑，当前实现固定为 !options.isContinued（传值不生效）
 * @param {boolean} [options.isContinued] 是否连续测量，当前版本固定 false（不支持连续测量）
 * @param {Label.StyleOptions} [options.label] 测量结果文本的样式
 * @param {string | number} [options.id] 对象的id标识
 * @param {boolean} [options.enabled] 对象的启用状态
 * @param {BaseClass | boolean} [options.eventParent] 指定的事件冒泡对象，默认为所加入的map对象，false时不冒泡事件
 * @param {string | number} [options.pid] 量算对应的图层父级的id，一般图层管理中使用
 * @param {string} [options.name] 量算对应的图层名称
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
     * @param {any} options 控制参数
     * @param {Polyline.StyleOptions} [options.style] 路线的样式
     * @param {string} [options.unit] 计量单位,{@link MeasureUtil#formatDistance}可选值：auto、m、km、mile、zhang 。auto时根据距离值自动选用k或km
     * @param {number} [options.maxPointNum] 绘制时，最多允许点的个数
     * @param {boolean} [options.showAddText] 是否显示每一段的增加部分距离，如（+10.1km）
     * @returns {Promise<any>} 绘制完成的 Promise，resolve 为绘制出的矢量对象
     */
    distance(options?: {
        style?: Polyline.StyleOptions | any;
        unit?: string;
        maxPointNum?: number;
        showAddText?: boolean;
      }): Promise<any> | any;
    /**
     * 面积测量（水平面）
     * @param {any} options 控制参数
     * @param {Polygon.StyleOptions} [options.style] 面的样式
     * @param {string} [options.unit] 计量单位,{@link MeasureUtil#formatArea}可选值：auto、m、km、mu、ha 。auto时根据面积值自动选用k或km
     * @returns {Promise<any>} 绘制完成的 Promise，resolve 为绘制出的矢量对象
     */
    area(options?: {
        style?: Polygon.StyleOptions | any;
        unit?: string;
      }): Promise<any> | any;
    /**
     * 取消并停止绘制，如有未完成的绘制会自动删除
     * @returns {Measure} 当前对象本身,可以链式调用
     */
    stopDraw(): Measure | any;
    /**
     * 完成绘制和编辑，如有未完成的绘制会自动完成。
     * 在移动端需要调用此方法来类似PC端双击结束。
     * @returns {Measure} 当前对象本身,可以链式调用
     */
    endDraw(): Measure | any;
    /**
     * 清除测量
     * @returns {void} 无
     */
    clear(): void | any;
    /**
     * 清除正在绘制的对象
     * @returns {boolean} 是否清除了对象
     */
    clearDrawing(): boolean | any;
    /**
     * 更新量测结果的单位
     * @param {string} unit 计量单位,{@link MeasureUtil#formatDistance}{@link MeasureUtil#formatArea} 可选值：auto、m、km、mile、zhang 等。auto时根据距离值自动选用k或km
     * @returns {void} 无
     */
    updateUnit(unit: string): void | any;
}

/**
 * 矢量数据style转换处理基类
 * @param {any} [options] 控制参数
 */
declare class BaseStyleConver {
    constructor(options?: any);
    toLeafletVal(): void | any;
    toJSON(): void | any;
}

/**
 * Circle 转换options参数处理类
 * @param {any} options 参数名称
 */
declare class CircleStyleConver extends BaseStyleConver {
    constructor(options: any);
    static toLeafletVal(): void | any;
    static toJSON(): void | any;
}

/**
 * Marker 转换options样式参数处理类
 * @param {any} options 参数名称
 */
declare class MarkerStyleConver extends BaseStyleConver {
    constructor(options: any);
    static toLeafletVal(): void | any;
    static toJSON(): void | any;
    static getIconAnchor(): void | any;
    static getControlAnchor(): void | any;
    static getRotationOrigin(): void | any;
    static getTextCSS(): void | any;
    static getLabelOriginCss(): void | any;
}

/**
 * DivGraphic 转换options样式参数处理类
 * @param {any} options 参数名称
 */
declare class DivGraphicStyleConver extends MarkerStyleConver {
    constructor(options: any);
    static toLeafletVal(): void | any;
    static toJSON(): void | any;
}

/**
 * Label 转换options样式参数处理类
 * @param {any} options 参数名称
 */
declare class LabelStyleConver extends DivGraphicStyleConver {
    constructor(options: any);
    static toLeafletVal(): void | any;
    static toJSON(): void | any;
}

/**
 * Point 转换options样式参数处理类
 * @param {any} options 参数名称
 */
declare class PointStyleConver extends BaseStyleConver {
    constructor(options: any);
    static toLeafletVal(): void | any;
    static toJSON(): void | any;
}

/**
 * Polygon 转换options样式参数处理类
 * @param {any} options 参数名称
 */
declare class PolygonStyleConver extends BaseStyleConver {
    constructor(options: any);
    /**
     * style样式属性赋值到 entity
     * @param {Polygon.StyleOptions} style 样式
     * @param {any} [entityGraphic] 样式累加对象（不是 L.Polygon 实例，会被填充 Leaflet 样式键后原样返回）
     * @returns {any} 矢量数据所需的Leaflet样式参数对象
     */
    static toLeafletVal(style: Polygon.StyleOptions | any, entityGraphic?: any): any;
    static toJSON(): void | any;
}

/**
 * Polyline 转换options样式参数处理类
 * @param {any} options 参数名称
 */
declare class PolylineStyleConver extends BaseStyleConver {
    constructor(options: any);
    static toLeafletVal(): void | any;
    static toJSON(): void | any;
}

/**
 * Rectangle 转换options样式参数处理类
 * @param {any} options 参数名称
 */
declare class RectangleStyleConver extends BaseStyleConver {
    constructor(options: any);
    static toLeafletVal(): void | any;
    static toJSON(): void | any;
}

declare namespace control {
  export { ToolBar }
  export { LocationBar }
  export { MapSwich }
  export { MapSplit }
  export { OverviewMap }
  export { Slider }
  export { ToolButton }
}

declare namespace graphic {
  export { BaseEditSimpleShape }
  export { EditMarker }
  export { EditCircleMarker }
  export { EditCircle }
  export { EditEllipse }
  export { EditPoly }
  export { EditRectangle }
  export { Marker }
  export { MovingMarker }
  export { Label }
  export { DivGraphic }
  export { DivLightPoint }
  export { DivBoderLabel }
  export { DivUpLabel }
  export { FontGraphic }
  export { FeatureGroup }
  export { Point }
  export { Polyline }
  export { BrushLine }
  export { Polygon }
  export { Circle }
  export { Ellipse }
  export { Rectangle }
  export { Image }
  export { CanvasImage }
  export { AntPath }
  export { BouncingMarker }
  export { Rain }
  export { Snow }
  export { PolyDecorator }
  export { BasePlot }
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
  export { BaseDraw }
  export { BaseSimpleShape }
  export { DrawMarker }
  export { DrawPoint }
  export { DrawFontGraphic }
  export { DrawLabel }
  export { DrawDivGraphic }
  export { DrawPolyline }
  export { DrawPolygon }
  export { DrawRain }
  export { DrawSnow }
  export { DrawBouncingMarker }
  export { DrawPolyDecorator }
  export { DrawAntPath }
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
  export { SmTileLayer }
  export { EmptyTileLayer }
  export { register }
  export { create }
  export { VectorGrid }
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
  export { BusineDataLayer }
  export { EchartsLayer }
  export { MapVLayer }
  export { ArcGisDynamicLayer }
  export { ArcGisFeatureLayer }
  export { ArcGisImageLayer }
  export { ArcGisTileLayer }
}

declare namespace query {
  export { BaseQueryPOI }
  export { QueryPOI }
  export { BaseQueryRoute }
  export { QueryRoute }
  export { QueryArcServer }
  export { QueryGeoServer }
}

declare namespace thing {
  export { Measure }
  export { ExpImg }
  export { KeyboardRoam }
}
declare const Token: {
  errorToken: any;
  /**
   * mapbox地图key，
   * 官网：{@link https://account.mapbox.com}
   * 可通过对应的 updateXxx 方法动态修改（不是恒定值）
   */
  mapbox: string;
  /**
   * 更新mapbox地图key
   * @param {string} item token值
   * @returns {void}
   */
  updateMapbox: (item: string) => void;
  /**
   * 天地图key数组，
   * 官网： {@link https://console.tianditu.gov.cn/api/key} (应用类型：浏览器端)
   */
  tiandituArr: string[];
  /**
   * 天地图key，
   * 可通过对应的 updateXxx 方法动态修改（不是恒定值）
   */
  tianditu: string;
  /**
   * 更新天地图key
   * @param {string | string[]} item token值
   * @returns {void}
   */
  updateTianditu: (item: string | string[]) => void;
  /**
   * 高德key数组，
   * 官网： {@link https://console.amap.com/dev/key/app} (服务平台类型：Web服务)
   */
  gaodeArr: string[];
  /**
   * 高德key，
   * 可通过对应的 updateXxx 方法动态修改（不是恒定值）
   */
  gaode: string;
  /**
   * 更新高德key
   * @param {string | string[]} item token值
   * @returns {void}
   */
  updateGaode: (item: string | string[]) => void;
  /**
   * 百度key数组，
   * 官网： {@link http://lbsyun.baidu.com/apiconsole/key#/home} (应用类别:服务端)
   */
  baiduArr: string[];
  /**
   * 百度key，
   * 可通过对应的 updateXxx 方法动态修改（不是恒定值）
   */
  baidu: string;
  /**
   * 更新百度key
   * @param {string | string[]} item token值
   * @returns {void}
   */
  updateBaidu: (item: string | string[]) => void;
  /**
   * 更新所有SDK涉及的第3放Token值（如果具体使用类中传入时，已传入值优先）
   * @param {any} token 集合
   * @param {string | string[]} [token.tianditu] 天地图
   * @param {string | string[]} [token.gaode] 高德
   * @param {string | string[]} [token.baidu] 百度
   * @param {string} [token.mapbox] mapbox地图
   * @returns {void}
   */
  updateAll: (token?: {
        tianditu?: string | string[];
        gaode?: string | string[];
        baidu?: string | string[];
        mapbox?: string;
      }) => void;
} | any
declare const DrawUtil: {
  DrawClass: any;
  /**
   * 是否有指定类型矢量对象
   * @param {string} type 矢量标绘类型
   * @returns {boolean} 是否有指定类型
   */
  hasType: (type: string) => boolean;
  /**
   * 注册矢量标绘类
   * @param {string} type 矢量标绘类型
   * @param {BaseDraw} drawClass 矢量标绘类
   * @returns {void} 无
   */
  register: (type: string, drawClass: BaseDraw) => void;
  /**
   * 根据 矢量标绘类型 获取 矢量标绘类
   * @param {string} type 矢量标绘类型
   * @returns {BaseDraw | null} 矢量标绘类；未注册该类型时返回 null
   */
  getClass: (type: string) => BaseDraw | null;
  /**
   * 标绘中tooltip提示文字对象
   */
  DrawMsg: any;
} | any
declare const GraphicUtil: {
  GraphicClass: any;
  /**
   * 是否有指定类型矢量对象
   * @param {string} type 矢量数据类型
   * @returns {boolean} 是否有指定类型
   */
  hasType: (type: string) => boolean;
  /**
   * 循环执行矢量数据类型
   * @param {((...params: any[]) => any)} method 执行的方法
   * @returns {void}
   */
  eachGraphicType: (method: ((...params: any[]) => any)) => void;
  /**
   * 判断该类型是否点状对象
   * @param {string} type 矢量数据类型
   * @returns {boolean} 是否点状对象类型
   */
  isPointType: (type: string) => boolean;
  /**
   * 注册矢量数据类
   * @param {string} type 矢量数据类型
   * @param {Marker | Polyline | Polygon | Circle | Rectangle | any} graphicClass 矢量数据类
   * @param {boolean} [isPoint] 是否为点状数据
   * @returns {void} 无
   */
  register: (type: string, graphicClass: Marker | Polyline | Polygon | Circle | Rectangle | any, isPoint?: boolean) => void;
  /**
   * 根据 矢量数据类型 获取 矢量数据类
   * @param {string} type 矢量数据类型
   * @returns {Marker | Polyline | Polygon | Circle | Rectangle | any | null} 矢量数据类；未注册该类型时返回 null
   */
  getClass: (type: string) => Marker | Polyline | Polygon | Circle | Rectangle | any | null;
  /**
   * 根据类型和参数 创建Graphic工厂方法
   * @param {string} type 数据类型（{@link GraphicType} 中的值）
   * @param {any} options 构造参数， 按type支持{@link GraphicType}类的构造方法参数
   * @returns {Marker | Polyline | Polygon | Circle | Rectangle | any | undefined} 创建完成的矢量数据对象，未注册该类型时返回 undefined
   */
  create: (type: string, options: any) => Marker | Polyline | Polygon | Circle | Rectangle | any | undefined;
} | any
declare const LayerUtil: {
  LayerClass: any;
  /**
   * 注册图层类
   * @param {string} type 图层类型
   * @param {L.Layer | any} layerClass 图层类
   * @returns {void} 无
   */
  register: (type: string, layerClass: L.Layer | any) => void;
  /**
   * 根据 图层类型 获取 图层类
   * @param {LayerType} type 图层类型
   * @returns {L.Layer | any | undefined} 图层类
   */
  getClass: (type: LayerType) => L.Layer | any | undefined;
  /**
   * 创建图层工厂方法
   * @param {any} options 图层参数，包括：
   * @param {LayerType} options.type 图层类型
   * @param {any} options.其他 具体见各{@link LayerType}对应的图层类的构造方法参数
   * @param {any} [templateValues] url模版
   * @returns {L.Layer | any | undefined} 创建完成的图层对象；type 未注册时返回 undefined
   */
  create: (options: {
        type: LayerType;
        其他: any;
      }, templateValues?: any) => L.Layer | any | undefined;
  isString: () => void;
  /**
   * 克隆图层
   * @param {any} layer 图层
   * @returns {any} 克隆的图层
   */
  cloneLayer: (layer: any) => any;
  cloneOptions: () => void;
  cloneInnerLayers: () => void;
  converOptions: () => void;
} | any
declare const Log: {
  _hasInfo: any;
  _hasWarn: any;
  _hasError: any;
  /**
   * 是否 console.log 打印普通日志信息，可以按需关闭或开启
   * @param {boolean} val 是否打印
   * @returns {void} 无
   */
  hasInfo: (val: boolean) => void;
  /**
   * 是否 console.warn 打印警告日志信息，可以按需关闭或开启，但不建议关闭
   * @param {boolean} val 是否打印
   * @returns {void} 无
   */
  hasWarn: (val: boolean) => void;
  /**
   * 是否 console.error 打印错误日志信息，可以按需关闭或开启，但不建议关闭
   * @param {boolean} val 是否打印
   * @returns {void} 无
   */
  hasError: (val: boolean) => void;
  /**
   * console.log 打印普通日志信息,方便开发调试
   * @param {string | any} sources 打印的日志内容
   * @returns {void} 无
   */
  logInfo: (sources: string | any) => void;
  /**
   * console.warn 打印警告日志信息,方便开发调试
   * @param {string | any} sources 打印的警告日志内容
   * @returns {void} 无
   */
  logWarn: (sources: string | any) => void;
  /**
   * console.error 打印错误日志信息,方便开发调试定位问题
   * @param {string | any} sources 打印的错误日志内容
   * @returns {void} 无
   */
  logError: (sources: string | any) => void;
} | any
declare const MeasureUtil: {
  /**
   * 求坐标数组的空间距离
   * @param {L.LatLng[]} coords 坐标数组
   * @returns {number} 距离（单位：米）
   */
  getDistance: (coords: L.LatLng[]) => number;
  coords: any;
  distance: any;
  /**
   * 求闭合坐标环的周长（首尾自动闭合；传入嵌套数组时按多个环累加）
   * @param {L.LatLng[] | any[][]} coords 坐标数组（闭合环，支持多环嵌套）
   * @returns {number} 周长（单位：米）
   */
  getPerimeter: (coords: L.LatLng[] | any[][]) => number;
  total: any;
  /**
   * 计算面积（空间平面）
   * @param {L.LatLng[]} coords 坐标数组
   * @returns {number} 面积，单位：平方米
   */
  getArea: (coords: L.LatLng[]) => number;
  len: any;
  area: any;
  x1: any;
  y1: any;
  /**
   * 度数值 转 弧度值
   * @param {number} degrees 度数值
   * @returns {number} 弧度值
   */
  toRadians: (degrees: number) => number;
  /**
   * 计算2点的角度值（以 pt1 为原点，正东为 0 度、顺时针为正方向）
   * 【像素坐标，latlng通过map.latLngToContainerPoint 转换下】
   * @param {L.Point} pt1 需要计算的点（原点） 像素坐标
   * @param {L.Point} pt2 目标点（计算 pt1 指向 pt2 的方向） 像素坐标
   * @returns {number} 返回角度值，0-360度
   */
  getAngle: (pt1: L.Point, pt2: L.Point) => number;
  a: any;
  /**
   * 格式化显示距离值, 可指定单位
   * @param {number} val 距离值，米
   * @param {string} [unit] 计量单位, 可选值：auto、m、km、mile、zhang 。auto时根据距离值自动选用k或km
   * @returns {string} 带单位的格式化距离值字符串，如：20.17 米
   */
  formatDistance: (val: number, unit?: string) => string;
  val: any;
  unit: any;
  valstr: any;
  /**
   * 格式化显示面积值, 可指定单位
   * @param {number} val 面积值，平方米
   * @param {string} [unit] 计量单位，可选值：auto、m、km、mu、ha 。auto时根据面积值自动选用m或km
   * @returns {string} 带单位的格式化面积值字符串，如：20.21 平方公里
   */
  formatArea: (val: number, unit?: string) => string;
} | any
declare const PointTrans: {
  /**
   * 经度纬度数组 转为 LatLng坐标值
   * @param {number[]} coord 经度纬度数组
   * @returns {L.LatLng} LatLng坐标值
   */
  coord2latlng: (coord: number[]) => L.LatLng;
  /**
   * 经度纬度数组列表 转为 LatLng坐标值列表
   * @param {any[][]} coords 经度纬度数组列表
   * @returns {L.LatLng[]} LatLng坐标值列表
   */
  coords2latlngs: (coords: any[][]) => L.LatLng[];
  /**
   * LatLng坐标值 转为 数组（注意：返回 [纬度, 经度]，与 latlng2coord 的 [经度, 纬度] 顺序相反）
   * @param {L.LatLng | number[]} latlng LatLng坐标值（传入数组时原样返回）
   * @returns {number[]} [lat, lng] 或 [lat, lng, alt]
   */
  latlng2arr: (latlng: L.LatLng | number[]) => number[];
  /**
   * LatLng坐标值列表 转为 数组列表（纬度在前）
   * @param {L.LatLng[]} latlngs LatLng坐标值列表
   * @returns {any[][]} [lat, lng] 形式的数组列表
   */
  latlngs2arr: (latlngs: L.LatLng[]) => any[][];
  /**
   * 坐标对象列表 转为 数组列表（导入的坐标有的是[{}]，需要转换为[[]]）
   * @param {any[] | L.LatLng[]} latlngs 坐标对象列表
   * @returns {any[][]} [lat, lng] 形式的数组列表
   */
  latlngArrObj2arr: (latlngs: any[] | L.LatLng[]) => any[][];
  /**
   * LatLng坐标值 转为 经度纬度数组
   * @param {L.LatLng} latlng LatLng坐标值
   * @returns {number[]} 经度纬度数组
   */
  latlng2coord: (latlng: L.LatLng) => number[];
  /**
   * LatLng坐标值列表 转为 经度纬度数组列表
   * @param {L.LatLng[]} latlngs LatLng坐标值列表
   * @returns {any[][]} 经度纬度数组列表
   */
  latlngs2coords: (latlngs: L.LatLng[]) => any[][];
  /**
   * LatLng坐标值数组 转为 WebMercator投影平面坐标数组
   * @param {L.LatLng[]} arr LatLng坐标值数组
   * @returns {any[][]} WebMercator投影平面坐标数组
   */
  latlngs2mercators: (arr: L.LatLng[]) => any[][];
  /**
   * WebMercator投影平面坐标数组 转为  LatLng坐标值数组
   * @param {any[][]} arr WebMercator投影平面坐标数组
   * @returns {L.LatLng[]} LatLng坐标值数组
   */
  mercators2latlngs: (arr: any[][]) => L.LatLng[];
  /**
   * WebMercator投影平面坐标点 转为  LatLng坐标点
   * @param {number[]} point WebMercator投影平面坐标点，如 [x, y]
   * @returns {L.LatLng} LatLng坐标点
   */
  mercator2latlng: (point: number[]) => L.LatLng;
  /**
   * 经度/纬度 十进制 转为 度分秒格式
   * @param {number} value 经度或纬度值
   * @returns {any} 度分秒对象，如： { sign: '-', degree: 12, minute: 0, second: 0, str: `-12° 0' 0"` }
   */
  degree2dms: (value: number) => any;
  sign: any;
  degree: any;
  minute: any;
  second: any;
  str: any;
  /**
   * 经度/纬度  度分秒 转为 十进制
   * 符号取自 degree 参数：传入负的度值（如南纬、西经）时返回负的十进制值。
   * @param {number} degree 度（负值表示南纬/西经）
   * @param {number} minute 分
   * @param {number} second 秒
   * @returns {number} 十进制
   */
  dms2degree: (degree: number, minute: number, second: number) => number;
  /**
   * 根据经度值 获取CGCS2000投影坐标对应的 EPSG值
   * @param {number} lng 经度值
   * @param {boolean} [fd6] 是否为6度分带， true:6度分带,false:3度分带
   * @param {boolean} [hasAddDH] 横坐标前是否加带号
   * @returns {string | undefined} EPSG值
   */
  getCGCS2000EPSGByLng: (lng: number, fd6?: boolean, hasAddDH?: boolean) => string | undefined;
  epsgID: any;
  /**
   * 根据加带号的横坐标值 获取CGCS2000投影坐标对应的EPSG值
   * @param {number} x 根据加带号的横坐标值
   * @returns {string | undefined} EPSG值
   */
  getCGCS2000EPSGByX: (x: number) => string | undefined;
  proj4ConverterCache: any;
  PROJ4_CONVERTER_CACHE_MAX: any;
  /**
   * 获取（并缓存）proj4 转换器
   * @param {string | any} fromProjParams 原始坐标系
   * @param {string | any} toProjParams 目标坐标系
   * @returns {any} proj4 转换器
   */
  getProj4Converter: (fromProjParams: string | any, toProjParams: string | any) => any;
  converter: any;
  /**
   * 使用proj4转换坐标（支持任意坐标系），
   * 坐标系 可以在 {@link http://epsg.io }进行查询，已经内置支持 EPSG:4326、EPSG:3857、EPSG:4490、EPSG:4491至4554
   * @param {number[]} arrdata 原始坐标,示例：[39396641,3882123]
   * @param {string | CRS} fromProjParams 原始坐标的坐标系，如'EPSG:4527'
   * @param {string | CRS} [toProjParams] 转为返回的结果坐标系
   * @returns {number[]} 返回结果坐标系的对应坐标,示例：[115.866936, 35.062583]
   */
  proj4Trans: (arrdata: number[], fromProjParams: string | CRS, toProjParams?: string | CRS) => number[];
  fromProjParams: any;
  toProjParams: any;
  /**
   * 使用proj4转换坐标数组（支持任意坐标系），
   * 坐标系 可以在 {@link http://epsg.io }进行查询，已经内置支持 EPSG:4326、EPSG:3857、EPSG:4490、EPSG:4491至4554
   * @param {number[]} coords 原始坐标数组,示例：[[39396641,3882123],[39396623,3882134]]
   * @param {string} fromProjParams 原始坐标的坐标系，如'EPSG:4527'
   * @param {string} [toProjParams] 转为返回的结果坐标系
   * @returns {number[]} 返回结果坐标系的对应坐标数组,示例：[[115.866936, 35.062583],[115.866923, 35.062565]]
   */
  proj4TransArr: (coords: number[], fromProjParams: string, toProjParams?: string) => number[];
  /**
   * 经纬度地理坐标 转 投影平面坐标
   * @param {number[]} lnglat 经纬度坐标,示例：[123.123456,32.654321,20.1]
   * @returns {number[]} WebMercator投影平面坐标,示例：[13048882,3741659,20.1]
   */
  lonlat2mercator: (lnglat: number[]) => number[];
  /**
   * 经纬度地理坐标数组 转 投影平面坐标数组
   * @param {any[][]} arr 经纬度坐标数组,示例：[ [123.123456,32.654321,20.1], [111.123456,22.654321,21.2] ]
   * @returns {any[][]} WebMercator投影平面坐标数组,示例：[[13048882,3741659,20.1],[13048882,3741659,21.2] ]
   */
  lonlats2mercators: (arr: any[][]) => any[][];
  /**
   * 投影平面坐标 转 经纬度地理坐标
   * @param {number[]} point WebMercator投影平面坐标,示例：[13048882,3741659,20.1]
   * @returns {number[]} 经纬度坐标,示例：[123.123456,32.654321,20.1]
   */
  mercator2lonlat: (point: number[]) => number[];
  /**
   * 投影平面坐标数组 转 经纬度地理坐标数组
   * @param {any[][]} arr WebMercator投影平面坐标数组,示例：[[13048882,3741659,20.1],[13048882,3741659,21.2] ]
   * @returns {any[][]} 经纬度坐标数组,示例：[ [123.123456,32.654321,20.1], [111.123456,22.654321,21.2] ]
   */
  mercators2lonlats: (arr: any[][]) => any[][];
  x_PI: any;
  PI: any;
  a: any;
  ee: any;
  transformlat: () => void;
  ret: any;
  transformlng: () => void;
  out_of_china: () => void;
  /**
   * 经纬度坐标转换，
   * 百度坐标 (BD09) 转换为 国测局坐标 (GCJ02)
   * @param {number[]} arrdata 百度坐标 (BD09)坐标数据，示例：[117.225590,31.832916]
   * @returns {number[]} 国测局坐标 (GCJ02)坐标数据，示例：[:117.22559,31.832917]
   */
  bd2gcj: (arrdata: number[]) => number[];
  gg_lng: any;
  gg_lat: any;
  /**
   * 经纬度坐标转换，
   * 国测局坐标 (GCJ02) 转换为 百度坐标 (BD09)
   * @param {number[]} arrdata 高德谷歌等国测局坐标 (GCJ02) 坐标数据，示例：[117.225590,31.832916]
   * @returns {number[]} 百度坐标 (BD09)坐标数据，示例：[117.232039,31.839177]
   */
  gcj2bd: (arrdata: number[]) => number[];
  bd_lng: any;
  bd_lat: any;
  /**
   * 经纬度坐标转换，
   * 标准无偏坐标（WGS84） 转为 国测局坐标 (GCJ02)
   * @param {number[]} arrdata 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
   * @returns {number[]} 国测局坐标 (GCJ02)坐标数据，示例：[117.225590,31.832916]
   */
  wgs2gcj: (arrdata: number[]) => number[];
  magic: any;
  dlat: any;
  dlng: any;
  mglng: any;
  mglat: any;
  /**
   * 经纬度坐标转换，
   * 国测局坐标 (GCJ02)  转换为 标准无偏坐标（WGS84）
   * @param {number[]} arrdata 国测局坐标 (GCJ02)坐标数据，示例：[117.225590,31.832916]
   * @returns {number[]} 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
   */
  gcj2wgs: (arrdata: number[]) => number[];
  jd: any;
  wd: any;
  /**
   * 经纬度坐标转换，
   * 百度坐标 (BD09) 转 标准无偏坐标（WGS84）
   * @param {number[]} arrdata 百度坐标 (BD09)坐标数据，示例：[117.232039,31.839177]
   * @returns {number[]} 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
   */
  bd2wgs: (arrdata: number[]) => number[];
  /**
   * 标准无偏坐标（WGS84）  转 百度坐标 (BD09)
   * @param {number[]} arrdata 标准无偏坐标（WGS84）坐标数据，示例：[117.220102, 31.834912]
   * @returns {number[]} 百度坐标 (BD09)坐标数据，示例：[117.232039,31.839177]
   */
  wgs2bd: (arrdata: number[]) => number[];
  /**
   * 【方式2】经纬度地理坐标 转 投影平面坐标
   * @param {number[]} arrdata 经纬度坐标,示例：[117.220101,31.834907]
   * @returns {number[]} WebMercator投影平面坐标,示例：[13048882.06,3741659.72]
   */
  jwd2mct: (arrdata: number[]) => number[];
  y: any;
  x: any;
  /**
   * 【方式2】投影平面坐标 转 经纬度地理坐标
   * @param {number[]} arrdata WebMercator投影平面坐标，示例：[13048882.06,3741659.72]
   * @returns {number[]} 经纬度坐标数据，示例：[117.220101,31.834907]
   */
  mct2jwd: (arrdata: number[]) => number[];
} | any
declare const PointUtil: {
  /**
   * 获取PointTrans中对应的坐标转换方法
   * srcCoordType 转 dstCoordType 对应的方法名称
   * @param {ChinaCRS} srcCoordType 原始的坐标系
   * @param {ChinaCRS} dstCoordType 转换后的坐标系
   * @returns {((...params: any[]) => any) | false} PointTrans中对应的坐标转换方法；坐标系相同或没有对应方法时返回 false
   */
  getTransFun: (srcCoordType: ChinaCRS, dstCoordType: ChinaCRS) => ((...params: any[]) => any) | false;
  srcCoordType: any;
  dstCoordType: any;
  crsName2FunName: () => void;
  /**
   * 克隆坐标数组
   * @param {L.LatLng[]} latlngs 坐标数组
   * @returns {L.LatLng[]} 新的坐标数组
   */
  cloneLatLngs: (latlngs: L.LatLng[]) => L.LatLng[];
  /**
   * 克隆坐标
   * @param {L.LatLng} latlng 坐标
   * @returns {L.LatLng} 新的坐标
   */
  cloneLatLng: (latlng: L.LatLng) => L.LatLng;
  /**
   * 从起点到终点按"curr/all"比例的新的位置点坐标
   * @param {L.LatLng} p1 起点坐标
   * @param {L.LatLng} p2 终点坐标
   * @param {number} all 总秒数
   * @param {number} curr 当前秒数
   * @returns {L.LatLng} 新的坐标
   */
  interpolatePosition: (p1: L.LatLng, p2: L.LatLng, all: number, curr: number) => L.LatLng;
  k: any;
  /**
   * 计算指定角度和距离处的点
   * @param {L.LatLng} center 现有点
   * @param {number} distance 距离
   * @param {number} angle 角度
   * @returns {L.LatLng} 目前点
   */
  getPointByDistanceAngle: (center: L.LatLng | any, distance: number, angle: number) => L.LatLng;
  cos2SigmaM: any;
  sinSigma: any;
  cosSigma: any;
  sigmaP: any;
  sigma: any;
} | any
declare const PolyUtil: {
  /**
   * 检查两条线段是否相交
   * @param {L.Point | number[]} p 线段1起点
   * @param {L.Point | number[]} p1 线段1终点
   * @param {L.Point | number[]} p2 线段2起点
   * @param {L.Point | number[]} p3 线段2终点
   * @returns {boolean} 两条线段是否相交
   */
  segmentsIntersect: (p: L.Point | number[], p1: L.Point | number[], p2: L.Point | number[], p3: L.Point | number[]) => boolean;
  _checkCounterclockwise: () => void;
  /**
   * 计算平行线坐标
   * @param {L.LatLng[]} pts 坐标数组
   * @param {number} offset 偏移值
   * @returns {L.LatLng[]} 平行线坐标数组
   */
  getOffsetPoints: (pts: L.LatLng[], offset: number) => L.LatLng[];
  translatePoint: () => void;
  offsetPointLine: () => void;
  b: any;
  segmentAngle: any;
  offsetAngle: any;
  angle: any;
  distance: any;
  original: any;
  offset: any;
  intersection: () => void;
  lineEquation: () => void;
  a: any;
  x: any;
  joinSegments: () => void;
  jointPoints: any;
  joinLineSegments: () => void;
  s2: any;
  joinedPoints: any;
  s1: any;
  circularArc: () => void;
  startAngle: any;
  endAngle: any;
  /**
   * 计算圆的边线坐标列表
   * @param {L.LatLng} center 中心点
   * @param {number} radius 半径
   * @param {number} [count] 点个数
   * @returns {L.LatLng[]} 边界线坐标数组
   */
  getCircleOutlineLatlngs: (center: L.LatLng | any, radius: number, count?: number) => L.LatLng[];
  /**
   * 在 指定bbox区域 内生成 指定数量(概略) 的网格坐标点，
   * 目前常用于生成坐标点，测试数据量
   * @param {L.LatLngBounds} bounds 区域范围
   * @param {number} count 数量(概略)，返回坐标接近此数字
   * @returns {any} 坐标集合 ,如： {points:L.LatLng[], radius: Number}（points 为网格点，radius 为按 bbox 估算的间距）
   */
  getGridPoints: (bounds: L.LatLngBounds, count: number) => any;
  bounds: any;
  points: any;
  radius: any;
  /**
   * 判断点是否 多边形内
   * @param {L.LatLng} latlng 需要判断的点位
   * @param {L.LatLng[]} latlngs 多边形的边界点
   * @returns {boolean} 是否在面内
   */
  isInPoly: (latlng: L.LatLng, latlngs: L.LatLng[]) => boolean;
  insidePoly: any;
  testisInPoly: () => void;
  j: any;
  inside: any;
  /**
   * 求坐标数组的中心点
   * @param {L.LatLng[]} latlngs 坐标数组
   * @param {CRS | L.CRS | string | any} crs 坐标系
   * @returns {L.LatLng} 中心点坐标
   */
  centerOfMass: (latlngs: L.LatLng[], crs: CRS | L.CRS | string | any) => L.LatLng;
  crs: any;
  /**
   * 整体平移坐标数组
   * @param {L.LatLng[]} latlngs 坐标数组
   * @param {any} options 参数:
   * @param {L.LatLng} [options.center] [方式1] 移动到新的中心点坐标
   * @param {any} [options.offset] [方式2] 按移动的变量 {lng: 经度偏移量, lat: 纬度偏移量}
   * @returns {L.LatLng[]} 移动后的坐标点数组
   */
  movePoints: (latlngs: L.LatLng[], options?: {
        center?: L.LatLng | any;
        offset?: any;
      }) => L.LatLng[];
  applyOffset: () => void;
  removeNearPoint: () => void;
} | any
declare const Util: {
  /**
   * 判断对象是否已定义（不为 undefined 或 null）
   * @param {any} a 判断的对象
   * @returns {boolean} 是否已定义
   */
  defined: (a: any) => boolean;
  /**
   * 判断对象是否为Number类型
   * @param {any} obj 对象
   * @returns {boolean} 是否为Number类型
   */
  isNumber: (obj: any) => boolean;
  /**
   * 判断对象是否为String类型
   * @param {any} obj 对象
   * @returns {boolean} 是否为String类型
   */
  isString: (obj: any) => boolean;
  /**
   * 判断对象是否为Boolean类型
   * @param {any} obj 对象
   * @returns {boolean} 是否为Boolean类型
   */
  isBoolean: (obj: any) => boolean;
  /**
   * 判断对象是否为Object类型
   * @param {any} obj 对象
   * @returns {boolean} 是否为Object类型
   */
  isObject: (obj: any) => boolean;
  hasOwn: any;
  /**
   * 判断对象是否为纯粹的Object类型
   * （所谓"纯粹的对象"，就是该对象是通过"{}"或"new Object"创建的）
   * @param {any} obj 对象
   * @returns {boolean} 是否为Object类型
   */
  isPlainObject: (obj: any) => boolean;
  /**
   * 判断对象是否为function方法
   * @param {any} val 对象
   * @returns {boolean} 是否为function方法
   */
  isFunction: (val: any) => boolean;
  /**
   * 判断对象是否为简单类型（包括：String\Boolean\Number\Array）
   * @param {any} value 对象
   * @returns {boolean} 是否为简单类型（包括：String\Boolean\Number\Array）
   */
  isSimpleType: (value: any) => boolean;
  /**
   * 格式化数字，返回指定小数位的数字
   * @param {number} num 数字
   * @param {number} [digits] 小数位数
   * @returns {number} 返回digits指定小数位的数字
   */
  formatNum: (num: number, digits?: number) => number;
  /**
   * 按指定长度,对数字进行补零，返回指定长度的字符串
   * @param {number | string} numStr 数字对象,示例：1234
   * @param {number} n 指定长度，示例：8
   * @returns {string} 补零后的指定长度的字符串，示例：'00001234'
   */
  padLeft0: (numStr: number | string, n: number) => string;
  numStr: any;
  /**
   * 根据空格分割字符串，并返回字符串数组（会自动去掉首位空格）
   * @param {string} str 字符串
   * @returns {string[]} 分割后的字符串数组
   */
  splitWords: (str: string) => string[];
  /**
   * 除去字符串首尾的空格
   * @param {string} str 字符串
   * @returns {string} 除去首尾空格的字符串
   */
  trim: (str: string) => string;
  /**
   * 获取字符串长度，区分中文和英文
   * @param {string} str 字符串
   * @returns {number} 字符串长度
   */
  getStrLength: (str: string) => number;
  templateRe: any;
  /**
   * 根据数据和格式化字符串模板，返回字符串
   * @param {string} str 格式化字符串模版，属性字段为大括号，如 {name}
   * @param {any} data 数据对象
   * @param {boolean | string} [toEmpty] 是否将模板中未匹配项转为空值；传字符串时用该字符串替换未匹配项
   * @returns {string} 返回字符串
   * @example var str = mars2d.Util.template("<div>名称：{name}</div>", { name:"欢迎使用Mars2D平台", date:"2017-8-25"} );
 //str结果为 : "<div>名称：欢迎使用Mars2D平台</div>"
   */
  template: (str: string, data: any, toEmpty?: boolean | string) => string;
  value: any;
  CHARS: any;
  /**
   * 获取随机唯一uuid字符串,包含数字、大写字母、小写字母
   * @param {string} [prefix] 前缀
   * @returns {string} 字符串
   */
  createGuid: (prefix?: string) => string;
  r: any;
  callbackIndex: any;
  /**
   * 获取Popup或Tooltip格式化Html字符串
   * @param {any} options 参数对象:
   * @param {any} options.attr 属性值
   * @param {string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any} options.template 模版配置，支持：'all'、数组、字符串模板
   * @param {string} [options.title] 标题
   * @param {boolean} [options.edit] 是否返回编辑输入框
   * @param {number} [options.width] edit:true时的，编辑输入框宽度值
   * @returns {string | false} Html字符串；未传 attr 或没有可显示字段时返回 false
   * @example //template可以是'all' ，返回数据的全部属性信息
graphicLayer.bindPopup(function (event) {
  var attr = event.graphic.attr
  return mars2d.Util.getTemplateHtml({ title: '桥梁', template: 'all', attr: attr })
})

//template可以是格式化字符串模板
var html = mars2d.Util.getTemplateHtml({ title: '火星项目', template:  "名称：{项目名称}<br />类型：{设施类型}<br />面积：{用地面积}亩<br />位置：{具体位置}", attr: item })

//可以是数组的template，按数组顺序构造，并转义字段名称
//
var html = mars2d.Util.getTemplateHtml({
  title: '塔杆',
  template: [
    { field: 'roadName', name: '所属线路' },
    { field: 'towerId', name: '杆塔编号' },
    { field: '杆塔型号', name: '杆塔型号' },
    { field: '杆塔性质', name: '杆塔性质' },
    { field: '杆塔类型', name: '杆塔类型' },
    { field: '设计单位', name: '设计单位' },
    { field: 'height', name: '海拔高度' },
  ],
  attr: item,
})
   */
  getTemplateHtml: (options?: {
        attr: any;
        template: string | Globe.getTemplateHtml_template[] | ((...params: any[]) => any) | any;
        title?: string;
        edit?: boolean;
        width?: number;
      }) => string | false;
  inhtml: any;
  showval: any;
  onlySimpleType: any;
  onclickHtml: any;
  /**
   * 取属性值，最简的键值对。
   * 方便popup、tooltip等构造方法使用
   * @param {any} attr 属性对象
   * @param {any} [options] 参数对象:
   * @param {boolean} options.onlySimpleType 是否只获取简易类型的对象
   * @param {string[]} [options.removeKeys] 不复制的属性名 数组
   * @param {boolean} [options.noArray] 是否排除数组类型的属性值（仅 onlySimpleType 为 true 时生效）
   * @returns {any} 最简的键值对属性对象
   */
  getAttrVal: (attr: any, options?: {
        onlySimpleType: boolean;
        removeKeys?: string[];
        noArray?: boolean;
      }) => any;
  getOneAttrValue: () => void;
  /**
   * 合并对象，对二级子属性为Object的对象也会进行融合。
   * @param {any} dest 目标对象
   * @param {any} sources 需要融入合并的对象
   * @returns {any} 融合后的对象
   */
  merge: (dest: any, sources: any) => any;
  j: any;
  len: any;
  src: any;
  hasMergeObject: () => void;
  /**
   * 复制克隆对象
   * @param {any} obj 原始对象
   * @param {string[]} [removeKeys] 不复制的属性名 数组
   * @param {number} [level] 拷贝的层级最大深度,避免死循环
   * @returns {any} 克隆后的对象
   */
  clone: (obj: any, removeKeys?: string[], level?: number) => any;
  /**
   * 随机获取数组中的一个元素
   * @param {any[]} arr 数组
   * @returns {any} 获取到的随机元素
   */
  getArrayRandomOne: (arr: any[]) => any;
  /**
   * 移除数组中的指定对象
   * @param {any[]} arr 数组
   * @param {any} val 需要移除的数组元素对象
   * @returns {boolean} 对象是否移除成功
   */
  removeArrayItem: (arr: any[], val: any) => boolean;
  /**
   * 根据属性 和symbol配置 取style样式信息
   * @param {any} symbol symbol配置
   * @param {any} symbol.styleOptions Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
   * @param {string} [symbol.styleField] 按 styleField 属性设置不同样式。
   * @param {any} [symbol.styleFieldOptions] 按styleField值与对应style样式的键值对象。
   * @param {((...params: any[]) => any)} [symbol.callback] 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
   * @param {any} [attr] 数据属性对象
   * @returns {any} style样式
   */
  getSymbolStyle: (symbol?: {
        styleOptions: any;
        styleField?: string;
        styleFieldOptions?: any;
        callback?: ((...params: any[]) => any);
      } | any, attr?: any) => any;
  styleOpt: any;
  /**
   * 获取GeoJSON中的features数组集合（自动判断数据来源）
   * @param {any} geojson geojson对象
   * @returns {any[]} features数组集合
   */
  getGeoJsonFeatures: (geojson: any) => any[];
  features: any;
  /**
   * GeoJSON 转为 Graphic构造参数数组
   * style有3种方式控制: 1.传type及style参数；2.传symbol参数；3.数据本身的feature.properties.style；
   * 优先级为：1>2>3
   * @param {any} geojson geojson对象
   * @param {any} [options] 控制参数
   * @param {GraphicType | string} [options.type] 转为指定的类型
   * @param {any} [options.style] Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}。其中merge字段控制是否与数据中已有的style合并（合并时数据自带样式优先），默认不合并
   * @param {any} [options.symbol] symbol配置，与style二选一
   * @param {GraphicType | string} [options.symbol.type] 标识数据类型
   * @param {boolean} [options.symbol.merge] 是否与数据中已有的style合并，默认不合并，仅适用symbol配置。合并时数据自带的style优先（即symbol样式不会覆盖数据自带样式）。
   * @param {any} options.symbol.styleOptions Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}
   * @param {string} [options.symbol.styleField] 按 styleField 属性设置不同样式。
   * @param {any} [options.symbol.styleFieldOptions] 按styleField值与对应style样式的键值对象。
   * @param {((...params: any[]) => any)} [options.symbol.callback] 自定义判断处理返回style ，示例：callback: function (attr, styleOpt){  return { color: "#ff0000" };  }
   * @param {string} [options.crs] 原始数据的坐标系，如'EPSG:3857' （可以从 {@link http://epsg.io }查询）
   * @param {((...params: any[]) => any)} [options.filter] 数据筛选方法，方法体内返回false时排除数据 filter:function(feature){return true}
   * @returns {any[]} Graphic构造参数数组
   */
  geoJsonToGraphics: (geojson: any, options?: {
        type?: GraphicType | string;
        style?: any;
        symbol?: {
          type?: GraphicType | string;
          merge?: boolean;
          styleOptions: any;
          styleField?: string;
          styleFieldOptions?: any;
          callback?: ((...params: any[]) => any);
        } | any;
        crs?: string;
        filter?: ((...params: any[]) => any);
      }) => any[];
  /**
   * GeoJSON格式的Feature单个对象转为 Graphic构造参数（用于创建Graphic）
   * @param {any} feature geojson单个Feature对象
   * @param {any} [options] 参数，包括：
   * @param {GraphicType | string} [options.type] 转为指定的类型
   * @param {any} [options.style] Style样式，每种不同类型数据都有不同的样式，具体见各矢量数据的style参数。{@link GraphicType}。其中merge字段控制是否与数据中已有的style合并（合并时数据自带样式优先），默认不合并
   * @param {string} [options.crs] 原始数据的坐标系，如'EPSG:3857' （可以从 {@link http://epsg.io }查询）
   * @param {((...params: any[]) => any)} [options.onPointTrans] 坐标转换方法，可用于对每个坐标做额外转换处理
   * @param {((...params: any[]) => any)} [options.filter] 数据筛选方法，方法体内返回false时排除数据 filter:function(feature){return true}
   * @returns {any[]} Graphic构造参数数组（用于创建Graphic）
   */
  featureToGraphic: (feature: any, options?: {
        type?: GraphicType | string;
        style?: any;
        crs?: string;
        onPointTrans?: ((...params: any[]) => any);
        filter?: ((...params: any[]) => any);
      }) => any[];
  feature: any;
  graphicType: any;
  style: any;
  crs: any;
  coord: any;
  i: any;
  maxPoly: any;
  type: any;
  geometry: any;
  properties: any;
  download: () => void;
  base64Img2Blob: () => void;
  /**
   * 导出下载图片文件
   * @param {string} name 图片文件名称， 后缀名默认为.png
   * @param {string} base64 图片内容，base64格式
   * @returns {void} 无
   */
  downloadBase64Image: (name: string, base64: string) => void;
  name: any;
  /**
   * 导出下载文本文件
   * @param {string} fileName 文件完整名称，需要含后缀名
   * @param {string} string 文本内容
   * @param {string} [mimeType] MIME类型,如：'text/plain'、'text/html'、'application/json'
   * @returns {void} 无
   */
  downloadFile: (fileName: string, string: string, mimeType?: string) => void;
  /**
   * 执行alert弹窗
   * @param {string} msg 弹窗内的内容
   * @param {string} [title] 弹窗的标题
   * @returns {void} 无
   */
  alert: (msg: string, title?: string) => void;
  title: any;
  skin: any;
  closeBtn: any;
  anim: any;
  shade: any;
  /**
   * 执行msg提示窗（自动消失）
   * @param {string} msg 弹窗内的内容
   * @returns {void} 无
   */
  msg: (msg: string) => void;
  /**
   * 将 时间 转化为指定格式的字符串
   * @param {Date} date 时间
   * @param {string} [fmt] 格式模版，月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符; 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字).
   * @returns {string} 指定格式的字符串
   * @example mars2d.Util.formatDate(date,"yyyy-MM-dd HH:mm:ss") ==> 2017-08-25 08:08:00
mars2d.Util.formatDate(date,"yyyy-MM-dd HH:mm:ss.S") ==> 2017-08-25 08:08:00.423
mars2d.Util.formatDate(date,"yyyy-M-d HH:mm:ss") ==> 2017-8-5 08:08:00
   */
  formatDate: (date: Date, fmt?: string) => string;
  fmt: any;
  /**
   * 格式化时长
   * @param {number} strtime 时长
   * @returns {string} 格式化字符串，如XX小时XX分钟
   */
  formatTime: (strtime: number) => string;
  strtime: any;
  /**
   * 请求服务返回json结果，方法是基于axios库精简的
   * @param {any} options 请求参数
   * @param {string} options.url 服务URL地址
   * @param {any} [options.queryParameters] 与请求一起发送的 URL 参数,例如 {id: 1987 }
   * @param {string} [options.method] 请求类型
   * @param {number} [options.timeout] 是否超时
   * @param {any} [options.headers] 一个对象，将发送的其他HTTP标头。比如：headers: { 'X-My-Header': 'valueOfHeader' }
   * @returns {Promise<(any | undefined)>} 返回Promise异步处理结果，为响应体数据（response.data）；请求失败时返回 undefined
   */
  fetchJson: (options?: {
        url: string;
        queryParameters?: any;
        method?: string;
        timeout?: number;
        headers?: any;
      }) => Promise<(any | undefined)>;
  options: any;
  /**
   * 请求服务返回blob
   * @param {any} options 请求参数
   * @param {string} options.url 服务URL地址
   * @returns {Promise<ArrayBuffer>} 返回Promise异步处理结果（ArrayBuffer）
   */
  fetchBlob: (options: {
        url: string;
      }) => Promise<ArrayBuffer>;
  /**
   * 请求服务返回结果，方法是基于axios库精简的
   * @param {any} options 请求参数
   * @param {string} options.url 服务URL地址
   * @param {any} [options.queryParameters] 与请求一起发送的 URL 参数,例如 {id: 1987 }
   * @param {string} [options.method] 请求类型
   * @param {number} [options.timeout] 是否超时
   * @param {any} [options.headers] 一个对象，将发送的其他HTTP标头。比如：headers: { 'X-My-Header': 'valueOfHeader' }
   * @returns {Promise<any>} 返回Promise异步处理结果，对象为response对象
   */
  sendAjax: (options?: {
        url: string;
        queryParameters?: any;
        method?: string;
        timeout?: number;
        headers?: any;
      }) => Promise<any>;
  isMarsOnline: any;
  isLocalhost: any;
  replaceOnlineUrlDomain: () => void;
  /**
   * 获取随机颜色
   * @returns {string} /返回rgb(r,g,b)格式颜色
   */
  randomColor: () => string;
  ratio: any;
  /**
   * 毫米数值 转为 像素数值
   * @param {number} mm 毫米数值
   * @returns {number} 像素数值
   */
  mm2px: (mm: number) => number;
  /**
   * 事件中使用的 函数节流，
   * 说明：稀释fn函数的执行频率，但不管事件触发有多频繁，都会保证在delay毫秒内一定会执行一次fn函数
   * @param {((...params: any[]) => any)} fn 执行的方法
   * @param {number} delay 节流时间范围，毫秒数
   * @returns {((...params: any[]) => any)} 包含一层的替代方法
   * @example let newFun = mars2d.Util.funThrottle(this._changeFun, 500)
target.on("change", newFun)  // 解绑用 target.off("change", newFun)
   */
  funThrottle: (fn: ((...params: any[]) => any), delay: number) => ((...params: any[]) => any);
  starttime: any;
  timer: any;
  /**
   * 事件中使用的 函数防抖，
   * 说明：在delay毫秒内的多次调用操作，仅在最后一次调用时触发一次fn函数。
   * @param {((...params: any[]) => any)} fn 执行的方法
   * @param {number} delay 节流时间范围，毫秒数
   * @returns {((...params: any[]) => any)} 包含一层的替代方法
   * @example let newFun = mars2d.Util.funDebounce(this._changeFun, 500)
target.on("change", newFun)  // 解绑用 target.off("change", newFun)
   */
  funDebounce: (fn: ((...params: any[]) => any), delay: number) => ((...params: any[]) => any);
} | any

export {
  name, update, version, website, proj4, esri,
  BaseClass, BaseThing, SmallTooltip, MarsArray, Token, CRS, ChinaCRS, EventType, GraphicType, LayerType, HorizontalOrigin, VerticalOrigin, MapSwichType, State,
  Util, Log, GraphicUtil, LayerUtil, PointUtil, PointTrans, PolyUtil, DrawUtil, MeasureUtil,
  BaseStyleConver, MarkerStyleConver, DivGraphicStyleConver, LabelStyleConver, PointStyleConver, CircleStyleConver, PolylineStyleConver, PolygonStyleConver, RectangleStyleConver,
  control, graphic, layer, thing, query, QueryServiceType, QueryRouteType,
  Map,
};


// layer 命名空间二次导出的工具方法（来自 util/LayerUtil），
// JSDoc 只会把它们生成在 declare namespace LayerUtil 内，这里提升为顶层声明以便 layer 命名空间复用
declare const register: typeof LayerUtil.register
declare const create: typeof LayerUtil.create

/* ------------------------------------------------------------
 * 手写补充声明：tsd-jsdoc 无法从 JSDoc 正确生成的部分
 * 1) Leaflet 内部类 L.Map.ContextMenu（通过 L.Map.addInitHook 挂在 map.contextmenu 上）
 * ---------------------------------------------------------- */

declare namespace Map {
  /**
   * 地图右键菜单处理器，通过 map.contextmenu 访问
   */
  interface ContextMenu extends L.Handler {
    /** 在指定位置显示右键菜单 */
    showAt(point: L.Point | L.LatLng, data?: any): void
    /** 关闭右键菜单 */
    hide(): this
    /** 添加一个菜单项 */
    addItem(options: any): HTMLElement
    /** 在指定位置插入一个菜单项 */
    insertItem(options: any, index?: number): HTMLElement
    /** 移除一个菜单项（传入元素或索引） */
    removeItem(item: any): HTMLElement | null
    /** 移除所有菜单项 */
    removeAllItems(): void
    /** 隐藏所有菜单项 */
    hideAllItems(): void
    /** 显示所有菜单项 */
    showAllItems(e?: any): void
    /** 设置菜单项禁用状态 */
    setDisabled(item: any, disabled: boolean): void
    /** 菜单是否可见 */
    isVisible(): boolean
    /** 获取当前绑定的右键菜单配置 */
    getContextMenu(): any[]
    /** 绑定右键菜单配置 */
    bindContextMenu(contextmenuItems: any[]): this
    /** 解除绑定右键菜单 */
    unbindContextMenu(): this
  }
}
