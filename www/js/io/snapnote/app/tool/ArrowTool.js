define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Arrow'
  ],
  function($, _, Tool, Arrow) {
    var ArrowTool = function(selector, stage, color) {
      this.selector = selector;
      this.stage = stage;
      this.color = color;
    }

    ArrowTool.prototype = _.extend(new Tool(), {
      /**
       * @property eventName
       * @type String
       */
      eventName: 'arrow_add',

      newStageObject: function() {
        return new Arrow(-60, 60);
      }
    });

    return ArrowTool;
  }
);
