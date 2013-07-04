define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/arrow/Handles'],
  function(_, Easel, StageObject, Handles) {

    var RADIUS = 2;
    var STROKE_WIDTH = 20;

    var Arrow = function(dx, dy) {
        this.initialize(dx, dy);
    }

    Arrow.prototype = _.extend(new StageObject('Arrow'), {
        getDx: function() {
            return this._dx;
        },

        setDx: function(dx) {
            this._dx = dx;
            this.redraw();
        },

        getDy: function() {
            return this._dy;
        },

        setDy: function(dy) {
            this._dy = dy;
            this.redraw();
        },

        redraw: function() {
            if (this.arrow) {
                this.content.removeChildAt(0);
            }

            this.arrow = new Easel.Shape();

            // Shaft
            this.arrow.graphics
                .setStrokeStyle(STROKE_WIDTH, 1, 'round')
                .beginStroke('rgba(0, 0, 0, 0.8)')
                .moveTo(0, 0)
                .lineTo(this._dx, this._dy)
                .moveTo(0, 0)
                .lineTo(0, 30)
                .moveTo(0, 0)
                .lineTo(30, 0)
                .endStroke();

            this.content.addChildAt(this.arrow, 0);
        }
    });

    var initialize =
        Arrow.prototype.initialize;

    Arrow.prototype.initialize = function(dx, dy) {
        initialize.call(this);

        // Initialize the graphic and its dimensions
        this.arrow = null;
        this.setDx(dy);
        this.setDy(dy);

        // Draw the rectangle
        this.redraw();

        // Draw handles on top of the rectangle
        this.handles.addChild(new Handles());
    }

    return Arrow;
  }
);
