define([
    'jquery',
    'Underscore',
    'io/snapnote/graphics/Stage',
    'io/snapnote/app/DragonDrop',
    'io/snapnote/app/tool/ArrowTool',
    'io/snapnote/app/tool/ImageTool',
    'io/snapnote/app/tool/RectangleTool',
    'io/snapnote/app/tool/TextTool',
  ],
  function($, _, Stage, DragonDrop, ArrowTool, ImageTool, RectangleTool, TextTool) {

    var SnapNote = function() {
      this._canvas = $('#' + this.canvasId);
      this._stage = new Stage();

      // Inhibit selection/highlighting on the canvas
      this._canvas.on('selectstart', false);

      // Define some programatic getters and setters
      this.__defineGetter__('width', _.bind(this.getWidth, this));
      this.__defineSetter__('width', _.bind(this.setWidth, this));
      this.__defineGetter__('height', _.bind(this.getHeight, this));
      this.__defineSetter__('height', _.bind(this.setHeight, this));
      this.__defineGetter__('documentWidth', _.bind(this.getDocumentWidth, this));
      this.__defineGetter__('documentHeight', _.bind(this.getDocumentHeight, this));

      // When the browser dimensions change, update the
      // stage dimensions
      $(window).resize(_.bind(this._onResize, this));

      // Set initial dimensions for the stage
      this.width = this.documentWidth;
      this.height = this.documentHeight;

      // Hook up tool buttons
      this._arrowTool = new ArrowTool('#tool-arrow', this._stage);
      this._rectangleTool = new RectangleTool('#tool-rectangle', this._stage);
      this._imageTool = new ImageTool('#tool-image', this._stage);
      this._textTool = new TextTool('#tool-text', this._stage);

      // Do an initial rendering of the stage
      this._stage.update();

      new DragonDrop(this._stage);
    }

    SnapNote.prototype = {
      /**
       * @property stage
       * @type String
       */
      canvasId: 'stage',

      /**
       * @property width
       * @type Number
       */
      getWidth: function() { return this._stage.width; },
      setWidth: function(width) {
        this._stage.width = width;
        this._canvas.attr('width', width);
        this._stage.update();
      },

      /**
       * @property height
       * @type Number
       */
      getHeight: function() { return this._stage.height; },
      setHeight: function(height) {
        this._stage.height = height;
        this._canvas.attr('height', height);
        this._stage.update();
      },

      /**
       * @property documentWidth
       * @type Number
       */
      getDocumentWidth: function() {
        return $('#content').width();
      },

      /**
       * @property documentHeight
       * @type Number
       */
      getDocumentHeight: function() {
        var padding = $('header').height() + $('footer').height();
        return $('html').height() - padding;
      },

      /**
       * Listener for when the browser changes dimensions
       */
      _onResize: function(event) {
        this.width = this.documentWidth;
        this.height = this.documentHeight;
      }
    };

    return SnapNote;
  }
);
