define([
    'Underscore',
    'Easel'],
  function(_, Easel) {

    var STROKE_WIDTH = 2;

    var Cursor = function(lineHeight) {
        this.initialize(lineHeight);
    }

    Cursor.prototype = _.extend(new Easel.Container(), {
        setVisible: function(visible) {
            this.visible = visible;

            if (visible) {
                this.interval =
                    setInterval(_.bind(function() {
                        if (this.visible) {
                            this.glyph.visible = !this.glyph.visible;
                            this.getStage().update();
                        }
                    }, this), 500);
            } else {
                clearInterval(this.interval);
            }
        },
    });

    var initialize = Cursor.prototype.initialize;
    Cursor.prototype.initialize = function(lineHeight) {

        initialize.call(this);
        this.name = "Cursor";

        this.glyph = new Easel.Shape();
        this.addChild(this.glyph);

        this.glyph.graphics
          .setStrokeStyle(STROKE_WIDTH, 1, 'round')
          .beginStroke('#aaa')
          .moveTo(0, lineHeight * 0.1)
          .lineTo(0, lineHeight)
          .endStroke();

        this.interval = null;
    }

    return Cursor;
  }
);
