define(['Underscore', 'Easel'],
  function(_, Easel) {
    var Stage = function(width, height) {
      this.initialize(width, height);
    }

    Stage.prototype = _.extend(new Easel.Stage('stage'), {
      /**
       * @property Name
       * @type String
       */
      name: 'Stage',

      /**
       * @property mouseMoveOutside
       * @type Boolean
       */
      mouseMoveOutside: true,

      /**
       * @property width
       * @type Number
       */
      getWidth: function() { return this._width; },
      setWidth: function(width) {
        this._width = width;
        this._update();
      },

      /**
       * @property height
       * @type Number
       */
      getHeight: function() { return this._height; },
      setHeight: function(height) {
        this._height = height;
        this._update();
      },

      /**
       * @property color
       * @type Number
       */
      getColor: function() { return this._color; },
      setColor: function(color) {
        this._color = color;
        this._update();
      },

      deselectAllChildren: function() {
        for (var i=0; i < this.stageObjectChildren.getNumChildren(); i++) {
          this.stageObjectChildren.getChildAt(i).deselect();
        }
      },

      getNumChildren: function() {
        return this.stageObjectChildren.getNumChildren();
      },

      addStageObject: function(stageObject) {
        this.stageObjectChildren.addChild(stageObject);
      },

      deleteSelected: function() {
        for (var i=0; i < this.stageObjectChildren.getNumChildren(); i++) {
          var stageObject =
            this.stageObjectChildren.getChildAt(i);

          if (stageObject.isSelected()) {
              // Let the stage object know that it is
              // being removed from the stage
              stageObject.dispatchEvent({
                type: 'remove'
              }, stageObject);

              // remove it from the stage
              this.stageObjectChildren.removeChild(stageObject);
              this.update();
              return;
          }
        }
      },

      /**
       * Redraw the stage
       */
      _update: function() {
        this._background.graphics
          .clear()
          .beginFill(this.color)
          .drawRect(0, 0, this._width, this._height);
      }
    });

    var initialize = Stage.prototype.initialize;
    Stage.prototype.initialize = function(width, height) {
      this._width = 0;
      this._height = 0;
      this._color = '#fff';

      // Add a background for clickability
      this._background = new Easel.Shape();
      this.addChild(this._background);

      // All stage objects are children of a child so
      // that we can work around the lack of event
      // bubbling
      this.stageObjectChildren = new Easel.Container();
      this.addChild(this.stageObjectChildren);

      // Deselect all display objects when the background
      // is clicked
      this._background.addEventListener('click', _.bind(function(event) {
        this.deselectAllChildren();
      }, this));

      // Listen for key presses
      $(window).keydown(_.bind(function(event) {
        switch(event.keyCode) {
          case 8: // delete
            event.preventDefault();
            event.stopPropagation();
            this.deleteSelected();
          break;
        }
      }, this));

      // Define some programatic getters and setters
      this.__defineGetter__('width', _.bind(this.getWidth, this));
      this.__defineSetter__('width', _.bind(this.setWidth, this));
      this.__defineGetter__('height', _.bind(this.getHeight, this));
      this.__defineSetter__('height', _.bind(this.setHeight, this));
      this.__defineGetter__('color', _.bind(this.getColor, this));
      this.__defineSetter__('color', _.bind(this.setColor, this));

      // Set the dimensions, causing a redraw
      this.width = width;
      this.height = height;
      this.color = '#fff';
    }

    return Stage;
  }
);
