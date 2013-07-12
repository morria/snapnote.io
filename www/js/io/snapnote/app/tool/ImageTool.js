define([
    'jquery',
    'Underscore',
    'io/snapnote/app/Tool',
    'io/snapnote/graphics/tools/Image'
  ],
  function($, _, Tool, Image) {
    var ImageTool = function(selector, stage) {
      this.selector = selector;
      this.stage = stage;
    }

    ImageTool.prototype = _.extend(new Tool(), {
      newStageObject: function() {
        var image = _.extend(new Image('/img/beautiful/lazyButAlive.jpg'), {
            x: 250,
            y: 50,
            scale: 0.9
        });

        // Update the stage a second time after the image
        // finishes loading
        image.addEventListener('load', function(event) {
          image.getStage().update();
        });

        return image;
      }
    });

    return ImageTool;
  }
);
