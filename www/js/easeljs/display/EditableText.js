define([
    'Underscore',
    'Easel',
    'easeljs/display/editabletext/Cursor',
    'easeljs/display/editabletext/Keys'],
  function(_, Easel, Cursor, Keys) {

  // The number of pixels from the right of a
  // character that the cursor should appear
  var CURSOR_NUDGE = 0.5;

  // The width of the cursor
  var CURSOR_STROKE_WIDTH = 1;


  var EditableText = function(text, font, color) {
    this.initialize(text, font, color);
  }

  EditableText.prototype = _.extend(new Easel.Container(), {

    /**
     * @return String
     * The current value of the EditableText
     */
    getText: function() { return this._text; },

    /**
     * @param text:String
     * The value to set EditableText to
     *
     * @return void
     */
    setText: function(text) {
      this._text = text;

      // Propagate the text down to the actual text
      // renderer
      this._textDisplayObject.text = this._text;

      // Measure the text, saving the coordinates of each
      // glyph
      this._remeasureText();

      // Redraw the background to fit the new text dimensions
      this._background.graphics
        .clear()
        .beginFill('rgba(255, 255, 255, 0.008)')
        .drawRect(0, 0, this.width, this.height);

      // Force a recalculation of the cursor position
      this.position = this.position;

      // Pass the recalculated lineHeight off to the
      // cursor
      this._cursor.lineHeight = this.lineHeight;

      // Let the world know that we have new dimensions
      this.dispatchEvent({
          type: 'change',
          text: this.text,
          width: this.width,
          height: this.height,
          lineHeight: this.lineHeight,
        }, this);
    },

    /**
     * Set the editable state of the text
     *
     * @property editable
     * @type Boolean
     */
    getEditable: function() { return this._editable; },
    setEditable: function(editable) {
      this._editable = editable;
      if (this._editable) {
        this._enableEditing();
      } else {
        this._disableEditing();
      }
    },


    /**
     * The cursor position
     *
     * @property position
     * @type Int
     */
    getPosition: function() { return this._position; },
    setPosition: function(position) {
      this._position = position;

      var after = false;

      if (this._position >= this._coordinates.length) {
          position = this._coordinates.length - 1;
          this._position = position + 1;
          after = true;
      } else if (this._position < 0) {
          this._position = 0;
          position = 0;
      }

      if (!this._coordinates.hasOwnProperty(position)) {
        this._position = 0;
        this._cursor.set({ x: 0, y: 0 });
        return;
      }

      var coordinates =
        this._coordinates[position];


      this._cursor.x =
        coordinates.x + (after ? coordinates.dx : 0) + CURSOR_NUDGE;

      this._cursor.y = coordinates.y;
    },

    /**
     * The width in pixels of the EditableText
     *
     * @property width
     * @type Int
     */
    getWidth: function() { return this._width; },

    /**
     * The height in pixels of the EditableText
     *
     * @property height
     * @type Int
     */
    getHeight: function() { return this._height; },

    /**
     * The line height in pixels of the editable text
     *
     * @property lineHeight
     * @type Int
     */
    getLineHeight: function() { return this._lineHeight; },

    /**
     * Getter for font property
     *
     * @property font
     * @type String
     */
    getFont: function() { return this._textDisplayObject.font; },
    setFont: function(font) {
      this._textDisplayObject.font = font;
    },

    /**
     * The color to draw the text in. Any valid value for the
     * CSS color attribute is acceptable (ex. "#F00"). Default
     * is "#000".
     *
     * @property color
     * @type String
     */
    getColor: function() { return this._textDisplayObject.color; },
    setColor: function(color) {
      this._cursor.color = color;
      this._textDisplayObject.color = color;
    },

    /**
     * Enable the editing of the text
     *
     * @return void
     */
    _enableEditing: function() {
      this._cursor.visible = true;

      // Listen for keydown events on document, catching
      // the event before it bubbles to 'window', the
      // stage listener
      var keys = new Keys();
      $(document).unbind('keydown')
        .keydown(_.bind(function(event) {
        event.preventDefault();
        event.stopPropagation();

        // Map the event to changes to the text
        // and position
        var altered =
          keys.alterByEvent(
            this.text, this.position, event);

        if (this.text !== altered.text ||
            this.position !== altered.position) {
          // Update our representation of both
          this.text = altered.text;
          this.position = altered.position;

          // Update the stage
          this.getStage().update();
        }
      }, this));
    },

    /**
     * Disable the editing of the text
     *
     * @return void
     */
    _disableEditing: function() {
      this._cursor.visible = false;
      $(document).unbind('keydown');
    },

    /**
     * Remeasure the dimensions of the text
     *
     * @return void
     */
    _remeasureText: function() {
      // Reset all glyph coordinates
      this._coordinates = [];

      // Get the canvas context with the state of
      // the Text DisplayObject. This lets us measure glyph
      // sizes
      var context =
        this._textDisplayObject._getWorkingContext();

      // Cache a value for the line height
      this._lineHeight =
        this._textDisplayObject.getMeasuredLineHeight();

      // Reset some values so we can calculate new maxes
      this._width = 0;
      this._height = this._lineHeight;

      // The offset from the beginning of the line, kept up
      // to date as we encounter newline characters
      var dx = 0;

      // The offset from the top of the EditableText, kept
      // up to date as we encounter newline characters
      var dy = 0;

      var previousWidth = 0;
      for(var spanLength = 1; spanLength <= this._text.length; spanLength++) {
        // Get a subset of the characters
        var slice = this._text.slice(0, spanLength);

        // Measure the dimensions of the text for each
        // successive sub-string so that we can get sizes
        // for each individual glyph
        var currentWidth =
          context.measureText(slice).width;

        var character = this._text[spanLength - 1];

        // Push new coordinates for a seen character
        this._coordinates.push({
          x: previousWidth - dx,
          y: dy,
          dx: currentWidth - previousWidth,
          dy: this._lineHeight
        });

        // Save the maximum width of the text box
        this._width = Math.max(this._width, currentWidth - dx);

        // Save the height of the text box as we draw
        // each character
        this._height = dy + this._lineHeight;

        // Account for newlines
        if ("\n" == character || "\r" == character) {
          dy += this._lineHeight;
          dx = currentWidth;
        }

        previousWidth = currentWidth;
      }
    }
  });

  var initialize = EditableText.prototype.initialize;
  EditableText.prototype.initialize = function(text, font, color) {
    initialize.call(this);
    this.name = 'EditableText';

    this._text = '';
    this._editable = false;
    this._position = 0;
    this._width = 0;
    this._height = 0;
    this._lineHeight = 0;
    this._coordinates = [];

    // Add a background making the entire region clickable,
    // not just the glyphs themselves. It will be redrawn
    // whenever the text is updated
    this._background = new Easel.Shape();
    this.addChild(this._background);

    // Add a flashing cursor
    this._cursor = new Cursor(this.lineHeight, CURSOR_STROKE_WIDTH, color);
    this._cursor.visible = false;
    this.addChild(this._cursor);

    // Add a text box in front of the cursor
    this._textDisplayObject = new Easel.Text(text, font, color);
    this.addChild(this._textDisplayObject);

    // Hook up function-based getters and setters
    Object.defineProperty(this, 'text', {
      get: this.getText.bind(this),
      set: this.setText.bind(this)
    });
    Object.defineProperty(this, 'editable', {
      get: this.getEditable.bind(this),
      set: this.setEditable.bind(this)
    });
    Object.defineProperty(this, 'width', {
      get: this.getWidth.bind(this),
    });
    Object.defineProperty(this, 'height', {
      get: this.getHeight.bind(this),
    });
    Object.defineProperty(this, 'lineHeight', {
      get: this.getLineHeight.bind(this),
    });
    Object.defineProperty(this, 'font', {
      get: this.getFont.bind(this),
      set: this.setFont.bind(this)
    });
    Object.defineProperty(this, 'color', {
      get: this.getColor.bind(this),
      set: this.setColor.bind(this)
    });
    Object.defineProperty(this, 'position', {
      get: this.getPosition.bind(this),
      set: this.setPosition.bind(this)
    });

    // With everything established, update our state
    // given any initialization parameters
    this.text = text;
    this.font = font;
    this.color = color;
    this.position = text.length + 1;
  }

  return EditableText;
});
