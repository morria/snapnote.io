define([
    'jquery',
    'Underscore',
    'io/snapnote/graphics/Stage',
    'io/snapnote/app/DragonDrop',
    'io/snapnote/app/Save',
    'io/snapnote/app/tool/ArrowTool',
    'io/snapnote/app/tool/ImageTool',
    'io/snapnote/app/tool/RectangleTool',
    'io/snapnote/app/tool/TextTool',
  ],
  function($, _, Stage, DragonDrop, Save, ArrowTool, ImageTool, RectangleTool, TextTool) {

    var SnapNote = function() {
      this._canvas = $('#' + this.canvasId);
      this._stage = new Stage();
      this._stage.color = 'rgba(255, 255, 255, 0.01)';

      // Inhibit selection/highlighting on the canvas
      this._canvas.on('selectstart', false);

      // Define some programatic getters and setters
      Object.defineProperty(this, 'width', {
        get: this.getWidth.bind(this),
        set: this.setWidth.bind(this)
      })
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

      // Set initial dimensions for the stage
      this.width = this.documentWidth;
      this.height = this.documentHeight;

      var color = '#ff4f00';

      // Hook up tool buttons
      this._arrowTool = new ArrowTool('#tool-arrow', this._stage, color);
      this._rectangleTool = new RectangleTool('#tool-rectangle', this._stage, color);
      this._imageTool = new ImageTool('#tool-image-select', '#tool-image', this._stage, color);
      this._textTool = new TextTool('#tool-text', this._stage, color);

      // Do an initial rendering of the stage
      this._stage.update();

      this._stage.addEventListener('added', _.bind(function(event) {
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
