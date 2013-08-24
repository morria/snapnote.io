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
        ga('send', 'event', 'annotation', 'save', null, null, false);

        var box = this.stage.boundingBox;
        if (this.stage.stageObjects.getNumChildren() < 1
            || box.maxX <= box.minX
            || box.maxY <= box.minY) {
          return;
        }

        $(event.target).addClass('throb');

        $.ajax('/store', {
          type: 'POST',
          data: this.stage.dataURL,
          success: function(data) {
            if (!data || !data.success) {
              return;
            }
            location.href = '/' + data.id;
          }
        });
      }
    };

    return Save;
  }
);
