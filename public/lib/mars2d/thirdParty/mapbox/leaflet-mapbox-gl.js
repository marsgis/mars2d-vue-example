// import mapboxgl from 'mapbox-gl'

let DEF_OPTIONS = {
  updateInterval: 32,
  padding: 0.1,
  interactive: false,
  pane: 'overlayPane'
}

class MapboxglLayer extends L.Layer {
  constructor(options = {}) {
    options = { ...DEF_OPTIONS, ...options }
    super(options)


    L.Util.stamp(this)
    this.options.id = this.options.id ?? createGuid()
    this.options.pid = this.options.pid ?? -1
    this.options.show = this.options.show ?? true
    this.options = options

    this.isTile = true
  }

  /**
   * 是否已添加到地图
   *
   * @type {Boolean}
   * @readonly
   *
   */
  get isAdded () {
    return this._map && this._map.hasLayer(this)
  }

  /**
   * 对象的pid标识
   *
   * @type {String|Number}
   */
  get pid () {
    return this.options.pid
  }

  set pid (pid) {
    this.options.pid = pid
  }

  /**
   * 对象的id标识
   *
   * @type {String|Number}
   */
  get id () {
    return this.options.id
  }

  set id (id) {
    this.options.id = id
  }

  /**
   * 名称 标识
   *
   * @type {String}
   */
  get name () {
    return this.options.name
  }

  set name (name) {
    this.options.name = name
  }



  initialize (options = {}) {
    L.setOptions(this, options);

    if (options.accessToken) {
      mapboxgl.accessToken = options.accessToken;
    }

    // setup throttling the update event when panning
    this._throttledUpdate = L.Util.throttle(this._update, this.options.updateInterval, this);
  }

  onAdd (map) {
    if (!this._container) {
      this._initContainer();
    }

    var paneName = this.getPaneName();
    map.getPane(paneName).appendChild(this._container);

    this._initGL();

    this._offset = this._map.containerPointToLayerPoint([0, 0]);

    // work around https://github.com/mapbox/mapbox-gl-leaflet/issues/47
    if (map.options.zoomAnimation) {
      L.DomEvent.on(map._proxy, L.DomUtil.TRANSITION_END, this._transitionEnd, this);
    }

    map._addZoomLimit(this);

    // 绑定事件
    map.on(mars2d.EventType.movestart, this.map_clickStartHandler, this)
  }

  onRemove (map) {
    this._map.off(mars2d.EventType.movestart, this.map_clickStartHandler, this)
    if (this._map._proxy && this._map.options.zoomAnimation) {
      L.DomEvent.off(this._map._proxy, L.DomUtil.TRANSITION_END, this._transitionEnd, this);
    }
    var paneName = this.getPaneName();
    map.getPane(paneName).removeChild(this._container);
  }

  map_clickStartHandler (event) {
    this._glMap.dragPan.disable()
    this._glMap.scrollZoom.disable()
  }

  getEvents () {
    return {
      move: this._throttledUpdate, // sensibly throttle updating while panning
      zoomanim: this._animateZoom, // applys the zoom animation to the <canvas>
      zoom: this._pinchZoom, // animate every zoom event for smoother pinch-zooming
      zoomstart: this._zoomStart, // flag starting a zoom to disable panning
      zoomend: this._zoomEnd,
      resize: this._resize
    };
  }

  getMapboxMap () {
    return this._glMap;
  }

  getCanvas () {
    return this._glMap.getCanvas();
  }

  getSize () {
    return this._map.getSize().multiplyBy(1 + this.options.padding * 2);
  }

  getBounds () {
    var halfSize = this.getSize().multiplyBy(0.5);
    var center = this._map.latLngToContainerPoint(this._map.getCenter());
    return L.latLngBounds(
      this._map.containerPointToLatLng(center.subtract(halfSize)),
      this._map.containerPointToLatLng(center.add(halfSize))
    );
  }

  getContainer () {
    return this._container;
  }

  // returns the pane name set in options if it is a valid pane, defaults to tilePane
  getPaneName () {
    return this._map.getPane(this.options.pane) ? this.options.pane : 'tilePane';
  }

  _initContainer () {
    var container = this._container = L.DomUtil.create('div', 'leaflet-gl-layer');

    var size = this.getSize();
    var offset = this._map.getSize().multiplyBy(this.options.padding);
    container.style.width = size.x + 'px';
    container.style.height = size.y + 'px';

    var topLeft = this._map.containerPointToLayerPoint([0, 0]).subtract(offset);

    L.DomUtil.setPosition(container, topLeft);
  }
  _initGL () {
    var center = this._map.getCenter();

    var options = L.extend({}, this.options, {
      container: this._container,
      center: [center.lng, center.lat],
      zoom: this._map.getZoom() - 1,
      attributionControl: false
    });

    if (!this._glMap) {
      this._glMap = new mapboxgl.Map(options);
      this._glMap.on("load", this._glMap_onLoadHander, this)
    }
    else {
      this._glMap.setCenter(options.center);
      this._glMap.setZoom(options.zoom);
    }

    // allow GL base map to pan beyond min/max latitudes
    this._glMap.transform.latRange = null;
    this._transformGL(this._glMap);

    if (this._glMap._canvas.canvas) {
      // older versions of mapbox-gl surfaced the canvas differently
      this._glMap._actualCanvas = this._glMap._canvas.canvas;
    } else {
      this._glMap._actualCanvas = this._glMap._canvas;
    }

    // treat child <canvas> element like L.ImageOverlay
    var canvas = this._glMap._actualCanvas;
    L.DomUtil.addClass(canvas, 'leaflet-image-layer');
    L.DomUtil.addClass(canvas, 'leaflet-zoom-animated');
    if (this.options.interactive) {
      L.DomUtil.addClass(canvas, 'leaflet-interactive');
    }
    if (this.options.className) {
      L.DomUtil.addClass(canvas, this.options.className);
    }
  }

