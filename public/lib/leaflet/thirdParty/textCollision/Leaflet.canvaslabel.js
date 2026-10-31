(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = rbush;
module.exports.default = rbush;

var quickselect = __webpack_require__(2);

function rbush(maxEntries, format) {
    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

    // max entries in a node is 9 by default; min node fill is 40% for best performance
    this._maxEntries = Math.max(4, maxEntries || 9);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

    if (format) {
        this._initFormat(format);
    }

    this.clear();
}

rbush.prototype = {

    all: function () {
        return this._all(this.data, []);
    },

    search: function (bbox) {

        var node = this.data,
            result = [],
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return result;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf) result.push(child);
                    else if (contains(bbox, childBBox)) this._all(child, result);
                    else nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return result;
    },

    collides: function (bbox) {

        var node = this.data,
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return false;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    },

    load: function (data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        // recursively build the tree with the given data from scratch using OMT algorithm
        var node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            // save as is if tree is empty
            this.data = node;

        } else if (this.data.height === node.height) {
            // split root if trees have the same height
            this._splitRoot(this.data, node);

        } else {
            if (this.data.height < node.height) {
                // swap trees if inserted one is bigger
                var tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            // insert the small tree into the large tree at appropriate level
            this._insert(node, this.data.height - node.height - 1, true);
        }

        return this;
    },

    insert: function (item) {
        if (item) this._insert(item, this.data.height - 1);
        return this;
    },

    clear: function () {
        this.data = createNode([]);
        return this;
    },

    remove: function (item, equalsFn) {
        if (!item) return this;

        var node = this.data,
            bbox = this.toBBox(item),
            path = [],
            indexes = [],
            i, parent, index, goingUp;

        // depth-first iterative tree traversal
        while (node || path.length) {

            if (!node) { // go up
                node = path.pop();
                parent = path[path.length - 1];
                i = indexes.pop();
                goingUp = true;
            }

            if (node.leaf) { // check current node
                index = findItem(item, node.children, equalsFn);

                if (index !== -1) {
                    // item found, remove the item and condense tree upwards
                    node.children.splice(index, 1);
                    path.push(node);
                    this._condense(path);
                    return this;
                }
            }

            if (!goingUp && !node.leaf && contains(node, bbox)) { // go down
                path.push(node);
                indexes.push(i);
                i = 0;
                parent = node;
                node = node.children[0];

            } else if (parent) { // go right
                i++;
                node = parent.children[i];
                goingUp = false;

            } else node = null; // nothing found
        }

        return this;
    },

    toBBox: function (item) { return item; },

    compareMinX: compareNodeMinX,
    compareMinY: compareNodeMinY,

    toJSON: function () { return this.data; },

    fromJSON: function (data) {
        this.data = data;
        return this;
    },

    _all: function (node, result) {
        var nodesToSearch = [];
        while (node) {
            if (node.leaf) result.push.apply(result, node.children);
            else nodesToSearch.push.apply(nodesToSearch, node.children);

            node = nodesToSearch.pop();
        }
        return result;
    },

    _build: function (items, left, right, height) {

        var N = right - left + 1,
            M = this._maxEntries,
            node;

        if (N <= M) {
            // reached leaf level; return leaf
            node = createNode(items.slice(left, right + 1));
            calcBBox(node, this.toBBox);
            return node;
        }

        if (!height) {
            // target height of the bulk-loaded tree
            height = Math.ceil(Math.log(N) / Math.log(M));

            // target number of root entries to maximize storage utilization
            M = Math.ceil(N / Math.pow(M, height - 1));
        }

        node = createNode([]);
        node.leaf = false;
        node.height = height;

        // split the items into M mostly square tiles

        var N2 = Math.ceil(N / M),
            N1 = N2 * Math.ceil(Math.sqrt(M)),
            i, j, right2, right3;

        multiSelect(items, left, right, N1, this.compareMinX);

        for (i = left; i <= right; i += N1) {

            right2 = Math.min(i + N1 - 1, right);

            multiSelect(items, i, right2, N2, this.compareMinY);

            for (j = i; j <= right2; j += N2) {

                right3 = Math.min(j + N2 - 1, right2);

                // pack each entry recursively
                node.children.push(this._build(items, j, right3, height - 1));
            }
        }

        calcBBox(node, this.toBBox);

        return node;
    },

    _chooseSubtree: function (bbox, node, level, path) {

        var i, len, child, targetNode, area, enlargement, minArea, minEnlargement;

        while (true) {
            path.push(node);

            if (node.leaf || path.length - 1 === level) break;

            minArea = minEnlargement = Infinity;

            for (i = 0, len = node.children.length; i < len; i++) {
                child = node.children[i];
                area = bboxArea(child);
                enlargement = enlargedArea(bbox, child) - area;

                // choose entry with the least area enlargement
                if (enlargement < minEnlargement) {
                    minEnlargement = enlargement;
                    minArea = area < minArea ? area : minArea;
                    targetNode = child;

                } else if (enlargement === minEnlargement) {
                    // otherwise choose one with the smallest area
                    if (area < minArea) {
                        minArea = area;
                        targetNode = child;
                    }
                }
            }

            node = targetNode || node.children[0];
        }

        return node;
    },

    _insert: function (item, level, isNode) {

        var toBBox = this.toBBox,
            bbox = isNode ? item : toBBox(item),
            insertPath = [];

        // find the best node for accommodating the item, saving all nodes along the path too
        var node = this._chooseSubtree(bbox, this.data, level, insertPath);

        // put the item into the node
        node.children.push(item);
        extend(node, bbox);

        // split on node overflow; propagate upwards if necessary
        while (level >= 0) {
            if (insertPath[level].children.length > this._maxEntries) {
                this._split(insertPath, level);
                level--;
            } else break;
        }

        // adjust bboxes along the insertion path
        this._adjustParentBBoxes(bbox, insertPath, level);
    },

    // split overflowed node into two
    _split: function (insertPath, level) {

        var node = insertPath[level],
            M = node.children.length,
            m = this._minEntries;

        this._chooseSplitAxis(node, m, M);

        var splitIndex = this._chooseSplitIndex(node, m, M);

        var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
        newNode.height = node.height;
        newNode.leaf = node.leaf;

        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);

        if (level) insertPath[level - 1].children.push(newNode);
        else this._splitRoot(node, newNode);
    },

    _splitRoot: function (node, newNode) {
        // split root node
        this.data = createNode([node, newNode]);
        this.data.height = node.height + 1;
        this.data.leaf = false;
        calcBBox(this.data, this.toBBox);
    },

    _chooseSplitIndex: function (node, m, M) {

        var i, bbox1, bbox2, overlap, area, minOverlap, minArea, index;

        minOverlap = minArea = Infinity;

        for (i = m; i <= M - m; i++) {
            bbox1 = distBBox(node, 0, i, this.toBBox);
            bbox2 = distBBox(node, i, M, this.toBBox);

            overlap = intersectionArea(bbox1, bbox2);
            area = bboxArea(bbox1) + bboxArea(bbox2);

            // choose distribution with minimum overlap
            if (overlap < minOverlap) {
                minOverlap = overlap;
                index = i;

                minArea = area < minArea ? area : minArea;

            } else if (overlap === minOverlap) {
                // otherwise choose distribution with minimum area
                if (area < minArea) {
                    minArea = area;
                    index = i;
                }
            }
        }

        return index;
    },

    // sorts node children by the best axis for split
    _chooseSplitAxis: function (node, m, M) {

        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX,
            compareMinY = node.leaf ? this.compareMinY : compareNodeMinY,
            xMargin = this._allDistMargin(node, m, M, compareMinX),
            yMargin = this._allDistMargin(node, m, M, compareMinY);

        // if total distributions margin value is minimal for x, sort by minX,
        // otherwise it's already sorted by minY
        if (xMargin < yMargin) node.children.sort(compareMinX);
    },

    // total margin of all possible split distributions where each node is at least m full
    _allDistMargin: function (node, m, M, compare) {

        node.children.sort(compare);

        var toBBox = this.toBBox,
            leftBBox = distBBox(node, 0, m, toBBox),
            rightBBox = distBBox(node, M - m, M, toBBox),
            margin = bboxMargin(leftBBox) + bboxMargin(rightBBox),
            i, child;

        for (i = m; i < M - m; i++) {
            child = node.children[i];
            extend(leftBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(leftBBox);
        }

        for (i = M - m - 1; i >= m; i--) {
            child = node.children[i];
            extend(rightBBox, node.leaf ? toBBox(child) : child);
            margin += bboxMargin(rightBBox);
        }

        return margin;
    },

    _adjustParentBBoxes: function (bbox, path, level) {
        // adjust bboxes along the given tree path
        for (var i = level; i >= 0; i--) {
            extend(path[i], bbox);
        }
    },

    _condense: function (path) {
        // go through the path, removing empty nodes and updating bboxes
        for (var i = path.length - 1, siblings; i >= 0; i--) {
            if (path[i].children.length === 0) {
                if (i > 0) {
                    siblings = path[i - 1].children;
                    siblings.splice(siblings.indexOf(path[i]), 1);

                } else this.clear();

            } else calcBBox(path[i], this.toBBox);
        }
    },

    _initFormat: function (format) {
        // data format (minX, minY, maxX, maxY accessors)

        // uses eval-type function compilation instead of just accepting a toBBox function
        // because the algorithms are very sensitive to sorting functions performance,
        // so they should be dead simple and without inner calls

        var compareArr = ['return a', ' - b', ';'];

        this.compareMinX = new Function('a', 'b', compareArr.join(format[0]));
        this.compareMinY = new Function('a', 'b', compareArr.join(format[1]));

        this.toBBox = new Function('a',
            'return {minX: a' + format[0] +
            ', minY: a' + format[1] +
            ', maxX: a' + format[2] +
            ', maxY: a' + format[3] + '};');
    }
};

