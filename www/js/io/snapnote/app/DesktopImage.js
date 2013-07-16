define([
    'jquery',
    'Underscore',
    'io/snapnote/graphics/tools/Image'
  ],
  function($, _, Image) {
    var DesktopImage = function(stage) {
      var id = $(stage.canvas).attr('data-desktop-image-id');
      if (id) {
        var image = new Image('/' + id + '.png');
        console.log(image);
        image.addEventListener('load', _.bind(function() {
          image.set({
            x: (stage.width/2) - (image.width*image.scale/2),
            y: (stage.height/2) - (image.height*image.scale/2)
          });
          stage.update();
        }, this));
        stage.addStageObject(image);
      }
    }

    DesktopImage.prototype = {
    }

    return DesktopImage;
  }
);
