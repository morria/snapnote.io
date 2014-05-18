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

    Label.prototype = _.extend(new Text(), {
      /**
       * @property name
       * @type String
       */
      name: 'Label',

      /**
       * @property padding
       * @type Number
       */
      padding: PADDING,

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
        * @property boundingBox
        * @type Number
        * Returns the top, right, bottom and left positions
        * of the stage object
        */
      getBoundingBox: function() {
        var height = (this.height + 4*PADDING + STROKE_WIDTH) * this.scale;
        var width = (this.width + STROKE_WIDTH) * this.scale;

        var pinSize = (40 * this.scale);

        if (this.direction == Direction.SOUTH) {
          return {
            top: this.y,
            left: this.x,
            bottom: this.y + height + pinSize,
            right: this.x + width
          };
        } else if (this.direction == Direction.EAST) {
          return {
            top: this.y,
            left: this.x,
            bottom: this.y + height,
            right: this.x + width + pinSize
          };
        } else if (this.direction == Direction.NORTH) {
          return {
            top: this.y - pinSize,
            left: this.x,
            bottom: this.y + height,
            right: this.x + width
          };
        } else if (this.direction == Direction.WEST) {
          return {
            top: this.y,
            left: this.x - pinSize,
            bottom: this.y + height,
            right: this.x + width
          };
        }

        throw new String("Unknown direction " + this.direction);
      },

      /**
       * A CSS color
       *
       * @prooperty color
       * @type String
       */
      setColor: function(color) {
        this._color = color;

        this._editableText.color = '#fff';

        if (color == 'rgb(255, 255, 255)') {
          this._editableText.color = '#555';
        } else if (color == 'rgb(241, 196, 15)') {
          this._editableText.color = '#333';
        }

        this.shadow = null;
        this.content.shadow = null;
        this._editableText.shadow = null;

        this.update();
      },

      /**
        * Redraw the rectangle with current
        * parameters
        */
      update: function() {
        // Draw the box around the text
        this._labelShape.graphics.clear();

        // Move the text to be more well centered
        this._editableText.set({
          x: PADDING,
          y: PADDING - (this._editableText.lineHeight * 0.15)
        });

        // Draw the pointer in the label's direction
        switch(this.direction) {
          case Direction.NORTH: this.updateNorth(); break;
          case Direction.EAST: this.updateEast(); break;
          case Direction.SOUTH: this.updateSouth(); break;
          case Direction.WEST: this.updateWest(); break;
        }

        // Add the shadow
        this._labelShape.shadow = this.shadow;
      },

      updateNorth: function() {
        // curve dimensions
        var c = { w: 40, h: 40 };

        // Width and Height of the label background
        var width = Math.max(this._textWidth + (2*PADDING), c.w + 2*PADDING);
        var height = Math.max(this._textHeight + (2*PADDING), this._editableText.lineHeight);

        // Origin point of arrow
        var p = {
          x: PADDING + (width - (2*PADDING))/2 - c.w/2,
          y: 0
        };

        // Functions for getting the offset within a coordinate system
        // that I'm capable of groking
        var _x = function(divisor) { return p.x + (c.w/(40/divisor)); }
        var _y = function(divisor) { return p.y - (c.h/(40/divisor)); }

        // Draw the box around the label
        this._labelShape.graphics
          .beginFill(this.color)
          .moveTo(p.x, p.y)
          .bezierCurveTo(_x(06), _y(01), _x(10), _y(10), _x(10), _y(10))
          .bezierCurveTo(_x(14), _y(19), _x(18), _y(39), _x(19), _y(40))
          .bezierCurveTo(_x(20), _y(41), _x(20), _y(41), _x(21), _y(40))
          .bezierCurveTo(_x(22), _y(39), _x(26), _y(19), _x(30), _y(10))
          .bezierCurveTo(_x(34), _y(01), _x(40), _y(00), _x(40), _y(00))
          .drawRoundRect(0, 0, width, height, RADIUS)
          .endFill();

        this._width = width;
        this._height = p.y + c.h;
      },

      updateSouth: function() {
        // curve dimensions
        var c = { w: 40, h: 40 };

        // Width and Height of the label background
        var width = Math.max(this._textWidth + (2*PADDING), c.w + 2*PADDING);
        var height = Math.max(this._textHeight + (2*PADDING), this._editableText.lineHeight);

        // Functions for getting the offset within a coordinate system
        // that I'm capable of groking
        var p = {
          x: PADDING + (width - (2*PADDING))/2 - c.w/2,
          y: PADDING + this._textHeight + (PADDING)
        };

        var _x = function(divisor) { return p.x + (c.w/(40/divisor)); }
        var _y = function(divisor) { return p.y + (c.h/(40/divisor)); }

        this._labelShape.graphics
          .beginFill(this.color)
          .moveTo(p.x, p.y)
          .bezierCurveTo(_x(06), _y(01), _x(10), _y(10), _x(10), _y(10))
          .bezierCurveTo(_x(14), _y(19), _x(18), _y(39), _x(19), _y(40))
          .bezierCurveTo(_x(20), _y(41), _x(20), _y(41), _x(21), _y(40))
          .bezierCurveTo(_x(22), _y(39), _x(26), _y(19), _x(30), _y(10))
          .bezierCurveTo(_x(34), _y(01), _x(40), _y(00), _x(40), _y(00))
          .drawRoundRect(0, 0, width, height, RADIUS)
          .endFill();

        this._width = width;
        this._height = p.y + c.h;
      },

      updateEast: function() {
        // curve dimensions
        var c = { w: 38, h: (this._editableText.lineHeight + (1.3*PADDING)) };

        // Width and Height of the label background
        var width = Math.max(this._textWidth + (2*PADDING), c.w + 2*PADDING);
        var height = Math.max(this._textHeight + (2*PADDING), this._editableText.lineHeight);

        var p = {
          x: this._textWidth + (2*PADDING),
          y: PADDING + (this._textHeight/2) - (c.h/2)
        };

        var _x = function(divisor) { return p.x + (c.w/(40/divisor)); }
        var _y = function(divisor) { return p.y + (c.h/(40/divisor)); }

        this._labelShape.graphics
          .beginFill(this.color)
          .moveTo(p.x, p.y)
          .bezierCurveTo(_x(00), _y(00), _x(01), _y(06), _x(10), _y(10))
          .bezierCurveTo(_x(19), _y(14), _x(38), _y(17), _x(40), _y(18))
          .bezierCurveTo(_x(42), _y(19), _x(42), _y(21), _x(40), _y(22))
          .bezierCurveTo(_x(38), _y(23), _x(19), _y(26), _x(10), _y(30))
          .bezierCurveTo(_x(01), _y(34), _x(00), _y(40), _x(00), _y(40))
          .drawRoundRect(0, 0, width, height, RADIUS)
          .endFill();

        this._width = p.x + c.w;
        this._height = height;
      },

      updateWest: function() {
        // curve dimensions
        var c = { w: 38, h: (this._editableText.lineHeight + (1.3*PADDING)) };

        // Width and Height of the label background
        var width = Math.max(this._textWidth + (2*PADDING), c.w + 2*PADDING);
        var height = Math.max(this._textHeight + (2*PADDING), this._editableText.lineHeight);

        var p = {
          x: 0,
          y: PADDING + (this._textHeight/2) - (c.h/2)
        };

        var _x = function(divisor) { return p.x - (c.w/(40/divisor)); }
        var _y = function(divisor) { return p.y + (c.h/(40/divisor)); }

        this._labelShape.graphics
          .beginFill(this.color)
          .moveTo(p.x, p.y)
          .bezierCurveTo(_x(00), _y(00), _x(01), _y(06), _x(10), _y(10))
          .bezierCurveTo(_x(19), _y(14), _x(38), _y(17), _x(40), _y(18))
          .bezierCurveTo(_x(42), _y(19), _x(42), _y(21), _x(40), _y(22))
          .bezierCurveTo(_x(38), _y(23), _x(19), _y(26), _x(10), _y(30))
          .bezierCurveTo(_x(01), _y(34), _x(00), _y(40), _x(00), _y(40))
          .drawRoundRect(0, 0, width, height, RADIUS)
          .endFill();

        this._width = this._textWidth + (2*PADDING);
        this._height = height;
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

      this.snapToPixel = true;
    }

    return Label;
  }
);