function findItem(item, items, equalsFn) {
    if (!equalsFn) return items.indexOf(item);

    for (var i = 0; i < items.length; i++) {
        if (equalsFn(item, items[i])) return i;
    }
    return -1;
}

// calculate node's bbox from bboxes of its children
function calcBBox(node, toBBox) {
    distBBox(node, 0, node.children.length, toBBox, node);
}

// min bounding rectangle of node children from k to p-1
function distBBox(node, k, p, toBBox, destNode) {
    if (!destNode) destNode = createNode(null);
    destNode.minX = Infinity;
    destNode.minY = Infinity;
    destNode.maxX = -Infinity;
    destNode.maxY = -Infinity;

    for (var i = k, child; i < p; i++) {
        child = node.children[i];
        extend(destNode, node.leaf ? toBBox(child) : child);
    }

    return destNode;
}

function extend(a, b) {
    a.minX = Math.min(a.minX, b.minX);
    a.minY = Math.min(a.minY, b.minY);
    a.maxX = Math.max(a.maxX, b.maxX);
    a.maxY = Math.max(a.maxY, b.maxY);
    return a;
}

function compareNodeMinX(a, b) { return a.minX - b.minX; }
function compareNodeMinY(a, b) { return a.minY - b.minY; }

function bboxArea(a)   { return (a.maxX - a.minX) * (a.maxY - a.minY); }
function bboxMargin(a) { return (a.maxX - a.minX) + (a.maxY - a.minY); }

