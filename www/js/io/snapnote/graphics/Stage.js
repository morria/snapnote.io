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
       * @property color
       * @type Number
       */
      getToolColor: function() { return this._toolColor; },
      setToolColor: function(color) {
        this._toolColor = color;
        this._update();
      },


      /**
       * @property dataURL
       * @type String
       */
      getDataURL: function() {
        // Get rid of any handles and cursors
        this.deselectAllChildren();

        // Get the bounding box around all stage elements
        var box = this.boundingBox;

        var imageData =
          this.canvas.getContext('2d')
          .getImageData(box.minX, box.minY,
            box.maxX - box.minX,
            box.maxY - box.minY);

        var newCanvas =
          $('<canvas />')
            .attr('width', box.maxX - box.minX)
            .attr('height', box.maxY - box.minY).get(0);

        var newContext = newCanvas.getContext('2d');
        newContext.putImageData(imageData, 0, 0);

        return newCanvas.toDataURL('image/png');
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

      /**
       * @property selectedObject
       * @type StageObject
       */
      getSelectedObject: function() {
        return _.find(this.stageObjects.children,
            function(stageObject) {
              console.log(stageObject);
              return stageObject.selected;
            });
      },

      deleteSelected: function() {
        var stageObject = this.selectedObject;
        if (!stageObject) {
          return;
        }

        this.removeStageObject(stageObject);
      },

      /**
       * Remove the given stage object
       */
      removeStageObject: function(stageObject) {
        stageObject.dispatchEvent({
          type: 'remove'
        }, stageObject);

        this.dispatchEvent({
          type: 'remove',
          stage: this,
          stageObject: stageObject
        });

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
      Object.defineProperty(this, 'boundingBox', {
        get: this.getBoundingBox.bind(this)
      });
      Object.defineProperty(this, 'width', {
        get: this.getWidth.bind(this),
        set: this.setWidth.bind(this)
      });
      Object.defineProperty(this, 'height', {
        get: this.getHeight.bind(this),
        set: this.setHeight.bind(this)
      });
      Object.defineProperty(this, 'color', {
        get: this.getColor.bind(this),
        set: this.setColor.bind(this)
      });
      Object.defineProperty(this, 'dataURL', {
        get: this.getDataURL.bind(this)
      });
      Object.defineProperty(this, 'selectedObject', {
        get: this.getSelectedObject.bind(this),
      });

      // Set the dimensions, causing a redraw
      this.width = width;
      this.height = height;
      this.color = null;
    }

    return Stage;
  }
);
