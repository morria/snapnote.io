define([
    'jquery',
    'Underscore'
  ],
  function($, _) {
    var Save = function(selector, stage) {
      this.trigger = $(selector);
      this.stage = stage;

      this.trigger.click(_.bind(this._onClickTrigger, this));
    }

    Save.prototype = {
      /**
       * @property stage
       * @type Stage
       */
      stage: null,

      /**
       * @property trigger
       * @type jQuery
       */
      trigger: null,

      /**
       * Listener for when 'Save' is clicked on
       */
      _onClickTrigger: function(event) {
        location.href = this.stage.dataURL;
      }
    };

    return Save;
  }
);
