define(['Underscore', 'Easel'],
  function(_, Easel) {

    var WIDTH = 8;
    var HEIGHT = 8;
    var RADIUS = 2;

    var Handle = function() {
        this.initialize();
        this.name = 'Handle';

        // Build the Border
        this.graphics
          .beginStroke('#aaa')
          .drawRoundRect(0, 0, WIDTH, HEIGHT, RADIUS)
          .endStroke();

        // Build the Body
        this.graphics
          .beginFill('rgba(255, 160, 160, 1.0)')
          .drawRoundRect(0, 0, WIDTH, HEIGHT, RADIUS);

        /**
         * Handle Dragging
         */
        this.addEventListener('mousedown', _.bind(function(event) {
            var offset = {
                x: event.target.x - event.stageX,
                y: event.target.y - event.stageY
            };

            event.addEventListener('mousemove', _.bind(function(event) {
                this.dispatchEvent({
                    type: 'move',
                    delta: {
                        x: (event.stageX + offset.x) - event.target.x,
                        y: (event.stageY + offset.y) - event.target.y
                    }
                }, this);
                event.target.getStage().update();

                offset = {
                    x: event.target.x - event.stageX,
                    y: event.target.y - event.stageY
                };
            }, this));
        }, this));
    }

    // Extend Shape
    Handle.prototype = _.extend(new Easel.Shape(), {
        width: WIDTH,
        height: HEIGHT
    });

    return Handle;
  }
);
