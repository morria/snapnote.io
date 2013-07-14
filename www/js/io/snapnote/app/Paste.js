define([
    'jquery',
    'Underscore',
    'io/snapnote/graphics/tools/Image'
  ],
  function($, _, Image) {
    var Paste = function(stage) {
      this.stage = stage;

      $(window).bind('paste', _.bind(this._onPaste, this));
    }

    Paste.prototype = {
      _onPaste: function(event) {
        mixpanel.track('paste_file');
        var clipboardData = event.originalEvent.clipboardData;
        var file = clipboardData.items[0].getAsFile();
        var reader = new FileReader();
        reader.onload = (function(file, stage) {
            return function(event) {
              var image = new Image(event.currentTarget.result);
              image.addEventListener('load', function() {
                image.set({
                  x: (stage.width/2) - (image.width*image.scale/2),
                  y: (stage.height/2) - (image.height*image.scale/2)
                });
                stage.update();
              });

              // Add it to the stage as it loads
              stage.addStageObject(image);
            }
          })(file, this.stage);
        reader.readAsDataURL(file);
      }
    };

    return Paste;
  }
);

