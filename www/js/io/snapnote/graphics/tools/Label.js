define([
    'Underscore',
    'Easel',
    'io/snapnote/graphics/tools/Text',
    'io/snapnote/graphics/tools/label/Direction',
    'io/snapnote/graphics/tools/label/Handles',
    'easeljs/display/EditableText'],
  function(_, Easel, Text, Direction, Handles, EditableText) {

    var RADIUS = 4;
    var STROKE_WIDTH = 1;
    var PADDING = 10;

    var Label = function(text, font, color) {
      this.initialize(text, font, color);
    }

    Label.prototype = _.extend(new Text('initial'), {
      /**
       * @property name
       * @type String
       */
      name: 'Label',

      /**
        * @property width
        * @type Number
        */
      setWidth: function(width) {
        this._textWidth = Math.max(width, 0);
        this.update();
      },

      /**
        * @property height
        * @type Number
        */
      setHeight: function(height) {
        this._textHeight = Math.max(height, 0);
        this.update();
      },

      /**
       * @property direction
       * @type Direction
       */
      getDirection: function() { return this._direction; },
      setDirection: function(direction) {
        this._direction = direction;
        this.update();
      },

      /**
        * Redraw the rectangle with current
        * parameters
        */
      update: function() {
        // curve dimensions
        var c = { w: 40, h: 40 };

        // Width and Height of the label
        // background
        var width = Math.max(this._textWidth + (2*PADDING), c.w + 2*PADDING);
        var height = Math.max(this._textHeight + (2*PADDING), this._editableText.lineHeight);

        this._labelShape.graphics.clear();

        this._editableText.set({
          x: PADDING,
          y: PADDING - (this._editableText.lineHeight * 0.15)
        });

        // The Box
        this._labelShape.graphics
          .beginFill(this.color)
          .drawRoundRect(
              0,
              0,
              width,
              height,
              RADIUS);

        // The Point
        if (this.direction == Direction.SOUTH) {
          var p = {
            x: PADDING + (width - (2*PADDING))/2 - c.w/2,
            y: PADDING + this._textHeight + (PADDING)
          };

          var offX = function(divisor) { return p.x + (c.w/divisor); }
          var offY = function(divisor) { return p.y + (c.h/divisor); }

          this._labelShape.graphics
            .moveTo(p.x, p.y)
            .bezierCurveTo(offX(40/06), offY(40/01), offX(40/10), offY(40/10), offX(40/10), offY(40/10))
            .bezierCurveTo(offX(40/14), offY(40/19), offX(40/18), offY(40/39), offX(40/19), offY(40/40))
            .bezierCurveTo(offX(40/20), offY(40/41), offX(40/20), offY(40/41), offX(40/21), offY(40/40))
            .bezierCurveTo(offX(40/22), offY(40/39), offX(40/26), offY(40/19), offX(40/30), offY(40/10))
            .bezierCurveTo(offX(40/34), offY(40/01), offX(40/40), offY(40/00), offX(40/40), offY(40/00))
            .endFill();

          this._width = width;
          this._height = p.y + c.h;

        } else if (this.direction == Direction.EAST) {
          this._labelShape.graphics
            .endFill();
        } else if (this.direction == Direction.NORTH) {
          var p = {
            x: PADDING + (width - (2*PADDING))/2 - c.w/2,
            y: 0
          };

          var offX = function(divisor) { return p.x + (c.w/divisor); }
          var offY = function(divisor) { return p.y - (c.h/divisor); }

          this._labelShape.graphics
            .moveTo(p.x, p.y)
            .bezierCurveTo(offX(40/06), offY(40/01), offX(40/10), offY(40/10), offX(40/10), offY(40/10))
            .bezierCurveTo(offX(40/14), offY(40/19), offX(40/18), offY(40/39), offX(40/19), offY(40/40))
            .bezierCurveTo(offX(40/20), offY(40/41), offX(40/20), offY(40/41), offX(40/21), offY(40/40))
            .bezierCurveTo(offX(40/22), offY(40/39), offX(40/26), offY(40/19), offX(40/30), offY(40/10))
            .bezierCurveTo(offX(40/34), offY(40/01), offX(40/40), offY(40/00), offX(40/40), offY(40/00))
            .endFill();

          this._width = width;
          this._height = p.y + c.h;
        } else if (this.direction == Direction.WEST) {
          this._labelShape.graphics
            .endFill();
        }

        this._labelShape.shadow = this.shadow;
      }
    });

    var initialize = Label.prototype.initialize;
    Label.prototype.initialize = function(text, font, color) {
      this._labelShape = new Easel.Shape();
      this._direction = Direction.SOUTH;

      Object.defineProperty(this, 'direction', {
        get: this.getDirection.bind(this),
        set: this.setDirection.bind(this)
      });

      initialize.call(this, text, font, '#fff');
      this.content.addChildAt(this._labelShape, 0);

      this.handles.removeAllChildren();
      this.handles.addChild(new Handles());
    }

    return Label;
  }
);
