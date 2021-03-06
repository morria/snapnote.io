define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Label'
  ],
  function($, _, Tool, Label) {
    var LabelTool = function(selector, stage, color) {
      this.selector = selector;
      this.stage = stage;
      this.color = color;
    }

    LabelTool.prototype = _.extend(new Tool(), {
      /**
       * @property eventName
       * @type String
       */
      eventName: 'label_add',

      newStageObject: function(event) {
        var label = $(event.target).closest('.tool-label').attr('data-label');

        return new Label(label,
          '42px Helvetica,Arial', this.color);
      }
    });

    return LabelTool;
  }
);
