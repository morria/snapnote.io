define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Rectangle'
  ],
  function($, _, Tool, Rectangle) {
    var RectangleTool = function(selector, stage) {
      this.selector = selector;
      this.stage = stage;
    }

    RectangleTool.prototype = _.extend(new Tool(), {
      newStageObject: function() {
        return _.extend(new Rectangle(100, 80), {
            x: 120,
            y: 100,
            color: '#000'
          });
      }
    });

    return RectangleTool;
  }
);
