define(['Underscore', 'Easel'],
  function(_, Easel) {

    var WIDTH = 13;
    var HEIGHT = 13;
    var RADIUS = 3;

    var Handle = function() {
      this.initialize();

      Object.defineProperty(this, 'scale', {
        get: this.getScale.bind(this),
        set: this.setScale.bind(this)
      });
      Object.defineProperty(this, 'width', {
        get: this.getWidth.bind(this),
        set: this.setWidth.bind(this)
      });
      Object.defineProperty(this, 'height', {
        get: this.getHeight.bind(this),
        set: this.setHeight.bind(this)
      });
      Object.defineProperty(this, 'radius', {
        get: this.getRadius.bind(this),
        set: this.setRadius.bind(this)
      });
      Object.defineProperty(this, 'deviceCanvasPixelRatio', {
        get: this.getDeviceCanvasPixelRatio.bind(this),
        set: this.setDeviceCanvasPixelRatio.bind(this)
      });

      this.update();

      // A lil' shadow
      this.shadow = new Easel.Shadow('#ccc', 0, 0, 1);

      /**
        * Handle Dragging
        */
      this.addEventListener('mousedown', _.bind(function(event) {
        var offset = {
          x: event.target.x - event.stageX,
          y: event.target.y - event.stageY
        };

        event.addEventListener('mousemove', _.bind(function(event) {
          this.dispatchEvent({
            type: 'move',
            delta: {
              x: (event.stageX + offset.x) - event.target.x,
              y: (event.stageY + offset.y) - event.target.y
            },
            stageX: event.stageX,
            stageY: event.stageY
          }, this);
          event.target.getStage().update();

          offset = {
            x: event.target.x - event.stageX,
            y: event.target.y - event.stageY
          };
        }, this));
      }, this));
    }

    // Extend Shape
    Handle.prototype = _.extend(new Easel.Shape(), {
      name: 'Handle',
      enableMouseOver: true,
      cursor: 'pointer',

      _deviceCanvasPixelRatio: 1.0,
      _width: WIDTH,
      _height: HEIGHT,
      _radius: RADIUS,

      update: function() {
        // Build the Body
        this.graphics
          .clear()
          .beginLinearGradientFill(["#fdfdfd","#dcdcdc"], [0, 1], 0, 0, 0, this.height)
          .drawRoundRect(0, 0, this.width, this.height, this.radius);

        // Build the Border
        this.graphics
          .beginStroke('#cecec3')
          .drawRoundRect(0, 0, this.width, this.height, this.radius)
          .endStroke();
      },

      /**
       * @property scale
       * @type Number
       */
      getScale: function() { return this.scaleX; },
      setScale: function(scale) {
        this.scaleX = scale;
        this.scaleY = Math.abs(scale);
        this.update();
      },

      /**
        * @property width
        * @type Number
        */
      getWidth: function() {
        return this._width * this.deviceCanvasPixelRatio;
      },
      setWidth: function(width) {
        this._width = Math.max(width, 0);
        this.update();
      },

      /**
        * @property height
        * @type Number
        */
      getHeight: function() {
        return this._height * this.deviceCanvasPixelRatio;
      },
      setHeight: function(height) {
        this._height = Math.max(height, 0);
        this.update();
      },

      /**
        * @property width
        * @type Number
        */
      getRadius: function() {
        return this._radius * this.deviceCanvasPixelRatio;
      },
      setRadius: function(radius) {
        this._radius = Math.max(radius, 0);
      },


      /**
       * The ratio of physical device pixels per canvas pixel. This
       * is how we account for retina displays.
       */
      getDeviceCanvasPixelRatio: function() {
        return this._deviceCanvasPixelRatio;
      },
      setDeviceCanvasPixelRatio: function(deviceCanvasPixelRatio) {
        // this.scale /= this._deviceCanvasPixelRatio;
        this._deviceCanvasPixelRatio = deviceCanvasPixelRatio;
        // this.scale *= this._deviceCanvasPixelRatio;
        this.update();
      }
    });

    return Handle;
  }
);
