define([
    'jquery',
    'Underscore'
  ],
  function($, _) {
    var Tool = function() {
      this._color = '#000';
      this._stage = null;
      this._selector = null;

      this.__defineGetter__('color', _.bind(this.getColor, this));
      this.__defineSetter__('color', _.bind(this.setColor, this));
      this.__defineGetter__('stage', _.bind(this.getStage, this));
      this.__defineSetter__('stage', _.bind(this.setStage, this));
      this.__defineGetter__('selector', _.bind(this.getSelector, this));
      this.__defineSetter__('selector', _.bind(this.setSelector, this));
    }

    Tool.prototype = {
      /**
       * @property stage
       * @type Stage
       */
      getColor: function() { return this._color; },
      setColor: function(color) {
        this._color = color;
      },


      /**
       * @property stage
       * @type Stage
       */
      getStage: function() { return this._stage; },
      setStage: function(stage) {
        this._stage = stage;
      },

      /**
       * @property selector
       * @type String
       */
      getSelector: function() { return this._selector; },
      setSelector: function(selector) {
        // If we already have a trigger, unbind it
        if (this.trigger) {
          this.trigger.unbind('click');
        }

        this._selector = selector;
        this.trigger = $(selector);

        // Listen for click events on the trigger
        this.trigger.click(_.bind(this._onClickTrigger, this));
      },

      /**
       * @property trigger
       * @type jQuery
       */
      trigger: null,

      /**
       * Tools extending this must override this function
       *
       * @return StageObject
       * A new StageObject to be added to the Stage
       */
      newStageObject: function() {
        console.error('newStageObject must be overridden', this);
      },

      /**
       * Listener for when the trigger is clicked
       */
      _onClickTrigger: function(event) {
        var stageObject = _.extend(this.newStageObject(), {
          color: this.color
        });
        this.stage.addStageObject(stageObject);
        this.stage.update();
      }
    };

    return Tool;
  }
);
