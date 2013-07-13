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
      /**
       * @property eventName
       * @type String
       */
      eventName: 'text_add',

      newStageObject: function() {
        return new Text("Text", '42px Helvetica,Arial', this.color);
      }
    });

    return TextTool;
  }
);
