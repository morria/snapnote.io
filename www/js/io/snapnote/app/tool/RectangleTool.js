define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Rectangle'
  ],
  function($, _, Tool, Rectangle) {
    var RectangleTool = function(selector, stage, color) {
      this.selector = selector;
      this.stage = stage;
      this.color = color;
    }

    RectangleTool.prototype = _.extend(new Tool(), {
      newStageObject: function() {
        return new Rectangle(100, 80);
      }
    });

    return RectangleTool;
  }
);
