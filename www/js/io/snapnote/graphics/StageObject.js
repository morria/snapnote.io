define([
    'Underscore',
    'Easel'],
  function(_, Easel) {

    var STAGE_PADDING = 10;

    var StageObject = function() {
      this.initialize();
    }

    StageObject.prototype = _.extend(new Easel.Container(), {
      /**
        * @property width
        * @type Number
        */
      getWidth: function() { return this._width; },
      setWidth: function(width) {
        this._width = Math.max(width, 0);
        this.update();
      },

      /**
        * @property height
        * @type Number
        */
      getHeight: function() { return this._height; },
      setHeight: function(height) {
        this._height = Math.max(height, 0);
        this.update();
      },

      /**
       * A CSS color
       *
       * @prooperty color
       * @type String
       */
      getColor: function() { return this._color; },
      setColor: function(color) {
        this._color = color;
        this.update();
      },

      /**
       * A CSS color for the shadow
       *
       * @prooperty color
       * @type String
       */
      getShadowColor: function() { return this._shadowColor; },
      setShadowColor: function(color) {
        this._shadowColor = color;
        this.shadow = new Easel.Shadow(color, 1, 1, 1),
        this.update();
      },

      shadow: new Easel.Shadow('#000', 1, 1, 1),

      /**
       * @property scale
       * @type Number
       */
      getScale: function() { return this.content.scaleX; },
      setScale: function(scale) {
        this.content.scaleX *= scale;
        this.content.scaleY *= Math.abs(scale);
      },

      /**
       * @property selected
       * @type Boolean
       */
      getSelected: function() { return this._selected; },
      setSelected: function(selected) {
        this._selected = selected;
        if (this._selected) {
          this.select();
        } else {
          this.deselect();
        }
        this.update();
      },

      update: function() {
        console.error('Children of StageObject must override update()', this);
      },

      /**
        * Select this object, deselecting all others
        *
        * @return void
        */
      select: function() {
        // Deselect everyone else
        this.getStage().deselectAllChildren();

        // Mark this as selected
        this._selected = true;

        // Turn the handles on
        this.handles.visible = true;

        // Let the world know I'm selected
        this.dispatchEvent({
          type: 'select'
        }, this);

        // Redraw with my handles on and everyone else's
        // handles off
        try {
          this.getStage().update();
        } catch (exception) {
          console.error(this);
          throw exception;
        }
      },

      /**
        * Deselect this element
        *
        * @return void
        */
      deselect: function() {
        this._selected = false;
        this.handles.visible = false;

        // Let the world know I'm no longer
        // selected
        this.dispatchEvent({
          type: 'deselect'
        }, this);

        // Redraw the stage with my handles gone
        if (this.getStage()) {
          this.getStage().update();
        }
      }

    });

    var initialize = StageObject.prototype.initialize;
    StageObject.prototype.initialize = function() {
      initialize.call(this);

      this._width = 0;
      this._height = 0;
      this._color = '#000';
      this._scale = 1.0;
      this._selected = false;

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
      Object.defineProperty(this, 'shadowColor', {
        get: this.getShadowColor.bind(this),
        set: this.setShadowColor.bind(this)
      });
      Object.defineProperty(this, 'scale', {
        get: this.getScale.bind(this),
        set: this.setScale.bind(this)
      });
      Object.defineProperty(this, 'selected', {
        get: this.getSelected.bind(this),
        set: this.setSelected.bind(this)
      });
      Object.defineProperty(this, 'stage', {
        get: this.getStage.bind(this)
      });

      this.content = new Easel.Container();
      this.content.name = 'stageObject.content';
      this.addChild(this.content);

      this.handles = new Easel.Container();
      this.handles.visible = false;
      this.handles.name = 'stageObject.handles';
      this.addChild(this.handles);

      /**
       * Before rendering, make sure the object is within
       * the bounds of the stage
       */
      this.content.addEventListener('tick', _.bind(function(event) {
        if ((this.width*this.scale) > (this.stage.width - (STAGE_PADDING *2))) {
          this.scale *= (this.stage.width - (STAGE_PADDING*2))/(this.width * this.scale);
        }

        if ((this.height*this.scale) > (this.stage.height - (STAGE_PADDING * 2))) {
          this.scale *= (this.stage.height - (STAGE_PADDING*2))/(this.height*this.scale);
        }

        if (this.x < STAGE_PADDING) {
          this.x = STAGE_PADDING;
        } else if ((this.x + (this.width*this.scale)) > (this.stage.width - (STAGE_PADDING*2))) {
          this.x = ((this.stage.width - (STAGE_PADDING)) - (this.width * this.scale));
        }

        if (this.y < STAGE_PADDING) {
          this.y = STAGE_PADDING;
        } else if ((this.y + (this.height * this.scale)) > (this.stage.height - (STAGE_PADDING*2))) {
          this.y = ((this.stage.height - (STAGE_PADDING)) - (this.height * this.scale));
        }

      }, this));

      /**
       * Enable the dragging of stage objects
       */
      this.content.addEventListener('mousedown', _.bind(function(event) {
        this.selected = true;

        var target = event.target.parent;

        // Stored from the mousedown moment as a reference point to
        // the offset from the top-left of the object
        var offset = {
          x: target.x - event.stageX,
          y: target.y - event.stageY
        };

        event.addEventListener('mousemove', _.bind(function(event) {
          target.set({
            x: event.stageX + offset.x,
            y: event.stageY + offset.y
          }).getStage().update();
        }, this));
      }, this));
    }

    return StageObject;
  }
);