function enlargedArea(a, b) {
    return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) *
           (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
}

function intersectionArea(a, b) {
    var minX = Math.max(a.minX, b.minX),
        minY = Math.max(a.minY, b.minY),
        maxX = Math.min(a.maxX, b.maxX),
        maxY = Math.min(a.maxY, b.maxY);

    return Math.max(0, maxX - minX) *
           Math.max(0, maxY - minY);
}

function contains(a, b) {
    return a.minX <= b.minX &&
           a.minY <= b.minY &&
           b.maxX <= a.maxX &&
           b.maxY <= a.maxY;
}

function intersects(a, b) {
    return b.minX <= a.maxX &&
           b.minY <= a.maxY &&
           b.maxX >= a.minX &&
           b.maxY >= a.minY;
}

function createNode(children) {
    return {
        children: children,
        height: 1,
        leaf: true,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
    };
}

// sort an array so that items come in groups of n unsorted items, with groups sorted between each other;
// combines selection algorithm with binary divide & conquer approach

function multiSelect(arr, left, right, n, compare) {
    var stack = [left, right],
        mid;

    while (stack.length) {
        right = stack.pop();
        left = stack.pop();

        if (right - left <= n) continue;

        mid = left + Math.ceil((right - left) / n / 2) * n;
        quickselect(arr, mid, left, right, compare);

        stack.push(left, mid, mid, right);
    }
}


