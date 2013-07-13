define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/arrow/Handles'],
  function(_, Easel, StageObject, Handles) {

    var STROKE_WIDTH = 8;

    var Arrow = function(dx, dy, color) {
        this.initialize(dx, dy, color);
    }

    Arrow.prototype = _.extend(new StageObject(), {
      /**
       * @property name
       * @type String
       */
      name: 'Arrow',

      /**
       * @property dx
       * @type Number
       */
      getDx: function() { return this._dx; },
      setDx: function(dx) {
        this._dx = dx;
        this.width = Math.abs(dx);
        this.update();
      },

      /**
       * @property dy
       * @type Number
       */
      getDy: function() { return this._dy; },
      setDy: function(dy) {
        this._dy = dy;
        this.height = Math.abs(dy);
        this.update();
      },

      update: function() {
        // The angle of an arrow head
        var a1 =
          Math.atan(Math.abs((this._dx / this._dy)))
          * ((this._dx < 0) ? -1 : 1)
          * ((this._dy > 0) ? -1 : 1)
          + ((this._dy > 0) ? 0 : Math.PI)
          + (Math.PI/4);

        // The angle of the other arrow head
        var a2 = a1 + (Math.PI/2);

        // Draw the arrow
        this._arrow.graphics
          .clear()
          .setStrokeStyle(STROKE_WIDTH, 1)
          .beginStroke(this.color)
          .moveTo(0, 0).lineTo(this._dx, this._dy)
          .moveTo(0, 0).lineTo(Math.cos(a1)*30, Math.sin(a1)*30)
          .moveTo(0, 0).lineTo(Math.cos(a2)*30, Math.sin(a2)*30)
          .endStroke();

        this._arrow.shadow = this.shadow;
      }
    });

    var initialize = Arrow.prototype.initialize;
    Arrow.prototype.initialize = function(dx, dy, color) {
      initialize.call(this);

      Object.defineProperty(this, 'dx', {
        get: this.getDx.bind(this),
        set: this.setDx.bind(this)
      });
      Object.defineProperty(this, 'dy', {
        get: this.getDy.bind(this),
        set: this.setDy.bind(this)
      });

      this._arrow = new Easel.Shape();
      this.content.addChild(this._arrow);

      // Draw handles on top of the rectangle
      this.handles.addChild(new Handles());

      this.dx = dx ? dx : 50;
      this.dy = dy ? dy : 50;
      this.color = color ? color : '#000';
    }

    return Arrow;
  }
);
