define(['Underscore', 'Easel'],
  function(_, Easel) {
    var Stage = function(width, height) {
      this.initialize(width, height);
    }

    Stage.prototype = _.extend(new Easel.Stage('stage'), {
      deselectAllChildren: function() {
        for (var i=0; i < this.stageObjectChildren.getNumChildren(); i++) {
          this.stageObjectChildren.getChildAt(i).deselect();
        }
      },

      getNumChildren: function() {
        return this.stageObjectChildren.getNumChildren();
      },

      addStageObject: function(stageObject) {
        this.stageObjectChildren.addChild(stageObject);
      },

      deleteSelected: function() {
        for (var i=0; i < this.stageObjectChildren.getNumChildren(); i++) {
          var stageObject =
            this.stageObjectChildren.getChildAt(i);

          if (stageObject.isSelected()) {
              // Let the stage object know that it is
              // being removed from the stage
              stageObject.dispatchEvent({
                type: 'remove'
              }, stageObject);

              // remove it from the stage
              this.stageObjectChildren.removeChild(stageObject);
              this.update();
              return;
          }
        }
      }
    });

    var initialize =
      Stage.prototype.initialize;

    Stage.prototype.initialize = function(width, height) {
      // initialize.call(this);
      this.name = 'SnapNote';

      // Continue tracking the mouse even when it leaves
      // the canvas
      this.mouseMoveOutside = true;

      // Add a background that can receive click events
      var background = new Easel.Shape();
      background.graphics
        .beginFill('rgba(255, 255, 255, 0.01)')
        .drawRect(0, 0, width, height);
      this.addChild(background);

      // All stage objects are children of a child so
      // that we can work around the lack of event
      // bubbling
      this.stageObjectChildren = new Easel.Container();
      this.addChild(this.stageObjectChildren);

      // Deselect all display objects when the background
      // is clicked
      background.addEventListener('click', _.bind(function(event) {
        this.deselectAllChildren();
      }, this));

      // Listen for key presses
      $(window).keydown(_.bind(function(event) {
        switch(event.keyCode) {
          case 8: // delete
            event.preventDefault();
            event.stopPropagation();
            this.deleteSelected();
          break;
        }
      }, this));
    }

    return Stage;
  }
);
