define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/rectangle/Handles'],
  function(_, Easel, StageObject, Handles) {

    var RADIUS = 2;
    var STROKE_WIDTH = 8;

    var Rectangle = function(width, height) {
        this.initialize(width, height);
    }

    Rectangle.prototype = _.extend(new StageObject('Rectangle'), {

        /**
         * @property width
         * @type Number
         */
        getWidth: function() { return this._width; },
        setWidth: function(width) {
          this._width = Math.max(width, 0);
          this._update();
        },

        /**
         * @property height
         * @type Number
         */
        getHeight: function() { return this._height; },
        setHeight: function(height) {
          this._height = Math.max(height, 0);
          this._update();
        },

        /**
         * Redraw the rectangle with current
         * parameters
         */
        _update: function() {
          this._rectangle.graphics
            .clear()
            .setStrokeStyle(STROKE_WIDTH, 1, 'round')
            .beginStroke('rgba(100, 100, 100, 1.0)')
            .drawRoundRect(0, 0, this._width, this._height, RADIUS)
            .endStroke()
            .beginFill('rgba(255, 255, 255, 0.01)')
            .drawRoundRect(0, 0, this._width, this._height, RADIUS);
        }
    });

    var initialize =
        Rectangle.prototype.initialize;

    Rectangle.prototype.initialize = function(width, height) {
      initialize.call(this);

      this._width = 0;
      this._height = 0;

      this.__defineGetter__('width', _.bind(this.getWidth, this));
      this.__defineSetter__('width', _.bind(this.setWidth, this));
      this.__defineGetter__('height', _.bind(this.getHeight, this));
      this.__defineSetter__('height', _.bind(this.setHeight, this));

      this._rectangle = new Easel.Shape();
      this.content.addChild(this._rectangle);

      this.handles.addChild(new Handles());

      this.width = width;
      this.height = height;
    }

    return Rectangle;
  }
);
