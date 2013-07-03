define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/square/Handles'],
  function(_, Easel, StageObject, Handles, Handle) {

    var RADIUS = 4;
    var STROKE_WIDTH = 2;

    var Square = function(width, height) {
        this.initialize();

        // Initialize the graphic and its dimensions
        this.square = null;
        this.setWidth(width);
        this.setHeight(height);

        // Draw the square
        this.redraw();

        // Draw handles on top of the square
        this.addChild(new Handles());

    }

    Square.prototype = _.extend(new StageObject('Square'), {
        getWidth: function() {
            return this._width;
        },

        setWidth: function(width) {
            this._width = width;
            this.redraw();
        },

        getHeight: function() {
            return this._height;
        },

        setHeight: function(height) {
            this._height = height;
            this.redraw();
        },

        redraw: function() {
            if (this.square) {
                this.removeChild(this.square);
            }

            this.square = new Easel.Shape();

            if (this._width < 0) {
                this._width = 0;
            }

            if (this._height < 0) {
                this._height = 0;
            }

            // Border
            this.square.graphics
                .setStrokeStyle(STROKE_WIDTH)
                .beginStroke('rgba(160, 160, 160, 0.9)')
                .drawRoundRect(0, 0, this._width, this._height, RADIUS)
                .endStroke();

            // Body
            this.square.graphics
                .beginFill('rgba(255, 255, 255, 0.01)')
                .drawRoundRect(0, 0, this._width, this._height, RADIUS);

            this.addChild(this.square);
        }

    });

    return Square;
  }
);
