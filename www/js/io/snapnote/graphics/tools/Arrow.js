define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/arrow/Handles'],
  function(_, Easel, StageObject, Handles) {

    var STROKE_WIDTH = 15;

    var Arrow = function(dx, dy) {
        this.initialize(dx, dy);
    }

    Arrow.prototype = _.extend(new StageObject('Arrow'), {
      /**
       * @property dx
       * @type Number
       */
      getDx: function() { return this._dx; },
      setDx: function(dx) {
        this._dx = dx;
        this._update();
      },

      /**
       * @property dy
       * @type Number
       */
      getDy: function() { return this._dy; },
      setDy: function(dy) {
        this._dy = dy;
        this._update();
      },

      _update: function() {
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
          .setStrokeStyle(STROKE_WIDTH, 1, 'round')
          .beginStroke('rgba(100, 100, 100, 1.0)')
          .moveTo(0, 0).lineTo(this._dx, this._dy)
          .moveTo(0, 0).lineTo(Math.cos(a1)*30, Math.sin(a1)*30)
          .moveTo(0, 0).lineTo(Math.cos(a2)*30, Math.sin(a2)*30)
          .endStroke();
      }
    });

    var initialize =
        Arrow.prototype.initialize;

    Arrow.prototype.initialize = function(dx, dy) {
      initialize.call(this);

      this.__defineGetter__('dx', _.bind(this.getDx, this));
      this.__defineSetter__('dx', _.bind(this.setDx, this));
      this.__defineGetter__('dy', _.bind(this.getDy, this));
      this.__defineSetter__('dy', _.bind(this.setDy, this));

      this._arrow = new Easel.Shape();
      this.content.addChild(this._arrow);

      // Draw handles on top of the rectangle
      this.handles.addChild(new Handles());

      this.dx = dx;
      this.dy = dy;
    }

    return Arrow;
  }
);