/***/ }),
/* 2 */
/***/ (function(module) {

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function quickselect(arr, k, left, right, compare) {
    quickselectStep(arr, k, left || 0, right || (arr.length - 1), compare || defaultCompare);
}

function quickselectStep(arr, k, left, right, compare) {

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselectStep(arr, k, newLeft, newRight, compare);
        }

        var t = arr[k];
        var i = left;
        var j = right;

        swap(arr, left, k);
        if (compare(arr[right], t) > 0) swap(arr, left, right);

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) i++;
            while (compare(arr[j], t) > 0) j--;
        }

        if (compare(arr[left], t) === 0) swap(arr, left, j);
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

return quickselect;

})));


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasLabel": () => (/* binding */ CanvasLabel),
/* harmony export */   "canvasLabel": () => (/* binding */ canvasLabel)
/* harmony export */ });
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rbush__WEBPACK_IMPORTED_MODULE_0__);
 //https://www.5axxw.com/wiki/content/7wjc4t

var CanvasLabel = (L.CanvasLabel = L.Canvas.extend({
    options: {
        defaultLabelStyle: {
            offsetX: 0, //横坐标偏移(像素)
            offsetY: 0, //纵坐标偏移(像素)
            scale: 1, //放大比例
            rotation: 0, //旋转角度（弧度），可能会导致碰撞检测不准确
            text: null, //标注文本内容
            minZoom: null, //最小显示级别
            maxZoom: null, //最大显示级别
            collisionFlg: true, //碰撞检测
            center: null, //标注位置，默认为null,会自动计算几何中心
            zIndex: 0, //排序
            defaultHeight: 20, //文本高度,无法自动计算,所以直接传参手动调整

            //文本样式,具体值请参考[canvas](https://www.runoob.com/tags/ref-canvas.html)
            font: "10px sans-serif",
            fillStyle: "rgba(0,0,0,1)",
            lineCap: "round",
            lineDash: [],
            lineDashOffset: 0,
            lineJoin: "round",
            strokeStyle: "rgba(0,0,0,1)",
            textAlign: "center",
            textBaseline: "middle",
            lineWidth: 1,
        },
    },
    getEvents: function () {
        var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd,
            click: this._executeListeners,
            mousemove: this._executeListeners,
            mousedown: this._executeListeners,
            mouseup: this._executeListeners,
        };
        if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
        }
        return events;
    },

    initialize: function (options) {
        this._onClickListeners = [];
        this._onHoverListeners = [];
        this._onMouseDownListeners = [];
        this._onMouseUpListeners = [];

        options.defaultLabelStyle = options.defaultLabelStyle || {};
        options.defaultLabelStyle = L.extend(
            {},
            this.options.defaultLabelStyle,
            options.defaultLabelStyle
        );
        L.Canvas.prototype.initialize.call(this, options);
    },

    /**
     * 继承L.Canvas方法
     * 在刷新时保存画布当前地理位置
     */
    _update: function () {
        this._latlngBounds = this._map.getBounds().pad(this.options.padding);

        L.Canvas.prototype._update.call(this);
    },

    _draw: function () {
        if (!this._textBounds) {
            this._textBounds = new (rbush__WEBPACK_IMPORTED_MODULE_0___default())();
        } else {
            this._textBounds.clear();
        }
        let drawLayers = [];

        var layer,
            bounds = this._redrawBounds;
        this._ctx.save();
        if (bounds) {
            var size = bounds.getSize();
            this._ctx.beginPath();
            this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
            this._ctx.clip();
        }

        this._drawing = true;

        for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (
                !bounds ||
                (layer._pxBounds && layer._pxBounds.intersects(bounds))
            ) {
                drawLayers.push(layer);
            }
        }
        for (let i = 0; i < drawLayers.length; i++) {
            drawLayers[i]._updatePath();
        }

        //筛选需要绘制标注的图层
        let labelLayers = drawLayers.filter(function (layer) {
            return layer.options.labelStyle && layer.options.labelStyle.text;
        });

        //筛选不做碰撞检测的标签图层并安装zIndex排序
        let notCollisionLayers = labelLayers.filter((layer) => {
            var collisionFlg =
                layer.options.labelStyle.collisionFlg != undefined
                    ? layer.options.labelStyle.collisionFlg
                    : this.options.defaultLabelStyle.collisionFlg;
            return collisionFlg != true;
        });
        //不需要做碰撞检测的标注升序排序,zIndex值大的后绘制,会覆盖在先绘制的标注上面
        notCollisionLayers
            .sort((layer1, layer2) => {
                let zIndex1 = layer1.options.labelStyle.zIndex
                    ? layer1.options.labelStyle.zIndex
                    : this.options.defaultLabelStyle.zIndex;
                let zIndex2 = layer2.options.labelStyle.zIndex
                    ? layer2.options.labelStyle.zIndex
                    : this.options.defaultLabelStyle.zIndex;
                return zIndex1 - zIndex2;
            })
            .forEach((layer) => {
                this._updateText(this._ctx, layer);
            });

        //筛选需要碰撞检测的标签图层并安装zIndex排序
        let collisionLayers = labelLayers.filter((layer) => {
            var collisionFlg =
                layer.options.labelStyle.collisionFlg != undefined
                    ? layer.options.labelStyle.collisionFlg
                    : this.options.defaultLabelStyle.collisionFlg;
            return collisionFlg == true;
        });

        //需要做碰撞检测的标注降序排序,zIndex值大的优先绘制
        collisionLayers
            .sort((layer1, layer2) => {
                let zIndex1 = layer1.options.labelStyle.zIndex
                    ? layer1.options.labelStyle.zIndex
                    : this.options.defaultLabelStyle.zIndex;
                let zIndex2 = layer2.options.labelStyle.zIndex
                    ? layer2.options.labelStyle.zIndex
                    : this.options.defaultLabelStyle.zIndex;
                return -zIndex1 + zIndex2;
            })
            .forEach((layer) => {
                this._updateText(this._ctx, layer);
            });

        this._drawing = false;

        this._ctx.restore(); // Restore state before clipping.
    },

    /**
     * 更新文本标注
     */
    _updateText: function (ctx, layer) {
        //没有标签样式或没有标签文本的直接退出
        if (!layer.options.labelStyle || !layer.options.labelStyle.text) {
            return;
        }
        //计算图形中心点
        var latlng = L.latLng(layer.options.labelStyle.center);
        if (latlng) {
        } else if (layer.getLatLng) {
            latlng = layer.getLatLng();
        } else {
            //线，面没有环的直接退出
            if (layer._parts.length == 0 || layer._parts[0].length == 0) {
                return;
            }
            latlng = layer.getCenter();
        }

        //图形中心点没有在可视区域内的直接退出
        if (!this._latlngBounds.contains(latlng)) {
            return;
        }

        let layerLabelStyle = layer.options.labelStyle;
        let defaultLabelStyle = L.extend({}, this.options.defaultLabelStyle);
        //图层标注样式是个函数
        if (typeof layerLabelStyle == "function") {
            layerLabelStyle = layerLabelStyle(layer);
        }

        //最终标注样式
        let labelStyle = L.extend(defaultLabelStyle, layer.options.labelStyle);

        //地图缩放级别小于标注最小显示级别直接退出
        if (labelStyle.minZoom) {
            if (this._map.getZoom() < labelStyle.minZoom) {
                return;
            }
        }

        //地图缩放级别大于标注最大显示级别直接退出
        if (labelStyle.maxZoom) {
            if (this._map.getZoom() > labelStyle.maxZoom) {
                return;
            }
        }
        //保持画布原本样式
        ctx.save();

        //设置画布样式
        ctx.font = labelStyle.font;
        ctx.fillStyle = labelStyle.fillStyle;
        ctx.lineCap = labelStyle.lineCap;
        ctx.lineDash = labelStyle.lineDash;
        ctx.lineDashOffset = labelStyle.lineDashOffset;
        ctx.lineJoin = labelStyle.lineJoin;
        ctx.strokeStyle = labelStyle.strokeStyle;
        ctx.textAlign = labelStyle.textAlign;
        ctx.textBaseline = labelStyle.textBaseline;
        ctx.lineWidth = labelStyle.lineWidth;

        // 标注偏移
        var offsetX = labelStyle.offsetX;
        var offsetY = labelStyle.offsetY;
        //相对于原点的相应像素坐标
        var p = this._map.latLngToLayerPoint(latlng);

        //计算标注像素坐标
        var x = p.x + offsetX;
        var y = p.y + offsetY;

        //设置标注坐标为中心点(这样可以直接进行缩放与旋转而不用考虑其他因素，实现后通过还原画布不会影响其他效果)
        ctx.translate(x, y);

        //缩放比例不为1
        if (labelStyle.scale != 1) {
            ctx.scale(labelStyle.scale, labelStyle.scale);
        }

        //旋转角度不为0
        if (labelStyle.rotation != 0) {
            ctx.rotate(labelStyle.rotation);
        }

        // 碰撞检测
        var textWidth =
            ctx.measureText(labelStyle.text).width * labelStyle.scale;
        var textHeight = labelStyle.defaultHeight * labelStyle.scale;
        let minX, minY, maxX, maxY;

        //https://www.runoob.com/tags/canvas-textalign.html
        if (labelStyle.textAlign == "center") {
            minX = x - textWidth / 2;
            maxX = x + textWidth / 2;
        } else if (
            labelStyle.textAlign == "start" ||
            labelStyle.textAlign == "left"
        ) {
            minX = x;
            maxX = x + textWidth;
        } else if (
            labelStyle.textAlign == "end" ||
            labelStyle.textAlign == "right"
        ) {
            minX = x - textWidth;
            maxX = x;
        } else {
            console.error(
                "textAlign的值必须是start，end，left，center，right中的一个！"
            );
        }

        //https://www.runoob.com/tags/canvas-textBaseline.html
        if (labelStyle.textBaseline == "middle") {
            minY = y - textHeight / 2;
            maxY = y + textHeight / 2;
        } else if (
            labelStyle.textBaseline == "top" ||
            labelStyle.textBaseline == "hanging"
        ) {
            minY = y;
            maxY = y + textHeight;
        } else if (
            labelStyle.textBaseline == "bottom" ||
            labelStyle.textBaseline == "alphabetic"
        ) {
            minY = y - textHeight;
            maxY = y;
        } else {
            console.error(
                "textBaseline的值必须是middle，top，hanging，bottom，alphabetic中的一个！"
            );
        }

        let textBounds = { minX, minY, maxX, maxY, layer };
        if (
            !(
                labelStyle.collisionFlg == true &&
                this._textBounds.collides(textBounds)
            )
        ) {
            //绘制标注
            ctx.strokeText(labelStyle.text, 0, 0);
            ctx.fillText(labelStyle.text, 0, 0);
            this._textBounds.insert(textBounds);
        }

        //还原画布样式
        ctx.restore();
    },
    /**
     * 执行侦听器
     */
    _executeListeners: function (event) {
        if (!this._textBounds) return;
        var me = this;
        var ret = this.getTextByEvent(event);
        if (ret && ret.length > 0) {
            me._map._container.style.cursor = "pointer";
            if (event.type === "click") {
                me._onClickListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }
            if (event.type === "mousemove") {
                me._onHoverListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }
            if (event.type === "mousedown") {
                me._onMouseDownListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }

            if (event.type === "mouseup") {
                me._onMouseUpListeners.forEach(function (listener) {
                    listener(event, ret);
                });
            }
        } else {
            me._map._container.style.cursor = "";
        }
    },
    /**
     * 添加click侦听器
     */
    addOnClickListener: function (listener) {
        this._onClickListeners.push(listener);
    },

    /**
     * 添加hover侦听器
     */
    addOnHoverListener: function (listener) {
        this._onHoverListeners.push(listener);
    },

    /**
     * 添加mousedown侦听器
     */
    addOnMouseDownListener: function (listener) {
        this._onMouseDownListeners.push(listener);
    },

    /**
     * 添加mouseup侦听器
     */
    addOnMouseUpListener: function (listener) {
        this._onMouseUpListeners.push(listener);
    },
    getTextByEvent(event){
        var x = event.layerPoint.x;
        var y = event.layerPoint.y;

        var ret = this._textBounds.search({
            minX: x,
            minY: y,
            maxX: x,
            maxY: y,
        });
        return ret;
    }
}));

var canvasLabel = (L.canvasLabel = function (options) {
    return new L.CanvasLabel(options);
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=Leaflet.canvaslabel.js.map