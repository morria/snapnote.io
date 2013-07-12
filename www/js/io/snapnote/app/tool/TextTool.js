define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Text'
  ],
  function($, _, Tool, Text) {
    var TextTool = function(selector, stage, color) {
      this.selector = selector;
      this.stage = stage;
      this.color = color;
    }

    TextTool.prototype = _.extend(new Tool(), {
      newStageObject: function() {
        return _.extend(new Text("Text", '42px Helvetica,Arial', this.color), {
            x: 350,
            y: 0,
          });
      }
    });

    return TextTool;
  }
);
