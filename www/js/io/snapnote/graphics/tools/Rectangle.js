define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/rectangle/Handles'],
  function(_, Easel, StageObject, Handles) {

    var RADIUS = 2;
    var STROKE_WIDTH = 6;

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
        * @property boundingBox
        * @type Number
        * Returns the top, right, bottom and left positions
        * of the stage object
        */
      getBoundingBox: function() {
        return {
          top: this.y - (STROKE_WIDTH/2),
          left: this.x - (STROKE_WIDTH/2),
          bottom: this.y + (this.height * this.scale) + (STROKE_WIDTH/2),
          right: this.x + (this.width * this.scale) + (STROKE_WIDTH/2)
        };
      },

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
        this._rectangle.shadow = this.shadow;
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