  _glMap_onLoadHander (e) {
    if(!this.options)return

    if (this.options.source) {
      for (let key in this.options.source) {
        this._glMap.addSource(key, this.options.source[key])
      }
    }
    if (this.options.layers) {
      this.options.layers.forEach(layer => {
        this._glMap.addLayer(layer)
      });
    }

    this.fire("load", e)
  }

  _update (e) {
    if (!this._map) {
      return;
    }
    // update the offset so we can correct for it later when we zoom
    this._offset = this._map.containerPointToLayerPoint([0, 0]);

    if (this._zooming) {
      return;
    }

    var size = this.getSize(),
      container = this._container,
      gl = this._glMap,
      offset = this._map.getSize().multiplyBy(this.options.padding),
      topLeft = this._map.containerPointToLayerPoint([0, 0]).subtract(offset);

    L.DomUtil.setPosition(container, topLeft);

    this._transformGL(gl);

    var x_round = Math.round(size.x), y_round = Math.round(size.y);

    if (Math.round(gl.transform.width) !== x_round || Math.round(gl.transform.height) !== y_round) {
      container.style.width = x_round + 'px';
      container.style.height = y_round + 'px';
      if (gl._resize !== null && gl._resize !== undefined) {
        gl._resize();
      } else {
        gl.resize();
      }
    } else {
      // older versions of mapbox-gl surfaced update publicly
      if (gl._update !== null && gl._update !== undefined) {
        gl._update();
      } else {
        gl.update();
      }
    }
  }

  _transformGL (gl) {
    var center = this._map.getCenter();

    // gl.setView([center.lat, center.lng], this._map.getZoom() - 1, 0);
    // calling setView directly causes sync issues because it uses requestAnimFrame

    var tr = gl.transform;
    tr.center = mapboxgl.LngLat.convert([center.lng, center.lat]);
    tr.zoom = this._map.getZoom() - 1;
  }

  // update the map constantly during a pinch zoom
  _pinchZoom (e) {
    this._glMap.jumpTo({
      zoom: this._map.getZoom() - 1,
      center: this._map.getCenter()
    });
  }

  // borrowed from L.ImageOverlay
  // https://github.com/Leaflet/Leaflet/blob/master/src/layer/ImageOverlay.js#L139-L144
  _animateZoom (e) {
    var scale = this._map.getZoomScale(e.zoom);
    var padding = this._map.getSize().multiplyBy(this.options.padding * scale);
    var viewHalf = this.getSize()._divideBy(2);
    // corrections for padding (scaled), adapted from
    // https://github.com/Leaflet/Leaflet/blob/master/src/map/Map.js#L1490-L1508
    var topLeft = this._map.project(e.center, e.zoom)
      ._subtract(viewHalf)
      ._add(this._map._getMapPanePos()
        .add(padding))._round();
    var offset = this._map.project(this._map.getBounds().getNorthWest(), e.zoom)
      ._subtract(topLeft);

    L.DomUtil.setTransform(
      this._glMap._actualCanvas,
      offset.subtract(this._offset),
      scale
    );
  }

  _zoomStart (e) {
    this._zooming = true;
  }

  _zoomEnd () {
    var scale = this._map.getZoomScale(this._map.getZoom());

    L.DomUtil.setTransform(
      this._glMap._actualCanvas,
      // https://github.com/mapbox/mapbox-gl-leaflet/pull/130
      null,
      scale
    );

    this._zooming = false;

    this._update();
  }

  _transitionEnd (e) {
    L.Util.requestAnimFrame(function () {
      var zoom = this._map.getZoom();
      var center = this._map.getCenter();
      var offset = this._map.latLngToContainerPoint(
        this._map.getBounds().getNorthWest()
      );

      // reset the scale and offset
      L.DomUtil.setTransform(this._glMap._actualCanvas, offset, 1);

      // enable panning once the gl map is ready again
      this._glMap.once('moveend', L.Util.bind(function () {
        this._zoomEnd();
      }, this));

      // update the map position
      this._glMap.jumpTo({
        center: center,
        zoom: zoom - 1
      });
    }, this);
  }

  _resize (e) {
    this._transitionEnd(e);
  }
}

// 注册下
mars2d.LayerUtil.register("mapboxgl", MapboxglLayer)


