define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Arrow'
  ],
  function($, _, Tool, Arrow) {
    var ArrowTool = function(selector, stage) {
      this.selector = selector;
      this.stage = stage;
    }

    ArrowTool.prototype = _.extend(new Tool(), {
      newStageObject: function() {
        return _.extend(new Arrow(40, 100), {
          x: 800,
          y: 300
        });
      }
    });

    return ArrowTool;
  }
);
