define([
    'jquery',
    'Underscore'
  ],
  function($, _) {
    var ColorTool = function(selector, snapNote) {
      this.target = $(selector);
      this.snapNote = snapNote;

      this.target.find('.color').click(_.bind(function(event) {
        this.snapNote.toolColor =
          $(event.target).css('background-color');
        this.snapNote.toolShadowColor =
          $(event.target).attr('data-shadow-color');
        mixpanel.track(this.eventName);
      }, this));
    }

    ColorTool.prototype = {
      /**
       * @property eventName
       * @type String
       */
      eventName: 'color_select',

      /**
       * @property stage
       * @type Stage
       */
      stage: null,

      /**
       * @property target
       * @type jQuery
       */
      target: null
    };

    return ColorTool;
  }
);
