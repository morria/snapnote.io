define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/StageObject',
    'io/snapnote/graphics/tools/rectangle/Handles'],
  function(_, Easel, StageObject, Handles) {

    var RADIUS = 2;
    var STROKE_WIDTH = 2;

    var Rectangle = function(width, height) {
        this.initialize(width, height);
    }

    Rectangle.prototype = _.extend(new StageObject('Rectangle'), {
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
            if (this.rectangle) {
                this.content.removeChildAt(0);
            }

            this.rectangle = new Easel.Shape();

            if (this._width < 0) {
                this._width = 0;
            }

            if (this._height < 0) {
                this._height = 0;
            }

            // Border
            this.rectangle.graphics
                .setStrokeStyle(STROKE_WIDTH, 1, 'round')
                .beginStroke('rgba(180, 180, 180, 0.8)')
                .drawRoundRect(0, 0, this._width, this._height, RADIUS)
                .endStroke();

            // Body
            this.rectangle.graphics
                .beginFill('rgba(255, 255, 255, 0.5)')
                .drawRoundRect(0, 0, this._width, this._height, RADIUS);

            this.content.addChildAt(this.rectangle, 0);
        }
    });

    var initialize =
        Rectangle.prototype.initialize;

    Rectangle.prototype.initialize = function(width, height) {
        initialize.call(this);

        // Initialize the graphic and its dimensions
        this.rectangle = null;
        this.setWidth(width);
        this.setHeight(height);

        // Draw the rectangle
        this.redraw();

        // Draw handles on top of the rectangle
        this.handles.addChild(new Handles());
    }

    return Rectangle;
  }
);
