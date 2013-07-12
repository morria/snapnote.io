define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/rectangle/Handles'],
  function(_, Easel, StageObject, Handles) {

    var RADIUS = 2;
    var STROKE_WIDTH = 8;

    var Rectangle = function(width, height, color) {
      this.initialize(width, height, color);
    }

    Rectangle.prototype = _.extend(new StageObject(), {
      /**
       * @property name
       * @type String
       */
      name: 'Rectangle',

      /**
        * Redraw the rectangle with current
        * parameters
        */
      update: function() {
        this._rectangle.graphics
          .clear()
          .setStrokeStyle(STROKE_WIDTH, 1, 'round')
          .beginStroke(this.color)
          .drawRoundRect(0, 0, this._width, this._height, RADIUS)
          .endStroke();
          /*
          .beginFill('rgba(255, 255, 255, 0.01)')
          .drawRoundRect(0, 0, this._width, this._height, RADIUS);
          */

        this._rectangle.shadow =
          new Easel.Shadow('#fff', 2, 2, 4);
      }
    });

    var initialize = Rectangle.prototype.initialize;
    Rectangle.prototype.initialize = function(width, height, color) {
      initialize.call(this);

      this._rectangle = new Easel.Shape();
      this.content.addChild(this._rectangle);

      this.handles.addChild(new Handles());

      this.width = width ? width : 50;
      this.height = height ? height : 50;
      this.color = color ? color : '#000';
    }

    return Rectangle;
  }
);
