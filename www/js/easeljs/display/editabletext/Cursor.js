define(['Underscore', 'Easel'], function(_, Easel) {

  var Cursor = function(lineHeight, strokeWidth, color) {
    this.initialize(lineHeight, strokeWidth, color);
  }

  Cursor.prototype = _.extend(new Easel.Container(), {

    /**
     * The name of the element for use in toString()
     *
     * @property name
     * @type String
     */
    name: 'Cursor',

    /**
     * The color to draw the text in. Any valid
     * value for the CSS color attribute is
     * acceptable (ex. "#F00"). Default is "#000".
     *
     * @property color
     * @type String
     */
    getColor: function() { return this._color; },
    setColor: function(color) {
      this._color = color;
      this._redraw();
    },

    /**
     * Indicates the line height (vertical distance between
     * baselines) for multi-line text.
     *
     * @property lineHeight
     * @type Number
     */
    getLineHeight: function() { return this._lineHeight; },
    setLineHeight: function(lineHeight) {
      this._lineHeight = lineHeight;
      this._redraw();
    },

    /**
     * @property strokeWidth
     * @type Number
     */
    getStrokeWidth: function() { return this._strokeWidth; },
    setStrokeWidth: function(strokeWidth) {
      this._strokeWidth = strokeWidth;
      this._redraw();
    },

    /**
     * @property visible
     * @type Boolean
     */
    getVisible: function() { return this._visible; },
    setVisible: function(visible) {
      this._visible = visible;
      if (this._visible) {
        this._flashInterval =
          setInterval(_.bind(function() {
            if (!this.getStage()) {
              return;
              console.error(
                'The EditableText Cursor must be ' +
                'set to visible=false before removing ' +
                'from the stage', this);
              return;
            }
            this.glyph.visible = !this.glyph.visible;
            this.getStage().update();
          }, this), 500);
      } else {
        clearInterval(this._flashInterval);
      }
    },

    /**
     * Redraw the cursor glyph
     */
    _redraw: function() {
      this.glyph.graphics
        .clear()
        .setStrokeStyle(this.strokeWidth, 1, 'round')
        .beginStroke(this.color)
        .moveTo(0, this.lineHeight * 0.1)
        .lineTo(0, this.lineHeight)
        .endStroke();
    }
  });

  var initialize = Cursor.prototype.initialize;
  Cursor.prototype.initialize = function(lineHeight, strokeWidth, color) {
    initialize.call(this);

    this._lineHeight = 0;
    this._strokeWidth = 0;
    this._color = '#000';
    this._visible = null;
    this._flashInterval = null;

    // Add a shape to the stage the holds the image
    // of the cursor. It is added as a child so that
    // we can independently control visibility of the
    // cursor and the visibility of the flashed glyph
    this.glyph = new Easel.Shape();
    this.addChild(this.glyph);

    // Create some functional getters and setters
    this.__defineGetter__('lineHeight', _.bind(this.getLineHeight, this));
    this.__defineSetter__('lineHeight', _.bind(this.setLineHeight, this));
    this.__defineGetter__('strokeWidth', _.bind(this.getStrokeWidth, this));
    this.__defineSetter__('strokeWidth', _.bind(this.setStrokeWidth, this));
    this.__defineGetter__('color', _.bind(this.getColor, this));
    this.__defineSetter__('color', _.bind(this.setColor, this));
    this.__defineGetter__('visible', _.bind(this.getVisible, this));
    this.__defineSetter__('visible', _.bind(this.setVisible, this));

    // Set the passed in parameters to the fully
    // established setters
    this.lineHeight = lineHeight;
    this.strokeWidth = strokeWidth;
    this.color = color;
    this.visible = true;
  }

  return Cursor;
});
