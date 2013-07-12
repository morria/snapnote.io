define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Text'
  ],
  function($, _, Tool, Text) {
    var TextTool = function(selector, stage) {
      this.selector = selector;
      this.stage = stage;
    }

    TextTool.prototype = _.extend(new Tool(), {
      newStageObject: function() {
        return _.extend(new Text("snapnote.io", '42px Helvetica,Arial', '#000'), {
            x: 350,
            y: 0,
          });
      }
    });

    return TextTool;
  }
);
