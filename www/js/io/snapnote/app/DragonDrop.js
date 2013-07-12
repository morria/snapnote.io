define([
    'jquery',
    'Underscore',
    'io/snapnote/graphics/tools/Image'
  ],
  function($, _, SNImage) {
    var DragonDrop = function(stage) {
      this.stage = stage;
      $('body').bind('drop', _.bind(this._onDrop, this));
      $('body').bind('dragenter', _.bind(this._onDragEnter, this));
      $('body').bind('dragover', _.bind(this._onDragOver, this));
      $('body').bind('dragleave', _.bind(this._onDragLeave, this));
    }

    DragonDrop.prototype = {
      _onDrop: function(event) {
        event.preventDefault();
        event.stopPropagation();

        $('#dragon-drop-message').hide();

        var originalEvent = event.originalEvent;
        var dataTransfer = originalEvent.dataTransfer;

        var position = {
          x: originalEvent.offsetX,
          y: originalEvent.offsetY
        };

        _.each(dataTransfer.files, _.bind(function(file, i) {
          this._onDropFile(file, position, event);
        }, this));

        if (dataTransfer.getData('text/uri-list')) {
          this._onDropUrl(dataTransfer.getData('text/uri-list'), position, event);
        }
      },

      _onDropUrl: function(url, position, event) {
        var image = _.extend(new SNImage(url), {
          x: position.x,
          y: position.y
        })

        image.addEventListener('load', _.bind(function() {
          this.stage.update();
        }, this));

        // Add it to the stage as it loads
        this.stage.addStageObject(image);
      },

      _onDropFile: function(file, position, event) {
        var reader = new FileReader();
        reader.onload = (function(file, stage) {
            return function(event) {
              var image = _.extend(new SNImage(event.currentTarget.result), {
                x: position.x,
                y: position.y
              })

              image.addEventListener('load', function() {
                stage.update();
              });

              // Add it to the stage as it loads
              stage.addStageObject(image);
            }
          })(file, this.stage);
        reader.readAsDataURL(file);
      },

      _onDragEnter: function(event) {
        event.preventDefault();
        $('#dragon-drop-message').show();
        return false;
      },

      _onDragOver: function(event) {
        event.preventDefault();
        event.originalEvent.dataTransfer.dropEffect = 'copy';
        return false;
      },

      _onDragLeave: function(event) {
        $('#dragon-drop-message').hide();
      }
    };

    return DragonDrop;
  }
);
