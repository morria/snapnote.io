define([
    'jquery',
    'Underscore',
    'Easel',
    'io/snapnote/graphics/Stage',
    'io/snapnote/app/DesktopImage',
    'io/snapnote/app/DragonDrop',
    'io/snapnote/app/Paste',
    'io/snapnote/app/Save',
    'io/snapnote/app/tool/ArrowTool',
    'io/snapnote/app/tool/ColorTool',
    'io/snapnote/app/tool/ImageTool',
    'io/snapnote/app/tool/LabelTool',
    'io/snapnote/app/tool/RectangleTool',
    'io/snapnote/app/tool/TextTool'
  ],
  function($, _, Easel, Stage, DesktopImage, DragonDrop, Paste, Save, ArrowTool, ColorTool, ImageTool, LabelTool, RectangleTool, TextTool) {

    var SnapNote = function() {
      this._canvas = $('#' + this.canvasId);
      this._stage = new Stage();
      this._stage.color = 'rgba(255, 255, 255, 0.01)';
      this._toolColor = null;
      this._toolShadowColor = null;

      // Inhibit selection/highlighting on the canvas
      this._canvas.on('selectstart', false);

      // Define some programatic getters and setters
      Object.defineProperty(this, 'toolColor', {
        get: this.getToolColor.bind(this),
        set: this.setToolColor.bind(this)
      });
      Object.defineProperty(this, 'toolShadowColor', {
        get: this.getToolShadowColor.bind(this),
        set: this.setToolShadowColor.bind(this)
      });
      Object.defineProperty(this, 'width', {
        get: this.getWidth.bind(this),
        set: this.setWidth.bind(this)
      });
      Object.defineProperty(this, 'height', {
        get: this.getHeight.bind(this),
        set: this.setHeight.bind(this)
      });
      Object.defineProperty(this, 'documentWidth', {
        get: this.getDocumentWidth.bind(this)
      });
      Object.defineProperty(this, 'documentHeight', {
        get: this.getDocumentHeight.bind(this)
      });

      // When the browser dimensions change, update the
      // stage dimensions
      $(window).resize(_.bind(this._onResize, this));

      // Hook up tool buttons
      this._arrowTool = new ArrowTool('#tool-arrow', this._stage, this.toolColor);
      this._rectangleTool = new RectangleTool('#tool-rectangle', this._stage, this.toolColor);
      this._imageTool = new ImageTool('#tool-image', '#tool-image-select', this._stage, this.toolColor);
      this._textTool = new TextTool('#tool-text', this._stage, this.toolColor);
      this._labelTool = new LabelTool('.tool-label', this._stage, this.toolColor);
      this._colorTool = new ColorTool('#color-chooser', this);

      // Set initial dimensions for the stage
      this.width = this.documentWidth;
      this.height = this.documentHeight;

      this.toolColor = $('#color-chooser').attr('data-default');
      // this.toolShadowColor = '#000';

      // Do an initial rendering of the stage
      this._stage.update();

      this._stage.addEventListener('added', _.bind(function(event) {
        $('#blank-slate-mobile').hide();
        $('#blank-slate').hide();
      }, this));

      this._stage.addEventListener('remove', _.bind(function(event) {
        // Note: this event fires pre-removal, so having
        // a single child means it'll be empty
        if (this._stage.stageObjects.getNumChildren() < 2) {
          $('#blank-slate').show();
        }
      }, this));

      new DragonDrop(this._stage);
      new Save('#tool-share', this._stage);
      new Paste(this._stage);
      new DesktopImage(this._stage);

      if (Easel.Touch.isSupported()) {
        Easel.Touch.enable(this._stage);
        window.scrollTo(0, 1);
      }

      // Retina displays need a 2x sized canvas scaled
      // down to its original size to preserve pasted
      // image quality.
      this._adjustPixelDensity();

    }

    SnapNote.prototype = {
      /**
       * @property stage
       * @type String
       */
      canvasId: 'stage',

      /**
       * @property color
       * @type Number
       */
      getToolColor: function() { return this._toolColor; },
      setToolColor: function(color) {
        this._toolColor = color;
        this._arrowTool.color = color;
        this._rectangleTool.color = color;
        this._imageTool.color = color;
        this._textTool.color = color;
        this._labelTool.color = color;

        var selectedObject = this._stage.selectedObject;
        if (selectedObject) {
          selectedObject.color = color;
          this._stage.update();
        }
      },

      /**
       * @property shadowColor
       * @type Number
       */
      getToolShadowColor: function() { return this._toolShadowColor; },
      setToolShadowColor: function(color) {
        return;
        this._toolShadowColor = color;
        this._arrowTool.shadowColor = color;
        this._rectangleTool.shadowColor = color;
        this._textTool.shadowColor = color;
        this._labelTool.shadowColor = color;

        var selectedObject = this._stage.selectedObject;
        if (selectedObject) {
          selectedObject.shadowColor = color;
          this._stage.update();
        }
      },

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

        if (!this._loggedResize) {
          ga('send', 'event', 'annotation', 'resize_screen', null, null, false);
          this._loggedResize = true;
        }

        this._adjustPixelDensity();
      },

      /**
       * Get the number of screen pixels per canvas pixel.
       */
      _deviceCanvasPixelRatio: function() {
        // Pixel density of the physical screen
        var devicePixelRatio =
            window.devicePixelRatio || 1;

        var canvas = this._canvas.get(0);
        var context = canvas.getContext('2d');

        // Pixel density of the canvas
        var backingStoreRatio =
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1;

        // Screen pixels per canvas pixels
        return (devicePixelRatio / backingStoreRatio);
      },

      /**
       * Ajdust the pixel density of the canvas to be
       * that of the physical screen.
       */
      _adjustPixelDensity: function(event) {
        var ratio = this._deviceCanvasPixelRatio();

        var initialWidth = this.width;
        var initialHeight = this.height;

        // Adjust the width of the canvas to have the
        // same number of pixels as the physical screen.
        this.width = initialWidth * ratio;
        this.height = initialHeight * ratio;

        var canvas = this._canvas.get(0);

        // Scale the canvas to be the same size as
        // it was before, but at the new pixel
        // density
        canvas.style.width = initialWidth + 'px';
        canvas.style.height = initialHeight + 'px';

        // Tell the stage to draw with the given
        // ratio used as a scale on all StageObjects
        this._stage.deviceCanvasPixelRatio = ratio;
      }
    };

    return SnapNote;
  }
);
