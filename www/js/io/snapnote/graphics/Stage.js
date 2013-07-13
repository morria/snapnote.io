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
       * @property boundingBox
       * @type Number
       */
      getBoundingBox: function() {
        var box = {
          minX: 0, minY: 0,
          maxX: 0, maxY: 0
        }

        if (this.stageObjects.getNumChildren() > 0) {
          box.minX = box.minY = Number.MAX_VALUE;
        }

        _.each(this.stageObjects.children, function(stageObject, i) {
          box.minX = Math.min(stageObject.x, box.minX);
          box.minY = Math.min(stageObject.y, box.minY);
          box.maxX = Math.max(stageObject.x + (stageObject.width * stageObject.scale), box.maxX);
          box.maxY = Math.max(stageObject.y + (stageObject.height * stageObject.scale), box.maxY);
        });

        return box;
      },

      /**
       * @property width
       * @type Number
       */
      getWidth: function() { return this._width; },
      setWidth: function(width) {
        var scale = width/this.width;
        if (!isNaN(scale)) {
          var box = this.boundingBox;
          var dx = (box.minX*scale) - box.minX;
          _.each(this.stageObjects.children, function(stageObject, i) {
            stageObject.x += dx;
          });
        }

        this._width = width;
        this._update();
      },

      /**
       * @property height
       * @type Number
       */
      getHeight: function() { return this._height; },
      setHeight: function(height) {
        var scale = height/this.height;
        if (!isNaN(scale)) {
          var box = this.boundingBox;
          var dy = (box.minY*scale) - box.minY;
          _.each(this.stageObjects.children, function(stageObject, i) {
            stageObject.y += dy;
          });
        }

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

      /**
       * Cause no objects on the stage to be in a
       * selected state
       */
      deselectAllChildren: function() {
        _.each(this.stageObjects.children, function(stageObject, i) {
          stageObject.selected = false;
        });
      },

      addStageObject: function(stageObject) {
        this.stageObjects.addChild(stageObject);
        this.sortChildrenByType();

        stageObject.dispatchEvent({
          type: 'added',
          stage: this
        });

        this.dispatchEvent({
          type: 'added',
          stage: this,
          stageObject: stageObject
        });
      },

      /**
       * Move the given stage object to the bottom of
       * the stack
       */
      sortChildrenByType: function() {
        _.each(this.stageObjects.children, function(child, i) {
          child.sortValue = i;
          if (child.name !== 'Image') {
            child.sortValue += 10000;
          }
          if (child.name !== 'Text') {
            child.sortValue -= 1000;
          }
        });

        this.stageObjects.sortChildren(function(a, b) {
          return (a.sortValue - b.sortValue);
        });
      },

      deleteSelected: function() {
        var stageObject =
          _.find(this.stageObjects.children,
            function(stageObject) {
              return stageObject.selected;
            });

        if (!stageObject) {
          return;
        }

        stageObject.dispatchEvent({
          type: 'remove'
        }, stageObject);

        // remove it from the stage
        this.stageObjects.removeChild(stageObject);
        this.update();
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
      this.stageObjects = new Easel.Container();
      this.addChild(this.stageObjects);

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
      this.__defineGetter__('boundingBox', _.bind(this.getBoundingBox, this));
      this.__defineGetter__('width', _.bind(this.getWidth, this));
      this.__defineSetter__('width', _.bind(this.setWidth, this));
      this.__defineGetter__('height', _.bind(this.getHeight, this));
      this.__defineSetter__('height', _.bind(this.setHeight, this));
      this.__defineGetter__('color', _.bind(this.getColor, this));
      this.__defineSetter__('color', _.bind(this.setColor, this));

      // Set the dimensions, causing a redraw
      this.width = width;
      this.height = height;
      this.color = null;
    }

    return Stage;
  }
);
